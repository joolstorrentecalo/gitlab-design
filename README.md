# GitLab Design

:information_source: **This project is primarily used by [GitLab’s UX Design team][ux-handbook]
to [host design files](https://gitlab.com/gitlab-org/gitlab-design/blob/master/CONTRIBUTING.md#superpowers-) and hand them off for implementation. Before raising an
issue to any of GitLab’s issue trackers, please see [Getting help for GitLab](https://about.gitlab.com/getting-help/) on our
website to determine the best place to post. Thank you for helping to make GitLab a better product.**

![gitlab-cover-image](https://gitlab.com/gitlab-org/gitlab-design/raw/master/gitlab-cover-image.jpg)

- **[👀 View the Sketch pattern library](/gitlab-pattern-library.sketch)**
- **[👀 View the Sketch instance sheet](/gitlab-instance-sheet.sketch)**
- **[:arrow_upper_right: Browse specs and prototypes](https://gitlab-org.gitlab.io/gitlab-design)**

<!-- Table of contents generated with DocToc: https://github.com/thlorenz/doctoc -->
<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->


- [About](#about)
- [Goals](#goals)
- [Getting started](#getting-started)
- [Contributing](#contributing)
    - [For wider community contributors 🍓](https://gitlab.com/gitlab-org/gitlab-design/blob/master/CONTRIBUTING.md#for-wider-community-contributors-)
    - [For GitLab team members 🦊](https://gitlab.com/gitlab-org/gitlab-design/blob/master/CONTRIBUTING.md#work-on-personal-files)
- [Contacts](#contacts)
- [Links](#links)
- [License](#license)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## About

**GitLab Sketch UI Kit, prototypes, and work-in-progress files.**

This project is primarily used by [GitLab’s UX Design team][ux-handbook] to host design
files and hand them off for implementation. To learn about the best
practices to manage this project, including the repository’s organization,
check out the [contribution guidelines](/CONTRIBUTING.md). For more information
about the UX Design team, check out the [Links](#links) section.

### Goals

- Jumpstart design work by using the GitLab Sketch UI Kit and previous work
- Enable frequent, stable, and consistent contributions
- Make GitLab’s design open, transparent, and open source
- Facilitate design handoffs and design–development communication design handoffs.

## Getting started

**If you’re a GitLab Inc. engineer**: you shouldn’t have to clone this project,
ever. Instead, ask the UX designer for the specs of the designs you’re working with.

**If you want to browse and contribute**:

1. The UX Design team primarily uses [Sketch](https://www.sketchapp.com/). See [Software](/CONTRIBUTING.md#software) for information on using alternatives.
1. If you're a wider community member, unfortunately, we can only accept contributions to our [Sketch UI Kit](/doc/sketch-ui-kit.md). Please follow the [contribution guidelines](/CONTRIBUTING.md#for-wider-community-contributors-) in order to do so. If you want to share Sketch files you have created for certain issues, we invite you to share them inside of the issue as a comment attachment.
1. If you're a GitLab team member or you just want to clone for local inspection:
    1. Install and enable [Git Large File System (LFS)](https://about.gitlab.com/2017/01/30/getting-started-with-git-lfs-tutorial/) through the command line:
        1. Install with [Homebrew](https://github.com/Homebrew/brew) via `brew install git-lfs` or [MacPorts](https://www.macports.org/) via `port install git-lfs`
        1. Enable with `git lfs install` (If you use a [Git GUI client](https://git-scm.com/download/gui/mac) (e.g. Tower) instead of the command line, look in the docs/manual of your app to see how you can install/enable Git LFS)
        1. Check that it’s installed with `git lfs --version`. The output should mention your installed version (e.g. `git-lfs/2.9.0`).
    1. To access the contents inside of this repository you have two options:
        1. Clone this repository locally with `git clone --depth 1 https://gitlab.com/gitlab-org/gitlab-design.git`. Remove `--depth 1` if you want to clone the repository including all history. 
        2. Browse and upload to the repository through the web UI. Please read the [contribution guidelines for community contributors](/CONTRIBUTING.md#for-wider-community-contributors-) for more information.
    1. Refer to the [contribution guidelines](/CONTRIBUTING.md) before contributing.

Git LFS currently tracks the following file extensions on the repository:
`.atype`, `.sketch`, `.psd`, `.zip`, `.jpg`, `.png`, and `.pdf`.
An [archive of the repository before using Git LFS](https://gitlab.com/gitlab-org/gitlab-design-archive)
was created on July 8, 2017.

## Contributing

GitLab is an open source project and we are very happy to accept community
contributions. Please refer to [CONTRIBUTING.md](/CONTRIBUTING.md) for details, ideas, tips and guidelines on how to contribute.

- [Contribution guidelines for wider community contributors 🍓](https://gitlab.com/gitlab-org/gitlab-design/blob/master/CONTRIBUTING.md#for-wider-community-contributors-)
- [Contribution guidelines for GitLab team members 🦊](https://gitlab.com/gitlab-org/gitlab-design/blob/master/CONTRIBUTING.md#work-on-personal-files)

## Contacts

Filter by the **UX** department on our [team page](https://about.gitlab.com/team/).

## Links

- [UX Handbook][ux-handbook]
- [UX Designer Onboarding](https://about.gitlab.com/handbook/engineering/ux/uxdesigner-onboarding/)
- [GitLab Design System](https://design.gitlab.com)
- [GitLab Design System Project](https://gitlab.com/gitlab-org/gitlab-services/design.gitlab.com)
- [Gitlab Research Project](https://gitlab.com/gitlab-org/ux-research)
- [GitLab First Look](https://about.gitlab.com/community/gitlab-first-look/index.html)
- [GitLab Dribbble](https://dribbble.com/gitlab)
- [UX Guide **(deprecated)**](https://docs.gitlab.com/ce/development/ux_guide/)

## License

The GitLab Sketch UI Kit is distributed under the MIT license, see the
[LICENSE](/LICENSE) for details.

[ux-handbook]: https://about.gitlab.com/handbook/engineering/ux/
