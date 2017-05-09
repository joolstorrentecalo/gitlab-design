# Use desktop cursor
document.body.style.cursor = "auto"

# Import file "27724-large-build-logs" (sizes and positions are scaled 1:2)
sketch1 = Framer.Importer.load("imported/27724-large-build-logs@2x")

sketch1.scroll_bar.visible = false

scroll = ScrollComponent.wrap(sketch1.scrollcontent)

scroll.x = 32
scroll.y = 80
scroll.width = 959 * 2
scroll.height = 1040

scroll.scrollHorizontal = false
scroll.mouseWheelEnabled = true


slider = new SliderComponent 
	width: 96, height: sketch1.log.height - 160
	y: sketch1.log.y + 160
	x: sketch1.log.width - 54
	min: 0, max: 100, value: 0
	backgroundColor: "transparant"
	clip: false

# slider.centerY()
slider.fill.backgroundColor = "transparant"

# Style the knob of the slider
slider.knob.props = 
	width: 10, height: 180
	y: 100
	backgroundColor: "rgba(255,255,255,1)"
	borderRadius: 50
	clip: false
	
# Connect the slider to the scroll event
scroll.on Events.Move, ->	
	slider.value = Utils.modulate(scroll.scrollY, [0, scroll.content.height - scroll.height], [0, 80], true)
	
updatePosition = -> 	
	scrollValue = Utils.modulate(slider.value, [0, 100], [0, scroll.content.height - scroll.height], true)
	scroller.scrollY = scrollValue

slider.onMouseDown ->
	@on "change:value", updatePosition
			
slider.onMouseUp -> 
	@off "change:value", updatePosition
	
		
	
