log.draggable.enabled = true
log.draggable.speedX = 0

log.on "change:y", ->
	if log.y <= 50
		log.y = 50
		log.draggable.speedY = 0
		log_handle.onTouchStart (event, layer) ->
			log.draggable.speedY = 1

	if log.y >= 600
		log.y = 600

scroll = new ScrollComponent
	size: log_scrolling_container.size
	parent: log_scrolling_container
	scrollHorizontal: false

log_content.parent = scroll.content
