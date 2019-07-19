{ContentAreaContainer} = require "ContentAreaContainer"
{Constants} = require "Constants"

class exports.ContextualNavigationDropdownRow
	constructor: (@name, @text, @dropdown, @index) ->
		@contextualNavigationController = @dropdown.getFirstLevelSection().getContextualNavigationController()

		@layer = new Layer
			name: @name + "_dropdown_row"
			parent: @dropdown.getLayer()
			y: @index * Constants.rowHeight
			height: Constants.rowHeight
			width: Constants.dropdownWidth
			backgroundColor: "#f5f5f5"
			
		@textLayer = new TextLayer
			name: @name + "_dropdown_text"
			parent: @layer
			text: @text
			fontSize: Constants.rowFontSize
			x: Constants.indentation
			y: Align.center
			color: "rgba(0,0,0,0.85)"

		# row.type = 'dropdown'
		# row.index = rowIndex
		# row.parentIndex = parentIndex
			
		@addStates()
		@addEvents()

	getName: =>
		return @name

	getText: =>
		return @text

	getDropdown: =>
		return @dropdown

	getIndex: =>
		return @index

	getLayer: =>
		return @layer

	getTextLayer: =>
		return @textLayer

	addStates: =>
		@layer.states.hover = 
			backgroundColor: "#ececec"
			animationOptions:
				time: 0.1

	addEvents: =>
		@layer.onMouseOver =>
			@layer.animate("hover")
			
		@layer.onMouseOut =>
			@layer.animate("default")
			
		@layer.onClick =>
			secondLevelRow = @dropdown.getFirstLevelSection().getSecondLevelSection().getSecondLevelRows()[@index]

			contentAreas = secondLevelRow.getContentAreas()
			if contentAreas.length
				@contextualNavigationController.selectDropdownRowByIndex(@dropdown.getFirstLevelSection().getIndex(), @index)

				ContentAreaContainer.flow.showNext(contentAreas[0].getScroll(), animate: false)