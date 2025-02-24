# frozen_string_literal: true

require_relative './OS'

class FILES
  ETAG_SIZE = 8

  class << self
    def find(dir, ext = "-not -name '.*'")
      raw = OS.run! %( find "#{dir}" -type f #{ext} )
      raw.strip.split("\n")
    end # def

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
      OS.run!(%( md5sum "#{fname}" )).strip.split.first
    end

    def ext?(fname, simple_pattern)
      raise "Invalid pattern: #{simple_pattern.inspect}" unless simple_pattern[/^[a-z0-9\.\-\_]+$/i]

      fname[/#{simple_pattern}$/]
    end

    def add_etag_to_file_name(etag, path)
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
