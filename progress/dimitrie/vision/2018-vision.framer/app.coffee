# Module import
m = require "material-kit"

# Device setup

# Use desktop cursor
document.body.style.cursor = "auto"

# Framer.Device.deviceType = "microsoft-surface-book"

Framer.Device.deviceType = "fullscreen"
# Framer.Device.fullScreen = tr	ue
# Framer.Device.deviceType = "apple-macbook-pro"
# Framer.Device.screenWidth = 1680
# Framer.Device.screenHeight = 1050
# Define and set custom device 
# Framer.Device.customize
# # 	fullScreen: true
# 	screenWidth: 1680
# 	screenHeight: 1050
# 	devicePixelRatio: 1
# 	deviceImage: "https://i.imgur.com/SypCuyH.png"
# 	deviceImageWidth: 3820 * .5
# 	deviceImageHeight: 2320 * .5
# 	backgroundColor: "white"
# # 	deviceScale:.5
# # 	contentScale: 2

Framer.Device.background.backgroundColor = "white"

# Framer online environment setup

# Framer.Defaults.Layer.force2d = true
Framer.Extras.Hints.disable()
Framer.Extras.Preloader.setLogo("https://gitlab.com/gitlab-com/gitlab-artwork/raw/master/logo/logo.png")

# Add /index.html at the end of the shared url to only show the prototype

# Sketch import

# Import file "2018fakedemo"
sketch = Framer.Importer.load("imported/2018fakedemo@2x", scale: 1)

# Pageview creation
pageview = new PageComponent
	height: Screen.height
	width: Screen.width

# Disable page component drag ability
pageview.content.draggable.enabled = false

# View1

# --- Page general setup --- #

view1 = new Layer
	height: Screen.height
	width: Screen.width

sketch.view1_nav.parent = view1

view1scroll = new ScrollComponent
	x: sketch.left_sidebar.width
	y: sketch.topbar.height
	width: sketch.view1_content.width
	height: Screen.height - sketch.topbar.height
	backgroundColor: "white"
	mouseWheelEnabled: true
	mouseWheelSpeedMultiplier: 0.4
	scrollHorizontal: false
	parent: view1

sketch.view1_content.x = 0
sketch.view1_content.parent = view1scroll.content

# --- Page specific setup --- #

## Widget functionality

# Clip contents of rows that will be expanded
sketch.row_testsummary_expanded.clip = true
sketch.row_codequality_expanded.clip = true
sketch.row_securitytests_expanded.clip = true
sketch.row_performancemetrics_expanded.clip = true

# Capture original heights of expanded rows
row_testsummary_expanded_originalheight = sketch.row_testsummary_expanded.height
row_codequality_expanded_originalheight = sketch.row_codequality_expanded.height
row_securitytests_expanded_originalheight = sketch.row_securitytests_expanded.height
row_performancemetrics_expanded_originalheight = sketch.row_performancemetrics_expanded.height

# Set section contraint rules
sketch.row_testsummary.constraints =
	top:[sketch.row_pipeline, -1]

sketch.row_testsummary_expanded.constraints =
	top:[sketch.row_testsummary, 0]

sketch.row_codequality.constraints =
	top:[sketch.row_testsummary_expanded, -1]

sketch.row_codequality_expanded.constraints =
	top:[sketch.row_codequality, -1]

sketch.row_securitytests.constraints =
	top:[sketch.row_codequality_expanded, -1]

sketch.row_securitytests_expanded.constraints =
	top:[sketch.row_securitytests, -1]

sketch.row_performancemetrics.constraints =
	top:[sketch.row_securitytests_expanded, -1]

sketch.row_performancemetrics_expanded.constraints =
	top:[sketch.row_performancemetrics, -1]

sketch.row_licensefinder.constraints =
	top:[sketch.row_performancemetrics_expanded, -1]

sketch.row_deploy.constraints =
	top:[sketch.row_licensefinder, -1]

sketch.row_approve.constraints =
	top:[sketch.row_deploy, -1]

sketch.row_merge.constraints =
	top:[sketch.row_approve, -1]

sketch.below.constraints =
	top:[sketch.row_merge, 8]

# Collapse expanded rows by default
sketch.row_testsummary_expanded.height = 0
sketch.row_codequality_expanded.height = 0
sketch.row_securitytests_expanded.height = 0
sketch.row_performancemetrics_expanded.height = 0

# Set constraints active
m.layout.set()

# Hide all collapse buttons by default
sketch.row_testsummary_button_collapse.visible = false
sketch.row_codequality_button_collapse.visible = false
sketch.row_securitytests_button_collapse.visible = false
sketch.row_performancemetrics_button_collapse.visible = false

# Events for pipeline section
sketch.row_testsummary_button_expand.onTap ->
	sketch.row_testsummary_expanded.animate
		height: row_testsummary_expanded_originalheight
		options:
			curve: "Bezier.easeInOut"
			time: 1
	sketch.row_testsummary_expanded.height = row_testsummary_expanded_originalheight
	sketch.row_testsummary_button_expand.visible = false
	sketch.row_testsummary_button_collapse.visible = true
	m.layout.animate
		curve: "Bezier.easeInOut"
		time: 1
	view1scroll.updateContent()

