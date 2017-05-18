require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"BreadcrumbNavigationController":[function(require,module,exports){
var Constants,
  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

Constants = require("Constants").Constants;

exports.BreadcrumbNavigationController = (function() {
  function BreadcrumbNavigationController(name, sidebar) {
    this.name = name;
    this.sidebar = sidebar;
    this.recalculateVerticalBreadcrumbsPositions = bind(this.recalculateVerticalBreadcrumbsPositions, this);
    this.adjustHierarchyLineHeights = bind(this.adjustHierarchyLineHeights, this);
    this.highlightLastElement = bind(this.highlightLastElement, this);
    this.addSection = bind(this.addSection, this);
    this.getBreadcrumbNavigationSections = bind(this.getBreadcrumbNavigationSections, this);
    this.getLayer = bind(this.getLayer, this);
    this.getSidebar = bind(this.getSidebar, this);
    this.getName = bind(this.getName, this);
    this.breadcrumbNavigationSections = [];
    this.layer = new Layer({
      name: this.name + 'breadcrumb_component',
      parent: this.sidebar.getLayer(),
      width: Constants.sidebarWidth,
      backgroundColor: "transparent",
      y: 7
    });
  }

  BreadcrumbNavigationController.prototype.getName = function() {
    return this.name;
  };

  BreadcrumbNavigationController.prototype.getSidebar = function() {
    return this.sidebar;
  };

  BreadcrumbNavigationController.prototype.getLayer = function() {
    return this.layer;
  };

  BreadcrumbNavigationController.prototype.getBreadcrumbNavigationSections = function() {
    return this.breadcrumbNavigationSections;
  };

  BreadcrumbNavigationController.prototype.addSection = function(section) {
    return this.breadcrumbNavigationSections.push(section);
  };

  BreadcrumbNavigationController.prototype.highlightLastElement = function() {
    var lastRow, lastSection, lastSectionRows;
    if (this.breadcrumbNavigationSections.length) {
      lastSection = this.breadcrumbNavigationSections[this.breadcrumbNavigationSections.length - 1];
      lastSectionRows = lastSection.getBreadcrumbNavigationContent().getBreadcrumbNavigationRows();
      if (lastSectionRows.length) {
        lastRow = lastSectionRows[lastSectionRows.length - 1];
        return lastRow.switchStateSelected();
      }
    }
  };

  BreadcrumbNavigationController.prototype.adjustHierarchyLineHeights = function() {
    var firstSection, firstSectionContent, firstSectionRows, lastSection, lastSectionContent, lastSectionRows, rows, section, sectionContent;
    if (this.breadcrumbNavigationSections.length === 1) {
      section = this.breadcrumbNavigationSections[0];
      if (sectionContent = section.getBreadcrumbNavigationContent()) {
        rows = sectionContent.getBreadcrumbNavigationRows();
        if (rows.length === 1) {
          return sectionContent.getLine().visible = false;
        } else {
          sectionContent.getLine().height = Constants.rowHeight * rows.length - Constants.breadcrumbsImageWidth;
          return sectionContent.getLine().y = (Constants.rowHeight - Constants.breadcrumbsImageWidth) / 2;
        }
      }
    } else {
      firstSection = this.breadcrumbNavigationSections[0];
      lastSection = this.breadcrumbNavigationSections[this.breadcrumbNavigationSections.length - 1];
      firstSectionContent = firstSection.getBreadcrumbNavigationContent();
      firstSectionRows = firstSectionContent.getBreadcrumbNavigationRows();
      firstSectionContent.getLine().height = Constants.rowHeight * firstSectionRows.length - Math.ceil(Constants.breadcrumbsImageWidth / 2);
      firstSectionContent.getLine().y = Math.ceil((Constants.rowHeight - Constants.breadcrumbsImageWidth) / 2);
      lastSectionContent = lastSection.getBreadcrumbNavigationContent();
      lastSectionRows = lastSectionContent.getBreadcrumbNavigationRows();
      return lastSectionContent.getLine().height = Constants.rowHeight * lastSectionRows.length - Math.ceil(Constants.breadcrumbsImageWidth / 2);
    }
  };

  BreadcrumbNavigationController.prototype.recalculateVerticalBreadcrumbsPositions = function() {
    var i, lastY, len, ref, section, sectionContent, separator;
    lastY = 0;
    ref = this.breadcrumbNavigationSections;
    for (i = 0, len = ref.length; i < len; i++) {
      section = ref[i];
      section.getLayer().y = lastY;
      sectionContent = section.getBreadcrumbNavigationContent();
      lastY += Constants.breadcrumbsItemsPadding;
      lastY += sectionContent.getLayer().height;
    }
    if (lastY > 24) {
      separator = new Layer({
        name: "breadcrumbs_separator",
        parent: this.layer,
        width: Constants.sidebarWidth - 20,
        height: 1,
        x: Align.center,
        y: lastY + 16,
        backgroundColor: "#e5e5e5"
      });
      lastY += 33;
    } else {
      lastY += 10;
    }
    this.layer.height = lastY;
    return lastY;
  };

  return BreadcrumbNavigationController;

})();


},{"Constants":"Constants"}],"BreadcrumbNavigationRow":[function(require,module,exports){
var Constants,
  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

Constants = require("Constants").Constants;

exports.BreadcrumbNavigationRow = (function() {
  function BreadcrumbNavigationRow(name, text, imagePath, breadcrumbSectionContent, environmentLink, index) {
    this.name = name;
    this.text = text;
    this.imagePath = imagePath;
    this.breadcrumbSectionContent = breadcrumbSectionContent;
    this.environmentLink = environmentLink;
    this.index = index;
    this.switchStateSelected = bind(this.switchStateSelected, this);
    this.addEvents = bind(this.addEvents, this);
    this.addStates = bind(this.addStates, this);
    this.getTextLayer = bind(this.getTextLayer, this);
    this.getImageLayer = bind(this.getImageLayer, this);
    this.getLayer = bind(this.getLayer, this);
    this.getIndex = bind(this.getIndex, this);
    this.getEnvironmentLink = bind(this.getEnvironmentLink, this);
    this.getBreadcrumbSectionContent = bind(this.getBreadcrumbSectionContent, this);
    this.getImagePath = bind(this.getImagePath, this);
    this.getText = bind(this.getText, this);
    this.getName = bind(this.getName, this);
    this.layer = new Layer({
      name: this.name + '_breadcrumb_row',
      parent: this.breadcrumbSectionContent.getLayer(),
      height: Constants.rowHeight,
      width: Constants.sidebarWidth,
      y: this.index * Constants.rowHeight,
      backgroundColor: "transparent"
    });
    this.imageLayer = new Layer({
      name: this.name + '_breacrumb_image',
      parent: this.layer,
      image: this.imagePath,
      width: Constants.breadcrumbsImageWidth,
      height: Constants.breadcrumbsImageWidth,
      x: Constants.indentation,
      y: Align.center
    });
    this.textLayer = new TextLayer({
      name: this.name + '_breacrumb_text',
      parent: this.layer,
      text: this.text,
      y: Align.center,
      x: 40,
      fontSize: Constants.rowFontSize,
      fontWeight: 400,
      fontFamily: "SF UI Text, Helvetica Neue, Helvetica, Arial, sans-serif",
      color: "#rgba(0,0,0,0.85)"
    });
    this.layer.bringToFront();
    this.addStates();
    this.addEvents();
  }

  BreadcrumbNavigationRow.prototype.getName = function() {
    return this.name;
  };

  BreadcrumbNavigationRow.prototype.getText = function() {
    return this.text;
  };

  BreadcrumbNavigationRow.prototype.getImagePath = function() {
    return this.imagePath;
  };

  BreadcrumbNavigationRow.prototype.getBreadcrumbSectionContent = function() {
    return this.breadcrumbSectionContent;
  };

  BreadcrumbNavigationRow.prototype.getEnvironmentLink = function() {
    return this.environmentLink;
  };

  BreadcrumbNavigationRow.prototype.getIndex = function() {
    return this.index;
  };

  BreadcrumbNavigationRow.prototype.getLayer = function() {
    return this.layer;
  };

  BreadcrumbNavigationRow.prototype.getImageLayer = function() {
    return this.imageLayer;
  };

  BreadcrumbNavigationRow.prototype.getTextLayer = function() {
    return this.textLayer;
  };

  BreadcrumbNavigationRow.prototype.addStates = function() {
    this.layer.states.hover = {
      backgroundColor: "#rgba(0,0,0,0.05)",
      animationOptions: {
        time: 0.1
      }
    };
    return this.textLayer.states.selected = {
      fontWeight: 600
    };
  };

  BreadcrumbNavigationRow.prototype.addEvents = function() {
    this.layer.onClick((function(_this) {
      return function() {
        var environmentController;
        environmentController = _this.breadcrumbSectionContent.getBreadcrumbNavigationSection().getBreadcrumbNavigationController().getSidebar().getEnvironment().getEnvironmentController();
        return environmentController.switchToEnvironment(_this.environmentLink, 0, 0, 0);
      };
    })(this));
    this.layer.onMouseOver((function(_this) {
      return function() {
        _this.layer.animate("hover");
        return _this.breadcrumbSectionContent.getBreadcrumbNavigationSection().getBreadcrumbNavigationController().getSidebar().getContextualNavigationController().hideVisibleDropdown();
      };
    })(this));
    return this.layer.onMouseOut((function(_this) {
      return function() {
        return _this.layer.animate("default");
      };
    })(this));
  };

  BreadcrumbNavigationRow.prototype.switchStateSelected = function() {
    return this.textLayer.stateSwitch("selected");
  };

  return BreadcrumbNavigationRow;

})();


},{"Constants":"Constants"}],"BreadcrumbNavigationSectionContent":[function(require,module,exports){
var Constants,
  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

Constants = require("Constants").Constants;

exports.BreadcrumbNavigationSectionContent = (function() {
  function BreadcrumbNavigationSectionContent(name, breadcrumbNavigationSection, numberOfRowsInSection) {
    this.name = name;
    this.breadcrumbNavigationSection = breadcrumbNavigationSection;
    this.addRow = bind(this.addRow, this);
    this.getLine = bind(this.getLine, this);
    this.getLayer = bind(this.getLayer, this);
    this.getBreadcrumbNavigationSection = bind(this.getBreadcrumbNavigationSection, this);
    this.getName = bind(this.getName, this);
    this.getBreadcrumbNavigationRows = bind(this.getBreadcrumbNavigationRows, this);
    this.breadcrumbNavigationRows = [];
    this.layer = new Layer({
      name: this.name + "_section_content",
      parent: this.breadcrumbNavigationSection.getLayer(),
      height: Constants.rowHeight * numberOfRowsInSection,
      width: Constants.sidebarWidth,
      y: Constants.breadcrumbsItemsPadding,
      backgroundColor: "transparent"
    });
    this.line = new Layer({
      name: this.name + "_hierarchy_line",
      parent: this.layer,
      width: 1,
      height: Constants.rowHeight * numberOfRowsInSection - 4,
      x: Constants.indentation + 9,
      y: 2,
      backgroundColor: "#dcdcdc"
    });
    this.line.sendToBack();
  }

  BreadcrumbNavigationSectionContent.prototype.getBreadcrumbNavigationRows = function() {
    return this.breadcrumbNavigationRows;
  };

  BreadcrumbNavigationSectionContent.prototype.getName = function() {
    return this.name;
  };

  BreadcrumbNavigationSectionContent.prototype.getBreadcrumbNavigationSection = function() {
    return this.breadcrumbNavigationSection;
  };

  BreadcrumbNavigationSectionContent.prototype.getLayer = function() {
    return this.layer;
  };

  BreadcrumbNavigationSectionContent.prototype.getLine = function() {
    return this.line;
  };

  BreadcrumbNavigationSectionContent.prototype.addRow = function(row) {
    return this.breadcrumbNavigationRows.push(row);
  };

  return BreadcrumbNavigationSectionContent;

})();


},{"Constants":"Constants"}],"BreadcrumbNavigationSection":[function(require,module,exports){
var Constants,
  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

Constants = require("Constants").Constants;

exports.BreadcrumbNavigationSection = (function() {
  function BreadcrumbNavigationSection(name, text, breadcrumbNavigationController, index) {
    this.name = name;
    this.text = text;
    this.breadcrumbNavigationController = breadcrumbNavigationController;
    this.index = index;
    this.setContent = bind(this.setContent, this);
    this.getTitleLayer = bind(this.getTitleLayer, this);
    this.getLayer = bind(this.getLayer, this);
    this.getIndex = bind(this.getIndex, this);
    this.getBreadcrumbNavigationController = bind(this.getBreadcrumbNavigationController, this);
    this.getText = bind(this.getText, this);
    this.getName = bind(this.getName, this);
    this.getBreadcrumbNavigationContent = bind(this.getBreadcrumbNavigationContent, this);
    this.breadcrumbNavigationContent = null;
    this.layer = new Layer({
      name: this.name + "_breadcrumb_section",
      parent: this.breadcrumbNavigationController.getLayer(),
      width: Constants.sidebarWidth,
      backgroundColor: "transparent"
    });
    this.titleLayer = new TextLayer({
      name: this.name + "_breadcrumb_text",
      text: this.text,
      parent: this.layer,
      fontSize: 10,
      color: "rgba(0,0,0,0.55)",
      y: Constants.breadcrumbsTitlePadding,
      x: Constants.indentation
    });
  }

  BreadcrumbNavigationSection.prototype.getBreadcrumbNavigationContent = function() {
    return this.breadcrumbNavigationContent;
  };

  BreadcrumbNavigationSection.prototype.getName = function() {
    return this.name;
  };

  BreadcrumbNavigationSection.prototype.getText = function() {
    return this.text;
  };

  BreadcrumbNavigationSection.prototype.getBreadcrumbNavigationController = function() {
    return this.breadcrumbNavigationController;
  };

  BreadcrumbNavigationSection.prototype.getIndex = function() {
    return this.index;
  };

  BreadcrumbNavigationSection.prototype.getLayer = function() {
    return this.layer;
  };

  BreadcrumbNavigationSection.prototype.getTitleLayer = function() {
    return this.titleLayer;
  };

  BreadcrumbNavigationSection.prototype.setContent = function(content) {
    return this.breadcrumbNavigationContent = content;
  };

  return BreadcrumbNavigationSection;

})();


},{"Constants":"Constants"}],"Constants":[function(require,module,exports){
exports.Constants = (function() {
  function Constants() {}

  Constants.sidebarWidth = 240;

  Constants.rowHeight = 35;

  Constants.selectedBorderWidth = 3;

  Constants.rowFontSize = 14;

  Constants.indentation = 16;

  Constants.breadcrumbsItemsPadding = 17;

  Constants.breadcrumbsTitlePadding = 3;

  Constants.breadcrumbsImageWidth = 19;

  Constants.dropdownWidth = 170;

  return Constants;

})();


},{}],"ContentAreaContainer":[function(require,module,exports){
var Constants;

Constants = require("Constants").Constants;

exports.ContentAreaContainer = (function() {
  function ContentAreaContainer() {}

  ContentAreaContainer.layer = null;

  ContentAreaContainer.flow = null;

  ContentAreaContainer.setUpContentAreaContainer = function(topBarHeight) {
    ContentAreaContainer.layer = new Layer({
      name: 'content_area_container',
      x: Constants.sidebarWidth + 1,
      y: topBarHeight,
      width: Screen.size.width - Constants.sidebarWidth - 1,
      height: Screen.size.height - topBarHeight,
      backgroundColor: "transparent"
    });
    return ContentAreaContainer.flow = new FlowComponent({
      name: 'flow_component',
      parent: ContentAreaContainer.layer
    });
  };

  return ContentAreaContainer;

})();


},{"Constants":"Constants"}],"ContentArea":[function(require,module,exports){
var ContentAreaContainer,
  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

ContentAreaContainer = require("ContentAreaContainer").ContentAreaContainer;

exports.ContentArea = (function() {
  function ContentArea(name, imagePath, height) {
    this.name = name;
    this.imagePath = imagePath;
    this.height = height;
    this.addHotspot = bind(this.addHotspot, this);
    this.getContent = bind(this.getContent, this);
    this.getScroll = bind(this.getScroll, this);
    this.getHeight = bind(this.getHeight, this);
    this.getImagePath = bind(this.getImagePath, this);
    this.getName = bind(this.getName, this);
    this.getHotspots = bind(this.getHotspots, this);
    this.hotspots = [];
    this.scroll = new ScrollComponent({
      name: this.name + '_scroll',
      parent: ContentAreaContainer.layer,
      width: ContentAreaContainer.layer.width,
      height: ContentAreaContainer.layer.height,
      mouseWheelEnabled: true,
      scrollHorizontal: false,
      visible: false
    });
    this.scroll.content.draggable = false;
    this.content = new Layer({
      name: this.name + "_content",
      parent: this.scroll.content,
      image: this.imagePath,
      width: ContentAreaContainer.layer.width,
      height: this.height
    });
  }

  ContentArea.prototype.getHotspots = function() {
    return this.hotstpots;
  };

  ContentArea.prototype.getName = function() {
    return this.name;
  };

  ContentArea.prototype.getImagePath = function() {
    return this.imagePath;
  };

  ContentArea.prototype.getHeight = function() {
    return this.height;
  };

  ContentArea.prototype.getScroll = function() {
    return this.scroll;
  };

  ContentArea.prototype.getContent = function() {
    return this.content;
  };

  ContentArea.prototype.addHotspot = function(hotspot) {
    return this.hotspots.push(hotspot);
  };

  return ContentArea;

})();


},{"ContentAreaContainer":"ContentAreaContainer"}],"ContextualNavigationController":[function(require,module,exports){
var Constants,
  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

Constants = require("Constants").Constants;

exports.ContextualNavigationController = (function() {
  function ContextualNavigationController(name, sidebar) {
    this.name = name;
    this.sidebar = sidebar;
    this.recalculateContextualPositions = bind(this.recalculateContextualPositions, this);
    this.hideVisibleDropdown = bind(this.hideVisibleDropdown, this);
    this.showDropdownByIndex = bind(this.showDropdownByIndex, this);
    this.selectDropdownRowByIndex = bind(this.selectDropdownRowByIndex, this);
    this.setSelectedRowsInDefaultState = bind(this.setSelectedRowsInDefaultState, this);
    this.setSelectedSecondLevelRowInDefaultState = bind(this.setSelectedSecondLevelRowInDefaultState, this);
    this.setSecondLevelRowInRestingStateByIndex = bind(this.setSecondLevelRowInRestingStateByIndex, this);
    this.selectSecondLevelRowByIndex = bind(this.selectSecondLevelRowByIndex, this);
    this.setSelectedFirstLevelRowInDefaultState = bind(this.setSelectedFirstLevelRowInDefaultState, this);
    this.setFirstLevelRowInRestingStateByIndex = bind(this.setFirstLevelRowInRestingStateByIndex, this);
    this.selectFirstLevelRowByIndex = bind(this.selectFirstLevelRowByIndex, this);
    this.addSection = bind(this.addSection, this);
    this.getLayer = bind(this.getLayer, this);
    this.getSidebar = bind(this.getSidebar, this);
    this.getName = bind(this.getName, this);
    this.getVisibleDropdownIndex = bind(this.getVisibleDropdownIndex, this);
    this.getSelectedSecondLevelRowIndex = bind(this.getSelectedSecondLevelRowIndex, this);
    this.getSelectedFirstLevelSectionIndex = bind(this.getSelectedFirstLevelSectionIndex, this);
    this.getFirstLevelSections = bind(this.getFirstLevelSections, this);
    this.firstLevelSections = [];
    this.selectedFirstLevelSectionIndex = 2;
    this.selectedSecondLevelRowIndex = 0;
    this.visibleDropdownIndex = null;
    this.layer = new Layer({
      name: this.name + '_contextual_navigation',
      parent: this.sidebar.getLayer(),
      width: Constants.sidebarWidth,
      height: Screen.size.height,
      backgroundColor: "transparent"
    });
  }

  ContextualNavigationController.prototype.getFirstLevelSections = function() {
    return this.firstLevelSections;
  };

  ContextualNavigationController.prototype.getSelectedFirstLevelSectionIndex = function() {
    return this.selectedFirstLevelSectionIndex;
  };

  ContextualNavigationController.prototype.getSelectedSecondLevelRowIndex = function() {
    return this.selectedSecondLevelRowIndex;
  };

  ContextualNavigationController.prototype.getVisibleDropdownIndex = function() {
    return this.visibleDropdownIndex;
  };

  ContextualNavigationController.prototype.getName = function() {
    return this.name;
  };

  ContextualNavigationController.prototype.getSidebar = function() {
    return this.sidebar;
  };

  ContextualNavigationController.prototype.getLayer = function() {
    return this.layer;
  };

  ContextualNavigationController.prototype.addSection = function(section) {
    return this.firstLevelSections.push(section);
  };

  ContextualNavigationController.prototype.selectFirstLevelRowByIndex = function(newFirstLevelSectionIndex) {
    var currentSecondLevelSection, newFirstLevelSection, previouslySelectedSection;
    if (this.selectedFirstLevelSectionIndex !== null) {
      currentSecondLevelSection = this.firstLevelSections[this.selectedFirstLevelSectionIndex].getSecondLevelSection();
      if (currentSecondLevelSection.getSecondLevelRows().length) {
        if (newFirstLevelSectionIndex !== this.selectedFirstLevelSectionIndex) {
          if (this.selectedSecondLevelRowIndex !== null) {
            currentSecondLevelSection.getSecondLevelRows()[this.selectedSecondLevelRowIndex].switchStateDefault();
          }
          currentSecondLevelSection.switchStateCollapsed();
        } else {
          if (this.selectedSecondLevelRowIndex) {
            currentSecondLevelSection.getSecondLevelRows()[this.selectedSecondLevelRowIndex].switchStateDefault();
          }
        }
      }
    }
    if (this.selectedFirstLevelSectionIndex !== null) {
      if (newFirstLevelSectionIndex !== this.selectedFirstLevelSectionIndex) {
        previouslySelectedSection = this.firstLevelSections[this.selectedFirstLevelSectionIndex];
        previouslySelectedSection.getFirstLevelRow().switchStateDefault();
      }
    }
    this.selectedFirstLevelSectionIndex = newFirstLevelSectionIndex;
    newFirstLevelSection = this.firstLevelSections[this.selectedFirstLevelSectionIndex];
    newFirstLevelSection.getFirstLevelRow().switchStateSelected();
    newFirstLevelSection.getSecondLevelSection().switchStateDefault();
    if (newFirstLevelSection.getSecondLevelSection().getSecondLevelRows().length > 0) {
      this.selectedSecondLevelRowIndex = 0;
      newFirstLevelSection.getSecondLevelSection().getSecondLevelRows()[this.selectedSecondLevelRowIndex].switchStateSelected();
    } else {
      this.selectedSecondLevelRowIndex = null;
    }
    this.recalculateContextualPositions();
    return this.hideVisibleDropdown();
  };

  ContextualNavigationController.prototype.setFirstLevelRowInRestingStateByIndex = function(firstLevelSectionIndex) {
    var row;
    row = this.firstLevelSections[firstLevelSectionIndex].getFirstLevelRow();
    if (firstLevelSectionIndex === this.selectedFirstLevelSectionIndex) {
      return row.switchStateSelected();
    } else {
      return row.switchStateDefault();
    }
  };

  ContextualNavigationController.prototype.setSelectedFirstLevelRowInDefaultState = function() {
    var row;
    row = this.firstLevelSections[this.selectedFirstLevelSectionIndex].getFirstLevelRow();
    return row.switchStateDefault();
  };

  ContextualNavigationController.prototype.selectSecondLevelRowByIndex = function(secondLevelRowIndex) {
    var firstLevelSection, rows;
    firstLevelSection = this.firstLevelSections[this.selectedFirstLevelSectionIndex];
    rows = firstLevelSection.getSecondLevelSection().getSecondLevelRows();
    if (rows.length) {
      if (this.selectedSecondLevelRowIndex !== null) {
        if (secondLevelRowIndex !== this.selectedSecondLevelRowIndex) {
          rows[this.selectedSecondLevelRowIndex].switchStateDefault();
        }
      }
    }
    if (rows[secondLevelRowIndex] !== null) {
      this.selectedSecondLevelRowIndex = secondLevelRowIndex;
      return rows[this.selectedSecondLevelRowIndex].switchStateSelected();
    } else {
      return this.selectedSecondLevelRowIndex = null;
    }
  };

  ContextualNavigationController.prototype.setSecondLevelRowInRestingStateByIndex = function(secondLevelRowIndex) {
    var row;
    if (this.selectedFirstLevelSectionIndex !== null) {
      if (row = this.firstLevelSections[this.selectedFirstLevelSectionIndex].getSecondLevelSection().getSecondLevelRows()[secondLevelRowIndex]) {
        if (secondLevelRowIndex === this.selectedSecondLevelRowIndex) {
          return row.switchStateSelected();
        } else {
          return row.switchStateDefault();
        }
      }
    }
  };

  ContextualNavigationController.prototype.setSelectedSecondLevelRowInDefaultState = function() {
    var row;
    if (this.selectedFirstLevelSectionIndex !== null) {
      if (row = this.firstLevelSections[this.selectedFirstLevelSectionIndex].getSecondLevelSection().getSecondLevelRows()[this.selectedSecondLevelRowIndex]) {
        return row.switchStateDefault();
      }
    }
  };

  ContextualNavigationController.prototype.setSelectedRowsInDefaultState = function() {
    if (this.selectedSecondLevelRowIndex !== null) {
      this.setSelectedFirstLevelRowInDefaultState();
    }
    if (this.selectedFirstLevelSectionIndex !== null) {
      return this.setSelectedSecondLevelRowInDefaultState();
    }
  };

  ContextualNavigationController.prototype.selectDropdownRowByIndex = function(newFirstLevelSectionIndex, newDropdownRowIndex) {
    var currentSecondLevelSection, newFirstLevelSection, newSecondLevelSection;
    if (this.selectedFirstLevelSectionIndex !== null) {
      currentSecondLevelSection = this.firstLevelSections[this.selectedFirstLevelSectionIndex].getSecondLevelSection();
      if (currentSecondLevelSection.getSecondLevelRows().length) {
        if (this.selectedSecondLevelRowIndex !== null) {
          currentSecondLevelSection.getSecondLevelRows()[this.selectedSecondLevelRowIndex].switchStateDefault();
        }
      }
      currentSecondLevelSection.switchStateCollapsed();
      this.firstLevelSections[this.selectedFirstLevelSectionIndex].getFirstLevelRow().switchStateDefault();
    }
    this.selectedFirstLevelSectionIndex = newFirstLevelSectionIndex;
    newFirstLevelSection = this.firstLevelSections[this.selectedFirstLevelSectionIndex];
    newFirstLevelSection.getFirstLevelRow().switchStateSelected();
    newSecondLevelSection = newFirstLevelSection.secondLevelSection;
    newSecondLevelSection.switchStateDefault();
    this.selectedSecondLevelRowIndex = newDropdownRowIndex;
    newSecondLevelSection.getSecondLevelRows()[this.selectedSecondLevelRowIndex].switchStateSelected();
    this.hideVisibleDropdown();
    return this.recalculateContextualPositions();
  };

  ContextualNavigationController.prototype.showDropdownByIndex = function(newVisibleDropdownIndex) {
    var dropdown, firstLevelSection;
    if (newVisibleDropdownIndex !== this.selectedFirstLevelSectionIndex) {
      this.visibleDropdownIndex = newVisibleDropdownIndex;
      firstLevelSection = this.firstLevelSections[this.visibleDropdownIndex];
      dropdown = firstLevelSection.getDropdown();
      return dropdown.switchStateVisible();
    }
  };

  ContextualNavigationController.prototype.hideVisibleDropdown = function() {
    if (this.visibleDropdownIndex !== null) {
      this.firstLevelSections[this.visibleDropdownIndex].getDropdown().switchStateDefault();
      return this.visibleDropdownIndex = null;
    }
  };

  ContextualNavigationController.prototype.recalculateContextualPositions = function() {
    var firstLevelRow, i, lastY, len, ref, secondLevelRows, secondLevelSection, section, sectionLayer;
    lastY = 0;
    ref = this.firstLevelSections;
    for (i = 0, len = ref.length; i < len; i++) {
      section = ref[i];
      sectionLayer = section.getLayer();
      sectionLayer.animate({
        properties: {
          y: lastY
        },
        time: 0.3,
        curve: Bezier.easeInOut
      });
      lastY += Constants.rowHeight;
      firstLevelRow = section.getFirstLevelRow();
      secondLevelSection = section.getSecondLevelSection();
      if (this.selectedFirstLevelSectionIndex === section.getIndex()) {
        secondLevelSection.animateStateDefault();
        secondLevelRows = secondLevelSection.getSecondLevelRows();
        lastY += secondLevelRows.length * Constants.rowHeight;
      } else {
        secondLevelSection.animateStateCollapsed();
      }
    }
    this.layer.height = lastY;
    return lastY;
  };

  return ContextualNavigationController;

})();


},{"Constants":"Constants"}],"ContextualNavigationDropdownRow":[function(require,module,exports){
var Constants, ContentAreaContainer,
  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

ContentAreaContainer = require("ContentAreaContainer").ContentAreaContainer;

Constants = require("Constants").Constants;

exports.ContextualNavigationDropdownRow = (function() {
  function ContextualNavigationDropdownRow(name, text, dropdown, index) {
    this.name = name;
    this.text = text;
    this.dropdown = dropdown;
    this.index = index;
    this.addEvents = bind(this.addEvents, this);
    this.addStates = bind(this.addStates, this);
    this.getTextLayer = bind(this.getTextLayer, this);
    this.getLayer = bind(this.getLayer, this);
    this.getIndex = bind(this.getIndex, this);
    this.getDropdown = bind(this.getDropdown, this);
    this.getText = bind(this.getText, this);
    this.getName = bind(this.getName, this);
    this.contextualNavigationController = this.dropdown.getFirstLevelSection().getContextualNavigationController();
    this.layer = new Layer({
      name: this.name + "_dropdown_row",
      parent: this.dropdown.getLayer(),
      y: this.index * Constants.rowHeight,
      height: Constants.rowHeight,
      width: Constants.dropdownWidth,
      backgroundColor: "#f5f5f5"
    });
    this.textLayer = new TextLayer({
      name: this.name + "_dropdown_text",
      parent: this.layer,
      text: this.text,
      fontSize: Constants.rowFontSize,
      x: Constants.indentation,
      y: Align.center,
      color: "rgba(0,0,0,0.85)"
    });
    this.addStates();
    this.addEvents();
  }

  ContextualNavigationDropdownRow.prototype.getName = function() {
    return this.name;
  };

  ContextualNavigationDropdownRow.prototype.getText = function() {
    return this.text;
  };

  ContextualNavigationDropdownRow.prototype.getDropdown = function() {
    return this.dropdown;
  };

  ContextualNavigationDropdownRow.prototype.getIndex = function() {
    return this.index;
  };

  ContextualNavigationDropdownRow.prototype.getLayer = function() {
    return this.layer;
  };

  ContextualNavigationDropdownRow.prototype.getTextLayer = function() {
    return this.textLayer;
  };

  ContextualNavigationDropdownRow.prototype.addStates = function() {
    return this.layer.states.hover = {
      backgroundColor: "#ececec",
      animationOptions: {
        time: 0.1
      }
    };
  };

  ContextualNavigationDropdownRow.prototype.addEvents = function() {
    this.layer.onMouseOver((function(_this) {
      return function() {
        return _this.layer.animate("hover");
      };
    })(this));
    this.layer.onMouseOut((function(_this) {
      return function() {
        return _this.layer.animate("default");
      };
    })(this));
    return this.layer.onClick((function(_this) {
      return function() {
        var contentAreas, secondLevelRow;
        secondLevelRow = _this.dropdown.getFirstLevelSection().getSecondLevelSection().getSecondLevelRows()[_this.index];
        contentAreas = secondLevelRow.getContentAreas();
        if (contentAreas.length) {
          _this.contextualNavigationController.selectDropdownRowByIndex(_this.dropdown.getFirstLevelSection().getIndex(), _this.index);
          return ContentAreaContainer.flow.showNext(contentAreas[0].getScroll(), {
            animate: false
          });
        }
      };
    })(this));
  };

  return ContextualNavigationDropdownRow;

})();


},{"Constants":"Constants","ContentAreaContainer":"ContentAreaContainer"}],"ContextualNavigationDropdown":[function(require,module,exports){
var Constants,
  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

Constants = require("Constants").Constants;

exports.ContextualNavigationDropdown = (function() {
  function ContextualNavigationDropdown(name, firstLevelSection) {
    this.name = name;
    this.firstLevelSection = firstLevelSection;
    this.switchStateVisible = bind(this.switchStateVisible, this);
    this.switchStateDefault = bind(this.switchStateDefault, this);
    this.addEvents = bind(this.addEvents, this);
    this.addStates = bind(this.addStates, this);
    this.addRow = bind(this.addRow, this);
    this.getLayer = bind(this.getLayer, this);
    this.getFirstLevelSection = bind(this.getFirstLevelSection, this);
    this.getName = bind(this.getName, this);
    this.getDropdownRows = bind(this.getDropdownRows, this);
    this.dropdownRows = [];
    this.layer = new Layer({
      name: this.name + "_dropdown",
      parent: this.firstLevelSection.getLayer(),
      x: Constants.sidebarWidth + 1,
      width: Constants.dropdownWidth,
      backgroundColor: "transparent",
      visible: false
    });
    this.addStates();
    this.addEvents();
  }

  ContextualNavigationDropdown.prototype.getDropdownRows = function() {
    return this.dropdownRows;
  };

  ContextualNavigationDropdown.prototype.getName = function() {
    return this.name;
  };

  ContextualNavigationDropdown.prototype.getFirstLevelSection = function() {
    return this.firstLevelSection;
  };

  ContextualNavigationDropdown.prototype.getLayer = function() {
    return this.layer;
  };

  ContextualNavigationDropdown.prototype.addRow = function(row) {
    return this.dropdownRows.push(row);
  };

  ContextualNavigationDropdown.prototype.addStates = function() {
    return this.layer.states.visible = {
      visible: true
    };
  };

  ContextualNavigationDropdown.prototype.addEvents = function() {};

  ContextualNavigationDropdown.prototype.switchStateDefault = function() {
    return this.layer.stateSwitch("default");
  };

  ContextualNavigationDropdown.prototype.switchStateVisible = function() {
    return this.layer.stateSwitch("visible");
  };

  return ContextualNavigationDropdown;

})();


},{"Constants":"Constants"}],"ContextualNavigationFirstLevelRow":[function(require,module,exports){
var Constants, ContentAreaContainer, Row,
  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

ContentAreaContainer = require("ContentAreaContainer").ContentAreaContainer;

Constants = require("Constants").Constants;

Row = require("Row").Row;

exports.ContextualNavigationFirstLevelRow = (function(superClass) {
  extend(ContextualNavigationFirstLevelRow, superClass);

  function ContextualNavigationFirstLevelRow(name, text, firstLevelSection) {
    this.name = name;
    this.text = text;
    this.firstLevelSection = firstLevelSection;
    this.switchStateDefault = bind(this.switchStateDefault, this);
    this.switchStateSelected = bind(this.switchStateSelected, this);
    this.switchStateHover = bind(this.switchStateHover, this);
    this.addEvents = bind(this.addEvents, this);
    this.addStates = bind(this.addStates, this);
    this.addContentArea = bind(this.addContentArea, this);
    this.getContextualNavigationController = bind(this.getContextualNavigationController, this);
    this.getContentAreaByIndex = bind(this.getContentAreaByIndex, this);
    this.getContentAreas = bind(this.getContentAreas, this);
    this.getFirstLevelSection = bind(this.getFirstLevelSection, this);
    this.getText = bind(this.getText, this);
    this.getName = bind(this.getName, this);
    this.contentAreas = [];
    ContextualNavigationFirstLevelRow.__super__.constructor.call(this, this.name, this.text, Constants.sidebarWidth, this.firstLevelSection.getLayer());
    this.contextualNavigationController = this.firstLevelSection.getContextualNavigationController();
    this.layer.backgroundColor = "#fafafa";
    this.textLayer.x = Constants.indentation;
    this.textLayer.width = this.width - Constants.indentation;
    this.selectedBorderLayer.visible = false;
    this.addStates();
    this.addEvents();
  }

  ContextualNavigationFirstLevelRow.prototype.getName = function() {
    return this.name;
  };

  ContextualNavigationFirstLevelRow.prototype.getText = function() {
    return this.text;
  };

  ContextualNavigationFirstLevelRow.prototype.getFirstLevelSection = function() {
    return this.firstLevelSection;
  };

  ContextualNavigationFirstLevelRow.prototype.getContentAreas = function() {
    return this.contentAreas;
  };

  ContextualNavigationFirstLevelRow.prototype.getContentAreaByIndex = function(index) {
    return this.contentAreas[index];
  };

  ContextualNavigationFirstLevelRow.prototype.getContextualNavigationController = function() {
    return this.contextualNavigationController;
  };

  ContextualNavigationFirstLevelRow.prototype.addContentArea = function(contentArea) {
    return this.contentAreas.push(contentArea);
  };

  ContextualNavigationFirstLevelRow.prototype.addStates = function() {
    this.layer.states.hover = {
      backgroundColor: "ececec",
      animationOptions: {
        time: 0.1
      }
    };
    this.layer.states.selected = {
      backgroundColor: "#f5f5f5"
    };
    this.textLayer.states.selected = {
      fontWeight: 600
    };
    return this.selectedBorderLayer.states.visible = {
      visible: true
    };
  };

  ContextualNavigationFirstLevelRow.prototype.addEvents = function() {
    this.layer.onClick((function(_this) {
      return function() {
        if (_this.contentAreas.length) {
          _this.contextualNavigationController.selectFirstLevelRowByIndex(_this.firstLevelSection.getIndex());
          return ContentAreaContainer.flow.showNext(_this.contentAreas[0].getScroll(), {
            animate: false
          });
        }
      };
    })(this));
    this.layer.onMouseOver((function(_this) {
      return function() {
        _this.layer.animate("hover");
        _this.contextualNavigationController.hideVisibleDropdown();
        return _this.contextualNavigationController.showDropdownByIndex(_this.firstLevelSection.getIndex());
      };
    })(this));
    return this.layer.onMouseOut((function(_this) {
      return function() {
        return _this.contextualNavigationController.setFirstLevelRowInRestingStateByIndex(_this.firstLevelSection.getIndex());
      };
    })(this));
  };

  ContextualNavigationFirstLevelRow.prototype.switchStateHover = function() {
    return this.layer.stateSwitch("hover");
  };

  ContextualNavigationFirstLevelRow.prototype.switchStateSelected = function() {
    this.layer.stateSwitch("selected");
    this.textLayer.stateSwitch("selected");
    return this.selectedBorderLayer.stateSwitch("visible");
  };

  ContextualNavigationFirstLevelRow.prototype.switchStateDefault = function() {
    this.layer.stateSwitch("default");
    this.textLayer.stateSwitch("default");
    return this.selectedBorderLayer.stateSwitch("default");
  };

  return ContextualNavigationFirstLevelRow;

})(Row);


},{"Constants":"Constants","ContentAreaContainer":"ContentAreaContainer","Row":"Row"}],"ContextualNavigationFirstLevelSection":[function(require,module,exports){
var Constants,
  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

Constants = require("Constants").Constants;

exports.ContextualNavigationFirstLevelSection = (function() {
  function ContextualNavigationFirstLevelSection(name, contextualNavigationController, index, numberOfSecondLayerRows) {
    this.name = name;
    this.contextualNavigationController = contextualNavigationController;
    this.index = index;
    this.makeActiveFromFirstAndSecondLevelRow = bind(this.makeActiveFromFirstAndSecondLevelRow, this);
    this.makeActiveFromSecondLevelRow = bind(this.makeActiveFromSecondLevelRow, this);
    this.makeActiveFromFirstLevelRow = bind(this.makeActiveFromFirstLevelRow, this);
    this.setDropdown = bind(this.setDropdown, this);
    this.setSecondLevelSection = bind(this.setSecondLevelSection, this);
    this.setRow = bind(this.setRow, this);
    this.getLayer = bind(this.getLayer, this);
    this.getIndex = bind(this.getIndex, this);
    this.getContextualNavigationController = bind(this.getContextualNavigationController, this);
    this.getName = bind(this.getName, this);
    this.getDropdown = bind(this.getDropdown, this);
    this.getSecondLevelSection = bind(this.getSecondLevelSection, this);
    this.getFirstLevelRow = bind(this.getFirstLevelRow, this);
    this.firstLevelRow = null;
    this.secondLevelSection = null;
    this.dropdown = null;
    this.layer = new Layer({
      name: this.name + "_section",
      parent: this.contextualNavigationController.getLayer(),
      backgroundColor: "transparent",
      height: (numberOfSecondLayerRows + 1) * Constants.rowHeight,
      width: Constants.sidebarWidth
    });
  }

  ContextualNavigationFirstLevelSection.prototype.getFirstLevelRow = function() {
    return this.firstLevelRow;
  };

  ContextualNavigationFirstLevelSection.prototype.getSecondLevelSection = function() {
    return this.secondLevelSection;
  };

  ContextualNavigationFirstLevelSection.prototype.getDropdown = function() {
    return this.dropdown;
  };

  ContextualNavigationFirstLevelSection.prototype.getName = function() {
    return this.name;
  };

  ContextualNavigationFirstLevelSection.prototype.getContextualNavigationController = function() {
    return this.contextualNavigationController;
  };

  ContextualNavigationFirstLevelSection.prototype.getIndex = function() {
    return this.index;
  };

  ContextualNavigationFirstLevelSection.prototype.getLayer = function() {
    return this.layer;
  };

  ContextualNavigationFirstLevelSection.prototype.setRow = function(row) {
    return this.firstLevelRow = row;
  };

  ContextualNavigationFirstLevelSection.prototype.setSecondLevelSection = function(section) {
    return this.secondLevelSection = section;
  };

  ContextualNavigationFirstLevelSection.prototype.setDropdown = function(setDropdown) {
    return this.dropdown = setDropdown;
  };

  ContextualNavigationFirstLevelSection.prototype.makeActiveFromFirstLevelRow = function() {};

  ContextualNavigationFirstLevelSection.prototype.makeActiveFromSecondLevelRow = function() {};

  ContextualNavigationFirstLevelSection.prototype.makeActiveFromFirstAndSecondLevelRow = function() {};

  return ContextualNavigationFirstLevelSection;

})();


},{"Constants":"Constants"}],"ContextualNavigationSecondLevelRow":[function(require,module,exports){
var Constants, ContentAreaContainer, Row,
  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

ContentAreaContainer = require("ContentAreaContainer").ContentAreaContainer;

Constants = require("Constants").Constants;

Row = require("Row").Row;

exports.ContextualNavigationSecondLevelRow = (function(superClass) {
  extend(ContextualNavigationSecondLevelRow, superClass);

  function ContextualNavigationSecondLevelRow(name, text, secondLevelSection, index1) {
    this.name = name;
    this.text = text;
    this.secondLevelSection = secondLevelSection;
    this.index = index1;
    this.switchStateDefault = bind(this.switchStateDefault, this);
    this.switchStateSelected = bind(this.switchStateSelected, this);
    this.addEvents = bind(this.addEvents, this);
    this.addStates = bind(this.addStates, this);
    this.addContentArea = bind(this.addContentArea, this);
    this.getIndex = bind(this.getIndex, this);
    this.getContentAreaByIndex = bind(this.getContentAreaByIndex, this);
    this.getContentAreas = bind(this.getContentAreas, this);
    this.getSecondLevelSection = bind(this.getSecondLevelSection, this);
    this.getText = bind(this.getText, this);
    this.getName = bind(this.getName, this);
    this.contentAreas = [];
    ContextualNavigationSecondLevelRow.__super__.constructor.call(this, this.name, this.text, Constants.sidebarWidth, this.secondLevelSection.getLayer());
    this.contextualNavigationController = this.secondLevelSection.getFirstLevelSection().getContextualNavigationController();
    this.layer.y = this.index * Constants.rowHeight;
    this.layer.backgroundColor = "#f5f5f5";
    this.textLayer.x = Constants.indentation * 2;
    this.textLayer.width = Constants.sidebarWidth - Constants.indentation * (this.layer.clip = true);
    this.addStates();
    this.addEvents();
  }

  ContextualNavigationSecondLevelRow.prototype.getName = function() {
    return this.name;
  };

  ContextualNavigationSecondLevelRow.prototype.getText = function() {
    return this.text;
  };

  ContextualNavigationSecondLevelRow.prototype.getSecondLevelSection = function() {
    return this.secondLevelSection;
  };

  ContextualNavigationSecondLevelRow.prototype.getContentAreas = function() {
    return this.contentAreas;
  };

  ContextualNavigationSecondLevelRow.prototype.getContentAreaByIndex = function(index) {
    return this.contentAreas[index];
  };

  ContextualNavigationSecondLevelRow.prototype.getIndex = function() {
    return this.index;
  };

  ContextualNavigationSecondLevelRow.prototype.addContentArea = function(contentArea) {
    return this.contentAreas.push(contentArea);
  };

  ContextualNavigationSecondLevelRow.prototype.addStates = function() {
    this.layer.states.hover = {
      backgroundColor: "#ececec",
      animationOptions: {
        time: 0.1
      }
    };
    this.layer.states.selected = {
      backgroundColor: "#ececec"
    };
    return this.textLayer.states.selected = {
      fontWeight: 600,
      color: "#4a8bee"
    };
  };

  ContextualNavigationSecondLevelRow.prototype.addEvents = function() {
    this.layer.onClick((function(_this) {
      return function() {
        if (_this.contentAreas.length) {
          _this.contextualNavigationController.selectSecondLevelRowByIndex(_this.index);
          return ContentAreaContainer.flow.showNext(_this.contentAreas[0].getScroll(), {
            animate: false
          });
        }
      };
    })(this));
    this.layer.onMouseOver((function(_this) {
      return function() {
        _this.layer.animate("hover");
        return _this.contextualNavigationController.hideVisibleDropdown();
      };
    })(this));
    return this.layer.onMouseOut((function(_this) {
      return function() {
        return _this.contextualNavigationController.setSecondLevelRowInRestingStateByIndex(_this.index);
      };
    })(this));
  };

  ContextualNavigationSecondLevelRow.prototype.switchStateSelected = function() {
    this.layer.stateSwitch("selected");
    return this.textLayer.stateSwitch("selected");
  };

  ContextualNavigationSecondLevelRow.prototype.switchStateDefault = function() {
    this.layer.stateSwitch("default");
    return this.textLayer.stateSwitch("default");
  };

  return ContextualNavigationSecondLevelRow;

})(Row);


},{"Constants":"Constants","ContentAreaContainer":"ContentAreaContainer","Row":"Row"}],"ContextualNavigationSecondLevelSection":[function(require,module,exports){
var Constants,
  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

Constants = require("Constants").Constants;

exports.ContextualNavigationSecondLevelSection = (function() {
  function ContextualNavigationSecondLevelSection(name, firstLevelSection, numberOfSecondLayerRows) {
    this.name = name;
    this.firstLevelSection = firstLevelSection;
    this.animateStateCollapsed = bind(this.animateStateCollapsed, this);
    this.animateStateDefault = bind(this.animateStateDefault, this);
    this.switchStateCollapsed = bind(this.switchStateCollapsed, this);
    this.switchStateDefault = bind(this.switchStateDefault, this);
    this.addRow = bind(this.addRow, this);
    this.getLayer = bind(this.getLayer, this);
    this.getFirstLevelSection = bind(this.getFirstLevelSection, this);
    this.getName = bind(this.getName, this);
    this.getSecondLevelRows = bind(this.getSecondLevelRows, this);
    this.secondLevelRows = [];
    this.layer = new Layer({
      name: this.name + "_sub_items",
      parent: this.firstLevelSection.getLayer(),
      backgroundColor: "transparent",
      height: numberOfSecondLayerRows * Constants.rowHeight,
      width: Constants.sidebarWidth,
      y: Constants.rowHeight,
      clip: true
    });
    this.layer.states["default"].animationOptions = {
      time: 0.3,
      curve: Bezier.easeInOut
    };
    this.layer.states.collapsed = {
      height: 0,
      animationOptions: {
        time: 0.3,
        curve: Bezier.easeInOut
      }
    };
  }

  ContextualNavigationSecondLevelSection.prototype.getSecondLevelRows = function() {
    return this.secondLevelRows;
  };

  ContextualNavigationSecondLevelSection.prototype.getName = function() {
    return this.name;
  };

  ContextualNavigationSecondLevelSection.prototype.getFirstLevelSection = function() {
    return this.firstLevelSection;
  };

  ContextualNavigationSecondLevelSection.prototype.getLayer = function() {
    return this.layer;
  };

  ContextualNavigationSecondLevelSection.prototype.addRow = function(row) {
    return this.secondLevelRows.push(row);
  };

  ContextualNavigationSecondLevelSection.prototype.switchStateDefault = function() {
    return this.layer.stateSwitch("default");
  };

  ContextualNavigationSecondLevelSection.prototype.switchStateCollapsed = function() {
    return this.layer.stateSwitch("collapsed");
  };

  ContextualNavigationSecondLevelSection.prototype.animateStateDefault = function() {
    return this.layer.animate("default");
  };

  ContextualNavigationSecondLevelSection.prototype.animateStateCollapsed = function() {
    return this.layer.animate("collapsed");
  };

  return ContextualNavigationSecondLevelSection;

})();


},{"Constants":"Constants"}],"EnvironmentController":[function(require,module,exports){
var BreadcrumbNavigationController, BreadcrumbNavigationRow, BreadcrumbNavigationSection, BreadcrumbNavigationSectionContent, ContentArea, ContentAreaContainer, ContextualNavigationController, ContextualNavigationDropdown, ContextualNavigationDropdownRow, ContextualNavigationFirstLevelRow, ContextualNavigationFirstLevelSection, ContextualNavigationSecondLevelRow, ContextualNavigationSecondLevelSection, Environment, Hotspot, Sidebar,
  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

Environment = require("Environment").Environment;

Sidebar = require("Sidebar").Sidebar;

BreadcrumbNavigationController = require("BreadcrumbNavigationController").BreadcrumbNavigationController;

BreadcrumbNavigationSection = require("BreadcrumbNavigationSection").BreadcrumbNavigationSection;

BreadcrumbNavigationSectionContent = require("BreadcrumbNavigationSectionContent").BreadcrumbNavigationSectionContent;

BreadcrumbNavigationRow = require("BreadcrumbNavigationRow").BreadcrumbNavigationRow;

ContextualNavigationController = require("ContextualNavigationController").ContextualNavigationController;

ContextualNavigationFirstLevelSection = require("ContextualNavigationFirstLevelSection").ContextualNavigationFirstLevelSection;

ContextualNavigationFirstLevelRow = require("ContextualNavigationFirstLevelRow").ContextualNavigationFirstLevelRow;

ContextualNavigationSecondLevelSection = require("ContextualNavigationSecondLevelSection").ContextualNavigationSecondLevelSection;

ContextualNavigationSecondLevelRow = require("ContextualNavigationSecondLevelRow").ContextualNavigationSecondLevelRow;

ContextualNavigationDropdown = require("ContextualNavigationDropdown").ContextualNavigationDropdown;

ContextualNavigationDropdownRow = require("ContextualNavigationDropdownRow").ContextualNavigationDropdownRow;

ContentArea = require("ContentArea").ContentArea;

ContentAreaContainer = require("ContentAreaContainer").ContentAreaContainer;

Hotspot = require("Hotspot").Hotspot;

exports.EnvironmentController = (function() {
  function EnvironmentController(info, topBarHeight, breadcrumbsLayers) {
    this.switchToEnvironment = bind(this.switchToEnvironment, this);
    this.setUpInitialState = bind(this.setUpInitialState, this);
    this.getCurrentEnvironment = bind(this.getCurrentEnvironment, this);
    this.getCurrentEnvironmentName = bind(this.getCurrentEnvironmentName, this);
    this.getEnvironments = bind(this.getEnvironments, this);
    this.addControllerReferenceToEnvironments = bind(this.addControllerReferenceToEnvironments, this);
    var contextualNavigationController, contextualNavigationInfo, dropdown, dropdownRow, environment, environmentInfo, firstLevelContentArea, firstLevelHotspot, firstLevelPagesInfo, firstLevelRow, firstLevelRowInfo, firstLevelSection, firstLevelSectionInfo, hotspotInfo, i, j, k, l, len, len1, len2, len3, len4, m, n, name, o, p, pageInfo, q, ref, ref1, ref2, ref3, secondLevelContentArea, secondLevelHotspot, secondLevelPagesInfo, secondLevelRow, secondLevelRowInfo, secondLevelRowsInfo, secondLevelSection, sidebar;
    this.environments = [];
    this.currentEnvironmentName = null;
    ContentAreaContainer.setUpContentAreaContainer(topBarHeight, this);
    for (k = 0, len = info.length; k < len; k++) {
      environmentInfo = info[k];
      name = environmentInfo['name'];
      environment = new Environment(name, breadcrumbsLayers[name]);
      sidebar = new Sidebar(name, environment, topBarHeight);
      contextualNavigationController = new ContextualNavigationController(name, sidebar);
      contextualNavigationInfo = environmentInfo['contextual'];
      for (i = l = 0, ref = contextualNavigationInfo.length - 1; l <= ref; i = l += 1) {
        firstLevelSectionInfo = contextualNavigationInfo[i];
        firstLevelRowInfo = firstLevelSectionInfo['first_level_row'];
        secondLevelRowsInfo = firstLevelSectionInfo['second_level_rows'];
        firstLevelSection = new ContextualNavigationFirstLevelSection(firstLevelRowInfo['name'], contextualNavigationController, i, secondLevelRowsInfo.length);
        firstLevelRow = new ContextualNavigationFirstLevelRow(firstLevelRowInfo['name'], firstLevelRowInfo['text'], firstLevelSection);
        firstLevelPagesInfo = firstLevelRowInfo['pages'];
        if (firstLevelPagesInfo.length) {
          for (m = 0, len1 = firstLevelPagesInfo.length; m < len1; m++) {
            pageInfo = firstLevelPagesInfo[m];
            firstLevelContentArea = new ContentArea(pageInfo['name'], pageInfo['image'], pageInfo['height']);
            ref1 = pageInfo['hotspots'];
            for (n = 0, len2 = ref1.length; n < len2; n++) {
              hotspotInfo = ref1[n];
              firstLevelHotspot = new Hotspot(hotspotInfo['x'], hotspotInfo['y'], hotspotInfo['width'], hotspotInfo['height'], hotspotInfo['link']['environment'], hotspotInfo['link']['first_level_section_index'], hotspotInfo['link']['second_level_row_index'], hotspotInfo['link']['page_index'], firstLevelContentArea, environment);
              firstLevelContentArea.addHotspot(firstLevelHotspot);
            }
            firstLevelRow.addContentArea(firstLevelContentArea);
          }
        }
        firstLevelSection.setRow(firstLevelRow);
        secondLevelSection = new ContextualNavigationSecondLevelSection(firstLevelRowInfo['name'], firstLevelSection, firstLevelSectionInfo['second_level_rows'].length);
        dropdown = new ContextualNavigationDropdown(firstLevelRowInfo['name'], firstLevelSection);
        for (j = o = 0, ref2 = secondLevelRowsInfo.length - 1; o <= ref2; j = o += 1) {
          secondLevelRowInfo = secondLevelRowsInfo[j];
          secondLevelRow = new ContextualNavigationSecondLevelRow(secondLevelRowInfo['name'], secondLevelRowInfo['text'], secondLevelSection, j);
          secondLevelPagesInfo = secondLevelRowInfo['pages'];
          if (secondLevelPagesInfo.length) {
            for (p = 0, len3 = secondLevelPagesInfo.length; p < len3; p++) {
              pageInfo = secondLevelPagesInfo[p];
              secondLevelContentArea = new ContentArea(pageInfo['name'], pageInfo['image'], pageInfo['height']);
              ref3 = pageInfo['hotspots'];
              for (q = 0, len4 = ref3.length; q < len4; q++) {
                hotspotInfo = ref3[q];
                secondLevelHotspot = new Hotspot(hotspotInfo['x'], hotspotInfo['y'], hotspotInfo['width'], hotspotInfo['height'], hotspotInfo['link']['environment'], hotspotInfo['link']['first_level_section_index'], hotspotInfo['link']['second_level_row_index'], hotspotInfo['link']['page_index'], secondLevelContentArea, environment);
                secondLevelContentArea.addHotspot(secondLevelHotspot);
              }
              secondLevelRow.addContentArea(secondLevelContentArea);
            }
          }
          secondLevelSection.addRow(secondLevelRow);
          dropdownRow = new ContextualNavigationDropdownRow(secondLevelRowInfo['name'], secondLevelRowInfo['text'], dropdown, j);
          dropdown.addRow(dropdownRow);
        }
        firstLevelSection.setSecondLevelSection(secondLevelSection);
        firstLevelSection.setDropdown(dropdown);
        contextualNavigationController.addSection(firstLevelSection);
      }
      sidebar.setContextualNavigationController(contextualNavigationController);
      sidebar.recalculatePositions();
      environment.setSidebar(sidebar);
      this.environments.push(environment);
    }
  }

  EnvironmentController.prototype.addControllerReferenceToEnvironments = function() {
    var environment, k, len, ref, results;
    ref = this.environments;
    results = [];
    for (k = 0, len = ref.length; k < len; k++) {
      environment = ref[k];
      results.push(environment.setEnvironmentController(this));
    }
    return results;
  };

  EnvironmentController.prototype.getEnvironments = function() {
    return this.environments;
  };

  EnvironmentController.prototype.getCurrentEnvironmentName = function() {
    return this.currentEnvironmentName;
  };

  EnvironmentController.prototype.getCurrentEnvironment = function() {
    var environment, k, len, ref;
    ref = this.environments;
    for (k = 0, len = ref.length; k < len; k++) {
      environment = ref[k];
      if (environment.getName() === this.currentEnvironmentName) {
        return environment;
      }
    }
    return nil;
  };

  EnvironmentController.prototype.setUpInitialState = function(initialStateInfo) {
    var contextualNavigationController, environment, firstLevelRow, firstLevelSection, k, len, ref, results, secondLevelRows, secondLevelSection, sidebar;
    this.currentEnvironmentName = initialStateInfo['environment'];
    ref = this.environments;
    results = [];
    for (k = 0, len = ref.length; k < len; k++) {
      environment = ref[k];
      if (environment.getName() === this.currentEnvironmentName) {
        sidebar = environment.getSidebar();
        sidebar.switchStateVisible();
        environment.breadcrumbsLayerSwitchStateVisile();
        contextualNavigationController = sidebar.getContextualNavigationController();
        contextualNavigationController.selectFirstLevelRowByIndex(initialStateInfo['first_level_section_index']);
        firstLevelSection = contextualNavigationController.getFirstLevelSections()[initialStateInfo['first_level_section_index']];
        secondLevelRows = firstLevelSection.getSecondLevelSection().getSecondLevelRows();
        secondLevelSection = firstLevelSection.getSecondLevelSection();
        if (secondLevelRows.length) {
          secondLevelSection.switchStateDefault();
          if (initialStateInfo['second_level_row_index'] !== null) {
            contextualNavigationController.selectSecondLevelRowByIndex(initialStateInfo['second_level_row_index']);
            contextualNavigationController.recalculateContextualPositions();
          }
        }
        firstLevelRow = firstLevelSection.getFirstLevelRow();
        ContentAreaContainer.flow.showNext(firstLevelRow.getContentAreaByIndex(initialStateInfo['page_index']).getScroll(), {
          animate: false
        });
        break;
      } else {
        results.push(void 0);
      }
    }
    return results;
  };

  EnvironmentController.prototype.switchToEnvironment = function(newEnvironmentName, firstLevelSectionIndex, secondLevelRowIndex, pageIndex) {
    var currentEnvironment, environment, k, len, newContentArea, newContextualNavigationController, newEnvironment, ref;
    currentEnvironment = null;
    newEnvironment = null;
    ref = this.environments;
    for (k = 0, len = ref.length; k < len; k++) {
      environment = ref[k];
      if (environment.getName() === this.currentEnvironmentName) {
        currentEnvironment = environment;
      }
      if (environment.getName() === newEnvironmentName) {
        newEnvironment = environment;
      }
      if (currentEnvironment !== null && newEnvironment !== null) {
        break;
      }
    }
    currentEnvironment.getSidebar().getContextualNavigationController().setSelectedRowsInDefaultState();
    if (currentEnvironment !== newEnvironment) {
      currentEnvironment.getSidebar().switchStateDefault();
      currentEnvironment.breadcrumbsLayerSwitchStateDefault();
      newEnvironment.getSidebar().switchStateVisible();
      newEnvironment.breadcrumbsLayerSwitchStateVisile();
    }
    newContextualNavigationController = newEnvironment.getSidebar().getContextualNavigationController();
    newContextualNavigationController.selectFirstLevelRowByIndex(firstLevelSectionIndex);
    if (secondLevelRowIndex) {
      newContextualNavigationController.selectSecondLevelRowByIndex(secondLevelRowIndex);
    }
    newContentArea = null;
    if (secondLevelRowIndex) {
      newContentArea = newContextualNavigationController.getFirstLevelSections()[firstLevelSectionIndex].getSecondLevelSection().getSecondLevelRows()[secondLevelRowIndex].getContentAreas()[pageIndex];
    } else {
      newContentArea = newContextualNavigationController.getFirstLevelSections()[firstLevelSectionIndex].getFirstLevelRow().getContentAreas()[pageIndex];
    }
    ContentAreaContainer.flow.showNext(newContentArea.getScroll(), {
      animate: false
    });
    return this.currentEnvironmentName = newEnvironmentName;
  };

  return EnvironmentController;

})();


},{"BreadcrumbNavigationController":"BreadcrumbNavigationController","BreadcrumbNavigationRow":"BreadcrumbNavigationRow","BreadcrumbNavigationSection":"BreadcrumbNavigationSection","BreadcrumbNavigationSectionContent":"BreadcrumbNavigationSectionContent","ContentArea":"ContentArea","ContentAreaContainer":"ContentAreaContainer","ContextualNavigationController":"ContextualNavigationController","ContextualNavigationDropdown":"ContextualNavigationDropdown","ContextualNavigationDropdownRow":"ContextualNavigationDropdownRow","ContextualNavigationFirstLevelRow":"ContextualNavigationFirstLevelRow","ContextualNavigationFirstLevelSection":"ContextualNavigationFirstLevelSection","ContextualNavigationSecondLevelRow":"ContextualNavigationSecondLevelRow","ContextualNavigationSecondLevelSection":"ContextualNavigationSecondLevelSection","Environment":"Environment","Hotspot":"Hotspot","Sidebar":"Sidebar"}],"Environment":[function(require,module,exports){
var bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

exports.Environment = (function() {
  function Environment(name, breadcrumbsLayer) {
    this.name = name;
    this.breadcrumbsLayer = breadcrumbsLayer;
    this.breadcrumbsLayerSwitchStateDefault = bind(this.breadcrumbsLayerSwitchStateDefault, this);
    this.breadcrumbsLayerSwitchStateVisile = bind(this.breadcrumbsLayerSwitchStateVisile, this);
    this.setEnvironmentController = bind(this.setEnvironmentController, this);
    this.setSidebar = bind(this.setSidebar, this);
    this.getEnvironmentController = bind(this.getEnvironmentController, this);
    this.getSidebar = bind(this.getSidebar, this);
    this.getBreadcrumbsLayer = bind(this.getBreadcrumbsLayer, this);
    this.getName = bind(this.getName, this);
    this.sidebar = null;
    this.environmentController = null;
    this.breadcrumbsLayer.states.visible = {
      visible: true
    };
  }

  Environment.prototype.getName = function() {
    return this.name;
  };

  Environment.prototype.getBreadcrumbsLayer = function() {
    return this.breadcrumbsLayer;
  };

  Environment.prototype.getSidebar = function() {
    return this.sidebar;
  };

  Environment.prototype.getEnvironmentController = function() {
    return this.environmentController;
  };

  Environment.prototype.setSidebar = function(newSidebar) {
    return this.sidebar = newSidebar;
  };

  Environment.prototype.setEnvironmentController = function(newController) {
    return this.environmentController = newController;
  };

  Environment.prototype.breadcrumbsLayerSwitchStateVisile = function() {
    return this.breadcrumbsLayer.stateSwitch('visible');
  };

  Environment.prototype.breadcrumbsLayerSwitchStateDefault = function() {
    return this.breadcrumbsLayer.stateSwitch('default');
  };

  return Environment;

})();


},{}],"Hotspot":[function(require,module,exports){
var bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

exports.Hotspot = (function() {
  function Hotspot(x, y, width, height, environmentName, firstLevelSectionIndex, secondLevelRowIndex, pageIndex, contentArea, environment) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.environmentName = environmentName;
    this.firstLevelSectionIndex = firstLevelSectionIndex;
    this.secondLevelRowIndex = secondLevelRowIndex;
    this.pageIndex = pageIndex;
    this.contentArea = contentArea;
    this.environment = environment;
    this.addEvents = bind(this.addEvents, this);
    this.getLayer = bind(this.getLayer, this);
    this.getContentArea = bind(this.getContentArea, this);
    this.getPageIndex = bind(this.getPageIndex, this);
    this.getSecondLevelRowIndex = bind(this.getSecondLevelRowIndex, this);
    this.getFirstLevelSectionIndex = bind(this.getFirstLevelSectionIndex, this);
    this.getEnvironmentName = bind(this.getEnvironmentName, this);
    this.getHeight = bind(this.getHeight, this);
    this.getWidth = bind(this.getWidth, this);
    this.getY = bind(this.getY, this);
    this.getX = bind(this.getX, this);
    this.layer = new Layer({
      parent: this.contentArea.getContent(),
      x: this.x,
      y: this.y,
      width: this.width,
      height: this.height,
      backgroundColor: "transparent"
    });
    this.addEvents();
  }

  Hotspot.prototype.getX = function() {
    return this.x;
  };

  Hotspot.prototype.getY = function() {
    return this.y;
  };

  Hotspot.prototype.getWidth = function() {
    return this.width;
  };

  Hotspot.prototype.getHeight = function() {
    return this.height;
  };

  Hotspot.prototype.getEnvironmentName = function() {
    return this.environmentName;
  };

  Hotspot.prototype.getFirstLevelSectionIndex = function() {
    return this.firstLevelSectionIndex;
  };

  Hotspot.prototype.getSecondLevelRowIndex = function() {
    return this.secondLevelRowIndex;
  };

  Hotspot.prototype.getPageIndex = function() {
    return this.pageIndex;
  };

  Hotspot.prototype.getContentArea = function() {
    return this.contentArea;
  };

  Hotspot.prototype.getLayer = function() {
    return this.layer;
  };

  Hotspot.prototype.addEvents = function() {
    return this.layer.onClick((function(_this) {
      return function() {
        return _this.environment.environmentController.switchToEnvironment(_this.environmentName, _this.firstLevelSectionIndex, _this.secondLevelRowIndex, _this.pageIndex);
      };
    })(this));
  };

  return Hotspot;

})();


},{}],"Row":[function(require,module,exports){
var Constants,
  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

Constants = require("Constants").Constants;

exports.Row = (function() {
  function Row(name, text, width, parentLayer) {
    this.name = name;
    this.text = text;
    this.width = width;
    this.parentLayer = parentLayer;
    this.getSelectedBorderLayer = bind(this.getSelectedBorderLayer, this);
    this.getTextLayer = bind(this.getTextLayer, this);
    this.getLayer = bind(this.getLayer, this);
    this.getParentLayer = bind(this.getParentLayer, this);
    this.getWidth = bind(this.getWidth, this);
    this.getText = bind(this.getText, this);
    this.getName = bind(this.getName, this);
    this.layer = new Layer({
      name: this.name + '_row',
      parent: this.parentLayer,
      height: Constants.rowHeight,
      width: this.width,
      cursor: "pointer"
    });
    this.textLayer = new TextLayer({
      name: this.name + '_text',
      parent: this.layer,
      text: this.text,
      fontSize: Constants.rowFontSize,
      fontWeight: 400,
      fontFamily: "SF UI Text, Helvetica Neue, Helvetica, Arial, sans-serif",
      y: Align.center,
      color: "rgba(0,0,0,0.85)"
    });
    this.selectedBorderLayer = new Layer({
      name: this.name + '_border',
      parent: this.layer,
      height: Constants.rowHeight,
      width: Constants.selectedBorderWidth,
      backgroundColor: "#4a8bee"
    });
  }

  Row.prototype.getName = function() {
    return this.name;
  };

  Row.prototype.getText = function() {
    return this.text;
  };

  Row.prototype.getWidth = function() {
    return this.width;
  };

  Row.prototype.getParentLayer = function() {
    return this.parentLayer;
  };

  Row.prototype.getLayer = function() {
    return this.layer;
  };

  Row.prototype.getTextLayer = function() {
    return this.textLayer;
  };

  Row.prototype.getSelectedBorderLayer = function() {
    return this.selectedBorderLayer;
  };

  return Row;

})();


},{"Constants":"Constants"}],"Sidebar":[function(require,module,exports){
var Constants,
  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

Constants = require("Constants").Constants;

exports.Sidebar = (function() {
  function Sidebar(name, enviroment, topBarHeight) {
    this.name = name;
    this.enviroment = enviroment;
    this.recalculatePositions = bind(this.recalculatePositions, this);
    this.setContextualNavigationController = bind(this.setContextualNavigationController, this);
    this.switchStateDefault = bind(this.switchStateDefault, this);
    this.switchStateVisible = bind(this.switchStateVisible, this);
    this.getLayer = bind(this.getLayer, this);
    this.getEnvironment = bind(this.getEnvironment, this);
    this.getName = bind(this.getName, this);
    this.getContextualNavigationController = bind(this.getContextualNavigationController, this);
    this.contextualNavigationController = null;
    this.layer = new Layer({
      name: this.name + '_sidebar',
      width: Constants.sidebarWidth,
      height: Screen.size.height - topBarHeight,
      y: topBarHeight,
      backgroundColor: "#fafafa",
      shadowX: 1,
      shadowColor: "#e5e5e5",
      shadowBlur: 0,
      visible: false
    });
    this.layer.states.visible = {
      visible: true
    };
  }

  Sidebar.prototype.getContextualNavigationController = function() {
    return this.contextualNavigationController;
  };

  Sidebar.prototype.getName = function() {
    return this.name;
  };

  Sidebar.prototype.getEnvironment = function() {
    return this.enviroment;
  };

  Sidebar.prototype.getLayer = function() {
    return this.layer;
  };

  Sidebar.prototype.switchStateVisible = function() {
    return this.layer.stateSwitch("visible");
  };

  Sidebar.prototype.switchStateDefault = function() {
    return this.layer.stateSwitch("default");
  };

  Sidebar.prototype.setContextualNavigationController = function(setContextualNavigationController) {
    return this.contextualNavigationController = setContextualNavigationController;
  };

  Sidebar.prototype.recalculatePositions = function() {
    this.contextualNavigationController.getLayer().y = 10;
    return this.contextualNavigationController.recalculateContextualPositions();
  };

  return Sidebar;

})();


},{"Constants":"Constants"}]},{},[])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnJhbWVyLm1vZHVsZXMuanMiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL1VzZXJzL0NocmlzL0Ryb3Bib3gvRGV2ZWxvcGVyL3NpZGViYXJfcHJvdG90eXBlL3NpZGViYXJfcHJvdG90eXBlX2hvcml6b250YWxfYnJlYWRjcnVtYnMuZnJhbWVyL21vZHVsZXMvU2lkZWJhci5jb2ZmZWUiLCIuLi8uLi8uLi8uLi8uLi9Vc2Vycy9DaHJpcy9Ecm9wYm94L0RldmVsb3Blci9zaWRlYmFyX3Byb3RvdHlwZS9zaWRlYmFyX3Byb3RvdHlwZV9ob3Jpem9udGFsX2JyZWFkY3J1bWJzLmZyYW1lci9tb2R1bGVzL1Jvdy5jb2ZmZWUiLCIuLi8uLi8uLi8uLi8uLi9Vc2Vycy9DaHJpcy9Ecm9wYm94L0RldmVsb3Blci9zaWRlYmFyX3Byb3RvdHlwZS9zaWRlYmFyX3Byb3RvdHlwZV9ob3Jpem9udGFsX2JyZWFkY3J1bWJzLmZyYW1lci9tb2R1bGVzL0hvdHNwb3QuY29mZmVlIiwiLi4vLi4vLi4vLi4vLi4vVXNlcnMvQ2hyaXMvRHJvcGJveC9EZXZlbG9wZXIvc2lkZWJhcl9wcm90b3R5cGUvc2lkZWJhcl9wcm90b3R5cGVfaG9yaXpvbnRhbF9icmVhZGNydW1icy5mcmFtZXIvbW9kdWxlcy9FbnZpcm9ubWVudC5jb2ZmZWUiLCIuLi8uLi8uLi8uLi8uLi9Vc2Vycy9DaHJpcy9Ecm9wYm94L0RldmVsb3Blci9zaWRlYmFyX3Byb3RvdHlwZS9zaWRlYmFyX3Byb3RvdHlwZV9ob3Jpem9udGFsX2JyZWFkY3J1bWJzLmZyYW1lci9tb2R1bGVzL0Vudmlyb25tZW50Q29udHJvbGxlci5jb2ZmZWUiLCIuLi8uLi8uLi8uLi8uLi9Vc2Vycy9DaHJpcy9Ecm9wYm94L0RldmVsb3Blci9zaWRlYmFyX3Byb3RvdHlwZS9zaWRlYmFyX3Byb3RvdHlwZV9ob3Jpem9udGFsX2JyZWFkY3J1bWJzLmZyYW1lci9tb2R1bGVzL0NvbnRleHR1YWxOYXZpZ2F0aW9uU2Vjb25kTGV2ZWxTZWN0aW9uLmNvZmZlZSIsIi4uLy4uLy4uLy4uLy4uL1VzZXJzL0NocmlzL0Ryb3Bib3gvRGV2ZWxvcGVyL3NpZGViYXJfcHJvdG90eXBlL3NpZGViYXJfcHJvdG90eXBlX2hvcml6b250YWxfYnJlYWRjcnVtYnMuZnJhbWVyL21vZHVsZXMvQ29udGV4dHVhbE5hdmlnYXRpb25TZWNvbmRMZXZlbFJvdy5jb2ZmZWUiLCIuLi8uLi8uLi8uLi8uLi9Vc2Vycy9DaHJpcy9Ecm9wYm94L0RldmVsb3Blci9zaWRlYmFyX3Byb3RvdHlwZS9zaWRlYmFyX3Byb3RvdHlwZV9ob3Jpem9udGFsX2JyZWFkY3J1bWJzLmZyYW1lci9tb2R1bGVzL0NvbnRleHR1YWxOYXZpZ2F0aW9uRmlyc3RMZXZlbFNlY3Rpb24uY29mZmVlIiwiLi4vLi4vLi4vLi4vLi4vVXNlcnMvQ2hyaXMvRHJvcGJveC9EZXZlbG9wZXIvc2lkZWJhcl9wcm90b3R5cGUvc2lkZWJhcl9wcm90b3R5cGVfaG9yaXpvbnRhbF9icmVhZGNydW1icy5mcmFtZXIvbW9kdWxlcy9Db250ZXh0dWFsTmF2aWdhdGlvbkZpcnN0TGV2ZWxSb3cuY29mZmVlIiwiLi4vLi4vLi4vLi4vLi4vVXNlcnMvQ2hyaXMvRHJvcGJveC9EZXZlbG9wZXIvc2lkZWJhcl9wcm90b3R5cGUvc2lkZWJhcl9wcm90b3R5cGVfaG9yaXpvbnRhbF9icmVhZGNydW1icy5mcmFtZXIvbW9kdWxlcy9Db250ZXh0dWFsTmF2aWdhdGlvbkRyb3Bkb3duLmNvZmZlZSIsIi4uLy4uLy4uLy4uLy4uL1VzZXJzL0NocmlzL0Ryb3Bib3gvRGV2ZWxvcGVyL3NpZGViYXJfcHJvdG90eXBlL3NpZGViYXJfcHJvdG90eXBlX2hvcml6b250YWxfYnJlYWRjcnVtYnMuZnJhbWVyL21vZHVsZXMvQ29udGV4dHVhbE5hdmlnYXRpb25Ecm9wZG93blJvdy5jb2ZmZWUiLCIuLi8uLi8uLi8uLi8uLi9Vc2Vycy9DaHJpcy9Ecm9wYm94L0RldmVsb3Blci9zaWRlYmFyX3Byb3RvdHlwZS9zaWRlYmFyX3Byb3RvdHlwZV9ob3Jpem9udGFsX2JyZWFkY3J1bWJzLmZyYW1lci9tb2R1bGVzL0NvbnRleHR1YWxOYXZpZ2F0aW9uQ29udHJvbGxlci5jb2ZmZWUiLCIuLi8uLi8uLi8uLi8uLi9Vc2Vycy9DaHJpcy9Ecm9wYm94L0RldmVsb3Blci9zaWRlYmFyX3Byb3RvdHlwZS9zaWRlYmFyX3Byb3RvdHlwZV9ob3Jpem9udGFsX2JyZWFkY3J1bWJzLmZyYW1lci9tb2R1bGVzL0NvbnRlbnRBcmVhLmNvZmZlZSIsIi4uLy4uLy4uLy4uLy4uL1VzZXJzL0NocmlzL0Ryb3Bib3gvRGV2ZWxvcGVyL3NpZGViYXJfcHJvdG90eXBlL3NpZGViYXJfcHJvdG90eXBlX2hvcml6b250YWxfYnJlYWRjcnVtYnMuZnJhbWVyL21vZHVsZXMvQ29udGVudEFyZWFDb250YWluZXIuY29mZmVlIiwiLi4vLi4vLi4vLi4vLi4vVXNlcnMvQ2hyaXMvRHJvcGJveC9EZXZlbG9wZXIvc2lkZWJhcl9wcm90b3R5cGUvc2lkZWJhcl9wcm90b3R5cGVfaG9yaXpvbnRhbF9icmVhZGNydW1icy5mcmFtZXIvbW9kdWxlcy9Db25zdGFudHMuY29mZmVlIiwiLi4vLi4vLi4vLi4vLi4vVXNlcnMvQ2hyaXMvRHJvcGJveC9EZXZlbG9wZXIvc2lkZWJhcl9wcm90b3R5cGUvc2lkZWJhcl9wcm90b3R5cGVfaG9yaXpvbnRhbF9icmVhZGNydW1icy5mcmFtZXIvbW9kdWxlcy9CcmVhZGNydW1iTmF2aWdhdGlvblNlY3Rpb24uY29mZmVlIiwiLi4vLi4vLi4vLi4vLi4vVXNlcnMvQ2hyaXMvRHJvcGJveC9EZXZlbG9wZXIvc2lkZWJhcl9wcm90b3R5cGUvc2lkZWJhcl9wcm90b3R5cGVfaG9yaXpvbnRhbF9icmVhZGNydW1icy5mcmFtZXIvbW9kdWxlcy9CcmVhZGNydW1iTmF2aWdhdGlvblNlY3Rpb25Db250ZW50LmNvZmZlZSIsIi4uLy4uLy4uLy4uLy4uL1VzZXJzL0NocmlzL0Ryb3Bib3gvRGV2ZWxvcGVyL3NpZGViYXJfcHJvdG90eXBlL3NpZGViYXJfcHJvdG90eXBlX2hvcml6b250YWxfYnJlYWRjcnVtYnMuZnJhbWVyL21vZHVsZXMvQnJlYWRjcnVtYk5hdmlnYXRpb25Sb3cuY29mZmVlIiwiLi4vLi4vLi4vLi4vLi4vVXNlcnMvQ2hyaXMvRHJvcGJveC9EZXZlbG9wZXIvc2lkZWJhcl9wcm90b3R5cGUvc2lkZWJhcl9wcm90b3R5cGVfaG9yaXpvbnRhbF9icmVhZGNydW1icy5mcmFtZXIvbW9kdWxlcy9CcmVhZGNydW1iTmF2aWdhdGlvbkNvbnRyb2xsZXIuY29mZmVlIiwibm9kZV9tb2R1bGVzL2Jyb3dzZXItcGFjay9fcHJlbHVkZS5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJ7Q29uc3RhbnRzfSA9IHJlcXVpcmUgXCJDb25zdGFudHNcIlxuXG5jbGFzcyBleHBvcnRzLlNpZGViYXJcblx0Y29uc3RydWN0b3I6IChAbmFtZSwgQGVudmlyb21lbnQsIHRvcEJhckhlaWdodCkgLT5cblx0XHQjIEBicmVhZGNydW1iTmF2aWdhdGlvbkNvbnRyb2xsZXIgPSBudWxsXG5cdFx0QGNvbnRleHR1YWxOYXZpZ2F0aW9uQ29udHJvbGxlciA9IG51bGxcblxuXHRcdEBsYXllciA9IG5ldyBMYXllclxuXHRcdFx0bmFtZTogQG5hbWUgKyAnX3NpZGViYXInXG5cdFx0XHR3aWR0aDogQ29uc3RhbnRzLnNpZGViYXJXaWR0aFxuXHRcdFx0aGVpZ2h0OiBTY3JlZW4uc2l6ZS5oZWlnaHQgLSB0b3BCYXJIZWlnaHRcblx0XHRcdHk6IHRvcEJhckhlaWdodFxuXHRcdFx0YmFja2dyb3VuZENvbG9yOiBcIiNmYWZhZmFcIlxuXHRcdFx0c2hhZG93WDogMVxuXHRcdFx0c2hhZG93Q29sb3I6IFwiI2U1ZTVlNVwiXG5cdFx0XHRzaGFkb3dCbHVyOiAwXG5cdFx0XHR2aXNpYmxlOiBmYWxzZVxuXG5cdFx0QGxheWVyLnN0YXRlcy52aXNpYmxlID1cblx0XHRcdHZpc2libGU6IHRydWVcblxuXHQjIGdldEJyZWFkY3J1bWJOYXZpZ2F0aW9uQ29udHJvbGxlcjogPT5cblx0IyBcdHJldHVybiBAYnJlYWRjcnVtYk5hdmlnYXRpb25Db250cm9sbGVyXG5cblx0Z2V0Q29udGV4dHVhbE5hdmlnYXRpb25Db250cm9sbGVyOiA9PlxuXHRcdHJldHVybiBAY29udGV4dHVhbE5hdmlnYXRpb25Db250cm9sbGVyXG5cblx0Z2V0TmFtZTogPT5cblx0XHRyZXR1cm4gQG5hbWVcblxuXHRnZXRFbnZpcm9ubWVudDogPT5cblx0XHRyZXR1cm4gQGVudmlyb21lbnRcblxuXHRnZXRMYXllcjogPT5cblx0XHRyZXR1cm4gQGxheWVyXG5cblx0c3dpdGNoU3RhdGVWaXNpYmxlOiA9PlxuXHRcdEBsYXllci5zdGF0ZVN3aXRjaChcInZpc2libGVcIilcblxuXHRzd2l0Y2hTdGF0ZURlZmF1bHQ6ID0+XG5cdFx0QGxheWVyLnN0YXRlU3dpdGNoKFwiZGVmYXVsdFwiKVxuXG5cdCMgc2V0QnJlYWRjcnVtYk5hdmlnYXRpb25Db250cm9sbGVyOiAoc2V0QnJlYWRjcnVtYk5hdmlnYXRpb25Db250cm9sbGVyKSA9PlxuXHQjIFx0QGJyZWFkY3J1bWJOYXZpZ2F0aW9uQ29udHJvbGxlciA9IHNldEJyZWFkY3J1bWJOYXZpZ2F0aW9uQ29udHJvbGxlclxuXG5cdHNldENvbnRleHR1YWxOYXZpZ2F0aW9uQ29udHJvbGxlcjogKHNldENvbnRleHR1YWxOYXZpZ2F0aW9uQ29udHJvbGxlcikgPT5cblx0XHRAY29udGV4dHVhbE5hdmlnYXRpb25Db250cm9sbGVyID0gc2V0Q29udGV4dHVhbE5hdmlnYXRpb25Db250cm9sbGVyXG5cblx0cmVjYWxjdWxhdGVQb3NpdGlvbnM6ID0+XG5cdCMgXHRicmVhZGNydW1ic19oZWlnaHQgPSBAYnJlYWRjcnVtYk5hdmlnYXRpb25Db250cm9sbGVyLnJlY2FsY3VsYXRlVmVydGljYWxCcmVhZGNydW1ic1Bvc2l0aW9ucygpXG5cdFx0QGNvbnRleHR1YWxOYXZpZ2F0aW9uQ29udHJvbGxlci5nZXRMYXllcigpLnkgPSAxMFxuXHRcdEBjb250ZXh0dWFsTmF2aWdhdGlvbkNvbnRyb2xsZXIucmVjYWxjdWxhdGVDb250ZXh0dWFsUG9zaXRpb25zKClcblxuIiwie0NvbnN0YW50c30gPSByZXF1aXJlIFwiQ29uc3RhbnRzXCJcblxuY2xhc3MgZXhwb3J0cy5Sb3dcblx0Y29uc3RydWN0b3I6IChAbmFtZSwgQHRleHQsIEB3aWR0aCwgQHBhcmVudExheWVyKSAtPlxuXHRcdEBsYXllciA9IG5ldyBMYXllclxuXHRcdFx0bmFtZTogQG5hbWUgKyAnX3Jvdydcblx0XHRcdHBhcmVudDogQHBhcmVudExheWVyXG5cdFx0XHRoZWlnaHQ6IENvbnN0YW50cy5yb3dIZWlnaHRcblx0XHRcdHdpZHRoOiBAd2lkdGhcblx0XHRcdGN1cnNvcjogXCJwb2ludGVyXCJcblx0XHRcdFxuXHRcdEB0ZXh0TGF5ZXIgPSBuZXcgVGV4dExheWVyXG5cdFx0XHRuYW1lOiBAbmFtZSArICdfdGV4dCdcblx0XHRcdHBhcmVudDogQGxheWVyXG5cdFx0XHR0ZXh0OiBAdGV4dFxuXHRcdFx0Zm9udFNpemU6IENvbnN0YW50cy5yb3dGb250U2l6ZVxuXHRcdFx0Zm9udFdlaWdodDogNDAwXG5cdFx0XHRmb250RmFtaWx5OiBcIlNGIFVJIFRleHQsIEhlbHZldGljYSBOZXVlLCBIZWx2ZXRpY2EsIEFyaWFsLCBzYW5zLXNlcmlmXCJcblx0XHRcdHk6IEFsaWduLmNlbnRlclxuXHRcdFx0Y29sb3I6IFwicmdiYSgwLDAsMCwwLjg1KVwiXG5cdFx0XG5cdFx0QHNlbGVjdGVkQm9yZGVyTGF5ZXIgPSBuZXcgTGF5ZXJcblx0XHRcdG5hbWU6IEBuYW1lICsgJ19ib3JkZXInXG5cdFx0XHRwYXJlbnQ6IEBsYXllclxuXHRcdFx0aGVpZ2h0OiBDb25zdGFudHMucm93SGVpZ2h0XG5cdFx0XHR3aWR0aDogQ29uc3RhbnRzLnNlbGVjdGVkQm9yZGVyV2lkdGhcblx0XHRcdGJhY2tncm91bmRDb2xvcjogXCIjNGE4YmVlXCJcblxuXHRnZXROYW1lOiA9PlxuXHRcdHJldHVybiBAbmFtZVxuXG5cdGdldFRleHQ6ID0+XG5cdFx0cmV0dXJuIEB0ZXh0XG5cblx0Z2V0V2lkdGg6ID0+XG5cdFx0cmV0dXJuIEB3aWR0aFxuXG5cdGdldFBhcmVudExheWVyOiA9PlxuXHRcdHJldHVybiBAcGFyZW50TGF5ZXJcblxuXHRnZXRMYXllcjogPT5cblx0XHRyZXR1cm4gQGxheWVyXG5cblx0Z2V0VGV4dExheWVyOiA9PlxuXHRcdHJldHVybiBAdGV4dExheWVyXG5cblx0Z2V0U2VsZWN0ZWRCb3JkZXJMYXllcjogPT5cblx0XHRyZXR1cm4gQHNlbGVjdGVkQm9yZGVyTGF5ZXIiLCJjbGFzcyBleHBvcnRzLkhvdHNwb3Rcblx0Y29uc3RydWN0b3I6IChAeCwgQHksIEB3aWR0aCwgQGhlaWdodCwgQGVudmlyb25tZW50TmFtZSwgQGZpcnN0TGV2ZWxTZWN0aW9uSW5kZXgsIEBzZWNvbmRMZXZlbFJvd0luZGV4LCBAcGFnZUluZGV4LCBAY29udGVudEFyZWEsIEBlbnZpcm9ubWVudCkgLT5cblx0XHRAbGF5ZXIgPSBuZXcgTGF5ZXJcblx0XHRcdHBhcmVudDogQGNvbnRlbnRBcmVhLmdldENvbnRlbnQoKVxuXHRcdFx0eDogQHhcblx0XHRcdHk6IEB5XG5cdFx0XHR3aWR0aDogQHdpZHRoXG5cdFx0XHRoZWlnaHQ6IEBoZWlnaHRcblx0XHRcdGJhY2tncm91bmRDb2xvcjogXCJ0cmFuc3BhcmVudFwiXG5cblx0XHRAYWRkRXZlbnRzKClcblxuXG5cdGdldFg6ID0+XG5cdFx0cmV0dXJuIEB4XG5cblx0Z2V0WTogPT5cblx0XHRyZXR1cm4gQHlcblxuXHRnZXRXaWR0aDogPT5cblx0XHRyZXR1cm4gQHdpZHRoXG5cblx0Z2V0SGVpZ2h0OiA9PlxuXHRcdHJldHVybiBAaGVpZ2h0XG5cblx0Z2V0RW52aXJvbm1lbnROYW1lOiA9PlxuXHRcdHJldHVybiBAZW52aXJvbm1lbnROYW1lXG5cblx0Z2V0Rmlyc3RMZXZlbFNlY3Rpb25JbmRleDogPT5cblx0XHRyZXR1cm4gQGZpcnN0TGV2ZWxTZWN0aW9uSW5kZXhcblxuXHRnZXRTZWNvbmRMZXZlbFJvd0luZGV4OiA9PlxuXHRcdHJldHVybiBAc2Vjb25kTGV2ZWxSb3dJbmRleFxuXG5cdGdldFBhZ2VJbmRleDogPT5cblx0XHRyZXR1cm4gQHBhZ2VJbmRleFxuXG5cdGdldENvbnRlbnRBcmVhOiA9PlxuXHRcdHJldHVybiBAY29udGVudEFyZWFcblxuXHRnZXRMYXllcjogPT5cblx0XHRyZXR1cm4gQGxheWVyXG5cblx0YWRkRXZlbnRzOiA9PlxuXHRcdEBsYXllci5vbkNsaWNrID0+XG5cdFx0XHRAZW52aXJvbm1lbnQuZW52aXJvbm1lbnRDb250cm9sbGVyLnN3aXRjaFRvRW52aXJvbm1lbnQoQGVudmlyb25tZW50TmFtZSwgQGZpcnN0TGV2ZWxTZWN0aW9uSW5kZXgsIEBzZWNvbmRMZXZlbFJvd0luZGV4LCBAcGFnZUluZGV4KVxuIiwiY2xhc3MgZXhwb3J0cy5FbnZpcm9ubWVudFxuXHRjb25zdHJ1Y3RvcjogKEBuYW1lLCBAYnJlYWRjcnVtYnNMYXllcikgLT5cblx0XHRAc2lkZWJhciA9IG51bGxcblx0XHRAZW52aXJvbm1lbnRDb250cm9sbGVyID0gbnVsbFxuXG5cdFx0QGJyZWFkY3J1bWJzTGF5ZXIuc3RhdGVzLnZpc2libGUgPSBcblx0XHRcdHZpc2libGU6IHRydWVcblxuXHRnZXROYW1lOiA9PlxuXHRcdHJldHVybiBAbmFtZVxuXG5cdGdldEJyZWFkY3J1bWJzTGF5ZXI6ICgpID0+XG5cdFx0cmV0dXJuIEBicmVhZGNydW1ic0xheWVyXG5cblx0Z2V0U2lkZWJhcjogPT5cblx0XHRyZXR1cm4gQHNpZGViYXJcblxuXHRnZXRFbnZpcm9ubWVudENvbnRyb2xsZXI6ICgpID0+XG5cdFx0cmV0dXJuIEBlbnZpcm9ubWVudENvbnRyb2xsZXJcblxuXHRzZXRTaWRlYmFyOiAobmV3U2lkZWJhcikgPT5cblx0XHRAc2lkZWJhciA9IG5ld1NpZGViYXJcblxuXHRzZXRFbnZpcm9ubWVudENvbnRyb2xsZXI6IChuZXdDb250cm9sbGVyKSA9PlxuXHRcdEBlbnZpcm9ubWVudENvbnRyb2xsZXIgPSBuZXdDb250cm9sbGVyXG5cblx0YnJlYWRjcnVtYnNMYXllclN3aXRjaFN0YXRlVmlzaWxlOiAoKSA9PlxuXHRcdEBicmVhZGNydW1ic0xheWVyLnN0YXRlU3dpdGNoKCd2aXNpYmxlJylcblxuXHRicmVhZGNydW1ic0xheWVyU3dpdGNoU3RhdGVEZWZhdWx0OiAoKSA9PlxuXHRcdEBicmVhZGNydW1ic0xheWVyLnN0YXRlU3dpdGNoKCdkZWZhdWx0JykiLCJ7RW52aXJvbm1lbnR9ID0gcmVxdWlyZSBcIkVudmlyb25tZW50XCJcbntTaWRlYmFyfSA9IHJlcXVpcmUgXCJTaWRlYmFyXCJcbntCcmVhZGNydW1iTmF2aWdhdGlvbkNvbnRyb2xsZXJ9ID0gcmVxdWlyZSBcIkJyZWFkY3J1bWJOYXZpZ2F0aW9uQ29udHJvbGxlclwiXG57QnJlYWRjcnVtYk5hdmlnYXRpb25TZWN0aW9ufSA9IHJlcXVpcmUgXCJCcmVhZGNydW1iTmF2aWdhdGlvblNlY3Rpb25cIlxue0JyZWFkY3J1bWJOYXZpZ2F0aW9uU2VjdGlvbkNvbnRlbnR9ID0gcmVxdWlyZSBcIkJyZWFkY3J1bWJOYXZpZ2F0aW9uU2VjdGlvbkNvbnRlbnRcIlxue0JyZWFkY3J1bWJOYXZpZ2F0aW9uUm93fSA9IHJlcXVpcmUgXCJCcmVhZGNydW1iTmF2aWdhdGlvblJvd1wiXG57Q29udGV4dHVhbE5hdmlnYXRpb25Db250cm9sbGVyfSA9IHJlcXVpcmUgXCJDb250ZXh0dWFsTmF2aWdhdGlvbkNvbnRyb2xsZXJcIlxue0NvbnRleHR1YWxOYXZpZ2F0aW9uRmlyc3RMZXZlbFNlY3Rpb259ID0gcmVxdWlyZSBcIkNvbnRleHR1YWxOYXZpZ2F0aW9uRmlyc3RMZXZlbFNlY3Rpb25cIlxue0NvbnRleHR1YWxOYXZpZ2F0aW9uRmlyc3RMZXZlbFJvd30gPSByZXF1aXJlIFwiQ29udGV4dHVhbE5hdmlnYXRpb25GaXJzdExldmVsUm93XCJcbntDb250ZXh0dWFsTmF2aWdhdGlvblNlY29uZExldmVsU2VjdGlvbn0gPSByZXF1aXJlIFwiQ29udGV4dHVhbE5hdmlnYXRpb25TZWNvbmRMZXZlbFNlY3Rpb25cIlxue0NvbnRleHR1YWxOYXZpZ2F0aW9uU2Vjb25kTGV2ZWxSb3d9ID0gcmVxdWlyZSBcIkNvbnRleHR1YWxOYXZpZ2F0aW9uU2Vjb25kTGV2ZWxSb3dcIlxue0NvbnRleHR1YWxOYXZpZ2F0aW9uRHJvcGRvd259ID0gcmVxdWlyZSBcIkNvbnRleHR1YWxOYXZpZ2F0aW9uRHJvcGRvd25cIlxue0NvbnRleHR1YWxOYXZpZ2F0aW9uRHJvcGRvd25Sb3d9ID0gcmVxdWlyZSBcIkNvbnRleHR1YWxOYXZpZ2F0aW9uRHJvcGRvd25Sb3dcIlxue0NvbnRlbnRBcmVhfSA9IHJlcXVpcmUgXCJDb250ZW50QXJlYVwiXG57Q29udGVudEFyZWFDb250YWluZXJ9ID0gcmVxdWlyZSBcIkNvbnRlbnRBcmVhQ29udGFpbmVyXCJcbntIb3RzcG90fSA9IHJlcXVpcmUgXCJIb3RzcG90XCJcblxuY2xhc3MgZXhwb3J0cy5FbnZpcm9ubWVudENvbnRyb2xsZXJcblx0Y29uc3RydWN0b3I6IChpbmZvLCB0b3BCYXJIZWlnaHQsIGJyZWFkY3J1bWJzTGF5ZXJzKSAtPlxuXHRcdEBlbnZpcm9ubWVudHMgPSBbXVxuXHRcdEBjdXJyZW50RW52aXJvbm1lbnROYW1lID0gbnVsbFxuXG5cdFx0Q29udGVudEFyZWFDb250YWluZXIuc2V0VXBDb250ZW50QXJlYUNvbnRhaW5lcih0b3BCYXJIZWlnaHQsIHRoaXMpXG5cblx0XHRmb3IgZW52aXJvbm1lbnRJbmZvIGluIGluZm9cblx0XHRcdG5hbWUgPSBlbnZpcm9ubWVudEluZm9bJ25hbWUnXVxuXHRcdFx0ZW52aXJvbm1lbnQgPSBuZXcgRW52aXJvbm1lbnQobmFtZSwgYnJlYWRjcnVtYnNMYXllcnNbbmFtZV0pXG5cdFx0XHRzaWRlYmFyID0gbmV3IFNpZGViYXIobmFtZSwgZW52aXJvbm1lbnQsIHRvcEJhckhlaWdodClcblx0XHRcdFxuXHRcdFx0IyAjIyBCcmVhZGNydW1ic1xuXHRcdFx0IyBicmVhZGNydW1iTmF2aWdhdGlvbkNvbnRyb2xsZXIgPSBuZXcgQnJlYWRjcnVtYk5hdmlnYXRpb25Db250cm9sbGVyKG5hbWUsIHNpZGViYXIpXG5cdFx0XHQjIGJyZWFkY3J1bWJOYXZpZ2F0aW9uSW5mbyA9IGVudmlyb25tZW50SW5mb1snYnJlYWRjcnVtYnMnXVxuXHRcdFx0XG5cdFx0XHQjIGZvciBpIGluIFswLi5icmVhZGNydW1iTmF2aWdhdGlvbkluZm8ubGVuZ3RoIC0gMV0gYnkgMVxuXHRcdFx0IyBcdGJyZWFkY3J1bWJTZWN0aW9uSW5mbyA9IGJyZWFkY3J1bWJOYXZpZ2F0aW9uSW5mb1tpXVxuXHRcdFx0IyBcdGJyZWFkY3J1bWJTZWN0aW9uID0gbmV3IEJyZWFkY3J1bWJOYXZpZ2F0aW9uU2VjdGlvbihicmVhZGNydW1iU2VjdGlvbkluZm9bJ25hbWUnXSwgXG5cdFx0XHQjIFx0XHRicmVhZGNydW1iU2VjdGlvbkluZm9bJ3RleHQnXSwgXG5cdFx0XHQjIFx0XHRicmVhZGNydW1iTmF2aWdhdGlvbkNvbnRyb2xsZXIsIFxuXHRcdFx0IyBcdFx0aSlcblxuXHRcdFx0IyBcdGJyZWFkY3J1bWJTZWN0aW9uQ29udGVudCA9IG5ldyBCcmVhZGNydW1iTmF2aWdhdGlvblNlY3Rpb25Db250ZW50KFxuXHRcdFx0IyBcdFx0YnJlYWRjcnVtYlNlY3Rpb25JbmZvWyduYW1lJ10sXG5cdFx0XHQjIFx0XHRicmVhZGNydW1iU2VjdGlvbixcblx0XHRcdCMgXHRcdGJyZWFkY3J1bWJTZWN0aW9uSW5mb1sncm93cyddLmxlbmd0aFxuXHRcdFx0IyBcdFx0KVxuXG5cdFx0XHQjIFx0YnJlYWRjcnVtYlNlY3Rpb25Sb3dzSW5mbyA9IGJyZWFkY3J1bWJTZWN0aW9uSW5mb1sncm93cyddXG5cdFx0XHQjIFx0Zm9yIGogaW4gWzAuLmJyZWFkY3J1bWJTZWN0aW9uUm93c0luZm8ubGVuZ3RoIC0gMV0gYnkgMVxuXHRcdFx0IyBcdFx0cm93SW5mbyA9IGJyZWFkY3J1bWJTZWN0aW9uUm93c0luZm9bal1cblx0XHRcdCMgXHRcdGJyZWFkY3J1bWJSb3cgPSBuZXcgQnJlYWRjcnVtYk5hdmlnYXRpb25Sb3coXG5cdFx0XHQjIFx0XHRcdHJvd0luZm9bJ25hbWUnXSwgXG5cdFx0XHQjIFx0XHRcdHJvd0luZm9bJ3RleHQnXSxcblx0XHRcdCMgXHRcdFx0cm93SW5mb1snaW1hZ2UnXSwgXG5cdFx0XHQjIFx0XHRcdGJyZWFkY3J1bWJTZWN0aW9uQ29udGVudCwgXG5cdFx0XHQjIFx0XHRcdHJvd0luZm9bJ2Vudmlyb25tZW50X2xpbmsnXVxuXHRcdFx0IyBcdFx0XHRqKVxuXHRcdFx0IyBcdFx0YnJlYWRjcnVtYlJvdy5nZXRMYXllcigpLnNlbmRUb0JhY2soKVxuXHRcdFx0IyBcdFx0YnJlYWRjcnVtYlNlY3Rpb25Db250ZW50LmFkZFJvdyhicmVhZGNydW1iUm93KVxuXHRcdFx0XHRcblx0XHRcdCMgXHRicmVhZGNydW1iU2VjdGlvbkNvbnRlbnQuZ2V0TGluZSgpLnNlbmRUb0JhY2soKVxuXHRcdFx0IyBcdGJyZWFkY3J1bWJTZWN0aW9uLnNldENvbnRlbnQoYnJlYWRjcnVtYlNlY3Rpb25Db250ZW50KVxuXHRcdFx0IyBcdGJyZWFkY3J1bWJOYXZpZ2F0aW9uQ29udHJvbGxlci5hZGRTZWN0aW9uKGJyZWFkY3J1bWJTZWN0aW9uKVxuXG5cdFx0XHQjIGJyZWFkY3J1bWJOYXZpZ2F0aW9uQ29udHJvbGxlci5oaWdobGlnaHRMYXN0RWxlbWVudCgpXG5cdFx0XHQjIGJyZWFkY3J1bWJOYXZpZ2F0aW9uQ29udHJvbGxlci5hZGp1c3RIaWVyYXJjaHlMaW5lSGVpZ2h0cygpXG5cdFx0XHQjIHNpZGViYXIuc2V0QnJlYWRjcnVtYk5hdmlnYXRpb25Db250cm9sbGVyKGJyZWFkY3J1bWJOYXZpZ2F0aW9uQ29udHJvbGxlcilcblxuXHRcdFx0IyMgQ29udGV4dHVhbCBOYXZpZ2F0aW9uICYmIENvbnRlbnQgQXJlYVxuXHRcdFx0Y29udGV4dHVhbE5hdmlnYXRpb25Db250cm9sbGVyID0gbmV3IENvbnRleHR1YWxOYXZpZ2F0aW9uQ29udHJvbGxlcihuYW1lLCBzaWRlYmFyKVxuXHRcdFx0Y29udGV4dHVhbE5hdmlnYXRpb25JbmZvID0gZW52aXJvbm1lbnRJbmZvWydjb250ZXh0dWFsJ11cblxuXHRcdFx0IyBGaXJzdC1sZXZlbCBzZWN0aW9ucyBhbmQgY29udGVudFxuXHRcdFx0Zm9yIGkgaW4gWzAuLmNvbnRleHR1YWxOYXZpZ2F0aW9uSW5mby5sZW5ndGggLSAxXSBieSAxXG5cdFx0XHRcdCMgRmlyc3QtbGV2ZWwgc2VjdGlvblxuXHRcdFx0XHRmaXJzdExldmVsU2VjdGlvbkluZm8gPSBjb250ZXh0dWFsTmF2aWdhdGlvbkluZm9baV1cblx0XHRcdFx0Zmlyc3RMZXZlbFJvd0luZm8gPSBmaXJzdExldmVsU2VjdGlvbkluZm9bJ2ZpcnN0X2xldmVsX3JvdyddXG5cdFx0XHRcdHNlY29uZExldmVsUm93c0luZm8gPSBmaXJzdExldmVsU2VjdGlvbkluZm9bJ3NlY29uZF9sZXZlbF9yb3dzJ11cblxuXHRcdFx0XHRmaXJzdExldmVsU2VjdGlvbiA9IG5ldyBDb250ZXh0dWFsTmF2aWdhdGlvbkZpcnN0TGV2ZWxTZWN0aW9uKFxuXHRcdFx0XHRcdGZpcnN0TGV2ZWxSb3dJbmZvWyduYW1lJ10sIFxuXHRcdFx0XHRcdGNvbnRleHR1YWxOYXZpZ2F0aW9uQ29udHJvbGxlciwgXG5cdFx0XHRcdFx0aSxcblx0XHRcdFx0XHRzZWNvbmRMZXZlbFJvd3NJbmZvLmxlbmd0aClcblxuXHRcdFx0XHQjIEZpcnN0LWxldmVsIHJvd1xuXHRcdFx0XHRmaXJzdExldmVsUm93ID0gbmV3IENvbnRleHR1YWxOYXZpZ2F0aW9uRmlyc3RMZXZlbFJvdyhcblx0XHRcdFx0XHRmaXJzdExldmVsUm93SW5mb1snbmFtZSddLFxuXHRcdFx0XHRcdGZpcnN0TGV2ZWxSb3dJbmZvWyd0ZXh0J10sXG5cdFx0XHRcdFx0Zmlyc3RMZXZlbFNlY3Rpb24pXG5cblx0XHRcdFx0IyBQYWdlcyBmb3IgZmlyc3QtbGV2ZWwgcm93XG5cdFx0XHRcdGZpcnN0TGV2ZWxQYWdlc0luZm8gPSBmaXJzdExldmVsUm93SW5mb1sncGFnZXMnXVxuXHRcdFx0XHRpZiBmaXJzdExldmVsUGFnZXNJbmZvLmxlbmd0aFxuXHRcdFx0XHRcdGZvciBwYWdlSW5mbyBpbiBmaXJzdExldmVsUGFnZXNJbmZvXG5cdFx0XHRcdFx0XHRmaXJzdExldmVsQ29udGVudEFyZWEgPSBuZXcgQ29udGVudEFyZWEoXG5cdFx0XHRcdFx0XHRcdHBhZ2VJbmZvWyduYW1lJ10sXG5cdFx0XHRcdFx0XHRcdHBhZ2VJbmZvWydpbWFnZSddLFxuXHRcdFx0XHRcdFx0XHRwYWdlSW5mb1snaGVpZ2h0J10pXG5cblx0XHRcdFx0XHRcdGZvciBob3RzcG90SW5mbyBpbiBwYWdlSW5mb1snaG90c3BvdHMnXVxuXHRcdFx0XHRcdFx0XHRmaXJzdExldmVsSG90c3BvdCA9IG5ldyBIb3RzcG90KFxuXHRcdFx0XHRcdFx0XHRcdGhvdHNwb3RJbmZvWyd4J10sXG5cdFx0XHRcdFx0XHRcdFx0aG90c3BvdEluZm9bJ3knXSxcblx0XHRcdFx0XHRcdFx0XHRob3RzcG90SW5mb1snd2lkdGgnXSxcblx0XHRcdFx0XHRcdFx0XHRob3RzcG90SW5mb1snaGVpZ2h0J10sXG5cdFx0XHRcdFx0XHRcdFx0aG90c3BvdEluZm9bJ2xpbmsnXVsnZW52aXJvbm1lbnQnXSxcblx0XHRcdFx0XHRcdFx0XHRob3RzcG90SW5mb1snbGluayddWydmaXJzdF9sZXZlbF9zZWN0aW9uX2luZGV4J10sXG5cdFx0XHRcdFx0XHRcdFx0aG90c3BvdEluZm9bJ2xpbmsnXVsnc2Vjb25kX2xldmVsX3Jvd19pbmRleCddLFxuXHRcdFx0XHRcdFx0XHRcdGhvdHNwb3RJbmZvWydsaW5rJ11bJ3BhZ2VfaW5kZXgnXSxcblx0XHRcdFx0XHRcdFx0XHRmaXJzdExldmVsQ29udGVudEFyZWEsXG5cdFx0XHRcdFx0XHRcdFx0ZW52aXJvbm1lbnRcblx0XHRcdFx0XHRcdFx0XHQpXG5cdFx0XHRcdFx0XHRcdGZpcnN0TGV2ZWxDb250ZW50QXJlYS5hZGRIb3RzcG90KGZpcnN0TGV2ZWxIb3RzcG90KVxuXG5cdFx0XHRcdFx0XHRmaXJzdExldmVsUm93LmFkZENvbnRlbnRBcmVhKGZpcnN0TGV2ZWxDb250ZW50QXJlYSlcblx0XHRcdFx0XG5cdFx0XHRcdGZpcnN0TGV2ZWxTZWN0aW9uLnNldFJvdyhmaXJzdExldmVsUm93KVxuXG5cdFx0XHRcdCMgU2Vjb25kLWxldmVsIHNlY3Rpb24gYW5kIGRyb3Bkb3duXG5cdFx0XHRcdHNlY29uZExldmVsU2VjdGlvbiA9IG5ldyBDb250ZXh0dWFsTmF2aWdhdGlvblNlY29uZExldmVsU2VjdGlvbihcblx0XHRcdFx0XHRmaXJzdExldmVsUm93SW5mb1snbmFtZSddLFxuXHRcdFx0XHRcdGZpcnN0TGV2ZWxTZWN0aW9uLFxuXHRcdFx0XHRcdGZpcnN0TGV2ZWxTZWN0aW9uSW5mb1snc2Vjb25kX2xldmVsX3Jvd3MnXS5sZW5ndGhcblx0XHRcdFx0XHQpXG5cblx0XHRcdFx0ZHJvcGRvd24gPSBuZXcgQ29udGV4dHVhbE5hdmlnYXRpb25Ecm9wZG93bihcblx0XHRcdFx0XHRmaXJzdExldmVsUm93SW5mb1snbmFtZSddLFxuXHRcdFx0XHRcdGZpcnN0TGV2ZWxTZWN0aW9uKVxuXG5cdFx0XHRcdGZvciBqIGluIFswLi5zZWNvbmRMZXZlbFJvd3NJbmZvLmxlbmd0aCAtIDFdIGJ5IDFcblx0XHRcdFx0XHRzZWNvbmRMZXZlbFJvd0luZm8gPSBzZWNvbmRMZXZlbFJvd3NJbmZvW2pdXG5cdFx0XHRcdFx0XG5cdFx0XHRcdFx0c2Vjb25kTGV2ZWxSb3cgPSBuZXcgQ29udGV4dHVhbE5hdmlnYXRpb25TZWNvbmRMZXZlbFJvdyhcblx0XHRcdFx0XHRcdHNlY29uZExldmVsUm93SW5mb1snbmFtZSddLFxuXHRcdFx0XHRcdFx0c2Vjb25kTGV2ZWxSb3dJbmZvWyd0ZXh0J10sXG5cdFx0XHRcdFx0XHRzZWNvbmRMZXZlbFNlY3Rpb24sXG5cdFx0XHRcdFx0XHRqKVxuXG5cdFx0XHRcdFx0IyBDb250ZW50IGFyZWEgZm9yIHNlY29uZC1sZXZlbCByb3dcblx0XHRcdFx0XHQjIFBhZ2VzIGZvciBzZWNvbmQtbGV2ZWwgcm93XG5cdFx0XHRcdFx0c2Vjb25kTGV2ZWxQYWdlc0luZm8gPSBzZWNvbmRMZXZlbFJvd0luZm9bJ3BhZ2VzJ11cblx0XHRcdFx0XHRpZiBzZWNvbmRMZXZlbFBhZ2VzSW5mby5sZW5ndGggXG5cdFx0XHRcdFx0XHRmb3IgcGFnZUluZm8gaW4gc2Vjb25kTGV2ZWxQYWdlc0luZm9cblx0XHRcdFx0XHRcdFx0c2Vjb25kTGV2ZWxDb250ZW50QXJlYSA9IG5ldyBDb250ZW50QXJlYShcblx0XHRcdFx0XHRcdFx0XHRwYWdlSW5mb1snbmFtZSddLFxuXHRcdFx0XHRcdFx0XHRcdHBhZ2VJbmZvWydpbWFnZSddLFxuXHRcdFx0XHRcdFx0XHRcdHBhZ2VJbmZvWydoZWlnaHQnXSlcblxuXHRcdFx0XHRcdFx0XHRmb3IgaG90c3BvdEluZm8gaW4gcGFnZUluZm9bJ2hvdHNwb3RzJ11cblx0XHRcdFx0XHRcdFx0XHRzZWNvbmRMZXZlbEhvdHNwb3QgPSBuZXcgSG90c3BvdChcblx0XHRcdFx0XHRcdFx0XHRcdGhvdHNwb3RJbmZvWyd4J10sXG5cdFx0XHRcdFx0XHRcdFx0XHRob3RzcG90SW5mb1sneSddLFxuXHRcdFx0XHRcdFx0XHRcdFx0aG90c3BvdEluZm9bJ3dpZHRoJ10sXG5cdFx0XHRcdFx0XHRcdFx0XHRob3RzcG90SW5mb1snaGVpZ2h0J10sXG5cdFx0XHRcdFx0XHRcdFx0XHRob3RzcG90SW5mb1snbGluayddWydlbnZpcm9ubWVudCddLFxuXHRcdFx0XHRcdFx0XHRcdFx0aG90c3BvdEluZm9bJ2xpbmsnXVsnZmlyc3RfbGV2ZWxfc2VjdGlvbl9pbmRleCddLFxuXHRcdFx0XHRcdFx0XHRcdFx0aG90c3BvdEluZm9bJ2xpbmsnXVsnc2Vjb25kX2xldmVsX3Jvd19pbmRleCddLFxuXHRcdFx0XHRcdFx0XHRcdFx0aG90c3BvdEluZm9bJ2xpbmsnXVsncGFnZV9pbmRleCddLFxuXHRcdFx0XHRcdFx0XHRcdFx0c2Vjb25kTGV2ZWxDb250ZW50QXJlYSxcblx0XHRcdFx0XHRcdFx0XHRcdGVudmlyb25tZW50XG5cdFx0XHRcdFx0XHRcdFx0XHQpXG5cdFx0XHRcdFx0XHRcdFx0c2Vjb25kTGV2ZWxDb250ZW50QXJlYS5hZGRIb3RzcG90KHNlY29uZExldmVsSG90c3BvdClcblxuXHRcdFx0XHRcdFx0XHRzZWNvbmRMZXZlbFJvdy5hZGRDb250ZW50QXJlYShzZWNvbmRMZXZlbENvbnRlbnRBcmVhKVxuXG5cdFx0XHRcdFx0c2Vjb25kTGV2ZWxTZWN0aW9uLmFkZFJvdyhzZWNvbmRMZXZlbFJvdylcblxuXHRcdFx0XHRcdGRyb3Bkb3duUm93ID0gbmV3IENvbnRleHR1YWxOYXZpZ2F0aW9uRHJvcGRvd25Sb3coXG5cdFx0XHRcdFx0XHRzZWNvbmRMZXZlbFJvd0luZm9bJ25hbWUnXSxcblx0XHRcdFx0XHRcdHNlY29uZExldmVsUm93SW5mb1sndGV4dCddLFxuXHRcdFx0XHRcdFx0ZHJvcGRvd24sXG5cdFx0XHRcdFx0XHRqKVxuXHRcdFx0XHRcdGRyb3Bkb3duLmFkZFJvdyhkcm9wZG93blJvdylcblxuXHRcdFx0XHRmaXJzdExldmVsU2VjdGlvbi5zZXRTZWNvbmRMZXZlbFNlY3Rpb24oc2Vjb25kTGV2ZWxTZWN0aW9uKVxuXHRcdFx0XHRmaXJzdExldmVsU2VjdGlvbi5zZXREcm9wZG93bihkcm9wZG93bilcblx0XHRcdFx0Y29udGV4dHVhbE5hdmlnYXRpb25Db250cm9sbGVyLmFkZFNlY3Rpb24oZmlyc3RMZXZlbFNlY3Rpb24pXG5cblx0XHRcdHNpZGViYXIuc2V0Q29udGV4dHVhbE5hdmlnYXRpb25Db250cm9sbGVyKGNvbnRleHR1YWxOYXZpZ2F0aW9uQ29udHJvbGxlcilcblx0XHRcdHNpZGViYXIucmVjYWxjdWxhdGVQb3NpdGlvbnMoKVxuXHRcdFx0ZW52aXJvbm1lbnQuc2V0U2lkZWJhcihzaWRlYmFyKVxuXG5cdFx0XHRAZW52aXJvbm1lbnRzLnB1c2goZW52aXJvbm1lbnQpXG5cblx0YWRkQ29udHJvbGxlclJlZmVyZW5jZVRvRW52aXJvbm1lbnRzOiA9PlxuXHRcdGZvciBlbnZpcm9ubWVudCBpbiBAZW52aXJvbm1lbnRzXG5cdFx0XHRlbnZpcm9ubWVudC5zZXRFbnZpcm9ubWVudENvbnRyb2xsZXIodGhpcylcblxuXHRnZXRFbnZpcm9ubWVudHM6ID0+XG5cdFx0cmV0dXJuIEBlbnZpcm9ubWVudHNcblxuXHRnZXRDdXJyZW50RW52aXJvbm1lbnROYW1lOiA9PlxuXHRcdHJldHVybiBAY3VycmVudEVudmlyb25tZW50TmFtZVxuXG5cdGdldEN1cnJlbnRFbnZpcm9ubWVudDogPT5cblx0XHRmb3IgZW52aXJvbm1lbnQgaW4gQGVudmlyb25tZW50c1xuXHRcdFx0aWYgZW52aXJvbm1lbnQuZ2V0TmFtZSgpID09IEBjdXJyZW50RW52aXJvbm1lbnROYW1lXG5cdFx0XHRcdHJldHVybiBlbnZpcm9ubWVudFxuXG5cdFx0cmV0dXJuIG5pbFxuXG5cdHNldFVwSW5pdGlhbFN0YXRlOiAoaW5pdGlhbFN0YXRlSW5mbykgPT5cblx0XHRAY3VycmVudEVudmlyb25tZW50TmFtZSA9IGluaXRpYWxTdGF0ZUluZm9bJ2Vudmlyb25tZW50J11cblxuXG5cdFx0Zm9yIGVudmlyb25tZW50IGluIEBlbnZpcm9ubWVudHNcblx0XHRcdGlmIGVudmlyb25tZW50LmdldE5hbWUoKSA9PSBAY3VycmVudEVudmlyb25tZW50TmFtZVxuXHRcdFx0XHRzaWRlYmFyID0gZW52aXJvbm1lbnQuZ2V0U2lkZWJhcigpXG5cdFx0XHRcdHNpZGViYXIuc3dpdGNoU3RhdGVWaXNpYmxlKClcblx0XHRcdFx0ZW52aXJvbm1lbnQuYnJlYWRjcnVtYnNMYXllclN3aXRjaFN0YXRlVmlzaWxlKClcblxuXHRcdFx0XHRjb250ZXh0dWFsTmF2aWdhdGlvbkNvbnRyb2xsZXIgPSBzaWRlYmFyLmdldENvbnRleHR1YWxOYXZpZ2F0aW9uQ29udHJvbGxlcigpIFxuXHRcdFx0XHRjb250ZXh0dWFsTmF2aWdhdGlvbkNvbnRyb2xsZXIuc2VsZWN0Rmlyc3RMZXZlbFJvd0J5SW5kZXgoaW5pdGlhbFN0YXRlSW5mb1snZmlyc3RfbGV2ZWxfc2VjdGlvbl9pbmRleCddKVxuXG5cdFx0XHRcdGZpcnN0TGV2ZWxTZWN0aW9uID0gY29udGV4dHVhbE5hdmlnYXRpb25Db250cm9sbGVyLmdldEZpcnN0TGV2ZWxTZWN0aW9ucygpW2luaXRpYWxTdGF0ZUluZm9bJ2ZpcnN0X2xldmVsX3NlY3Rpb25faW5kZXgnXV1cblxuXHRcdFx0XHRzZWNvbmRMZXZlbFJvd3MgPSBmaXJzdExldmVsU2VjdGlvbi5nZXRTZWNvbmRMZXZlbFNlY3Rpb24oKS5nZXRTZWNvbmRMZXZlbFJvd3MoKVxuXHRcdFx0XHRzZWNvbmRMZXZlbFNlY3Rpb24gPSBmaXJzdExldmVsU2VjdGlvbi5nZXRTZWNvbmRMZXZlbFNlY3Rpb24oKVxuXG5cdFx0XHRcdGlmIHNlY29uZExldmVsUm93cy5sZW5ndGggXG5cdFx0XHRcdFx0c2Vjb25kTGV2ZWxTZWN0aW9uLnN3aXRjaFN0YXRlRGVmYXVsdCgpXG5cdFx0XHRcdFx0aWYgaW5pdGlhbFN0YXRlSW5mb1snc2Vjb25kX2xldmVsX3Jvd19pbmRleCddICE9IG51bGxcblx0XHRcdFx0XHRcdGNvbnRleHR1YWxOYXZpZ2F0aW9uQ29udHJvbGxlci5zZWxlY3RTZWNvbmRMZXZlbFJvd0J5SW5kZXgoaW5pdGlhbFN0YXRlSW5mb1snc2Vjb25kX2xldmVsX3Jvd19pbmRleCddKVxuXHRcdFx0XHRcdFx0Y29udGV4dHVhbE5hdmlnYXRpb25Db250cm9sbGVyLnJlY2FsY3VsYXRlQ29udGV4dHVhbFBvc2l0aW9ucygpXG5cblx0XHRcdFx0Zmlyc3RMZXZlbFJvdyA9IGZpcnN0TGV2ZWxTZWN0aW9uLmdldEZpcnN0TGV2ZWxSb3coKVxuXHRcdFx0XHRDb250ZW50QXJlYUNvbnRhaW5lci5mbG93LnNob3dOZXh0KGZpcnN0TGV2ZWxSb3cuZ2V0Q29udGVudEFyZWFCeUluZGV4KGluaXRpYWxTdGF0ZUluZm9bJ3BhZ2VfaW5kZXgnXSkuZ2V0U2Nyb2xsKCksIGFuaW1hdGU6ZmFsc2UpXG5cblx0XHRcdFx0YnJlYWtcblxuXHRzd2l0Y2hUb0Vudmlyb25tZW50OiAobmV3RW52aXJvbm1lbnROYW1lLCBmaXJzdExldmVsU2VjdGlvbkluZGV4LCBzZWNvbmRMZXZlbFJvd0luZGV4LCBwYWdlSW5kZXgpID0+XG5cdFx0IyBpZiBAY3VycmVudEVudmlyb25tZW50TmFtZSAhPSBlbnZpcm9ubWVudE5hbWVcblx0XHQjIFx0IyBEZWFjdGl2YXRlIHRoZSBzZWN0aW9ucyBpbiB0aGUgY3VycmVudCBcblx0XHQjIFx0IyBIaWRlIHRoZSBjdXJyZW50IG9uZVxuXG5cdFx0IyBHZXQgdGhlIGN1cnJlbnQgYW5kIG5ldyBlbnZpcm9ubWVudHNcblx0XHRjdXJyZW50RW52aXJvbm1lbnQgPSBudWxsXG5cdFx0bmV3RW52aXJvbm1lbnQgPSBudWxsXG5cdFx0XG5cdFx0Zm9yIGVudmlyb25tZW50IGluIEBlbnZpcm9ubWVudHNcblx0XHRcdGlmIGVudmlyb25tZW50LmdldE5hbWUoKSA9PSBAY3VycmVudEVudmlyb25tZW50TmFtZVxuXHRcdFx0XHRjdXJyZW50RW52aXJvbm1lbnQgPSBlbnZpcm9ubWVudFxuXG5cdFx0XHRpZiBlbnZpcm9ubWVudC5nZXROYW1lKCkgPT0gbmV3RW52aXJvbm1lbnROYW1lXG5cdFx0XHRcdG5ld0Vudmlyb25tZW50ID0gZW52aXJvbm1lbnRcblxuXHRcdFx0aWYgY3VycmVudEVudmlyb25tZW50ICE9IG51bGwgJiYgbmV3RW52aXJvbm1lbnQgIT0gbnVsbFxuXHRcdFx0XHRicmVha1xuXG5cdFx0IyBTZXQgdGhlIHJvd3MgaW4gdGhlIGN1cnJlbiBzaWRlYmFyIHRvIHJlc3Rpbmcgc3RhdGVcblx0XHRjdXJyZW50RW52aXJvbm1lbnQuZ2V0U2lkZWJhcigpLmdldENvbnRleHR1YWxOYXZpZ2F0aW9uQ29udHJvbGxlcigpLnNldFNlbGVjdGVkUm93c0luRGVmYXVsdFN0YXRlKClcblxuXHRcdCMgSWYgdGhleSBhcmUgZGlmZmVyZW50LCBoaWRlIHRoZSBvbGQgc2lkZWJhclxuXHRcdGlmIGN1cnJlbnRFbnZpcm9ubWVudCAhPSBuZXdFbnZpcm9ubWVudFxuXHRcdFx0Y3VycmVudEVudmlyb25tZW50LmdldFNpZGViYXIoKS5zd2l0Y2hTdGF0ZURlZmF1bHQoKVxuXHRcdFx0Y3VycmVudEVudmlyb25tZW50LmJyZWFkY3J1bWJzTGF5ZXJTd2l0Y2hTdGF0ZURlZmF1bHQoKVxuXHRcdFx0bmV3RW52aXJvbm1lbnQuZ2V0U2lkZWJhcigpLnN3aXRjaFN0YXRlVmlzaWJsZSgpXG5cdFx0XHRuZXdFbnZpcm9ubWVudC5icmVhZGNydW1ic0xheWVyU3dpdGNoU3RhdGVWaXNpbGUoKVxuXG5cblx0XHRuZXdDb250ZXh0dWFsTmF2aWdhdGlvbkNvbnRyb2xsZXIgPVx0bmV3RW52aXJvbm1lbnQuZ2V0U2lkZWJhcigpLmdldENvbnRleHR1YWxOYXZpZ2F0aW9uQ29udHJvbGxlcigpXG5cdFx0bmV3Q29udGV4dHVhbE5hdmlnYXRpb25Db250cm9sbGVyLnNlbGVjdEZpcnN0TGV2ZWxSb3dCeUluZGV4KGZpcnN0TGV2ZWxTZWN0aW9uSW5kZXgpXG5cdFx0aWYgc2Vjb25kTGV2ZWxSb3dJbmRleFxuXHRcdFx0bmV3Q29udGV4dHVhbE5hdmlnYXRpb25Db250cm9sbGVyLnNlbGVjdFNlY29uZExldmVsUm93QnlJbmRleChzZWNvbmRMZXZlbFJvd0luZGV4KVxuXG5cdFx0bmV3Q29udGVudEFyZWEgPSBudWxsXG5cdFx0aWYgc2Vjb25kTGV2ZWxSb3dJbmRleFxuXHRcdFx0IyBwcmludCBuZXdDb250ZXh0dWFsTmF2aWdhdGlvbkNvbnRyb2xsZXIuZ2V0Rmlyc3RMZXZlbFNlY3Rpb25zKClbZmlyc3RMZXZlbFNlY3Rpb25JbmRleF0uZ2V0U2Vjb25kTGV2ZWxTZWN0aW9uKCkuZ2V0U2Vjb25kTGV2ZWxSb3dzXG5cdFx0XHRuZXdDb250ZW50QXJlYSA9IG5ld0NvbnRleHR1YWxOYXZpZ2F0aW9uQ29udHJvbGxlci5nZXRGaXJzdExldmVsU2VjdGlvbnMoKVtmaXJzdExldmVsU2VjdGlvbkluZGV4XS5nZXRTZWNvbmRMZXZlbFNlY3Rpb24oKS5nZXRTZWNvbmRMZXZlbFJvd3MoKVtzZWNvbmRMZXZlbFJvd0luZGV4XS5nZXRDb250ZW50QXJlYXMoKVtwYWdlSW5kZXhdXG5cdFx0ZWxzZVxuXHRcdFx0bmV3Q29udGVudEFyZWEgPSBuZXdDb250ZXh0dWFsTmF2aWdhdGlvbkNvbnRyb2xsZXIuZ2V0Rmlyc3RMZXZlbFNlY3Rpb25zKClbZmlyc3RMZXZlbFNlY3Rpb25JbmRleF0uZ2V0Rmlyc3RMZXZlbFJvdygpLmdldENvbnRlbnRBcmVhcygpW3BhZ2VJbmRleF1cblxuXG5cdFx0Q29udGVudEFyZWFDb250YWluZXIuZmxvdy5zaG93TmV4dChuZXdDb250ZW50QXJlYS5nZXRTY3JvbGwoKSwgYW5pbWF0ZTpmYWxzZSlcblx0XHRAY3VycmVudEVudmlyb25tZW50TmFtZSA9IG5ld0Vudmlyb25tZW50TmFtZVxuIiwie0NvbnN0YW50c30gPSByZXF1aXJlIFwiQ29uc3RhbnRzXCJcblxuY2xhc3MgZXhwb3J0cy5Db250ZXh0dWFsTmF2aWdhdGlvblNlY29uZExldmVsU2VjdGlvblxuXHRjb25zdHJ1Y3RvcjogKEBuYW1lLCBAZmlyc3RMZXZlbFNlY3Rpb24sIG51bWJlck9mU2Vjb25kTGF5ZXJSb3dzKSAtPlxuXHRcdEBzZWNvbmRMZXZlbFJvd3MgPSBbXVxuXG5cdFx0QGxheWVyID0gbmV3IExheWVyXG5cdFx0XHRuYW1lOiBAbmFtZSArIFwiX3N1Yl9pdGVtc1wiXG5cdFx0XHRwYXJlbnQ6IEBmaXJzdExldmVsU2VjdGlvbi5nZXRMYXllcigpXG5cdFx0XHRiYWNrZ3JvdW5kQ29sb3I6IFwidHJhbnNwYXJlbnRcIlxuXHRcdFx0aGVpZ2h0OiBudW1iZXJPZlNlY29uZExheWVyUm93cyAqIENvbnN0YW50cy5yb3dIZWlnaHRcblx0XHRcdHdpZHRoOiBDb25zdGFudHMuc2lkZWJhcldpZHRoXG5cdFx0XHR5OiBDb25zdGFudHMucm93SGVpZ2h0XG5cdFx0XHRjbGlwOiB0cnVlXG5cdFx0XHRcblx0XHRAbGF5ZXIuc3RhdGVzLmRlZmF1bHQuYW5pbWF0aW9uT3B0aW9ucyA9XG5cdFx0XHR0aW1lOiAwLjNcblx0XHRcdGN1cnZlOiBCZXppZXIuZWFzZUluT3V0XG5cdFx0XHRcblx0XHRAbGF5ZXIuc3RhdGVzLmNvbGxhcHNlZCA9IFxuXHRcdFx0aGVpZ2h0OiAwXG5cdFx0XHRhbmltYXRpb25PcHRpb25zOlxuXHRcdFx0XHR0aW1lOiAwLjNcblx0XHRcdFx0Y3VydmU6IEJlemllci5lYXNlSW5PdXRcblxuXHRnZXRTZWNvbmRMZXZlbFJvd3M6ID0+XG5cdFx0cmV0dXJuIEBzZWNvbmRMZXZlbFJvd3NcblxuXHRnZXROYW1lOiA9PlxuXHRcdHJldHVybiBAbmFtZVxuXG5cdGdldEZpcnN0TGV2ZWxTZWN0aW9uOiA9PlxuXHRcdHJldHVybiBAZmlyc3RMZXZlbFNlY3Rpb25cblxuXHRnZXRMYXllcjogPT5cblx0XHRyZXR1cm4gQGxheWVyXG5cblx0YWRkUm93OiAocm93KSA9PlxuXHRcdEBzZWNvbmRMZXZlbFJvd3MucHVzaChyb3cpXG5cblx0c3dpdGNoU3RhdGVEZWZhdWx0OiAoKSA9PlxuXHRcdEBsYXllci5zdGF0ZVN3aXRjaChcImRlZmF1bHRcIilcblxuXHRzd2l0Y2hTdGF0ZUNvbGxhcHNlZDogKCkgPT4gXG5cdFx0QGxheWVyLnN0YXRlU3dpdGNoKFwiY29sbGFwc2VkXCIpXG5cblx0YW5pbWF0ZVN0YXRlRGVmYXVsdDogKCkgPT5cblx0XHRAbGF5ZXIuYW5pbWF0ZShcImRlZmF1bHRcIilcblxuXHRhbmltYXRlU3RhdGVDb2xsYXBzZWQ6ICgpID0+XG5cdFx0QGxheWVyLmFuaW1hdGUoXCJjb2xsYXBzZWRcIikiLCJ7Q29udGVudEFyZWFDb250YWluZXJ9ID0gcmVxdWlyZSBcIkNvbnRlbnRBcmVhQ29udGFpbmVyXCJcbntDb25zdGFudHN9ID0gcmVxdWlyZSBcIkNvbnN0YW50c1wiXG57Um93fSA9IHJlcXVpcmUgXCJSb3dcIlxuXG5jbGFzcyBleHBvcnRzLkNvbnRleHR1YWxOYXZpZ2F0aW9uU2Vjb25kTGV2ZWxSb3cgZXh0ZW5kcyBSb3dcblx0Y29uc3RydWN0b3I6IChAbmFtZSwgQHRleHQsIEBzZWNvbmRMZXZlbFNlY3Rpb24sIEBpbmRleCkgLT5cblx0XHRAY29udGVudEFyZWFzID0gW11cblxuXHRcdHN1cGVyKEBuYW1lLCBAdGV4dCwgQ29uc3RhbnRzLnNpZGViYXJXaWR0aCwgQHNlY29uZExldmVsU2VjdGlvbi5nZXRMYXllcigpKVxuXHRcdFxuXHRcdEBjb250ZXh0dWFsTmF2aWdhdGlvbkNvbnRyb2xsZXIgPSBAc2Vjb25kTGV2ZWxTZWN0aW9uLmdldEZpcnN0TGV2ZWxTZWN0aW9uKCkuZ2V0Q29udGV4dHVhbE5hdmlnYXRpb25Db250cm9sbGVyKClcblx0XHRcblx0XHRAbGF5ZXIueSA9IEBpbmRleCAqIENvbnN0YW50cy5yb3dIZWlnaHRcblx0XHRAbGF5ZXIuYmFja2dyb3VuZENvbG9yID0gXCIjZjVmNWY1XCJcblx0XHRAdGV4dExheWVyLnggPSBDb25zdGFudHMuaW5kZW50YXRpb24gKiAyXG5cdFx0QHRleHRMYXllci53aWR0aCA9IENvbnN0YW50cy5zaWRlYmFyV2lkdGggLSBDb25zdGFudHMuaW5kZW50YXRpb24gKlxuXHRcdEBsYXllci5jbGlwID0gdHJ1ZVxuXHRcdFxuXHRcdEBhZGRTdGF0ZXMoKVx0XHRcblx0XHRAYWRkRXZlbnRzKClcblxuXHRnZXROYW1lOiA9PlxuXHRcdHJldHVybiBAbmFtZVxuXG5cdGdldFRleHQ6ID0+XG5cdFx0cmV0dXJuIEB0ZXh0XG5cblx0Z2V0U2Vjb25kTGV2ZWxTZWN0aW9uOiA9PlxuXHRcdHJldHVybiBAc2Vjb25kTGV2ZWxTZWN0aW9uXG5cblx0Z2V0Q29udGVudEFyZWFzOiA9PlxuXHRcdHJldHVybiBAY29udGVudEFyZWFzXG5cblx0Z2V0Q29udGVudEFyZWFCeUluZGV4OiAoaW5kZXgpID0+XG5cdFx0cmV0dXJuIEBjb250ZW50QXJlYXNbaW5kZXhdXG5cblx0Z2V0SW5kZXg6ID0+XG5cdFx0cmV0dXJuIEBpbmRleFxuXG5cdGFkZENvbnRlbnRBcmVhOiAoY29udGVudEFyZWEpID0+XG5cdFx0QGNvbnRlbnRBcmVhcy5wdXNoKGNvbnRlbnRBcmVhKVxuXG5cdGFkZFN0YXRlczogPT5cblx0XHRAbGF5ZXIuc3RhdGVzLmhvdmVyID1cblx0XHRcdGJhY2tncm91bmRDb2xvcjogXCIjZWNlY2VjXCJcblx0XHRcdGFuaW1hdGlvbk9wdGlvbnM6XG5cdFx0XHRcdHRpbWU6IDAuMVxuXG5cdFx0QGxheWVyLnN0YXRlcy5zZWxlY3RlZCA9XG5cdFx0XHRiYWNrZ3JvdW5kQ29sb3I6IFwiI2VjZWNlY1wiXG5cdFx0XG5cdFx0QHRleHRMYXllci5zdGF0ZXMuc2VsZWN0ZWQgPVxuXHRcdFx0Zm9udFdlaWdodDogNjAwXG5cdFx0XHRjb2xvcjogXCIjNGE4YmVlXCJcblxuXHRhZGRFdmVudHM6ID0+XG5cdFx0QGxheWVyLm9uQ2xpY2sgPT5cdFxuXHRcdFx0aWYgQGNvbnRlbnRBcmVhcy5sZW5ndGhcblx0XHRcdFx0QGNvbnRleHR1YWxOYXZpZ2F0aW9uQ29udHJvbGxlci5zZWxlY3RTZWNvbmRMZXZlbFJvd0J5SW5kZXgoQGluZGV4KVxuXHRcdFx0XHRDb250ZW50QXJlYUNvbnRhaW5lci5mbG93LnNob3dOZXh0KEBjb250ZW50QXJlYXNbMF0uZ2V0U2Nyb2xsKCksIGFuaW1hdGU6IGZhbHNlKVxuXHRcdFx0XG5cdFx0QGxheWVyLm9uTW91c2VPdmVyID0+XG5cdFx0XHRAbGF5ZXIuYW5pbWF0ZShcImhvdmVyXCIpXG5cdFx0XHRAY29udGV4dHVhbE5hdmlnYXRpb25Db250cm9sbGVyLmhpZGVWaXNpYmxlRHJvcGRvd24oKVx0XHRcblx0XHRcdFxuXHRcdEBsYXllci5vbk1vdXNlT3V0ID0+XG5cdFx0XHRAY29udGV4dHVhbE5hdmlnYXRpb25Db250cm9sbGVyLnNldFNlY29uZExldmVsUm93SW5SZXN0aW5nU3RhdGVCeUluZGV4KEBpbmRleClcblxuXHRzd2l0Y2hTdGF0ZVNlbGVjdGVkOiA9PlxuXHRcdEBsYXllci5zdGF0ZVN3aXRjaChcInNlbGVjdGVkXCIpXG5cdFx0QHRleHRMYXllci5zdGF0ZVN3aXRjaChcInNlbGVjdGVkXCIpXG5cblx0c3dpdGNoU3RhdGVEZWZhdWx0OiA9PlxuXHRcdEBsYXllci5zdGF0ZVN3aXRjaChcImRlZmF1bHRcIilcblx0XHRAdGV4dExheWVyLnN0YXRlU3dpdGNoKFwiZGVmYXVsdFwiKVxuXG5cbiIsIntDb25zdGFudHN9ID0gcmVxdWlyZSBcIkNvbnN0YW50c1wiXG5cbmNsYXNzIGV4cG9ydHMuQ29udGV4dHVhbE5hdmlnYXRpb25GaXJzdExldmVsU2VjdGlvblxuXHRjb25zdHJ1Y3RvcjogKEBuYW1lLCBAY29udGV4dHVhbE5hdmlnYXRpb25Db250cm9sbGVyLCBAaW5kZXgsIG51bWJlck9mU2Vjb25kTGF5ZXJSb3dzKSAtPlxuXHRcdEBmaXJzdExldmVsUm93ID0gbnVsbFxuXHRcdEBzZWNvbmRMZXZlbFNlY3Rpb24gPSBudWxsXG5cdFx0QGRyb3Bkb3duID0gbnVsbFxuXG5cdFx0QGxheWVyID0gbmV3IExheWVyXG5cdFx0XHRuYW1lOiBAbmFtZSArIFwiX3NlY3Rpb25cIlxuXHRcdFx0cGFyZW50OiBAY29udGV4dHVhbE5hdmlnYXRpb25Db250cm9sbGVyLmdldExheWVyKClcblx0XHRcdGJhY2tncm91bmRDb2xvcjogXCJ0cmFuc3BhcmVudFwiXG5cdFx0XHRoZWlnaHQ6IChudW1iZXJPZlNlY29uZExheWVyUm93cyArIDEpKiBDb25zdGFudHMucm93SGVpZ2h0XG5cdFx0XHR3aWR0aDogQ29uc3RhbnRzLnNpZGViYXJXaWR0aFxuXG5cdGdldEZpcnN0TGV2ZWxSb3c6ID0+XG5cdFx0cmV0dXJuIEBmaXJzdExldmVsUm93XG5cblx0Z2V0U2Vjb25kTGV2ZWxTZWN0aW9uOiA9PlxuXHRcdHJldHVybiBAc2Vjb25kTGV2ZWxTZWN0aW9uXG5cblx0Z2V0RHJvcGRvd246ID0+XG5cdFx0cmV0dXJuIEBkcm9wZG93blxuXG5cdGdldE5hbWU6ID0+XG5cdFx0cmV0dXJuIEBuYW1lXG5cblx0Z2V0Q29udGV4dHVhbE5hdmlnYXRpb25Db250cm9sbGVyOiA9PlxuXHRcdHJldHVybiBAY29udGV4dHVhbE5hdmlnYXRpb25Db250cm9sbGVyXG5cblx0Z2V0SW5kZXg6ID0+XG5cdFx0cmV0dXJuIEBpbmRleFxuXG5cdGdldExheWVyOiA9PlxuXHRcdHJldHVybiBAbGF5ZXJcblxuXHRzZXRSb3c6IChyb3cpID0+XG5cdFx0QGZpcnN0TGV2ZWxSb3cgPSByb3dcblxuXHRzZXRTZWNvbmRMZXZlbFNlY3Rpb246IChzZWN0aW9uKSA9PlxuXHRcdEBzZWNvbmRMZXZlbFNlY3Rpb24gPSBzZWN0aW9uXG5cblx0c2V0RHJvcGRvd246IChzZXREcm9wZG93bikgPT5cblx0XHRAZHJvcGRvd24gPSBzZXREcm9wZG93blxuXG5cblx0bWFrZUFjdGl2ZUZyb21GaXJzdExldmVsUm93OiA9PlxuXG5cdG1ha2VBY3RpdmVGcm9tU2Vjb25kTGV2ZWxSb3c6ID0+XG5cblx0bWFrZUFjdGl2ZUZyb21GaXJzdEFuZFNlY29uZExldmVsUm93OiA9PlxuXG5cdFx0Iiwie0NvbnRlbnRBcmVhQ29udGFpbmVyfSA9IHJlcXVpcmUgXCJDb250ZW50QXJlYUNvbnRhaW5lclwiXG57Q29uc3RhbnRzfSA9IHJlcXVpcmUgXCJDb25zdGFudHNcIlxue1Jvd30gPSByZXF1aXJlIFwiUm93XCJcblxuY2xhc3MgZXhwb3J0cy5Db250ZXh0dWFsTmF2aWdhdGlvbkZpcnN0TGV2ZWxSb3cgZXh0ZW5kcyBSb3dcblx0Y29uc3RydWN0b3I6IChAbmFtZSwgQHRleHQsIEBmaXJzdExldmVsU2VjdGlvbikgLT5cblx0XHRAY29udGVudEFyZWFzID0gW11cblxuXHRcdHN1cGVyKEBuYW1lLCBAdGV4dCwgQ29uc3RhbnRzLnNpZGViYXJXaWR0aCwgQGZpcnN0TGV2ZWxTZWN0aW9uLmdldExheWVyKCkpXG5cdFx0XG5cdFx0QGNvbnRleHR1YWxOYXZpZ2F0aW9uQ29udHJvbGxlciA9IEBmaXJzdExldmVsU2VjdGlvbi5nZXRDb250ZXh0dWFsTmF2aWdhdGlvbkNvbnRyb2xsZXIoKVxuXG5cdFx0QGxheWVyLmJhY2tncm91bmRDb2xvciA9IFwiI2ZhZmFmYVwiXG5cdFx0QHRleHRMYXllci54ID0gQ29uc3RhbnRzLmluZGVudGF0aW9uXG5cdFx0QHRleHRMYXllci53aWR0aCA9IEB3aWR0aCAtIENvbnN0YW50cy5pbmRlbnRhdGlvblxuXHRcdEBzZWxlY3RlZEJvcmRlckxheWVyLnZpc2libGUgPSBmYWxzZVxuXHRcdFxuXHRcdEBhZGRTdGF0ZXMoKVxuXHRcdEBhZGRFdmVudHMoKVxuXG5cblx0Z2V0TmFtZTogPT5cblx0XHRyZXR1cm4gQG5hbWVcblxuXHRnZXRUZXh0OiA9PlxuXHRcdHJldHVybiBAdGV4dFxuXG5cdGdldEZpcnN0TGV2ZWxTZWN0aW9uOiA9PlxuXHRcdHJldHVybiBAZmlyc3RMZXZlbFNlY3Rpb25cblxuXHRnZXRDb250ZW50QXJlYXM6ID0+XG5cdFx0cmV0dXJuIEBjb250ZW50QXJlYXNcblxuXHRnZXRDb250ZW50QXJlYUJ5SW5kZXg6IChpbmRleCkgPT5cblx0XHRyZXR1cm4gQGNvbnRlbnRBcmVhc1tpbmRleF1cblxuXHRnZXRDb250ZXh0dWFsTmF2aWdhdGlvbkNvbnRyb2xsZXI6ID0+XG5cdFx0cmV0dXJuIEBjb250ZXh0dWFsTmF2aWdhdGlvbkNvbnRyb2xsZXJcblxuXHRhZGRDb250ZW50QXJlYTogKGNvbnRlbnRBcmVhKSA9PlxuXHRcdEBjb250ZW50QXJlYXMucHVzaChjb250ZW50QXJlYSlcblxuXHRhZGRTdGF0ZXM6ID0+XG5cdFx0QGxheWVyLnN0YXRlcy5ob3ZlciA9XG5cdFx0XHRiYWNrZ3JvdW5kQ29sb3I6IFwiZWNlY2VjXCJcblx0XHRcdGFuaW1hdGlvbk9wdGlvbnM6XG5cdFx0XHRcdHRpbWU6IDAuMVxuXHRcdFxuXHRcdEBsYXllci5zdGF0ZXMuc2VsZWN0ZWQgPVxuXHRcdFx0YmFja2dyb3VuZENvbG9yOiBcIiNmNWY1ZjVcIlx0XG5cblx0XHRAdGV4dExheWVyLnN0YXRlcy5zZWxlY3RlZCA9XG5cdFx0XHRmb250V2VpZ2h0OiA2MDBcblx0XHRcdFx0XG5cdFx0QHNlbGVjdGVkQm9yZGVyTGF5ZXIuc3RhdGVzLnZpc2libGUgPVxuXHRcdFx0dmlzaWJsZTogdHJ1ZVxuXG5cdGFkZEV2ZW50czogPT5cblx0XHRAbGF5ZXIub25DbGljayA9PlxuXHRcdFx0aWYgQGNvbnRlbnRBcmVhcy5sZW5ndGhcblx0XHRcdFx0QGNvbnRleHR1YWxOYXZpZ2F0aW9uQ29udHJvbGxlci5zZWxlY3RGaXJzdExldmVsUm93QnlJbmRleChAZmlyc3RMZXZlbFNlY3Rpb24uZ2V0SW5kZXgoKSlcblx0XHRcdFx0Q29udGVudEFyZWFDb250YWluZXIuZmxvdy5zaG93TmV4dChAY29udGVudEFyZWFzWzBdLmdldFNjcm9sbCgpLCBhbmltYXRlOiBmYWxzZSlcblx0XHRcdFxuXHRcdEBsYXllci5vbk1vdXNlT3ZlciA9PlxuXHRcdFx0QGxheWVyLmFuaW1hdGUoXCJob3ZlclwiKVxuXG5cdFx0XHRAY29udGV4dHVhbE5hdmlnYXRpb25Db250cm9sbGVyLmhpZGVWaXNpYmxlRHJvcGRvd24oKVxuXHRcdFx0QGNvbnRleHR1YWxOYXZpZ2F0aW9uQ29udHJvbGxlci5zaG93RHJvcGRvd25CeUluZGV4KEBmaXJzdExldmVsU2VjdGlvbi5nZXRJbmRleCgpKVxuXHRcdFxuXHRcdEBsYXllci5vbk1vdXNlT3V0ID0+XG5cdFx0XHRAY29udGV4dHVhbE5hdmlnYXRpb25Db250cm9sbGVyLnNldEZpcnN0TGV2ZWxSb3dJblJlc3RpbmdTdGF0ZUJ5SW5kZXgoQGZpcnN0TGV2ZWxTZWN0aW9uLmdldEluZGV4KCkpXG5cblx0c3dpdGNoU3RhdGVIb3ZlcjogPT5cblx0XHRAbGF5ZXIuc3RhdGVTd2l0Y2goXCJob3ZlclwiKVxuXG5cdHN3aXRjaFN0YXRlU2VsZWN0ZWQ6ID0+XG5cdFx0QGxheWVyLnN0YXRlU3dpdGNoKFwic2VsZWN0ZWRcIilcblx0XHRAdGV4dExheWVyLnN0YXRlU3dpdGNoKFwic2VsZWN0ZWRcIilcblx0XHRAc2VsZWN0ZWRCb3JkZXJMYXllci5zdGF0ZVN3aXRjaChcInZpc2libGVcIilcblxuXHRzd2l0Y2hTdGF0ZURlZmF1bHQ6ID0+XG5cdFx0QGxheWVyLnN0YXRlU3dpdGNoKFwiZGVmYXVsdFwiKVxuXHRcdEB0ZXh0TGF5ZXIuc3RhdGVTd2l0Y2goXCJkZWZhdWx0XCIpXG5cdFx0QHNlbGVjdGVkQm9yZGVyTGF5ZXIuc3RhdGVTd2l0Y2goXCJkZWZhdWx0XCIpXG5cbiIsIntDb25zdGFudHN9ID0gcmVxdWlyZSBcIkNvbnN0YW50c1wiXG5cbmNsYXNzIGV4cG9ydHMuQ29udGV4dHVhbE5hdmlnYXRpb25Ecm9wZG93blxuXG5cdGNvbnN0cnVjdG9yOiAoQG5hbWUsIEBmaXJzdExldmVsU2VjdGlvbikgLT5cblx0XHRAZHJvcGRvd25Sb3dzID0gW11cblxuXHRcdEBsYXllciA9IG5ldyBMYXllclxuXHRcdFx0bmFtZTogQG5hbWUgKyBcIl9kcm9wZG93blwiXG5cdFx0XHRwYXJlbnQ6IEBmaXJzdExldmVsU2VjdGlvbi5nZXRMYXllcigpXG5cdFx0XHR4OiBDb25zdGFudHMuc2lkZWJhcldpZHRoICsgMVxuXHRcdFx0d2lkdGg6IENvbnN0YW50cy5kcm9wZG93bldpZHRoXG5cdFx0XHRiYWNrZ3JvdW5kQ29sb3I6IFwidHJhbnNwYXJlbnRcIlxuXHRcdFx0dmlzaWJsZTogZmFsc2Vcblx0XHRcblx0XHRAYWRkU3RhdGVzKClcdFxuXHRcdEBhZGRFdmVudHMoKVxuXG5cdGdldERyb3Bkb3duUm93czogPT5cblx0XHRyZXR1cm4gQGRyb3Bkb3duUm93c1xuXG5cdGdldE5hbWU6ID0+XG5cdFx0cmV0dXJuIEBuYW1lXG5cblx0Z2V0Rmlyc3RMZXZlbFNlY3Rpb246ID0+XG5cdFx0cmV0dXJuIEBmaXJzdExldmVsU2VjdGlvblxuXG5cdGdldExheWVyOiA9PlxuXHRcdHJldHVybiBAbGF5ZXJcblxuXHRhZGRSb3c6IChyb3cpID0+XG5cdFx0QGRyb3Bkb3duUm93cy5wdXNoKHJvdylcblxuXG5cdGFkZFN0YXRlczogPT5cblx0XHRAbGF5ZXIuc3RhdGVzLnZpc2libGUgPVxuXHRcdFx0dmlzaWJsZTogdHJ1ZVxuXG5cdGFkZEV2ZW50czogPT5cblx0XHQjIEBsYXllci5vbk1vdXNlT3V0ID0+XG5cdFx0IyBcdEBzd2l0Y2hTdGF0ZURlZmF1bHQoKVxuXHRcdFx0XG5cdHN3aXRjaFN0YXRlRGVmYXVsdDogPT5cblx0XHRAbGF5ZXIuc3RhdGVTd2l0Y2goXCJkZWZhdWx0XCIpXG5cblx0c3dpdGNoU3RhdGVWaXNpYmxlOiA9PlxuXHRcdEBsYXllci5zdGF0ZVN3aXRjaChcInZpc2libGVcIilcblxuIiwie0NvbnRlbnRBcmVhQ29udGFpbmVyfSA9IHJlcXVpcmUgXCJDb250ZW50QXJlYUNvbnRhaW5lclwiXG57Q29uc3RhbnRzfSA9IHJlcXVpcmUgXCJDb25zdGFudHNcIlxuXG5jbGFzcyBleHBvcnRzLkNvbnRleHR1YWxOYXZpZ2F0aW9uRHJvcGRvd25Sb3dcblx0Y29uc3RydWN0b3I6IChAbmFtZSwgQHRleHQsIEBkcm9wZG93biwgQGluZGV4KSAtPlxuXHRcdEBjb250ZXh0dWFsTmF2aWdhdGlvbkNvbnRyb2xsZXIgPSBAZHJvcGRvd24uZ2V0Rmlyc3RMZXZlbFNlY3Rpb24oKS5nZXRDb250ZXh0dWFsTmF2aWdhdGlvbkNvbnRyb2xsZXIoKVxuXG5cdFx0QGxheWVyID0gbmV3IExheWVyXG5cdFx0XHRuYW1lOiBAbmFtZSArIFwiX2Ryb3Bkb3duX3Jvd1wiXG5cdFx0XHRwYXJlbnQ6IEBkcm9wZG93bi5nZXRMYXllcigpXG5cdFx0XHR5OiBAaW5kZXggKiBDb25zdGFudHMucm93SGVpZ2h0XG5cdFx0XHRoZWlnaHQ6IENvbnN0YW50cy5yb3dIZWlnaHRcblx0XHRcdHdpZHRoOiBDb25zdGFudHMuZHJvcGRvd25XaWR0aFxuXHRcdFx0YmFja2dyb3VuZENvbG9yOiBcIiNmNWY1ZjVcIlxuXHRcdFx0XG5cdFx0QHRleHRMYXllciA9IG5ldyBUZXh0TGF5ZXJcblx0XHRcdG5hbWU6IEBuYW1lICsgXCJfZHJvcGRvd25fdGV4dFwiXG5cdFx0XHRwYXJlbnQ6IEBsYXllclxuXHRcdFx0dGV4dDogQHRleHRcblx0XHRcdGZvbnRTaXplOiBDb25zdGFudHMucm93Rm9udFNpemVcblx0XHRcdHg6IENvbnN0YW50cy5pbmRlbnRhdGlvblxuXHRcdFx0eTogQWxpZ24uY2VudGVyXG5cdFx0XHRjb2xvcjogXCJyZ2JhKDAsMCwwLDAuODUpXCJcblxuXHRcdCMgcm93LnR5cGUgPSAnZHJvcGRvd24nXG5cdFx0IyByb3cuaW5kZXggPSByb3dJbmRleFxuXHRcdCMgcm93LnBhcmVudEluZGV4ID0gcGFyZW50SW5kZXhcblx0XHRcdFxuXHRcdEBhZGRTdGF0ZXMoKVxuXHRcdEBhZGRFdmVudHMoKVxuXG5cdGdldE5hbWU6ID0+XG5cdFx0cmV0dXJuIEBuYW1lXG5cblx0Z2V0VGV4dDogPT5cblx0XHRyZXR1cm4gQHRleHRcblxuXHRnZXREcm9wZG93bjogPT5cblx0XHRyZXR1cm4gQGRyb3Bkb3duXG5cblx0Z2V0SW5kZXg6ID0+XG5cdFx0cmV0dXJuIEBpbmRleFxuXG5cdGdldExheWVyOiA9PlxuXHRcdHJldHVybiBAbGF5ZXJcblxuXHRnZXRUZXh0TGF5ZXI6ID0+XG5cdFx0cmV0dXJuIEB0ZXh0TGF5ZXJcblxuXHRhZGRTdGF0ZXM6ID0+XG5cdFx0QGxheWVyLnN0YXRlcy5ob3ZlciA9IFxuXHRcdFx0YmFja2dyb3VuZENvbG9yOiBcIiNlY2VjZWNcIlxuXHRcdFx0YW5pbWF0aW9uT3B0aW9uczpcblx0XHRcdFx0dGltZTogMC4xXG5cblx0YWRkRXZlbnRzOiA9PlxuXHRcdEBsYXllci5vbk1vdXNlT3ZlciA9PlxuXHRcdFx0QGxheWVyLmFuaW1hdGUoXCJob3ZlclwiKVxuXHRcdFx0XG5cdFx0QGxheWVyLm9uTW91c2VPdXQgPT5cblx0XHRcdEBsYXllci5hbmltYXRlKFwiZGVmYXVsdFwiKVxuXHRcdFx0XG5cdFx0QGxheWVyLm9uQ2xpY2sgPT5cblx0XHRcdHNlY29uZExldmVsUm93ID0gQGRyb3Bkb3duLmdldEZpcnN0TGV2ZWxTZWN0aW9uKCkuZ2V0U2Vjb25kTGV2ZWxTZWN0aW9uKCkuZ2V0U2Vjb25kTGV2ZWxSb3dzKClbQGluZGV4XVxuXG5cdFx0XHRjb250ZW50QXJlYXMgPSBzZWNvbmRMZXZlbFJvdy5nZXRDb250ZW50QXJlYXMoKVxuXHRcdFx0aWYgY29udGVudEFyZWFzLmxlbmd0aFxuXHRcdFx0XHRAY29udGV4dHVhbE5hdmlnYXRpb25Db250cm9sbGVyLnNlbGVjdERyb3Bkb3duUm93QnlJbmRleChAZHJvcGRvd24uZ2V0Rmlyc3RMZXZlbFNlY3Rpb24oKS5nZXRJbmRleCgpLCBAaW5kZXgpXG5cblx0XHRcdFx0Q29udGVudEFyZWFDb250YWluZXIuZmxvdy5zaG93TmV4dChjb250ZW50QXJlYXNbMF0uZ2V0U2Nyb2xsKCksIGFuaW1hdGU6IGZhbHNlKSIsIntDb25zdGFudHN9ID0gcmVxdWlyZSBcIkNvbnN0YW50c1wiXG5cbmNsYXNzIGV4cG9ydHMuQ29udGV4dHVhbE5hdmlnYXRpb25Db250cm9sbGVyXG5cdGNvbnN0cnVjdG9yOiAoQG5hbWUsIEBzaWRlYmFyKSAtPlxuXHRcdEBmaXJzdExldmVsU2VjdGlvbnMgPSBbXVxuXG5cdFx0QHNlbGVjdGVkRmlyc3RMZXZlbFNlY3Rpb25JbmRleCA9IDJcblx0XHRAc2VsZWN0ZWRTZWNvbmRMZXZlbFJvd0luZGV4ID0gMFxuXHRcdEB2aXNpYmxlRHJvcGRvd25JbmRleCA9IG51bGxcblxuXHRcdEBsYXllciA9IG5ldyBMYXllclxuXHRcdFx0bmFtZTogQG5hbWUgKyAnX2NvbnRleHR1YWxfbmF2aWdhdGlvbidcblx0XHRcdHBhcmVudDogQHNpZGViYXIuZ2V0TGF5ZXIoKVxuXHRcdFx0d2lkdGg6IENvbnN0YW50cy5zaWRlYmFyV2lkdGhcblx0XHRcdGhlaWdodDogU2NyZWVuLnNpemUuaGVpZ2h0XG5cdFx0XHRiYWNrZ3JvdW5kQ29sb3I6IFwidHJhbnNwYXJlbnRcIlxuXG5cblx0Z2V0Rmlyc3RMZXZlbFNlY3Rpb25zOiA9PlxuXHRcdHJldHVybiBAZmlyc3RMZXZlbFNlY3Rpb25zXG5cblx0Z2V0U2VsZWN0ZWRGaXJzdExldmVsU2VjdGlvbkluZGV4OiA9PlxuXHRcdHJldHVybiBAc2VsZWN0ZWRGaXJzdExldmVsU2VjdGlvbkluZGV4XG5cblx0Z2V0U2VsZWN0ZWRTZWNvbmRMZXZlbFJvd0luZGV4OiA9PlxuXHRcdHJldHVybiBAc2VsZWN0ZWRTZWNvbmRMZXZlbFJvd0luZGV4XG5cblx0Z2V0VmlzaWJsZURyb3Bkb3duSW5kZXg6ID0+XG5cdFx0cmV0dXJuIEB2aXNpYmxlRHJvcGRvd25JbmRleFxuXG5cdGdldE5hbWU6ID0+XG5cdFx0cmV0dXJuIEBuYW1lXG5cblx0Z2V0U2lkZWJhcjogPT5cblx0XHRyZXR1cm4gQHNpZGViYXJcblxuXHRnZXRMYXllcjogPT5cblx0XHRyZXR1cm4gQGxheWVyXG5cblx0YWRkU2VjdGlvbjogKHNlY3Rpb24pID0+XG5cdFx0QGZpcnN0TGV2ZWxTZWN0aW9ucy5wdXNoKHNlY3Rpb24pXG5cblx0c2VsZWN0Rmlyc3RMZXZlbFJvd0J5SW5kZXg6IChuZXdGaXJzdExldmVsU2VjdGlvbkluZGV4KSA9PlxuXHRcdCMgU3dpdGNoIHByZXZpb3VzIHNlY29uZC1sZXZlbCByb3cgdG8gZGVmYXVsdCBpZiBpdCdzIGluIGEgZGlmZmVyZW50IHNlY3Rpb24gb3IgaWYgaXQncyBkaWZmZXJlbnQgZnJvbSB0aGUgZmlyc3Qgb25lXG5cdFx0aWYgQHNlbGVjdGVkRmlyc3RMZXZlbFNlY3Rpb25JbmRleCAhPSBudWxsXG5cdFx0XHRjdXJyZW50U2Vjb25kTGV2ZWxTZWN0aW9uID0gQGZpcnN0TGV2ZWxTZWN0aW9uc1tAc2VsZWN0ZWRGaXJzdExldmVsU2VjdGlvbkluZGV4XS5nZXRTZWNvbmRMZXZlbFNlY3Rpb24oKVxuXG5cdFx0XHRpZiBjdXJyZW50U2Vjb25kTGV2ZWxTZWN0aW9uLmdldFNlY29uZExldmVsUm93cygpLmxlbmd0aFxuXHRcdFx0XHRpZiBuZXdGaXJzdExldmVsU2VjdGlvbkluZGV4ICE9IEBzZWxlY3RlZEZpcnN0TGV2ZWxTZWN0aW9uSW5kZXhcblx0XHRcdFx0XHRpZiBAc2VsZWN0ZWRTZWNvbmRMZXZlbFJvd0luZGV4ICE9IG51bGxcblx0XHRcdFx0XHRcdGN1cnJlbnRTZWNvbmRMZXZlbFNlY3Rpb24uZ2V0U2Vjb25kTGV2ZWxSb3dzKClbQHNlbGVjdGVkU2Vjb25kTGV2ZWxSb3dJbmRleF0uc3dpdGNoU3RhdGVEZWZhdWx0KClcblx0XHRcdFx0XHRjdXJyZW50U2Vjb25kTGV2ZWxTZWN0aW9uLnN3aXRjaFN0YXRlQ29sbGFwc2VkKClcblx0XHRcdFx0ZWxzZVxuXHRcdFx0XHRcdGlmIEBzZWxlY3RlZFNlY29uZExldmVsUm93SW5kZXhcblx0XHRcdFx0XHRcdGN1cnJlbnRTZWNvbmRMZXZlbFNlY3Rpb24uZ2V0U2Vjb25kTGV2ZWxSb3dzKClbQHNlbGVjdGVkU2Vjb25kTGV2ZWxSb3dJbmRleF0uc3dpdGNoU3RhdGVEZWZhdWx0KClcblxuXHRcdCMgU3dpdGNoIHByZXZpb3VzIGZpcnN0LWxldmVsIHNlY3Rpb24gdG8gZGVmYXVsdCBpZiBpdCdzIGRpZmZlcmVudCBmcm9tIHRoZSBuZXcgb25lXG5cdFx0aWYgQHNlbGVjdGVkRmlyc3RMZXZlbFNlY3Rpb25JbmRleCAhPSBudWxsXG5cdFx0XHRpZiBuZXdGaXJzdExldmVsU2VjdGlvbkluZGV4ICE9IEBzZWxlY3RlZEZpcnN0TGV2ZWxTZWN0aW9uSW5kZXhcblx0XHRcdFx0cHJldmlvdXNseVNlbGVjdGVkU2VjdGlvbiA9IEBmaXJzdExldmVsU2VjdGlvbnNbQHNlbGVjdGVkRmlyc3RMZXZlbFNlY3Rpb25JbmRleF1cblx0XHRcdFx0cHJldmlvdXNseVNlbGVjdGVkU2VjdGlvbi5nZXRGaXJzdExldmVsUm93KCkuc3dpdGNoU3RhdGVEZWZhdWx0KClcblxuXHRcdCMgU3dpdGNoIHRoZSBuZXcgZmlyc3QtbGV2ZWwgc2VsZWN0aW9uIHRvIFNlbGVjdGVkLCBubyBtYXR0ZXIgaWYgaXQncyB0aGUgc2FtZSBvbmUgdGhhdCB3YXMgYWxyZWFkeSBzZWxlY3RlZFxuXHRcdEBzZWxlY3RlZEZpcnN0TGV2ZWxTZWN0aW9uSW5kZXggPSBuZXdGaXJzdExldmVsU2VjdGlvbkluZGV4XG5cdFx0bmV3Rmlyc3RMZXZlbFNlY3Rpb24gPSBAZmlyc3RMZXZlbFNlY3Rpb25zW0BzZWxlY3RlZEZpcnN0TGV2ZWxTZWN0aW9uSW5kZXhdXG5cdFx0bmV3Rmlyc3RMZXZlbFNlY3Rpb24uZ2V0Rmlyc3RMZXZlbFJvdygpLnN3aXRjaFN0YXRlU2VsZWN0ZWQoKVxuXG5cdFx0IyBTd2l0Y2ggdGhlIHNlY29uZC1sZXZlbCBzZWN0aW9uIHRvIFNlbGVjdGVkIHNhdGVcblx0XHRuZXdGaXJzdExldmVsU2VjdGlvbi5nZXRTZWNvbmRMZXZlbFNlY3Rpb24oKS5zd2l0Y2hTdGF0ZURlZmF1bHQoKVxuXG5cdFx0IyBJZiB0aGVyZSBpcyBhIHN1YnNlY3Rpb24sIHN3aXRjaCB0aGUgZmlyc3QgZWxlbWVudCBvblx0XHRcblx0XHRpZiBuZXdGaXJzdExldmVsU2VjdGlvbi5nZXRTZWNvbmRMZXZlbFNlY3Rpb24oKS5nZXRTZWNvbmRMZXZlbFJvd3MoKS5sZW5ndGggPiAwXG5cdFx0XHRAc2VsZWN0ZWRTZWNvbmRMZXZlbFJvd0luZGV4ID0gMFxuXHRcdFx0bmV3Rmlyc3RMZXZlbFNlY3Rpb24uZ2V0U2Vjb25kTGV2ZWxTZWN0aW9uKCkuZ2V0U2Vjb25kTGV2ZWxSb3dzKClbQHNlbGVjdGVkU2Vjb25kTGV2ZWxSb3dJbmRleF0uc3dpdGNoU3RhdGVTZWxlY3RlZCgpXG5cdFx0ZWxzZVxuXHRcdFx0QHNlbGVjdGVkU2Vjb25kTGV2ZWxSb3dJbmRleCA9IG51bGxcblxuXHRcdEByZWNhbGN1bGF0ZUNvbnRleHR1YWxQb3NpdGlvbnMoKVxuXHRcdEBoaWRlVmlzaWJsZURyb3Bkb3duKClcblxuXHRzZXRGaXJzdExldmVsUm93SW5SZXN0aW5nU3RhdGVCeUluZGV4OiAoZmlyc3RMZXZlbFNlY3Rpb25JbmRleCkgPT5cblx0XHRyb3cgPSBAZmlyc3RMZXZlbFNlY3Rpb25zW2ZpcnN0TGV2ZWxTZWN0aW9uSW5kZXhdLmdldEZpcnN0TGV2ZWxSb3coKVxuXHRcdGlmIGZpcnN0TGV2ZWxTZWN0aW9uSW5kZXggPT0gQHNlbGVjdGVkRmlyc3RMZXZlbFNlY3Rpb25JbmRleFxuXHRcdFx0cm93LnN3aXRjaFN0YXRlU2VsZWN0ZWQoKVxuXHRcdGVsc2Vcblx0XHRcdHJvdy5zd2l0Y2hTdGF0ZURlZmF1bHQoKVxuXG5cdHNldFNlbGVjdGVkRmlyc3RMZXZlbFJvd0luRGVmYXVsdFN0YXRlOiAoKSA9PlxuXHRcdHJvdyA9IEBmaXJzdExldmVsU2VjdGlvbnNbQHNlbGVjdGVkRmlyc3RMZXZlbFNlY3Rpb25JbmRleF0uZ2V0Rmlyc3RMZXZlbFJvdygpXG5cdFx0cm93LnN3aXRjaFN0YXRlRGVmYXVsdCgpXG5cblxuXHRzZWxlY3RTZWNvbmRMZXZlbFJvd0J5SW5kZXg6IChzZWNvbmRMZXZlbFJvd0luZGV4KSA9PlxuXHRcdCMgQ2hhbmdlIHRoZSBwcmV2aW91c2x5LXNlbGVjdGVkIHNlY29uZC1sZXZlbCByb3cgaWYgdGhlIG5ldyBvbmUgaXMgZGlmZmVyZW50IGZyb20gdGhlIFxuXHRcdGZpcnN0TGV2ZWxTZWN0aW9uID0gQGZpcnN0TGV2ZWxTZWN0aW9uc1tAc2VsZWN0ZWRGaXJzdExldmVsU2VjdGlvbkluZGV4XVxuXHRcdHJvd3MgPSBmaXJzdExldmVsU2VjdGlvbi5nZXRTZWNvbmRMZXZlbFNlY3Rpb24oKS5nZXRTZWNvbmRMZXZlbFJvd3MoKVxuXHRcdGlmIHJvd3MubGVuZ3RoXG5cdFx0XHRpZiBAc2VsZWN0ZWRTZWNvbmRMZXZlbFJvd0luZGV4ICE9IG51bGxcblx0XHRcdFx0aWYgc2Vjb25kTGV2ZWxSb3dJbmRleCAhPSBAc2VsZWN0ZWRTZWNvbmRMZXZlbFJvd0luZGV4XG5cdFx0XHRcdFx0cm93c1tAc2VsZWN0ZWRTZWNvbmRMZXZlbFJvd0luZGV4XS5zd2l0Y2hTdGF0ZURlZmF1bHQoKVxuXG5cdFx0IyBDaGFuZ2UgdGhlIG5ldyBzZWxlY3RlZCByb3cgdG8gc2VsZWN0ZWQgc3RhdGUsIG5vIG1hdHRlciBpZiBpdCB3YXMgYWxyZWFkeSBzZWxlY3RlZFxuXHRcdGlmIHJvd3Nbc2Vjb25kTGV2ZWxSb3dJbmRleF0gIT0gbnVsbFxuXHRcdFx0QHNlbGVjdGVkU2Vjb25kTGV2ZWxSb3dJbmRleCA9IHNlY29uZExldmVsUm93SW5kZXhcblx0XHRcdHJvd3NbQHNlbGVjdGVkU2Vjb25kTGV2ZWxSb3dJbmRleF0uc3dpdGNoU3RhdGVTZWxlY3RlZCgpXG5cdFx0ZWxzZVxuXHRcdFx0QHNlbGVjdGVkU2Vjb25kTGV2ZWxSb3dJbmRleCA9IG51bGxcblxuXHRzZXRTZWNvbmRMZXZlbFJvd0luUmVzdGluZ1N0YXRlQnlJbmRleDogKHNlY29uZExldmVsUm93SW5kZXgpID0+XG5cdFx0aWYgQHNlbGVjdGVkRmlyc3RMZXZlbFNlY3Rpb25JbmRleCAhPSBudWxsXG5cblx0XHRcdGlmIHJvdyA9IEBmaXJzdExldmVsU2VjdGlvbnNbQHNlbGVjdGVkRmlyc3RMZXZlbFNlY3Rpb25JbmRleF0uZ2V0U2Vjb25kTGV2ZWxTZWN0aW9uKCkuZ2V0U2Vjb25kTGV2ZWxSb3dzKClbc2Vjb25kTGV2ZWxSb3dJbmRleF1cblx0XHRcdFx0aWYgc2Vjb25kTGV2ZWxSb3dJbmRleCA9PSBAc2VsZWN0ZWRTZWNvbmRMZXZlbFJvd0luZGV4XG5cdFx0XHRcdFx0cm93LnN3aXRjaFN0YXRlU2VsZWN0ZWQoKVxuXHRcdFx0XHRlbHNlXG5cdFx0XHRcdFx0cm93LnN3aXRjaFN0YXRlRGVmYXVsdCgpXG5cblxuXHRzZXRTZWxlY3RlZFNlY29uZExldmVsUm93SW5EZWZhdWx0U3RhdGU6ICgpID0+XG5cdFx0aWYgQHNlbGVjdGVkRmlyc3RMZXZlbFNlY3Rpb25JbmRleCAhPSBudWxsXG5cdFx0XHRpZiByb3cgPSBAZmlyc3RMZXZlbFNlY3Rpb25zW0BzZWxlY3RlZEZpcnN0TGV2ZWxTZWN0aW9uSW5kZXhdLmdldFNlY29uZExldmVsU2VjdGlvbigpLmdldFNlY29uZExldmVsUm93cygpW0BzZWxlY3RlZFNlY29uZExldmVsUm93SW5kZXhdXG5cdFx0XHRcdHJvdy5zd2l0Y2hTdGF0ZURlZmF1bHQoKVxuXG5cblx0c2V0U2VsZWN0ZWRSb3dzSW5EZWZhdWx0U3RhdGU6ID0+XG5cdFx0aWYgQHNlbGVjdGVkU2Vjb25kTGV2ZWxSb3dJbmRleCAhPSBudWxsXG5cdFx0XHRAc2V0U2VsZWN0ZWRGaXJzdExldmVsUm93SW5EZWZhdWx0U3RhdGUoKVxuXG5cdFx0aWYgQHNlbGVjdGVkRmlyc3RMZXZlbFNlY3Rpb25JbmRleCAhPSBudWxsXG5cdFx0XHRAc2V0U2VsZWN0ZWRTZWNvbmRMZXZlbFJvd0luRGVmYXVsdFN0YXRlKClcblxuXHRzZWxlY3REcm9wZG93blJvd0J5SW5kZXg6IChuZXdGaXJzdExldmVsU2VjdGlvbkluZGV4LCBuZXdEcm9wZG93blJvd0luZGV4KSA9PlxuXHRcdGlmIEBzZWxlY3RlZEZpcnN0TGV2ZWxTZWN0aW9uSW5kZXggIT0gbnVsbFxuXHRcdFx0IyBEaXNhYmxlIHByZXZpb3VzIHNlY29uZC1sZXZlbCByb3cgKGlmIHRoZXJlIGlzIG9uZSlcblx0XHRcdGN1cnJlbnRTZWNvbmRMZXZlbFNlY3Rpb24gPSBAZmlyc3RMZXZlbFNlY3Rpb25zW0BzZWxlY3RlZEZpcnN0TGV2ZWxTZWN0aW9uSW5kZXhdLmdldFNlY29uZExldmVsU2VjdGlvbigpXG5cdFx0XHRcblx0XHRcdGlmIGN1cnJlbnRTZWNvbmRMZXZlbFNlY3Rpb24uZ2V0U2Vjb25kTGV2ZWxSb3dzKCkubGVuZ3RoXG5cdFx0XHRcdGlmIEBzZWxlY3RlZFNlY29uZExldmVsUm93SW5kZXggIT0gbnVsbFxuXHRcdFx0XHRcdGN1cnJlbnRTZWNvbmRMZXZlbFNlY3Rpb24uZ2V0U2Vjb25kTGV2ZWxSb3dzKClbQHNlbGVjdGVkU2Vjb25kTGV2ZWxSb3dJbmRleF0uc3dpdGNoU3RhdGVEZWZhdWx0KClcblx0XHRcdFx0XG5cdFx0XHQjIERpc2FibGUgcHJldmlvdXMgc2Vjb25kLWxldmVsIHNlY3Rpb25cblx0XHRcdGN1cnJlbnRTZWNvbmRMZXZlbFNlY3Rpb24uc3dpdGNoU3RhdGVDb2xsYXBzZWQoKVxuXG5cdFx0XHQjIERpc2FibGUgcHJldmlvdXMgZmlyc3QtbGV2ZWwgcm93XG5cdFx0XHRAZmlyc3RMZXZlbFNlY3Rpb25zW0BzZWxlY3RlZEZpcnN0TGV2ZWxTZWN0aW9uSW5kZXhdLmdldEZpcnN0TGV2ZWxSb3coKS5zd2l0Y2hTdGF0ZURlZmF1bHQoKVxuXG5cdFx0IyBFbmFibGUgbmV3IGZpcnN0LWxldmVsIHJvd1xuXHRcdEBzZWxlY3RlZEZpcnN0TGV2ZWxTZWN0aW9uSW5kZXggPSBuZXdGaXJzdExldmVsU2VjdGlvbkluZGV4XG5cdFx0bmV3Rmlyc3RMZXZlbFNlY3Rpb24gPSBAZmlyc3RMZXZlbFNlY3Rpb25zW0BzZWxlY3RlZEZpcnN0TGV2ZWxTZWN0aW9uSW5kZXhdXG5cdFx0bmV3Rmlyc3RMZXZlbFNlY3Rpb24uZ2V0Rmlyc3RMZXZlbFJvdygpLnN3aXRjaFN0YXRlU2VsZWN0ZWQoKVxuXG5cdFx0IyBFbmFibGUgbmV3IHNlY29uZC1sZXZlbCBzZWN0aW9uXG5cdFx0bmV3U2Vjb25kTGV2ZWxTZWN0aW9uID0gbmV3Rmlyc3RMZXZlbFNlY3Rpb24uc2Vjb25kTGV2ZWxTZWN0aW9uXG5cdFx0bmV3U2Vjb25kTGV2ZWxTZWN0aW9uLnN3aXRjaFN0YXRlRGVmYXVsdCgpXG5cblx0XHQjIEVuYWJsZSBuZXcgc2Vjb25kLWxldmVsIHJvd1xuXHRcdEBzZWxlY3RlZFNlY29uZExldmVsUm93SW5kZXggPSBuZXdEcm9wZG93blJvd0luZGV4XG5cdFx0bmV3U2Vjb25kTGV2ZWxTZWN0aW9uLmdldFNlY29uZExldmVsUm93cygpW0BzZWxlY3RlZFNlY29uZExldmVsUm93SW5kZXhdLnN3aXRjaFN0YXRlU2VsZWN0ZWQoKVxuXG5cdFx0IyBDbGVhciBhY3RpdmUgZHJvcGRvd25cblx0XHRAaGlkZVZpc2libGVEcm9wZG93bigpXG5cblx0XHRAcmVjYWxjdWxhdGVDb250ZXh0dWFsUG9zaXRpb25zKClcblxuXHRzaG93RHJvcGRvd25CeUluZGV4OiAobmV3VmlzaWJsZURyb3Bkb3duSW5kZXgpID0+XG5cdFx0aWYgbmV3VmlzaWJsZURyb3Bkb3duSW5kZXggIT0gQHNlbGVjdGVkRmlyc3RMZXZlbFNlY3Rpb25JbmRleFxuXHRcdFx0QHZpc2libGVEcm9wZG93bkluZGV4ID0gbmV3VmlzaWJsZURyb3Bkb3duSW5kZXhcblx0XHRcdGZpcnN0TGV2ZWxTZWN0aW9uID0gQGZpcnN0TGV2ZWxTZWN0aW9uc1tAdmlzaWJsZURyb3Bkb3duSW5kZXhdXG5cblx0XHRcdGRyb3Bkb3duID0gZmlyc3RMZXZlbFNlY3Rpb24uZ2V0RHJvcGRvd24oKVxuXHRcdFx0ZHJvcGRvd24uc3dpdGNoU3RhdGVWaXNpYmxlKClcblxuXHRoaWRlVmlzaWJsZURyb3Bkb3duOiAoKSA9PlxuXHRcdGlmIEB2aXNpYmxlRHJvcGRvd25JbmRleCAhPSBudWxsXG5cdFx0XHRAZmlyc3RMZXZlbFNlY3Rpb25zW0B2aXNpYmxlRHJvcGRvd25JbmRleF0uZ2V0RHJvcGRvd24oKS5zd2l0Y2hTdGF0ZURlZmF1bHQoKVxuXHRcdFx0QHZpc2libGVEcm9wZG93bkluZGV4ID0gbnVsbFxuXG5cdHJlY2FsY3VsYXRlQ29udGV4dHVhbFBvc2l0aW9uczogKCkgPT5cblx0XHRsYXN0WSA9IDBcblxuXHRcdGZvciBzZWN0aW9uIGluIEBmaXJzdExldmVsU2VjdGlvbnNcblx0XHRcdHNlY3Rpb25MYXllciA9IHNlY3Rpb24uZ2V0TGF5ZXIoKVx0XHRcblx0XHRcdHNlY3Rpb25MYXllci5hbmltYXRlXG5cdFx0XHRcdHByb3BlcnRpZXM6XG5cdFx0XHRcdFx0eTogbGFzdFlcblx0XHRcdFx0dGltZTogMC4zXG5cdFx0XHRcdGN1cnZlOiBCZXppZXIuZWFzZUluT3V0XG5cdFx0XHRcdFxuXHRcdFx0bGFzdFkgKz0gQ29uc3RhbnRzLnJvd0hlaWdodFxuXG5cdFx0XHRmaXJzdExldmVsUm93ID0gc2VjdGlvbi5nZXRGaXJzdExldmVsUm93KClcblx0XHRcdHNlY29uZExldmVsU2VjdGlvbiA9IHNlY3Rpb24uZ2V0U2Vjb25kTGV2ZWxTZWN0aW9uKClcblx0XHRcdFxuXHRcdFx0aWYgQHNlbGVjdGVkRmlyc3RMZXZlbFNlY3Rpb25JbmRleCA9PSBzZWN0aW9uLmdldEluZGV4KClcblx0XHRcdFx0c2Vjb25kTGV2ZWxTZWN0aW9uLmFuaW1hdGVTdGF0ZURlZmF1bHQoKVxuXHRcdFx0XHRcblx0XHRcdFx0c2Vjb25kTGV2ZWxSb3dzID0gc2Vjb25kTGV2ZWxTZWN0aW9uLmdldFNlY29uZExldmVsUm93cygpXG5cdFx0XHRcdGxhc3RZICs9IHNlY29uZExldmVsUm93cy5sZW5ndGggKiBDb25zdGFudHMucm93SGVpZ2h0XG5cdFx0XHRlbHNlXG5cdFx0XHRcdHNlY29uZExldmVsU2VjdGlvbi5hbmltYXRlU3RhdGVDb2xsYXBzZWQoKVxuXHRcdFx0XHRcdFx0XG5cdFx0QGxheWVyLmhlaWdodCA9IGxhc3RZXHRcdFxuXG5cdFx0cmV0dXJuIGxhc3RZIiwie0NvbnRlbnRBcmVhQ29udGFpbmVyfSA9IHJlcXVpcmUgXCJDb250ZW50QXJlYUNvbnRhaW5lclwiXG5cbmNsYXNzIGV4cG9ydHMuQ29udGVudEFyZWFcblx0Y29uc3RydWN0b3I6IChAbmFtZSwgQGltYWdlUGF0aCwgQGhlaWdodCkgLT5cdFxuXHRcdEBob3RzcG90cyA9IFtdXG5cblx0XHRAc2Nyb2xsID0gbmV3IFNjcm9sbENvbXBvbmVudFxuXHRcdFx0bmFtZTogQG5hbWUgKyAnX3Njcm9sbCdcblx0XHRcdHBhcmVudDogQ29udGVudEFyZWFDb250YWluZXIubGF5ZXJcblx0XHRcdHdpZHRoOiBDb250ZW50QXJlYUNvbnRhaW5lci5sYXllci53aWR0aFxuXHRcdFx0aGVpZ2h0OiBDb250ZW50QXJlYUNvbnRhaW5lci5sYXllci5oZWlnaHRcblx0XHRcdG1vdXNlV2hlZWxFbmFibGVkOiB0cnVlXG5cdFx0XHRzY3JvbGxIb3Jpem9udGFsOiBmYWxzZVxuXHRcdFx0dmlzaWJsZTogZmFsc2Vcblx0XHRcblx0XHRAc2Nyb2xsLmNvbnRlbnQuZHJhZ2dhYmxlID0gZmFsc2Vcblx0XHRAY29udGVudCA9IG5ldyBMYXllclxuXHRcdFx0bmFtZTogQG5hbWUgKyBcIl9jb250ZW50XCJcblx0XHRcdHBhcmVudDogQHNjcm9sbC5jb250ZW50XG5cdFx0XHRpbWFnZTogQGltYWdlUGF0aFxuXHRcdFx0d2lkdGg6IENvbnRlbnRBcmVhQ29udGFpbmVyLmxheWVyLndpZHRoXG5cdFx0XHRoZWlnaHQ6IEBoZWlnaHRcblxuXHRnZXRIb3RzcG90czogPT5cblx0XHRyZXR1cm4gQGhvdHN0cG90c1xuXG5cdGdldE5hbWU6ID0+XG5cdFx0cmV0dXJuIEBuYW1lXG5cblx0Z2V0SW1hZ2VQYXRoOiA9PlxuXHRcdHJldHVybiBAaW1hZ2VQYXRoXG5cblx0Z2V0SGVpZ2h0OiA9PlxuXHRcdHJldHVybiBAaGVpZ2h0XG5cblx0Z2V0U2Nyb2xsOiA9PlxuXHRcdHJldHVybiBAc2Nyb2xsXG5cblx0Z2V0Q29udGVudDogPT5cblx0XHRyZXR1cm4gQGNvbnRlbnRcblxuXHRhZGRIb3RzcG90OiAoaG90c3BvdCkgPT5cblx0XHRAaG90c3BvdHMucHVzaChob3RzcG90KVxuIiwie0NvbnN0YW50c30gPSByZXF1aXJlIFwiQ29uc3RhbnRzXCJcblxuY2xhc3MgZXhwb3J0cy5Db250ZW50QXJlYUNvbnRhaW5lclxuXHRAbGF5ZXI6IG51bGxcblx0QGZsb3c6IG51bGxcblxuXHRAc2V0VXBDb250ZW50QXJlYUNvbnRhaW5lcjogKHRvcEJhckhlaWdodCkgLT4gXG5cdFx0Q29udGVudEFyZWFDb250YWluZXIubGF5ZXIgPSBuZXcgTGF5ZXJcblx0XHRcdG5hbWU6ICdjb250ZW50X2FyZWFfY29udGFpbmVyJ1xuXHRcdFx0eDogQ29uc3RhbnRzLnNpZGViYXJXaWR0aCArIDFcblx0XHRcdHk6IHRvcEJhckhlaWdodFxuXHRcdFx0d2lkdGg6IFNjcmVlbi5zaXplLndpZHRoIC0gQ29uc3RhbnRzLnNpZGViYXJXaWR0aCAtIDFcblx0XHRcdGhlaWdodDogU2NyZWVuLnNpemUuaGVpZ2h0IC0gdG9wQmFySGVpZ2h0XG5cdFx0XHRiYWNrZ3JvdW5kQ29sb3I6IFwidHJhbnNwYXJlbnRcIlxuXG5cdFx0Q29udGVudEFyZWFDb250YWluZXIuZmxvdyA9IG5ldyBGbG93Q29tcG9uZW50XG5cdFx0XHRuYW1lOiAnZmxvd19jb21wb25lbnQnXG5cdFx0XHRwYXJlbnQ6IENvbnRlbnRBcmVhQ29udGFpbmVyLmxheWVyIiwiY2xhc3MgZXhwb3J0cy5Db25zdGFudHNcblx0QHNpZGViYXJXaWR0aDogMjQwXG5cdEByb3dIZWlnaHQ6IDM1XG5cdEBzZWxlY3RlZEJvcmRlcldpZHRoOiAzXG5cdEByb3dGb250U2l6ZTogMTRcblx0QGluZGVudGF0aW9uOiAxNlxuXHRAYnJlYWRjcnVtYnNJdGVtc1BhZGRpbmc6IDE3XG5cdEBicmVhZGNydW1ic1RpdGxlUGFkZGluZzogM1xuXHRAYnJlYWRjcnVtYnNJbWFnZVdpZHRoOiAxOVxuXHRAZHJvcGRvd25XaWR0aDogMTcwXG5cbiIsIntDb25zdGFudHN9ID0gcmVxdWlyZSBcIkNvbnN0YW50c1wiXG5cbmNsYXNzIGV4cG9ydHMuQnJlYWRjcnVtYk5hdmlnYXRpb25TZWN0aW9uXG5cblx0Y29uc3RydWN0b3I6IChAbmFtZSwgQHRleHQsIEBicmVhZGNydW1iTmF2aWdhdGlvbkNvbnRyb2xsZXIsIEBpbmRleCkgLT5cblx0XHRAYnJlYWRjcnVtYk5hdmlnYXRpb25Db250ZW50ID0gbnVsbCAjIG9mIEJyZWFkY3J1bWJOYXZpZ2F0aW9uU2VjdGlvbkNvbnRlbnRcblxuXHRcdEBsYXllciA9IG5ldyBMYXllclxuXHRcdFx0bmFtZTogQG5hbWUgKyBcIl9icmVhZGNydW1iX3NlY3Rpb25cIlxuXHRcdFx0cGFyZW50OiBAYnJlYWRjcnVtYk5hdmlnYXRpb25Db250cm9sbGVyLmdldExheWVyKClcblx0XHRcdHdpZHRoOiBDb25zdGFudHMuc2lkZWJhcldpZHRoXG5cdFx0XHRiYWNrZ3JvdW5kQ29sb3I6IFwidHJhbnNwYXJlbnRcIlxuXHRcdFxuXHRcdEB0aXRsZUxheWVyID0gbmV3IFRleHRMYXllclxuXHRcdFx0bmFtZTogQG5hbWUgKyBcIl9icmVhZGNydW1iX3RleHRcIlxuXHRcdFx0dGV4dDogQHRleHRcblx0XHRcdHBhcmVudDogQGxheWVyXG5cdFx0XHRmb250U2l6ZTogMTBcblx0XHRcdGNvbG9yOiBcInJnYmEoMCwwLDAsMC41NSlcIlxuXHRcdFx0eTogQ29uc3RhbnRzLmJyZWFkY3J1bWJzVGl0bGVQYWRkaW5nXG5cdFx0XHR4OiBDb25zdGFudHMuaW5kZW50YXRpb25cblxuXG5cdGdldEJyZWFkY3J1bWJOYXZpZ2F0aW9uQ29udGVudDogPT4gIyBvZiBCcmVhZGNydW1iTmF2aWdhdGlvblNlY3Rpb25Db250ZW50XG5cdFx0cmV0dXJuIEBicmVhZGNydW1iTmF2aWdhdGlvbkNvbnRlbnRcblxuXHRnZXROYW1lOiA9PiAjb2YgU3RyaW5nXG5cdFx0cmV0dXJuIEBuYW1lXG5cblx0Z2V0VGV4dDogPT4gI29mIFN0cmluZ1xuXHRcdHJldHVybiBAdGV4dFxuXG5cdGdldEJyZWFkY3J1bWJOYXZpZ2F0aW9uQ29udHJvbGxlcjogPT4gIyBvZiBCcmVhZGNydW1iTmF2aWdhdGlvbkNvbnRyb2xsZXJcblx0XHRyZXR1cm4gQGJyZWFkY3J1bWJOYXZpZ2F0aW9uQ29udHJvbGxlclxuXG5cdGdldEluZGV4OiA9PiAjIG9mIEludFxuXHRcdHJldHVybiBAaW5kZXhcblxuXHRnZXRMYXllcjogPT4gIyBvZiBMYXllclxuXHRcdHJldHVybiBAbGF5ZXJcblxuXHRnZXRUaXRsZUxheWVyOiA9PiAjIG9mIFRleHRMYXllclxuXHRcdHJldHVybiBAdGl0bGVMYXllclxuXG5cdHNldENvbnRlbnQ6IChjb250ZW50KSA9PiBcblx0XHRAYnJlYWRjcnVtYk5hdmlnYXRpb25Db250ZW50ID0gY29udGVudCIsIntDb25zdGFudHN9ID0gcmVxdWlyZSBcIkNvbnN0YW50c1wiXG5cbmNsYXNzIGV4cG9ydHMuQnJlYWRjcnVtYk5hdmlnYXRpb25TZWN0aW9uQ29udGVudFxuXHRjb25zdHJ1Y3RvcjogKEBuYW1lLCBAYnJlYWRjcnVtYk5hdmlnYXRpb25TZWN0aW9uLCBudW1iZXJPZlJvd3NJblNlY3Rpb24pIC0+XG5cdFx0QGJyZWFkY3J1bWJOYXZpZ2F0aW9uUm93cyA9IFtdXG5cblx0XHRAbGF5ZXIgPSBuZXcgTGF5ZXJcblx0XHRcdG5hbWU6IEBuYW1lICsgXCJfc2VjdGlvbl9jb250ZW50XCJcblx0XHRcdHBhcmVudDogQGJyZWFkY3J1bWJOYXZpZ2F0aW9uU2VjdGlvbi5nZXRMYXllcigpXG5cdFx0XHRoZWlnaHQ6IENvbnN0YW50cy5yb3dIZWlnaHQgKiBudW1iZXJPZlJvd3NJblNlY3Rpb25cblx0XHRcdHdpZHRoOiBDb25zdGFudHMuc2lkZWJhcldpZHRoXG5cdFx0XHR5OiBDb25zdGFudHMuYnJlYWRjcnVtYnNJdGVtc1BhZGRpbmdcblx0XHRcdGJhY2tncm91bmRDb2xvcjogXCJ0cmFuc3BhcmVudFwiXG5cblx0XHRAbGluZSA9IG5ldyBMYXllclxuXHRcdFx0bmFtZTogQG5hbWUgKyBcIl9oaWVyYXJjaHlfbGluZVwiXG5cdFx0XHRwYXJlbnQ6IEBsYXllclxuXHRcdFx0d2lkdGg6IDFcblx0XHRcdGhlaWdodDogQ29uc3RhbnRzLnJvd0hlaWdodCAqIG51bWJlck9mUm93c0luU2VjdGlvbiAtIDRcblx0XHRcdHg6IENvbnN0YW50cy5pbmRlbnRhdGlvbiArIDlcblx0XHRcdHk6IDJcblx0XHRcdGJhY2tncm91bmRDb2xvcjogXCIjZGNkY2RjXCJcblxuXHRcdEBsaW5lLnNlbmRUb0JhY2soKVxuXG5cdGdldEJyZWFkY3J1bWJOYXZpZ2F0aW9uUm93czogPT5cblx0XHRyZXR1cm4gQGJyZWFkY3J1bWJOYXZpZ2F0aW9uUm93c1xuXG5cdGdldE5hbWU6ID0+XG5cdFx0cmV0dXJuIEBuYW1lXG5cblx0Z2V0QnJlYWRjcnVtYk5hdmlnYXRpb25TZWN0aW9uOiA9PlxuXHRcdHJldHVybiBAYnJlYWRjcnVtYk5hdmlnYXRpb25TZWN0aW9uXG5cblx0Z2V0TGF5ZXI6ID0+XG5cdFx0cmV0dXJuIEBsYXllclxuXG5cdGdldExpbmU6ID0+XG5cdFx0cmV0dXJuIEBsaW5lXG5cblx0YWRkUm93OiAocm93KSA9PlxuXHRcdEBicmVhZGNydW1iTmF2aWdhdGlvblJvd3MucHVzaChyb3cpIiwiIyB7Q29udGVudEFyZWFDb250YWluZXJ9ID0gcmVxdWlyZSBcIkNvbnRlbnRBcmVhQ29udGFpbmVyXCJcbntDb25zdGFudHN9ID0gcmVxdWlyZSBcIkNvbnN0YW50c1wiXG5cbmNsYXNzIGV4cG9ydHMuQnJlYWRjcnVtYk5hdmlnYXRpb25Sb3dcblx0Y29uc3RydWN0b3I6IChAbmFtZSwgQHRleHQsIEBpbWFnZVBhdGgsIEBicmVhZGNydW1iU2VjdGlvbkNvbnRlbnQsIEBlbnZpcm9ubWVudExpbmssIEBpbmRleCkgLT5cblx0XHRAbGF5ZXIgPSBuZXcgTGF5ZXJcblx0XHRcdG5hbWU6IEBuYW1lICsgJ19icmVhZGNydW1iX3Jvdydcblx0XHRcdHBhcmVudDogQGJyZWFkY3J1bWJTZWN0aW9uQ29udGVudC5nZXRMYXllcigpXG5cdFx0XHRoZWlnaHQ6IENvbnN0YW50cy5yb3dIZWlnaHRcblx0XHRcdHdpZHRoOiBDb25zdGFudHMuc2lkZWJhcldpZHRoXG5cdFx0XHR5OiBAaW5kZXggKiBDb25zdGFudHMucm93SGVpZ2h0XG5cdFx0XHQjIGluZGV4OiBpbmRleFxuXHRcdFx0IyBwYXJlbnRJbmRleDogcGFyZW50SW5kZXhcblx0XHRcdGJhY2tncm91bmRDb2xvcjogXCJ0cmFuc3BhcmVudFwiXG5cdFx0XHRcblx0XHRAaW1hZ2VMYXllciA9IG5ldyBMYXllclxuXHRcdFx0bmFtZTogQG5hbWUgKyAnX2JyZWFjcnVtYl9pbWFnZSdcblx0XHRcdHBhcmVudDogQGxheWVyXG5cdFx0XHRpbWFnZTogQGltYWdlUGF0aFxuXHRcdFx0d2lkdGg6IENvbnN0YW50cy5icmVhZGNydW1ic0ltYWdlV2lkdGhcblx0XHRcdGhlaWdodDogQ29uc3RhbnRzLmJyZWFkY3J1bWJzSW1hZ2VXaWR0aFxuXHRcdFx0eDogQ29uc3RhbnRzLmluZGVudGF0aW9uXG5cdFx0XHR5OiBBbGlnbi5jZW50ZXJcblxuXHRcdEB0ZXh0TGF5ZXIgPSBuZXcgVGV4dExheWVyXG5cdFx0XHRuYW1lOiBAbmFtZSArICdfYnJlYWNydW1iX3RleHQnXG5cdFx0XHRwYXJlbnQ6IEBsYXllclxuXHRcdFx0dGV4dDogQHRleHRcblx0XHRcdHk6IEFsaWduLmNlbnRlclxuXHRcdFx0eDogNDBcblx0XHRcdGZvbnRTaXplOiBDb25zdGFudHMucm93Rm9udFNpemVcblx0XHRcdGZvbnRXZWlnaHQ6IDQwMFxuXHRcdFx0Zm9udEZhbWlseTogXCJTRiBVSSBUZXh0LCBIZWx2ZXRpY2EgTmV1ZSwgSGVsdmV0aWNhLCBBcmlhbCwgc2Fucy1zZXJpZlwiXG5cdFx0XHRjb2xvcjogXCIjcmdiYSgwLDAsMCwwLjg1KVwiXG5cblx0XHRAbGF5ZXIuYnJpbmdUb0Zyb250KClcblx0XHRcdFxuXHRcdEBhZGRTdGF0ZXMoKVxuXHRcdEBhZGRFdmVudHMoKVxuXG5cdGdldE5hbWU6ID0+XG5cdFx0cmV0dXJuIEBuYW1lXG5cblx0Z2V0VGV4dDogPT5cblx0XHRyZXR1cm4gQHRleHRcblxuXHRnZXRJbWFnZVBhdGg6ID0+XG5cdFx0cmV0dXJuIEBpbWFnZVBhdGhcblxuXHRnZXRCcmVhZGNydW1iU2VjdGlvbkNvbnRlbnQ6ID0+XG5cdFx0cmV0dXJuIEBicmVhZGNydW1iU2VjdGlvbkNvbnRlbnRcblxuXHRnZXRFbnZpcm9ubWVudExpbms6ID0+XG5cdFx0cmV0dXJuIEBlbnZpcm9ubWVudExpbmtcblxuXHRnZXRJbmRleDogPT5cblx0XHRyZXR1cm4gQGluZGV4XG5cblx0Z2V0TGF5ZXI6ID0+XG5cdFx0cmV0dXJuIEBsYXllclxuXG5cdGdldEltYWdlTGF5ZXI6ID0+XG5cdFx0cmV0dXJuIEBpbWFnZUxheWVyXG5cblx0Z2V0VGV4dExheWVyOiA9PlxuXHRcdHJldHVybiBAdGV4dExheWVyXG5cblx0YWRkU3RhdGVzOiA9PlxuXHRcdEBsYXllci5zdGF0ZXMuaG92ZXIgPVxuXHRcdFx0YmFja2dyb3VuZENvbG9yOiBcIiNyZ2JhKDAsMCwwLDAuMDUpXCJcblx0XHRcdGFuaW1hdGlvbk9wdGlvbnM6XG5cdFx0XHRcdHRpbWU6IDAuMVxuXG5cdFx0QHRleHRMYXllci5zdGF0ZXMuc2VsZWN0ZWQgPVxuXHRcdFx0Zm9udFdlaWdodDogNjAwXG5cblxuXHRhZGRFdmVudHM6ID0+XG5cdFx0QGxheWVyLm9uQ2xpY2sgPT5cblx0XHRcdGVudmlyb25tZW50Q29udHJvbGxlciA9IEBicmVhZGNydW1iU2VjdGlvbkNvbnRlbnQuZ2V0QnJlYWRjcnVtYk5hdmlnYXRpb25TZWN0aW9uKCkuZ2V0QnJlYWRjcnVtYk5hdmlnYXRpb25Db250cm9sbGVyKCkuZ2V0U2lkZWJhcigpLmdldEVudmlyb25tZW50KCkuZ2V0RW52aXJvbm1lbnRDb250cm9sbGVyKClcblx0XHRcdGVudmlyb25tZW50Q29udHJvbGxlci5zd2l0Y2hUb0Vudmlyb25tZW50KEBlbnZpcm9ubWVudExpbmssIDAsIDAsIDApXG5cblx0XHRAbGF5ZXIub25Nb3VzZU92ZXIgPT5cblx0XHRcdEBsYXllci5hbmltYXRlKFwiaG92ZXJcIilcblx0XHRcdEBicmVhZGNydW1iU2VjdGlvbkNvbnRlbnQuZ2V0QnJlYWRjcnVtYk5hdmlnYXRpb25TZWN0aW9uKCkuZ2V0QnJlYWRjcnVtYk5hdmlnYXRpb25Db250cm9sbGVyKCkuZ2V0U2lkZWJhcigpLmdldENvbnRleHR1YWxOYXZpZ2F0aW9uQ29udHJvbGxlcigpLmhpZGVWaXNpYmxlRHJvcGRvd24oKVxuXHRcdFxuXHRcdEBsYXllci5vbk1vdXNlT3V0ID0+XG5cdFx0XHRAbGF5ZXIuYW5pbWF0ZShcImRlZmF1bHRcIilcblx0XHRcdFx0XG5cdHN3aXRjaFN0YXRlU2VsZWN0ZWQ6ID0+XG5cdFx0QHRleHRMYXllci5zdGF0ZVN3aXRjaChcInNlbGVjdGVkXCIpXG4iLCJ7Q29uc3RhbnRzfSA9IHJlcXVpcmUgXCJDb25zdGFudHNcIlxuXG5jbGFzcyBleHBvcnRzLkJyZWFkY3J1bWJOYXZpZ2F0aW9uQ29udHJvbGxlclxuXHRjb25zdHJ1Y3RvcjogKEBuYW1lLCBAc2lkZWJhcikgLT5cblx0XHRAYnJlYWRjcnVtYk5hdmlnYXRpb25TZWN0aW9ucyA9IFtdXG5cblx0XHRAbGF5ZXIgPSBuZXcgTGF5ZXJcblx0XHRcdG5hbWU6IEBuYW1lICsgJ2JyZWFkY3J1bWJfY29tcG9uZW50J1xuXHRcdFx0cGFyZW50OiBAc2lkZWJhci5nZXRMYXllcigpXG5cdFx0XHR3aWR0aDogQ29uc3RhbnRzLnNpZGViYXJXaWR0aFxuXHRcdFx0YmFja2dyb3VuZENvbG9yOiBcInRyYW5zcGFyZW50XCJcblx0XHRcdHk6IDdcblxuXHRnZXROYW1lOiA9PlxuXHRcdHJldHVybiBAbmFtZVxuXG5cdGdldFNpZGViYXI6ID0+XG5cdFx0cmV0dXJuIEBzaWRlYmFyXG5cblx0Z2V0TGF5ZXI6ID0+XG5cdFx0cmV0dXJuIEBsYXllclxuXG5cdGdldEJyZWFkY3J1bWJOYXZpZ2F0aW9uU2VjdGlvbnM6ID0+XG5cdFx0cmV0dXJuIEBicmVhZGNydW1iTmF2aWdhdGlvblNlY3Rpb25zXG5cblx0YWRkU2VjdGlvbjogKHNlY3Rpb24pID0+XG5cdFx0QGJyZWFkY3J1bWJOYXZpZ2F0aW9uU2VjdGlvbnMucHVzaChzZWN0aW9uKVxuXG5cdGhpZ2hsaWdodExhc3RFbGVtZW50OiA9PlxuXHRcdGlmIEBicmVhZGNydW1iTmF2aWdhdGlvblNlY3Rpb25zLmxlbmd0aFxuXHRcdFx0bGFzdFNlY3Rpb24gPSBAYnJlYWRjcnVtYk5hdmlnYXRpb25TZWN0aW9uc1tAYnJlYWRjcnVtYk5hdmlnYXRpb25TZWN0aW9ucy5sZW5ndGggLSAxXVxuXHRcdFx0bGFzdFNlY3Rpb25Sb3dzID0gbGFzdFNlY3Rpb24uZ2V0QnJlYWRjcnVtYk5hdmlnYXRpb25Db250ZW50KCkuZ2V0QnJlYWRjcnVtYk5hdmlnYXRpb25Sb3dzKClcblx0XHRcdFxuXHRcdFx0aWYgbGFzdFNlY3Rpb25Sb3dzLmxlbmd0aFxuXHRcdFx0XHRsYXN0Um93ID0gbGFzdFNlY3Rpb25Sb3dzW2xhc3RTZWN0aW9uUm93cy5sZW5ndGggLSAxXVxuXHRcdFx0XHRsYXN0Um93LnN3aXRjaFN0YXRlU2VsZWN0ZWQoKVxuXG5cdGFkanVzdEhpZXJhcmNoeUxpbmVIZWlnaHRzOiA9PlxuXHRcdGlmIEBicmVhZGNydW1iTmF2aWdhdGlvblNlY3Rpb25zLmxlbmd0aCA9PSAxXG5cdFx0XHRzZWN0aW9uID0gQGJyZWFkY3J1bWJOYXZpZ2F0aW9uU2VjdGlvbnNbMF1cblxuXHRcdFx0aWYgc2VjdGlvbkNvbnRlbnQgPSBzZWN0aW9uLmdldEJyZWFkY3J1bWJOYXZpZ2F0aW9uQ29udGVudCgpXG5cdFx0XHRcdHJvd3MgPSBzZWN0aW9uQ29udGVudC5nZXRCcmVhZGNydW1iTmF2aWdhdGlvblJvd3MoKVxuXHRcdFx0XHRpZiByb3dzLmxlbmd0aCA9PSAxXG5cdFx0XHRcdFx0c2VjdGlvbkNvbnRlbnQuZ2V0TGluZSgpLnZpc2libGUgPSBmYWxzZVxuXG5cdFx0XHRcdGVsc2UgXG5cdFx0XHRcdFx0c2VjdGlvbkNvbnRlbnQuZ2V0TGluZSgpLmhlaWdodCA9IENvbnN0YW50cy5yb3dIZWlnaHQgKiByb3dzLmxlbmd0aCAtIENvbnN0YW50cy5icmVhZGNydW1ic0ltYWdlV2lkdGhcblx0XHRcdFx0XHRzZWN0aW9uQ29udGVudC5nZXRMaW5lKCkueSA9IChDb25zdGFudHMucm93SGVpZ2h0IC0gQ29uc3RhbnRzLmJyZWFkY3J1bWJzSW1hZ2VXaWR0aCkgLyAyXG5cblx0XHRlbHNlXG5cdFx0XHRmaXJzdFNlY3Rpb24gPSBAYnJlYWRjcnVtYk5hdmlnYXRpb25TZWN0aW9uc1swXVxuXHRcdFx0bGFzdFNlY3Rpb24gPSBAYnJlYWRjcnVtYk5hdmlnYXRpb25TZWN0aW9uc1tAYnJlYWRjcnVtYk5hdmlnYXRpb25TZWN0aW9ucy5sZW5ndGggLSAxXVxuXG5cdFx0XHRmaXJzdFNlY3Rpb25Db250ZW50ID0gZmlyc3RTZWN0aW9uLmdldEJyZWFkY3J1bWJOYXZpZ2F0aW9uQ29udGVudCgpXG5cdFx0XHRmaXJzdFNlY3Rpb25Sb3dzID0gZmlyc3RTZWN0aW9uQ29udGVudC5nZXRCcmVhZGNydW1iTmF2aWdhdGlvblJvd3MoKVxuXHRcdFx0XG5cdFx0XHRmaXJzdFNlY3Rpb25Db250ZW50LmdldExpbmUoKS5oZWlnaHQgPSBDb25zdGFudHMucm93SGVpZ2h0ICogZmlyc3RTZWN0aW9uUm93cy5sZW5ndGggLSBNYXRoLmNlaWwoQ29uc3RhbnRzLmJyZWFkY3J1bWJzSW1hZ2VXaWR0aCAvIDIpXG5cdFx0XHRmaXJzdFNlY3Rpb25Db250ZW50LmdldExpbmUoKS55ID0gTWF0aC5jZWlsKChDb25zdGFudHMucm93SGVpZ2h0IC0gQ29uc3RhbnRzLmJyZWFkY3J1bWJzSW1hZ2VXaWR0aCkgLyAyKVxuXHRcdFx0XG5cblx0XHRcdGxhc3RTZWN0aW9uQ29udGVudCA9IGxhc3RTZWN0aW9uLmdldEJyZWFkY3J1bWJOYXZpZ2F0aW9uQ29udGVudCgpXG5cdFx0XHRsYXN0U2VjdGlvblJvd3MgPSBsYXN0U2VjdGlvbkNvbnRlbnQuZ2V0QnJlYWRjcnVtYk5hdmlnYXRpb25Sb3dzKClcblx0XHRcdGxhc3RTZWN0aW9uQ29udGVudC5nZXRMaW5lKCkuaGVpZ2h0ID0gQ29uc3RhbnRzLnJvd0hlaWdodCAqIGxhc3RTZWN0aW9uUm93cy5sZW5ndGggLSBNYXRoLmNlaWwoQ29uc3RhbnRzLmJyZWFkY3J1bWJzSW1hZ2VXaWR0aCAvIDIpXG5cblxuXG5cdHJlY2FsY3VsYXRlVmVydGljYWxCcmVhZGNydW1ic1Bvc2l0aW9uczogKCkgPT5cblx0XHRsYXN0WSA9IDBcblx0XHRcblx0XHRmb3Igc2VjdGlvbiBpbiBAYnJlYWRjcnVtYk5hdmlnYXRpb25TZWN0aW9uc1xuXHRcdFx0c2VjdGlvbi5nZXRMYXllcigpLnkgPSBsYXN0WVxuXHRcdFx0c2VjdGlvbkNvbnRlbnQgPSBzZWN0aW9uLmdldEJyZWFkY3J1bWJOYXZpZ2F0aW9uQ29udGVudCgpXG5cblx0XHRcdGxhc3RZICs9IENvbnN0YW50cy5icmVhZGNydW1ic0l0ZW1zUGFkZGluZ1xuXHRcdFx0bGFzdFkgKz0gc2VjdGlvbkNvbnRlbnQuZ2V0TGF5ZXIoKS5oZWlnaHRcblxuXHRcdGlmIGxhc3RZID4gMjRcblx0XHRcdHNlcGFyYXRvciA9IG5ldyBMYXllclxuXHRcdFx0XHRuYW1lOiBcImJyZWFkY3J1bWJzX3NlcGFyYXRvclwiXG5cdFx0XHRcdHBhcmVudDogQGxheWVyXG5cdFx0XHRcdHdpZHRoOiBDb25zdGFudHMuc2lkZWJhcldpZHRoIC0gMjBcblx0XHRcdFx0aGVpZ2h0OiAxXG5cdFx0XHRcdHg6IEFsaWduLmNlbnRlclxuXHRcdFx0XHR5OiBsYXN0WSArIDE2XG5cdFx0XHRcdGJhY2tncm91bmRDb2xvcjogXCIjZTVlNWU1XCJcblxuXHRcdFx0bGFzdFkgKz0gMzNcblx0XHRlbHNlXG5cdFx0XHRsYXN0WSArPSAxMFxuXG5cdFx0QGxheWVyLmhlaWdodCA9IGxhc3RZXG5cdFx0cmV0dXJuIGxhc3RZIiwiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFtQkFBO0FEQUEs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
