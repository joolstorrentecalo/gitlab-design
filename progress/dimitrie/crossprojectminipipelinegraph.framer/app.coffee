# Use desktop cursor
document.body.style.cursor = "auto"

# Import file "pipelines-overview-stages"
sketch = Framer.Importer.load("imported/pipelines-overview-stages@2x")

sketch.tooltip.visible = false

begin1 = sketch.downstream_2.x
eind1 = sketch.downstream_2.x + 20
begin2 = sketch.downstream_3.x
eind2 = sketch.downstream_3.x + 40

sketch.downstream_group.onMouseOver (event, layer) ->
	sketch.downstream_2.animate
		x: eind1
		options: 
			time: .3
	sketch.downstream_3.animate
		x: eind2
		options: 
			time: .3


sketch.downstream_group.onMouseOut (event, layer) ->
	sketch.downstream_2.animate
		x: begin1
		options: 
			time: .3
	sketch.downstream_3.animate
		x: begin2
		options: 
			time: .3

sketch.downstream_1.onClick (event, layer) ->
	sketch.tooltip.visible = true

sketch.downstream_1.onMouseOut (event, layer) ->
	sketch.tooltip.visible = false

