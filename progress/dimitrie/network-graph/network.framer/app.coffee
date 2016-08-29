scroll = new ScrollComponent
    width: Screen.width
#     y: sketch2.height
    height: 800
    backgroundColor: '#FFF'
    
scroll.scrollHorizontal = false

# Import file "networkgraph"
sketch2 = Framer.Importer.load("imported/networkgraph@1x")
	
# Create the draggable layer
layerA = new Layer
	x: Align.center
	y: sketch2.height
	width: Screen.width
	height: 3000
	parent: scroll.content
	
layerA.style.background = "-webkit-linear-gradient(top, #000000 0%, #FFFFFF 100%)"

layerB = new Layer
	height: layerA.height
	width: 40
	y: sketch2.height
	parent: scroll.content
	backgroundColor: "#FF0000"



# sketch2.Gitlab_Header.parent = scroll.content

