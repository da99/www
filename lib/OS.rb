# frozen_string_literal: true

require 'open3'

class OS
  class << self
    def env!(key)
      ENV.key?(key) || raise("!!! Env key not found: #{key}")
      ENV[key]
    end

    def sanitize_cmd(raw)
      args = raw.flatten
      return args.first.split if args.size == 1

      args
    end

    def system!(*raw)
      cmd = sanitize_cmd(raw)
      warn "--- #{cmd.inspect}"
      result = Kernel.system(*cmd)
      return result if $CHILD_STATUS.success?

      warn "!!! Failed with exit #{$CHILD_STATUS.exitstatus}"
      exit $CHILD_STATUS.exitstatus
    end

    def run!(*cmd)
      warn "--- #{cmd.join ' '}"
      content, err, stat = Open3.capture3(*cmd)
      warn err if err && !err.empty?
      return content.strip if stat.success?

      puts content.strip
      warn "!!! Failed with exit #{stat.exitstatus}: #{cmd.inspect}"
      exit stat.exitstatus
    end
  end # class << self
end # class
