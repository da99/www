# frozen_string_literal: true

require_relative './OS'

class FILES
  ETAG_SIZE = 8
  VALID_EXT_CHARS = /^[a-z0-9.\-_]+$/i.freeze

  class << self

    def script?(fpath)
      !!fpath[/\.mjs$/]
    end
    # Is this a file built/compiled by Bun?
    def built_script?(fpath)
      !!fpath[/-[a-zA-Z0-9]{8}\.mjs$/]
    end

    # Is this a file that ends in .html.mts?
    def html_script?(fpath)
      !!fpath[/\.html\.mts$/]
    end

    def mime_type(fname)
      raise "!!! File not found: #{fname}" unless File.exist?(fname)

      results = OS.run! %^ bun --eval "console.log(Bun.file('#{fname}').type)" ^
      case results
      when 'application/octet-stream'
        OS.run!(%(  file --mime "#{fname}" | cut -d':' -f2- | cut -d' ' -f2-  ))
      else
        results
      end
    end

    def etag(fname)
      OS.capture!(%W[md5sum #{fname}]).strip.split.first
    end

    def prepend_to_file_name(etag, path)
      return path if path[DONT_RENAME]

      pieces = path.split('/')
      last = pieces.pop
      pieces.push("#{etag[0..ETAG_SIZE]}.#{last}")
      pieces.join('/')
    end

    def key_name(filename)
      File.expand_path(filename).sub(%r{^/?(#{File.expand_path(BUILD.dirname)}|\.)/}, '')
    end

    def info(fname)
      etag = FILES.etag(fname)
      { etag: etag,
        public_path: add_etag_to_file_name(etag, FILES.key_name(fname)) }
    end

    def hours_age_of_file(filepath)
      content = OS.run!("stat -c %Y '#{filepath}'")
      ((content.to_i - NOW) / 60).to_i
    end

    def days_age_of_file(filepath)
      hours = hours_age_of_file(filepath)
      return 0 if hours < 24

      (hours / 24).to_i
    end
  end # class
end # class
