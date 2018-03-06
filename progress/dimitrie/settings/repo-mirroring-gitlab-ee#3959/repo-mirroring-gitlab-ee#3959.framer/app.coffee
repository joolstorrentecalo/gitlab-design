# This template makes use of a sketch file. Please use this as a starting point to build your prototype!

# Sketch import
# Import sketch file @2x, scale: 1

# Import file "repo-mirroring-gitlab-ee#3959"
sketch = Framer.Importer.load("imported/repo-mirroring-gitlab-ee%233959@2x", scale: 1)

# This template includes the material modules https://github.com/k-vyn/framer-material-kit

# Module import
m = require "material-kit"

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
