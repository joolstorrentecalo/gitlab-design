# Import file "main-nav-hover"
sketch = Framer.Importer.load("imported/main-nav-hover@1x")

sketch.Pipelines_hover.y = sketch.Pipelines_hover.y - 80
# sketch.navigation_1_project.index = 2
# sketch.Pipelines_hover.index = 1

sketch.pipelines.onMouseOver ->
	sketch.Pipelines_hover.animate
		properties:
			y: 101
		curve: "spring(250,25,0)"
		
sketch.pipelines.onMouseOut and sketch.Pipelines_hover.onMouseOut ->
	sketch.Pipelines_hover.animate
		properties:
			y: 51
		curve: "spring(250,25,0)"