## Developer Certificate of Origin + License

By contributing to GitLab B.V., You accept and agree to the following terms and
conditions for Your present and future Contributions submitted to GitLab B.V.
Except for the license granted herein to GitLab B.V. and recipients of software
distributed by GitLab B.V., You reserve all right, title, and interest in and to
Your Contributions. All Contributions are subject to the following DCO + License
terms.

[DCO + License](https://gitlab.com/gitlab-org/dco/blob/master/README.md)

_This notice should stay as the first item in the CONTRIBUTING.md file._

---

# Contribution guidelines

<!-- Table of contents generated with DocToc: https://github.com/thlorenz/doctoc -->
<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->


- [Contribute to GitLab](#contribute-to-gitlab)
- [For wider community contributors 🍓](#for-wider-community-contributors-)
  - [Software](#software)
    - [Sketch](#sketch)
      - [Viewing Sketch files](#viewing-sketch-files)
      - [Editing Sketch files](#editing-sketch-files)
    - [Prototyping software](#prototyping-software)
- [For GitLabbers 🦊](#for-gitlabbers-)
- [Organization](#organization)
  - [Naming](#naming)
  - [Files and folders](#files-and-folders)
- [Sketch 🔶](#sketch-)
  - [Plugins](#plugins)
  - [Pattern library](#pattern-library)
  - [Pages and artboards](#pages-and-artboards)
  - [Updating](#updating)
- [Framer 🦋](#framer-)
  - [Templates](#templates)
- [Commits](#commits)
- [Superpowers 🌠](#superpowers-)
- [Git](#git)
- [Code of conduct](#code-of-conduct)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->


## Contribute to GitLab

Thank you for your interest in contributing to GitLab. This guide details how
to contribute to GitLab in a way that is efficient for everyone.

Before contributing, get started by following the steps in the [README](/README.md#getting-started)

## For wider community contributors 🍓

Everyone can contribute to GitLab. In this project, we only accept contributions
from wider community members to our [pattern library][pattern-library-file]
because merging binary files (such as Sketch files) is a manual process that can
be very time-consuming. However, we do encourage design contributions/improvements
to the [GitLab Community Edition](https://gitlab.com/gitlab-org/gitlab-ce) and
[Enterprise Edition](https://gitlab.com/gitlab-org/gitlab-ee) projects. Feel
free to create an issue on those project's issue trackers with your ideas.

If you want to contribute text changes to the [pattern library][pattern-library-file],
please [create an issue](https://gitlab.com/gitlab-org/gitlab-design/issues/new)
with your changes and mention _only one_ of the [designers who manage this project][contacts].

For all other kinds of changes to the [pattern library][pattern-library-file]:

1. [Fork this project][fork-link] to your personal namespace.
1. Navigate to the _Repository_ section of your fork and create a branch by clicking on the <kbd>+</kbd> button above the file explorer.
1. Download the [pattern library file][pattern-library-file].
1. Locally, make your changes to that file while following the [Sketch](#sketch-) and [naming](#naming) guidelines.
1. Back in GitLab, replace the pattern library file in your fork with the changed version from your computer. Make sure you select the branch you created before.
1. Create a merge request from your fork, selecting the appropriate source branch and this project's `master` branch as the target.
   - Be very descriptive of the changes you've made. The reviewer will have to manually merge them, which means they have to be aware of even the smallest changes as they could be easy to miss.
   - Mention _only one_ of the [designers who manage this project][contacts] to review.
   - It's normal to have merge conflicts because we're dealing with binary files, please ignore.
   - The merge request will ultimately be closed as the changes need to be merged manually, instead of using Git.
1. High-five yourself and go brew some coffee while you wait for the review. Thanks! 🙌

### Software

#### Sketch

We use [Sketch](https://sketchapp.com/) for user interface design, but you can use any design software that's available to you. Just make sure to include editable exports (SVG, PDF, EPS) along with your source files.

If you do not have Sketch, here are some software suggestions:

##### Viewing Sketch files

- GitLab: You can view Sketch files [right from GitLab][pattern-library-file] (current functionality only displays the last edited page from each file)
- [Sketch-react](https://zjuasmn.github.io/sketch-react/): Web app that supports multiple pages. Admits uploading files and referencing by URL.
- [Sketch Web Viewer](https://animaapp.github.io/sketch-web-viewer/): Web app that supports uploaded files.

##### Editing Sketch files

- [Lunacy](https://icons8.com/lunacy): Free native Windows app that works offline.
- [Figma](https://www.figma.com/): Powerful tool for UX and UI design. It has a web interface as well as desktop apps (internet connection required). It’s free for individuals.
- [Gravit Designer](https://www.designer.io/): Free vector design app that runs on macOS, Windows, Linux, Chrome OS, or in the browser.
- [Photopea](https://www.photopea.com/): Free web editor for Sketch, Photoshop and Gimp files. The only editable export format is PSD, which may not be fully compatible for Sketch import.

#### Prototyping software

We use [Framer](https://framer.com/) for more complicated designs that require a prototype, but you can use any prototyping software that's available to you. Just make sure that the end result is generally available along with your source files. An example would be an [online hosted version](#superpowers-) of the prototype or a GIF.

## For GitLabbers 🦊

If you’re working on your personal files:

1. In the [`progress`][progress-folder] folder, create your personal folder named after your first name in lowercase (e.g. `pedro`).
1. In your personal folder, create folders and files according to our [organization guidelines](#organization).
1. Make changes while following the [Sketch](#sketch-) and [naming](#naming) guidelines. If you’re working with Sketch specs created with the [Sketch Measure Plugin][sketch-measure], [Framer prototypes][framer], or static HTML pages, please refer to the [Superpowers](#superpowers-) section.
1. Review the files you are about to commit (with `git status -sb`).
   - If you’re having a hard time with this whole Git thing, read our [small help section](#git).
1. Commit and push your changes, following our [commit guidelines](#commits).

If you’re updating the [pattern library][pattern-library-file]:

1. Read the [pattern library documentation][pattern-library-doc]
1. Close any open files that you intend to update (or else the next step won't have any effect while you have them open)
1. Pull latest changes from the repository
1. If the changes are not quick to perform (15 mins or more):
   1. Duplicate the file and append your first name in lowercase to its name as a modifier (e.g. `gitlab-pattern-library--pedro.sketch`)
   1. Add your changes
   1. If the changes are considerable, commit and push your changes frequently, following our [commit guidelines](#commits)
   1. When you’re done, make sure the original file is [unlocked][file-lock] and manually merge your changes by following the next steps
1. [Lock file(s)][file-lock] to prevent others from overwriting it while you add your changes.
1. Add your changes
1. Commit and push your changes, following our [commit guidelines](#commits)
1. [Unlock file(s)][file-lock]


## Organization

### Naming

Follow these guidelines when naming files and folders, as well as
layers and styles in Sketch:
- Adhere to [BEM naming convention](http://getbem.com/naming/): `block-name__element-name--modifier-name`
- Readability above truncation: `background` instead of `bg`
- `lowercase` everywhere
- Separate words with dashes, `no-spaces`

### Files and folders

```
- doc/
- hooks/
- hosted/
  - [first-name]/
    - [folders]/
- progress/
    - [gitlabber-first-name]/ (e.g. pedro)
        - [group-label]/ (e.g. platform)
          - [subject-labels]/ (e.g. settings)
            - projecthandle#issueID-title.sketch (e.g. ce#1337-awesome-design.sketch)
            - [projecthandle#issueID-title]/
              - projecthandle#issueID-title--state-one.sketch
              - projecthandle#issueID-title--state-two.sketch
                - assets/
                  - asset.svg
- templates/
  - framer/
```


1. [`doc/`](/doc): Contains documentation files related to the build out of our [pattern library file][pattern-library-file].
1. [`hooks/`](/hooks): Contains custom [Git hooks][git-hooks] to trigger actions at certain points in git’s execution. Currently, the only one there automates adding issue/merge request IDs to commit messages ([how to install it](#commits)).
1. [`hosted/`][hosted-folder]: Contains deliverables that are hosted online and are publicly accessible. Be very careful changing the structure of this folder as it might break external links. For more information, refer to the [Superpowers](#superpowers-) section.
1. [`progress/`][progress-folder]: Contains personal work-in-progress files. It’s assumed that [everything has a related issue][everything-starts-with-an-issue].
   - Personal folders are organized around our [workflow labels](https://gitlab.com/gitlab-org/gitlab-ce/blob/master/CONTRIBUTING.md#workflow-labels)
      - The 1st-level folders are named after the [Group label)](https://gitlab.com/gitlab-org/gitlab-ce/blob/master/CONTRIBUTING.md#team-labels-cicd-discussion-edge-platform-etc) (also called team label) assigned to the issue/merge request (the green one; except [UX](https://gitlab.com/gitlab-org/gitlab-ce/issues?label_name=UX))
      - The 2nd-level folders are named after [subject labels](https://gitlab.com/gitlab-org/gitlab-ce/blob/master/CONTRIBUTING.md#subject-labels-wiki-container-registry-ldap-api-etc) assigned to the issue/merge request (the blue ones). If there are multiple Subject labels assigned, the folder is named after all labels, in alphabetical order, separated by a dash (e.g. `settings-wiki`).
   - Sketch files are named after their related issue/merge request:
      - The basic naming pattern is: `projecthandle#issueID-title.sketch`:
         - Starts with the project handle (found in the project URL). Use the compact versions `ce` or `ee` for the Community Edition and Enterprise Edition, respectively. All other projects should have their full project handle (e.g. `ux-research` for the [UX Research project](https://gitlab.com/gitlab-org/ux-research))
         - The project handle is followed by `#<ID>` for issues or `!<ID>` for merge requests (e.g. `#1337` or `!1337`)
         - The rest of the name should be a “compact” version of the issue/merge request title
         - For example, the Sketch file for the issue [#28481 Display time tracking totals on milestone page](https://gitlab.com/gitlab-org/gitlab-ce/issues/28481) on the Community Edition (CE) issue tracker could be named `ce#28481-time-tracking-totals.sketch`
      - The Git hook that automates adding issue/merge request numbers to commit messages depends on using this naming pattern, so please follow it so that everything is nicely referenced (see [how to install it](#commits))
      - If the work is related to multiple issues and/or merge requests, just duplicate the prefix and separate with a dash (e.g. `ce#1234-ee#5678-awesome-design.sketch`). In the Sketch file, each page can be named after an issue/merge request (see the [Sketch](#sketch-) section).
      - If you have assets or other files related to the main Sketch file, consider creating an “umbrella” folder to keep everything together. The folder should be named after the issue/merge request, following the same pattern as described before (e.g. `ce#1234-awesome-design`).
      - If you think the Sketch file is becoming too complex, consider breaking it down into separate files, suffixing the file names with a double dash modifier (e.g. `ce#1234-awesome-design--anonymous.sketch` and `ce#1234-awesome-design--logged-in.sketch`). Then, create an “umbrella” folder, as described in the previous point. Alternatively, you can organize the Sketch file internally to deal with this complexity (see the [Sketch](#sketch-) section).
   - For more information, refer to the [wider community contributors](#for-wider-community-contributors-) section or [GitLabbers](#for-gitlabbers-) section
1. [`templates/`][templates-folder]: Contains ready-made templates for tools other than Sketch, meant to kickstart anyone's designs. It's assumed that some form of documentation is provided along with or inside of the template.
   - Each tool should have it's own sub folder named after that tool.

## Sketch 🔶

### Plugins

We recommend installing the following Sketch plugins to improve your design
workflow. Don’t forget to read the documentation of each plugin to use them
properly. If you’d like to recommend a plugin, please [create an issue](https://gitlab.com/gitlab-org/gitlab-design/issues/new).

| Name | Description |
| ---- | ----------- |
| [Runner](https://sketchrunner.com/) | **Install before any other plugin, as all plugins listed here are easily installable through it.** If you can only install one plugin, this is it. Runner helps you to get around Sketch quicker with a keyboard interface similar to Spotlight or Alfred. You can open Runner with <kbd>⌘ + '</kbd>, cycle through categories with your <kbd>⇥</kbd> (tab) key and select search results with your up and down arrow keys. Hit <kbd>↩</kbd> to fire a command.<ul><li>_run​_ to search through all available plugins and Sketch menu commands.</li><li>_goto​_ to jump to any page, artboard, group or layer in your document.</li><li>_​​insert_ or replace select layers with symbols (local or from a library).</li><li>_​create​_ to define symbols and shared styles from your current selection.</li><li>_apply_ text or layer styles to your current selection.</li><li>_install_ to browse, install, update, and uninstall plugins without leaving Sketch. Just search for a plugin name or GitHub username.</li> |
| [AlignTo](https://github.com/LucienLee/AlignTo) | Align objects relative to a key object (like Adobe Illustrator's key object align). |
| [Auto Layout](https://github.com/animaapp/auto-layout) ([docs](https://animaapp.github.io/docs/v1/auto-layout/)) | Add fluid resizing capabilities to your layers, groups, symbols, or artboards, using two powerful features:<ul><li>Set constraints on objects to control their behavior on resize: [pins](https://animaapp.github.io/docs/v1/auto-layout/03-pins.html) for positioning based on their parent object, [size](https://animaapp.github.io/docs/v1/auto-layout/04-size.html) using percentages/pixels/min/max, or [center](https://animaapp.github.io/docs/v1/auto-layout/05-center.html) horizontally/vertically to its parent.</li><li>Create a [Stack](https://animaapp.github.io/docs/v1/auto-layout/12-stacks-flexbox.html) group or convert an existing group into a Stack to define the layout of its child objects (spacing and alignment). This is like having [CSS Flexbox](https://css-tricks.com/snippets/css/a-guide-to-flexbox/) inside Sketch.</li></ul> |
| [Batch Create Symbols](https://github.com/demersdesigns/sketch-batch-create-symbols) | Create individual symbols from multiple selected objects, using the existing names, custom names, or place them within a folder structure. Useful to convert a bunch of objects to symbols on one go instead of selecting them one by one and using the 'Convert to Symbol' function. |
| [Disconnect](https://github.com/einancunlu/Disconnect-for-Sketch) | Detach symbols, layer styles, or text styles from multiple selected objects. |
| [Distributor](https://github.com/pez/sketchdistributor) | Distribute selected objects vertically or horizontally with a given spacing. |
| [Export More](https://github.com/nathco/export-more) | Export to Apple Icon Image (.icns) and Animated GIF (.gif) file formats. [How to export an animated GIF?](https://github.com/nathco/export-more#animated-gif) |
| [Find and Replace](https://github.com/thierryc/Sketch-Find-And-Replace) | Find and replace text in the selected object(s) or the complete document. |
| [Group It](https://github.com/brockdonaldson/groupit) | Name groups before you make them. This helps you become more disciplined in naming objects and adopt a structured approach to your designs. It also cleans up the layers panel. To make this even better, set a [keyboard shortcut override](https://github.com/brockdonaldson/groupit#keyboard-shortcut-override) that replaces the regular Group action shortcut <kbd>cmd + G</kbd> with this plugin's action. |
| [Sketch Measure][sketch-measure] | Export automatic design specs for developers and teammates. You can also add notes that will be visible in the exported specs. Please refer to the [Superpowers](#superpowers-) section to see how to these specs are supported in this project's repository. |
| [Override It](https://github.com/ahmedmigo/overrideit-sketchplugin) | A better approach to changing symbol (and nested symbol) overrides. Select one or more symbols and filter their overrides, change overrides, and search within the override dropdowns. No more scrolling or navigating through huge dropdowns. |
| [Rename It](http://renameit.design/) | Batch rename layers and artboards, or replace any word(s) or character(s) from selected layers. |
| [Relabel Button](https://github.com/kenmoore/sketch-relabel-button) | Prompts for a button’s new label, applies the text, resizes the button background, and repositions any other interior elements while maintaining the existing padding. It’s essentially awesome voodoo magic. |
| [Stark](http://www.getstark.co/) | Check designs against the 8 different types of colorblindness and color pair contrast against WCAG 2.0 standards. |
| [SVGO Compressor](https://github.com/bohemiancoding/svgo-compressor) | Compresses SVG assets using SVGO, right when you export them as usual from Sketch. Useful when exporting icons and illustrations for [GitLab SVG's](https://gitlab.com/gitlab-org/gitlab-svgs). |
| [Shared Style Finder](https://github.com/sonburn/shared-style-finder) | Find instances of a shared layer or text style. Useful to find deprecated styles that should be removed from the [pattern library][pattern-library-doc]. |
| [Symbol Instance Locator](https://github.com/sonburn/symbol-instance-locator) | Find instances of a selected symbol or symbol instance, even when it's being used as an override. Useful to find duplicated or deprecated symbols that should be removed from the [pattern library][pattern-library-doc]. |
| [Symbol Swapper](https://github.com/sonburn/symbol-swapper) | Swap the selected symbols and/or symbol instances to a master of the same name in a library. Useful when removing duplicated symbols from the [pattern library][pattern-library-doc]. |
| [Unused Style Remover](https://github.com/sonburn/unused-style-remover) | Lists unused layer or text styles and allows you to remove all of them or just the ones you want. Useful when removing duplicated or deprecated styles from the [pattern library][pattern-library-doc]. |

### Pattern library

Read the [pattern library documentation][pattern-library-doc] before contributing to it.

### Pages and artboards

In terms of organization method, use the one that best suits you. However, if
you think the file is becoming too complex, consider organizing it with different
pages and/or artboards. For example, pages can be different issues and artboards can be
different states. Remember to follow the [naming guidelines](#naming).

See the [Files and folders](#files-and-folders) section for naming and
organizing Sketch files.

### Updating

Sketch frequently releases major versions (e.g. **49**.0) with useful new
features, but they might be unstable or break certain plugins at first. The most
[boring solution](https://about.gitlab.com/handbook/values/#efficiency) is to
only update **two weeks** after the [major version release](https://www.sketchapp.com/updates/).
This allows time for the Sketch and plugin developers to fix any bugs. After the
waiting period is over, updating to minor versions (e.g. 49.**2**) on release is
ok and encouraged, as they are usually intended to fix bugs.

## Framer 🦋

[Framer](https://framer.com/) is an excellent tool to help you explain/visualize more complicated designs that require a prototype. You can easily create either a flow and/or interaction prototype with it.

### Templates

We recommend making use of the Framer templates provided in the [templates directory][templates-folder] to improve your design workflow when working with Framer.

## Commits

- Be a good contributor and write a [good commit message](https://chris.beams.io/posts/git-commit/)
- Install the [Git hook][git-hooks] that automates adding issue/merge request IDs to commit messages:
   - At the root of the repository, run `ln -s ../../hooks/prepare-commit-msg .git/hooks/prepare-commit-msg`. This will keep your local Git hook up-to-date.
   - Once installed, every time you commit, the hook will add the issues and merge requests IDs found on the staged files (and their folders) to the commit message body (e.g. `gitlab-ce#1337` or `ux-research!1337`)
   - It only works if you follow the naming pattern described in the [Files and folders](#files-and-folders) section
   - These references automatically create a commit note in the corresponding issue/merge request, making it easy for other people to contribute and fork the design (especially important if someone is out-of-office)


## Superpowers 🌠

Some deliverables (Sketch specs created with the [Sketch Measure Plugin][sketch-measure],
[Framer prototypes][framer], and static HTML pages) can be
automatically hosted online for you and are publicly accessible for quick and
easy design handoffs. You can [thank us later](https://about.gitlab.com/handbook/communication/#say-thanks).

To use these awesome _superpowers_:

1. Create a folder with your first name in the [`hosted` directory][hosted-folder] in lowercase (e.g. `jane`). This way we can re-organize the repository without breaking any external links
1. Place your deliverable folder inside of your personal `hosted` directory
   - Sketch specs created with the [Sketch Measure Plugin][sketch-measure]: append `-spec-previews` to the name of the export folder
   - Framer prototypes: if you intend to share them, just move the `*.framer` folder to your personal `hosted` directory
   - Static HTML pages: append `-html-previews` to the name of the folder and name the main page `index.html`
1. Commit and push your changes to GitLab
1. View your [commit’s pipeline on GitLab](https://gitlab.com/gitlab-org/gitlab-design/pipelines) and wait for it to pass
1. [Browse our index of hosted prototypes and specs][design-pages]
   - Search by the name of your folder using <kbd>CMD/CTRL + F</kbd>
1. Share and rejoice! :open_hands:


## Git

As design files are usually binary files, merge conflicts can easily happen.
We do the file merging manually instead of resolving with Git.

Git is hard: screwing up is easy, and figuring out how to fix your mistakes is
sometimes almost impossible. Here are some links and tips to help you
along! :hugging:

- Revert your changes to a file and make it as if you never touched it: `git checkout FILEPATH/FILE`
- If you already did a commit but want to uncommit those changes (before pushing): `git reset HEAD^`
- [Learn git interactively for free on codeschool](https://www.codeschool.com/learn/git)
- [Oh shit, git!](http://ohshitgit.com/)

###  Git LFS

Sometimes repositories can get into a broken state when files that should have been committed with Git LFS aren’t. If that is the case, make sure all contributors have [Git LFS enabled](/README.md#getting-started) and use the following command to fix the repository:

`git lfs migrate import --no-rewrite -m'Commit message...' path/to/files/*.png`

See [this documentation](https://blog.github.com/2018-07-30-git-lfs-2.5.0-now-available/#new-migration-modes) for more information.

## Code of conduct

As contributors and maintainers of this project, we pledge to respect all
people who contribute through reporting issues, posting feature requests,
updating documentation, submitting pull requests or patches, and other
activities.

We are committed to making participation in this project a harassment-free
experience for everyone, regardless of level of experience, gender, gender
identity and expression, sexual orientation, disability, personal appearance,
body size, race, ethnicity, age, or religion.

Examples of unacceptable behavior by participants include the use of sexual
language or imagery, derogatory comments or personal attacks, trolling, public
or private harassment, insults, or other unprofessional conduct.

Project maintainers have the right and responsibility to remove, edit, or
reject comments, commits, code, wiki edits, issues, and other contributions
that are not aligned to this Code of Conduct. Project maintainers who do not
follow the Code of Conduct may be removed from the project team.

This code of conduct applies both within project spaces and in public spaces
when an individual is representing the project or its community.

Instances of abusive, harassing, or otherwise unacceptable behavior can be
reported by emailing `contact@gitlab.com`.

This Code of Conduct is adapted from the [Contributor Covenant][contributor-covenant],
version 1.1.0, available at [http://contributor-covenant.org/version/1/1/0/](http://contributor-covenant.org/version/1/1/0/).

[contributor-covenant]: http://contributor-covenant.org
[fork-link]: https://gitlab.com/gitlab-org/gitlab-design/forks/new
[hosted-folder]: /hosted
[progress-folder]: /progress
[templates-folder]: /templates
[sketch-measure]: https://github.com/utom/sketch-measure
[design-pages]: https://gitlab-org.gitlab.io/gitlab-design
[framer]: https://framer.com
[everything-starts-with-an-issue]: https://about.gitlab.com/handbook/communication/#everything-starts-with-an-issue
[git-hooks]: https://git-scm.com/docs/githooks
[file-lock]: http://docs.gitlab.com/ee/user/project/file_lock.html
[contacts]: /README.md#contacts
[pattern-library-file]: /gitlab-pattern-library.sketch
[pattern-library-doc]: /doc/pattern-library.md
