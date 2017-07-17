{Constants} = require "Constants"

class exports.ContextualNavigationController
	constructor: (@name, @sidebar) ->
		@firstLevelSections = []

		@selectedFirstLevelSectionIndex = 2
		@selectedSecondLevelRowIndex = 0
		@visibleDropdownIndex = null

		@layer = new Layer
			name: @name + '_contextual_navigation'
			parent: @sidebar.getLayer()
			width: Constants.sidebarWidth
			height: Screen.size.height
			backgroundColor: "transparent"


	getFirstLevelSections: =>
		return @firstLevelSections

	getSelectedFirstLevelSectionIndex: =>
		return @selectedFirstLevelSectionIndex

	getSelectedSecondLevelRowIndex: =>
		return @selectedSecondLevelRowIndex

	getVisibleDropdownIndex: =>
		return @visibleDropdownIndex

	getName: =>
		return @name

	getSidebar: =>
		return @sidebar

	getLayer: =>
		return @layer

	addSection: (section) =>
		@firstLevelSections.push(section)

	selectFirstLevelRowByIndex: (newFirstLevelSectionIndex) =>
		# Switch previous second-level row to default if it's in a different section or if it's different from the first one
		if @selectedFirstLevelSectionIndex != null
			currentSecondLevelSection = @firstLevelSections[@selectedFirstLevelSectionIndex].getSecondLevelSection()

			if currentSecondLevelSection.getSecondLevelRows().length
				if newFirstLevelSectionIndex != @selectedFirstLevelSectionIndex
					if @selectedSecondLevelRowIndex != null
						currentSecondLevelSection.getSecondLevelRows()[@selectedSecondLevelRowIndex].switchStateDefault()
					currentSecondLevelSection.switchStateCollapsed()
				else
					if @selectedSecondLevelRowIndex
						currentSecondLevelSection.getSecondLevelRows()[@selectedSecondLevelRowIndex].switchStateDefault()

		# Switch previous first-level section to default if it's different from the new one
		if @selectedFirstLevelSectionIndex != null
			if newFirstLevelSectionIndex != @selectedFirstLevelSectionIndex
				previouslySelectedSection = @firstLevelSections[@selectedFirstLevelSectionIndex]
				previouslySelectedSection.getFirstLevelRow().switchStateDefault()

		# Switch the new first-level selection to Selected, no matter if it's the same one that was already selected
		@selectedFirstLevelSectionIndex = newFirstLevelSectionIndex
		newFirstLevelSection = @firstLevelSections[@selectedFirstLevelSectionIndex]
		newFirstLevelSection.getFirstLevelRow().switchStateSelected()

		# Switch the second-level section to Selected sate
		newFirstLevelSection.getSecondLevelSection().switchStateDefault()

		# If there is a subsection, switch the first element on		
		if newFirstLevelSection.getSecondLevelSection().getSecondLevelRows().length > 0
			@selectedSecondLevelRowIndex = 0
			newFirstLevelSection.getSecondLevelSection().getSecondLevelRows()[@selectedSecondLevelRowIndex].switchStateSelected()
		else
			@selectedSecondLevelRowIndex = null

		@recalculateContextualPositions()
		@hideVisibleDropdown()

	setFirstLevelRowInRestingStateByIndex: (firstLevelSectionIndex) =>
		row = @firstLevelSections[firstLevelSectionIndex].getFirstLevelRow()
		if firstLevelSectionIndex == @selectedFirstLevelSectionIndex
			row.switchStateSelected()
		else
			row.switchStateDefault()

	setSelectedFirstLevelRowInDefaultState: () =>
		row = @firstLevelSections[@selectedFirstLevelSectionIndex].getFirstLevelRow()
		row.switchStateDefault()


	selectSecondLevelRowByIndex: (secondLevelRowIndex) =>
		# Change the previously-selected second-level row if the new one is different from the 
		firstLevelSection = @firstLevelSections[@selectedFirstLevelSectionIndex]
		rows = firstLevelSection.getSecondLevelSection().getSecondLevelRows()
		if rows.length
			if @selectedSecondLevelRowIndex != null
				if secondLevelRowIndex != @selectedSecondLevelRowIndex
					rows[@selectedSecondLevelRowIndex].switchStateDefault()

		# Change the new selected row to selected state, no matter if it was already selected
		if rows[secondLevelRowIndex] != null
			@selectedSecondLevelRowIndex = secondLevelRowIndex
			rows[@selectedSecondLevelRowIndex].switchStateSelected()
		else
			@selectedSecondLevelRowIndex = null

	setSecondLevelRowInRestingStateByIndex: (secondLevelRowIndex) =>
		if @selectedFirstLevelSectionIndex != null

			if row = @firstLevelSections[@selectedFirstLevelSectionIndex].getSecondLevelSection().getSecondLevelRows()[secondLevelRowIndex]
				if secondLevelRowIndex == @selectedSecondLevelRowIndex
					row.switchStateSelected()
				else
					row.switchStateDefault()


	setSelectedSecondLevelRowInDefaultState: () =>
		if @selectedFirstLevelSectionIndex != null
			if row = @firstLevelSections[@selectedFirstLevelSectionIndex].getSecondLevelSection().getSecondLevelRows()[@selectedSecondLevelRowIndex]
				row.switchStateDefault()


	setSelectedRowsInDefaultState: =>
		if @selectedSecondLevelRowIndex != null
			@setSelectedFirstLevelRowInDefaultState()

		if @selectedFirstLevelSectionIndex != null
			@setSelectedSecondLevelRowInDefaultState()

	selectDropdownRowByIndex: (newFirstLevelSectionIndex, newDropdownRowIndex) =>
		if @selectedFirstLevelSectionIndex != null
			# Disable previous second-level row (if there is one)
			currentSecondLevelSection = @firstLevelSections[@selectedFirstLevelSectionIndex].getSecondLevelSection()
			
			if currentSecondLevelSection.getSecondLevelRows().length
				if @selectedSecondLevelRowIndex != null
					currentSecondLevelSection.getSecondLevelRows()[@selectedSecondLevelRowIndex].switchStateDefault()
				
			# Disable previous second-level section
			currentSecondLevelSection.switchStateCollapsed()

			# Disable previous first-level row
			@firstLevelSections[@selectedFirstLevelSectionIndex].getFirstLevelRow().switchStateDefault()

		# Enable new first-level row
		@selectedFirstLevelSectionIndex = newFirstLevelSectionIndex
		newFirstLevelSection = @firstLevelSections[@selectedFirstLevelSectionIndex]
		newFirstLevelSection.getFirstLevelRow().switchStateSelected()

		# Enable new second-level section
		newSecondLevelSection = newFirstLevelSection.secondLevelSection
		newSecondLevelSection.switchStateDefault()

		# Enable new second-level row
		@selectedSecondLevelRowIndex = newDropdownRowIndex
		newSecondLevelSection.getSecondLevelRows()[@selectedSecondLevelRowIndex].switchStateSelected()

		# Clear active dropdown
		@hideVisibleDropdown()

		@recalculateContextualPositions()

	showDropdownByIndex: (newVisibleDropdownIndex) =>
		if newVisibleDropdownIndex != @selectedFirstLevelSectionIndex
			@visibleDropdownIndex = newVisibleDropdownIndex
			firstLevelSection = @firstLevelSections[@visibleDropdownIndex]

			dropdown = firstLevelSection.getDropdown()
			dropdown.switchStateVisible()

	hideVisibleDropdown: () =>
		if @visibleDropdownIndex != null
			@firstLevelSections[@visibleDropdownIndex].getDropdown().switchStateDefault()
			@visibleDropdownIndex = null

	recalculateContextualPositions: () =>
		lastY = 0

		for section in @firstLevelSections
			sectionLayer = section.getLayer()		
			sectionLayer.animate
				properties:
					y: lastY
				time: 0.3
				curve: Bezier.easeInOut
				
			lastY += Constants.rowHeight

			firstLevelRow = section.getFirstLevelRow()
			secondLevelSection = section.getSecondLevelSection()
			
			if @selectedFirstLevelSectionIndex == section.getIndex()
				secondLevelSection.animateStateDefault()
				
				secondLevelRows = secondLevelSection.getSecondLevelRows()
				lastY += secondLevelRows.length * Constants.rowHeight
			else
				secondLevelSection.animateStateCollapsed()
						
		@layer.height = lastY		

		return lastY