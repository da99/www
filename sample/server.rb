

require 'sinatra'

PAGE_404 = File.read('./sample/404.html')

# set :public_folder, __dir__

before do
  cache_control 'no-cache'
end

# get '/' do
#   'Put this in your pipe & smoke it!'
# end

get '/*.js' do
  pi = request.path_info
  fs = File.join('./sample', pi.sub(/\.js$/, '.mts'))
  content_type 'text/javascript;charset=utf-8'
  puts("--- Building: #{fs}")
  `bun build #{fs}`
end

get '/*.*' do
  pi = request.path_info
  case pi
  when /\.(css|html)$/
    new_file = File.join('./sample', pi)
    send_file new_file
  else
    pass
  end
end
HTML_ESCAPE = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;'
}.freeze

def html_escape(raw)
  raw.gsub(/[<>&]/) { |str| HTML_ESCAPE[str] }
end

def page_404(req)
  PAGE_404.gsub('{PATH}', html_escape(req.path_info))
end

not_found do
  if request.path_info[%r{/$}]
    new_file = File.join('./sample', request.path_info, 'index.html')
    if File.exist?(new_file)
      send_file new_file
    else
      page_404(request)
    end
  else
    page_404(request)
  end
end
