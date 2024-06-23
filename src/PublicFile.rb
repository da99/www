#!/usr/bin/env ruby
# frozen_string_literal: true

require 'json'

def run_cmd(s_cmd)
  warn "--- Running: #{s_cmd}"
  `#{s_cmd}`.strip
end

# Represents a file in the public directory.
class PublicFile
  class << self
    def all(raw_dir)
      dir = normalize_dir(raw_dir)
      PublicFile.dir_exist!(dir)
      `find #{dir} -type f`
        .strip
        .split("\n")
        .map { |l| PublicFile.new(dir, l.strip) }
    end
    # --- def

    def normalize_dir(raw)
      raw.sub(%r{^\.?/}, '')
    end

    def dir_exist!(raw)
      dir = normalize_dir(raw)
      unless Dir.exist?(dir)
        warn "!!! Directory not found: #{dir}"
        exit 1
      end
      dir
    end

    def write_raw_manifest(settings)
      static_dir = normalize_dir(settings['STATIC_DIR'])
      file_name = 'tmp/raw_files.json'
      raw = `find "#{static_dir}" -type f -not -iname '.*'`
            .strip
            .split("\n")
            .map { |x| x.sub(static_dir, '').sub(/\.html.mts$/, '.html').sub(/\.ts/, '.js').sub(/\.mts/, '.mjs') }
            .each_with_object({}) { |x, o| o[x] = x }
      `mkdir -p tmp`
      File.write(file_name, JSON.pretty_generate(raw))
      puts "=== Wrote: #{file_name}"
    end

    def manifest(raw_dir)
      dir = normalize_dir(raw_dir)
      all(dir).each_with_object({}) do |new_file, memo|
        data = {
          'local_path' => new_file.path,
          'public_path' => new_file.public_path,
          'etag' => new_file.etag[0..ETAG_SIZE],
          'created_at' => new_file.created_at,
          'mime_type' => `www mime '#{new_file.raw}'`.strip
        }

        memo[new_file.path.sub(dir, '')] = data
        memo
      end
    end

    def write_manifest(settings)
      file_path = 'public_files.json'
      public_files = manifest(File.join(settings['BUILD_DIR']))
      json = JSON.pretty_generate(public_files)
      File.write(file_path, json)
      puts "=== Wrote: #{file_path}"
    end
  end
  # --- class << self

  attr_reader :dir, :raw, :etag, :path, :created_at, :public_path

  ETAG_SIZE = 8

  def initialize(raw_dir, raw)
    @dir = PublicFile.normalize_dir(raw_dir)
    @raw = raw
    @path = raw.sub(@dir, '')
    @etag = `sha256sum "#{raw}"`.split.first
    @created_at = `stat -c "%W" "#{raw}"`.strip
    @public_path = begin
      pieces = path.split('.')
      pieces[pieces.size - 1] = "#{etag[0..ETAG_SIZE]}.#{pieces.last}"
      pieces.join('.').sub(@dir, '')
    end
  end
  # --- def

  def summary
    Hash.new(
      'path' => path,
      'dir' => dir,
      'public_path' => public_path,
      'etag' => etag
    )
  end
end
# --- class

# -----------------------------------------------------------------------------
# -----------------------------------------------------------------------------
# -----------------------------------------------------------------------------
if $PROGRAM_NAME == __FILE__
  cmd = ARGV.join(' ')
  case cmd

  when 'build mjs'
    # bun build \
    #   --target browser \
    #   --outdir "$PWD"/Public/section \
    #   --splitting \
    #   --entry-naming "[dir]/[name].mjs" \
    #   $index_mts
    # rm $index_mts

    raw_files = `find Public/section -type f -name index.mts`.strip.split("\n")
    case raw_files.size
    when 0
      warn '--- No .mts scripts found.'
    when 1
      raw = raw_files.first
      run_cmd %( bun build "#{raw}" > "#{raw.sub('.mts', '.mjs')}" )
      run_cmd %( rm "#{raw}")
    else
      run_cmd %( bun build Public/section/*/index.mts --splitting --outdir=Public/section --outbase=./ )
      raw_files.each do |x|
        run_cmd "mv #{x.sub('.mts', '.js')} #{x.sub('.mts', '.mjs')}"
        File.unlink(x)
        warn "--- File removed: #{x}"
      end
    end

  when 'update raw file manifest'
    j = JSON.parse(File.read('settings.json'))
    PublicFile.write_raw_manifest(j)

  when 'update file manifest'
    j = JSON.parse(File.read('settings.json'))
    PublicFile.write_manifest(j)

  when /^set src to (.+)$/i
    dir = 'dist'
    domain = Regexp.last_match(1)
    manifest = PublicFile.manifest(dir)
    files = `find "#{dir}" -type f -name '*.html'`.strip.split('\n')
    if files.empty?
      puts "--- No files found for: setting #{dir}"
    else
      puts "--- Setting #{dir} to https://#{domain}..."
    end
    files.each do |raw_file|
      origin = File.read(raw_file)
      new_body = origin.gsub(/(src|href)="([^"]+)"/) do |match|
        attr = Regexp.last_match(1)
        new_val = manifest[Regexp.last_match(2)]
        if new_val
          %(#{attr}="https://#{File.join domain, new_val['public_path']}")
        else
          match
        end
      end
      # ====origin.gsub
      if origin == new_body
        warn "--- Skipping: #{raw_file}"
        next
      end
      warn "=== Updated: #{raw_file}"
      File.write(raw_file, new_body)
    end
    # === files.each

  else
    warn "!!! Unknown command: #{cmd}"
    exit 1
  end
end
