# frozen_string_literal: true

class CLI
  class << self
    def blue(str)
      "\e[34m#{str}\e[0m"
    end

    def gray(str)
      "\e[37m#{str}\e[0m"
    end

    def bold(str)
      "\e[1m#{str}\e[22m"
    end

    def italic(str)
      "\e[3m#{str}\e[23m"
    end

    def puts(str)
      bin, cmd, *args = str.split
      $stdout.puts("#{italic bin} #{blue cmd} #{args.join ' '}")
    end
  end # class << self
end # class
