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

### Variables ###

timing = .3

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

### Text fields ###

# Git repository URL field
gitrepositoryurl = new TextLayer
	fontSize: 14
	x: 29
	y: 49
	parent: sketch.section_repo_url

gitrepositoryurl.states =
	state_placeholder:
		text: "Input your repository url"
		color: "#949494"
		animationOptions:
			time: timing
	state_https:
		text: "https://gitlab.com/gitlab-org/gitlab-ce.git"
		color: "#2e2e2e"
		animationOptions:
			time: timing
	state_ssh:
		text: "ssh://git@gitlab.com:gitlab-org/gitlab-ce.git"
		color: "#2e2e2e"
		animationOptions:
			time: timing

gitrepositoryurl.stateSwitch("state_placeholder")

sketch.repourlinput.onClick ->
	gitrepositoryurl.stateCycle("state_placeholder","state_https","state_ssh")

# Authentication method field
authenticationmethod = new TextLayer
	fontSize: 14
	x: 29
	y: 37
	color: "#2e2e2e"
	parent: sketch.section_authentication_method

authenticationmethod.states =
	state_noauth:
		text: "No authentication"
		animationOptions:
			time: timing
	state_usernamepasswordauth:
		text: "Username and password"
		animationOptions:
			time: timing
	state_sshauth:
		text: "SSH public key"
		animationOptions:
			time: timing

authenticationmethod.stateSwitch("state_noauth")

sketch.authenticationinput.onClick ->
	if gitrepositoryurl.states.current.name is "state_placeholder"
		authenticationmethod.stateCycle("state_noauth")	
	if gitrepositoryurl.states.current.name is "state_https"
		authenticationmethod.stateCycle("state_noauth","state_usernamepasswordauth")
	if gitrepositoryurl.states.current.name is "state_ssh"
		authenticationmethod.stateCycle("state_usernamepasswordauth","state_sshauth")

sketch.repourlinput.onClick ->
	if gitrepositoryurl.states.current.name is "state_placeholder"
		authenticationmethod.animate("state_noauth")
	if gitrepositoryurl.states.current.name is "state_https"
		authenticationmethod.animate("state_noauth")
	if gitrepositoryurl.states.current.name is "state_ssh"
		authenticationmethod.animate("state_sshauth")

# Mirror direction field
mirrordirection = new TextLayer
	fontSize: 14
	x: 29
	y: 39
	color: "#2e2e2e"
	parent: sketch.section_mirror_direction

mirrordirection.states =
	state_push:
		text: "Push"
	state_pull:
		text: "Pull"

mirrordirection.stateSwitch("state_push")

sketch.mirrordirectioninput.onClick ->
	mirrordirection.stateCycle("state_push","state_pull")

### Constraints ###

constraint(sketch.section_username_password, sketch.section_authentication_method)
constraint(sketch.section_ssh, sketch.section_username_password)
constraint(sketch.section_hostkeys, sketch.section_ssh)
constraint(sketch.section_fingerprints, sketch.section_hostkeys)
constraint(sketch.section_host_keys_manual_input, sketch.section_fingerprints)
constraint(sketch.section_mirror_direction, sketch.section_host_keys_manual_input)
constraint(sketch.section_trigger_pipelines, sketch.section_mirror_direction)
constraint(sketch.section_footer, sketch.section_trigger_pipelines)
constraint(sketch.results, sketch.section_footer, 16)

### Make sections collapsable/expandable ###

hideshow(sketch.section_authentication_method, false)
hideshow(sketch.section_username_password, false)
hideshow(sketch.section_ssh, false)
hideshow(sketch.section_hostkeys, false)
hideshow(sketch.section_fingerprints, false)
hideshow(sketch.section_host_keys_manual_input, false)
hideshow(sketch.section_trigger_pipelines, true)

# Button
hideshow(sketch.button_expand, true, false)
hideshow(sketch.button_collapse, false, false)

### Interaction functionality ###

sketch.repourlinput.onClick ->
	if gitrepositoryurl.states.current.name is "state_placeholder"
		sketch.section_authentication_method.animate("state_hide")
		sketch.section_ssh.animate("state_hide")
		sketch.section_hostkeys.animate("state_hide")
		sketch.section_fingerprints.animate("state_hide")
		sketch.section_host_keys_manual_input.animate("state_hide")
		sketch.section_username_password.animate("state_hide")
	if gitrepositoryurl.states.current.name is "state_https"
		sketch.section_authentication_method.animate("state_show")
		sketch.section_ssh.animate("state_hide")
		sketch.section_hostkeys.animate("state_hide")
		sketch.section_fingerprints.animate("state_hide")
		sketch.section_host_keys_manual_input.animate("state_hide")
		sketch.section_username_password.animate("state_hide")
	if gitrepositoryurl.states.current.name is "state_ssh"
		sketch.section_authentication_method.animate("state_show")
		sketch.section_ssh.animate("state_show")
		sketch.section_hostkeys.animate("state_show")
		sketch.section_username_password.animate("state_hide")

sketch.authenticationinput.onClick ->
	if authenticationmethod.states.current.name is "state_noauth"
		sketch.section_ssh.animate("state_hide")
		sketch.section_hostkeys.animate("state_hide")
		sketch.section_fingerprints.animate("state_hide")
		sketch.section_host_keys_manual_input.animate("state_hide")
		sketch.section_username_password.animate("state_hide")
	if authenticationmethod.states.current.name is "state_usernamepasswordauth"
		sketch.section_ssh.animate("state_hide")
		sketch.section_username_password.animate("state_show")
		if gitrepositoryurl.states.current.name is "state_ssh"
			sketch.section_hostkeys.animate("state_show")
# 			sketch.section_fingerprints.animate("state_hide")
# 			sketch.section_host_keys_manual_input.animate("state_hide")
		if gitrepositoryurl.states.current.name is "state_https"
			sketch.section_hostkeys.animate("state_hide")
			sketch.section_fingerprints.animate("state_hide")
			sketch.section_host_keys_manual_input.animate("state_hide")
	if authenticationmethod.states.current.name is "state_sshauth"
		sketch.section_username_password.animate("state_hide")
		sketch.section_ssh.animate("state_show")
		sketch.section_hostkeys.animate("state_show")

sketch.button_detect.onClick ->
	sketch.section_fingerprints.animate("state_show")
	sketch.section_host_keys_manual_input.animate("state_hide")
	sketch.button_collapse.animate("state_hide")
	sketch.button_expand.animate("state_show")

sketch.button_expand.onClick ->
	sketch.button_expand.animate("state_hide")
	sketch.button_collapse.animate("state_show")
	sketch.section_host_keys_manual_input.animate("state_show")
	sketch.section_fingerprints.animate("state_hide")

sketch.button_collapse.onClick ->
	sketch.button_collapse.animate("state_hide")
	sketch.button_expand.animate("state_show")
	sketch.section_host_keys_manual_input.animate("state_hide")
	sketch.section_fingerprints.animate("state_hide")

# authenticationmethod.onChange "states.current.name", ->
# 	if authenticationmethod.states.current.name is "state_ssh"
# 		
	

# sketch.section_authentication_method.onClick ->
# 	sketch.section_username_password.stateCycle("state_show","state_hide")








sketch.mirrordirectioninput.onClick ->
	sketch.section_trigger_pipelines.stateCycle("state_show","state_hide")

# --- Next screen functionality --- #

pageview.addPage(view1, "right")

# [element to click on to go to next view].onClick ->
# 	pageview.snapToPage(view2, false)

# This defines the view it starts at

# Pageview starting position
pageview.snapToPage(view1)
