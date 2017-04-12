# Define and set custom device
device_width = 1280
device_height = 800

Framer.Device.customize
	screenWidth: device_width
	screenHeight: device_height

# Use desktop cursor
document.body.style.cursor = "auto"


# Import sketch file "prototype_navigation"
sketch = Framer.Importer.load("imported/prototype_navigation@1x")

# Position sidebar correctly
sketch.sidebar.x = 0

# Group navigation
navigation = new Layer
sketch.topbar.parent = navigation
sketch.sidebar.parent = navigation

# FlowComponent Creation and Configuration
flow = new FlowComponent

# Position and set flow component layer
flow.width = 1060
flow.height = 750
flow.x = device_width - flow.width
flow.y = device_height - flow.height

navigation_elements = ["project", "repository", "issues", "merge requests", "pipelines", "snippets", "settings"]
navigation_with_subelements = ["project", "repository", "issues", "pipelines"]

navigation_project_elements = ["home", "activity", "cycle analytics"]
navigation_repository_elements = ["files", "commits", "branches", "tags", "contributors", "graph", "compare", "charts", "locked files"]
navigation_issues_elements = ["list", "board", "labels", "milestones"]
navigation_pipelines_elements = ["pipelines", "jobs", "environments", "charts"]

# Main Sidebar elements
sidebarelementheight = 40
sidebarelementfontsize = 18
forloopindex = 0
for i in navigation_elements
	layer = new Layer
		name: [i] + "container"
		parent: sketch.sidebar
		y: 6 + forloopindex * sidebarelementheight
		height: sidebarelementheight
		x: 0
		width: 220
		backgroundColor: "transparent"

	layer = new TextLayer
		name: [i]
		parent: sketch.sidebar.subLayersByName( i + "container")[0]
		text: i
		textTransform: "capitalize"
		textAlign: Align.left
		fontWeight: 500
		fontSize: sidebarelementfontsize
		y: ( sidebarelementheight - sidebarelementfontsize ) / 2
		x: 24
	forloopindex = forloopindex + 1

# Sub Sidebar Elements

for s in navigation_with_subelements
	if eval("navigation_" + s + "_elements") != "undefined"
		sub = new Layer
		sub.parent = sketch.sidebar.subLayersByName( s + "container")[0]
		sub.y = sub.y + sidebarelementheight
		sub.backgroundColor = "transparent"
		sub.visible = false
		
		subforloopindex = 0
		for i in eval("navigation_" + s + "_elements")
			layer = new Layer
				name: [i] + "container"
				parent: sub
				y: subforloopindex * sidebarelementheight
				height: sidebarelementheight
				x: 0
				width: 220
				backgroundColor: "transparent"
		
			layer = new TextLayer
				name: [i]
				parent: sub.subLayersByName( i + "container")[0]
				text: i
				textTransform: "capitalize"
				textAlign: Align.left
				fontWeight: 500
				fontSize: sidebarelementfontsize
				y: ( sidebarelementheight - sidebarelementfontsize ) / 2
				x: 44
			subforloopindex = subforloopindex + 1
		
		sub.name = "subelements"

# Flow component interaction
flow.showNext(sketch.Screen_1)

# Show subelement on click
sketch.sidebar.subLayersByName("issuescontainer")[0].onClick ->
	sketch.sidebar.subLayersByName("issuescontainer")[0].subLayersByName("subelements")[0].visible = true
	sketch.sidebar.children[4].y = sketch.sidebar.children[4].y + 160

sketch.sidebar.subLayersByName("issuescontainer")[0].subLayersByName("subelements")[0].subLayersByName("boardcontainer")[0].onClick ->
    flow.showNext(sketch.Screen_2, animate: false)

sketch.Screen_2.onClick ->
    flow.showNext(sketch.Screen_1, animate: false)