sketch.row_testsummary_button_collapse.onTap ->
	sketch.row_testsummary_expanded.animate
		height: 0
		options:
			curve: "Bezier.easeInOut"
			time: 1
	sketch.row_testsummary_expanded.height = 0
	sketch.row_testsummary_button_collapse.visible = false
	sketch.row_testsummary_button_expand.visible = true
	m.layout.animate
		curve: "Bezier.easeInOut"
		time: 1
	view1scroll.updateContent()

# Events for codequality section
sketch.row_codequality_button_expand.onTap ->
	sketch.row_codequality_expanded.animate
		height: row_codequality_expanded_originalheight
		options:
			curve: "Bezier.easeInOut"
			time: 1
	sketch.row_codequality_expanded.height = row_codequality_expanded_originalheight
	sketch.row_codequality_button_expand.visible = false
	sketch.row_codequality_button_collapse.visible = true
	m.layout.animate
		curve: "Bezier.easeInOut"
		time: 1
	view1scroll.updateContent()

sketch.row_codequality_button_collapse.onTap ->
	sketch.row_codequality_expanded.animate
		height: 0
		options:
			curve: "Bezier.easeInOut"
			time: 1
	sketch.row_codequality_expanded.height = 0
	sketch.row_codequality_button_collapse.visible = false
	sketch.row_codequality_button_expand.visible = true
	m.layout.animate
		curve: "Bezier.easeInOut"
		time: 1
	view1scroll.updateContent()

# Events for securitytests section
sketch.row_securitytests_button_expand.onTap ->
	sketch.row_securitytests_expanded.animate
		height: row_securitytests_expanded_originalheight
		options:
			curve: "Bezier.easeInOut"
			time: 1
	sketch.row_securitytests_expanded.height = row_securitytests_expanded_originalheight
	sketch.row_securitytests_button_expand.visible = false
	sketch.row_securitytests_button_collapse.visible = true
	m.layout.animate
		curve: "Bezier.easeInOut"
		time: 1
	view1scroll.updateContent()

sketch.row_securitytests_button_collapse.onTap ->
	sketch.row_securitytests_expanded.animate
		height: 0
		options:
			curve: "Bezier.easeInOut"
			time: 1
	sketch.row_securitytests_expanded.height = 0
	sketch.row_securitytests_button_collapse.visible = false
	sketch.row_securitytests_button_expand.visible = true
	m.layout.animate
		curve: "Bezier.easeInOut"
		time: 1
	view1scroll.updateContent()

# Events for performancemetrics section
sketch.row_performancemetrics_button_expand.onTap ->
	sketch.row_performancemetrics_expanded.animate
		height: row_performancemetrics_expanded_originalheight
		options:
			curve: "Bezier.easeInOut"
			time: 1
	sketch.row_performancemetrics_expanded.height = row_performancemetrics_expanded_originalheight
	sketch.row_performancemetrics_button_expand.visible = false
	sketch.row_performancemetrics_button_collapse.visible = true
	m.layout.animate
		curve: "Bezier.easeInOut"
		time: 1
	view1scroll.updateContent()

sketch.row_performancemetrics_button_collapse.onTap ->
	sketch.row_performancemetrics_expanded.animate
		height: 0
		options:
			curve: "Bezier.easeInOut"
			time: 1
	sketch.row_performancemetrics_expanded.height = 0
	sketch.row_performancemetrics_button_collapse.visible = false
	sketch.row_performancemetrics_button_expand.visible = true
	m.layout.animate
		curve: "Bezier.easeInOut"
		time: 1
	view1scroll.updateContent()

view1scroll.updateContent()

## Code coverage functionality

sketch.code_coverage_tooltip_1.opacity = 0
sketch.code_coverage_tooltip_2.opacity = 0

sketch.code_coverage_1.onMouseOver ->
	sketch.code_coverage_tooltip_1.animate
		opacity: 1
		options:
			curve: "Bezier.easeInOut"
			time: .5

sketch.code_coverage_1.onMouseOut ->
	sketch.code_coverage_tooltip_1.animate
		opacity: 0
		options:
			curve: "Bezier.easeInOut"
			time: .5

sketch.code_coverage_2.onMouseOver ->
	sketch.code_coverage_tooltip_2.animate
		opacity: 1
		options:
			curve: "Bezier.easeInOut"
			time: .5

sketch.code_coverage_2.onMouseOut ->
	sketch.code_coverage_tooltip_2.animate
		opacity: 0
		options:
			curve: "Bezier.easeInOut"
			time: .5

# --- Next screen functionality --- #

pageview.addPage(view1, "right")

sketch.topbar.onClick ->
	pageview.snapToPage(view2, false)

# View2

# --- Page general setup --- #

