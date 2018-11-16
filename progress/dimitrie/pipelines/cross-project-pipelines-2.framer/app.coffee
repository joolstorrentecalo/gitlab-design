document.body.style.cursor = "auto"
Framer.Device.deviceType = "fullscreen"
Framer.Device.background.backgroundColor = "white"
Framer.Extras.Hints.disable()
Framer.Extras.Preloader.setLogo("https://gitlab.com/gitlab-com/gitlab-artwork/raw/master/logo/logo.png")

# Import file "ee#2122-crossprojectpipelines"
sketch = Framer.Importer.load("imported/ee%232122-crossprojectpipelines@2x", scale: 1)

# supergraphorigin = sketch.supergraph.minX

# Create a new ScrollComponent 
scroll = ScrollComponent.wrap(sketch.supergraph)
scroll.scrollVertical = false
scroll.mouseWheelEnabled = true
scroll.speedX = 0.1
# scroll.backgroundColor = "#ff0000"
# scroll.scrollX = -850
scroll.height = 1000

scroll.contentInset =
	left: 768
	right: 185

scroll.scrollToPoint(
	x: 768
	false
	curve: Bezier.ease
)

# if scroll.scrollX > 768
# 	scroll.animate
# 		scrollX: 768

sketch.graph2.opacity = 0
sketch.dsloading.opacity = 0
sketch.downstream.opacity = 0
sketch.dsclickbg.opacity = 0
sketch.dsclickbghover.opacity = 0

sketch.usloading.opacity = 0
sketch.upstream.opacity = 0
sketch.usclickbg.opacity = 0
sketch.usclickbghover.opacity = 0

sketch.graph.animate
	opacity: 0
	options:
		time: 1.5
		repeat: 1

sketch.graph.on Events.AnimationEnd, ->
	sketch.graph2.animate
		opacity: 1

sketch.dsclick.onMouseOver ->
	sketch.dsclickbghover.opacity = 1

sketch.dsclick.onMouseOut ->
	sketch.dsclickbghover.opacity = 0
	
sketch.usclick.onMouseOver ->
	sketch.usclickbghover.opacity = 1

sketch.usclick.onMouseOut ->
	sketch.usclickbghover.opacity = 0

sketch.dsclick.onClick ->
	if sketch.dsclickbg.opacity is 0 
		sketch.dsloading.animate
			opacity: 1
			options:
				time: 1.5
				repeat: 1
		sketch.dsclickbg.opacity = 1
		sketch.dschevron.rotationZ = 180
	# 	sketch.supergraph.animate
	# 		x: -800
		scroll.scrollToPoint(
			x: 1040
			true
			curve: Bezier.ease
		)
	else
		sketch.dsloading.opacity = 0
		sketch.dsclickbg.opacity = 0
		sketch.dschevron.rotationZ = 0
		sketch.downstream.animate
			opacity: 0
	# 	sketch.supergraph.animate
	# 		x: -800
		scroll.scrollToPoint(
			x: 768
			true
			curve: Bezier.ease
		)

sketch.dsloading.on Events.AnimationEnd, ->
	sketch.downstream.animate
		opacity: 1
# 	sketch.supergraph.animate
# 		x: -1553
	scroll.scrollToPoint(
		x: 1790
		true
		curve: Bezier.ease
	)

sketch.usclick.onClick ->
	if sketch.usclickbg.opacity is 0 
		sketch.usloading.animate
			opacity: 1
			options:
				time: 1.5
				repeat: 1
		sketch.usclickbg.opacity = 1
		sketch.uschevron.rotationZ = 180
	# 	sketch.supergraph.animate
	# 		x: -275
		scroll.scrollToPoint(
			x: 510
			true
			curve: Bezier.ease
		)
	else
		sketch.usloading.opacity = 0
		sketch.usclickbg.opacity = 0
		sketch.uschevron.rotationZ = 0
		sketch.upstream.animate
			opacity: 0
	# 	sketch.supergraph.animate
	# 		x: -275
		scroll.scrollToPoint(
			x: 768
			true
			curve: Bezier.ease
		)

sketch.usloading.on Events.AnimationEnd, ->
	sketch.upstream.animate
		opacity: 1
# 	sketch.supergraph.animate
# 		x: 239
	scroll.scrollToPoint(
		x: 0
		true
		curve: Bezier.ease
	)


