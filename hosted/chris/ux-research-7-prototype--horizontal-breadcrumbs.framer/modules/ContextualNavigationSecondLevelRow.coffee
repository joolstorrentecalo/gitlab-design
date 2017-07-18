{ContentAreaContainer} = require "ContentAreaContainer"
{Constants} = require "Constants"
{Row} = require "Row"

class exports.ContextualNavigationSecondLevelRow extends Row
	constructor: (@name, @text, @secondLevelSection, @index) ->
		@contentAreas = []

		super(@name, @text, Constants.sidebarWidth, @secondLevelSection.getLayer())
		
		@contextualNavigationController = @secondLevelSection.getFirstLevelSection().getContextualNavigationController()
		
		@layer.y = @index * Constants.rowHeight
		@layer.backgroundColor = "#f5f5f5"
		@textLayer.x = Constants.indentation * 2
		@textLayer.width = Constants.sidebarWidth - Constants.indentation *
		@layer.clip = true
		
		@addStates()		
		@addEvents()

	getName: =>
		return @name

	getText: =>
		return @text

	getSecondLevelSection: =>
		return @secondLevelSection

	getContentAreas: =>
		return @contentAreas

	getContentAreaByIndex: (index) =>
		return @contentAreas[index]

	getIndex: =>
		return @index

	addContentArea: (contentArea) =>
		@contentAreas.push(contentArea)

	addStates: =>
		@layer.states.hover =
			backgroundColor: "#ececec"
			animationOptions:
				time: 0.1

		@layer.states.selected =
			backgroundColor: "#ececec"
		
		@textLayer.states.selected =
			fontWeight: 600
			color: "#4a8bee"

	addEvents: =>
		@layer.onClick =>	
			if @contentAreas.length
				@contextualNavigationController.selectSecondLevelRowByIndex(@index)
				ContentAreaContainer.flow.showNext(@contentAreas[0].getScroll(), animate: false)
			
		@layer.onMouseOver =>
			@layer.animate("hover")
			@contextualNavigationController.hideVisibleDropdown()		
			
		@layer.onMouseOut =>
			@contextualNavigationController.setSecondLevelRowInRestingStateByIndex(@index)

	switchStateSelected: =>
		@layer.stateSwitch("selected")
		@textLayer.stateSwitch("selected")

	switchStateDefault: =>
		@layer.stateSwitch("default")
		@textLayer.stateSwitch("default")


