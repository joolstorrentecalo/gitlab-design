require 'fileutils'
require 'uri'
  File.open('public/index.html', 'w') {|file|
    file.truncate(0)
    file.puts '<html><head><script src="https://use.fontawesome.com/1bb7ea2cce.js"></script><link href="https://fonts.googleapis.com/css?family=Source+Code+Pro" rel="stylesheet"><style>body{margin:0;}ul{padding:0;margin:0;margin-top}li{font-family: "Source Code Pro", monospace;list-style:none;padding:20px;}li a{color:}</style></head><body><ul>'
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
      html = '<li class="spec"><i class="fa fa-arrows" aria-hidden="true"></i><a href="' + url + '">' + specdir + '</a></li>'
      f.puts html
    }
  end

  Dir["**/*"].grep(/.framer$/).each do |framerdir|
    next unless File.directory?(framerdir)
    dest = 'public/' + framerdir
    FileUtils.mkdir_p dest
    src = framerdir + '/.'
    FileUtils.cp_r src, dest, :verbose => true
    open('public/index.html', 'a+') { |f|
      url = URI.escape(framerdir)
      html = '<li class="framer"><i class="fa fa-cogs" aria-hidden="true"></i><a href="' + url + '">' + framerdir + '</a></li>'
      f.puts html
    }
  end

  File.open('public/index.html', 'a+') {|file|
    file.puts "</ul></body></html>"
  }
# end
