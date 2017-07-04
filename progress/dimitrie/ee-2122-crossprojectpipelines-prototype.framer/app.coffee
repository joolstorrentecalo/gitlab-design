# Use desktop cursor
document.body.style.cursor = "auto"

xtra = 220

outer.states =
	collapsed:
		height: 50
		y: 0
		width: 186
		x: 0
	expanded:
		height: 307
		y: 0-(201-108)
		width: 578
		x: xtra
	loading:
		height: 90

inner1.states =
	collapsed:
		height: 40
		y: 0
		width: 186
		x: 0
	expanded:
		height: 40
		y: 0-(201-108)
		width: 578
		x: xtra

inner2.states =
	collapsed:
		height: 40
		y: 0
		width: 186
		x: 0
	expanded:
		height: 258
		y: 0-(201-108)+39
		width: 578
		x: xtra
	loading:
		height: 80

name_and_status.states =
	collapsed:
		y: 9
		x: 11
	expanded:
		y: 9-(201-108)
		x: 233+xtra

caret.states =
	collapsed:
		y: 42
		scaleY: 1
		x: 92
	expanded:
		y: 206
		scaleY: -1
		x: 578-186-(7/2)-92+xtra
	loading:
		y: 82

spinner.states =
	not_loading:
		opacity: 0

other_graph.states =
	collapsed:
		x: 287
	expanded:
		x: 287+(578-186)+xtra

expanded_graph.states =
	collapsed:
		opacity: 0
		animationOptions:	
			time: 0
	expanded:
		opacity: 1
		animationOptions:
			delay: 1

upstream_upstream_collapsed_node.states =
	collapsed:
		opacity: 0
		animationOptions:	
			time: 0
	expanded:
		opacity: 1
		animationOptions:
			delay: 1.25

column_title.states =
	not_visible:
		opacity: 0
		animationOptions:	
			time: 0
	visible:
		opacity: 1
		animationOptions:
			delay: 1.25


upstream_upstream_collapsed_node.stateSwitch("collapsed")
spinner.stateSwitch("not_loading")
expanded_graph.stateSwitch("collapsed")
background_highlight.opacity = 0

# Animate the layer to the right 
outerAnimationA = new Animation outer,
	outer.states.loading
	
inner2AnimationA = new Animation inner2,
	inner2.states.loading

caretAnimationA = new Animation caret,
	caret.states.loading

spinnerAnimationA = new Animation spinner,
	opacity: 1
	options:
		delay: .5

spinnerAnimationB = new Animation spinner,
	rotation: 360*2
	options:
		curve: "linear"
		time: 2

bhanimationA = new Animation background_highlight,
	opacity: 1
	options:
		delay: 1.25

whut = "a"

outer.onClick ->
	if whut == "a"
		outerAnimationA.start()
		inner2AnimationA.start()
		caretAnimationA.start()
		spinnerAnimationA.start()
		spinnerAnimationB.start()
	if whut == "b"
		outer.animate("collapsed")
		inner1.animate("collapsed")
		inner2.animate("collapsed")
		name_and_status.animate("collapsed")
		caret.animate("collapsed")
		other_graph.animate("collapsed")
		expanded_graph.stateSwitch("collapsed")
		upstream_upstream_collapsed_node.stateSwitch("collapsed")
		whut = "a"
		background_highlight.opacity = 0
		spinner.rotation = 0

spinner.on Events.AnimationEnd, ->
	spinner.stateSwitch("not_loading")
	outer.animate("expanded")
	inner1.animate("expanded")
	inner2.animate("expanded")
	name_and_status.animate("expanded")
	caret.animate("expanded")
	other_graph.animate("expanded")
	expanded_graph.animate("expanded")
	upstream_upstream_collapsed_node.stateSwitch("expanded")
	column_title.animate("not_visible")
	bhanimationA.start()
	whut = "b"

column_title.on Events.StateSwitchEnd, (visible, not_visible) ->
    column_title.animate("visible")

outer.onMouseOver ->
	outer.backgroundColor = "#eaf3fc"
	outer.borderColor = "#d1e7fc"
	inner1.backgroundColor = "#eaf3fc"
	inner1.borderColor = "#d1e7fc"
outer.onMouseOut ->
	outer.backgroundColor = "#ffffff"
	outer.borderColor = "#e5e5e5"
	inner1.backgroundColor = "#ffffff"
	inner1.borderColor = "#e5e5e5"