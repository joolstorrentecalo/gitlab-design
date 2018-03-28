# This template makes use of a sketch file. Please use this as a starting point to build your prototype!

# Sketch import
# Import sketch file @2x, scale: 1

# Import file "starting-template"
sketch = Framer.Importer.load("imported/starting-template@2x", scale: 1)

# This template includes the material modules https://github.com/k-vyn/framer-material-kit

# Module import

# Place here your module imports

# Some default desktop specific configuration options

# Device setup

# Use desktop cursor
document.body.style.cursor = "auto"

Framer.Device.deviceType = "fullscreen"

Framer.Device.background.backgroundColor = "white"

# GitLab specific Framer Cloud configuration. Add "/index.html" at the end of the shared url to only show the prototype without the framer sidebar

# Framer online environment setup

Framer.Extras.Hints.disable()
Framer.Extras.Preloader.setLogo("https://gitlab.com/gitlab-com/gitlab-artwork/raw/master/logo/logo.png")

# This template includes flow prototype functionality by default!

# Pageview creation
pageview = new PageComponent
	height: Screen.height
	width: Screen.width

# Disable page component drag ability
pageview.content.draggable.enabled = false

# Global variables to be used in functions and one time definitions

### Variables ###

timing = .3

# Functions to use, includes vertical constraint and hide/show functions

### Functions ###

# Vertical constraint function
constraint = (firstLayer, secondLayer, offset = 0) ->
	secondLayer.onChange "height", ->
		firstLayer.y = secondLayer.y + secondLayer.height
	secondLayer.onChange "y", ->
		firstLayer.y = secondLayer.y + secondLayer.height + offset

# Hide and Show section function
hideshow = (layer, visible = true, transition = true) ->
	layer.clip = true
	originallayerheight = layer.height
	if transition is true
		layer.states =
			state_show:
				height: originallayerheight
				opacity: 1
				animationOptions:
					time: timing
			state_hide:
				height: 0
				opacity: 0
				animationOptions:
					time: timing
	else
		layer.states =
			state_show:
				height: originallayerheight
				animationOptions:
					time: 0
			state_hide:
				height: 0
				animationOptions:
					time: 0
	if visible is true
		layer.stateSwitch("state_show")
	else
		layer.stateSwitch("state_hide")

### PROTOTYPE SPECIFIC CONFIGURATION ###

# Your prototype specific configuration should live inside view1. You can create more views if needed which can be easily navigated towards as in a flow prototype.

# View1

# --- Page general setup --- #

view1 = new Layer
	height: Screen.height
	width: Screen.width

view1scroll = new ScrollComponent
	x: 0
	y: 0
	width: Screen.width
	height: Screen.height
	backgroundColor: "white"
	mouseWheelEnabled: true
	mouseWheelSpeedMultiplier: 0.4
	scrollHorizontal: false
	parent: view1

view1artboard = sketch.view1

view1artboard.x = 0
view1artboard.parent = view1scroll.content

# --- Page specific setup --- #



# --- Next screen functionality --- #

pageview.addPage(view1, "right")

# [element to click on to go to next view].onClick ->
# 	pageview.snapToPage(view2, false)

# This defines the view it starts at

# Pageview starting position
pageview.snapToPage(view1)
