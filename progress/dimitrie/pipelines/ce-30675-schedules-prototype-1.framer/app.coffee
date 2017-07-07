# Import file "project_triggers"
sketch = Framer.Importer.load("imported/project_triggers@1x")

sketch.one_time.visible = false

sketch.OPTION_REPEAT1.onClick (event, layer) ->
	sketch.repeat.visible = true
	sketch.one_time.visible = false

sketch.OPTION_REPEAT.onClick (event, layer) ->
	sketch.repeat.visible = true
	sketch.one_time.visible = false

sketch.OPTION_ONE_TIME1.onClick (event, layer) ->
	sketch.repeat.visible = false
	sketch.one_time.visible = true

sketch.OPTION_ONE_TIME.onClick (event, layer) ->
	sketch.repeat.visible = false
	sketch.one_time.visible = true
