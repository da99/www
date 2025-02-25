# frozen_string_literal: true

require_relative './OS'

class DIR
  attr_reader :path

  def initialize(new_path)
    @path = new_path
  end

  def files(args = %W[-not -name '.*'])
    puts %W[find #{path} -type f].concat(args).inspect
    raw = OS.run! %W[find #{path} -type f].concat(args)
    raw.strip.split("\n")
  end

  def mts
    files %( -name '*.mts' )
  end

  def mjs
    files %( -name '*.mjs' )
  end


end # class

