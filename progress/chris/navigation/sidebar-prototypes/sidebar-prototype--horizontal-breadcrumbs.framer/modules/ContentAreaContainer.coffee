{Constants} = require "Constants"

class exports.ContentAreaContainer
	@layer: null
	@flow: null

	@setUpContentAreaContainer: (topBarHeight) -> 
		ContentAreaContainer.layer = new Layer
			name: 'content_area_container'
			x: Constants.sidebarWidth + 1
			y: topBarHeight
			width: Screen.size.width - Constants.sidebarWidth - 1
			height: Screen.size.height - topBarHeight
			backgroundColor: "transparent"

		ContentAreaContainer.flow = new FlowComponent
			name: 'flow_component'
			parent: ContentAreaContainer.layer