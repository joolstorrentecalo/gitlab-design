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
- [Figma for GitLab](#figma-for-gitlab)
  - [Why Figma?](#why-figma)
  - [Library structure](#library-structure)
- [Code of conduct](#code-of-conduct)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Contribute to GitLab

Thank you for your interest in contributing to GitLab. This guide details how
to contribute to GitLab in a way that is efficient for everyone.

## Figma for GitLab

### Why Figma?

We’ve been drawn to Figma because it aligns with our *everyone can contribute* mantra. Figma’s free version is full-featured (outside of what you may get from Team or Organization accounts), and you can use it on nearly any platform/device. File management and sharing is a breeze without the need for a repository. Commenting and sharing is seamless and does not require additional tools or paid accounts to participate. All of these capabilities make it easier for anyone to contribute.

### Working with Projects in Figma

1. Group files and assets under a design team, project, or common theme.
1. Use a single project for each stage and follow this naming structure: `Stage • [stageName] • [groupName]`
1. Use the [Templates](https://www.figma.com/files/project/5846042/Templates) and [Resources](https://www.figma.com/files/project/4507772/Resources) projects for files that are beneficial to all designers.
1. Add a description to a project that clarifies its purpose and use.
1. Mark a project as a “favorite” to have it appear in the sidebar. Drag projects in the sidebar to reorder them to your preference.
1. Use the [Share option](https://help.figma.com/hc/en-us/articles/360040531773-Share-Files-with-anyone-using-Link-Sharing) to change [permissions](https://help.figma.com/hc/en-us/articles/360039970673) at a project level.

Personal projects can be created as needed, but to support our [collaboration](https://about.gitlab.com/handbook/values/#collaboration) and [transparency](https://about.gitlab.com/handbook/values/#transparency) values, as well as discoverability, it’s recommended to work in an open project.

TODO: Add visual examples for project organization

### Working with team libraries

A team library contains **components** and **styles** that can be used and synced across files. A team library can speed up design time, and increase consistency across designs.

By default, files created under the GitLab team in Figma will have the **Pajamas UI Kit** library enabled.

1. Access the libraries modal under the **Assets** tab with the **Team Library** button.
1. In the list of available libraries, if the current file is published, it will be separate from libraries that can be enabled.
1. Once a library has been enabled, you can use components under the **Assets** tab. They will be grouped locally, and then by library. Drag an asset from the panel to use it in your design.
1. Styles are available in the right Properties panel after selecting an object.

[Learn more about Team Libraries](https://help.figma.com/hc/en-us/articles/360041051154-Getting-Started-with-Team-Library)

TODO: Add visual examples for team libraries

### Adding descriptions, notes, and annotations

There are three primary ways within Figma to add descriptive, helper content for components and design assets.

1. Layer
   * Audience: designers and users of the design file
   * Use text layers for headings to categorize variants and instances.
   * Use the Utility/Sticky component to add a visible note in relation to the design. There are plugins that do similar, but we don’t want to rely on them staying up-to-date. Notes like these should be temporary in nature, and not need to persist.
2. Comment
   * Audience: everyone
   * Use comments to engage with others in a conversation about the design. These conversations can be resolved and will persist as part of the history of the design file.
   * Use comments for annotations on instances, where descriptions are not possible.
   * Use comments when the intended audience may not have edit permissions, since component descriptions are limited to editors at the point of use. This would be beneficial for developer handoff.
3. Component description
   * Audience: designers who are referencing or using final components in new designs
   * Use descriptions to identify the purpose and intended use of the component.
   * Consider using keywords in the description as meta for search. e.g., “Keywords: wrench, tool, admin” used for a wrench icon that is used to represent admin in the product.
   * Consider mentioning where the component is used in the product, or for what purpose.
   * Include usage notes that are applicable at the point of use.
   * Keep descriptions short, when possible.

### Collaboration using Figma and GitLab

We use our own product, and that means [dogfooding](https://about.gitlab.com/handbook/values/#dogfooding) features, like [Design Management](https://docs.gitlab.com/ee/user/project/issues/design_management.html). As can be inferred from the previous section, much of the conversation around a design happens within the context of that design. So the question now is when to use GitLab’s Design Management, and when to use Figma.

In this table, you’ll find a few common scenarios along with the recommended tool. Mileage may vary, so use this as a starting point, and when in doubt make the best decision that moves the design forward with visibility that supports the needs of the team. Design Management is currently an alpha feature, so keep in mind that it is subject to change without notice, but the more we use and contribute to it, the more it will progress.

| **Scenario** | **Figma** | **Design Management** |
| ------ | ------ | ------ |
| Co-designing within a shared file | √ |   |
| Providing, or seeking feedback while a design is still in progress, and not ready for MVC | √ |   |
| Seeking feedback on a design with a larger audience, where that feedback directly impacts an issue |   | √ |
| Presenting design options or variations so the team can choose a direction |   | √ |
| Sharing a prototype | √ |   |
| Adding a to-do for a designer as it relates to in-progress design | √ |   |
| Adding a to-do for a designer as it relates to an issue |   | √ |
| Identifying visual regressions |   | √ |
| Detailed redlines or specs | √ |   |

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

This Code of Conduct is adapted from the [Contributor Covenant](http://contributor-covenant.org),
version 1.1.0, available at [http://contributor-covenant.org/version/1/1/0/](http://contributor-covenant.org/version/1/1/0/).

[component-template]: https://www.figma.com/file/OmvFfWkqEsdGhXAND133ou/Component-template?node-id=0%3A1
[contributing]: /CONTRIBUTING.md
[figma-article-layout-grid]: https://www.figma.com/blog/everything-you-need-to-know-about-layout-grids-in-figma/
[figma-docs-auto-layout]: https://help.figma.com/article/453-auto-layout
[figma-docs-constraints]: https://help.figma.com/article/54-constraints
[figma-docs-drafts]: https://help.figma.com/hc/en-us/articles/360041543473#drafts
[figma-pilot-epic]: https://gitlab.com/groups/gitlab-org/-/epics/2334
[handbook-transparency]: https://about.gitlab.com/handbook/values/#transparency
[issue-tracker]: https://gitlab.com/gitlab-org/gitlab/issues
[new-issue]: https://gitlab.com/gitlab-org/gitlab-design/issues/new
[pajamas]: https://design.gitlab.com/
[sketch-docs]: /doc/sketch-ui-kit.md
[sketch-figma-plugins]: https://gitlab.com/groups/gitlab-org/-/epics/2334#evaluate-sketchfigma-plugin-libraries
[team-profile]: https://www.figma.com/@GitLab
