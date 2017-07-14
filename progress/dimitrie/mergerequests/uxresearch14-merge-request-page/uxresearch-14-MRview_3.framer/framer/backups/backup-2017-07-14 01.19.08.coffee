# Import file "ce-32411-mr-view"
sketch = Framer.Importer.load("imported/ce-32411-mr-view@1x", scale: 1)

# Set Framer parameters
Framer.Extras.Hints.disable()
Framer.Extras.Preloader.setLogo("images/logo.png")

# Define and set custom device
device_width = 1280
device_height = 800

Framer.Device.customize
# 	deviceImageWidth: device_width + 500
# 	deviceImageHeight: device_height + 300
# 	deviceImage: "images/bg.png"
	deviceImageWidth: device_width
	deviceImageHeight: device_height
	screenWidth: device_width
	screenHeight: device_height
	deviceType: "fullScreen"
	backgroundColor: "white"
	devicePixelRatio: 1

# Use desktop cursor
document.body.style.cursor = "auto"

# Define top and sidebar components
flowsidebar = new FlowComponent
flowsidebar.width = 290
flowsidebar.height = 698
flowsidebar.y = device_height - flowsidebar.height
flowsidebar.x = device_width - flowsidebar.width

sketch.side.parent = flowsidebar

flowtopbar = new FlowComponent
flowtopbar.width = device_width
flowtopbar.height = 102

sketch.top.parent = flowtopbar

#Make content scrollable
sketch.MR.x = 0 
scrollcontent = new ScrollComponent   
	wrap: sketch.mrviewcontent
	width: device_width  - flowsidebar.width
	backgroundColor: "transparent"
	scrollHorizontal: false
	mouseWheelEnabled: true
	directionLock: true

scrollcontent.content.draggable.enabled = false

# #Sticky tabs when scrolling past part 1
sketch.tab_tabs.orgY = sketch.tab_tabs.y
# # print sketch.tab_tabs.orgY 
# 
# scrollcontent.onScroll ->
# # 	print scrollcontent.scrollY
# 	if scrollcontent.scrollY > sketch.tab_tabs.orgY
# 		sketch.mrviewcontent.removeSubLayer(sketch.tab_tabs)
# 		sketch.tab_tabs.y = 102
# 	else
# 		sketch.mrviewcontent.addSubLayer(sketch.tab_tabs)
# 		sketch.tab_tabs.y = sketch.tab_tabs.orgY

#Making the tabs work with states,content and scroll
tabarray = [sketch.discussion, sketch.commits, sketch.pipelines, sketch.changes]

tabcontentarray = [sketch.discussion_tab, sketch.commits_tab, sketch.pipelines_tab, sketch.changes_tab]

tabswitcher = (tab, index) ->
	tab.children[2].states =
		focus:
			visible: true
			saturate: 100
			opacity: 1
		hover:
			visible: true
			saturate: 0
			opacity: .5
		neutral:
			visible: true
			saturate: 50
			opacity: 0
	tab.children[3].opacity = .5
	
# 	for i,u in tabcontentarray
# 		i.parent = sketch.sidebar
# 	scrollcontent.updateContent()
	
	tab.onClick ->
		for i,u in tabcontentarray
			if u == index
				i.visible = true
# 				i.parent = sketch.tab_content
			else
				i.visible = false
# 				i.parent = sketch.sidebar
# 		scrollcontent.updateContent()
# 		print sketch.mrviewcontent.height
		scrollcontent.scrollToPoint
				y: sketch.tab_tabs.orgY + 4
		if tab.children[2].states.current.name != "focus"
			for i,u in tabarray
				if u != index
					i.children[2].stateSwitch("neutral")
		tab.children[2].stateSwitch("focus")
		if tab.children[3].opacity != 1
			for i,u in tabarray
				if u != index
					i.children[3].opacity = .5
		tab.children[3].opacity = 1
	tab.onMouseOver ->
		if tab.children[2].states.current.name != "focus"
			tab.children[2].stateSwitch("hover")
	tab.onMouseOut ->
		if tab.children[2].states.current.name != "focus"
			tab.children[2].stateSwitch("neutral")

for tab, index in tabarray
	tabswitcher(tab, index)

sketch.discussion.children[2].stateSwitch("focus")
sketch.discussion.children[3].opacity = 1

# #Making the mini status widget functional
# 
# sketch.mini_status_codequality.orgX = sketch.mini_status_codequality.x
# sketch.mini_status_mergability.orgX = sketch.mini_status_mergability.x
# sketch.underline4.orgWidth = sketch.underline4.width
# 
# sketch.merge_status.onMouseOver (event, layer) ->
# 	sketch.mini_status_codequality.animate
# 		x: sketch.mini_status_codequality.orgX + 12
# 	sketch.mini_status_mergability.animate
# 		x: sketch.mini_status_mergability.orgX + 23
# 	sketch.underline4.animate
# 		width: sketch.underline4.orgWidth + 23
# 
# sketch.merge_status.onMouseOut (event, layer) ->
# 	sketch.mini_status_codequality.animate
# 		x: sketch.mini_status_codequality.orgX
# 	sketch.mini_status_mergability.animate
# 		x: sketch.mini_status_mergability.orgX
# 	sketch.underline4.animate
# 		width: sketch.underline4.orgWidth
# 
# sketch.mini_status_pipeline.onMouseOver ->
# 	sketch.pipelinetooltip.visible = true
# sketch.mini_status_pipeline.onMouseOut ->
# 	sketch.pipelinetooltip.visible = false
# 
# sketch.mini_status_codequality.onMouseOver ->
# 	sketch.codequalitytooltip.visible = true
# sketch.mini_status_codequality.onMouseOut ->
# 	sketch.codequalitytooltip.visible = false
# 
# sketch.mini_status_mergability.onMouseOver ->
# 	sketch.mergabilitytooltip.visible = true
# sketch.mini_status_mergability.onMouseOut ->
# 	sketch.mergabilitytooltip.visible = false

