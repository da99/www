# frozen_string_literal: true

require 'open3'

class OS
  class << self
    def env!(key)
      ENV.key?(key) || raise("!!! Env key not found: #{key}")
      ENV[key]
    end

    def flatten_cmd(*raw)
      args = raw.flatten
      if args.size == 1 && args.first.is_a?(String)
        args.first.split
      else
        args
      end
    end

    def system!(*raw)
      cmd = flatten_cmd(raw)
      result = Kernel.system(*cmd)
      return result if $CHILD_STATUS.success?

      warn "!!! Failed: #{cmd.inspect}"
      warn "!!! Failed with exit: #{$CHILD_STATUS.exitstatus}"
      exit $CHILD_STATUS.exitstatus
    end

    def capture!(*raw)
      cmd = flatten_cmd(raw)
      content, err, stat = Open3.capture3(*cmd)
      warn err if err && !err.empty?
      return content.strip if stat.success?

      puts content.strip
      warn "!!! Failed with exit #{stat.exitstatus}: #{cmd.inspect}"
      exit stat.exitstatus
    end

    def run!(*raw)
      warn "--- #{raw.flatten.join ' '}"
      capture!(*raw)
    end
  end # class << self
end # class
