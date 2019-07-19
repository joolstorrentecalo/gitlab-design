class exports.Hotspot
	constructor: (@x, @y, @width, @height, @environmentName, @firstLevelSectionIndex, @secondLevelRowIndex, @pageIndex, @contentArea, @environment) ->
		@layer = new Layer
			parent: @contentArea.getContent()
			x: @x
			y: @y
			width: @width
			height: @height
			backgroundColor: "transparent"

		@addEvents()


	getX: =>
		return @x

	getY: =>
		return @y

	getWidth: =>
		return @width

	getHeight: =>
		return @height

	getEnvironmentName: =>
		return @environmentName

	getFirstLevelSectionIndex: =>
		return @firstLevelSectionIndex

	getSecondLevelRowIndex: =>
		return @secondLevelRowIndex

	getPageIndex: =>
		return @pageIndex

	getContentArea: =>
		return @contentArea

	getLayer: =>
		return @layer

	addEvents: =>
		@layer.onClick =>
			@environment.environmentController.switchToEnvironment(@environmentName, @firstLevelSectionIndex, @secondLevelRowIndex, @pageIndex)
