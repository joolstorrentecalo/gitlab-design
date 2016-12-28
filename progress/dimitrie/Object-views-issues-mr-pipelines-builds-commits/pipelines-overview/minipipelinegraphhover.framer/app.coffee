# Project Info
# This info is presented in a widget when you share.
# http://framerjs.com/docs/#info.info

Framer.Info =
	title: ""
	author: "Dimitrie Hoekstra"
	twitter: ""
	description: ""

document.body.style.cursor = "auto"

# Import file "minipipelinegraphhover"
sketch = Framer.Importer.load("imported/minipipelinegraphhover@1x")

sketch.bg.originX = 0.2
sketch.bg.scaleX = .2
sketch.bg.scaleY = .9
sketch.num.x = sketch.num.x - 25
sketch.num.opacity = 0

# # Rotate on click
sketch.iconfull.onMouseOver ->
	sketch.bg.animate
		scaleX: 1
		scaleY: 1
		options:
			curve: "spring"
	sketch.num.animate
		x: sketch.num.x + 25
		opacity: 1
		options:
			curve: "spring"

sketch.iconfull.onMouseOut ->
	sketch.bg.animate
		scaleX: .2
		scaleY: .9
		options:
			curve: "spring"
	sketch.num.animate
		x: sketch.num.x - 25
		opacity: 0
		options:
			curve: "spring"
			
sketch.bg1.originX = 0.2
sketch.bg1.scaleX = .2
sketch.bg1.scaleY = .9
sketch.caret.x = sketch.caret.x - 25
sketch.caret.opacity = 0

# # Rotate on click
sketch.iconhalf.onMouseOver ->
	sketch.bg1.animate
		scaleX: 1
		scaleY: 1
		options:
			curve: "spring"
	sketch.caret.animate
		x: sketch.caret.x + 25
		opacity: 1
		options:
			curve: "spring"

sketch.iconhalf.onMouseOut ->
	sketch.bg1.animate
		scaleX: .2
		scaleY: .9
		options:
			curve: "spring"
	sketch.caret.animate
		x: sketch.caret.x - 25
		opacity: 0
		options:
			curve: "spring"



