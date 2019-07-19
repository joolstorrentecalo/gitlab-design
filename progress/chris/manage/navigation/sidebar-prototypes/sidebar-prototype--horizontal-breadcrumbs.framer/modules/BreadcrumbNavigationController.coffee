{Constants} = require "Constants"

class exports.BreadcrumbNavigationController
	constructor: (@name, @sidebar) ->
		@breadcrumbNavigationSections = []

		@layer = new Layer
			name: @name + 'breadcrumb_component'
			parent: @sidebar.getLayer()
			width: Constants.sidebarWidth
			backgroundColor: "transparent"
			y: 7

	getName: =>
		return @name

	getSidebar: =>
		return @sidebar

	getLayer: =>
		return @layer

	getBreadcrumbNavigationSections: =>
		return @breadcrumbNavigationSections

	addSection: (section) =>
		@breadcrumbNavigationSections.push(section)

	highlightLastElement: =>
		if @breadcrumbNavigationSections.length
			lastSection = @breadcrumbNavigationSections[@breadcrumbNavigationSections.length - 1]
			lastSectionRows = lastSection.getBreadcrumbNavigationContent().getBreadcrumbNavigationRows()
			
			if lastSectionRows.length
				lastRow = lastSectionRows[lastSectionRows.length - 1]
				lastRow.switchStateSelected()

	adjustHierarchyLineHeights: =>
		if @breadcrumbNavigationSections.length == 1
			section = @breadcrumbNavigationSections[0]

			if sectionContent = section.getBreadcrumbNavigationContent()
				rows = sectionContent.getBreadcrumbNavigationRows()
				if rows.length == 1
					sectionContent.getLine().visible = false

				else 
					sectionContent.getLine().height = Constants.rowHeight * rows.length - Constants.breadcrumbsImageWidth
					sectionContent.getLine().y = (Constants.rowHeight - Constants.breadcrumbsImageWidth) / 2

		else
			firstSection = @breadcrumbNavigationSections[0]
			lastSection = @breadcrumbNavigationSections[@breadcrumbNavigationSections.length - 1]

			firstSectionContent = firstSection.getBreadcrumbNavigationContent()
			firstSectionRows = firstSectionContent.getBreadcrumbNavigationRows()
			
			firstSectionContent.getLine().height = Constants.rowHeight * firstSectionRows.length - Math.ceil(Constants.breadcrumbsImageWidth / 2)
			firstSectionContent.getLine().y = Math.ceil((Constants.rowHeight - Constants.breadcrumbsImageWidth) / 2)
			

			lastSectionContent = lastSection.getBreadcrumbNavigationContent()
			lastSectionRows = lastSectionContent.getBreadcrumbNavigationRows()
			lastSectionContent.getLine().height = Constants.rowHeight * lastSectionRows.length - Math.ceil(Constants.breadcrumbsImageWidth / 2)



	recalculateVerticalBreadcrumbsPositions: () =>
		lastY = 0
		
		for section in @breadcrumbNavigationSections
			section.getLayer().y = lastY
			sectionContent = section.getBreadcrumbNavigationContent()

			lastY += Constants.breadcrumbsItemsPadding
			lastY += sectionContent.getLayer().height

		if lastY > 24
			separator = new Layer
				name: "breadcrumbs_separator"
				parent: @layer
				width: Constants.sidebarWidth - 20
				height: 1
				x: Align.center
				y: lastY + 16
				backgroundColor: "#e5e5e5"

			lastY += 33
		else
			lastY += 10

		@layer.height = lastY
		return lastY