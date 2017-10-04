{Constants} = require "Constants"

class exports.ContextualNavigationFirstLevelSection
	constructor: (@name, @contextualNavigationController, @index, numberOfSecondLayerRows) ->
		@firstLevelRow = null
		@secondLevelSection = null
		@dropdown = null

		@layer = new Layer
			name: @name + "_section"
			parent: @contextualNavigationController.getLayer()
			backgroundColor: "transparent"
			height: (numberOfSecondLayerRows + 1)* Constants.rowHeight
			width: Constants.sidebarWidth

	getFirstLevelRow: =>
		return @firstLevelRow

	getSecondLevelSection: =>
		return @secondLevelSection

	getDropdown: =>
		return @dropdown

	getName: =>
		return @name

	getContextualNavigationController: =>
		return @contextualNavigationController

	getIndex: =>
		return @index

	getLayer: =>
		return @layer

	setRow: (row) =>
		@firstLevelRow = row

	setSecondLevelSection: (section) =>
		@secondLevelSection = section

	setDropdown: (setDropdown) =>
		@dropdown = setDropdown


	makeActiveFromFirstLevelRow: =>

	makeActiveFromSecondLevelRow: =>

	makeActiveFromFirstAndSecondLevelRow: =>

		