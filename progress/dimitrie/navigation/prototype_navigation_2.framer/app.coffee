#Modules
{ distributeLayers } = require "distributeLayers"

# Define and set custom device
device_width = 1280
device_height = 800

Framer.Defaults.Layer.force2d = true

Framer.Extras.ShareInfo.disable()
Framer.Extras.Hints.disable()
Framer.Extras.Preloader.setLogo("https://gitlab.com/gitlab-com/gitlab-artwork/raw/master/logo/logo.png")


Framer.Device.customize
	screenWidth: device_width
	screenHeight: device_height

all_content = new Layer
	width: device_width
	height: device_height

# Use desktop cursor
document.body.style.cursor = "auto"



# Import sketch file "prototype_navigation"
sketch = Framer.Importer.load("imported/prototype_navigation@1x")

sketch.parent = all_content

# Position sidebar correctly
sketch.sidebar.x = 0

# Group navigation
navigation = new Layer
	parent: all_content
	height: 0
	width: 0

sketch.topbar.parent = navigation
sketch.sidebar.parent = navigation

# FlowComponent Creation and Configuration
flow = new FlowComponent
flow.parent = all_content

# Position and set flow component layer
flow.width = 1060
flow.height = 750
flow.x = device_width - flow.width
flow.y = device_height - flow.height

flowtopbar = new FlowComponent
flowtopbar.parent = all_content

flowtopbar.width = Screen.width
flowtopbar.height = 50

flowsidebar = new FlowComponent
flowsidebar.parent = all_content

flowsidebar.width = Screen.width - flow.width
flowsidebar.height = 750
flowsidebar.y = device_height - flow.height

#nav-elements-list
navigation_elements = ["project", "home", "activity", "cycle_analytics", "repository", "files", "commits", "branches", "tags", "contributors", "graph", "compare", "charts", "locked files", "issues", "list", "board", "labels", "milestones", "merge requests", "pipelines", "pipelines list", "jobs list", "environments", "stats", "snippets", "settings"]

# Main Sidebar element

sidebarlinks = new Layer
	height: Screen.size.height
	width: sketch.sidebar.width
	parent: navigation
	y: 56
	backgroundColor: "transparent"

sidebarelementheight = 40
sidebarselectborderwidth = 2
sidebarelementwidth = 220
sidebarelementfontsize = 18
forloopindex = 0
for i in navigation_elements
	thename = [i] + "container"
	thename = new Layer
		name: thename
		parent: sidebarlinks
		y: forloopindex * sidebarelementheight
		height: sidebarelementheight
		x: 0
		width: sidebarelementwidth - sidebarselectborderwidth
		backgroundColor: "transparent"

	layer = new TextLayer
		name: [i]
		parent: sidebarlinks.subLayersByName( i + "container")[0]
		text: i
		textTransform: "capitalize"
		textAlign: Align.left
		fontWeight: 500
		fontSize: sidebarelementfontsize
		y: ( sidebarelementheight - sidebarelementfontsize ) / 2
		x: 24
	forloopindex = forloopindex + 1

#creating subnav groups
create_sub_menu_group = (range, parentname) ->
	nav = new Layer
		name: "nav"
# 		y: parentname.y
		height: sidebarelementheight
		width: sidebarelementwidth
		backgroundColor: "transparent"
	parentname.children[0].parent = nav
	nav.parent = parentname
	
	subnav = new Layer
		name: "subnav"
		y: nav.y + sidebarelementheight

		height: range.length * sidebarelementheight
		backgroundColor: "transparent"
	for i in range
		i.parent = subnav
		for t in i.children
			t.x = sidebarelementheight
	subnav.parent = parentname
	
	for layer, i in subnav.children
		layer.y = i * sidebarelementheight

nav1 = sidebarlinks.children[0]
subnav1 = sidebarlinks.children[1...4]
nav2 = sidebarlinks.children[4]
subnav2 = sidebarlinks.children[5...14]
nav3 = sidebarlinks.children[14]
subnav3 = sidebarlinks.children[15...19]
nav4 = sidebarlinks.children[20]
subnav4 = sidebarlinks.children[21...25]

create_sub_menu_group(subnav1, nav1)
create_sub_menu_group(subnav2, nav2)
create_sub_menu_group(subnav3, nav3)
create_sub_menu_group(subnav4, nav4)

distributeLayers.sameMargin
    layers: sidebarlinks.children
    margin: 0 # margin beteen the layers

