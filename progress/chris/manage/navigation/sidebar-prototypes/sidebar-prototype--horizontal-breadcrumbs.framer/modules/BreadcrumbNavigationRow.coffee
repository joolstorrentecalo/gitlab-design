# {ContentAreaContainer} = require "ContentAreaContainer"
{Constants} = require "Constants"

class exports.BreadcrumbNavigationRow
	constructor: (@name, @text, @imagePath, @breadcrumbSectionContent, @environmentLink, @index) ->
		@layer = new Layer
			name: @name + '_breadcrumb_row'
			parent: @breadcrumbSectionContent.getLayer()
			height: Constants.rowHeight
			width: Constants.sidebarWidth
			y: @index * Constants.rowHeight
			# index: index
			# parentIndex: parentIndex
			backgroundColor: "transparent"
			
		@imageLayer = new Layer
			name: @name + '_breacrumb_image'
			parent: @layer
			image: @imagePath
			width: Constants.breadcrumbsImageWidth
			height: Constants.breadcrumbsImageWidth
			x: Constants.indentation
			y: Align.center

		@textLayer = new TextLayer
			name: @name + '_breacrumb_text'
			parent: @layer
			text: @text
			y: Align.center
			x: 40
			fontSize: Constants.rowFontSize
			fontWeight: 400
			fontFamily: "SF UI Text, Helvetica Neue, Helvetica, Arial, sans-serif"
			color: "#rgba(0,0,0,0.85)"

		@layer.bringToFront()
			
		@addStates()
		@addEvents()

	getName: =>
		return @name

	getText: =>
		return @text

	getImagePath: =>
		return @imagePath

	getBreadcrumbSectionContent: =>
		return @breadcrumbSectionContent

	getEnvironmentLink: =>
		return @environmentLink

	getIndex: =>
		return @index

	getLayer: =>
		return @layer

	getImageLayer: =>
		return @imageLayer

	getTextLayer: =>
		return @textLayer

	addStates: =>
		@layer.states.hover =
			backgroundColor: "#rgba(0,0,0,0.05)"
			animationOptions:
				time: 0.1

		@textLayer.states.selected =
			fontWeight: 600


	addEvents: =>
		@layer.onClick =>
			environmentController = @breadcrumbSectionContent.getBreadcrumbNavigationSection().getBreadcrumbNavigationController().getSidebar().getEnvironment().getEnvironmentController()
			environmentController.switchToEnvironment(@environmentLink, 0, 0, 0)

		@layer.onMouseOver =>
			@layer.animate("hover")
			@breadcrumbSectionContent.getBreadcrumbNavigationSection().getBreadcrumbNavigationController().getSidebar().getContextualNavigationController().hideVisibleDropdown()
		
		@layer.onMouseOut =>
			@layer.animate("default")
				
	switchStateSelected: =>
		@textLayer.stateSwitch("selected")
