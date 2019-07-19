{Constants} = require "Constants"

class exports.BreadcrumbNavigationSection

	constructor: (@name, @text, @breadcrumbNavigationController, @index) ->
		@breadcrumbNavigationContent = null # of BreadcrumbNavigationSectionContent

		@layer = new Layer
			name: @name + "_breadcrumb_section"
			parent: @breadcrumbNavigationController.getLayer()
			width: Constants.sidebarWidth
			backgroundColor: "transparent"
		
		@titleLayer = new TextLayer
			name: @name + "_breadcrumb_text"
			text: @text
			parent: @layer
			fontSize: 10
			color: "rgba(0,0,0,0.55)"
			y: Constants.breadcrumbsTitlePadding
			x: Constants.indentation


	getBreadcrumbNavigationContent: => # of BreadcrumbNavigationSectionContent
		return @breadcrumbNavigationContent

	getName: => #of String
		return @name

	getText: => #of String
		return @text

	getBreadcrumbNavigationController: => # of BreadcrumbNavigationController
		return @breadcrumbNavigationController

	getIndex: => # of Int
		return @index

	getLayer: => # of Layer
		return @layer

	getTitleLayer: => # of TextLayer
		return @titleLayer

	setContent: (content) => 
		@breadcrumbNavigationContent = content