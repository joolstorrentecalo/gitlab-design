# Project Info
# This info is presented in a widget when you share.
# http://framerjs.com/docs/#info.info

Framer.Info =
	title: ""
	author: "Dimitrie Hoekstra"
	twitter: ""
	description: ""


# Import file "buttonglow"
sketch = Framer.Importer.load("imported/buttonglow@1x")

document.body.style.cursor = "auto"

sketch.orange_primary_button_default.x = 100
sketch.orange_primary_button_default.y = 100

sketch.orange_primary_button_default.borderRadius = 3
sketch.orange_primary_button_default.shadowSpread = 0
sketch.orange_primary_button_default.shadowColor = "#FDD9C5"

# Animations

sketch.orange_primary_button_default.onMouseOver ->
	sketch.orange_primary_button_default.animate
		shadowSpread: 5
		options:
			curve: "spring"
			
sketch.orange_primary_button_default.onMouseOut ->
	sketch.orange_primary_button_default.animate
		shadowSpread: 0
		options:
			curve: "spring"