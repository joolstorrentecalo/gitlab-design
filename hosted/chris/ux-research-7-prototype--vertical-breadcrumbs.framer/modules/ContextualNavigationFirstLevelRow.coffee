{ContentAreaContainer} = require "ContentAreaContainer"
{Constants} = require "Constants"
{Row} = require "Row"

class exports.ContextualNavigationFirstLevelRow extends Row
	constructor: (@name, @text, @firstLevelSection) ->
		@contentAreas = []

		super(@name, @text, Constants.sidebarWidth, @firstLevelSection.getLayer())
		
		@contextualNavigationController = @firstLevelSection.getContextualNavigationController()

		@layer.backgroundColor = "#fafafa"
		@textLayer.x = Constants.indentation
		@textLayer.width = @width - Constants.indentation
		@selectedBorderLayer.visible = false
		
		@addStates()
		@addEvents()


	getName: =>
		return @name

	getText: =>
		return @text

	getFirstLevelSection: =>
		return @firstLevelSection

	getContentAreas: =>
		return @contentAreas

	getContentAreaByIndex: (index) =>
		return @contentAreas[index]

	getContextualNavigationController: =>
		return @contextualNavigationController

	addContentArea: (contentArea) =>
		@contentAreas.push(contentArea)

	addStates: =>
		@layer.states.hover =
			backgroundColor: "ececec"
			animationOptions:
				time: 0.1
		
		@layer.states.selected =
			backgroundColor: "#f5f5f5"	

		@textLayer.states.selected =
			fontWeight: 600
				
		@selectedBorderLayer.states.visible =
			visible: true

	addEvents: =>
		@layer.onClick =>
			if @contentAreas.length
				@contextualNavigationController.selectFirstLevelRowByIndex(@firstLevelSection.getIndex())
				ContentAreaContainer.flow.showNext(@contentAreas[0].getScroll(), animate: false)
			
		@layer.onMouseOver =>
			@layer.animate("hover")

			@contextualNavigationController.hideVisibleDropdown()
			@contextualNavigationController.showDropdownByIndex(@firstLevelSection.getIndex())
		
		@layer.onMouseOut =>
			@contextualNavigationController.setFirstLevelRowInRestingStateByIndex(@firstLevelSection.getIndex())

	switchStateHover: =>
		@layer.stateSwitch("hover")

	switchStateSelected: =>
		@layer.stateSwitch("selected")
		@textLayer.stateSwitch("selected")
		@selectedBorderLayer.stateSwitch("visible")

	switchStateDefault: =>
		@layer.stateSwitch("default")
		@textLayer.stateSwitch("default")
		@selectedBorderLayer.stateSwitch("default")

