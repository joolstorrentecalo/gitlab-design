{ContentAreaContainer} = require "ContentAreaContainer"

class exports.ContentArea
	constructor: (@name, @imagePath, @height) ->	
		@hotspots = []

		@scroll = new ScrollComponent
			name: @name + '_scroll'
			parent: ContentAreaContainer.layer
			width: ContentAreaContainer.layer.width
			height: ContentAreaContainer.layer.height
			mouseWheelEnabled: true
			scrollHorizontal: false
			visible: false
		
		@scroll.content.draggable = false
		@content = new Layer
			name: @name + "_content"
			parent: @scroll.content
			image: @imagePath
			width: ContentAreaContainer.layer.width
			height: @height

	getHotspots: =>
		return @hotstpots

	getName: =>
		return @name

	getImagePath: =>
		return @imagePath

	getHeight: =>
		return @height

	getScroll: =>
		return @scroll

	getContent: =>
		return @content

	addHotspot: (hotspot) =>
		@hotspots.push(hotspot)