# subnav animation
createstate = (nav_container, target) ->
	nav_container.states =
		collapsed:
			height: 40
			backgroundColor: "transparent"
			clip: true
			options:
				time: 0
		open:
			height: nav_container.children[1].height + sidebarelementheight
			backgroundColor: "#f5f5f5"
			clip: false
			options:
				time: 0.2
	nav_container.stateSwitch("collapsed")
	nav_container.on "change:height", ->
		distributeLayers.sameMargin
			layers: sidebarlinks.children
			margin: 0 # margin beteen the layers
		scroll.updateContent()
	nav_container.childrenWithName("nav")[0].onClick ->
		nav_container.stateCycle("open", "collapsed")

sidebar_topnav_index = [0, 1, 2, 4]
sidebar_topnav = []

for number in sidebar_topnav_index
	createstate(sidebarlinks.children[number])
	
	a = sidebarlinks.children[number]
	b = a.childrenWithName("nav")[0]
	sidebar_topnav = sidebar_topnav.concat(b)
	c = a.childrenWithName("subnav")[0]
	for i in c.children
		sidebar_topnav = sidebar_topnav.concat(i)

sidebar_subnav_index = [3, 5, 6]
sidebar_subnav = []

for number in sidebar_subnav_index
	a = sidebarlinks.children[number]
	sidebar_subnav = sidebar_subnav.concat(a)

sidebar_topnav = sidebar_topnav.concat(sidebar_subnav)

# hover states
for i, j in sidebar_topnav
	i.states =
		neutral:
			backgroundColor: "transparent"
			shadowX: 0
			options:
				time: 0
		hovered:
			backgroundColor: "#ececec"
			shadowX: 0
			color: "#333"
			options:
				time: 0
		selected:
			backgroundColor: "#ececec"
			shadowX: sidebarselectborderwidth
			shadowColor: "#378bf6"
			fontWeight: 600
			color: "#333"
			options:
				time: 0

	i.on Events.MouseOver, (event, layer) ->
# 		if layer.states.current.name != "selected"
			layer.stateSwitch("hovered")
	i.on Events.MouseOut, (event, layer) ->
# 		if layer.states.current.name != "selected"
			layer.stateSwitch("neutral")
	i.on Events.Click, (event, layer) ->
# 		if layer.states.current.name != "selected"
			layer.stateSwitch("selected")
# 		else
# 			layer.stateSwitch("hovered")

#Make sidebar scrollable
scroll = new ScrollComponent
	wrap: sidebarlinks
# 	y: 50
# 	height: Screen.height - 50
	width: sidebarelementwidth
	backgroundColor: "transparent"
	scrollHorizontal: false
	mouseWheelEnabled: true

# Flow component interaction
flow.showNext(sketch.screen_project_home)
flowtopbar.showNext(sketch.topbar)
scroll.y = 6
scroll.parent = sketch.sidebar
flowsidebar.showNext(sketch.sidebar)

issues = sidebarlinks.subLayersByName("projectcontainer")[0]
issuessubnav = issues.subLayersByName("subnav")[0]
issuessubnav.subLayersByName("homecontainer")[0].onClick ->
	flow.showNext(sketch.screen_project_home, animate: false)

issues = sidebarlinks.subLayersByName("issuescontainer")[0]
issuessubnav = issues.subLayersByName("subnav")[0]
issuessubnav.subLayersByName("boardcontainer")[0].onClick ->
	flow.showNext(sketch.screen_issue_board, animate: false)

issues = sidebarlinks.subLayersByName("issuescontainer")[0]
issuessubnav = issues.subLayersByName("subnav")[0]
issuessubnav.subLayersByName("listcontainer")[0].onClick ->
	flow.showNext(sketch.screen_issues_list, animate: false)

sidebarlinks.subLayersByName("merge requestscontainer")[0].onClick ->
	flow.showNext(sketch.screen_merge_requests_list, animate: false)

sketch.screen_issue_board.onClick ->
	flow.showNext(sketch.screen_issue, animate: false)

sketch.screen_issues_list.onClick ->
	flow.showNext(sketch.screen_issue, animate: false)

sketch.project_selector.onClick ->
	flow.showNext(sketch.screen_project_home, animate: false)

sketch.group_selector.onClick ->
	flow.showNext(sketch.screen_group_home, animate: false)
	flowtopbar.showNext(sketch.topbar_group, animate: false)
	flowsidebar.showNext(sketch.sidebar_group, animate: false)



	
