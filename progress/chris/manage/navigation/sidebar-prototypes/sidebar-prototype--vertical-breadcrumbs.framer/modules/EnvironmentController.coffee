{Environment} = require "Environment"
{Sidebar} = require "Sidebar"
{BreadcrumbNavigationController} = require "BreadcrumbNavigationController"
{BreadcrumbNavigationSection} = require "BreadcrumbNavigationSection"
{BreadcrumbNavigationSectionContent} = require "BreadcrumbNavigationSectionContent"
{BreadcrumbNavigationRow} = require "BreadcrumbNavigationRow"
{ContextualNavigationController} = require "ContextualNavigationController"
{ContextualNavigationFirstLevelSection} = require "ContextualNavigationFirstLevelSection"
{ContextualNavigationFirstLevelRow} = require "ContextualNavigationFirstLevelRow"
{ContextualNavigationSecondLevelSection} = require "ContextualNavigationSecondLevelSection"
{ContextualNavigationSecondLevelRow} = require "ContextualNavigationSecondLevelRow"
{ContextualNavigationDropdown} = require "ContextualNavigationDropdown"
{ContextualNavigationDropdownRow} = require "ContextualNavigationDropdownRow"
{ContentArea} = require "ContentArea"
{ContentAreaContainer} = require "ContentAreaContainer"
{Hotspot} = require "Hotspot"

