{Constants} = require "Constants"

class exports.Sidebar
	constructor: (@name, @enviroment, topBarHeight) ->
		@breadcrumbNavigationController = null
		@contextualNavigationController = null

		@layer = new Layer
			name: @name + '_sidebar'
			width: Constants.sidebarWidth
			height: Screen.size.height - topBarHeight
			y: topBarHeight
			backgroundColor: "#fafafa"
			shadowX: 1
			shadowColor: "#e5e5e5"
			shadowBlur: 0
			visible: false

		@layer.states.visible =
			visible: true

	getBreadcrumbNavigationController: =>
		return @breadcrumbNavigationController

	getContextualNavigationController: =>
		return @contextualNavigationController

	getName: =>
		return @name

	getEnvironment: =>
		return @enviroment

	getLayer: =>
		return @layer

	switchStateVisible: =>
		@layer.stateSwitch("visible")

	switchStateDefault: =>
		@layer.stateSwitch("default")

	setBreadcrumbNavigationController: (setBreadcrumbNavigationController) =>
		@breadcrumbNavigationController = setBreadcrumbNavigationController

	setContextualNavigationController: (setContextualNavigationController) =>
		@contextualNavigationController = setContextualNavigationController

	recalculatePositions: =>
		breadcrumbs_height = @breadcrumbNavigationController.recalculateVerticalBreadcrumbsPositions()
		@contextualNavigationController.getLayer().y = breadcrumbs_height
		@contextualNavigationController.recalculateContextualPositions()

