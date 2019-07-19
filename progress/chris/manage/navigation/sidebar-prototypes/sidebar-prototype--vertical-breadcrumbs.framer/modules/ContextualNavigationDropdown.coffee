{Constants} = require "Constants"

class exports.ContextualNavigationDropdown

	constructor: (@name, @firstLevelSection) ->
		@dropdownRows = []

		@layer = new Layer
			name: @name + "_dropdown"
			parent: @firstLevelSection.getLayer()
			x: Constants.sidebarWidth + 1
			width: Constants.dropdownWidth
			backgroundColor: "transparent"
			visible: false
		
		@addStates()	
		@addEvents()

	getDropdownRows: =>
		return @dropdownRows

	getName: =>
		return @name

	getFirstLevelSection: =>
		return @firstLevelSection

	getLayer: =>
		return @layer

	addRow: (row) =>
		@dropdownRows.push(row)


	addStates: =>
		@layer.states.visible =
			visible: true

	addEvents: =>
		# @layer.onMouseOut =>
		# 	@switchStateDefault()
			
	switchStateDefault: =>
		@layer.stateSwitch("default")

	switchStateVisible: =>
		@layer.stateSwitch("visible")

