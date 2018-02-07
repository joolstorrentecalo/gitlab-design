![Plugins illustration](images/plugins-illustration.png)

# Tooling

## Sketch Plugins

Sketch plugins help to significantly improve the design workflow. We recommend installing the following plugins in order to make using GitLab Elements a seamless experience. If you’d like to recommend a plugin, please [create an issue](https://gitlab.com/gitlab-org/gitlab-design/issues/new) in the GitLab Design project for adding guidelines here.

### [Brand.ai](https://brand.ai/sketch)

Brand.ai is a hosted design library that syncs symbols and styles across files. Within the plugin you will find colors, text styles, shared styles, icons, components, and artboards to help quickly create mockups. If an element changes, simply push the change to the library and watch it sync across files. [Browse GitLab’s design library on Brand.ai](https://brand.ai/git-lab/primary-brand).

![brand.ai](images/brandai.png)

### [Relabel button](https://github.com/kenmoore/sketch-relabel-button)

The Relabel Button plugin for Sketch prompts for a button’s new label, applies the text, resizes the button background, and repositions any other interior elements while maintaining the existing padding. It’s essentially awesome voodoo magic.

#### How to use

1. Select element

![Relabel button - Select element](images/relabel-button/select-element.png)

1. Press <kbd>Cmd+J</kbd> and enter the new text for the button (or <kbd>Cmd+Ctrl+J</kbd> for right aligned resize)

![Relabel button - Select element](images/relabel-button/prompt.png)

1. ✨ Tada! The text and other objects will be updated maintaining the button’s original padding and relative layout

![Relabel button - Select element](images/relabel-button/new-label.png)

#### Guidelines

* Nested groups not supported
* For symbols, elements SHOULD NOT be placed within a group
* For symbols, child elements should have Resizing set to Pin To Corner so they do not get shrunk/stretched
* Download the [Relabel Button Guidelines](https://github.com/kenmoore/sketch-relabel-button/raw/master/Relabel%20Button%20Guidelines.sketch) Sketch file for example buttons