class exports.EnvironmentController
	constructor: (info, topBarHeight) ->
		@environments = []
		@currentEnvironmentName = null
		
		ContentAreaContainer.setUpContentAreaContainer(topBarHeight, this)

		for environmentInfo in info
			name = environmentInfo['name']
			environment = new Environment(environmentInfo['name'])
			sidebar = new Sidebar(name, environment, topBarHeight)
			
			## Breadcrumbs
			breadcrumbNavigationController = new BreadcrumbNavigationController(name, sidebar)
			breadcrumbNavigationInfo = environmentInfo['breadcrumbs']
			
			for i in [0..breadcrumbNavigationInfo.length - 1] by 1
				breadcrumbSectionInfo = breadcrumbNavigationInfo[i]
				breadcrumbSection = new BreadcrumbNavigationSection(breadcrumbSectionInfo['name'], 
					breadcrumbSectionInfo['text'], 
					breadcrumbNavigationController, 
					i)

				breadcrumbSectionContent = new BreadcrumbNavigationSectionContent(
					breadcrumbSectionInfo['name'],
					breadcrumbSection,
					breadcrumbSectionInfo['rows'].length
					)

				breadcrumbSectionRowsInfo = breadcrumbSectionInfo['rows']
				for j in [0..breadcrumbSectionRowsInfo.length - 1] by 1
					rowInfo = breadcrumbSectionRowsInfo[j]
					breadcrumbRow = new BreadcrumbNavigationRow(
						rowInfo['name'], 
						rowInfo['text'],
						rowInfo['image'], 
						breadcrumbSectionContent, 
						rowInfo['environment_link']
						j)
					breadcrumbRow.getLayer().sendToBack()
					breadcrumbSectionContent.addRow(breadcrumbRow)
				
				breadcrumbSectionContent.getLine().sendToBack()
				breadcrumbSection.setContent(breadcrumbSectionContent)
				breadcrumbNavigationController.addSection(breadcrumbSection)

			breadcrumbNavigationController.highlightLastElement()
			breadcrumbNavigationController.adjustHierarchyLineHeights()
			sidebar.setBreadcrumbNavigationController(breadcrumbNavigationController)

			## Contextual Navigation && Content Area
			contextualNavigationController = new ContextualNavigationController(name, sidebar)
			contextualNavigationInfo = environmentInfo['contextual']

			# First-level sections and content
			for i in [0..contextualNavigationInfo.length - 1] by 1
				# First-level section
				firstLevelSectionInfo = contextualNavigationInfo[i]
				firstLevelRowInfo = firstLevelSectionInfo['first_level_row']
				secondLevelRowsInfo = firstLevelSectionInfo['second_level_rows']

				firstLevelSection = new ContextualNavigationFirstLevelSection(
					firstLevelRowInfo['name'], 
					contextualNavigationController, 
					i,
					secondLevelRowsInfo.length)

				# First-level row
				firstLevelRow = new ContextualNavigationFirstLevelRow(
					firstLevelRowInfo['name'],
					firstLevelRowInfo['text'],
					firstLevelSection)

				# Pages for first-level row
				firstLevelPagesInfo = firstLevelRowInfo['pages']
				if firstLevelPagesInfo.length
					for pageInfo in firstLevelPagesInfo
						firstLevelContentArea = new ContentArea(
							pageInfo['name'],
							pageInfo['image'],
							pageInfo['height'])

						for hotspotInfo in pageInfo['hotspots']
							firstLevelHotspot = new Hotspot(
								hotspotInfo['x'],
								hotspotInfo['y'],
								hotspotInfo['width'],
								hotspotInfo['height'],
								hotspotInfo['link']['environment'],
								hotspotInfo['link']['first_level_section_index'],
								hotspotInfo['link']['second_level_row_index'],
								hotspotInfo['link']['page_index'],
								firstLevelContentArea,
								environment
								)
							firstLevelContentArea.addHotspot(firstLevelHotspot)

						firstLevelRow.addContentArea(firstLevelContentArea)
				
				firstLevelSection.setRow(firstLevelRow)

				# Second-level section and dropdown
				secondLevelSection = new ContextualNavigationSecondLevelSection(
					firstLevelRowInfo['name'],
					firstLevelSection,
					firstLevelSectionInfo['second_level_rows'].length
					)

				dropdown = new ContextualNavigationDropdown(
					firstLevelRowInfo['name'],
					firstLevelSection)

				for j in [0..secondLevelRowsInfo.length - 1] by 1
					secondLevelRowInfo = secondLevelRowsInfo[j]
					
					secondLevelRow = new ContextualNavigationSecondLevelRow(
						secondLevelRowInfo['name'],
						secondLevelRowInfo['text'],
						secondLevelSection,
						j)

					# Content area for second-level row
					# Pages for second-level row
					secondLevelPagesInfo = secondLevelRowInfo['pages']
					if secondLevelPagesInfo.length 
						for pageInfo in secondLevelPagesInfo
							secondLevelContentArea = new ContentArea(
								pageInfo['name'],
								pageInfo['image'],
								pageInfo['height'])

							for hotspotInfo in pageInfo['hotspots']
								secondLevelHotspot = new Hotspot(
									hotspotInfo['x'],
									hotspotInfo['y'],
									hotspotInfo['width'],
									hotspotInfo['height'],
									hotspotInfo['link']['environment'],
									hotspotInfo['link']['first_level_section_index'],
									hotspotInfo['link']['second_level_row_index'],
									hotspotInfo['link']['page_index'],
									secondLevelContentArea,
									environment
									)
								secondLevelContentArea.addHotspot(secondLevelHotspot)

							secondLevelRow.addContentArea(secondLevelContentArea)

					secondLevelSection.addRow(secondLevelRow)

					dropdownRow = new ContextualNavigationDropdownRow(
						secondLevelRowInfo['name'],
						secondLevelRowInfo['text'],
						dropdown,
						j)
					dropdown.addRow(dropdownRow)

				firstLevelSection.setSecondLevelSection(secondLevelSection)
				firstLevelSection.setDropdown(dropdown)
				contextualNavigationController.addSection(firstLevelSection)

			sidebar.setContextualNavigationController(contextualNavigationController)
			sidebar.recalculatePositions()
			environment.setSidebar(sidebar)

			@environments.push(environment)

	addControllerReferenceToEnvironments: =>
		for environment in @environments
			environment.setEnvironmentController(this)

	getEnvironments: =>
		return @environments

	getCurrentEnvironmentName: =>
		return @currentEnvironmentName

	getCurrentEnvironment: =>
		for environment in @environments
			if environment.getName() == @currentEnvironmentName
				return environment

		return nil

	setUpInitialState: (initialStateInfo) =>
		@currentEnvironmentName = initialStateInfo['environment']

		for environment in @environments
			if environment.getName() == @currentEnvironmentName
				sidebar = environment.getSidebar()
				sidebar.switchStateVisible()

				contextualNavigationController = sidebar.getContextualNavigationController() 
				contextualNavigationController.selectFirstLevelRowByIndex(initialStateInfo['first_level_section_index'])

				firstLevelSection = contextualNavigationController.getFirstLevelSections()[initialStateInfo['first_level_section_index']]

				secondLevelRows = firstLevelSection.getSecondLevelSection().getSecondLevelRows()
				secondLevelSection = firstLevelSection.getSecondLevelSection()

				if secondLevelRows.length 
					secondLevelSection.switchStateDefault()
					if initialStateInfo['second_level_row_index'] != null
						contextualNavigationController.selectSecondLevelRowByIndex(initialStateInfo['second_level_row_index'])
						contextualNavigationController.recalculateContextualPositions()

				firstLevelRow = firstLevelSection.getFirstLevelRow()
				ContentAreaContainer.flow.showNext(firstLevelRow.getContentAreaByIndex(initialStateInfo['page_index']).getScroll(), animate:false)

				break

	switchToEnvironment: (newEnvironmentName, firstLevelSectionIndex, secondLevelRowIndex, pageIndex) =>
		# if @currentEnvironmentName != environmentName
		# 	# Deactivate the sections in the current 
		# 	# Hide the current one

		# Get the current and new environments
		currentEnvironment = null
		newEnvironment = null
		
		for environment in @environments
			if environment.getName() == @currentEnvironmentName
				currentEnvironment = environment

			if environment.getName() == newEnvironmentName
				newEnvironment = environment

			if currentEnvironment != null && newEnvironment != null
				break

		# Set the rows in the curren sidebar to resting state
		currentEnvironment.getSidebar().getContextualNavigationController().setSelectedRowsInDefaultState()

		# If they are different, hide the old sidebar
		if currentEnvironment != newEnvironment
			currentEnvironment.getSidebar().switchStateDefault()
			newEnvironment.getSidebar().switchStateVisible()

		newContextualNavigationController =	newEnvironment.getSidebar().getContextualNavigationController()
		newContextualNavigationController.selectFirstLevelRowByIndex(firstLevelSectionIndex)
		if secondLevelRowIndex
			newContextualNavigationController.selectSecondLevelRowByIndex(secondLevelRowIndex)

		newContentArea = null
		if secondLevelRowIndex
			# print newContextualNavigationController.getFirstLevelSections()[firstLevelSectionIndex].getSecondLevelSection().getSecondLevelRows
			newContentArea = newContextualNavigationController.getFirstLevelSections()[firstLevelSectionIndex].getSecondLevelSection().getSecondLevelRows()[secondLevelRowIndex].getContentAreas()[pageIndex]
		else
			newContentArea = newContextualNavigationController.getFirstLevelSections()[firstLevelSectionIndex].getFirstLevelRow().getContentAreas()[pageIndex]


		ContentAreaContainer.flow.showNext(newContentArea.getScroll(), animate:false)
		@currentEnvironmentName = newEnvironmentName
