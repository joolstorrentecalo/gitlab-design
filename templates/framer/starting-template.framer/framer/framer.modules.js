require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"material-kit-app-bar":[function(require,module,exports){
var m;

m = require('material-kit');

exports.defaults = {
  title: "Title",
  menu: void 0,
  type: "appbar",
  backgroundColor: "white",
  tabs: void 0,
  titleColor: "black",
  actionColor: "black",
  tabs: void 0,
  tabsColor: void 0,
  tabsInk: {
    color: "blueGrey",
    scale: 8
  },
  tabsBarColor: "yellow",
  tabsAlt: {
    color: void 0,
    opacity: .7
  },
  tabIcons: void 0,
  actions: void 0
};

exports.defaults.props = Object.keys(exports.defaults);

exports.create = function(array) {
  var act, actionsArray, bar, barArea, handleTabStates, i, icon, j, k, l, label, layer, len, len1, len2, len3, n, ref, ref1, ref2, setup, t, tab, tabsActiveBar, title, titleLeading, view;
  setup = m.utils.setupComponent(array, exports.defaults);
  bar = new Layer({
    name: "App Bar",
    backgroundColor: m.color(setup.backgroundColor),
    shadowColor: "rgba(0, 0, 0, .12)",
    shadowBlur: m.px(4),
    shadowY: m.px(2)
  });
  bar.constraints = {
    leading: 0,
    trailing: 0,
    top: 0,
    height: 80
  };
  if (setup.tabs) {
    bar.constraints.height = 128;
  }
  barArea = new Layer({
    superLayer: bar,
    backgroundColor: "transparent",
    name: "barArea"
  });
  barArea.constraints = {
    leading: 0,
    trailing: 0,
    height: 56,
    bottom: 0
  };
  if (setup.tabs && setup.tabs.length > 2) {
    barArea.constraints.bottom = 48;
  }
  if (setup.superLayer) {
    setup.superLayer.addSubLayer(bar);
  }
  m.layout.set([bar, barArea]);
  bar.type = setup.type;
  ref = Framer.CurrentContext.layers;
  for (j = 0, len = ref.length; j < len; j++) {
    layer = ref[j];
    if (layer.type === "statusBar") {
      this.statusBar = layer;
      bar.placeBehind(this.statusBar);
    }
  }
  if (setup.titleColor === "black") {
    setup.titleColor = m.utils.autoColor(bar.backgroundColor).toHexString();
  }
  if (setup.actionColor === "black") {
    setup.actionColor = m.utils.autoColor(bar.backgroundColor).toHexString();
  }
  if (typeof setup.title === "string") {
    title = new m.Text({
      color: setup.titleColor,
      fontWeight: 500,
      superLayer: barArea,
      text: setup.title,
      fontSize: 20
    });
  }
  m.utils.specialChar(title);
  titleLeading = 16;
  if (setup.menu) {
    bar.menu = new m.Icon({
      name: setup.menu,
      color: setup.actionColor,
      superLayer: barArea,
      constraints: {
        leading: 16,
        verticalCenter: title
      },
      clip: false
    });
    titleLeading = [bar.menu, 16];
    m.utils.inky({
      layer: bar.menu,
      moveToTap: false,
      color: "white",
      opacity: .4,
      scale: .7,
      startScale: .7
    });
  }
  title.constraints = {
    bottom: 12,
    leading: titleLeading
  };
  if (setup.leftAction) {
    title.constraints.leading = 73;
  }
  m.layout.set({
    target: [title]
  });
  actionsArray = [];
  if (setup.actions) {
    ref1 = setup.actions;
    for (i = k = 0, len1 = ref1.length; k < len1; i = ++k) {
      act = ref1[i];
      if (i === 0) {
        icon = new m.Icon({
          name: act,
          superLayer: barArea,
          constraints: {
            trailing: 24,
            verticalCenter: title
          },
          color: setup.actionColor,
          clip: false
        });
        actionsArray.push(icon);
      } else {
        icon = new m.Icon({
          name: act,
          superLayer: barArea,
          constraints: {
            trailing: [actionsArray[i - 1], 24],
            verticalCenter: title
          },
          color: setup.actionColor,
          clip: false
        });
        actionsArray.push(icon);
      }
    }
    for (l = 0, len2 = actionsArray.length; l < len2; l++) {
      act = actionsArray[l];
      m.utils.inky({
        layer: act,
        moveToTap: false,
        color: "white",
        opacity: .4,
        scale: .8,
        startScale: .7
      });
    }
  }
  if (setup.tabs && setup.tabs.length > 2) {
    handleTabStates = function(bar, layer) {
      var activeTabIndex, color, len3, n, opacity, results, t, tab, tabsArray;
      tabsArray = Object.keys(bar.tabs);
      activeTabIndex = void 0;
      results = [];
      for (i = n = 0, len3 = tabsArray.length; n < len3; i = ++n) {
        t = tabsArray[i];
        tab = bar.tabs[t];
        if (tab === bar.activeTab) {
          activeTabIndex = i;
          bar.views[t].animate({
            properties: {
              x: 0
            },
            time: .25
          });
          tab.label.opacity = 1;
          tab.label.color = setup.tabsColor;
          bar.activeBar.animate({
            properties: {
              x: layer.x
            },
            time: .25,
            curve: "bezier-curve(.2, 0.4, 0.4, 1.0)"
          });
          results.push(m.utils.update(title, [
            {
              text: m.utils.capitalize(bar.activeTab.label.name)
            }
          ]));
        } else {
          if (activeTabIndex === void 0) {
            bar.views[t].animate({
              properties: {
                x: m.device.width * -1
              },
              time: .25,
              curve: "cubic-bezier(0.4, 0.0, 0.2, 1)"
            });
          } else {
            bar.views[t].animate({
              properties: {
                x: m.device.width
              },
              time: .25,
              curve: "cubic-bezier(0.4, 0.0, 0.2, 1)"
            });
          }
          opacity = 1;
          color = tab.label.color;
          if (setup.tabsAlt.opacity !== void 0) {
            opacity = setup.tabsAlt.opacity;
          }
          if (setup.tabsAlt.color !== void 0) {
            color = setup.tabsAlt.color;
          }
          tab.label.opacity = opacity;
          results.push(tab.label.color = color);
        }
      }
      return results;
    };
    tabsActiveBar = new Layer({
      height: m.px(2),
      width: m.device.width / setup.tabs.length,
      backgroundColor: m.color(setup.tabsBarColor),
      superLayer: bar
    });
    tabsActiveBar.constraints = {
      bottom: 0
    };
    bar.activeBar = tabsActiveBar;
    bar.tabs = {};
    bar.views = {};
    if (setup.tabs.length < 5) {
      ref2 = setup.tabs;
      for (i = n = 0, len3 = ref2.length; n < len3; i = ++n) {
        t = ref2[i];
        view = new Layer({
          name: "View " + t,
          backgroundColor: "transparent"
        });
        view.constraints = {
          top: bar,
          bottom: 0,
          width: m.dp(m.device.width)
        };
        bar.views[t] = view;
        if (i > 0) {
          view.x = m.device.width;
        }
        tab = new Layer({
          width: m.device.width / setup.tabs.length,
          height: m.px(48),
          x: (m.device.width / setup.tabs.length) * i,
          superLayer: bar,
          backgroundColor: "transparent",
          clip: true,
          name: "tab "
        });
        tab.constraints = {
          bottom: 0
        };
        m.layout.set(tab);
        if (setup.tabsColor === void 0) {
          setup.tabsColor = m.utils.autoColor(bar.backgroundColor).toHexString();
        }
        label = "";
        if (setup.tabIcons) {
          icon = setup.tabIcons[i];
          label = new m.Icon({
            name: icon,
            superLayer: tab,
            color: setup.tabsColor,
            constraints: {
              align: "center"
            }
          });
        } else {
          label = new m.Text({
            superLayer: tab,
            constraints: {
              align: "center"
            },
            text: t,
            textTransform: 'Uppercase',
            fontSize: 14,
            color: setup.tabsColor
          });
        }
        label.name = t;
        tab.label = label;
        setup.tabsInk["layer"] = tab;
        m.utils.inky(setup.tabsInk);
        bar.tabs[t] = tab;
        tab.on(Events.TouchEnd, function() {
          bar.activeTab = this;
          return handleTabStates(bar, this);
        });
      }
    }
  }
  if (setup.tabs) {
    if (setup.tabs.length > 2) {
      bar.activeTab = bar.tabs[setup.tabs[0]];
      handleTabStates(bar, bar.activeTab);
    }
  }
  bar.title = title;
  return bar;
};


},{"material-kit":"material-kit"}],"material-kit-banner":[function(require,module,exports){
var m;

m = require('material-kit');

exports.defaults = {
  app: "App",
  title: "Title",
  message: "Message",
  action: "Action",
  time: "• now",
  icon: void 0,
  duration: 7,
  animated: true
};

exports.defaults.props = Object.keys(exports.defaults);

exports.create = function(array) {
  var app, banner, bannerBuffer, message, setup, time, title;
  setup = m.utils.setupComponent(array, exports.defaults);
  banner = new Layer({
    backgroundColor: "white",
    name: "banner",
    shadowColor: "rgba(0,0,0,.24)",
    shadowBlur: m.px(2),
    shadowY: m.px(2)
  });
  banner.constraints = {
    leading: 0,
    trailing: 0,
    top: 0,
    height: 74
  };
  switch (m.device.name) {
    case "ipad":
      this.leadingIcon = 200;
      this.topIcon = 15;
      this.topTitle = 11;
      break;
    case "ipad-pro":
      this.leadingIcon = 192;
      this.topIcon = 12;
      this.topTitle = 9;
      break;
    case "iphone-6s-plus":
      this.leadingIcon = 15;
      this.topIcon = 12;
      this.topTitle = 10;
      break;
    default:
      this.leadingIcon = 15;
      this.topIcon = 8;
      this.topTitle = 6;
  }
  if (setup.icon === void 0) {
    setup.icon = new Layer({
      superLayer: banner
    });
    setup.icon.style["background"] = "linear-gradient(-180deg, #67FF81 0%, #01B41F 100%)";
  } else {
    banner.addSubLayer(setup.icon);
  }
  setup.icon.borderRadius = m.utils.px(4.5);
  setup.icon.name = "icon";
  setup.icon.constraints = {
    height: 16,
    width: 16,
    leading: this.leadingIcon,
    top: this.topIcon
  };
  app = new m.Text({
    style: "app",
    text: setup.app,
    color: "blue",
    fontWeight: "medium",
    fontSize: 11,
    superLayer: banner,
    name: "title"
  });
  app.constraints = {
    verticalCenter: setup.icon,
    leading: [setup.icon, 5]
  };
  title = new m.Text({
    style: "title",
    text: setup.title,
    color: "black",
    fontSize: 13,
    superLayer: banner,
    name: "title"
  });
  title.constraints = {
    leadingEdges: setup.icon,
    top: [setup.icon, 7]
  };
  message = new m.Text({
    style: "title",
    text: setup.message,
    color: "grey",
    fontSize: 13,
    superLayer: banner,
    name: "title"
  });
  message.constraints = {
    leadingEdges: setup.icon,
    top: [title, 5]
  };
  time = new m.Text({
    style: "time",
    text: setup.time,
    color: "grey",
    fontSize: 11,
    superLayer: banner,
    name: "time"
  });
  time.constraints = {
    leading: [app, 3],
    bottomEdges: app
  };
  m.layout.set();
  m.utils.bgBlur(banner);
  banner.draggable = true;
  banner.draggable.horizontal = false;
  banner.draggable.constraints = {
    y: 0
  };
  banner.draggable.bounceOptions = {
    friction: 25,
    tension: 250
  };
  banner.on(Events.DragEnd, function() {
    if (banner.maxY < m.utils.px(68)) {
      banner.animate({
        properties: {
          maxY: 0
        },
        time: .15,
        curve: "ease-in-out"
      });
      return Utils.delay(.25, function() {
        return banner.destroy();
      });
    }
  });
  bannerBuffer = new Layer({
    maxY: 0,
    name: "buffer",
    backgroundColor: "#1B1B1C",
    opacity: .9,
    superLayer: banner,
    width: m.device.width,
    maxY: banner.y,
    height: m.device.height
  });
  m.utils.bgBlur(bannerBuffer);
  if (setup.animated === true) {
    banner.y = 0 - banner.height;
    banner.animate({
      properties: {
        y: 0
      },
      time: .25,
      curve: "spring(400,20,0)"
    });
  }
  if (setup.duration) {
    Utils.delay(setup.duration, function() {
      return banner.animate({
        properties: {
          maxY: 0
        },
        time: .25,
        curve: "ease-in-out"
      });
    });
    Utils.delay(setup.duration + .25, function() {
      return banner.destroy();
    });
  }
  banner.icon = setup.icon;
  banner.app = app;
  banner.title = title;
  banner.message = message;
  return banner;
};


},{"material-kit":"material-kit"}],"material-kit-bottom-nav":[function(require,module,exports){
var m;

m = require('material-kit');

exports.defaults = {
  backgroundColor: "grey100",
  tabsColor: "grey900",
  tabs: void 0,
  tabIcons: void 0,
  labels: true,
  inactiveTabOpacity: .6
};

exports.defaults.props = Object.keys(exports.defaults);

exports.create = function(array) {
  var bottomNav, handleTabStates, i, icon, iconName, j, label, len, ref, setup, t, tab, view;
  setup = m.utils.setupComponent(array, exports.defaults);
  bottomNav = new Layer({
    name: "bottomNav",
    backgroundColor: m.color(setup.backgroundColor)
  });
  ({
    shadowColor: "rgba(0, 0, 0, .12)",
    shadowBlur: m.px(4),
    shadowY: -m.px(2)
  });
  bottomNav.constraints = {
    leading: 0,
    trailing: 0,
    bottom: 46,
    height: 56
  };
  m.layout.set(bottomNav);
  handleTabStates = function(bottomNav, layer) {
    var activeTabIndex, i, j, len, results, t, tab, tabsArray;
    tabsArray = Object.keys(bottomNav.tabs);
    activeTabIndex = void 0;
    results = [];
    for (i = j = 0, len = tabsArray.length; j < len; i = ++j) {
      t = tabsArray[i];
      tab = bottomNav.tabs[t];
      if (tab === bottomNav.activeTab) {
        activeTabIndex = i;
        tab.icon.opacity = 1;
        tab.icon.constraints.top = 6;
        tab.label.opacity = 1;
        tab.label.constraints.top = tab.icon;
        bottomNav.views[t].animate({
          properties: {
            x: 0
          },
          time: .25
        });
      } else {
        tab.icon.opacity = setup.inactiveTabOpacity;
        tab.icon.constraints.top = 16;
        tab.label.opacity = 0;
        tab.label.constraints.top = 21;
        if (activeTabIndex === void 0) {
          bottomNav.views[t].animate({
            properties: {
              x: m.device.width * -1
            },
            time: .25,
            curve: "cubic-bezier(0.4, 0.0, 0.2, 1)"
          });
        } else {
          bottomNav.views[t].animate({
            properties: {
              x: m.device.width
            },
            time: .25,
            curve: "cubic-bezier(0.4, 0.0, 0.2, 1)"
          });
        }
      }
      results.push(m.layout.animate({
        time: .1
      }));
    }
    return results;
  };
  bottomNav.tabs = {};
  bottomNav.views = {};
  if (setup.tabs.length < 6) {
    ref = setup.tabs;
    for (i = j = 0, len = ref.length; j < len; i = ++j) {
      t = ref[i];
      view = new Layer({
        name: "View" + t,
        backgroundColor: "transparent"
      });
      view.constraints = {
        bottom: bottomNav,
        top: 0,
        width: m.dp(m.device.width)
      };
      view.sendToBack();
      bottomNav.views[t] = view;
      if (i > 0) {
        view.x = m.device.width;
      }
      tab = new Layer({
        width: m.device.width / setup.tabs.length,
        height: m.px(56),
        x: (m.device.width / setup.tabs.length) * i,
        superLayer: bottomNav,
        backgroundColor: "transparent",
        clip: true,
        name: "tab" + t
      });
      m.layout.set(tab);
      iconName = setup.tabIcons[i];
      icon = new m.Icon({
        name: iconName,
        superLayer: tab,
        color: setup.tabsColor,
        constraints: {
          top: 16
        }
      });
      icon.opacity = setup.inactiveTabOpacity;
      icon.centerX();
      label = new m.Text({
        name: t,
        superLayer: tab,
        text: t,
        fontSize: 14,
        color: setup.tabsColor,
        constraints: {
          top: 21
        }
      });
      label.opacity = 0;
      label.centerX();
      tab.icon = icon;
      tab.label = label;
      bottomNav.tabs[t] = tab;
      tab.on(Events.TouchEnd, function() {
        bottomNav.activeTab = this;
        return handleTabStates(bottomNav, this);
      });
    }
  }
  bottomNav.activeTab = bottomNav.tabs[setup.tabs[0]];
  handleTabStates(bottomNav, bottomNav.activeTab);
  return bottomNav;
};


},{"material-kit":"material-kit"}],"material-kit-button":[function(require,module,exports){
var m;

m = require('material-kit');

exports.defaults = {
  text: "text",
  type: "flat",
  backgroundColor: "white",
  color: "teal300",
  name: "button",
  superLayer: void 0,
  constraints: void 0,
  icon: "star",
  clip: true,
  ink: void 0
};

exports.defaults.props = Object.keys(exports.defaults);

exports.create = function(array) {
  var button, icon, label, passedInk, pressedBGC, setup;
  setup = m.utils.setupComponent(array, exports.defaults);
  button = new Layer({
    name: setup.name,
    clip: setup.clip
  });
  if (setup.superLayer) {
    setup.superLayer.addSubLayer(button);
  }
  button.type = setup.type;
  switch (setup.type) {
    case "floating":
      button.constraints = {
        width: 56,
        height: 56,
        bottom: 64,
        trailing: 17
      };
      if (m.device.scale < 4) {
        button.constraints.width = 64;
        button.constraints.height = 64;
      }
      button.borderRadius = m.px(32);
      button.shadowColor = "rgba(0,0,0,.12)";
      button.shadowY = m.px(2);
      button.shadowBlur = m.px(6);
      button.backgroundColor = m.color(setup.backgroundColor);
      if (typeof setup.icon === "string") {
        icon = m.Icon({
          name: setup.icon,
          color: setup.color,
          superLayer: button,
          constraints: {
            align: "center"
          }
        });
      }
      m.layout.set({
        target: [button]
      });
      m.layout.set({
        target: [icon]
      });
      break;
    default:
      label = new m.Text({
        text: setup.text,
        superLayer: button,
        textTransform: "uppercase",
        color: setup.color,
        fontSize: 14,
        lineHeight: 14,
        fontWeight: 500
      });
      label.constraints = {
        align: "center"
      };
      button.props = {
        backgroundColor: m.color(setup.backgroundColor),
        height: m.px(36),
        width: label.width + m.px(16),
        borderRadius: m.px(2),
        clip: setup.clip
      };
      if (button.width < m.px(64)) {
        button.width = m.px(64);
      }
      switch (setup.type) {
        case "raised":
          button.origBGC = button.backgroundColor;
          button.shadowColor = "rgba(0,0,0,.24)";
          button.shadowY = m.px(2);
          button.shadowBlur = m.px(2);
          pressedBGC = button.backgroundColor.lighten(10);
          button.on(Events.TouchStart, function() {
            return button.animate({
              properties: {
                backgroundColor: pressedBGC,
                shadowY: m.px(8),
                shadowBlur: m.px(8)
              }
            });
          });
          button.on(Events.TouchEnd, function() {
            return button.animate({
              properties: {
                backgroundColor: button.origBGC,
                shadowY: m.px(2),
                shadowBlur: m.px(2)
              }
            });
          });
          break;
        case "flat":
          button.origBGC = button.backgroundColor;
          pressedBGC = button.backgroundColor.darken(5);
          button.on(Events.TouchStart, function() {
            return button.animate({
              properties: {
                backgroundColor: pressedBGC
              }
            });
          });
          button.on(Events.TouchEnd, function() {
            return button.animate({
              properties: {
                backgroundColor: button.origBGC
              }
            });
          });
      }
      if (setup.constraints) {
        button.constraints = setup.constraints;
      }
      m.layout.set({
        target: [button, label]
      });
  }
  if (setup.ink) {
    passedInk = setup.ink;
    passedInk.layer = button;
    m.utils.inky(passedInk);
  }
  button.label = label;
  return button;
};


},{"material-kit":"material-kit"}],"material-kit-dialog":[function(require,module,exports){
var m;

m = require('material-kit');

exports.defaults = {
  title: "Title",
  message: "Message",
  actions: ["Agree", "Decline"]
};

exports.defaults.props = Object.keys(exports.defaults);

exports.create = function(array) {
  var act, actions, button, charCount, dialog, i, index, j, k, largestButton, largestLabel, len, len1, len2, message, modal, overlay, ref, ref1, setup, title;
  setup = m.utils.setupComponent(array, exports.defaults);
  dialog = new Layer({
    backgroundColor: "transparent",
    name: "dialog"
  });
  dialog.constraints = {
    leading: 0,
    trailing: 0,
    top: 0,
    bottom: 0
  };
  overlay = new Layer({
    backgroundColor: "#5E5E5E",
    superLayer: dialog,
    name: "overlay",
    opacity: .6
  });
  overlay.constraints = {
    leading: 0,
    trailing: 0,
    top: 0,
    bottom: 0
  };
  modal = new Layer({
    backgroundColor: "white",
    superLayer: dialog,
    borderRadius: m.utils.px(2),
    name: "modal",
    shadowColor: "rgba(0,0,0,.2)",
    shadowY: 24,
    shadowBlur: 24,
    clip: true
  });
  modal.constraints = {
    align: "center",
    width: 280,
    height: 400
  };
  title = new m.Text({
    superLayer: modal,
    text: setup.title,
    fontWeight: "semibold",
    fontSize: 20,
    name: "title",
    lineHeight: 20,
    constraints: {
      top: 20,
      width: 220,
      leading: 24
    }
  });
  message = new m.Text({
    superLayer: modal,
    text: setup.message,
    fontSize: 13,
    name: "message",
    lineHeight: 16,
    constraints: {
      top: [title, 10],
      leading: 24,
      width: 220
    }
  });
  m.layout.set({
    target: [dialog, overlay, modal, title, message]
  });
  modal.constraints["height"] = 20 + m.utils.pt(title.height) + 10 + m.utils.pt(message.height) + 24 + 44;
  m.layout.set({
    target: [overlay, modal]
  });
  dialog.actions = {};
  actions = [];
  charCount = 0;
  if (setup.actions.length > 1) {
    charCount = setup.actions[0].length + setup.actions[1].length;
  }
  if (setup.actions.length < 3 && charCount < 24) {
    ref = setup.actions;
    for (index = i = 0, len = ref.length; i < len; index = ++i) {
      act = ref[index];
      button = new m.Button({
        superLayer: modal,
        text: setup.actions[index],
        color: "blue"
      });
      if (index === 0) {
        button.constraints = {
          bottom: 8,
          trailing: 8
        };
      } else {
        button.constraints = {
          bottom: 8,
          trailing: [actions[index - 1], 8]
        };
      }
      dialog.actions[setup.actions[index]] = button;
      actions.push(button);
      m.layout.set({
        target: button
      });
    }
  } else {
    modal.constraints["height"] = 20 + m.utils.pt(title.height) + 10 + m.utils.pt(message.height) + 32 + (setup.actions.length * 36);
    m.layout.set({
      target: modal
    });
    largestLabel = 0;
    largestButton = 0;
    ref1 = setup.actions;
    for (index = j = 0, len1 = ref1.length; j < len1; index = ++j) {
      act = ref1[index];
      button = new m.Button({
        superLayer: modal,
        text: setup.actions[index],
        color: "blue"
      });
      if (index === 0) {
        button.constraints = {
          top: [message, 24],
          trailing: 8
        };
      } else {
        button.constraints = {
          trailing: 8,
          top: actions[index - 1]
        };
      }
      dialog.actions[setup.actions[index]] = button;
      actions.push(button);
      m.layout.set({
        target: button
      });
      if (largestLabel < button.label.width) {
        largestLabel = button.label.width;
        largestButton = button.width;
      }
    }
    for (k = 0, len2 = actions.length; k < len2; k++) {
      act = actions[k];
      act.label.style.textAlign = "right";
      act.label.width = largestLabel;
      act.width = largestButton;
      m.layout.set({
        target: [act, act.label]
      });
    }
  }
  dialog.overlay = overlay;
  dialog.modal = modal;
  dialog.title = title;
  dialog.message = message;
  return dialog;
};


},{"material-kit":"material-kit"}],"material-kit-icon":[function(require,module,exports){
var m;

m = require('material-kit');

exports.defaults = {
  name: "star",
  scale: m.device.scale,
  color: m.color("black"),
  superLayer: void 0,
  constraints: void 0,
  clip: true,
  opacity: 1
};

exports.defaults.props = Object.keys(exports.defaults);

exports.create = function(array) {
  var frame, iconLayer, paddingRight, paddingTop, setup;
  setup = m.utils.setupComponent(array, exports.defaults);
  if (typeof setup.name === "string") {
    iconLayer = new Layer({
      html: "<i class='material-icons md-24'>" + setup.name + "</i>",
      color: m.color(setup.color),
      backgroundColor: "transparent",
      clip: setup.clip,
      name: setup.name,
      superLayer: setup.superLayer,
      opacity: setup.opacity
    });
    paddingRight = 0;
    paddingTop = 0;
    switch (m.device.scale) {
      case 4:
        paddingTop = m.px(12) + "px";
        paddingRight = m.px(2) + "px";
        break;
      case 3:
        paddingTop = m.px(10) + "px";
        paddingRight = m.px(6) + "px";
        break;
      case 2:
        paddingTop = m.px(8) + "px";
        paddingRight = m.px(8) + "px";
        break;
      case 1:
        paddingTop = m.px(16) + "px";
        paddingRight = m.px(7) + "px";
    }
    frame = m.utils.textAutoSize(iconLayer);
    iconLayer.html = ("<span style='-webkit-transform: scale(" + setup.scale + "); position: absolute;'>") + iconLayer.html;
    iconLayer.width = m.px(24);
    iconLayer.height = m.px(frame.height);
    iconLayer.style = {
      "display": "inline-block",
      "padding-top": paddingTop,
      "padding-right": paddingRight,
      "text-align": "center"
    };
    if (setup.constraints) {
      iconLayer.constraints = setup.constraints;
      m.layout.set({
        target: iconLayer
      });
    }
    return iconLayer;
  } else {
    iconLayer = setup.layer;
    return iconLayer;
  }
};


},{"material-kit":"material-kit"}],"material-kit-layout":[function(require,module,exports){
var layout, m;

m = require('material-kit');

exports.defaults = {
  animations: {
    target: void 0,
    constraints: void 0,
    curve: "ease-in-out",
    curveOptions: void 0,
    time: 1,
    delay: 0,
    repeat: void 0,
    colorModel: void 0,
    stagger: void 0,
    fadeOut: false,
    fadeIn: false
  }
};

layout = function(array) {
  var blueprint, i, index, j, k, l, layer, len, len1, len2, newConstraint, props, ref, ref1, setup, targetLayers;
  setup = {};
  targetLayers = [];
  blueprint = [];
  if (array) {
    ref = Object.keys(exports.defaults.animations);
    for (j = 0, len = ref.length; j < len; j++) {
      i = ref[j];
      if (array[i]) {
        setup[i] = array[i];
      } else {
        setup[i] = exports.defaults.animations[i];
      }
    }
  }
  if (setup.target) {
    if (setup.target.length) {
      targetLayers = setup.target;
    } else {
      targetLayers.push(setup.target);
    }
  } else {
    targetLayers = Framer.CurrentContext.layers;
  }
  if (setup.target) {
    if (setup.constraints) {
      ref1 = Object.keys(setup.constraints);
      for (k = 0, len1 = ref1.length; k < len1; k++) {
        newConstraint = ref1[k];
        setup.target.constraints[newConstraint] = setup.constraints[newConstraint];
      }
    }
  }
  for (index = l = 0, len2 = targetLayers.length; l < len2; index = ++l) {
    layer = targetLayers[index];
    layer.calculatedPosition = {};
    if (layer.constraints) {
      props = {};
      layer.superFrame = {};
      if (layer.superLayer) {
        layer.superFrame.height = layer.superLayer.height;
        layer.superFrame.width = layer.superLayer.width;
      } else {
        layer.superFrame.height = m.device.height;
        layer.superFrame.width = m.device.width;
      }
      if (layer.constraints.leading !== void 0 && layer.constraints.trailing !== void 0) {
        layer.constraints.autoWidth = {};
      }
      if (layer.constraints.top !== void 0 && layer.constraints.bottom !== void 0) {
        layer.constraints.autoHeight = {};
      }
      if (layer.constraints.width !== void 0) {
        props.width = m.utils.px(layer.constraints.width);
      } else {
        props.width = layer.width;
      }
      if (layer.constraints.height !== void 0) {
        props.height = m.utils.px(layer.constraints.height);
      } else {
        props.height = layer.height;
      }
      if (layer.constraints.leadingEdges !== void 0) {
        if (layer.constraints.leadingEdges.calculatedPosition.x === void 0) {
          layer.constraints.leadingEdges.calculatedPosition.x = layer.constraints.leadingEdges.x;
        }
        props.x = layer.constraints.leadingEdges.calculatedPosition.x;
      }
      if (layer.constraints.trailingEdges !== void 0) {
        if (layer.constraints.trailingEdges.calculatedPosition.x === void 0) {
          layer.constraints.trailingEdges.calculatedPosition.x = layer.constraints.trailingEdges.x;
        }
        props.x = layer.constraints.trailingEdges.calculatedPosition.x - props.width + layer.constraints.trailingEdges.calculatedPosition.width;
      }
      if (layer.constraints.topEdges !== void 0) {
        if (layer.constraints.topEdges.calculatedPosition.y === void 0) {
          layer.constraints.topEdges.calculatedPosition.y = layer.constraints.topEdges.y;
        }
        props.y = layer.constraints.topEdges.calculatedPosition.y;
      }
      if (layer.constraints.bottomEdges !== void 0) {
        if (layer.constraints.bottomEdges.calculatedPosition.y === void 0) {
          layer.constraints.bottomEdges.calculatedPosition.y = layer.constraints.bottomEdges.y;
        }
        props.y = layer.constraints.bottomEdges.calculatedPosition.y - props.height + layer.constraints.bottomEdges.calculatedPosition.height;
      }
      if (layer.constraints.leading !== void 0) {
        if (layer.constraints.leading === parseInt(layer.constraints.leading, 10)) {
          props.x = m.utils.px(layer.constraints.leading);
        } else {
          if (layer.constraints.leading.length === void 0) {
            if (layer.constraints.leading.calculatedPosition.x === void 0) {
              layer.constraints.leading.calculatedPosition.x = layer.constraints.leading.x;
            }
            props.x = layer.constraints.leading.calculatedPosition.x + layer.constraints.leading.calculatedPosition.width;
          } else {
            if (layer.constraints.leading[0].calculatedPosition.x === void 0) {
              layer.constraints.leading[0].calculatedPosition.x = layer.constraints.leading[0].x;
            }
            props.x = layer.constraints.leading[0].calculatedPosition.x + layer.constraints.leading[0].calculatedPosition.width + m.utils.px(layer.constraints.leading[1]);
          }
        }
      }
      if (layer.constraints.autoWidth !== void 0) {
        layer.constraints.autoWidth.startX = props.x;
      }
      if (layer.constraints.trailing !== void 0) {
        if (layer.constraints.trailing === parseInt(layer.constraints.trailing, 10)) {
          props.x = layer.superFrame.width - m.utils.px(layer.constraints.trailing) - props.width;
        } else {
          if (layer.constraints.trailing.length === void 0) {
            if (layer.constraints.trailing.calculatedPosition.x === void 0) {
              layer.constraints.trailing.calculatedPosition.x = layer.constraints.trailing.x;
            }
            props.x = layer.constraints.trailing.calculatedPosition.x - props.width;
          } else {
            if (layer.constraints.trailing[0].calculatedPosition.x === void 0) {
              layer.constraints.trailing[0].calculatedPosition.x = layer.constraints.trailing[0].x;
            }
            props.x = layer.constraints.trailing[0].calculatedPosition.x - m.utils.px(layer.constraints.trailing[1]) - props.width;
          }
        }
      }
      if (layer.constraints.autoWidth !== void 0) {
        layer.constraints.autoWidth.calculatedPositionX = props.x;
        props.x = layer.constraints.autoWidth.startX;
        props.width = layer.constraints.autoWidth.calculatedPositionX - layer.constraints.autoWidth.startX + props.width;
      }
      if (layer.constraints.top !== void 0) {
        if (layer.constraints.top === parseInt(layer.constraints.top, 10)) {
          props.y = m.utils.px(layer.constraints.top);
        } else {
          if (layer.constraints.top.length === void 0) {
            if (layer.constraints.top.calculatedPosition.y === void 0) {
              layer.constraints.top.calculatedPosition.y = layer.constraints.top.y;
            }
            props.y = layer.constraints.top.calculatedPosition.y + layer.constraints.top.calculatedPosition.height;
          } else {
            if (layer.constraints.top[0].calculatedPosition.y === void 0) {
              layer.constraints.top[0].calculatedPosition.y = layer.constraints.top[0].y;
            }
            props.y = layer.constraints.top[0].calculatedPosition.y + layer.constraints.top[0].calculatedPosition.height + m.utils.px(layer.constraints.top[1]);
          }
        }
      }
      if (layer.constraints.autoHeight !== void 0) {
        layer.constraints.autoHeight.startY = props.y;
      }
      if (layer.constraints.bottom !== void 0) {
        if (layer.constraints.bottom === parseInt(layer.constraints.bottom, 10)) {
          props.y = layer.superFrame.height - m.utils.px(layer.constraints.bottom) - props.height;
        } else {
          if (layer.constraints.bottom.length === void 0) {
            if (layer.constraints.bottom.calculatedPosition.y === void 0) {
              layer.constraints.bottom.calculatedPosition.y = layer.constraints.bottom.y;
            }
            props.y = layer.constraints.bottom.calculatedPosition.y - props.height;
          } else {
            if (layer.constraints.bottom[0].calculatedPosition.y === void 0) {
              layer.constraints.bottom[0].calculatedPosition.y = layer.constraints.bottom[0].y;
            }
            props.y = layer.constraints.bottom[0].calculatedPosition.y - m.utils.px(layer.constraints.bottom[1]) - props.height;
          }
        }
      }
      if (layer.constraints.autoHeight !== void 0) {
        layer.constraints.autoHeight.calculatedPositionY = props.y;
        props.height = layer.constraints.autoHeight.calculatedPositionY - layer.constraints.autoHeight.startY + props.height;
        props.y = layer.constraints.autoHeight.startY;
      }
      if (layer.constraints.align !== void 0) {
        if (layer.constraints.align === "horizontal") {
          props.x = layer.superFrame.width / 2 - props.width / 2;
        }
        if (layer.constraints.align === "vertical") {
          props.y = layer.superFrame.height / 2 - props.height / 2;
        }
        if (layer.constraints.align === "center") {
          props.x = layer.superFrame.width / 2 - props.width / 2;
          props.y = layer.superFrame.height / 2 - props.height / 2;
        }
      }
      if (layer.constraints.horizontalCenter !== void 0) {
        props.x = layer.constraints.horizontalCenter.calculatedPosition.x + (layer.constraints.horizontalCenter.calculatedPosition.width - props.width) / 2;
      }
      if (layer.constraints.verticalCenter !== void 0) {
        props.y = layer.constraints.verticalCenter.calculatedPosition.y + (layer.constraints.verticalCenter.calculatedPosition.height - props.height) / 2;
      }
      if (layer.constraints.center !== void 0) {
        props.x = layer.constraints.center.calculatedPosition.x + (layer.constraints.center.calculatedPosition.width - props.width) / 2;
        props.y = layer.constraints.center.calculatedPosition.y + (layer.constraints.center.calculatedPosition.height - props.height) / 2;
      }
      layer.calculatedPosition = props;
    } else {
      layer.calculatedPosition = layer.props;
    }
    blueprint.push(layer);
  }
  return blueprint;
};

exports.set = function(array) {
  var blueprint, i, index, j, k, key, layer, len, len1, props, ref, results, setup;
  setup = {};
  props = {};
  if (array) {
    ref = Object.keys(exports.defaults.animations);
    for (j = 0, len = ref.length; j < len; j++) {
      i = ref[j];
      if (array[i]) {
        setup[i] = array[i];
      } else {
        setup[i] = exports.defaults.animations[i];
      }
    }
  }
  blueprint = layout(array);
  results = [];
  for (index = k = 0, len1 = blueprint.length; k < len1; index = ++k) {
    layer = blueprint[index];
    results.push((function() {
      var l, len2, ref1, results1;
      ref1 = Object.keys(layer.calculatedPosition);
      results1 = [];
      for (l = 0, len2 = ref1.length; l < len2; l++) {
        key = ref1[l];
        results1.push(layer[key] = layer.calculatedPosition[key]);
      }
      return results1;
    })());
  }
  return results;
};

exports.animate = function(array) {
  var blueprint, delay, i, index, j, k, layer, len, len1, props, ref, results, setup, stag;
  setup = {};
  props = {};
  if (array) {
    ref = Object.keys(exports.defaults.animations);
    for (j = 0, len = ref.length; j < len; j++) {
      i = ref[j];
      if (array[i]) {
        setup[i] = array[i];
      } else {
        setup[i] = exports.defaults.animations[i];
      }
    }
  }
  blueprint = layout(array);
  results = [];
  for (index = k = 0, len1 = blueprint.length; k < len1; index = ++k) {
    layer = blueprint[index];
    delay = setup.delay;
    if (setup.stagger) {
      stag = setup.stagger;
      delay = (index * stag) + delay;
    }
    if (setup.fadeOut) {
      if (layer === setup.fadeOut) {
        layer.calculatedPosition.opacity = 0;
      }
    }
    if (setup.fadeIn) {
      layer.calculatedPosition.opacity = 1;
    }
    layer.animate({
      properties: layer.calculatedPosition,
      time: setup.time,
      delay: delay,
      curve: setup.curve,
      repeat: setup.repeat,
      colorModel: setup.colorModel,
      curveOptions: setup.curveOptions
    });
    results.push(layer.calculatedPosition = props);
  }
  return results;
};


},{"material-kit":"material-kit"}],"material-kit-library":[function(require,module,exports){
var layer, m;

m = require("material-kit");

layer = new Layer;

exports.layerProps = Object.keys(layer.props);

exports.layerProps.push("superLayer");

exports.layerProps.push("constraints");

exports.layerStyles = Object.keys(layer.style);

layer.destroy();

exports.assets = {
  home: "<svg width='16px' height='16px' viewBox='172 16 16 16' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'> <!-- Generator: Sketch 3.7.2 (28276) - http://www.bohemiancoding.com/sketch --> <desc>Created with Sketch.</desc> <defs> <ellipse id='path-1' cx='180' cy='24' rx='8' ry='8'></ellipse> <mask id='mask-2' maskContentUnits='userSpaceOnUse' maskUnits='objectBoundingBox' x='0' y='0' width='16' height='16' fill='white'> <use xlink:href='#path-1'></use> </mask> </defs> <use id='home' stroke='#FFFFFF' mask='url(#mask-2)' stroke-width='4' fill='none' xlink:href='#path-1'></use> </svg>",
  back: "<svg width='16px' height='19px' viewBox='301 14 16 19' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'> <!-- Generator: Sketch 3.7.2 (28276) - http://www.bohemiancoding.com/sketch --> <desc>Created with Sketch.</desc> <defs></defs> <path d='M307.029383,17.7671733 C307.580027,16.8035453 308.510292,16.7750713 309.112023,17.7110976 L315.940802,28.3336435 C316.540368,29.2663017 316.136354,30.0223706 315.026306,30.0223706 L302.026519,30.0223706 C300.921891,30.0223706 300.467923,29.249728 301.023443,28.2775679 L307.029383,17.7671733 Z' id='Triangle-1' stroke='#FFFFFF' stroke-width='2' fill='none' transform='translate(308.502021, 23.524391) rotate(-90.000000) translate(-308.502021, -23.524391) '></path> </svg>",
  cellular: "<svg width='16px' height='16px' viewBox='35 4 16 16' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'> <!-- Generator: Sketch 3.7.2 (28276) - http://www.bohemiancoding.com/sketch --> <desc>Created with Sketch.</desc> <defs></defs> <g id='cellular' stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' transform='translate(35.000000, 4.000000)'> <polygon id='bounds' points='0 0 16 0 16 16 0 16'></polygon> <polygon id='Shape' fill='#000000' points='0 15 14 15 14 1'></polygon> </g> </svg>",
  batteryHigh: "<svg width='9px' height='14px' viewBox='3 1 9 14' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'> <!-- Generator: Sketch 3.7.2 (28276) - http://www.bohemiancoding.com/sketch --> <desc>Created with Sketch.</desc> <defs></defs> <polygon id='Shape' stroke='none' fill='#000000' fill-rule='evenodd' points='9 1.875 9 1 6 1 6 1.875 3 1.875 3 15 12 15 12 1.875'></polygon> </svg>",
  bannerBG: {
    "iphone-5": "<?xml version='1.0' encoding='UTF-8' standalone='no'?> <svg width='320px' height='68px' viewBox='0 0 320 68' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'> <!-- Generator: Sketch 3.6.1 (26313) - http://www.bohemiancoding.com/sketch --> <title>iphone5</title> <desc>Created with Sketch.</desc> <defs></defs> <g id='Page-1' stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0.9'> <g id='iPhone-5/5S/5C' fill='#1A1A1C'> <path d='M0,0 L320,0 L320,68 L0,68 L0,0 Z M142,61.0048815 C142,59.897616 142.896279,59 144.0024,59 L176.9976,59 C178.103495,59 179,59.8938998 179,61.0048815 L179,61.9951185 C179,63.102384 178.103721,64 176.9976,64 L144.0024,64 C142.896505,64 142,63.1061002 142,61.9951185 L142,61.0048815 Z' id='iphone5'></path> </g> </g> </svg>",
    "iphone-6s": "<?xml version='1.0' encoding='UTF-8' standalone='no'?> <svg width='375px' height='68px' viewBox='0 0 375 68' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'> <!-- Generator: Sketch 3.6 (26304) - http://www.bohemiancoding.com/sketch --> <title>Notification background</title> <desc>Created with Sketch.</desc> <defs></defs> <g id='Page-1' stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0.9'> <g id='iOS8-Push-Notification' transform='translate(-58.000000, -23.000000)' fill='#1A1A1C'> <g transform='translate(58.000000, 7.000000)' id='Notification-container'> <g> <path d='M0,16 L375,16 L375,84 L0,84 L0,16 Z M169,77.0048815 C169,75.897616 169.896279,75 171.0024,75 L203.9976,75 C205.103495,75 206,75.8938998 206,77.0048815 L206,77.9951185 C206,79.102384 205.103721,80 203.9976,80 L171.0024,80 C169.896505,80 169,79.1061002 169,77.9951185 L169,77.0048815 Z' id='Notification-background'></path> </g> </g> </g> </g> </svg>",
    "iphone-6s-plus": "<?xml version='1.0' encoding='UTF-8' standalone='no'?> <svg width='414px' height='68px' viewBox='0 0 414 68' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'> <!-- Generator: Sketch 3.6 (26304) - http://www.bohemiancoding.com/sketch --> <title>Notification background Copy</title> <desc>Created with Sketch.</desc> <defs></defs> <g id='Page-1' stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0.9'> <g id='iOS8-Push-Notification' transform='translate(-43.000000, -74.000000)' fill='#1A1A1C'> <g transform='translate(43.000000, 74.000000)' id='Notification-container'> <g> <path d='M0,0 L414,0 L414,68 L0,68 L0,0 Z M189,61.0048815 C189,59.897616 189.896279,59 191.0024,59 L223.9976,59 C225.103495,59 226,59.8938998 226,61.0048815 L226,61.9951185 C226,63.102384 225.103721,64 223.9976,64 L191.0024,64 C189.896505,64 189,63.1061002 189,61.9951185 L189,61.0048815 Z' id='Notification-background-Copy'></path> </g> </g> </g> </g> </svg>",
    "ipad": "<?xml version='1.0' encoding='UTF-8' standalone='no'?> <svg width='768px' height='68px' viewBox='0 0 768 68' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'> <!-- Generator: Sketch 3.6.1 (26313) - http://www.bohemiancoding.com/sketch --> <title>ipad-portrait</title> <desc>Created with Sketch.</desc> <defs></defs> <g id='Page-1' stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0.9'> <g id='iPad-Portrait' fill='#1A1A1C'> <path d='M0,0 L768,0 L768,68 L0,68 L0,0 Z M366,61.0048815 C366,59.897616 366.896279,59 368.0024,59 L400.9976,59 C402.103495,59 403,59.8938998 403,61.0048815 L403,61.9951185 C403,63.102384 402.103721,64 400.9976,64 L368.0024,64 C366.896505,64 366,63.1061002 366,61.9951185 L366,61.0048815 Z' id='ipad-portrait'></path> </g> </g> </svg>",
    "ipad-pro": "<?xml version='1.0' encoding='UTF-8' standalone='no'?> <svg width='1024px' height='68px' viewBox='0 0 1024 68' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'> <!-- Generator: Sketch 3.6.1 (26313) - http://www.bohemiancoding.com/sketch --> <title>ipad-pro-portrait</title> <desc>Created with Sketch.</desc> <defs></defs> <g id='Page-1' stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0.9'> <g id='iPad-Pro-Portrait' fill='#1A1A1C'> <path d='M0,0 L1024,0 L1024,68 L0,68 L0,0 Z M494,61.0048815 C494,59.897616 494.896279,59 496.0024,59 L528.9976,59 C530.103495,59 531,59.8938998 531,61.0048815 L531,61.9951185 C531,63.102384 530.103721,64 528.9976,64 L496.0024,64 C494.896505,64 494,63.1061002 494,61.9951185 L494,61.0048815 Z' id='ipad-pro-portrait'></path> </g> </g> </svg>"
  },
  wifi: "<?xml version='1.0' encoding='UTF-8' standalone='no'?> <svg width='18px' height='14px' viewBox='0 0 18 14' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'> <!-- Generator: Sketch 3.7.2 (28276) - http://www.bohemiancoding.com/sketch --> <title>Shape</title> <desc>Created with Sketch.</desc> <defs></defs> <g id='Material-Design-Symbols' stroke='none' stroke-width='1' fill='none' fill-rule='evenodd'> <g id='Material/Android/Status-bar-content-light' transform='translate(-15.000000, -5.000000)' fill='#000000'> <g id='wifi' transform='translate(14.000000, 4.000000)'> <path d='M19.0226279,4.01593123 C16.5117809,2.12256382 13.3869849,1 10,1 C6.61301513,1 3.48821908,2.12256382 0.977372085,4.01593123 L10,15 L19.0226279,4.01593123 Z' id='Shape'></path> </g> </g> </g> </svg>",
  signalHigh: "<svg width='14px' height='14px' viewBox='0 1 14 14' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'> <!-- Generator: Sketch 3.7.2 (28276) - http://www.bohemiancoding.com/sketch --> <desc>Created with Sketch.</desc> <defs></defs> <polygon id='Shape' stroke='none' fill='#FFFFFF' fill-rule='evenodd' points='0 15 14 15 14 1'></polygon> </svg>",
  activity: "<?xml version='1.0' encoding='UTF-8' standalone='no'?> <svg width='16px' height='16px' viewBox='0 0 16 16' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' xmlns:sketch='http://www.bohemiancoding.com/sketch/ns'> <!-- Generator: Sketch 3.5.2 (25235) - http://www.bohemiancoding.com/sketch --> <title>Soccer Ball</title> <desc>Created with Sketch.</desc> <defs> <circle id='path-1' cx='8' cy='8' r='8'></circle> </defs> <g id='Page-1' stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' sketch:type='MSPage'> <g id='iPhone-6' sketch:type='MSArtboardGroup' transform='translate(-179.000000, -639.000000)'> <g id='Soccer-Ball' sketch:type='MSLayerGroup' transform='translate(179.000000, 639.000000)'> <mask id='mask-2' sketch:name='Mask' fill='white'> <use xlink:href='#path-1'></use> </mask> <use id='Mask' stroke='#4A5361' sketch:type='MSShapeGroup' xlink:href='#path-1'></use> <path d='M6,12.1203046 L12.8573384,8 L13.3723765,8.8571673 L6.51503807,12.9774719 L6,12.1203046 L6,12.1203046 Z' id='Rectangle-47' fill='#4A5361' sketch:type='MSShapeGroup' mask='url(#mask-2)'></path> <path d='M11.849648,8.7260551 L19.1001103,5.34510901 L19.5227285,6.2514168 L12.2722662,9.63236289 L11.849648,8.7260551 L11.849648,8.7260551 Z' id='Rectangle-47-Copy-3' fill='#4A5361' sketch:type='MSShapeGroup' mask='url(#mask-2)'></path> <path d='M6,3.1203046 L12.8573384,-1 L13.3723765,-0.142832699 L6.51503807,3.9774719 L6,3.1203046 L6,3.1203046 Z' id='Rectangle-47-Copy-2' fill='#4A5361' sketch:type='MSShapeGroup' mask='url(#mask-2)'></path> <path d='M-1,7.1203046 L5.85733841,3 L6.37237648,3.8571673 L-0.484961925,7.9774719 L-1,7.1203046 L-1,7.1203046 Z' id='Rectangle-47-Copy-4' fill='#4A5361' sketch:type='MSShapeGroup' mask='url(#mask-2)'></path> <rect id='Rectangle-50' fill='#4A5361' sketch:type='MSShapeGroup' mask='url(#mask-2)' x='4' y='6' width='1' height='5'></rect> <rect id='Rectangle-51' fill='#4A5361' sketch:type='MSShapeGroup' mask='url(#mask-2)' x='11.5' y='3' width='1' height='12'></rect> <path d='M5,4.8571673 L11.8573384,8.9774719 L12.3723765,8.1203046 L5.51503807,4 L5,4.8571673' id='Rectangle-47-Copy' fill='#4A5361' sketch:type='MSShapeGroup' mask='url(#mask-2)'></path> <path d='M5,12.8571673 L11.8573384,16.9774719 L12.3723765,16.1203046 L5.51503807,12 L5,12.8571673' id='Rectangle-47-Copy-5' fill='#4A5361' sketch:type='MSShapeGroup' mask='url(#mask-2)'></path> <path d='M11.9048972,6.14766064 L13.8714227,8.33170849 L12.4019596,10.8768933 L9.52725589,10.2658562 L9.22005445,7.34302965 L11.9048972,6.14766064' id='Polygon-1' fill='#D8D8D8' sketch:type='MSShapeGroup' mask='url(#mask-2)'></path> <path d='M11.9048972,6.14766064 L13.8714227,8.33170849 L12.4019596,10.8768933 L9.52725589,10.2658562 L9.22005445,7.34302965 L11.9048972,6.14766064' id='Polygon-1-Copy' fill='#4A5361' sketch:type='MSShapeGroup' mask='url(#mask-2)'></path> <path d='M7.45771189,3.19504739 L7.35514484,6.13218333 L4.5300676,6.9422612 L2.88664089,4.5057809 L4.69602457,2.18987541 L7.45771189,3.19504739' id='Polygon-1-Copy-2' fill='#4A5361' sketch:type='MSShapeGroup' mask='url(#mask-2)'></path> <path d='M7.45771189,11.1950474 L7.35514484,14.1321833 L4.5300676,14.9422612 L2.88664089,12.5057809 L4.69602457,10.1898754 L7.45771189,11.1950474' id='Polygon-1-Copy-3' fill='#4A5361' sketch:type='MSShapeGroup' mask='url(#mask-2)'></path> <path d='M14.5431701,0.0725939314 L14.4406031,3.00972988 L11.6155258,3.81980774 L9.97209912,1.38332745 L11.7814828,-0.93257805 L14.5431701,0.0725939314' id='Polygon-1-Copy-4' fill='#4A5361' sketch:type='MSShapeGroup' mask='url(#mask-2)'></path> </g> </g> </g> </svg>",
  animals: "<?xml version='1.0' encoding='UTF-8' standalone='no'?> <svg width='17px' height='16px' viewBox='0 0 17 17' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' xmlns:sketch='http://www.bohemiancoding.com/sketch/ns'> <!-- Generator: Sketch 3.5.2 (25235) - http://www.bohemiancoding.com/sketch --> <title>Group</title> <desc>Created with Sketch.</desc> <defs></defs> <g id='Page-1' stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' sketch:type='MSPage'> <g id='iPhone-6' sketch:type='MSArtboardGroup' transform='translate(-117.000000, -639.000000)' stroke='#4A5361'> <g id='ic_Food' sketch:type='MSLayerGroup' transform='translate(118.000000, 640.000000)'> <g id='Group' sketch:type='MSShapeGroup'> <path d='M5.68377537,1.38156646 C6.23926066,1.13624 6.85372005,1 7.5,1 C8.14627995,1 8.76073934,1.13624 9.31622463,1.38156646 C9.80879275,0.562359019 10.8255888,0 12,0 C13.6568542,0 15,1.11928813 15,2.5 C15,3.5571398 14.2126246,4.46102843 13.0999226,4.82662514 C14.2496528,5.64185422 15,6.98330062 15,8.5 C15,10.7167144 13.3971873,12.5590719 11.2872671,12.9313673 C10.4867248,14.1757703 9.08961696,15 7.5,15 C5.91038304,15 4.51327524,14.1757703 3.71273291,12.9313673 C1.60281268,12.5590719 0,10.7167144 0,8.5 C0,6.98330062 0.750347244,5.64185422 1.90007741,4.82662514 C0.787375445,4.46102843 0,3.5571398 0,2.5 C0,1.11928813 1.34314575,0 3,0 C4.17441122,0 5.19120725,0.562359019 5.68377537,1.38156646 Z' id='Oval-8'></path> <path d='M5.73834228,12 C5.86290979,12 6.14642353,12 6.14642353,12 C6.14642353,12 6.43215696,12.4426123 6.5246582,12.4919739 C6.66455601,12.5666277 7,12.4919739 7,12.4919739 L7,12 L8,12 L8,12.4919739 L8.49799228,12.4919739 L8.84301769,12 L9.3918457,12 C9.3918457,12 8.99598457,12.9839478 8.49799228,12.9839478 L6.60702407,12.9839478 C6.21404813,12.9839478 5.45996094,12 5.73834228,12 Z' id='Rectangle-44-Copy-2'></path> <circle id='Oval-14' cx='10.5' cy='7.5' r='0.5'></circle> <circle id='Oval-14-Copy' cx='4.5' cy='7.5' r='0.5'></circle> <path d='M12.6999969,5 C12.6999969,3.06700338 11.1329936,1.5 9.19999695,1.5' id='Oval-16'></path> <path d='M5.5,5 C5.5,3.06700338 3.93299662,1.5 2,1.5' id='Oval-16-Copy' transform='translate(3.750000, 3.250000) scale(-1, 1) translate(-3.750000, -3.250000) '></path> <rect id='Rectangle-44-Copy' x='7' y='11' width='1' height='1'></rect> <path d='M6,10 L6.5,10 L6.49999999,9.5 L8.50000005,9.5 L8.50000005,10 L9,10 L9,10.5 L8.5,10.5 L8.5,11 L6.5,11 L6.5,10.5 L6,10.5 L6,10 Z' id='Path'></path> </g> </g> </g> </g> </svg>",
  chevron: "<?xml version='1.0' encoding='UTF-8' standalone='no'?> <svg width='13px' height='22px' viewBox='0 0 13 22' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'> <!-- Generator: Sketch 3.6.1 (26313) - http://www.bohemiancoding.com/sketch --> <title>Back Chevron</title> <desc>Created with Sketch.</desc> <defs></defs> <g id='Page-1' stroke='none' stroke-width='1' fill='none' fill-rule='evenodd'> <g id='Navigation-Bar/Back' transform='translate(-8.000000, -31.000000)' fill='#0076FF'> <path d='M8.5,42 L19,31.5 L21,33.5 L12.5,42 L21,50.5 L19,52.5 L8.5,42 Z' id='Back-Chevron'></path> </g> </g> </svg>",
  emoji: "<?xml version='1.0' encoding='UTF-8' standalone='no'?> <svg width='20px' height='20px' viewBox='0 0 20 20' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' xmlns:sketch='http://www.bohemiancoding.com/sketch/ns'> <!-- Generator: Sketch 3.5.2 (25235) - http://www.bohemiancoding.com/sketch --> <title>Emoji</title> <desc>Created with Sketch.</desc> <defs></defs> <g id='Page-1' stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' sketch:type='MSPage'> <g id='Keyboard/Light/Lower' sketch:type='MSLayerGroup' transform='translate(-60.000000, -181.000000)' fill='#030303'> <g id='Bottom-Row' transform='translate(3.000000, 170.000000)' sketch:type='MSShapeGroup'> <path d='M66.75,30.5 C72.1347763,30.5 76.5,26.1347763 76.5,20.75 C76.5,15.3652237 72.1347763,11 66.75,11 C61.3652237,11 57,15.3652237 57,20.75 C57,26.1347763 61.3652237,30.5 66.75,30.5 Z M66.75,29.5 C71.5824916,29.5 75.5,25.5824916 75.5,20.75 C75.5,15.9175084 71.5824916,12 66.75,12 C61.9175084,12 58,15.9175084 58,20.75 C58,25.5824916 61.9175084,29.5 66.75,29.5 Z M63.75,19 C64.4403559,19 65,18.4403559 65,17.75 C65,17.0596441 64.4403559,16.5 63.75,16.5 C63.0596441,16.5 62.5,17.0596441 62.5,17.75 C62.5,18.4403559 63.0596441,19 63.75,19 Z M69.75,19 C70.4403559,19 71,18.4403559 71,17.75 C71,17.0596441 70.4403559,16.5 69.75,16.5 C69.0596441,16.5 68.5,17.0596441 68.5,17.75 C68.5,18.4403559 69.0596441,19 69.75,19 Z M59.8876334,22.1641444 C59.6390316,21.383134 60.065918,20.9785156 60.8530951,21.2329304 C60.8530951,21.2329304 63.0937503,22.2125 66.7500001,22.2125 C70.4062499,22.2125 72.6469047,21.2329304 72.6469047,21.2329304 C73.4287162,20.9662153 73.8812463,21.4044097 73.6058477,22.1807437 C73.6058477,22.1807437 72.6,27.575 66.75,27.575 C60.9,27.575 59.8876334,22.1641444 59.8876334,22.1641444 Z M66.75,23.1875 C64.06875,23.1875 61.8544055,22.4737821 61.8544055,22.4737821 C61.3273019,22.32948 61.1781233,22.5721615 61.5639555,22.957075 C61.5639555,22.957075 62.3625,24.65 66.75,24.65 C71.1375,24.65 71.9508503,22.9438304 71.9508503,22.9438304 C72.3093659,22.5399278 72.1690793,22.3359844 71.6354273,22.476349 C71.6354273,22.476349 69.43125,23.1875 66.75,23.1875 Z' id='Emoji'></path> </g> </g> </g> </svg>",
  "delete": {
    on: "<?xml version='1.0' encoding='UTF-8' standalone='no'?> <svg width='24px' height='18px' viewBox='0 0 24 18' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' xmlns:sketch='http://www.bohemiancoding.com/sketch/ns'> <!-- Generator: Sketch 3.5.2 (25235) - http://www.bohemiancoding.com/sketch --> <title>Back</title> <desc>Created with Sketch.</desc> <defs></defs> <g id='Page-1' stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' sketch:type='MSPage'> <g id='Keyboard/Light/Upper' sketch:type='MSLayerGroup' transform='translate(-339.000000, -130.000000)' fill='#030303'> <g id='Third-Row' transform='translate(3.000000, 118.000000)' sketch:type='MSShapeGroup'> <path d='M351.642663,20.9776903 L354.466795,18.1535585 C354.760106,17.8602476 354.763983,17.3814962 354.47109,17.088603 C354.176155,16.7936677 353.7014,16.7976328 353.406135,17.0928983 L350.582003,19.9170301 L347.757871,17.0928983 C347.46456,16.7995874 346.985809,16.7957097 346.692916,17.088603 C346.39798,17.3835382 346.401945,17.858293 346.697211,18.1535585 L349.521343,20.9776903 L346.697211,23.801822 C346.4039,24.0951329 346.400022,24.5738843 346.692916,24.8667776 C346.987851,25.1617128 347.462606,25.1577477 347.757871,24.8624822 L350.582003,22.0383504 L353.406135,24.8624822 C353.699445,25.1557931 354.178197,25.1596708 354.47109,24.8667776 C354.766025,24.5718423 354.76206,24.0970875 354.466795,23.801822 L351.642663,20.9776903 Z M337.059345,22.0593445 C336.474285,21.4742847 336.481351,20.5186489 337.059345,19.9406555 L343.789915,13.2100853 C344.182084,12.817916 344.94892,12.5 345.507484,12.5 L356.002098,12.5 C357.933936,12.5 359.5,14.0688477 359.5,16.0017983 L359.5,25.9982017 C359.5,27.9321915 357.923088,29.5 356.002098,29.5 L345.507484,29.5 C344.951066,29.5 344.177169,29.1771693 343.789915,28.7899148 L337.059345,22.0593445 Z' id='Back'></path> </g> </g> </g> </svg>",
    off: "<?xml version='1.0' encoding='UTF-8' standalone='no'?> <svg width='24px' height='18px' viewBox='0 0 24 18' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' xmlns:sketch='http://www.bohemiancoding.com/sketch/ns'> <!-- Generator: Sketch 3.5.2 (25235) - http://www.bohemiancoding.com/sketch --> <title>Back</title> <desc>Created with Sketch.</desc> <defs></defs> <g id='Page-1' stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' sketch:type='MSPage'> <g id='Keyboard/Light/Upper' sketch:type='MSLayerGroup' transform='translate(-339.000000, -130.000000)' fill='#030303'> <g id='Third-Row' transform='translate(3.000000, 118.000000)' sketch:type='MSShapeGroup'> <path d='M337.059345,22.0593445 C336.474285,21.4742847 336.481351,20.5186489 337.059345,19.9406555 L343.789915,13.2100853 C344.182084,12.817916 344.94892,12.5 345.507484,12.5 L356.002098,12.5 C357.933936,12.5 359.5,14.0688477 359.5,16.0017983 L359.5,25.9982017 C359.5,27.9321915 357.923088,29.5 356.002098,29.5 L345.507484,29.5 C344.951066,29.5 344.177169,29.1771693 343.789915,28.7899148 L337.059345,22.0593445 Z M351.642663,20.9776903 L354.466795,18.1535585 C354.760106,17.8602476 354.763983,17.3814962 354.47109,17.088603 C354.176155,16.7936677 353.7014,16.7976328 353.406135,17.0928983 L350.582003,19.9170301 L347.757871,17.0928983 C347.46456,16.7995874 346.985809,16.7957097 346.692916,17.088603 C346.39798,17.3835382 346.401945,17.858293 346.697211,18.1535585 L349.521343,20.9776903 L346.697211,23.801822 C346.4039,24.0951329 346.400022,24.5738843 346.692916,24.8667776 C346.987851,25.1617128 347.462606,25.1577477 347.757871,24.8624822 L350.582003,22.0383504 L353.406135,24.8624822 C353.699445,25.1557931 354.178197,25.1596708 354.47109,24.8667776 C354.766025,24.5718423 354.76206,24.0970875 354.466795,23.801822 L351.642663,20.9776903 Z M338.70972,21.7097195 C338.317752,21.3177522 338.318965,20.6810349 338.70972,20.2902805 L344.643245,14.3567547 C344.840276,14.1597245 345.225639,14 345.493741,14 L355.997239,14 C357.103333,14 357.999999,14.8970601 357.999999,16.0058586 L357.999999,25.9941412 C357.999999,27.1019464 357.106457,27.9999999 355.997239,27.9999999 L345.493741,28 C345.221056,28 344.840643,27.8406431 344.643246,27.6432453 L338.70972,21.7097195 Z' id='Back'></path> </g> </g> </g> </svg>"
  },
  food: "<?xml version='1.0' encoding='UTF-8' standalone='no'?> <svg width='17px' height='16px' viewBox='0 0 17 17' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' xmlns:sketch='http://www.bohemiancoding.com/sketch/ns'> <!-- Generator: Sketch 3.5.2 (25235) - http://www.bohemiancoding.com/sketch --> <title>Food</title> <desc>Created with Sketch.</desc> <defs></defs> <g id='iOS-9-Keyboards' stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' sketch:type='MSPage'> <g id='iPhone-6-Portrait-Light-Copy' sketch:type='MSArtboardGroup' transform='translate(-148.000000, -637.000000)'> <g id='Keyboards' sketch:type='MSLayerGroup' transform='translate(0.000000, 408.000000)'> <g id='Food' transform='translate(149.500000, 229.500000)' sketch:type='MSShapeGroup'> <path d='M5.5,15.5 L1,15.5 L0,5 L6.5,5 L6.26360933,7.48210202' id='Drink' stroke='#4A5461'></path> <path d='M6.01077545,1.96930098 L6.51571352,5.22270539 L5.71908184,5.67947812 L5.0389009,1.96930098 L4.85557247,1.96930098 L4.85557247,0.96930098 L8.85557247,0.96930098 L8.85557247,1.96930098 L6.01077545,1.96930098 Z' id='Straw' fill='#4A5461' transform='translate(6.855572, 3.324390) rotate(24.000000) translate(-6.855572, -3.324390) '></path> <rect id='Bottom-Bun' stroke='#4A5461' x='3' y='14' width='10.5' height='1.5' rx='1'></rect> <path d='M1.5,12.5024408 C1.5,11.948808 1.94916916,11.5 2.49268723,11.5 L14.0073128,11.5 C14.5555588,11.5 15,11.9469499 15,12.5024408 L15,12.9975592 C15,13.551192 14.5508308,14 14.0073128,14 L2.49268723,14 C1.94444121,14 1.5,13.5530501 1.5,12.9975592 L1.5,12.5024408 Z M3.93300003,11.8392727 C3.41771834,11.6518976 3.44483697,11.5 3.9955775,11.5 L13.0044225,11.5 C13.5542648,11.5 13.5866061,11.6503251 13.067,11.8392727 L8.5,13.5 L3.93300003,11.8392727 Z' id='&quot;Patty&quot;' fill='#4A5461'></path> <path d='M2.5,10.5 L13.5,10.5 L15,11.5 L1,11.5 L2.5,10.5 Z' id='Cheese' fill='#4A5461'></path> <path d='M8.25,10.5 C11.4256373,10.5 14,10.3284271 14,9.5 C14,8.67157288 11.4256373,8 8.25,8 C5.07436269,8 2.5,8.67157288 2.5,9.5 C2.5,10.3284271 5.07436269,10.5 8.25,10.5 Z' id='Top-Bun' stroke='#4A5461' stroke-width='0.75'></path> </g> </g> </g> </g> </svg>",
  flags: "<?xml version='1.0' encoding='UTF-8' standalone='no'?> <svg width='11px' height='15px' viewBox='0 0 11 15' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' xmlns:sketch='http://www.bohemiancoding.com/sketch/ns'> <!-- Generator: Sketch 3.5.2 (25235) - http://www.bohemiancoding.com/sketch --> <title>Flag</title> <desc>Created with Sketch.</desc> <defs></defs> <g id='iOS-9-Keyboards' stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' sketch:type='MSPage'> <g id='iPhone-6-Portrait-Light-Copy' sketch:type='MSArtboardGroup' transform='translate(-275.000000, -639.000000)'> <g id='Keyboards' sketch:type='MSLayerGroup' transform='translate(0.000000, 408.000000)'> <g id='Flag' transform='translate(275.000000, 231.500000)' sketch:type='MSShapeGroup'> <rect id='Pole' fill='#4A5461' x='0' y='0' width='1' height='14'></rect> <path d='M1,1 C1,1 1.25,2 3.5,2 C5.75,2 6,0.749999998 8,0.75 C10,0.749999998 10,1.5 10,1.5 L10,7.5 C10,7.5 10,6.5 8,6.5 C6,6.5 4.80623911,8 3.5,8 C2.19376089,8 1,7 1,7 L1,1 Z' stroke='#4A5461' stroke-linejoin='round'></path> </g> </g> </g> </g> </svg>",
  frequent: "<?xml version='1.0' encoding='UTF-8' standalone='no'?> <svg width='17px' height='16px' viewBox='0 0 17 16' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' xmlns:sketch='http://www.bohemiancoding.com/sketch/ns'> <!-- Generator: Sketch 3.5.2 (25235) - http://www.bohemiancoding.com/sketch --> <title>Recent</title> <desc>Created with Sketch.</desc> <defs></defs> <g id='iOS-9-Keyboards' stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' sketch:type='MSPage'> <g id='iPhone-6-Portrait-Light-Copy' sketch:type='MSArtboardGroup' transform='translate(-55.000000, -638.000000)'> <g id='Keyboards' sketch:type='MSLayerGroup' transform='translate(0.000000, 408.000000)'> <g id='Recent' transform='translate(55.500000, 230.000000)' sketch:type='MSShapeGroup'> <circle id='Body' stroke='#4A5461' cx='8' cy='8' r='8'></circle> <path d='M7.5,7.5 L7.5,8.5 L8.5,8.5 L8.5,2 L7.5,2 L7.5,7.5 L4,7.5 L4,8.5 L8.5,8.5 L8.5,7.5 L7.5,7.5 Z' id='Hands' fill='#4A5461'></path> </g> </g> </g> </g> </svg>",
  keyboard: "<?xml version='1.0' encoding='UTF-8' standalone='no'?> <svg width='32.5px' height='23.5px' viewBox='0 0 65 47' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'> <!-- Generator: Sketch 3.6.1 (26313) - http://www.bohemiancoding.com/sketch --> <title>Shape</title> <desc>Created with Sketch.</desc> <defs></defs> <g id='Page-1' stroke='none' stroke-width='1' fill='none' fill-rule='evenodd'> <g id='iPad-Portrait' transform='translate(-1436.000000, -1956.000000)' fill='#000000'> <g id='Keyboard-Light' transform='translate(0.000000, 1422.000000)'> <g id='Keyboard-down' transform='translate(1412.000000, 500.000000)'> <path d='M87.001332,34 C88.1051659,34 89,34.8997127 89,35.9932874 L89,61.0067126 C89,62.1075748 88.1058759,63 87.001332,63 L25.998668,63 C24.8948341,63 24,62.1002873 24,61.0067126 L24,35.9932874 C24,34.8924252 24.8941241,34 25.998668,34 L87.001332,34 Z M26,36 L26,61 L87,61 L87,36 L26,36 Z M79,40 L83,40 L83,44 L79,44 L79,40 Z M72,40 L76,40 L76,44 L72,44 L72,40 Z M65,40 L69,40 L69,44 L65,44 L65,40 Z M58,40 L62,40 L62,44 L58,44 L58,40 Z M51,40 L55,40 L55,44 L51,44 L51,40 Z M44,40 L48,40 L48,44 L44,44 L44,40 Z M37,40 L41,40 L41,44 L37,44 L37,40 Z M30,40 L34,40 L34,44 L30,44 L30,40 Z M79,47 L83,47 L83,51 L79,51 L79,47 Z M72,47 L76,47 L76,51 L72,51 L72,47 Z M65,47 L69,47 L69,51 L65,51 L65,47 Z M58,47 L62,47 L62,51 L58,51 L58,47 Z M51,47 L55,47 L55,51 L51,51 L51,47 Z M44,47 L48,47 L48,51 L44,51 L44,47 Z M37,47 L41,47 L41,51 L37,51 L37,47 Z M30,47 L34,47 L34,51 L30,51 L30,47 Z M79,54 L83,54 L83,58 L79,58 L79,54 Z M72,54 L76,54 L76,58 L72,58 L72,54 Z M44,54 L69,54 L69,58 L44,58 L44,54 Z M37,54 L41,54 L41,58 L37,58 L37,54 Z M30,54 L34,54 L34,58 L30,58 L30,54 Z M44.3163498,69.9771047 C43.3684225,70.5420342 43.3338721,71.5096495 44.2378217,72.1373912 L55.3621539,79.8626088 C56.2667113,80.4907726 57.7338965,80.4903505 58.6378461,79.8626088 L69.7621783,72.1373912 C70.6667357,71.5092274 70.648012,70.5205204 69.7115187,69.9234166 L69.9825731,70.0962396 C69.5181333,69.800115 68.7782557,69.8126493 68.3261307,70.1269323 L57.8154999,77.4331263 C57.3651117,77.746202 56.628165,77.7381786 56.1762103,77.4199424 L45.8386137,70.1408977 C45.3836472,69.8205407 44.6375039,69.7857088 44.1566393,70.0722862 L44.3163498,69.9771047 Z' id='Shape'></path> </g> </g> </g> </g> </svg>",
  keyPopUp: {
    "iphone-5": "<svg width='55px' height='92px' viewBox='53 316 55 92' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'> <!-- Generator: Sketch 3.7.2 (28276) - http://www.bohemiancoding.com/sketch --> <desc>Created with Sketch.</desc> <defs> <filter x='-50%' y='-50%' width='200%' height='200%' filterUnits='objectBoundingBox' id='filter-1'> <feOffset dx='0' dy='1' in='SourceAlpha' result='shadowOffsetOuter1'></feOffset> <feGaussianBlur stdDeviation='1.5' in='shadowOffsetOuter1' result='shadowBlurOuter1'></feGaussianBlur> <feColorMatrix values='0 0 0 0 0   0 0 0 0 0   0 0 0 0 0  0 0 0 0.4 0' type='matrix' in='shadowBlurOuter1' result='shadowMatrixOuter1'></feColorMatrix> <feMerge> <feMergeNode in='shadowMatrixOuter1'></feMergeNode> <feMergeNode in='SourceGraphic'></feMergeNode> </feMerge> </filter> <path d='M1.34173231,40.9391701 C0.517466128,40.20589 0,39.1374251 0,37.9477635 L0,4.00345598 C0,1.78917136 1.79528248,0 4.00987566,0 L44.9901243,0 C47.2125608,0 49,1.7924083 49,4.00345598 L49,37.9477635 C49,38.9124051 48.6592798,39.7963659 48.0916041,40.4868665 C48.0414233,40.9032289 47.7111888,41.4074672 47.0825908,41.95225 C47.0825908,41.95225 38.5299145,49.0643362 38.5299145,51.1526424 C38.5299145,61.6497561 38.1770099,82.0025406 38.1770099,82.0025406 C38.1412304,84.2024354 36.3210284,86 34.1128495,86 L15.3059539,86 C13.10796,86 11.2781884,84.2100789 11.2417936,82.0020993 C11.2417936,82.0020993 10.8888889,61.6470852 10.8888889,51.1486361 C10.8888889,49.0616654 2.34143662,42.238655 2.34143662,42.238655 C1.77827311,41.7641365 1.44881354,41.3204237 1.34173231,40.9391701 Z' id='path-2'></path> <mask id='mask-3' maskContentUnits='userSpaceOnUse' maskUnits='objectBoundingBox' x='0' y='0' width='49' height='86' fill='white'> <use xlink:href='#path-2'></use> </mask> </defs> <g id='Popover' filter='url(#filter-1)' stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' transform='translate(56.000000, 318.000000)'> <use id='Rectangle-14' stroke='#B2B4B9' mask='url(#mask-3)' fill='#FCFCFC' xlink:href='#path-2'></use> </g> </svg>",
    "iphone-6s": "<svg width='64px' height='107px' viewBox='24 387 64 107' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'> <!-- Generator: Sketch 3.7.2 (28276) - http://www.bohemiancoding.com/sketch --> <desc>Created with Sketch.</desc> <defs> <filter x='-50%' y='-50%' width='200%' height='200%' filterUnits='objectBoundingBox' id='filter-1'> <feOffset dx='0' dy='1' in='SourceAlpha' result='shadowOffsetOuter1'></feOffset> <feGaussianBlur stdDeviation='1.5' in='shadowOffsetOuter1' result='shadowBlurOuter1'></feGaussianBlur> <feColorMatrix values='0 0 0 0 0   0 0 0 0 0   0 0 0 0 0  0 0 0 0.4 0' type='matrix' in='shadowBlurOuter1' result='shadowMatrixOuter1'></feColorMatrix> <feMerge> <feMergeNode in='shadowMatrixOuter1'></feMergeNode> <feMergeNode in='SourceGraphic'></feMergeNode> </feMerge> </filter> <path d='M1.48647646,48.3779947 C0.58026649,47.6464296 0,46.529587 0,45.2781948 L0,3.99009787 C0,1.7825912 1.79509577,0 4.00945862,0 L53.9905414,0 C56.2005746,0 58,1.78642767 58,3.99009787 L58,45.2781948 C58,46.1833004 57.6982258,47.0169733 57.1895097,47.6856325 C57.0396865,48.0212497 56.7360098,48.3972834 56.2718363,48.7950661 C56.2718363,48.7950661 45.6068376,57.6220693 45.6068376,60.0746149 C45.6068376,72.4026205 45.177967,96.9923164 45.177967,96.9923164 C45.1413748,99.2122214 43.3193065,101 41.1090035,101 L17.386723,101 C15.1812722,101 13.354683,99.2055009 13.3177595,96.9918741 C13.3177595,96.9918741 12.8888889,72.3994838 12.8888889,60.0699099 C12.8888889,57.6189326 2.22673437,49.1462936 2.22673437,49.1462936 C1.90524087,48.8788327 1.65911655,48.620733 1.48647646,48.3779947 Z' id='path-2'></path> <mask id='mask-3' maskContentUnits='userSpaceOnUse' maskUnits='objectBoundingBox' x='0' y='0' width='58' height='101' fill='white'> <use xlink:href='#path-2'></use> </mask> </defs> <g id='Popover' filter='url(#filter-1)' stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' transform='translate(27.000000, 389.000000)'> <use id='Rectangle-14' stroke='#B2B4B9' mask='url(#mask-3)' fill='#FCFCFC' xlink:href='#path-2'></use> </g> </svg>",
    "iphone-6s-plus": "<svg width='70px' height='119px' viewBox='28 450 70 119' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'> <!-- Generator: Sketch 3.7.2 (28276) - http://www.bohemiancoding.com/sketch --> <desc>Created with Sketch.</desc> <defs> <filter x='-50%' y='-50%' width='200%' height='200%' filterUnits='objectBoundingBox' id='filter-1'> <feOffset dx='0' dy='1' in='SourceAlpha' result='shadowOffsetOuter1'></feOffset> <feGaussianBlur stdDeviation='1.5' in='shadowOffsetOuter1' result='shadowBlurOuter1'></feGaussianBlur> <feColorMatrix values='0 0 0 0 0   0 0 0 0 0   0 0 0 0 0  0 0 0 0.4 0' type='matrix' in='shadowBlurOuter1' result='shadowMatrixOuter1'></feColorMatrix> <feMerge> <feMergeNode in='shadowMatrixOuter1'></feMergeNode> <feMergeNode in='SourceGraphic'></feMergeNode> </feMerge> </filter> <path d='M1.95729395,54.0728304 C0.785911132,53.3757699 0,52.098776 0,50.6389022 L0,3.99524419 C0,1.78671428 1.79242202,0 4.00348663,0 L59.9965134,0 C62.2046235,0 64,1.78873175 64,3.99524419 L64,50.6389022 C64,51.9233686 63.3937116,53.0651556 62.451391,53.795754 C62.4427752,53.8032433 62.4341019,53.8107404 62.4253709,53.8182454 C62.4253709,53.8182454 50.3247863,63.8977402 50.3247863,66.6173947 C50.3247863,80.2880544 49.8443049,108.002007 49.8443049,108.002007 C49.8079665,110.210234 47.9874232,112 45.7789089,112 L18.7680997,112 C16.5534397,112 14.7394456,110.20984 14.7027037,108.001566 C14.7027037,108.001566 14.2222222,80.2845761 14.2222222,66.6121773 C14.2222222,63.8942619 2.14081422,54.2321337 2.14081422,54.2321337 C2.07664913,54.1786298 2.01548111,54.1255134 1.95729395,54.0728304 Z' id='path-2'></path> <mask id='mask-3' maskContentUnits='userSpaceOnUse' maskUnits='objectBoundingBox' x='0' y='0' width='64' height='112' fill='white'> <use xlink:href='#path-2'></use> </mask> </defs> <g id='Popover' filter='url(#filter-1)' stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' transform='translate(31.000000, 452.000000)'> <use id='Rectangle-14' stroke='#B2B4B9' mask='url(#mask-3)' fill='#FCFCFC' xlink:href='#path-2'></use> </g> </svg>"
  },
  objects: "<?xml version='1.0' encoding='UTF-8' standalone='no'?> <svg width='11px' height='16px' viewBox='0 0 11 16' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' xmlns:sketch='http://www.bohemiancoding.com/sketch/ns'> <!-- Generator: Sketch 3.5.2 (25235) - http://www.bohemiancoding.com/sketch --> <title>Lightbulb</title> <desc>Created with Sketch.</desc> <defs></defs> <g id='Page-1' stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' sketch:type='MSPage'> <g id='iPhone-6' sketch:type='MSArtboardGroup' transform='translate(-244.000000, -639.000000)' stroke='#4A5361'> <g id='Lightbulb' sketch:type='MSLayerGroup' transform='translate(244.000000, 639.000000)'> <path d='M8,10.4002904 C9.78083795,9.48993491 11,7.63734273 11,5.5 C11,2.46243388 8.53756612,0 5.5,0 C2.46243388,0 0,2.46243388 0,5.5 C0,7.63734273 1.21916205,9.48993491 3,10.4002904 L3,14.0020869 C3,15.1017394 3.89761602,16 5.0048815,16 L5.9951185,16 C7.1061002,16 8,15.1055038 8,14.0020869 L8,10.4002904 Z' id='Oval-17' sketch:type='MSShapeGroup'></path> <rect id='Rectangle-50' sketch:type='MSShapeGroup' x='3' y='12' width='5' height='1'></rect> <rect id='Rectangle-51' sketch:type='MSShapeGroup' x='4' y='13.5' width='1.5' height='1'></rect> <path d='M5,8.5 C5,8.5 3.49999999,7.50000001 4,7 C4.50000001,6.49999999 5,7.66666667 5.5,8 C5.5,8 6.5,6.50000001 7,7 C7.5,7.49999999 6,8.5 6,8.5 L6,11 L5,11 L5,8.5 Z' id='Rectangle-52' sketch:type='MSShapeGroup'></path> </g> </g> </g> </svg>",
  shift: {
    on: "<?xml version='1.0' encoding='UTF-8' standalone='no'?> <svg width='20px' height='18px' viewBox='0 0 20 17' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' xmlns:sketch='http://www.bohemiancoding.com/sketch/ns'> <!-- Generator: Sketch 3.5.2 (25235) - http://www.bohemiancoding.com/sketch --> <title>Shift</title> <desc>Created with Sketch.</desc> <defs></defs> <g id='Page-1' stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' sketch:type='MSPage'> <g id='Keyboard/Light/Upper' sketch:type='MSLayerGroup' transform='translate(-14.000000, -130.000000)' fill='#030303'> <g id='Third-Row' transform='translate(3.000000, 118.000000)' sketch:type='MSShapeGroup'> <path d='M21.7052388,13.2052388 C21.3157462,12.8157462 20.6857559,12.8142441 20.2947612,13.2052388 L11.9160767,21.5839233 C11.1339991,22.3660009 11.3982606,23 12.4979131,23 L16.5,23 L16.5,28.009222 C16.5,28.5564136 16.9463114,29 17.4975446,29 L24.5024554,29 C25.053384,29 25.5,28.5490248 25.5,28.009222 L25.5,23 L29.5020869,23 C30.6055038,23 30.866824,22.366824 30.0839233,21.5839233 L21.7052388,13.2052388 Z' id='Shift'></path> </g> </g> </g> </svg>",
    off: "<?xml version='1.0' encoding='UTF-8' standalone='no'?> <svg width='20px' height='18px' viewBox='0 0 20 19' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' xmlns:sketch='http://www.bohemiancoding.com/sketch/ns'> <!-- Generator: Sketch 3.5.2 (25235) - http://www.bohemiancoding.com/sketch --> <title>Shift</title> <desc>Created with Sketch.</desc> <defs></defs> <g id='Page-1' stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' sketch:type='MSPage'> <g id='Keyboard/Light/Lower' sketch:type='MSLayerGroup' transform='translate(-14.000000, -129.000000)' fill='#030303'> <g id='Third-Row' transform='translate(3.000000, 118.000000)' sketch:type='MSShapeGroup'> <path d='M21.6719008,12.2325898 C21.301032,11.8279916 20.6946892,11.8334731 20.3288195,12.2325898 L11.6947023,21.6512983 C10.7587441,22.672308 11.1285541,23.5 12.5097751,23.5 L15.9999999,23.5000002 L15.9999999,28.0014241 C15.9999999,28.8290648 16.6716559,29.5000001 17.497101,29.5000001 L24.5028992,29.5000001 C25.3297253,29.5000001 26.0000003,28.8349703 26.0000003,28.0014241 L26.0000003,23.5000001 L29.4902251,23.5000002 C30.8763357,23.5000002 31.2439521,22.6751916 30.3054161,21.6512985 L21.6719008,12.2325898 Z M21.341748,14.3645316 C21.1530056,14.1632064 20.8433515,14.1670914 20.6582514,14.3645316 L13.5,21.9999998 L17.5000001,21.9999999 L17.5000002,27.5089956 C17.5000002,27.7801703 17.7329027,28.0000008 18.0034229,28.0000008 L23.996577,28.0000008 C24.2746097,28.0000008 24.4999997,27.7721203 24.4999997,27.5089956 L24.4999997,21.9999999 L28.5,21.9999999 L21.341748,14.3645316 Z' id='Shift'></path> </g> </g> </g> </svg>"
  },
  smileys: "<?xml version='1.0' encoding='UTF-8' standalone='no'?> <svg width='17px' height='16px' viewBox='0 0 17 16' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' xmlns:sketch='http://www.bohemiancoding.com/sketch/ns'> <!-- Generator: Sketch 3.5.2 (25235) - http://www.bohemiancoding.com/sketch --> <title>:D</title> <desc>Created with Sketch.</desc> <defs></defs> <g id='iOS-9-Keyboards' stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' sketch:type='MSPage'> <g id='iPhone-6-Portrait-Light-Copy' sketch:type='MSArtboardGroup' transform='translate(-86.000000, -638.000000)'> <g id='Keyboards' sketch:type='MSLayerGroup' transform='translate(0.000000, 408.000000)'> <g id=':D' transform='translate(87.000000, 230.500000)' sketch:type='MSShapeGroup'> <circle id='Head' stroke='#4A5461' stroke-width='0.789473684' cx='7.5' cy='7.5' r='7.5'></circle> <path d='M7.5,13.5263158 C10.2686907,13.5263158 12.5131579,10.3684212 12.5131579,9.18421045 C12.5131579,7.60526317 11.4389098,9.18421043 7.5,9.18421053 C3.56109023,9.18421062 2.48684211,7.60526317 2.48684211,9.18421045 C2.48684211,10.368421 4.73130935,13.5263158 7.5,13.5263158 Z M7.5,10.9605263 C8.93233083,11.1578947 11.7969925,10.368421 11.7969925,9.44423552 C11.7969925,8.78947368 10.8762084,9.57894727 7.5,9.77631579 C4.12379162,9.57894743 3.20300872,8.78947369 3.20300752,9.44423552 C3.20300582,10.368421 6.06766917,11.1578947 7.5,10.9605263 Z' id='Smile' fill='#4A5461'></path> <path d='M5.23684211,6.3236598 C5.64378876,6.3236598 5.97368421,5.88183554 5.97368421,5.33681769 C5.97368421,4.79179985 5.64378876,4.34997559 5.23684211,4.34997559 C4.82989545,4.34997559 4.5,4.79179985 4.5,5.33681769 C4.5,5.88183554 4.82989545,6.3236598 5.23684211,6.3236598 Z M9.73684211,6.3236598 C10.1437888,6.3236598 10.4736842,5.88183554 10.4736842,5.33681769 C10.4736842,4.79179985 10.1437888,4.34997559 9.73684211,4.34997559 C9.32989545,4.34997559 9,4.79179985 9,5.33681769 C9,5.88183554 9.32989545,6.3236598 9.73684211,6.3236598 Z' id='Eyes' fill='#4A5461'></path> </g> </g> </g> </g> </svg>",
  symbols: "<?xml version='1.0' encoding='UTF-8' standalone='no'?> <svg width='16px' height='17px' viewBox='0 0 15 17' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' xmlns:sketch='http://www.bohemiancoding.com/sketch/ns'> <!-- Generator: Sketch 3.5.2 (25235) - http://www.bohemiancoding.com/sketch --> <title>Objects &amp; Symbols</title> <desc>Created with Sketch.</desc> <defs></defs> <g id='iOS-9-Keyboards' stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' sketch:type='MSPage'> <g id='iPhone-6-Portrait-Light-Copy' sketch:type='MSArtboardGroup' transform='translate(-304.000000, -638.000000)' fill='#4A5461'> <g id='Keyboards' sketch:type='MSLayerGroup' transform='translate(0.000000, 408.000000)'> <g id='Objects-&amp;-Symbols' transform='translate(304.000000, 230.000000)'> <g id='Thing' transform='translate(0.000000, 0.500000)' sketch:type='MSShapeGroup'> <rect id='Rectangle-1209' x='0' y='0' width='7' height='1'></rect> <rect id='Rectangle-1209' x='0' y='2' width='7' height='1'></rect> <rect id='Rectangle-1211' x='3' y='3' width='1' height='4'></rect> </g> <path d='M11.75,0.159263978 L11.75,0 L11,0 L11,5.091493 C10.59344,4.94221392 10.0639662,4.96453224 9.55715399,5.19017957 C8.69849293,5.5724801 8.23003835,6.39365621 8.51083141,7.02432774 C8.79162447,7.65499928 9.71533454,7.85634375 10.5739956,7.47404321 C11.2761183,7.16143803 11.7173393,6.55538972 11.7013595,6 L11.75,6 L11.75,1.39385056 C12.3175908,1.59590037 13,2.0817456 13,3.25 C13,4.25 12.75,5.5 12.75,5.5 C12.75,5.5 13.75,4.75 13.75,2.5 C13.75,1.02256101 12.5642674,0.407473019 11.75,0.159263978 Z' id='Note' sketch:type='MSShapeGroup'></path> <text id='&amp;' sketch:type='MSTextLayer' font-family='SF UI Display' font-size='9.5' font-weight='normal'> <tspan x='0.25' y='16'>&amp;</tspan> </text> <text id='%' sketch:type='MSTextLayer' font-family='SF UI Display' font-size='9.5' font-weight='normal'> <tspan x='7.75' y='16'>%</tspan> </text> </g> </g> </g> </g> </svg>",
  travel: "<?xml version='1.0' encoding='UTF-8' standalone='no'?> <svg width='17px' height='16px' viewBox='0 0 17 16' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' xmlns:sketch='http://www.bohemiancoding.com/sketch/ns'> <!-- Generator: Sketch 3.5.2 (25235) - http://www.bohemiancoding.com/sketch --> <title>Transport</title> <desc>Created with Sketch.</desc> <defs></defs> <g id='iOS-9-Keyboards' stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' sketch:type='MSPage'> <g id='iPhone-6-Portrait-Light-Copy' sketch:type='MSArtboardGroup' transform='translate(-241.000000, -638.000000)'> <g id='Keyboards' sketch:type='MSLayerGroup' transform='translate(0.000000, 408.000000)'> <g id='Transport' transform='translate(241.500000, 230.000000)' sketch:type='MSShapeGroup'> <path d='M0,6 L1,6 L1,15 L0,15 L0,6 Z M15,4 L16,4 L16,15 L15,15 L15,4 Z M3.5,0 L4.5,0 L4.5,7 L3.5,7 L3.5,0 Z M1,6 L3.5,6 L3.5,7 L1,7 L1,6 Z M4.5,0 L9.5,0 L9.5,1 L4.5,1 L4.5,0 Z M9.5,0 L10.5,0 L10.5,6 L9.5,6 L9.5,0 Z M10.5,4 L15,4 L15,5 L10.5,5 L10.5,4 Z' id='Skyline' fill='#4A5461'></path> <g id='Windows' transform='translate(2.000000, 2.000000)' fill='#4A5461'> <rect id='Window' x='0' y='6' width='1' height='1'></rect> <rect id='Window' x='3.5' y='0' width='1' height='1'></rect> <rect id='Window' x='5.5' y='0' width='1' height='1'></rect> <rect id='Window' x='5.5' y='2' width='1' height='1'></rect> <rect id='Window' x='3.5' y='2' width='1' height='1'></rect> <rect id='Window' x='11' y='4' width='1' height='1'></rect> <rect id='Window' x='11' y='6' width='1' height='1'></rect> </g> <g id='Car' transform='translate(2.500000, 6.500000)'> <path d='M8.5,8 L2.5,8 L2.5,9.5 L0.5,9.5 L0.5,7.8681145 C0.201202192,7.69582702 0,7.37091363 0,6.9906311 L0,5.0093689 C0,4.45190985 0.444836974,4 0.995577499,4 L10.0044225,4 C10.5542648,4 11,4.44335318 11,5.0093689 L11,6.9906311 C11,7.3653315 10.7990244,7.69234519 10.5,7.86649002 L10.5,9.5 L8.5,9.5 L8.5,8 Z M1.75,6.5 C2.16421356,6.5 2.5,6.16421356 2.5,5.75 C2.5,5.33578644 2.16421356,5 1.75,5 C1.33578644,5 1,5.33578644 1,5.75 C1,6.16421356 1.33578644,6.5 1.75,6.5 Z M9.25,6.5 C9.66421356,6.5 10,6.16421356 10,5.75 C10,5.33578644 9.66421356,5 9.25,5 C8.83578644,5 8.5,5.33578644 8.5,5.75 C8.5,6.16421356 8.83578644,6.5 9.25,6.5 Z M0.5,7 L10.5,7 L10.5,7.5 L0.5,7.5 L0.5,7 Z M3,6.5 L8,6.5 L8,7 L3,7 L3,6.5 Z' id='Body' fill='#4A5461'></path> <path d='M1.5,4.5 L1.5,3 C1.5,1.34314575 2.83902013,0 4.50166547,0 L6.49833453,0 C8.15610859,0 9.5,1.34651712 9.5,3 L9.5,5' id='Roof' stroke='#4A5461'></path> </g> </g> </g> </g> </g> </svg>"
};

exports.framerFrames = {
  640: 2,
  750: 2,
  768: 2,
  1080: 3,
  1242: 3,
  1440: 4,
  1536: 2
};

exports.realDevices = {
  320: {
    480: {
      name: "iPhone",
      width: 320,
      height: 480,
      scale: 1
    }
  },
  480: {
    854: {
      name: "Android One",
      width: 480,
      height: 854,
      scale: 1.5
    }
  },
  640: {
    960: {
      name: "iPhone 4",
      width: 640,
      height: 960,
      scale: 2
    },
    1136: {
      name: "iPhone 5",
      width: 640,
      height: 1136,
      scale: 2
    }
  },
  720: {
    1280: {
      name: "XHDPI",
      width: 720,
      height: 1280,
      scale: 2
    }
  },
  750: {
    1118: {
      name: "iPhone 6",
      width: 750,
      height: 1118,
      scale: 2
    },
    1334: {
      name: "iPhone 6",
      width: 750,
      height: 1334,
      scale: 2
    }
  },
  768: {
    1024: {
      name: "iPad",
      width: 768,
      height: 1024,
      scale: 1
    },
    1280: {
      name: "Nexus 4",
      width: 768,
      height: 1280,
      scale: 2
    }
  },
  800: {
    1280: {
      name: "Nexus 7",
      width: 800,
      height: 1280,
      scale: 1
    }
  },
  1080: {
    1920: {
      name: "XXHDPI",
      width: 1080,
      height: 1920,
      scale: 3
    }
  },
  1200: {
    1920: {
      name: "Nexus 7",
      width: 1200,
      height: 1920,
      scale: 2
    }
  },
  1242: {
    2208: {
      name: "iPhone 6 Plus",
      width: 1242,
      height: 2208,
      scale: 3
    }
  },
  1440: {
    2560: {
      name: "XXXHDPI",
      width: 1440,
      height: 2560,
      scale: 4
    }
  },
  1441: {
    2561: {
      name: "Nexus 6",
      width: 1440,
      height: 2560,
      scale: 4
    }
  },
  1536: {
    2048: {
      name: "iPad",
      width: 1536,
      height: 2048,
      scale: 2
    }
  },
  1600: {
    2056: {
      name: "Nexus 10",
      width: 1600,
      height: 2056,
      scale: 2
    }
  },
  2048: {
    1536: {
      name: "Nexus 9",
      width: 2048,
      height: 1536,
      scale: 2
    },
    2732: {
      name: "iPad Pro",
      width: 2048,
      height: 2732,
      scale: 2
    }
  },
  2560: {
    1600: {
      name: "Nexus 10",
      width: 2560,
      height: 1600,
      scale: 2
    }
  },
  2732: {
    2048: {
      name: "iPad Pro",
      width: 2732,
      height: 2048,
      scale: 2
    }
  }
};

exports.colors = {
  red: "#F44336",
  red50: "#FFEBEE",
  red100: "#FFCDD2",
  red200: "#EF9A9A",
  red300: "#E57373",
  red400: "#EF5350",
  red500: "#F44336",
  red600: "#E53935",
  red700: "#D32F2F",
  red800: "#C62828",
  red900: "#B71C1C",
  redA100: "#FF8A80",
  redA200: "#FF5252",
  redA400: "#FF1744",
  redA700: "#D50000",
  pink: "#E91E63",
  pink50: "#FCE4EC",
  pink100: "#F8BBD0",
  pink200: "#F48FB1",
  pink300: "#F06292",
  pink400: "#EC407A",
  pink500: "#E91E63",
  pink600: "#D81B60",
  pink700: "#C2185B",
  pink800: "#AD1457",
  pink900: "#880E4F",
  pinkA100: "#FF80AB",
  pinkA200: "#FF4081",
  pinkA400: "#F50057",
  pinkA700: "#C51162",
  purple: "#9C27B0",
  purple50: "#F3E5F5",
  purple100: "#E1BEE7",
  purple200: "#CE93D8",
  purple300: "#BA68C8",
  purple400: "#AB47BC",
  purple500: "#9C27B0",
  purple600: "#8E24AA",
  purple700: "#7B1FA2",
  purple800: "#6A1B9A",
  purple900: "#4A148C",
  purpleA100: "#EA80FC",
  purpleA200: "#E040FB",
  purpleA400: "#D500F9",
  purpleA700: "#AA00FF",
  deepPurple: "#673AB7",
  deepPurple50: "#EDE7F6",
  deepPurple100: "#D1C4E9",
  deepPurple200: "#B39DDB",
  deepPurple300: "#9575CD",
  deepPurple400: "#7E57C2",
  deepPurple500: "#673AB7",
  deepPurple600: "#5E35B1",
  deepPurple700: "#512DA8",
  deepPurple800: "#4527A0",
  deepPurple900: "#311B92",
  deepPurpleA100: "#B388FF",
  deepPurpleA200: "#7C4DFF",
  deepPurpleA400: "#651FFF",
  deepPurpleA700: "#6200EA",
  indigo: "#3F51B5",
  indigo50: "#E8EAF6",
  indigo100: "#C5CAE9",
  indigo200: "#9FA8DA",
  indigo300: "#7986CB",
  indigo400: "#5C6BC0",
  indigo500: "#3F51B5",
  indigo600: "#3949AB",
  indigo700: "#303F9F",
  indigo800: "#283593",
  indigo900: "#1A237E",
  indigoA100: "#8C9EFF",
  indigoA200: "#536DFE",
  indigoA400: "#3D5AFE",
  indigoA700: "#304FFE",
  blue: "#2196F3",
  blue50: "#E3F2FD",
  blue100: "#BBDEFB",
  blue200: "#90CAF9",
  blue300: "#64B5F6",
  blue400: "#42A5F5",
  blue500: "#2196F3",
  blue600: "#1E88E5",
  blue700: "#1976D2",
  blue800: "#1565C0",
  blue900: "#0D47A1",
  blueA100: "#82B1FF",
  blueA200: "#448AFF",
  blueA400: "#2979FF",
  blueA700: "#2962FF",
  lightBlue: "#03A9F4",
  lightBlue50: "#E1F5FE",
  lightBlue100: "#B3E5FC",
  lightBlue200: "#81D4FA",
  lightBlue300: "#4FC3F7",
  lightBlue400: "#29B6F6",
  lightBlue500: "#03A9F4",
  lightBlue600: "#039BE5",
  lightBlue700: "#0288D1",
  lightBlue800: "#0277BD",
  lightBlue900: "#01579B",
  lightBlueA100: "#80D8FF",
  lightBlueA200: "#40C4FF",
  lightBlueA400: "#00B0FF",
  lightBlueA700: "#0091EA",
  cyan: "#00BCD4",
  cyan50: "#E0F7FA",
  cyan100: "#B2EBF2",
  cyan200: "#80DEEA",
  cyan300: "#4DD0E1",
  cyan400: "#26C6DA",
  cyan500: "#00BCD4",
  cyan600: "#00ACC1",
  cyan700: "#0097A7",
  cyan800: "#00838F",
  cyan900: "#006064",
  cyanA100: "#84FFFF",
  cyanA200: "#18FFFF",
  cyanA400: "#00E5FF",
  cyanA700: "#00B8D4",
  teal: "#009688",
  teal50: "#E0F2F1",
  teal100: "#B2DFDB",
  teal200: "#80CBC4",
  teal300: "#4DB6AC",
  teal400: "#26A69A",
  teal500: "#009688",
  teal600: "#00897B",
  teal700: "#00796B",
  teal800: "#00695C",
  teal900: "#004D40",
  tealA100: "#A7FFEB",
  tealA200: "#64FFDA",
  tealA400: "#1DE9B6",
  tealA700: "#00BFA5",
  green: "#4CAF50",
  green50: "#E8F5E9",
  green100: "#C8E6C9",
  green200: "#A5D6A7",
  green300: "#81C784",
  green400: "#66BB6A",
  green500: "#4CAF50",
  green600: "#43A047",
  green700: "#388E3C",
  green800: "#2E7D32",
  green900: "#1B5E20",
  greenA100: "#B9F6CA",
  greenA200: "#69F0AE",
  greenA400: "#00E676",
  greenA700: "#00C853",
  lightGreen: "#8BC34A",
  lightGreen50: "#F1F8E9",
  lightGreen100: "#DCEDC8",
  lightGreen200: "#C5E1A5",
  lightGreen300: "#AED581",
  lightGreen400: "#9CCC65",
  lightGreen500: "#8BC34A",
  lightGreen600: "#7CB342",
  lightGreen700: "#689F38",
  lightGreen800: "#558B2F",
  lightGreen900: "#33691E",
  lightGreenA100: "#CCFF90",
  lightGreenA200: "#B2FF59",
  lightGreenA400: "#76FF03",
  lightGreenA700: "#64DD17",
  lime: "#CDDC39",
  lime50: "#F9FBE7",
  lime100: "#F0F4C3",
  lime200: "#E6EE9C",
  lime300: "#DCE775",
  lime400: "#D4E157",
  lime500: "#CDDC39",
  lime600: "#C0CA33",
  lime700: "#AFB42B",
  lime800: "#9E9D24",
  lime900: "#827717",
  limeA100: "#F4FF81",
  limeA200: "#EEFF41",
  limeA400: "#C6FF00",
  limeA700: "#AEEA00",
  yellow: "#FFEB3B",
  yellow50: "#FFFDE7",
  yellow100: "#FFF9C4",
  yellow200: "#FFF59D",
  yellow300: "#FFF176",
  yellow400: "#FFEE58",
  yellow500: "#FFEB3B",
  yellow600: "#FDD835",
  yellow700: "#FBC02D",
  yellow800: "#F9A825",
  yellow900: "#F57F17",
  yellowA100: "#FFFF8D",
  yellowA200: "#FFFF00",
  yellowA400: "#FFEA00",
  yellowA700: "#FFD600",
  amber: "#FFC107",
  amber50: "#FFF8E1",
  amber100: "#FFECB3",
  amber200: "#FFE082",
  amber300: "#FFD54F",
  amber400: "#FFCA28",
  amber500: "#FFC107",
  amber600: "#FFB300",
  amber700: "#FFA000",
  amber800: "#FF8F00",
  amber900: "#FF6F00",
  amberA100: "#FFE57F",
  amberA200: "#FFD740",
  amberA400: "#FFC400",
  amberA700: "#FFAB00",
  orange: "#FF9800",
  orange50: "#FFF3E0",
  orange100: "#FFE0B2",
  orange200: "#FFCC80",
  orange300: "#FFB74D",
  orange400: "#FFA726",
  orange500: "#FF9800",
  orange600: "#FB8C00",
  orange700: "#F57C00",
  orange800: "#EF6C00",
  orange900: "#E65100",
  orangeA100: "#FFD180",
  orangeA200: "#FFAB40",
  orangeA400: "#FF9100",
  orangeA700: "#FF6D00",
  deepOrange: "#FF5722",
  deepOrange50: "#FBE9E7",
  deepOrange100: "#FFCCBC",
  deepOrange200: "#FFAB91",
  deepOrange300: "#FF8A65",
  deepOrange400: "#FF7043",
  deepOrange500: "#FF5722",
  deepOrange600: "#F4511E",
  deepOrange700: "#E64A19",
  deepOrange800: "#D84315",
  deepOrange900: "#BF360C",
  deepOrangeA100: "#FF9E80",
  deepOrangeA200: "#FF6E40",
  deepOrangeA400: "#FF3D00",
  deepOrangeA700: "#DD2C00",
  brown: "#795548",
  brown50: "#EFEBE9",
  brown100: "#D7CCC8",
  brown200: "#BCAAA4",
  brown300: "#A1887F",
  brown400: "#8D6E63",
  brown500: "#795548",
  brown600: "#6D4C41",
  brown700: "#5D4037",
  brown800: "#4E342E",
  brown900: "#3E2723",
  grey: "#9E9E9E",
  grey50: "#FAFAFA",
  grey100: "#F5F5F5",
  grey200: "#EEEEEE",
  grey300: "#E0E0E0",
  grey400: "#BDBDBD",
  grey500: "#9E9E9E",
  grey600: "#757575",
  grey700: "#616161",
  grey800: "#424242",
  grey900: "#212121",
  blueGrey: "#607D8B",
  blueGrey50: "#ECEFF1",
  blueGrey100: "#CFD8DC",
  blueGrey200: "#B0BEC5",
  blueGrey300: "#90A4AE",
  blueGrey400: "#78909C",
  blueGrey500: "#607D8B",
  blueGrey600: "#546E7A",
  blueGrey700: "#455A64",
  blueGrey800: "#37474F",
  blueGrey900: "#263238",
  black: "#000000",
  white: "#FFFFFF"
};


},{"material-kit":"material-kit"}],"material-kit-nav-bar":[function(require,module,exports){
var m;

m = require('material-kit');

exports.defaults = {};

exports.defaults.props = Object.keys(exports.defaults);

exports.create = function(array) {
  var backButton, backIcon, homeButton, homeIcon, navbar, recentButton, recentIcon, setup, svgBack, svgHome;
  setup = m.utils.setupComponent(array, exports.defaults);
  navbar = new Layer({
    backgroundColor: "black"
  });
  navbar.type = "navbar";
  navbar.constraints = {
    bottom: -1,
    leading: 0,
    trailing: 0,
    height: 48
  };
  svgHome = m.utils.svg(m.assets.home);
  svgBack = m.utils.svg(m.assets.back);
  homeButton = new Layer({
    superLayer: navbar,
    borderRadius: m.utils.px(21),
    backgroundColor: "transparent",
    name: "home",
    clip: true
  });
  homeButton.constraints = {
    top: 3,
    height: 42,
    width: 94,
    align: "horizontal"
  };
  homeIcon = new Layer({
    superLayer: homeButton,
    width: svgHome.width,
    height: svgHome.height,
    html: svgHome.svg,
    backgroundColor: "transparent",
    name: "icon"
  });
  homeIcon.constraints = {
    align: "center"
  };
  recentButton = new Layer({
    superLayer: navbar,
    borderRadius: m.utils.px(21),
    backgroundColor: "transparent",
    name: "recent",
    clip: true
  });
  recentButton.constraints = {
    top: 3,
    height: 42,
    width: 94,
    leading: [homeButton, 6]
  };
  recentIcon = new Layer({
    superLayer: recentButton,
    backgroundColor: "transparent",
    borderColor: "white",
    borderWidth: m.utils.px(2),
    borderRadius: m.utils.px(2),
    name: "icon"
  });
  recentIcon.constraints = {
    align: "center",
    width: 16,
    height: 16
  };
  backButton = new Layer({
    superLayer: navbar,
    borderRadius: m.utils.px(21),
    backgroundColor: "transparent",
    name: "back",
    clip: true
  });
  backButton.constraints = {
    top: 3,
    height: 42,
    width: 94,
    trailing: [homeButton, 6]
  };
  backIcon = new Layer({
    superLayer: backButton,
    width: svgBack.width,
    height: svgBack.height,
    html: svgBack.svg,
    backgroundColor: "transparent",
    name: "icon"
  });
  backIcon.constraints = {
    align: "center"
  };
  m.layout.set({
    target: [navbar, homeButton, recentButton, backButton, homeIcon, backIcon, recentIcon]
  });
  m.utils.inky({
    layer: homeButton,
    moveToTap: false,
    color: "white",
    scale: 20,
    curve: "bezier-curve(1, 0.4, 0.4, 1.0)",
    opacity: .3
  });
  m.utils.inky({
    layer: backButton,
    moveToTap: false,
    color: "white",
    scale: 20,
    curve: "bezier-curve(1, 0.4, 0.4, 1.0)",
    opacity: .3
  });
  m.utils.inky({
    layer: recentButton,
    moveToTap: false,
    color: "white",
    scale: 20,
    curve: "bezier-curve(1, 0.4, 0.4, 1.0)",
    opacity: .3
  });
  backButton.on(Events.TouchEnd, function() {
    return m.removeFromStack();
  });
  navbar.back = backButton;
  navbar.back.backIcon = backIcon;
  navbar.home = homeButton;
  navbar.home.icon = homeIcon;
  navbar.recent = recentButton;
  navbar.recent.icon = recentIcon;
  Utils.interval(.05, function() {
    return navbar.bringToFront();
  });
  m.layout.set(navbar);
  return navbar;
};


},{"material-kit":"material-kit"}],"material-kit-snack-bar":[function(require,module,exports){
var m;

m = require('material-kit');

exports.defaults = {
  animated: true,
  text: "Snackbar Text",
  action: void 0,
  actionColor: "limeA200",
  duration: 5
};

exports.defaults.props = Object.keys(exports.defaults);

exports.create = function(array) {
  var actionWidth, bar, barHeight, fabExists, i, l, len, navbarExists, ref, setup;
  setup = m.utils.setupComponent(array, exports.defaults);
  bar = new Layer({
    name: "snackbar",
    backgroundColor: "transparent",
    clip: true
  });
  bar.type = "snackbar";
  bar.bg = new Layer({
    backgroundColor: "#323232",
    superLayer: bar,
    name: "bg"
  });
  navbarExists = 0;
  fabExists = void 0;
  ref = Framer.CurrentContext.layers;
  for (i = 0, len = ref.length; i < len; i++) {
    l = ref[i];
    if (l.type === "navbar") {
      navbarExists = l;
    }
    if (l.type === "floating") {
      fabExists = l;
    }
    if (l.type === "snackbar" && l !== bar) {
      l.bg.animate({
        properties: {
          y: bar.height
        },
        time: .3,
        curve: "bezier-curve(.2, 0.4, 0.4, 1.0)"
      }, l.fabMoved ? (l.fabMoved.halted = true, l.fabMoved.constraints.bottom = fabExists.previousBottom, m.layout.animate({
        target: fabExists,
        curve: "bezier-curve(.2, 0.4, 0.4, 1.0)",
        time: .3
      }), Utils.delay(setup.duration, function() {
        fabExists.constraints.bottom = fabExists.previousBottom;
        return m.layout.animate({
          target: fabExists,
          curve: "bezier-curve(.2, 0.4, 0.4, 1.0)",
          time: .3
        });
      })) : void 0);
    }
  }
  bar.bringToFront();
  bar.constraints = {
    leading: 0,
    trailing: 0,
    bottom: [navbarExists, -1],
    height: 48
  };
  m.layout.set({
    target: [bar]
  });
  bar.bg.props = {
    width: bar.width,
    height: bar.height
  };
  actionWidth = m.px(24);
  if (setup.action) {
    bar.action = new m.Button({
      type: "flat",
      superLayer: bar.bg,
      text: setup.action,
      constraints: {
        trailing: 24,
        align: "vertical"
      },
      backgroundColor: "#3232",
      color: setup.actionColor
    });
    actionWidth = bar.action.width + m.px(48);
  }
  bar.text = new m.Text({
    fontSize: 14,
    color: "white",
    superLayer: bar.bg,
    constraints: {
      leading: 24,
      align: "vertical"
    },
    text: setup.text,
    name: "text",
    lineHeight: 18
  });
  if (m.device.width < actionWidth + bar.text.width + m.px(24)) {
    bar.text.constraints.width = m.dp(m.device.width) - (m.dp(actionWidth) + 24);
    m.utils.update(bar.text);
    m.layout.set(bar.text);
    bar.constraints.height = m.dp(bar.text.height) + 48;
    bar.bg.height = bar.text.height + m.px(48);
    m.layout.set({
      target: [bar, bar.text]
    });
    if (setup.action) {
      m.layout.set(bar.action);
    }
  }
  barHeight = bar.bg.height;
  if (fabExists) {
    bar.fabMoved = fabExists;
    fabExists.previousBottom = fabExists.constraints.bottom;
    fabExists.constraints.bottom = fabExists.constraints.bottom + m.dp(barHeight);
  }
  if (setup.animated) {
    bar.bg.y = bar.bg.height;
    bar.text.opacity = 0;
    bar.bg.animate({
      properties: {
        y: 0
      },
      time: .3,
      curve: "bezier-curve(.2, 0.4, 0.4, 1.0)"
    });
    bar.text.animate({
      properties: {
        opacity: 1
      },
      time: .3
    });
    if (setup.action) {
      bar.action.animate({
        properties: {
          opacity: 1
        },
        time: .3
      });
    }
    if (fabExists) {
      m.layout.animate({
        target: fabExists,
        curve: "bezier-curve(.2, 0.4, 0.4, 1.0)",
        time: .3
      });
    }
  }
  Utils.delay(setup.duration, function() {
    bar.bg.animate({
      properties: {
        y: bar.height
      },
      time: .3,
      curve: "bezier-curve(.2, 0.4, 0.4, 1.0)"
    });
    bar.text.animate({
      properties: {
        opacity: 0
      },
      time: .3
    });
    if (setup.action) {
      bar.action.animate({
        properties: {
          opacity: 0
        },
        time: .3
      });
    }
    if (fabExists && fabExists.halted !== true) {
      fabExists.constraints.bottom = fabExists.previousBottom;
      return m.layout.animate({
        target: fabExists,
        curve: "bezier-curve(.2, 0.4, 0.4, 1.0)",
        time: .3
      });
    }
  });
  Utils.delay(setup.duration + .3, function() {
    return bar.destroy();
  });
  return bar;
};


},{"material-kit":"material-kit"}],"material-kit-stack":[function(require,module,exports){
var m, stack;

m = require('material-kit');

exports.stack = stack = [];

exports.addToStack = function(layer) {
  if (stack.indexOf(layer) === -1) {
    return stack.push(layer);
  }
};

exports.removeFromStack = function(layer) {
  var layerToleave, overlay;
  if (stack.length > 0) {
    layerToleave = stack[stack.length - 1];
    if (layerToleave.exit !== void 0) {
      layerToleave.exit();
    } else {
      overlay = new Layer({
        backgroundColor: m.color("black"),
        width: m.device.width,
        height: m.device.height
      });
      overlay.placeBehind(layerToleave);
      layerToleave.constraints = {
        leading: m.dp(m.device.width)
      };
      m.layout.animate({
        target: layerToleave,
        time: .3
      });
      overlay.animate({
        properties: {
          opacity: 0
        },
        time: .5,
        delay: .2
      });
      Utils.delay(.6, function() {
        layerToleave.destroy();
        return overlay.destroy();
      });
    }
    return stack.pop();
  }
};


},{"material-kit":"material-kit"}],"material-kit-status-bar":[function(require,module,exports){
var m;

m = require('material-kit');

exports.defaults = {
  carrier: "",
  network: "LTE",
  battery: 100,
  cellular: 2,
  style: "light",
  clock24: false,
  type: "statusBar",
  backgroundColor: "rgba(0,0,0,.1)",
  color: "black",
  opacity: .6
};

exports.defaults.props = Object.keys(exports.defaults);

exports.create = function(array) {
  var batteryIcon, cellular, cellularIcon, highBattery, lowBattery, midBattery, setup, statusBar, time, wifi, wifiIcon;
  setup = m.utils.setupComponent(array, exports.defaults);
  statusBar = new Layer({
    backgroundColor: setup.backgroundColor,
    name: "statusBar.all"
  });
  if (setup.style === "dark") {
    if (setup.backgroundColor === "rgba(0,0,0,.1)") {
      statusBar.backgroundColor = m.utils.color("black");
    }
    if (setup.color === "black") {
      setup.color = "white";
    }
    if (setup.opacity === .6) {
      setup.opacity = 1;
    }
  }
  if (setup.style === "light" && setup.color !== "black") {
    setup.opacity = 1;
  }
  statusBar.type = setup.type;
  statusBar.constraints = {
    leading: 0,
    trailing: 0,
    height: 24
  };
  switch (m.device.name) {
    case "iphone-6s-plus":
      this.topConstraint = 5;
      this.bluetooth = 5;
      break;
    case "fullscreen":
      this.topConstraint = 5;
      this.bluetooth = -10;
      break;
    default:
      this.topConstraint = 3;
      this.bluetooth = 3;
  }
  this.time = m.utils.getTime();
  time = new m.Text({
    style: "statusBarTime",
    text: m.utils.timeFormatter(this.time, setup.clock24),
    fontSize: 14,
    fontWeight: 500,
    superLayer: statusBar,
    color: setup.color,
    name: "time",
    opacity: setup.opacity
  });
  time.constraints = {
    trailing: 8,
    align: "vertical"
  };
  m.utils.timeDelegate(time, setup.clock24);
  batteryIcon = new Layer({
    superLayer: statusBar,
    backgroundColor: "transparent",
    name: "batteryIcon"
  });
  if (setup.battery > 70) {
    highBattery = m.utils.svg(m.assets.batteryHigh);
    batteryIcon.html = highBattery.svg;
    batteryIcon.height = highBattery.height;
    batteryIcon.width = highBattery.width;
    m.utils.changeFill(batteryIcon, setup.color);
    batteryIcon.opacity = setup.opacity;
  }
  if (setup.battery <= 70 && setup.battery > 20) {
    midBattery = m.utils.svg(m.assets.batteryMid);
    batteryIcon.html = midBattery.svg;
    m.utils.changeFill(batteryIcon, setup.color);
  }
  if (setup.battery <= 20) {
    lowBattery = m.utils.svg(m.assets.batteryLow);
    batteryIcon.html = lowBattery.svg;
    m.utils.changeFill(batteryIcon, setup.color);
  }
  batteryIcon.constraints = {
    trailing: [time, 7],
    align: "vertical"
  };
  cellularIcon = m.utils.svg(m.assets.cellular);
  cellular = new Layer({
    width: cellularIcon.width,
    height: cellularIcon.height,
    html: cellularIcon.svg,
    superLayer: statusBar,
    backgroundColor: "transparent",
    opacity: setup.opacity,
    name: "cellular"
  });
  cellular.constraints = {
    trailing: [batteryIcon, 7],
    align: "vertical"
  };
  m.utils.changeFill(cellular, setup.color);
  wifiIcon = m.utils.svg(m.assets.wifi, setup.color);
  wifi = new Layer({
    width: wifiIcon.width,
    height: wifiIcon.height,
    superLayer: statusBar,
    backgroundColor: "transparent",
    name: "wifi",
    html: wifiIcon.svg,
    opacity: setup.opacity
  });
  m.utils.changeFill(wifi, setup.color);
  wifi.constraints = {
    trailing: [cellular, 4],
    align: "vertical"
  };
  m.layout.set();
  statusBar.battery = {};
  statusBar.battery.icon = batteryIcon;
  statusBar.time = time;
  statusBar.cellular = cellular;
  m.layout.set({
    target: [statusBar, time, batteryIcon, cellular, wifi]
  });
  return statusBar;
};


},{"material-kit":"material-kit"}],"material-kit-text":[function(require,module,exports){
var m, style;

m = require('material-kit');

exports.defaults = {
  constraints: {},
  text: "Material Text Layer",
  type: "text",
  x: 0,
  y: 0,
  width: -1,
  height: -1,
  superLayer: void 0,
  style: "default",
  lines: 1,
  textAlign: "left",
  backgroundColor: "transparent",
  color: "black",
  fontSize: 17,
  fontStyle: "regular",
  fontFamily: "Roboto",
  fontWeight: "regular",
  lineHeight: "auto",
  name: "text layer",
  opacity: 1,
  textTransform: "none",
  letterSpacing: 0,
  name: "text layer"
};

exports.defaults.props = Object.keys(exports.defaults);

style = document.createElement('style');

style.type = 'text/css';

style.appendChild(document.createTextNode("@import url(https://fonts.googleapis.com/css?family=Roboto:400,100,100italic,300,300italic,400italic,500,500italic,700,700italic,900,900italic);\n @import url(https://fonts.googleapis.com/icon?family=Material+Icons); \n"));

document.getElementsByTagName('head')[0].appendChild(style);

exports.create = function(array) {
  var exceptions, i, j, len, len1, prop, ref, ref1, setup, textFrame, textLayer;
  setup = m.utils.setupComponent(array, exports.defaults);
  exceptions = Object.keys(setup);
  textLayer = new Layer({
    backgroundColor: "transparent",
    name: setup.name
  });
  textLayer.type = "text";
  textLayer.html = setup.text;
  ref = m.lib.layerProps;
  for (i = 0, len = ref.length; i < len; i++) {
    prop = ref[i];
    if (setup[prop]) {
      if (prop === "color") {
        setup[prop] = m.utils.color(setup[prop]);
      }
      textLayer[prop] = setup[prop];
    }
  }
  ref1 = m.lib.layerStyles;
  for (j = 0, len1 = ref1.length; j < len1; j++) {
    prop = ref1[j];
    if (setup[prop]) {
      if (prop === "lineHeight" && setup[prop] === "auto") {
        textLayer.style.lineHeight = setup.fontSize;
      }
      if (prop === "fontWeight") {
        switch (setup[prop]) {
          case "ultrathin":
            setup[prop] = 100;
            break;
          case "thin":
            setup[prop] = 200;
            break;
          case "light":
            setup[prop] = 300;
            break;
          case "regular":
            setup[prop] = 400;
            break;
          case "medium":
            setup[prop] = 500;
            break;
          case "semibold":
            setup[prop] = 600;
            break;
          case "bold":
            setup[prop] = 700;
            break;
          case "black":
            setup[prop] = 800;
        }
      }
      if (prop === "fontSize" || prop === "lineHeight" || prop === "letterSpacing") {
        setup[prop] = m.utils.px(setup[prop]) + "px";
      }
      textLayer.style[prop] = setup[prop];
    }
  }
  textFrame = m.utils.textAutoSize(textLayer);
  textLayer.props = {
    height: textFrame.height,
    width: textFrame.width
  };
  textLayer.constraints = setup.constraints;
  m.layout.set({
    target: textLayer
  });
  return textLayer;
};


},{"material-kit":"material-kit"}],"material-kit-utils":[function(require,module,exports){
var m;

m = require('material-kit');

exports.pt = function(px) {
  var pt;
  pt = px / m.device.scale;
  pt = Math.round(pt);
  return pt;
};

exports.px = function(pt) {
  var px;
  px = pt * m.device.scale;
  px = Math.round(px);
  return px;
};

exports.color = function(colorString) {
  var color;
  if (colorString[0] === "#") {
    return colorString;
  } else {
    color = new Color(m.lib.colors[colorString]);
    if (colorString === "transparent") {
      color = "transparent";
    }
    return color;
  }
};

exports.clean = function(string) {
  string = string.replace(/[&]nbsp[;]/gi, " ").replace(/[<]br[>]/gi, "");
  return string;
};

exports.svg = function(svg) {
  var endIndex, hEndIndex, hStartIndex, height, heightString, newHeight, newString, newWidth, startIndex, string, wEndIndex, wStartIndex, width;
  startIndex = svg.search("<svg width=");
  endIndex = svg.search(" viewBox");
  string = svg.slice(startIndex, endIndex);
  wStartIndex = string.search("=") + 2;
  wEndIndex = string.search("px");
  width = string.slice(wStartIndex, wEndIndex);
  newWidth = exports.px(width);
  heightString = string.slice(wEndIndex + 4, string.length);
  hStartIndex = heightString.search("=") + 2;
  hEndIndex = heightString.search("px");
  height = heightString.slice(hStartIndex, hEndIndex);
  newHeight = exports.px(height);
  newString = string.replace(width, newWidth);
  newString = newString.replace(height, newHeight);
  svg = svg.replace(string, newString);
  return {
    svg: svg,
    width: newWidth,
    height: newHeight
  };
};

exports.changeFill = function(layer, color) {
  var endIndex, fillString, newString, startIndex, string;
  if (typeof color !== "object") {
    color = exports.color(color);
  }
  startIndex = layer.html.search("fill=\"#");
  fillString = layer.html.slice(startIndex, layer.html.length);
  endIndex = fillString.search("\"") + 8;
  string = fillString.slice(0, endIndex);
  newString = "fill=\"" + color;
  return layer.html = layer.html.replace(string, newString);
};

exports.capitalize = function(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

exports.getTime = function() {
  var date, dateObj, day, daysOfTheWeek, hours, mins, month, monthsOfTheYear, secs;
  daysOfTheWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  monthsOfTheYear = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  dateObj = new Date();
  month = monthsOfTheYear[dateObj.getMonth()];
  date = dateObj.getDate();
  day = daysOfTheWeek[dateObj.getDay()];
  hours = dateObj.getHours();
  mins = dateObj.getMinutes();
  secs = dateObj.getSeconds();
  return {
    month: month,
    date: date,
    day: day,
    hours: hours,
    mins: mins,
    secs: secs
  };
};

exports.bgBlur = function(layer) {
  layer.style["-webkit-backdrop-filter"] = "blur(" + (exports.px(5)) + "px)";
  return layer;
};

exports.textAutoSize = function(textLayer) {
  var constraints, styles, textFrame;
  constraints = {};
  if (textLayer.constraints) {
    if (textLayer.constraints.height) {
      constraints.height = exports.px(textLayer.constraints.height);
    }
    if (textLayer.constraints.width) {
      constraints.width = exports.px(textLayer.constraints.width);
    }
  }
  styles = {
    fontSize: textLayer.style.fontSize,
    fontFamily: textLayer.style.fontFamily,
    fontWeight: textLayer.style.fontWeight,
    fontStyle: textLayer.style.fontStyle,
    lineHeight: textLayer.style.lineHeight,
    letterSpacing: textLayer.style.letterSpacing,
    textTransform: textLayer.style.textTransform
  };
  textFrame = Utils.textSize(textLayer.html, styles, constraints);
  return {
    width: textFrame.width,
    height: textFrame.height
  };
};

exports.getDevice = function() {
  var device, frame;
  device = "";
  frame = true;
  if (m.lib.realDevices[innerWidth] && m.lib.realDevices[innerWidth][innerHeight]) {
    device = m.lib.realDevices[innerWidth][innerHeight];
    frame = false;
    Framer.Device.deviceType = "fullscreen";
  }
  if (frame) {
    device = {
      name: Framer.Device.deviceType,
      width: Framer.DeviceView.Devices[Framer.Device.deviceType].screenWidth,
      height: Framer.DeviceView.Devices[Framer.Device.deviceType].screenHeight,
      scale: m.lib.framerFrames[Framer.DeviceView.Devices[Framer.Device.deviceType].screenWidth]
    };
  }
  if (device.scale === void 0) {
    device.scale = 2;
  }
  if (device.width === void 0) {
    device.width = innerWidth;
  }
  if (device.height === void 0) {
    device.height = innerHeight;
  }
  return device;
};

exports.specialChar = function(layer) {
  var chosenColor, newText, text;
  text = layer;
  if (layer.type === "button") {
    text = layer.label;
  }
  if (text.html.indexOf("-b") !== -1) {
    newText = text.html.replace("-b ", "");
    exports.update(text, [
      {
        text: newText
      }, {
        fontWeight: 600
      }
    ]);
  }
  if (text.html.indexOf("-r") !== -1) {
    newText = text.html.replace("-r ", "");
    exports.update(text, [
      {
        text: newText
      }, {
        color: "red"
      }
    ]);
  }
  if (text.html.indexOf("-rb") !== -1) {
    newText = text.html.replace("-rb ", "");
    exports.update(text, [
      {
        text: newText
      }, {
        color: "blue"
      }
    ]);
  }
  if (text.html.indexOf("-lb") !== -1) {
    newText = text.html.replace("-lb ", "");
    exports.update(text, [
      {
        text: newText
      }, {
        color: "light-blue"
      }
    ]);
  }
  if (text.html.indexOf("-g") !== -1) {
    newText = text.html.replace("-g ", "");
    exports.update(text, [
      {
        text: newText
      }, {
        color: "green"
      }
    ]);
  }
  if (text.html.indexOf("-o") !== -1) {
    newText = text.html.replace("-o ", "");
    exports.update(text, [
      {
        text: newText
      }, {
        color: "orange"
      }
    ]);
  }
  if (text.html.indexOf("-p") !== -1) {
    newText = text.html.replace("-p ", "");
    exports.update(text, [
      {
        text: newText
      }, {
        color: "orange"
      }
    ]);
  }
  if (text.html.indexOf("-y") !== -1) {
    newText = text.html.replace("-y ", "");
    exports.update(text, [
      {
        text: newText
      }, {
        color: "yellow"
      }
    ]);
  }
  if (text.html.indexOf("-#") !== -1) {
    chosenColor = text.html.slice(1, 8);
    newText = text.html.slice(9, text.html.length);
    exports.update(text, [
      {
        text: newText
      }, {
        color: chosenColor
      }
    ]);
  }
  if (text.html.indexOf("-") !== -1) {
    newText = text.html.replace("- ", "");
    exports.update(text, [
      {
        text: newText
      }
    ]);
  }
  if (layer.buttonType === "text") {
    layer.width = text.width;
  }
  return m.layout.set();
};

exports.update = function(layer, array) {
  var change, j, key, len, textFrame, value;
  if (array === void 0) {
    array = [];
  }
  if (layer.type === "text") {
    for (j = 0, len = array.length; j < len; j++) {
      change = array[j];
      key = Object.keys(change)[0];
      value = change[key];
      if (key === "text") {
        layer.html = value;
      }
      if (key === "fontWeight") {
        layer.style[key] = value;
      }
      if (key === "color") {
        layer.color = exports.color(value);
      }
    }
    textFrame = exports.textAutoSize(layer);
    layer.width = textFrame.width;
    layer.height = textFrame.height;
  }
  return m.layout.set();
};

exports.autoColor = function(colorObject) {
  var blue, color, green, red, rgb;
  rgb = colorObject.toRgbString();
  rgb = rgb.substring(4, rgb.length - 1);
  rgb = rgb.replace(/ /g, '');
  rgb = rgb.replace(/ /g, '');
  rgb = rgb.split(',');
  red = rgb[0];
  green = rgb[1];
  blue = rgb[2];
  color = "";
  if ((red * 0.299 + green * 0.587 + blue * 0.114) > 186) {
    color = exports.color("black");
  } else {
    color = exports.color("white");
  }
  return color;
};

exports.sameParent = function(layer1, layer2) {
  var parentOne, parentTwo;
  parentOne = layer1.superLayer;
  parentTwo = layer2.superLayer;
  if (parentOne === parentTwo) {
    return true;
  } else {
    return false;
  }
};

exports.timeDelegate = function(layer, clockType) {
  this.time = exports.getTime();
  return Utils.delay(60 - this.time.secs, function() {
    this.time = exports.getTime();
    exports.update(layer, [
      {
        text: exports.timeFormatter(this.time, clockType)
      }
    ]);
    return Utils.interval(60, function() {
      this.time = exports.getTime();
      return exports.update(layer, [
        {
          text: exports.timeFormatter(this.time, clockType)
        }
      ]);
    });
  });
};

exports.timeFormatter = function(timeObj, clockType) {
  if (clockType === false) {
    if (timeObj.hours > 12) {
      timeObj.hours = timeObj.hours - 12;
    }
    if (timeObj.hours === 0) {
      timeObj.hours = 12;
    }
  }
  if (timeObj.mins < 10) {
    timeObj.mins = "0" + timeObj.mins;
  }
  return timeObj.hours + ":" + timeObj.mins;
};

exports.setupComponent = function(array, defaults) {
  var i, j, len, obj, ref;
  if (array === void 0) {
    array = [];
  }
  obj = {};
  ref = defaults.props;
  for (j = 0, len = ref.length; j < len; j++) {
    i = ref[j];
    if (array[i] !== void 0) {
      obj[i] = array[i];
    } else {
      obj[i] = defaults[i];
    }
  }
  return obj;
};

exports.emojiFormatter = function(string) {
  var arrayOfCodes, code, decoded, j, k, len, len1, unicodeFormat;
  unicodeFormat = "";
  if (string[0] === "E" || string[0] === "3" || string[0] === "2" || string[0] === "C") {
    arrayOfCodes = string.split(" ");
    for (j = 0, len = arrayOfCodes.length; j < len; j++) {
      code = arrayOfCodes[j];
      unicodeFormat = unicodeFormat + "%" + code;
    }
  } else {
    arrayOfCodes = string.split(" ");
    unicodeFormat = "%F0%9F";
    for (k = 0, len1 = arrayOfCodes.length; k < len1; k++) {
      code = arrayOfCodes[k];
      unicodeFormat = unicodeFormat + "%" + code;
    }
  }
  decoded = decodeURIComponent(unicodeFormat);
  return decoded;
};

exports.buildEmojisObject = function() {
  var code, emoji, emojis, index, j, len, ref, results;
  emojis = [];
  ref = m.assets.emojiCodes;
  results = [];
  for (index = j = 0, len = ref.length; j < len; index = ++j) {
    code = ref[index];
    emoji = exports.emojiFormatter(code);
    results.push(emojis.push(emoji));
  }
  return results;
};

exports.toHHMMSS = function(int) {
  var hours, minutes, sec_num, seconds, timeString;
  sec_num = parseInt(int, 10);
  hours = Math.floor(sec_num / 3600);
  minutes = Math.floor((sec_num - (hours * 3600)) / 60);
  seconds = sec_num - (hours * 3600) - (minutes * 60);
  if (hours < 10) {
    hours = "0" + hours;
  }
  if (minutes < 10) {
    minutes = "" + minutes;
  }
  if (seconds < 10) {
    seconds = "0" + seconds;
  }
  timeString = "";
  if (hours !== "00") {
    timeString = hours + ':' + minutes + ':' + seconds;
  } else {
    timeString = minutes + ':' + seconds;
  }
  return timeString;
};

exports.inky = function(setup) {
  var inkColor, inkCurve, inkOpacity, inkScale, inkStartScale, inkyEffect, moveToTap, startX, startY;
  startX = setup.layer.width / 2;
  startY = setup.layer.height / 2;
  inkColor = "#0A0A0A";
  inkStartScale = .1;
  inkScale = 3;
  inkCurve = "bezier-curve(.2, 0.4, 0.4, 1.0)";
  inkOpacity = 1;
  moveToTap = true;
  if (setup.moveToTap !== void 0) {
    moveToTap = setup.moveToTap;
  }
  if (setup.color !== void 0) {
    inkColor = m.color(setup.color);
  }
  if (setup.scale !== void 0) {
    inkScale = setup.scale;
  }
  if (setup.startScale !== void 0) {
    inkStartScale = setup.startScale;
  }
  if (setup.curve !== void 0) {
    inkCurve = setup.curve;
  }
  if (setup.opacity !== void 0) {
    inkOpacity = setup.opacity;
  }
  inkyEffect = function(event, layer) {
    var circle;
    if (moveToTap === true) {
      startX = event.offsetX;
      startY = event.offsetY;
      if (Utils.isChrome() === false && Utils.isTouch()) {
        startX = event.touchCenter.x - layer.x;
        startY = event.touchCenter.y - layer.y;
      }
    }
    circle = new Layer({
      backgroundColor: inkColor,
      midX: startX,
      midY: startY,
      superLayer: layer,
      borderRadius: m.utils.px(50),
      opacity: inkOpacity
    });
    circle.scale = inkStartScale;
    circle.animate({
      properties: {
        scale: inkScale,
        opacity: 0
      },
      curve: inkCurve,
      time: .5
    });
    return Utils.delay(1, function() {
      return circle.destroy();
    });
  };
  if (Utils.isChrome() && Utils.isTouch()) {
    setup.layer.on(Events.DoubleTap, function(event) {
      return inkyEffect(event, this);
    });
  }
  if (Utils.isChrome() === false && Utils.isTouch()) {
    setup.layer.on(Events.Tap, function(event) {
      return inkyEffect(event, this);
    });
  }
  if (Utils.isDesktop()) {
    return setup.layer.on(Events.TouchEnd, function(event) {
      return inkyEffect(event, this);
    });
  }
};


},{"material-kit":"material-kit"}],"material-kit-video":[function(require,module,exports){
var m;

m = require('material-kit');

exports.defaults = {
  video: void 0,
  superLayer: void 0,
  height: m.px(205),
  width: m.px(100),
  backgroundColor: "transparent",
  autoplay: true,
  constraints: {
    top: 0
  },
  max: true,
  progressColor: "blue800",
  mute: false,
  loop: false,
  idleLimit: 3,
  showPlayStop: true,
  image: void 0
};

exports.defaults.props = Object.keys(exports.defaults);

exports.create = function(array) {
  var UIdelegate, UIset, ratio, setup, videoLayer;
  setup = m.utils.setupComponent(array, exports.defaults);
  if (setup.max) {
    ratio = 0.5625;
    setup.width = m.device.width;
    setup.height = setup.width * 0.5625;
  }
  videoLayer = new VideoLayer({
    superLayer: setup.superLayer,
    video: setup.video,
    height: setup.height,
    width: setup.width,
    backgroundColor: setup.backgroundColor,
    name: "video"
  });
  if (setup.image) {
    videoLayer.image = setup.image;
  }
  videoLayer.player.autoplay = setup.autoplay;
  videoLayer.player.muted = setup.mute;
  videoLayer.player.loop = setup.loop;
  if (setup.constraints) {
    videoLayer.constraints = setup.constraints;
    m.layout.set(videoLayer);
  }
  videoLayer.controls = new Layer({
    height: videoLayer.height,
    width: videoLayer.width,
    superLayer: videoLayer,
    backgroundColor: "transparent",
    name: "controls"
  });
  UIset = function() {
    var idleTime;
    videoLayer.isFullScreen = false;
    videoLayer.playstop = new Layer({
      backgroundColor: m.color("black"),
      superLayer: videoLayer.controls,
      borderRadius: m.px(50),
      height: m.px(50),
      width: m.px(50),
      opacity: .6,
      name: "play/stop"
    });
    if (setup.showPlayStop === false) {
      videoLayer.playstop.opacity = 0;
    }
    videoLayer.playstop.center();
    videoLayer.pause = new m.Icon({
      name: "pause",
      color: "white"
    });
    videoLayer.play = new m.Icon({
      name: "play_arrow",
      color: "white"
    });
    videoLayer.fullscreen = new m.Icon({
      name: "fullscreen",
      color: "white"
    });
    videoLayer.fullscreen.constraints = {
      bottom: 0,
      trailing: 10
    };
    videoLayer.fullscreenExit = new m.Icon({
      name: "fullscreen_exit",
      color: "white"
    });
    videoLayer.fullscreenExit.constraints = {
      bottom: 0,
      trailing: 10
    };
    m.layout.set(videoLayer.fullscreen);
    videoLayer.play.visible = false;
    videoLayer.fullscreenExit.visible = false;
    videoLayer.controls.addSubLayer(videoLayer.pause);
    videoLayer.controls.addSubLayer(videoLayer.play);
    videoLayer.controls.addSubLayer(videoLayer.fullscreen);
    videoLayer.controls.addSubLayer(videoLayer.fullscreenExit);
    videoLayer.pause.center();
    videoLayer.play.center();
    videoLayer.currentTime = new m.Text({
      text: m.utils.toHHMMSS(videoLayer.player.currentTime),
      color: "white",
      constraints: {
        bottom: 8,
        leading: 17
      },
      superLayer: videoLayer.controls,
      fontSize: 14,
      name: "currentTime"
    });
    videoLayer.endTime = new m.Text({
      text: m.utils.toHHMMSS(videoLayer.player.duration),
      color: "white",
      constraints: {
        bottomEdges: videoLayer.currentTime,
        trailing: [videoLayer.fullscreen, 10]
      },
      superLayer: videoLayer.controls,
      fontSize: 14,
      name: "endTime"
    });
    videoLayer.timebar = new Layer({
      superLayer: videoLayer.controls,
      backgroundColor: m.color("grey300"),
      name: "timebar",
      opacity: .7
    });
    videoLayer.timebar.constraints = {
      leading: [videoLayer.currentTime, 20],
      trailing: [videoLayer.endTime, 20],
      height: 3,
      verticalCenter: videoLayer.currentTime
    };
    m.layout.set(videoLayer.timebar);
    videoLayer.seeker = new Layer({
      backgroundColor: "transparent",
      superLayer: videoLayer.controls,
      name: "seeker"
    });
    videoLayer.seeker.constraints = {
      width: 50,
      height: 50,
      verticalCenter: videoLayer.currentTime
    };
    m.layout.set(videoLayer.seeker);
    videoLayer.seekerDot = new Layer({
      width: m.px(15),
      height: m.px(15),
      borderRadius: m.px(15),
      backgroundColor: m.color(setup.progressColor),
      superLayer: videoLayer.seeker,
      name: "seekerDot"
    });
    videoLayer.seekerDot.center();
    videoLayer.progressBar = new Layer({
      backgroundColor: m.color(setup.progressColor),
      width: 0,
      superLayer: videoLayer.controls,
      name: "progress bar"
    });
    videoLayer.progressBar.constraints = {
      height: 3,
      verticalCenter: videoLayer.timebar
    };
    m.layout.set({
      target: [videoLayer.seeker, videoLayer.progressBar]
    });
    videoLayer.seekerOffset = videoLayer.seeker.width / 2 - videoLayer.seekerDot.width / 2;
    videoLayer.seeker.x = videoLayer.timebar.x - videoLayer.seekerOffset;
    videoLayer.progressBar.x = videoLayer.timebar.x;
    idleTime = 0;
    Utils.interval(1, function() {
      idleTime++;
      if (idleTime > setup.idleLimit && videoLayer.player.paused === false && videoLayer.seeker.working !== true) {
        videoLayer.controls.animate({
          properties: {
            opacity: 0
          },
          time: .25
        });
        return videoLayer.playstop.visible = false;
      } else {
        videoLayer.controls.opacity = 1;
        return videoLayer.playstop.visible = true;
      }
    });
    videoLayer.controls.on(Events.TouchStart, function() {
      if (idleTime > setup.idleLimit) {
        return idleTime = 0;
      } else {
        return idleTime = 5;
      }
    });
    videoLayer.playstop.on(Events.TouchEnd, function() {
      if (videoLayer.player.paused) {
        videoLayer.play.visible = false;
        videoLayer.pause.visible = true;
        return videoLayer.player.play();
      } else {
        videoLayer.play.visible = true;
        videoLayer.pause.visible = false;
        return videoLayer.player.pause();
      }
    });
    videoLayer.fullscreen.on(Events.TouchEnd, function() {
      videoLayer.fullscreen.visible = false;
      videoLayer.fullscreenExit.visible = true;
      videoLayer.cacheProps = videoLayer.props;
      videoLayer.cacheAlign = videoLayer.constraints.align;
      if (videoLayer.onFullScreen) {
        videoLayer.onFullScreen();
      }
      idleTime = 0;
      videoLayer.backdrop = new Layer({
        backgroundColor: "black",
        width: m.device.width,
        height: m.device.height,
        name: "backdrop"
      });
      videoLayer.constraints.align = "center";
      videoLayer.animate({
        properties: {
          width: m.device.width,
          height: m.device.width * 0.5625
        },
        time: .5
      });
      m.layout.animate({
        target: videoLayer,
        time: .5
      });
      if (setup.superLayer) {
        videoLayer.backdrop.superLayer = setup.superLayer;
        videoLayer.backdrop.placeBehind(videoLayer);
      } else {
        videoLayer.backdrop.placeBehind(videoLayer);
      }
      return m.addToStack(videoLayer);
    });
    videoLayer.fullscreenExit.on(Events.TouchEnd, function() {
      videoLayer.fullscreen.visible = true;
      videoLayer.fullscreenExit.visible = false;
      idleTime = 0;
      return m.removeFromStack();
    });
    videoLayer.exit = function() {
      videoLayer.animate({
        properties: {
          x: videoLayer.cacheProps.x,
          y: videoLayer.cacheProps.y,
          width: videoLayer.cacheProps.width,
          height: videoLayer.cacheProps.height
        },
        time: .5
      });
      videoLayer.constraints.align = videoLayer.cacheAlign;
      videoLayer.backdrop.animate({
        properties: {
          opacity: 0
        },
        time: .5,
        delay: .2
      });
      Utils.delay(.7, function() {
        return videoLayer.backdrop.destroy();
      });
      videoLayer.fullscreen.visible = true;
      videoLayer.fullscreenExit.visible = false;
      if (videoLayer.onFullScreenExit) {
        return videoLayer.onFullScreenExit();
      }
    };
    videoLayer.seeker.draggable.enabled = true;
    videoLayer.seeker.draggable.speedY = 0;
    videoLayer.seeker.draggable.speedX = 1;
    videoLayer.seeker.draggable.momentum = false;
    videoLayer.seeker.draggable.bounce = false;
    videoLayer.seeker.on(Events.TouchStart, function() {
      videoLayer.seeker.scale = 1.2;
      return videoLayer.seeker.working = true;
    });
    videoLayer.seeker.on(Events.DragMove, function() {
      var newCT;
      videoLayer.seeker.working = true;
      if (videoLayer.seeker.x + videoLayer.seekerOffset < videoLayer.timebar.x) {
        videoLayer.seeker.x = videoLayer.timebar.x - videoLayer.seekerOffset;
      }
      if (videoLayer.seeker.maxX > videoLayer.timebar.maxX + videoLayer.seekerOffset) {
        videoLayer.seeker.maxX = videoLayer.timebar.maxX + videoLayer.seekerOffset;
      }
      newCT = videoLayer.player.duration * ((videoLayer.seeker.x + videoLayer.seekerOffset - videoLayer.timebar.x) / videoLayer.timebar.width);
      if (newCT < 0) {
        newCT = 0;
      }
      if (newCT > videoLayer.player.duration) {
        newCT = videoLayer.player.duration;
      }
      return m.utils.update(videoLayer.currentTime, [
        {
          text: m.utils.toHHMMSS(newCT)
        }
      ]);
    });
    return videoLayer.seeker.on(Events.DragEnd, function() {
      var et, newCT;
      videoLayer.seeker.scale = 1;
      videoLayer.seeker.working = false;
      et = videoLayer.player.duration;
      newCT = et * ((videoLayer.seeker.x + videoLayer.seekerOffset - videoLayer.timebar.x) / videoLayer.timebar.width);
      if (newCT < 0) {
        newCT = 0;
      }
      if (newCT > videoLayer.player.duration) {
        newCT = videoLayer.player.duration;
      }
      newCT = Math.round(newCT);
      return videoLayer.player.currentTime = newCT;
    });
  };
  UIdelegate = function() {
    var ct, et;
    ct = videoLayer.player.currentTime;
    et = videoLayer.player.duration;
    if (videoLayer.seeker.working) {

    } else {
      m.utils.update(videoLayer.currentTime, [
        {
          text: m.utils.toHHMMSS(videoLayer.player.currentTime)
        }
      ]);
      videoLayer.seeker.x = videoLayer.timebar.x + (videoLayer.timebar.width * ct / et) - videoLayer.seekerOffset;
      return videoLayer.progressBar.width = videoLayer.seeker.x + videoLayer.seekerOffset - videoLayer.timebar.x;
    }
  };
  videoLayer.player.addEventListener("loadeddata", UIset);
  videoLayer.player.addEventListener("timeupdate", UIdelegate);
  return videoLayer;
};


},{"material-kit":"material-kit"}],"material-kit":[function(require,module,exports){
var appbar, banner, bottomnav, button, dialog, icon, layout, library, nav, snackbar, stack, status, text, utils, video;

exports.layout = layout = require('material-kit-layout');

exports.lib = library = require('material-kit-library');

exports.utils = utils = require('material-kit-utils');

exports.stack = stack = require('material-kit-stack');

exports.device = utils.getDevice();

exports.assets = library.assets;

exports.color = function(colorString) {
  return exports.utils.color(colorString);
};

exports.dp = function(px) {
  return exports.utils.pt(px);
};

exports.px = function(dp) {
  return exports.utils.px(dp);
};

exports.stack = stack.stack;

exports.addToStack = function(layer) {
  return stack.addToStack(layer);
};

exports.removeFromStack = function(layer) {
  return stack.removeFromStack(layer);
};

appbar = require('material-kit-app-bar');

banner = require('material-kit-banner');

button = require('material-kit-button');

dialog = require('material-kit-dialog');

icon = require('material-kit-icon');

nav = require('material-kit-nav-bar');

snackbar = require('material-kit-snack-bar');

status = require('material-kit-status-bar');

text = require('material-kit-text');

video = require('material-kit-video');

bottomnav = require('material-kit-bottom-nav');

exports.AppBar = appbar.create;

exports.Banner = banner.create;

exports.Button = button.create;

exports.Dialog = dialog.create;

exports.Icon = icon.create;

exports.NavBar = nav.create;

exports.SnackBar = snackbar.create;

exports.StatusBar = status.create;

exports.Text = text.create;

exports.Video = video.create;

exports.BottomNav = bottomnav.create;


},{"material-kit-app-bar":"material-kit-app-bar","material-kit-banner":"material-kit-banner","material-kit-bottom-nav":"material-kit-bottom-nav","material-kit-button":"material-kit-button","material-kit-dialog":"material-kit-dialog","material-kit-icon":"material-kit-icon","material-kit-layout":"material-kit-layout","material-kit-library":"material-kit-library","material-kit-nav-bar":"material-kit-nav-bar","material-kit-snack-bar":"material-kit-snack-bar","material-kit-stack":"material-kit-stack","material-kit-status-bar":"material-kit-status-bar","material-kit-text":"material-kit-text","material-kit-utils":"material-kit-utils","material-kit-video":"material-kit-video"}],"myModule":[function(require,module,exports){
exports.myVar = "myVariable";

exports.myFunction = function() {
  return print("myFunction is running");
};

exports.myArray = [1, 2, 3];


},{}]},{},[])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnJhbWVyLm1vZHVsZXMuanMiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL1VzZXJzL2RpbWl0cmllL1Byb2plY3RzL2dpdGxhYi1kZXNpZ24vcHJvZ3Jlc3MvZGltaXRyaWUvZnJhbWVyLXRlbXBsYXRlcy9zdGFydGluZy10ZW1wbGF0ZS5mcmFtZXIvbW9kdWxlcy9teU1vZHVsZS5jb2ZmZWUiLCIuLi8uLi8uLi8uLi8uLi9Vc2Vycy9kaW1pdHJpZS9Qcm9qZWN0cy9naXRsYWItZGVzaWduL3Byb2dyZXNzL2RpbWl0cmllL2ZyYW1lci10ZW1wbGF0ZXMvc3RhcnRpbmctdGVtcGxhdGUuZnJhbWVyL21vZHVsZXMvbWF0ZXJpYWwta2l0LmNvZmZlZSIsIi4uLy4uLy4uLy4uLy4uL1VzZXJzL2RpbWl0cmllL1Byb2plY3RzL2dpdGxhYi1kZXNpZ24vcHJvZ3Jlc3MvZGltaXRyaWUvZnJhbWVyLXRlbXBsYXRlcy9zdGFydGluZy10ZW1wbGF0ZS5mcmFtZXIvbW9kdWxlcy9tYXRlcmlhbC1raXQtdmlkZW8uY29mZmVlIiwiLi4vLi4vLi4vLi4vLi4vVXNlcnMvZGltaXRyaWUvUHJvamVjdHMvZ2l0bGFiLWRlc2lnbi9wcm9ncmVzcy9kaW1pdHJpZS9mcmFtZXItdGVtcGxhdGVzL3N0YXJ0aW5nLXRlbXBsYXRlLmZyYW1lci9tb2R1bGVzL21hdGVyaWFsLWtpdC11dGlscy5jb2ZmZWUiLCIuLi8uLi8uLi8uLi8uLi9Vc2Vycy9kaW1pdHJpZS9Qcm9qZWN0cy9naXRsYWItZGVzaWduL3Byb2dyZXNzL2RpbWl0cmllL2ZyYW1lci10ZW1wbGF0ZXMvc3RhcnRpbmctdGVtcGxhdGUuZnJhbWVyL21vZHVsZXMvbWF0ZXJpYWwta2l0LXRleHQuY29mZmVlIiwiLi4vLi4vLi4vLi4vLi4vVXNlcnMvZGltaXRyaWUvUHJvamVjdHMvZ2l0bGFiLWRlc2lnbi9wcm9ncmVzcy9kaW1pdHJpZS9mcmFtZXItdGVtcGxhdGVzL3N0YXJ0aW5nLXRlbXBsYXRlLmZyYW1lci9tb2R1bGVzL21hdGVyaWFsLWtpdC1zdGF0dXMtYmFyLmNvZmZlZSIsIi4uLy4uLy4uLy4uLy4uL1VzZXJzL2RpbWl0cmllL1Byb2plY3RzL2dpdGxhYi1kZXNpZ24vcHJvZ3Jlc3MvZGltaXRyaWUvZnJhbWVyLXRlbXBsYXRlcy9zdGFydGluZy10ZW1wbGF0ZS5mcmFtZXIvbW9kdWxlcy9tYXRlcmlhbC1raXQtc3RhY2suY29mZmVlIiwiLi4vLi4vLi4vLi4vLi4vVXNlcnMvZGltaXRyaWUvUHJvamVjdHMvZ2l0bGFiLWRlc2lnbi9wcm9ncmVzcy9kaW1pdHJpZS9mcmFtZXItdGVtcGxhdGVzL3N0YXJ0aW5nLXRlbXBsYXRlLmZyYW1lci9tb2R1bGVzL21hdGVyaWFsLWtpdC1zbmFjay1iYXIuY29mZmVlIiwiLi4vLi4vLi4vLi4vLi4vVXNlcnMvZGltaXRyaWUvUHJvamVjdHMvZ2l0bGFiLWRlc2lnbi9wcm9ncmVzcy9kaW1pdHJpZS9mcmFtZXItdGVtcGxhdGVzL3N0YXJ0aW5nLXRlbXBsYXRlLmZyYW1lci9tb2R1bGVzL21hdGVyaWFsLWtpdC1uYXYtYmFyLmNvZmZlZSIsIi4uLy4uLy4uLy4uLy4uL1VzZXJzL2RpbWl0cmllL1Byb2plY3RzL2dpdGxhYi1kZXNpZ24vcHJvZ3Jlc3MvZGltaXRyaWUvZnJhbWVyLXRlbXBsYXRlcy9zdGFydGluZy10ZW1wbGF0ZS5mcmFtZXIvbW9kdWxlcy9tYXRlcmlhbC1raXQtbGlicmFyeS5jb2ZmZWUiLCIuLi8uLi8uLi8uLi8uLi9Vc2Vycy9kaW1pdHJpZS9Qcm9qZWN0cy9naXRsYWItZGVzaWduL3Byb2dyZXNzL2RpbWl0cmllL2ZyYW1lci10ZW1wbGF0ZXMvc3RhcnRpbmctdGVtcGxhdGUuZnJhbWVyL21vZHVsZXMvbWF0ZXJpYWwta2l0LWxheW91dC5jb2ZmZWUiLCIuLi8uLi8uLi8uLi8uLi9Vc2Vycy9kaW1pdHJpZS9Qcm9qZWN0cy9naXRsYWItZGVzaWduL3Byb2dyZXNzL2RpbWl0cmllL2ZyYW1lci10ZW1wbGF0ZXMvc3RhcnRpbmctdGVtcGxhdGUuZnJhbWVyL21vZHVsZXMvbWF0ZXJpYWwta2l0LWljb24uY29mZmVlIiwiLi4vLi4vLi4vLi4vLi4vVXNlcnMvZGltaXRyaWUvUHJvamVjdHMvZ2l0bGFiLWRlc2lnbi9wcm9ncmVzcy9kaW1pdHJpZS9mcmFtZXItdGVtcGxhdGVzL3N0YXJ0aW5nLXRlbXBsYXRlLmZyYW1lci9tb2R1bGVzL21hdGVyaWFsLWtpdC1kaWFsb2cuY29mZmVlIiwiLi4vLi4vLi4vLi4vLi4vVXNlcnMvZGltaXRyaWUvUHJvamVjdHMvZ2l0bGFiLWRlc2lnbi9wcm9ncmVzcy9kaW1pdHJpZS9mcmFtZXItdGVtcGxhdGVzL3N0YXJ0aW5nLXRlbXBsYXRlLmZyYW1lci9tb2R1bGVzL21hdGVyaWFsLWtpdC1idXR0b24uY29mZmVlIiwiLi4vLi4vLi4vLi4vLi4vVXNlcnMvZGltaXRyaWUvUHJvamVjdHMvZ2l0bGFiLWRlc2lnbi9wcm9ncmVzcy9kaW1pdHJpZS9mcmFtZXItdGVtcGxhdGVzL3N0YXJ0aW5nLXRlbXBsYXRlLmZyYW1lci9tb2R1bGVzL21hdGVyaWFsLWtpdC1ib3R0b20tbmF2LmNvZmZlZSIsIi4uLy4uLy4uLy4uLy4uL1VzZXJzL2RpbWl0cmllL1Byb2plY3RzL2dpdGxhYi1kZXNpZ24vcHJvZ3Jlc3MvZGltaXRyaWUvZnJhbWVyLXRlbXBsYXRlcy9zdGFydGluZy10ZW1wbGF0ZS5mcmFtZXIvbW9kdWxlcy9tYXRlcmlhbC1raXQtYmFubmVyLmNvZmZlZSIsIi4uLy4uLy4uLy4uLy4uL1VzZXJzL2RpbWl0cmllL1Byb2plY3RzL2dpdGxhYi1kZXNpZ24vcHJvZ3Jlc3MvZGltaXRyaWUvZnJhbWVyLXRlbXBsYXRlcy9zdGFydGluZy10ZW1wbGF0ZS5mcmFtZXIvbW9kdWxlcy9tYXRlcmlhbC1raXQtYXBwLWJhci5jb2ZmZWUiLCJub2RlX21vZHVsZXMvYnJvd3Nlci1wYWNrL19wcmVsdWRlLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIiMgQWRkIHRoZSBmb2xsb3dpbmcgbGluZSB0byB5b3VyIHByb2plY3QgaW4gRnJhbWVyIFN0dWRpby4gXG4jIG15TW9kdWxlID0gcmVxdWlyZSBcIm15TW9kdWxlXCJcbiMgUmVmZXJlbmNlIHRoZSBjb250ZW50cyBieSBuYW1lLCBsaWtlIG15TW9kdWxlLm15RnVuY3Rpb24oKSBvciBteU1vZHVsZS5teVZhclxuXG5leHBvcnRzLm15VmFyID0gXCJteVZhcmlhYmxlXCJcblxuZXhwb3J0cy5teUZ1bmN0aW9uID0gLT5cblx0cHJpbnQgXCJteUZ1bmN0aW9uIGlzIHJ1bm5pbmdcIlxuXG5leHBvcnRzLm15QXJyYXkgPSBbMSwgMiwgM10iLCIjbWF0ZXJpYWxLaXQgTW9kdWxlXG4jQnkgS2V2eW4gQXJub3R0XG5cbiMgSW1wb3J0IGZyYW1ld29ya1xuZXhwb3J0cy5sYXlvdXQgPSBsYXlvdXQgPSByZXF1aXJlICdtYXRlcmlhbC1raXQtbGF5b3V0J1xuZXhwb3J0cy5saWIgPSBsaWJyYXJ5ID0gcmVxdWlyZSAnbWF0ZXJpYWwta2l0LWxpYnJhcnknXG5leHBvcnRzLnV0aWxzID0gdXRpbHMgPSByZXF1aXJlICdtYXRlcmlhbC1raXQtdXRpbHMnXG5leHBvcnRzLnN0YWNrID0gc3RhY2sgPSByZXF1aXJlICdtYXRlcmlhbC1raXQtc3RhY2snXG5cbiMgU2V0dXAgcmVzb3VyY2VzXG5leHBvcnRzLmRldmljZSA9IHV0aWxzLmdldERldmljZSgpXG5leHBvcnRzLmFzc2V0cyA9IGxpYnJhcnkuYXNzZXRzXG5cbiMjIFNob3J0Y3V0c1xuZXhwb3J0cy5jb2xvciA9IChjb2xvclN0cmluZykgLT5cbiAgcmV0dXJuIGV4cG9ydHMudXRpbHMuY29sb3IoY29sb3JTdHJpbmcpXG5cbmV4cG9ydHMuZHAgPSAocHgpIC0+XG4gIHJldHVybiBleHBvcnRzLnV0aWxzLnB0KHB4KVxuXG5leHBvcnRzLnB4ID0gKGRwKSAtPlxuICByZXR1cm4gZXhwb3J0cy51dGlscy5weChkcClcblxuZXhwb3J0cy5zdGFjayA9IHN0YWNrLnN0YWNrXG5cbmV4cG9ydHMuYWRkVG9TdGFjayA9IChsYXllcikgLT5cbiAgc3RhY2suYWRkVG9TdGFjayhsYXllcilcblxuZXhwb3J0cy5yZW1vdmVGcm9tU3RhY2sgPSAobGF5ZXIpIC0+XG4gIHN0YWNrLnJlbW92ZUZyb21TdGFjayhsYXllcilcblxuXG4jIEltcG9ydCBDb21wb25lbnRzXG5hcHBiYXIgPSByZXF1aXJlICdtYXRlcmlhbC1raXQtYXBwLWJhcidcbmJhbm5lciA9IHJlcXVpcmUgJ21hdGVyaWFsLWtpdC1iYW5uZXInXG5idXR0b24gPSByZXF1aXJlICdtYXRlcmlhbC1raXQtYnV0dG9uJ1xuZGlhbG9nID0gcmVxdWlyZSAnbWF0ZXJpYWwta2l0LWRpYWxvZydcbmljb24gPSByZXF1aXJlICdtYXRlcmlhbC1raXQtaWNvbidcbm5hdiA9IHJlcXVpcmUgJ21hdGVyaWFsLWtpdC1uYXYtYmFyJ1xuc25hY2tiYXIgPSByZXF1aXJlICdtYXRlcmlhbC1raXQtc25hY2stYmFyJ1xuc3RhdHVzID0gcmVxdWlyZSAnbWF0ZXJpYWwta2l0LXN0YXR1cy1iYXInXG50ZXh0ID0gcmVxdWlyZSAnbWF0ZXJpYWwta2l0LXRleHQnXG52aWRlbyA9IHJlcXVpcmUgJ21hdGVyaWFsLWtpdC12aWRlbydcbmJvdHRvbW5hdiA9IHJlcXVpcmUgJ21hdGVyaWFsLWtpdC1ib3R0b20tbmF2J1xuXG4jIyBTZXR1cCBDb21wb25lbnRzXG5leHBvcnRzLkFwcEJhciA9IGFwcGJhci5jcmVhdGVcbmV4cG9ydHMuQmFubmVyID0gYmFubmVyLmNyZWF0ZVxuZXhwb3J0cy5CdXR0b24gPSBidXR0b24uY3JlYXRlXG5leHBvcnRzLkRpYWxvZyA9IGRpYWxvZy5jcmVhdGVcbmV4cG9ydHMuSWNvbiA9IGljb24uY3JlYXRlXG5leHBvcnRzLk5hdkJhciA9IG5hdi5jcmVhdGVcbmV4cG9ydHMuU25hY2tCYXIgPSBzbmFja2Jhci5jcmVhdGVcbmV4cG9ydHMuU3RhdHVzQmFyID0gc3RhdHVzLmNyZWF0ZVxuZXhwb3J0cy5UZXh0ID0gdGV4dC5jcmVhdGVcbmV4cG9ydHMuVmlkZW8gPSB2aWRlby5jcmVhdGVcbmV4cG9ydHMuQm90dG9tTmF2ID0gYm90dG9tbmF2LmNyZWF0ZVxuIiwibSA9IHJlcXVpcmUgJ21hdGVyaWFsLWtpdCdcblxuZXhwb3J0cy5kZWZhdWx0cyA9IHtcbiAgdmlkZW86dW5kZWZpbmVkXG4gIHN1cGVyTGF5ZXI6dW5kZWZpbmVkXG4gIGhlaWdodDptLnB4KDIwNSlcbiAgd2lkdGg6bS5weCgxMDApXG4gIGJhY2tncm91bmRDb2xvcjpcInRyYW5zcGFyZW50XCJcbiAgYXV0b3BsYXk6dHJ1ZVxuICBjb25zdHJhaW50czp7dG9wOjB9XG4gIG1heDp0cnVlXG4gIHByb2dyZXNzQ29sb3I6IFwiYmx1ZTgwMFwiXG4gIG11dGU6ZmFsc2VcbiAgbG9vcDpmYWxzZVxuICBpZGxlTGltaXQ6M1xuICBzaG93UGxheVN0b3A6dHJ1ZVxuICBpbWFnZTp1bmRlZmluZWRcbn1cblxuZXhwb3J0cy5kZWZhdWx0cy5wcm9wcyA9IE9iamVjdC5rZXlzKGV4cG9ydHMuZGVmYXVsdHMpXG5cbmV4cG9ydHMuY3JlYXRlID0gKGFycmF5KSAtPlxuICBzZXR1cCA9IG0udXRpbHMuc2V0dXBDb21wb25lbnQoYXJyYXksIGV4cG9ydHMuZGVmYXVsdHMpXG4gIGlmIHNldHVwLm1heFxuICAgICAgcmF0aW8gPSAwLjU2MjVcbiAgICAgIHNldHVwLndpZHRoID0gbS5kZXZpY2Uud2lkdGhcbiAgICAgIHNldHVwLmhlaWdodCA9IHNldHVwLndpZHRoICogMC41NjI1XG5cbiAgdmlkZW9MYXllciA9IG5ldyBWaWRlb0xheWVyXG4gICAgc3VwZXJMYXllcjpzZXR1cC5zdXBlckxheWVyXG4gICAgdmlkZW86c2V0dXAudmlkZW9cbiAgICBoZWlnaHQ6c2V0dXAuaGVpZ2h0XG4gICAgd2lkdGg6c2V0dXAud2lkdGhcbiAgICBiYWNrZ3JvdW5kQ29sb3I6c2V0dXAuYmFja2dyb3VuZENvbG9yXG4gICAgbmFtZTpcInZpZGVvXCJcblxuICBpZiBzZXR1cC5pbWFnZVxuICAgIHZpZGVvTGF5ZXIuaW1hZ2UgPSBzZXR1cC5pbWFnZVxuXG4gIHZpZGVvTGF5ZXIucGxheWVyLmF1dG9wbGF5ID0gc2V0dXAuYXV0b3BsYXlcbiAgdmlkZW9MYXllci5wbGF5ZXIubXV0ZWQgPSBzZXR1cC5tdXRlXG4gIHZpZGVvTGF5ZXIucGxheWVyLmxvb3AgPSBzZXR1cC5sb29wXG5cbiAgaWYgc2V0dXAuY29uc3RyYWludHNcbiAgICB2aWRlb0xheWVyLmNvbnN0cmFpbnRzID0gc2V0dXAuY29uc3RyYWludHNcbiAgICBtLmxheW91dC5zZXQodmlkZW9MYXllcilcblxuICB2aWRlb0xheWVyLmNvbnRyb2xzID0gbmV3IExheWVyXG4gICAgaGVpZ2h0OnZpZGVvTGF5ZXIuaGVpZ2h0XG4gICAgd2lkdGg6dmlkZW9MYXllci53aWR0aFxuICAgIHN1cGVyTGF5ZXI6dmlkZW9MYXllclxuICAgIGJhY2tncm91bmRDb2xvcjpcInRyYW5zcGFyZW50XCJcbiAgICBuYW1lOlwiY29udHJvbHNcIlxuXG4gIFVJc2V0ID0gLT5cbiAgICB2aWRlb0xheWVyLmlzRnVsbFNjcmVlbiA9IGZhbHNlXG4gICAgdmlkZW9MYXllci5wbGF5c3RvcCA9IG5ldyBMYXllclxuICAgICAgYmFja2dyb3VuZENvbG9yOm0uY29sb3IoXCJibGFja1wiKVxuICAgICAgc3VwZXJMYXllcjp2aWRlb0xheWVyLmNvbnRyb2xzXG4gICAgICBib3JkZXJSYWRpdXM6bS5weCg1MClcbiAgICAgIGhlaWdodDptLnB4KDUwKVxuICAgICAgd2lkdGg6bS5weCg1MClcbiAgICAgIG9wYWNpdHk6LjZcbiAgICAgIG5hbWU6XCJwbGF5L3N0b3BcIlxuICAgIGlmIHNldHVwLnNob3dQbGF5U3RvcCA9PSBmYWxzZVxuICAgICAgdmlkZW9MYXllci5wbGF5c3RvcC5vcGFjaXR5ID0gMFxuICAgIHZpZGVvTGF5ZXIucGxheXN0b3AuY2VudGVyKClcblxuICAgIHZpZGVvTGF5ZXIucGF1c2UgPSBuZXcgbS5JY29uXG4gICAgXHRuYW1lOlwicGF1c2VcIlxuICAgIFx0Y29sb3I6XCJ3aGl0ZVwiXG5cbiAgICB2aWRlb0xheWVyLnBsYXkgPSBuZXcgbS5JY29uXG4gICAgXHRuYW1lOlwicGxheV9hcnJvd1wiXG4gICAgXHRjb2xvcjpcIndoaXRlXCJcblxuICAgIHZpZGVvTGF5ZXIuZnVsbHNjcmVlbiA9IG5ldyBtLkljb25cbiAgICBcdG5hbWU6XCJmdWxsc2NyZWVuXCJcbiAgICBcdGNvbG9yOlwid2hpdGVcIlxuXG4gICAgdmlkZW9MYXllci5mdWxsc2NyZWVuLmNvbnN0cmFpbnRzID1cbiAgICAgIGJvdHRvbTowXG4gICAgICB0cmFpbGluZzoxMFxuXG4gICAgdmlkZW9MYXllci5mdWxsc2NyZWVuRXhpdCA9IG5ldyBtLkljb25cbiAgICBcdG5hbWU6XCJmdWxsc2NyZWVuX2V4aXRcIlxuICAgIFx0Y29sb3I6XCJ3aGl0ZVwiXG5cbiAgICB2aWRlb0xheWVyLmZ1bGxzY3JlZW5FeGl0LmNvbnN0cmFpbnRzID1cbiAgICAgIGJvdHRvbTowXG4gICAgICB0cmFpbGluZzoxMFxuXG4gICAgbS5sYXlvdXQuc2V0KHZpZGVvTGF5ZXIuZnVsbHNjcmVlbilcblxuICAgIHZpZGVvTGF5ZXIucGxheS52aXNpYmxlID0gZmFsc2VcbiAgICB2aWRlb0xheWVyLmZ1bGxzY3JlZW5FeGl0LnZpc2libGUgPSBmYWxzZVxuXG4gICAgdmlkZW9MYXllci5jb250cm9scy5hZGRTdWJMYXllcih2aWRlb0xheWVyLnBhdXNlKVxuICAgIHZpZGVvTGF5ZXIuY29udHJvbHMuYWRkU3ViTGF5ZXIodmlkZW9MYXllci5wbGF5KVxuICAgIHZpZGVvTGF5ZXIuY29udHJvbHMuYWRkU3ViTGF5ZXIodmlkZW9MYXllci5mdWxsc2NyZWVuKVxuICAgIHZpZGVvTGF5ZXIuY29udHJvbHMuYWRkU3ViTGF5ZXIodmlkZW9MYXllci5mdWxsc2NyZWVuRXhpdClcbiAgICB2aWRlb0xheWVyLnBhdXNlLmNlbnRlcigpXG4gICAgdmlkZW9MYXllci5wbGF5LmNlbnRlcigpXG5cblxuICAgIHZpZGVvTGF5ZXIuY3VycmVudFRpbWUgPSBuZXcgbS5UZXh0XG4gICAgICB0ZXh0Om0udXRpbHMudG9ISE1NU1ModmlkZW9MYXllci5wbGF5ZXIuY3VycmVudFRpbWUpXG4gICAgICBjb2xvcjpcIndoaXRlXCJcbiAgICAgIGNvbnN0cmFpbnRzOntib3R0b206OCwgbGVhZGluZzoxN31cbiAgICAgIHN1cGVyTGF5ZXI6dmlkZW9MYXllci5jb250cm9sc1xuICAgICAgZm9udFNpemU6MTRcbiAgICAgIG5hbWU6XCJjdXJyZW50VGltZVwiXG5cbiAgICB2aWRlb0xheWVyLmVuZFRpbWUgPSBuZXcgbS5UZXh0XG4gICAgICB0ZXh0Om0udXRpbHMudG9ISE1NU1ModmlkZW9MYXllci5wbGF5ZXIuZHVyYXRpb24pXG4gICAgICBjb2xvcjpcIndoaXRlXCJcbiAgICAgIGNvbnN0cmFpbnRzOntib3R0b21FZGdlczp2aWRlb0xheWVyLmN1cnJlbnRUaW1lLCB0cmFpbGluZzpbdmlkZW9MYXllci5mdWxsc2NyZWVuLCAxMF19XG4gICAgICBzdXBlckxheWVyOnZpZGVvTGF5ZXIuY29udHJvbHNcbiAgICAgIGZvbnRTaXplOjE0XG4gICAgICBuYW1lOlwiZW5kVGltZVwiXG5cbiAgICB2aWRlb0xheWVyLnRpbWViYXIgPSBuZXcgTGF5ZXJcbiAgICAgIHN1cGVyTGF5ZXI6dmlkZW9MYXllci5jb250cm9sc1xuICAgICAgYmFja2dyb3VuZENvbG9yOm0uY29sb3IoXCJncmV5MzAwXCIpXG4gICAgICBuYW1lOlwidGltZWJhclwiXG4gICAgICBvcGFjaXR5Oi43XG5cbiAgICB2aWRlb0xheWVyLnRpbWViYXIuY29uc3RyYWludHMgPVxuICAgICAgbGVhZGluZzpbdmlkZW9MYXllci5jdXJyZW50VGltZSwgMjBdXG4gICAgICB0cmFpbGluZzpbdmlkZW9MYXllci5lbmRUaW1lLCAyMF1cbiAgICAgIGhlaWdodDozXG4gICAgICB2ZXJ0aWNhbENlbnRlcjp2aWRlb0xheWVyLmN1cnJlbnRUaW1lXG4gICAgbS5sYXlvdXQuc2V0KHZpZGVvTGF5ZXIudGltZWJhcilcblxuICAgIHZpZGVvTGF5ZXIuc2Vla2VyID0gbmV3IExheWVyXG4gICAgICBiYWNrZ3JvdW5kQ29sb3I6XCJ0cmFuc3BhcmVudFwiXG4gICAgICBzdXBlckxheWVyOnZpZGVvTGF5ZXIuY29udHJvbHNcbiAgICAgIG5hbWU6XCJzZWVrZXJcIlxuXG4gICAgdmlkZW9MYXllci5zZWVrZXIuY29uc3RyYWludHMgPVxuICAgICAgd2lkdGg6NTBcbiAgICAgIGhlaWdodDo1MFxuICAgICAgdmVydGljYWxDZW50ZXI6dmlkZW9MYXllci5jdXJyZW50VGltZVxuICAgIG0ubGF5b3V0LnNldCh2aWRlb0xheWVyLnNlZWtlcilcblxuICAgIHZpZGVvTGF5ZXIuc2Vla2VyRG90ID0gbmV3IExheWVyXG4gICAgICB3aWR0aDptLnB4KDE1KVxuICAgICAgaGVpZ2h0Om0ucHgoMTUpXG4gICAgICBib3JkZXJSYWRpdXM6bS5weCgxNSlcbiAgICAgIGJhY2tncm91bmRDb2xvcjptLmNvbG9yKHNldHVwLnByb2dyZXNzQ29sb3IpXG4gICAgICBzdXBlckxheWVyOnZpZGVvTGF5ZXIuc2Vla2VyXG4gICAgICBuYW1lOlwic2Vla2VyRG90XCJcblxuICAgIHZpZGVvTGF5ZXIuc2Vla2VyRG90LmNlbnRlcigpXG5cbiAgICB2aWRlb0xheWVyLnByb2dyZXNzQmFyID0gbmV3IExheWVyXG4gICAgICBiYWNrZ3JvdW5kQ29sb3I6bS5jb2xvcihzZXR1cC5wcm9ncmVzc0NvbG9yKVxuICAgICAgd2lkdGg6MFxuICAgICAgc3VwZXJMYXllcjp2aWRlb0xheWVyLmNvbnRyb2xzXG4gICAgICBuYW1lOlwicHJvZ3Jlc3MgYmFyXCJcblxuICAgIHZpZGVvTGF5ZXIucHJvZ3Jlc3NCYXIuY29uc3RyYWludHMgPVxuICAgICAgaGVpZ2h0OjNcbiAgICAgIHZlcnRpY2FsQ2VudGVyOnZpZGVvTGF5ZXIudGltZWJhclxuXG4gICAgbS5sYXlvdXQuc2V0KHRhcmdldDpbdmlkZW9MYXllci5zZWVrZXIsIHZpZGVvTGF5ZXIucHJvZ3Jlc3NCYXJdKVxuXG4gICAgdmlkZW9MYXllci5zZWVrZXJPZmZzZXQgPSAodmlkZW9MYXllci5zZWVrZXIud2lkdGgvMiAtIHZpZGVvTGF5ZXIuc2Vla2VyRG90LndpZHRoLzIpXG4gICAgdmlkZW9MYXllci5zZWVrZXIueCA9IHZpZGVvTGF5ZXIudGltZWJhci54IC0gdmlkZW9MYXllci5zZWVrZXJPZmZzZXRcbiAgICB2aWRlb0xheWVyLnByb2dyZXNzQmFyLnggPSB2aWRlb0xheWVyLnRpbWViYXIueFxuXG4gICAgI0hhbmRsZSBJZGVsbmVzc1xuICAgIGlkbGVUaW1lID0gMFxuICAgIFV0aWxzLmludGVydmFsIDEsIC0+XG4gICAgICBpZGxlVGltZSsrXG4gICAgICBpZiBpZGxlVGltZSA+IHNldHVwLmlkbGVMaW1pdCAmJiB2aWRlb0xheWVyLnBsYXllci5wYXVzZWQgPT0gZmFsc2UgJiYgdmlkZW9MYXllci5zZWVrZXIud29ya2luZyAhPSB0cnVlXG4gICAgICAgIHZpZGVvTGF5ZXIuY29udHJvbHMuYW5pbWF0ZVxuICAgICAgICAgIHByb3BlcnRpZXM6KG9wYWNpdHk6MClcbiAgICAgICAgICB0aW1lOi4yNVxuICAgICAgICB2aWRlb0xheWVyLnBsYXlzdG9wLnZpc2libGUgPSBmYWxzZVxuICAgICAgZWxzZVxuICAgICAgICB2aWRlb0xheWVyLmNvbnRyb2xzLm9wYWNpdHkgPSAxXG4gICAgICAgIHZpZGVvTGF5ZXIucGxheXN0b3AudmlzaWJsZSA9IHRydWVcblxuICAgIHZpZGVvTGF5ZXIuY29udHJvbHMub24gRXZlbnRzLlRvdWNoU3RhcnQsIC0+XG4gICAgICBpZiBpZGxlVGltZSA+IHNldHVwLmlkbGVMaW1pdFxuICAgICAgICBpZGxlVGltZSA9IDBcbiAgICAgIGVsc2VcbiAgICAgICAgaWRsZVRpbWUgPSA1XG5cbiAgICB2aWRlb0xheWVyLnBsYXlzdG9wLm9uIEV2ZW50cy5Ub3VjaEVuZCwgLT5cbiAgICAgIGlmIHZpZGVvTGF5ZXIucGxheWVyLnBhdXNlZFxuICAgICAgICB2aWRlb0xheWVyLnBsYXkudmlzaWJsZSA9IGZhbHNlXG4gICAgICAgIHZpZGVvTGF5ZXIucGF1c2UudmlzaWJsZSA9IHRydWVcbiAgICAgICAgdmlkZW9MYXllci5wbGF5ZXIucGxheSgpXG4gICAgICBlbHNlXG4gICAgICAgIHZpZGVvTGF5ZXIucGxheS52aXNpYmxlID0gdHJ1ZVxuICAgICAgICB2aWRlb0xheWVyLnBhdXNlLnZpc2libGUgPSBmYWxzZVxuICAgICAgICB2aWRlb0xheWVyLnBsYXllci5wYXVzZSgpXG5cbiAgICB2aWRlb0xheWVyLmZ1bGxzY3JlZW4ub24gRXZlbnRzLlRvdWNoRW5kLCAtPlxuICAgICAgICB2aWRlb0xheWVyLmZ1bGxzY3JlZW4udmlzaWJsZSA9IGZhbHNlXG4gICAgICAgIHZpZGVvTGF5ZXIuZnVsbHNjcmVlbkV4aXQudmlzaWJsZSA9IHRydWVcbiAgICAgICAgdmlkZW9MYXllci5jYWNoZVByb3BzID0gdmlkZW9MYXllci5wcm9wc1xuICAgICAgICB2aWRlb0xheWVyLmNhY2hlQWxpZ24gPSB2aWRlb0xheWVyLmNvbnN0cmFpbnRzLmFsaWduXG5cbiAgICAgICAgaWYgdmlkZW9MYXllci5vbkZ1bGxTY3JlZW5cbiAgICAgICAgICB2aWRlb0xheWVyLm9uRnVsbFNjcmVlbigpXG5cbiAgICAgICAgaWRsZVRpbWUgPSAwXG4gICAgICAgIHZpZGVvTGF5ZXIuYmFja2Ryb3AgPSBuZXcgTGF5ZXJcbiAgICAgICAgICBiYWNrZ3JvdW5kQ29sb3I6XCJibGFja1wiXG4gICAgICAgICAgd2lkdGg6bS5kZXZpY2Uud2lkdGhcbiAgICAgICAgICBoZWlnaHQ6bS5kZXZpY2UuaGVpZ2h0XG4gICAgICAgICAgbmFtZTpcImJhY2tkcm9wXCJcbiAgICAgICAgdmlkZW9MYXllci5jb25zdHJhaW50cy5hbGlnbiA9IFwiY2VudGVyXCJcblxuICAgICAgICB2aWRlb0xheWVyLmFuaW1hdGVcbiAgICAgICAgICBwcm9wZXJ0aWVzOlxuICAgICAgICAgICAgd2lkdGg6IG0uZGV2aWNlLndpZHRoXG4gICAgICAgICAgICBoZWlnaHQ6IG0uZGV2aWNlLndpZHRoICogMC41NjI1XG4gICAgICAgICAgdGltZTouNVxuICAgICAgICBtLmxheW91dC5hbmltYXRlXG4gICAgICAgICAgdGFyZ2V0OnZpZGVvTGF5ZXJcbiAgICAgICAgICB0aW1lOi41XG4gICAgICAgIGlmIHNldHVwLnN1cGVyTGF5ZXJcbiAgICAgICAgICB2aWRlb0xheWVyLmJhY2tkcm9wLnN1cGVyTGF5ZXIgPSBzZXR1cC5zdXBlckxheWVyXG4gICAgICAgICAgdmlkZW9MYXllci5iYWNrZHJvcC5wbGFjZUJlaGluZCh2aWRlb0xheWVyKVxuICAgICAgICBlbHNlXG4gICAgICAgICAgdmlkZW9MYXllci5iYWNrZHJvcC5wbGFjZUJlaGluZCh2aWRlb0xheWVyKVxuICAgICAgICBtLmFkZFRvU3RhY2sodmlkZW9MYXllcilcblxuICAgIHZpZGVvTGF5ZXIuZnVsbHNjcmVlbkV4aXQub24gRXZlbnRzLlRvdWNoRW5kLCAtPlxuICAgICAgICB2aWRlb0xheWVyLmZ1bGxzY3JlZW4udmlzaWJsZSA9IHRydWVcbiAgICAgICAgdmlkZW9MYXllci5mdWxsc2NyZWVuRXhpdC52aXNpYmxlID0gZmFsc2VcbiAgICAgICAgaWRsZVRpbWUgPSAwXG4gICAgICAgIG0ucmVtb3ZlRnJvbVN0YWNrKClcblxuXG5cbiAgICB2aWRlb0xheWVyLmV4aXQgPSAoKSAtPlxuICAgICAgICB2aWRlb0xheWVyLmFuaW1hdGVcbiAgICAgICAgICBwcm9wZXJ0aWVzOih4OnZpZGVvTGF5ZXIuY2FjaGVQcm9wcy54LCB5OnZpZGVvTGF5ZXIuY2FjaGVQcm9wcy55LCB3aWR0aDp2aWRlb0xheWVyLmNhY2hlUHJvcHMud2lkdGgsIGhlaWdodDp2aWRlb0xheWVyLmNhY2hlUHJvcHMuaGVpZ2h0KVxuICAgICAgICAgIHRpbWU6LjVcblxuICAgICAgICB2aWRlb0xheWVyLmNvbnN0cmFpbnRzLmFsaWduID0gdmlkZW9MYXllci5jYWNoZUFsaWduXG5cbiAgICAgICAgdmlkZW9MYXllci5iYWNrZHJvcC5hbmltYXRlXG4gICAgICAgICAgcHJvcGVydGllczoob3BhY2l0eTowKVxuICAgICAgICAgIHRpbWU6LjVcbiAgICAgICAgICBkZWxheTouMlxuICAgICAgICBVdGlscy5kZWxheSAuNywgLT5cbiAgICAgICAgICB2aWRlb0xheWVyLmJhY2tkcm9wLmRlc3Ryb3koKVxuXG4gICAgICAgIHZpZGVvTGF5ZXIuZnVsbHNjcmVlbi52aXNpYmxlID0gdHJ1ZVxuICAgICAgICB2aWRlb0xheWVyLmZ1bGxzY3JlZW5FeGl0LnZpc2libGUgPSBmYWxzZVxuXG4gICAgICAgIGlmIHZpZGVvTGF5ZXIub25GdWxsU2NyZWVuRXhpdFxuICAgICAgICAgIHZpZGVvTGF5ZXIub25GdWxsU2NyZWVuRXhpdCgpXG5cbiAgICAjU2Vla2VyIENvbnRyb2xzXG4gICAgdmlkZW9MYXllci5zZWVrZXIuZHJhZ2dhYmxlLmVuYWJsZWQgPSB0cnVlXG4gICAgdmlkZW9MYXllci5zZWVrZXIuZHJhZ2dhYmxlLnNwZWVkWSA9IDBcbiAgICB2aWRlb0xheWVyLnNlZWtlci5kcmFnZ2FibGUuc3BlZWRYID0gMVxuICAgIHZpZGVvTGF5ZXIuc2Vla2VyLmRyYWdnYWJsZS5tb21lbnR1bSA9IGZhbHNlXG4gICAgdmlkZW9MYXllci5zZWVrZXIuZHJhZ2dhYmxlLmJvdW5jZSA9IGZhbHNlXG5cbiAgICB2aWRlb0xheWVyLnNlZWtlci5vbiBFdmVudHMuVG91Y2hTdGFydCwgLT5cbiAgICAgIHZpZGVvTGF5ZXIuc2Vla2VyLnNjYWxlID0gMS4yXG4gICAgICB2aWRlb0xheWVyLnNlZWtlci53b3JraW5nID0gdHJ1ZVxuXG4gICAgdmlkZW9MYXllci5zZWVrZXIub24gRXZlbnRzLkRyYWdNb3ZlLCAtPlxuICAgICAgdmlkZW9MYXllci5zZWVrZXIud29ya2luZyA9IHRydWVcbiAgICAgIGlmIHZpZGVvTGF5ZXIuc2Vla2VyLnggKyB2aWRlb0xheWVyLnNlZWtlck9mZnNldCA8IHZpZGVvTGF5ZXIudGltZWJhci54XG4gICAgICAgIHZpZGVvTGF5ZXIuc2Vla2VyLnggPSB2aWRlb0xheWVyLnRpbWViYXIueCAtIHZpZGVvTGF5ZXIuc2Vla2VyT2Zmc2V0XG4gICAgICBpZiB2aWRlb0xheWVyLnNlZWtlci5tYXhYID4gdmlkZW9MYXllci50aW1lYmFyLm1heFggKyB2aWRlb0xheWVyLnNlZWtlck9mZnNldFxuICAgICAgICB2aWRlb0xheWVyLnNlZWtlci5tYXhYID0gdmlkZW9MYXllci50aW1lYmFyLm1heFggKyB2aWRlb0xheWVyLnNlZWtlck9mZnNldFxuICAgICAgbmV3Q1QgPSB2aWRlb0xheWVyLnBsYXllci5kdXJhdGlvbiAqICgodmlkZW9MYXllci5zZWVrZXIueCArIHZpZGVvTGF5ZXIuc2Vla2VyT2Zmc2V0IC0gdmlkZW9MYXllci50aW1lYmFyLngpL3ZpZGVvTGF5ZXIudGltZWJhci53aWR0aClcbiAgICAgIGlmIG5ld0NUIDwgMFxuICAgICAgICBuZXdDVCA9IDBcbiAgICAgIGlmIG5ld0NUID4gdmlkZW9MYXllci5wbGF5ZXIuZHVyYXRpb25cbiAgICAgICAgbmV3Q1QgPSB2aWRlb0xheWVyLnBsYXllci5kdXJhdGlvblxuICAgICAgbS51dGlscy51cGRhdGUodmlkZW9MYXllci5jdXJyZW50VGltZSwgW3t0ZXh0Om0udXRpbHMudG9ISE1NU1MobmV3Q1QpfV0pXG5cbiAgICB2aWRlb0xheWVyLnNlZWtlci5vbiBFdmVudHMuRHJhZ0VuZCwgLT5cbiAgICAgIHZpZGVvTGF5ZXIuc2Vla2VyLnNjYWxlID0gMVxuICAgICAgdmlkZW9MYXllci5zZWVrZXIud29ya2luZyA9IGZhbHNlXG4gICAgICBldCA9IHZpZGVvTGF5ZXIucGxheWVyLmR1cmF0aW9uXG4gICAgICBuZXdDVCA9IGV0ICogKCh2aWRlb0xheWVyLnNlZWtlci54ICsgdmlkZW9MYXllci5zZWVrZXJPZmZzZXQgLSB2aWRlb0xheWVyLnRpbWViYXIueCkvdmlkZW9MYXllci50aW1lYmFyLndpZHRoKVxuICAgICAgaWYgbmV3Q1QgPCAwXG4gICAgICAgIG5ld0NUID0gMFxuICAgICAgaWYgbmV3Q1QgPiB2aWRlb0xheWVyLnBsYXllci5kdXJhdGlvblxuICAgICAgICBuZXdDVCA9IHZpZGVvTGF5ZXIucGxheWVyLmR1cmF0aW9uXG4gICAgICBuZXdDVCA9IE1hdGgucm91bmQobmV3Q1QpXG4gICAgICB2aWRlb0xheWVyLnBsYXllci5jdXJyZW50VGltZSA9IG5ld0NUXG5cblxuICBVSWRlbGVnYXRlID0gLT5cbiAgICBjdCA9IHZpZGVvTGF5ZXIucGxheWVyLmN1cnJlbnRUaW1lXG4gICAgZXQgPSB2aWRlb0xheWVyLnBsYXllci5kdXJhdGlvblxuICAgIGlmIHZpZGVvTGF5ZXIuc2Vla2VyLndvcmtpbmdcbiAgICAgICAgIyBEbyBub3RoaW5nXG4gICAgZWxzZVxuICAgICAgbS51dGlscy51cGRhdGUodmlkZW9MYXllci5jdXJyZW50VGltZSwgW3t0ZXh0Om0udXRpbHMudG9ISE1NU1ModmlkZW9MYXllci5wbGF5ZXIuY3VycmVudFRpbWUpfV0pXG4gICAgICB2aWRlb0xheWVyLnNlZWtlci54ID0gdmlkZW9MYXllci50aW1lYmFyLnggKyAodmlkZW9MYXllci50aW1lYmFyLndpZHRoICogY3QvZXQpIC0gdmlkZW9MYXllci5zZWVrZXJPZmZzZXRcbiAgICAgIHZpZGVvTGF5ZXIucHJvZ3Jlc3NCYXIud2lkdGggPSAgdmlkZW9MYXllci5zZWVrZXIueCArIHZpZGVvTGF5ZXIuc2Vla2VyT2Zmc2V0IC0gdmlkZW9MYXllci50aW1lYmFyLnhcblxuICB2aWRlb0xheWVyLnBsYXllci5hZGRFdmVudExpc3RlbmVyKFwibG9hZGVkZGF0YVwiLCBVSXNldClcbiAgdmlkZW9MYXllci5wbGF5ZXIuYWRkRXZlbnRMaXN0ZW5lcihcInRpbWV1cGRhdGVcIiwgVUlkZWxlZ2F0ZSlcblxuXG4gIHJldHVybiB2aWRlb0xheWVyXG4iLCJtID0gcmVxdWlyZSAnbWF0ZXJpYWwta2l0J1xuXG4jIyBDb252ZXJ0cyBweCB0byBwdFxuZXhwb3J0cy5wdCA9IChweCkgLT5cblx0cHQgPSBweC9tLmRldmljZS5zY2FsZVxuXHRwdCA9IE1hdGgucm91bmQocHQpXG5cdHJldHVybiBwdFxuXG4jIyBDb252ZXJ0cyBwdCB0byBweFxuZXhwb3J0cy5weCA9IChwdCkgLT5cblx0cHggPSBwdCAqIG0uZGV2aWNlLnNjYWxlXG5cdHB4ID0gTWF0aC5yb3VuZChweClcblx0cmV0dXJuIHB4XG5cbiMjIGlPUyBDb2xvciDigJMgVGhpcyB3aWxsIHN0b3JlIGFsbCBvZiB0aGUgZGVmYXVsdCBpT1MgY29sb3JzIGludGVhZCBvZiB0aGUgZGVmYXVsdCBDU1MgY29sb3JzLiAqVGhpcyBpcyBvbmx5IHVwIGhlcmUgYmVjYXVzZSBJIHJlZmVyIHRvIGl0IGluIHRoZSBkZWZhdWx0cy4qXG5leHBvcnRzLmNvbG9yID0gKGNvbG9yU3RyaW5nKSAtPlxuXHRpZiBjb2xvclN0cmluZ1swXSA9PSBcIiNcIlxuXHRcdHJldHVybiBjb2xvclN0cmluZ1xuXHRlbHNlXG5cdFx0Y29sb3IgPSAgbmV3IENvbG9yKG0ubGliLmNvbG9yc1tjb2xvclN0cmluZ10pXG5cdFx0aWYgY29sb3JTdHJpbmcgPT0gXCJ0cmFuc3BhcmVudFwiXG5cdFx0XHRjb2xvciA9IFwidHJhbnNwYXJlbnRcIlxuXHRcdHJldHVybiBjb2xvclxuXG4jIFN1cHBvcnRpbmcgRnVuY3Rpb25zXG4jIFV0aWxzXG5cbiMgQ2xlYW5zIGEgc3RyaW5nIG9mIDxicj4gYW5kICZuYnNwO1xuZXhwb3J0cy5jbGVhbiA9IChzdHJpbmcpIC0+XG5cdCMjIHJlbW92ZSB3aGl0ZSBzcGFjZVxuXHRzdHJpbmcgPSBzdHJpbmcucmVwbGFjZSgvWyZdbmJzcFs7XS9naSwgXCIgXCIpLnJlcGxhY2UoL1s8XWJyWz5dL2dpLCBcIlwiKVxuXHRyZXR1cm4gc3RyaW5nXG5cbiMgQ29udmVydHMgcHgncyBvZiBhbiBTVkcgdG8gc2NhbGFibGUgdmFyaWFibGVzXG5leHBvcnRzLnN2ZyA9IChzdmcpIC0+XG5cdCMgRmluZCBTdHJpbmdcblx0c3RhcnRJbmRleCA9IHN2Zy5zZWFyY2goXCI8c3ZnIHdpZHRoPVwiKVxuXHRlbmRJbmRleCA9IHN2Zy5zZWFyY2goXCIgdmlld0JveFwiKVxuXHRzdHJpbmcgPSBzdmcuc2xpY2Uoc3RhcnRJbmRleCwgZW5kSW5kZXgpXG5cblx0I0ZpbmQgd2lkdGhcblx0d1N0YXJ0SW5kZXggPSBzdHJpbmcuc2VhcmNoKFwiPVwiKSArIDJcblx0d0VuZEluZGV4ID0gIHN0cmluZy5zZWFyY2goXCJweFwiKVxuXHR3aWR0aCA9IHN0cmluZy5zbGljZSh3U3RhcnRJbmRleCwgd0VuZEluZGV4KVxuXHRuZXdXaWR0aCA9IGV4cG9ydHMucHgod2lkdGgpXG5cblx0IyBGaW5kIEhlaWdodFxuXHRoZWlnaHRTdHJpbmcgPSBzdHJpbmcuc2xpY2Uod0VuZEluZGV4ICsgNCwgc3RyaW5nLmxlbmd0aClcblx0aFN0YXJ0SW5kZXggPSBoZWlnaHRTdHJpbmcuc2VhcmNoKFwiPVwiKSsgMlxuXHRoRW5kSW5kZXggPSBoZWlnaHRTdHJpbmcuc2VhcmNoKFwicHhcIilcblx0aGVpZ2h0ID0gaGVpZ2h0U3RyaW5nLnNsaWNlKGhTdGFydEluZGV4LCBoRW5kSW5kZXgpXG5cdG5ld0hlaWdodCA9IGV4cG9ydHMucHgoaGVpZ2h0KVxuXG5cdCNDcmVhdGUgbmV3IHN0cmluZ1xuXHRuZXdTdHJpbmcgPSBzdHJpbmcucmVwbGFjZSh3aWR0aCwgbmV3V2lkdGgpXG5cdG5ld1N0cmluZyA9IG5ld1N0cmluZy5yZXBsYWNlKGhlaWdodCwgbmV3SGVpZ2h0KVxuXG5cdCNSZXBsYWNlIHN0cmluZ3Ncblx0c3ZnID0gc3ZnLnJlcGxhY2Uoc3RyaW5nLCBuZXdTdHJpbmcpXG5cblx0cmV0dXJuIHtcblx0XHRzdmc6c3ZnXG5cdFx0d2lkdGg6bmV3V2lkdGhcblx0XHRoZWlnaHQ6bmV3SGVpZ2h0XG5cdH1cblxuIyBDaGFuZ2VzIHRoZSBmaWxsIG9mIGFuIFNWR1xuZXhwb3J0cy5jaGFuZ2VGaWxsID0gKGxheWVyLCBjb2xvcikgLT5cblx0aWYgdHlwZW9mIGNvbG9yICE9IFwib2JqZWN0XCJcblx0XHRjb2xvciA9IGV4cG9ydHMuY29sb3IoY29sb3IpXG5cdHN0YXJ0SW5kZXggPSBsYXllci5odG1sLnNlYXJjaChcImZpbGw9XFxcIiNcIilcblx0ZmlsbFN0cmluZyA9IGxheWVyLmh0bWwuc2xpY2Uoc3RhcnRJbmRleCwgbGF5ZXIuaHRtbC5sZW5ndGgpXG5cdGVuZEluZGV4ID0gZmlsbFN0cmluZy5zZWFyY2goXCJcXFwiXCIpICsgOFxuXHRzdHJpbmcgPSBmaWxsU3RyaW5nLnNsaWNlKDAsIGVuZEluZGV4KVxuXHRuZXdTdHJpbmcgPSBcImZpbGw9XFxcIlwiICsgY29sb3Jcblx0bGF5ZXIuaHRtbCA9IGxheWVyLmh0bWwucmVwbGFjZShzdHJpbmcsIG5ld1N0cmluZylcblxuZXhwb3J0cy5jYXBpdGFsaXplID0gKHN0cmluZykgLT5cblx0cmV0dXJuIHN0cmluZy5jaGFyQXQoMCkudG9VcHBlckNhc2UoKSArIHN0cmluZy5zbGljZSgxKVxuXG4jIFJldHVybnMgdGhlIGN1cnJlbnQgdGltZVxuZXhwb3J0cy5nZXRUaW1lID0gLT5cblx0ZGF5c09mVGhlV2VlayA9IFtcIlN1bmRheVwiLCBcIk1vbmRheVwiLCBcIlR1ZXNkYXlcIiwgXCJXZWRuZXNkYXlcIiwgXCJUaHVyc2RheVwiLCBcIkZyaWRheVwiLCBcIlNhdHVyZGF5XCJdXG5cdG1vbnRoc09mVGhlWWVhciA9IFtcIkphbnVhcnlcIiwgXCJGZWJydWFyeVwiLCBcIk1hcmNoXCIsIFwiQXByaWxcIiwgXCJNYXlcIiwgXCJKdW5lXCIsIFwiSnVseVwiLCBcIkF1Z3VzdFwiLCBcIlNlcHRlbWJlclwiLCBcIk9jdG9iZXJcIiwgXCJOb3ZlbWJlclwiLCBcIkRlY2VtYmVyXCJdXG5cdGRhdGVPYmogPSBuZXcgRGF0ZSgpXG5cdG1vbnRoID0gbW9udGhzT2ZUaGVZZWFyW2RhdGVPYmouZ2V0TW9udGgoKV1cblx0ZGF0ZSA9IGRhdGVPYmouZ2V0RGF0ZSgpXG5cdGRheSA9IGRheXNPZlRoZVdlZWtbZGF0ZU9iai5nZXREYXkoKV1cblx0aG91cnMgPSBkYXRlT2JqLmdldEhvdXJzKClcblx0bWlucyA9IGRhdGVPYmouZ2V0TWludXRlcygpXG5cdHNlY3MgPSBkYXRlT2JqLmdldFNlY29uZHMoKVxuXHRyZXR1cm4ge1xuXHRcdG1vbnRoOm1vbnRoXG5cdFx0ZGF0ZTpkYXRlXG5cdFx0ZGF5OmRheVxuXHRcdGhvdXJzOmhvdXJzXG5cdFx0bWluczptaW5zXG5cdFx0c2VjczpzZWNzXG5cdH1cblxuZXhwb3J0cy5iZ0JsdXIgPSAobGF5ZXIpIC0+XG5cdGxheWVyLnN0eWxlW1wiLXdlYmtpdC1iYWNrZHJvcC1maWx0ZXJcIl0gPSBcImJsdXIoI3tleHBvcnRzLnB4KDUpfXB4KVwiXG5cdHJldHVybiBsYXllclxuXG5leHBvcnRzLnRleHRBdXRvU2l6ZSA9ICh0ZXh0TGF5ZXIpIC0+XG5cdCNEZWZpbmUgV2lkdGhcblx0Y29uc3RyYWludHMgPSB7fVxuXHRpZiB0ZXh0TGF5ZXIuY29uc3RyYWludHNcblx0XHRpZiB0ZXh0TGF5ZXIuY29uc3RyYWludHMuaGVpZ2h0XG5cdFx0XHRjb25zdHJhaW50cy5oZWlnaHQgPSBleHBvcnRzLnB4KHRleHRMYXllci5jb25zdHJhaW50cy5oZWlnaHQpXG5cdFx0aWYgdGV4dExheWVyLmNvbnN0cmFpbnRzLndpZHRoXG5cdFx0XHRjb25zdHJhaW50cy53aWR0aCA9IGV4cG9ydHMucHgodGV4dExheWVyLmNvbnN0cmFpbnRzLndpZHRoKVxuXG5cdHN0eWxlcyA9XG5cdFx0Zm9udFNpemU6IHRleHRMYXllci5zdHlsZS5mb250U2l6ZVxuXHRcdGZvbnRGYW1pbHk6IHRleHRMYXllci5zdHlsZS5mb250RmFtaWx5XG5cdFx0Zm9udFdlaWdodDogdGV4dExheWVyLnN0eWxlLmZvbnRXZWlnaHRcblx0XHRmb250U3R5bGU6IHRleHRMYXllci5zdHlsZS5mb250U3R5bGVcblx0XHRsaW5lSGVpZ2h0OiB0ZXh0TGF5ZXIuc3R5bGUubGluZUhlaWdodFxuXHRcdGxldHRlclNwYWNpbmc6IHRleHRMYXllci5zdHlsZS5sZXR0ZXJTcGFjaW5nXG5cdFx0dGV4dFRyYW5zZm9ybTogdGV4dExheWVyLnN0eWxlLnRleHRUcmFuc2Zvcm1cblx0dGV4dEZyYW1lID0gVXRpbHMudGV4dFNpemUodGV4dExheWVyLmh0bWwsIHN0eWxlcywgY29uc3RyYWludHMpXG5cdHJldHVybiB7XG5cdFx0d2lkdGggOiB0ZXh0RnJhbWUud2lkdGhcblx0XHRoZWlnaHQ6IHRleHRGcmFtZS5oZWlnaHRcblx0fVxuXG5leHBvcnRzLmdldERldmljZSA9IC0+XG5cdCMgTG9hZHMgdGhlIGluaXRpYWwgZnJhbWVcblx0ZGV2aWNlID0gXCJcIlxuXHRmcmFtZSA9IHRydWVcblx0aWYgbS5saWIucmVhbERldmljZXNbaW5uZXJXaWR0aF0gJiYgbS5saWIucmVhbERldmljZXNbaW5uZXJXaWR0aF1baW5uZXJIZWlnaHRdXG5cdFx0ZGV2aWNlID0gbS5saWIucmVhbERldmljZXNbaW5uZXJXaWR0aF1baW5uZXJIZWlnaHRdXG5cdFx0ZnJhbWUgPSBmYWxzZVxuXHRcdEZyYW1lci5EZXZpY2UuZGV2aWNlVHlwZSA9IFwiZnVsbHNjcmVlblwiXG5cblx0aWYgZnJhbWVcblx0XHRkZXZpY2UgPVxuXHRcdFx0bmFtZTogRnJhbWVyLkRldmljZS5kZXZpY2VUeXBlXG5cdFx0XHR3aWR0aCA6ICBGcmFtZXIuRGV2aWNlVmlldy5EZXZpY2VzW0ZyYW1lci5EZXZpY2UuZGV2aWNlVHlwZV0uc2NyZWVuV2lkdGhcblx0XHRcdGhlaWdodDogIEZyYW1lci5EZXZpY2VWaWV3LkRldmljZXNbRnJhbWVyLkRldmljZS5kZXZpY2VUeXBlXS5zY3JlZW5IZWlnaHRcblx0XHRcdHNjYWxlOiBtLmxpYi5mcmFtZXJGcmFtZXNbRnJhbWVyLkRldmljZVZpZXcuRGV2aWNlc1tGcmFtZXIuRGV2aWNlLmRldmljZVR5cGVdLnNjcmVlbldpZHRoXVxuXG5cdGlmIGRldmljZS5zY2FsZSA9PSB1bmRlZmluZWRcblx0XHRkZXZpY2Uuc2NhbGUgPSAyXG5cdGlmIGRldmljZS53aWR0aCA9PSB1bmRlZmluZWRcblx0XHRkZXZpY2Uud2lkdGggPSBpbm5lcldpZHRoXG5cdGlmIGRldmljZS5oZWlnaHQgPT0gdW5kZWZpbmVkXG5cdFx0ZGV2aWNlLmhlaWdodCA9IGlubmVySGVpZ2h0XG5cblx0cmV0dXJuIGRldmljZVxuXG5cbiMgU3BlY2lhbCBDaGFyYWN0ZXJzXG5leHBvcnRzLnNwZWNpYWxDaGFyID0gKGxheWVyKSAtPlxuXHR0ZXh0ID0gbGF5ZXJcblx0aWYgbGF5ZXIudHlwZSA9PSBcImJ1dHRvblwiXG5cdFx0dGV4dCA9IGxheWVyLmxhYmVsXG5cdGlmIHRleHQuaHRtbC5pbmRleE9mKFwiLWJcIikgIT0gLTFcblx0XHRuZXdUZXh0ID0gdGV4dC5odG1sLnJlcGxhY2UoXCItYiBcIiwgXCJcIilcblx0XHRleHBvcnRzLnVwZGF0ZSh0ZXh0LCBbe3RleHQ6bmV3VGV4dH0sIHtmb250V2VpZ2h0OjYwMH1dKVxuXHRpZiB0ZXh0Lmh0bWwuaW5kZXhPZihcIi1yXCIpICE9IC0xXG5cdFx0bmV3VGV4dCA9IHRleHQuaHRtbC5yZXBsYWNlKFwiLXIgXCIsIFwiXCIpXG5cdFx0ZXhwb3J0cy51cGRhdGUodGV4dCwgW3t0ZXh0Om5ld1RleHR9LCB7Y29sb3I6XCJyZWRcIn1dKVxuXHRpZiB0ZXh0Lmh0bWwuaW5kZXhPZihcIi1yYlwiKSAhPSAtMVxuXHRcdG5ld1RleHQgPSB0ZXh0Lmh0bWwucmVwbGFjZShcIi1yYiBcIiwgXCJcIilcblx0XHRleHBvcnRzLnVwZGF0ZSh0ZXh0LCBbe3RleHQ6bmV3VGV4dH0sIHtjb2xvcjpcImJsdWVcIn1dKVxuXHRpZiB0ZXh0Lmh0bWwuaW5kZXhPZihcIi1sYlwiKSAhPSAtMVxuXHRcdG5ld1RleHQgPSB0ZXh0Lmh0bWwucmVwbGFjZShcIi1sYiBcIiwgXCJcIilcblx0XHRleHBvcnRzLnVwZGF0ZSh0ZXh0LCBbe3RleHQ6bmV3VGV4dH0sIHtjb2xvcjpcImxpZ2h0LWJsdWVcIn1dKVxuXHRpZiB0ZXh0Lmh0bWwuaW5kZXhPZihcIi1nXCIpICE9IC0xXG5cdFx0bmV3VGV4dCA9IHRleHQuaHRtbC5yZXBsYWNlKFwiLWcgXCIsIFwiXCIpXG5cdFx0ZXhwb3J0cy51cGRhdGUodGV4dCwgW3t0ZXh0Om5ld1RleHR9LCB7Y29sb3I6XCJncmVlblwifV0pXG5cdGlmIHRleHQuaHRtbC5pbmRleE9mKFwiLW9cIikgIT0gLTFcblx0XHRuZXdUZXh0ID0gdGV4dC5odG1sLnJlcGxhY2UoXCItbyBcIiwgXCJcIilcblx0XHRleHBvcnRzLnVwZGF0ZSh0ZXh0LCBbe3RleHQ6bmV3VGV4dH0sIHtjb2xvcjpcIm9yYW5nZVwifV0pXG5cdGlmIHRleHQuaHRtbC5pbmRleE9mKFwiLXBcIikgIT0gLTFcblx0XHRuZXdUZXh0ID0gdGV4dC5odG1sLnJlcGxhY2UoXCItcCBcIiwgXCJcIilcblx0XHRleHBvcnRzLnVwZGF0ZSh0ZXh0LCBbe3RleHQ6bmV3VGV4dH0sIHtjb2xvcjpcIm9yYW5nZVwifV0pXG5cdGlmIHRleHQuaHRtbC5pbmRleE9mKFwiLXlcIikgIT0gLTFcblx0XHRuZXdUZXh0ID0gdGV4dC5odG1sLnJlcGxhY2UoXCIteSBcIiwgXCJcIilcblx0XHRleHBvcnRzLnVwZGF0ZSh0ZXh0LCBbe3RleHQ6bmV3VGV4dH0sIHtjb2xvcjpcInllbGxvd1wifV0pXG5cdGlmIHRleHQuaHRtbC5pbmRleE9mKFwiLSNcIikgIT0gLTFcblx0XHRjaG9zZW5Db2xvciA9IHRleHQuaHRtbC5zbGljZSgxLCA4KVxuXHRcdG5ld1RleHQgPSB0ZXh0Lmh0bWwuc2xpY2UoOSwgdGV4dC5odG1sLmxlbmd0aClcblx0XHRleHBvcnRzLnVwZGF0ZSh0ZXh0LCBbe3RleHQ6bmV3VGV4dH0sIHtjb2xvcjpjaG9zZW5Db2xvcn1dKVxuXHRpZiB0ZXh0Lmh0bWwuaW5kZXhPZihcIi1cIikgIT0gLTFcblx0XHRuZXdUZXh0ID0gdGV4dC5odG1sLnJlcGxhY2UoXCItIFwiLCBcIlwiKVxuXHRcdGV4cG9ydHMudXBkYXRlKHRleHQsIFt7dGV4dDpuZXdUZXh0fV0pXG5cdGlmIGxheWVyLmJ1dHRvblR5cGUgPT0gXCJ0ZXh0XCJcblx0XHRsYXllci53aWR0aCA9IHRleHQud2lkdGhcblx0bS5sYXlvdXQuc2V0KClcblxuZXhwb3J0cy51cGRhdGUgPSAobGF5ZXIsIGFycmF5KSAtPlxuXHRpZiBhcnJheSA9PSB1bmRlZmluZWRcblx0XHRhcnJheSA9IFtdXG5cdGlmIGxheWVyLnR5cGUgPT0gXCJ0ZXh0XCJcblx0XHRmb3IgY2hhbmdlIGluIGFycmF5XG5cdFx0XHRrZXkgPSBPYmplY3Qua2V5cyhjaGFuZ2UpWzBdXG5cdFx0XHR2YWx1ZSA9IGNoYW5nZVtrZXldXG5cdFx0XHRpZiBrZXkgPT0gXCJ0ZXh0XCJcblx0XHRcdFx0bGF5ZXIuaHRtbCA9IHZhbHVlXG5cdFx0XHRpZiBrZXkgPT0gXCJmb250V2VpZ2h0XCJcblx0XHRcdFx0bGF5ZXIuc3R5bGVba2V5XSA9IHZhbHVlXG5cdFx0XHRpZiBrZXkgPT0gXCJjb2xvclwiXG5cdFx0XHRcdGxheWVyLmNvbG9yID0gZXhwb3J0cy5jb2xvcih2YWx1ZSlcblxuXHRcdHRleHRGcmFtZSA9IGV4cG9ydHMudGV4dEF1dG9TaXplKGxheWVyKVxuXHRcdGxheWVyLndpZHRoID0gdGV4dEZyYW1lLndpZHRoXG5cdFx0bGF5ZXIuaGVpZ2h0ID0gdGV4dEZyYW1lLmhlaWdodFxuXG5cblx0bS5sYXlvdXQuc2V0KClcblxuIyBEZWNpZGVzIGlmIGl0IHNob3VsZCBiZSB3aGl0ZS9ibGFjayB0ZXh0XG5leHBvcnRzLmF1dG9Db2xvciA9IChjb2xvck9iamVjdCkgLT5cblx0cmdiID0gY29sb3JPYmplY3QudG9SZ2JTdHJpbmcoKVxuXHRyZ2IgPSByZ2Iuc3Vic3RyaW5nKDQsIHJnYi5sZW5ndGgtMSlcblx0cmdiID0gcmdiLnJlcGxhY2UoLyAvZywgJycpXG5cdHJnYiA9IHJnYi5yZXBsYWNlKC8gL2csICcnKVxuXHRyZ2IgPSByZ2Iuc3BsaXQoJywnKVxuXHRyZWQgPSByZ2JbMF1cblx0Z3JlZW4gPSByZ2JbMV1cblx0Ymx1ZSA9IHJnYlsyXVxuXHRjb2xvciA9IFwiXCJcblx0aWYgKHJlZCowLjI5OSArIGdyZWVuKjAuNTg3ICsgYmx1ZSowLjExNCkgPiAxODZcblx0XHRjb2xvciA9IGV4cG9ydHMuY29sb3IoXCJibGFja1wiKVxuXHRlbHNlXG5cdFx0Y29sb3IgPSBleHBvcnRzLmNvbG9yKFwid2hpdGVcIilcblx0cmV0dXJuIGNvbG9yXG5cbmV4cG9ydHMuc2FtZVBhcmVudCA9IChsYXllcjEsIGxheWVyMikgLT5cblx0cGFyZW50T25lID0gbGF5ZXIxLnN1cGVyTGF5ZXJcblx0cGFyZW50VHdvID0gbGF5ZXIyLnN1cGVyTGF5ZXJcblx0aWYgcGFyZW50T25lID09IHBhcmVudFR3b1xuXHRcdHJldHVybiB0cnVlXG5cdGVsc2Vcblx0XHRyZXR1cm4gZmFsc2VcblxuXG5leHBvcnRzLnRpbWVEZWxlZ2F0ZSA9IChsYXllciwgY2xvY2tUeXBlKSAtPlxuXHRAdGltZSA9IGV4cG9ydHMuZ2V0VGltZSgpXG5cdFV0aWxzLmRlbGF5IDYwIC0gQHRpbWUuc2VjcywgLT5cblx0XHRAdGltZSA9IGV4cG9ydHMuZ2V0VGltZSgpXG5cdFx0ZXhwb3J0cy51cGRhdGUobGF5ZXIsIFt0ZXh0OmV4cG9ydHMudGltZUZvcm1hdHRlcihAdGltZSwgY2xvY2tUeXBlKV0pXG5cdFx0VXRpbHMuaW50ZXJ2YWwgNjAsIC0+XG5cdFx0XHRAdGltZSA9IGV4cG9ydHMuZ2V0VGltZSgpXG5cdFx0XHRleHBvcnRzLnVwZGF0ZShsYXllciwgW3RleHQ6ZXhwb3J0cy50aW1lRm9ybWF0dGVyKEB0aW1lLCBjbG9ja1R5cGUpXSlcblxuZXhwb3J0cy50aW1lRm9ybWF0dGVyID0gKHRpbWVPYmosIGNsb2NrVHlwZSkgLT5cblx0aWYgY2xvY2tUeXBlID09IGZhbHNlXG5cdFx0aWYgdGltZU9iai5ob3VycyA+IDEyXG5cdFx0XHR0aW1lT2JqLmhvdXJzID0gdGltZU9iai5ob3VycyAtIDEyXG5cdFx0aWYgdGltZU9iai5ob3VycyA9PSAwIHRoZW4gdGltZU9iai5ob3VycyA9IDEyXG5cdGlmIHRpbWVPYmoubWlucyA8IDEwXG5cdFx0dGltZU9iai5taW5zID0gXCIwXCIgKyB0aW1lT2JqLm1pbnNcblx0cmV0dXJuIHRpbWVPYmouaG91cnMgKyBcIjpcIiArIHRpbWVPYmoubWluc1xuXG5leHBvcnRzLnNldHVwQ29tcG9uZW50ID0gKGFycmF5LCBkZWZhdWx0cykgLT5cblx0aWYgYXJyYXkgPT0gdW5kZWZpbmVkXG5cdFx0YXJyYXkgPSBbXVxuXHRvYmogPSB7fVxuXHRmb3IgaSBpbiBkZWZhdWx0cy5wcm9wc1xuXHRcdGlmIGFycmF5W2ldICE9IHVuZGVmaW5lZFxuXHRcdFx0b2JqW2ldID0gYXJyYXlbaV1cblx0XHRlbHNlXG5cdFx0XHRvYmpbaV0gPSBkZWZhdWx0c1tpXVxuXHRyZXR1cm4gb2JqXG5cblxuZXhwb3J0cy5lbW9qaUZvcm1hdHRlciA9IChzdHJpbmcpIC0+XG5cdFx0dW5pY29kZUZvcm1hdCA9IFwiXCJcblx0XHRpZiBzdHJpbmdbMF0gPT0gXCJFXCIgfHwgc3RyaW5nWzBdID09IFwiM1wiIHx8IHN0cmluZ1swXSA9PSBcIjJcIiB8fCBzdHJpbmdbMF0gPT0gXCJDXCJcblx0XHRcdGFycmF5T2ZDb2RlcyA9IHN0cmluZy5zcGxpdChcIiBcIilcblx0XHRcdGZvciBjb2RlIGluIGFycmF5T2ZDb2Rlc1xuXHRcdFx0XHR1bmljb2RlRm9ybWF0ID0gdW5pY29kZUZvcm1hdCArIFwiJVwiICsgY29kZVxuXHRcdGVsc2Vcblx0XHRcdGFycmF5T2ZDb2RlcyA9IHN0cmluZy5zcGxpdChcIiBcIilcblx0XHRcdHVuaWNvZGVGb3JtYXQgPSBcIiVGMCU5RlwiXG5cdFx0XHRmb3IgY29kZSBpbiBhcnJheU9mQ29kZXNcblx0XHRcdFx0dW5pY29kZUZvcm1hdCA9IHVuaWNvZGVGb3JtYXQgKyBcIiVcIiArIGNvZGVcblx0XHRkZWNvZGVkID0gZGVjb2RlVVJJQ29tcG9uZW50KHVuaWNvZGVGb3JtYXQpXG5cdFx0cmV0dXJuIGRlY29kZWRcblxuZXhwb3J0cy5idWlsZEVtb2ppc09iamVjdCA9ICgpIC0+XG5cdGVtb2ppcyA9IFtdXG5cdGZvciBjb2RlLCBpbmRleCBpbiBtLmFzc2V0cy5lbW9qaUNvZGVzXG5cdFx0ZW1vamkgPSBleHBvcnRzLmVtb2ppRm9ybWF0dGVyKGNvZGUpXG5cdFx0ZW1vamlzLnB1c2ggZW1vamlcblxuZXhwb3J0cy50b0hITU1TUyA9IChpbnQpIC0+XG4gIHNlY19udW0gPSBwYXJzZUludChpbnQsIDEwKVxuICBob3VycyAgID0gTWF0aC5mbG9vcihzZWNfbnVtIC8gMzYwMCk7XG4gIG1pbnV0ZXMgPSBNYXRoLmZsb29yKChzZWNfbnVtIC0gKGhvdXJzICogMzYwMCkpIC8gNjApO1xuICBzZWNvbmRzID0gc2VjX251bSAtIChob3VycyAqIDM2MDApIC0gKG1pbnV0ZXMgKiA2MCk7XG5cbiAgaWYgKGhvdXJzICAgPCAxMCkgdGhlbiBob3VycyAgID0gXCIwXCIraG91cnNcbiAgaWYgKG1pbnV0ZXMgPCAxMCkgdGhlbiBtaW51dGVzID0gXCJcIittaW51dGVzXG4gIGlmIChzZWNvbmRzIDwgMTApIHRoZW4gc2Vjb25kcyA9IFwiMFwiK3NlY29uZHNcbiAgdGltZVN0cmluZyA9IFwiXCJcbiAgaWYgaG91cnMgIT0gXCIwMFwiXG4gICAgdGltZVN0cmluZyA9IGhvdXJzKyc6JyttaW51dGVzKyc6JytzZWNvbmRzXG4gIGVsc2VcbiAgICB0aW1lU3RyaW5nID0gbWludXRlcysnOicrc2Vjb25kc1xuXG4gIHJldHVybiB0aW1lU3RyaW5nXG5cbiNsYXllciwgbW92ZVRvVGFwLCBjb2xvciwgc2NhbGUsIGN1cnZlXG5leHBvcnRzLmlua3kgPSAoc2V0dXApIC0+XG5cdHN0YXJ0WCA9IHNldHVwLmxheWVyLndpZHRoLzJcblx0c3RhcnRZID0gc2V0dXAubGF5ZXIuaGVpZ2h0LzJcblxuXHRpbmtDb2xvciA9IFwiIzBBMEEwQVwiXG5cdGlua1N0YXJ0U2NhbGUgPSAuMVxuXHRpbmtTY2FsZSA9IDNcblx0aW5rQ3VydmUgPSBcImJlemllci1jdXJ2ZSguMiwgMC40LCAwLjQsIDEuMClcIlxuXHRpbmtPcGFjaXR5ID0gMVxuXHRtb3ZlVG9UYXAgPSB0cnVlXG5cblx0aWYgc2V0dXAubW92ZVRvVGFwICE9IHVuZGVmaW5lZFxuXHRcdG1vdmVUb1RhcCA9IHNldHVwLm1vdmVUb1RhcFxuXG5cdGlmIHNldHVwLmNvbG9yICE9IHVuZGVmaW5lZFxuXHRcdGlua0NvbG9yID0gbS5jb2xvcihzZXR1cC5jb2xvcilcblxuXHRpZiBzZXR1cC5zY2FsZSAhPSB1bmRlZmluZWRcblx0XHRpbmtTY2FsZSA9IHNldHVwLnNjYWxlXG5cblx0aWYgc2V0dXAuc3RhcnRTY2FsZSAhPSB1bmRlZmluZWRcblx0XHRpbmtTdGFydFNjYWxlID0gc2V0dXAuc3RhcnRTY2FsZVxuXG5cdGlmIHNldHVwLmN1cnZlICE9IHVuZGVmaW5lZFxuXHRcdGlua0N1cnZlID0gc2V0dXAuY3VydmVcblxuXHRpZiBzZXR1cC5vcGFjaXR5ICE9IHVuZGVmaW5lZFxuXHRcdGlua09wYWNpdHkgPSBzZXR1cC5vcGFjaXR5XG5cblx0aW5reUVmZmVjdCA9IChldmVudCwgbGF5ZXIpIC0+XG5cdFx0aWYgbW92ZVRvVGFwID09IHRydWVcblx0XHRcdHN0YXJ0WCA9IGV2ZW50Lm9mZnNldFhcblx0XHRcdHN0YXJ0WSA9IGV2ZW50Lm9mZnNldFlcblxuXHRcdFx0aWYgVXRpbHMuaXNDaHJvbWUoKSA9PSBmYWxzZSAmJiBVdGlscy5pc1RvdWNoKClcblx0XHRcdFx0c3RhcnRYID0gZXZlbnQudG91Y2hDZW50ZXIueCAtIGxheWVyLnhcblx0XHRcdFx0c3RhcnRZID0gZXZlbnQudG91Y2hDZW50ZXIueSAtIGxheWVyLnlcblxuXHRcdGNpcmNsZSA9IG5ldyBMYXllclxuXHRcdFx0YmFja2dyb3VuZENvbG9yOmlua0NvbG9yXG5cdFx0XHRtaWRYOnN0YXJ0WFxuXHRcdFx0bWlkWTpzdGFydFlcblx0XHRcdHN1cGVyTGF5ZXI6bGF5ZXJcblx0XHRcdGJvcmRlclJhZGl1czptLnV0aWxzLnB4KDUwKVxuXHRcdFx0b3BhY2l0eTogaW5rT3BhY2l0eVxuXG5cdFx0Y2lyY2xlLnNjYWxlID0gaW5rU3RhcnRTY2FsZVxuXHRcdGNpcmNsZS5hbmltYXRlXG5cdFx0XHRwcm9wZXJ0aWVzOihzY2FsZTppbmtTY2FsZSwgb3BhY2l0eTowKVxuXHRcdFx0Y3VydmU6aW5rQ3VydmVcblx0XHRcdHRpbWU6LjVcblx0XHRVdGlscy5kZWxheSAxLCAtPlxuXHRcdFx0Y2lyY2xlLmRlc3Ryb3koKVxuXG5cdGlmIFV0aWxzLmlzQ2hyb21lKCkgJiYgVXRpbHMuaXNUb3VjaCgpXG5cdFx0c2V0dXAubGF5ZXIub24gRXZlbnRzLkRvdWJsZVRhcCwgKGV2ZW50KSAtPlxuXHRcdFx0aW5reUVmZmVjdChldmVudCwgQClcblx0aWYgVXRpbHMuaXNDaHJvbWUoKSA9PSBmYWxzZSAmJiBVdGlscy5pc1RvdWNoKClcblx0XHRzZXR1cC5sYXllci5vbiBFdmVudHMuVGFwLCAoZXZlbnQpIC0+XG5cdFx0XHRpbmt5RWZmZWN0KGV2ZW50LCBAKVxuXHRpZiBVdGlscy5pc0Rlc2t0b3AoKVxuXHRcdHNldHVwLmxheWVyLm9uIEV2ZW50cy5Ub3VjaEVuZCwgKGV2ZW50KSAtPlxuXHRcdFx0aW5reUVmZmVjdChldmVudCwgQClcbiIsIm0gPSByZXF1aXJlICdtYXRlcmlhbC1raXQnXG5cblxuZXhwb3J0cy5kZWZhdWx0cyA9IHtcblx0Y29uc3RyYWludHM6e31cblx0dGV4dDogXCJNYXRlcmlhbCBUZXh0IExheWVyXCJcblx0dHlwZTpcInRleHRcIlxuXHR4OjBcblx0eTowXG5cdHdpZHRoOi0xXG5cdGhlaWdodDotMVxuXHRzdXBlckxheWVyOnVuZGVmaW5lZFxuXHRzdHlsZTpcImRlZmF1bHRcIlxuXHRsaW5lczoxXG5cdHRleHRBbGlnbjpcImxlZnRcIlxuXHRiYWNrZ3JvdW5kQ29sb3I6XCJ0cmFuc3BhcmVudFwiXG5cdGNvbG9yOlwiYmxhY2tcIlxuXHRmb250U2l6ZTogMTdcblx0Zm9udFN0eWxlOlwicmVndWxhclwiXG5cdGZvbnRGYW1pbHk6XCJSb2JvdG9cIlxuXHRmb250V2VpZ2h0OlwicmVndWxhclwiXG5cdGxpbmVIZWlnaHQ6XCJhdXRvXCJcblx0bmFtZTpcInRleHQgbGF5ZXJcIlxuXHRvcGFjaXR5OjFcblx0dGV4dFRyYW5zZm9ybTpcIm5vbmVcIlxuXHRsZXR0ZXJTcGFjaW5nOjBcblx0bmFtZTpcInRleHQgbGF5ZXJcIlxufVxuXG5cbmV4cG9ydHMuZGVmYXVsdHMucHJvcHMgPSBPYmplY3Qua2V5cyhleHBvcnRzLmRlZmF1bHRzKVxuXG5zdHlsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3N0eWxlJylcbnN0eWxlLnR5cGUgPSAndGV4dC9jc3MnXG5cbnN0eWxlLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKFwiQGltcG9ydCB1cmwoaHR0cHM6Ly9mb250cy5nb29nbGVhcGlzLmNvbS9jc3M/ZmFtaWx5PVJvYm90bzo0MDAsMTAwLDEwMGl0YWxpYywzMDAsMzAwaXRhbGljLDQwMGl0YWxpYyw1MDAsNTAwaXRhbGljLDcwMCw3MDBpdGFsaWMsOTAwLDkwMGl0YWxpYyk7XFxuIEBpbXBvcnQgdXJsKGh0dHBzOi8vZm9udHMuZ29vZ2xlYXBpcy5jb20vaWNvbj9mYW1pbHk9TWF0ZXJpYWwrSWNvbnMpOyBcXG5cIikpXG5cbmRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKCdoZWFkJylbMF0uYXBwZW5kQ2hpbGQoc3R5bGUpXG5cblxuZXhwb3J0cy5jcmVhdGUgPSAoYXJyYXkpIC0+XG5cdHNldHVwID0gbS51dGlscy5zZXR1cENvbXBvbmVudChhcnJheSwgZXhwb3J0cy5kZWZhdWx0cylcblx0ZXhjZXB0aW9ucyA9IE9iamVjdC5rZXlzKHNldHVwKVxuXHR0ZXh0TGF5ZXIgPSBuZXcgTGF5ZXIgYmFja2dyb3VuZENvbG9yOlwidHJhbnNwYXJlbnRcIiwgbmFtZTpzZXR1cC5uYW1lXG5cdHRleHRMYXllci50eXBlID0gXCJ0ZXh0XCJcblx0dGV4dExheWVyLmh0bWwgPSBzZXR1cC50ZXh0XG5cdGZvciBwcm9wIGluIG0ubGliLmxheWVyUHJvcHNcblx0XHRpZiBzZXR1cFtwcm9wXVxuXHRcdFx0aWYgcHJvcCA9PSBcImNvbG9yXCJcblx0XHRcdFx0c2V0dXBbcHJvcF0gPSBtLnV0aWxzLmNvbG9yKHNldHVwW3Byb3BdKVxuXHRcdFx0dGV4dExheWVyW3Byb3BdID0gc2V0dXBbcHJvcF1cblx0Zm9yIHByb3AgaW4gbS5saWIubGF5ZXJTdHlsZXNcblx0XHRpZiBzZXR1cFtwcm9wXVxuXHRcdFx0aWYgcHJvcCA9PSBcImxpbmVIZWlnaHRcIiAmJiBzZXR1cFtwcm9wXSA9PSBcImF1dG9cIlxuXHRcdFx0XHR0ZXh0TGF5ZXIuc3R5bGUubGluZUhlaWdodCA9ICBzZXR1cC5mb250U2l6ZVxuXHRcdFx0aWYgcHJvcCA9PSBcImZvbnRXZWlnaHRcIlxuXHRcdFx0XHRzd2l0Y2ggc2V0dXBbcHJvcF1cblx0XHRcdFx0XHR3aGVuIFwidWx0cmF0aGluXCIgdGhlbiBzZXR1cFtwcm9wXSA9IDEwMFxuXHRcdFx0XHRcdHdoZW4gXCJ0aGluXCIgdGhlbiBzZXR1cFtwcm9wXSA9IDIwMFxuXHRcdFx0XHRcdHdoZW4gXCJsaWdodFwiIHRoZW4gc2V0dXBbcHJvcF0gPSAzMDBcblx0XHRcdFx0XHR3aGVuIFwicmVndWxhclwiIHRoZW4gc2V0dXBbcHJvcF0gPSA0MDBcblx0XHRcdFx0XHR3aGVuIFwibWVkaXVtXCIgdGhlbiBzZXR1cFtwcm9wXSA9IDUwMFxuXHRcdFx0XHRcdHdoZW4gXCJzZW1pYm9sZFwiIHRoZW4gc2V0dXBbcHJvcF0gPSA2MDBcblx0XHRcdFx0XHR3aGVuIFwiYm9sZFwiIHRoZW4gc2V0dXBbcHJvcF0gPSA3MDBcblx0XHRcdFx0XHR3aGVuIFwiYmxhY2tcIiB0aGVuIHNldHVwW3Byb3BdID0gODAwXG5cdFx0XHRpZiBwcm9wID09IFwiZm9udFNpemVcIiB8fCBwcm9wID09IFwibGluZUhlaWdodFwiIHx8IHByb3AgPT0gXCJsZXR0ZXJTcGFjaW5nXCJcblx0XHRcdFx0c2V0dXBbcHJvcF0gPSBtLnV0aWxzLnB4KHNldHVwW3Byb3BdKSArIFwicHhcIlxuXHRcdFx0dGV4dExheWVyLnN0eWxlW3Byb3BdID0gc2V0dXBbcHJvcF1cblxuXHR0ZXh0RnJhbWUgPSBtLnV0aWxzLnRleHRBdXRvU2l6ZSh0ZXh0TGF5ZXIpXG5cdHRleHRMYXllci5wcm9wcyA9IChoZWlnaHQ6dGV4dEZyYW1lLmhlaWdodCwgd2lkdGg6dGV4dEZyYW1lLndpZHRoKVxuXHR0ZXh0TGF5ZXIuY29uc3RyYWludHMgPSBzZXR1cC5jb25zdHJhaW50c1xuXHRtLmxheW91dC5zZXRcblx0XHR0YXJnZXQ6dGV4dExheWVyXG5cdHJldHVybiB0ZXh0TGF5ZXJcbiIsIm0gPSByZXF1aXJlICdtYXRlcmlhbC1raXQnXG5cbmV4cG9ydHMuZGVmYXVsdHMgPSB7XG5cdGNhcnJpZXI6XCJcIlxuXHRuZXR3b3JrOlwiTFRFXCJcblx0YmF0dGVyeToxMDBcblx0Y2VsbHVsYXI6MlxuXHRzdHlsZTpcImxpZ2h0XCJcblx0Y2xvY2syNDpmYWxzZVxuXHR0eXBlOlwic3RhdHVzQmFyXCJcblx0YmFja2dyb3VuZENvbG9yOlwicmdiYSgwLDAsMCwuMSlcIlxuXHRjb2xvcjogXCJibGFja1wiXG5cdG9wYWNpdHk6LjZcbn1cblxuZXhwb3J0cy5kZWZhdWx0cy5wcm9wcyA9IE9iamVjdC5rZXlzKGV4cG9ydHMuZGVmYXVsdHMpXG5cbmV4cG9ydHMuY3JlYXRlID0gKGFycmF5KSAtPlxuXHRzZXR1cCA9IG0udXRpbHMuc2V0dXBDb21wb25lbnQoYXJyYXksIGV4cG9ydHMuZGVmYXVsdHMpXG5cdHN0YXR1c0JhciA9IG5ldyBMYXllciBiYWNrZ3JvdW5kQ29sb3I6c2V0dXAuYmFja2dyb3VuZENvbG9yLCBuYW1lOlwic3RhdHVzQmFyLmFsbFwiXG5cblx0aWYgc2V0dXAuc3R5bGUgPT0gXCJkYXJrXCJcblx0XHRpZiBzZXR1cC5iYWNrZ3JvdW5kQ29sb3IgPT0gXCJyZ2JhKDAsMCwwLC4xKVwiXG5cdFx0XHRzdGF0dXNCYXIuYmFja2dyb3VuZENvbG9yID0gbS51dGlscy5jb2xvcihcImJsYWNrXCIpXG5cdFx0aWYgc2V0dXAuY29sb3IgPT0gXCJibGFja1wiXG5cdFx0XHRzZXR1cC5jb2xvciA9IFwid2hpdGVcIlxuXHRcdGlmIHNldHVwLm9wYWNpdHkgPT0gLjZcblx0XHRcdHNldHVwLm9wYWNpdHkgPSAxXG5cblx0aWYgc2V0dXAuc3R5bGUgPT0gXCJsaWdodFwiICYmIHNldHVwLmNvbG9yICE9IFwiYmxhY2tcIlxuXHRcdHNldHVwLm9wYWNpdHkgPSAxXG5cblx0c3RhdHVzQmFyLnR5cGUgPSBzZXR1cC50eXBlXG5cdHN0YXR1c0Jhci5jb25zdHJhaW50cyA9XG5cdFx0bGVhZGluZzowXG5cdFx0dHJhaWxpbmc6MFxuXHRcdGhlaWdodDoyNFxuXG5cdHN3aXRjaCBtLmRldmljZS5uYW1lXG5cdFx0d2hlbiBcImlwaG9uZS02cy1wbHVzXCJcblx0XHRcdEB0b3BDb25zdHJhaW50ID0gNVxuXHRcdFx0QGJsdWV0b290aCA9IDVcblxuXHRcdHdoZW4gXCJmdWxsc2NyZWVuXCJcblx0XHRcdEB0b3BDb25zdHJhaW50ID0gNVxuXHRcdFx0QGJsdWV0b290aCA9IC0gMTBcblx0XHRlbHNlXG5cdFx0XHRAdG9wQ29uc3RyYWludCA9IDNcblx0XHRcdEBibHVldG9vdGggPSAzXG5cblxuXG5cdEB0aW1lID0gbS51dGlscy5nZXRUaW1lKClcblx0dGltZSA9IG5ldyBtLlRleHQgc3R5bGU6XCJzdGF0dXNCYXJUaW1lXCIsIHRleHQ6bS51dGlscy50aW1lRm9ybWF0dGVyKEB0aW1lLCBzZXR1cC5jbG9jazI0KSwgZm9udFNpemU6MTQsIGZvbnRXZWlnaHQ6NTAwLCBzdXBlckxheWVyOnN0YXR1c0JhciwgY29sb3I6c2V0dXAuY29sb3IsIG5hbWU6XCJ0aW1lXCIsIG9wYWNpdHk6c2V0dXAub3BhY2l0eVxuXHR0aW1lLmNvbnN0cmFpbnRzID1cblx0XHR0cmFpbGluZzo4XG5cdFx0YWxpZ246XCJ2ZXJ0aWNhbFwiXG5cdG0udXRpbHMudGltZURlbGVnYXRlKHRpbWUsIHNldHVwLmNsb2NrMjQpXG5cblxuXHRiYXR0ZXJ5SWNvbiA9IG5ldyBMYXllciBzdXBlckxheWVyOnN0YXR1c0JhciwgYmFja2dyb3VuZENvbG9yOlwidHJhbnNwYXJlbnRcIiwgbmFtZTpcImJhdHRlcnlJY29uXCJcblx0aWYgc2V0dXAuYmF0dGVyeSA+IDcwXG5cdFx0aGlnaEJhdHRlcnkgPSBtLnV0aWxzLnN2ZyhtLmFzc2V0cy5iYXR0ZXJ5SGlnaClcblx0XHRiYXR0ZXJ5SWNvbi5odG1sID0gaGlnaEJhdHRlcnkuc3ZnXG5cdFx0YmF0dGVyeUljb24uaGVpZ2h0ID0gaGlnaEJhdHRlcnkuaGVpZ2h0XG5cdFx0YmF0dGVyeUljb24ud2lkdGggPSBoaWdoQmF0dGVyeS53aWR0aFxuXHRcdG0udXRpbHMuY2hhbmdlRmlsbChiYXR0ZXJ5SWNvbiwgc2V0dXAuY29sb3IpXG5cdFx0YmF0dGVyeUljb24ub3BhY2l0eSA9IHNldHVwLm9wYWNpdHlcblxuXHRpZiBzZXR1cC5iYXR0ZXJ5IDw9IDcwICYmIHNldHVwLmJhdHRlcnkgPiAyMFxuXHRcdG1pZEJhdHRlcnkgPSBtLnV0aWxzLnN2ZyhtLmFzc2V0cy5iYXR0ZXJ5TWlkKVxuXHRcdGJhdHRlcnlJY29uLmh0bWwgPSBtaWRCYXR0ZXJ5LnN2Z1xuXHRcdG0udXRpbHMuY2hhbmdlRmlsbChiYXR0ZXJ5SWNvbiwgc2V0dXAuY29sb3IpXG5cblx0aWYgc2V0dXAuYmF0dGVyeSA8PSAyMFxuXHRcdGxvd0JhdHRlcnkgPSBtLnV0aWxzLnN2ZyhtLmFzc2V0cy5iYXR0ZXJ5TG93KVxuXHRcdGJhdHRlcnlJY29uLmh0bWwgPSBsb3dCYXR0ZXJ5LnN2Z1xuXHRcdG0udXRpbHMuY2hhbmdlRmlsbChiYXR0ZXJ5SWNvbiwgc2V0dXAuY29sb3IpXG5cblxuXHRiYXR0ZXJ5SWNvbi5jb25zdHJhaW50cyA9XG5cdFx0dHJhaWxpbmcgOiBbdGltZSwgN11cblx0XHRhbGlnbjpcInZlcnRpY2FsXCJcblxuXG5cdGNlbGx1bGFySWNvbiA9IG0udXRpbHMuc3ZnKG0uYXNzZXRzLmNlbGx1bGFyKVxuXHRjZWxsdWxhciA9IG5ldyBMYXllclxuXHRcdHdpZHRoOmNlbGx1bGFySWNvbi53aWR0aFxuXHRcdGhlaWdodDpjZWxsdWxhckljb24uaGVpZ2h0XG5cdFx0aHRtbDpjZWxsdWxhckljb24uc3ZnXG5cdFx0c3VwZXJMYXllcjpzdGF0dXNCYXJcblx0XHRiYWNrZ3JvdW5kQ29sb3I6XCJ0cmFuc3BhcmVudFwiXG5cdFx0b3BhY2l0eTogc2V0dXAub3BhY2l0eVxuXHRcdG5hbWU6XCJjZWxsdWxhclwiXG5cblx0Y2VsbHVsYXIuY29uc3RyYWludHMgPVxuXHRcdHRyYWlsaW5nOiBbYmF0dGVyeUljb24sIDddXG5cdFx0YWxpZ246XCJ2ZXJ0aWNhbFwiXG5cblx0bS51dGlscy5jaGFuZ2VGaWxsKGNlbGx1bGFyLCBzZXR1cC5jb2xvcilcblxuXHR3aWZpSWNvbiA9IG0udXRpbHMuc3ZnKG0uYXNzZXRzLndpZmksIHNldHVwLmNvbG9yKVxuXG5cdHdpZmkgPSBuZXcgTGF5ZXJcblx0XHR3aWR0aDp3aWZpSWNvbi53aWR0aFxuXHRcdGhlaWdodDp3aWZpSWNvbi5oZWlnaHRcblx0XHRzdXBlckxheWVyOnN0YXR1c0JhclxuXHRcdGJhY2tncm91bmRDb2xvcjpcInRyYW5zcGFyZW50XCJcblx0XHRuYW1lOlwid2lmaVwiXG5cdFx0aHRtbDogd2lmaUljb24uc3ZnXG5cdFx0b3BhY2l0eTogc2V0dXAub3BhY2l0eVxuXG5cdG0udXRpbHMuY2hhbmdlRmlsbCh3aWZpLCBzZXR1cC5jb2xvcilcblxuXHR3aWZpLmNvbnN0cmFpbnRzID1cblx0XHR0cmFpbGluZzpbY2VsbHVsYXIsIDRdXG5cdFx0YWxpZ246XCJ2ZXJ0aWNhbFwiXG5cblx0bS5sYXlvdXQuc2V0KClcblxuXHQjIEV4cG9ydCBzdGF0dXNCYXJcblx0c3RhdHVzQmFyLmJhdHRlcnkgPSB7fVxuXHQjIHN0YXR1c0Jhci5iYXR0ZXJ5LnBlcmNlbnQgPSBiYXR0ZXJ5UGVyY2VudFxuXHRzdGF0dXNCYXIuYmF0dGVyeS5pY29uID0gYmF0dGVyeUljb25cblx0IyBzdGF0dXNCYXIuYmx1ZXRvb3RoID0gYmx1ZXRvb3RoXG5cdHN0YXR1c0Jhci50aW1lID0gdGltZVxuXHQjIHN0YXR1c0Jhci53aWZpID0gd2lmaVxuXHRzdGF0dXNCYXIuY2VsbHVsYXIgPSBjZWxsdWxhclxuXG5cdG0ubGF5b3V0LnNldFxuXHRcdHRhcmdldDpbc3RhdHVzQmFyLCB0aW1lLCBiYXR0ZXJ5SWNvbiwgY2VsbHVsYXIsIHdpZmldXG5cdHJldHVybiBzdGF0dXNCYXJcbiIsIm0gPSByZXF1aXJlICdtYXRlcmlhbC1raXQnXG5cbmV4cG9ydHMuc3RhY2sgPSBzdGFjayA9IFtdXG5cblxuZXhwb3J0cy5hZGRUb1N0YWNrID0gKGxheWVyKSAtPlxuICBpZiBzdGFjay5pbmRleE9mKGxheWVyKSA9PSAtMVxuICAgIHN0YWNrLnB1c2ggbGF5ZXJcblxuZXhwb3J0cy5yZW1vdmVGcm9tU3RhY2sgPSAobGF5ZXIpIC0+XG4gIGlmIHN0YWNrLmxlbmd0aCA+IDBcbiAgICBsYXllclRvbGVhdmUgPSBzdGFja1tzdGFjay5sZW5ndGggLSAxXVxuICAgIGlmIGxheWVyVG9sZWF2ZS5leGl0ICE9IHVuZGVmaW5lZFxuICAgICAgbGF5ZXJUb2xlYXZlLmV4aXQoKVxuICAgIGVsc2VcbiAgICAgIG92ZXJsYXkgPSBuZXcgTGF5ZXJcbiAgICAgICAgYmFja2dyb3VuZENvbG9yOm0uY29sb3IoXCJibGFja1wiKVxuICAgICAgICB3aWR0aDptLmRldmljZS53aWR0aFxuICAgICAgICBoZWlnaHQ6bS5kZXZpY2UuaGVpZ2h0XG4gICAgICBvdmVybGF5LnBsYWNlQmVoaW5kKGxheWVyVG9sZWF2ZSlcbiAgICAgIGxheWVyVG9sZWF2ZS5jb25zdHJhaW50cyA9XG4gICAgICAgIGxlYWRpbmc6bS5kcChtLmRldmljZS53aWR0aClcbiAgICAgIG0ubGF5b3V0LmFuaW1hdGVcbiAgICAgICAgdGFyZ2V0OmxheWVyVG9sZWF2ZVxuICAgICAgICB0aW1lOi4zXG4gICAgICBvdmVybGF5LmFuaW1hdGVcbiAgICAgICAgcHJvcGVydGllczoob3BhY2l0eTowKVxuICAgICAgICB0aW1lOi41XG4gICAgICAgIGRlbGF5Oi4yXG4gICAgICBVdGlscy5kZWxheSAuNiwgLT5cbiAgICAgICAgbGF5ZXJUb2xlYXZlLmRlc3Ryb3koKVxuICAgICAgICBvdmVybGF5LmRlc3Ryb3koKVxuICAgIHN0YWNrLnBvcCgpXG4iLCJtID0gcmVxdWlyZSAnbWF0ZXJpYWwta2l0J1xuXG5leHBvcnRzLmRlZmF1bHRzID0ge1xuXHRhbmltYXRlZDp0cnVlXG5cdHRleHQ6XCJTbmFja2JhciBUZXh0XCJcblx0YWN0aW9uOnVuZGVmaW5lZFxuXHRhY3Rpb25Db2xvcjpcImxpbWVBMjAwXCJcblx0ZHVyYXRpb246NVxufVxuXG5leHBvcnRzLmRlZmF1bHRzLnByb3BzID0gT2JqZWN0LmtleXMoZXhwb3J0cy5kZWZhdWx0cylcblxuZXhwb3J0cy5jcmVhdGUgPSAoYXJyYXkpIC0+XG5cdHNldHVwID0gbS51dGlscy5zZXR1cENvbXBvbmVudChhcnJheSwgZXhwb3J0cy5kZWZhdWx0cylcblxuXHRiYXIgPSBuZXcgTGF5ZXJcblx0XHRuYW1lOlwic25hY2tiYXJcIlxuXHRcdGJhY2tncm91bmRDb2xvcjpcInRyYW5zcGFyZW50XCJcblx0XHRjbGlwOnRydWVcblxuXHRiYXIudHlwZSA9IFwic25hY2tiYXJcIlxuXHRiYXIuYmcgPSBuZXcgTGF5ZXJcblx0XHRiYWNrZ3JvdW5kQ29sb3I6XCIjMzIzMjMyXCJcblx0XHRzdXBlckxheWVyOmJhclxuXHRcdG5hbWU6XCJiZ1wiXG5cblx0bmF2YmFyRXhpc3RzID0gMFxuXHRmYWJFeGlzdHMgPSB1bmRlZmluZWRcblxuXHRmb3IgbCBpbiBGcmFtZXIuQ3VycmVudENvbnRleHQubGF5ZXJzXG5cdFx0aWYgbC50eXBlID09IFwibmF2YmFyXCJcblx0XHRcdG5hdmJhckV4aXN0cyA9IGxcblxuXHRcdGlmIGwudHlwZSA9PSBcImZsb2F0aW5nXCJcblx0XHRcdGZhYkV4aXN0cyA9IGxcblxuXHRcdGlmIGwudHlwZSA9PSBcInNuYWNrYmFyXCIgJiYgbCAhPSBiYXJcblx0XHRcdGwuYmcuYW5pbWF0ZVxuXHRcdFx0XHRwcm9wZXJ0aWVzOih5OmJhci5oZWlnaHQpXG5cdFx0XHRcdHRpbWU6LjNcblx0XHRcdFx0Y3VydmU6XCJiZXppZXItY3VydmUoLjIsIDAuNCwgMC40LCAxLjApXCJcblx0XHRcdFx0aWYgbC5mYWJNb3ZlZFxuXHRcdFx0XHRcdGwuZmFiTW92ZWQuaGFsdGVkID0gdHJ1ZVxuXHRcdFx0XHRcdGwuZmFiTW92ZWQuY29uc3RyYWludHMuYm90dG9tID0gZmFiRXhpc3RzLnByZXZpb3VzQm90dG9tXG5cdFx0XHRcdFx0bS5sYXlvdXQuYW5pbWF0ZVxuXHRcdFx0XHRcdFx0dGFyZ2V0OmZhYkV4aXN0c1xuXHRcdFx0XHRcdFx0Y3VydmU6XCJiZXppZXItY3VydmUoLjIsIDAuNCwgMC40LCAxLjApXCJcblx0XHRcdFx0XHRcdHRpbWU6LjNcblx0XHRcdFx0XHRVdGlscy5kZWxheSBzZXR1cC5kdXJhdGlvbiwgLT5cblx0XHRcdFx0XHRcdGZhYkV4aXN0cy5jb25zdHJhaW50cy5ib3R0b20gPSBmYWJFeGlzdHMucHJldmlvdXNCb3R0b21cblx0XHRcdFx0XHRcdG0ubGF5b3V0LmFuaW1hdGVcblx0XHRcdFx0XHRcdFx0dGFyZ2V0OmZhYkV4aXN0c1xuXHRcdFx0XHRcdFx0XHRjdXJ2ZTpcImJlemllci1jdXJ2ZSguMiwgMC40LCAwLjQsIDEuMClcIlxuXHRcdFx0XHRcdFx0XHR0aW1lOi4zXG5cblx0YmFyLmJyaW5nVG9Gcm9udCgpXG5cblx0YmFyLmNvbnN0cmFpbnRzID1cblx0XHRsZWFkaW5nOjBcblx0XHR0cmFpbGluZzowXG5cdFx0Ym90dG9tOltuYXZiYXJFeGlzdHMsIC0xXVxuXHRcdGhlaWdodDo0OFxuXG5cdG0ubGF5b3V0LnNldFxuXHRcdHRhcmdldDpbYmFyXVxuXG5cdGJhci5iZy5wcm9wcyA9IHt3aWR0aDpiYXIud2lkdGgsIGhlaWdodDpiYXIuaGVpZ2h0fVxuXHRhY3Rpb25XaWR0aCA9IG0ucHgoMjQpXG5cblx0aWYgc2V0dXAuYWN0aW9uXG5cdFx0YmFyLmFjdGlvbiA9IG5ldyBtLkJ1dHRvblxuXHRcdFx0dHlwZTpcImZsYXRcIlxuXHRcdFx0c3VwZXJMYXllcjpiYXIuYmdcblx0XHRcdHRleHQ6c2V0dXAuYWN0aW9uXG5cdFx0XHRjb25zdHJhaW50czp7dHJhaWxpbmc6MjQsIGFsaWduOlwidmVydGljYWxcIn1cblx0XHRcdGJhY2tncm91bmRDb2xvcjpcIiMzMjMyXCJcblx0XHRcdGNvbG9yOnNldHVwLmFjdGlvbkNvbG9yXG5cdFx0YWN0aW9uV2lkdGggPSBiYXIuYWN0aW9uLndpZHRoICsgbS5weCg0OClcblxuXHRiYXIudGV4dCA9IG5ldyBtLlRleHRcblx0XHRmb250U2l6ZToxNFxuXHRcdGNvbG9yOlwid2hpdGVcIlxuXHRcdHN1cGVyTGF5ZXI6YmFyLmJnXG5cdFx0Y29uc3RyYWludHM6e2xlYWRpbmc6MjQsIGFsaWduOlwidmVydGljYWxcIn1cblx0XHR0ZXh0OnNldHVwLnRleHRcblx0XHRuYW1lOlwidGV4dFwiXG5cdFx0bGluZUhlaWdodDoxOFxuXG5cdGlmIG0uZGV2aWNlLndpZHRoIDwgYWN0aW9uV2lkdGggKyBiYXIudGV4dC53aWR0aCArIG0ucHgoMjQpXG5cdFx0YmFyLnRleHQuY29uc3RyYWludHMud2lkdGggPSBtLmRwKG0uZGV2aWNlLndpZHRoKSAtIChtLmRwKGFjdGlvbldpZHRoKSArIDI0KVxuXHRcdG0udXRpbHMudXBkYXRlKGJhci50ZXh0KVxuXHRcdG0ubGF5b3V0LnNldChiYXIudGV4dClcblx0XHRiYXIuY29uc3RyYWludHMuaGVpZ2h0ID0gbS5kcChiYXIudGV4dC5oZWlnaHQpICsgNDhcblx0XHRiYXIuYmcuaGVpZ2h0ID0gYmFyLnRleHQuaGVpZ2h0ICsgbS5weCg0OClcblxuXHRcdG0ubGF5b3V0LnNldFxuXHRcdFx0dGFyZ2V0OltiYXIsIGJhci50ZXh0XVxuXG5cdFx0aWYgc2V0dXAuYWN0aW9uXG5cdFx0XHRtLmxheW91dC5zZXQoYmFyLmFjdGlvbilcblxuXHRiYXJIZWlnaHQgPSBiYXIuYmcuaGVpZ2h0XG5cblx0aWYgZmFiRXhpc3RzXG5cdFx0YmFyLmZhYk1vdmVkID0gZmFiRXhpc3RzXG5cdFx0ZmFiRXhpc3RzLnByZXZpb3VzQm90dG9tID0gZmFiRXhpc3RzLmNvbnN0cmFpbnRzLmJvdHRvbVxuXHRcdGZhYkV4aXN0cy5jb25zdHJhaW50cy5ib3R0b20gPSBmYWJFeGlzdHMuY29uc3RyYWludHMuYm90dG9tICsgbS5kcChiYXJIZWlnaHQpXG5cblx0aWYgc2V0dXAuYW5pbWF0ZWRcblx0XHRiYXIuYmcueSA9IGJhci5iZy5oZWlnaHRcblx0XHRiYXIudGV4dC5vcGFjaXR5ID0gMFxuXHRcdGJhci5iZy5hbmltYXRlXG5cdFx0XHRwcm9wZXJ0aWVzOih5OjApXG5cdFx0XHR0aW1lOi4zXG5cdFx0XHRjdXJ2ZTpcImJlemllci1jdXJ2ZSguMiwgMC40LCAwLjQsIDEuMClcIlxuXHRcdGJhci50ZXh0LmFuaW1hdGVcblx0XHRcdHByb3BlcnRpZXM6KG9wYWNpdHk6MSlcblx0XHRcdHRpbWU6LjNcblx0XHRpZiBzZXR1cC5hY3Rpb25cblx0XHRcdGJhci5hY3Rpb24uYW5pbWF0ZVxuXHRcdFx0XHRwcm9wZXJ0aWVzOihvcGFjaXR5OjEpXG5cdFx0XHRcdHRpbWU6LjNcblx0XHRpZiBmYWJFeGlzdHNcblx0XHRcdG0ubGF5b3V0LmFuaW1hdGVcblx0XHRcdFx0dGFyZ2V0OmZhYkV4aXN0c1xuXHRcdFx0XHRjdXJ2ZTpcImJlemllci1jdXJ2ZSguMiwgMC40LCAwLjQsIDEuMClcIlxuXHRcdFx0XHR0aW1lOi4zXG5cblx0VXRpbHMuZGVsYXkgc2V0dXAuZHVyYXRpb24sIC0+XG5cdFx0YmFyLmJnLmFuaW1hdGVcblx0XHRcdHByb3BlcnRpZXM6KHk6YmFyLmhlaWdodClcblx0XHRcdHRpbWU6LjNcblx0XHRcdGN1cnZlOlwiYmV6aWVyLWN1cnZlKC4yLCAwLjQsIDAuNCwgMS4wKVwiXG5cdFx0YmFyLnRleHQuYW5pbWF0ZVxuXHRcdFx0cHJvcGVydGllczoob3BhY2l0eTowKVxuXHRcdFx0dGltZTouM1xuXHRcdGlmIHNldHVwLmFjdGlvblxuXHRcdFx0YmFyLmFjdGlvbi5hbmltYXRlXG5cdFx0XHRcdHByb3BlcnRpZXM6KG9wYWNpdHk6MClcblx0XHRcdFx0dGltZTouM1xuXHRcdGlmIGZhYkV4aXN0cyAmJiBmYWJFeGlzdHMuaGFsdGVkICE9IHRydWVcblx0XHRcdGZhYkV4aXN0cy5jb25zdHJhaW50cy5ib3R0b20gPSBmYWJFeGlzdHMucHJldmlvdXNCb3R0b21cblx0XHRcdG0ubGF5b3V0LmFuaW1hdGVcblx0XHRcdFx0dGFyZ2V0OmZhYkV4aXN0c1xuXHRcdFx0XHRjdXJ2ZTpcImJlemllci1jdXJ2ZSguMiwgMC40LCAwLjQsIDEuMClcIlxuXHRcdFx0XHR0aW1lOi4zXG5cdFV0aWxzLmRlbGF5IHNldHVwLmR1cmF0aW9uICsgLjMsIC0+XG5cdFx0YmFyLmRlc3Ryb3koKVxuXHRyZXR1cm4gYmFyXG4iLCJtID0gcmVxdWlyZSAnbWF0ZXJpYWwta2l0J1xuXG5leHBvcnRzLmRlZmF1bHRzID0ge1xufVxuXG5leHBvcnRzLmRlZmF1bHRzLnByb3BzID0gT2JqZWN0LmtleXMoZXhwb3J0cy5kZWZhdWx0cylcblxuZXhwb3J0cy5jcmVhdGUgPSAoYXJyYXkpIC0+XG5cdHNldHVwID0gbS51dGlscy5zZXR1cENvbXBvbmVudChhcnJheSwgZXhwb3J0cy5kZWZhdWx0cylcblxuXHRuYXZiYXIgPSBuZXcgTGF5ZXJcblx0XHRiYWNrZ3JvdW5kQ29sb3I6XCJibGFja1wiXG5cblx0bmF2YmFyLnR5cGUgPSBcIm5hdmJhclwiXG5cblx0bmF2YmFyLmNvbnN0cmFpbnRzID1cblx0XHRib3R0b206LTFcblx0XHRsZWFkaW5nOjBcblx0XHR0cmFpbGluZzowXG5cdFx0aGVpZ2h0OjQ4XG5cblx0c3ZnSG9tZSA9IG0udXRpbHMuc3ZnKG0uYXNzZXRzLmhvbWUpXG5cdHN2Z0JhY2sgPSBtLnV0aWxzLnN2ZyhtLmFzc2V0cy5iYWNrKVxuXG5cdGhvbWVCdXR0b24gPSBuZXcgTGF5ZXJcblx0XHRzdXBlckxheWVyOm5hdmJhclxuXHRcdGJvcmRlclJhZGl1czptLnV0aWxzLnB4KDIxKVxuXHRcdGJhY2tncm91bmRDb2xvcjpcInRyYW5zcGFyZW50XCJcblx0XHRuYW1lOlwiaG9tZVwiXG5cdFx0Y2xpcDp0cnVlXG5cblx0aG9tZUJ1dHRvbi5jb25zdHJhaW50cyA9XG5cdFx0dG9wOjNcblx0XHRoZWlnaHQ6NDJcblx0XHR3aWR0aDo5NFxuXHRcdGFsaWduOlwiaG9yaXpvbnRhbFwiXG5cblx0aG9tZUljb24gPSBuZXcgTGF5ZXJcblx0XHRzdXBlckxheWVyOmhvbWVCdXR0b25cblx0XHR3aWR0aDpzdmdIb21lLndpZHRoXG5cdFx0aGVpZ2h0OnN2Z0hvbWUuaGVpZ2h0XG5cdFx0aHRtbDpzdmdIb21lLnN2Z1xuXHRcdGJhY2tncm91bmRDb2xvcjpcInRyYW5zcGFyZW50XCJcblx0XHRuYW1lOlwiaWNvblwiXG5cblx0aG9tZUljb24uY29uc3RyYWludHMgPVxuXHRcdGFsaWduOlwiY2VudGVyXCJcblxuXHRyZWNlbnRCdXR0b24gPSBuZXcgTGF5ZXJcblx0XHRzdXBlckxheWVyOm5hdmJhclxuXHRcdGJvcmRlclJhZGl1czptLnV0aWxzLnB4KDIxKVxuXHRcdGJhY2tncm91bmRDb2xvcjpcInRyYW5zcGFyZW50XCJcblx0XHRuYW1lOlwicmVjZW50XCJcblx0XHRjbGlwOnRydWVcblxuXHRyZWNlbnRCdXR0b24uY29uc3RyYWludHMgPVxuXHRcdHRvcDozXG5cdFx0aGVpZ2h0OjQyXG5cdFx0d2lkdGg6OTRcblx0XHRsZWFkaW5nOltob21lQnV0dG9uLCA2XVxuXG5cdHJlY2VudEljb24gPSBuZXcgTGF5ZXJcblx0XHRzdXBlckxheWVyOnJlY2VudEJ1dHRvblxuXHRcdGJhY2tncm91bmRDb2xvcjpcInRyYW5zcGFyZW50XCJcblx0XHRib3JkZXJDb2xvcjpcIndoaXRlXCJcblx0XHRib3JkZXJXaWR0aDptLnV0aWxzLnB4KDIpXG5cdFx0Ym9yZGVyUmFkaXVzOm0udXRpbHMucHgoMilcblx0XHRuYW1lOlwiaWNvblwiXG5cblx0cmVjZW50SWNvbi5jb25zdHJhaW50cyA9XG5cdFx0YWxpZ246XCJjZW50ZXJcIlxuXHRcdHdpZHRoOjE2XG5cdFx0aGVpZ2h0OjE2XG5cblx0YmFja0J1dHRvbiA9IG5ldyBMYXllclxuXHRcdHN1cGVyTGF5ZXI6bmF2YmFyXG5cdFx0Ym9yZGVyUmFkaXVzOm0udXRpbHMucHgoMjEpXG5cdFx0YmFja2dyb3VuZENvbG9yOlwidHJhbnNwYXJlbnRcIlxuXHRcdG5hbWU6XCJiYWNrXCJcblx0XHRjbGlwOnRydWVcblxuXHRiYWNrQnV0dG9uLmNvbnN0cmFpbnRzID1cblx0XHR0b3A6M1xuXHRcdGhlaWdodDo0MlxuXHRcdHdpZHRoOjk0XG5cdFx0dHJhaWxpbmc6W2hvbWVCdXR0b24sIDZdXG5cblxuXHRiYWNrSWNvbiA9IG5ldyBMYXllclxuXHRcdHN1cGVyTGF5ZXI6YmFja0J1dHRvblxuXHRcdHdpZHRoOnN2Z0JhY2sud2lkdGhcblx0XHRoZWlnaHQ6c3ZnQmFjay5oZWlnaHRcblx0XHRodG1sOnN2Z0JhY2suc3ZnXG5cdFx0YmFja2dyb3VuZENvbG9yOlwidHJhbnNwYXJlbnRcIlxuXHRcdG5hbWU6XCJpY29uXCJcblxuXHRiYWNrSWNvbi5jb25zdHJhaW50cyA9XG5cdFx0YWxpZ246XCJjZW50ZXJcIlxuXG5cdG0ubGF5b3V0LnNldFxuXHRcdHRhcmdldDpbbmF2YmFyLCBob21lQnV0dG9uLCByZWNlbnRCdXR0b24sIGJhY2tCdXR0b24sIGhvbWVJY29uLCBiYWNrSWNvbiwgcmVjZW50SWNvbl1cblxuXHRtLnV0aWxzLmlua3lcblx0XHRsYXllcjpob21lQnV0dG9uXG5cdFx0bW92ZVRvVGFwOmZhbHNlXG5cdFx0Y29sb3I6IFwid2hpdGVcIlxuXHRcdHNjYWxlOiAyMFxuXHRcdGN1cnZlOiBcImJlemllci1jdXJ2ZSgxLCAwLjQsIDAuNCwgMS4wKVwiXG5cdFx0b3BhY2l0eTogLjNcblx0bS51dGlscy5pbmt5XG5cdFx0XHRsYXllcjpiYWNrQnV0dG9uXG5cdFx0XHRtb3ZlVG9UYXA6ZmFsc2Vcblx0XHRcdGNvbG9yOiBcIndoaXRlXCJcblx0XHRcdHNjYWxlOiAyMFxuXHRcdFx0Y3VydmU6IFwiYmV6aWVyLWN1cnZlKDEsIDAuNCwgMC40LCAxLjApXCJcblx0XHRcdG9wYWNpdHk6IC4zXG5cdG0udXRpbHMuaW5reVxuXHRcdFx0bGF5ZXI6cmVjZW50QnV0dG9uXG5cdFx0XHRtb3ZlVG9UYXA6ZmFsc2Vcblx0XHRcdGNvbG9yOiBcIndoaXRlXCJcblx0XHRcdHNjYWxlOiAyMFxuXHRcdFx0Y3VydmU6IFwiYmV6aWVyLWN1cnZlKDEsIDAuNCwgMC40LCAxLjApXCJcblx0XHRcdG9wYWNpdHk6IC4zXG5cblx0YmFja0J1dHRvbi5vbiBFdmVudHMuVG91Y2hFbmQsIC0+XG5cdFx0bS5yZW1vdmVGcm9tU3RhY2soKVxuXG5cdG5hdmJhci5iYWNrID0gYmFja0J1dHRvblxuXHRuYXZiYXIuYmFjay5iYWNrSWNvbiA9IGJhY2tJY29uXG5cdG5hdmJhci5ob21lID0gaG9tZUJ1dHRvblxuXHRuYXZiYXIuaG9tZS5pY29uID0gaG9tZUljb25cblx0bmF2YmFyLnJlY2VudCA9IHJlY2VudEJ1dHRvblxuXHRuYXZiYXIucmVjZW50Lmljb24gPSByZWNlbnRJY29uXG5cblx0VXRpbHMuaW50ZXJ2YWwgLjA1LCAtPlxuXHRcdG5hdmJhci5icmluZ1RvRnJvbnQoKVxuXG5cdG0ubGF5b3V0LnNldChuYXZiYXIpXG5cdHJldHVybiBuYXZiYXJcbiIsIm0gPSByZXF1aXJlIFwibWF0ZXJpYWwta2l0XCJcblxuIyBCdWlsZCBMaWJyYXJ5ICBQcm9wZXJ0aWVzXG5sYXllciA9IG5ldyBMYXllclxuZXhwb3J0cy5sYXllclByb3BzID0gT2JqZWN0LmtleXMobGF5ZXIucHJvcHMpXG5leHBvcnRzLmxheWVyUHJvcHMucHVzaCBcInN1cGVyTGF5ZXJcIlxuZXhwb3J0cy5sYXllclByb3BzLnB1c2ggXCJjb25zdHJhaW50c1wiXG5leHBvcnRzLmxheWVyU3R5bGVzID0gT2JqZWN0LmtleXMobGF5ZXIuc3R5bGUpXG5sYXllci5kZXN0cm95KClcblxuZXhwb3J0cy5hc3NldHMgPSB7XG5cdGhvbWU6XCI8c3ZnIHdpZHRoPScxNnB4JyBoZWlnaHQ9JzE2cHgnIHZpZXdCb3g9JzE3MiAxNiAxNiAxNicgdmVyc2lvbj0nMS4xJyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIHhtbG5zOnhsaW5rPSdodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rJz5cblx0XHQgICAgPCEtLSBHZW5lcmF0b3I6IFNrZXRjaCAzLjcuMiAoMjgyNzYpIC0gaHR0cDovL3d3dy5ib2hlbWlhbmNvZGluZy5jb20vc2tldGNoIC0tPlxuXHRcdCAgICA8ZGVzYz5DcmVhdGVkIHdpdGggU2tldGNoLjwvZGVzYz5cblx0XHQgICAgPGRlZnM+XG5cdFx0ICAgICAgICA8ZWxsaXBzZSBpZD0ncGF0aC0xJyBjeD0nMTgwJyBjeT0nMjQnIHJ4PSc4JyByeT0nOCc+PC9lbGxpcHNlPlxuXHRcdCAgICAgICAgPG1hc2sgaWQ9J21hc2stMicgbWFza0NvbnRlbnRVbml0cz0ndXNlclNwYWNlT25Vc2UnIG1hc2tVbml0cz0nb2JqZWN0Qm91bmRpbmdCb3gnIHg9JzAnIHk9JzAnIHdpZHRoPScxNicgaGVpZ2h0PScxNicgZmlsbD0nd2hpdGUnPlxuXHRcdCAgICAgICAgICAgIDx1c2UgeGxpbms6aHJlZj0nI3BhdGgtMSc+PC91c2U+XG5cdFx0ICAgICAgICA8L21hc2s+XG5cdFx0ICAgIDwvZGVmcz5cblx0XHQgICAgPHVzZSBpZD0naG9tZScgc3Ryb2tlPScjRkZGRkZGJyBtYXNrPSd1cmwoI21hc2stMiknIHN0cm9rZS13aWR0aD0nNCcgZmlsbD0nbm9uZScgeGxpbms6aHJlZj0nI3BhdGgtMSc+PC91c2U+XG5cdFx0PC9zdmc+XCJcblx0YmFjazpcIjxzdmcgd2lkdGg9JzE2cHgnIGhlaWdodD0nMTlweCcgdmlld0JveD0nMzAxIDE0IDE2IDE5JyB2ZXJzaW9uPScxLjEnIHhtbG5zPSdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZycgeG1sbnM6eGxpbms9J2h0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsnPlxuICAgIDwhLS0gR2VuZXJhdG9yOiBTa2V0Y2ggMy43LjIgKDI4Mjc2KSAtIGh0dHA6Ly93d3cuYm9oZW1pYW5jb2RpbmcuY29tL3NrZXRjaCAtLT5cbiAgICA8ZGVzYz5DcmVhdGVkIHdpdGggU2tldGNoLjwvZGVzYz5cbiAgICA8ZGVmcz48L2RlZnM+XG4gICAgPHBhdGggZD0nTTMwNy4wMjkzODMsMTcuNzY3MTczMyBDMzA3LjU4MDAyNywxNi44MDM1NDUzIDMwOC41MTAyOTIsMTYuNzc1MDcxMyAzMDkuMTEyMDIzLDE3LjcxMTA5NzYgTDMxNS45NDA4MDIsMjguMzMzNjQzNSBDMzE2LjU0MDM2OCwyOS4yNjYzMDE3IDMxNi4xMzYzNTQsMzAuMDIyMzcwNiAzMTUuMDI2MzA2LDMwLjAyMjM3MDYgTDMwMi4wMjY1MTksMzAuMDIyMzcwNiBDMzAwLjkyMTg5MSwzMC4wMjIzNzA2IDMwMC40Njc5MjMsMjkuMjQ5NzI4IDMwMS4wMjM0NDMsMjguMjc3NTY3OSBMMzA3LjAyOTM4MywxNy43NjcxNzMzIFonIGlkPSdUcmlhbmdsZS0xJyBzdHJva2U9JyNGRkZGRkYnIHN0cm9rZS13aWR0aD0nMicgZmlsbD0nbm9uZScgdHJhbnNmb3JtPSd0cmFuc2xhdGUoMzA4LjUwMjAyMSwgMjMuNTI0MzkxKSByb3RhdGUoLTkwLjAwMDAwMCkgdHJhbnNsYXRlKC0zMDguNTAyMDIxLCAtMjMuNTI0MzkxKSAnPjwvcGF0aD5cblx0XHQ8L3N2Zz5cIlxuXHRjZWxsdWxhcjpcIjxzdmcgd2lkdGg9JzE2cHgnIGhlaWdodD0nMTZweCcgdmlld0JveD0nMzUgNCAxNiAxNicgdmVyc2lvbj0nMS4xJyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIHhtbG5zOnhsaW5rPSdodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rJz5cbiAgICA8IS0tIEdlbmVyYXRvcjogU2tldGNoIDMuNy4yICgyODI3NikgLSBodHRwOi8vd3d3LmJvaGVtaWFuY29kaW5nLmNvbS9za2V0Y2ggLS0+XG4gICAgPGRlc2M+Q3JlYXRlZCB3aXRoIFNrZXRjaC48L2Rlc2M+XG4gICAgPGRlZnM+PC9kZWZzPlxuICAgIDxnIGlkPSdjZWxsdWxhcicgc3Ryb2tlPSdub25lJyBzdHJva2Utd2lkdGg9JzEnIGZpbGw9J25vbmUnIGZpbGwtcnVsZT0nZXZlbm9kZCcgdHJhbnNmb3JtPSd0cmFuc2xhdGUoMzUuMDAwMDAwLCA0LjAwMDAwMCknPlxuICAgICAgICA8cG9seWdvbiBpZD0nYm91bmRzJyBwb2ludHM9JzAgMCAxNiAwIDE2IDE2IDAgMTYnPjwvcG9seWdvbj5cbiAgICAgICAgPHBvbHlnb24gaWQ9J1NoYXBlJyBmaWxsPScjMDAwMDAwJyBwb2ludHM9JzAgMTUgMTQgMTUgMTQgMSc+PC9wb2x5Z29uPlxuICAgIDwvZz5cblx0XHQ8L3N2Zz5cIlxuXHRiYXR0ZXJ5SGlnaCA6IFwiPHN2ZyB3aWR0aD0nOXB4JyBoZWlnaHQ9JzE0cHgnIHZpZXdCb3g9JzMgMSA5IDE0JyB2ZXJzaW9uPScxLjEnIHhtbG5zPSdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZycgeG1sbnM6eGxpbms9J2h0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsnPlxuXHQgICAgPCEtLSBHZW5lcmF0b3I6IFNrZXRjaCAzLjcuMiAoMjgyNzYpIC0gaHR0cDovL3d3dy5ib2hlbWlhbmNvZGluZy5jb20vc2tldGNoIC0tPlxuXHQgICAgPGRlc2M+Q3JlYXRlZCB3aXRoIFNrZXRjaC48L2Rlc2M+XG5cdCAgICA8ZGVmcz48L2RlZnM+XG5cdCAgICA8cG9seWdvbiBpZD0nU2hhcGUnIHN0cm9rZT0nbm9uZScgZmlsbD0nIzAwMDAwMCcgZmlsbC1ydWxlPSdldmVub2RkJyBwb2ludHM9JzkgMS44NzUgOSAxIDYgMSA2IDEuODc1IDMgMS44NzUgMyAxNSAxMiAxNSAxMiAxLjg3NSc+PC9wb2x5Z29uPlxuXHQ8L3N2Zz5cIlxuXHRiYW5uZXJCRyA6IHtcblx0XHRcImlwaG9uZS01XCI6IFwiPD94bWwgdmVyc2lvbj0nMS4wJyBlbmNvZGluZz0nVVRGLTgnIHN0YW5kYWxvbmU9J25vJz8+XG5cdFx0XHQ8c3ZnIHdpZHRoPSczMjBweCcgaGVpZ2h0PSc2OHB4JyB2aWV3Qm94PScwIDAgMzIwIDY4JyB2ZXJzaW9uPScxLjEnIHhtbG5zPSdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZycgeG1sbnM6eGxpbms9J2h0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsnPlxuXHRcdFx0ICAgIDwhLS0gR2VuZXJhdG9yOiBTa2V0Y2ggMy42LjEgKDI2MzEzKSAtIGh0dHA6Ly93d3cuYm9oZW1pYW5jb2RpbmcuY29tL3NrZXRjaCAtLT5cblx0XHRcdCAgICA8dGl0bGU+aXBob25lNTwvdGl0bGU+XG5cdFx0XHQgICAgPGRlc2M+Q3JlYXRlZCB3aXRoIFNrZXRjaC48L2Rlc2M+XG5cdFx0XHQgICAgPGRlZnM+PC9kZWZzPlxuXHRcdFx0ICAgIDxnIGlkPSdQYWdlLTEnIHN0cm9rZT0nbm9uZScgc3Ryb2tlLXdpZHRoPScxJyBmaWxsPSdub25lJyBmaWxsLXJ1bGU9J2V2ZW5vZGQnIGZpbGwtb3BhY2l0eT0nMC45Jz5cblx0XHRcdCAgICAgICAgPGcgaWQ9J2lQaG9uZS01LzVTLzVDJyBmaWxsPScjMUExQTFDJz5cblx0XHRcdCAgICAgICAgICAgIDxwYXRoIGQ9J00wLDAgTDMyMCwwIEwzMjAsNjggTDAsNjggTDAsMCBaIE0xNDIsNjEuMDA0ODgxNSBDMTQyLDU5Ljg5NzYxNiAxNDIuODk2Mjc5LDU5IDE0NC4wMDI0LDU5IEwxNzYuOTk3Niw1OSBDMTc4LjEwMzQ5NSw1OSAxNzksNTkuODkzODk5OCAxNzksNjEuMDA0ODgxNSBMMTc5LDYxLjk5NTExODUgQzE3OSw2My4xMDIzODQgMTc4LjEwMzcyMSw2NCAxNzYuOTk3Niw2NCBMMTQ0LjAwMjQsNjQgQzE0Mi44OTY1MDUsNjQgMTQyLDYzLjEwNjEwMDIgMTQyLDYxLjk5NTExODUgTDE0Miw2MS4wMDQ4ODE1IFonIGlkPSdpcGhvbmU1Jz48L3BhdGg+XG5cdFx0XHQgICAgICAgIDwvZz5cblx0XHRcdCAgICA8L2c+XG5cdFx0XHQ8L3N2Zz5cIlxuXHRcdFwiaXBob25lLTZzXCI6IFwiPD94bWwgdmVyc2lvbj0nMS4wJyBlbmNvZGluZz0nVVRGLTgnIHN0YW5kYWxvbmU9J25vJz8+XG5cdFx0XHRcdDxzdmcgd2lkdGg9JzM3NXB4JyBoZWlnaHQ9JzY4cHgnIHZpZXdCb3g9JzAgMCAzNzUgNjgnIHZlcnNpb249JzEuMScgeG1sbnM9J2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJyB4bWxuczp4bGluaz0naHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayc+XG5cdFx0XHRcdFx0PCEtLSBHZW5lcmF0b3I6IFNrZXRjaCAzLjYgKDI2MzA0KSAtIGh0dHA6Ly93d3cuYm9oZW1pYW5jb2RpbmcuY29tL3NrZXRjaCAtLT5cblx0XHRcdFx0XHQ8dGl0bGU+Tm90aWZpY2F0aW9uIGJhY2tncm91bmQ8L3RpdGxlPlxuXHRcdFx0XHRcdDxkZXNjPkNyZWF0ZWQgd2l0aCBTa2V0Y2guPC9kZXNjPlxuXHRcdFx0XHRcdDxkZWZzPjwvZGVmcz5cblx0XHRcdFx0XHQ8ZyBpZD0nUGFnZS0xJyBzdHJva2U9J25vbmUnIHN0cm9rZS13aWR0aD0nMScgZmlsbD0nbm9uZScgZmlsbC1ydWxlPSdldmVub2RkJyBmaWxsLW9wYWNpdHk9JzAuOSc+XG5cdFx0XHRcdFx0XHQ8ZyBpZD0naU9TOC1QdXNoLU5vdGlmaWNhdGlvbicgdHJhbnNmb3JtPSd0cmFuc2xhdGUoLTU4LjAwMDAwMCwgLTIzLjAwMDAwMCknIGZpbGw9JyMxQTFBMUMnPlxuXHRcdFx0XHRcdFx0XHQ8ZyB0cmFuc2Zvcm09J3RyYW5zbGF0ZSg1OC4wMDAwMDAsIDcuMDAwMDAwKScgaWQ9J05vdGlmaWNhdGlvbi1jb250YWluZXInPlxuXHRcdFx0XHRcdFx0XHRcdDxnPlxuXHRcdFx0XHRcdFx0XHRcdFx0PHBhdGggZD0nTTAsMTYgTDM3NSwxNiBMMzc1LDg0IEwwLDg0IEwwLDE2IFogTTE2OSw3Ny4wMDQ4ODE1IEMxNjksNzUuODk3NjE2IDE2OS44OTYyNzksNzUgMTcxLjAwMjQsNzUgTDIwMy45OTc2LDc1IEMyMDUuMTAzNDk1LDc1IDIwNiw3NS44OTM4OTk4IDIwNiw3Ny4wMDQ4ODE1IEwyMDYsNzcuOTk1MTE4NSBDMjA2LDc5LjEwMjM4NCAyMDUuMTAzNzIxLDgwIDIwMy45OTc2LDgwIEwxNzEuMDAyNCw4MCBDMTY5Ljg5NjUwNSw4MCAxNjksNzkuMTA2MTAwMiAxNjksNzcuOTk1MTE4NSBMMTY5LDc3LjAwNDg4MTUgWicgaWQ9J05vdGlmaWNhdGlvbi1iYWNrZ3JvdW5kJz48L3BhdGg+XG5cdFx0XHRcdFx0XHRcdFx0PC9nPlxuXHRcdFx0XHRcdFx0XHQ8L2c+XG5cdFx0XHRcdFx0XHQ8L2c+XG5cdFx0XHRcdFx0PC9nPlxuXHRcdFx0XHQ8L3N2Zz5cIlxuXHRcdFwiaXBob25lLTZzLXBsdXNcIiA6IFwiPD94bWwgdmVyc2lvbj0nMS4wJyBlbmNvZGluZz0nVVRGLTgnIHN0YW5kYWxvbmU9J25vJz8+XG5cdFx0XHRcdDxzdmcgd2lkdGg9JzQxNHB4JyBoZWlnaHQ9JzY4cHgnIHZpZXdCb3g9JzAgMCA0MTQgNjgnIHZlcnNpb249JzEuMScgeG1sbnM9J2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJyB4bWxuczp4bGluaz0naHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayc+XG5cdFx0XHRcdDwhLS0gR2VuZXJhdG9yOiBTa2V0Y2ggMy42ICgyNjMwNCkgLSBodHRwOi8vd3d3LmJvaGVtaWFuY29kaW5nLmNvbS9za2V0Y2ggLS0+XG5cdFx0XHRcdDx0aXRsZT5Ob3RpZmljYXRpb24gYmFja2dyb3VuZCBDb3B5PC90aXRsZT5cblx0XHRcdFx0PGRlc2M+Q3JlYXRlZCB3aXRoIFNrZXRjaC48L2Rlc2M+XG5cdFx0XHRcdDxkZWZzPjwvZGVmcz5cblx0XHRcdFx0PGcgaWQ9J1BhZ2UtMScgc3Ryb2tlPSdub25lJyBzdHJva2Utd2lkdGg9JzEnIGZpbGw9J25vbmUnIGZpbGwtcnVsZT0nZXZlbm9kZCcgZmlsbC1vcGFjaXR5PScwLjknPlxuXHRcdFx0XHRcdDxnIGlkPSdpT1M4LVB1c2gtTm90aWZpY2F0aW9uJyB0cmFuc2Zvcm09J3RyYW5zbGF0ZSgtNDMuMDAwMDAwLCAtNzQuMDAwMDAwKScgZmlsbD0nIzFBMUExQyc+XG5cdFx0XHRcdFx0XHQ8ZyB0cmFuc2Zvcm09J3RyYW5zbGF0ZSg0My4wMDAwMDAsIDc0LjAwMDAwMCknIGlkPSdOb3RpZmljYXRpb24tY29udGFpbmVyJz5cblx0XHRcdFx0XHRcdFx0PGc+XG5cdFx0XHRcdFx0XHRcdFx0PHBhdGggZD0nTTAsMCBMNDE0LDAgTDQxNCw2OCBMMCw2OCBMMCwwIFogTTE4OSw2MS4wMDQ4ODE1IEMxODksNTkuODk3NjE2IDE4OS44OTYyNzksNTkgMTkxLjAwMjQsNTkgTDIyMy45OTc2LDU5IEMyMjUuMTAzNDk1LDU5IDIyNiw1OS44OTM4OTk4IDIyNiw2MS4wMDQ4ODE1IEwyMjYsNjEuOTk1MTE4NSBDMjI2LDYzLjEwMjM4NCAyMjUuMTAzNzIxLDY0IDIyMy45OTc2LDY0IEwxOTEuMDAyNCw2NCBDMTg5Ljg5NjUwNSw2NCAxODksNjMuMTA2MTAwMiAxODksNjEuOTk1MTE4NSBMMTg5LDYxLjAwNDg4MTUgWicgaWQ9J05vdGlmaWNhdGlvbi1iYWNrZ3JvdW5kLUNvcHknPjwvcGF0aD5cblx0XHRcdFx0XHRcdFx0PC9nPlxuXHRcdFx0XHRcdFx0PC9nPlxuXHRcdFx0XHRcdDwvZz5cblx0XHRcdFx0PC9nPlxuXHRcdFx0PC9zdmc+XCJcblx0XHRcImlwYWRcIiA6IFwiPD94bWwgdmVyc2lvbj0nMS4wJyBlbmNvZGluZz0nVVRGLTgnIHN0YW5kYWxvbmU9J25vJz8+XG5cdFx0XHRcdDxzdmcgd2lkdGg9Jzc2OHB4JyBoZWlnaHQ9JzY4cHgnIHZpZXdCb3g9JzAgMCA3NjggNjgnIHZlcnNpb249JzEuMScgeG1sbnM9J2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJyB4bWxuczp4bGluaz0naHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayc+XG5cdFx0XHRcdCAgICA8IS0tIEdlbmVyYXRvcjogU2tldGNoIDMuNi4xICgyNjMxMykgLSBodHRwOi8vd3d3LmJvaGVtaWFuY29kaW5nLmNvbS9za2V0Y2ggLS0+XG5cdFx0XHRcdCAgICA8dGl0bGU+aXBhZC1wb3J0cmFpdDwvdGl0bGU+XG5cdFx0XHRcdCAgICA8ZGVzYz5DcmVhdGVkIHdpdGggU2tldGNoLjwvZGVzYz5cblx0XHRcdFx0ICAgIDxkZWZzPjwvZGVmcz5cblx0XHRcdFx0ICAgIDxnIGlkPSdQYWdlLTEnIHN0cm9rZT0nbm9uZScgc3Ryb2tlLXdpZHRoPScxJyBmaWxsPSdub25lJyBmaWxsLXJ1bGU9J2V2ZW5vZGQnIGZpbGwtb3BhY2l0eT0nMC45Jz5cblx0XHRcdFx0ICAgICAgICA8ZyBpZD0naVBhZC1Qb3J0cmFpdCcgZmlsbD0nIzFBMUExQyc+XG5cdFx0XHRcdCAgICAgICAgICAgIDxwYXRoIGQ9J00wLDAgTDc2OCwwIEw3NjgsNjggTDAsNjggTDAsMCBaIE0zNjYsNjEuMDA0ODgxNSBDMzY2LDU5Ljg5NzYxNiAzNjYuODk2Mjc5LDU5IDM2OC4wMDI0LDU5IEw0MDAuOTk3Niw1OSBDNDAyLjEwMzQ5NSw1OSA0MDMsNTkuODkzODk5OCA0MDMsNjEuMDA0ODgxNSBMNDAzLDYxLjk5NTExODUgQzQwMyw2My4xMDIzODQgNDAyLjEwMzcyMSw2NCA0MDAuOTk3Niw2NCBMMzY4LjAwMjQsNjQgQzM2Ni44OTY1MDUsNjQgMzY2LDYzLjEwNjEwMDIgMzY2LDYxLjk5NTExODUgTDM2Niw2MS4wMDQ4ODE1IFonIGlkPSdpcGFkLXBvcnRyYWl0Jz48L3BhdGg+XG5cdFx0XHRcdCAgICAgICAgPC9nPlxuXHRcdFx0XHQgICAgPC9nPlxuXHRcdFx0XHQ8L3N2Zz5cIlxuXHRcdFwiaXBhZC1wcm9cIiA6IFwiPD94bWwgdmVyc2lvbj0nMS4wJyBlbmNvZGluZz0nVVRGLTgnIHN0YW5kYWxvbmU9J25vJz8+XG5cdFx0XHRcdDxzdmcgd2lkdGg9JzEwMjRweCcgaGVpZ2h0PSc2OHB4JyB2aWV3Qm94PScwIDAgMTAyNCA2OCcgdmVyc2lvbj0nMS4xJyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIHhtbG5zOnhsaW5rPSdodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rJz5cblx0XHRcdFx0ICAgIDwhLS0gR2VuZXJhdG9yOiBTa2V0Y2ggMy42LjEgKDI2MzEzKSAtIGh0dHA6Ly93d3cuYm9oZW1pYW5jb2RpbmcuY29tL3NrZXRjaCAtLT5cblx0XHRcdFx0ICAgIDx0aXRsZT5pcGFkLXByby1wb3J0cmFpdDwvdGl0bGU+XG5cdFx0XHRcdCAgICA8ZGVzYz5DcmVhdGVkIHdpdGggU2tldGNoLjwvZGVzYz5cblx0XHRcdFx0ICAgIDxkZWZzPjwvZGVmcz5cblx0XHRcdFx0ICAgIDxnIGlkPSdQYWdlLTEnIHN0cm9rZT0nbm9uZScgc3Ryb2tlLXdpZHRoPScxJyBmaWxsPSdub25lJyBmaWxsLXJ1bGU9J2V2ZW5vZGQnIGZpbGwtb3BhY2l0eT0nMC45Jz5cblx0XHRcdFx0ICAgICAgICA8ZyBpZD0naVBhZC1Qcm8tUG9ydHJhaXQnIGZpbGw9JyMxQTFBMUMnPlxuXHRcdFx0XHQgICAgICAgICAgICA8cGF0aCBkPSdNMCwwIEwxMDI0LDAgTDEwMjQsNjggTDAsNjggTDAsMCBaIE00OTQsNjEuMDA0ODgxNSBDNDk0LDU5Ljg5NzYxNiA0OTQuODk2Mjc5LDU5IDQ5Ni4wMDI0LDU5IEw1MjguOTk3Niw1OSBDNTMwLjEwMzQ5NSw1OSA1MzEsNTkuODkzODk5OCA1MzEsNjEuMDA0ODgxNSBMNTMxLDYxLjk5NTExODUgQzUzMSw2My4xMDIzODQgNTMwLjEwMzcyMSw2NCA1MjguOTk3Niw2NCBMNDk2LjAwMjQsNjQgQzQ5NC44OTY1MDUsNjQgNDk0LDYzLjEwNjEwMDIgNDk0LDYxLjk5NTExODUgTDQ5NCw2MS4wMDQ4ODE1IFonIGlkPSdpcGFkLXByby1wb3J0cmFpdCc+PC9wYXRoPlxuXHRcdFx0XHQgICAgICAgIDwvZz5cblx0XHRcdFx0ICAgIDwvZz5cblx0XHRcdFx0PC9zdmc+XCJcblx0fVxuXHR3aWZpOlwiPD94bWwgdmVyc2lvbj0nMS4wJyBlbmNvZGluZz0nVVRGLTgnIHN0YW5kYWxvbmU9J25vJz8+XG48c3ZnIHdpZHRoPScxOHB4JyBoZWlnaHQ9JzE0cHgnIHZpZXdCb3g9JzAgMCAxOCAxNCcgdmVyc2lvbj0nMS4xJyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIHhtbG5zOnhsaW5rPSdodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rJz5cbiAgICA8IS0tIEdlbmVyYXRvcjogU2tldGNoIDMuNy4yICgyODI3NikgLSBodHRwOi8vd3d3LmJvaGVtaWFuY29kaW5nLmNvbS9za2V0Y2ggLS0+XG4gICAgPHRpdGxlPlNoYXBlPC90aXRsZT5cbiAgICA8ZGVzYz5DcmVhdGVkIHdpdGggU2tldGNoLjwvZGVzYz5cbiAgICA8ZGVmcz48L2RlZnM+XG4gICAgPGcgaWQ9J01hdGVyaWFsLURlc2lnbi1TeW1ib2xzJyBzdHJva2U9J25vbmUnIHN0cm9rZS13aWR0aD0nMScgZmlsbD0nbm9uZScgZmlsbC1ydWxlPSdldmVub2RkJz5cbiAgICAgICAgPGcgaWQ9J01hdGVyaWFsL0FuZHJvaWQvU3RhdHVzLWJhci1jb250ZW50LWxpZ2h0JyB0cmFuc2Zvcm09J3RyYW5zbGF0ZSgtMTUuMDAwMDAwLCAtNS4wMDAwMDApJyBmaWxsPScjMDAwMDAwJz5cbiAgICAgICAgICAgIDxnIGlkPSd3aWZpJyB0cmFuc2Zvcm09J3RyYW5zbGF0ZSgxNC4wMDAwMDAsIDQuMDAwMDAwKSc+XG4gICAgICAgICAgICAgICAgPHBhdGggZD0nTTE5LjAyMjYyNzksNC4wMTU5MzEyMyBDMTYuNTExNzgwOSwyLjEyMjU2MzgyIDEzLjM4Njk4NDksMSAxMCwxIEM2LjYxMzAxNTEzLDEgMy40ODgyMTkwOCwyLjEyMjU2MzgyIDAuOTc3MzcyMDg1LDQuMDE1OTMxMjMgTDEwLDE1IEwxOS4wMjI2Mjc5LDQuMDE1OTMxMjMgWicgaWQ9J1NoYXBlJz48L3BhdGg+XG4gICAgICAgICAgICA8L2c+XG4gICAgICAgIDwvZz5cbiAgICA8L2c+XG48L3N2Zz5cIlxuXHRzaWduYWxIaWdoOiBcIlxuPHN2ZyB3aWR0aD0nMTRweCcgaGVpZ2h0PScxNHB4JyB2aWV3Qm94PScwIDEgMTQgMTQnIHZlcnNpb249JzEuMScgeG1sbnM9J2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJyB4bWxuczp4bGluaz0naHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayc+XG4gICAgPCEtLSBHZW5lcmF0b3I6IFNrZXRjaCAzLjcuMiAoMjgyNzYpIC0gaHR0cDovL3d3dy5ib2hlbWlhbmNvZGluZy5jb20vc2tldGNoIC0tPlxuICAgIDxkZXNjPkNyZWF0ZWQgd2l0aCBTa2V0Y2guPC9kZXNjPlxuICAgIDxkZWZzPjwvZGVmcz5cbiAgICA8cG9seWdvbiBpZD0nU2hhcGUnIHN0cm9rZT0nbm9uZScgZmlsbD0nI0ZGRkZGRicgZmlsbC1ydWxlPSdldmVub2RkJyBwb2ludHM9JzAgMTUgMTQgMTUgMTQgMSc+PC9wb2x5Z29uPlxuPC9zdmc+XCJcblx0YWN0aXZpdHk6IFwiPD94bWwgdmVyc2lvbj0nMS4wJyBlbmNvZGluZz0nVVRGLTgnIHN0YW5kYWxvbmU9J25vJz8+XG5cdFx0XHQ8c3ZnIHdpZHRoPScxNnB4JyBoZWlnaHQ9JzE2cHgnIHZpZXdCb3g9JzAgMCAxNiAxNicgdmVyc2lvbj0nMS4xJyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIHhtbG5zOnhsaW5rPSdodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rJyB4bWxuczpza2V0Y2g9J2h0dHA6Ly93d3cuYm9oZW1pYW5jb2RpbmcuY29tL3NrZXRjaC9ucyc+XG5cdFx0XHRcdDwhLS0gR2VuZXJhdG9yOiBTa2V0Y2ggMy41LjIgKDI1MjM1KSAtIGh0dHA6Ly93d3cuYm9oZW1pYW5jb2RpbmcuY29tL3NrZXRjaCAtLT5cblx0XHRcdFx0PHRpdGxlPlNvY2NlciBCYWxsPC90aXRsZT5cblx0XHRcdFx0PGRlc2M+Q3JlYXRlZCB3aXRoIFNrZXRjaC48L2Rlc2M+XG5cdFx0XHRcdDxkZWZzPlxuXHRcdFx0XHRcdDxjaXJjbGUgaWQ9J3BhdGgtMScgY3g9JzgnIGN5PSc4JyByPSc4Jz48L2NpcmNsZT5cblx0XHRcdFx0PC9kZWZzPlxuXHRcdFx0XHQ8ZyBpZD0nUGFnZS0xJyBzdHJva2U9J25vbmUnIHN0cm9rZS13aWR0aD0nMScgZmlsbD0nbm9uZScgZmlsbC1ydWxlPSdldmVub2RkJyBza2V0Y2g6dHlwZT0nTVNQYWdlJz5cblx0XHRcdFx0XHQ8ZyBpZD0naVBob25lLTYnIHNrZXRjaDp0eXBlPSdNU0FydGJvYXJkR3JvdXAnIHRyYW5zZm9ybT0ndHJhbnNsYXRlKC0xNzkuMDAwMDAwLCAtNjM5LjAwMDAwMCknPlxuXHRcdFx0XHRcdFx0PGcgaWQ9J1NvY2Nlci1CYWxsJyBza2V0Y2g6dHlwZT0nTVNMYXllckdyb3VwJyB0cmFuc2Zvcm09J3RyYW5zbGF0ZSgxNzkuMDAwMDAwLCA2MzkuMDAwMDAwKSc+XG5cdFx0XHRcdFx0XHRcdDxtYXNrIGlkPSdtYXNrLTInIHNrZXRjaDpuYW1lPSdNYXNrJyBmaWxsPSd3aGl0ZSc+XG5cdFx0XHRcdFx0XHRcdFx0PHVzZSB4bGluazpocmVmPScjcGF0aC0xJz48L3VzZT5cblx0XHRcdFx0XHRcdFx0PC9tYXNrPlxuXHRcdFx0XHRcdFx0XHQ8dXNlIGlkPSdNYXNrJyBzdHJva2U9JyM0QTUzNjEnIHNrZXRjaDp0eXBlPSdNU1NoYXBlR3JvdXAnIHhsaW5rOmhyZWY9JyNwYXRoLTEnPjwvdXNlPlxuXHRcdFx0XHRcdFx0XHQ8cGF0aCBkPSdNNiwxMi4xMjAzMDQ2IEwxMi44NTczMzg0LDggTDEzLjM3MjM3NjUsOC44NTcxNjczIEw2LjUxNTAzODA3LDEyLjk3NzQ3MTkgTDYsMTIuMTIwMzA0NiBMNiwxMi4xMjAzMDQ2IFonIGlkPSdSZWN0YW5nbGUtNDcnIGZpbGw9JyM0QTUzNjEnIHNrZXRjaDp0eXBlPSdNU1NoYXBlR3JvdXAnIG1hc2s9J3VybCgjbWFzay0yKSc+PC9wYXRoPlxuXHRcdFx0XHRcdFx0XHQ8cGF0aCBkPSdNMTEuODQ5NjQ4LDguNzI2MDU1MSBMMTkuMTAwMTEwMyw1LjM0NTEwOTAxIEwxOS41MjI3Mjg1LDYuMjUxNDE2OCBMMTIuMjcyMjY2Miw5LjYzMjM2Mjg5IEwxMS44NDk2NDgsOC43MjYwNTUxIEwxMS44NDk2NDgsOC43MjYwNTUxIFonIGlkPSdSZWN0YW5nbGUtNDctQ29weS0zJyBmaWxsPScjNEE1MzYxJyBza2V0Y2g6dHlwZT0nTVNTaGFwZUdyb3VwJyBtYXNrPSd1cmwoI21hc2stMiknPjwvcGF0aD5cblx0XHRcdFx0XHRcdFx0PHBhdGggZD0nTTYsMy4xMjAzMDQ2IEwxMi44NTczMzg0LC0xIEwxMy4zNzIzNzY1LC0wLjE0MjgzMjY5OSBMNi41MTUwMzgwNywzLjk3NzQ3MTkgTDYsMy4xMjAzMDQ2IEw2LDMuMTIwMzA0NiBaJyBpZD0nUmVjdGFuZ2xlLTQ3LUNvcHktMicgZmlsbD0nIzRBNTM2MScgc2tldGNoOnR5cGU9J01TU2hhcGVHcm91cCcgbWFzaz0ndXJsKCNtYXNrLTIpJz48L3BhdGg+XG5cdFx0XHRcdFx0XHRcdDxwYXRoIGQ9J00tMSw3LjEyMDMwNDYgTDUuODU3MzM4NDEsMyBMNi4zNzIzNzY0OCwzLjg1NzE2NzMgTC0wLjQ4NDk2MTkyNSw3Ljk3NzQ3MTkgTC0xLDcuMTIwMzA0NiBMLTEsNy4xMjAzMDQ2IFonIGlkPSdSZWN0YW5nbGUtNDctQ29weS00JyBmaWxsPScjNEE1MzYxJyBza2V0Y2g6dHlwZT0nTVNTaGFwZUdyb3VwJyBtYXNrPSd1cmwoI21hc2stMiknPjwvcGF0aD5cblx0XHRcdFx0XHRcdFx0PHJlY3QgaWQ9J1JlY3RhbmdsZS01MCcgZmlsbD0nIzRBNTM2MScgc2tldGNoOnR5cGU9J01TU2hhcGVHcm91cCcgbWFzaz0ndXJsKCNtYXNrLTIpJyB4PSc0JyB5PSc2JyB3aWR0aD0nMScgaGVpZ2h0PSc1Jz48L3JlY3Q+XG5cdFx0XHRcdFx0XHRcdDxyZWN0IGlkPSdSZWN0YW5nbGUtNTEnIGZpbGw9JyM0QTUzNjEnIHNrZXRjaDp0eXBlPSdNU1NoYXBlR3JvdXAnIG1hc2s9J3VybCgjbWFzay0yKScgeD0nMTEuNScgeT0nMycgd2lkdGg9JzEnIGhlaWdodD0nMTInPjwvcmVjdD5cblx0XHRcdFx0XHRcdFx0PHBhdGggZD0nTTUsNC44NTcxNjczIEwxMS44NTczMzg0LDguOTc3NDcxOSBMMTIuMzcyMzc2NSw4LjEyMDMwNDYgTDUuNTE1MDM4MDcsNCBMNSw0Ljg1NzE2NzMnIGlkPSdSZWN0YW5nbGUtNDctQ29weScgZmlsbD0nIzRBNTM2MScgc2tldGNoOnR5cGU9J01TU2hhcGVHcm91cCcgbWFzaz0ndXJsKCNtYXNrLTIpJz48L3BhdGg+XG5cdFx0XHRcdFx0XHRcdDxwYXRoIGQ9J001LDEyLjg1NzE2NzMgTDExLjg1NzMzODQsMTYuOTc3NDcxOSBMMTIuMzcyMzc2NSwxNi4xMjAzMDQ2IEw1LjUxNTAzODA3LDEyIEw1LDEyLjg1NzE2NzMnIGlkPSdSZWN0YW5nbGUtNDctQ29weS01JyBmaWxsPScjNEE1MzYxJyBza2V0Y2g6dHlwZT0nTVNTaGFwZUdyb3VwJyBtYXNrPSd1cmwoI21hc2stMiknPjwvcGF0aD5cblx0XHRcdFx0XHRcdFx0PHBhdGggZD0nTTExLjkwNDg5NzIsNi4xNDc2NjA2NCBMMTMuODcxNDIyNyw4LjMzMTcwODQ5IEwxMi40MDE5NTk2LDEwLjg3Njg5MzMgTDkuNTI3MjU1ODksMTAuMjY1ODU2MiBMOS4yMjAwNTQ0NSw3LjM0MzAyOTY1IEwxMS45MDQ4OTcyLDYuMTQ3NjYwNjQnIGlkPSdQb2x5Z29uLTEnIGZpbGw9JyNEOEQ4RDgnIHNrZXRjaDp0eXBlPSdNU1NoYXBlR3JvdXAnIG1hc2s9J3VybCgjbWFzay0yKSc+PC9wYXRoPlxuXHRcdFx0XHRcdFx0XHQ8cGF0aCBkPSdNMTEuOTA0ODk3Miw2LjE0NzY2MDY0IEwxMy44NzE0MjI3LDguMzMxNzA4NDkgTDEyLjQwMTk1OTYsMTAuODc2ODkzMyBMOS41MjcyNTU4OSwxMC4yNjU4NTYyIEw5LjIyMDA1NDQ1LDcuMzQzMDI5NjUgTDExLjkwNDg5NzIsNi4xNDc2NjA2NCcgaWQ9J1BvbHlnb24tMS1Db3B5JyBmaWxsPScjNEE1MzYxJyBza2V0Y2g6dHlwZT0nTVNTaGFwZUdyb3VwJyBtYXNrPSd1cmwoI21hc2stMiknPjwvcGF0aD5cblx0XHRcdFx0XHRcdFx0PHBhdGggZD0nTTcuNDU3NzExODksMy4xOTUwNDczOSBMNy4zNTUxNDQ4NCw2LjEzMjE4MzMzIEw0LjUzMDA2NzYsNi45NDIyNjEyIEwyLjg4NjY0MDg5LDQuNTA1NzgwOSBMNC42OTYwMjQ1NywyLjE4OTg3NTQxIEw3LjQ1NzcxMTg5LDMuMTk1MDQ3MzknIGlkPSdQb2x5Z29uLTEtQ29weS0yJyBmaWxsPScjNEE1MzYxJyBza2V0Y2g6dHlwZT0nTVNTaGFwZUdyb3VwJyBtYXNrPSd1cmwoI21hc2stMiknPjwvcGF0aD5cblx0XHRcdFx0XHRcdFx0PHBhdGggZD0nTTcuNDU3NzExODksMTEuMTk1MDQ3NCBMNy4zNTUxNDQ4NCwxNC4xMzIxODMzIEw0LjUzMDA2NzYsMTQuOTQyMjYxMiBMMi44ODY2NDA4OSwxMi41MDU3ODA5IEw0LjY5NjAyNDU3LDEwLjE4OTg3NTQgTDcuNDU3NzExODksMTEuMTk1MDQ3NCcgaWQ9J1BvbHlnb24tMS1Db3B5LTMnIGZpbGw9JyM0QTUzNjEnIHNrZXRjaDp0eXBlPSdNU1NoYXBlR3JvdXAnIG1hc2s9J3VybCgjbWFzay0yKSc+PC9wYXRoPlxuXHRcdFx0XHRcdFx0XHQ8cGF0aCBkPSdNMTQuNTQzMTcwMSwwLjA3MjU5MzkzMTQgTDE0LjQ0MDYwMzEsMy4wMDk3Mjk4OCBMMTEuNjE1NTI1OCwzLjgxOTgwNzc0IEw5Ljk3MjA5OTEyLDEuMzgzMzI3NDUgTDExLjc4MTQ4MjgsLTAuOTMyNTc4MDUgTDE0LjU0MzE3MDEsMC4wNzI1OTM5MzE0JyBpZD0nUG9seWdvbi0xLUNvcHktNCcgZmlsbD0nIzRBNTM2MScgc2tldGNoOnR5cGU9J01TU2hhcGVHcm91cCcgbWFzaz0ndXJsKCNtYXNrLTIpJz48L3BhdGg+XG5cdFx0XHRcdFx0XHQ8L2c+XG5cdFx0XHRcdFx0PC9nPlxuXHRcdFx0XHQ8L2c+XG5cdFx0XHQ8L3N2Zz5cIlxuXHRhbmltYWxzOiBcIjw/eG1sIHZlcnNpb249JzEuMCcgZW5jb2Rpbmc9J1VURi04JyBzdGFuZGFsb25lPSdubyc/PlxuXHRcdFx0PHN2ZyB3aWR0aD0nMTdweCcgaGVpZ2h0PScxNnB4JyB2aWV3Qm94PScwIDAgMTcgMTcnIHZlcnNpb249JzEuMScgeG1sbnM9J2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJyB4bWxuczp4bGluaz0naHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluaycgeG1sbnM6c2tldGNoPSdodHRwOi8vd3d3LmJvaGVtaWFuY29kaW5nLmNvbS9za2V0Y2gvbnMnPlxuXHRcdFx0XHQ8IS0tIEdlbmVyYXRvcjogU2tldGNoIDMuNS4yICgyNTIzNSkgLSBodHRwOi8vd3d3LmJvaGVtaWFuY29kaW5nLmNvbS9za2V0Y2ggLS0+XG5cdFx0XHRcdDx0aXRsZT5Hcm91cDwvdGl0bGU+XG5cdFx0XHRcdDxkZXNjPkNyZWF0ZWQgd2l0aCBTa2V0Y2guPC9kZXNjPlxuXHRcdFx0XHQ8ZGVmcz48L2RlZnM+XG5cdFx0XHRcdDxnIGlkPSdQYWdlLTEnIHN0cm9rZT0nbm9uZScgc3Ryb2tlLXdpZHRoPScxJyBmaWxsPSdub25lJyBmaWxsLXJ1bGU9J2V2ZW5vZGQnIHNrZXRjaDp0eXBlPSdNU1BhZ2UnPlxuXHRcdFx0XHRcdDxnIGlkPSdpUGhvbmUtNicgc2tldGNoOnR5cGU9J01TQXJ0Ym9hcmRHcm91cCcgdHJhbnNmb3JtPSd0cmFuc2xhdGUoLTExNy4wMDAwMDAsIC02MzkuMDAwMDAwKScgc3Ryb2tlPScjNEE1MzYxJz5cblx0XHRcdFx0XHRcdDxnIGlkPSdpY19Gb29kJyBza2V0Y2g6dHlwZT0nTVNMYXllckdyb3VwJyB0cmFuc2Zvcm09J3RyYW5zbGF0ZSgxMTguMDAwMDAwLCA2NDAuMDAwMDAwKSc+XG5cdFx0XHRcdFx0XHRcdDxnIGlkPSdHcm91cCcgc2tldGNoOnR5cGU9J01TU2hhcGVHcm91cCc+XG5cdFx0XHRcdFx0XHRcdFx0PHBhdGggZD0nTTUuNjgzNzc1MzcsMS4zODE1NjY0NiBDNi4yMzkyNjA2NiwxLjEzNjI0IDYuODUzNzIwMDUsMSA3LjUsMSBDOC4xNDYyNzk5NSwxIDguNzYwNzM5MzQsMS4xMzYyNCA5LjMxNjIyNDYzLDEuMzgxNTY2NDYgQzkuODA4NzkyNzUsMC41NjIzNTkwMTkgMTAuODI1NTg4OCwwIDEyLDAgQzEzLjY1Njg1NDIsMCAxNSwxLjExOTI4ODEzIDE1LDIuNSBDMTUsMy41NTcxMzk4IDE0LjIxMjYyNDYsNC40NjEwMjg0MyAxMy4wOTk5MjI2LDQuODI2NjI1MTQgQzE0LjI0OTY1MjgsNS42NDE4NTQyMiAxNSw2Ljk4MzMwMDYyIDE1LDguNSBDMTUsMTAuNzE2NzE0NCAxMy4zOTcxODczLDEyLjU1OTA3MTkgMTEuMjg3MjY3MSwxMi45MzEzNjczIEMxMC40ODY3MjQ4LDE0LjE3NTc3MDMgOS4wODk2MTY5NiwxNSA3LjUsMTUgQzUuOTEwMzgzMDQsMTUgNC41MTMyNzUyNCwxNC4xNzU3NzAzIDMuNzEyNzMyOTEsMTIuOTMxMzY3MyBDMS42MDI4MTI2OCwxMi41NTkwNzE5IDAsMTAuNzE2NzE0NCAwLDguNSBDMCw2Ljk4MzMwMDYyIDAuNzUwMzQ3MjQ0LDUuNjQxODU0MjIgMS45MDAwNzc0MSw0LjgyNjYyNTE0IEMwLjc4NzM3NTQ0NSw0LjQ2MTAyODQzIDAsMy41NTcxMzk4IDAsMi41IEMwLDEuMTE5Mjg4MTMgMS4zNDMxNDU3NSwwIDMsMCBDNC4xNzQ0MTEyMiwwIDUuMTkxMjA3MjUsMC41NjIzNTkwMTkgNS42ODM3NzUzNywxLjM4MTU2NjQ2IFonIGlkPSdPdmFsLTgnPjwvcGF0aD5cblx0XHRcdFx0XHRcdFx0XHQ8cGF0aCBkPSdNNS43MzgzNDIyOCwxMiBDNS44NjI5MDk3OSwxMiA2LjE0NjQyMzUzLDEyIDYuMTQ2NDIzNTMsMTIgQzYuMTQ2NDIzNTMsMTIgNi40MzIxNTY5NiwxMi40NDI2MTIzIDYuNTI0NjU4MiwxMi40OTE5NzM5IEM2LjY2NDU1NjAxLDEyLjU2NjYyNzcgNywxMi40OTE5NzM5IDcsMTIuNDkxOTczOSBMNywxMiBMOCwxMiBMOCwxMi40OTE5NzM5IEw4LjQ5Nzk5MjI4LDEyLjQ5MTk3MzkgTDguODQzMDE3NjksMTIgTDkuMzkxODQ1NywxMiBDOS4zOTE4NDU3LDEyIDguOTk1OTg0NTcsMTIuOTgzOTQ3OCA4LjQ5Nzk5MjI4LDEyLjk4Mzk0NzggTDYuNjA3MDI0MDcsMTIuOTgzOTQ3OCBDNi4yMTQwNDgxMywxMi45ODM5NDc4IDUuNDU5OTYwOTQsMTIgNS43MzgzNDIyOCwxMiBaJyBpZD0nUmVjdGFuZ2xlLTQ0LUNvcHktMic+PC9wYXRoPlxuXHRcdFx0XHRcdFx0XHRcdDxjaXJjbGUgaWQ9J092YWwtMTQnIGN4PScxMC41JyBjeT0nNy41JyByPScwLjUnPjwvY2lyY2xlPlxuXHRcdFx0XHRcdFx0XHRcdDxjaXJjbGUgaWQ9J092YWwtMTQtQ29weScgY3g9JzQuNScgY3k9JzcuNScgcj0nMC41Jz48L2NpcmNsZT5cblx0XHRcdFx0XHRcdFx0XHQ8cGF0aCBkPSdNMTIuNjk5OTk2OSw1IEMxMi42OTk5OTY5LDMuMDY3MDAzMzggMTEuMTMyOTkzNiwxLjUgOS4xOTk5OTY5NSwxLjUnIGlkPSdPdmFsLTE2Jz48L3BhdGg+XG5cdFx0XHRcdFx0XHRcdFx0PHBhdGggZD0nTTUuNSw1IEM1LjUsMy4wNjcwMDMzOCAzLjkzMjk5NjYyLDEuNSAyLDEuNScgaWQ9J092YWwtMTYtQ29weScgdHJhbnNmb3JtPSd0cmFuc2xhdGUoMy43NTAwMDAsIDMuMjUwMDAwKSBzY2FsZSgtMSwgMSkgdHJhbnNsYXRlKC0zLjc1MDAwMCwgLTMuMjUwMDAwKSAnPjwvcGF0aD5cblx0XHRcdFx0XHRcdFx0XHQ8cmVjdCBpZD0nUmVjdGFuZ2xlLTQ0LUNvcHknIHg9JzcnIHk9JzExJyB3aWR0aD0nMScgaGVpZ2h0PScxJz48L3JlY3Q+XG5cdFx0XHRcdFx0XHRcdFx0PHBhdGggZD0nTTYsMTAgTDYuNSwxMCBMNi40OTk5OTk5OSw5LjUgTDguNTAwMDAwMDUsOS41IEw4LjUwMDAwMDA1LDEwIEw5LDEwIEw5LDEwLjUgTDguNSwxMC41IEw4LjUsMTEgTDYuNSwxMSBMNi41LDEwLjUgTDYsMTAuNSBMNiwxMCBaJyBpZD0nUGF0aCc+PC9wYXRoPlxuXHRcdFx0XHRcdFx0XHQ8L2c+XG5cdFx0XHRcdFx0XHQ8L2c+XG5cdFx0XHRcdFx0PC9nPlxuXHRcdFx0XHQ8L2c+XG5cdFx0XHQ8L3N2Zz5cIlxuXHRjaGV2cm9uIDogXCI8P3htbCB2ZXJzaW9uPScxLjAnIGVuY29kaW5nPSdVVEYtOCcgc3RhbmRhbG9uZT0nbm8nPz5cblx0XHQ8c3ZnIHdpZHRoPScxM3B4JyBoZWlnaHQ9JzIycHgnIHZpZXdCb3g9JzAgMCAxMyAyMicgdmVyc2lvbj0nMS4xJyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIHhtbG5zOnhsaW5rPSdodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rJz5cblx0XHQgICAgPCEtLSBHZW5lcmF0b3I6IFNrZXRjaCAzLjYuMSAoMjYzMTMpIC0gaHR0cDovL3d3dy5ib2hlbWlhbmNvZGluZy5jb20vc2tldGNoIC0tPlxuXHRcdCAgICA8dGl0bGU+QmFjayBDaGV2cm9uPC90aXRsZT5cblx0XHQgICAgPGRlc2M+Q3JlYXRlZCB3aXRoIFNrZXRjaC48L2Rlc2M+XG5cdFx0ICAgIDxkZWZzPjwvZGVmcz5cblx0XHQgICAgPGcgaWQ9J1BhZ2UtMScgc3Ryb2tlPSdub25lJyBzdHJva2Utd2lkdGg9JzEnIGZpbGw9J25vbmUnIGZpbGwtcnVsZT0nZXZlbm9kZCc+XG5cdFx0ICAgICAgICA8ZyBpZD0nTmF2aWdhdGlvbi1CYXIvQmFjaycgdHJhbnNmb3JtPSd0cmFuc2xhdGUoLTguMDAwMDAwLCAtMzEuMDAwMDAwKScgZmlsbD0nIzAwNzZGRic+XG5cdFx0ICAgICAgICAgICAgPHBhdGggZD0nTTguNSw0MiBMMTksMzEuNSBMMjEsMzMuNSBMMTIuNSw0MiBMMjEsNTAuNSBMMTksNTIuNSBMOC41LDQyIFonIGlkPSdCYWNrLUNoZXZyb24nPjwvcGF0aD5cblx0XHQgICAgICAgIDwvZz5cblx0XHQgICAgPC9nPlxuXHRcdDwvc3ZnPlwiXG5cdGVtb2ppIDogXCI8P3htbCB2ZXJzaW9uPScxLjAnIGVuY29kaW5nPSdVVEYtOCcgc3RhbmRhbG9uZT0nbm8nPz5cblx0XHQ8c3ZnIHdpZHRoPScyMHB4JyBoZWlnaHQ9JzIwcHgnIHZpZXdCb3g9JzAgMCAyMCAyMCcgdmVyc2lvbj0nMS4xJyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIHhtbG5zOnhsaW5rPSdodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rJyB4bWxuczpza2V0Y2g9J2h0dHA6Ly93d3cuYm9oZW1pYW5jb2RpbmcuY29tL3NrZXRjaC9ucyc+XG5cdFx0XHQ8IS0tIEdlbmVyYXRvcjogU2tldGNoIDMuNS4yICgyNTIzNSkgLSBodHRwOi8vd3d3LmJvaGVtaWFuY29kaW5nLmNvbS9za2V0Y2ggLS0+XG5cdFx0XHQ8dGl0bGU+RW1vamk8L3RpdGxlPlxuXHRcdFx0PGRlc2M+Q3JlYXRlZCB3aXRoIFNrZXRjaC48L2Rlc2M+XG5cdFx0XHQ8ZGVmcz48L2RlZnM+XG5cdFx0XHQ8ZyBpZD0nUGFnZS0xJyBzdHJva2U9J25vbmUnIHN0cm9rZS13aWR0aD0nMScgZmlsbD0nbm9uZScgZmlsbC1ydWxlPSdldmVub2RkJyBza2V0Y2g6dHlwZT0nTVNQYWdlJz5cblx0XHRcdFx0PGcgaWQ9J0tleWJvYXJkL0xpZ2h0L0xvd2VyJyBza2V0Y2g6dHlwZT0nTVNMYXllckdyb3VwJyB0cmFuc2Zvcm09J3RyYW5zbGF0ZSgtNjAuMDAwMDAwLCAtMTgxLjAwMDAwMCknIGZpbGw9JyMwMzAzMDMnPlxuXHRcdFx0XHRcdDxnIGlkPSdCb3R0b20tUm93JyB0cmFuc2Zvcm09J3RyYW5zbGF0ZSgzLjAwMDAwMCwgMTcwLjAwMDAwMCknIHNrZXRjaDp0eXBlPSdNU1NoYXBlR3JvdXAnPlxuXHRcdFx0XHRcdFx0PHBhdGggZD0nTTY2Ljc1LDMwLjUgQzcyLjEzNDc3NjMsMzAuNSA3Ni41LDI2LjEzNDc3NjMgNzYuNSwyMC43NSBDNzYuNSwxNS4zNjUyMjM3IDcyLjEzNDc3NjMsMTEgNjYuNzUsMTEgQzYxLjM2NTIyMzcsMTEgNTcsMTUuMzY1MjIzNyA1NywyMC43NSBDNTcsMjYuMTM0Nzc2MyA2MS4zNjUyMjM3LDMwLjUgNjYuNzUsMzAuNSBaIE02Ni43NSwyOS41IEM3MS41ODI0OTE2LDI5LjUgNzUuNSwyNS41ODI0OTE2IDc1LjUsMjAuNzUgQzc1LjUsMTUuOTE3NTA4NCA3MS41ODI0OTE2LDEyIDY2Ljc1LDEyIEM2MS45MTc1MDg0LDEyIDU4LDE1LjkxNzUwODQgNTgsMjAuNzUgQzU4LDI1LjU4MjQ5MTYgNjEuOTE3NTA4NCwyOS41IDY2Ljc1LDI5LjUgWiBNNjMuNzUsMTkgQzY0LjQ0MDM1NTksMTkgNjUsMTguNDQwMzU1OSA2NSwxNy43NSBDNjUsMTcuMDU5NjQ0MSA2NC40NDAzNTU5LDE2LjUgNjMuNzUsMTYuNSBDNjMuMDU5NjQ0MSwxNi41IDYyLjUsMTcuMDU5NjQ0MSA2Mi41LDE3Ljc1IEM2Mi41LDE4LjQ0MDM1NTkgNjMuMDU5NjQ0MSwxOSA2My43NSwxOSBaIE02OS43NSwxOSBDNzAuNDQwMzU1OSwxOSA3MSwxOC40NDAzNTU5IDcxLDE3Ljc1IEM3MSwxNy4wNTk2NDQxIDcwLjQ0MDM1NTksMTYuNSA2OS43NSwxNi41IEM2OS4wNTk2NDQxLDE2LjUgNjguNSwxNy4wNTk2NDQxIDY4LjUsMTcuNzUgQzY4LjUsMTguNDQwMzU1OSA2OS4wNTk2NDQxLDE5IDY5Ljc1LDE5IFogTTU5Ljg4NzYzMzQsMjIuMTY0MTQ0NCBDNTkuNjM5MDMxNiwyMS4zODMxMzQgNjAuMDY1OTE4LDIwLjk3ODUxNTYgNjAuODUzMDk1MSwyMS4yMzI5MzA0IEM2MC44NTMwOTUxLDIxLjIzMjkzMDQgNjMuMDkzNzUwMywyMi4yMTI1IDY2Ljc1MDAwMDEsMjIuMjEyNSBDNzAuNDA2MjQ5OSwyMi4yMTI1IDcyLjY0NjkwNDcsMjEuMjMyOTMwNCA3Mi42NDY5MDQ3LDIxLjIzMjkzMDQgQzczLjQyODcxNjIsMjAuOTY2MjE1MyA3My44ODEyNDYzLDIxLjQwNDQwOTcgNzMuNjA1ODQ3NywyMi4xODA3NDM3IEM3My42MDU4NDc3LDIyLjE4MDc0MzcgNzIuNiwyNy41NzUgNjYuNzUsMjcuNTc1IEM2MC45LDI3LjU3NSA1OS44ODc2MzM0LDIyLjE2NDE0NDQgNTkuODg3NjMzNCwyMi4xNjQxNDQ0IFogTTY2Ljc1LDIzLjE4NzUgQzY0LjA2ODc1LDIzLjE4NzUgNjEuODU0NDA1NSwyMi40NzM3ODIxIDYxLjg1NDQwNTUsMjIuNDczNzgyMSBDNjEuMzI3MzAxOSwyMi4zMjk0OCA2MS4xNzgxMjMzLDIyLjU3MjE2MTUgNjEuNTYzOTU1NSwyMi45NTcwNzUgQzYxLjU2Mzk1NTUsMjIuOTU3MDc1IDYyLjM2MjUsMjQuNjUgNjYuNzUsMjQuNjUgQzcxLjEzNzUsMjQuNjUgNzEuOTUwODUwMywyMi45NDM4MzA0IDcxLjk1MDg1MDMsMjIuOTQzODMwNCBDNzIuMzA5MzY1OSwyMi41Mzk5Mjc4IDcyLjE2OTA3OTMsMjIuMzM1OTg0NCA3MS42MzU0MjczLDIyLjQ3NjM0OSBDNzEuNjM1NDI3MywyMi40NzYzNDkgNjkuNDMxMjUsMjMuMTg3NSA2Ni43NSwyMy4xODc1IFonIGlkPSdFbW9qaSc+PC9wYXRoPlxuXHRcdFx0XHRcdDwvZz5cblx0XHRcdFx0PC9nPlxuXHRcdFx0PC9nPlxuXHRcdDwvc3ZnPlwiXG5cdGRlbGV0ZToge1xuXHRcdG9uIDogXCI8P3htbCB2ZXJzaW9uPScxLjAnIGVuY29kaW5nPSdVVEYtOCcgc3RhbmRhbG9uZT0nbm8nPz5cblx0XHRcdFx0PHN2ZyB3aWR0aD0nMjRweCcgaGVpZ2h0PScxOHB4JyB2aWV3Qm94PScwIDAgMjQgMTgnIHZlcnNpb249JzEuMScgeG1sbnM9J2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJyB4bWxuczp4bGluaz0naHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluaycgeG1sbnM6c2tldGNoPSdodHRwOi8vd3d3LmJvaGVtaWFuY29kaW5nLmNvbS9za2V0Y2gvbnMnPlxuXHRcdFx0XHRcdDwhLS0gR2VuZXJhdG9yOiBTa2V0Y2ggMy41LjIgKDI1MjM1KSAtIGh0dHA6Ly93d3cuYm9oZW1pYW5jb2RpbmcuY29tL3NrZXRjaCAtLT5cblx0XHRcdFx0XHQ8dGl0bGU+QmFjazwvdGl0bGU+XG5cdFx0XHRcdFx0PGRlc2M+Q3JlYXRlZCB3aXRoIFNrZXRjaC48L2Rlc2M+XG5cdFx0XHRcdFx0PGRlZnM+PC9kZWZzPlxuXHRcdFx0XHRcdDxnIGlkPSdQYWdlLTEnIHN0cm9rZT0nbm9uZScgc3Ryb2tlLXdpZHRoPScxJyBmaWxsPSdub25lJyBmaWxsLXJ1bGU9J2V2ZW5vZGQnIHNrZXRjaDp0eXBlPSdNU1BhZ2UnPlxuXHRcdFx0XHRcdFx0PGcgaWQ9J0tleWJvYXJkL0xpZ2h0L1VwcGVyJyBza2V0Y2g6dHlwZT0nTVNMYXllckdyb3VwJyB0cmFuc2Zvcm09J3RyYW5zbGF0ZSgtMzM5LjAwMDAwMCwgLTEzMC4wMDAwMDApJyBmaWxsPScjMDMwMzAzJz5cblx0XHRcdFx0XHRcdFx0PGcgaWQ9J1RoaXJkLVJvdycgdHJhbnNmb3JtPSd0cmFuc2xhdGUoMy4wMDAwMDAsIDExOC4wMDAwMDApJyBza2V0Y2g6dHlwZT0nTVNTaGFwZUdyb3VwJz5cblx0XHRcdFx0XHRcdFx0XHQ8cGF0aCBkPSdNMzUxLjY0MjY2MywyMC45Nzc2OTAzIEwzNTQuNDY2Nzk1LDE4LjE1MzU1ODUgQzM1NC43NjAxMDYsMTcuODYwMjQ3NiAzNTQuNzYzOTgzLDE3LjM4MTQ5NjIgMzU0LjQ3MTA5LDE3LjA4ODYwMyBDMzU0LjE3NjE1NSwxNi43OTM2Njc3IDM1My43MDE0LDE2Ljc5NzYzMjggMzUzLjQwNjEzNSwxNy4wOTI4OTgzIEwzNTAuNTgyMDAzLDE5LjkxNzAzMDEgTDM0Ny43NTc4NzEsMTcuMDkyODk4MyBDMzQ3LjQ2NDU2LDE2Ljc5OTU4NzQgMzQ2Ljk4NTgwOSwxNi43OTU3MDk3IDM0Ni42OTI5MTYsMTcuMDg4NjAzIEMzNDYuMzk3OTgsMTcuMzgzNTM4MiAzNDYuNDAxOTQ1LDE3Ljg1ODI5MyAzNDYuNjk3MjExLDE4LjE1MzU1ODUgTDM0OS41MjEzNDMsMjAuOTc3NjkwMyBMMzQ2LjY5NzIxMSwyMy44MDE4MjIgQzM0Ni40MDM5LDI0LjA5NTEzMjkgMzQ2LjQwMDAyMiwyNC41NzM4ODQzIDM0Ni42OTI5MTYsMjQuODY2Nzc3NiBDMzQ2Ljk4Nzg1MSwyNS4xNjE3MTI4IDM0Ny40NjI2MDYsMjUuMTU3NzQ3NyAzNDcuNzU3ODcxLDI0Ljg2MjQ4MjIgTDM1MC41ODIwMDMsMjIuMDM4MzUwNCBMMzUzLjQwNjEzNSwyNC44NjI0ODIyIEMzNTMuNjk5NDQ1LDI1LjE1NTc5MzEgMzU0LjE3ODE5NywyNS4xNTk2NzA4IDM1NC40NzEwOSwyNC44NjY3Nzc2IEMzNTQuNzY2MDI1LDI0LjU3MTg0MjMgMzU0Ljc2MjA2LDI0LjA5NzA4NzUgMzU0LjQ2Njc5NSwyMy44MDE4MjIgTDM1MS42NDI2NjMsMjAuOTc3NjkwMyBaIE0zMzcuMDU5MzQ1LDIyLjA1OTM0NDUgQzMzNi40NzQyODUsMjEuNDc0Mjg0NyAzMzYuNDgxMzUxLDIwLjUxODY0ODkgMzM3LjA1OTM0NSwxOS45NDA2NTU1IEwzNDMuNzg5OTE1LDEzLjIxMDA4NTMgQzM0NC4xODIwODQsMTIuODE3OTE2IDM0NC45NDg5MiwxMi41IDM0NS41MDc0ODQsMTIuNSBMMzU2LjAwMjA5OCwxMi41IEMzNTcuOTMzOTM2LDEyLjUgMzU5LjUsMTQuMDY4ODQ3NyAzNTkuNSwxNi4wMDE3OTgzIEwzNTkuNSwyNS45OTgyMDE3IEMzNTkuNSwyNy45MzIxOTE1IDM1Ny45MjMwODgsMjkuNSAzNTYuMDAyMDk4LDI5LjUgTDM0NS41MDc0ODQsMjkuNSBDMzQ0Ljk1MTA2NiwyOS41IDM0NC4xNzcxNjksMjkuMTc3MTY5MyAzNDMuNzg5OTE1LDI4Ljc4OTkxNDggTDMzNy4wNTkzNDUsMjIuMDU5MzQ0NSBaJyBpZD0nQmFjayc+PC9wYXRoPlxuXHRcdFx0XHRcdFx0XHQ8L2c+XG5cdFx0XHRcdFx0XHQ8L2c+XG5cdFx0XHRcdFx0PC9nPlxuXHRcdFx0XHQ8L3N2Zz5cIlxuXHRcdG9mZiA6IFwiPD94bWwgdmVyc2lvbj0nMS4wJyBlbmNvZGluZz0nVVRGLTgnIHN0YW5kYWxvbmU9J25vJz8+XG5cdFx0PHN2ZyB3aWR0aD0nMjRweCcgaGVpZ2h0PScxOHB4JyB2aWV3Qm94PScwIDAgMjQgMTgnIHZlcnNpb249JzEuMScgeG1sbnM9J2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJyB4bWxuczp4bGluaz0naHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluaycgeG1sbnM6c2tldGNoPSdodHRwOi8vd3d3LmJvaGVtaWFuY29kaW5nLmNvbS9za2V0Y2gvbnMnPlxuXHRcdFx0PCEtLSBHZW5lcmF0b3I6IFNrZXRjaCAzLjUuMiAoMjUyMzUpIC0gaHR0cDovL3d3dy5ib2hlbWlhbmNvZGluZy5jb20vc2tldGNoIC0tPlxuXHRcdFx0PHRpdGxlPkJhY2s8L3RpdGxlPlxuXHRcdFx0PGRlc2M+Q3JlYXRlZCB3aXRoIFNrZXRjaC48L2Rlc2M+XG5cdFx0XHQ8ZGVmcz48L2RlZnM+XG5cdFx0XHQ8ZyBpZD0nUGFnZS0xJyBzdHJva2U9J25vbmUnIHN0cm9rZS13aWR0aD0nMScgZmlsbD0nbm9uZScgZmlsbC1ydWxlPSdldmVub2RkJyBza2V0Y2g6dHlwZT0nTVNQYWdlJz5cblx0XHRcdFx0PGcgaWQ9J0tleWJvYXJkL0xpZ2h0L1VwcGVyJyBza2V0Y2g6dHlwZT0nTVNMYXllckdyb3VwJyB0cmFuc2Zvcm09J3RyYW5zbGF0ZSgtMzM5LjAwMDAwMCwgLTEzMC4wMDAwMDApJyBmaWxsPScjMDMwMzAzJz5cblx0XHRcdFx0XHQ8ZyBpZD0nVGhpcmQtUm93JyB0cmFuc2Zvcm09J3RyYW5zbGF0ZSgzLjAwMDAwMCwgMTE4LjAwMDAwMCknIHNrZXRjaDp0eXBlPSdNU1NoYXBlR3JvdXAnPlxuXHRcdFx0XHRcdFx0PHBhdGggZD0nTTMzNy4wNTkzNDUsMjIuMDU5MzQ0NSBDMzM2LjQ3NDI4NSwyMS40NzQyODQ3IDMzNi40ODEzNTEsMjAuNTE4NjQ4OSAzMzcuMDU5MzQ1LDE5Ljk0MDY1NTUgTDM0My43ODk5MTUsMTMuMjEwMDg1MyBDMzQ0LjE4MjA4NCwxMi44MTc5MTYgMzQ0Ljk0ODkyLDEyLjUgMzQ1LjUwNzQ4NCwxMi41IEwzNTYuMDAyMDk4LDEyLjUgQzM1Ny45MzM5MzYsMTIuNSAzNTkuNSwxNC4wNjg4NDc3IDM1OS41LDE2LjAwMTc5ODMgTDM1OS41LDI1Ljk5ODIwMTcgQzM1OS41LDI3LjkzMjE5MTUgMzU3LjkyMzA4OCwyOS41IDM1Ni4wMDIwOTgsMjkuNSBMMzQ1LjUwNzQ4NCwyOS41IEMzNDQuOTUxMDY2LDI5LjUgMzQ0LjE3NzE2OSwyOS4xNzcxNjkzIDM0My43ODk5MTUsMjguNzg5OTE0OCBMMzM3LjA1OTM0NSwyMi4wNTkzNDQ1IFogTTM1MS42NDI2NjMsMjAuOTc3NjkwMyBMMzU0LjQ2Njc5NSwxOC4xNTM1NTg1IEMzNTQuNzYwMTA2LDE3Ljg2MDI0NzYgMzU0Ljc2Mzk4MywxNy4zODE0OTYyIDM1NC40NzEwOSwxNy4wODg2MDMgQzM1NC4xNzYxNTUsMTYuNzkzNjY3NyAzNTMuNzAxNCwxNi43OTc2MzI4IDM1My40MDYxMzUsMTcuMDkyODk4MyBMMzUwLjU4MjAwMywxOS45MTcwMzAxIEwzNDcuNzU3ODcxLDE3LjA5Mjg5ODMgQzM0Ny40NjQ1NiwxNi43OTk1ODc0IDM0Ni45ODU4MDksMTYuNzk1NzA5NyAzNDYuNjkyOTE2LDE3LjA4ODYwMyBDMzQ2LjM5Nzk4LDE3LjM4MzUzODIgMzQ2LjQwMTk0NSwxNy44NTgyOTMgMzQ2LjY5NzIxMSwxOC4xNTM1NTg1IEwzNDkuNTIxMzQzLDIwLjk3NzY5MDMgTDM0Ni42OTcyMTEsMjMuODAxODIyIEMzNDYuNDAzOSwyNC4wOTUxMzI5IDM0Ni40MDAwMjIsMjQuNTczODg0MyAzNDYuNjkyOTE2LDI0Ljg2Njc3NzYgQzM0Ni45ODc4NTEsMjUuMTYxNzEyOCAzNDcuNDYyNjA2LDI1LjE1Nzc0NzcgMzQ3Ljc1Nzg3MSwyNC44NjI0ODIyIEwzNTAuNTgyMDAzLDIyLjAzODM1MDQgTDM1My40MDYxMzUsMjQuODYyNDgyMiBDMzUzLjY5OTQ0NSwyNS4xNTU3OTMxIDM1NC4xNzgxOTcsMjUuMTU5NjcwOCAzNTQuNDcxMDksMjQuODY2Nzc3NiBDMzU0Ljc2NjAyNSwyNC41NzE4NDIzIDM1NC43NjIwNiwyNC4wOTcwODc1IDM1NC40NjY3OTUsMjMuODAxODIyIEwzNTEuNjQyNjYzLDIwLjk3NzY5MDMgWiBNMzM4LjcwOTcyLDIxLjcwOTcxOTUgQzMzOC4zMTc3NTIsMjEuMzE3NzUyMiAzMzguMzE4OTY1LDIwLjY4MTAzNDkgMzM4LjcwOTcyLDIwLjI5MDI4MDUgTDM0NC42NDMyNDUsMTQuMzU2NzU0NyBDMzQ0Ljg0MDI3NiwxNC4xNTk3MjQ1IDM0NS4yMjU2MzksMTQgMzQ1LjQ5Mzc0MSwxNCBMMzU1Ljk5NzIzOSwxNCBDMzU3LjEwMzMzMywxNCAzNTcuOTk5OTk5LDE0Ljg5NzA2MDEgMzU3Ljk5OTk5OSwxNi4wMDU4NTg2IEwzNTcuOTk5OTk5LDI1Ljk5NDE0MTIgQzM1Ny45OTk5OTksMjcuMTAxOTQ2NCAzNTcuMTA2NDU3LDI3Ljk5OTk5OTkgMzU1Ljk5NzIzOSwyNy45OTk5OTk5IEwzNDUuNDkzNzQxLDI4IEMzNDUuMjIxMDU2LDI4IDM0NC44NDA2NDMsMjcuODQwNjQzMSAzNDQuNjQzMjQ2LDI3LjY0MzI0NTMgTDMzOC43MDk3MiwyMS43MDk3MTk1IFonIGlkPSdCYWNrJz48L3BhdGg+XG5cdFx0XHRcdFx0PC9nPlxuXHRcdFx0XHQ8L2c+XG5cdFx0XHQ8L2c+XG5cdFx0PC9zdmc+XCJcblx0fVxuXHRmb29kIDogIFwiPD94bWwgdmVyc2lvbj0nMS4wJyBlbmNvZGluZz0nVVRGLTgnIHN0YW5kYWxvbmU9J25vJz8+XG5cdFx0XHQ8c3ZnIHdpZHRoPScxN3B4JyBoZWlnaHQ9JzE2cHgnIHZpZXdCb3g9JzAgMCAxNyAxNycgdmVyc2lvbj0nMS4xJyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIHhtbG5zOnhsaW5rPSdodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rJyB4bWxuczpza2V0Y2g9J2h0dHA6Ly93d3cuYm9oZW1pYW5jb2RpbmcuY29tL3NrZXRjaC9ucyc+XG5cdFx0XHRcdDwhLS0gR2VuZXJhdG9yOiBTa2V0Y2ggMy41LjIgKDI1MjM1KSAtIGh0dHA6Ly93d3cuYm9oZW1pYW5jb2RpbmcuY29tL3NrZXRjaCAtLT5cblx0XHRcdFx0PHRpdGxlPkZvb2Q8L3RpdGxlPlxuXHRcdFx0XHQ8ZGVzYz5DcmVhdGVkIHdpdGggU2tldGNoLjwvZGVzYz5cblx0XHRcdFx0PGRlZnM+PC9kZWZzPlxuXHRcdFx0XHQ8ZyBpZD0naU9TLTktS2V5Ym9hcmRzJyBzdHJva2U9J25vbmUnIHN0cm9rZS13aWR0aD0nMScgZmlsbD0nbm9uZScgZmlsbC1ydWxlPSdldmVub2RkJyBza2V0Y2g6dHlwZT0nTVNQYWdlJz5cblx0XHRcdFx0XHQ8ZyBpZD0naVBob25lLTYtUG9ydHJhaXQtTGlnaHQtQ29weScgc2tldGNoOnR5cGU9J01TQXJ0Ym9hcmRHcm91cCcgdHJhbnNmb3JtPSd0cmFuc2xhdGUoLTE0OC4wMDAwMDAsIC02MzcuMDAwMDAwKSc+XG5cdFx0XHRcdFx0XHQ8ZyBpZD0nS2V5Ym9hcmRzJyBza2V0Y2g6dHlwZT0nTVNMYXllckdyb3VwJyB0cmFuc2Zvcm09J3RyYW5zbGF0ZSgwLjAwMDAwMCwgNDA4LjAwMDAwMCknPlxuXHRcdFx0XHRcdFx0XHQ8ZyBpZD0nRm9vZCcgdHJhbnNmb3JtPSd0cmFuc2xhdGUoMTQ5LjUwMDAwMCwgMjI5LjUwMDAwMCknIHNrZXRjaDp0eXBlPSdNU1NoYXBlR3JvdXAnPlxuXHRcdFx0XHRcdFx0XHRcdDxwYXRoIGQ9J001LjUsMTUuNSBMMSwxNS41IEwwLDUgTDYuNSw1IEw2LjI2MzYwOTMzLDcuNDgyMTAyMDInIGlkPSdEcmluaycgc3Ryb2tlPScjNEE1NDYxJz48L3BhdGg+XG5cdFx0XHRcdFx0XHRcdFx0PHBhdGggZD0nTTYuMDEwNzc1NDUsMS45NjkzMDA5OCBMNi41MTU3MTM1Miw1LjIyMjcwNTM5IEw1LjcxOTA4MTg0LDUuNjc5NDc4MTIgTDUuMDM4OTAwOSwxLjk2OTMwMDk4IEw0Ljg1NTU3MjQ3LDEuOTY5MzAwOTggTDQuODU1NTcyNDcsMC45NjkzMDA5OCBMOC44NTU1NzI0NywwLjk2OTMwMDk4IEw4Ljg1NTU3MjQ3LDEuOTY5MzAwOTggTDYuMDEwNzc1NDUsMS45NjkzMDA5OCBaJyBpZD0nU3RyYXcnIGZpbGw9JyM0QTU0NjEnIHRyYW5zZm9ybT0ndHJhbnNsYXRlKDYuODU1NTcyLCAzLjMyNDM5MCkgcm90YXRlKDI0LjAwMDAwMCkgdHJhbnNsYXRlKC02Ljg1NTU3MiwgLTMuMzI0MzkwKSAnPjwvcGF0aD5cblx0XHRcdFx0XHRcdFx0XHQ8cmVjdCBpZD0nQm90dG9tLUJ1bicgc3Ryb2tlPScjNEE1NDYxJyB4PSczJyB5PScxNCcgd2lkdGg9JzEwLjUnIGhlaWdodD0nMS41JyByeD0nMSc+PC9yZWN0PlxuXHRcdFx0XHRcdFx0XHRcdDxwYXRoIGQ9J00xLjUsMTIuNTAyNDQwOCBDMS41LDExLjk0ODgwOCAxLjk0OTE2OTE2LDExLjUgMi40OTI2ODcyMywxMS41IEwxNC4wMDczMTI4LDExLjUgQzE0LjU1NTU1ODgsMTEuNSAxNSwxMS45NDY5NDk5IDE1LDEyLjUwMjQ0MDggTDE1LDEyLjk5NzU1OTIgQzE1LDEzLjU1MTE5MiAxNC41NTA4MzA4LDE0IDE0LjAwNzMxMjgsMTQgTDIuNDkyNjg3MjMsMTQgQzEuOTQ0NDQxMjEsMTQgMS41LDEzLjU1MzA1MDEgMS41LDEyLjk5NzU1OTIgTDEuNSwxMi41MDI0NDA4IFogTTMuOTMzMDAwMDMsMTEuODM5MjcyNyBDMy40MTc3MTgzNCwxMS42NTE4OTc2IDMuNDQ0ODM2OTcsMTEuNSAzLjk5NTU3NzUsMTEuNSBMMTMuMDA0NDIyNSwxMS41IEMxMy41NTQyNjQ4LDExLjUgMTMuNTg2NjA2MSwxMS42NTAzMjUxIDEzLjA2NywxMS44MzkyNzI3IEw4LjUsMTMuNSBMMy45MzMwMDAwMywxMS44MzkyNzI3IFonIGlkPScmcXVvdDtQYXR0eSZxdW90OycgZmlsbD0nIzRBNTQ2MSc+PC9wYXRoPlxuXHRcdFx0XHRcdFx0XHRcdDxwYXRoIGQ9J00yLjUsMTAuNSBMMTMuNSwxMC41IEwxNSwxMS41IEwxLDExLjUgTDIuNSwxMC41IFonIGlkPSdDaGVlc2UnIGZpbGw9JyM0QTU0NjEnPjwvcGF0aD5cblx0XHRcdFx0XHRcdFx0XHQ8cGF0aCBkPSdNOC4yNSwxMC41IEMxMS40MjU2MzczLDEwLjUgMTQsMTAuMzI4NDI3MSAxNCw5LjUgQzE0LDguNjcxNTcyODggMTEuNDI1NjM3Myw4IDguMjUsOCBDNS4wNzQzNjI2OSw4IDIuNSw4LjY3MTU3Mjg4IDIuNSw5LjUgQzIuNSwxMC4zMjg0MjcxIDUuMDc0MzYyNjksMTAuNSA4LjI1LDEwLjUgWicgaWQ9J1RvcC1CdW4nIHN0cm9rZT0nIzRBNTQ2MScgc3Ryb2tlLXdpZHRoPScwLjc1Jz48L3BhdGg+XG5cdFx0XHRcdFx0XHRcdDwvZz5cblx0XHRcdFx0XHRcdDwvZz5cblx0XHRcdFx0XHQ8L2c+XG5cdFx0XHRcdDwvZz5cblx0XHRcdDwvc3ZnPlwiXG5cdGZsYWdzOiBcIjw/eG1sIHZlcnNpb249JzEuMCcgZW5jb2Rpbmc9J1VURi04JyBzdGFuZGFsb25lPSdubyc/PlxuXHRcdFx0PHN2ZyB3aWR0aD0nMTFweCcgaGVpZ2h0PScxNXB4JyB2aWV3Qm94PScwIDAgMTEgMTUnIHZlcnNpb249JzEuMScgeG1sbnM9J2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJyB4bWxuczp4bGluaz0naHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluaycgeG1sbnM6c2tldGNoPSdodHRwOi8vd3d3LmJvaGVtaWFuY29kaW5nLmNvbS9za2V0Y2gvbnMnPlxuXHRcdFx0XHQ8IS0tIEdlbmVyYXRvcjogU2tldGNoIDMuNS4yICgyNTIzNSkgLSBodHRwOi8vd3d3LmJvaGVtaWFuY29kaW5nLmNvbS9za2V0Y2ggLS0+XG5cdFx0XHRcdDx0aXRsZT5GbGFnPC90aXRsZT5cblx0XHRcdFx0PGRlc2M+Q3JlYXRlZCB3aXRoIFNrZXRjaC48L2Rlc2M+XG5cdFx0XHRcdDxkZWZzPjwvZGVmcz5cblx0XHRcdFx0PGcgaWQ9J2lPUy05LUtleWJvYXJkcycgc3Ryb2tlPSdub25lJyBzdHJva2Utd2lkdGg9JzEnIGZpbGw9J25vbmUnIGZpbGwtcnVsZT0nZXZlbm9kZCcgc2tldGNoOnR5cGU9J01TUGFnZSc+XG5cdFx0XHRcdFx0PGcgaWQ9J2lQaG9uZS02LVBvcnRyYWl0LUxpZ2h0LUNvcHknIHNrZXRjaDp0eXBlPSdNU0FydGJvYXJkR3JvdXAnIHRyYW5zZm9ybT0ndHJhbnNsYXRlKC0yNzUuMDAwMDAwLCAtNjM5LjAwMDAwMCknPlxuXHRcdFx0XHRcdFx0PGcgaWQ9J0tleWJvYXJkcycgc2tldGNoOnR5cGU9J01TTGF5ZXJHcm91cCcgdHJhbnNmb3JtPSd0cmFuc2xhdGUoMC4wMDAwMDAsIDQwOC4wMDAwMDApJz5cblx0XHRcdFx0XHRcdFx0PGcgaWQ9J0ZsYWcnIHRyYW5zZm9ybT0ndHJhbnNsYXRlKDI3NS4wMDAwMDAsIDIzMS41MDAwMDApJyBza2V0Y2g6dHlwZT0nTVNTaGFwZUdyb3VwJz5cblx0XHRcdFx0XHRcdFx0XHQ8cmVjdCBpZD0nUG9sZScgZmlsbD0nIzRBNTQ2MScgeD0nMCcgeT0nMCcgd2lkdGg9JzEnIGhlaWdodD0nMTQnPjwvcmVjdD5cblx0XHRcdFx0XHRcdFx0XHQ8cGF0aCBkPSdNMSwxIEMxLDEgMS4yNSwyIDMuNSwyIEM1Ljc1LDIgNiwwLjc0OTk5OTk5OCA4LDAuNzUgQzEwLDAuNzQ5OTk5OTk4IDEwLDEuNSAxMCwxLjUgTDEwLDcuNSBDMTAsNy41IDEwLDYuNSA4LDYuNSBDNiw2LjUgNC44MDYyMzkxMSw4IDMuNSw4IEMyLjE5Mzc2MDg5LDggMSw3IDEsNyBMMSwxIFonIHN0cm9rZT0nIzRBNTQ2MScgc3Ryb2tlLWxpbmVqb2luPSdyb3VuZCc+PC9wYXRoPlxuXHRcdFx0XHRcdFx0XHQ8L2c+XG5cdFx0XHRcdFx0XHQ8L2c+XG5cdFx0XHRcdFx0PC9nPlxuXHRcdFx0XHQ8L2c+XG5cdFx0XHQ8L3N2Zz5cIlxuXHRmcmVxdWVudDogXCI8P3htbCB2ZXJzaW9uPScxLjAnIGVuY29kaW5nPSdVVEYtOCcgc3RhbmRhbG9uZT0nbm8nPz5cblx0XHRcdDxzdmcgd2lkdGg9JzE3cHgnIGhlaWdodD0nMTZweCcgdmlld0JveD0nMCAwIDE3IDE2JyB2ZXJzaW9uPScxLjEnIHhtbG5zPSdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZycgeG1sbnM6eGxpbms9J2h0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsnIHhtbG5zOnNrZXRjaD0naHR0cDovL3d3dy5ib2hlbWlhbmNvZGluZy5jb20vc2tldGNoL25zJz5cblx0XHRcdFx0PCEtLSBHZW5lcmF0b3I6IFNrZXRjaCAzLjUuMiAoMjUyMzUpIC0gaHR0cDovL3d3dy5ib2hlbWlhbmNvZGluZy5jb20vc2tldGNoIC0tPlxuXHRcdFx0XHQ8dGl0bGU+UmVjZW50PC90aXRsZT5cblx0XHRcdFx0PGRlc2M+Q3JlYXRlZCB3aXRoIFNrZXRjaC48L2Rlc2M+XG5cdFx0XHRcdDxkZWZzPjwvZGVmcz5cblx0XHRcdFx0PGcgaWQ9J2lPUy05LUtleWJvYXJkcycgc3Ryb2tlPSdub25lJyBzdHJva2Utd2lkdGg9JzEnIGZpbGw9J25vbmUnIGZpbGwtcnVsZT0nZXZlbm9kZCcgc2tldGNoOnR5cGU9J01TUGFnZSc+XG5cdFx0XHRcdFx0PGcgaWQ9J2lQaG9uZS02LVBvcnRyYWl0LUxpZ2h0LUNvcHknIHNrZXRjaDp0eXBlPSdNU0FydGJvYXJkR3JvdXAnIHRyYW5zZm9ybT0ndHJhbnNsYXRlKC01NS4wMDAwMDAsIC02MzguMDAwMDAwKSc+XG5cdFx0XHRcdFx0XHQ8ZyBpZD0nS2V5Ym9hcmRzJyBza2V0Y2g6dHlwZT0nTVNMYXllckdyb3VwJyB0cmFuc2Zvcm09J3RyYW5zbGF0ZSgwLjAwMDAwMCwgNDA4LjAwMDAwMCknPlxuXHRcdFx0XHRcdFx0XHQ8ZyBpZD0nUmVjZW50JyB0cmFuc2Zvcm09J3RyYW5zbGF0ZSg1NS41MDAwMDAsIDIzMC4wMDAwMDApJyBza2V0Y2g6dHlwZT0nTVNTaGFwZUdyb3VwJz5cblx0XHRcdFx0XHRcdFx0XHQ8Y2lyY2xlIGlkPSdCb2R5JyBzdHJva2U9JyM0QTU0NjEnIGN4PSc4JyBjeT0nOCcgcj0nOCc+PC9jaXJjbGU+XG5cdFx0XHRcdFx0XHRcdFx0PHBhdGggZD0nTTcuNSw3LjUgTDcuNSw4LjUgTDguNSw4LjUgTDguNSwyIEw3LjUsMiBMNy41LDcuNSBMNCw3LjUgTDQsOC41IEw4LjUsOC41IEw4LjUsNy41IEw3LjUsNy41IFonIGlkPSdIYW5kcycgZmlsbD0nIzRBNTQ2MSc+PC9wYXRoPlxuXHRcdFx0XHRcdFx0XHQ8L2c+XG5cdFx0XHRcdFx0XHQ8L2c+XG5cdFx0XHRcdFx0PC9nPlxuXHRcdFx0XHQ8L2c+XG5cdFx0XHQ8L3N2Zz5cIlxuXHRrZXlib2FyZCA6IFwiPD94bWwgdmVyc2lvbj0nMS4wJyBlbmNvZGluZz0nVVRGLTgnIHN0YW5kYWxvbmU9J25vJz8+XG5cdFx0XHQ8c3ZnIHdpZHRoPSczMi41cHgnIGhlaWdodD0nMjMuNXB4JyB2aWV3Qm94PScwIDAgNjUgNDcnIHZlcnNpb249JzEuMScgeG1sbnM9J2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJyB4bWxuczp4bGluaz0naHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayc+XG5cdFx0XHQgICAgPCEtLSBHZW5lcmF0b3I6IFNrZXRjaCAzLjYuMSAoMjYzMTMpIC0gaHR0cDovL3d3dy5ib2hlbWlhbmNvZGluZy5jb20vc2tldGNoIC0tPlxuXHRcdFx0ICAgIDx0aXRsZT5TaGFwZTwvdGl0bGU+XG5cdFx0XHQgICAgPGRlc2M+Q3JlYXRlZCB3aXRoIFNrZXRjaC48L2Rlc2M+XG5cdFx0XHQgICAgPGRlZnM+PC9kZWZzPlxuXHRcdFx0ICAgIDxnIGlkPSdQYWdlLTEnIHN0cm9rZT0nbm9uZScgc3Ryb2tlLXdpZHRoPScxJyBmaWxsPSdub25lJyBmaWxsLXJ1bGU9J2V2ZW5vZGQnPlxuXHRcdFx0ICAgICAgICA8ZyBpZD0naVBhZC1Qb3J0cmFpdCcgdHJhbnNmb3JtPSd0cmFuc2xhdGUoLTE0MzYuMDAwMDAwLCAtMTk1Ni4wMDAwMDApJyBmaWxsPScjMDAwMDAwJz5cblx0XHRcdCAgICAgICAgICAgIDxnIGlkPSdLZXlib2FyZC1MaWdodCcgdHJhbnNmb3JtPSd0cmFuc2xhdGUoMC4wMDAwMDAsIDE0MjIuMDAwMDAwKSc+XG5cdFx0XHQgICAgICAgICAgICAgICAgPGcgaWQ9J0tleWJvYXJkLWRvd24nIHRyYW5zZm9ybT0ndHJhbnNsYXRlKDE0MTIuMDAwMDAwLCA1MDAuMDAwMDAwKSc+XG5cdFx0XHQgICAgICAgICAgICAgICAgICAgIDxwYXRoIGQ9J004Ny4wMDEzMzIsMzQgQzg4LjEwNTE2NTksMzQgODksMzQuODk5NzEyNyA4OSwzNS45OTMyODc0IEw4OSw2MS4wMDY3MTI2IEM4OSw2Mi4xMDc1NzQ4IDg4LjEwNTg3NTksNjMgODcuMDAxMzMyLDYzIEwyNS45OTg2NjgsNjMgQzI0Ljg5NDgzNDEsNjMgMjQsNjIuMTAwMjg3MyAyNCw2MS4wMDY3MTI2IEwyNCwzNS45OTMyODc0IEMyNCwzNC44OTI0MjUyIDI0Ljg5NDEyNDEsMzQgMjUuOTk4NjY4LDM0IEw4Ny4wMDEzMzIsMzQgWiBNMjYsMzYgTDI2LDYxIEw4Nyw2MSBMODcsMzYgTDI2LDM2IFogTTc5LDQwIEw4Myw0MCBMODMsNDQgTDc5LDQ0IEw3OSw0MCBaIE03Miw0MCBMNzYsNDAgTDc2LDQ0IEw3Miw0NCBMNzIsNDAgWiBNNjUsNDAgTDY5LDQwIEw2OSw0NCBMNjUsNDQgTDY1LDQwIFogTTU4LDQwIEw2Miw0MCBMNjIsNDQgTDU4LDQ0IEw1OCw0MCBaIE01MSw0MCBMNTUsNDAgTDU1LDQ0IEw1MSw0NCBMNTEsNDAgWiBNNDQsNDAgTDQ4LDQwIEw0OCw0NCBMNDQsNDQgTDQ0LDQwIFogTTM3LDQwIEw0MSw0MCBMNDEsNDQgTDM3LDQ0IEwzNyw0MCBaIE0zMCw0MCBMMzQsNDAgTDM0LDQ0IEwzMCw0NCBMMzAsNDAgWiBNNzksNDcgTDgzLDQ3IEw4Myw1MSBMNzksNTEgTDc5LDQ3IFogTTcyLDQ3IEw3Niw0NyBMNzYsNTEgTDcyLDUxIEw3Miw0NyBaIE02NSw0NyBMNjksNDcgTDY5LDUxIEw2NSw1MSBMNjUsNDcgWiBNNTgsNDcgTDYyLDQ3IEw2Miw1MSBMNTgsNTEgTDU4LDQ3IFogTTUxLDQ3IEw1NSw0NyBMNTUsNTEgTDUxLDUxIEw1MSw0NyBaIE00NCw0NyBMNDgsNDcgTDQ4LDUxIEw0NCw1MSBMNDQsNDcgWiBNMzcsNDcgTDQxLDQ3IEw0MSw1MSBMMzcsNTEgTDM3LDQ3IFogTTMwLDQ3IEwzNCw0NyBMMzQsNTEgTDMwLDUxIEwzMCw0NyBaIE03OSw1NCBMODMsNTQgTDgzLDU4IEw3OSw1OCBMNzksNTQgWiBNNzIsNTQgTDc2LDU0IEw3Niw1OCBMNzIsNTggTDcyLDU0IFogTTQ0LDU0IEw2OSw1NCBMNjksNTggTDQ0LDU4IEw0NCw1NCBaIE0zNyw1NCBMNDEsNTQgTDQxLDU4IEwzNyw1OCBMMzcsNTQgWiBNMzAsNTQgTDM0LDU0IEwzNCw1OCBMMzAsNTggTDMwLDU0IFogTTQ0LjMxNjM0OTgsNjkuOTc3MTA0NyBDNDMuMzY4NDIyNSw3MC41NDIwMzQyIDQzLjMzMzg3MjEsNzEuNTA5NjQ5NSA0NC4yMzc4MjE3LDcyLjEzNzM5MTIgTDU1LjM2MjE1MzksNzkuODYyNjA4OCBDNTYuMjY2NzExMyw4MC40OTA3NzI2IDU3LjczMzg5NjUsODAuNDkwMzUwNSA1OC42Mzc4NDYxLDc5Ljg2MjYwODggTDY5Ljc2MjE3ODMsNzIuMTM3MzkxMiBDNzAuNjY2NzM1Nyw3MS41MDkyMjc0IDcwLjY0ODAxMiw3MC41MjA1MjA0IDY5LjcxMTUxODcsNjkuOTIzNDE2NiBMNjkuOTgyNTczMSw3MC4wOTYyMzk2IEM2OS41MTgxMzMzLDY5LjgwMDExNSA2OC43NzgyNTU3LDY5LjgxMjY0OTMgNjguMzI2MTMwNyw3MC4xMjY5MzIzIEw1Ny44MTU0OTk5LDc3LjQzMzEyNjMgQzU3LjM2NTExMTcsNzcuNzQ2MjAyIDU2LjYyODE2NSw3Ny43MzgxNzg2IDU2LjE3NjIxMDMsNzcuNDE5OTQyNCBMNDUuODM4NjEzNyw3MC4xNDA4OTc3IEM0NS4zODM2NDcyLDY5LjgyMDU0MDcgNDQuNjM3NTAzOSw2OS43ODU3MDg4IDQ0LjE1NjYzOTMsNzAuMDcyMjg2MiBMNDQuMzE2MzQ5OCw2OS45NzcxMDQ3IFonIGlkPSdTaGFwZSc+PC9wYXRoPlxuXHRcdFx0ICAgICAgICAgICAgICAgIDwvZz5cblx0XHRcdCAgICAgICAgICAgIDwvZz5cblx0XHRcdCAgICAgICAgPC9nPlxuXHRcdFx0ICAgIDwvZz5cblx0XHRcdDwvc3ZnPlwiXG5cdGtleVBvcFVwOlxuXHRcdFwiaXBob25lLTVcIiA6IFwiPHN2ZyB3aWR0aD0nNTVweCcgaGVpZ2h0PSc5MnB4JyB2aWV3Qm94PSc1MyAzMTYgNTUgOTInIHZlcnNpb249JzEuMScgeG1sbnM9J2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJyB4bWxuczp4bGluaz0naHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayc+XG5cdFx0XHRcdCAgICA8IS0tIEdlbmVyYXRvcjogU2tldGNoIDMuNy4yICgyODI3NikgLSBodHRwOi8vd3d3LmJvaGVtaWFuY29kaW5nLmNvbS9za2V0Y2ggLS0+XG5cdFx0XHRcdCAgICA8ZGVzYz5DcmVhdGVkIHdpdGggU2tldGNoLjwvZGVzYz5cblx0XHRcdFx0ICAgIDxkZWZzPlxuXHRcdFx0XHQgICAgICAgIDxmaWx0ZXIgeD0nLTUwJScgeT0nLTUwJScgd2lkdGg9JzIwMCUnIGhlaWdodD0nMjAwJScgZmlsdGVyVW5pdHM9J29iamVjdEJvdW5kaW5nQm94JyBpZD0nZmlsdGVyLTEnPlxuXHRcdFx0XHQgICAgICAgICAgICA8ZmVPZmZzZXQgZHg9JzAnIGR5PScxJyBpbj0nU291cmNlQWxwaGEnIHJlc3VsdD0nc2hhZG93T2Zmc2V0T3V0ZXIxJz48L2ZlT2Zmc2V0PlxuXHRcdFx0XHQgICAgICAgICAgICA8ZmVHYXVzc2lhbkJsdXIgc3RkRGV2aWF0aW9uPScxLjUnIGluPSdzaGFkb3dPZmZzZXRPdXRlcjEnIHJlc3VsdD0nc2hhZG93Qmx1ck91dGVyMSc+PC9mZUdhdXNzaWFuQmx1cj5cblx0XHRcdFx0ICAgICAgICAgICAgPGZlQ29sb3JNYXRyaXggdmFsdWVzPScwIDAgMCAwIDAgICAwIDAgMCAwIDAgICAwIDAgMCAwIDAgIDAgMCAwIDAuNCAwJyB0eXBlPSdtYXRyaXgnIGluPSdzaGFkb3dCbHVyT3V0ZXIxJyByZXN1bHQ9J3NoYWRvd01hdHJpeE91dGVyMSc+PC9mZUNvbG9yTWF0cml4PlxuXHRcdFx0XHQgICAgICAgICAgICA8ZmVNZXJnZT5cblx0XHRcdFx0ICAgICAgICAgICAgICAgIDxmZU1lcmdlTm9kZSBpbj0nc2hhZG93TWF0cml4T3V0ZXIxJz48L2ZlTWVyZ2VOb2RlPlxuXHRcdFx0XHQgICAgICAgICAgICAgICAgPGZlTWVyZ2VOb2RlIGluPSdTb3VyY2VHcmFwaGljJz48L2ZlTWVyZ2VOb2RlPlxuXHRcdFx0XHQgICAgICAgICAgICA8L2ZlTWVyZ2U+XG5cdFx0XHRcdCAgICAgICAgPC9maWx0ZXI+XG5cdFx0XHRcdCAgICAgICAgPHBhdGggZD0nTTEuMzQxNzMyMzEsNDAuOTM5MTcwMSBDMC41MTc0NjYxMjgsNDAuMjA1ODkgMCwzOS4xMzc0MjUxIDAsMzcuOTQ3NzYzNSBMMCw0LjAwMzQ1NTk4IEMwLDEuNzg5MTcxMzYgMS43OTUyODI0OCwwIDQuMDA5ODc1NjYsMCBMNDQuOTkwMTI0MywwIEM0Ny4yMTI1NjA4LDAgNDksMS43OTI0MDgzIDQ5LDQuMDAzNDU1OTggTDQ5LDM3Ljk0Nzc2MzUgQzQ5LDM4LjkxMjQwNTEgNDguNjU5Mjc5OCwzOS43OTYzNjU5IDQ4LjA5MTYwNDEsNDAuNDg2ODY2NSBDNDguMDQxNDIzMyw0MC45MDMyMjg5IDQ3LjcxMTE4ODgsNDEuNDA3NDY3MiA0Ny4wODI1OTA4LDQxLjk1MjI1IEM0Ny4wODI1OTA4LDQxLjk1MjI1IDM4LjUyOTkxNDUsNDkuMDY0MzM2MiAzOC41Mjk5MTQ1LDUxLjE1MjY0MjQgQzM4LjUyOTkxNDUsNjEuNjQ5NzU2MSAzOC4xNzcwMDk5LDgyLjAwMjU0MDYgMzguMTc3MDA5OSw4Mi4wMDI1NDA2IEMzOC4xNDEyMzA0LDg0LjIwMjQzNTQgMzYuMzIxMDI4NCw4NiAzNC4xMTI4NDk1LDg2IEwxNS4zMDU5NTM5LDg2IEMxMy4xMDc5Niw4NiAxMS4yNzgxODg0LDg0LjIxMDA3ODkgMTEuMjQxNzkzNiw4Mi4wMDIwOTkzIEMxMS4yNDE3OTM2LDgyLjAwMjA5OTMgMTAuODg4ODg4OSw2MS42NDcwODUyIDEwLjg4ODg4ODksNTEuMTQ4NjM2MSBDMTAuODg4ODg4OSw0OS4wNjE2NjU0IDIuMzQxNDM2NjIsNDIuMjM4NjU1IDIuMzQxNDM2NjIsNDIuMjM4NjU1IEMxLjc3ODI3MzExLDQxLjc2NDEzNjUgMS40NDg4MTM1NCw0MS4zMjA0MjM3IDEuMzQxNzMyMzEsNDAuOTM5MTcwMSBaJyBpZD0ncGF0aC0yJz48L3BhdGg+XG5cdFx0XHRcdCAgICAgICAgPG1hc2sgaWQ9J21hc2stMycgbWFza0NvbnRlbnRVbml0cz0ndXNlclNwYWNlT25Vc2UnIG1hc2tVbml0cz0nb2JqZWN0Qm91bmRpbmdCb3gnIHg9JzAnIHk9JzAnIHdpZHRoPSc0OScgaGVpZ2h0PSc4NicgZmlsbD0nd2hpdGUnPlxuXHRcdFx0XHQgICAgICAgICAgICA8dXNlIHhsaW5rOmhyZWY9JyNwYXRoLTInPjwvdXNlPlxuXHRcdFx0XHQgICAgICAgIDwvbWFzaz5cblx0XHRcdFx0ICAgIDwvZGVmcz5cblx0XHRcdFx0ICAgIDxnIGlkPSdQb3BvdmVyJyBmaWx0ZXI9J3VybCgjZmlsdGVyLTEpJyBzdHJva2U9J25vbmUnIHN0cm9rZS13aWR0aD0nMScgZmlsbD0nbm9uZScgZmlsbC1ydWxlPSdldmVub2RkJyB0cmFuc2Zvcm09J3RyYW5zbGF0ZSg1Ni4wMDAwMDAsIDMxOC4wMDAwMDApJz5cblx0XHRcdFx0ICAgICAgICA8dXNlIGlkPSdSZWN0YW5nbGUtMTQnIHN0cm9rZT0nI0IyQjRCOScgbWFzaz0ndXJsKCNtYXNrLTMpJyBmaWxsPScjRkNGQ0ZDJyB4bGluazpocmVmPScjcGF0aC0yJz48L3VzZT5cblx0XHRcdFx0ICAgIDwvZz5cblx0XHRcdFx0PC9zdmc+XCJcblx0XHRcImlwaG9uZS02c1wiIDogXCI8c3ZnIHdpZHRoPSc2NHB4JyBoZWlnaHQ9JzEwN3B4JyB2aWV3Qm94PScyNCAzODcgNjQgMTA3JyB2ZXJzaW9uPScxLjEnIHhtbG5zPSdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZycgeG1sbnM6eGxpbms9J2h0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsnPlxuXHRcdFx0XHQgICAgPCEtLSBHZW5lcmF0b3I6IFNrZXRjaCAzLjcuMiAoMjgyNzYpIC0gaHR0cDovL3d3dy5ib2hlbWlhbmNvZGluZy5jb20vc2tldGNoIC0tPlxuXHRcdFx0XHQgICAgPGRlc2M+Q3JlYXRlZCB3aXRoIFNrZXRjaC48L2Rlc2M+XG5cdFx0XHRcdCAgICA8ZGVmcz5cblx0XHRcdFx0ICAgICAgICA8ZmlsdGVyIHg9Jy01MCUnIHk9Jy01MCUnIHdpZHRoPScyMDAlJyBoZWlnaHQ9JzIwMCUnIGZpbHRlclVuaXRzPSdvYmplY3RCb3VuZGluZ0JveCcgaWQ9J2ZpbHRlci0xJz5cblx0XHRcdFx0ICAgICAgICAgICAgPGZlT2Zmc2V0IGR4PScwJyBkeT0nMScgaW49J1NvdXJjZUFscGhhJyByZXN1bHQ9J3NoYWRvd09mZnNldE91dGVyMSc+PC9mZU9mZnNldD5cblx0XHRcdFx0ICAgICAgICAgICAgPGZlR2F1c3NpYW5CbHVyIHN0ZERldmlhdGlvbj0nMS41JyBpbj0nc2hhZG93T2Zmc2V0T3V0ZXIxJyByZXN1bHQ9J3NoYWRvd0JsdXJPdXRlcjEnPjwvZmVHYXVzc2lhbkJsdXI+XG5cdFx0XHRcdCAgICAgICAgICAgIDxmZUNvbG9yTWF0cml4IHZhbHVlcz0nMCAwIDAgMCAwICAgMCAwIDAgMCAwICAgMCAwIDAgMCAwICAwIDAgMCAwLjQgMCcgdHlwZT0nbWF0cml4JyBpbj0nc2hhZG93Qmx1ck91dGVyMScgcmVzdWx0PSdzaGFkb3dNYXRyaXhPdXRlcjEnPjwvZmVDb2xvck1hdHJpeD5cblx0XHRcdFx0ICAgICAgICAgICAgPGZlTWVyZ2U+XG5cdFx0XHRcdCAgICAgICAgICAgICAgICA8ZmVNZXJnZU5vZGUgaW49J3NoYWRvd01hdHJpeE91dGVyMSc+PC9mZU1lcmdlTm9kZT5cblx0XHRcdFx0ICAgICAgICAgICAgICAgIDxmZU1lcmdlTm9kZSBpbj0nU291cmNlR3JhcGhpYyc+PC9mZU1lcmdlTm9kZT5cblx0XHRcdFx0ICAgICAgICAgICAgPC9mZU1lcmdlPlxuXHRcdFx0XHQgICAgICAgIDwvZmlsdGVyPlxuXHRcdFx0XHQgICAgICAgIDxwYXRoIGQ9J00xLjQ4NjQ3NjQ2LDQ4LjM3Nzk5NDcgQzAuNTgwMjY2NDksNDcuNjQ2NDI5NiAwLDQ2LjUyOTU4NyAwLDQ1LjI3ODE5NDggTDAsMy45OTAwOTc4NyBDMCwxLjc4MjU5MTIgMS43OTUwOTU3NywwIDQuMDA5NDU4NjIsMCBMNTMuOTkwNTQxNCwwIEM1Ni4yMDA1NzQ2LDAgNTgsMS43ODY0Mjc2NyA1OCwzLjk5MDA5Nzg3IEw1OCw0NS4yNzgxOTQ4IEM1OCw0Ni4xODMzMDA0IDU3LjY5ODIyNTgsNDcuMDE2OTczMyA1Ny4xODk1MDk3LDQ3LjY4NTYzMjUgQzU3LjAzOTY4NjUsNDguMDIxMjQ5NyA1Ni43MzYwMDk4LDQ4LjM5NzI4MzQgNTYuMjcxODM2Myw0OC43OTUwNjYxIEM1Ni4yNzE4MzYzLDQ4Ljc5NTA2NjEgNDUuNjA2ODM3Niw1Ny42MjIwNjkzIDQ1LjYwNjgzNzYsNjAuMDc0NjE0OSBDNDUuNjA2ODM3Niw3Mi40MDI2MjA1IDQ1LjE3Nzk2Nyw5Ni45OTIzMTY0IDQ1LjE3Nzk2Nyw5Ni45OTIzMTY0IEM0NS4xNDEzNzQ4LDk5LjIxMjIyMTQgNDMuMzE5MzA2NSwxMDEgNDEuMTA5MDAzNSwxMDEgTDE3LjM4NjcyMywxMDEgQzE1LjE4MTI3MjIsMTAxIDEzLjM1NDY4Myw5OS4yMDU1MDA5IDEzLjMxNzc1OTUsOTYuOTkxODc0MSBDMTMuMzE3NzU5NSw5Ni45OTE4NzQxIDEyLjg4ODg4ODksNzIuMzk5NDgzOCAxMi44ODg4ODg5LDYwLjA2OTkwOTkgQzEyLjg4ODg4ODksNTcuNjE4OTMyNiAyLjIyNjczNDM3LDQ5LjE0NjI5MzYgMi4yMjY3MzQzNyw0OS4xNDYyOTM2IEMxLjkwNTI0MDg3LDQ4Ljg3ODgzMjcgMS42NTkxMTY1NSw0OC42MjA3MzMgMS40ODY0NzY0Niw0OC4zNzc5OTQ3IFonIGlkPSdwYXRoLTInPjwvcGF0aD5cblx0XHRcdFx0ICAgICAgICA8bWFzayBpZD0nbWFzay0zJyBtYXNrQ29udGVudFVuaXRzPSd1c2VyU3BhY2VPblVzZScgbWFza1VuaXRzPSdvYmplY3RCb3VuZGluZ0JveCcgeD0nMCcgeT0nMCcgd2lkdGg9JzU4JyBoZWlnaHQ9JzEwMScgZmlsbD0nd2hpdGUnPlxuXHRcdFx0XHQgICAgICAgICAgICA8dXNlIHhsaW5rOmhyZWY9JyNwYXRoLTInPjwvdXNlPlxuXHRcdFx0XHQgICAgICAgIDwvbWFzaz5cblx0XHRcdFx0ICAgIDwvZGVmcz5cblx0XHRcdFx0ICAgIDxnIGlkPSdQb3BvdmVyJyBmaWx0ZXI9J3VybCgjZmlsdGVyLTEpJyBzdHJva2U9J25vbmUnIHN0cm9rZS13aWR0aD0nMScgZmlsbD0nbm9uZScgZmlsbC1ydWxlPSdldmVub2RkJyB0cmFuc2Zvcm09J3RyYW5zbGF0ZSgyNy4wMDAwMDAsIDM4OS4wMDAwMDApJz5cblx0XHRcdFx0ICAgICAgICA8dXNlIGlkPSdSZWN0YW5nbGUtMTQnIHN0cm9rZT0nI0IyQjRCOScgbWFzaz0ndXJsKCNtYXNrLTMpJyBmaWxsPScjRkNGQ0ZDJyB4bGluazpocmVmPScjcGF0aC0yJz48L3VzZT5cblx0XHRcdFx0ICAgIDwvZz5cblx0XHRcdFx0PC9zdmc+XCJcblx0XHRcImlwaG9uZS02cy1wbHVzXCIgOiBcIjxzdmcgd2lkdGg9JzcwcHgnIGhlaWdodD0nMTE5cHgnIHZpZXdCb3g9JzI4IDQ1MCA3MCAxMTknIHZlcnNpb249JzEuMScgeG1sbnM9J2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJyB4bWxuczp4bGluaz0naHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayc+XG5cdFx0XHRcdCAgICA8IS0tIEdlbmVyYXRvcjogU2tldGNoIDMuNy4yICgyODI3NikgLSBodHRwOi8vd3d3LmJvaGVtaWFuY29kaW5nLmNvbS9za2V0Y2ggLS0+XG5cdFx0XHRcdCAgICA8ZGVzYz5DcmVhdGVkIHdpdGggU2tldGNoLjwvZGVzYz5cblx0XHRcdFx0ICAgIDxkZWZzPlxuXHRcdFx0XHQgICAgICAgIDxmaWx0ZXIgeD0nLTUwJScgeT0nLTUwJScgd2lkdGg9JzIwMCUnIGhlaWdodD0nMjAwJScgZmlsdGVyVW5pdHM9J29iamVjdEJvdW5kaW5nQm94JyBpZD0nZmlsdGVyLTEnPlxuXHRcdFx0XHQgICAgICAgICAgICA8ZmVPZmZzZXQgZHg9JzAnIGR5PScxJyBpbj0nU291cmNlQWxwaGEnIHJlc3VsdD0nc2hhZG93T2Zmc2V0T3V0ZXIxJz48L2ZlT2Zmc2V0PlxuXHRcdFx0XHQgICAgICAgICAgICA8ZmVHYXVzc2lhbkJsdXIgc3RkRGV2aWF0aW9uPScxLjUnIGluPSdzaGFkb3dPZmZzZXRPdXRlcjEnIHJlc3VsdD0nc2hhZG93Qmx1ck91dGVyMSc+PC9mZUdhdXNzaWFuQmx1cj5cblx0XHRcdFx0ICAgICAgICAgICAgPGZlQ29sb3JNYXRyaXggdmFsdWVzPScwIDAgMCAwIDAgICAwIDAgMCAwIDAgICAwIDAgMCAwIDAgIDAgMCAwIDAuNCAwJyB0eXBlPSdtYXRyaXgnIGluPSdzaGFkb3dCbHVyT3V0ZXIxJyByZXN1bHQ9J3NoYWRvd01hdHJpeE91dGVyMSc+PC9mZUNvbG9yTWF0cml4PlxuXHRcdFx0XHQgICAgICAgICAgICA8ZmVNZXJnZT5cblx0XHRcdFx0ICAgICAgICAgICAgICAgIDxmZU1lcmdlTm9kZSBpbj0nc2hhZG93TWF0cml4T3V0ZXIxJz48L2ZlTWVyZ2VOb2RlPlxuXHRcdFx0XHQgICAgICAgICAgICAgICAgPGZlTWVyZ2VOb2RlIGluPSdTb3VyY2VHcmFwaGljJz48L2ZlTWVyZ2VOb2RlPlxuXHRcdFx0XHQgICAgICAgICAgICA8L2ZlTWVyZ2U+XG5cdFx0XHRcdCAgICAgICAgPC9maWx0ZXI+XG5cdFx0XHRcdCAgICAgICAgPHBhdGggZD0nTTEuOTU3MjkzOTUsNTQuMDcyODMwNCBDMC43ODU5MTExMzIsNTMuMzc1NzY5OSAwLDUyLjA5ODc3NiAwLDUwLjYzODkwMjIgTDAsMy45OTUyNDQxOSBDMCwxLjc4NjcxNDI4IDEuNzkyNDIyMDIsMCA0LjAwMzQ4NjYzLDAgTDU5Ljk5NjUxMzQsMCBDNjIuMjA0NjIzNSwwIDY0LDEuNzg4NzMxNzUgNjQsMy45OTUyNDQxOSBMNjQsNTAuNjM4OTAyMiBDNjQsNTEuOTIzMzY4NiA2My4zOTM3MTE2LDUzLjA2NTE1NTYgNjIuNDUxMzkxLDUzLjc5NTc1NCBDNjIuNDQyNzc1Miw1My44MDMyNDMzIDYyLjQzNDEwMTksNTMuODEwNzQwNCA2Mi40MjUzNzA5LDUzLjgxODI0NTQgQzYyLjQyNTM3MDksNTMuODE4MjQ1NCA1MC4zMjQ3ODYzLDYzLjg5Nzc0MDIgNTAuMzI0Nzg2Myw2Ni42MTczOTQ3IEM1MC4zMjQ3ODYzLDgwLjI4ODA1NDQgNDkuODQ0MzA0OSwxMDguMDAyMDA3IDQ5Ljg0NDMwNDksMTA4LjAwMjAwNyBDNDkuODA3OTY2NSwxMTAuMjEwMjM0IDQ3Ljk4NzQyMzIsMTEyIDQ1Ljc3ODkwODksMTEyIEwxOC43NjgwOTk3LDExMiBDMTYuNTUzNDM5NywxMTIgMTQuNzM5NDQ1NiwxMTAuMjA5ODQgMTQuNzAyNzAzNywxMDguMDAxNTY2IEMxNC43MDI3MDM3LDEwOC4wMDE1NjYgMTQuMjIyMjIyMiw4MC4yODQ1NzYxIDE0LjIyMjIyMjIsNjYuNjEyMTc3MyBDMTQuMjIyMjIyMiw2My44OTQyNjE5IDIuMTQwODE0MjIsNTQuMjMyMTMzNyAyLjE0MDgxNDIyLDU0LjIzMjEzMzcgQzIuMDc2NjQ5MTMsNTQuMTc4NjI5OCAyLjAxNTQ4MTExLDU0LjEyNTUxMzQgMS45NTcyOTM5NSw1NC4wNzI4MzA0IFonIGlkPSdwYXRoLTInPjwvcGF0aD5cblx0XHRcdFx0ICAgICAgICA8bWFzayBpZD0nbWFzay0zJyBtYXNrQ29udGVudFVuaXRzPSd1c2VyU3BhY2VPblVzZScgbWFza1VuaXRzPSdvYmplY3RCb3VuZGluZ0JveCcgeD0nMCcgeT0nMCcgd2lkdGg9JzY0JyBoZWlnaHQ9JzExMicgZmlsbD0nd2hpdGUnPlxuXHRcdFx0XHQgICAgICAgICAgICA8dXNlIHhsaW5rOmhyZWY9JyNwYXRoLTInPjwvdXNlPlxuXHRcdFx0XHQgICAgICAgIDwvbWFzaz5cblx0XHRcdFx0ICAgIDwvZGVmcz5cblx0XHRcdFx0ICAgIDxnIGlkPSdQb3BvdmVyJyBmaWx0ZXI9J3VybCgjZmlsdGVyLTEpJyBzdHJva2U9J25vbmUnIHN0cm9rZS13aWR0aD0nMScgZmlsbD0nbm9uZScgZmlsbC1ydWxlPSdldmVub2RkJyB0cmFuc2Zvcm09J3RyYW5zbGF0ZSgzMS4wMDAwMDAsIDQ1Mi4wMDAwMDApJz5cblx0XHRcdFx0ICAgICAgICA8dXNlIGlkPSdSZWN0YW5nbGUtMTQnIHN0cm9rZT0nI0IyQjRCOScgbWFzaz0ndXJsKCNtYXNrLTMpJyBmaWxsPScjRkNGQ0ZDJyB4bGluazpocmVmPScjcGF0aC0yJz48L3VzZT5cblx0XHRcdFx0ICAgIDwvZz5cblx0XHRcdFx0PC9zdmc+XCJcblx0b2JqZWN0cyA6XG5cdFx0XCI8P3htbCB2ZXJzaW9uPScxLjAnIGVuY29kaW5nPSdVVEYtOCcgc3RhbmRhbG9uZT0nbm8nPz5cblx0XHRcdFx0PHN2ZyB3aWR0aD0nMTFweCcgaGVpZ2h0PScxNnB4JyB2aWV3Qm94PScwIDAgMTEgMTYnIHZlcnNpb249JzEuMScgeG1sbnM9J2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJyB4bWxuczp4bGluaz0naHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluaycgeG1sbnM6c2tldGNoPSdodHRwOi8vd3d3LmJvaGVtaWFuY29kaW5nLmNvbS9za2V0Y2gvbnMnPlxuXHRcdFx0XHQ8IS0tIEdlbmVyYXRvcjogU2tldGNoIDMuNS4yICgyNTIzNSkgLSBodHRwOi8vd3d3LmJvaGVtaWFuY29kaW5nLmNvbS9za2V0Y2ggLS0+XG5cdFx0XHRcdDx0aXRsZT5MaWdodGJ1bGI8L3RpdGxlPlxuXHRcdFx0XHQ8ZGVzYz5DcmVhdGVkIHdpdGggU2tldGNoLjwvZGVzYz5cblx0XHRcdFx0PGRlZnM+PC9kZWZzPlxuXHRcdFx0XHQ8ZyBpZD0nUGFnZS0xJyBzdHJva2U9J25vbmUnIHN0cm9rZS13aWR0aD0nMScgZmlsbD0nbm9uZScgZmlsbC1ydWxlPSdldmVub2RkJyBza2V0Y2g6dHlwZT0nTVNQYWdlJz5cblx0XHRcdFx0XHQ8ZyBpZD0naVBob25lLTYnIHNrZXRjaDp0eXBlPSdNU0FydGJvYXJkR3JvdXAnIHRyYW5zZm9ybT0ndHJhbnNsYXRlKC0yNDQuMDAwMDAwLCAtNjM5LjAwMDAwMCknIHN0cm9rZT0nIzRBNTM2MSc+XG5cdFx0XHRcdFx0XHQ8ZyBpZD0nTGlnaHRidWxiJyBza2V0Y2g6dHlwZT0nTVNMYXllckdyb3VwJyB0cmFuc2Zvcm09J3RyYW5zbGF0ZSgyNDQuMDAwMDAwLCA2MzkuMDAwMDAwKSc+XG5cdFx0XHRcdFx0XHRcdDxwYXRoIGQ9J004LDEwLjQwMDI5MDQgQzkuNzgwODM3OTUsOS40ODk5MzQ5MSAxMSw3LjYzNzM0MjczIDExLDUuNSBDMTEsMi40NjI0MzM4OCA4LjUzNzU2NjEyLDAgNS41LDAgQzIuNDYyNDMzODgsMCAwLDIuNDYyNDMzODggMCw1LjUgQzAsNy42MzczNDI3MyAxLjIxOTE2MjA1LDkuNDg5OTM0OTEgMywxMC40MDAyOTA0IEwzLDE0LjAwMjA4NjkgQzMsMTUuMTAxNzM5NCAzLjg5NzYxNjAyLDE2IDUuMDA0ODgxNSwxNiBMNS45OTUxMTg1LDE2IEM3LjEwNjEwMDIsMTYgOCwxNS4xMDU1MDM4IDgsMTQuMDAyMDg2OSBMOCwxMC40MDAyOTA0IFonIGlkPSdPdmFsLTE3JyBza2V0Y2g6dHlwZT0nTVNTaGFwZUdyb3VwJz48L3BhdGg+XG5cdFx0XHRcdFx0XHRcdDxyZWN0IGlkPSdSZWN0YW5nbGUtNTAnIHNrZXRjaDp0eXBlPSdNU1NoYXBlR3JvdXAnIHg9JzMnIHk9JzEyJyB3aWR0aD0nNScgaGVpZ2h0PScxJz48L3JlY3Q+XG5cdFx0XHRcdFx0XHRcdDxyZWN0IGlkPSdSZWN0YW5nbGUtNTEnIHNrZXRjaDp0eXBlPSdNU1NoYXBlR3JvdXAnIHg9JzQnIHk9JzEzLjUnIHdpZHRoPScxLjUnIGhlaWdodD0nMSc+PC9yZWN0PlxuXHRcdFx0XHRcdFx0XHQ8cGF0aCBkPSdNNSw4LjUgQzUsOC41IDMuNDk5OTk5OTksNy41MDAwMDAwMSA0LDcgQzQuNTAwMDAwMDEsNi40OTk5OTk5OSA1LDcuNjY2NjY2NjcgNS41LDggQzUuNSw4IDYuNSw2LjUwMDAwMDAxIDcsNyBDNy41LDcuNDk5OTk5OTkgNiw4LjUgNiw4LjUgTDYsMTEgTDUsMTEgTDUsOC41IFonIGlkPSdSZWN0YW5nbGUtNTInIHNrZXRjaDp0eXBlPSdNU1NoYXBlR3JvdXAnPjwvcGF0aD5cblx0XHRcdFx0XHRcdDwvZz5cblx0XHRcdFx0XHQ8L2c+XG5cdFx0XHRcdDwvZz5cblx0XHRcdDwvc3ZnPlwiXG5cdHNoaWZ0IDoge1xuXHRcdG9uIDogXCI8P3htbCB2ZXJzaW9uPScxLjAnIGVuY29kaW5nPSdVVEYtOCcgc3RhbmRhbG9uZT0nbm8nPz5cblx0XHRcdFx0PHN2ZyB3aWR0aD0nMjBweCcgaGVpZ2h0PScxOHB4JyB2aWV3Qm94PScwIDAgMjAgMTcnIHZlcnNpb249JzEuMScgeG1sbnM9J2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJyB4bWxuczp4bGluaz0naHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluaycgeG1sbnM6c2tldGNoPSdodHRwOi8vd3d3LmJvaGVtaWFuY29kaW5nLmNvbS9za2V0Y2gvbnMnPlxuXHRcdFx0XHRcdDwhLS0gR2VuZXJhdG9yOiBTa2V0Y2ggMy41LjIgKDI1MjM1KSAtIGh0dHA6Ly93d3cuYm9oZW1pYW5jb2RpbmcuY29tL3NrZXRjaCAtLT5cblx0XHRcdFx0XHQ8dGl0bGU+U2hpZnQ8L3RpdGxlPlxuXHRcdFx0XHRcdDxkZXNjPkNyZWF0ZWQgd2l0aCBTa2V0Y2guPC9kZXNjPlxuXHRcdFx0XHRcdDxkZWZzPjwvZGVmcz5cblx0XHRcdFx0XHQ8ZyBpZD0nUGFnZS0xJyBzdHJva2U9J25vbmUnIHN0cm9rZS13aWR0aD0nMScgZmlsbD0nbm9uZScgZmlsbC1ydWxlPSdldmVub2RkJyBza2V0Y2g6dHlwZT0nTVNQYWdlJz5cblx0XHRcdFx0XHRcdDxnIGlkPSdLZXlib2FyZC9MaWdodC9VcHBlcicgc2tldGNoOnR5cGU9J01TTGF5ZXJHcm91cCcgdHJhbnNmb3JtPSd0cmFuc2xhdGUoLTE0LjAwMDAwMCwgLTEzMC4wMDAwMDApJyBmaWxsPScjMDMwMzAzJz5cblx0XHRcdFx0XHRcdFx0PGcgaWQ9J1RoaXJkLVJvdycgdHJhbnNmb3JtPSd0cmFuc2xhdGUoMy4wMDAwMDAsIDExOC4wMDAwMDApJyBza2V0Y2g6dHlwZT0nTVNTaGFwZUdyb3VwJz5cblx0XHRcdFx0XHRcdFx0XHQ8cGF0aCBkPSdNMjEuNzA1MjM4OCwxMy4yMDUyMzg4IEMyMS4zMTU3NDYyLDEyLjgxNTc0NjIgMjAuNjg1NzU1OSwxMi44MTQyNDQxIDIwLjI5NDc2MTIsMTMuMjA1MjM4OCBMMTEuOTE2MDc2NywyMS41ODM5MjMzIEMxMS4xMzM5OTkxLDIyLjM2NjAwMDkgMTEuMzk4MjYwNiwyMyAxMi40OTc5MTMxLDIzIEwxNi41LDIzIEwxNi41LDI4LjAwOTIyMiBDMTYuNSwyOC41NTY0MTM2IDE2Ljk0NjMxMTQsMjkgMTcuNDk3NTQ0NiwyOSBMMjQuNTAyNDU1NCwyOSBDMjUuMDUzMzg0LDI5IDI1LjUsMjguNTQ5MDI0OCAyNS41LDI4LjAwOTIyMiBMMjUuNSwyMyBMMjkuNTAyMDg2OSwyMyBDMzAuNjA1NTAzOCwyMyAzMC44NjY4MjQsMjIuMzY2ODI0IDMwLjA4MzkyMzMsMjEuNTgzOTIzMyBMMjEuNzA1MjM4OCwxMy4yMDUyMzg4IFonIGlkPSdTaGlmdCc+PC9wYXRoPlxuXHRcdFx0XHRcdFx0XHQ8L2c+XG5cdFx0XHRcdFx0XHQ8L2c+XG5cdFx0XHRcdFx0PC9nPlxuXHRcdFx0XHQ8L3N2Zz5cIlxuXHRcdG9mZiA6IFwiPD94bWwgdmVyc2lvbj0nMS4wJyBlbmNvZGluZz0nVVRGLTgnIHN0YW5kYWxvbmU9J25vJz8+XG5cdFx0PHN2ZyB3aWR0aD0nMjBweCcgaGVpZ2h0PScxOHB4JyB2aWV3Qm94PScwIDAgMjAgMTknIHZlcnNpb249JzEuMScgeG1sbnM9J2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJyB4bWxuczp4bGluaz0naHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluaycgeG1sbnM6c2tldGNoPSdodHRwOi8vd3d3LmJvaGVtaWFuY29kaW5nLmNvbS9za2V0Y2gvbnMnPlxuXHRcdFx0PCEtLSBHZW5lcmF0b3I6IFNrZXRjaCAzLjUuMiAoMjUyMzUpIC0gaHR0cDovL3d3dy5ib2hlbWlhbmNvZGluZy5jb20vc2tldGNoIC0tPlxuXHRcdFx0PHRpdGxlPlNoaWZ0PC90aXRsZT5cblx0XHRcdDxkZXNjPkNyZWF0ZWQgd2l0aCBTa2V0Y2guPC9kZXNjPlxuXHRcdFx0PGRlZnM+PC9kZWZzPlxuXHRcdFx0PGcgaWQ9J1BhZ2UtMScgc3Ryb2tlPSdub25lJyBzdHJva2Utd2lkdGg9JzEnIGZpbGw9J25vbmUnIGZpbGwtcnVsZT0nZXZlbm9kZCcgc2tldGNoOnR5cGU9J01TUGFnZSc+XG5cdFx0XHRcdDxnIGlkPSdLZXlib2FyZC9MaWdodC9Mb3dlcicgc2tldGNoOnR5cGU9J01TTGF5ZXJHcm91cCcgdHJhbnNmb3JtPSd0cmFuc2xhdGUoLTE0LjAwMDAwMCwgLTEyOS4wMDAwMDApJyBmaWxsPScjMDMwMzAzJz5cblx0XHRcdFx0XHQ8ZyBpZD0nVGhpcmQtUm93JyB0cmFuc2Zvcm09J3RyYW5zbGF0ZSgzLjAwMDAwMCwgMTE4LjAwMDAwMCknIHNrZXRjaDp0eXBlPSdNU1NoYXBlR3JvdXAnPlxuXHRcdFx0XHRcdFx0PHBhdGggZD0nTTIxLjY3MTkwMDgsMTIuMjMyNTg5OCBDMjEuMzAxMDMyLDExLjgyNzk5MTYgMjAuNjk0Njg5MiwxMS44MzM0NzMxIDIwLjMyODgxOTUsMTIuMjMyNTg5OCBMMTEuNjk0NzAyMywyMS42NTEyOTgzIEMxMC43NTg3NDQxLDIyLjY3MjMwOCAxMS4xMjg1NTQxLDIzLjUgMTIuNTA5Nzc1MSwyMy41IEwxNS45OTk5OTk5LDIzLjUwMDAwMDIgTDE1Ljk5OTk5OTksMjguMDAxNDI0MSBDMTUuOTk5OTk5OSwyOC44MjkwNjQ4IDE2LjY3MTY1NTksMjkuNTAwMDAwMSAxNy40OTcxMDEsMjkuNTAwMDAwMSBMMjQuNTAyODk5MiwyOS41MDAwMDAxIEMyNS4zMjk3MjUzLDI5LjUwMDAwMDEgMjYuMDAwMDAwMywyOC44MzQ5NzAzIDI2LjAwMDAwMDMsMjguMDAxNDI0MSBMMjYuMDAwMDAwMywyMy41MDAwMDAxIEwyOS40OTAyMjUxLDIzLjUwMDAwMDIgQzMwLjg3NjMzNTcsMjMuNTAwMDAwMiAzMS4yNDM5NTIxLDIyLjY3NTE5MTYgMzAuMzA1NDE2MSwyMS42NTEyOTg1IEwyMS42NzE5MDA4LDEyLjIzMjU4OTggWiBNMjEuMzQxNzQ4LDE0LjM2NDUzMTYgQzIxLjE1MzAwNTYsMTQuMTYzMjA2NCAyMC44NDMzNTE1LDE0LjE2NzA5MTQgMjAuNjU4MjUxNCwxNC4zNjQ1MzE2IEwxMy41LDIxLjk5OTk5OTggTDE3LjUwMDAwMDEsMjEuOTk5OTk5OSBMMTcuNTAwMDAwMiwyNy41MDg5OTU2IEMxNy41MDAwMDAyLDI3Ljc4MDE3MDMgMTcuNzMyOTAyNywyOC4wMDAwMDA4IDE4LjAwMzQyMjksMjguMDAwMDAwOCBMMjMuOTk2NTc3LDI4LjAwMDAwMDggQzI0LjI3NDYwOTcsMjguMDAwMDAwOCAyNC40OTk5OTk3LDI3Ljc3MjEyMDMgMjQuNDk5OTk5NywyNy41MDg5OTU2IEwyNC40OTk5OTk3LDIxLjk5OTk5OTkgTDI4LjUsMjEuOTk5OTk5OSBMMjEuMzQxNzQ4LDE0LjM2NDUzMTYgWicgaWQ9J1NoaWZ0Jz48L3BhdGg+XG5cdFx0XHRcdFx0PC9nPlxuXHRcdFx0XHQ8L2c+XG5cdFx0XHQ8L2c+XG5cdFx0PC9zdmc+XCJcblx0fVxuXHRzbWlsZXlzOiBcIjw/eG1sIHZlcnNpb249JzEuMCcgZW5jb2Rpbmc9J1VURi04JyBzdGFuZGFsb25lPSdubyc/PlxuXHRcdFx0PHN2ZyB3aWR0aD0nMTdweCcgaGVpZ2h0PScxNnB4JyB2aWV3Qm94PScwIDAgMTcgMTYnIHZlcnNpb249JzEuMScgeG1sbnM9J2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJyB4bWxuczp4bGluaz0naHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluaycgeG1sbnM6c2tldGNoPSdodHRwOi8vd3d3LmJvaGVtaWFuY29kaW5nLmNvbS9za2V0Y2gvbnMnPlxuXHRcdFx0XHQ8IS0tIEdlbmVyYXRvcjogU2tldGNoIDMuNS4yICgyNTIzNSkgLSBodHRwOi8vd3d3LmJvaGVtaWFuY29kaW5nLmNvbS9za2V0Y2ggLS0+XG5cdFx0XHRcdDx0aXRsZT46RDwvdGl0bGU+XG5cdFx0XHRcdDxkZXNjPkNyZWF0ZWQgd2l0aCBTa2V0Y2guPC9kZXNjPlxuXHRcdFx0XHQ8ZGVmcz48L2RlZnM+XG5cdFx0XHRcdDxnIGlkPSdpT1MtOS1LZXlib2FyZHMnIHN0cm9rZT0nbm9uZScgc3Ryb2tlLXdpZHRoPScxJyBmaWxsPSdub25lJyBmaWxsLXJ1bGU9J2V2ZW5vZGQnIHNrZXRjaDp0eXBlPSdNU1BhZ2UnPlxuXHRcdFx0XHRcdDxnIGlkPSdpUGhvbmUtNi1Qb3J0cmFpdC1MaWdodC1Db3B5JyBza2V0Y2g6dHlwZT0nTVNBcnRib2FyZEdyb3VwJyB0cmFuc2Zvcm09J3RyYW5zbGF0ZSgtODYuMDAwMDAwLCAtNjM4LjAwMDAwMCknPlxuXHRcdFx0XHRcdFx0PGcgaWQ9J0tleWJvYXJkcycgc2tldGNoOnR5cGU9J01TTGF5ZXJHcm91cCcgdHJhbnNmb3JtPSd0cmFuc2xhdGUoMC4wMDAwMDAsIDQwOC4wMDAwMDApJz5cblx0XHRcdFx0XHRcdFx0PGcgaWQ9JzpEJyB0cmFuc2Zvcm09J3RyYW5zbGF0ZSg4Ny4wMDAwMDAsIDIzMC41MDAwMDApJyBza2V0Y2g6dHlwZT0nTVNTaGFwZUdyb3VwJz5cblx0XHRcdFx0XHRcdFx0XHQ8Y2lyY2xlIGlkPSdIZWFkJyBzdHJva2U9JyM0QTU0NjEnIHN0cm9rZS13aWR0aD0nMC43ODk0NzM2ODQnIGN4PSc3LjUnIGN5PSc3LjUnIHI9JzcuNSc+PC9jaXJjbGU+XG5cdFx0XHRcdFx0XHRcdFx0PHBhdGggZD0nTTcuNSwxMy41MjYzMTU4IEMxMC4yNjg2OTA3LDEzLjUyNjMxNTggMTIuNTEzMTU3OSwxMC4zNjg0MjEyIDEyLjUxMzE1NzksOS4xODQyMTA0NSBDMTIuNTEzMTU3OSw3LjYwNTI2MzE3IDExLjQzODkwOTgsOS4xODQyMTA0MyA3LjUsOS4xODQyMTA1MyBDMy41NjEwOTAyMyw5LjE4NDIxMDYyIDIuNDg2ODQyMTEsNy42MDUyNjMxNyAyLjQ4Njg0MjExLDkuMTg0MjEwNDUgQzIuNDg2ODQyMTEsMTAuMzY4NDIxIDQuNzMxMzA5MzUsMTMuNTI2MzE1OCA3LjUsMTMuNTI2MzE1OCBaIE03LjUsMTAuOTYwNTI2MyBDOC45MzIzMzA4MywxMS4xNTc4OTQ3IDExLjc5Njk5MjUsMTAuMzY4NDIxIDExLjc5Njk5MjUsOS40NDQyMzU1MiBDMTEuNzk2OTkyNSw4Ljc4OTQ3MzY4IDEwLjg3NjIwODQsOS41Nzg5NDcyNyA3LjUsOS43NzYzMTU3OSBDNC4xMjM3OTE2Miw5LjU3ODk0NzQzIDMuMjAzMDA4NzIsOC43ODk0NzM2OSAzLjIwMzAwNzUyLDkuNDQ0MjM1NTIgQzMuMjAzMDA1ODIsMTAuMzY4NDIxIDYuMDY3NjY5MTcsMTEuMTU3ODk0NyA3LjUsMTAuOTYwNTI2MyBaJyBpZD0nU21pbGUnIGZpbGw9JyM0QTU0NjEnPjwvcGF0aD5cblx0XHRcdFx0XHRcdFx0XHQ8cGF0aCBkPSdNNS4yMzY4NDIxMSw2LjMyMzY1OTggQzUuNjQzNzg4NzYsNi4zMjM2NTk4IDUuOTczNjg0MjEsNS44ODE4MzU1NCA1Ljk3MzY4NDIxLDUuMzM2ODE3NjkgQzUuOTczNjg0MjEsNC43OTE3OTk4NSA1LjY0Mzc4ODc2LDQuMzQ5OTc1NTkgNS4yMzY4NDIxMSw0LjM0OTk3NTU5IEM0LjgyOTg5NTQ1LDQuMzQ5OTc1NTkgNC41LDQuNzkxNzk5ODUgNC41LDUuMzM2ODE3NjkgQzQuNSw1Ljg4MTgzNTU0IDQuODI5ODk1NDUsNi4zMjM2NTk4IDUuMjM2ODQyMTEsNi4zMjM2NTk4IFogTTkuNzM2ODQyMTEsNi4zMjM2NTk4IEMxMC4xNDM3ODg4LDYuMzIzNjU5OCAxMC40NzM2ODQyLDUuODgxODM1NTQgMTAuNDczNjg0Miw1LjMzNjgxNzY5IEMxMC40NzM2ODQyLDQuNzkxNzk5ODUgMTAuMTQzNzg4OCw0LjM0OTk3NTU5IDkuNzM2ODQyMTEsNC4zNDk5NzU1OSBDOS4zMjk4OTU0NSw0LjM0OTk3NTU5IDksNC43OTE3OTk4NSA5LDUuMzM2ODE3NjkgQzksNS44ODE4MzU1NCA5LjMyOTg5NTQ1LDYuMzIzNjU5OCA5LjczNjg0MjExLDYuMzIzNjU5OCBaJyBpZD0nRXllcycgZmlsbD0nIzRBNTQ2MSc+PC9wYXRoPlxuXHRcdFx0XHRcdFx0XHQ8L2c+XG5cdFx0XHRcdFx0XHQ8L2c+XG5cdFx0XHRcdFx0PC9nPlxuXHRcdFx0XHQ8L2c+XG5cdFx0XHQ8L3N2Zz5cIlxuXG5cdHN5bWJvbHM6IFwiPD94bWwgdmVyc2lvbj0nMS4wJyBlbmNvZGluZz0nVVRGLTgnIHN0YW5kYWxvbmU9J25vJz8+XG5cdFx0XHQ8c3ZnIHdpZHRoPScxNnB4JyBoZWlnaHQ9JzE3cHgnIHZpZXdCb3g9JzAgMCAxNSAxNycgdmVyc2lvbj0nMS4xJyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIHhtbG5zOnhsaW5rPSdodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rJyB4bWxuczpza2V0Y2g9J2h0dHA6Ly93d3cuYm9oZW1pYW5jb2RpbmcuY29tL3NrZXRjaC9ucyc+XG5cdFx0XHRcdDwhLS0gR2VuZXJhdG9yOiBTa2V0Y2ggMy41LjIgKDI1MjM1KSAtIGh0dHA6Ly93d3cuYm9oZW1pYW5jb2RpbmcuY29tL3NrZXRjaCAtLT5cblx0XHRcdFx0PHRpdGxlPk9iamVjdHMgJmFtcDsgU3ltYm9sczwvdGl0bGU+XG5cdFx0XHRcdDxkZXNjPkNyZWF0ZWQgd2l0aCBTa2V0Y2guPC9kZXNjPlxuXHRcdFx0XHQ8ZGVmcz48L2RlZnM+XG5cdFx0XHRcdDxnIGlkPSdpT1MtOS1LZXlib2FyZHMnIHN0cm9rZT0nbm9uZScgc3Ryb2tlLXdpZHRoPScxJyBmaWxsPSdub25lJyBmaWxsLXJ1bGU9J2V2ZW5vZGQnIHNrZXRjaDp0eXBlPSdNU1BhZ2UnPlxuXHRcdFx0XHRcdDxnIGlkPSdpUGhvbmUtNi1Qb3J0cmFpdC1MaWdodC1Db3B5JyBza2V0Y2g6dHlwZT0nTVNBcnRib2FyZEdyb3VwJyB0cmFuc2Zvcm09J3RyYW5zbGF0ZSgtMzA0LjAwMDAwMCwgLTYzOC4wMDAwMDApJyBmaWxsPScjNEE1NDYxJz5cblx0XHRcdFx0XHRcdDxnIGlkPSdLZXlib2FyZHMnIHNrZXRjaDp0eXBlPSdNU0xheWVyR3JvdXAnIHRyYW5zZm9ybT0ndHJhbnNsYXRlKDAuMDAwMDAwLCA0MDguMDAwMDAwKSc+XG5cdFx0XHRcdFx0XHRcdDxnIGlkPSdPYmplY3RzLSZhbXA7LVN5bWJvbHMnIHRyYW5zZm9ybT0ndHJhbnNsYXRlKDMwNC4wMDAwMDAsIDIzMC4wMDAwMDApJz5cblx0XHRcdFx0XHRcdFx0XHQ8ZyBpZD0nVGhpbmcnIHRyYW5zZm9ybT0ndHJhbnNsYXRlKDAuMDAwMDAwLCAwLjUwMDAwMCknIHNrZXRjaDp0eXBlPSdNU1NoYXBlR3JvdXAnPlxuXHRcdFx0XHRcdFx0XHRcdFx0PHJlY3QgaWQ9J1JlY3RhbmdsZS0xMjA5JyB4PScwJyB5PScwJyB3aWR0aD0nNycgaGVpZ2h0PScxJz48L3JlY3Q+XG5cdFx0XHRcdFx0XHRcdFx0XHQ8cmVjdCBpZD0nUmVjdGFuZ2xlLTEyMDknIHg9JzAnIHk9JzInIHdpZHRoPSc3JyBoZWlnaHQ9JzEnPjwvcmVjdD5cblx0XHRcdFx0XHRcdFx0XHRcdDxyZWN0IGlkPSdSZWN0YW5nbGUtMTIxMScgeD0nMycgeT0nMycgd2lkdGg9JzEnIGhlaWdodD0nNCc+PC9yZWN0PlxuXHRcdFx0XHRcdFx0XHRcdDwvZz5cblx0XHRcdFx0XHRcdFx0XHQ8cGF0aCBkPSdNMTEuNzUsMC4xNTkyNjM5NzggTDExLjc1LDAgTDExLDAgTDExLDUuMDkxNDkzIEMxMC41OTM0NCw0Ljk0MjIxMzkyIDEwLjA2Mzk2NjIsNC45NjQ1MzIyNCA5LjU1NzE1Mzk5LDUuMTkwMTc5NTcgQzguNjk4NDkyOTMsNS41NzI0ODAxIDguMjMwMDM4MzUsNi4zOTM2NTYyMSA4LjUxMDgzMTQxLDcuMDI0MzI3NzQgQzguNzkxNjI0NDcsNy42NTQ5OTkyOCA5LjcxNTMzNDU0LDcuODU2MzQzNzUgMTAuNTczOTk1Niw3LjQ3NDA0MzIxIEMxMS4yNzYxMTgzLDcuMTYxNDM4MDMgMTEuNzE3MzM5Myw2LjU1NTM4OTcyIDExLjcwMTM1OTUsNiBMMTEuNzUsNiBMMTEuNzUsMS4zOTM4NTA1NiBDMTIuMzE3NTkwOCwxLjU5NTkwMDM3IDEzLDIuMDgxNzQ1NiAxMywzLjI1IEMxMyw0LjI1IDEyLjc1LDUuNSAxMi43NSw1LjUgQzEyLjc1LDUuNSAxMy43NSw0Ljc1IDEzLjc1LDIuNSBDMTMuNzUsMS4wMjI1NjEwMSAxMi41NjQyNjc0LDAuNDA3NDczMDE5IDExLjc1LDAuMTU5MjYzOTc4IFonIGlkPSdOb3RlJyBza2V0Y2g6dHlwZT0nTVNTaGFwZUdyb3VwJz48L3BhdGg+XG5cdFx0XHRcdFx0XHRcdFx0PHRleHQgaWQ9JyZhbXA7JyBza2V0Y2g6dHlwZT0nTVNUZXh0TGF5ZXInIGZvbnQtZmFtaWx5PSdTRiBVSSBEaXNwbGF5JyBmb250LXNpemU9JzkuNScgZm9udC13ZWlnaHQ9J25vcm1hbCc+XG5cdFx0XHRcdFx0XHRcdFx0XHQ8dHNwYW4geD0nMC4yNScgeT0nMTYnPiZhbXA7PC90c3Bhbj5cblx0XHRcdFx0XHRcdFx0XHQ8L3RleHQ+XG5cdFx0XHRcdFx0XHRcdFx0PHRleHQgaWQ9JyUnIHNrZXRjaDp0eXBlPSdNU1RleHRMYXllcicgZm9udC1mYW1pbHk9J1NGIFVJIERpc3BsYXknIGZvbnQtc2l6ZT0nOS41JyBmb250LXdlaWdodD0nbm9ybWFsJz5cblx0XHRcdFx0XHRcdFx0XHRcdDx0c3BhbiB4PSc3Ljc1JyB5PScxNic+JTwvdHNwYW4+XG5cdFx0XHRcdFx0XHRcdFx0PC90ZXh0PlxuXHRcdFx0XHRcdFx0XHQ8L2c+XG5cdFx0XHRcdFx0XHQ8L2c+XG5cdFx0XHRcdFx0PC9nPlxuXHRcdFx0XHQ8L2c+XG5cdFx0XHQ8L3N2Zz5cIlxuXHR0cmF2ZWw6IFwiPD94bWwgdmVyc2lvbj0nMS4wJyBlbmNvZGluZz0nVVRGLTgnIHN0YW5kYWxvbmU9J25vJz8+XG5cdFx0XHQ8c3ZnIHdpZHRoPScxN3B4JyBoZWlnaHQ9JzE2cHgnIHZpZXdCb3g9JzAgMCAxNyAxNicgdmVyc2lvbj0nMS4xJyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIHhtbG5zOnhsaW5rPSdodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rJyB4bWxuczpza2V0Y2g9J2h0dHA6Ly93d3cuYm9oZW1pYW5jb2RpbmcuY29tL3NrZXRjaC9ucyc+XG5cdFx0XHRcdDwhLS0gR2VuZXJhdG9yOiBTa2V0Y2ggMy41LjIgKDI1MjM1KSAtIGh0dHA6Ly93d3cuYm9oZW1pYW5jb2RpbmcuY29tL3NrZXRjaCAtLT5cblx0XHRcdFx0PHRpdGxlPlRyYW5zcG9ydDwvdGl0bGU+XG5cdFx0XHRcdDxkZXNjPkNyZWF0ZWQgd2l0aCBTa2V0Y2guPC9kZXNjPlxuXHRcdFx0XHQ8ZGVmcz48L2RlZnM+XG5cdFx0XHRcdDxnIGlkPSdpT1MtOS1LZXlib2FyZHMnIHN0cm9rZT0nbm9uZScgc3Ryb2tlLXdpZHRoPScxJyBmaWxsPSdub25lJyBmaWxsLXJ1bGU9J2V2ZW5vZGQnIHNrZXRjaDp0eXBlPSdNU1BhZ2UnPlxuXHRcdFx0XHRcdDxnIGlkPSdpUGhvbmUtNi1Qb3J0cmFpdC1MaWdodC1Db3B5JyBza2V0Y2g6dHlwZT0nTVNBcnRib2FyZEdyb3VwJyB0cmFuc2Zvcm09J3RyYW5zbGF0ZSgtMjQxLjAwMDAwMCwgLTYzOC4wMDAwMDApJz5cblx0XHRcdFx0XHRcdDxnIGlkPSdLZXlib2FyZHMnIHNrZXRjaDp0eXBlPSdNU0xheWVyR3JvdXAnIHRyYW5zZm9ybT0ndHJhbnNsYXRlKDAuMDAwMDAwLCA0MDguMDAwMDAwKSc+XG5cdFx0XHRcdFx0XHRcdDxnIGlkPSdUcmFuc3BvcnQnIHRyYW5zZm9ybT0ndHJhbnNsYXRlKDI0MS41MDAwMDAsIDIzMC4wMDAwMDApJyBza2V0Y2g6dHlwZT0nTVNTaGFwZUdyb3VwJz5cblx0XHRcdFx0XHRcdFx0XHQ8cGF0aCBkPSdNMCw2IEwxLDYgTDEsMTUgTDAsMTUgTDAsNiBaIE0xNSw0IEwxNiw0IEwxNiwxNSBMMTUsMTUgTDE1LDQgWiBNMy41LDAgTDQuNSwwIEw0LjUsNyBMMy41LDcgTDMuNSwwIFogTTEsNiBMMy41LDYgTDMuNSw3IEwxLDcgTDEsNiBaIE00LjUsMCBMOS41LDAgTDkuNSwxIEw0LjUsMSBMNC41LDAgWiBNOS41LDAgTDEwLjUsMCBMMTAuNSw2IEw5LjUsNiBMOS41LDAgWiBNMTAuNSw0IEwxNSw0IEwxNSw1IEwxMC41LDUgTDEwLjUsNCBaJyBpZD0nU2t5bGluZScgZmlsbD0nIzRBNTQ2MSc+PC9wYXRoPlxuXHRcdFx0XHRcdFx0XHRcdDxnIGlkPSdXaW5kb3dzJyB0cmFuc2Zvcm09J3RyYW5zbGF0ZSgyLjAwMDAwMCwgMi4wMDAwMDApJyBmaWxsPScjNEE1NDYxJz5cblx0XHRcdFx0XHRcdFx0XHRcdDxyZWN0IGlkPSdXaW5kb3cnIHg9JzAnIHk9JzYnIHdpZHRoPScxJyBoZWlnaHQ9JzEnPjwvcmVjdD5cblx0XHRcdFx0XHRcdFx0XHRcdDxyZWN0IGlkPSdXaW5kb3cnIHg9JzMuNScgeT0nMCcgd2lkdGg9JzEnIGhlaWdodD0nMSc+PC9yZWN0PlxuXHRcdFx0XHRcdFx0XHRcdFx0PHJlY3QgaWQ9J1dpbmRvdycgeD0nNS41JyB5PScwJyB3aWR0aD0nMScgaGVpZ2h0PScxJz48L3JlY3Q+XG5cdFx0XHRcdFx0XHRcdFx0XHQ8cmVjdCBpZD0nV2luZG93JyB4PSc1LjUnIHk9JzInIHdpZHRoPScxJyBoZWlnaHQ9JzEnPjwvcmVjdD5cblx0XHRcdFx0XHRcdFx0XHRcdDxyZWN0IGlkPSdXaW5kb3cnIHg9JzMuNScgeT0nMicgd2lkdGg9JzEnIGhlaWdodD0nMSc+PC9yZWN0PlxuXHRcdFx0XHRcdFx0XHRcdFx0PHJlY3QgaWQ9J1dpbmRvdycgeD0nMTEnIHk9JzQnIHdpZHRoPScxJyBoZWlnaHQ9JzEnPjwvcmVjdD5cblx0XHRcdFx0XHRcdFx0XHRcdDxyZWN0IGlkPSdXaW5kb3cnIHg9JzExJyB5PSc2JyB3aWR0aD0nMScgaGVpZ2h0PScxJz48L3JlY3Q+XG5cdFx0XHRcdFx0XHRcdFx0PC9nPlxuXHRcdFx0XHRcdFx0XHRcdDxnIGlkPSdDYXInIHRyYW5zZm9ybT0ndHJhbnNsYXRlKDIuNTAwMDAwLCA2LjUwMDAwMCknPlxuXHRcdFx0XHRcdFx0XHRcdFx0PHBhdGggZD0nTTguNSw4IEwyLjUsOCBMMi41LDkuNSBMMC41LDkuNSBMMC41LDcuODY4MTE0NSBDMC4yMDEyMDIxOTIsNy42OTU4MjcwMiAwLDcuMzcwOTEzNjMgMCw2Ljk5MDYzMTEgTDAsNS4wMDkzNjg5IEMwLDQuNDUxOTA5ODUgMC40NDQ4MzY5NzQsNCAwLjk5NTU3NzQ5OSw0IEwxMC4wMDQ0MjI1LDQgQzEwLjU1NDI2NDgsNCAxMSw0LjQ0MzM1MzE4IDExLDUuMDA5MzY4OSBMMTEsNi45OTA2MzExIEMxMSw3LjM2NTMzMTUgMTAuNzk5MDI0NCw3LjY5MjM0NTE5IDEwLjUsNy44NjY0OTAwMiBMMTAuNSw5LjUgTDguNSw5LjUgTDguNSw4IFogTTEuNzUsNi41IEMyLjE2NDIxMzU2LDYuNSAyLjUsNi4xNjQyMTM1NiAyLjUsNS43NSBDMi41LDUuMzM1Nzg2NDQgMi4xNjQyMTM1Niw1IDEuNzUsNSBDMS4zMzU3ODY0NCw1IDEsNS4zMzU3ODY0NCAxLDUuNzUgQzEsNi4xNjQyMTM1NiAxLjMzNTc4NjQ0LDYuNSAxLjc1LDYuNSBaIE05LjI1LDYuNSBDOS42NjQyMTM1Niw2LjUgMTAsNi4xNjQyMTM1NiAxMCw1Ljc1IEMxMCw1LjMzNTc4NjQ0IDkuNjY0MjEzNTYsNSA5LjI1LDUgQzguODM1Nzg2NDQsNSA4LjUsNS4zMzU3ODY0NCA4LjUsNS43NSBDOC41LDYuMTY0MjEzNTYgOC44MzU3ODY0NCw2LjUgOS4yNSw2LjUgWiBNMC41LDcgTDEwLjUsNyBMMTAuNSw3LjUgTDAuNSw3LjUgTDAuNSw3IFogTTMsNi41IEw4LDYuNSBMOCw3IEwzLDcgTDMsNi41IFonIGlkPSdCb2R5JyBmaWxsPScjNEE1NDYxJz48L3BhdGg+XG5cdFx0XHRcdFx0XHRcdFx0XHQ8cGF0aCBkPSdNMS41LDQuNSBMMS41LDMgQzEuNSwxLjM0MzE0NTc1IDIuODM5MDIwMTMsMCA0LjUwMTY2NTQ3LDAgTDYuNDk4MzM0NTMsMCBDOC4xNTYxMDg1OSwwIDkuNSwxLjM0NjUxNzEyIDkuNSwzIEw5LjUsNScgaWQ9J1Jvb2YnIHN0cm9rZT0nIzRBNTQ2MSc+PC9wYXRoPlxuXHRcdFx0XHRcdFx0XHRcdDwvZz5cblx0XHRcdFx0XHRcdFx0PC9nPlxuXHRcdFx0XHRcdFx0PC9nPlxuXHRcdFx0XHRcdDwvZz5cblx0XHRcdFx0PC9nPlxuXHRcdFx0PC9zdmc+XCJcbn1cblxuXG5leHBvcnRzLmZyYW1lckZyYW1lcyA9XG5cdDY0MDoyXG5cdDc1MDoyXG5cdDc2ODoyXG5cdDEwODA6M1xuXHQxMjQyOjNcblx0MTQ0MDo0XG5cdDE1MzY6MlxuXG4jIERldmljZSBmcmFtZXNcbmV4cG9ydHMucmVhbERldmljZXMgPVxuXHQzMjA6XG5cdFx0NDgwOlxuXHRcdFx0bmFtZTpcImlQaG9uZVwiXG5cdFx0XHR3aWR0aDozMjBcblx0XHRcdGhlaWdodDo0ODBcblx0XHRcdHNjYWxlOjFcblx0NDgwOlxuXHRcdDg1NDpcblx0XHRcdG5hbWU6XCJBbmRyb2lkIE9uZVwiXG5cdFx0XHR3aWR0aDo0ODBcblx0XHRcdGhlaWdodDo4NTRcblx0XHRcdHNjYWxlOjEuNVxuXG5cdDY0MDpcblx0XHQ5NjA6XG5cdFx0XHRuYW1lOlwiaVBob25lIDRcIlxuXHRcdFx0d2lkdGg6NjQwXG5cdFx0XHRoZWlnaHQ6OTYwXG5cdFx0XHRzY2FsZToyXG5cdFx0MTEzNjpcblx0XHRcdG5hbWU6XCJpUGhvbmUgNVwiXG5cdFx0XHR3aWR0aDo2NDBcblx0XHRcdGhlaWdodDoxMTM2XG5cdFx0XHRzY2FsZToyXG5cdDcyMDpcblx0XHQxMjgwOlxuXHRcdFx0bmFtZTpcIlhIRFBJXCJcblx0XHRcdHdpZHRoOjcyMFxuXHRcdFx0aGVpZ2h0OjEyODBcblx0XHRcdHNjYWxlOjJcblx0NzUwOlxuXHRcdDExMTg6XG5cdFx0XHRuYW1lOlwiaVBob25lIDZcIlxuXHRcdFx0d2lkdGg6NzUwXG5cdFx0XHRoZWlnaHQ6MTExOFxuXHRcdFx0c2NhbGU6MlxuXHRcdDEzMzQ6XG5cdFx0XHRuYW1lOlwiaVBob25lIDZcIlxuXHRcdFx0d2lkdGg6NzUwXG5cdFx0XHRoZWlnaHQ6MTMzNFxuXHRcdFx0c2NhbGU6MlxuXHQ3Njg6XG5cdFx0MTAyNDpcblx0XHRcdG5hbWU6XCJpUGFkXCJcblx0XHRcdHdpZHRoOjc2OFxuXHRcdFx0aGVpZ2h0OjEwMjRcblx0XHRcdHNjYWxlOjFcblx0XHQxMjgwOlxuXHRcdFx0bmFtZTpcIk5leHVzIDRcIlxuXHRcdFx0d2lkdGg6NzY4XG5cdFx0XHRoZWlnaHQ6MTI4MFxuXHRcdFx0c2NhbGU6MlxuXHQ4MDA6XG5cdFx0MTI4MDpcblx0XHRcdG5hbWU6XCJOZXh1cyA3XCJcblx0XHRcdHdpZHRoOjgwMFxuXHRcdFx0aGVpZ2h0OjEyODBcblx0XHRcdHNjYWxlOjFcblx0MTA4MDpcblx0XHQxOTIwOlxuXHRcdFx0bmFtZTpcIlhYSERQSVwiXG5cdFx0XHR3aWR0aDoxMDgwXG5cdFx0XHRoZWlnaHQ6MTkyMFxuXHRcdFx0c2NhbGU6M1xuXHQxMjAwOlxuXHRcdDE5MjA6XG5cdFx0XHRuYW1lOlwiTmV4dXMgN1wiXG5cdFx0XHR3aWR0aDoxMjAwXG5cdFx0XHRoZWlnaHQ6MTkyMFxuXHRcdFx0c2NhbGU6MlxuXHQxMjQyOlxuXHRcdDIyMDg6XG5cdFx0XHRuYW1lOlwiaVBob25lIDYgUGx1c1wiXG5cdFx0XHR3aWR0aDoxMjQyXG5cdFx0XHRoZWlnaHQ6MjIwOFxuXHRcdFx0c2NhbGU6M1xuXHQxNDQwOlxuXHRcdDI1NjA6XG5cdFx0XHRuYW1lOlwiWFhYSERQSVwiXG5cdFx0XHR3aWR0aDoxNDQwXG5cdFx0XHRoZWlnaHQ6MjU2MFxuXHRcdFx0c2NhbGU6NFxuXHQxNDQxOlxuXHRcdDI1NjE6XG5cdFx0XHRuYW1lOlwiTmV4dXMgNlwiXG5cdFx0XHR3aWR0aDoxNDQwXG5cdFx0XHRoZWlnaHQ6MjU2MFxuXHRcdFx0c2NhbGU6NFxuXHQxNTM2OlxuXHRcdDIwNDg6XG5cdFx0XHRuYW1lOlwiaVBhZFwiXG5cdFx0XHR3aWR0aDoxNTM2XG5cdFx0XHRoZWlnaHQ6MjA0OFxuXHRcdFx0c2NhbGU6MlxuXHQxNjAwOlxuXHRcdDIwNTY6XG5cdFx0XHRuYW1lOlwiTmV4dXMgMTBcIlxuXHRcdFx0d2lkdGg6MTYwMFxuXHRcdFx0aGVpZ2h0OjIwNTZcblx0XHRcdHNjYWxlOjJcblx0MjA0ODpcblx0XHQxNTM2OlxuXHRcdFx0bmFtZTpcIk5leHVzIDlcIlxuXHRcdFx0d2lkdGg6MjA0OFxuXHRcdFx0aGVpZ2h0OjE1MzZcblx0XHRcdHNjYWxlOjJcblx0XHQyNzMyOlxuXHRcdFx0bmFtZTpcImlQYWQgUHJvXCJcblx0XHRcdHdpZHRoOjIwNDhcblx0XHRcdGhlaWdodDoyNzMyXG5cdFx0XHRzY2FsZToyXG5cdDI1NjA6XG5cdFx0MTYwMDpcblx0XHRcdG5hbWU6XCJOZXh1cyAxMFwiXG5cdFx0XHR3aWR0aDoyNTYwXG5cdFx0XHRoZWlnaHQ6MTYwMFxuXHRcdFx0c2NhbGU6MlxuXHQyNzMyOlxuXHRcdDIwNDg6XG5cdFx0XHRuYW1lOlwiaVBhZCBQcm9cIlxuXHRcdFx0d2lkdGg6MjczMlxuXHRcdFx0aGVpZ2h0OjIwNDhcblx0XHRcdHNjYWxlOjJcblxuXG5leHBvcnRzLmNvbG9ycyA9XG5cdHJlZDpcIiNGNDQzMzZcIlxuXHRyZWQ1MDpcIiNGRkVCRUVcIlxuXHRyZWQxMDA6XCIjRkZDREQyXCJcblx0cmVkMjAwOlwiI0VGOUE5QVwiXG5cdHJlZDMwMDpcIiNFNTczNzNcIlxuXHRyZWQ0MDA6XCIjRUY1MzUwXCJcblx0cmVkNTAwOlwiI0Y0NDMzNlwiXG5cdHJlZDYwMDpcIiNFNTM5MzVcIlxuXHRyZWQ3MDA6XCIjRDMyRjJGXCJcblx0cmVkODAwOlwiI0M2MjgyOFwiXG5cdHJlZDkwMDpcIiNCNzFDMUNcIlxuXHRyZWRBMTAwOlwiI0ZGOEE4MFwiXG5cdHJlZEEyMDA6XCIjRkY1MjUyXCJcblx0cmVkQTQwMDpcIiNGRjE3NDRcIlxuXHRyZWRBNzAwOlwiI0Q1MDAwMFwiXG5cdHBpbms6XCIjRTkxRTYzXCJcblx0cGluazUwOlwiI0ZDRTRFQ1wiXG5cdHBpbmsxMDA6XCIjRjhCQkQwXCJcblx0cGluazIwMDpcIiNGNDhGQjFcIlxuXHRwaW5rMzAwOlwiI0YwNjI5MlwiXG5cdHBpbms0MDA6XCIjRUM0MDdBXCJcblx0cGluazUwMDpcIiNFOTFFNjNcIlxuXHRwaW5rNjAwOlwiI0Q4MUI2MFwiXG5cdHBpbms3MDA6XCIjQzIxODVCXCJcblx0cGluazgwMDpcIiNBRDE0NTdcIlxuXHRwaW5rOTAwOlwiIzg4MEU0RlwiXG5cdHBpbmtBMTAwOlwiI0ZGODBBQlwiXG5cdHBpbmtBMjAwOlwiI0ZGNDA4MVwiXG5cdHBpbmtBNDAwOlwiI0Y1MDA1N1wiXG5cdHBpbmtBNzAwOlwiI0M1MTE2MlwiXG5cdHB1cnBsZTpcIiM5QzI3QjBcIlxuXHRwdXJwbGU1MDpcIiNGM0U1RjVcIlxuXHRwdXJwbGUxMDA6XCIjRTFCRUU3XCJcblx0cHVycGxlMjAwOlwiI0NFOTNEOFwiXG5cdHB1cnBsZTMwMDpcIiNCQTY4QzhcIlxuXHRwdXJwbGU0MDA6XCIjQUI0N0JDXCJcblx0cHVycGxlNTAwOlwiIzlDMjdCMFwiXG5cdHB1cnBsZTYwMDpcIiM4RTI0QUFcIlxuXHRwdXJwbGU3MDA6XCIjN0IxRkEyXCJcblx0cHVycGxlODAwOlwiIzZBMUI5QVwiXG5cdHB1cnBsZTkwMDpcIiM0QTE0OENcIlxuXHRwdXJwbGVBMTAwOlwiI0VBODBGQ1wiXG5cdHB1cnBsZUEyMDA6XCIjRTA0MEZCXCJcblx0cHVycGxlQTQwMDpcIiNENTAwRjlcIlxuXHRwdXJwbGVBNzAwOlwiI0FBMDBGRlwiXG5cdGRlZXBQdXJwbGU6XCIjNjczQUI3XCJcblx0ZGVlcFB1cnBsZTUwOlwiI0VERTdGNlwiXG5cdGRlZXBQdXJwbGUxMDA6XCIjRDFDNEU5XCJcblx0ZGVlcFB1cnBsZTIwMDpcIiNCMzlEREJcIlxuXHRkZWVwUHVycGxlMzAwOlwiIzk1NzVDRFwiXG5cdGRlZXBQdXJwbGU0MDA6XCIjN0U1N0MyXCJcblx0ZGVlcFB1cnBsZTUwMDpcIiM2NzNBQjdcIlxuXHRkZWVwUHVycGxlNjAwOlwiIzVFMzVCMVwiXG5cdGRlZXBQdXJwbGU3MDA6XCIjNTEyREE4XCJcblx0ZGVlcFB1cnBsZTgwMDpcIiM0NTI3QTBcIlxuXHRkZWVwUHVycGxlOTAwOlwiIzMxMUI5MlwiXG5cdGRlZXBQdXJwbGVBMTAwOlwiI0IzODhGRlwiXG5cdGRlZXBQdXJwbGVBMjAwOlwiIzdDNERGRlwiXG5cdGRlZXBQdXJwbGVBNDAwOlwiIzY1MUZGRlwiXG5cdGRlZXBQdXJwbGVBNzAwOlwiIzYyMDBFQVwiXG5cdGluZGlnbzpcIiMzRjUxQjVcIlxuXHRpbmRpZ281MDpcIiNFOEVBRjZcIlxuXHRpbmRpZ28xMDA6XCIjQzVDQUU5XCJcblx0aW5kaWdvMjAwOlwiIzlGQThEQVwiXG5cdGluZGlnbzMwMDpcIiM3OTg2Q0JcIlxuXHRpbmRpZ280MDA6XCIjNUM2QkMwXCJcblx0aW5kaWdvNTAwOlwiIzNGNTFCNVwiXG5cdGluZGlnbzYwMDpcIiMzOTQ5QUJcIlxuXHRpbmRpZ283MDA6XCIjMzAzRjlGXCJcblx0aW5kaWdvODAwOlwiIzI4MzU5M1wiXG5cdGluZGlnbzkwMDpcIiMxQTIzN0VcIlxuXHRpbmRpZ29BMTAwOlwiIzhDOUVGRlwiXG5cdGluZGlnb0EyMDA6XCIjNTM2REZFXCJcblx0aW5kaWdvQTQwMDpcIiMzRDVBRkVcIlxuXHRpbmRpZ29BNzAwOlwiIzMwNEZGRVwiXG5cdGJsdWU6XCIjMjE5NkYzXCJcblx0Ymx1ZTUwOlwiI0UzRjJGRFwiXG5cdGJsdWUxMDA6XCIjQkJERUZCXCJcblx0Ymx1ZTIwMDpcIiM5MENBRjlcIlxuXHRibHVlMzAwOlwiIzY0QjVGNlwiXG5cdGJsdWU0MDA6XCIjNDJBNUY1XCJcblx0Ymx1ZTUwMDpcIiMyMTk2RjNcIlxuXHRibHVlNjAwOlwiIzFFODhFNVwiXG5cdGJsdWU3MDA6XCIjMTk3NkQyXCJcblx0Ymx1ZTgwMDpcIiMxNTY1QzBcIlxuXHRibHVlOTAwOlwiIzBENDdBMVwiXG5cdGJsdWVBMTAwOlwiIzgyQjFGRlwiXG5cdGJsdWVBMjAwOlwiIzQ0OEFGRlwiXG5cdGJsdWVBNDAwOlwiIzI5NzlGRlwiXG5cdGJsdWVBNzAwOlwiIzI5NjJGRlwiXG5cdGxpZ2h0Qmx1ZTpcIiMwM0E5RjRcIlxuXHRsaWdodEJsdWU1MDpcIiNFMUY1RkVcIlxuXHRsaWdodEJsdWUxMDA6XCIjQjNFNUZDXCJcblx0bGlnaHRCbHVlMjAwOlwiIzgxRDRGQVwiXG5cdGxpZ2h0Qmx1ZTMwMDpcIiM0RkMzRjdcIlxuXHRsaWdodEJsdWU0MDA6XCIjMjlCNkY2XCJcblx0bGlnaHRCbHVlNTAwOlwiIzAzQTlGNFwiXG5cdGxpZ2h0Qmx1ZTYwMDpcIiMwMzlCRTVcIlxuXHRsaWdodEJsdWU3MDA6XCIjMDI4OEQxXCJcblx0bGlnaHRCbHVlODAwOlwiIzAyNzdCRFwiXG5cdGxpZ2h0Qmx1ZTkwMDpcIiMwMTU3OUJcIlxuXHRsaWdodEJsdWVBMTAwOlwiIzgwRDhGRlwiXG5cdGxpZ2h0Qmx1ZUEyMDA6XCIjNDBDNEZGXCJcblx0bGlnaHRCbHVlQTQwMDpcIiMwMEIwRkZcIlxuXHRsaWdodEJsdWVBNzAwOlwiIzAwOTFFQVwiXG5cdGN5YW46XCIjMDBCQ0Q0XCJcblx0Y3lhbjUwOlwiI0UwRjdGQVwiXG5cdGN5YW4xMDA6XCIjQjJFQkYyXCJcblx0Y3lhbjIwMDpcIiM4MERFRUFcIlxuXHRjeWFuMzAwOlwiIzRERDBFMVwiXG5cdGN5YW40MDA6XCIjMjZDNkRBXCJcblx0Y3lhbjUwMDpcIiMwMEJDRDRcIlxuXHRjeWFuNjAwOlwiIzAwQUNDMVwiXG5cdGN5YW43MDA6XCIjMDA5N0E3XCJcblx0Y3lhbjgwMDpcIiMwMDgzOEZcIlxuXHRjeWFuOTAwOlwiIzAwNjA2NFwiXG5cdGN5YW5BMTAwOlwiIzg0RkZGRlwiXG5cdGN5YW5BMjAwOlwiIzE4RkZGRlwiXG5cdGN5YW5BNDAwOlwiIzAwRTVGRlwiXG5cdGN5YW5BNzAwOlwiIzAwQjhENFwiXG5cdHRlYWw6XCIjMDA5Njg4XCJcblx0dGVhbDUwOlwiI0UwRjJGMVwiXG5cdHRlYWwxMDA6XCIjQjJERkRCXCJcblx0dGVhbDIwMDpcIiM4MENCQzRcIlxuXHR0ZWFsMzAwOlwiIzREQjZBQ1wiXG5cdHRlYWw0MDA6XCIjMjZBNjlBXCJcblx0dGVhbDUwMDpcIiMwMDk2ODhcIlxuXHR0ZWFsNjAwOlwiIzAwODk3QlwiXG5cdHRlYWw3MDA6XCIjMDA3OTZCXCJcblx0dGVhbDgwMDpcIiMwMDY5NUNcIlxuXHR0ZWFsOTAwOlwiIzAwNEQ0MFwiXG5cdHRlYWxBMTAwOlwiI0E3RkZFQlwiXG5cdHRlYWxBMjAwOlwiIzY0RkZEQVwiXG5cdHRlYWxBNDAwOlwiIzFERTlCNlwiXG5cdHRlYWxBNzAwOlwiIzAwQkZBNVwiXG5cdGdyZWVuOlwiIzRDQUY1MFwiXG5cdGdyZWVuNTA6XCIjRThGNUU5XCJcblx0Z3JlZW4xMDA6XCIjQzhFNkM5XCJcblx0Z3JlZW4yMDA6XCIjQTVENkE3XCJcblx0Z3JlZW4zMDA6XCIjODFDNzg0XCJcblx0Z3JlZW40MDA6XCIjNjZCQjZBXCJcblx0Z3JlZW41MDA6XCIjNENBRjUwXCJcblx0Z3JlZW42MDA6XCIjNDNBMDQ3XCJcblx0Z3JlZW43MDA6XCIjMzg4RTNDXCJcblx0Z3JlZW44MDA6XCIjMkU3RDMyXCJcblx0Z3JlZW45MDA6XCIjMUI1RTIwXCJcblx0Z3JlZW5BMTAwOlwiI0I5RjZDQVwiXG5cdGdyZWVuQTIwMDpcIiM2OUYwQUVcIlxuXHRncmVlbkE0MDA6XCIjMDBFNjc2XCJcblx0Z3JlZW5BNzAwOlwiIzAwQzg1M1wiXG5cdGxpZ2h0R3JlZW46XCIjOEJDMzRBXCJcblx0bGlnaHRHcmVlbjUwOlwiI0YxRjhFOVwiXG5cdGxpZ2h0R3JlZW4xMDA6XCIjRENFREM4XCJcblx0bGlnaHRHcmVlbjIwMDpcIiNDNUUxQTVcIlxuXHRsaWdodEdyZWVuMzAwOlwiI0FFRDU4MVwiXG5cdGxpZ2h0R3JlZW40MDA6XCIjOUNDQzY1XCJcblx0bGlnaHRHcmVlbjUwMDpcIiM4QkMzNEFcIlxuXHRsaWdodEdyZWVuNjAwOlwiIzdDQjM0MlwiXG5cdGxpZ2h0R3JlZW43MDA6XCIjNjg5RjM4XCJcblx0bGlnaHRHcmVlbjgwMDpcIiM1NThCMkZcIlxuXHRsaWdodEdyZWVuOTAwOlwiIzMzNjkxRVwiXG5cdGxpZ2h0R3JlZW5BMTAwOlwiI0NDRkY5MFwiXG5cdGxpZ2h0R3JlZW5BMjAwOlwiI0IyRkY1OVwiXG5cdGxpZ2h0R3JlZW5BNDAwOlwiIzc2RkYwM1wiXG5cdGxpZ2h0R3JlZW5BNzAwOlwiIzY0REQxN1wiXG5cdGxpbWU6XCIjQ0REQzM5XCJcblx0bGltZTUwOlwiI0Y5RkJFN1wiXG5cdGxpbWUxMDA6XCIjRjBGNEMzXCJcblx0bGltZTIwMDpcIiNFNkVFOUNcIlxuXHRsaW1lMzAwOlwiI0RDRTc3NVwiXG5cdGxpbWU0MDA6XCIjRDRFMTU3XCJcblx0bGltZTUwMDpcIiNDRERDMzlcIlxuXHRsaW1lNjAwOlwiI0MwQ0EzM1wiXG5cdGxpbWU3MDA6XCIjQUZCNDJCXCJcblx0bGltZTgwMDpcIiM5RTlEMjRcIlxuXHRsaW1lOTAwOlwiIzgyNzcxN1wiXG5cdGxpbWVBMTAwOlwiI0Y0RkY4MVwiXG5cdGxpbWVBMjAwOlwiI0VFRkY0MVwiXG5cdGxpbWVBNDAwOlwiI0M2RkYwMFwiXG5cdGxpbWVBNzAwOlwiI0FFRUEwMFwiXG5cdHllbGxvdzpcIiNGRkVCM0JcIlxuXHR5ZWxsb3c1MDpcIiNGRkZERTdcIlxuXHR5ZWxsb3cxMDA6XCIjRkZGOUM0XCJcblx0eWVsbG93MjAwOlwiI0ZGRjU5RFwiXG5cdHllbGxvdzMwMDpcIiNGRkYxNzZcIlxuXHR5ZWxsb3c0MDA6XCIjRkZFRTU4XCJcblx0eWVsbG93NTAwOlwiI0ZGRUIzQlwiXG5cdHllbGxvdzYwMDpcIiNGREQ4MzVcIlxuXHR5ZWxsb3c3MDA6XCIjRkJDMDJEXCJcblx0eWVsbG93ODAwOlwiI0Y5QTgyNVwiXG5cdHllbGxvdzkwMDpcIiNGNTdGMTdcIlxuXHR5ZWxsb3dBMTAwOlwiI0ZGRkY4RFwiXG5cdHllbGxvd0EyMDA6XCIjRkZGRjAwXCJcblx0eWVsbG93QTQwMDpcIiNGRkVBMDBcIlxuXHR5ZWxsb3dBNzAwOlwiI0ZGRDYwMFwiXG5cdGFtYmVyOlwiI0ZGQzEwN1wiXG5cdGFtYmVyNTA6XCIjRkZGOEUxXCJcblx0YW1iZXIxMDA6XCIjRkZFQ0IzXCJcblx0YW1iZXIyMDA6XCIjRkZFMDgyXCJcblx0YW1iZXIzMDA6XCIjRkZENTRGXCJcblx0YW1iZXI0MDA6XCIjRkZDQTI4XCJcblx0YW1iZXI1MDA6XCIjRkZDMTA3XCJcblx0YW1iZXI2MDA6XCIjRkZCMzAwXCJcblx0YW1iZXI3MDA6XCIjRkZBMDAwXCJcblx0YW1iZXI4MDA6XCIjRkY4RjAwXCJcblx0YW1iZXI5MDA6XCIjRkY2RjAwXCJcblx0YW1iZXJBMTAwOlwiI0ZGRTU3RlwiXG5cdGFtYmVyQTIwMDpcIiNGRkQ3NDBcIlxuXHRhbWJlckE0MDA6XCIjRkZDNDAwXCJcblx0YW1iZXJBNzAwOlwiI0ZGQUIwMFwiXG5cdG9yYW5nZTpcIiNGRjk4MDBcIlxuXHRvcmFuZ2U1MDpcIiNGRkYzRTBcIlxuXHRvcmFuZ2UxMDA6XCIjRkZFMEIyXCJcblx0b3JhbmdlMjAwOlwiI0ZGQ0M4MFwiXG5cdG9yYW5nZTMwMDpcIiNGRkI3NERcIlxuXHRvcmFuZ2U0MDA6XCIjRkZBNzI2XCJcblx0b3JhbmdlNTAwOlwiI0ZGOTgwMFwiXG5cdG9yYW5nZTYwMDpcIiNGQjhDMDBcIlxuXHRvcmFuZ2U3MDA6XCIjRjU3QzAwXCJcblx0b3JhbmdlODAwOlwiI0VGNkMwMFwiXG5cdG9yYW5nZTkwMDpcIiNFNjUxMDBcIlxuXHRvcmFuZ2VBMTAwOlwiI0ZGRDE4MFwiXG5cdG9yYW5nZUEyMDA6XCIjRkZBQjQwXCJcblx0b3JhbmdlQTQwMDpcIiNGRjkxMDBcIlxuXHRvcmFuZ2VBNzAwOlwiI0ZGNkQwMFwiXG5cdGRlZXBPcmFuZ2U6XCIjRkY1NzIyXCJcblx0ZGVlcE9yYW5nZTUwOlwiI0ZCRTlFN1wiXG5cdGRlZXBPcmFuZ2UxMDA6XCIjRkZDQ0JDXCJcblx0ZGVlcE9yYW5nZTIwMDpcIiNGRkFCOTFcIlxuXHRkZWVwT3JhbmdlMzAwOlwiI0ZGOEE2NVwiXG5cdGRlZXBPcmFuZ2U0MDA6XCIjRkY3MDQzXCJcblx0ZGVlcE9yYW5nZTUwMDpcIiNGRjU3MjJcIlxuXHRkZWVwT3JhbmdlNjAwOlwiI0Y0NTExRVwiXG5cdGRlZXBPcmFuZ2U3MDA6XCIjRTY0QTE5XCJcblx0ZGVlcE9yYW5nZTgwMDpcIiNEODQzMTVcIlxuXHRkZWVwT3JhbmdlOTAwOlwiI0JGMzYwQ1wiXG5cdGRlZXBPcmFuZ2VBMTAwOlwiI0ZGOUU4MFwiXG5cdGRlZXBPcmFuZ2VBMjAwOlwiI0ZGNkU0MFwiXG5cdGRlZXBPcmFuZ2VBNDAwOlwiI0ZGM0QwMFwiXG5cdGRlZXBPcmFuZ2VBNzAwOlwiI0REMkMwMFwiXG5cdGJyb3duOlwiIzc5NTU0OFwiXG5cdGJyb3duNTA6XCIjRUZFQkU5XCJcblx0YnJvd24xMDA6XCIjRDdDQ0M4XCJcblx0YnJvd24yMDA6XCIjQkNBQUE0XCJcblx0YnJvd24zMDA6XCIjQTE4ODdGXCJcblx0YnJvd240MDA6XCIjOEQ2RTYzXCJcblx0YnJvd241MDA6XCIjNzk1NTQ4XCJcblx0YnJvd242MDA6XCIjNkQ0QzQxXCJcblx0YnJvd243MDA6XCIjNUQ0MDM3XCJcblx0YnJvd244MDA6XCIjNEUzNDJFXCJcblx0YnJvd245MDA6XCIjM0UyNzIzXCJcblx0Z3JleTpcIiM5RTlFOUVcIlxuXHRncmV5NTA6XCIjRkFGQUZBXCJcblx0Z3JleTEwMDpcIiNGNUY1RjVcIlxuXHRncmV5MjAwOlwiI0VFRUVFRVwiXG5cdGdyZXkzMDA6XCIjRTBFMEUwXCJcblx0Z3JleTQwMDpcIiNCREJEQkRcIlxuXHRncmV5NTAwOlwiIzlFOUU5RVwiXG5cdGdyZXk2MDA6XCIjNzU3NTc1XCJcblx0Z3JleTcwMDpcIiM2MTYxNjFcIlxuXHRncmV5ODAwOlwiIzQyNDI0MlwiXG5cdGdyZXk5MDA6XCIjMjEyMTIxXCJcblx0Ymx1ZUdyZXk6XCIjNjA3RDhCXCJcblx0Ymx1ZUdyZXk1MDpcIiNFQ0VGRjFcIlxuXHRibHVlR3JleTEwMDpcIiNDRkQ4RENcIlxuXHRibHVlR3JleTIwMDpcIiNCMEJFQzVcIlxuXHRibHVlR3JleTMwMDpcIiM5MEE0QUVcIlxuXHRibHVlR3JleTQwMDpcIiM3ODkwOUNcIlxuXHRibHVlR3JleTUwMDpcIiM2MDdEOEJcIlxuXHRibHVlR3JleTYwMDpcIiM1NDZFN0FcIlxuXHRibHVlR3JleTcwMDpcIiM0NTVBNjRcIlxuXHRibHVlR3JleTgwMDpcIiMzNzQ3NEZcIlxuXHRibHVlR3JleTkwMDpcIiMyNjMyMzhcIlxuXHRibGFjazpcIiMwMDAwMDBcIlxuXHR3aGl0ZTpcIiNGRkZGRkZcIlxuIiwiIyBVdGlsc1xuXG5tID0gcmVxdWlyZSAnbWF0ZXJpYWwta2l0J1xuXG5leHBvcnRzLmRlZmF1bHRzID0ge1xuXHRhbmltYXRpb25zOiB7XG5cdFx0dGFyZ2V0OnVuZGVmaW5lZFxuXHRcdGNvbnN0cmFpbnRzOiB1bmRlZmluZWRcblx0XHRjdXJ2ZSA6IFwiZWFzZS1pbi1vdXRcIlxuXHRcdGN1cnZlT3B0aW9uczogdW5kZWZpbmVkXG5cdFx0dGltZToxXG5cdFx0ZGVsYXk6MFxuXHRcdHJlcGVhdDp1bmRlZmluZWRcblx0XHRjb2xvck1vZGVsOnVuZGVmaW5lZFxuXHRcdHN0YWdnZXI6dW5kZWZpbmVkXG5cdFx0ZmFkZU91dDpmYWxzZVxuXHRcdGZhZGVJbjpmYWxzZVxuXHR9XG59XG5cbmxheW91dCA9IChhcnJheSkgLT5cblx0c2V0dXAgPSB7fVxuXHR0YXJnZXRMYXllcnMgPSBbXVxuXHRibHVlcHJpbnQgPSBbXVxuXHRpZiBhcnJheVxuXHRcdGZvciBpIGluIE9iamVjdC5rZXlzKGV4cG9ydHMuZGVmYXVsdHMuYW5pbWF0aW9ucylcblx0XHRcdGlmIGFycmF5W2ldXG5cdFx0XHRcdHNldHVwW2ldID0gYXJyYXlbaV1cblx0XHRcdGVsc2Vcblx0XHRcdFx0c2V0dXBbaV0gPSBleHBvcnRzLmRlZmF1bHRzLmFuaW1hdGlvbnNbaV1cblxuXHRpZiBzZXR1cC50YXJnZXRcblx0XHRpZiBzZXR1cC50YXJnZXQubGVuZ3RoXG5cdFx0XHR0YXJnZXRMYXllcnMgPSBzZXR1cC50YXJnZXRcblx0XHRlbHNlXG5cdFx0XHR0YXJnZXRMYXllcnMucHVzaCBzZXR1cC50YXJnZXRcblx0ZWxzZVxuXHRcdHRhcmdldExheWVycyA9IEZyYW1lci5DdXJyZW50Q29udGV4dC5sYXllcnNcblxuXHRpZiBzZXR1cC50YXJnZXRcblx0XHRpZiBzZXR1cC5jb25zdHJhaW50c1xuXHRcdFx0Zm9yIG5ld0NvbnN0cmFpbnQgaW4gT2JqZWN0LmtleXMoc2V0dXAuY29uc3RyYWludHMpXG5cdFx0XHRcdHNldHVwLnRhcmdldC5jb25zdHJhaW50c1tuZXdDb25zdHJhaW50XSA9IHNldHVwLmNvbnN0cmFpbnRzW25ld0NvbnN0cmFpbnRdXG5cblxuXHQjVHJhbnNsYXRlIG5ldyBjb25zdHJhaW50c1xuXHRmb3IgbGF5ZXIsIGluZGV4IGluIHRhcmdldExheWVyc1xuXHRcdGxheWVyLmNhbGN1bGF0ZWRQb3NpdGlvbiA9IHt9XG5cdFx0aWYgbGF5ZXIuY29uc3RyYWludHNcblxuXHRcdFx0cHJvcHMgPSB7fVxuXHRcdFx0bGF5ZXIuc3VwZXJGcmFtZSA9IHt9XG5cblx0XHRcdGlmIGxheWVyLnN1cGVyTGF5ZXJcblx0XHRcdFx0bGF5ZXIuc3VwZXJGcmFtZS5oZWlnaHQgPSBsYXllci5zdXBlckxheWVyLmhlaWdodFxuXHRcdFx0XHRsYXllci5zdXBlckZyYW1lLndpZHRoID0gbGF5ZXIuc3VwZXJMYXllci53aWR0aFxuXHRcdFx0ZWxzZVxuXHRcdFx0XHRsYXllci5zdXBlckZyYW1lLmhlaWdodCA9IG0uZGV2aWNlLmhlaWdodFxuXHRcdFx0XHRsYXllci5zdXBlckZyYW1lLndpZHRoID0gbS5kZXZpY2Uud2lkdGhcblxuXHRcdFx0aWYgbGF5ZXIuY29uc3RyYWludHMubGVhZGluZyAhPSB1bmRlZmluZWQgJiYgbGF5ZXIuY29uc3RyYWludHMudHJhaWxpbmcgIT0gdW5kZWZpbmVkXG5cdFx0XHRcdGxheWVyLmNvbnN0cmFpbnRzLmF1dG9XaWR0aCA9IHt9XG5cblx0XHRcdGlmIGxheWVyLmNvbnN0cmFpbnRzLnRvcCAhPSB1bmRlZmluZWQgJiYgbGF5ZXIuY29uc3RyYWludHMuYm90dG9tICE9IHVuZGVmaW5lZFxuXHRcdFx0XHRsYXllci5jb25zdHJhaW50cy5hdXRvSGVpZ2h0ID0ge31cblxuXHRcdFx0IyBTaXplIGNvbnN0cmFpbnRzXG5cdFx0XHRpZiBsYXllci5jb25zdHJhaW50cy53aWR0aCAhPSB1bmRlZmluZWRcblx0XHRcdFx0cHJvcHMud2lkdGggPSBtLnV0aWxzLnB4KGxheWVyLmNvbnN0cmFpbnRzLndpZHRoKVxuXHRcdFx0ZWxzZVxuXHRcdFx0XHRwcm9wcy53aWR0aCA9IGxheWVyLndpZHRoXG5cblx0XHRcdGlmIGxheWVyLmNvbnN0cmFpbnRzLmhlaWdodCAhPSB1bmRlZmluZWRcblx0XHRcdFx0cHJvcHMuaGVpZ2h0ID0gbS51dGlscy5weChsYXllci5jb25zdHJhaW50cy5oZWlnaHQpXG5cdFx0XHRlbHNlXG5cdFx0XHRcdHByb3BzLmhlaWdodCA9IGxheWVyLmhlaWdodFxuXG5cblx0XHRcdCMgQWxpZ25pbmcgY29uc3RyYWludHNcblx0XHRcdGlmIGxheWVyLmNvbnN0cmFpbnRzLmxlYWRpbmdFZGdlcyAhPSB1bmRlZmluZWRcblxuXHRcdFx0XHRpZiBsYXllci5jb25zdHJhaW50cy5sZWFkaW5nRWRnZXMuY2FsY3VsYXRlZFBvc2l0aW9uLnggPT0gdW5kZWZpbmVkXG5cdFx0XHRcdFx0bGF5ZXIuY29uc3RyYWludHMubGVhZGluZ0VkZ2VzLmNhbGN1bGF0ZWRQb3NpdGlvbi54ID0gbGF5ZXIuY29uc3RyYWludHMubGVhZGluZ0VkZ2VzLnhcblxuXHRcdFx0XHRwcm9wcy54ID0gbGF5ZXIuY29uc3RyYWludHMubGVhZGluZ0VkZ2VzLmNhbGN1bGF0ZWRQb3NpdGlvbi54XG5cblx0XHRcdGlmIGxheWVyLmNvbnN0cmFpbnRzLnRyYWlsaW5nRWRnZXMgIT0gdW5kZWZpbmVkXG5cblx0XHRcdFx0aWYgbGF5ZXIuY29uc3RyYWludHMudHJhaWxpbmdFZGdlcy5jYWxjdWxhdGVkUG9zaXRpb24ueCA9PSB1bmRlZmluZWRcblx0XHRcdFx0XHRsYXllci5jb25zdHJhaW50cy50cmFpbGluZ0VkZ2VzLmNhbGN1bGF0ZWRQb3NpdGlvbi54ID0gbGF5ZXIuY29uc3RyYWludHMudHJhaWxpbmdFZGdlcy54XG5cblx0XHRcdFx0cHJvcHMueCA9IGxheWVyLmNvbnN0cmFpbnRzLnRyYWlsaW5nRWRnZXMuY2FsY3VsYXRlZFBvc2l0aW9uLnggLSBwcm9wcy53aWR0aCArIGxheWVyLmNvbnN0cmFpbnRzLnRyYWlsaW5nRWRnZXMuY2FsY3VsYXRlZFBvc2l0aW9uLndpZHRoXG5cblx0XHRcdGlmIGxheWVyLmNvbnN0cmFpbnRzLnRvcEVkZ2VzICE9IHVuZGVmaW5lZFxuXG5cdFx0XHRcdGlmIGxheWVyLmNvbnN0cmFpbnRzLnRvcEVkZ2VzLmNhbGN1bGF0ZWRQb3NpdGlvbi55ID09IHVuZGVmaW5lZFxuXHRcdFx0XHRcdGxheWVyLmNvbnN0cmFpbnRzLnRvcEVkZ2VzLmNhbGN1bGF0ZWRQb3NpdGlvbi55ID0gbGF5ZXIuY29uc3RyYWludHMudG9wRWRnZXMueVxuXG5cdFx0XHRcdHByb3BzLnkgPSBsYXllci5jb25zdHJhaW50cy50b3BFZGdlcy5jYWxjdWxhdGVkUG9zaXRpb24ueVxuXG5cdFx0XHRpZiBsYXllci5jb25zdHJhaW50cy5ib3R0b21FZGdlcyAhPSB1bmRlZmluZWRcblxuXHRcdFx0XHRpZiBsYXllci5jb25zdHJhaW50cy5ib3R0b21FZGdlcy5jYWxjdWxhdGVkUG9zaXRpb24ueSA9PSB1bmRlZmluZWRcblx0XHRcdFx0XHRsYXllci5jb25zdHJhaW50cy5ib3R0b21FZGdlcy5jYWxjdWxhdGVkUG9zaXRpb24ueSA9IGxheWVyLmNvbnN0cmFpbnRzLmJvdHRvbUVkZ2VzLnlcblxuXHRcdFx0XHRwcm9wcy55ID0gbGF5ZXIuY29uc3RyYWludHMuYm90dG9tRWRnZXMuY2FsY3VsYXRlZFBvc2l0aW9uLnkgLSBwcm9wcy5oZWlnaHQgKyBsYXllci5jb25zdHJhaW50cy5ib3R0b21FZGdlcy5jYWxjdWxhdGVkUG9zaXRpb24uaGVpZ2h0XG5cblxuXHRcdFx0IyBQb3NpdGlvbmluZyBjb25zdHJhaW50c1xuXHRcdFx0aWYgbGF5ZXIuY29uc3RyYWludHMubGVhZGluZyAhPSB1bmRlZmluZWRcblx0XHRcdFx0I0lmIGl0J3MgYSBudW1iZXJgXG5cdFx0XHRcdGlmIGxheWVyLmNvbnN0cmFpbnRzLmxlYWRpbmcgPT0gcGFyc2VJbnQobGF5ZXIuY29uc3RyYWludHMubGVhZGluZywgMTApXG5cdFx0XHRcdFx0cHJvcHMueCA9IG0udXRpbHMucHgobGF5ZXIuY29uc3RyYWludHMubGVhZGluZylcblx0XHRcdFx0ZWxzZVxuXHRcdFx0XHRcdCNJZiBpdCdzIGEgbGF5ZXJcblx0XHRcdFx0XHRpZiBsYXllci5jb25zdHJhaW50cy5sZWFkaW5nLmxlbmd0aCA9PSB1bmRlZmluZWRcblxuXHRcdFx0XHRcdFx0aWYgbGF5ZXIuY29uc3RyYWludHMubGVhZGluZy5jYWxjdWxhdGVkUG9zaXRpb24ueCA9PSB1bmRlZmluZWRcblx0XHRcdFx0XHRcdFx0bGF5ZXIuY29uc3RyYWludHMubGVhZGluZy5jYWxjdWxhdGVkUG9zaXRpb24ueCA9IGxheWVyLmNvbnN0cmFpbnRzLmxlYWRpbmcueFxuXG5cdFx0XHRcdFx0XHRwcm9wcy54ID0gbGF5ZXIuY29uc3RyYWludHMubGVhZGluZy5jYWxjdWxhdGVkUG9zaXRpb24ueCArIGxheWVyLmNvbnN0cmFpbnRzLmxlYWRpbmcuY2FsY3VsYXRlZFBvc2l0aW9uLndpZHRoXG5cblx0XHRcdFx0XHQjSWYgaXQncyBhIHJlbGF0aW9uc2hpcFxuXHRcdFx0XHRcdGVsc2VcblxuXHRcdFx0XHRcdFx0aWYgbGF5ZXIuY29uc3RyYWludHMubGVhZGluZ1swXS5jYWxjdWxhdGVkUG9zaXRpb24ueCA9PSB1bmRlZmluZWRcblx0XHRcdFx0XHRcdFx0bGF5ZXIuY29uc3RyYWludHMubGVhZGluZ1swXS5jYWxjdWxhdGVkUG9zaXRpb24ueCA9IGxheWVyLmNvbnN0cmFpbnRzLmxlYWRpbmdbMF0ueFxuXG5cdFx0XHRcdFx0XHRwcm9wcy54ID0gbGF5ZXIuY29uc3RyYWludHMubGVhZGluZ1swXS5jYWxjdWxhdGVkUG9zaXRpb24ueCArIGxheWVyLmNvbnN0cmFpbnRzLmxlYWRpbmdbMF0uY2FsY3VsYXRlZFBvc2l0aW9uLndpZHRoICsgbS51dGlscy5weChsYXllci5jb25zdHJhaW50cy5sZWFkaW5nWzFdKVxuXG5cdFx0XHQjIE9wcG9zaW5nIGNvbnN0cmFpbnRzIGhhbmRsZXJcblx0XHRcdGlmIGxheWVyLmNvbnN0cmFpbnRzLmF1dG9XaWR0aCAhPSB1bmRlZmluZWRcblx0XHRcdFx0bGF5ZXIuY29uc3RyYWludHMuYXV0b1dpZHRoLnN0YXJ0WCA9IHByb3BzLnhcblxuXHRcdFx0aWYgbGF5ZXIuY29uc3RyYWludHMudHJhaWxpbmcgIT0gdW5kZWZpbmVkXG5cdFx0XHRcdCNJZiBpdCdzIGEgbnVtYmVyXG5cdFx0XHRcdGlmIGxheWVyLmNvbnN0cmFpbnRzLnRyYWlsaW5nID09IHBhcnNlSW50KGxheWVyLmNvbnN0cmFpbnRzLnRyYWlsaW5nLCAxMClcblx0XHRcdFx0XHRwcm9wcy54ID0gbGF5ZXIuc3VwZXJGcmFtZS53aWR0aCAtIG0udXRpbHMucHgobGF5ZXIuY29uc3RyYWludHMudHJhaWxpbmcpIC0gcHJvcHMud2lkdGhcblxuXHRcdFx0XHRlbHNlXG5cdFx0XHRcdFx0I0lmIGl0J3MgYSBsYXllclxuXHRcdFx0XHRcdGlmIGxheWVyLmNvbnN0cmFpbnRzLnRyYWlsaW5nLmxlbmd0aCA9PSB1bmRlZmluZWRcblxuXHRcdFx0XHRcdFx0aWYgbGF5ZXIuY29uc3RyYWludHMudHJhaWxpbmcuY2FsY3VsYXRlZFBvc2l0aW9uLnggPT0gdW5kZWZpbmVkXG5cblx0XHRcdFx0XHRcdFx0bGF5ZXIuY29uc3RyYWludHMudHJhaWxpbmcuY2FsY3VsYXRlZFBvc2l0aW9uLnggPSBsYXllci5jb25zdHJhaW50cy50cmFpbGluZy54XG5cdFx0XHRcdFx0XHRwcm9wcy54ID0gbGF5ZXIuY29uc3RyYWludHMudHJhaWxpbmcuY2FsY3VsYXRlZFBvc2l0aW9uLnggLSBwcm9wcy53aWR0aFxuXHRcdFx0XHRcdCNJZiBpdCdzIGEgcmVsYXRpb25zaGlwXG5cdFx0XHRcdFx0ZWxzZVxuXG5cdFx0XHRcdFx0XHRpZiBsYXllci5jb25zdHJhaW50cy50cmFpbGluZ1swXS5jYWxjdWxhdGVkUG9zaXRpb24ueCA9PSB1bmRlZmluZWRcblx0XHRcdFx0XHRcdFx0bGF5ZXIuY29uc3RyYWludHMudHJhaWxpbmdbMF0uY2FsY3VsYXRlZFBvc2l0aW9uLnggPSBsYXllci5jb25zdHJhaW50cy50cmFpbGluZ1swXS54XG5cblx0XHRcdFx0XHRcdHByb3BzLnggPSBsYXllci5jb25zdHJhaW50cy50cmFpbGluZ1swXS5jYWxjdWxhdGVkUG9zaXRpb24ueCAtIG0udXRpbHMucHgobGF5ZXIuY29uc3RyYWludHMudHJhaWxpbmdbMV0pIC0gcHJvcHMud2lkdGhcblxuXHRcdFx0IyBPcHBvc2luZyBjb25zdHJhaW50cyBoYW5kbGVyXG5cdFx0XHRpZiBsYXllci5jb25zdHJhaW50cy5hdXRvV2lkdGggIT0gdW5kZWZpbmVkXG5cdFx0XHRcdGxheWVyLmNvbnN0cmFpbnRzLmF1dG9XaWR0aC5jYWxjdWxhdGVkUG9zaXRpb25YID0gcHJvcHMueFxuXG5cdFx0XHRcdCMjcGVyZm9ybSBhdXRvc2l6ZVxuXHRcdFx0XHRwcm9wcy54ID0gbGF5ZXIuY29uc3RyYWludHMuYXV0b1dpZHRoLnN0YXJ0WFxuXHRcdFx0XHRwcm9wcy53aWR0aCA9IGxheWVyLmNvbnN0cmFpbnRzLmF1dG9XaWR0aC5jYWxjdWxhdGVkUG9zaXRpb25YIC0gbGF5ZXIuY29uc3RyYWludHMuYXV0b1dpZHRoLnN0YXJ0WCArIHByb3BzLndpZHRoXG5cblx0XHRcdGlmIGxheWVyLmNvbnN0cmFpbnRzLnRvcCAhPSB1bmRlZmluZWRcblx0XHRcdFx0I0lmIGl0J3MgYSBudW1iZXJcblx0XHRcdFx0aWYgbGF5ZXIuY29uc3RyYWludHMudG9wID09IHBhcnNlSW50KGxheWVyLmNvbnN0cmFpbnRzLnRvcCwgMTApXG5cdFx0XHRcdFx0cHJvcHMueSA9IG0udXRpbHMucHgobGF5ZXIuY29uc3RyYWludHMudG9wKVxuXG5cdFx0XHRcdGVsc2VcblxuXHRcdFx0XHRcdCNJZiBpdCdzIGEgbGF5ZXJcblx0XHRcdFx0XHRpZiBsYXllci5jb25zdHJhaW50cy50b3AubGVuZ3RoID09IHVuZGVmaW5lZFxuXG5cdFx0XHRcdFx0XHRpZiBsYXllci5jb25zdHJhaW50cy50b3AuY2FsY3VsYXRlZFBvc2l0aW9uLnkgPT0gdW5kZWZpbmVkXG5cdFx0XHRcdFx0XHRcdGxheWVyLmNvbnN0cmFpbnRzLnRvcC5jYWxjdWxhdGVkUG9zaXRpb24ueSA9IGxheWVyLmNvbnN0cmFpbnRzLnRvcC55XG5cblx0XHRcdFx0XHRcdHByb3BzLnkgPSBsYXllci5jb25zdHJhaW50cy50b3AuY2FsY3VsYXRlZFBvc2l0aW9uLnkgKyBsYXllci5jb25zdHJhaW50cy50b3AuY2FsY3VsYXRlZFBvc2l0aW9uLmhlaWdodFxuXG5cdFx0XHRcdFx0I0lmIGl0J3MgYSByZWxhdGlvbnNoaXBcblx0XHRcdFx0XHRlbHNlXG5cblx0XHRcdFx0XHRcdGlmIGxheWVyLmNvbnN0cmFpbnRzLnRvcFswXS5jYWxjdWxhdGVkUG9zaXRpb24ueSA9PSB1bmRlZmluZWRcblx0XHRcdFx0XHRcdFx0bGF5ZXIuY29uc3RyYWludHMudG9wWzBdLmNhbGN1bGF0ZWRQb3NpdGlvbi55ID0gbGF5ZXIuY29uc3RyYWludHMudG9wWzBdLnlcblxuXHRcdFx0XHRcdFx0cHJvcHMueSA9IGxheWVyLmNvbnN0cmFpbnRzLnRvcFswXS5jYWxjdWxhdGVkUG9zaXRpb24ueSArIGxheWVyLmNvbnN0cmFpbnRzLnRvcFswXS5jYWxjdWxhdGVkUG9zaXRpb24uaGVpZ2h0ICsgbS51dGlscy5weChsYXllci5jb25zdHJhaW50cy50b3BbMV0pXG5cblx0XHRcdCMgT3Bwb3NpbmcgY29uc3RyYWludHMgaGFuZGxlclxuXHRcdFx0aWYgbGF5ZXIuY29uc3RyYWludHMuYXV0b0hlaWdodCAhPSB1bmRlZmluZWRcblx0XHRcdFx0bGF5ZXIuY29uc3RyYWludHMuYXV0b0hlaWdodC5zdGFydFkgPSBwcm9wcy55XG5cblxuXHRcdFx0aWYgbGF5ZXIuY29uc3RyYWludHMuYm90dG9tICE9IHVuZGVmaW5lZFxuXHRcdFx0XHQjSWYgaXQncyBhIG51bWJlclxuXHRcdFx0XHRpZiBsYXllci5jb25zdHJhaW50cy5ib3R0b20gPT0gcGFyc2VJbnQobGF5ZXIuY29uc3RyYWludHMuYm90dG9tLCAxMClcblx0XHRcdFx0XHRwcm9wcy55ID0gbGF5ZXIuc3VwZXJGcmFtZS5oZWlnaHQgLSBtLnV0aWxzLnB4KGxheWVyLmNvbnN0cmFpbnRzLmJvdHRvbSkgLSBwcm9wcy5oZWlnaHRcblxuXHRcdFx0XHRlbHNlXG5cdFx0XHRcdFx0I0lmIGl0J3MgYSBsYXllclxuXHRcdFx0XHRcdGlmIGxheWVyLmNvbnN0cmFpbnRzLmJvdHRvbS5sZW5ndGggPT0gdW5kZWZpbmVkXG5cblx0XHRcdFx0XHRcdGlmIGxheWVyLmNvbnN0cmFpbnRzLmJvdHRvbS5jYWxjdWxhdGVkUG9zaXRpb24ueSA9PSB1bmRlZmluZWRcblx0XHRcdFx0XHRcdFx0bGF5ZXIuY29uc3RyYWludHMuYm90dG9tLmNhbGN1bGF0ZWRQb3NpdGlvbi55ID0gbGF5ZXIuY29uc3RyYWludHMuYm90dG9tLnlcblxuXHRcdFx0XHRcdFx0cHJvcHMueSA9IGxheWVyLmNvbnN0cmFpbnRzLmJvdHRvbS5jYWxjdWxhdGVkUG9zaXRpb24ueSAtIHByb3BzLmhlaWdodFxuXG5cdFx0XHRcdFx0I0lmIGl0J3MgYSByZWxhdGlvbnNoaXBcblx0XHRcdFx0XHRlbHNlXG5cblx0XHRcdFx0XHRcdGlmIGxheWVyLmNvbnN0cmFpbnRzLmJvdHRvbVswXS5jYWxjdWxhdGVkUG9zaXRpb24ueSA9PSB1bmRlZmluZWRcblx0XHRcdFx0XHRcdFx0bGF5ZXIuY29uc3RyYWludHMuYm90dG9tWzBdLmNhbGN1bGF0ZWRQb3NpdGlvbi55ID0gbGF5ZXIuY29uc3RyYWludHMuYm90dG9tWzBdLnlcblxuXHRcdFx0XHRcdFx0cHJvcHMueSA9IGxheWVyLmNvbnN0cmFpbnRzLmJvdHRvbVswXS5jYWxjdWxhdGVkUG9zaXRpb24ueSAtICBtLnV0aWxzLnB4KGxheWVyLmNvbnN0cmFpbnRzLmJvdHRvbVsxXSkgLSBwcm9wcy5oZWlnaHRcblxuXHRcdFx0IyBPcHBvc2luZyBjb25zdHJhaW50cyBoYW5kbGVyXG5cdFx0XHRpZiBsYXllci5jb25zdHJhaW50cy5hdXRvSGVpZ2h0ICE9IHVuZGVmaW5lZFxuXHRcdFx0XHRsYXllci5jb25zdHJhaW50cy5hdXRvSGVpZ2h0LmNhbGN1bGF0ZWRQb3NpdGlvblkgPSBwcm9wcy55XG5cdFx0XHRcdCMjIHBlcmZvcm0gYXV0b3NpemVcblx0XHRcdFx0cHJvcHMuaGVpZ2h0ID0gbGF5ZXIuY29uc3RyYWludHMuYXV0b0hlaWdodC5jYWxjdWxhdGVkUG9zaXRpb25ZIC0gbGF5ZXIuY29uc3RyYWludHMuYXV0b0hlaWdodC5zdGFydFkgKyBwcm9wcy5oZWlnaHRcblx0XHRcdFx0cHJvcHMueSA9IGxheWVyLmNvbnN0cmFpbnRzLmF1dG9IZWlnaHQuc3RhcnRZXG5cblxuXHRcdFx0IyBBbGlnbm1lbnQgY29uc3RyYWludHNcblx0XHRcdGlmIGxheWVyLmNvbnN0cmFpbnRzLmFsaWduICE9IHVuZGVmaW5lZFxuXHRcdFx0XHQjU2V0IHRoZSBjZW50ZXJpbmcgZnJhbWVcblx0XHRcdFx0aWYgbGF5ZXIuY29uc3RyYWludHMuYWxpZ24gPT0gXCJob3Jpem9udGFsXCJcblx0XHRcdFx0XHRwcm9wcy54ID0gbGF5ZXIuc3VwZXJGcmFtZS53aWR0aCAvIDIgLSBwcm9wcy53aWR0aCAvIDJcblxuXHRcdFx0XHRpZiBsYXllci5jb25zdHJhaW50cy5hbGlnbiA9PSBcInZlcnRpY2FsXCJcblx0XHRcdFx0XHRwcm9wcy55ID0gbGF5ZXIuc3VwZXJGcmFtZS5oZWlnaHQgLyAyIC0gcHJvcHMuaGVpZ2h0IC8gMlxuXG5cdFx0XHRcdGlmIGxheWVyLmNvbnN0cmFpbnRzLmFsaWduID09IFwiY2VudGVyXCJcblx0XHRcdFx0XHRwcm9wcy54ID0gbGF5ZXIuc3VwZXJGcmFtZS53aWR0aCAvIDIgLSBwcm9wcy53aWR0aCAvIDJcblx0XHRcdFx0XHRwcm9wcy55ID0gbGF5ZXIuc3VwZXJGcmFtZS5oZWlnaHQgLyAyIC0gcHJvcHMuaGVpZ2h0IC8gMlxuXG5cblx0XHRcdCMgQ2VudGVyaW5nIGNvbnN0cmFpbnRzXG5cdFx0XHRpZiBsYXllci5jb25zdHJhaW50cy5ob3Jpem9udGFsQ2VudGVyICE9IHVuZGVmaW5lZFxuXHRcdFx0XHRwcm9wcy54ID0gbGF5ZXIuY29uc3RyYWludHMuaG9yaXpvbnRhbENlbnRlci5jYWxjdWxhdGVkUG9zaXRpb24ueCArIChsYXllci5jb25zdHJhaW50cy5ob3Jpem9udGFsQ2VudGVyLmNhbGN1bGF0ZWRQb3NpdGlvbi53aWR0aCAtIHByb3BzLndpZHRoKSAvIDJcblxuXHRcdFx0aWYgbGF5ZXIuY29uc3RyYWludHMudmVydGljYWxDZW50ZXIgIT0gdW5kZWZpbmVkXG5cdFx0XHRcdHByb3BzLnkgPSBsYXllci5jb25zdHJhaW50cy52ZXJ0aWNhbENlbnRlci5jYWxjdWxhdGVkUG9zaXRpb24ueSArIChsYXllci5jb25zdHJhaW50cy52ZXJ0aWNhbENlbnRlci5jYWxjdWxhdGVkUG9zaXRpb24uaGVpZ2h0IC0gcHJvcHMuaGVpZ2h0KSAvIDJcblxuXHRcdFx0aWYgbGF5ZXIuY29uc3RyYWludHMuY2VudGVyICE9IHVuZGVmaW5lZFxuXHRcdFx0XHRwcm9wcy54ID0gbGF5ZXIuY29uc3RyYWludHMuY2VudGVyLmNhbGN1bGF0ZWRQb3NpdGlvbi54ICsgKGxheWVyLmNvbnN0cmFpbnRzLmNlbnRlci5jYWxjdWxhdGVkUG9zaXRpb24ud2lkdGggLSBwcm9wcy53aWR0aCkgLyAyXG5cdFx0XHRcdHByb3BzLnkgPSBsYXllci5jb25zdHJhaW50cy5jZW50ZXIuY2FsY3VsYXRlZFBvc2l0aW9uLnkgKyAobGF5ZXIuY29uc3RyYWludHMuY2VudGVyLmNhbGN1bGF0ZWRQb3NpdGlvbi5oZWlnaHQgLSBwcm9wcy5oZWlnaHQpIC8gMlxuXG5cdFx0XHRsYXllci5jYWxjdWxhdGVkUG9zaXRpb24gPSBwcm9wc1xuXHRcdGVsc2Vcblx0XHRcdGxheWVyLmNhbGN1bGF0ZWRQb3NpdGlvbiA9IGxheWVyLnByb3BzXG5cblx0XHRibHVlcHJpbnQucHVzaCBsYXllclxuXG5cblx0cmV0dXJuIGJsdWVwcmludFxuXG5leHBvcnRzLnNldCA9IChhcnJheSkgLT5cblx0c2V0dXAgPSB7fVxuXHRwcm9wcyA9IHt9XG5cdGlmIGFycmF5XG5cdFx0Zm9yIGkgaW4gT2JqZWN0LmtleXMoZXhwb3J0cy5kZWZhdWx0cy5hbmltYXRpb25zKVxuXHRcdFx0aWYgYXJyYXlbaV1cblx0XHRcdFx0c2V0dXBbaV0gPSBhcnJheVtpXVxuXHRcdFx0ZWxzZVxuXHRcdFx0XHRzZXR1cFtpXSA9IGV4cG9ydHMuZGVmYXVsdHMuYW5pbWF0aW9uc1tpXVxuXG5cdGJsdWVwcmludCA9IGxheW91dChhcnJheSlcblxuXHRmb3IgbGF5ZXIsIGluZGV4IGluIGJsdWVwcmludFxuXHRcdGZvciBrZXkgaW4gT2JqZWN0LmtleXMobGF5ZXIuY2FsY3VsYXRlZFBvc2l0aW9uKVxuXHRcdFx0bGF5ZXJba2V5XSA9IGxheWVyLmNhbGN1bGF0ZWRQb3NpdGlvbltrZXldXG5cbmV4cG9ydHMuYW5pbWF0ZSA9IChhcnJheSkgLT5cblx0c2V0dXAgPSB7fVxuXHRwcm9wcyA9IHt9XG5cdGlmIGFycmF5XG5cdFx0Zm9yIGkgaW4gT2JqZWN0LmtleXMoZXhwb3J0cy5kZWZhdWx0cy5hbmltYXRpb25zKVxuXHRcdFx0aWYgYXJyYXlbaV1cblx0XHRcdFx0c2V0dXBbaV0gPSBhcnJheVtpXVxuXHRcdFx0ZWxzZVxuXHRcdFx0XHRzZXR1cFtpXSA9IGV4cG9ydHMuZGVmYXVsdHMuYW5pbWF0aW9uc1tpXVxuXG5cdGJsdWVwcmludCA9IGxheW91dChhcnJheSlcblxuXHRmb3IgbGF5ZXIsIGluZGV4IGluIGJsdWVwcmludFxuXHRcdCNUaW1pbmdcblx0XHRkZWxheSA9IHNldHVwLmRlbGF5XG5cdFx0aWYgc2V0dXAuc3RhZ2dlclxuXHRcdFx0c3RhZyA9IHNldHVwLnN0YWdnZXJcblx0XHRcdGRlbGF5ID0gKChpbmRleCkgKiBzdGFnKSArIGRlbGF5XG5cblx0XHRpZiBzZXR1cC5mYWRlT3V0XG5cdFx0XHRpZiBsYXllciA9PSBzZXR1cC5mYWRlT3V0XG5cdFx0XHRcdGxheWVyLmNhbGN1bGF0ZWRQb3NpdGlvbi5vcGFjaXR5ID0gMFxuXG5cdFx0aWYgc2V0dXAuZmFkZUluXG5cdFx0XHRsYXllci5jYWxjdWxhdGVkUG9zaXRpb24ub3BhY2l0eSA9IDFcblxuXHRcdGxheWVyLmFuaW1hdGVcblx0XHRcdHByb3BlcnRpZXM6bGF5ZXIuY2FsY3VsYXRlZFBvc2l0aW9uXG5cdFx0XHR0aW1lOnNldHVwLnRpbWVcblx0XHRcdGRlbGF5OmRlbGF5XG5cdFx0XHRjdXJ2ZTpzZXR1cC5jdXJ2ZVxuXHRcdFx0cmVwZWF0OnNldHVwLnJlcGVhdFxuXHRcdFx0Y29sb3JNb2RlbDpzZXR1cC5jb2xvck1vZGVsXG5cdFx0XHRjdXJ2ZU9wdGlvbnM6c2V0dXAuY3VydmVPcHRpb25zXG5cblx0XHRsYXllci5jYWxjdWxhdGVkUG9zaXRpb24gPSBwcm9wc1xuIiwibSA9IHJlcXVpcmUgJ21hdGVyaWFsLWtpdCdcblxuZXhwb3J0cy5kZWZhdWx0cyA9IHtcbiAgbmFtZTogXCJzdGFyXCJcbiAgc2NhbGU6IG0uZGV2aWNlLnNjYWxlXG4gIGNvbG9yOiBtLmNvbG9yKFwiYmxhY2tcIilcbiAgc3VwZXJMYXllcjogdW5kZWZpbmVkXG4gIGNvbnN0cmFpbnRzOiB1bmRlZmluZWRcbiAgY2xpcDp0cnVlXG4gIG9wYWNpdHk6IDFcbn1cblxuZXhwb3J0cy5kZWZhdWx0cy5wcm9wcyA9IE9iamVjdC5rZXlzKGV4cG9ydHMuZGVmYXVsdHMpXG5cbmV4cG9ydHMuY3JlYXRlID0gKGFycmF5KSAtPlxuICBzZXR1cCA9IG0udXRpbHMuc2V0dXBDb21wb25lbnQoYXJyYXksIGV4cG9ydHMuZGVmYXVsdHMpXG4gIGlmIHR5cGVvZiBzZXR1cC5uYW1lID09IFwic3RyaW5nXCJcbiAgICBpY29uTGF5ZXIgPSBuZXcgTGF5ZXJcbiAgICAgIGh0bWw6XCI8aSBjbGFzcz0nbWF0ZXJpYWwtaWNvbnMgbWQtMjQnPiN7c2V0dXAubmFtZX08L2k+XCJcbiAgICAgIGNvbG9yOm0uY29sb3Ioc2V0dXAuY29sb3IpXG4gICAgICBiYWNrZ3JvdW5kQ29sb3I6XCJ0cmFuc3BhcmVudFwiXG4gICAgICBjbGlwOnNldHVwLmNsaXBcbiAgICAgIG5hbWU6c2V0dXAubmFtZVxuICAgICAgc3VwZXJMYXllcjpzZXR1cC5zdXBlckxheWVyXG4gICAgICBvcGFjaXR5OnNldHVwLm9wYWNpdHlcblxuICAgIHBhZGRpbmdSaWdodCA9IDBcbiAgICBwYWRkaW5nVG9wID0gMFxuXG4gICAgc3dpdGNoIG0uZGV2aWNlLnNjYWxlXG4gICAgICB3aGVuIDRcbiAgICAgICAgcGFkZGluZ1RvcCA9IG0ucHgoMTIpICsgXCJweFwiXG4gICAgICAgIHBhZGRpbmdSaWdodCA9IG0ucHgoMikgKyBcInB4XCJcbiAgICAgIHdoZW4gM1xuICAgICAgICBwYWRkaW5nVG9wID0gbS5weCgxMCkgKyBcInB4XCJcbiAgICAgICAgcGFkZGluZ1JpZ2h0ID0gbS5weCg2KSArIFwicHhcIlxuICAgICAgd2hlbiAyXG4gICAgICAgIHBhZGRpbmdUb3AgPSBtLnB4KDgpICsgXCJweFwiXG4gICAgICAgIHBhZGRpbmdSaWdodCA9IG0ucHgoOCkgKyBcInB4XCJcbiAgICAgIHdoZW4gMVxuICAgICAgICBwYWRkaW5nVG9wID0gbS5weCgxNikgKyBcInB4XCJcbiAgICAgICAgcGFkZGluZ1JpZ2h0ID0gbS5weCg3KSArIFwicHhcIlxuXG5cbiAgICBmcmFtZSA9IG0udXRpbHMudGV4dEF1dG9TaXplKGljb25MYXllcilcbiAgICBpY29uTGF5ZXIuaHRtbCA9IFwiPHNwYW4gc3R5bGU9Jy13ZWJraXQtdHJhbnNmb3JtOiBzY2FsZSgje3NldHVwLnNjYWxlfSk7IHBvc2l0aW9uOiBhYnNvbHV0ZTsnPlwiICsgaWNvbkxheWVyLmh0bWxcbiAgICBpY29uTGF5ZXIud2lkdGggPSBtLnB4KDI0KVxuICAgIGljb25MYXllci5oZWlnaHQgPSBtLnB4KGZyYW1lLmhlaWdodClcblxuICAgIGljb25MYXllci5zdHlsZSA9XG4gICAgICBcImRpc3BsYXlcIiA6IFwiaW5saW5lLWJsb2NrXCJcbiAgICAgIFwicGFkZGluZy10b3BcIiA6IHBhZGRpbmdUb3BcbiAgICAgIFwicGFkZGluZy1yaWdodFwiIDogcGFkZGluZ1JpZ2h0XG4gICAgICBcInRleHQtYWxpZ25cIiA6IFwiY2VudGVyXCJcbiAgICBpZiBzZXR1cC5jb25zdHJhaW50c1xuICAgICAgaWNvbkxheWVyLmNvbnN0cmFpbnRzID0gc2V0dXAuY29uc3RyYWludHNcbiAgICAgIG0ubGF5b3V0LnNldFxuICAgICAgICB0YXJnZXQ6aWNvbkxheWVyXG5cbiAgICByZXR1cm4gaWNvbkxheWVyXG4gIGVsc2VcbiAgICBpY29uTGF5ZXIgPSBzZXR1cC5sYXllclxuICAgIHJldHVybiBpY29uTGF5ZXJcbiIsIiMgQWxlcnRcbm0gPSByZXF1aXJlICdtYXRlcmlhbC1raXQnXG5cbmV4cG9ydHMuZGVmYXVsdHMgPSB7XG5cdHRpdGxlOiBcIlRpdGxlXCJcblx0bWVzc2FnZTpcIk1lc3NhZ2VcIlxuXHRhY3Rpb25zOltcIkFncmVlXCIsIFwiRGVjbGluZVwiXVxufVxuXG5leHBvcnRzLmRlZmF1bHRzLnByb3BzID0gT2JqZWN0LmtleXMoZXhwb3J0cy5kZWZhdWx0cylcblxuZXhwb3J0cy5jcmVhdGUgPSAoYXJyYXkpIC0+XG5cdHNldHVwID0gbS51dGlscy5zZXR1cENvbXBvbmVudChhcnJheSwgZXhwb3J0cy5kZWZhdWx0cylcblxuXHRkaWFsb2cgPSBuZXcgTGF5ZXIgYmFja2dyb3VuZENvbG9yOlwidHJhbnNwYXJlbnRcIiwgbmFtZTpcImRpYWxvZ1wiXG5cdGRpYWxvZy5jb25zdHJhaW50cyA9XG5cdFx0bGVhZGluZzowXG5cdFx0dHJhaWxpbmc6MFxuXHRcdHRvcDowXG5cdFx0Ym90dG9tOjBcblxuXHRvdmVybGF5ID0gbmV3IExheWVyIGJhY2tncm91bmRDb2xvcjpcIiM1RTVFNUVcIiwgc3VwZXJMYXllcjpkaWFsb2csIG5hbWU6XCJvdmVybGF5XCIsIG9wYWNpdHk6LjZcblx0b3ZlcmxheS5jb25zdHJhaW50cyA9XG5cdFx0bGVhZGluZzowXG5cdFx0dHJhaWxpbmc6MFxuXHRcdHRvcDowXG5cdFx0Ym90dG9tOjBcblxuXHRtb2RhbCA9IG5ldyBMYXllclxuXHRcdGJhY2tncm91bmRDb2xvcjpcIndoaXRlXCJcblx0XHRzdXBlckxheWVyOmRpYWxvZ1xuXHRcdGJvcmRlclJhZGl1czptLnV0aWxzLnB4KDIpXG5cdFx0bmFtZTpcIm1vZGFsXCJcblx0XHRzaGFkb3dDb2xvcjpcInJnYmEoMCwwLDAsLjIpXCJcblx0XHRzaGFkb3dZOjI0XG5cdFx0c2hhZG93Qmx1cjoyNFxuXHRcdGNsaXA6dHJ1ZVxuXHRtb2RhbC5jb25zdHJhaW50cyA9XG5cdFx0YWxpZ246XCJjZW50ZXJcIlxuXHRcdHdpZHRoOjI4MFxuXHRcdGhlaWdodDo0MDBcblxuXHR0aXRsZSA9IG5ldyBtLlRleHRcblx0XHRzdXBlckxheWVyOm1vZGFsXG5cdFx0dGV4dDpzZXR1cC50aXRsZVxuXHRcdGZvbnRXZWlnaHQ6XCJzZW1pYm9sZFwiXG5cdFx0Zm9udFNpemU6MjBcblx0XHRuYW1lOlwidGl0bGVcIlxuXHRcdGxpbmVIZWlnaHQ6MjBcblx0XHRjb25zdHJhaW50czpcblx0XHRcdHRvcDoyMFxuXHRcdFx0d2lkdGg6MjIwXG5cdFx0XHRsZWFkaW5nOjI0XG5cblx0bWVzc2FnZSA9IG5ldyBtLlRleHRcblx0XHRzdXBlckxheWVyOm1vZGFsXG5cdFx0dGV4dDpzZXR1cC5tZXNzYWdlXG5cdFx0Zm9udFNpemU6MTNcblx0XHRuYW1lOlwibWVzc2FnZVwiXG5cdFx0bGluZUhlaWdodDoxNlxuXHRcdGNvbnN0cmFpbnRzOlxuXHRcdFx0dG9wOiBbdGl0bGUsIDEwXVxuXHRcdFx0bGVhZGluZzoyNFxuXHRcdFx0d2lkdGg6IDIyMFxuXG5cdG0ubGF5b3V0LnNldFxuXHRcdHRhcmdldDpbZGlhbG9nLCBvdmVybGF5LCBtb2RhbCwgdGl0bGUsIG1lc3NhZ2VdXG5cblx0I1RpdGxlICsgTWVzc2FnZSArIDEgc2V0IG9mIGFjdGlvbnNcblx0bW9kYWwuY29uc3RyYWludHNbXCJoZWlnaHRcIl0gPSAyMCArIG0udXRpbHMucHQodGl0bGUuaGVpZ2h0KSArIDEwICsgbS51dGlscy5wdChtZXNzYWdlLmhlaWdodCkgKyAyNCArIDQ0XG5cblx0bS5sYXlvdXQuc2V0XG5cdFx0dGFyZ2V0OltvdmVybGF5LCBtb2RhbF1cblx0ZGlhbG9nLmFjdGlvbnMgPSB7fVxuXHRhY3Rpb25zID0gW11cblx0Y2hhckNvdW50ID0gMFxuXHRpZiBzZXR1cC5hY3Rpb25zLmxlbmd0aCA+IDFcblx0XHRjaGFyQ291bnQgPSBzZXR1cC5hY3Rpb25zWzBdLmxlbmd0aCArIHNldHVwLmFjdGlvbnNbMV0ubGVuZ3RoXG5cdGlmIHNldHVwLmFjdGlvbnMubGVuZ3RoIDwgMyAmJiBjaGFyQ291bnQgPCAyNFxuXHRcdGZvciBhY3QsIGluZGV4IGluIHNldHVwLmFjdGlvbnNcblx0XHRcdGJ1dHRvbiA9IG5ldyBtLkJ1dHRvblxuXHRcdFx0XHRzdXBlckxheWVyOm1vZGFsXG5cdFx0XHRcdHRleHQ6c2V0dXAuYWN0aW9uc1tpbmRleF1cblx0XHRcdFx0Y29sb3I6XCJibHVlXCJcblx0XHRcdGlmIGluZGV4ID09IDBcblx0XHRcdFx0YnV0dG9uLmNvbnN0cmFpbnRzID0ge2JvdHRvbTo4LCB0cmFpbGluZzo4fVxuXHRcdFx0ZWxzZVxuXHRcdFx0XHRidXR0b24uY29uc3RyYWludHMgPSB7Ym90dG9tOjgsIHRyYWlsaW5nOlthY3Rpb25zW2luZGV4IC0gMV0sIDhdfVxuXHRcdFx0ZGlhbG9nLmFjdGlvbnNbc2V0dXAuYWN0aW9uc1tpbmRleF1dID0gYnV0dG9uXG5cdFx0XHRhY3Rpb25zLnB1c2ggYnV0dG9uXG5cdFx0XHRtLmxheW91dC5zZXRcblx0XHRcdFx0dGFyZ2V0OmJ1dHRvblxuXHRlbHNlXG5cdFx0bW9kYWwuY29uc3RyYWludHNbXCJoZWlnaHRcIl0gPSAyMCArIG0udXRpbHMucHQodGl0bGUuaGVpZ2h0KSArIDEwICsgbS51dGlscy5wdChtZXNzYWdlLmhlaWdodCkgKyAzMiArIChzZXR1cC5hY3Rpb25zLmxlbmd0aCAqIDM2KVxuXHRcdG0ubGF5b3V0LnNldFxuXHRcdFx0dGFyZ2V0Om1vZGFsXG5cdFx0bGFyZ2VzdExhYmVsID0gMFxuXHRcdGxhcmdlc3RCdXR0b24gPSAwXG5cdFx0Zm9yIGFjdCwgaW5kZXggaW4gc2V0dXAuYWN0aW9uc1xuXHRcdFx0YnV0dG9uID0gbmV3IG0uQnV0dG9uXG5cdFx0XHRcdHN1cGVyTGF5ZXI6bW9kYWxcblx0XHRcdFx0dGV4dDpzZXR1cC5hY3Rpb25zW2luZGV4XVxuXHRcdFx0XHRjb2xvcjpcImJsdWVcIlxuXHRcdFx0aWYgaW5kZXggPT0gMFxuXHRcdFx0XHRidXR0b24uY29uc3RyYWludHMgPSB7dG9wOlttZXNzYWdlLCAyNF0sIHRyYWlsaW5nOjh9XG5cdFx0XHRlbHNlXG5cdFx0XHRcdGJ1dHRvbi5jb25zdHJhaW50cyA9IHt0cmFpbGluZzo4LCB0b3A6YWN0aW9uc1tpbmRleCAtIDFdfVxuXHRcdFx0ZGlhbG9nLmFjdGlvbnNbc2V0dXAuYWN0aW9uc1tpbmRleF1dID0gYnV0dG9uXG5cdFx0XHRhY3Rpb25zLnB1c2ggYnV0dG9uXG5cdFx0XHRtLmxheW91dC5zZXRcblx0XHRcdFx0dGFyZ2V0OmJ1dHRvblxuXG5cdFx0XHRpZiBsYXJnZXN0TGFiZWwgPCBidXR0b24ubGFiZWwud2lkdGhcblx0XHRcdFx0bGFyZ2VzdExhYmVsID0gYnV0dG9uLmxhYmVsLndpZHRoXG5cdFx0XHRcdGxhcmdlc3RCdXR0b24gPSBidXR0b24ud2lkdGhcblxuXHRcdGZvciBhY3QgaW4gYWN0aW9uc1xuXHRcdFx0YWN0LmxhYmVsLnN0eWxlLnRleHRBbGlnbiA9IFwicmlnaHRcIlxuXHRcdFx0YWN0LmxhYmVsLndpZHRoID0gbGFyZ2VzdExhYmVsXG5cdFx0XHRhY3Qud2lkdGggPSBsYXJnZXN0QnV0dG9uXG5cdFx0XHRtLmxheW91dC5zZXRcblx0XHRcdFx0dGFyZ2V0OlthY3QsIGFjdC5sYWJlbF1cblxuXHQjIEV4cG9ydCBkaWFsb2dcblx0ZGlhbG9nLm92ZXJsYXkgPSBvdmVybGF5XG5cdGRpYWxvZy5tb2RhbCA9IG1vZGFsXG5cdGRpYWxvZy50aXRsZSA9IHRpdGxlXG5cdGRpYWxvZy5tZXNzYWdlID0gbWVzc2FnZVxuXG5cdHJldHVybiBkaWFsb2dcbiIsIm0gPSByZXF1aXJlICdtYXRlcmlhbC1raXQnXG5cbmV4cG9ydHMuZGVmYXVsdHMgPSB7XG5cdFx0dGV4dDpcInRleHRcIlxuXHRcdHR5cGU6XCJmbGF0XCJcblx0XHRiYWNrZ3JvdW5kQ29sb3I6XCJ3aGl0ZVwiXG5cdFx0Y29sb3I6XCJ0ZWFsMzAwXCJcblx0XHRuYW1lOlwiYnV0dG9uXCJcblx0XHRzdXBlckxheWVyOnVuZGVmaW5lZFxuXHRcdGNvbnN0cmFpbnRzOnVuZGVmaW5lZFxuXHRcdGljb246XCJzdGFyXCJcblx0XHRjbGlwOnRydWVcblx0XHRpbms6dW5kZWZpbmVkXG5cdH1cblxuZXhwb3J0cy5kZWZhdWx0cy5wcm9wcyA9IE9iamVjdC5rZXlzKGV4cG9ydHMuZGVmYXVsdHMpXG5cbmV4cG9ydHMuY3JlYXRlID0gKGFycmF5KSAtPlxuXHRzZXR1cCA9IG0udXRpbHMuc2V0dXBDb21wb25lbnQoYXJyYXksIGV4cG9ydHMuZGVmYXVsdHMpXG5cblx0YnV0dG9uID0gbmV3IExheWVyXG5cdFx0bmFtZTpzZXR1cC5uYW1lXG5cdFx0Y2xpcDpzZXR1cC5jbGlwXG5cblx0aWYgc2V0dXAuc3VwZXJMYXllclxuXHRcdHNldHVwLnN1cGVyTGF5ZXIuYWRkU3ViTGF5ZXIoYnV0dG9uKVxuXG5cdGJ1dHRvbi50eXBlID0gc2V0dXAudHlwZVxuXHRzd2l0Y2ggc2V0dXAudHlwZVxuXHRcdHdoZW4gXCJmbG9hdGluZ1wiXG5cdFx0XHRidXR0b24uY29uc3RyYWludHMgPVxuXHRcdFx0XHQgd2lkdGg6NTZcblx0XHRcdFx0IGhlaWdodDo1NlxuXHRcdFx0XHQgYm90dG9tOjY0XG5cdFx0XHRcdCB0cmFpbGluZzoxN1xuXHRcdFx0aWYgbS5kZXZpY2Uuc2NhbGUgPCA0XG5cdFx0XHRcdGJ1dHRvbi5jb25zdHJhaW50cy53aWR0aCA9IDY0XG5cdFx0XHRcdGJ1dHRvbi5jb25zdHJhaW50cy5oZWlnaHQgPSA2NFxuXHRcdFx0YnV0dG9uLmJvcmRlclJhZGl1cyA9IG0ucHgoMzIpXG5cdFx0XHRidXR0b24uc2hhZG93Q29sb3IgPSBcInJnYmEoMCwwLDAsLjEyKVwiXG5cdFx0XHRidXR0b24uc2hhZG93WSA9IG0ucHgoMilcblx0XHRcdGJ1dHRvbi5zaGFkb3dCbHVyID0gbS5weCg2KVxuXHRcdFx0YnV0dG9uLmJhY2tncm91bmRDb2xvciA9IG0uY29sb3Ioc2V0dXAuYmFja2dyb3VuZENvbG9yKVxuXHRcdFx0aWYgdHlwZW9mIHNldHVwLmljb24gPT0gXCJzdHJpbmdcIlxuXHRcdFx0XHRpY29uID0gbS5JY29uXG5cdFx0XHRcdFx0bmFtZTpzZXR1cC5pY29uXG5cdFx0XHRcdFx0Y29sb3I6c2V0dXAuY29sb3Jcblx0XHRcdFx0XHRzdXBlckxheWVyOmJ1dHRvblxuXHRcdFx0XHRcdGNvbnN0cmFpbnRzOnthbGlnbjpcImNlbnRlclwifVxuXG5cdFx0XHRtLmxheW91dC5zZXRcblx0XHRcdFx0dGFyZ2V0OltidXR0b25dXG5cdFx0XHRtLmxheW91dC5zZXRcblx0XHRcdFx0dGFyZ2V0OltpY29uXVxuXG5cdFx0ZWxzZVxuXHRcdFx0bGFiZWwgPSBuZXcgbS5UZXh0XG5cdFx0XHRcdHRleHQ6c2V0dXAudGV4dFxuXHRcdFx0XHRzdXBlckxheWVyOmJ1dHRvblxuXHRcdFx0XHR0ZXh0VHJhbnNmb3JtOlwidXBwZXJjYXNlXCJcblx0XHRcdFx0Y29sb3I6c2V0dXAuY29sb3Jcblx0XHRcdFx0Zm9udFNpemU6MTRcblx0XHRcdFx0bGluZUhlaWdodDoxNFxuXHRcdFx0XHRmb250V2VpZ2h0OjUwMFxuXHRcdFx0bGFiZWwuY29uc3RyYWludHMgPVxuXHRcdFx0XHRhbGlnbjpcImNlbnRlclwiXG5cdFx0XHRidXR0b24ucHJvcHMgPVxuXHRcdFx0XHRiYWNrZ3JvdW5kQ29sb3I6bS5jb2xvcihzZXR1cC5iYWNrZ3JvdW5kQ29sb3IpXG5cdFx0XHRcdGhlaWdodDptLnB4KDM2KVxuXHRcdFx0XHR3aWR0aDpsYWJlbC53aWR0aCArIG0ucHgoMTYpXG5cdFx0XHRcdGJvcmRlclJhZGl1czptLnB4KDIpXG5cdFx0XHRcdGNsaXA6c2V0dXAuY2xpcFxuXG5cdFx0XHRpZiBidXR0b24ud2lkdGggPCBtLnB4KDY0KVxuXHRcdFx0XHRidXR0b24ud2lkdGggPSBtLnB4KDY0KVxuXG5cdFx0XHRzd2l0Y2ggc2V0dXAudHlwZVxuXHRcdFx0XHR3aGVuIFwicmFpc2VkXCJcblx0XHRcdFx0XHRidXR0b24ub3JpZ0JHQyA9IGJ1dHRvbi5iYWNrZ3JvdW5kQ29sb3Jcblx0XHRcdFx0XHRidXR0b24uc2hhZG93Q29sb3IgPSBcInJnYmEoMCwwLDAsLjI0KVwiXG5cdFx0XHRcdFx0YnV0dG9uLnNoYWRvd1kgPSBtLnB4KDIpXG5cdFx0XHRcdFx0YnV0dG9uLnNoYWRvd0JsdXIgPSBtLnB4KDIpXG5cdFx0XHRcdFx0cHJlc3NlZEJHQyA9IGJ1dHRvbi5iYWNrZ3JvdW5kQ29sb3IubGlnaHRlbigxMClcblx0XHRcdFx0XHRidXR0b24ub24gRXZlbnRzLlRvdWNoU3RhcnQsIC0+XG5cdFx0XHRcdFx0XHRidXR0b24uYW5pbWF0ZVxuXHRcdFx0XHRcdFx0XHRwcm9wZXJ0aWVzOlxuXHRcdFx0XHRcdFx0XHRcdGJhY2tncm91bmRDb2xvcjpwcmVzc2VkQkdDXG5cdFx0XHRcdFx0XHRcdFx0c2hhZG93WTptLnB4KDgpXG5cdFx0XHRcdFx0XHRcdFx0c2hhZG93Qmx1cjptLnB4KDgpXG5cdFx0XHRcdFx0YnV0dG9uLm9uIEV2ZW50cy5Ub3VjaEVuZCwgLT5cblx0XHRcdFx0XHRcdGJ1dHRvbi5hbmltYXRlXG5cdFx0XHRcdFx0XHRcdHByb3BlcnRpZXM6XG5cdFx0XHRcdFx0XHRcdFx0YmFja2dyb3VuZENvbG9yOiBidXR0b24ub3JpZ0JHQ1xuXHRcdFx0XHRcdFx0XHRcdHNoYWRvd1k6bS5weCgyKVxuXHRcdFx0XHRcdFx0XHRcdHNoYWRvd0JsdXI6bS5weCgyKVxuXHRcdFx0XHR3aGVuIFwiZmxhdFwiXG5cdFx0XHRcdFx0YnV0dG9uLm9yaWdCR0MgPSBidXR0b24uYmFja2dyb3VuZENvbG9yXG5cdFx0XHRcdFx0cHJlc3NlZEJHQyA9IGJ1dHRvbi5iYWNrZ3JvdW5kQ29sb3IuZGFya2VuKDUpXG5cdFx0XHRcdFx0YnV0dG9uLm9uIEV2ZW50cy5Ub3VjaFN0YXJ0LCAtPlxuXHRcdFx0XHRcdFx0YnV0dG9uLmFuaW1hdGVcblx0XHRcdFx0XHRcdFx0cHJvcGVydGllczpcblx0XHRcdFx0XHRcdFx0XHRiYWNrZ3JvdW5kQ29sb3I6cHJlc3NlZEJHQ1xuXHRcdFx0XHRcdGJ1dHRvbi5vbiBFdmVudHMuVG91Y2hFbmQsIC0+XG5cdFx0XHRcdFx0XHRidXR0b24uYW5pbWF0ZVxuXHRcdFx0XHRcdFx0XHRwcm9wZXJ0aWVzOlxuXHRcdFx0XHRcdFx0XHRcdGJhY2tncm91bmRDb2xvcjogYnV0dG9uLm9yaWdCR0NcblxuXG5cdFx0XHRpZiBzZXR1cC5jb25zdHJhaW50c1xuXHRcdFx0XHRidXR0b24uY29uc3RyYWludHMgPSBzZXR1cC5jb25zdHJhaW50c1xuXG5cdFx0XHRtLmxheW91dC5zZXRcblx0XHRcdFx0dGFyZ2V0OltidXR0b24sIGxhYmVsXVxuXG5cdGlmIHNldHVwLmlua1xuXHRcdHBhc3NlZEluayA9IHNldHVwLmlua1xuXHRcdHBhc3NlZEluay5sYXllciA9IGJ1dHRvblxuXG5cdFx0bS51dGlscy5pbmt5KHBhc3NlZEluaylcblx0YnV0dG9uLmxhYmVsID0gbGFiZWxcblx0cmV0dXJuIGJ1dHRvblxuIiwiIyMgQWxsb3dzIHlvdSB0byB1c2UgYWxsIHRoZSBNYXRlcmlhbCBLaXQgY29tcG9uZW50cyAmIGxvZ2ljXG5tID0gcmVxdWlyZSAnbWF0ZXJpYWwta2l0J1xuXG5leHBvcnRzLmRlZmF1bHRzID0ge1xuICBiYWNrZ3JvdW5kQ29sb3I6IFwiZ3JleTEwMFwiXG4gIHRhYnNDb2xvcjogXCJncmV5OTAwXCJcbiAgdGFiczogdW5kZWZpbmVkXG4gIHRhYkljb25zOiB1bmRlZmluZWRcbiAgbGFiZWxzOiB0cnVlXG4gIGluYWN0aXZlVGFiT3BhY2l0eTogLjZcbn1cblxuIyMgQ3JlYXRlcyBhIHByb3BlcnR5IGxpc3RcbmV4cG9ydHMuZGVmYXVsdHMucHJvcHMgPSBPYmplY3Qua2V5cyhleHBvcnRzLmRlZmF1bHRzKVxuXG5leHBvcnRzLmNyZWF0ZSA9IChhcnJheSkgLT5cblxuICAjIyBDcmVhdGVzIGEgc2V0dXAgb2JqZWN0IHRoYXQgaGFzIGRlZmF1bHRzICsgYW55IGN1c3RvbSBwcm9wcy5cbiAgc2V0dXAgPSBtLnV0aWxzLnNldHVwQ29tcG9uZW50KGFycmF5LCBleHBvcnRzLmRlZmF1bHRzKVxuXG4gICMgQ3JlYXRlIGJvdHRvbSBuYXZcbiAgYm90dG9tTmF2ID0gbmV3IExheWVyXG4gICAgbmFtZTogXCJib3R0b21OYXZcIlxuICAgIGJhY2tncm91bmRDb2xvcjptLmNvbG9yKHNldHVwLmJhY2tncm91bmRDb2xvcilcblx0XHRzaGFkb3dDb2xvcjogXCJyZ2JhKDAsIDAsIDAsIC4xMilcIlxuXHRcdHNoYWRvd0JsdXI6IG0ucHgoNClcblx0XHRzaGFkb3dZOiAtbS5weCgyKVxuICBib3R0b21OYXYuY29uc3RyYWludHMgPVxuICAgIGxlYWRpbmc6IDBcbiAgICB0cmFpbGluZzogMFxuICAgIGJvdHRvbTogNDZcbiAgICBoZWlnaHQ6IDU2XG4gIG0ubGF5b3V0LnNldChib3R0b21OYXYpXG5cbiAgIyBIYW5kbGUgdGFicyBzdGF0ZXNcbiAgaGFuZGxlVGFiU3RhdGVzID0gKGJvdHRvbU5hdiwgbGF5ZXIpIC0+XG5cbiAgICAjIFB1dCB0YWIgb2JqZWN0cyBpbnRvIGFycmF5XG4gICAgdGFic0FycmF5ID0gT2JqZWN0LmtleXMoYm90dG9tTmF2LnRhYnMpXG4gICAgYWN0aXZlVGFiSW5kZXggPSB1bmRlZmluZWRcblxuICAgIGZvciB0LCBpIGluIHRhYnNBcnJheVxuICAgICAgdGFiID0gYm90dG9tTmF2LnRhYnNbdF1cblxuICAgICAgIyBJZiB0aGlzIGlzIGlzIGFjdGl2ZSB0YWJcbiAgICAgIGlmIHRhYiA9PSBib3R0b21OYXYuYWN0aXZlVGFiXG5cbiAgICAgICAgYWN0aXZlVGFiSW5kZXggPSBpXG4gICAgICAgIHRhYi5pY29uLm9wYWNpdHkgPSAxXG4gICAgICAgIHRhYi5pY29uLmNvbnN0cmFpbnRzLnRvcCA9IDZcbiAgICAgICAgdGFiLmxhYmVsLm9wYWNpdHkgPSAxXG4gICAgICAgIHRhYi5sYWJlbC5jb25zdHJhaW50cy50b3AgPSB0YWIuaWNvblxuXG4gICAgICAgIGJvdHRvbU5hdi52aWV3c1t0XS5hbmltYXRlXG4gICAgICAgICAgcHJvcGVydGllczooeDowKVxuICAgICAgICAgIHRpbWU6LjI1XG5cbiAgICAgIGVsc2VcblxuICAgICAgICB0YWIuaWNvbi5vcGFjaXR5ID0gc2V0dXAuaW5hY3RpdmVUYWJPcGFjaXR5XG4gICAgICAgIHRhYi5pY29uLmNvbnN0cmFpbnRzLnRvcCA9IDE2XG4gICAgICAgIHRhYi5sYWJlbC5vcGFjaXR5ID0gMFxuICAgICAgICB0YWIubGFiZWwuY29uc3RyYWludHMudG9wID0gMjFcblxuICAgICAgICBpZiBhY3RpdmVUYWJJbmRleCA9PSB1bmRlZmluZWRcbiAgICAgICAgICBib3R0b21OYXYudmlld3NbdF0uYW5pbWF0ZVxuICAgICAgICAgICAgcHJvcGVydGllczooeDptLmRldmljZS53aWR0aCAqIC0xKVxuICAgICAgICAgICAgdGltZTouMjVcbiAgICAgICAgICAgIGN1cnZlOlwiY3ViaWMtYmV6aWVyKDAuNCwgMC4wLCAwLjIsIDEpXCJcbiAgICAgICAgZWxzZVxuICAgICAgICAgIGJvdHRvbU5hdi52aWV3c1t0XS5hbmltYXRlXG4gICAgICAgICAgICBwcm9wZXJ0aWVzOih4Om0uZGV2aWNlLndpZHRoKVxuICAgICAgICAgICAgdGltZTouMjVcbiAgICAgICAgICAgIGN1cnZlOlwiY3ViaWMtYmV6aWVyKDAuNCwgMC4wLCAwLjIsIDEpXCJcblxuICAgICAgbS5sYXlvdXQuYW5pbWF0ZSh0aW1lOiAuMSlcblxuICAjIFByZXBhcmUgb2JqZWN0cyB0byBwdXQgdGFicyBhbmQgdmlld3MgaW50b1xuICBib3R0b21OYXYudGFicyA9IHt9XG4gIGJvdHRvbU5hdi52aWV3cyA9IHt9XG5cbiAgIyBDcmVhdGUgdGFicyBpZiB5b3UgaGF2ZSBubyBtb3JlIHRoYW4gNSBkZXN0aW5hdGlvbnNcbiAgaWYgc2V0dXAudGFicy5sZW5ndGggPCA2XG4gICAgICBmb3IgdCwgaSBpbiBzZXR1cC50YWJzXG5cbiAgICAgICAgIyBDcmVhdGUgdmlld3NcbiAgICAgICAgdmlldyA9IG5ldyBMYXllclxuICAgICAgICAgIG5hbWU6IFwiVmlld1wiICsgdFxuICAgICAgICAgIGJhY2tncm91bmRDb2xvcjogXCJ0cmFuc3BhcmVudFwiXG4gICAgICAgIHZpZXcuY29uc3RyYWludHMgPVxuICAgICAgICAgIGJvdHRvbTogYm90dG9tTmF2XG4gICAgICAgICAgdG9wOiAwXG4gICAgICAgICAgd2lkdGg6bS5kcChtLmRldmljZS53aWR0aClcbiAgICAgICAgdmlldy5zZW5kVG9CYWNrKClcblxuICAgICAgICAjIFB1dCB2aWV3IGludG8gb2JqZWN0XG4gICAgICAgIGJvdHRvbU5hdi52aWV3c1t0XSA9IHZpZXdcblxuICAgICAgICAjIEFsbCBvdGhlciB2aWV3cyBleGNlcHQgb2YgZmlyc3QgdG8gdGhlIHJpZ2h0XG4gICAgICAgIGlmIGkgPiAwXG4gICAgICAgICAgdmlldy54ID0gbS5kZXZpY2Uud2lkdGhcblxuICAgICAgICAjIENyZWF0ZSB0YWIgY29udGFpbmVyc1xuICAgICAgICB0YWIgPSBuZXcgTGF5ZXJcbiAgICAgICAgICB3aWR0aDptLmRldmljZS53aWR0aC9zZXR1cC50YWJzLmxlbmd0aFxuICAgICAgICAgIGhlaWdodDogbS5weCg1NilcbiAgICAgICAgICB4OihtLmRldmljZS53aWR0aC9zZXR1cC50YWJzLmxlbmd0aCkgKiBpXG4gICAgICAgICAgc3VwZXJMYXllcjogYm90dG9tTmF2XG4gICAgICAgICAgYmFja2dyb3VuZENvbG9yOiBcInRyYW5zcGFyZW50XCJcbiAgICAgICAgICBjbGlwOiB0cnVlXG4gICAgICAgICAgbmFtZTogXCJ0YWJcIiArIHRcbiAgICAgICAgbS5sYXlvdXQuc2V0KHRhYilcblxuICAgICAgICAjIENyZWF0ZSBpY29uc1xuICAgICAgICBpY29uTmFtZSA9IHNldHVwLnRhYkljb25zW2ldXG4gICAgICAgIGljb24gPSBuZXcgbS5JY29uXG4gICAgICAgICAgbmFtZTogaWNvbk5hbWVcbiAgICAgICAgICBzdXBlckxheWVyOiB0YWJcbiAgICAgICAgICBjb2xvcjogc2V0dXAudGFic0NvbG9yXG4gICAgICAgICAgY29uc3RyYWludHM6IHt0b3A6IDE2fVxuICAgICAgICBpY29uLm9wYWNpdHkgPSBzZXR1cC5pbmFjdGl2ZVRhYk9wYWNpdHlcbiAgICAgICAgaWNvbi5jZW50ZXJYKClcblxuICAgICAgICAjIENyZWF0ZSBsYWJlbHNcbiAgICAgICAgbGFiZWwgPSBuZXcgbS5UZXh0XG4gICAgICAgICAgbmFtZTogdFxuICAgICAgICAgIHN1cGVyTGF5ZXI6IHRhYlxuICAgICAgICAgIHRleHQ6IHRcbiAgICAgICAgICBmb250U2l6ZTogMTRcbiAgICAgICAgICBjb2xvcjogc2V0dXAudGFic0NvbG9yXG4gICAgICAgICAgY29uc3RyYWludHM6IHt0b3A6IDIxfVxuICAgICAgICBsYWJlbC5vcGFjaXR5ID0gMFxuICAgICAgICBsYWJlbC5jZW50ZXJYKClcblxuICAgICAgICAjIFB1dCB0aGlzIGljb24gYW5kIGxhYmVsIGFzIGEgcHJvcGVydHlcbiAgICAgICAgdGFiLmljb24gPSBpY29uXG4gICAgICAgIHRhYi5sYWJlbCA9IGxhYmVsXG4gICAgICAgICMgUHV0IHRhYiBpbnRvIHRhYnMgb2JqZWN0XG4gICAgICAgIGJvdHRvbU5hdi50YWJzW3RdID0gdGFiXG5cbiAgICAgICAgdGFiLm9uIEV2ZW50cy5Ub3VjaEVuZCwgLT5cbiAgICAgICAgICBib3R0b21OYXYuYWN0aXZlVGFiID0gQFxuICAgICAgICAgIGhhbmRsZVRhYlN0YXRlcyhib3R0b21OYXYsIEApXG5cbiAgYm90dG9tTmF2LmFjdGl2ZVRhYiA9IGJvdHRvbU5hdi50YWJzW3NldHVwLnRhYnNbMF1dXG4gIGhhbmRsZVRhYlN0YXRlcyhib3R0b21OYXYsIGJvdHRvbU5hdi5hY3RpdmVUYWIpXG5cbiAgcmV0dXJuIGJvdHRvbU5hdlxuIiwiIyBCYW5uZXJcbm0gPSByZXF1aXJlICdtYXRlcmlhbC1raXQnXG5cbmV4cG9ydHMuZGVmYXVsdHMgPSB7XG5cdGFwcDogXCJBcHBcIlxuXHR0aXRsZTpcIlRpdGxlXCJcblx0bWVzc2FnZTpcIk1lc3NhZ2VcIlxuXHRhY3Rpb246XCJBY3Rpb25cIlxuXHR0aW1lOlwi4oCiIG5vd1wiXG5cdGljb246dW5kZWZpbmVkXG5cdGR1cmF0aW9uOjdcblx0YW5pbWF0ZWQ6dHJ1ZVxufVxuXG5leHBvcnRzLmRlZmF1bHRzLnByb3BzID0gT2JqZWN0LmtleXMoZXhwb3J0cy5kZWZhdWx0cylcblxuZXhwb3J0cy5jcmVhdGUgPSAoYXJyYXkpIC0+XG5cdHNldHVwID0gbS51dGlscy5zZXR1cENvbXBvbmVudChhcnJheSwgZXhwb3J0cy5kZWZhdWx0cylcblx0YmFubmVyID0gbmV3IExheWVyXG5cdFx0YmFja2dyb3VuZENvbG9yOlwid2hpdGVcIlxuXHRcdG5hbWU6XCJiYW5uZXJcIlxuXHRcdHNoYWRvd0NvbG9yOiBcInJnYmEoMCwwLDAsLjI0KVwiXG5cdFx0c2hhZG93Qmx1cjogbS5weCgyKVxuXHRcdHNoYWRvd1k6IG0ucHgoMilcblx0YmFubmVyLmNvbnN0cmFpbnRzID1cblx0XHRsZWFkaW5nOjBcblx0XHR0cmFpbGluZzowXG5cdFx0dG9wOjBcblx0XHRoZWlnaHQ6NzRcblxuXHQjIERpZmZlcmVudCBwb3NpdGlvbmluZ3MgZm9yIGVhY2ggZGV2aWNlXG5cdHN3aXRjaCBtLmRldmljZS5uYW1lXG5cdFx0d2hlbiBcImlwYWRcIlxuXHRcdFx0QGxlYWRpbmdJY29uID0gMjAwXG5cdFx0XHRAdG9wSWNvbiA9IDE1XG5cdFx0XHRAdG9wVGl0bGUgPSAxMVxuXHRcdHdoZW4gXCJpcGFkLXByb1wiXG5cdFx0XHRAbGVhZGluZ0ljb24gPSAxOTJcblx0XHRcdEB0b3BJY29uID0gMTJcblx0XHRcdEB0b3BUaXRsZSA9IDlcblx0XHR3aGVuIFwiaXBob25lLTZzLXBsdXNcIlxuXHRcdFx0QGxlYWRpbmdJY29uID0gMTVcblx0XHRcdEB0b3BJY29uID0gMTJcblx0XHRcdEB0b3BUaXRsZSA9IDEwXG5cdFx0ZWxzZVxuXHRcdFx0QGxlYWRpbmdJY29uID0gMTVcblx0XHRcdEB0b3BJY29uID0gOFxuXHRcdFx0QHRvcFRpdGxlID0gNlxuXG5cdGlmIHNldHVwLmljb24gPT0gdW5kZWZpbmVkXG5cdFx0c2V0dXAuaWNvbiA9IG5ldyBMYXllciBzdXBlckxheWVyOmJhbm5lclxuXHRcdHNldHVwLmljb24uc3R5bGVbXCJiYWNrZ3JvdW5kXCJdID0gXCJsaW5lYXItZ3JhZGllbnQoLTE4MGRlZywgIzY3RkY4MSAwJSwgIzAxQjQxRiAxMDAlKVwiXG5cdGVsc2Vcblx0XHRiYW5uZXIuYWRkU3ViTGF5ZXIoc2V0dXAuaWNvbilcblxuXHRzZXR1cC5pY29uLmJvcmRlclJhZGl1cyA9IG0udXRpbHMucHgoNC41KVxuXHRzZXR1cC5pY29uLm5hbWUgPSBcImljb25cIlxuXHRzZXR1cC5pY29uLmNvbnN0cmFpbnRzID1cblx0XHRoZWlnaHQ6MTZcblx0XHR3aWR0aDoxNlxuXHRcdGxlYWRpbmc6QGxlYWRpbmdJY29uXG5cdFx0dG9wOkB0b3BJY29uXG5cblx0YXBwID0gbmV3IG0uVGV4dCBzdHlsZTpcImFwcFwiLCB0ZXh0OnNldHVwLmFwcCwgY29sb3I6XCJibHVlXCIsIGZvbnRXZWlnaHQ6XCJtZWRpdW1cIiwgZm9udFNpemU6MTEsIHN1cGVyTGF5ZXI6YmFubmVyLCBuYW1lOlwidGl0bGVcIlxuXHRhcHAuY29uc3RyYWludHMgPVxuXHRcdHZlcnRpY2FsQ2VudGVyOnNldHVwLmljb25cblx0XHRsZWFkaW5nOltzZXR1cC5pY29uLCA1XVxuXHR0aXRsZSA9IG5ldyBtLlRleHQgc3R5bGU6XCJ0aXRsZVwiLCB0ZXh0OnNldHVwLnRpdGxlLCBjb2xvcjpcImJsYWNrXCIsIGZvbnRTaXplOjEzLCBzdXBlckxheWVyOmJhbm5lciwgbmFtZTpcInRpdGxlXCJcblx0dGl0bGUuY29uc3RyYWludHMgPVxuXHRcdGxlYWRpbmdFZGdlczpzZXR1cC5pY29uXG5cdFx0dG9wOltzZXR1cC5pY29uLCA3XVxuXG5cdG1lc3NhZ2UgPSBuZXcgbS5UZXh0IHN0eWxlOlwidGl0bGVcIiwgdGV4dDpzZXR1cC5tZXNzYWdlLCBjb2xvcjpcImdyZXlcIiwgZm9udFNpemU6MTMsIHN1cGVyTGF5ZXI6YmFubmVyLCBuYW1lOlwidGl0bGVcIlxuXHRtZXNzYWdlLmNvbnN0cmFpbnRzID1cblx0XHRsZWFkaW5nRWRnZXM6c2V0dXAuaWNvblxuXHRcdHRvcDpbdGl0bGUsIDVdXG5cblx0dGltZSA9IG5ldyBtLlRleHQgc3R5bGU6XCJ0aW1lXCIsIHRleHQ6c2V0dXAudGltZSwgY29sb3I6XCJncmV5XCIsIGZvbnRTaXplOjExLCBzdXBlckxheWVyOmJhbm5lciwgbmFtZTpcInRpbWVcIlxuXHR0aW1lLmNvbnN0cmFpbnRzID1cblx0XHRsZWFkaW5nOlthcHAsIDNdXG5cdFx0Ym90dG9tRWRnZXM6IGFwcFxuXG5cdG0ubGF5b3V0LnNldCgpXG5cdG0udXRpbHMuYmdCbHVyKGJhbm5lcilcblxuXHQjIyBCYW5uZXIgRHJhZyBzZXR0aW5nc1xuXHRiYW5uZXIuZHJhZ2dhYmxlID0gdHJ1ZVxuXHRiYW5uZXIuZHJhZ2dhYmxlLmhvcml6b250YWwgPSBmYWxzZVxuXHRiYW5uZXIuZHJhZ2dhYmxlLmNvbnN0cmFpbnRzID1cblx0XHR5OjBcblxuXHRiYW5uZXIuZHJhZ2dhYmxlLmJvdW5jZU9wdGlvbnMgPVxuXHQgICAgZnJpY3Rpb246IDI1XG5cdCAgICB0ZW5zaW9uOiAyNTBcblxuXHRiYW5uZXIub24gRXZlbnRzLkRyYWdFbmQsIC0+XG5cdFx0aWYgYmFubmVyLm1heFkgPCBtLnV0aWxzLnB4KDY4KVxuXHRcdFx0YmFubmVyLmFuaW1hdGVcblx0XHRcdFx0cHJvcGVydGllczoobWF4WTowKVxuXHRcdFx0XHR0aW1lOi4xNVxuXHRcdFx0XHRjdXJ2ZTpcImVhc2UtaW4tb3V0XCJcblx0XHRcdFV0aWxzLmRlbGF5IC4yNSwgLT5cblx0XHRcdFx0YmFubmVyLmRlc3Ryb3koKVxuXG5cdCMgQnVmZmVyIHRoYXQgc2l0cyBhYm92ZSB0aGUgYmFubmVyXG5cdGJhbm5lckJ1ZmZlciA9IG5ldyBMYXllciBtYXhZOjAsIG5hbWU6XCJidWZmZXJcIiwgYmFja2dyb3VuZENvbG9yOlwiIzFCMUIxQ1wiLCBvcGFjaXR5Oi45LCBzdXBlckxheWVyOmJhbm5lciwgd2lkdGg6bS5kZXZpY2Uud2lkdGgsIG1heFk6YmFubmVyLnksIGhlaWdodDptLmRldmljZS5oZWlnaHRcblx0bS51dGlscy5iZ0JsdXIoYmFubmVyQnVmZmVyKVxuXG5cdCMgQW5pbWF0ZS1pblxuXHRpZiBzZXR1cC5hbmltYXRlZCA9PSB0cnVlXG5cdFx0YmFubmVyLnkgPSAwIC0gYmFubmVyLmhlaWdodFxuXHRcdGJhbm5lci5hbmltYXRlXG5cdFx0XHRwcm9wZXJ0aWVzOih5OjApXG5cdFx0XHR0aW1lOi4yNVxuXHRcdFx0Y3VydmU6XCJzcHJpbmcoNDAwLDIwLDApXCJcblxuXHQjIEFuaW1hdGUtb3V0XG5cdGlmIHNldHVwLmR1cmF0aW9uXG5cdFx0VXRpbHMuZGVsYXkgc2V0dXAuZHVyYXRpb24sIC0+XG5cdFx0XHRiYW5uZXIuYW5pbWF0ZVxuXHRcdFx0XHRwcm9wZXJ0aWVzOihtYXhZOjApXG5cdFx0XHRcdHRpbWU6LjI1XG5cdFx0XHRcdGN1cnZlOlwiZWFzZS1pbi1vdXRcIlxuXHRcdFV0aWxzLmRlbGF5IHNldHVwLmR1cmF0aW9uICsgLjI1LCAtPlxuXHRcdFx0YmFubmVyLmRlc3Ryb3koKVxuXG5cdCMgRXhwb3J0IEJhbm5lclxuXHRiYW5uZXIuaWNvbiA9IHNldHVwLmljb25cblx0YmFubmVyLmFwcCA9IGFwcFxuXHRiYW5uZXIudGl0bGUgPSB0aXRsZVxuXHRiYW5uZXIubWVzc2FnZSA9IG1lc3NhZ2Vcblx0cmV0dXJuIGJhbm5lclxuIiwibSA9IHJlcXVpcmUgJ21hdGVyaWFsLWtpdCdcblxuZXhwb3J0cy5kZWZhdWx0cyA9IHtcblx0dGl0bGU6XCJUaXRsZVwiXG5cdG1lbnU6dW5kZWZpbmVkXG5cblx0dHlwZTpcImFwcGJhclwiXG5cdGJhY2tncm91bmRDb2xvcjpcIndoaXRlXCJcblx0dGFiczp1bmRlZmluZWRcblx0dGl0bGVDb2xvcjpcImJsYWNrXCJcblx0YWN0aW9uQ29sb3I6XCJibGFja1wiXG5cdHRhYnM6dW5kZWZpbmVkXG5cdHRhYnNDb2xvcjp1bmRlZmluZWRcblx0dGFic0luazp7Y29sb3I6XCJibHVlR3JleVwiLCBzY2FsZTo4fVxuXHR0YWJzQmFyQ29sb3I6XCJ5ZWxsb3dcIlxuXHR0YWJzQWx0Ontjb2xvcjp1bmRlZmluZWQsIG9wYWNpdHk6Ljd9XG5cdHRhYkljb25zOnVuZGVmaW5lZFxuXHRhY3Rpb25zOnVuZGVmaW5lZFxufVxuXG5leHBvcnRzLmRlZmF1bHRzLnByb3BzID0gT2JqZWN0LmtleXMoZXhwb3J0cy5kZWZhdWx0cylcblxuZXhwb3J0cy5jcmVhdGUgPSAoYXJyYXkpIC0+XG5cdHNldHVwID0gbS51dGlscy5zZXR1cENvbXBvbmVudChhcnJheSwgZXhwb3J0cy5kZWZhdWx0cylcblx0YmFyID0gbmV3IExheWVyXG5cdFx0bmFtZTpcIkFwcCBCYXJcIlxuXHRcdGJhY2tncm91bmRDb2xvcjptLmNvbG9yKHNldHVwLmJhY2tncm91bmRDb2xvcilcblx0XHRzaGFkb3dDb2xvcjogXCJyZ2JhKDAsIDAsIDAsIC4xMilcIlxuXHRcdHNoYWRvd0JsdXI6IG0ucHgoNClcblx0XHRzaGFkb3dZOiBtLnB4KDIpXG5cblx0YmFyLmNvbnN0cmFpbnRzID1cblx0XHRsZWFkaW5nOjBcblx0XHR0cmFpbGluZzowXG5cdFx0dG9wOjBcblx0XHRoZWlnaHQ6ODBcblxuXHRpZiBzZXR1cC50YWJzXG5cdFx0YmFyLmNvbnN0cmFpbnRzLmhlaWdodCA9IDEyOFxuXG5cdGJhckFyZWEgPSBuZXcgTGF5ZXIgc3VwZXJMYXllcjpiYXIsIGJhY2tncm91bmRDb2xvcjpcInRyYW5zcGFyZW50XCIsIG5hbWU6XCJiYXJBcmVhXCJcblx0YmFyQXJlYS5jb25zdHJhaW50cyA9XG5cdFx0bGVhZGluZzowXG5cdFx0dHJhaWxpbmc6MFxuXHRcdGhlaWdodDo1NlxuXHRcdGJvdHRvbTowXG5cblx0aWYgc2V0dXAudGFicyAmJiBzZXR1cC50YWJzLmxlbmd0aCA+IDJcblx0XHRiYXJBcmVhLmNvbnN0cmFpbnRzLmJvdHRvbSA9IDQ4XG5cblx0aWYgc2V0dXAuc3VwZXJMYXllclxuXHRcdHNldHVwLnN1cGVyTGF5ZXIuYWRkU3ViTGF5ZXIoYmFyKVxuXG5cdG0ubGF5b3V0LnNldChbYmFyLCBiYXJBcmVhXSlcblxuXHRiYXIudHlwZSA9IHNldHVwLnR5cGVcblxuXHRmb3IgbGF5ZXIgaW4gRnJhbWVyLkN1cnJlbnRDb250ZXh0LmxheWVyc1xuXHRcdGlmIGxheWVyLnR5cGUgPT0gXCJzdGF0dXNCYXJcIlxuXHRcdFx0QHN0YXR1c0JhciA9IGxheWVyXG5cdFx0XHRiYXIucGxhY2VCZWhpbmQoQHN0YXR1c0JhcilcblxuXHRpZiBzZXR1cC50aXRsZUNvbG9yID09IFwiYmxhY2tcIlxuXHRcdHNldHVwLnRpdGxlQ29sb3IgPSBtLnV0aWxzLmF1dG9Db2xvcihiYXIuYmFja2dyb3VuZENvbG9yKS50b0hleFN0cmluZygpXG5cblx0aWYgc2V0dXAuYWN0aW9uQ29sb3IgPT0gXCJibGFja1wiXG5cdFx0c2V0dXAuYWN0aW9uQ29sb3IgPSBtLnV0aWxzLmF1dG9Db2xvcihiYXIuYmFja2dyb3VuZENvbG9yKS50b0hleFN0cmluZygpXG5cblx0aWYgdHlwZW9mIHNldHVwLnRpdGxlID09IFwic3RyaW5nXCJcblx0XHR0aXRsZSA9IG5ldyBtLlRleHRcblx0XHRcdGNvbG9yOnNldHVwLnRpdGxlQ29sb3Jcblx0XHRcdGZvbnRXZWlnaHQ6NTAwXG5cdFx0XHRzdXBlckxheWVyOmJhckFyZWFcblx0XHRcdHRleHQ6c2V0dXAudGl0bGVcblx0XHRcdGZvbnRTaXplOjIwXG5cblx0bS51dGlscy5zcGVjaWFsQ2hhcih0aXRsZSlcblxuXG5cdHRpdGxlTGVhZGluZyA9IDE2XG5cdGlmIHNldHVwLm1lbnVcblx0XHRiYXIubWVudSA9IG5ldyBtLkljb25cblx0XHRcdG5hbWU6c2V0dXAubWVudVxuXHRcdFx0Y29sb3I6c2V0dXAuYWN0aW9uQ29sb3Jcblx0XHRcdHN1cGVyTGF5ZXI6YmFyQXJlYVxuXHRcdFx0Y29uc3RyYWludHM6e2xlYWRpbmc6MTYsIHZlcnRpY2FsQ2VudGVyOnRpdGxlfVxuXHRcdFx0Y2xpcDpmYWxzZVxuXHRcdHRpdGxlTGVhZGluZyA9IFtiYXIubWVudSwgMTZdXG5cblx0XHRtLnV0aWxzLmlua3lcblx0XHRcdGxheWVyOmJhci5tZW51XG5cdFx0XHRtb3ZlVG9UYXA6ZmFsc2Vcblx0XHRcdGNvbG9yOlwid2hpdGVcIlxuXHRcdFx0b3BhY2l0eTouNFxuXHRcdFx0c2NhbGU6Ljdcblx0XHRcdHN0YXJ0U2NhbGU6LjdcblxuXG5cdHRpdGxlLmNvbnN0cmFpbnRzID1cblx0XHRib3R0b206MTJcblx0XHRsZWFkaW5nOnRpdGxlTGVhZGluZ1xuXG5cdGlmIHNldHVwLmxlZnRBY3Rpb25cblx0XHR0aXRsZS5jb25zdHJhaW50cy5sZWFkaW5nID0gNzNcblxuXG5cdG0ubGF5b3V0LnNldFxuXHRcdHRhcmdldDpbdGl0bGVdXG5cblx0YWN0aW9uc0FycmF5ID0gW11cblx0aWYgc2V0dXAuYWN0aW9uc1xuXHRcdGZvciBhY3QsIGkgaW4gc2V0dXAuYWN0aW9uc1xuXHRcdFx0aWYgaSA9PSAwXG5cdFx0XHRcdGljb24gPSBuZXcgbS5JY29uXG5cdFx0XHRcdFx0bmFtZTphY3Rcblx0XHRcdFx0XHRzdXBlckxheWVyOmJhckFyZWFcblx0XHRcdFx0XHRjb25zdHJhaW50czp7dHJhaWxpbmc6MjQsIHZlcnRpY2FsQ2VudGVyOnRpdGxlfVxuXHRcdFx0XHRcdGNvbG9yOnNldHVwLmFjdGlvbkNvbG9yXG5cdFx0XHRcdFx0Y2xpcDpmYWxzZVxuXHRcdFx0XHRhY3Rpb25zQXJyYXkucHVzaCBpY29uXG5cdFx0XHRlbHNlXG5cdFx0XHRcdGljb24gPSBuZXcgbS5JY29uXG5cdFx0XHRcdFx0bmFtZTphY3Rcblx0XHRcdFx0XHRzdXBlckxheWVyOmJhckFyZWFcblx0XHRcdFx0XHRjb25zdHJhaW50czp7dHJhaWxpbmc6W2FjdGlvbnNBcnJheVtpIC0gMV0sIDI0XSwgdmVydGljYWxDZW50ZXI6dGl0bGV9XG5cdFx0XHRcdFx0Y29sb3I6c2V0dXAuYWN0aW9uQ29sb3Jcblx0XHRcdFx0XHRjbGlwOmZhbHNlXG5cdFx0XHRcdGFjdGlvbnNBcnJheS5wdXNoIGljb25cblxuXHRcdGZvciBhY3QgaW4gYWN0aW9uc0FycmF5XG5cdFx0XHRtLnV0aWxzLmlua3lcblx0XHRcdFx0bGF5ZXI6YWN0XG5cdFx0XHRcdG1vdmVUb1RhcDpmYWxzZVxuXHRcdFx0XHRjb2xvcjpcIndoaXRlXCJcblx0XHRcdFx0b3BhY2l0eTouNFxuXHRcdFx0XHRzY2FsZTouOFxuXHRcdFx0XHRzdGFydFNjYWxlOi43XG5cblxuXHRpZiBzZXR1cC50YWJzICYmIHNldHVwLnRhYnMubGVuZ3RoID4gMlxuXG5cdFx0aGFuZGxlVGFiU3RhdGVzID0gKGJhciwgbGF5ZXIpIC0+XG5cdFx0XHR0YWJzQXJyYXkgPSBPYmplY3Qua2V5cyhiYXIudGFicylcblx0XHRcdGFjdGl2ZVRhYkluZGV4ID0gdW5kZWZpbmVkXG5cdFx0XHRmb3IgdCwgaSBpbiB0YWJzQXJyYXlcblx0XHRcdFx0dGFiID0gYmFyLnRhYnNbdF1cblxuXHRcdFx0XHRpZiB0YWIgPT0gYmFyLmFjdGl2ZVRhYlxuXHRcdFx0XHRcdGFjdGl2ZVRhYkluZGV4ID0gaVxuXHRcdFx0XHRcdGJhci52aWV3c1t0XS5hbmltYXRlXG5cdFx0XHRcdFx0XHRwcm9wZXJ0aWVzOih4OjApXG5cdFx0XHRcdFx0XHR0aW1lOi4yNVxuXHRcdFx0XHRcdHRhYi5sYWJlbC5vcGFjaXR5ID0gMVxuXHRcdFx0XHRcdHRhYi5sYWJlbC5jb2xvciA9IHNldHVwLnRhYnNDb2xvclxuXHRcdFx0XHRcdGJhci5hY3RpdmVCYXIuYW5pbWF0ZVxuXHRcdFx0XHRcdFx0cHJvcGVydGllczooeDpsYXllci54KVxuXHRcdFx0XHRcdFx0dGltZTouMjVcblx0XHRcdFx0XHRcdGN1cnZlOlwiYmV6aWVyLWN1cnZlKC4yLCAwLjQsIDAuNCwgMS4wKVwiXG5cdFx0XHRcdFx0bS51dGlscy51cGRhdGUodGl0bGUsIFt7dGV4dDptLnV0aWxzLmNhcGl0YWxpemUoYmFyLmFjdGl2ZVRhYi5sYWJlbC5uYW1lKX1dKVxuXHRcdFx0XHRlbHNlXG5cdFx0XHRcdFx0aWYgYWN0aXZlVGFiSW5kZXggPT0gdW5kZWZpbmVkXG5cdFx0XHRcdFx0XHRiYXIudmlld3NbdF0uYW5pbWF0ZVxuXHRcdFx0XHRcdFx0XHRwcm9wZXJ0aWVzOih4Om0uZGV2aWNlLndpZHRoICogLTEpXG5cdFx0XHRcdFx0XHRcdHRpbWU6LjI1XG5cdFx0XHRcdFx0XHRcdGN1cnZlOlwiY3ViaWMtYmV6aWVyKDAuNCwgMC4wLCAwLjIsIDEpXCJcblx0XHRcdFx0XHRlbHNlXG5cdFx0XHRcdFx0XHRiYXIudmlld3NbdF0uYW5pbWF0ZVxuXHRcdFx0XHRcdFx0XHRwcm9wZXJ0aWVzOih4Om0uZGV2aWNlLndpZHRoKVxuXHRcdFx0XHRcdFx0XHR0aW1lOi4yNVxuXHRcdFx0XHRcdFx0XHRjdXJ2ZTpcImN1YmljLWJlemllcigwLjQsIDAuMCwgMC4yLCAxKVwiXG5cblx0XHRcdFx0XHRvcGFjaXR5ID0gMVxuXHRcdFx0XHRcdGNvbG9yID0gdGFiLmxhYmVsLmNvbG9yXG5cdFx0XHRcdFx0aWYgc2V0dXAudGFic0FsdC5vcGFjaXR5ICE9IHVuZGVmaW5lZFxuXHRcdFx0XHRcdFx0b3BhY2l0eSA9IHNldHVwLnRhYnNBbHQub3BhY2l0eVxuXG5cdFx0XHRcdFx0aWYgc2V0dXAudGFic0FsdC5jb2xvciAhPSB1bmRlZmluZWRcblx0XHRcdFx0XHRcdGNvbG9yID0gc2V0dXAudGFic0FsdC5jb2xvclxuXG5cdFx0XHRcdFx0dGFiLmxhYmVsLm9wYWNpdHkgPSBvcGFjaXR5XG5cdFx0XHRcdFx0dGFiLmxhYmVsLmNvbG9yID0gY29sb3JcblxuXHRcdHRhYnNBY3RpdmVCYXIgPSBuZXcgTGF5ZXJcblx0XHRcdGhlaWdodDptLnB4KDIpXG5cdFx0XHR3aWR0aDptLmRldmljZS53aWR0aC9zZXR1cC50YWJzLmxlbmd0aFxuXHRcdFx0YmFja2dyb3VuZENvbG9yOm0uY29sb3Ioc2V0dXAudGFic0JhckNvbG9yKVxuXHRcdFx0c3VwZXJMYXllcjpiYXJcblx0XHR0YWJzQWN0aXZlQmFyLmNvbnN0cmFpbnRzID1cblx0XHRcdGJvdHRvbTowXG5cdFx0YmFyLmFjdGl2ZUJhciA9IHRhYnNBY3RpdmVCYXJcblxuXHRcdGJhci50YWJzID0ge31cblx0XHRiYXIudmlld3MgPSB7fVxuXHRcdGlmIHNldHVwLnRhYnMubGVuZ3RoIDwgNVxuXHRcdFx0Zm9yIHQsIGkgaW4gc2V0dXAudGFic1xuXHRcdFx0XHR2aWV3ID0gbmV3IExheWVyXG5cdFx0XHRcdFx0bmFtZTpcIlZpZXcgXCIgKyB0XG5cdFx0XHRcdFx0YmFja2dyb3VuZENvbG9yOlwidHJhbnNwYXJlbnRcIlxuXHRcdFx0XHR2aWV3LmNvbnN0cmFpbnRzID1cblx0XHRcdFx0XHR0b3A6YmFyXG5cdFx0XHRcdFx0Ym90dG9tOjBcblx0XHRcdFx0XHR3aWR0aDptLmRwKG0uZGV2aWNlLndpZHRoKVxuXHRcdFx0XHRiYXIudmlld3NbdF0gPSB2aWV3XG5cdFx0XHRcdGlmIGkgPiAwXG5cdFx0XHRcdFx0dmlldy54ID0gbS5kZXZpY2Uud2lkdGhcblx0XHRcdFx0dGFiID0gbmV3IExheWVyXG5cdFx0XHRcdFx0d2lkdGg6bS5kZXZpY2Uud2lkdGgvc2V0dXAudGFicy5sZW5ndGhcblx0XHRcdFx0XHRoZWlnaHQ6bS5weCg0OClcblx0XHRcdFx0XHR4OihtLmRldmljZS53aWR0aC9zZXR1cC50YWJzLmxlbmd0aCkgKiBpXG5cdFx0XHRcdFx0c3VwZXJMYXllcjpiYXJcblx0XHRcdFx0XHRiYWNrZ3JvdW5kQ29sb3I6XCJ0cmFuc3BhcmVudFwiXG5cdFx0XHRcdFx0Y2xpcDp0cnVlXG5cdFx0XHRcdFx0bmFtZTpcInRhYiBcIlxuXHRcdFx0XHR0YWIuY29uc3RyYWludHMgPVxuXHRcdFx0XHRcdGJvdHRvbTowXG5cdFx0XHRcdG0ubGF5b3V0LnNldCh0YWIpXG5cdFx0XHRcdGlmIHNldHVwLnRhYnNDb2xvciA9PSB1bmRlZmluZWRcblx0XHRcdFx0XHRzZXR1cC50YWJzQ29sb3IgPSBtLnV0aWxzLmF1dG9Db2xvcihiYXIuYmFja2dyb3VuZENvbG9yKS50b0hleFN0cmluZygpXG5cdFx0XHRcdGxhYmVsID0gXCJcIlxuXHRcdFx0XHRpZiBzZXR1cC50YWJJY29uc1xuXHRcdFx0XHRcdGljb24gPSBzZXR1cC50YWJJY29uc1tpXVxuXHRcdFx0XHRcdGxhYmVsID0gbmV3IG0uSWNvblxuXHRcdFx0XHRcdFx0bmFtZTppY29uXG5cdFx0XHRcdFx0XHRzdXBlckxheWVyOnRhYlxuXHRcdFx0XHRcdFx0Y29sb3I6c2V0dXAudGFic0NvbG9yXG5cdFx0XHRcdFx0XHRjb25zdHJhaW50czp7YWxpZ246XCJjZW50ZXJcIn1cblx0XHRcdFx0ZWxzZVxuXHRcdFx0XHRcdGxhYmVsID0gbmV3IG0uVGV4dFxuXHRcdFx0XHRcdFx0c3VwZXJMYXllcjp0YWJcblx0XHRcdFx0XHRcdGNvbnN0cmFpbnRzOnthbGlnbjpcImNlbnRlclwifVxuXHRcdFx0XHRcdFx0dGV4dDp0XG5cdFx0XHRcdFx0XHR0ZXh0VHJhbnNmb3JtOidVcHBlcmNhc2UnXG5cdFx0XHRcdFx0XHRmb250U2l6ZToxNFxuXHRcdFx0XHRcdFx0Y29sb3I6c2V0dXAudGFic0NvbG9yXG5cdFx0XHRcdGxhYmVsLm5hbWUgPSB0XG5cblx0XHRcdFx0dGFiLmxhYmVsID0gbGFiZWxcblxuXHRcdFx0XHRzZXR1cC50YWJzSW5rW1wibGF5ZXJcIl0gPSB0YWJcblx0XHRcdFx0bS51dGlscy5pbmt5KHNldHVwLnRhYnNJbmspXG5cdFx0XHRcdGJhci50YWJzW3RdID0gdGFiXG5cblx0XHRcdFx0dGFiLm9uIEV2ZW50cy5Ub3VjaEVuZCwgLT5cblx0XHRcdFx0XHRiYXIuYWN0aXZlVGFiID0gQFxuXHRcdFx0XHRcdGhhbmRsZVRhYlN0YXRlcyhiYXIsIEApXG5cdGlmIHNldHVwLnRhYnNcblx0XHRpZiBzZXR1cC50YWJzLmxlbmd0aCA+IDJcblx0XHRcdGJhci5hY3RpdmVUYWIgPSBiYXIudGFic1tzZXR1cC50YWJzWzBdXVxuXHRcdFx0aGFuZGxlVGFiU3RhdGVzKGJhciwgYmFyLmFjdGl2ZVRhYilcblx0YmFyLnRpdGxlID0gdGl0bGVcblxuXG5cblx0cmV0dXJuIGJhclxuIiwiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFpQkFBO0FEQUEsSUFBQTs7QUFBQSxDQUFBLEdBQUksT0FBQSxDQUFRLGNBQVI7O0FBRUosT0FBTyxDQUFDLFFBQVIsR0FBbUI7RUFDbEIsS0FBQSxFQUFNLE9BRFk7RUFFbEIsSUFBQSxFQUFLLE1BRmE7RUFJbEIsSUFBQSxFQUFLLFFBSmE7RUFLbEIsZUFBQSxFQUFnQixPQUxFO0VBTWxCLElBQUEsRUFBSyxNQU5hO0VBT2xCLFVBQUEsRUFBVyxPQVBPO0VBUWxCLFdBQUEsRUFBWSxPQVJNO0VBU2xCLElBQUEsRUFBSyxNQVRhO0VBVWxCLFNBQUEsRUFBVSxNQVZRO0VBV2xCLE9BQUEsRUFBUTtJQUFDLEtBQUEsRUFBTSxVQUFQO0lBQW1CLEtBQUEsRUFBTSxDQUF6QjtHQVhVO0VBWWxCLFlBQUEsRUFBYSxRQVpLO0VBYWxCLE9BQUEsRUFBUTtJQUFDLEtBQUEsRUFBTSxNQUFQO0lBQWtCLE9BQUEsRUFBUSxFQUExQjtHQWJVO0VBY2xCLFFBQUEsRUFBUyxNQWRTO0VBZWxCLE9BQUEsRUFBUSxNQWZVOzs7QUFrQm5CLE9BQU8sQ0FBQyxRQUFRLENBQUMsS0FBakIsR0FBeUIsTUFBTSxDQUFDLElBQVAsQ0FBWSxPQUFPLENBQUMsUUFBcEI7O0FBRXpCLE9BQU8sQ0FBQyxNQUFSLEdBQWlCLFNBQUMsS0FBRDtBQUNoQixNQUFBO0VBQUEsS0FBQSxHQUFRLENBQUMsQ0FBQyxLQUFLLENBQUMsY0FBUixDQUF1QixLQUF2QixFQUE4QixPQUFPLENBQUMsUUFBdEM7RUFDUixHQUFBLEdBQVUsSUFBQSxLQUFBLENBQ1Q7SUFBQSxJQUFBLEVBQUssU0FBTDtJQUNBLGVBQUEsRUFBZ0IsQ0FBQyxDQUFDLEtBQUYsQ0FBUSxLQUFLLENBQUMsZUFBZCxDQURoQjtJQUVBLFdBQUEsRUFBYSxvQkFGYjtJQUdBLFVBQUEsRUFBWSxDQUFDLENBQUMsRUFBRixDQUFLLENBQUwsQ0FIWjtJQUlBLE9BQUEsRUFBUyxDQUFDLENBQUMsRUFBRixDQUFLLENBQUwsQ0FKVDtHQURTO0VBT1YsR0FBRyxDQUFDLFdBQUosR0FDQztJQUFBLE9BQUEsRUFBUSxDQUFSO0lBQ0EsUUFBQSxFQUFTLENBRFQ7SUFFQSxHQUFBLEVBQUksQ0FGSjtJQUdBLE1BQUEsRUFBTyxFQUhQOztFQUtELElBQUcsS0FBSyxDQUFDLElBQVQ7SUFDQyxHQUFHLENBQUMsV0FBVyxDQUFDLE1BQWhCLEdBQXlCLElBRDFCOztFQUdBLE9BQUEsR0FBYyxJQUFBLEtBQUEsQ0FBTTtJQUFBLFVBQUEsRUFBVyxHQUFYO0lBQWdCLGVBQUEsRUFBZ0IsYUFBaEM7SUFBK0MsSUFBQSxFQUFLLFNBQXBEO0dBQU47RUFDZCxPQUFPLENBQUMsV0FBUixHQUNDO0lBQUEsT0FBQSxFQUFRLENBQVI7SUFDQSxRQUFBLEVBQVMsQ0FEVDtJQUVBLE1BQUEsRUFBTyxFQUZQO0lBR0EsTUFBQSxFQUFPLENBSFA7O0VBS0QsSUFBRyxLQUFLLENBQUMsSUFBTixJQUFjLEtBQUssQ0FBQyxJQUFJLENBQUMsTUFBWCxHQUFvQixDQUFyQztJQUNDLE9BQU8sQ0FBQyxXQUFXLENBQUMsTUFBcEIsR0FBNkIsR0FEOUI7O0VBR0EsSUFBRyxLQUFLLENBQUMsVUFBVDtJQUNDLEtBQUssQ0FBQyxVQUFVLENBQUMsV0FBakIsQ0FBNkIsR0FBN0IsRUFERDs7RUFHQSxDQUFDLENBQUMsTUFBTSxDQUFDLEdBQVQsQ0FBYSxDQUFDLEdBQUQsRUFBTSxPQUFOLENBQWI7RUFFQSxHQUFHLENBQUMsSUFBSixHQUFXLEtBQUssQ0FBQztBQUVqQjtBQUFBLE9BQUEscUNBQUE7O0lBQ0MsSUFBRyxLQUFLLENBQUMsSUFBTixLQUFjLFdBQWpCO01BQ0MsSUFBQyxDQUFBLFNBQUQsR0FBYTtNQUNiLEdBQUcsQ0FBQyxXQUFKLENBQWdCLElBQUMsQ0FBQSxTQUFqQixFQUZEOztBQUREO0VBS0EsSUFBRyxLQUFLLENBQUMsVUFBTixLQUFvQixPQUF2QjtJQUNDLEtBQUssQ0FBQyxVQUFOLEdBQW1CLENBQUMsQ0FBQyxLQUFLLENBQUMsU0FBUixDQUFrQixHQUFHLENBQUMsZUFBdEIsQ0FBc0MsQ0FBQyxXQUF2QyxDQUFBLEVBRHBCOztFQUdBLElBQUcsS0FBSyxDQUFDLFdBQU4sS0FBcUIsT0FBeEI7SUFDQyxLQUFLLENBQUMsV0FBTixHQUFvQixDQUFDLENBQUMsS0FBSyxDQUFDLFNBQVIsQ0FBa0IsR0FBRyxDQUFDLGVBQXRCLENBQXNDLENBQUMsV0FBdkMsQ0FBQSxFQURyQjs7RUFHQSxJQUFHLE9BQU8sS0FBSyxDQUFDLEtBQWIsS0FBc0IsUUFBekI7SUFDQyxLQUFBLEdBQVksSUFBQSxDQUFDLENBQUMsSUFBRixDQUNYO01BQUEsS0FBQSxFQUFNLEtBQUssQ0FBQyxVQUFaO01BQ0EsVUFBQSxFQUFXLEdBRFg7TUFFQSxVQUFBLEVBQVcsT0FGWDtNQUdBLElBQUEsRUFBSyxLQUFLLENBQUMsS0FIWDtNQUlBLFFBQUEsRUFBUyxFQUpUO0tBRFcsRUFEYjs7RUFRQSxDQUFDLENBQUMsS0FBSyxDQUFDLFdBQVIsQ0FBb0IsS0FBcEI7RUFHQSxZQUFBLEdBQWU7RUFDZixJQUFHLEtBQUssQ0FBQyxJQUFUO0lBQ0MsR0FBRyxDQUFDLElBQUosR0FBZSxJQUFBLENBQUMsQ0FBQyxJQUFGLENBQ2Q7TUFBQSxJQUFBLEVBQUssS0FBSyxDQUFDLElBQVg7TUFDQSxLQUFBLEVBQU0sS0FBSyxDQUFDLFdBRFo7TUFFQSxVQUFBLEVBQVcsT0FGWDtNQUdBLFdBQUEsRUFBWTtRQUFDLE9BQUEsRUFBUSxFQUFUO1FBQWEsY0FBQSxFQUFlLEtBQTVCO09BSFo7TUFJQSxJQUFBLEVBQUssS0FKTDtLQURjO0lBTWYsWUFBQSxHQUFlLENBQUMsR0FBRyxDQUFDLElBQUwsRUFBVyxFQUFYO0lBRWYsQ0FBQyxDQUFDLEtBQUssQ0FBQyxJQUFSLENBQ0M7TUFBQSxLQUFBLEVBQU0sR0FBRyxDQUFDLElBQVY7TUFDQSxTQUFBLEVBQVUsS0FEVjtNQUVBLEtBQUEsRUFBTSxPQUZOO01BR0EsT0FBQSxFQUFRLEVBSFI7TUFJQSxLQUFBLEVBQU0sRUFKTjtNQUtBLFVBQUEsRUFBVyxFQUxYO0tBREQsRUFURDs7RUFrQkEsS0FBSyxDQUFDLFdBQU4sR0FDQztJQUFBLE1BQUEsRUFBTyxFQUFQO0lBQ0EsT0FBQSxFQUFRLFlBRFI7O0VBR0QsSUFBRyxLQUFLLENBQUMsVUFBVDtJQUNDLEtBQUssQ0FBQyxXQUFXLENBQUMsT0FBbEIsR0FBNEIsR0FEN0I7O0VBSUEsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxHQUFULENBQ0M7SUFBQSxNQUFBLEVBQU8sQ0FBQyxLQUFELENBQVA7R0FERDtFQUdBLFlBQUEsR0FBZTtFQUNmLElBQUcsS0FBSyxDQUFDLE9BQVQ7QUFDQztBQUFBLFNBQUEsZ0RBQUE7O01BQ0MsSUFBRyxDQUFBLEtBQUssQ0FBUjtRQUNDLElBQUEsR0FBVyxJQUFBLENBQUMsQ0FBQyxJQUFGLENBQ1Y7VUFBQSxJQUFBLEVBQUssR0FBTDtVQUNBLFVBQUEsRUFBVyxPQURYO1VBRUEsV0FBQSxFQUFZO1lBQUMsUUFBQSxFQUFTLEVBQVY7WUFBYyxjQUFBLEVBQWUsS0FBN0I7V0FGWjtVQUdBLEtBQUEsRUFBTSxLQUFLLENBQUMsV0FIWjtVQUlBLElBQUEsRUFBSyxLQUpMO1NBRFU7UUFNWCxZQUFZLENBQUMsSUFBYixDQUFrQixJQUFsQixFQVBEO09BQUEsTUFBQTtRQVNDLElBQUEsR0FBVyxJQUFBLENBQUMsQ0FBQyxJQUFGLENBQ1Y7VUFBQSxJQUFBLEVBQUssR0FBTDtVQUNBLFVBQUEsRUFBVyxPQURYO1VBRUEsV0FBQSxFQUFZO1lBQUMsUUFBQSxFQUFTLENBQUMsWUFBYSxDQUFBLENBQUEsR0FBSSxDQUFKLENBQWQsRUFBc0IsRUFBdEIsQ0FBVjtZQUFxQyxjQUFBLEVBQWUsS0FBcEQ7V0FGWjtVQUdBLEtBQUEsRUFBTSxLQUFLLENBQUMsV0FIWjtVQUlBLElBQUEsRUFBSyxLQUpMO1NBRFU7UUFNWCxZQUFZLENBQUMsSUFBYixDQUFrQixJQUFsQixFQWZEOztBQUREO0FBa0JBLFNBQUEsZ0RBQUE7O01BQ0MsQ0FBQyxDQUFDLEtBQUssQ0FBQyxJQUFSLENBQ0M7UUFBQSxLQUFBLEVBQU0sR0FBTjtRQUNBLFNBQUEsRUFBVSxLQURWO1FBRUEsS0FBQSxFQUFNLE9BRk47UUFHQSxPQUFBLEVBQVEsRUFIUjtRQUlBLEtBQUEsRUFBTSxFQUpOO1FBS0EsVUFBQSxFQUFXLEVBTFg7T0FERDtBQURELEtBbkJEOztFQTZCQSxJQUFHLEtBQUssQ0FBQyxJQUFOLElBQWMsS0FBSyxDQUFDLElBQUksQ0FBQyxNQUFYLEdBQW9CLENBQXJDO0lBRUMsZUFBQSxHQUFrQixTQUFDLEdBQUQsRUFBTSxLQUFOO0FBQ2pCLFVBQUE7TUFBQSxTQUFBLEdBQVksTUFBTSxDQUFDLElBQVAsQ0FBWSxHQUFHLENBQUMsSUFBaEI7TUFDWixjQUFBLEdBQWlCO0FBQ2pCO1dBQUEscURBQUE7O1FBQ0MsR0FBQSxHQUFNLEdBQUcsQ0FBQyxJQUFLLENBQUEsQ0FBQTtRQUVmLElBQUcsR0FBQSxLQUFPLEdBQUcsQ0FBQyxTQUFkO1VBQ0MsY0FBQSxHQUFpQjtVQUNqQixHQUFHLENBQUMsS0FBTSxDQUFBLENBQUEsQ0FBRSxDQUFDLE9BQWIsQ0FDQztZQUFBLFVBQUEsRUFBWTtjQUFBLENBQUEsRUFBRSxDQUFGO2FBQVo7WUFDQSxJQUFBLEVBQUssR0FETDtXQUREO1VBR0EsR0FBRyxDQUFDLEtBQUssQ0FBQyxPQUFWLEdBQW9CO1VBQ3BCLEdBQUcsQ0FBQyxLQUFLLENBQUMsS0FBVixHQUFrQixLQUFLLENBQUM7VUFDeEIsR0FBRyxDQUFDLFNBQVMsQ0FBQyxPQUFkLENBQ0M7WUFBQSxVQUFBLEVBQVk7Y0FBQSxDQUFBLEVBQUUsS0FBSyxDQUFDLENBQVI7YUFBWjtZQUNBLElBQUEsRUFBSyxHQURMO1lBRUEsS0FBQSxFQUFNLGlDQUZOO1dBREQ7dUJBSUEsQ0FBQyxDQUFDLEtBQUssQ0FBQyxNQUFSLENBQWUsS0FBZixFQUFzQjtZQUFDO2NBQUMsSUFBQSxFQUFLLENBQUMsQ0FBQyxLQUFLLENBQUMsVUFBUixDQUFtQixHQUFHLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxJQUF2QyxDQUFOO2FBQUQ7V0FBdEIsR0FYRDtTQUFBLE1BQUE7VUFhQyxJQUFHLGNBQUEsS0FBa0IsTUFBckI7WUFDQyxHQUFHLENBQUMsS0FBTSxDQUFBLENBQUEsQ0FBRSxDQUFDLE9BQWIsQ0FDQztjQUFBLFVBQUEsRUFBWTtnQkFBQSxDQUFBLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxLQUFULEdBQWlCLENBQUMsQ0FBcEI7ZUFBWjtjQUNBLElBQUEsRUFBSyxHQURMO2NBRUEsS0FBQSxFQUFNLGdDQUZOO2FBREQsRUFERDtXQUFBLE1BQUE7WUFNQyxHQUFHLENBQUMsS0FBTSxDQUFBLENBQUEsQ0FBRSxDQUFDLE9BQWIsQ0FDQztjQUFBLFVBQUEsRUFBWTtnQkFBQSxDQUFBLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxLQUFYO2VBQVo7Y0FDQSxJQUFBLEVBQUssR0FETDtjQUVBLEtBQUEsRUFBTSxnQ0FGTjthQURELEVBTkQ7O1VBV0EsT0FBQSxHQUFVO1VBQ1YsS0FBQSxHQUFRLEdBQUcsQ0FBQyxLQUFLLENBQUM7VUFDbEIsSUFBRyxLQUFLLENBQUMsT0FBTyxDQUFDLE9BQWQsS0FBeUIsTUFBNUI7WUFDQyxPQUFBLEdBQVUsS0FBSyxDQUFDLE9BQU8sQ0FBQyxRQUR6Qjs7VUFHQSxJQUFHLEtBQUssQ0FBQyxPQUFPLENBQUMsS0FBZCxLQUF1QixNQUExQjtZQUNDLEtBQUEsR0FBUSxLQUFLLENBQUMsT0FBTyxDQUFDLE1BRHZCOztVQUdBLEdBQUcsQ0FBQyxLQUFLLENBQUMsT0FBVixHQUFvQjt1QkFDcEIsR0FBRyxDQUFDLEtBQUssQ0FBQyxLQUFWLEdBQWtCLE9BakNuQjs7QUFIRDs7SUFIaUI7SUF5Q2xCLGFBQUEsR0FBb0IsSUFBQSxLQUFBLENBQ25CO01BQUEsTUFBQSxFQUFPLENBQUMsQ0FBQyxFQUFGLENBQUssQ0FBTCxDQUFQO01BQ0EsS0FBQSxFQUFNLENBQUMsQ0FBQyxNQUFNLENBQUMsS0FBVCxHQUFlLEtBQUssQ0FBQyxJQUFJLENBQUMsTUFEaEM7TUFFQSxlQUFBLEVBQWdCLENBQUMsQ0FBQyxLQUFGLENBQVEsS0FBSyxDQUFDLFlBQWQsQ0FGaEI7TUFHQSxVQUFBLEVBQVcsR0FIWDtLQURtQjtJQUtwQixhQUFhLENBQUMsV0FBZCxHQUNDO01BQUEsTUFBQSxFQUFPLENBQVA7O0lBQ0QsR0FBRyxDQUFDLFNBQUosR0FBZ0I7SUFFaEIsR0FBRyxDQUFDLElBQUosR0FBVztJQUNYLEdBQUcsQ0FBQyxLQUFKLEdBQVk7SUFDWixJQUFHLEtBQUssQ0FBQyxJQUFJLENBQUMsTUFBWCxHQUFvQixDQUF2QjtBQUNDO0FBQUEsV0FBQSxnREFBQTs7UUFDQyxJQUFBLEdBQVcsSUFBQSxLQUFBLENBQ1Y7VUFBQSxJQUFBLEVBQUssT0FBQSxHQUFVLENBQWY7VUFDQSxlQUFBLEVBQWdCLGFBRGhCO1NBRFU7UUFHWCxJQUFJLENBQUMsV0FBTCxHQUNDO1VBQUEsR0FBQSxFQUFJLEdBQUo7VUFDQSxNQUFBLEVBQU8sQ0FEUDtVQUVBLEtBQUEsRUFBTSxDQUFDLENBQUMsRUFBRixDQUFLLENBQUMsQ0FBQyxNQUFNLENBQUMsS0FBZCxDQUZOOztRQUdELEdBQUcsQ0FBQyxLQUFNLENBQUEsQ0FBQSxDQUFWLEdBQWU7UUFDZixJQUFHLENBQUEsR0FBSSxDQUFQO1VBQ0MsSUFBSSxDQUFDLENBQUwsR0FBUyxDQUFDLENBQUMsTUFBTSxDQUFDLE1BRG5COztRQUVBLEdBQUEsR0FBVSxJQUFBLEtBQUEsQ0FDVDtVQUFBLEtBQUEsRUFBTSxDQUFDLENBQUMsTUFBTSxDQUFDLEtBQVQsR0FBZSxLQUFLLENBQUMsSUFBSSxDQUFDLE1BQWhDO1VBQ0EsTUFBQSxFQUFPLENBQUMsQ0FBQyxFQUFGLENBQUssRUFBTCxDQURQO1VBRUEsQ0FBQSxFQUFFLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxLQUFULEdBQWUsS0FBSyxDQUFDLElBQUksQ0FBQyxNQUEzQixDQUFBLEdBQXFDLENBRnZDO1VBR0EsVUFBQSxFQUFXLEdBSFg7VUFJQSxlQUFBLEVBQWdCLGFBSmhCO1VBS0EsSUFBQSxFQUFLLElBTEw7VUFNQSxJQUFBLEVBQUssTUFOTDtTQURTO1FBUVYsR0FBRyxDQUFDLFdBQUosR0FDQztVQUFBLE1BQUEsRUFBTyxDQUFQOztRQUNELENBQUMsQ0FBQyxNQUFNLENBQUMsR0FBVCxDQUFhLEdBQWI7UUFDQSxJQUFHLEtBQUssQ0FBQyxTQUFOLEtBQW1CLE1BQXRCO1VBQ0MsS0FBSyxDQUFDLFNBQU4sR0FBa0IsQ0FBQyxDQUFDLEtBQUssQ0FBQyxTQUFSLENBQWtCLEdBQUcsQ0FBQyxlQUF0QixDQUFzQyxDQUFDLFdBQXZDLENBQUEsRUFEbkI7O1FBRUEsS0FBQSxHQUFRO1FBQ1IsSUFBRyxLQUFLLENBQUMsUUFBVDtVQUNDLElBQUEsR0FBTyxLQUFLLENBQUMsUUFBUyxDQUFBLENBQUE7VUFDdEIsS0FBQSxHQUFZLElBQUEsQ0FBQyxDQUFDLElBQUYsQ0FDWDtZQUFBLElBQUEsRUFBSyxJQUFMO1lBQ0EsVUFBQSxFQUFXLEdBRFg7WUFFQSxLQUFBLEVBQU0sS0FBSyxDQUFDLFNBRlo7WUFHQSxXQUFBLEVBQVk7Y0FBQyxLQUFBLEVBQU0sUUFBUDthQUhaO1dBRFcsRUFGYjtTQUFBLE1BQUE7VUFRQyxLQUFBLEdBQVksSUFBQSxDQUFDLENBQUMsSUFBRixDQUNYO1lBQUEsVUFBQSxFQUFXLEdBQVg7WUFDQSxXQUFBLEVBQVk7Y0FBQyxLQUFBLEVBQU0sUUFBUDthQURaO1lBRUEsSUFBQSxFQUFLLENBRkw7WUFHQSxhQUFBLEVBQWMsV0FIZDtZQUlBLFFBQUEsRUFBUyxFQUpUO1lBS0EsS0FBQSxFQUFNLEtBQUssQ0FBQyxTQUxaO1dBRFcsRUFSYjs7UUFlQSxLQUFLLENBQUMsSUFBTixHQUFhO1FBRWIsR0FBRyxDQUFDLEtBQUosR0FBWTtRQUVaLEtBQUssQ0FBQyxPQUFRLENBQUEsT0FBQSxDQUFkLEdBQXlCO1FBQ3pCLENBQUMsQ0FBQyxLQUFLLENBQUMsSUFBUixDQUFhLEtBQUssQ0FBQyxPQUFuQjtRQUNBLEdBQUcsQ0FBQyxJQUFLLENBQUEsQ0FBQSxDQUFULEdBQWM7UUFFZCxHQUFHLENBQUMsRUFBSixDQUFPLE1BQU0sQ0FBQyxRQUFkLEVBQXdCLFNBQUE7VUFDdkIsR0FBRyxDQUFDLFNBQUosR0FBZ0I7aUJBQ2hCLGVBQUEsQ0FBZ0IsR0FBaEIsRUFBcUIsSUFBckI7UUFGdUIsQ0FBeEI7QUFoREQsT0FERDtLQXRERDs7RUEwR0EsSUFBRyxLQUFLLENBQUMsSUFBVDtJQUNDLElBQUcsS0FBSyxDQUFDLElBQUksQ0FBQyxNQUFYLEdBQW9CLENBQXZCO01BQ0MsR0FBRyxDQUFDLFNBQUosR0FBZ0IsR0FBRyxDQUFDLElBQUssQ0FBQSxLQUFLLENBQUMsSUFBSyxDQUFBLENBQUEsQ0FBWDtNQUN6QixlQUFBLENBQWdCLEdBQWhCLEVBQXFCLEdBQUcsQ0FBQyxTQUF6QixFQUZEO0tBREQ7O0VBSUEsR0FBRyxDQUFDLEtBQUosR0FBWTtBQUlaLFNBQU87QUF2T1M7Ozs7QURyQmpCLElBQUE7O0FBQUEsQ0FBQSxHQUFJLE9BQUEsQ0FBUSxjQUFSOztBQUVKLE9BQU8sQ0FBQyxRQUFSLEdBQW1CO0VBQ2xCLEdBQUEsRUFBSyxLQURhO0VBRWxCLEtBQUEsRUFBTSxPQUZZO0VBR2xCLE9BQUEsRUFBUSxTQUhVO0VBSWxCLE1BQUEsRUFBTyxRQUpXO0VBS2xCLElBQUEsRUFBSyxPQUxhO0VBTWxCLElBQUEsRUFBSyxNQU5hO0VBT2xCLFFBQUEsRUFBUyxDQVBTO0VBUWxCLFFBQUEsRUFBUyxJQVJTOzs7QUFXbkIsT0FBTyxDQUFDLFFBQVEsQ0FBQyxLQUFqQixHQUF5QixNQUFNLENBQUMsSUFBUCxDQUFZLE9BQU8sQ0FBQyxRQUFwQjs7QUFFekIsT0FBTyxDQUFDLE1BQVIsR0FBaUIsU0FBQyxLQUFEO0FBQ2hCLE1BQUE7RUFBQSxLQUFBLEdBQVEsQ0FBQyxDQUFDLEtBQUssQ0FBQyxjQUFSLENBQXVCLEtBQXZCLEVBQThCLE9BQU8sQ0FBQyxRQUF0QztFQUNSLE1BQUEsR0FBYSxJQUFBLEtBQUEsQ0FDWjtJQUFBLGVBQUEsRUFBZ0IsT0FBaEI7SUFDQSxJQUFBLEVBQUssUUFETDtJQUVBLFdBQUEsRUFBYSxpQkFGYjtJQUdBLFVBQUEsRUFBWSxDQUFDLENBQUMsRUFBRixDQUFLLENBQUwsQ0FIWjtJQUlBLE9BQUEsRUFBUyxDQUFDLENBQUMsRUFBRixDQUFLLENBQUwsQ0FKVDtHQURZO0VBTWIsTUFBTSxDQUFDLFdBQVAsR0FDQztJQUFBLE9BQUEsRUFBUSxDQUFSO0lBQ0EsUUFBQSxFQUFTLENBRFQ7SUFFQSxHQUFBLEVBQUksQ0FGSjtJQUdBLE1BQUEsRUFBTyxFQUhQOztBQU1ELFVBQU8sQ0FBQyxDQUFDLE1BQU0sQ0FBQyxJQUFoQjtBQUFBLFNBQ00sTUFETjtNQUVFLElBQUMsQ0FBQSxXQUFELEdBQWU7TUFDZixJQUFDLENBQUEsT0FBRCxHQUFXO01BQ1gsSUFBQyxDQUFBLFFBQUQsR0FBWTtBQUhSO0FBRE4sU0FLTSxVQUxOO01BTUUsSUFBQyxDQUFBLFdBQUQsR0FBZTtNQUNmLElBQUMsQ0FBQSxPQUFELEdBQVc7TUFDWCxJQUFDLENBQUEsUUFBRCxHQUFZO0FBSFI7QUFMTixTQVNNLGdCQVROO01BVUUsSUFBQyxDQUFBLFdBQUQsR0FBZTtNQUNmLElBQUMsQ0FBQSxPQUFELEdBQVc7TUFDWCxJQUFDLENBQUEsUUFBRCxHQUFZO0FBSFI7QUFUTjtNQWNFLElBQUMsQ0FBQSxXQUFELEdBQWU7TUFDZixJQUFDLENBQUEsT0FBRCxHQUFXO01BQ1gsSUFBQyxDQUFBLFFBQUQsR0FBWTtBQWhCZDtFQWtCQSxJQUFHLEtBQUssQ0FBQyxJQUFOLEtBQWMsTUFBakI7SUFDQyxLQUFLLENBQUMsSUFBTixHQUFpQixJQUFBLEtBQUEsQ0FBTTtNQUFBLFVBQUEsRUFBVyxNQUFYO0tBQU47SUFDakIsS0FBSyxDQUFDLElBQUksQ0FBQyxLQUFNLENBQUEsWUFBQSxDQUFqQixHQUFpQyxxREFGbEM7R0FBQSxNQUFBO0lBSUMsTUFBTSxDQUFDLFdBQVAsQ0FBbUIsS0FBSyxDQUFDLElBQXpCLEVBSkQ7O0VBTUEsS0FBSyxDQUFDLElBQUksQ0FBQyxZQUFYLEdBQTBCLENBQUMsQ0FBQyxLQUFLLENBQUMsRUFBUixDQUFXLEdBQVg7RUFDMUIsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFYLEdBQWtCO0VBQ2xCLEtBQUssQ0FBQyxJQUFJLENBQUMsV0FBWCxHQUNDO0lBQUEsTUFBQSxFQUFPLEVBQVA7SUFDQSxLQUFBLEVBQU0sRUFETjtJQUVBLE9BQUEsRUFBUSxJQUFDLENBQUEsV0FGVDtJQUdBLEdBQUEsRUFBSSxJQUFDLENBQUEsT0FITDs7RUFLRCxHQUFBLEdBQVUsSUFBQSxDQUFDLENBQUMsSUFBRixDQUFPO0lBQUEsS0FBQSxFQUFNLEtBQU47SUFBYSxJQUFBLEVBQUssS0FBSyxDQUFDLEdBQXhCO0lBQTZCLEtBQUEsRUFBTSxNQUFuQztJQUEyQyxVQUFBLEVBQVcsUUFBdEQ7SUFBZ0UsUUFBQSxFQUFTLEVBQXpFO0lBQTZFLFVBQUEsRUFBVyxNQUF4RjtJQUFnRyxJQUFBLEVBQUssT0FBckc7R0FBUDtFQUNWLEdBQUcsQ0FBQyxXQUFKLEdBQ0M7SUFBQSxjQUFBLEVBQWUsS0FBSyxDQUFDLElBQXJCO0lBQ0EsT0FBQSxFQUFRLENBQUMsS0FBSyxDQUFDLElBQVAsRUFBYSxDQUFiLENBRFI7O0VBRUQsS0FBQSxHQUFZLElBQUEsQ0FBQyxDQUFDLElBQUYsQ0FBTztJQUFBLEtBQUEsRUFBTSxPQUFOO0lBQWUsSUFBQSxFQUFLLEtBQUssQ0FBQyxLQUExQjtJQUFpQyxLQUFBLEVBQU0sT0FBdkM7SUFBZ0QsUUFBQSxFQUFTLEVBQXpEO0lBQTZELFVBQUEsRUFBVyxNQUF4RTtJQUFnRixJQUFBLEVBQUssT0FBckY7R0FBUDtFQUNaLEtBQUssQ0FBQyxXQUFOLEdBQ0M7SUFBQSxZQUFBLEVBQWEsS0FBSyxDQUFDLElBQW5CO0lBQ0EsR0FBQSxFQUFJLENBQUMsS0FBSyxDQUFDLElBQVAsRUFBYSxDQUFiLENBREo7O0VBR0QsT0FBQSxHQUFjLElBQUEsQ0FBQyxDQUFDLElBQUYsQ0FBTztJQUFBLEtBQUEsRUFBTSxPQUFOO0lBQWUsSUFBQSxFQUFLLEtBQUssQ0FBQyxPQUExQjtJQUFtQyxLQUFBLEVBQU0sTUFBekM7SUFBaUQsUUFBQSxFQUFTLEVBQTFEO0lBQThELFVBQUEsRUFBVyxNQUF6RTtJQUFpRixJQUFBLEVBQUssT0FBdEY7R0FBUDtFQUNkLE9BQU8sQ0FBQyxXQUFSLEdBQ0M7SUFBQSxZQUFBLEVBQWEsS0FBSyxDQUFDLElBQW5CO0lBQ0EsR0FBQSxFQUFJLENBQUMsS0FBRCxFQUFRLENBQVIsQ0FESjs7RUFHRCxJQUFBLEdBQVcsSUFBQSxDQUFDLENBQUMsSUFBRixDQUFPO0lBQUEsS0FBQSxFQUFNLE1BQU47SUFBYyxJQUFBLEVBQUssS0FBSyxDQUFDLElBQXpCO0lBQStCLEtBQUEsRUFBTSxNQUFyQztJQUE2QyxRQUFBLEVBQVMsRUFBdEQ7SUFBMEQsVUFBQSxFQUFXLE1BQXJFO0lBQTZFLElBQUEsRUFBSyxNQUFsRjtHQUFQO0VBQ1gsSUFBSSxDQUFDLFdBQUwsR0FDQztJQUFBLE9BQUEsRUFBUSxDQUFDLEdBQUQsRUFBTSxDQUFOLENBQVI7SUFDQSxXQUFBLEVBQWEsR0FEYjs7RUFHRCxDQUFDLENBQUMsTUFBTSxDQUFDLEdBQVQsQ0FBQTtFQUNBLENBQUMsQ0FBQyxLQUFLLENBQUMsTUFBUixDQUFlLE1BQWY7RUFHQSxNQUFNLENBQUMsU0FBUCxHQUFtQjtFQUNuQixNQUFNLENBQUMsU0FBUyxDQUFDLFVBQWpCLEdBQThCO0VBQzlCLE1BQU0sQ0FBQyxTQUFTLENBQUMsV0FBakIsR0FDQztJQUFBLENBQUEsRUFBRSxDQUFGOztFQUVELE1BQU0sQ0FBQyxTQUFTLENBQUMsYUFBakIsR0FDSTtJQUFBLFFBQUEsRUFBVSxFQUFWO0lBQ0EsT0FBQSxFQUFTLEdBRFQ7O0VBR0osTUFBTSxDQUFDLEVBQVAsQ0FBVSxNQUFNLENBQUMsT0FBakIsRUFBMEIsU0FBQTtJQUN6QixJQUFHLE1BQU0sQ0FBQyxJQUFQLEdBQWMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxFQUFSLENBQVcsRUFBWCxDQUFqQjtNQUNDLE1BQU0sQ0FBQyxPQUFQLENBQ0M7UUFBQSxVQUFBLEVBQVk7VUFBQSxJQUFBLEVBQUssQ0FBTDtTQUFaO1FBQ0EsSUFBQSxFQUFLLEdBREw7UUFFQSxLQUFBLEVBQU0sYUFGTjtPQUREO2FBSUEsS0FBSyxDQUFDLEtBQU4sQ0FBWSxHQUFaLEVBQWlCLFNBQUE7ZUFDaEIsTUFBTSxDQUFDLE9BQVAsQ0FBQTtNQURnQixDQUFqQixFQUxEOztFQUR5QixDQUExQjtFQVVBLFlBQUEsR0FBbUIsSUFBQSxLQUFBLENBQU07SUFBQSxJQUFBLEVBQUssQ0FBTDtJQUFRLElBQUEsRUFBSyxRQUFiO0lBQXVCLGVBQUEsRUFBZ0IsU0FBdkM7SUFBa0QsT0FBQSxFQUFRLEVBQTFEO0lBQThELFVBQUEsRUFBVyxNQUF6RTtJQUFpRixLQUFBLEVBQU0sQ0FBQyxDQUFDLE1BQU0sQ0FBQyxLQUFoRztJQUF1RyxJQUFBLEVBQUssTUFBTSxDQUFDLENBQW5IO0lBQXNILE1BQUEsRUFBTyxDQUFDLENBQUMsTUFBTSxDQUFDLE1BQXRJO0dBQU47RUFDbkIsQ0FBQyxDQUFDLEtBQUssQ0FBQyxNQUFSLENBQWUsWUFBZjtFQUdBLElBQUcsS0FBSyxDQUFDLFFBQU4sS0FBa0IsSUFBckI7SUFDQyxNQUFNLENBQUMsQ0FBUCxHQUFXLENBQUEsR0FBSSxNQUFNLENBQUM7SUFDdEIsTUFBTSxDQUFDLE9BQVAsQ0FDQztNQUFBLFVBQUEsRUFBWTtRQUFBLENBQUEsRUFBRSxDQUFGO09BQVo7TUFDQSxJQUFBLEVBQUssR0FETDtNQUVBLEtBQUEsRUFBTSxrQkFGTjtLQURELEVBRkQ7O0VBUUEsSUFBRyxLQUFLLENBQUMsUUFBVDtJQUNDLEtBQUssQ0FBQyxLQUFOLENBQVksS0FBSyxDQUFDLFFBQWxCLEVBQTRCLFNBQUE7YUFDM0IsTUFBTSxDQUFDLE9BQVAsQ0FDQztRQUFBLFVBQUEsRUFBWTtVQUFBLElBQUEsRUFBSyxDQUFMO1NBQVo7UUFDQSxJQUFBLEVBQUssR0FETDtRQUVBLEtBQUEsRUFBTSxhQUZOO09BREQ7SUFEMkIsQ0FBNUI7SUFLQSxLQUFLLENBQUMsS0FBTixDQUFZLEtBQUssQ0FBQyxRQUFOLEdBQWlCLEdBQTdCLEVBQWtDLFNBQUE7YUFDakMsTUFBTSxDQUFDLE9BQVAsQ0FBQTtJQURpQyxDQUFsQyxFQU5EOztFQVVBLE1BQU0sQ0FBQyxJQUFQLEdBQWMsS0FBSyxDQUFDO0VBQ3BCLE1BQU0sQ0FBQyxHQUFQLEdBQWE7RUFDYixNQUFNLENBQUMsS0FBUCxHQUFlO0VBQ2YsTUFBTSxDQUFDLE9BQVAsR0FBaUI7QUFDakIsU0FBTztBQW5IUzs7OztBRGZqQixJQUFBOztBQUFBLENBQUEsR0FBSSxPQUFBLENBQVEsY0FBUjs7QUFFSixPQUFPLENBQUMsUUFBUixHQUFtQjtFQUNqQixlQUFBLEVBQWlCLFNBREE7RUFFakIsU0FBQSxFQUFXLFNBRk07RUFHakIsSUFBQSxFQUFNLE1BSFc7RUFJakIsUUFBQSxFQUFVLE1BSk87RUFLakIsTUFBQSxFQUFRLElBTFM7RUFNakIsa0JBQUEsRUFBb0IsRUFOSDs7O0FBVW5CLE9BQU8sQ0FBQyxRQUFRLENBQUMsS0FBakIsR0FBeUIsTUFBTSxDQUFDLElBQVAsQ0FBWSxPQUFPLENBQUMsUUFBcEI7O0FBRXpCLE9BQU8sQ0FBQyxNQUFSLEdBQWlCLFNBQUMsS0FBRDtBQUdmLE1BQUE7RUFBQSxLQUFBLEdBQVEsQ0FBQyxDQUFDLEtBQUssQ0FBQyxjQUFSLENBQXVCLEtBQXZCLEVBQThCLE9BQU8sQ0FBQyxRQUF0QztFQUdSLFNBQUEsR0FBZ0IsSUFBQSxLQUFBLENBQ2Q7SUFBQSxJQUFBLEVBQU0sV0FBTjtJQUNBLGVBQUEsRUFBZ0IsQ0FBQyxDQUFDLEtBQUYsQ0FBUSxLQUFLLENBQUMsZUFBZCxDQURoQjtHQURjO0VBR2hCLENBQUE7SUFBQSxXQUFBLEVBQWEsb0JBQWI7SUFDQSxVQUFBLEVBQVksQ0FBQyxDQUFDLEVBQUYsQ0FBSyxDQUFMLENBRFo7SUFFQSxPQUFBLEVBQVMsQ0FBQyxDQUFDLENBQUMsRUFBRixDQUFLLENBQUwsQ0FGVjtHQUFBO0VBR0EsU0FBUyxDQUFDLFdBQVYsR0FDRTtJQUFBLE9BQUEsRUFBUyxDQUFUO0lBQ0EsUUFBQSxFQUFVLENBRFY7SUFFQSxNQUFBLEVBQVEsRUFGUjtJQUdBLE1BQUEsRUFBUSxFQUhSOztFQUlGLENBQUMsQ0FBQyxNQUFNLENBQUMsR0FBVCxDQUFhLFNBQWI7RUFHQSxlQUFBLEdBQWtCLFNBQUMsU0FBRCxFQUFZLEtBQVo7QUFHaEIsUUFBQTtJQUFBLFNBQUEsR0FBWSxNQUFNLENBQUMsSUFBUCxDQUFZLFNBQVMsQ0FBQyxJQUF0QjtJQUNaLGNBQUEsR0FBaUI7QUFFakI7U0FBQSxtREFBQTs7TUFDRSxHQUFBLEdBQU0sU0FBUyxDQUFDLElBQUssQ0FBQSxDQUFBO01BR3JCLElBQUcsR0FBQSxLQUFPLFNBQVMsQ0FBQyxTQUFwQjtRQUVFLGNBQUEsR0FBaUI7UUFDakIsR0FBRyxDQUFDLElBQUksQ0FBQyxPQUFULEdBQW1CO1FBQ25CLEdBQUcsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLEdBQXJCLEdBQTJCO1FBQzNCLEdBQUcsQ0FBQyxLQUFLLENBQUMsT0FBVixHQUFvQjtRQUNwQixHQUFHLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxHQUF0QixHQUE0QixHQUFHLENBQUM7UUFFaEMsU0FBUyxDQUFDLEtBQU0sQ0FBQSxDQUFBLENBQUUsQ0FBQyxPQUFuQixDQUNFO1VBQUEsVUFBQSxFQUFZO1lBQUEsQ0FBQSxFQUFFLENBQUY7V0FBWjtVQUNBLElBQUEsRUFBSyxHQURMO1NBREYsRUFSRjtPQUFBLE1BQUE7UUFjRSxHQUFHLENBQUMsSUFBSSxDQUFDLE9BQVQsR0FBbUIsS0FBSyxDQUFDO1FBQ3pCLEdBQUcsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLEdBQXJCLEdBQTJCO1FBQzNCLEdBQUcsQ0FBQyxLQUFLLENBQUMsT0FBVixHQUFvQjtRQUNwQixHQUFHLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxHQUF0QixHQUE0QjtRQUU1QixJQUFHLGNBQUEsS0FBa0IsTUFBckI7VUFDRSxTQUFTLENBQUMsS0FBTSxDQUFBLENBQUEsQ0FBRSxDQUFDLE9BQW5CLENBQ0U7WUFBQSxVQUFBLEVBQVk7Y0FBQSxDQUFBLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxLQUFULEdBQWlCLENBQUMsQ0FBcEI7YUFBWjtZQUNBLElBQUEsRUFBSyxHQURMO1lBRUEsS0FBQSxFQUFNLGdDQUZOO1dBREYsRUFERjtTQUFBLE1BQUE7VUFNRSxTQUFTLENBQUMsS0FBTSxDQUFBLENBQUEsQ0FBRSxDQUFDLE9BQW5CLENBQ0U7WUFBQSxVQUFBLEVBQVk7Y0FBQSxDQUFBLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxLQUFYO2FBQVo7WUFDQSxJQUFBLEVBQUssR0FETDtZQUVBLEtBQUEsRUFBTSxnQ0FGTjtXQURGLEVBTkY7U0FuQkY7O21CQThCQSxDQUFDLENBQUMsTUFBTSxDQUFDLE9BQVQsQ0FBaUI7UUFBQSxJQUFBLEVBQU0sRUFBTjtPQUFqQjtBQWxDRjs7RUFOZ0I7RUEyQ2xCLFNBQVMsQ0FBQyxJQUFWLEdBQWlCO0VBQ2pCLFNBQVMsQ0FBQyxLQUFWLEdBQWtCO0VBR2xCLElBQUcsS0FBSyxDQUFDLElBQUksQ0FBQyxNQUFYLEdBQW9CLENBQXZCO0FBQ0k7QUFBQSxTQUFBLDZDQUFBOztNQUdFLElBQUEsR0FBVyxJQUFBLEtBQUEsQ0FDVDtRQUFBLElBQUEsRUFBTSxNQUFBLEdBQVMsQ0FBZjtRQUNBLGVBQUEsRUFBaUIsYUFEakI7T0FEUztNQUdYLElBQUksQ0FBQyxXQUFMLEdBQ0U7UUFBQSxNQUFBLEVBQVEsU0FBUjtRQUNBLEdBQUEsRUFBSyxDQURMO1FBRUEsS0FBQSxFQUFNLENBQUMsQ0FBQyxFQUFGLENBQUssQ0FBQyxDQUFDLE1BQU0sQ0FBQyxLQUFkLENBRk47O01BR0YsSUFBSSxDQUFDLFVBQUwsQ0FBQTtNQUdBLFNBQVMsQ0FBQyxLQUFNLENBQUEsQ0FBQSxDQUFoQixHQUFxQjtNQUdyQixJQUFHLENBQUEsR0FBSSxDQUFQO1FBQ0UsSUFBSSxDQUFDLENBQUwsR0FBUyxDQUFDLENBQUMsTUFBTSxDQUFDLE1BRHBCOztNQUlBLEdBQUEsR0FBVSxJQUFBLEtBQUEsQ0FDUjtRQUFBLEtBQUEsRUFBTSxDQUFDLENBQUMsTUFBTSxDQUFDLEtBQVQsR0FBZSxLQUFLLENBQUMsSUFBSSxDQUFDLE1BQWhDO1FBQ0EsTUFBQSxFQUFRLENBQUMsQ0FBQyxFQUFGLENBQUssRUFBTCxDQURSO1FBRUEsQ0FBQSxFQUFFLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxLQUFULEdBQWUsS0FBSyxDQUFDLElBQUksQ0FBQyxNQUEzQixDQUFBLEdBQXFDLENBRnZDO1FBR0EsVUFBQSxFQUFZLFNBSFo7UUFJQSxlQUFBLEVBQWlCLGFBSmpCO1FBS0EsSUFBQSxFQUFNLElBTE47UUFNQSxJQUFBLEVBQU0sS0FBQSxHQUFRLENBTmQ7T0FEUTtNQVFWLENBQUMsQ0FBQyxNQUFNLENBQUMsR0FBVCxDQUFhLEdBQWI7TUFHQSxRQUFBLEdBQVcsS0FBSyxDQUFDLFFBQVMsQ0FBQSxDQUFBO01BQzFCLElBQUEsR0FBVyxJQUFBLENBQUMsQ0FBQyxJQUFGLENBQ1Q7UUFBQSxJQUFBLEVBQU0sUUFBTjtRQUNBLFVBQUEsRUFBWSxHQURaO1FBRUEsS0FBQSxFQUFPLEtBQUssQ0FBQyxTQUZiO1FBR0EsV0FBQSxFQUFhO1VBQUMsR0FBQSxFQUFLLEVBQU47U0FIYjtPQURTO01BS1gsSUFBSSxDQUFDLE9BQUwsR0FBZSxLQUFLLENBQUM7TUFDckIsSUFBSSxDQUFDLE9BQUwsQ0FBQTtNQUdBLEtBQUEsR0FBWSxJQUFBLENBQUMsQ0FBQyxJQUFGLENBQ1Y7UUFBQSxJQUFBLEVBQU0sQ0FBTjtRQUNBLFVBQUEsRUFBWSxHQURaO1FBRUEsSUFBQSxFQUFNLENBRk47UUFHQSxRQUFBLEVBQVUsRUFIVjtRQUlBLEtBQUEsRUFBTyxLQUFLLENBQUMsU0FKYjtRQUtBLFdBQUEsRUFBYTtVQUFDLEdBQUEsRUFBSyxFQUFOO1NBTGI7T0FEVTtNQU9aLEtBQUssQ0FBQyxPQUFOLEdBQWdCO01BQ2hCLEtBQUssQ0FBQyxPQUFOLENBQUE7TUFHQSxHQUFHLENBQUMsSUFBSixHQUFXO01BQ1gsR0FBRyxDQUFDLEtBQUosR0FBWTtNQUVaLFNBQVMsQ0FBQyxJQUFLLENBQUEsQ0FBQSxDQUFmLEdBQW9CO01BRXBCLEdBQUcsQ0FBQyxFQUFKLENBQU8sTUFBTSxDQUFDLFFBQWQsRUFBd0IsU0FBQTtRQUN0QixTQUFTLENBQUMsU0FBVixHQUFzQjtlQUN0QixlQUFBLENBQWdCLFNBQWhCLEVBQTJCLElBQTNCO01BRnNCLENBQXhCO0FBekRGLEtBREo7O0VBOERBLFNBQVMsQ0FBQyxTQUFWLEdBQXNCLFNBQVMsQ0FBQyxJQUFLLENBQUEsS0FBSyxDQUFDLElBQUssQ0FBQSxDQUFBLENBQVg7RUFDckMsZUFBQSxDQUFnQixTQUFoQixFQUEyQixTQUFTLENBQUMsU0FBckM7QUFFQSxTQUFPO0FBcElROzs7O0FEZmpCLElBQUE7O0FBQUEsQ0FBQSxHQUFJLE9BQUEsQ0FBUSxjQUFSOztBQUVKLE9BQU8sQ0FBQyxRQUFSLEdBQW1CO0VBQ2pCLElBQUEsRUFBSyxNQURZO0VBRWpCLElBQUEsRUFBSyxNQUZZO0VBR2pCLGVBQUEsRUFBZ0IsT0FIQztFQUlqQixLQUFBLEVBQU0sU0FKVztFQUtqQixJQUFBLEVBQUssUUFMWTtFQU1qQixVQUFBLEVBQVcsTUFOTTtFQU9qQixXQUFBLEVBQVksTUFQSztFQVFqQixJQUFBLEVBQUssTUFSWTtFQVNqQixJQUFBLEVBQUssSUFUWTtFQVVqQixHQUFBLEVBQUksTUFWYTs7O0FBYW5CLE9BQU8sQ0FBQyxRQUFRLENBQUMsS0FBakIsR0FBeUIsTUFBTSxDQUFDLElBQVAsQ0FBWSxPQUFPLENBQUMsUUFBcEI7O0FBRXpCLE9BQU8sQ0FBQyxNQUFSLEdBQWlCLFNBQUMsS0FBRDtBQUNoQixNQUFBO0VBQUEsS0FBQSxHQUFRLENBQUMsQ0FBQyxLQUFLLENBQUMsY0FBUixDQUF1QixLQUF2QixFQUE4QixPQUFPLENBQUMsUUFBdEM7RUFFUixNQUFBLEdBQWEsSUFBQSxLQUFBLENBQ1o7SUFBQSxJQUFBLEVBQUssS0FBSyxDQUFDLElBQVg7SUFDQSxJQUFBLEVBQUssS0FBSyxDQUFDLElBRFg7R0FEWTtFQUliLElBQUcsS0FBSyxDQUFDLFVBQVQ7SUFDQyxLQUFLLENBQUMsVUFBVSxDQUFDLFdBQWpCLENBQTZCLE1BQTdCLEVBREQ7O0VBR0EsTUFBTSxDQUFDLElBQVAsR0FBYyxLQUFLLENBQUM7QUFDcEIsVUFBTyxLQUFLLENBQUMsSUFBYjtBQUFBLFNBQ00sVUFETjtNQUVFLE1BQU0sQ0FBQyxXQUFQLEdBQ0U7UUFBQSxLQUFBLEVBQU0sRUFBTjtRQUNBLE1BQUEsRUFBTyxFQURQO1FBRUEsTUFBQSxFQUFPLEVBRlA7UUFHQSxRQUFBLEVBQVMsRUFIVDs7TUFJRixJQUFHLENBQUMsQ0FBQyxNQUFNLENBQUMsS0FBVCxHQUFpQixDQUFwQjtRQUNDLE1BQU0sQ0FBQyxXQUFXLENBQUMsS0FBbkIsR0FBMkI7UUFDM0IsTUFBTSxDQUFDLFdBQVcsQ0FBQyxNQUFuQixHQUE0QixHQUY3Qjs7TUFHQSxNQUFNLENBQUMsWUFBUCxHQUFzQixDQUFDLENBQUMsRUFBRixDQUFLLEVBQUw7TUFDdEIsTUFBTSxDQUFDLFdBQVAsR0FBcUI7TUFDckIsTUFBTSxDQUFDLE9BQVAsR0FBaUIsQ0FBQyxDQUFDLEVBQUYsQ0FBSyxDQUFMO01BQ2pCLE1BQU0sQ0FBQyxVQUFQLEdBQW9CLENBQUMsQ0FBQyxFQUFGLENBQUssQ0FBTDtNQUNwQixNQUFNLENBQUMsZUFBUCxHQUF5QixDQUFDLENBQUMsS0FBRixDQUFRLEtBQUssQ0FBQyxlQUFkO01BQ3pCLElBQUcsT0FBTyxLQUFLLENBQUMsSUFBYixLQUFxQixRQUF4QjtRQUNDLElBQUEsR0FBTyxDQUFDLENBQUMsSUFBRixDQUNOO1VBQUEsSUFBQSxFQUFLLEtBQUssQ0FBQyxJQUFYO1VBQ0EsS0FBQSxFQUFNLEtBQUssQ0FBQyxLQURaO1VBRUEsVUFBQSxFQUFXLE1BRlg7VUFHQSxXQUFBLEVBQVk7WUFBQyxLQUFBLEVBQU0sUUFBUDtXQUhaO1NBRE0sRUFEUjs7TUFPQSxDQUFDLENBQUMsTUFBTSxDQUFDLEdBQVQsQ0FDQztRQUFBLE1BQUEsRUFBTyxDQUFDLE1BQUQsQ0FBUDtPQUREO01BRUEsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxHQUFULENBQ0M7UUFBQSxNQUFBLEVBQU8sQ0FBQyxJQUFELENBQVA7T0FERDtBQXZCSTtBQUROO01BNEJFLEtBQUEsR0FBWSxJQUFBLENBQUMsQ0FBQyxJQUFGLENBQ1g7UUFBQSxJQUFBLEVBQUssS0FBSyxDQUFDLElBQVg7UUFDQSxVQUFBLEVBQVcsTUFEWDtRQUVBLGFBQUEsRUFBYyxXQUZkO1FBR0EsS0FBQSxFQUFNLEtBQUssQ0FBQyxLQUhaO1FBSUEsUUFBQSxFQUFTLEVBSlQ7UUFLQSxVQUFBLEVBQVcsRUFMWDtRQU1BLFVBQUEsRUFBVyxHQU5YO09BRFc7TUFRWixLQUFLLENBQUMsV0FBTixHQUNDO1FBQUEsS0FBQSxFQUFNLFFBQU47O01BQ0QsTUFBTSxDQUFDLEtBQVAsR0FDQztRQUFBLGVBQUEsRUFBZ0IsQ0FBQyxDQUFDLEtBQUYsQ0FBUSxLQUFLLENBQUMsZUFBZCxDQUFoQjtRQUNBLE1BQUEsRUFBTyxDQUFDLENBQUMsRUFBRixDQUFLLEVBQUwsQ0FEUDtRQUVBLEtBQUEsRUFBTSxLQUFLLENBQUMsS0FBTixHQUFjLENBQUMsQ0FBQyxFQUFGLENBQUssRUFBTCxDQUZwQjtRQUdBLFlBQUEsRUFBYSxDQUFDLENBQUMsRUFBRixDQUFLLENBQUwsQ0FIYjtRQUlBLElBQUEsRUFBSyxLQUFLLENBQUMsSUFKWDs7TUFNRCxJQUFHLE1BQU0sQ0FBQyxLQUFQLEdBQWUsQ0FBQyxDQUFDLEVBQUYsQ0FBSyxFQUFMLENBQWxCO1FBQ0MsTUFBTSxDQUFDLEtBQVAsR0FBZSxDQUFDLENBQUMsRUFBRixDQUFLLEVBQUwsRUFEaEI7O0FBR0EsY0FBTyxLQUFLLENBQUMsSUFBYjtBQUFBLGFBQ00sUUFETjtVQUVFLE1BQU0sQ0FBQyxPQUFQLEdBQWlCLE1BQU0sQ0FBQztVQUN4QixNQUFNLENBQUMsV0FBUCxHQUFxQjtVQUNyQixNQUFNLENBQUMsT0FBUCxHQUFpQixDQUFDLENBQUMsRUFBRixDQUFLLENBQUw7VUFDakIsTUFBTSxDQUFDLFVBQVAsR0FBb0IsQ0FBQyxDQUFDLEVBQUYsQ0FBSyxDQUFMO1VBQ3BCLFVBQUEsR0FBYSxNQUFNLENBQUMsZUFBZSxDQUFDLE9BQXZCLENBQStCLEVBQS9CO1VBQ2IsTUFBTSxDQUFDLEVBQVAsQ0FBVSxNQUFNLENBQUMsVUFBakIsRUFBNkIsU0FBQTttQkFDNUIsTUFBTSxDQUFDLE9BQVAsQ0FDQztjQUFBLFVBQUEsRUFDQztnQkFBQSxlQUFBLEVBQWdCLFVBQWhCO2dCQUNBLE9BQUEsRUFBUSxDQUFDLENBQUMsRUFBRixDQUFLLENBQUwsQ0FEUjtnQkFFQSxVQUFBLEVBQVcsQ0FBQyxDQUFDLEVBQUYsQ0FBSyxDQUFMLENBRlg7ZUFERDthQUREO1VBRDRCLENBQTdCO1VBTUEsTUFBTSxDQUFDLEVBQVAsQ0FBVSxNQUFNLENBQUMsUUFBakIsRUFBMkIsU0FBQTttQkFDMUIsTUFBTSxDQUFDLE9BQVAsQ0FDQztjQUFBLFVBQUEsRUFDQztnQkFBQSxlQUFBLEVBQWlCLE1BQU0sQ0FBQyxPQUF4QjtnQkFDQSxPQUFBLEVBQVEsQ0FBQyxDQUFDLEVBQUYsQ0FBSyxDQUFMLENBRFI7Z0JBRUEsVUFBQSxFQUFXLENBQUMsQ0FBQyxFQUFGLENBQUssQ0FBTCxDQUZYO2VBREQ7YUFERDtVQUQwQixDQUEzQjtBQVpJO0FBRE4sYUFtQk0sTUFuQk47VUFvQkUsTUFBTSxDQUFDLE9BQVAsR0FBaUIsTUFBTSxDQUFDO1VBQ3hCLFVBQUEsR0FBYSxNQUFNLENBQUMsZUFBZSxDQUFDLE1BQXZCLENBQThCLENBQTlCO1VBQ2IsTUFBTSxDQUFDLEVBQVAsQ0FBVSxNQUFNLENBQUMsVUFBakIsRUFBNkIsU0FBQTttQkFDNUIsTUFBTSxDQUFDLE9BQVAsQ0FDQztjQUFBLFVBQUEsRUFDQztnQkFBQSxlQUFBLEVBQWdCLFVBQWhCO2VBREQ7YUFERDtVQUQ0QixDQUE3QjtVQUlBLE1BQU0sQ0FBQyxFQUFQLENBQVUsTUFBTSxDQUFDLFFBQWpCLEVBQTJCLFNBQUE7bUJBQzFCLE1BQU0sQ0FBQyxPQUFQLENBQ0M7Y0FBQSxVQUFBLEVBQ0M7Z0JBQUEsZUFBQSxFQUFpQixNQUFNLENBQUMsT0FBeEI7ZUFERDthQUREO1VBRDBCLENBQTNCO0FBMUJGO01BZ0NBLElBQUcsS0FBSyxDQUFDLFdBQVQ7UUFDQyxNQUFNLENBQUMsV0FBUCxHQUFxQixLQUFLLENBQUMsWUFENUI7O01BR0EsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxHQUFULENBQ0M7UUFBQSxNQUFBLEVBQU8sQ0FBQyxNQUFELEVBQVMsS0FBVCxDQUFQO09BREQ7QUFuRkY7RUFzRkEsSUFBRyxLQUFLLENBQUMsR0FBVDtJQUNDLFNBQUEsR0FBWSxLQUFLLENBQUM7SUFDbEIsU0FBUyxDQUFDLEtBQVYsR0FBa0I7SUFFbEIsQ0FBQyxDQUFDLEtBQUssQ0FBQyxJQUFSLENBQWEsU0FBYixFQUpEOztFQUtBLE1BQU0sQ0FBQyxLQUFQLEdBQWU7QUFDZixTQUFPO0FBdkdTOzs7O0FEaEJqQixJQUFBOztBQUFBLENBQUEsR0FBSSxPQUFBLENBQVEsY0FBUjs7QUFFSixPQUFPLENBQUMsUUFBUixHQUFtQjtFQUNsQixLQUFBLEVBQU8sT0FEVztFQUVsQixPQUFBLEVBQVEsU0FGVTtFQUdsQixPQUFBLEVBQVEsQ0FBQyxPQUFELEVBQVUsU0FBVixDQUhVOzs7QUFNbkIsT0FBTyxDQUFDLFFBQVEsQ0FBQyxLQUFqQixHQUF5QixNQUFNLENBQUMsSUFBUCxDQUFZLE9BQU8sQ0FBQyxRQUFwQjs7QUFFekIsT0FBTyxDQUFDLE1BQVIsR0FBaUIsU0FBQyxLQUFEO0FBQ2hCLE1BQUE7RUFBQSxLQUFBLEdBQVEsQ0FBQyxDQUFDLEtBQUssQ0FBQyxjQUFSLENBQXVCLEtBQXZCLEVBQThCLE9BQU8sQ0FBQyxRQUF0QztFQUVSLE1BQUEsR0FBYSxJQUFBLEtBQUEsQ0FBTTtJQUFBLGVBQUEsRUFBZ0IsYUFBaEI7SUFBK0IsSUFBQSxFQUFLLFFBQXBDO0dBQU47RUFDYixNQUFNLENBQUMsV0FBUCxHQUNDO0lBQUEsT0FBQSxFQUFRLENBQVI7SUFDQSxRQUFBLEVBQVMsQ0FEVDtJQUVBLEdBQUEsRUFBSSxDQUZKO0lBR0EsTUFBQSxFQUFPLENBSFA7O0VBS0QsT0FBQSxHQUFjLElBQUEsS0FBQSxDQUFNO0lBQUEsZUFBQSxFQUFnQixTQUFoQjtJQUEyQixVQUFBLEVBQVcsTUFBdEM7SUFBOEMsSUFBQSxFQUFLLFNBQW5EO0lBQThELE9BQUEsRUFBUSxFQUF0RTtHQUFOO0VBQ2QsT0FBTyxDQUFDLFdBQVIsR0FDQztJQUFBLE9BQUEsRUFBUSxDQUFSO0lBQ0EsUUFBQSxFQUFTLENBRFQ7SUFFQSxHQUFBLEVBQUksQ0FGSjtJQUdBLE1BQUEsRUFBTyxDQUhQOztFQUtELEtBQUEsR0FBWSxJQUFBLEtBQUEsQ0FDWDtJQUFBLGVBQUEsRUFBZ0IsT0FBaEI7SUFDQSxVQUFBLEVBQVcsTUFEWDtJQUVBLFlBQUEsRUFBYSxDQUFDLENBQUMsS0FBSyxDQUFDLEVBQVIsQ0FBVyxDQUFYLENBRmI7SUFHQSxJQUFBLEVBQUssT0FITDtJQUlBLFdBQUEsRUFBWSxnQkFKWjtJQUtBLE9BQUEsRUFBUSxFQUxSO0lBTUEsVUFBQSxFQUFXLEVBTlg7SUFPQSxJQUFBLEVBQUssSUFQTDtHQURXO0VBU1osS0FBSyxDQUFDLFdBQU4sR0FDQztJQUFBLEtBQUEsRUFBTSxRQUFOO0lBQ0EsS0FBQSxFQUFNLEdBRE47SUFFQSxNQUFBLEVBQU8sR0FGUDs7RUFJRCxLQUFBLEdBQVksSUFBQSxDQUFDLENBQUMsSUFBRixDQUNYO0lBQUEsVUFBQSxFQUFXLEtBQVg7SUFDQSxJQUFBLEVBQUssS0FBSyxDQUFDLEtBRFg7SUFFQSxVQUFBLEVBQVcsVUFGWDtJQUdBLFFBQUEsRUFBUyxFQUhUO0lBSUEsSUFBQSxFQUFLLE9BSkw7SUFLQSxVQUFBLEVBQVcsRUFMWDtJQU1BLFdBQUEsRUFDQztNQUFBLEdBQUEsRUFBSSxFQUFKO01BQ0EsS0FBQSxFQUFNLEdBRE47TUFFQSxPQUFBLEVBQVEsRUFGUjtLQVBEO0dBRFc7RUFZWixPQUFBLEdBQWMsSUFBQSxDQUFDLENBQUMsSUFBRixDQUNiO0lBQUEsVUFBQSxFQUFXLEtBQVg7SUFDQSxJQUFBLEVBQUssS0FBSyxDQUFDLE9BRFg7SUFFQSxRQUFBLEVBQVMsRUFGVDtJQUdBLElBQUEsRUFBSyxTQUhMO0lBSUEsVUFBQSxFQUFXLEVBSlg7SUFLQSxXQUFBLEVBQ0M7TUFBQSxHQUFBLEVBQUssQ0FBQyxLQUFELEVBQVEsRUFBUixDQUFMO01BQ0EsT0FBQSxFQUFRLEVBRFI7TUFFQSxLQUFBLEVBQU8sR0FGUDtLQU5EO0dBRGE7RUFXZCxDQUFDLENBQUMsTUFBTSxDQUFDLEdBQVQsQ0FDQztJQUFBLE1BQUEsRUFBTyxDQUFDLE1BQUQsRUFBUyxPQUFULEVBQWtCLEtBQWxCLEVBQXlCLEtBQXpCLEVBQWdDLE9BQWhDLENBQVA7R0FERDtFQUlBLEtBQUssQ0FBQyxXQUFZLENBQUEsUUFBQSxDQUFsQixHQUE4QixFQUFBLEdBQUssQ0FBQyxDQUFDLEtBQUssQ0FBQyxFQUFSLENBQVcsS0FBSyxDQUFDLE1BQWpCLENBQUwsR0FBZ0MsRUFBaEMsR0FBcUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxFQUFSLENBQVcsT0FBTyxDQUFDLE1BQW5CLENBQXJDLEdBQWtFLEVBQWxFLEdBQXVFO0VBRXJHLENBQUMsQ0FBQyxNQUFNLENBQUMsR0FBVCxDQUNDO0lBQUEsTUFBQSxFQUFPLENBQUMsT0FBRCxFQUFVLEtBQVYsQ0FBUDtHQUREO0VBRUEsTUFBTSxDQUFDLE9BQVAsR0FBaUI7RUFDakIsT0FBQSxHQUFVO0VBQ1YsU0FBQSxHQUFZO0VBQ1osSUFBRyxLQUFLLENBQUMsT0FBTyxDQUFDLE1BQWQsR0FBdUIsQ0FBMUI7SUFDQyxTQUFBLEdBQVksS0FBSyxDQUFDLE9BQVEsQ0FBQSxDQUFBLENBQUUsQ0FBQyxNQUFqQixHQUEwQixLQUFLLENBQUMsT0FBUSxDQUFBLENBQUEsQ0FBRSxDQUFDLE9BRHhEOztFQUVBLElBQUcsS0FBSyxDQUFDLE9BQU8sQ0FBQyxNQUFkLEdBQXVCLENBQXZCLElBQTRCLFNBQUEsR0FBWSxFQUEzQztBQUNDO0FBQUEsU0FBQSxxREFBQTs7TUFDQyxNQUFBLEdBQWEsSUFBQSxDQUFDLENBQUMsTUFBRixDQUNaO1FBQUEsVUFBQSxFQUFXLEtBQVg7UUFDQSxJQUFBLEVBQUssS0FBSyxDQUFDLE9BQVEsQ0FBQSxLQUFBLENBRG5CO1FBRUEsS0FBQSxFQUFNLE1BRk47T0FEWTtNQUliLElBQUcsS0FBQSxLQUFTLENBQVo7UUFDQyxNQUFNLENBQUMsV0FBUCxHQUFxQjtVQUFDLE1BQUEsRUFBTyxDQUFSO1VBQVcsUUFBQSxFQUFTLENBQXBCO1VBRHRCO09BQUEsTUFBQTtRQUdDLE1BQU0sQ0FBQyxXQUFQLEdBQXFCO1VBQUMsTUFBQSxFQUFPLENBQVI7VUFBVyxRQUFBLEVBQVMsQ0FBQyxPQUFRLENBQUEsS0FBQSxHQUFRLENBQVIsQ0FBVCxFQUFxQixDQUFyQixDQUFwQjtVQUh0Qjs7TUFJQSxNQUFNLENBQUMsT0FBUSxDQUFBLEtBQUssQ0FBQyxPQUFRLENBQUEsS0FBQSxDQUFkLENBQWYsR0FBdUM7TUFDdkMsT0FBTyxDQUFDLElBQVIsQ0FBYSxNQUFiO01BQ0EsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxHQUFULENBQ0M7UUFBQSxNQUFBLEVBQU8sTUFBUDtPQUREO0FBWEQsS0FERDtHQUFBLE1BQUE7SUFlQyxLQUFLLENBQUMsV0FBWSxDQUFBLFFBQUEsQ0FBbEIsR0FBOEIsRUFBQSxHQUFLLENBQUMsQ0FBQyxLQUFLLENBQUMsRUFBUixDQUFXLEtBQUssQ0FBQyxNQUFqQixDQUFMLEdBQWdDLEVBQWhDLEdBQXFDLENBQUMsQ0FBQyxLQUFLLENBQUMsRUFBUixDQUFXLE9BQU8sQ0FBQyxNQUFuQixDQUFyQyxHQUFrRSxFQUFsRSxHQUF1RSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsTUFBZCxHQUF1QixFQUF4QjtJQUNyRyxDQUFDLENBQUMsTUFBTSxDQUFDLEdBQVQsQ0FDQztNQUFBLE1BQUEsRUFBTyxLQUFQO0tBREQ7SUFFQSxZQUFBLEdBQWU7SUFDZixhQUFBLEdBQWdCO0FBQ2hCO0FBQUEsU0FBQSx3REFBQTs7TUFDQyxNQUFBLEdBQWEsSUFBQSxDQUFDLENBQUMsTUFBRixDQUNaO1FBQUEsVUFBQSxFQUFXLEtBQVg7UUFDQSxJQUFBLEVBQUssS0FBSyxDQUFDLE9BQVEsQ0FBQSxLQUFBLENBRG5CO1FBRUEsS0FBQSxFQUFNLE1BRk47T0FEWTtNQUliLElBQUcsS0FBQSxLQUFTLENBQVo7UUFDQyxNQUFNLENBQUMsV0FBUCxHQUFxQjtVQUFDLEdBQUEsRUFBSSxDQUFDLE9BQUQsRUFBVSxFQUFWLENBQUw7VUFBb0IsUUFBQSxFQUFTLENBQTdCO1VBRHRCO09BQUEsTUFBQTtRQUdDLE1BQU0sQ0FBQyxXQUFQLEdBQXFCO1VBQUMsUUFBQSxFQUFTLENBQVY7VUFBYSxHQUFBLEVBQUksT0FBUSxDQUFBLEtBQUEsR0FBUSxDQUFSLENBQXpCO1VBSHRCOztNQUlBLE1BQU0sQ0FBQyxPQUFRLENBQUEsS0FBSyxDQUFDLE9BQVEsQ0FBQSxLQUFBLENBQWQsQ0FBZixHQUF1QztNQUN2QyxPQUFPLENBQUMsSUFBUixDQUFhLE1BQWI7TUFDQSxDQUFDLENBQUMsTUFBTSxDQUFDLEdBQVQsQ0FDQztRQUFBLE1BQUEsRUFBTyxNQUFQO09BREQ7TUFHQSxJQUFHLFlBQUEsR0FBZSxNQUFNLENBQUMsS0FBSyxDQUFDLEtBQS9CO1FBQ0MsWUFBQSxHQUFlLE1BQU0sQ0FBQyxLQUFLLENBQUM7UUFDNUIsYUFBQSxHQUFnQixNQUFNLENBQUMsTUFGeEI7O0FBZEQ7QUFrQkEsU0FBQSwyQ0FBQTs7TUFDQyxHQUFHLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxTQUFoQixHQUE0QjtNQUM1QixHQUFHLENBQUMsS0FBSyxDQUFDLEtBQVYsR0FBa0I7TUFDbEIsR0FBRyxDQUFDLEtBQUosR0FBWTtNQUNaLENBQUMsQ0FBQyxNQUFNLENBQUMsR0FBVCxDQUNDO1FBQUEsTUFBQSxFQUFPLENBQUMsR0FBRCxFQUFNLEdBQUcsQ0FBQyxLQUFWLENBQVA7T0FERDtBQUpELEtBdENEOztFQThDQSxNQUFNLENBQUMsT0FBUCxHQUFpQjtFQUNqQixNQUFNLENBQUMsS0FBUCxHQUFlO0VBQ2YsTUFBTSxDQUFDLEtBQVAsR0FBZTtFQUNmLE1BQU0sQ0FBQyxPQUFQLEdBQWlCO0FBRWpCLFNBQU87QUF0SFM7Ozs7QURYakIsSUFBQTs7QUFBQSxDQUFBLEdBQUksT0FBQSxDQUFRLGNBQVI7O0FBRUosT0FBTyxDQUFDLFFBQVIsR0FBbUI7RUFDakIsSUFBQSxFQUFNLE1BRFc7RUFFakIsS0FBQSxFQUFPLENBQUMsQ0FBQyxNQUFNLENBQUMsS0FGQztFQUdqQixLQUFBLEVBQU8sQ0FBQyxDQUFDLEtBQUYsQ0FBUSxPQUFSLENBSFU7RUFJakIsVUFBQSxFQUFZLE1BSks7RUFLakIsV0FBQSxFQUFhLE1BTEk7RUFNakIsSUFBQSxFQUFLLElBTlk7RUFPakIsT0FBQSxFQUFTLENBUFE7OztBQVVuQixPQUFPLENBQUMsUUFBUSxDQUFDLEtBQWpCLEdBQXlCLE1BQU0sQ0FBQyxJQUFQLENBQVksT0FBTyxDQUFDLFFBQXBCOztBQUV6QixPQUFPLENBQUMsTUFBUixHQUFpQixTQUFDLEtBQUQ7QUFDZixNQUFBO0VBQUEsS0FBQSxHQUFRLENBQUMsQ0FBQyxLQUFLLENBQUMsY0FBUixDQUF1QixLQUF2QixFQUE4QixPQUFPLENBQUMsUUFBdEM7RUFDUixJQUFHLE9BQU8sS0FBSyxDQUFDLElBQWIsS0FBcUIsUUFBeEI7SUFDRSxTQUFBLEdBQWdCLElBQUEsS0FBQSxDQUNkO01BQUEsSUFBQSxFQUFLLGtDQUFBLEdBQW1DLEtBQUssQ0FBQyxJQUF6QyxHQUE4QyxNQUFuRDtNQUNBLEtBQUEsRUFBTSxDQUFDLENBQUMsS0FBRixDQUFRLEtBQUssQ0FBQyxLQUFkLENBRE47TUFFQSxlQUFBLEVBQWdCLGFBRmhCO01BR0EsSUFBQSxFQUFLLEtBQUssQ0FBQyxJQUhYO01BSUEsSUFBQSxFQUFLLEtBQUssQ0FBQyxJQUpYO01BS0EsVUFBQSxFQUFXLEtBQUssQ0FBQyxVQUxqQjtNQU1BLE9BQUEsRUFBUSxLQUFLLENBQUMsT0FOZDtLQURjO0lBU2hCLFlBQUEsR0FBZTtJQUNmLFVBQUEsR0FBYTtBQUViLFlBQU8sQ0FBQyxDQUFDLE1BQU0sQ0FBQyxLQUFoQjtBQUFBLFdBQ08sQ0FEUDtRQUVJLFVBQUEsR0FBYSxDQUFDLENBQUMsRUFBRixDQUFLLEVBQUwsQ0FBQSxHQUFXO1FBQ3hCLFlBQUEsR0FBZSxDQUFDLENBQUMsRUFBRixDQUFLLENBQUwsQ0FBQSxHQUFVO0FBRnRCO0FBRFAsV0FJTyxDQUpQO1FBS0ksVUFBQSxHQUFhLENBQUMsQ0FBQyxFQUFGLENBQUssRUFBTCxDQUFBLEdBQVc7UUFDeEIsWUFBQSxHQUFlLENBQUMsQ0FBQyxFQUFGLENBQUssQ0FBTCxDQUFBLEdBQVU7QUFGdEI7QUFKUCxXQU9PLENBUFA7UUFRSSxVQUFBLEdBQWEsQ0FBQyxDQUFDLEVBQUYsQ0FBSyxDQUFMLENBQUEsR0FBVTtRQUN2QixZQUFBLEdBQWUsQ0FBQyxDQUFDLEVBQUYsQ0FBSyxDQUFMLENBQUEsR0FBVTtBQUZ0QjtBQVBQLFdBVU8sQ0FWUDtRQVdJLFVBQUEsR0FBYSxDQUFDLENBQUMsRUFBRixDQUFLLEVBQUwsQ0FBQSxHQUFXO1FBQ3hCLFlBQUEsR0FBZSxDQUFDLENBQUMsRUFBRixDQUFLLENBQUwsQ0FBQSxHQUFVO0FBWjdCO0lBZUEsS0FBQSxHQUFRLENBQUMsQ0FBQyxLQUFLLENBQUMsWUFBUixDQUFxQixTQUFyQjtJQUNSLFNBQVMsQ0FBQyxJQUFWLEdBQWlCLENBQUEsd0NBQUEsR0FBeUMsS0FBSyxDQUFDLEtBQS9DLEdBQXFELDBCQUFyRCxDQUFBLEdBQWlGLFNBQVMsQ0FBQztJQUM1RyxTQUFTLENBQUMsS0FBVixHQUFrQixDQUFDLENBQUMsRUFBRixDQUFLLEVBQUw7SUFDbEIsU0FBUyxDQUFDLE1BQVYsR0FBbUIsQ0FBQyxDQUFDLEVBQUYsQ0FBSyxLQUFLLENBQUMsTUFBWDtJQUVuQixTQUFTLENBQUMsS0FBVixHQUNFO01BQUEsU0FBQSxFQUFZLGNBQVo7TUFDQSxhQUFBLEVBQWdCLFVBRGhCO01BRUEsZUFBQSxFQUFrQixZQUZsQjtNQUdBLFlBQUEsRUFBZSxRQUhmOztJQUlGLElBQUcsS0FBSyxDQUFDLFdBQVQ7TUFDRSxTQUFTLENBQUMsV0FBVixHQUF3QixLQUFLLENBQUM7TUFDOUIsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxHQUFULENBQ0U7UUFBQSxNQUFBLEVBQU8sU0FBUDtPQURGLEVBRkY7O0FBS0EsV0FBTyxVQTNDVDtHQUFBLE1BQUE7SUE2Q0UsU0FBQSxHQUFZLEtBQUssQ0FBQztBQUNsQixXQUFPLFVBOUNUOztBQUZlOzs7O0FEWmpCLElBQUE7O0FBQUEsQ0FBQSxHQUFJLE9BQUEsQ0FBUSxjQUFSOztBQUVKLE9BQU8sQ0FBQyxRQUFSLEdBQW1CO0VBQ2xCLFVBQUEsRUFBWTtJQUNYLE1BQUEsRUFBTyxNQURJO0lBRVgsV0FBQSxFQUFhLE1BRkY7SUFHWCxLQUFBLEVBQVEsYUFIRztJQUlYLFlBQUEsRUFBYyxNQUpIO0lBS1gsSUFBQSxFQUFLLENBTE07SUFNWCxLQUFBLEVBQU0sQ0FOSztJQU9YLE1BQUEsRUFBTyxNQVBJO0lBUVgsVUFBQSxFQUFXLE1BUkE7SUFTWCxPQUFBLEVBQVEsTUFURztJQVVYLE9BQUEsRUFBUSxLQVZHO0lBV1gsTUFBQSxFQUFPLEtBWEk7R0FETTs7O0FBZ0JuQixNQUFBLEdBQVMsU0FBQyxLQUFEO0FBQ1IsTUFBQTtFQUFBLEtBQUEsR0FBUTtFQUNSLFlBQUEsR0FBZTtFQUNmLFNBQUEsR0FBWTtFQUNaLElBQUcsS0FBSDtBQUNDO0FBQUEsU0FBQSxxQ0FBQTs7TUFDQyxJQUFHLEtBQU0sQ0FBQSxDQUFBLENBQVQ7UUFDQyxLQUFNLENBQUEsQ0FBQSxDQUFOLEdBQVcsS0FBTSxDQUFBLENBQUEsRUFEbEI7T0FBQSxNQUFBO1FBR0MsS0FBTSxDQUFBLENBQUEsQ0FBTixHQUFXLE9BQU8sQ0FBQyxRQUFRLENBQUMsVUFBVyxDQUFBLENBQUEsRUFIeEM7O0FBREQsS0FERDs7RUFPQSxJQUFHLEtBQUssQ0FBQyxNQUFUO0lBQ0MsSUFBRyxLQUFLLENBQUMsTUFBTSxDQUFDLE1BQWhCO01BQ0MsWUFBQSxHQUFlLEtBQUssQ0FBQyxPQUR0QjtLQUFBLE1BQUE7TUFHQyxZQUFZLENBQUMsSUFBYixDQUFrQixLQUFLLENBQUMsTUFBeEIsRUFIRDtLQUREO0dBQUEsTUFBQTtJQU1DLFlBQUEsR0FBZSxNQUFNLENBQUMsY0FBYyxDQUFDLE9BTnRDOztFQVFBLElBQUcsS0FBSyxDQUFDLE1BQVQ7SUFDQyxJQUFHLEtBQUssQ0FBQyxXQUFUO0FBQ0M7QUFBQSxXQUFBLHdDQUFBOztRQUNDLEtBQUssQ0FBQyxNQUFNLENBQUMsV0FBWSxDQUFBLGFBQUEsQ0FBekIsR0FBMEMsS0FBSyxDQUFDLFdBQVksQ0FBQSxhQUFBO0FBRDdELE9BREQ7S0FERDs7QUFPQSxPQUFBLGdFQUFBOztJQUNDLEtBQUssQ0FBQyxrQkFBTixHQUEyQjtJQUMzQixJQUFHLEtBQUssQ0FBQyxXQUFUO01BRUMsS0FBQSxHQUFRO01BQ1IsS0FBSyxDQUFDLFVBQU4sR0FBbUI7TUFFbkIsSUFBRyxLQUFLLENBQUMsVUFBVDtRQUNDLEtBQUssQ0FBQyxVQUFVLENBQUMsTUFBakIsR0FBMEIsS0FBSyxDQUFDLFVBQVUsQ0FBQztRQUMzQyxLQUFLLENBQUMsVUFBVSxDQUFDLEtBQWpCLEdBQXlCLEtBQUssQ0FBQyxVQUFVLENBQUMsTUFGM0M7T0FBQSxNQUFBO1FBSUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxNQUFqQixHQUEwQixDQUFDLENBQUMsTUFBTSxDQUFDO1FBQ25DLEtBQUssQ0FBQyxVQUFVLENBQUMsS0FBakIsR0FBeUIsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxNQUxuQzs7TUFPQSxJQUFHLEtBQUssQ0FBQyxXQUFXLENBQUMsT0FBbEIsS0FBNkIsTUFBN0IsSUFBMEMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxRQUFsQixLQUE4QixNQUEzRTtRQUNDLEtBQUssQ0FBQyxXQUFXLENBQUMsU0FBbEIsR0FBOEIsR0FEL0I7O01BR0EsSUFBRyxLQUFLLENBQUMsV0FBVyxDQUFDLEdBQWxCLEtBQXlCLE1BQXpCLElBQXNDLEtBQUssQ0FBQyxXQUFXLENBQUMsTUFBbEIsS0FBNEIsTUFBckU7UUFDQyxLQUFLLENBQUMsV0FBVyxDQUFDLFVBQWxCLEdBQStCLEdBRGhDOztNQUlBLElBQUcsS0FBSyxDQUFDLFdBQVcsQ0FBQyxLQUFsQixLQUEyQixNQUE5QjtRQUNDLEtBQUssQ0FBQyxLQUFOLEdBQWMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxFQUFSLENBQVcsS0FBSyxDQUFDLFdBQVcsQ0FBQyxLQUE3QixFQURmO09BQUEsTUFBQTtRQUdDLEtBQUssQ0FBQyxLQUFOLEdBQWMsS0FBSyxDQUFDLE1BSHJCOztNQUtBLElBQUcsS0FBSyxDQUFDLFdBQVcsQ0FBQyxNQUFsQixLQUE0QixNQUEvQjtRQUNDLEtBQUssQ0FBQyxNQUFOLEdBQWUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxFQUFSLENBQVcsS0FBSyxDQUFDLFdBQVcsQ0FBQyxNQUE3QixFQURoQjtPQUFBLE1BQUE7UUFHQyxLQUFLLENBQUMsTUFBTixHQUFlLEtBQUssQ0FBQyxPQUh0Qjs7TUFPQSxJQUFHLEtBQUssQ0FBQyxXQUFXLENBQUMsWUFBbEIsS0FBa0MsTUFBckM7UUFFQyxJQUFHLEtBQUssQ0FBQyxXQUFXLENBQUMsWUFBWSxDQUFDLGtCQUFrQixDQUFDLENBQWxELEtBQXVELE1BQTFEO1VBQ0MsS0FBSyxDQUFDLFdBQVcsQ0FBQyxZQUFZLENBQUMsa0JBQWtCLENBQUMsQ0FBbEQsR0FBc0QsS0FBSyxDQUFDLFdBQVcsQ0FBQyxZQUFZLENBQUMsRUFEdEY7O1FBR0EsS0FBSyxDQUFDLENBQU4sR0FBVSxLQUFLLENBQUMsV0FBVyxDQUFDLFlBQVksQ0FBQyxrQkFBa0IsQ0FBQyxFQUw3RDs7TUFPQSxJQUFHLEtBQUssQ0FBQyxXQUFXLENBQUMsYUFBbEIsS0FBbUMsTUFBdEM7UUFFQyxJQUFHLEtBQUssQ0FBQyxXQUFXLENBQUMsYUFBYSxDQUFDLGtCQUFrQixDQUFDLENBQW5ELEtBQXdELE1BQTNEO1VBQ0MsS0FBSyxDQUFDLFdBQVcsQ0FBQyxhQUFhLENBQUMsa0JBQWtCLENBQUMsQ0FBbkQsR0FBdUQsS0FBSyxDQUFDLFdBQVcsQ0FBQyxhQUFhLENBQUMsRUFEeEY7O1FBR0EsS0FBSyxDQUFDLENBQU4sR0FBVSxLQUFLLENBQUMsV0FBVyxDQUFDLGFBQWEsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFuRCxHQUF1RCxLQUFLLENBQUMsS0FBN0QsR0FBcUUsS0FBSyxDQUFDLFdBQVcsQ0FBQyxhQUFhLENBQUMsa0JBQWtCLENBQUMsTUFMbkk7O01BT0EsSUFBRyxLQUFLLENBQUMsV0FBVyxDQUFDLFFBQWxCLEtBQThCLE1BQWpDO1FBRUMsSUFBRyxLQUFLLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxrQkFBa0IsQ0FBQyxDQUE5QyxLQUFtRCxNQUF0RDtVQUNDLEtBQUssQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDLGtCQUFrQixDQUFDLENBQTlDLEdBQWtELEtBQUssQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDLEVBRDlFOztRQUdBLEtBQUssQ0FBQyxDQUFOLEdBQVUsS0FBSyxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsa0JBQWtCLENBQUMsRUFMekQ7O01BT0EsSUFBRyxLQUFLLENBQUMsV0FBVyxDQUFDLFdBQWxCLEtBQWlDLE1BQXBDO1FBRUMsSUFBRyxLQUFLLENBQUMsV0FBVyxDQUFDLFdBQVcsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFqRCxLQUFzRCxNQUF6RDtVQUNDLEtBQUssQ0FBQyxXQUFXLENBQUMsV0FBVyxDQUFDLGtCQUFrQixDQUFDLENBQWpELEdBQXFELEtBQUssQ0FBQyxXQUFXLENBQUMsV0FBVyxDQUFDLEVBRHBGOztRQUdBLEtBQUssQ0FBQyxDQUFOLEdBQVUsS0FBSyxDQUFDLFdBQVcsQ0FBQyxXQUFXLENBQUMsa0JBQWtCLENBQUMsQ0FBakQsR0FBcUQsS0FBSyxDQUFDLE1BQTNELEdBQW9FLEtBQUssQ0FBQyxXQUFXLENBQUMsV0FBVyxDQUFDLGtCQUFrQixDQUFDLE9BTGhJOztNQVNBLElBQUcsS0FBSyxDQUFDLFdBQVcsQ0FBQyxPQUFsQixLQUE2QixNQUFoQztRQUVDLElBQUcsS0FBSyxDQUFDLFdBQVcsQ0FBQyxPQUFsQixLQUE2QixRQUFBLENBQVMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxPQUEzQixFQUFvQyxFQUFwQyxDQUFoQztVQUNDLEtBQUssQ0FBQyxDQUFOLEdBQVUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxFQUFSLENBQVcsS0FBSyxDQUFDLFdBQVcsQ0FBQyxPQUE3QixFQURYO1NBQUEsTUFBQTtVQUlDLElBQUcsS0FBSyxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUMsTUFBMUIsS0FBb0MsTUFBdkM7WUFFQyxJQUFHLEtBQUssQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDLGtCQUFrQixDQUFDLENBQTdDLEtBQWtELE1BQXJEO2NBQ0MsS0FBSyxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUMsa0JBQWtCLENBQUMsQ0FBN0MsR0FBaUQsS0FBSyxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUMsRUFENUU7O1lBR0EsS0FBSyxDQUFDLENBQU4sR0FBVSxLQUFLLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxrQkFBa0IsQ0FBQyxDQUE3QyxHQUFpRCxLQUFLLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxrQkFBa0IsQ0FBQyxNQUx6RztXQUFBLE1BQUE7WUFVQyxJQUFHLEtBQUssQ0FBQyxXQUFXLENBQUMsT0FBUSxDQUFBLENBQUEsQ0FBRSxDQUFDLGtCQUFrQixDQUFDLENBQWhELEtBQXFELE1BQXhEO2NBQ0MsS0FBSyxDQUFDLFdBQVcsQ0FBQyxPQUFRLENBQUEsQ0FBQSxDQUFFLENBQUMsa0JBQWtCLENBQUMsQ0FBaEQsR0FBb0QsS0FBSyxDQUFDLFdBQVcsQ0FBQyxPQUFRLENBQUEsQ0FBQSxDQUFFLENBQUMsRUFEbEY7O1lBR0EsS0FBSyxDQUFDLENBQU4sR0FBVSxLQUFLLENBQUMsV0FBVyxDQUFDLE9BQVEsQ0FBQSxDQUFBLENBQUUsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFoRCxHQUFvRCxLQUFLLENBQUMsV0FBVyxDQUFDLE9BQVEsQ0FBQSxDQUFBLENBQUUsQ0FBQyxrQkFBa0IsQ0FBQyxLQUFwRyxHQUE0RyxDQUFDLENBQUMsS0FBSyxDQUFDLEVBQVIsQ0FBVyxLQUFLLENBQUMsV0FBVyxDQUFDLE9BQVEsQ0FBQSxDQUFBLENBQXJDLEVBYnZIO1dBSkQ7U0FGRDs7TUFzQkEsSUFBRyxLQUFLLENBQUMsV0FBVyxDQUFDLFNBQWxCLEtBQStCLE1BQWxDO1FBQ0MsS0FBSyxDQUFDLFdBQVcsQ0FBQyxTQUFTLENBQUMsTUFBNUIsR0FBcUMsS0FBSyxDQUFDLEVBRDVDOztNQUdBLElBQUcsS0FBSyxDQUFDLFdBQVcsQ0FBQyxRQUFsQixLQUE4QixNQUFqQztRQUVDLElBQUcsS0FBSyxDQUFDLFdBQVcsQ0FBQyxRQUFsQixLQUE4QixRQUFBLENBQVMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxRQUEzQixFQUFxQyxFQUFyQyxDQUFqQztVQUNDLEtBQUssQ0FBQyxDQUFOLEdBQVUsS0FBSyxDQUFDLFVBQVUsQ0FBQyxLQUFqQixHQUF5QixDQUFDLENBQUMsS0FBSyxDQUFDLEVBQVIsQ0FBVyxLQUFLLENBQUMsV0FBVyxDQUFDLFFBQTdCLENBQXpCLEdBQWtFLEtBQUssQ0FBQyxNQURuRjtTQUFBLE1BQUE7VUFLQyxJQUFHLEtBQUssQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDLE1BQTNCLEtBQXFDLE1BQXhDO1lBRUMsSUFBRyxLQUFLLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxrQkFBa0IsQ0FBQyxDQUE5QyxLQUFtRCxNQUF0RDtjQUVDLEtBQUssQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDLGtCQUFrQixDQUFDLENBQTlDLEdBQWtELEtBQUssQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDLEVBRjlFOztZQUdBLEtBQUssQ0FBQyxDQUFOLEdBQVUsS0FBSyxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsa0JBQWtCLENBQUMsQ0FBOUMsR0FBa0QsS0FBSyxDQUFDLE1BTG5FO1dBQUEsTUFBQTtZQVNDLElBQUcsS0FBSyxDQUFDLFdBQVcsQ0FBQyxRQUFTLENBQUEsQ0FBQSxDQUFFLENBQUMsa0JBQWtCLENBQUMsQ0FBakQsS0FBc0QsTUFBekQ7Y0FDQyxLQUFLLENBQUMsV0FBVyxDQUFDLFFBQVMsQ0FBQSxDQUFBLENBQUUsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFqRCxHQUFxRCxLQUFLLENBQUMsV0FBVyxDQUFDLFFBQVMsQ0FBQSxDQUFBLENBQUUsQ0FBQyxFQURwRjs7WUFHQSxLQUFLLENBQUMsQ0FBTixHQUFVLEtBQUssQ0FBQyxXQUFXLENBQUMsUUFBUyxDQUFBLENBQUEsQ0FBRSxDQUFDLGtCQUFrQixDQUFDLENBQWpELEdBQXFELENBQUMsQ0FBQyxLQUFLLENBQUMsRUFBUixDQUFXLEtBQUssQ0FBQyxXQUFXLENBQUMsUUFBUyxDQUFBLENBQUEsQ0FBdEMsQ0FBckQsR0FBaUcsS0FBSyxDQUFDLE1BWmxIO1dBTEQ7U0FGRDs7TUFzQkEsSUFBRyxLQUFLLENBQUMsV0FBVyxDQUFDLFNBQWxCLEtBQStCLE1BQWxDO1FBQ0MsS0FBSyxDQUFDLFdBQVcsQ0FBQyxTQUFTLENBQUMsbUJBQTVCLEdBQWtELEtBQUssQ0FBQztRQUd4RCxLQUFLLENBQUMsQ0FBTixHQUFVLEtBQUssQ0FBQyxXQUFXLENBQUMsU0FBUyxDQUFDO1FBQ3RDLEtBQUssQ0FBQyxLQUFOLEdBQWMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxTQUFTLENBQUMsbUJBQTVCLEdBQWtELEtBQUssQ0FBQyxXQUFXLENBQUMsU0FBUyxDQUFDLE1BQTlFLEdBQXVGLEtBQUssQ0FBQyxNQUw1Rzs7TUFPQSxJQUFHLEtBQUssQ0FBQyxXQUFXLENBQUMsR0FBbEIsS0FBeUIsTUFBNUI7UUFFQyxJQUFHLEtBQUssQ0FBQyxXQUFXLENBQUMsR0FBbEIsS0FBeUIsUUFBQSxDQUFTLEtBQUssQ0FBQyxXQUFXLENBQUMsR0FBM0IsRUFBZ0MsRUFBaEMsQ0FBNUI7VUFDQyxLQUFLLENBQUMsQ0FBTixHQUFVLENBQUMsQ0FBQyxLQUFLLENBQUMsRUFBUixDQUFXLEtBQUssQ0FBQyxXQUFXLENBQUMsR0FBN0IsRUFEWDtTQUFBLE1BQUE7VUFNQyxJQUFHLEtBQUssQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLE1BQXRCLEtBQWdDLE1BQW5DO1lBRUMsSUFBRyxLQUFLLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxrQkFBa0IsQ0FBQyxDQUF6QyxLQUE4QyxNQUFqRDtjQUNDLEtBQUssQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLGtCQUFrQixDQUFDLENBQXpDLEdBQTZDLEtBQUssQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLEVBRHBFOztZQUdBLEtBQUssQ0FBQyxDQUFOLEdBQVUsS0FBSyxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsa0JBQWtCLENBQUMsQ0FBekMsR0FBNkMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsa0JBQWtCLENBQUMsT0FMakc7V0FBQSxNQUFBO1lBVUMsSUFBRyxLQUFLLENBQUMsV0FBVyxDQUFDLEdBQUksQ0FBQSxDQUFBLENBQUUsQ0FBQyxrQkFBa0IsQ0FBQyxDQUE1QyxLQUFpRCxNQUFwRDtjQUNDLEtBQUssQ0FBQyxXQUFXLENBQUMsR0FBSSxDQUFBLENBQUEsQ0FBRSxDQUFDLGtCQUFrQixDQUFDLENBQTVDLEdBQWdELEtBQUssQ0FBQyxXQUFXLENBQUMsR0FBSSxDQUFBLENBQUEsQ0FBRSxDQUFDLEVBRDFFOztZQUdBLEtBQUssQ0FBQyxDQUFOLEdBQVUsS0FBSyxDQUFDLFdBQVcsQ0FBQyxHQUFJLENBQUEsQ0FBQSxDQUFFLENBQUMsa0JBQWtCLENBQUMsQ0FBNUMsR0FBZ0QsS0FBSyxDQUFDLFdBQVcsQ0FBQyxHQUFJLENBQUEsQ0FBQSxDQUFFLENBQUMsa0JBQWtCLENBQUMsTUFBNUYsR0FBcUcsQ0FBQyxDQUFDLEtBQUssQ0FBQyxFQUFSLENBQVcsS0FBSyxDQUFDLFdBQVcsQ0FBQyxHQUFJLENBQUEsQ0FBQSxDQUFqQyxFQWJoSDtXQU5EO1NBRkQ7O01Bd0JBLElBQUcsS0FBSyxDQUFDLFdBQVcsQ0FBQyxVQUFsQixLQUFnQyxNQUFuQztRQUNDLEtBQUssQ0FBQyxXQUFXLENBQUMsVUFBVSxDQUFDLE1BQTdCLEdBQXNDLEtBQUssQ0FBQyxFQUQ3Qzs7TUFJQSxJQUFHLEtBQUssQ0FBQyxXQUFXLENBQUMsTUFBbEIsS0FBNEIsTUFBL0I7UUFFQyxJQUFHLEtBQUssQ0FBQyxXQUFXLENBQUMsTUFBbEIsS0FBNEIsUUFBQSxDQUFTLEtBQUssQ0FBQyxXQUFXLENBQUMsTUFBM0IsRUFBbUMsRUFBbkMsQ0FBL0I7VUFDQyxLQUFLLENBQUMsQ0FBTixHQUFVLEtBQUssQ0FBQyxVQUFVLENBQUMsTUFBakIsR0FBMEIsQ0FBQyxDQUFDLEtBQUssQ0FBQyxFQUFSLENBQVcsS0FBSyxDQUFDLFdBQVcsQ0FBQyxNQUE3QixDQUExQixHQUFpRSxLQUFLLENBQUMsT0FEbEY7U0FBQSxNQUFBO1VBS0MsSUFBRyxLQUFLLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxNQUF6QixLQUFtQyxNQUF0QztZQUVDLElBQUcsS0FBSyxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsa0JBQWtCLENBQUMsQ0FBNUMsS0FBaUQsTUFBcEQ7Y0FDQyxLQUFLLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxrQkFBa0IsQ0FBQyxDQUE1QyxHQUFnRCxLQUFLLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxFQUQxRTs7WUFHQSxLQUFLLENBQUMsQ0FBTixHQUFVLEtBQUssQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLGtCQUFrQixDQUFDLENBQTVDLEdBQWdELEtBQUssQ0FBQyxPQUxqRTtXQUFBLE1BQUE7WUFVQyxJQUFHLEtBQUssQ0FBQyxXQUFXLENBQUMsTUFBTyxDQUFBLENBQUEsQ0FBRSxDQUFDLGtCQUFrQixDQUFDLENBQS9DLEtBQW9ELE1BQXZEO2NBQ0MsS0FBSyxDQUFDLFdBQVcsQ0FBQyxNQUFPLENBQUEsQ0FBQSxDQUFFLENBQUMsa0JBQWtCLENBQUMsQ0FBL0MsR0FBbUQsS0FBSyxDQUFDLFdBQVcsQ0FBQyxNQUFPLENBQUEsQ0FBQSxDQUFFLENBQUMsRUFEaEY7O1lBR0EsS0FBSyxDQUFDLENBQU4sR0FBVSxLQUFLLENBQUMsV0FBVyxDQUFDLE1BQU8sQ0FBQSxDQUFBLENBQUUsQ0FBQyxrQkFBa0IsQ0FBQyxDQUEvQyxHQUFvRCxDQUFDLENBQUMsS0FBSyxDQUFDLEVBQVIsQ0FBVyxLQUFLLENBQUMsV0FBVyxDQUFDLE1BQU8sQ0FBQSxDQUFBLENBQXBDLENBQXBELEdBQThGLEtBQUssQ0FBQyxPQWIvRztXQUxEO1NBRkQ7O01BdUJBLElBQUcsS0FBSyxDQUFDLFdBQVcsQ0FBQyxVQUFsQixLQUFnQyxNQUFuQztRQUNDLEtBQUssQ0FBQyxXQUFXLENBQUMsVUFBVSxDQUFDLG1CQUE3QixHQUFtRCxLQUFLLENBQUM7UUFFekQsS0FBSyxDQUFDLE1BQU4sR0FBZSxLQUFLLENBQUMsV0FBVyxDQUFDLFVBQVUsQ0FBQyxtQkFBN0IsR0FBbUQsS0FBSyxDQUFDLFdBQVcsQ0FBQyxVQUFVLENBQUMsTUFBaEYsR0FBeUYsS0FBSyxDQUFDO1FBQzlHLEtBQUssQ0FBQyxDQUFOLEdBQVUsS0FBSyxDQUFDLFdBQVcsQ0FBQyxVQUFVLENBQUMsT0FKeEM7O01BUUEsSUFBRyxLQUFLLENBQUMsV0FBVyxDQUFDLEtBQWxCLEtBQTJCLE1BQTlCO1FBRUMsSUFBRyxLQUFLLENBQUMsV0FBVyxDQUFDLEtBQWxCLEtBQTJCLFlBQTlCO1VBQ0MsS0FBSyxDQUFDLENBQU4sR0FBVSxLQUFLLENBQUMsVUFBVSxDQUFDLEtBQWpCLEdBQXlCLENBQXpCLEdBQTZCLEtBQUssQ0FBQyxLQUFOLEdBQWMsRUFEdEQ7O1FBR0EsSUFBRyxLQUFLLENBQUMsV0FBVyxDQUFDLEtBQWxCLEtBQTJCLFVBQTlCO1VBQ0MsS0FBSyxDQUFDLENBQU4sR0FBVSxLQUFLLENBQUMsVUFBVSxDQUFDLE1BQWpCLEdBQTBCLENBQTFCLEdBQThCLEtBQUssQ0FBQyxNQUFOLEdBQWUsRUFEeEQ7O1FBR0EsSUFBRyxLQUFLLENBQUMsV0FBVyxDQUFDLEtBQWxCLEtBQTJCLFFBQTlCO1VBQ0MsS0FBSyxDQUFDLENBQU4sR0FBVSxLQUFLLENBQUMsVUFBVSxDQUFDLEtBQWpCLEdBQXlCLENBQXpCLEdBQTZCLEtBQUssQ0FBQyxLQUFOLEdBQWM7VUFDckQsS0FBSyxDQUFDLENBQU4sR0FBVSxLQUFLLENBQUMsVUFBVSxDQUFDLE1BQWpCLEdBQTBCLENBQTFCLEdBQThCLEtBQUssQ0FBQyxNQUFOLEdBQWUsRUFGeEQ7U0FSRDs7TUFjQSxJQUFHLEtBQUssQ0FBQyxXQUFXLENBQUMsZ0JBQWxCLEtBQXNDLE1BQXpDO1FBQ0MsS0FBSyxDQUFDLENBQU4sR0FBVSxLQUFLLENBQUMsV0FBVyxDQUFDLGdCQUFnQixDQUFDLGtCQUFrQixDQUFDLENBQXRELEdBQTBELENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxnQkFBZ0IsQ0FBQyxrQkFBa0IsQ0FBQyxLQUF0RCxHQUE4RCxLQUFLLENBQUMsS0FBckUsQ0FBQSxHQUE4RSxFQURuSjs7TUFHQSxJQUFHLEtBQUssQ0FBQyxXQUFXLENBQUMsY0FBbEIsS0FBb0MsTUFBdkM7UUFDQyxLQUFLLENBQUMsQ0FBTixHQUFVLEtBQUssQ0FBQyxXQUFXLENBQUMsY0FBYyxDQUFDLGtCQUFrQixDQUFDLENBQXBELEdBQXdELENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxjQUFjLENBQUMsa0JBQWtCLENBQUMsTUFBcEQsR0FBNkQsS0FBSyxDQUFDLE1BQXBFLENBQUEsR0FBOEUsRUFEako7O01BR0EsSUFBRyxLQUFLLENBQUMsV0FBVyxDQUFDLE1BQWxCLEtBQTRCLE1BQS9CO1FBQ0MsS0FBSyxDQUFDLENBQU4sR0FBVSxLQUFLLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxrQkFBa0IsQ0FBQyxDQUE1QyxHQUFnRCxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLGtCQUFrQixDQUFDLEtBQTVDLEdBQW9ELEtBQUssQ0FBQyxLQUEzRCxDQUFBLEdBQW9FO1FBQzlILEtBQUssQ0FBQyxDQUFOLEdBQVUsS0FBSyxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsa0JBQWtCLENBQUMsQ0FBNUMsR0FBZ0QsQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxrQkFBa0IsQ0FBQyxNQUE1QyxHQUFxRCxLQUFLLENBQUMsTUFBNUQsQ0FBQSxHQUFzRSxFQUZqSTs7TUFJQSxLQUFLLENBQUMsa0JBQU4sR0FBMkIsTUF0TTVCO0tBQUEsTUFBQTtNQXdNQyxLQUFLLENBQUMsa0JBQU4sR0FBMkIsS0FBSyxDQUFDLE1BeE1sQzs7SUEwTUEsU0FBUyxDQUFDLElBQVYsQ0FBZSxLQUFmO0FBNU1EO0FBK01BLFNBQU87QUF6T0M7O0FBMk9ULE9BQU8sQ0FBQyxHQUFSLEdBQWMsU0FBQyxLQUFEO0FBQ2IsTUFBQTtFQUFBLEtBQUEsR0FBUTtFQUNSLEtBQUEsR0FBUTtFQUNSLElBQUcsS0FBSDtBQUNDO0FBQUEsU0FBQSxxQ0FBQTs7TUFDQyxJQUFHLEtBQU0sQ0FBQSxDQUFBLENBQVQ7UUFDQyxLQUFNLENBQUEsQ0FBQSxDQUFOLEdBQVcsS0FBTSxDQUFBLENBQUEsRUFEbEI7T0FBQSxNQUFBO1FBR0MsS0FBTSxDQUFBLENBQUEsQ0FBTixHQUFXLE9BQU8sQ0FBQyxRQUFRLENBQUMsVUFBVyxDQUFBLENBQUEsRUFIeEM7O0FBREQsS0FERDs7RUFPQSxTQUFBLEdBQVksTUFBQSxDQUFPLEtBQVA7QUFFWjtPQUFBLDZEQUFBOzs7O0FBQ0M7QUFBQTtXQUFBLHdDQUFBOztzQkFDQyxLQUFNLENBQUEsR0FBQSxDQUFOLEdBQWEsS0FBSyxDQUFDLGtCQUFtQixDQUFBLEdBQUE7QUFEdkM7OztBQUREOztBQVphOztBQWdCZCxPQUFPLENBQUMsT0FBUixHQUFrQixTQUFDLEtBQUQ7QUFDakIsTUFBQTtFQUFBLEtBQUEsR0FBUTtFQUNSLEtBQUEsR0FBUTtFQUNSLElBQUcsS0FBSDtBQUNDO0FBQUEsU0FBQSxxQ0FBQTs7TUFDQyxJQUFHLEtBQU0sQ0FBQSxDQUFBLENBQVQ7UUFDQyxLQUFNLENBQUEsQ0FBQSxDQUFOLEdBQVcsS0FBTSxDQUFBLENBQUEsRUFEbEI7T0FBQSxNQUFBO1FBR0MsS0FBTSxDQUFBLENBQUEsQ0FBTixHQUFXLE9BQU8sQ0FBQyxRQUFRLENBQUMsVUFBVyxDQUFBLENBQUEsRUFIeEM7O0FBREQsS0FERDs7RUFPQSxTQUFBLEdBQVksTUFBQSxDQUFPLEtBQVA7QUFFWjtPQUFBLDZEQUFBOztJQUVDLEtBQUEsR0FBUSxLQUFLLENBQUM7SUFDZCxJQUFHLEtBQUssQ0FBQyxPQUFUO01BQ0MsSUFBQSxHQUFPLEtBQUssQ0FBQztNQUNiLEtBQUEsR0FBUSxDQUFFLEtBQUQsR0FBVSxJQUFYLENBQUEsR0FBbUIsTUFGNUI7O0lBSUEsSUFBRyxLQUFLLENBQUMsT0FBVDtNQUNDLElBQUcsS0FBQSxLQUFTLEtBQUssQ0FBQyxPQUFsQjtRQUNDLEtBQUssQ0FBQyxrQkFBa0IsQ0FBQyxPQUF6QixHQUFtQyxFQURwQztPQUREOztJQUlBLElBQUcsS0FBSyxDQUFDLE1BQVQ7TUFDQyxLQUFLLENBQUMsa0JBQWtCLENBQUMsT0FBekIsR0FBbUMsRUFEcEM7O0lBR0EsS0FBSyxDQUFDLE9BQU4sQ0FDQztNQUFBLFVBQUEsRUFBVyxLQUFLLENBQUMsa0JBQWpCO01BQ0EsSUFBQSxFQUFLLEtBQUssQ0FBQyxJQURYO01BRUEsS0FBQSxFQUFNLEtBRk47TUFHQSxLQUFBLEVBQU0sS0FBSyxDQUFDLEtBSFo7TUFJQSxNQUFBLEVBQU8sS0FBSyxDQUFDLE1BSmI7TUFLQSxVQUFBLEVBQVcsS0FBSyxDQUFDLFVBTGpCO01BTUEsWUFBQSxFQUFhLEtBQUssQ0FBQyxZQU5uQjtLQUREO2lCQVNBLEtBQUssQ0FBQyxrQkFBTixHQUEyQjtBQXZCNUI7O0FBWmlCOzs7O0FEL1FsQixJQUFBOztBQUFBLENBQUEsR0FBSSxPQUFBLENBQVEsY0FBUjs7QUFHSixLQUFBLEdBQVEsSUFBSTs7QUFDWixPQUFPLENBQUMsVUFBUixHQUFxQixNQUFNLENBQUMsSUFBUCxDQUFZLEtBQUssQ0FBQyxLQUFsQjs7QUFDckIsT0FBTyxDQUFDLFVBQVUsQ0FBQyxJQUFuQixDQUF3QixZQUF4Qjs7QUFDQSxPQUFPLENBQUMsVUFBVSxDQUFDLElBQW5CLENBQXdCLGFBQXhCOztBQUNBLE9BQU8sQ0FBQyxXQUFSLEdBQXNCLE1BQU0sQ0FBQyxJQUFQLENBQVksS0FBSyxDQUFDLEtBQWxCOztBQUN0QixLQUFLLENBQUMsT0FBTixDQUFBOztBQUVBLE9BQU8sQ0FBQyxNQUFSLEdBQWlCO0VBQ2hCLElBQUEsRUFBSyxxbkJBRFc7RUFZaEIsSUFBQSxFQUFLLHN2QkFaVztFQWtCaEIsUUFBQSxFQUFTLCtoQkFsQk87RUEyQmhCLFdBQUEsRUFBYyxvYUEzQkU7RUFpQ2hCLFFBQUEsRUFBVztJQUNWLFVBQUEsRUFBWSxvekJBREY7SUFhVixXQUFBLEVBQWEsbytCQWJIO0lBNkJWLGdCQUFBLEVBQW1CLDQrQkE3QlQ7SUE2Q1YsTUFBQSxFQUFTLCt6QkE3Q0M7SUF5RFYsVUFBQSxFQUFhLCswQkF6REg7R0FqQ0s7RUF1R2hCLElBQUEsRUFBSyxvekJBdkdXO0VBcUhoQixVQUFBLEVBQVksa1lBckhJO0VBNEhoQixRQUFBLEVBQVUsd2pIQTVITTtFQTRKaEIsT0FBQSxFQUFTLG8rRUE1Sk87RUFtTGhCLE9BQUEsRUFBVSxpb0JBbkxNO0VBK0xoQixLQUFBLEVBQVEsc3JFQS9MUTtFQTZNaEIsQ0FBQSxNQUFBLENBQUEsRUFBUTtJQUNQLEVBQUEsRUFBSyw0MkRBREU7SUFlUCxHQUFBLEVBQU0sb3hFQWZDO0dBN01RO0VBMk9oQixJQUFBLEVBQVEsd3BFQTNPUTtFQWdRaEIsS0FBQSxFQUFPLDJtQ0FoUVM7RUFpUmhCLFFBQUEsRUFBVSw2Z0NBalJNO0VBa1NoQixRQUFBLEVBQVcsK3hFQWxTSztFQWtUaEIsUUFBQSxFQUNDO0lBQUEsVUFBQSxFQUFhLHFpRUFBYjtJQXNCQSxXQUFBLEVBQWMsK2lFQXRCZDtJQTRDQSxnQkFBQSxFQUFtQixtakVBNUNuQjtHQW5UZTtFQXFYaEIsT0FBQSxFQUNDLCs5Q0F0WGU7RUF1WWhCLEtBQUEsRUFBUTtJQUNQLEVBQUEsRUFBSyw2b0NBREU7SUFlUCxHQUFBLEVBQU0sMm1EQWZDO0dBdllRO0VBcWFoQixPQUFBLEVBQVMsbWlFQXJhTztFQXdiaEIsT0FBQSxFQUFTLDQ4REF4Yk87RUFtZGhCLE1BQUEsRUFBUSxxaUZBbmRROzs7QUFtZmpCLE9BQU8sQ0FBQyxZQUFSLEdBQ0M7RUFBQSxHQUFBLEVBQUksQ0FBSjtFQUNBLEdBQUEsRUFBSSxDQURKO0VBRUEsR0FBQSxFQUFJLENBRko7RUFHQSxJQUFBLEVBQUssQ0FITDtFQUlBLElBQUEsRUFBSyxDQUpMO0VBS0EsSUFBQSxFQUFLLENBTEw7RUFNQSxJQUFBLEVBQUssQ0FOTDs7O0FBU0QsT0FBTyxDQUFDLFdBQVIsR0FDQztFQUFBLEdBQUEsRUFDQztJQUFBLEdBQUEsRUFDQztNQUFBLElBQUEsRUFBSyxRQUFMO01BQ0EsS0FBQSxFQUFNLEdBRE47TUFFQSxNQUFBLEVBQU8sR0FGUDtNQUdBLEtBQUEsRUFBTSxDQUhOO0tBREQ7R0FERDtFQU1BLEdBQUEsRUFDQztJQUFBLEdBQUEsRUFDQztNQUFBLElBQUEsRUFBSyxhQUFMO01BQ0EsS0FBQSxFQUFNLEdBRE47TUFFQSxNQUFBLEVBQU8sR0FGUDtNQUdBLEtBQUEsRUFBTSxHQUhOO0tBREQ7R0FQRDtFQWFBLEdBQUEsRUFDQztJQUFBLEdBQUEsRUFDQztNQUFBLElBQUEsRUFBSyxVQUFMO01BQ0EsS0FBQSxFQUFNLEdBRE47TUFFQSxNQUFBLEVBQU8sR0FGUDtNQUdBLEtBQUEsRUFBTSxDQUhOO0tBREQ7SUFLQSxJQUFBLEVBQ0M7TUFBQSxJQUFBLEVBQUssVUFBTDtNQUNBLEtBQUEsRUFBTSxHQUROO01BRUEsTUFBQSxFQUFPLElBRlA7TUFHQSxLQUFBLEVBQU0sQ0FITjtLQU5EO0dBZEQ7RUF3QkEsR0FBQSxFQUNDO0lBQUEsSUFBQSxFQUNDO01BQUEsSUFBQSxFQUFLLE9BQUw7TUFDQSxLQUFBLEVBQU0sR0FETjtNQUVBLE1BQUEsRUFBTyxJQUZQO01BR0EsS0FBQSxFQUFNLENBSE47S0FERDtHQXpCRDtFQThCQSxHQUFBLEVBQ0M7SUFBQSxJQUFBLEVBQ0M7TUFBQSxJQUFBLEVBQUssVUFBTDtNQUNBLEtBQUEsRUFBTSxHQUROO01BRUEsTUFBQSxFQUFPLElBRlA7TUFHQSxLQUFBLEVBQU0sQ0FITjtLQUREO0lBS0EsSUFBQSxFQUNDO01BQUEsSUFBQSxFQUFLLFVBQUw7TUFDQSxLQUFBLEVBQU0sR0FETjtNQUVBLE1BQUEsRUFBTyxJQUZQO01BR0EsS0FBQSxFQUFNLENBSE47S0FORDtHQS9CRDtFQXlDQSxHQUFBLEVBQ0M7SUFBQSxJQUFBLEVBQ0M7TUFBQSxJQUFBLEVBQUssTUFBTDtNQUNBLEtBQUEsRUFBTSxHQUROO01BRUEsTUFBQSxFQUFPLElBRlA7TUFHQSxLQUFBLEVBQU0sQ0FITjtLQUREO0lBS0EsSUFBQSxFQUNDO01BQUEsSUFBQSxFQUFLLFNBQUw7TUFDQSxLQUFBLEVBQU0sR0FETjtNQUVBLE1BQUEsRUFBTyxJQUZQO01BR0EsS0FBQSxFQUFNLENBSE47S0FORDtHQTFDRDtFQW9EQSxHQUFBLEVBQ0M7SUFBQSxJQUFBLEVBQ0M7TUFBQSxJQUFBLEVBQUssU0FBTDtNQUNBLEtBQUEsRUFBTSxHQUROO01BRUEsTUFBQSxFQUFPLElBRlA7TUFHQSxLQUFBLEVBQU0sQ0FITjtLQUREO0dBckREO0VBMERBLElBQUEsRUFDQztJQUFBLElBQUEsRUFDQztNQUFBLElBQUEsRUFBSyxRQUFMO01BQ0EsS0FBQSxFQUFNLElBRE47TUFFQSxNQUFBLEVBQU8sSUFGUDtNQUdBLEtBQUEsRUFBTSxDQUhOO0tBREQ7R0EzREQ7RUFnRUEsSUFBQSxFQUNDO0lBQUEsSUFBQSxFQUNDO01BQUEsSUFBQSxFQUFLLFNBQUw7TUFDQSxLQUFBLEVBQU0sSUFETjtNQUVBLE1BQUEsRUFBTyxJQUZQO01BR0EsS0FBQSxFQUFNLENBSE47S0FERDtHQWpFRDtFQXNFQSxJQUFBLEVBQ0M7SUFBQSxJQUFBLEVBQ0M7TUFBQSxJQUFBLEVBQUssZUFBTDtNQUNBLEtBQUEsRUFBTSxJQUROO01BRUEsTUFBQSxFQUFPLElBRlA7TUFHQSxLQUFBLEVBQU0sQ0FITjtLQUREO0dBdkVEO0VBNEVBLElBQUEsRUFDQztJQUFBLElBQUEsRUFDQztNQUFBLElBQUEsRUFBSyxTQUFMO01BQ0EsS0FBQSxFQUFNLElBRE47TUFFQSxNQUFBLEVBQU8sSUFGUDtNQUdBLEtBQUEsRUFBTSxDQUhOO0tBREQ7R0E3RUQ7RUFrRkEsSUFBQSxFQUNDO0lBQUEsSUFBQSxFQUNDO01BQUEsSUFBQSxFQUFLLFNBQUw7TUFDQSxLQUFBLEVBQU0sSUFETjtNQUVBLE1BQUEsRUFBTyxJQUZQO01BR0EsS0FBQSxFQUFNLENBSE47S0FERDtHQW5GRDtFQXdGQSxJQUFBLEVBQ0M7SUFBQSxJQUFBLEVBQ0M7TUFBQSxJQUFBLEVBQUssTUFBTDtNQUNBLEtBQUEsRUFBTSxJQUROO01BRUEsTUFBQSxFQUFPLElBRlA7TUFHQSxLQUFBLEVBQU0sQ0FITjtLQUREO0dBekZEO0VBOEZBLElBQUEsRUFDQztJQUFBLElBQUEsRUFDQztNQUFBLElBQUEsRUFBSyxVQUFMO01BQ0EsS0FBQSxFQUFNLElBRE47TUFFQSxNQUFBLEVBQU8sSUFGUDtNQUdBLEtBQUEsRUFBTSxDQUhOO0tBREQ7R0EvRkQ7RUFvR0EsSUFBQSxFQUNDO0lBQUEsSUFBQSxFQUNDO01BQUEsSUFBQSxFQUFLLFNBQUw7TUFDQSxLQUFBLEVBQU0sSUFETjtNQUVBLE1BQUEsRUFBTyxJQUZQO01BR0EsS0FBQSxFQUFNLENBSE47S0FERDtJQUtBLElBQUEsRUFDQztNQUFBLElBQUEsRUFBSyxVQUFMO01BQ0EsS0FBQSxFQUFNLElBRE47TUFFQSxNQUFBLEVBQU8sSUFGUDtNQUdBLEtBQUEsRUFBTSxDQUhOO0tBTkQ7R0FyR0Q7RUErR0EsSUFBQSxFQUNDO0lBQUEsSUFBQSxFQUNDO01BQUEsSUFBQSxFQUFLLFVBQUw7TUFDQSxLQUFBLEVBQU0sSUFETjtNQUVBLE1BQUEsRUFBTyxJQUZQO01BR0EsS0FBQSxFQUFNLENBSE47S0FERDtHQWhIRDtFQXFIQSxJQUFBLEVBQ0M7SUFBQSxJQUFBLEVBQ0M7TUFBQSxJQUFBLEVBQUssVUFBTDtNQUNBLEtBQUEsRUFBTSxJQUROO01BRUEsTUFBQSxFQUFPLElBRlA7TUFHQSxLQUFBLEVBQU0sQ0FITjtLQUREO0dBdEhEOzs7QUE2SEQsT0FBTyxDQUFDLE1BQVIsR0FDQztFQUFBLEdBQUEsRUFBSSxTQUFKO0VBQ0EsS0FBQSxFQUFNLFNBRE47RUFFQSxNQUFBLEVBQU8sU0FGUDtFQUdBLE1BQUEsRUFBTyxTQUhQO0VBSUEsTUFBQSxFQUFPLFNBSlA7RUFLQSxNQUFBLEVBQU8sU0FMUDtFQU1BLE1BQUEsRUFBTyxTQU5QO0VBT0EsTUFBQSxFQUFPLFNBUFA7RUFRQSxNQUFBLEVBQU8sU0FSUDtFQVNBLE1BQUEsRUFBTyxTQVRQO0VBVUEsTUFBQSxFQUFPLFNBVlA7RUFXQSxPQUFBLEVBQVEsU0FYUjtFQVlBLE9BQUEsRUFBUSxTQVpSO0VBYUEsT0FBQSxFQUFRLFNBYlI7RUFjQSxPQUFBLEVBQVEsU0FkUjtFQWVBLElBQUEsRUFBSyxTQWZMO0VBZ0JBLE1BQUEsRUFBTyxTQWhCUDtFQWlCQSxPQUFBLEVBQVEsU0FqQlI7RUFrQkEsT0FBQSxFQUFRLFNBbEJSO0VBbUJBLE9BQUEsRUFBUSxTQW5CUjtFQW9CQSxPQUFBLEVBQVEsU0FwQlI7RUFxQkEsT0FBQSxFQUFRLFNBckJSO0VBc0JBLE9BQUEsRUFBUSxTQXRCUjtFQXVCQSxPQUFBLEVBQVEsU0F2QlI7RUF3QkEsT0FBQSxFQUFRLFNBeEJSO0VBeUJBLE9BQUEsRUFBUSxTQXpCUjtFQTBCQSxRQUFBLEVBQVMsU0ExQlQ7RUEyQkEsUUFBQSxFQUFTLFNBM0JUO0VBNEJBLFFBQUEsRUFBUyxTQTVCVDtFQTZCQSxRQUFBLEVBQVMsU0E3QlQ7RUE4QkEsTUFBQSxFQUFPLFNBOUJQO0VBK0JBLFFBQUEsRUFBUyxTQS9CVDtFQWdDQSxTQUFBLEVBQVUsU0FoQ1Y7RUFpQ0EsU0FBQSxFQUFVLFNBakNWO0VBa0NBLFNBQUEsRUFBVSxTQWxDVjtFQW1DQSxTQUFBLEVBQVUsU0FuQ1Y7RUFvQ0EsU0FBQSxFQUFVLFNBcENWO0VBcUNBLFNBQUEsRUFBVSxTQXJDVjtFQXNDQSxTQUFBLEVBQVUsU0F0Q1Y7RUF1Q0EsU0FBQSxFQUFVLFNBdkNWO0VBd0NBLFNBQUEsRUFBVSxTQXhDVjtFQXlDQSxVQUFBLEVBQVcsU0F6Q1g7RUEwQ0EsVUFBQSxFQUFXLFNBMUNYO0VBMkNBLFVBQUEsRUFBVyxTQTNDWDtFQTRDQSxVQUFBLEVBQVcsU0E1Q1g7RUE2Q0EsVUFBQSxFQUFXLFNBN0NYO0VBOENBLFlBQUEsRUFBYSxTQTlDYjtFQStDQSxhQUFBLEVBQWMsU0EvQ2Q7RUFnREEsYUFBQSxFQUFjLFNBaERkO0VBaURBLGFBQUEsRUFBYyxTQWpEZDtFQWtEQSxhQUFBLEVBQWMsU0FsRGQ7RUFtREEsYUFBQSxFQUFjLFNBbkRkO0VBb0RBLGFBQUEsRUFBYyxTQXBEZDtFQXFEQSxhQUFBLEVBQWMsU0FyRGQ7RUFzREEsYUFBQSxFQUFjLFNBdERkO0VBdURBLGFBQUEsRUFBYyxTQXZEZDtFQXdEQSxjQUFBLEVBQWUsU0F4RGY7RUF5REEsY0FBQSxFQUFlLFNBekRmO0VBMERBLGNBQUEsRUFBZSxTQTFEZjtFQTJEQSxjQUFBLEVBQWUsU0EzRGY7RUE0REEsTUFBQSxFQUFPLFNBNURQO0VBNkRBLFFBQUEsRUFBUyxTQTdEVDtFQThEQSxTQUFBLEVBQVUsU0E5RFY7RUErREEsU0FBQSxFQUFVLFNBL0RWO0VBZ0VBLFNBQUEsRUFBVSxTQWhFVjtFQWlFQSxTQUFBLEVBQVUsU0FqRVY7RUFrRUEsU0FBQSxFQUFVLFNBbEVWO0VBbUVBLFNBQUEsRUFBVSxTQW5FVjtFQW9FQSxTQUFBLEVBQVUsU0FwRVY7RUFxRUEsU0FBQSxFQUFVLFNBckVWO0VBc0VBLFNBQUEsRUFBVSxTQXRFVjtFQXVFQSxVQUFBLEVBQVcsU0F2RVg7RUF3RUEsVUFBQSxFQUFXLFNBeEVYO0VBeUVBLFVBQUEsRUFBVyxTQXpFWDtFQTBFQSxVQUFBLEVBQVcsU0ExRVg7RUEyRUEsSUFBQSxFQUFLLFNBM0VMO0VBNEVBLE1BQUEsRUFBTyxTQTVFUDtFQTZFQSxPQUFBLEVBQVEsU0E3RVI7RUE4RUEsT0FBQSxFQUFRLFNBOUVSO0VBK0VBLE9BQUEsRUFBUSxTQS9FUjtFQWdGQSxPQUFBLEVBQVEsU0FoRlI7RUFpRkEsT0FBQSxFQUFRLFNBakZSO0VBa0ZBLE9BQUEsRUFBUSxTQWxGUjtFQW1GQSxPQUFBLEVBQVEsU0FuRlI7RUFvRkEsT0FBQSxFQUFRLFNBcEZSO0VBcUZBLE9BQUEsRUFBUSxTQXJGUjtFQXNGQSxRQUFBLEVBQVMsU0F0RlQ7RUF1RkEsUUFBQSxFQUFTLFNBdkZUO0VBd0ZBLFFBQUEsRUFBUyxTQXhGVDtFQXlGQSxRQUFBLEVBQVMsU0F6RlQ7RUEwRkEsU0FBQSxFQUFVLFNBMUZWO0VBMkZBLFdBQUEsRUFBWSxTQTNGWjtFQTRGQSxZQUFBLEVBQWEsU0E1RmI7RUE2RkEsWUFBQSxFQUFhLFNBN0ZiO0VBOEZBLFlBQUEsRUFBYSxTQTlGYjtFQStGQSxZQUFBLEVBQWEsU0EvRmI7RUFnR0EsWUFBQSxFQUFhLFNBaEdiO0VBaUdBLFlBQUEsRUFBYSxTQWpHYjtFQWtHQSxZQUFBLEVBQWEsU0FsR2I7RUFtR0EsWUFBQSxFQUFhLFNBbkdiO0VBb0dBLFlBQUEsRUFBYSxTQXBHYjtFQXFHQSxhQUFBLEVBQWMsU0FyR2Q7RUFzR0EsYUFBQSxFQUFjLFNBdEdkO0VBdUdBLGFBQUEsRUFBYyxTQXZHZDtFQXdHQSxhQUFBLEVBQWMsU0F4R2Q7RUF5R0EsSUFBQSxFQUFLLFNBekdMO0VBMEdBLE1BQUEsRUFBTyxTQTFHUDtFQTJHQSxPQUFBLEVBQVEsU0EzR1I7RUE0R0EsT0FBQSxFQUFRLFNBNUdSO0VBNkdBLE9BQUEsRUFBUSxTQTdHUjtFQThHQSxPQUFBLEVBQVEsU0E5R1I7RUErR0EsT0FBQSxFQUFRLFNBL0dSO0VBZ0hBLE9BQUEsRUFBUSxTQWhIUjtFQWlIQSxPQUFBLEVBQVEsU0FqSFI7RUFrSEEsT0FBQSxFQUFRLFNBbEhSO0VBbUhBLE9BQUEsRUFBUSxTQW5IUjtFQW9IQSxRQUFBLEVBQVMsU0FwSFQ7RUFxSEEsUUFBQSxFQUFTLFNBckhUO0VBc0hBLFFBQUEsRUFBUyxTQXRIVDtFQXVIQSxRQUFBLEVBQVMsU0F2SFQ7RUF3SEEsSUFBQSxFQUFLLFNBeEhMO0VBeUhBLE1BQUEsRUFBTyxTQXpIUDtFQTBIQSxPQUFBLEVBQVEsU0ExSFI7RUEySEEsT0FBQSxFQUFRLFNBM0hSO0VBNEhBLE9BQUEsRUFBUSxTQTVIUjtFQTZIQSxPQUFBLEVBQVEsU0E3SFI7RUE4SEEsT0FBQSxFQUFRLFNBOUhSO0VBK0hBLE9BQUEsRUFBUSxTQS9IUjtFQWdJQSxPQUFBLEVBQVEsU0FoSVI7RUFpSUEsT0FBQSxFQUFRLFNBaklSO0VBa0lBLE9BQUEsRUFBUSxTQWxJUjtFQW1JQSxRQUFBLEVBQVMsU0FuSVQ7RUFvSUEsUUFBQSxFQUFTLFNBcElUO0VBcUlBLFFBQUEsRUFBUyxTQXJJVDtFQXNJQSxRQUFBLEVBQVMsU0F0SVQ7RUF1SUEsS0FBQSxFQUFNLFNBdklOO0VBd0lBLE9BQUEsRUFBUSxTQXhJUjtFQXlJQSxRQUFBLEVBQVMsU0F6SVQ7RUEwSUEsUUFBQSxFQUFTLFNBMUlUO0VBMklBLFFBQUEsRUFBUyxTQTNJVDtFQTRJQSxRQUFBLEVBQVMsU0E1SVQ7RUE2SUEsUUFBQSxFQUFTLFNBN0lUO0VBOElBLFFBQUEsRUFBUyxTQTlJVDtFQStJQSxRQUFBLEVBQVMsU0EvSVQ7RUFnSkEsUUFBQSxFQUFTLFNBaEpUO0VBaUpBLFFBQUEsRUFBUyxTQWpKVDtFQWtKQSxTQUFBLEVBQVUsU0FsSlY7RUFtSkEsU0FBQSxFQUFVLFNBbkpWO0VBb0pBLFNBQUEsRUFBVSxTQXBKVjtFQXFKQSxTQUFBLEVBQVUsU0FySlY7RUFzSkEsVUFBQSxFQUFXLFNBdEpYO0VBdUpBLFlBQUEsRUFBYSxTQXZKYjtFQXdKQSxhQUFBLEVBQWMsU0F4SmQ7RUF5SkEsYUFBQSxFQUFjLFNBekpkO0VBMEpBLGFBQUEsRUFBYyxTQTFKZDtFQTJKQSxhQUFBLEVBQWMsU0EzSmQ7RUE0SkEsYUFBQSxFQUFjLFNBNUpkO0VBNkpBLGFBQUEsRUFBYyxTQTdKZDtFQThKQSxhQUFBLEVBQWMsU0E5SmQ7RUErSkEsYUFBQSxFQUFjLFNBL0pkO0VBZ0tBLGFBQUEsRUFBYyxTQWhLZDtFQWlLQSxjQUFBLEVBQWUsU0FqS2Y7RUFrS0EsY0FBQSxFQUFlLFNBbEtmO0VBbUtBLGNBQUEsRUFBZSxTQW5LZjtFQW9LQSxjQUFBLEVBQWUsU0FwS2Y7RUFxS0EsSUFBQSxFQUFLLFNBcktMO0VBc0tBLE1BQUEsRUFBTyxTQXRLUDtFQXVLQSxPQUFBLEVBQVEsU0F2S1I7RUF3S0EsT0FBQSxFQUFRLFNBeEtSO0VBeUtBLE9BQUEsRUFBUSxTQXpLUjtFQTBLQSxPQUFBLEVBQVEsU0ExS1I7RUEyS0EsT0FBQSxFQUFRLFNBM0tSO0VBNEtBLE9BQUEsRUFBUSxTQTVLUjtFQTZLQSxPQUFBLEVBQVEsU0E3S1I7RUE4S0EsT0FBQSxFQUFRLFNBOUtSO0VBK0tBLE9BQUEsRUFBUSxTQS9LUjtFQWdMQSxRQUFBLEVBQVMsU0FoTFQ7RUFpTEEsUUFBQSxFQUFTLFNBakxUO0VBa0xBLFFBQUEsRUFBUyxTQWxMVDtFQW1MQSxRQUFBLEVBQVMsU0FuTFQ7RUFvTEEsTUFBQSxFQUFPLFNBcExQO0VBcUxBLFFBQUEsRUFBUyxTQXJMVDtFQXNMQSxTQUFBLEVBQVUsU0F0TFY7RUF1TEEsU0FBQSxFQUFVLFNBdkxWO0VBd0xBLFNBQUEsRUFBVSxTQXhMVjtFQXlMQSxTQUFBLEVBQVUsU0F6TFY7RUEwTEEsU0FBQSxFQUFVLFNBMUxWO0VBMkxBLFNBQUEsRUFBVSxTQTNMVjtFQTRMQSxTQUFBLEVBQVUsU0E1TFY7RUE2TEEsU0FBQSxFQUFVLFNBN0xWO0VBOExBLFNBQUEsRUFBVSxTQTlMVjtFQStMQSxVQUFBLEVBQVcsU0EvTFg7RUFnTUEsVUFBQSxFQUFXLFNBaE1YO0VBaU1BLFVBQUEsRUFBVyxTQWpNWDtFQWtNQSxVQUFBLEVBQVcsU0FsTVg7RUFtTUEsS0FBQSxFQUFNLFNBbk1OO0VBb01BLE9BQUEsRUFBUSxTQXBNUjtFQXFNQSxRQUFBLEVBQVMsU0FyTVQ7RUFzTUEsUUFBQSxFQUFTLFNBdE1UO0VBdU1BLFFBQUEsRUFBUyxTQXZNVDtFQXdNQSxRQUFBLEVBQVMsU0F4TVQ7RUF5TUEsUUFBQSxFQUFTLFNBek1UO0VBME1BLFFBQUEsRUFBUyxTQTFNVDtFQTJNQSxRQUFBLEVBQVMsU0EzTVQ7RUE0TUEsUUFBQSxFQUFTLFNBNU1UO0VBNk1BLFFBQUEsRUFBUyxTQTdNVDtFQThNQSxTQUFBLEVBQVUsU0E5TVY7RUErTUEsU0FBQSxFQUFVLFNBL01WO0VBZ05BLFNBQUEsRUFBVSxTQWhOVjtFQWlOQSxTQUFBLEVBQVUsU0FqTlY7RUFrTkEsTUFBQSxFQUFPLFNBbE5QO0VBbU5BLFFBQUEsRUFBUyxTQW5OVDtFQW9OQSxTQUFBLEVBQVUsU0FwTlY7RUFxTkEsU0FBQSxFQUFVLFNBck5WO0VBc05BLFNBQUEsRUFBVSxTQXROVjtFQXVOQSxTQUFBLEVBQVUsU0F2TlY7RUF3TkEsU0FBQSxFQUFVLFNBeE5WO0VBeU5BLFNBQUEsRUFBVSxTQXpOVjtFQTBOQSxTQUFBLEVBQVUsU0ExTlY7RUEyTkEsU0FBQSxFQUFVLFNBM05WO0VBNE5BLFNBQUEsRUFBVSxTQTVOVjtFQTZOQSxVQUFBLEVBQVcsU0E3Tlg7RUE4TkEsVUFBQSxFQUFXLFNBOU5YO0VBK05BLFVBQUEsRUFBVyxTQS9OWDtFQWdPQSxVQUFBLEVBQVcsU0FoT1g7RUFpT0EsVUFBQSxFQUFXLFNBak9YO0VBa09BLFlBQUEsRUFBYSxTQWxPYjtFQW1PQSxhQUFBLEVBQWMsU0FuT2Q7RUFvT0EsYUFBQSxFQUFjLFNBcE9kO0VBcU9BLGFBQUEsRUFBYyxTQXJPZDtFQXNPQSxhQUFBLEVBQWMsU0F0T2Q7RUF1T0EsYUFBQSxFQUFjLFNBdk9kO0VBd09BLGFBQUEsRUFBYyxTQXhPZDtFQXlPQSxhQUFBLEVBQWMsU0F6T2Q7RUEwT0EsYUFBQSxFQUFjLFNBMU9kO0VBMk9BLGFBQUEsRUFBYyxTQTNPZDtFQTRPQSxjQUFBLEVBQWUsU0E1T2Y7RUE2T0EsY0FBQSxFQUFlLFNBN09mO0VBOE9BLGNBQUEsRUFBZSxTQTlPZjtFQStPQSxjQUFBLEVBQWUsU0EvT2Y7RUFnUEEsS0FBQSxFQUFNLFNBaFBOO0VBaVBBLE9BQUEsRUFBUSxTQWpQUjtFQWtQQSxRQUFBLEVBQVMsU0FsUFQ7RUFtUEEsUUFBQSxFQUFTLFNBblBUO0VBb1BBLFFBQUEsRUFBUyxTQXBQVDtFQXFQQSxRQUFBLEVBQVMsU0FyUFQ7RUFzUEEsUUFBQSxFQUFTLFNBdFBUO0VBdVBBLFFBQUEsRUFBUyxTQXZQVDtFQXdQQSxRQUFBLEVBQVMsU0F4UFQ7RUF5UEEsUUFBQSxFQUFTLFNBelBUO0VBMFBBLFFBQUEsRUFBUyxTQTFQVDtFQTJQQSxJQUFBLEVBQUssU0EzUEw7RUE0UEEsTUFBQSxFQUFPLFNBNVBQO0VBNlBBLE9BQUEsRUFBUSxTQTdQUjtFQThQQSxPQUFBLEVBQVEsU0E5UFI7RUErUEEsT0FBQSxFQUFRLFNBL1BSO0VBZ1FBLE9BQUEsRUFBUSxTQWhRUjtFQWlRQSxPQUFBLEVBQVEsU0FqUVI7RUFrUUEsT0FBQSxFQUFRLFNBbFFSO0VBbVFBLE9BQUEsRUFBUSxTQW5RUjtFQW9RQSxPQUFBLEVBQVEsU0FwUVI7RUFxUUEsT0FBQSxFQUFRLFNBclFSO0VBc1FBLFFBQUEsRUFBUyxTQXRRVDtFQXVRQSxVQUFBLEVBQVcsU0F2UVg7RUF3UUEsV0FBQSxFQUFZLFNBeFFaO0VBeVFBLFdBQUEsRUFBWSxTQXpRWjtFQTBRQSxXQUFBLEVBQVksU0ExUVo7RUEyUUEsV0FBQSxFQUFZLFNBM1FaO0VBNFFBLFdBQUEsRUFBWSxTQTVRWjtFQTZRQSxXQUFBLEVBQVksU0E3UVo7RUE4UUEsV0FBQSxFQUFZLFNBOVFaO0VBK1FBLFdBQUEsRUFBWSxTQS9RWjtFQWdSQSxXQUFBLEVBQVksU0FoUlo7RUFpUkEsS0FBQSxFQUFNLFNBalJOO0VBa1JBLEtBQUEsRUFBTSxTQWxSTjs7Ozs7QUR0b0JELElBQUE7O0FBQUEsQ0FBQSxHQUFJLE9BQUEsQ0FBUSxjQUFSOztBQUVKLE9BQU8sQ0FBQyxRQUFSLEdBQW1COztBQUduQixPQUFPLENBQUMsUUFBUSxDQUFDLEtBQWpCLEdBQXlCLE1BQU0sQ0FBQyxJQUFQLENBQVksT0FBTyxDQUFDLFFBQXBCOztBQUV6QixPQUFPLENBQUMsTUFBUixHQUFpQixTQUFDLEtBQUQ7QUFDaEIsTUFBQTtFQUFBLEtBQUEsR0FBUSxDQUFDLENBQUMsS0FBSyxDQUFDLGNBQVIsQ0FBdUIsS0FBdkIsRUFBOEIsT0FBTyxDQUFDLFFBQXRDO0VBRVIsTUFBQSxHQUFhLElBQUEsS0FBQSxDQUNaO0lBQUEsZUFBQSxFQUFnQixPQUFoQjtHQURZO0VBR2IsTUFBTSxDQUFDLElBQVAsR0FBYztFQUVkLE1BQU0sQ0FBQyxXQUFQLEdBQ0M7SUFBQSxNQUFBLEVBQU8sQ0FBQyxDQUFSO0lBQ0EsT0FBQSxFQUFRLENBRFI7SUFFQSxRQUFBLEVBQVMsQ0FGVDtJQUdBLE1BQUEsRUFBTyxFQUhQOztFQUtELE9BQUEsR0FBVSxDQUFDLENBQUMsS0FBSyxDQUFDLEdBQVIsQ0FBWSxDQUFDLENBQUMsTUFBTSxDQUFDLElBQXJCO0VBQ1YsT0FBQSxHQUFVLENBQUMsQ0FBQyxLQUFLLENBQUMsR0FBUixDQUFZLENBQUMsQ0FBQyxNQUFNLENBQUMsSUFBckI7RUFFVixVQUFBLEdBQWlCLElBQUEsS0FBQSxDQUNoQjtJQUFBLFVBQUEsRUFBVyxNQUFYO0lBQ0EsWUFBQSxFQUFhLENBQUMsQ0FBQyxLQUFLLENBQUMsRUFBUixDQUFXLEVBQVgsQ0FEYjtJQUVBLGVBQUEsRUFBZ0IsYUFGaEI7SUFHQSxJQUFBLEVBQUssTUFITDtJQUlBLElBQUEsRUFBSyxJQUpMO0dBRGdCO0VBT2pCLFVBQVUsQ0FBQyxXQUFYLEdBQ0M7SUFBQSxHQUFBLEVBQUksQ0FBSjtJQUNBLE1BQUEsRUFBTyxFQURQO0lBRUEsS0FBQSxFQUFNLEVBRk47SUFHQSxLQUFBLEVBQU0sWUFITjs7RUFLRCxRQUFBLEdBQWUsSUFBQSxLQUFBLENBQ2Q7SUFBQSxVQUFBLEVBQVcsVUFBWDtJQUNBLEtBQUEsRUFBTSxPQUFPLENBQUMsS0FEZDtJQUVBLE1BQUEsRUFBTyxPQUFPLENBQUMsTUFGZjtJQUdBLElBQUEsRUFBSyxPQUFPLENBQUMsR0FIYjtJQUlBLGVBQUEsRUFBZ0IsYUFKaEI7SUFLQSxJQUFBLEVBQUssTUFMTDtHQURjO0VBUWYsUUFBUSxDQUFDLFdBQVQsR0FDQztJQUFBLEtBQUEsRUFBTSxRQUFOOztFQUVELFlBQUEsR0FBbUIsSUFBQSxLQUFBLENBQ2xCO0lBQUEsVUFBQSxFQUFXLE1BQVg7SUFDQSxZQUFBLEVBQWEsQ0FBQyxDQUFDLEtBQUssQ0FBQyxFQUFSLENBQVcsRUFBWCxDQURiO0lBRUEsZUFBQSxFQUFnQixhQUZoQjtJQUdBLElBQUEsRUFBSyxRQUhMO0lBSUEsSUFBQSxFQUFLLElBSkw7R0FEa0I7RUFPbkIsWUFBWSxDQUFDLFdBQWIsR0FDQztJQUFBLEdBQUEsRUFBSSxDQUFKO0lBQ0EsTUFBQSxFQUFPLEVBRFA7SUFFQSxLQUFBLEVBQU0sRUFGTjtJQUdBLE9BQUEsRUFBUSxDQUFDLFVBQUQsRUFBYSxDQUFiLENBSFI7O0VBS0QsVUFBQSxHQUFpQixJQUFBLEtBQUEsQ0FDaEI7SUFBQSxVQUFBLEVBQVcsWUFBWDtJQUNBLGVBQUEsRUFBZ0IsYUFEaEI7SUFFQSxXQUFBLEVBQVksT0FGWjtJQUdBLFdBQUEsRUFBWSxDQUFDLENBQUMsS0FBSyxDQUFDLEVBQVIsQ0FBVyxDQUFYLENBSFo7SUFJQSxZQUFBLEVBQWEsQ0FBQyxDQUFDLEtBQUssQ0FBQyxFQUFSLENBQVcsQ0FBWCxDQUpiO0lBS0EsSUFBQSxFQUFLLE1BTEw7R0FEZ0I7RUFRakIsVUFBVSxDQUFDLFdBQVgsR0FDQztJQUFBLEtBQUEsRUFBTSxRQUFOO0lBQ0EsS0FBQSxFQUFNLEVBRE47SUFFQSxNQUFBLEVBQU8sRUFGUDs7RUFJRCxVQUFBLEdBQWlCLElBQUEsS0FBQSxDQUNoQjtJQUFBLFVBQUEsRUFBVyxNQUFYO0lBQ0EsWUFBQSxFQUFhLENBQUMsQ0FBQyxLQUFLLENBQUMsRUFBUixDQUFXLEVBQVgsQ0FEYjtJQUVBLGVBQUEsRUFBZ0IsYUFGaEI7SUFHQSxJQUFBLEVBQUssTUFITDtJQUlBLElBQUEsRUFBSyxJQUpMO0dBRGdCO0VBT2pCLFVBQVUsQ0FBQyxXQUFYLEdBQ0M7SUFBQSxHQUFBLEVBQUksQ0FBSjtJQUNBLE1BQUEsRUFBTyxFQURQO0lBRUEsS0FBQSxFQUFNLEVBRk47SUFHQSxRQUFBLEVBQVMsQ0FBQyxVQUFELEVBQWEsQ0FBYixDQUhUOztFQU1ELFFBQUEsR0FBZSxJQUFBLEtBQUEsQ0FDZDtJQUFBLFVBQUEsRUFBVyxVQUFYO0lBQ0EsS0FBQSxFQUFNLE9BQU8sQ0FBQyxLQURkO0lBRUEsTUFBQSxFQUFPLE9BQU8sQ0FBQyxNQUZmO0lBR0EsSUFBQSxFQUFLLE9BQU8sQ0FBQyxHQUhiO0lBSUEsZUFBQSxFQUFnQixhQUpoQjtJQUtBLElBQUEsRUFBSyxNQUxMO0dBRGM7RUFRZixRQUFRLENBQUMsV0FBVCxHQUNDO0lBQUEsS0FBQSxFQUFNLFFBQU47O0VBRUQsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxHQUFULENBQ0M7SUFBQSxNQUFBLEVBQU8sQ0FBQyxNQUFELEVBQVMsVUFBVCxFQUFxQixZQUFyQixFQUFtQyxVQUFuQyxFQUErQyxRQUEvQyxFQUF5RCxRQUF6RCxFQUFtRSxVQUFuRSxDQUFQO0dBREQ7RUFHQSxDQUFDLENBQUMsS0FBSyxDQUFDLElBQVIsQ0FDQztJQUFBLEtBQUEsRUFBTSxVQUFOO0lBQ0EsU0FBQSxFQUFVLEtBRFY7SUFFQSxLQUFBLEVBQU8sT0FGUDtJQUdBLEtBQUEsRUFBTyxFQUhQO0lBSUEsS0FBQSxFQUFPLGdDQUpQO0lBS0EsT0FBQSxFQUFTLEVBTFQ7R0FERDtFQU9BLENBQUMsQ0FBQyxLQUFLLENBQUMsSUFBUixDQUNFO0lBQUEsS0FBQSxFQUFNLFVBQU47SUFDQSxTQUFBLEVBQVUsS0FEVjtJQUVBLEtBQUEsRUFBTyxPQUZQO0lBR0EsS0FBQSxFQUFPLEVBSFA7SUFJQSxLQUFBLEVBQU8sZ0NBSlA7SUFLQSxPQUFBLEVBQVMsRUFMVDtHQURGO0VBT0EsQ0FBQyxDQUFDLEtBQUssQ0FBQyxJQUFSLENBQ0U7SUFBQSxLQUFBLEVBQU0sWUFBTjtJQUNBLFNBQUEsRUFBVSxLQURWO0lBRUEsS0FBQSxFQUFPLE9BRlA7SUFHQSxLQUFBLEVBQU8sRUFIUDtJQUlBLEtBQUEsRUFBTyxnQ0FKUDtJQUtBLE9BQUEsRUFBUyxFQUxUO0dBREY7RUFRQSxVQUFVLENBQUMsRUFBWCxDQUFjLE1BQU0sQ0FBQyxRQUFyQixFQUErQixTQUFBO1dBQzlCLENBQUMsQ0FBQyxlQUFGLENBQUE7RUFEOEIsQ0FBL0I7RUFHQSxNQUFNLENBQUMsSUFBUCxHQUFjO0VBQ2QsTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFaLEdBQXVCO0VBQ3ZCLE1BQU0sQ0FBQyxJQUFQLEdBQWM7RUFDZCxNQUFNLENBQUMsSUFBSSxDQUFDLElBQVosR0FBbUI7RUFDbkIsTUFBTSxDQUFDLE1BQVAsR0FBZ0I7RUFDaEIsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFkLEdBQXFCO0VBRXJCLEtBQUssQ0FBQyxRQUFOLENBQWUsR0FBZixFQUFvQixTQUFBO1dBQ25CLE1BQU0sQ0FBQyxZQUFQLENBQUE7RUFEbUIsQ0FBcEI7RUFHQSxDQUFDLENBQUMsTUFBTSxDQUFDLEdBQVQsQ0FBYSxNQUFiO0FBQ0EsU0FBTztBQW5JUzs7OztBRFBqQixJQUFBOztBQUFBLENBQUEsR0FBSSxPQUFBLENBQVEsY0FBUjs7QUFFSixPQUFPLENBQUMsUUFBUixHQUFtQjtFQUNsQixRQUFBLEVBQVMsSUFEUztFQUVsQixJQUFBLEVBQUssZUFGYTtFQUdsQixNQUFBLEVBQU8sTUFIVztFQUlsQixXQUFBLEVBQVksVUFKTTtFQUtsQixRQUFBLEVBQVMsQ0FMUzs7O0FBUW5CLE9BQU8sQ0FBQyxRQUFRLENBQUMsS0FBakIsR0FBeUIsTUFBTSxDQUFDLElBQVAsQ0FBWSxPQUFPLENBQUMsUUFBcEI7O0FBRXpCLE9BQU8sQ0FBQyxNQUFSLEdBQWlCLFNBQUMsS0FBRDtBQUNoQixNQUFBO0VBQUEsS0FBQSxHQUFRLENBQUMsQ0FBQyxLQUFLLENBQUMsY0FBUixDQUF1QixLQUF2QixFQUE4QixPQUFPLENBQUMsUUFBdEM7RUFFUixHQUFBLEdBQVUsSUFBQSxLQUFBLENBQ1Q7SUFBQSxJQUFBLEVBQUssVUFBTDtJQUNBLGVBQUEsRUFBZ0IsYUFEaEI7SUFFQSxJQUFBLEVBQUssSUFGTDtHQURTO0VBS1YsR0FBRyxDQUFDLElBQUosR0FBVztFQUNYLEdBQUcsQ0FBQyxFQUFKLEdBQWEsSUFBQSxLQUFBLENBQ1o7SUFBQSxlQUFBLEVBQWdCLFNBQWhCO0lBQ0EsVUFBQSxFQUFXLEdBRFg7SUFFQSxJQUFBLEVBQUssSUFGTDtHQURZO0VBS2IsWUFBQSxHQUFlO0VBQ2YsU0FBQSxHQUFZO0FBRVo7QUFBQSxPQUFBLHFDQUFBOztJQUNDLElBQUcsQ0FBQyxDQUFDLElBQUYsS0FBVSxRQUFiO01BQ0MsWUFBQSxHQUFlLEVBRGhCOztJQUdBLElBQUcsQ0FBQyxDQUFDLElBQUYsS0FBVSxVQUFiO01BQ0MsU0FBQSxHQUFZLEVBRGI7O0lBR0EsSUFBRyxDQUFDLENBQUMsSUFBRixLQUFVLFVBQVYsSUFBd0IsQ0FBQSxLQUFLLEdBQWhDO01BQ0MsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxPQUFMLENBQ0M7UUFBQSxVQUFBLEVBQVk7VUFBQSxDQUFBLEVBQUUsR0FBRyxDQUFDLE1BQU47U0FBWjtRQUNBLElBQUEsRUFBSyxFQURMO1FBRUEsS0FBQSxFQUFNLGlDQUZOO09BREQsRUFJSSxDQUFDLENBQUMsUUFBTCxHQUNDLENBQUEsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxNQUFYLEdBQW9CLElBQXBCLEVBQ0EsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQUMsTUFBdkIsR0FBZ0MsU0FBUyxDQUFDLGNBRDFDLEVBRUEsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxPQUFULENBQ0M7UUFBQSxNQUFBLEVBQU8sU0FBUDtRQUNBLEtBQUEsRUFBTSxpQ0FETjtRQUVBLElBQUEsRUFBSyxFQUZMO09BREQsQ0FGQSxFQU1BLEtBQUssQ0FBQyxLQUFOLENBQVksS0FBSyxDQUFDLFFBQWxCLEVBQTRCLFNBQUE7UUFDM0IsU0FBUyxDQUFDLFdBQVcsQ0FBQyxNQUF0QixHQUErQixTQUFTLENBQUM7ZUFDekMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxPQUFULENBQ0M7VUFBQSxNQUFBLEVBQU8sU0FBUDtVQUNBLEtBQUEsRUFBTSxpQ0FETjtVQUVBLElBQUEsRUFBSyxFQUZMO1NBREQ7TUFGMkIsQ0FBNUIsQ0FOQSxDQURELEdBQUEsTUFKRCxFQUREOztBQVBEO0VBMEJBLEdBQUcsQ0FBQyxZQUFKLENBQUE7RUFFQSxHQUFHLENBQUMsV0FBSixHQUNDO0lBQUEsT0FBQSxFQUFRLENBQVI7SUFDQSxRQUFBLEVBQVMsQ0FEVDtJQUVBLE1BQUEsRUFBTyxDQUFDLFlBQUQsRUFBZSxDQUFDLENBQWhCLENBRlA7SUFHQSxNQUFBLEVBQU8sRUFIUDs7RUFLRCxDQUFDLENBQUMsTUFBTSxDQUFDLEdBQVQsQ0FDQztJQUFBLE1BQUEsRUFBTyxDQUFDLEdBQUQsQ0FBUDtHQUREO0VBR0EsR0FBRyxDQUFDLEVBQUUsQ0FBQyxLQUFQLEdBQWU7SUFBQyxLQUFBLEVBQU0sR0FBRyxDQUFDLEtBQVg7SUFBa0IsTUFBQSxFQUFPLEdBQUcsQ0FBQyxNQUE3Qjs7RUFDZixXQUFBLEdBQWMsQ0FBQyxDQUFDLEVBQUYsQ0FBSyxFQUFMO0VBRWQsSUFBRyxLQUFLLENBQUMsTUFBVDtJQUNDLEdBQUcsQ0FBQyxNQUFKLEdBQWlCLElBQUEsQ0FBQyxDQUFDLE1BQUYsQ0FDaEI7TUFBQSxJQUFBLEVBQUssTUFBTDtNQUNBLFVBQUEsRUFBVyxHQUFHLENBQUMsRUFEZjtNQUVBLElBQUEsRUFBSyxLQUFLLENBQUMsTUFGWDtNQUdBLFdBQUEsRUFBWTtRQUFDLFFBQUEsRUFBUyxFQUFWO1FBQWMsS0FBQSxFQUFNLFVBQXBCO09BSFo7TUFJQSxlQUFBLEVBQWdCLE9BSmhCO01BS0EsS0FBQSxFQUFNLEtBQUssQ0FBQyxXQUxaO0tBRGdCO0lBT2pCLFdBQUEsR0FBYyxHQUFHLENBQUMsTUFBTSxDQUFDLEtBQVgsR0FBbUIsQ0FBQyxDQUFDLEVBQUYsQ0FBSyxFQUFMLEVBUmxDOztFQVVBLEdBQUcsQ0FBQyxJQUFKLEdBQWUsSUFBQSxDQUFDLENBQUMsSUFBRixDQUNkO0lBQUEsUUFBQSxFQUFTLEVBQVQ7SUFDQSxLQUFBLEVBQU0sT0FETjtJQUVBLFVBQUEsRUFBVyxHQUFHLENBQUMsRUFGZjtJQUdBLFdBQUEsRUFBWTtNQUFDLE9BQUEsRUFBUSxFQUFUO01BQWEsS0FBQSxFQUFNLFVBQW5CO0tBSFo7SUFJQSxJQUFBLEVBQUssS0FBSyxDQUFDLElBSlg7SUFLQSxJQUFBLEVBQUssTUFMTDtJQU1BLFVBQUEsRUFBVyxFQU5YO0dBRGM7RUFTZixJQUFHLENBQUMsQ0FBQyxNQUFNLENBQUMsS0FBVCxHQUFpQixXQUFBLEdBQWMsR0FBRyxDQUFDLElBQUksQ0FBQyxLQUF2QixHQUErQixDQUFDLENBQUMsRUFBRixDQUFLLEVBQUwsQ0FBbkQ7SUFDQyxHQUFHLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxLQUFyQixHQUE2QixDQUFDLENBQUMsRUFBRixDQUFLLENBQUMsQ0FBQyxNQUFNLENBQUMsS0FBZCxDQUFBLEdBQXVCLENBQUMsQ0FBQyxDQUFDLEVBQUYsQ0FBSyxXQUFMLENBQUEsR0FBb0IsRUFBckI7SUFDcEQsQ0FBQyxDQUFDLEtBQUssQ0FBQyxNQUFSLENBQWUsR0FBRyxDQUFDLElBQW5CO0lBQ0EsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxHQUFULENBQWEsR0FBRyxDQUFDLElBQWpCO0lBQ0EsR0FBRyxDQUFDLFdBQVcsQ0FBQyxNQUFoQixHQUF5QixDQUFDLENBQUMsRUFBRixDQUFLLEdBQUcsQ0FBQyxJQUFJLENBQUMsTUFBZCxDQUFBLEdBQXdCO0lBQ2pELEdBQUcsQ0FBQyxFQUFFLENBQUMsTUFBUCxHQUFnQixHQUFHLENBQUMsSUFBSSxDQUFDLE1BQVQsR0FBa0IsQ0FBQyxDQUFDLEVBQUYsQ0FBSyxFQUFMO0lBRWxDLENBQUMsQ0FBQyxNQUFNLENBQUMsR0FBVCxDQUNDO01BQUEsTUFBQSxFQUFPLENBQUMsR0FBRCxFQUFNLEdBQUcsQ0FBQyxJQUFWLENBQVA7S0FERDtJQUdBLElBQUcsS0FBSyxDQUFDLE1BQVQ7TUFDQyxDQUFDLENBQUMsTUFBTSxDQUFDLEdBQVQsQ0FBYSxHQUFHLENBQUMsTUFBakIsRUFERDtLQVZEOztFQWFBLFNBQUEsR0FBWSxHQUFHLENBQUMsRUFBRSxDQUFDO0VBRW5CLElBQUcsU0FBSDtJQUNDLEdBQUcsQ0FBQyxRQUFKLEdBQWU7SUFDZixTQUFTLENBQUMsY0FBVixHQUEyQixTQUFTLENBQUMsV0FBVyxDQUFDO0lBQ2pELFNBQVMsQ0FBQyxXQUFXLENBQUMsTUFBdEIsR0FBK0IsU0FBUyxDQUFDLFdBQVcsQ0FBQyxNQUF0QixHQUErQixDQUFDLENBQUMsRUFBRixDQUFLLFNBQUwsRUFIL0Q7O0VBS0EsSUFBRyxLQUFLLENBQUMsUUFBVDtJQUNDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBUCxHQUFXLEdBQUcsQ0FBQyxFQUFFLENBQUM7SUFDbEIsR0FBRyxDQUFDLElBQUksQ0FBQyxPQUFULEdBQW1CO0lBQ25CLEdBQUcsQ0FBQyxFQUFFLENBQUMsT0FBUCxDQUNDO01BQUEsVUFBQSxFQUFZO1FBQUEsQ0FBQSxFQUFFLENBQUY7T0FBWjtNQUNBLElBQUEsRUFBSyxFQURMO01BRUEsS0FBQSxFQUFNLGlDQUZOO0tBREQ7SUFJQSxHQUFHLENBQUMsSUFBSSxDQUFDLE9BQVQsQ0FDQztNQUFBLFVBQUEsRUFBWTtRQUFBLE9BQUEsRUFBUSxDQUFSO09BQVo7TUFDQSxJQUFBLEVBQUssRUFETDtLQUREO0lBR0EsSUFBRyxLQUFLLENBQUMsTUFBVDtNQUNDLEdBQUcsQ0FBQyxNQUFNLENBQUMsT0FBWCxDQUNDO1FBQUEsVUFBQSxFQUFZO1VBQUEsT0FBQSxFQUFRLENBQVI7U0FBWjtRQUNBLElBQUEsRUFBSyxFQURMO09BREQsRUFERDs7SUFJQSxJQUFHLFNBQUg7TUFDQyxDQUFDLENBQUMsTUFBTSxDQUFDLE9BQVQsQ0FDQztRQUFBLE1BQUEsRUFBTyxTQUFQO1FBQ0EsS0FBQSxFQUFNLGlDQUROO1FBRUEsSUFBQSxFQUFLLEVBRkw7T0FERCxFQUREO0tBZEQ7O0VBb0JBLEtBQUssQ0FBQyxLQUFOLENBQVksS0FBSyxDQUFDLFFBQWxCLEVBQTRCLFNBQUE7SUFDM0IsR0FBRyxDQUFDLEVBQUUsQ0FBQyxPQUFQLENBQ0M7TUFBQSxVQUFBLEVBQVk7UUFBQSxDQUFBLEVBQUUsR0FBRyxDQUFDLE1BQU47T0FBWjtNQUNBLElBQUEsRUFBSyxFQURMO01BRUEsS0FBQSxFQUFNLGlDQUZOO0tBREQ7SUFJQSxHQUFHLENBQUMsSUFBSSxDQUFDLE9BQVQsQ0FDQztNQUFBLFVBQUEsRUFBWTtRQUFBLE9BQUEsRUFBUSxDQUFSO09BQVo7TUFDQSxJQUFBLEVBQUssRUFETDtLQUREO0lBR0EsSUFBRyxLQUFLLENBQUMsTUFBVDtNQUNDLEdBQUcsQ0FBQyxNQUFNLENBQUMsT0FBWCxDQUNDO1FBQUEsVUFBQSxFQUFZO1VBQUEsT0FBQSxFQUFRLENBQVI7U0FBWjtRQUNBLElBQUEsRUFBSyxFQURMO09BREQsRUFERDs7SUFJQSxJQUFHLFNBQUEsSUFBYSxTQUFTLENBQUMsTUFBVixLQUFvQixJQUFwQztNQUNDLFNBQVMsQ0FBQyxXQUFXLENBQUMsTUFBdEIsR0FBK0IsU0FBUyxDQUFDO2FBQ3pDLENBQUMsQ0FBQyxNQUFNLENBQUMsT0FBVCxDQUNDO1FBQUEsTUFBQSxFQUFPLFNBQVA7UUFDQSxLQUFBLEVBQU0saUNBRE47UUFFQSxJQUFBLEVBQUssRUFGTDtPQURELEVBRkQ7O0VBWjJCLENBQTVCO0VBa0JBLEtBQUssQ0FBQyxLQUFOLENBQVksS0FBSyxDQUFDLFFBQU4sR0FBaUIsRUFBN0IsRUFBaUMsU0FBQTtXQUNoQyxHQUFHLENBQUMsT0FBSixDQUFBO0VBRGdDLENBQWpDO0FBRUEsU0FBTztBQXhJUzs7OztBRFpqQixJQUFBOztBQUFBLENBQUEsR0FBSSxPQUFBLENBQVEsY0FBUjs7QUFFSixPQUFPLENBQUMsS0FBUixHQUFnQixLQUFBLEdBQVE7O0FBR3hCLE9BQU8sQ0FBQyxVQUFSLEdBQXFCLFNBQUMsS0FBRDtFQUNuQixJQUFHLEtBQUssQ0FBQyxPQUFOLENBQWMsS0FBZCxDQUFBLEtBQXdCLENBQUMsQ0FBNUI7V0FDRSxLQUFLLENBQUMsSUFBTixDQUFXLEtBQVgsRUFERjs7QUFEbUI7O0FBSXJCLE9BQU8sQ0FBQyxlQUFSLEdBQTBCLFNBQUMsS0FBRDtBQUN4QixNQUFBO0VBQUEsSUFBRyxLQUFLLENBQUMsTUFBTixHQUFlLENBQWxCO0lBQ0UsWUFBQSxHQUFlLEtBQU0sQ0FBQSxLQUFLLENBQUMsTUFBTixHQUFlLENBQWY7SUFDckIsSUFBRyxZQUFZLENBQUMsSUFBYixLQUFxQixNQUF4QjtNQUNFLFlBQVksQ0FBQyxJQUFiLENBQUEsRUFERjtLQUFBLE1BQUE7TUFHRSxPQUFBLEdBQWMsSUFBQSxLQUFBLENBQ1o7UUFBQSxlQUFBLEVBQWdCLENBQUMsQ0FBQyxLQUFGLENBQVEsT0FBUixDQUFoQjtRQUNBLEtBQUEsRUFBTSxDQUFDLENBQUMsTUFBTSxDQUFDLEtBRGY7UUFFQSxNQUFBLEVBQU8sQ0FBQyxDQUFDLE1BQU0sQ0FBQyxNQUZoQjtPQURZO01BSWQsT0FBTyxDQUFDLFdBQVIsQ0FBb0IsWUFBcEI7TUFDQSxZQUFZLENBQUMsV0FBYixHQUNFO1FBQUEsT0FBQSxFQUFRLENBQUMsQ0FBQyxFQUFGLENBQUssQ0FBQyxDQUFDLE1BQU0sQ0FBQyxLQUFkLENBQVI7O01BQ0YsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxPQUFULENBQ0U7UUFBQSxNQUFBLEVBQU8sWUFBUDtRQUNBLElBQUEsRUFBSyxFQURMO09BREY7TUFHQSxPQUFPLENBQUMsT0FBUixDQUNFO1FBQUEsVUFBQSxFQUFZO1VBQUEsT0FBQSxFQUFRLENBQVI7U0FBWjtRQUNBLElBQUEsRUFBSyxFQURMO1FBRUEsS0FBQSxFQUFNLEVBRk47T0FERjtNQUlBLEtBQUssQ0FBQyxLQUFOLENBQVksRUFBWixFQUFnQixTQUFBO1FBQ2QsWUFBWSxDQUFDLE9BQWIsQ0FBQTtlQUNBLE9BQU8sQ0FBQyxPQUFSLENBQUE7TUFGYyxDQUFoQixFQWpCRjs7V0FvQkEsS0FBSyxDQUFDLEdBQU4sQ0FBQSxFQXRCRjs7QUFEd0I7Ozs7QURUMUIsSUFBQTs7QUFBQSxDQUFBLEdBQUksT0FBQSxDQUFRLGNBQVI7O0FBRUosT0FBTyxDQUFDLFFBQVIsR0FBbUI7RUFDbEIsT0FBQSxFQUFRLEVBRFU7RUFFbEIsT0FBQSxFQUFRLEtBRlU7RUFHbEIsT0FBQSxFQUFRLEdBSFU7RUFJbEIsUUFBQSxFQUFTLENBSlM7RUFLbEIsS0FBQSxFQUFNLE9BTFk7RUFNbEIsT0FBQSxFQUFRLEtBTlU7RUFPbEIsSUFBQSxFQUFLLFdBUGE7RUFRbEIsZUFBQSxFQUFnQixnQkFSRTtFQVNsQixLQUFBLEVBQU8sT0FUVztFQVVsQixPQUFBLEVBQVEsRUFWVTs7O0FBYW5CLE9BQU8sQ0FBQyxRQUFRLENBQUMsS0FBakIsR0FBeUIsTUFBTSxDQUFDLElBQVAsQ0FBWSxPQUFPLENBQUMsUUFBcEI7O0FBRXpCLE9BQU8sQ0FBQyxNQUFSLEdBQWlCLFNBQUMsS0FBRDtBQUNoQixNQUFBO0VBQUEsS0FBQSxHQUFRLENBQUMsQ0FBQyxLQUFLLENBQUMsY0FBUixDQUF1QixLQUF2QixFQUE4QixPQUFPLENBQUMsUUFBdEM7RUFDUixTQUFBLEdBQWdCLElBQUEsS0FBQSxDQUFNO0lBQUEsZUFBQSxFQUFnQixLQUFLLENBQUMsZUFBdEI7SUFBdUMsSUFBQSxFQUFLLGVBQTVDO0dBQU47RUFFaEIsSUFBRyxLQUFLLENBQUMsS0FBTixLQUFlLE1BQWxCO0lBQ0MsSUFBRyxLQUFLLENBQUMsZUFBTixLQUF5QixnQkFBNUI7TUFDQyxTQUFTLENBQUMsZUFBVixHQUE0QixDQUFDLENBQUMsS0FBSyxDQUFDLEtBQVIsQ0FBYyxPQUFkLEVBRDdCOztJQUVBLElBQUcsS0FBSyxDQUFDLEtBQU4sS0FBZSxPQUFsQjtNQUNDLEtBQUssQ0FBQyxLQUFOLEdBQWMsUUFEZjs7SUFFQSxJQUFHLEtBQUssQ0FBQyxPQUFOLEtBQWlCLEVBQXBCO01BQ0MsS0FBSyxDQUFDLE9BQU4sR0FBZ0IsRUFEakI7S0FMRDs7RUFRQSxJQUFHLEtBQUssQ0FBQyxLQUFOLEtBQWUsT0FBZixJQUEwQixLQUFLLENBQUMsS0FBTixLQUFlLE9BQTVDO0lBQ0MsS0FBSyxDQUFDLE9BQU4sR0FBZ0IsRUFEakI7O0VBR0EsU0FBUyxDQUFDLElBQVYsR0FBaUIsS0FBSyxDQUFDO0VBQ3ZCLFNBQVMsQ0FBQyxXQUFWLEdBQ0M7SUFBQSxPQUFBLEVBQVEsQ0FBUjtJQUNBLFFBQUEsRUFBUyxDQURUO0lBRUEsTUFBQSxFQUFPLEVBRlA7O0FBSUQsVUFBTyxDQUFDLENBQUMsTUFBTSxDQUFDLElBQWhCO0FBQUEsU0FDTSxnQkFETjtNQUVFLElBQUMsQ0FBQSxhQUFELEdBQWlCO01BQ2pCLElBQUMsQ0FBQSxTQUFELEdBQWE7QUFGVDtBQUROLFNBS00sWUFMTjtNQU1FLElBQUMsQ0FBQSxhQUFELEdBQWlCO01BQ2pCLElBQUMsQ0FBQSxTQUFELEdBQWEsQ0FBRTtBQUZYO0FBTE47TUFTRSxJQUFDLENBQUEsYUFBRCxHQUFpQjtNQUNqQixJQUFDLENBQUEsU0FBRCxHQUFhO0FBVmY7RUFjQSxJQUFDLENBQUEsSUFBRCxHQUFRLENBQUMsQ0FBQyxLQUFLLENBQUMsT0FBUixDQUFBO0VBQ1IsSUFBQSxHQUFXLElBQUEsQ0FBQyxDQUFDLElBQUYsQ0FBTztJQUFBLEtBQUEsRUFBTSxlQUFOO0lBQXVCLElBQUEsRUFBSyxDQUFDLENBQUMsS0FBSyxDQUFDLGFBQVIsQ0FBc0IsSUFBQyxDQUFBLElBQXZCLEVBQTZCLEtBQUssQ0FBQyxPQUFuQyxDQUE1QjtJQUF5RSxRQUFBLEVBQVMsRUFBbEY7SUFBc0YsVUFBQSxFQUFXLEdBQWpHO0lBQXNHLFVBQUEsRUFBVyxTQUFqSDtJQUE0SCxLQUFBLEVBQU0sS0FBSyxDQUFDLEtBQXhJO0lBQStJLElBQUEsRUFBSyxNQUFwSjtJQUE0SixPQUFBLEVBQVEsS0FBSyxDQUFDLE9BQTFLO0dBQVA7RUFDWCxJQUFJLENBQUMsV0FBTCxHQUNDO0lBQUEsUUFBQSxFQUFTLENBQVQ7SUFDQSxLQUFBLEVBQU0sVUFETjs7RUFFRCxDQUFDLENBQUMsS0FBSyxDQUFDLFlBQVIsQ0FBcUIsSUFBckIsRUFBMkIsS0FBSyxDQUFDLE9BQWpDO0VBR0EsV0FBQSxHQUFrQixJQUFBLEtBQUEsQ0FBTTtJQUFBLFVBQUEsRUFBVyxTQUFYO0lBQXNCLGVBQUEsRUFBZ0IsYUFBdEM7SUFBcUQsSUFBQSxFQUFLLGFBQTFEO0dBQU47RUFDbEIsSUFBRyxLQUFLLENBQUMsT0FBTixHQUFnQixFQUFuQjtJQUNDLFdBQUEsR0FBYyxDQUFDLENBQUMsS0FBSyxDQUFDLEdBQVIsQ0FBWSxDQUFDLENBQUMsTUFBTSxDQUFDLFdBQXJCO0lBQ2QsV0FBVyxDQUFDLElBQVosR0FBbUIsV0FBVyxDQUFDO0lBQy9CLFdBQVcsQ0FBQyxNQUFaLEdBQXFCLFdBQVcsQ0FBQztJQUNqQyxXQUFXLENBQUMsS0FBWixHQUFvQixXQUFXLENBQUM7SUFDaEMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxVQUFSLENBQW1CLFdBQW5CLEVBQWdDLEtBQUssQ0FBQyxLQUF0QztJQUNBLFdBQVcsQ0FBQyxPQUFaLEdBQXNCLEtBQUssQ0FBQyxRQU43Qjs7RUFRQSxJQUFHLEtBQUssQ0FBQyxPQUFOLElBQWlCLEVBQWpCLElBQXVCLEtBQUssQ0FBQyxPQUFOLEdBQWdCLEVBQTFDO0lBQ0MsVUFBQSxHQUFhLENBQUMsQ0FBQyxLQUFLLENBQUMsR0FBUixDQUFZLENBQUMsQ0FBQyxNQUFNLENBQUMsVUFBckI7SUFDYixXQUFXLENBQUMsSUFBWixHQUFtQixVQUFVLENBQUM7SUFDOUIsQ0FBQyxDQUFDLEtBQUssQ0FBQyxVQUFSLENBQW1CLFdBQW5CLEVBQWdDLEtBQUssQ0FBQyxLQUF0QyxFQUhEOztFQUtBLElBQUcsS0FBSyxDQUFDLE9BQU4sSUFBaUIsRUFBcEI7SUFDQyxVQUFBLEdBQWEsQ0FBQyxDQUFDLEtBQUssQ0FBQyxHQUFSLENBQVksQ0FBQyxDQUFDLE1BQU0sQ0FBQyxVQUFyQjtJQUNiLFdBQVcsQ0FBQyxJQUFaLEdBQW1CLFVBQVUsQ0FBQztJQUM5QixDQUFDLENBQUMsS0FBSyxDQUFDLFVBQVIsQ0FBbUIsV0FBbkIsRUFBZ0MsS0FBSyxDQUFDLEtBQXRDLEVBSEQ7O0VBTUEsV0FBVyxDQUFDLFdBQVosR0FDQztJQUFBLFFBQUEsRUFBVyxDQUFDLElBQUQsRUFBTyxDQUFQLENBQVg7SUFDQSxLQUFBLEVBQU0sVUFETjs7RUFJRCxZQUFBLEdBQWUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxHQUFSLENBQVksQ0FBQyxDQUFDLE1BQU0sQ0FBQyxRQUFyQjtFQUNmLFFBQUEsR0FBZSxJQUFBLEtBQUEsQ0FDZDtJQUFBLEtBQUEsRUFBTSxZQUFZLENBQUMsS0FBbkI7SUFDQSxNQUFBLEVBQU8sWUFBWSxDQUFDLE1BRHBCO0lBRUEsSUFBQSxFQUFLLFlBQVksQ0FBQyxHQUZsQjtJQUdBLFVBQUEsRUFBVyxTQUhYO0lBSUEsZUFBQSxFQUFnQixhQUpoQjtJQUtBLE9BQUEsRUFBUyxLQUFLLENBQUMsT0FMZjtJQU1BLElBQUEsRUFBSyxVQU5MO0dBRGM7RUFTZixRQUFRLENBQUMsV0FBVCxHQUNDO0lBQUEsUUFBQSxFQUFVLENBQUMsV0FBRCxFQUFjLENBQWQsQ0FBVjtJQUNBLEtBQUEsRUFBTSxVQUROOztFQUdELENBQUMsQ0FBQyxLQUFLLENBQUMsVUFBUixDQUFtQixRQUFuQixFQUE2QixLQUFLLENBQUMsS0FBbkM7RUFFQSxRQUFBLEdBQVcsQ0FBQyxDQUFDLEtBQUssQ0FBQyxHQUFSLENBQVksQ0FBQyxDQUFDLE1BQU0sQ0FBQyxJQUFyQixFQUEyQixLQUFLLENBQUMsS0FBakM7RUFFWCxJQUFBLEdBQVcsSUFBQSxLQUFBLENBQ1Y7SUFBQSxLQUFBLEVBQU0sUUFBUSxDQUFDLEtBQWY7SUFDQSxNQUFBLEVBQU8sUUFBUSxDQUFDLE1BRGhCO0lBRUEsVUFBQSxFQUFXLFNBRlg7SUFHQSxlQUFBLEVBQWdCLGFBSGhCO0lBSUEsSUFBQSxFQUFLLE1BSkw7SUFLQSxJQUFBLEVBQU0sUUFBUSxDQUFDLEdBTGY7SUFNQSxPQUFBLEVBQVMsS0FBSyxDQUFDLE9BTmY7R0FEVTtFQVNYLENBQUMsQ0FBQyxLQUFLLENBQUMsVUFBUixDQUFtQixJQUFuQixFQUF5QixLQUFLLENBQUMsS0FBL0I7RUFFQSxJQUFJLENBQUMsV0FBTCxHQUNDO0lBQUEsUUFBQSxFQUFTLENBQUMsUUFBRCxFQUFXLENBQVgsQ0FBVDtJQUNBLEtBQUEsRUFBTSxVQUROOztFQUdELENBQUMsQ0FBQyxNQUFNLENBQUMsR0FBVCxDQUFBO0VBR0EsU0FBUyxDQUFDLE9BQVYsR0FBb0I7RUFFcEIsU0FBUyxDQUFDLE9BQU8sQ0FBQyxJQUFsQixHQUF5QjtFQUV6QixTQUFTLENBQUMsSUFBVixHQUFpQjtFQUVqQixTQUFTLENBQUMsUUFBVixHQUFxQjtFQUVyQixDQUFDLENBQUMsTUFBTSxDQUFDLEdBQVQsQ0FDQztJQUFBLE1BQUEsRUFBTyxDQUFDLFNBQUQsRUFBWSxJQUFaLEVBQWtCLFdBQWxCLEVBQStCLFFBQS9CLEVBQXlDLElBQXpDLENBQVA7R0FERDtBQUVBLFNBQU87QUFsSFM7Ozs7QURqQmpCLElBQUE7O0FBQUEsQ0FBQSxHQUFJLE9BQUEsQ0FBUSxjQUFSOztBQUdKLE9BQU8sQ0FBQyxRQUFSLEdBQW1CO0VBQ2xCLFdBQUEsRUFBWSxFQURNO0VBRWxCLElBQUEsRUFBTSxxQkFGWTtFQUdsQixJQUFBLEVBQUssTUFIYTtFQUlsQixDQUFBLEVBQUUsQ0FKZ0I7RUFLbEIsQ0FBQSxFQUFFLENBTGdCO0VBTWxCLEtBQUEsRUFBTSxDQUFDLENBTlc7RUFPbEIsTUFBQSxFQUFPLENBQUMsQ0FQVTtFQVFsQixVQUFBLEVBQVcsTUFSTztFQVNsQixLQUFBLEVBQU0sU0FUWTtFQVVsQixLQUFBLEVBQU0sQ0FWWTtFQVdsQixTQUFBLEVBQVUsTUFYUTtFQVlsQixlQUFBLEVBQWdCLGFBWkU7RUFhbEIsS0FBQSxFQUFNLE9BYlk7RUFjbEIsUUFBQSxFQUFVLEVBZFE7RUFlbEIsU0FBQSxFQUFVLFNBZlE7RUFnQmxCLFVBQUEsRUFBVyxRQWhCTztFQWlCbEIsVUFBQSxFQUFXLFNBakJPO0VBa0JsQixVQUFBLEVBQVcsTUFsQk87RUFtQmxCLElBQUEsRUFBSyxZQW5CYTtFQW9CbEIsT0FBQSxFQUFRLENBcEJVO0VBcUJsQixhQUFBLEVBQWMsTUFyQkk7RUFzQmxCLGFBQUEsRUFBYyxDQXRCSTtFQXVCbEIsSUFBQSxFQUFLLFlBdkJhOzs7QUEyQm5CLE9BQU8sQ0FBQyxRQUFRLENBQUMsS0FBakIsR0FBeUIsTUFBTSxDQUFDLElBQVAsQ0FBWSxPQUFPLENBQUMsUUFBcEI7O0FBRXpCLEtBQUEsR0FBUSxRQUFRLENBQUMsYUFBVCxDQUF1QixPQUF2Qjs7QUFDUixLQUFLLENBQUMsSUFBTixHQUFhOztBQUViLEtBQUssQ0FBQyxXQUFOLENBQWtCLFFBQVEsQ0FBQyxjQUFULENBQXdCLDZOQUF4QixDQUFsQjs7QUFFQSxRQUFRLENBQUMsb0JBQVQsQ0FBOEIsTUFBOUIsQ0FBc0MsQ0FBQSxDQUFBLENBQUUsQ0FBQyxXQUF6QyxDQUFxRCxLQUFyRDs7QUFHQSxPQUFPLENBQUMsTUFBUixHQUFpQixTQUFDLEtBQUQ7QUFDaEIsTUFBQTtFQUFBLEtBQUEsR0FBUSxDQUFDLENBQUMsS0FBSyxDQUFDLGNBQVIsQ0FBdUIsS0FBdkIsRUFBOEIsT0FBTyxDQUFDLFFBQXRDO0VBQ1IsVUFBQSxHQUFhLE1BQU0sQ0FBQyxJQUFQLENBQVksS0FBWjtFQUNiLFNBQUEsR0FBZ0IsSUFBQSxLQUFBLENBQU07SUFBQSxlQUFBLEVBQWdCLGFBQWhCO0lBQStCLElBQUEsRUFBSyxLQUFLLENBQUMsSUFBMUM7R0FBTjtFQUNoQixTQUFTLENBQUMsSUFBVixHQUFpQjtFQUNqQixTQUFTLENBQUMsSUFBVixHQUFpQixLQUFLLENBQUM7QUFDdkI7QUFBQSxPQUFBLHFDQUFBOztJQUNDLElBQUcsS0FBTSxDQUFBLElBQUEsQ0FBVDtNQUNDLElBQUcsSUFBQSxLQUFRLE9BQVg7UUFDQyxLQUFNLENBQUEsSUFBQSxDQUFOLEdBQWMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxLQUFSLENBQWMsS0FBTSxDQUFBLElBQUEsQ0FBcEIsRUFEZjs7TUFFQSxTQUFVLENBQUEsSUFBQSxDQUFWLEdBQWtCLEtBQU0sQ0FBQSxJQUFBLEVBSHpCOztBQUREO0FBS0E7QUFBQSxPQUFBLHdDQUFBOztJQUNDLElBQUcsS0FBTSxDQUFBLElBQUEsQ0FBVDtNQUNDLElBQUcsSUFBQSxLQUFRLFlBQVIsSUFBd0IsS0FBTSxDQUFBLElBQUEsQ0FBTixLQUFlLE1BQTFDO1FBQ0MsU0FBUyxDQUFDLEtBQUssQ0FBQyxVQUFoQixHQUE4QixLQUFLLENBQUMsU0FEckM7O01BRUEsSUFBRyxJQUFBLEtBQVEsWUFBWDtBQUNDLGdCQUFPLEtBQU0sQ0FBQSxJQUFBLENBQWI7QUFBQSxlQUNNLFdBRE47WUFDdUIsS0FBTSxDQUFBLElBQUEsQ0FBTixHQUFjO0FBQS9CO0FBRE4sZUFFTSxNQUZOO1lBRWtCLEtBQU0sQ0FBQSxJQUFBLENBQU4sR0FBYztBQUExQjtBQUZOLGVBR00sT0FITjtZQUdtQixLQUFNLENBQUEsSUFBQSxDQUFOLEdBQWM7QUFBM0I7QUFITixlQUlNLFNBSk47WUFJcUIsS0FBTSxDQUFBLElBQUEsQ0FBTixHQUFjO0FBQTdCO0FBSk4sZUFLTSxRQUxOO1lBS29CLEtBQU0sQ0FBQSxJQUFBLENBQU4sR0FBYztBQUE1QjtBQUxOLGVBTU0sVUFOTjtZQU1zQixLQUFNLENBQUEsSUFBQSxDQUFOLEdBQWM7QUFBOUI7QUFOTixlQU9NLE1BUE47WUFPa0IsS0FBTSxDQUFBLElBQUEsQ0FBTixHQUFjO0FBQTFCO0FBUE4sZUFRTSxPQVJOO1lBUW1CLEtBQU0sQ0FBQSxJQUFBLENBQU4sR0FBYztBQVJqQyxTQUREOztNQVVBLElBQUcsSUFBQSxLQUFRLFVBQVIsSUFBc0IsSUFBQSxLQUFRLFlBQTlCLElBQThDLElBQUEsS0FBUSxlQUF6RDtRQUNDLEtBQU0sQ0FBQSxJQUFBLENBQU4sR0FBYyxDQUFDLENBQUMsS0FBSyxDQUFDLEVBQVIsQ0FBVyxLQUFNLENBQUEsSUFBQSxDQUFqQixDQUFBLEdBQTBCLEtBRHpDOztNQUVBLFNBQVMsQ0FBQyxLQUFNLENBQUEsSUFBQSxDQUFoQixHQUF3QixLQUFNLENBQUEsSUFBQSxFQWYvQjs7QUFERDtFQWtCQSxTQUFBLEdBQVksQ0FBQyxDQUFDLEtBQUssQ0FBQyxZQUFSLENBQXFCLFNBQXJCO0VBQ1osU0FBUyxDQUFDLEtBQVYsR0FBbUI7SUFBQSxNQUFBLEVBQU8sU0FBUyxDQUFDLE1BQWpCO0lBQXlCLEtBQUEsRUFBTSxTQUFTLENBQUMsS0FBekM7O0VBQ25CLFNBQVMsQ0FBQyxXQUFWLEdBQXdCLEtBQUssQ0FBQztFQUM5QixDQUFDLENBQUMsTUFBTSxDQUFDLEdBQVQsQ0FDQztJQUFBLE1BQUEsRUFBTyxTQUFQO0dBREQ7QUFFQSxTQUFPO0FBbENTOzs7O0FEeENqQixJQUFBOztBQUFBLENBQUEsR0FBSSxPQUFBLENBQVEsY0FBUjs7QUFHSixPQUFPLENBQUMsRUFBUixHQUFhLFNBQUMsRUFBRDtBQUNaLE1BQUE7RUFBQSxFQUFBLEdBQUssRUFBQSxHQUFHLENBQUMsQ0FBQyxNQUFNLENBQUM7RUFDakIsRUFBQSxHQUFLLElBQUksQ0FBQyxLQUFMLENBQVcsRUFBWDtBQUNMLFNBQU87QUFISzs7QUFNYixPQUFPLENBQUMsRUFBUixHQUFhLFNBQUMsRUFBRDtBQUNaLE1BQUE7RUFBQSxFQUFBLEdBQUssRUFBQSxHQUFLLENBQUMsQ0FBQyxNQUFNLENBQUM7RUFDbkIsRUFBQSxHQUFLLElBQUksQ0FBQyxLQUFMLENBQVcsRUFBWDtBQUNMLFNBQU87QUFISzs7QUFNYixPQUFPLENBQUMsS0FBUixHQUFnQixTQUFDLFdBQUQ7QUFDZixNQUFBO0VBQUEsSUFBRyxXQUFZLENBQUEsQ0FBQSxDQUFaLEtBQWtCLEdBQXJCO0FBQ0MsV0FBTyxZQURSO0dBQUEsTUFBQTtJQUdDLEtBQUEsR0FBYSxJQUFBLEtBQUEsQ0FBTSxDQUFDLENBQUMsR0FBRyxDQUFDLE1BQU8sQ0FBQSxXQUFBLENBQW5CO0lBQ2IsSUFBRyxXQUFBLEtBQWUsYUFBbEI7TUFDQyxLQUFBLEdBQVEsY0FEVDs7QUFFQSxXQUFPLE1BTlI7O0FBRGU7O0FBYWhCLE9BQU8sQ0FBQyxLQUFSLEdBQWdCLFNBQUMsTUFBRDtFQUVmLE1BQUEsR0FBUyxNQUFNLENBQUMsT0FBUCxDQUFlLGNBQWYsRUFBK0IsR0FBL0IsQ0FBbUMsQ0FBQyxPQUFwQyxDQUE0QyxZQUE1QyxFQUEwRCxFQUExRDtBQUNULFNBQU87QUFIUTs7QUFNaEIsT0FBTyxDQUFDLEdBQVIsR0FBYyxTQUFDLEdBQUQ7QUFFYixNQUFBO0VBQUEsVUFBQSxHQUFhLEdBQUcsQ0FBQyxNQUFKLENBQVcsYUFBWDtFQUNiLFFBQUEsR0FBVyxHQUFHLENBQUMsTUFBSixDQUFXLFVBQVg7RUFDWCxNQUFBLEdBQVMsR0FBRyxDQUFDLEtBQUosQ0FBVSxVQUFWLEVBQXNCLFFBQXRCO0VBR1QsV0FBQSxHQUFjLE1BQU0sQ0FBQyxNQUFQLENBQWMsR0FBZCxDQUFBLEdBQXFCO0VBQ25DLFNBQUEsR0FBYSxNQUFNLENBQUMsTUFBUCxDQUFjLElBQWQ7RUFDYixLQUFBLEdBQVEsTUFBTSxDQUFDLEtBQVAsQ0FBYSxXQUFiLEVBQTBCLFNBQTFCO0VBQ1IsUUFBQSxHQUFXLE9BQU8sQ0FBQyxFQUFSLENBQVcsS0FBWDtFQUdYLFlBQUEsR0FBZSxNQUFNLENBQUMsS0FBUCxDQUFhLFNBQUEsR0FBWSxDQUF6QixFQUE0QixNQUFNLENBQUMsTUFBbkM7RUFDZixXQUFBLEdBQWMsWUFBWSxDQUFDLE1BQWIsQ0FBb0IsR0FBcEIsQ0FBQSxHQUEwQjtFQUN4QyxTQUFBLEdBQVksWUFBWSxDQUFDLE1BQWIsQ0FBb0IsSUFBcEI7RUFDWixNQUFBLEdBQVMsWUFBWSxDQUFDLEtBQWIsQ0FBbUIsV0FBbkIsRUFBZ0MsU0FBaEM7RUFDVCxTQUFBLEdBQVksT0FBTyxDQUFDLEVBQVIsQ0FBVyxNQUFYO0VBR1osU0FBQSxHQUFZLE1BQU0sQ0FBQyxPQUFQLENBQWUsS0FBZixFQUFzQixRQUF0QjtFQUNaLFNBQUEsR0FBWSxTQUFTLENBQUMsT0FBVixDQUFrQixNQUFsQixFQUEwQixTQUExQjtFQUdaLEdBQUEsR0FBTSxHQUFHLENBQUMsT0FBSixDQUFZLE1BQVosRUFBb0IsU0FBcEI7QUFFTixTQUFPO0lBQ04sR0FBQSxFQUFJLEdBREU7SUFFTixLQUFBLEVBQU0sUUFGQTtJQUdOLE1BQUEsRUFBTyxTQUhEOztBQTFCTTs7QUFpQ2QsT0FBTyxDQUFDLFVBQVIsR0FBcUIsU0FBQyxLQUFELEVBQVEsS0FBUjtBQUNwQixNQUFBO0VBQUEsSUFBRyxPQUFPLEtBQVAsS0FBZ0IsUUFBbkI7SUFDQyxLQUFBLEdBQVEsT0FBTyxDQUFDLEtBQVIsQ0FBYyxLQUFkLEVBRFQ7O0VBRUEsVUFBQSxHQUFhLEtBQUssQ0FBQyxJQUFJLENBQUMsTUFBWCxDQUFrQixVQUFsQjtFQUNiLFVBQUEsR0FBYSxLQUFLLENBQUMsSUFBSSxDQUFDLEtBQVgsQ0FBaUIsVUFBakIsRUFBNkIsS0FBSyxDQUFDLElBQUksQ0FBQyxNQUF4QztFQUNiLFFBQUEsR0FBVyxVQUFVLENBQUMsTUFBWCxDQUFrQixJQUFsQixDQUFBLEdBQTBCO0VBQ3JDLE1BQUEsR0FBUyxVQUFVLENBQUMsS0FBWCxDQUFpQixDQUFqQixFQUFvQixRQUFwQjtFQUNULFNBQUEsR0FBWSxTQUFBLEdBQVk7U0FDeEIsS0FBSyxDQUFDLElBQU4sR0FBYSxLQUFLLENBQUMsSUFBSSxDQUFDLE9BQVgsQ0FBbUIsTUFBbkIsRUFBMkIsU0FBM0I7QUFSTzs7QUFVckIsT0FBTyxDQUFDLFVBQVIsR0FBcUIsU0FBQyxNQUFEO0FBQ3BCLFNBQU8sTUFBTSxDQUFDLE1BQVAsQ0FBYyxDQUFkLENBQWdCLENBQUMsV0FBakIsQ0FBQSxDQUFBLEdBQWlDLE1BQU0sQ0FBQyxLQUFQLENBQWEsQ0FBYjtBQURwQjs7QUFJckIsT0FBTyxDQUFDLE9BQVIsR0FBa0IsU0FBQTtBQUNqQixNQUFBO0VBQUEsYUFBQSxHQUFnQixDQUFDLFFBQUQsRUFBVyxRQUFYLEVBQXFCLFNBQXJCLEVBQWdDLFdBQWhDLEVBQTZDLFVBQTdDLEVBQXlELFFBQXpELEVBQW1FLFVBQW5FO0VBQ2hCLGVBQUEsR0FBa0IsQ0FBQyxTQUFELEVBQVksVUFBWixFQUF3QixPQUF4QixFQUFpQyxPQUFqQyxFQUEwQyxLQUExQyxFQUFpRCxNQUFqRCxFQUF5RCxNQUF6RCxFQUFpRSxRQUFqRSxFQUEyRSxXQUEzRSxFQUF3RixTQUF4RixFQUFtRyxVQUFuRyxFQUErRyxVQUEvRztFQUNsQixPQUFBLEdBQWMsSUFBQSxJQUFBLENBQUE7RUFDZCxLQUFBLEdBQVEsZUFBZ0IsQ0FBQSxPQUFPLENBQUMsUUFBUixDQUFBLENBQUE7RUFDeEIsSUFBQSxHQUFPLE9BQU8sQ0FBQyxPQUFSLENBQUE7RUFDUCxHQUFBLEdBQU0sYUFBYyxDQUFBLE9BQU8sQ0FBQyxNQUFSLENBQUEsQ0FBQTtFQUNwQixLQUFBLEdBQVEsT0FBTyxDQUFDLFFBQVIsQ0FBQTtFQUNSLElBQUEsR0FBTyxPQUFPLENBQUMsVUFBUixDQUFBO0VBQ1AsSUFBQSxHQUFPLE9BQU8sQ0FBQyxVQUFSLENBQUE7QUFDUCxTQUFPO0lBQ04sS0FBQSxFQUFNLEtBREE7SUFFTixJQUFBLEVBQUssSUFGQztJQUdOLEdBQUEsRUFBSSxHQUhFO0lBSU4sS0FBQSxFQUFNLEtBSkE7SUFLTixJQUFBLEVBQUssSUFMQztJQU1OLElBQUEsRUFBSyxJQU5DOztBQVZVOztBQW1CbEIsT0FBTyxDQUFDLE1BQVIsR0FBaUIsU0FBQyxLQUFEO0VBQ2hCLEtBQUssQ0FBQyxLQUFNLENBQUEseUJBQUEsQ0FBWixHQUF5QyxPQUFBLEdBQU8sQ0FBQyxPQUFPLENBQUMsRUFBUixDQUFXLENBQVgsQ0FBRCxDQUFQLEdBQXNCO0FBQy9ELFNBQU87QUFGUzs7QUFJakIsT0FBTyxDQUFDLFlBQVIsR0FBdUIsU0FBQyxTQUFEO0FBRXRCLE1BQUE7RUFBQSxXQUFBLEdBQWM7RUFDZCxJQUFHLFNBQVMsQ0FBQyxXQUFiO0lBQ0MsSUFBRyxTQUFTLENBQUMsV0FBVyxDQUFDLE1BQXpCO01BQ0MsV0FBVyxDQUFDLE1BQVosR0FBcUIsT0FBTyxDQUFDLEVBQVIsQ0FBVyxTQUFTLENBQUMsV0FBVyxDQUFDLE1BQWpDLEVBRHRCOztJQUVBLElBQUcsU0FBUyxDQUFDLFdBQVcsQ0FBQyxLQUF6QjtNQUNDLFdBQVcsQ0FBQyxLQUFaLEdBQW9CLE9BQU8sQ0FBQyxFQUFSLENBQVcsU0FBUyxDQUFDLFdBQVcsQ0FBQyxLQUFqQyxFQURyQjtLQUhEOztFQU1BLE1BQUEsR0FDQztJQUFBLFFBQUEsRUFBVSxTQUFTLENBQUMsS0FBSyxDQUFDLFFBQTFCO0lBQ0EsVUFBQSxFQUFZLFNBQVMsQ0FBQyxLQUFLLENBQUMsVUFENUI7SUFFQSxVQUFBLEVBQVksU0FBUyxDQUFDLEtBQUssQ0FBQyxVQUY1QjtJQUdBLFNBQUEsRUFBVyxTQUFTLENBQUMsS0FBSyxDQUFDLFNBSDNCO0lBSUEsVUFBQSxFQUFZLFNBQVMsQ0FBQyxLQUFLLENBQUMsVUFKNUI7SUFLQSxhQUFBLEVBQWUsU0FBUyxDQUFDLEtBQUssQ0FBQyxhQUwvQjtJQU1BLGFBQUEsRUFBZSxTQUFTLENBQUMsS0FBSyxDQUFDLGFBTi9COztFQU9ELFNBQUEsR0FBWSxLQUFLLENBQUMsUUFBTixDQUFlLFNBQVMsQ0FBQyxJQUF6QixFQUErQixNQUEvQixFQUF1QyxXQUF2QztBQUNaLFNBQU87SUFDTixLQUFBLEVBQVEsU0FBUyxDQUFDLEtBRFo7SUFFTixNQUFBLEVBQVEsU0FBUyxDQUFDLE1BRlo7O0FBbEJlOztBQXVCdkIsT0FBTyxDQUFDLFNBQVIsR0FBb0IsU0FBQTtBQUVuQixNQUFBO0VBQUEsTUFBQSxHQUFTO0VBQ1QsS0FBQSxHQUFRO0VBQ1IsSUFBRyxDQUFDLENBQUMsR0FBRyxDQUFDLFdBQVksQ0FBQSxVQUFBLENBQWxCLElBQWlDLENBQUMsQ0FBQyxHQUFHLENBQUMsV0FBWSxDQUFBLFVBQUEsQ0FBWSxDQUFBLFdBQUEsQ0FBbEU7SUFDQyxNQUFBLEdBQVMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxXQUFZLENBQUEsVUFBQSxDQUFZLENBQUEsV0FBQTtJQUN2QyxLQUFBLEdBQVE7SUFDUixNQUFNLENBQUMsTUFBTSxDQUFDLFVBQWQsR0FBMkIsYUFINUI7O0VBS0EsSUFBRyxLQUFIO0lBQ0MsTUFBQSxHQUNDO01BQUEsSUFBQSxFQUFNLE1BQU0sQ0FBQyxNQUFNLENBQUMsVUFBcEI7TUFDQSxLQUFBLEVBQVMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxPQUFRLENBQUEsTUFBTSxDQUFDLE1BQU0sQ0FBQyxVQUFkLENBQXlCLENBQUMsV0FEN0Q7TUFFQSxNQUFBLEVBQVMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxPQUFRLENBQUEsTUFBTSxDQUFDLE1BQU0sQ0FBQyxVQUFkLENBQXlCLENBQUMsWUFGN0Q7TUFHQSxLQUFBLEVBQU8sQ0FBQyxDQUFDLEdBQUcsQ0FBQyxZQUFhLENBQUEsTUFBTSxDQUFDLFVBQVUsQ0FBQyxPQUFRLENBQUEsTUFBTSxDQUFDLE1BQU0sQ0FBQyxVQUFkLENBQXlCLENBQUMsV0FBcEQsQ0FIMUI7TUFGRjs7RUFPQSxJQUFHLE1BQU0sQ0FBQyxLQUFQLEtBQWdCLE1BQW5CO0lBQ0MsTUFBTSxDQUFDLEtBQVAsR0FBZSxFQURoQjs7RUFFQSxJQUFHLE1BQU0sQ0FBQyxLQUFQLEtBQWdCLE1BQW5CO0lBQ0MsTUFBTSxDQUFDLEtBQVAsR0FBZSxXQURoQjs7RUFFQSxJQUFHLE1BQU0sQ0FBQyxNQUFQLEtBQWlCLE1BQXBCO0lBQ0MsTUFBTSxDQUFDLE1BQVAsR0FBZ0IsWUFEakI7O0FBR0EsU0FBTztBQXZCWTs7QUEyQnBCLE9BQU8sQ0FBQyxXQUFSLEdBQXNCLFNBQUMsS0FBRDtBQUNyQixNQUFBO0VBQUEsSUFBQSxHQUFPO0VBQ1AsSUFBRyxLQUFLLENBQUMsSUFBTixLQUFjLFFBQWpCO0lBQ0MsSUFBQSxHQUFPLEtBQUssQ0FBQyxNQURkOztFQUVBLElBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFWLENBQWtCLElBQWxCLENBQUEsS0FBMkIsQ0FBQyxDQUEvQjtJQUNDLE9BQUEsR0FBVSxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQVYsQ0FBa0IsS0FBbEIsRUFBeUIsRUFBekI7SUFDVixPQUFPLENBQUMsTUFBUixDQUFlLElBQWYsRUFBcUI7TUFBQztRQUFDLElBQUEsRUFBSyxPQUFOO09BQUQsRUFBaUI7UUFBQyxVQUFBLEVBQVcsR0FBWjtPQUFqQjtLQUFyQixFQUZEOztFQUdBLElBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFWLENBQWtCLElBQWxCLENBQUEsS0FBMkIsQ0FBQyxDQUEvQjtJQUNDLE9BQUEsR0FBVSxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQVYsQ0FBa0IsS0FBbEIsRUFBeUIsRUFBekI7SUFDVixPQUFPLENBQUMsTUFBUixDQUFlLElBQWYsRUFBcUI7TUFBQztRQUFDLElBQUEsRUFBSyxPQUFOO09BQUQsRUFBaUI7UUFBQyxLQUFBLEVBQU0sS0FBUDtPQUFqQjtLQUFyQixFQUZEOztFQUdBLElBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFWLENBQWtCLEtBQWxCLENBQUEsS0FBNEIsQ0FBQyxDQUFoQztJQUNDLE9BQUEsR0FBVSxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQVYsQ0FBa0IsTUFBbEIsRUFBMEIsRUFBMUI7SUFDVixPQUFPLENBQUMsTUFBUixDQUFlLElBQWYsRUFBcUI7TUFBQztRQUFDLElBQUEsRUFBSyxPQUFOO09BQUQsRUFBaUI7UUFBQyxLQUFBLEVBQU0sTUFBUDtPQUFqQjtLQUFyQixFQUZEOztFQUdBLElBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFWLENBQWtCLEtBQWxCLENBQUEsS0FBNEIsQ0FBQyxDQUFoQztJQUNDLE9BQUEsR0FBVSxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQVYsQ0FBa0IsTUFBbEIsRUFBMEIsRUFBMUI7SUFDVixPQUFPLENBQUMsTUFBUixDQUFlLElBQWYsRUFBcUI7TUFBQztRQUFDLElBQUEsRUFBSyxPQUFOO09BQUQsRUFBaUI7UUFBQyxLQUFBLEVBQU0sWUFBUDtPQUFqQjtLQUFyQixFQUZEOztFQUdBLElBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFWLENBQWtCLElBQWxCLENBQUEsS0FBMkIsQ0FBQyxDQUEvQjtJQUNDLE9BQUEsR0FBVSxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQVYsQ0FBa0IsS0FBbEIsRUFBeUIsRUFBekI7SUFDVixPQUFPLENBQUMsTUFBUixDQUFlLElBQWYsRUFBcUI7TUFBQztRQUFDLElBQUEsRUFBSyxPQUFOO09BQUQsRUFBaUI7UUFBQyxLQUFBLEVBQU0sT0FBUDtPQUFqQjtLQUFyQixFQUZEOztFQUdBLElBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFWLENBQWtCLElBQWxCLENBQUEsS0FBMkIsQ0FBQyxDQUEvQjtJQUNDLE9BQUEsR0FBVSxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQVYsQ0FBa0IsS0FBbEIsRUFBeUIsRUFBekI7SUFDVixPQUFPLENBQUMsTUFBUixDQUFlLElBQWYsRUFBcUI7TUFBQztRQUFDLElBQUEsRUFBSyxPQUFOO09BQUQsRUFBaUI7UUFBQyxLQUFBLEVBQU0sUUFBUDtPQUFqQjtLQUFyQixFQUZEOztFQUdBLElBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFWLENBQWtCLElBQWxCLENBQUEsS0FBMkIsQ0FBQyxDQUEvQjtJQUNDLE9BQUEsR0FBVSxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQVYsQ0FBa0IsS0FBbEIsRUFBeUIsRUFBekI7SUFDVixPQUFPLENBQUMsTUFBUixDQUFlLElBQWYsRUFBcUI7TUFBQztRQUFDLElBQUEsRUFBSyxPQUFOO09BQUQsRUFBaUI7UUFBQyxLQUFBLEVBQU0sUUFBUDtPQUFqQjtLQUFyQixFQUZEOztFQUdBLElBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFWLENBQWtCLElBQWxCLENBQUEsS0FBMkIsQ0FBQyxDQUEvQjtJQUNDLE9BQUEsR0FBVSxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQVYsQ0FBa0IsS0FBbEIsRUFBeUIsRUFBekI7SUFDVixPQUFPLENBQUMsTUFBUixDQUFlLElBQWYsRUFBcUI7TUFBQztRQUFDLElBQUEsRUFBSyxPQUFOO09BQUQsRUFBaUI7UUFBQyxLQUFBLEVBQU0sUUFBUDtPQUFqQjtLQUFyQixFQUZEOztFQUdBLElBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFWLENBQWtCLElBQWxCLENBQUEsS0FBMkIsQ0FBQyxDQUEvQjtJQUNDLFdBQUEsR0FBYyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQVYsQ0FBZ0IsQ0FBaEIsRUFBbUIsQ0FBbkI7SUFDZCxPQUFBLEdBQVUsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFWLENBQWdCLENBQWhCLEVBQW1CLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBN0I7SUFDVixPQUFPLENBQUMsTUFBUixDQUFlLElBQWYsRUFBcUI7TUFBQztRQUFDLElBQUEsRUFBSyxPQUFOO09BQUQsRUFBaUI7UUFBQyxLQUFBLEVBQU0sV0FBUDtPQUFqQjtLQUFyQixFQUhEOztFQUlBLElBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFWLENBQWtCLEdBQWxCLENBQUEsS0FBMEIsQ0FBQyxDQUE5QjtJQUNDLE9BQUEsR0FBVSxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQVYsQ0FBa0IsSUFBbEIsRUFBd0IsRUFBeEI7SUFDVixPQUFPLENBQUMsTUFBUixDQUFlLElBQWYsRUFBcUI7TUFBQztRQUFDLElBQUEsRUFBSyxPQUFOO09BQUQ7S0FBckIsRUFGRDs7RUFHQSxJQUFHLEtBQUssQ0FBQyxVQUFOLEtBQW9CLE1BQXZCO0lBQ0MsS0FBSyxDQUFDLEtBQU4sR0FBYyxJQUFJLENBQUMsTUFEcEI7O1NBRUEsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxHQUFULENBQUE7QUFyQ3FCOztBQXVDdEIsT0FBTyxDQUFDLE1BQVIsR0FBaUIsU0FBQyxLQUFELEVBQVEsS0FBUjtBQUNoQixNQUFBO0VBQUEsSUFBRyxLQUFBLEtBQVMsTUFBWjtJQUNDLEtBQUEsR0FBUSxHQURUOztFQUVBLElBQUcsS0FBSyxDQUFDLElBQU4sS0FBYyxNQUFqQjtBQUNDLFNBQUEsdUNBQUE7O01BQ0MsR0FBQSxHQUFNLE1BQU0sQ0FBQyxJQUFQLENBQVksTUFBWixDQUFvQixDQUFBLENBQUE7TUFDMUIsS0FBQSxHQUFRLE1BQU8sQ0FBQSxHQUFBO01BQ2YsSUFBRyxHQUFBLEtBQU8sTUFBVjtRQUNDLEtBQUssQ0FBQyxJQUFOLEdBQWEsTUFEZDs7TUFFQSxJQUFHLEdBQUEsS0FBTyxZQUFWO1FBQ0MsS0FBSyxDQUFDLEtBQU0sQ0FBQSxHQUFBLENBQVosR0FBbUIsTUFEcEI7O01BRUEsSUFBRyxHQUFBLEtBQU8sT0FBVjtRQUNDLEtBQUssQ0FBQyxLQUFOLEdBQWMsT0FBTyxDQUFDLEtBQVIsQ0FBYyxLQUFkLEVBRGY7O0FBUEQ7SUFVQSxTQUFBLEdBQVksT0FBTyxDQUFDLFlBQVIsQ0FBcUIsS0FBckI7SUFDWixLQUFLLENBQUMsS0FBTixHQUFjLFNBQVMsQ0FBQztJQUN4QixLQUFLLENBQUMsTUFBTixHQUFlLFNBQVMsQ0FBQyxPQWIxQjs7U0FnQkEsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxHQUFULENBQUE7QUFuQmdCOztBQXNCakIsT0FBTyxDQUFDLFNBQVIsR0FBb0IsU0FBQyxXQUFEO0FBQ25CLE1BQUE7RUFBQSxHQUFBLEdBQU0sV0FBVyxDQUFDLFdBQVosQ0FBQTtFQUNOLEdBQUEsR0FBTSxHQUFHLENBQUMsU0FBSixDQUFjLENBQWQsRUFBaUIsR0FBRyxDQUFDLE1BQUosR0FBVyxDQUE1QjtFQUNOLEdBQUEsR0FBTSxHQUFHLENBQUMsT0FBSixDQUFZLElBQVosRUFBa0IsRUFBbEI7RUFDTixHQUFBLEdBQU0sR0FBRyxDQUFDLE9BQUosQ0FBWSxJQUFaLEVBQWtCLEVBQWxCO0VBQ04sR0FBQSxHQUFNLEdBQUcsQ0FBQyxLQUFKLENBQVUsR0FBVjtFQUNOLEdBQUEsR0FBTSxHQUFJLENBQUEsQ0FBQTtFQUNWLEtBQUEsR0FBUSxHQUFJLENBQUEsQ0FBQTtFQUNaLElBQUEsR0FBTyxHQUFJLENBQUEsQ0FBQTtFQUNYLEtBQUEsR0FBUTtFQUNSLElBQUcsQ0FBQyxHQUFBLEdBQUksS0FBSixHQUFZLEtBQUEsR0FBTSxLQUFsQixHQUEwQixJQUFBLEdBQUssS0FBaEMsQ0FBQSxHQUF5QyxHQUE1QztJQUNDLEtBQUEsR0FBUSxPQUFPLENBQUMsS0FBUixDQUFjLE9BQWQsRUFEVDtHQUFBLE1BQUE7SUFHQyxLQUFBLEdBQVEsT0FBTyxDQUFDLEtBQVIsQ0FBYyxPQUFkLEVBSFQ7O0FBSUEsU0FBTztBQWRZOztBQWdCcEIsT0FBTyxDQUFDLFVBQVIsR0FBcUIsU0FBQyxNQUFELEVBQVMsTUFBVDtBQUNwQixNQUFBO0VBQUEsU0FBQSxHQUFZLE1BQU0sQ0FBQztFQUNuQixTQUFBLEdBQVksTUFBTSxDQUFDO0VBQ25CLElBQUcsU0FBQSxLQUFhLFNBQWhCO0FBQ0MsV0FBTyxLQURSO0dBQUEsTUFBQTtBQUdDLFdBQU8sTUFIUjs7QUFIb0I7O0FBU3JCLE9BQU8sQ0FBQyxZQUFSLEdBQXVCLFNBQUMsS0FBRCxFQUFRLFNBQVI7RUFDdEIsSUFBQyxDQUFBLElBQUQsR0FBUSxPQUFPLENBQUMsT0FBUixDQUFBO1NBQ1IsS0FBSyxDQUFDLEtBQU4sQ0FBWSxFQUFBLEdBQUssSUFBQyxDQUFBLElBQUksQ0FBQyxJQUF2QixFQUE2QixTQUFBO0lBQzVCLElBQUMsQ0FBQSxJQUFELEdBQVEsT0FBTyxDQUFDLE9BQVIsQ0FBQTtJQUNSLE9BQU8sQ0FBQyxNQUFSLENBQWUsS0FBZixFQUFzQjtNQUFDO1FBQUEsSUFBQSxFQUFLLE9BQU8sQ0FBQyxhQUFSLENBQXNCLElBQUMsQ0FBQSxJQUF2QixFQUE2QixTQUE3QixDQUFMO09BQUQ7S0FBdEI7V0FDQSxLQUFLLENBQUMsUUFBTixDQUFlLEVBQWYsRUFBbUIsU0FBQTtNQUNsQixJQUFDLENBQUEsSUFBRCxHQUFRLE9BQU8sQ0FBQyxPQUFSLENBQUE7YUFDUixPQUFPLENBQUMsTUFBUixDQUFlLEtBQWYsRUFBc0I7UUFBQztVQUFBLElBQUEsRUFBSyxPQUFPLENBQUMsYUFBUixDQUFzQixJQUFDLENBQUEsSUFBdkIsRUFBNkIsU0FBN0IsQ0FBTDtTQUFEO09BQXRCO0lBRmtCLENBQW5CO0VBSDRCLENBQTdCO0FBRnNCOztBQVN2QixPQUFPLENBQUMsYUFBUixHQUF3QixTQUFDLE9BQUQsRUFBVSxTQUFWO0VBQ3ZCLElBQUcsU0FBQSxLQUFhLEtBQWhCO0lBQ0MsSUFBRyxPQUFPLENBQUMsS0FBUixHQUFnQixFQUFuQjtNQUNDLE9BQU8sQ0FBQyxLQUFSLEdBQWdCLE9BQU8sQ0FBQyxLQUFSLEdBQWdCLEdBRGpDOztJQUVBLElBQUcsT0FBTyxDQUFDLEtBQVIsS0FBaUIsQ0FBcEI7TUFBMkIsT0FBTyxDQUFDLEtBQVIsR0FBZ0IsR0FBM0M7S0FIRDs7RUFJQSxJQUFHLE9BQU8sQ0FBQyxJQUFSLEdBQWUsRUFBbEI7SUFDQyxPQUFPLENBQUMsSUFBUixHQUFlLEdBQUEsR0FBTSxPQUFPLENBQUMsS0FEOUI7O0FBRUEsU0FBTyxPQUFPLENBQUMsS0FBUixHQUFnQixHQUFoQixHQUFzQixPQUFPLENBQUM7QUFQZDs7QUFTeEIsT0FBTyxDQUFDLGNBQVIsR0FBeUIsU0FBQyxLQUFELEVBQVEsUUFBUjtBQUN4QixNQUFBO0VBQUEsSUFBRyxLQUFBLEtBQVMsTUFBWjtJQUNDLEtBQUEsR0FBUSxHQURUOztFQUVBLEdBQUEsR0FBTTtBQUNOO0FBQUEsT0FBQSxxQ0FBQTs7SUFDQyxJQUFHLEtBQU0sQ0FBQSxDQUFBLENBQU4sS0FBWSxNQUFmO01BQ0MsR0FBSSxDQUFBLENBQUEsQ0FBSixHQUFTLEtBQU0sQ0FBQSxDQUFBLEVBRGhCO0tBQUEsTUFBQTtNQUdDLEdBQUksQ0FBQSxDQUFBLENBQUosR0FBUyxRQUFTLENBQUEsQ0FBQSxFQUhuQjs7QUFERDtBQUtBLFNBQU87QUFUaUI7O0FBWXpCLE9BQU8sQ0FBQyxjQUFSLEdBQXlCLFNBQUMsTUFBRDtBQUN2QixNQUFBO0VBQUEsYUFBQSxHQUFnQjtFQUNoQixJQUFHLE1BQU8sQ0FBQSxDQUFBLENBQVAsS0FBYSxHQUFiLElBQW9CLE1BQU8sQ0FBQSxDQUFBLENBQVAsS0FBYSxHQUFqQyxJQUF3QyxNQUFPLENBQUEsQ0FBQSxDQUFQLEtBQWEsR0FBckQsSUFBNEQsTUFBTyxDQUFBLENBQUEsQ0FBUCxLQUFhLEdBQTVFO0lBQ0MsWUFBQSxHQUFlLE1BQU0sQ0FBQyxLQUFQLENBQWEsR0FBYjtBQUNmLFNBQUEsOENBQUE7O01BQ0MsYUFBQSxHQUFnQixhQUFBLEdBQWdCLEdBQWhCLEdBQXNCO0FBRHZDLEtBRkQ7R0FBQSxNQUFBO0lBS0MsWUFBQSxHQUFlLE1BQU0sQ0FBQyxLQUFQLENBQWEsR0FBYjtJQUNmLGFBQUEsR0FBZ0I7QUFDaEIsU0FBQSxnREFBQTs7TUFDQyxhQUFBLEdBQWdCLGFBQUEsR0FBZ0IsR0FBaEIsR0FBc0I7QUFEdkMsS0FQRDs7RUFTQSxPQUFBLEdBQVUsa0JBQUEsQ0FBbUIsYUFBbkI7QUFDVixTQUFPO0FBWmdCOztBQWN6QixPQUFPLENBQUMsaUJBQVIsR0FBNEIsU0FBQTtBQUMzQixNQUFBO0VBQUEsTUFBQSxHQUFTO0FBQ1Q7QUFBQTtPQUFBLHFEQUFBOztJQUNDLEtBQUEsR0FBUSxPQUFPLENBQUMsY0FBUixDQUF1QixJQUF2QjtpQkFDUixNQUFNLENBQUMsSUFBUCxDQUFZLEtBQVo7QUFGRDs7QUFGMkI7O0FBTTVCLE9BQU8sQ0FBQyxRQUFSLEdBQW1CLFNBQUMsR0FBRDtBQUNqQixNQUFBO0VBQUEsT0FBQSxHQUFVLFFBQUEsQ0FBUyxHQUFULEVBQWMsRUFBZDtFQUNWLEtBQUEsR0FBVSxJQUFJLENBQUMsS0FBTCxDQUFXLE9BQUEsR0FBVSxJQUFyQjtFQUNWLE9BQUEsR0FBVSxJQUFJLENBQUMsS0FBTCxDQUFXLENBQUMsT0FBQSxHQUFVLENBQUMsS0FBQSxHQUFRLElBQVQsQ0FBWCxDQUFBLEdBQTZCLEVBQXhDO0VBQ1YsT0FBQSxHQUFVLE9BQUEsR0FBVSxDQUFDLEtBQUEsR0FBUSxJQUFULENBQVYsR0FBMkIsQ0FBQyxPQUFBLEdBQVUsRUFBWDtFQUVyQyxJQUFJLEtBQUEsR0FBVSxFQUFkO0lBQXVCLEtBQUEsR0FBVSxHQUFBLEdBQUksTUFBckM7O0VBQ0EsSUFBSSxPQUFBLEdBQVUsRUFBZDtJQUF1QixPQUFBLEdBQVUsRUFBQSxHQUFHLFFBQXBDOztFQUNBLElBQUksT0FBQSxHQUFVLEVBQWQ7SUFBdUIsT0FBQSxHQUFVLEdBQUEsR0FBSSxRQUFyQzs7RUFDQSxVQUFBLEdBQWE7RUFDYixJQUFHLEtBQUEsS0FBUyxJQUFaO0lBQ0UsVUFBQSxHQUFhLEtBQUEsR0FBTSxHQUFOLEdBQVUsT0FBVixHQUFrQixHQUFsQixHQUFzQixRQURyQztHQUFBLE1BQUE7SUFHRSxVQUFBLEdBQWEsT0FBQSxHQUFRLEdBQVIsR0FBWSxRQUgzQjs7QUFLQSxTQUFPO0FBZlU7O0FBa0JuQixPQUFPLENBQUMsSUFBUixHQUFlLFNBQUMsS0FBRDtBQUNkLE1BQUE7RUFBQSxNQUFBLEdBQVMsS0FBSyxDQUFDLEtBQUssQ0FBQyxLQUFaLEdBQWtCO0VBQzNCLE1BQUEsR0FBUyxLQUFLLENBQUMsS0FBSyxDQUFDLE1BQVosR0FBbUI7RUFFNUIsUUFBQSxHQUFXO0VBQ1gsYUFBQSxHQUFnQjtFQUNoQixRQUFBLEdBQVc7RUFDWCxRQUFBLEdBQVc7RUFDWCxVQUFBLEdBQWE7RUFDYixTQUFBLEdBQVk7RUFFWixJQUFHLEtBQUssQ0FBQyxTQUFOLEtBQW1CLE1BQXRCO0lBQ0MsU0FBQSxHQUFZLEtBQUssQ0FBQyxVQURuQjs7RUFHQSxJQUFHLEtBQUssQ0FBQyxLQUFOLEtBQWUsTUFBbEI7SUFDQyxRQUFBLEdBQVcsQ0FBQyxDQUFDLEtBQUYsQ0FBUSxLQUFLLENBQUMsS0FBZCxFQURaOztFQUdBLElBQUcsS0FBSyxDQUFDLEtBQU4sS0FBZSxNQUFsQjtJQUNDLFFBQUEsR0FBVyxLQUFLLENBQUMsTUFEbEI7O0VBR0EsSUFBRyxLQUFLLENBQUMsVUFBTixLQUFvQixNQUF2QjtJQUNDLGFBQUEsR0FBZ0IsS0FBSyxDQUFDLFdBRHZCOztFQUdBLElBQUcsS0FBSyxDQUFDLEtBQU4sS0FBZSxNQUFsQjtJQUNDLFFBQUEsR0FBVyxLQUFLLENBQUMsTUFEbEI7O0VBR0EsSUFBRyxLQUFLLENBQUMsT0FBTixLQUFpQixNQUFwQjtJQUNDLFVBQUEsR0FBYSxLQUFLLENBQUMsUUFEcEI7O0VBR0EsVUFBQSxHQUFhLFNBQUMsS0FBRCxFQUFRLEtBQVI7QUFDWixRQUFBO0lBQUEsSUFBRyxTQUFBLEtBQWEsSUFBaEI7TUFDQyxNQUFBLEdBQVMsS0FBSyxDQUFDO01BQ2YsTUFBQSxHQUFTLEtBQUssQ0FBQztNQUVmLElBQUcsS0FBSyxDQUFDLFFBQU4sQ0FBQSxDQUFBLEtBQW9CLEtBQXBCLElBQTZCLEtBQUssQ0FBQyxPQUFOLENBQUEsQ0FBaEM7UUFDQyxNQUFBLEdBQVMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxDQUFsQixHQUFzQixLQUFLLENBQUM7UUFDckMsTUFBQSxHQUFTLEtBQUssQ0FBQyxXQUFXLENBQUMsQ0FBbEIsR0FBc0IsS0FBSyxDQUFDLEVBRnRDO09BSkQ7O0lBUUEsTUFBQSxHQUFhLElBQUEsS0FBQSxDQUNaO01BQUEsZUFBQSxFQUFnQixRQUFoQjtNQUNBLElBQUEsRUFBSyxNQURMO01BRUEsSUFBQSxFQUFLLE1BRkw7TUFHQSxVQUFBLEVBQVcsS0FIWDtNQUlBLFlBQUEsRUFBYSxDQUFDLENBQUMsS0FBSyxDQUFDLEVBQVIsQ0FBVyxFQUFYLENBSmI7TUFLQSxPQUFBLEVBQVMsVUFMVDtLQURZO0lBUWIsTUFBTSxDQUFDLEtBQVAsR0FBZTtJQUNmLE1BQU0sQ0FBQyxPQUFQLENBQ0M7TUFBQSxVQUFBLEVBQVk7UUFBQSxLQUFBLEVBQU0sUUFBTjtRQUFnQixPQUFBLEVBQVEsQ0FBeEI7T0FBWjtNQUNBLEtBQUEsRUFBTSxRQUROO01BRUEsSUFBQSxFQUFLLEVBRkw7S0FERDtXQUlBLEtBQUssQ0FBQyxLQUFOLENBQVksQ0FBWixFQUFlLFNBQUE7YUFDZCxNQUFNLENBQUMsT0FBUCxDQUFBO0lBRGMsQ0FBZjtFQXRCWTtFQXlCYixJQUFHLEtBQUssQ0FBQyxRQUFOLENBQUEsQ0FBQSxJQUFvQixLQUFLLENBQUMsT0FBTixDQUFBLENBQXZCO0lBQ0MsS0FBSyxDQUFDLEtBQUssQ0FBQyxFQUFaLENBQWUsTUFBTSxDQUFDLFNBQXRCLEVBQWlDLFNBQUMsS0FBRDthQUNoQyxVQUFBLENBQVcsS0FBWCxFQUFrQixJQUFsQjtJQURnQyxDQUFqQyxFQUREOztFQUdBLElBQUcsS0FBSyxDQUFDLFFBQU4sQ0FBQSxDQUFBLEtBQW9CLEtBQXBCLElBQTZCLEtBQUssQ0FBQyxPQUFOLENBQUEsQ0FBaEM7SUFDQyxLQUFLLENBQUMsS0FBSyxDQUFDLEVBQVosQ0FBZSxNQUFNLENBQUMsR0FBdEIsRUFBMkIsU0FBQyxLQUFEO2FBQzFCLFVBQUEsQ0FBVyxLQUFYLEVBQWtCLElBQWxCO0lBRDBCLENBQTNCLEVBREQ7O0VBR0EsSUFBRyxLQUFLLENBQUMsU0FBTixDQUFBLENBQUg7V0FDQyxLQUFLLENBQUMsS0FBSyxDQUFDLEVBQVosQ0FBZSxNQUFNLENBQUMsUUFBdEIsRUFBZ0MsU0FBQyxLQUFEO2FBQy9CLFVBQUEsQ0FBVyxLQUFYLEVBQWtCLElBQWxCO0lBRCtCLENBQWhDLEVBREQ7O0FBNURjOzs7O0FEcFRmLElBQUE7O0FBQUEsQ0FBQSxHQUFJLE9BQUEsQ0FBUSxjQUFSOztBQUVKLE9BQU8sQ0FBQyxRQUFSLEdBQW1CO0VBQ2pCLEtBQUEsRUFBTSxNQURXO0VBRWpCLFVBQUEsRUFBVyxNQUZNO0VBR2pCLE1BQUEsRUFBTyxDQUFDLENBQUMsRUFBRixDQUFLLEdBQUwsQ0FIVTtFQUlqQixLQUFBLEVBQU0sQ0FBQyxDQUFDLEVBQUYsQ0FBSyxHQUFMLENBSlc7RUFLakIsZUFBQSxFQUFnQixhQUxDO0VBTWpCLFFBQUEsRUFBUyxJQU5RO0VBT2pCLFdBQUEsRUFBWTtJQUFDLEdBQUEsRUFBSSxDQUFMO0dBUEs7RUFRakIsR0FBQSxFQUFJLElBUmE7RUFTakIsYUFBQSxFQUFlLFNBVEU7RUFVakIsSUFBQSxFQUFLLEtBVlk7RUFXakIsSUFBQSxFQUFLLEtBWFk7RUFZakIsU0FBQSxFQUFVLENBWk87RUFhakIsWUFBQSxFQUFhLElBYkk7RUFjakIsS0FBQSxFQUFNLE1BZFc7OztBQWlCbkIsT0FBTyxDQUFDLFFBQVEsQ0FBQyxLQUFqQixHQUF5QixNQUFNLENBQUMsSUFBUCxDQUFZLE9BQU8sQ0FBQyxRQUFwQjs7QUFFekIsT0FBTyxDQUFDLE1BQVIsR0FBaUIsU0FBQyxLQUFEO0FBQ2YsTUFBQTtFQUFBLEtBQUEsR0FBUSxDQUFDLENBQUMsS0FBSyxDQUFDLGNBQVIsQ0FBdUIsS0FBdkIsRUFBOEIsT0FBTyxDQUFDLFFBQXRDO0VBQ1IsSUFBRyxLQUFLLENBQUMsR0FBVDtJQUNJLEtBQUEsR0FBUTtJQUNSLEtBQUssQ0FBQyxLQUFOLEdBQWMsQ0FBQyxDQUFDLE1BQU0sQ0FBQztJQUN2QixLQUFLLENBQUMsTUFBTixHQUFlLEtBQUssQ0FBQyxLQUFOLEdBQWMsT0FIakM7O0VBS0EsVUFBQSxHQUFpQixJQUFBLFVBQUEsQ0FDZjtJQUFBLFVBQUEsRUFBVyxLQUFLLENBQUMsVUFBakI7SUFDQSxLQUFBLEVBQU0sS0FBSyxDQUFDLEtBRFo7SUFFQSxNQUFBLEVBQU8sS0FBSyxDQUFDLE1BRmI7SUFHQSxLQUFBLEVBQU0sS0FBSyxDQUFDLEtBSFo7SUFJQSxlQUFBLEVBQWdCLEtBQUssQ0FBQyxlQUp0QjtJQUtBLElBQUEsRUFBSyxPQUxMO0dBRGU7RUFRakIsSUFBRyxLQUFLLENBQUMsS0FBVDtJQUNFLFVBQVUsQ0FBQyxLQUFYLEdBQW1CLEtBQUssQ0FBQyxNQUQzQjs7RUFHQSxVQUFVLENBQUMsTUFBTSxDQUFDLFFBQWxCLEdBQTZCLEtBQUssQ0FBQztFQUNuQyxVQUFVLENBQUMsTUFBTSxDQUFDLEtBQWxCLEdBQTBCLEtBQUssQ0FBQztFQUNoQyxVQUFVLENBQUMsTUFBTSxDQUFDLElBQWxCLEdBQXlCLEtBQUssQ0FBQztFQUUvQixJQUFHLEtBQUssQ0FBQyxXQUFUO0lBQ0UsVUFBVSxDQUFDLFdBQVgsR0FBeUIsS0FBSyxDQUFDO0lBQy9CLENBQUMsQ0FBQyxNQUFNLENBQUMsR0FBVCxDQUFhLFVBQWIsRUFGRjs7RUFJQSxVQUFVLENBQUMsUUFBWCxHQUEwQixJQUFBLEtBQUEsQ0FDeEI7SUFBQSxNQUFBLEVBQU8sVUFBVSxDQUFDLE1BQWxCO0lBQ0EsS0FBQSxFQUFNLFVBQVUsQ0FBQyxLQURqQjtJQUVBLFVBQUEsRUFBVyxVQUZYO0lBR0EsZUFBQSxFQUFnQixhQUhoQjtJQUlBLElBQUEsRUFBSyxVQUpMO0dBRHdCO0VBTzFCLEtBQUEsR0FBUSxTQUFBO0FBQ04sUUFBQTtJQUFBLFVBQVUsQ0FBQyxZQUFYLEdBQTBCO0lBQzFCLFVBQVUsQ0FBQyxRQUFYLEdBQTBCLElBQUEsS0FBQSxDQUN4QjtNQUFBLGVBQUEsRUFBZ0IsQ0FBQyxDQUFDLEtBQUYsQ0FBUSxPQUFSLENBQWhCO01BQ0EsVUFBQSxFQUFXLFVBQVUsQ0FBQyxRQUR0QjtNQUVBLFlBQUEsRUFBYSxDQUFDLENBQUMsRUFBRixDQUFLLEVBQUwsQ0FGYjtNQUdBLE1BQUEsRUFBTyxDQUFDLENBQUMsRUFBRixDQUFLLEVBQUwsQ0FIUDtNQUlBLEtBQUEsRUFBTSxDQUFDLENBQUMsRUFBRixDQUFLLEVBQUwsQ0FKTjtNQUtBLE9BQUEsRUFBUSxFQUxSO01BTUEsSUFBQSxFQUFLLFdBTkw7S0FEd0I7SUFRMUIsSUFBRyxLQUFLLENBQUMsWUFBTixLQUFzQixLQUF6QjtNQUNFLFVBQVUsQ0FBQyxRQUFRLENBQUMsT0FBcEIsR0FBOEIsRUFEaEM7O0lBRUEsVUFBVSxDQUFDLFFBQVEsQ0FBQyxNQUFwQixDQUFBO0lBRUEsVUFBVSxDQUFDLEtBQVgsR0FBdUIsSUFBQSxDQUFDLENBQUMsSUFBRixDQUN0QjtNQUFBLElBQUEsRUFBSyxPQUFMO01BQ0EsS0FBQSxFQUFNLE9BRE47S0FEc0I7SUFJdkIsVUFBVSxDQUFDLElBQVgsR0FBc0IsSUFBQSxDQUFDLENBQUMsSUFBRixDQUNyQjtNQUFBLElBQUEsRUFBSyxZQUFMO01BQ0EsS0FBQSxFQUFNLE9BRE47S0FEcUI7SUFJdEIsVUFBVSxDQUFDLFVBQVgsR0FBNEIsSUFBQSxDQUFDLENBQUMsSUFBRixDQUMzQjtNQUFBLElBQUEsRUFBSyxZQUFMO01BQ0EsS0FBQSxFQUFNLE9BRE47S0FEMkI7SUFJNUIsVUFBVSxDQUFDLFVBQVUsQ0FBQyxXQUF0QixHQUNFO01BQUEsTUFBQSxFQUFPLENBQVA7TUFDQSxRQUFBLEVBQVMsRUFEVDs7SUFHRixVQUFVLENBQUMsY0FBWCxHQUFnQyxJQUFBLENBQUMsQ0FBQyxJQUFGLENBQy9CO01BQUEsSUFBQSxFQUFLLGlCQUFMO01BQ0EsS0FBQSxFQUFNLE9BRE47S0FEK0I7SUFJaEMsVUFBVSxDQUFDLGNBQWMsQ0FBQyxXQUExQixHQUNFO01BQUEsTUFBQSxFQUFPLENBQVA7TUFDQSxRQUFBLEVBQVMsRUFEVDs7SUFHRixDQUFDLENBQUMsTUFBTSxDQUFDLEdBQVQsQ0FBYSxVQUFVLENBQUMsVUFBeEI7SUFFQSxVQUFVLENBQUMsSUFBSSxDQUFDLE9BQWhCLEdBQTBCO0lBQzFCLFVBQVUsQ0FBQyxjQUFjLENBQUMsT0FBMUIsR0FBb0M7SUFFcEMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxXQUFwQixDQUFnQyxVQUFVLENBQUMsS0FBM0M7SUFDQSxVQUFVLENBQUMsUUFBUSxDQUFDLFdBQXBCLENBQWdDLFVBQVUsQ0FBQyxJQUEzQztJQUNBLFVBQVUsQ0FBQyxRQUFRLENBQUMsV0FBcEIsQ0FBZ0MsVUFBVSxDQUFDLFVBQTNDO0lBQ0EsVUFBVSxDQUFDLFFBQVEsQ0FBQyxXQUFwQixDQUFnQyxVQUFVLENBQUMsY0FBM0M7SUFDQSxVQUFVLENBQUMsS0FBSyxDQUFDLE1BQWpCLENBQUE7SUFDQSxVQUFVLENBQUMsSUFBSSxDQUFDLE1BQWhCLENBQUE7SUFHQSxVQUFVLENBQUMsV0FBWCxHQUE2QixJQUFBLENBQUMsQ0FBQyxJQUFGLENBQzNCO01BQUEsSUFBQSxFQUFLLENBQUMsQ0FBQyxLQUFLLENBQUMsUUFBUixDQUFpQixVQUFVLENBQUMsTUFBTSxDQUFDLFdBQW5DLENBQUw7TUFDQSxLQUFBLEVBQU0sT0FETjtNQUVBLFdBQUEsRUFBWTtRQUFDLE1BQUEsRUFBTyxDQUFSO1FBQVcsT0FBQSxFQUFRLEVBQW5CO09BRlo7TUFHQSxVQUFBLEVBQVcsVUFBVSxDQUFDLFFBSHRCO01BSUEsUUFBQSxFQUFTLEVBSlQ7TUFLQSxJQUFBLEVBQUssYUFMTDtLQUQyQjtJQVE3QixVQUFVLENBQUMsT0FBWCxHQUF5QixJQUFBLENBQUMsQ0FBQyxJQUFGLENBQ3ZCO01BQUEsSUFBQSxFQUFLLENBQUMsQ0FBQyxLQUFLLENBQUMsUUFBUixDQUFpQixVQUFVLENBQUMsTUFBTSxDQUFDLFFBQW5DLENBQUw7TUFDQSxLQUFBLEVBQU0sT0FETjtNQUVBLFdBQUEsRUFBWTtRQUFDLFdBQUEsRUFBWSxVQUFVLENBQUMsV0FBeEI7UUFBcUMsUUFBQSxFQUFTLENBQUMsVUFBVSxDQUFDLFVBQVosRUFBd0IsRUFBeEIsQ0FBOUM7T0FGWjtNQUdBLFVBQUEsRUFBVyxVQUFVLENBQUMsUUFIdEI7TUFJQSxRQUFBLEVBQVMsRUFKVDtNQUtBLElBQUEsRUFBSyxTQUxMO0tBRHVCO0lBUXpCLFVBQVUsQ0FBQyxPQUFYLEdBQXlCLElBQUEsS0FBQSxDQUN2QjtNQUFBLFVBQUEsRUFBVyxVQUFVLENBQUMsUUFBdEI7TUFDQSxlQUFBLEVBQWdCLENBQUMsQ0FBQyxLQUFGLENBQVEsU0FBUixDQURoQjtNQUVBLElBQUEsRUFBSyxTQUZMO01BR0EsT0FBQSxFQUFRLEVBSFI7S0FEdUI7SUFNekIsVUFBVSxDQUFDLE9BQU8sQ0FBQyxXQUFuQixHQUNFO01BQUEsT0FBQSxFQUFRLENBQUMsVUFBVSxDQUFDLFdBQVosRUFBeUIsRUFBekIsQ0FBUjtNQUNBLFFBQUEsRUFBUyxDQUFDLFVBQVUsQ0FBQyxPQUFaLEVBQXFCLEVBQXJCLENBRFQ7TUFFQSxNQUFBLEVBQU8sQ0FGUDtNQUdBLGNBQUEsRUFBZSxVQUFVLENBQUMsV0FIMUI7O0lBSUYsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxHQUFULENBQWEsVUFBVSxDQUFDLE9BQXhCO0lBRUEsVUFBVSxDQUFDLE1BQVgsR0FBd0IsSUFBQSxLQUFBLENBQ3RCO01BQUEsZUFBQSxFQUFnQixhQUFoQjtNQUNBLFVBQUEsRUFBVyxVQUFVLENBQUMsUUFEdEI7TUFFQSxJQUFBLEVBQUssUUFGTDtLQURzQjtJQUt4QixVQUFVLENBQUMsTUFBTSxDQUFDLFdBQWxCLEdBQ0U7TUFBQSxLQUFBLEVBQU0sRUFBTjtNQUNBLE1BQUEsRUFBTyxFQURQO01BRUEsY0FBQSxFQUFlLFVBQVUsQ0FBQyxXQUYxQjs7SUFHRixDQUFDLENBQUMsTUFBTSxDQUFDLEdBQVQsQ0FBYSxVQUFVLENBQUMsTUFBeEI7SUFFQSxVQUFVLENBQUMsU0FBWCxHQUEyQixJQUFBLEtBQUEsQ0FDekI7TUFBQSxLQUFBLEVBQU0sQ0FBQyxDQUFDLEVBQUYsQ0FBSyxFQUFMLENBQU47TUFDQSxNQUFBLEVBQU8sQ0FBQyxDQUFDLEVBQUYsQ0FBSyxFQUFMLENBRFA7TUFFQSxZQUFBLEVBQWEsQ0FBQyxDQUFDLEVBQUYsQ0FBSyxFQUFMLENBRmI7TUFHQSxlQUFBLEVBQWdCLENBQUMsQ0FBQyxLQUFGLENBQVEsS0FBSyxDQUFDLGFBQWQsQ0FIaEI7TUFJQSxVQUFBLEVBQVcsVUFBVSxDQUFDLE1BSnRCO01BS0EsSUFBQSxFQUFLLFdBTEw7S0FEeUI7SUFRM0IsVUFBVSxDQUFDLFNBQVMsQ0FBQyxNQUFyQixDQUFBO0lBRUEsVUFBVSxDQUFDLFdBQVgsR0FBNkIsSUFBQSxLQUFBLENBQzNCO01BQUEsZUFBQSxFQUFnQixDQUFDLENBQUMsS0FBRixDQUFRLEtBQUssQ0FBQyxhQUFkLENBQWhCO01BQ0EsS0FBQSxFQUFNLENBRE47TUFFQSxVQUFBLEVBQVcsVUFBVSxDQUFDLFFBRnRCO01BR0EsSUFBQSxFQUFLLGNBSEw7S0FEMkI7SUFNN0IsVUFBVSxDQUFDLFdBQVcsQ0FBQyxXQUF2QixHQUNFO01BQUEsTUFBQSxFQUFPLENBQVA7TUFDQSxjQUFBLEVBQWUsVUFBVSxDQUFDLE9BRDFCOztJQUdGLENBQUMsQ0FBQyxNQUFNLENBQUMsR0FBVCxDQUFhO01BQUEsTUFBQSxFQUFPLENBQUMsVUFBVSxDQUFDLE1BQVosRUFBb0IsVUFBVSxDQUFDLFdBQS9CLENBQVA7S0FBYjtJQUVBLFVBQVUsQ0FBQyxZQUFYLEdBQTJCLFVBQVUsQ0FBQyxNQUFNLENBQUMsS0FBbEIsR0FBd0IsQ0FBeEIsR0FBNEIsVUFBVSxDQUFDLFNBQVMsQ0FBQyxLQUFyQixHQUEyQjtJQUNsRixVQUFVLENBQUMsTUFBTSxDQUFDLENBQWxCLEdBQXNCLFVBQVUsQ0FBQyxPQUFPLENBQUMsQ0FBbkIsR0FBdUIsVUFBVSxDQUFDO0lBQ3hELFVBQVUsQ0FBQyxXQUFXLENBQUMsQ0FBdkIsR0FBMkIsVUFBVSxDQUFDLE9BQU8sQ0FBQztJQUc5QyxRQUFBLEdBQVc7SUFDWCxLQUFLLENBQUMsUUFBTixDQUFlLENBQWYsRUFBa0IsU0FBQTtNQUNoQixRQUFBO01BQ0EsSUFBRyxRQUFBLEdBQVcsS0FBSyxDQUFDLFNBQWpCLElBQThCLFVBQVUsQ0FBQyxNQUFNLENBQUMsTUFBbEIsS0FBNEIsS0FBMUQsSUFBbUUsVUFBVSxDQUFDLE1BQU0sQ0FBQyxPQUFsQixLQUE2QixJQUFuRztRQUNFLFVBQVUsQ0FBQyxRQUFRLENBQUMsT0FBcEIsQ0FDRTtVQUFBLFVBQUEsRUFBWTtZQUFBLE9BQUEsRUFBUSxDQUFSO1dBQVo7VUFDQSxJQUFBLEVBQUssR0FETDtTQURGO2VBR0EsVUFBVSxDQUFDLFFBQVEsQ0FBQyxPQUFwQixHQUE4QixNQUpoQztPQUFBLE1BQUE7UUFNRSxVQUFVLENBQUMsUUFBUSxDQUFDLE9BQXBCLEdBQThCO2VBQzlCLFVBQVUsQ0FBQyxRQUFRLENBQUMsT0FBcEIsR0FBOEIsS0FQaEM7O0lBRmdCLENBQWxCO0lBV0EsVUFBVSxDQUFDLFFBQVEsQ0FBQyxFQUFwQixDQUF1QixNQUFNLENBQUMsVUFBOUIsRUFBMEMsU0FBQTtNQUN4QyxJQUFHLFFBQUEsR0FBVyxLQUFLLENBQUMsU0FBcEI7ZUFDRSxRQUFBLEdBQVcsRUFEYjtPQUFBLE1BQUE7ZUFHRSxRQUFBLEdBQVcsRUFIYjs7SUFEd0MsQ0FBMUM7SUFNQSxVQUFVLENBQUMsUUFBUSxDQUFDLEVBQXBCLENBQXVCLE1BQU0sQ0FBQyxRQUE5QixFQUF3QyxTQUFBO01BQ3RDLElBQUcsVUFBVSxDQUFDLE1BQU0sQ0FBQyxNQUFyQjtRQUNFLFVBQVUsQ0FBQyxJQUFJLENBQUMsT0FBaEIsR0FBMEI7UUFDMUIsVUFBVSxDQUFDLEtBQUssQ0FBQyxPQUFqQixHQUEyQjtlQUMzQixVQUFVLENBQUMsTUFBTSxDQUFDLElBQWxCLENBQUEsRUFIRjtPQUFBLE1BQUE7UUFLRSxVQUFVLENBQUMsSUFBSSxDQUFDLE9BQWhCLEdBQTBCO1FBQzFCLFVBQVUsQ0FBQyxLQUFLLENBQUMsT0FBakIsR0FBMkI7ZUFDM0IsVUFBVSxDQUFDLE1BQU0sQ0FBQyxLQUFsQixDQUFBLEVBUEY7O0lBRHNDLENBQXhDO0lBVUEsVUFBVSxDQUFDLFVBQVUsQ0FBQyxFQUF0QixDQUF5QixNQUFNLENBQUMsUUFBaEMsRUFBMEMsU0FBQTtNQUN0QyxVQUFVLENBQUMsVUFBVSxDQUFDLE9BQXRCLEdBQWdDO01BQ2hDLFVBQVUsQ0FBQyxjQUFjLENBQUMsT0FBMUIsR0FBb0M7TUFDcEMsVUFBVSxDQUFDLFVBQVgsR0FBd0IsVUFBVSxDQUFDO01BQ25DLFVBQVUsQ0FBQyxVQUFYLEdBQXdCLFVBQVUsQ0FBQyxXQUFXLENBQUM7TUFFL0MsSUFBRyxVQUFVLENBQUMsWUFBZDtRQUNFLFVBQVUsQ0FBQyxZQUFYLENBQUEsRUFERjs7TUFHQSxRQUFBLEdBQVc7TUFDWCxVQUFVLENBQUMsUUFBWCxHQUEwQixJQUFBLEtBQUEsQ0FDeEI7UUFBQSxlQUFBLEVBQWdCLE9BQWhCO1FBQ0EsS0FBQSxFQUFNLENBQUMsQ0FBQyxNQUFNLENBQUMsS0FEZjtRQUVBLE1BQUEsRUFBTyxDQUFDLENBQUMsTUFBTSxDQUFDLE1BRmhCO1FBR0EsSUFBQSxFQUFLLFVBSEw7T0FEd0I7TUFLMUIsVUFBVSxDQUFDLFdBQVcsQ0FBQyxLQUF2QixHQUErQjtNQUUvQixVQUFVLENBQUMsT0FBWCxDQUNFO1FBQUEsVUFBQSxFQUNFO1VBQUEsS0FBQSxFQUFPLENBQUMsQ0FBQyxNQUFNLENBQUMsS0FBaEI7VUFDQSxNQUFBLEVBQVEsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxLQUFULEdBQWlCLE1BRHpCO1NBREY7UUFHQSxJQUFBLEVBQUssRUFITDtPQURGO01BS0EsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxPQUFULENBQ0U7UUFBQSxNQUFBLEVBQU8sVUFBUDtRQUNBLElBQUEsRUFBSyxFQURMO09BREY7TUFHQSxJQUFHLEtBQUssQ0FBQyxVQUFUO1FBQ0UsVUFBVSxDQUFDLFFBQVEsQ0FBQyxVQUFwQixHQUFpQyxLQUFLLENBQUM7UUFDdkMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxXQUFwQixDQUFnQyxVQUFoQyxFQUZGO09BQUEsTUFBQTtRQUlFLFVBQVUsQ0FBQyxRQUFRLENBQUMsV0FBcEIsQ0FBZ0MsVUFBaEMsRUFKRjs7YUFLQSxDQUFDLENBQUMsVUFBRixDQUFhLFVBQWI7SUE5QnNDLENBQTFDO0lBZ0NBLFVBQVUsQ0FBQyxjQUFjLENBQUMsRUFBMUIsQ0FBNkIsTUFBTSxDQUFDLFFBQXBDLEVBQThDLFNBQUE7TUFDMUMsVUFBVSxDQUFDLFVBQVUsQ0FBQyxPQUF0QixHQUFnQztNQUNoQyxVQUFVLENBQUMsY0FBYyxDQUFDLE9BQTFCLEdBQW9DO01BQ3BDLFFBQUEsR0FBVzthQUNYLENBQUMsQ0FBQyxlQUFGLENBQUE7SUFKMEMsQ0FBOUM7SUFRQSxVQUFVLENBQUMsSUFBWCxHQUFrQixTQUFBO01BQ2QsVUFBVSxDQUFDLE9BQVgsQ0FDRTtRQUFBLFVBQUEsRUFBWTtVQUFBLENBQUEsRUFBRSxVQUFVLENBQUMsVUFBVSxDQUFDLENBQXhCO1VBQTJCLENBQUEsRUFBRSxVQUFVLENBQUMsVUFBVSxDQUFDLENBQW5EO1VBQXNELEtBQUEsRUFBTSxVQUFVLENBQUMsVUFBVSxDQUFDLEtBQWxGO1VBQXlGLE1BQUEsRUFBTyxVQUFVLENBQUMsVUFBVSxDQUFDLE1BQXRIO1NBQVo7UUFDQSxJQUFBLEVBQUssRUFETDtPQURGO01BSUEsVUFBVSxDQUFDLFdBQVcsQ0FBQyxLQUF2QixHQUErQixVQUFVLENBQUM7TUFFMUMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxPQUFwQixDQUNFO1FBQUEsVUFBQSxFQUFZO1VBQUEsT0FBQSxFQUFRLENBQVI7U0FBWjtRQUNBLElBQUEsRUFBSyxFQURMO1FBRUEsS0FBQSxFQUFNLEVBRk47T0FERjtNQUlBLEtBQUssQ0FBQyxLQUFOLENBQVksRUFBWixFQUFnQixTQUFBO2VBQ2QsVUFBVSxDQUFDLFFBQVEsQ0FBQyxPQUFwQixDQUFBO01BRGMsQ0FBaEI7TUFHQSxVQUFVLENBQUMsVUFBVSxDQUFDLE9BQXRCLEdBQWdDO01BQ2hDLFVBQVUsQ0FBQyxjQUFjLENBQUMsT0FBMUIsR0FBb0M7TUFFcEMsSUFBRyxVQUFVLENBQUMsZ0JBQWQ7ZUFDRSxVQUFVLENBQUMsZ0JBQVgsQ0FBQSxFQURGOztJQWpCYztJQXFCbEIsVUFBVSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsT0FBNUIsR0FBc0M7SUFDdEMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsTUFBNUIsR0FBcUM7SUFDckMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsTUFBNUIsR0FBcUM7SUFDckMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsUUFBNUIsR0FBdUM7SUFDdkMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsTUFBNUIsR0FBcUM7SUFFckMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxFQUFsQixDQUFxQixNQUFNLENBQUMsVUFBNUIsRUFBd0MsU0FBQTtNQUN0QyxVQUFVLENBQUMsTUFBTSxDQUFDLEtBQWxCLEdBQTBCO2FBQzFCLFVBQVUsQ0FBQyxNQUFNLENBQUMsT0FBbEIsR0FBNEI7SUFGVSxDQUF4QztJQUlBLFVBQVUsQ0FBQyxNQUFNLENBQUMsRUFBbEIsQ0FBcUIsTUFBTSxDQUFDLFFBQTVCLEVBQXNDLFNBQUE7QUFDcEMsVUFBQTtNQUFBLFVBQVUsQ0FBQyxNQUFNLENBQUMsT0FBbEIsR0FBNEI7TUFDNUIsSUFBRyxVQUFVLENBQUMsTUFBTSxDQUFDLENBQWxCLEdBQXNCLFVBQVUsQ0FBQyxZQUFqQyxHQUFnRCxVQUFVLENBQUMsT0FBTyxDQUFDLENBQXRFO1FBQ0UsVUFBVSxDQUFDLE1BQU0sQ0FBQyxDQUFsQixHQUFzQixVQUFVLENBQUMsT0FBTyxDQUFDLENBQW5CLEdBQXVCLFVBQVUsQ0FBQyxhQUQxRDs7TUFFQSxJQUFHLFVBQVUsQ0FBQyxNQUFNLENBQUMsSUFBbEIsR0FBeUIsVUFBVSxDQUFDLE9BQU8sQ0FBQyxJQUFuQixHQUEwQixVQUFVLENBQUMsWUFBakU7UUFDRSxVQUFVLENBQUMsTUFBTSxDQUFDLElBQWxCLEdBQXlCLFVBQVUsQ0FBQyxPQUFPLENBQUMsSUFBbkIsR0FBMEIsVUFBVSxDQUFDLGFBRGhFOztNQUVBLEtBQUEsR0FBUSxVQUFVLENBQUMsTUFBTSxDQUFDLFFBQWxCLEdBQTZCLENBQUMsQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLENBQWxCLEdBQXNCLFVBQVUsQ0FBQyxZQUFqQyxHQUFnRCxVQUFVLENBQUMsT0FBTyxDQUFDLENBQXBFLENBQUEsR0FBdUUsVUFBVSxDQUFDLE9BQU8sQ0FBQyxLQUEzRjtNQUNyQyxJQUFHLEtBQUEsR0FBUSxDQUFYO1FBQ0UsS0FBQSxHQUFRLEVBRFY7O01BRUEsSUFBRyxLQUFBLEdBQVEsVUFBVSxDQUFDLE1BQU0sQ0FBQyxRQUE3QjtRQUNFLEtBQUEsR0FBUSxVQUFVLENBQUMsTUFBTSxDQUFDLFNBRDVCOzthQUVBLENBQUMsQ0FBQyxLQUFLLENBQUMsTUFBUixDQUFlLFVBQVUsQ0FBQyxXQUExQixFQUF1QztRQUFDO1VBQUMsSUFBQSxFQUFLLENBQUMsQ0FBQyxLQUFLLENBQUMsUUFBUixDQUFpQixLQUFqQixDQUFOO1NBQUQ7T0FBdkM7SUFYb0MsQ0FBdEM7V0FhQSxVQUFVLENBQUMsTUFBTSxDQUFDLEVBQWxCLENBQXFCLE1BQU0sQ0FBQyxPQUE1QixFQUFxQyxTQUFBO0FBQ25DLFVBQUE7TUFBQSxVQUFVLENBQUMsTUFBTSxDQUFDLEtBQWxCLEdBQTBCO01BQzFCLFVBQVUsQ0FBQyxNQUFNLENBQUMsT0FBbEIsR0FBNEI7TUFDNUIsRUFBQSxHQUFLLFVBQVUsQ0FBQyxNQUFNLENBQUM7TUFDdkIsS0FBQSxHQUFRLEVBQUEsR0FBSyxDQUFDLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxDQUFsQixHQUFzQixVQUFVLENBQUMsWUFBakMsR0FBZ0QsVUFBVSxDQUFDLE9BQU8sQ0FBQyxDQUFwRSxDQUFBLEdBQXVFLFVBQVUsQ0FBQyxPQUFPLENBQUMsS0FBM0Y7TUFDYixJQUFHLEtBQUEsR0FBUSxDQUFYO1FBQ0UsS0FBQSxHQUFRLEVBRFY7O01BRUEsSUFBRyxLQUFBLEdBQVEsVUFBVSxDQUFDLE1BQU0sQ0FBQyxRQUE3QjtRQUNFLEtBQUEsR0FBUSxVQUFVLENBQUMsTUFBTSxDQUFDLFNBRDVCOztNQUVBLEtBQUEsR0FBUSxJQUFJLENBQUMsS0FBTCxDQUFXLEtBQVg7YUFDUixVQUFVLENBQUMsTUFBTSxDQUFDLFdBQWxCLEdBQWdDO0lBVkcsQ0FBckM7RUF0T007RUFtUFIsVUFBQSxHQUFhLFNBQUE7QUFDWCxRQUFBO0lBQUEsRUFBQSxHQUFLLFVBQVUsQ0FBQyxNQUFNLENBQUM7SUFDdkIsRUFBQSxHQUFLLFVBQVUsQ0FBQyxNQUFNLENBQUM7SUFDdkIsSUFBRyxVQUFVLENBQUMsTUFBTSxDQUFDLE9BQXJCO0FBQUE7S0FBQSxNQUFBO01BR0UsQ0FBQyxDQUFDLEtBQUssQ0FBQyxNQUFSLENBQWUsVUFBVSxDQUFDLFdBQTFCLEVBQXVDO1FBQUM7VUFBQyxJQUFBLEVBQUssQ0FBQyxDQUFDLEtBQUssQ0FBQyxRQUFSLENBQWlCLFVBQVUsQ0FBQyxNQUFNLENBQUMsV0FBbkMsQ0FBTjtTQUFEO09BQXZDO01BQ0EsVUFBVSxDQUFDLE1BQU0sQ0FBQyxDQUFsQixHQUFzQixVQUFVLENBQUMsT0FBTyxDQUFDLENBQW5CLEdBQXVCLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxLQUFuQixHQUEyQixFQUEzQixHQUE4QixFQUEvQixDQUF2QixHQUE0RCxVQUFVLENBQUM7YUFDN0YsVUFBVSxDQUFDLFdBQVcsQ0FBQyxLQUF2QixHQUFnQyxVQUFVLENBQUMsTUFBTSxDQUFDLENBQWxCLEdBQXNCLFVBQVUsQ0FBQyxZQUFqQyxHQUFnRCxVQUFVLENBQUMsT0FBTyxDQUFDLEVBTHJHOztFQUhXO0VBVWIsVUFBVSxDQUFDLE1BQU0sQ0FBQyxnQkFBbEIsQ0FBbUMsWUFBbkMsRUFBaUQsS0FBakQ7RUFDQSxVQUFVLENBQUMsTUFBTSxDQUFDLGdCQUFsQixDQUFtQyxZQUFuQyxFQUFpRCxVQUFqRDtBQUdBLFNBQU87QUFsU1E7Ozs7QURqQmpCLElBQUE7O0FBQUEsT0FBTyxDQUFDLE1BQVIsR0FBaUIsTUFBQSxHQUFTLE9BQUEsQ0FBUSxxQkFBUjs7QUFDMUIsT0FBTyxDQUFDLEdBQVIsR0FBYyxPQUFBLEdBQVUsT0FBQSxDQUFRLHNCQUFSOztBQUN4QixPQUFPLENBQUMsS0FBUixHQUFnQixLQUFBLEdBQVEsT0FBQSxDQUFRLG9CQUFSOztBQUN4QixPQUFPLENBQUMsS0FBUixHQUFnQixLQUFBLEdBQVEsT0FBQSxDQUFRLG9CQUFSOztBQUd4QixPQUFPLENBQUMsTUFBUixHQUFpQixLQUFLLENBQUMsU0FBTixDQUFBOztBQUNqQixPQUFPLENBQUMsTUFBUixHQUFpQixPQUFPLENBQUM7O0FBR3pCLE9BQU8sQ0FBQyxLQUFSLEdBQWdCLFNBQUMsV0FBRDtBQUNkLFNBQU8sT0FBTyxDQUFDLEtBQUssQ0FBQyxLQUFkLENBQW9CLFdBQXBCO0FBRE87O0FBR2hCLE9BQU8sQ0FBQyxFQUFSLEdBQWEsU0FBQyxFQUFEO0FBQ1gsU0FBTyxPQUFPLENBQUMsS0FBSyxDQUFDLEVBQWQsQ0FBaUIsRUFBakI7QUFESTs7QUFHYixPQUFPLENBQUMsRUFBUixHQUFhLFNBQUMsRUFBRDtBQUNYLFNBQU8sT0FBTyxDQUFDLEtBQUssQ0FBQyxFQUFkLENBQWlCLEVBQWpCO0FBREk7O0FBR2IsT0FBTyxDQUFDLEtBQVIsR0FBZ0IsS0FBSyxDQUFDOztBQUV0QixPQUFPLENBQUMsVUFBUixHQUFxQixTQUFDLEtBQUQ7U0FDbkIsS0FBSyxDQUFDLFVBQU4sQ0FBaUIsS0FBakI7QUFEbUI7O0FBR3JCLE9BQU8sQ0FBQyxlQUFSLEdBQTBCLFNBQUMsS0FBRDtTQUN4QixLQUFLLENBQUMsZUFBTixDQUFzQixLQUF0QjtBQUR3Qjs7QUFLMUIsTUFBQSxHQUFTLE9BQUEsQ0FBUSxzQkFBUjs7QUFDVCxNQUFBLEdBQVMsT0FBQSxDQUFRLHFCQUFSOztBQUNULE1BQUEsR0FBUyxPQUFBLENBQVEscUJBQVI7O0FBQ1QsTUFBQSxHQUFTLE9BQUEsQ0FBUSxxQkFBUjs7QUFDVCxJQUFBLEdBQU8sT0FBQSxDQUFRLG1CQUFSOztBQUNQLEdBQUEsR0FBTSxPQUFBLENBQVEsc0JBQVI7O0FBQ04sUUFBQSxHQUFXLE9BQUEsQ0FBUSx3QkFBUjs7QUFDWCxNQUFBLEdBQVMsT0FBQSxDQUFRLHlCQUFSOztBQUNULElBQUEsR0FBTyxPQUFBLENBQVEsbUJBQVI7O0FBQ1AsS0FBQSxHQUFRLE9BQUEsQ0FBUSxvQkFBUjs7QUFDUixTQUFBLEdBQVksT0FBQSxDQUFRLHlCQUFSOztBQUdaLE9BQU8sQ0FBQyxNQUFSLEdBQWlCLE1BQU0sQ0FBQzs7QUFDeEIsT0FBTyxDQUFDLE1BQVIsR0FBaUIsTUFBTSxDQUFDOztBQUN4QixPQUFPLENBQUMsTUFBUixHQUFpQixNQUFNLENBQUM7O0FBQ3hCLE9BQU8sQ0FBQyxNQUFSLEdBQWlCLE1BQU0sQ0FBQzs7QUFDeEIsT0FBTyxDQUFDLElBQVIsR0FBZSxJQUFJLENBQUM7O0FBQ3BCLE9BQU8sQ0FBQyxNQUFSLEdBQWlCLEdBQUcsQ0FBQzs7QUFDckIsT0FBTyxDQUFDLFFBQVIsR0FBbUIsUUFBUSxDQUFDOztBQUM1QixPQUFPLENBQUMsU0FBUixHQUFvQixNQUFNLENBQUM7O0FBQzNCLE9BQU8sQ0FBQyxJQUFSLEdBQWUsSUFBSSxDQUFDOztBQUNwQixPQUFPLENBQUMsS0FBUixHQUFnQixLQUFLLENBQUM7O0FBQ3RCLE9BQU8sQ0FBQyxTQUFSLEdBQW9CLFNBQVMsQ0FBQzs7OztBRHBEOUIsT0FBTyxDQUFDLEtBQVIsR0FBZ0I7O0FBRWhCLE9BQU8sQ0FBQyxVQUFSLEdBQXFCLFNBQUE7U0FDcEIsS0FBQSxDQUFNLHVCQUFOO0FBRG9COztBQUdyQixPQUFPLENBQUMsT0FBUixHQUFrQixDQUFDLENBQUQsRUFBSSxDQUFKLEVBQU8sQ0FBUCJ9
