class exports.Environment
	constructor: (@name, @breadcrumbsLayer) ->
		@sidebar = null
		@environmentController = null

		@breadcrumbsLayer.states.visible = 
			visible: true

	getName: =>
		return @name

	getBreadcrumbsLayer: () =>
		return @breadcrumbsLayer

	getSidebar: =>
		return @sidebar

	getEnvironmentController: () =>
		return @environmentController

	setSidebar: (newSidebar) =>
		@sidebar = newSidebar

	setEnvironmentController: (newController) =>
		@environmentController = newController

	breadcrumbsLayerSwitchStateVisile: () =>
		@breadcrumbsLayer.stateSwitch('visible')

	breadcrumbsLayerSwitchStateDefault: () =>
		@breadcrumbsLayer.stateSwitch('default')