class exports.Environment
	constructor: (@name) ->
		@sidebar = null
		@environmentController = null

	getSidebar: =>
		return @sidebar

	getName: =>
		return @name

	getEnvironmentController: () =>
		return @environmentController

	setSidebar: (newSidebar) =>
		@sidebar = newSidebar

	setEnvironmentController: (newController) =>
		@environmentController = newController
