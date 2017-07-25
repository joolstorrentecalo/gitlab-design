# GitLab Design

:information_source: **This project is primarily used by [GitLab’s UX team][ux-handbook]
to host design files and hand them off for implementation. To get help or
raise a bug/feature proposal for GitLab, please create an issue on the
[GitLab Community Edition issue tracker](https://gitlab.com/gitlab-org/gitlab-ce/issues)
or [GitLab Enterprise Edition issue tracker](https://gitlab.com/gitlab-org/gitlab-ee/issues),
or see [Getting help for GitLab](https://about.gitlab.com/getting-help/) on our
website for the many options to get help.**

![gitlab-cover-image](https://gitlab.com/gitlab-org/gitlab-design/raw/master/gitlab-cover-image.jpg)

- **[Browse prototypes and specs :arrow_upper_right:][design-pages]**

<!-- Table of contents generated with DocToc: https://github.com/thlorenz/doctoc -->
<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->


- [About](#about)
  - [Goals](#goals)
- [Getting started](#getting-started)
- [Contributing](#contributing)
- [Contacts](#contacts)
- [Links](#links)
- [License](#license)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## About

**GitLab’s open source design library, prototypes and work-in-progress files.**

This project is primarily used by [GitLab’s UX team][ux-handbook] to host design
files and hand them off for implementation. To learn about the best
practices to manage this project, including the repository’s organization,
check out the [contribution guidelines](/CONTRIBUTING.md). For more information
about the UX team, check out the [Links](#links) section.

### Goals

- Jumpstart design work by using the design library and previous work
- Enable frequent, stable, and consistent contributions
- Make GitLab’s design open, transparent, and open source
- Facilitate design handoffs and design–development communication design handoffs.

## Getting started

**If you’re a GitLab Inc. engineer**: you shouldn’t have to clone this project,
ever. Instead, ask the UX designer for the specs of the designs you’re working with.

**If you want to browse and contribute**:

1. Have a Mac with [Sketch](https://www.sketchapp.com/) installed, as most of the repository is made of Sketch files
1. Install and enable [Git Large File System (LFS)](https://about.gitlab.com/2017/01/30/getting-started-with-git-lfs-tutorial/):
   1. Install with [Homebrew](https://github.com/Homebrew/brew) via `brew install git-lfs` or [MacPorts](https://www.macports.org/) via `port install git-lfs`
   1. Enable with `git lfs install`
   - If you use a [Git GUI client](https://git-scm.com/download/gui/mac) (e.g. Tower) instead of the command line, look in the docs/manual of your app to see how you can install/enable Git LFS
1. Refer to the [contribution guidelines](/CONTRIBUTING.md) before contributing

Git LFS currently tracks the following file extensions on the repository:
`.atype`, `.sketch`, `.psd`, `.zip`, `.jpg`, `.png`, and `.pdf`.
An [archive of the repository before using Git LFS](https://gitlab.com/gitlab-org/gitlab-design-archive)
was created on July 8, 2017.

## Contributing

GitLab is an open source project and we are very happy to accept community
contributions. Please refer to [CONTRIBUTING.md](/CONTRIBUTING.md) for details.

## Contacts

Search for `UX` on the [team page](https://about.gitlab.com/team) on our website.

## Links

- [UX Guide](https://docs.gitlab.com/ce/development/ux_guide/)
- [UX Handbook][ux-handbook]
- [UX Designer Onboarding](https://about.gitlab.com/handbook/uxdesigner-onboarding/)
- [GitLab Dribbble](https://dribbble.com/gitlab)

## License

The GitLab Design Kit is distributed under the MIT license, see the [LICENSE](/LICENSE)
for details.

[design-pages]: https://gitlab-org.gitlab.io/gitlab-design
[ux-handbook]: https://about.gitlab.com/handbook/ux/
