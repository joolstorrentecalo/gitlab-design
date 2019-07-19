{Constants} = require "Constants"

class exports.BreadcrumbNavigationSectionContent
	constructor: (@name, @breadcrumbNavigationSection, numberOfRowsInSection) ->
		@breadcrumbNavigationRows = []

		@layer = new Layer
			name: @name + "_section_content"
			parent: @breadcrumbNavigationSection.getLayer()
			height: Constants.rowHeight * numberOfRowsInSection
			width: Constants.sidebarWidth
			y: Constants.breadcrumbsItemsPadding
			backgroundColor: "transparent"

		@line = new Layer
			name: @name + "_hierarchy_line"
			parent: @layer
			width: 1
			height: Constants.rowHeight * numberOfRowsInSection - 4
			x: Constants.indentation + 9
			y: 2
			backgroundColor: "#dcdcdc"

		@line.sendToBack()

	getBreadcrumbNavigationRows: =>
		return @breadcrumbNavigationRows

	getName: =>
		return @name

	getBreadcrumbNavigationSection: =>
		return @breadcrumbNavigationSection

	getLayer: =>
		return @layer

	getLine: =>
		return @line

	addRow: (row) =>
		@breadcrumbNavigationRows.push(row)