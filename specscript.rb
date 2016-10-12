require 'fileutils'
require 'uri'
  File.open('public/index.html', 'w') {|file|
    file.truncate(0)
    file.puts '<html><head><script src="https://use.fontawesome.com/1bb7ea2cce.js"></script><link href="https://fonts.googleapis.com/css?family=Source+Code+Pro" rel="stylesheet"><style>body{margin:0;background: #EBEDF3;}ul{padding:0;margin:0;background: white;}li{font-family: "Source Code Pro", monospace;list-style:none;padding-right: 20px;white-space: nowrap;}li:hover{background: rgba(235, 237, 243, 0.5);}li a{color:#000;}li:hover a{color:#6299F8;}.fa{padding: 20px 0px 20px 20px;background: #2F313A;color: white;border-left: 2px solid #6299F8;width: 40px;margin-right:20px;}li:hover .fa{border-left: 2px solid #2F313A;}</style></head><body><ul>'
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

  Dir["**/*"].grep(/\.framer$/).each do |framerdir|
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
