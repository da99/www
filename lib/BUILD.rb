# frozen_string_literal: true

class BUILD
  class << self
    def bucket_name
      @bucket_name ||= OS.env('BUCKET_NAME')
    end

    def dir
      @dir ||= ENV['BUILD_DIR'] || 'build'
    end

    def key_name(filename)
      filename.sub(%r{^/?(#{dir}|\.)/}, '')
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
      raw = OS.run("mc ls --no-color --recursive --json #{bucket_name}/#{bucket_name} ")
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
          OS.system(%W[
            bun x wrangler r2 object put #{File.join FILES.bucket_name, k} --file #{file} --content-type #{mime}
          ])
        end
        uploaded_files.push file
        pids.push pid
      end # each file

      Process.wait unless pids.empty?
      uploaded_files
    end # def

    def download_pure_css(dir)
      FileUtils.mkdir_p dir
      Dir.chdir(dir) do
        break false if File.exist?('pure.css') && days_age_of_file('pure.css') < 30

        OS.system(%w[wget -O pure.css https://cdn.jsdelivr.net/npm/purecss@latest/build/base-min.css])
        OS.system(%w[wget -O pure-grids.css https://cdn.jsdelivr.net/npm/purecss@3.0.0/build/grids-responsive-min.css])
        OS.system(%w[wget -O reset.css https://meyerweb.com/eric/tools/css/reset/reset.css])
        OS.system('ls -hal')
        true
      end # Dir
    end # def

    def ensure_in_build_dir(raw_filename)
      expanded = File.expand_path(raw_filename)

      temp_path = expanded.sub(File.expand_path(BUILD_DIR), '')
      raise "!!! Invalid file: #{raw_filename}" if expanded == temp_path

      File.join(BUILD_DIR, temp_path)
    end # def

    def scripts_list
      OS.run(%(find "#{dir}" -type f -not -path '*/base/*' -and -name '*.mts' -and -not -name '*.html.mts'))
        .strip.split("\n")
    end

    def scripts(bun_files = FILES.scripts)
      if bun_files.empty?
        warn '--- No .mts files found.'
        return false
      end

      warn "--- TS files: #{bun_files.inspect}"
      OS.system(
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

    def static(files = FILES.find(BUILD_DIR))
      mts_files = []
      new_files = []
      files.each do |raw_file|
        case raw_file
        when %r{section/base/.+\.css$}
          new_files.push raw_file
          next

        when %r{section/base/.+\.mts$}
          new_files.push raw_file
          next

        when /\.html\.mts$/
          new_file = raw_file.sub(/\.html\.mts$/, '.html')
          new_files.push new_file
          warn "--- Compiling #{raw_file} -> #{new_file}"
          output = `bun run #{raw_file}`.strip
          exit 2 unless $CHILD_STATUS.success?
          File.write(new_file, output)
          File.unlink(raw_file)

        when %r{section/.+\.css$}
          warn "--- Compiling #{raw_file}"
          tmp_file = "#{raw_file}.tmp"
          OS.system(%( bun x lightningcss --minify --bundle #{raw_file} -o #{tmp_file} ))
          new_files.push raw_file
          File.rename(tmp_file, raw_file)

        when /\.mts$/
          mts_files.push raw_file
        end # case
      end # each

      return new_files if mts_files.empty?

      new_files.concat build_scripts(mts_files)
    end # def static_build

    def public_files_json
      public_files = FILES.find(BUILD_DIR).each_with_object({}) do |fname, memo|
        memo[FILES.key_name(fname)] = FILES.info(fname)
      end
      File.write(PUBLIC_FILES_JSON, JSON.pretty_generate(public_files))
      warn "--- Wrote: #{PUBLIC_FILES_JSON}"
    end # def
  end # class << self
end # class
