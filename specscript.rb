require 'fileutils'
require 'uri'
  File.open('public/index.html', 'w') {|file|
    file.truncate(0)
    file.puts "<html><body><ul>"
  }
# Dir.glob('*').select {|f| File.directory?(f) }.each do |dir|
  Dir["**/*"].grep(/spec-previews$/).each do |specdir|
    next unless File.directory?(specdir)
    dest = 'public/' + specdir
    FileUtils.mkdir_p dest
    src = specdir + '/.'
    FileUtils.cp_r src, dest, :verbose => true
    open('public/index.html', 'a+') { |f|
      url = URI.escape(specdir)
      html = '<li><a href="' + url + '">' + specdir + '</a></li>'
      f.puts html
    }
  end

  File.open('public/index.html', 'a+') {|file|
    file.puts "</ul></body></html>"
  }
# end
