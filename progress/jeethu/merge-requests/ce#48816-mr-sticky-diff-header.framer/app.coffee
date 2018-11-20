{StickyHeaders} = require "StickyHeaders"

scroll = new ScrollComponent
	scrollHorizontal: false
	x: list.x - 10
	y: list.y
	width: list.width + 10
	height: Screen.height - list.y
	clip: true
	contentInset: 
		left: 10
		bottom: 200
	mouseWheelEnabled: true

scroll.content.clip = false
	
diff1.parent = scroll.content
diff2.parent = scroll.content
diff3.parent = scroll.content
diff4.parent = scroll.content
diff5.parent = scroll.content
diff6.parent = scroll.content
	
header1.parent = scroll.content
header1.name = "StickyHeader"
header2.parent = scroll.content
header2.name = "StickyHeader"
header3.parent = scroll.content
header3.name = "StickyHeader"
header4.parent = scroll.content
header4.name = "StickyHeader"
header5.parent = scroll.content
header5.name = "StickyHeader"
header6.parent = scroll.content
header6.name = "StickyHeader"


# scroll.y = 96
# scroll.contentInset=
# 	top: -96
# 	bottom: 400
	
StickyHeaders.enableFor(scroll)