

require 'sinatra'

# set :public_folder, __dir__

before do
  cache_control 'no-cache'
end

get '/' do
  'Put this in your pipe & smoke it!'
end

get '/*.js' do
  pi = request.path_info
  fs = File.join('./sample', pi.sub(/\.js$/, '.mts'))
  content_type 'text/javascript;charset=utf-8'
  `bun build #{fs}`
end

get '/*' do
  pi = request.path_info
  case pi
  when /\.(png|gif|ico|js|css|html)$/
    new_file = File.join('./sample', pi)
    puts "--- Sending file: #{new_file}"
    send_file new_file
  else
    pass
  end
end
