{Constants} = require "Constants"

class exports.ContextualNavigationSecondLevelSection
	constructor: (@name, @firstLevelSection, numberOfSecondLayerRows) ->
		@secondLevelRows = []

		@layer = new Layer
			name: @name + "_sub_items"
			parent: @firstLevelSection.getLayer()
			backgroundColor: "transparent"
			height: numberOfSecondLayerRows * Constants.rowHeight
			width: Constants.sidebarWidth
			y: Constants.rowHeight
			clip: true
			
		@layer.states.default.animationOptions =
			time: 0.3
			curve: Bezier.easeInOut
			
		@layer.states.collapsed = 
			height: 0
			animationOptions:
				time: 0.3
				curve: Bezier.easeInOut

	getSecondLevelRows: =>
		return @secondLevelRows

	getName: =>
		return @name

	getFirstLevelSection: =>
		return @firstLevelSection

	getLayer: =>
		return @layer

	addRow: (row) =>
		@secondLevelRows.push(row)

	switchStateDefault: () =>
		@layer.stateSwitch("default")

	switchStateCollapsed: () => 
		@layer.stateSwitch("collapsed")

	animateStateDefault: () =>
		@layer.animate("default")

	animateStateCollapsed: () =>
		@layer.animate("collapsed")