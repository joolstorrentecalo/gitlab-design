document.body.style.cursor = "auto"


icon.visible = false
underline.visible = false

link.onMouseOver (event, layer) ->
	document.body.style.cursor = "pointer"
	icon.visible = true
	underline.visible = true
	 
link.onMouseOut (event, layer) ->
	document.body.style.cursor = "auto"
	icon.visible = false
	underline.visible = false