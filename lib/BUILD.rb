# frozen_string_literal: true

# Uses the following ENV values:
#   BUILD_DIR   - defaults to 'build'
#   BUCKET_NAME - Required if uploading.
#   PUBLIC_DIR  - defaults to 'public' or 'Public'.
class BUILD
  SETTINGS_JSON = 'settings.json'

  class << self
    def bucket_name
      @bucket_name ||= OS.env('BUCKET_NAME')
    end

    def dirname
      @dirname ||= ENV['BUILD_DIR'] || 'build'
    end

    def public_dirname
      @public_dirname ||= ENV['PUBLIC_DIR'] ||
                          (Dir.exist?('public') && 'public') ||
                          (Dir.exist?('Public') && 'Public')
    end

    def files_uploaded_json
      @files_uploaded_json ||= "tmp/#{bucket_name}.uploaded_files.json"
    end

    def uploaded_list
      @uploaded_list ||= begin
                           update_files_uploaded_json # if hours_age_of_file(files_uploaded_json) > 6
                           raw = JSON.parse File.read(files_uploaded_json)
                           raw.each_with_object({}) { |info, o| o[info['key']] = info }
                         end
    end

    def update_files_uploaded_json
      raw = OS.run!("mc ls --no-color --recursive --json #{bucket_name}/#{bucket_name} ")
      new_content = raw.split("\n").map { |x| JSON.parse(x) }
      File.write(files_uploaded_json, JSON.pretty_generate(new_content))
      warn "--- wrote: #{files_uploaded_json}"
    end

    def uploaded?(key, filepath)
      uploaded_list[key] && uploaded_list[key]['etag'] == FILES.etag(filepath)
    end

    def upload(filelist)
      uploaded_files = []
      pids = []
      filelist.each do |raw_filepath|
        file = ensure_in_build_dir(raw_filepath)
        k = FILES.key_name(file)

        unless filelist.size == 1
          already_up = uploaded?(k, file)
          next if already_up
        end

        mime = FILES.mime_type(file)
        pid = Process.fork do
          OS.system!(%W[
            bun x wrangler r2 object put #{File.join FILES.bucket_name, k} --file #{file} --content-type #{mime}
          ])
        end
        uploaded_files.push file
        pids.push pid
      end # each file

      Process.wait unless pids.empty?
      uploaded_files
    end # def

    def dir
      OS.system!(%W[rm -rf #{dirname}])
      OS.system!(%W[cp --archive #{public_dirname} #{dirname}])
      settings
    end # def

    def download_pure_css
      return false if File.exist?('pure.css') && FILES.days_age_of_file('pure.css') < 30

      OS.system!(%w[wget -O pure.css https://cdn.jsdelivr.net/npm/purecss@latest/build/base-min.css])
      OS.system!(%w[wget -O pure-grids.css https://cdn.jsdelivr.net/npm/purecss@3.0.0/build/grids-responsive-min.css])
      OS.system!(%w[wget -O reset.css https://meyerweb.com/eric/tools/css/reset/reset.css])
      OS.system!('ls -hal')
      true
    end # def

    def ensure_in_build_dir(raw_filename)
      expanded = File.expand_path(raw_filename)

      temp_path = expanded.sub(File.expand_path(BUILD.dirname), '')
      raise "!!! Invalid file: #{raw_filename}" if expanded == temp_path

      File.join(BUILD.dirname, temp_path)
    end # def

    def css_list
      OS.capture!(%W[find #{dirname} -type f -not -path */base/* -and -name *.css])
        .strip.split("\n")
    end

    def _css(files = BUILD.css_list)
      new_files = []
      files.each do |f|
        warn "--- Compiling #{f}"
        tmp_file = "#{f}.tmp"
        OS.system!(%( bun x lightningcss --minify --bundle #{f} -o #{tmp_file} ))
        new_files.push f
        File.rename(tmp_file, f)
      end
      new_files
    end # def

    def scripts_list
      OS.run!(%(find "#{dirname}" -type f -not -path '*/base/*' -and -name '*.mts' -and -not -name '*.html.mts'))
        .strip.split("\n")
    end

    def _mjs(bun_files = BUILD.scripts_list)
      if bun_files.empty?
        warn '--- No .mts files found.'
        return false
      end

      warn "--- TS files: #{bun_files.inspect}"
      OS.system!(
        'bun', 'build',
        '--root', '.',
        '--target', 'browser',
        '--outdir', '.',
        '--splitting',
        '--minify',
        '--chunk-naming', '[dir]/lib-[hash].mjs',
        '--entry-naming', '[dir]/[name]-[hash].mjs',
        *bun_files
      )

      bun_files.map do |x|
        File.unlink x
        x.sub(/\.mts$/, '.mjs')
      end
    end # def

    def html_list
      OS.capture!(%W[find #{dirname} -type f -not -path */base/* -and -name *.html.mts])
        .strip.split("\n")
    end

    def _html(files = BUILD.html_list)
      new_files = []
      files.each do |f|
        new_file = f.sub(/\.html\.mts$/, '.html')
        new_files.push new_file
        warn "--- Compiling #{f} -> #{new_file}"
        output = OS.run!("bun run #{f}").strip
        File.write(new_file, output)
        File.unlink(f)
      end
      new_files
    end # def

    def public_files_json
      public_files = DIR.new(BUILD.dirname).files.each_with_object({}) do |fname, memo|
        memo[FILES.key_name(fname)] = FILES.info(fname)
      end
      File.write(PUBLIC_FILES_JSON, JSON.pretty_generate(public_files))
      warn "--- Wrote: #{PUBLIC_FILES_JSON}"
    end # def

    def settings
      Dir.chdir(BUILD.dirname) do
        settings = JSON.parse File.read(SETTINGS_JSON)
        updated = false
        settings.each_key do |key|
          next unless ENV.key?(key)

          settings[key] = ENV[key]
          updated = true
        end

        new_content = JSON.pretty_generate(settings)
        if updated
          File.write SETTINGS_JSON, new_content
          warn new_content
          return true
        end

        false
      end # Dir.chdir

      puts File.join(BUILD.dirname, SETTINGS_JSON)
    end # def

    def add_etag_paths(*exts)
      return false if exts.empty?

      patterns = exts.each_with_object([]) do |raw, obj|
        raise "Invalid pattern: #{raw}" unless raw[FILES::VALID_EXT_CHARS]

        obj.concat %W[-name *#{raw} -or]
      end
      patterns.pop # get rid of trailing '-or'.

      DIR.new(BUILD.dirname).files(patterns).each do |file|
        next if FILES.html_script?(file) || FILES.built_script?(file)

        new_file = FILES.prepend_to_file_name(FILES.etag(file), file)
        puts new_file
        # File.rename(file, new_file)
      end
    end # def
  end # class << self
end # class
