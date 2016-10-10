# Import file "main-nav-hover"
sketch = Framer.Importer.load("imported/main-nav-hover@1x")

document.body.style.cursor = "auto"

sketch.Pipelines_hover.y = sketch.Pipelines_hover.y - 80
# sketch.navigation_1_project.index = 2
# sketch.Pipelines_hover.index = 1

underlinelayer = new Layer
	x: 669
	y: 98
	width: sketch.underline.width
	height: sketch.underline.height
	backgroundColor: "#909090"
	opacity: 0
	
pipelineunderlinelayer = new Layer
# 	x: 563
	x: 565
# 	y: 87
	y: 100
# 	width: 5
	width: 0
# 	height: 5
	height: 0
	borderRadius: 5
	backgroundColor: "#4A8BEE"
	opacity: 1
	
pipelineunderlinelayer2 = new Layer
	x: 526
	y: 98
	width: 78
	height: 2
	borderRadius: 0
	backgroundColor: "#4A8BEE"
	opacity: 0

sketch.pipelines.onClick ->
	sketch.Pipelines_hover.animate
		properties:
			y: 101
		curve: "spring(250,25,0)"
	underlinelayer.animate
		properties: 
			opacity: 1
		curve: "spring(250,25,0)"
	pipelineunderlinelayer.animate
		properties: 
			opacity: 1
			height: 5
			width: 5
			y: 87
			x: 563
		curve: "spring(250,25,0)"
		
sketch.pipelines.onMouseOut and sketch.Pipelines_hover.onMouseOut ->
	sketch.Pipelines_hover.animate
		properties:
			y: 51
		curve: "spring(250,25,0)"
	underlinelayer.animate
		properties: 
			opacity: 0
		curve: "spring(250,25,0)"
	pipelineunderlinelayer.animate
		properties: 
			opacity: 0
			height: 0
			width: 0
			y: 100
			x: 565
			borderRadius: 5
		curve: "spring(250,25,0)"
	sketch.issuesview.animate
		properties: 
			opacity: 1
			blur: 0
		curve: "spring(250,25,0)"
		delay: 1
	

sketch.Pipelines_hover.onClick ->
	sketch.issuesview.animate
		properties: 
			opacity: 0
			blur: 10
		curve: "spring(250,25,0)"
	pipelineunderlinelayer.animate
		properties: 
			x: 526
			y: 98
			width: 78
			height: 2
			borderRadius: 0
			backgroundColor: "#4A8BEE"
			opacity: 1
		curve: "spring(250,25,0)"
	underlinelayer.animate
		properties: 
			opacity: 1
			backgroundColor: "#FAFAFA"
		curve: "spring(250,25,0)"

		