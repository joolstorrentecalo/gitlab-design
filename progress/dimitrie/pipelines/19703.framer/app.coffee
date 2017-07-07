# Project Info
# This info is presented in a widget when you share.
# http://framerjs.com/docs/#info.info

Framer.Info =
	title: ""
	author: "Dimitrie Hoekstra"
	twitter: ""
	description: ""


# Import file "19703_prototype"
sketch = Framer.Importer.load("imported/19703_prototype@1x")

# Normal Cursor
document.body.style.cursor = "auto"

# First
sketch.achtergrond.visible = false
sketch.caret.opacity = 0
thing2 = new Layer
	height: 44
	width: 44
	borderRadius: 22
	borderWidth: 2
	borderColor: "#D22852"
	backgroundColor: "#FFFFFF"
	index: 1
	parent: sketch.stage
	y: 0

sketch.stage.onMouseOver ->
	thing2.animate
		width: thing2.width + 22
		options:
			curve: "spring"
	sketch.caret.animate
		opacity: 1
		options:
			curve: "spring"
			delay: .2

sketch.stage.onMouseOut ->
	thing2.animate
		width: thing2.width - 22
		backgroundColor: "#FFFFFF"
		options:
			curve: "spring"
	sketch.caret.animate
		opacity: 0
		options:
			time: 0

sketch.stage.onMouseDown ->
	thing2.animate
		backgroundColor: "#FDF2F5"
		options:
			curve: "spring"

# second

sketch.caret1.x = sketch.caret1.x - 30
sketch.caret1.saturate = 0
sketch.thing.visible = false
sketch.circle.visible = false
thing1 = new Layer
	height: 44
	width: 44
	borderRadius: 22
	borderWidth: 2
	borderColor: "#E5E5E5"
	backgroundColor: "#FFFFFF"
	index: 1
	parent: sketch.stage1
	
circle1 = new Layer
	height: 44
	width: 44
	borderRadius: 22
	borderWidth: 2
	borderColor: "#D22852"
	backgroundColor: "#FFFFFF"
	index: 3
	parent: sketch.stage1

sketch.stage1.onMouseOver ->
	sketch.caret1.animate
		x: sketch.caret1.x + 30
		options:
			curve: "spring"
	thing1.animate
		width: thing1.width + 24
		options:
			curve: "spring"
	circle1.animate
		backgroundColor: "#FDF2F5"
		options:
			curve: "spring"

sketch.stage1.onMouseOut ->
	sketch.caret1.animate
		x: sketch.caret1.x - 30
		options:
			curve: "spring"
	thing1.animate
		width: thing1.width - 24
		borderColor: "#E5E5E5"
		backgroundColor: "FFFFFF"
		options:
			curve: "spring"
	sketch.caret1.animate
		saturate: 0
		options:
			curve: "spring"
			delay: 1
	circle1.animate
		backgroundColor: "#FFFFFF"
		options:
			curve: "spring"

sketch.stage1.onMouseDown ->
	sketch.caret1.animate
		saturate: 100
		options:
			curve: "spring"
	thing1.animate
		borderColor: "#D22852"
		backgroundColor: "FDF2F5"
		options:
			curve: "spring"

sketch.background.visible = false
sketch.carettje.x = sketch.carettje.x - 30
sketch.carettje.saturate = 0
thing3 = new Layer
	height: 44
	width: 44
	borderRadius: 22
	borderWidth: 2
	borderColor: "#E5E5E5"
	backgroundColor: "#FFFFFF"
	index: 0
	parent: sketch.stage2
	
circle2 = new Layer
	height: 44
	width: 44
	borderRadius: 22
	borderWidth: 2
	borderColor: "#D22852"
	backgroundColor: "#FFFFFF"
	index: 2
	parent: sketch.stage2

sketch.stage2.onMouseOver ->
	sketch.carettje.animate
		x: sketch.carettje.x + 38
		options:
			curve: "spring"
	thing3.animate
		width: thing3.width + 24
		options:
			curve: "spring"
	circle2.animate
		backgroundColor: "#FDF2F5"
		options:
			curve: "spring"

sketch.stage2.onMouseOut ->
	sketch.carettje.animate
		x: 10
		options:
			curve: "spring"
	thing3.animate
		width: 44
		borderColor: "#E5E5E5"
		backgroundColor: "FFFFFF"
		options:
			curve: "spring"
	sketch.carettje.animate
		saturate: 0
		options:
			curve: "spring"
			delay: 1
	circle2.animate
		backgroundColor: "#FFFFFF"
		options:
			curve: "spring"
	circle2.animate
		opacity: 1
		options:
			time: 0

sketch.stage2.onMouseDown ->
	sketch.carettje.animate
		saturate: 100
		options:
			curve: "spring"
	thing3.animate
		borderColor: "#D22852"
		backgroundColor: "FDF2F5"
		options:
			curve: "spring"
	circle2.animate
		opacity: 0
		options:
			curve: "spring"
	thing3.animate
		width: 44 + 22
		options:
			curve: "spring"
	sketch.carettje.animate
		x: sketch.carettje.x - 8
		saturate: 100
		options:
			curve: "spring"

