# [GitLab Design Kit](https://gitlab-org.gitlab.io/gitlab-design)

Contains all resources and information UX Designers need.

Git LFS is enabled for this repository. It tracks the following files: `.atype`, `.sketch`, `.psd`, `.zip`, `.jpg`, `.png`, `.pdf`.

Please do the following before committing to this repository:
- `git lfs install`

If you use an application git client instead of the command-line please look in the docs/manual of your app how to activate git LFS!

__An archive of this repository, containing all original commit prior to the change to use git LFS at 08-07-2017 can be found [here](https://gitlab.com/gitlab-org/gitlab-design-archive)!__

![gitlab-cover-image](https://gitlab.com/gitlab-org/gitlab-design/raw/master/gitlab-cover-image.jpg)

## Repository SUPERPOWERS :stars:

*Please put all exported folders in the `hosted` directory. That way you can shuffle the rest of your repository around without breaking links!*

- __Semi automatic Sketch spec previews with Continuous Integration__

*Whenever you create a spec preview folder with the [Sketch Measure Plugin](https://github.com/utom/sketch-measure), append `spec-previews` to the name of the generated directory and it will be visible by an URL. Search in [https://gitlab-org.gitlab.io/gitlab-design](https://gitlab-org.gitlab.io/gitlab-design)*

- __Automatic live Framer prototypes with Continuous Integration__

*Whenever you save a [Framer](https://framerjs.com) prototype in this repository and commit push it to GitLab, it will automatically be hosted in the same way as the spec previews superpower. See them live at [https://gitlab-org.gitlab.io/gitlab-design](https://gitlab-org.gitlab.io/gitlab-design)*

- __Standalone Live Html Previews__

*By using the wget command: `wget -kN --html-extension URL` or `wget -E -p -k URL` you can create a standalone working HTML page of the GitLab view you want. Just change the name of the file to index.html and append `html-previews` to the name of the directory it will be inside of. Good luck! (No guarantees with this one!)*

### Activating them!

1. Have a Mac with [Sketch](https://www.sketchapp.com/) installed in the /Applications folder
1. Install [Sketch Measure Plugin](https://github.com/utom/sketch-measure) with the Sketch Toolbox
1. Read on :)

## Repository Organization

- archive/
    - oldfiles/
- production/
    - svg/
    - resources/
- progress/
    - community-contribution/
        - @gitlabusername/
          - projects/
            - project.sketch
    - GitLab-designername/
        - application-section/
            - project.sketch

## Commit Workflow (includes Community Contribution!)

As design files are mostly binary files, merge conflicts can easily get stuck in conflicts. We will do the file merging manually instead of git.

### GitLab Designer Personal Folders

1. In the `progress` directory, create your own folder
1. In your own folder, create a subfolder for each issue/project you are working on
1. Commit & Push changes

### Community Contribution :strawberry:

Every designer can contribute to GitLab. For GitLab community members we have a [special folder](https://gitlab.com/gitlab-org/gitlab-design/tree/master/progress/community-contribution) in the `progress` directory where you can create and commit your own designs. So you have a consistent backup, which can also be used by other designers to iterate upon! Follow the following steps to contribute.

1. Fork this repository and `git clone` it locally.
1. Create a new branch based off from the master with `git checkout -b branchname`
1. In the `community-contribution` directory, create your own folder based on your GitLab username following [the example](https://gitlab.com/gitlab-org/gitlab-design/tree/master/progress/community-contribution/@gitlabusername).
1. In your own folder, create a subfolder for each issue/project you are working on.
1. Review the files you are about to commit (with `git status -sb`), as __only files in your folder are allowed to be added or changed__! If you have a hard time with this read through our [small section on Git](#oh-my-git)
1. Commit your changes with a [good commit message](https://chris.beams.io/posts/git-commit/), including the project path and issue ID in the commit message body (e.g. `gitlab-ce#1337`). If the commit relates to multiple issues, put them on their own line. This creates a commit note in the issue, making it easy for other people to contribute and fork the design (especially important if someone is out-of-office).
1. Push your changes, create a merge request, and mention any [designer who manages this project](#project-managers).

### Production Folders

1. [Lock file](http://docs.gitlab.com/ee/user/project/file_lock.html)
1. Pull changes
1. Add our changes to the file
1. Commit & Push changes
1. [Unlock](http://docs.gitlab.com/ee/user/project/file_lock.html) file

## Naming Convention
Please see this [issue #19](https://gitlab.com/gitlab-org/gitlab-design/issues/19) for conversation on this topic

### Everywhere

- Readability above truncation, so: `background` instead of `bg`
- `lowercase` __everywhere__
- separate words with hyphens, _no-spaces-everywhere__

### Files & Folders

- for each issue create subfolders for issues

### Layers & Groups (inside Sketch)

- Try to adhere to [BEM naming convention](http://getbem.com/naming/) like so: block-element__modifier

Example:

- `navigation-1__project`

- if you need to add the modifier, you can: `navigation-1__project--issues`

## Sketch Management

- Please try to use the [Symbol Resizing](https://blog.sketchapp.com/sketch-39-brings-symbol-resizing-and-cloud-beta-a74d3aa0611a#.rcu9qt4er) feature, when creating symbols
- Add hidden *full red* (#FF0000) blocks, for important paddings and margins.

## Delivery

All designs mockups and details are delivered in the issue that describes the feature/problem/etc. So there is one place to look for everything related to it.

## Designer & Developer Communication

> Designers and developers often have different priorities, even though everyone is working toward one common goal: a fantastic, delightful, functional product. At Google, we're always working on ways to bridge this gap through unified spec formats and tools, so that intricate details are never lost in translation and things get done the way they're intended the first time - [Designer & Developer Communication Google IO 2016](https://www.youtube.com/watch?v=ZFyK1J5NrVk)

Spec previews can be generated with the one of the [SUPERPOWERS](#repository-superpowers-)!

When additional detail is needed, developers will ask for this. Take inspiration out of the link above if needed.

## Oh My Git

Git is hard: screwing up is easy, and figuring out how to fix your mistakes is sometimes almost impossible. Here are some links and tips to help you along!

### Git Tips

__Delete your changes on a file and make it as if you never touched it! (before commited anything)__
- `git checkout FILEPATH/FILE`

__If you did already 1 commit, but want to uncommit those changes__
- `git reset HEAD^`

### Git Links

- [Learn git interactively for free on codeschool](https://www.codeschool.com/learn/git)
- [Oh shit, git!](http://ohshitgit.com/)

## Project maintainers

See the [members section](https://gitlab.com/gitlab-org/gitlab-design/settings/members?sort=access_level_desc) of this project and search for "UX" on the [team section](https://about.gitlab.com/team) on our website.

## Archive

The archive directory contains all old design files and resources, including those made with [Antetype](http://www.antetype.com/).

Old Antetype design files can still be valuable, if so see: [Converting antetype files for use with sketch](https://gitlab.com/gitlab-org/gitlab-ce/issues/19864)

## Links
- [UX Guide](https://docs.gitlab.com/ce/development/ux_guide/)
- [UI Development Kit](https://gitlab.com/help/ui)
- [UX Designer Onboarding Page](https://about.gitlab.com/handbook/uxdesigner-onboarding/)
- [GitLab Dribbble](https://dribbble.com/gitlab)

## Design goals

- Get the user started with all already existing materials
- Try to kickstart design work while avoiding time lost on creating the duplicate content
- Let designers contribute in a stable and consistent manner

## License

The GitLab Design Kit is distributed under the MIT license,
see the [LICENSE](https://gitlab.com/gitlab-org/gitlab-design/blob/master/LICENSE) file.
