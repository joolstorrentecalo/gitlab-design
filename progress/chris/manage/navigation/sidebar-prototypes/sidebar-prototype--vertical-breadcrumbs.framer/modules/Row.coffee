{Constants} = require "Constants"

class exports.Row
	constructor: (@name, @text, @width, @parentLayer) ->
		@layer = new Layer
			name: @name + '_row'
			parent: @parentLayer
			height: Constants.rowHeight
			width: @width
			cursor: "pointer"
			
		@textLayer = new TextLayer
			name: @name + '_text'
			parent: @layer
			text: @text
			fontSize: Constants.rowFontSize
			fontWeight: 400
			fontFamily: "SF UI Text, Helvetica Neue, Helvetica, Arial, sans-serif"
			y: Align.center
			color: "rgba(0,0,0,0.85)"
		
		@selectedBorderLayer = new Layer
			name: @name + '_border'
			parent: @layer
			height: Constants.rowHeight
			width: Constants.selectedBorderWidth
			backgroundColor: "#4a8bee"

	getName: =>
		return @name

	getText: =>
		return @text

	getWidth: =>
		return @width

	getParentLayer: =>
		return @parentLayer

	getLayer: =>
		return @layer

	getTextLayer: =>
		return @textLayer

	getSelectedBorderLayer: =>
		return @selectedBorderLayer