# #Making the description functional
# 
# sketch.collapse_gradient.onMouseOver ->
# # 	sketch.collapse_gradient_focus.visible = true
# 	sketch.collapse_icon_focus.visible = true
# 	sketch.divider_focus.visible = true
# 
# sketch.collapse_gradient.onMouseOut ->
# # 	sketch.collapse_gradient_focus.visible = false
# 	sketch.collapse_icon_focus.visible = false
# 	sketch.divider_focus.visible = false
# 
# descext = 310
# descextender = (group) ->
# 	originalposorg = group.y
# 	group.states =
# 		collapsed:
# 			y: originalposorg
# 		expanded:
# 			y: originalposorg + descext
# 
# descextender(sketch.branches)
# descextender(sketch.award_emoji)
# descextender(sketch.tab_tabs)
# descextender(sketch.tab_content)
# 
# sketch.collapse_gradient.states =
# 	collapsed:
# 		opacity: 1
# 	expanded:
# 		opacity: 0
# 
# sketch.collapse_icon.states =
# 	collapsed:
# 		scaleY: 1
# 	expanded:
# 		scaleY: -1
# 
# sketch.collapse_icon_focus.states =
# 	collapsed:
# 		scaleY: 1
# 	expanded:
# 		scaleY: -1
# 
# sketch.collapse_gradient.onClick ->
# 	sketch.branches.stateCycle("expanded", "collapsed")
# 	sketch.award_emoji.stateCycle("expanded", "collapsed")
# 	sketch.tab_tabs.stateCycle("expanded", "collapsed")
# 	sketch.tab_content.stateCycle("expanded", "collapsed")
# 	sketch.collapse_gradient.stateCycle("expanded", "collapsed")
# 	sketch.collapse_icon.stateCycle("expanded", "collapsed")
# 	sketch.collapse_icon_focus.stateCycle("expanded", "collapsed")
# 	scrollcontent.updateContent()

#Sticky tabs when scrolling past part 2
sketch.tab_tabs.orgY = sketch.tab_tabs.y
# print sketch.tab_tabs.orgY 

scrollcontent.onScroll ->
# 	print scrollcontent.scrollY
	if sketch.branches.states.current.name != "expanded"
		if scrollcontent.scrollY > sketch.tab_tabs.orgY
			sketch.mrviewcontent.removeSubLayer(sketch.tab_tabs)
			sketch.tab_tabs.y = 102
		else
			sketch.mrviewcontent.addSubLayer(sketch.tab_tabs)
			sketch.tab_tabs.y = sketch.tab_tabs.orgY
	else
		scrollcontent.updateContent()
		if scrollcontent.scrollY > (sketch.tab_tabs.orgY + 310)
			sketch.mrviewcontent.removeSubLayer(sketch.tab_tabs)
			sketch.tab_tabs.y = 102
		else
			sketch.mrviewcontent.addSubLayer(sketch.tab_tabs)
			sketch.tab_tabs.y = sketch.tab_tabs.orgY + 310

# widget mpg tooltips
sketch.widget_build_stage.onMouseOver ->
	sketch.widget_build_tooltip.visible = true

sketch.widget_build_stage.onMouseOut ->
	sketch.widget_build_tooltip.visible = false

sketch.widget_prepare_stage.onMouseOver ->
	sketch.widget_prepare_tooltip.visible = true

sketch.widget_prepare_stage.onMouseOut ->
	sketch.widget_prepare_tooltip.visible = false

sketch.widget_test_stage.onMouseOver ->
	sketch.widget_test_tooltip.visible = true

sketch.widget_test_stage.onMouseOut ->
	sketch.widget_test_tooltip.visible = false

sketch.widget_posttest_stage.onMouseOver ->
	sketch.widget_posttest_tooltip.visible = true

sketch.widget_posttest_stage.onMouseOut ->
	sketch.widget_posttest_tooltip.visible = false

# tab1 mpg tooltips
sketch.tab1_build_stage.onMouseOver ->
	sketch.tab1_build_tooltip.visible = true
	sketch.tab1_build_tooltip.placeBefore(layerA)

sketch.tab1_build_stage.onMouseOut ->
	sketch.tab1_build_tooltip.visible = false

sketch.tab1_prepare_stage.onMouseOver ->
	sketch.tab1_prepare_tooltip.visible = true

sketch.tab1_prepare_stage.onMouseOut ->
	sketch.tab1_prepare_tooltip.visible = false

sketch.tab1_test_stage.onMouseOver ->
	sketch.tab1_test_tooltip.visible = true

sketch.tab1_test_stage.onMouseOut ->
	sketch.tab1_test_tooltip.visible = false

sketch.tab1_posttest_stage.onMouseOver ->
	sketch.tab1_posttest_tooltip.visible = true

sketch.tab1_posttest_stage.onMouseOut ->
	sketch.tab1_posttest_tooltip.visible = false