view2 = new Layer
	height: Screen.height
	width: Screen.width

sketch.view2_nav.x = 0
sketch.view2_nav.parent = view2

view2scroll = new ScrollComponent
	x: sketch.left_sidebar1.width
	y: sketch.topbar1.height
	width: sketch.view2_content.width
	height: Screen.height - sketch.topbar1.height
	backgroundColor: "white"
	mouseWheelEnabled: true
	mouseWheelSpeedMultiplier: 0.4
	scrollHorizontal: false
	scrollVertical: false
	parent: view2

sketch.view2_content.x = 0
sketch.view2_content.parent = view2scroll.content

view2scroll.updateContent()

# --- Next screen functionality --- #

pageview.addPage(view2, "right")

sketch.left_sidebar1.onClick ->
	pageview.snapToPage(view1, false)

sketch.topbar1.onClick ->
	pageview.snapToPage(view3, false)

# View3

# --- Page general setup --- #

view3 = new Layer
	height: Screen.height
	width: Screen.width

sketch.view3_nav.x = 0
sketch.view3_nav.parent = view3

view3scroll = new ScrollComponent
	x: sketch.left_sidebar2.width
	y: sketch.topbar2.height
	width: sketch.view3_content.width
	height: Screen.height - sketch.topbar2.height
	backgroundColor: "white"
	mouseWheelEnabled: true
	mouseWheelSpeedMultiplier: 0.4
	scrollHorizontal: false
	scrollVertical: false
	parent: view3

sketch.view3_content.x = 0
sketch.view3_content.parent = view3scroll.content

view3scroll.updateContent()

# --- Next screen functionality --- #

pageview.addPage(view3, "right")

sketch.left_sidebar2.onClick ->
	pageview.snapToPage(view2, false)

sketch.topbar2.onClick ->
	pageview.snapToPage(view4, false)

# View4

# --- Page general setup --- #

view4 = new Layer
	height: Screen.height
	width: Screen.width

sketch.view4_nav.x = 0
sketch.view4_nav.parent = view4

view4scroll = new ScrollComponent
	x: sketch.left_sidebar3.width
	y: sketch.topbar3.height
	width: sketch.view4_content.width
	height: Screen.height - sketch.topbar3.height
	backgroundColor: "white"
	mouseWheelEnabled: true
	mouseWheelSpeedMultiplier: 0.4
	scrollHorizontal: false
	scrollVertical: true
	parent: view4

sketch.view4_content.x = 0
sketch.view4_content.parent = view4scroll.content

# --- Page specific setup --- #

## Widget functionality
 
# Clip contents of rows that will be expanded
sketch.row_securitytests_expanded1.clip = true

# Capture original heights of expanded rows
row_securitytests_expanded1_originalheight = sketch.row_securitytests_expanded1.height
 
# Set section contraint rules
sketch.row_securitytests_expanded1.constraints =
	top:[sketch.row_securitytests1, -1]

sketch.row_performancemetrics1.constraints =
	top:[sketch.row_securitytests_expanded1, -1]

sketch.row_licensefinder1.constraints =
	top:[sketch.row_performancemetrics1, -1]

sketch.row_merge1.constraints =
	top:[sketch.row_licensefinder1, -1]

sketch.row_deploy1.constraints =
	top:[sketch.row_merge1, -1]

sketch.row_revert.constraints =
	top:[sketch.row_deploy1, -1]

sketch.below1.constraints =
	top:[sketch.row_revert, 8]

# Collapse expanded rows by default
sketch.row_securitytests_expanded1.height = 0

# Set constraints active
m.layout.set()
 
# # Hide all collapse buttons by default
sketch.row_securitytests_button_collapse1.visible = false
 
# Events for securitytests section
sketch.row_securitytests_button_expand1.onTap ->
	sketch.row_securitytests_expanded1.animate
		height: row_securitytests_expanded1_originalheight
		options:
			curve: "Bezier.easeInOut"
			time: 1
	sketch.row_securitytests_expanded1.height = row_securitytests_expanded1_originalheight
	sketch.row_securitytests_button_expand1.visible = false
	sketch.row_securitytests_button_collapse1.visible = true
	m.layout.animate
		curve: "Bezier.easeInOut"
		time: 1
	view4scroll.updateContent()

sketch.row_securitytests_button_collapse1.onTap ->
	sketch.row_securitytests_expanded1.animate
		height: 0
		options:
			curve: "Bezier.easeInOut"
			time: 1
	sketch.row_securitytests_expanded1.height = 0
	sketch.row_securitytests_button_collapse1.visible = false
	sketch.row_securitytests_button_expand1.visible = true
	m.layout.animate
		curve: "Bezier.easeInOut"
		time: 1
	view4scroll.updateContent()

view4scroll.updateContent()

# --- Next screen functionality --- #

pageview.addPage(view4, "right")

sketch.left_sidebar3.onClick ->
	pageview.snapToPage(view3, false)

# Pageview starting position
pageview.snapToPage(view1)
