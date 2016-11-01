# Project Info
# This info is presented in a widget when you share.
# http://framerjs.com/docs/#info.info

Framer.Info =
	title: ""
	author: "Dimitrie Hoekstra"
	twitter: ""
	description: ""


# Import file "pipelines"
sketch = Framer.Importer.load("imported/pipelines@1x")

# Normal cursor
document.body.style.cursor = "auto"

# node dropdown
sketch.DROPDOWN.opacity = 0


layers = [sketch.dothover, sketch.dothover_copy, sketch.dothover_copy_2, sketch.dothover_copy1, sketch.dothover_copy2, sketch.dothover_copy3, sketch.Hover]
for i in layers
	i.opacity = 0

sketch.dothover.onMouseOver ->
	sketch.dothover.animate
		opacity: 1
		options:
			curve: "spring"

sketch.dothover.onMouseOut ->
	sketch.dothover.animate
		opacity: 0
		options:
			curve: "spring"
			
sketch.dothover.onClick ->
	sketch.DROPDOWN.animate
		opacity: 1
		options:
			curve: "spring"

# sketch.DROPDOWN.onClick ->
# 	sketch.DROPDOWN.animate
# 		opacity: 0
# 		options:
# 			curve: "spring"
			
sketch.Hover.onMouseOver ->
	sketch.Hover.animate
		opacity: 1
		options:
			curve: "spring"

sketch.Hover.onMouseOut ->
	sketch.Hover.animate
		opacity: 0
		options:
			curve: "spring"