# Define custom device
Framer.DeviceView.Devices["custom"] =
	"deviceType": "desktop"
	"screenWidth": 720
	"screenHeight": 1000

# Set custom device
Framer.Device.deviceType = "custom"



Screenshot_2016_06_28_13_00_36 = new Layer
	width: 319*2
	height: 105*2
	image: "images/Screenshot 2016-06-28 13.00.36.png"

layerA = new Layer
	height: 64
	x: 432
	width: 152
	y: 78
	borderRadius: 6
	backgroundColor: "#38ae67"
	borderColor: "#2faa60"
	borderWidth: 2
	opacity: 1
	z: 1

layerB = new Layer
	x: 408
	y: 64
	height: 93
	backgroundColor: "rgba(255,255,255,1)"

layerA.html = "<span style='color:#fff'>New issue</span>"

layerA.style =
    "padding": "15px",
    "font-size": "27px",
    "font-family": "Source Sans Pro",
    "font-weight": "600"
    "overflow": "hidden"
    "white-space":"nowrap"
    
# Rotate on click
layerA.onMouseOver ->
	layerA.animate
		properties:
			backgroundColor: "#2faa60",
			borderColor: "#2ca05b"
		curve: "spring(250,25,0)"
layerA.onMouseOut ->
	layerA.animate
		properties:
			backgroundColor: "#38ae67",
			borderColor: "#2faa60"
			
		curve: "spring(250,25,0)"

myVar = 120

layerA.onClick ->
	layerA.animate
		properties:
			width: 152 + myVar
			x: 432 - myVar
			backgroundColor: "#ff5f00"
			borderColor: "#d85100"
		curve: "spring(250,25,0)"
	layerA.html = "<span style='color:#fff'>You are not signed in</span>"
	
layerA.on Events.AnimationEnd, (animation) ->
	layerA.html = "<span style='color:#fff'>Sign in</span>"
	layerA.animate
		properties: 
			backgroundColor: "#2faa60",
			borderColor: "#2ca05b"
			width: 112
			x: 474
		curve: "spring(250,25,0)"
	
animatieclick = new Animation
	html: "<span style='color:#fff'>You are not signed in</span>",
    layer: layerA
	properties:
		width: 152 + myVar
		x: 432 - myVar
		backgroundColor: "#ff5f00"
		borderColor: "#d85100"
	curve: "spring(250,25,0)"

layerA.onClick ->
	animatieclick.start()