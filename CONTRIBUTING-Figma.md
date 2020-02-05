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

*The following guidelines apply to our [Figma pilot effort][1]. In this effort we’re aiming to have component (symbol) parity with our [Sketch UI Kit][2], along with relevant instances and examples, and create documentation for working within Figma.*

<!-- Table of contents generated with DocToc: https://github.com/thlorenz/doctoc -->
<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->


- [Contribute to GitLab](#contribute-to-gitlab)
- [For contributors to the Figma pilot](#for-contributors-to-the-figma-pilot)
- [Figma for GitLab](#figma-for-gitlab)
  - [Why Figma?](#why-figma)
  - [Document and asset library structure](#document-and-asset-library-structure)
  - [Building components](#building-components)
    - [Base components](#base-components)
    - [Variants](#variants)
    - [Using Constraints](#using-constraints)
    - [Using Auto Layout](#using-auto-layout)
  - [Adding descriptions, notes, and annotations](#adding-descriptions-notes-and-annotations)
  - [Publishing changes](#publishing-changes)
  - [Plugins](#plugins)
  - [Pilot designers](#pilot-designers)
- [Code of conduct](#code-of-conduct)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Contribute to GitLab

Thank you for your interest in contributing to GitLab. This guide details how
to contribute to GitLab in a way that is efficient for everyone.

## For contributors to the Figma pilot

Everyone can contribute to GitLab. For the [Figma pilot effort][1], we accept contributions from wider community members who share a Figma [draft][3] with proposed changes. We also encourage design contributions/improvements to GitLab itself — use its [issue tracker][4] to add your ideas to an existing or new issue.

Follow these steps to contribute changes:

1. [Create an issue][5] (or assign yourself an existing one) for the work you’re doing.
1. Mention _only one_ of the [pilot designers](#pilot-designers).
1. Choose one of the following based on your contribution:
  * For changes in [Figma Globals][6], duplicate the file to your personal drafts.
  * To create a new component, duplicate our [new component template][7] to your personal drafts.
  * For all other changes, create a new file in your personal drafts.
1. Review the [Figma for GitLab](#figma-for-gitlab) section to learn about how we structure and document our work within Figma.
1. Share a link to your draft in the issue.
1. High-five yourself and go brew some coffee while you wait for the review. Thanks!

If you’d like to make contributions to our [Sketch UI Kit][2] (the current source for production design specs), please review the project’s [CONTRIBUTING][8] document.

## Figma for GitLab

### Why Figma?

We’ve been drawn to Figma because it aligns with our *everyone can contribute* mantra. Figma’s free version is full-featured (outside of what you may get from Team or Organization accounts), and you can use it on nearly any platform/device. File management and sharing is a breeze without the need for a repository. Commenting and sharing is seamless and does not require additional tools or paid accounts to participate. All of these capabilities make it easier for anyone to contribute.

### Document and asset library structure

With Figma, components are organized in the asset library by how they are structured and named in the file. The default hierarchy is **File/Page/Frame/Layer**. Depending on the complexity of the component, the slash convention could also be used on the frame. Here’s our working hierarchy for structure and naming, the file name has been left out for brevity:

**Page:** [Component] <br>
**Frame:** [Category], [Group], or “Variants” (“Variants” is the default frame name) <br>
**Layer:** [Breakpoint/Item/Size/State] <br>

* Optional breakpoints (uppercase): XS, SM, MD, LG, XL, breakpoints can also use symbols to indicate range, such as ≥MD or ≤SM
* Optional sizes (lowercase): xs, sm, md, lg, xl, xxl

For both breakpoints and sizes, numerically prefixing the abbreviations correctly orders them in the asset library in a way that helps a user understand hierarchy (see examples below).

Because we’d like to use Figma frames as a single spec, similar to how we output with Sketch Measure today, having common assets within one parent frame is the easiest way to share and incorporate designs into [Pajamas][9], issues, and merge requests, etc.

We aim to keep the hierarchy DRY, and focus on structure specific to component context. If we didn’t put variants within a frame, we could easily keep the naming light, but it’d be at the cost of not having a specific frame to link to as a design spec.

**Examples**

**Page:** Icons <br>
**Frame:** Actions <br>
**Layer:** Export <br>
**Result:** Icons/Actions/Export

**Page:** Alerts <br>
**Frame:** Variants <br>
**Layer:** Danger <br>
**Result:** Alerts/Variants/Danger

**Page:** Pagination <br>
**Frame:** Variants <br>
**Layer:** ≤MD/Truncated <br>
**Result:** Pagination/Variants/≤MD/Truncated

**Page:** Badge <br>
**Frame:** Variants <br>
**Layer:** Info/01 md <br>
**Result:** Badge/Variants/Info/01 md

Buttons are an example of something more complex, not because of the component, but because of the amount of variants. Given that it *may* be ideal to link to one design specs page, we could have something like this:

**Page:** Buttons <br>
**Frame:** Variants <br>
**Layer:** Info/Primary/Default <br>
**Result:** Buttons/Variants/Info/Primary/Default

### Building components

#### Base components

Some components are built from *base* components. Base components provide foundational configuration, structure, or other settings for components to be built from. They are not published to the library. A change to a base component should propagate to any components built from it. In other systems you may see them called primitives, or master components. We chose “base” to indicate a starting place.

#### Variants

A *variant* is the most common form of a component. It is available to use as-is from the asset library, and does not require style overrides, although they may be available. In most cases, the content can be overridden for the context. Variants are often built from a [base component](#base-components), but this isn’t required.

#### Using Constraints

Elements within a component will use constraints when they need to maintain their position relative to the component bounds, or content within. Complex, responsive components can be created by combining frames and layout grids. A tooltip is a good candidate for constraints, so that directional tips can always be placed correctly in relation to the component bounds as the content grows.

[Using constraints →][10]
[Using layout grids →][11]

#### Using Auto Layout

Components with Auto Layout dynamically resize based on the content within. This works well for components that need to maintain padding and spacing. With the current Auto Layout capabilities, a good rule of thumb is to use it when the component grows either vertically or horizontally, but not both. A button is a good candidate for Auto Layout, because it can resize horizontally based on label length and whether or not icons are included.

[Using Auto Layout →][12]

### Adding descriptions, notes, and annotations

There are three primary ways to add descriptive, helper content for components and design assets.

1. **Layer**
  * Audience: designers and users of the design file
  * Use text layers for headings to categorize variants and instances
  * Use the **Utility/Sticky** component to add a visible note in relation to the design. There are plugins that do similar, but we don’t want to rely on them staying up-to-date. Notes like these should be temporary in nature, and not need to persist.
1. **Comment**
  * Audience: everyone
  * Use comments to engage with others in a conversation about the design. These conversations can be resolved and will persist as part of the history of the design file.
  * Use comments for annotations on instances, where descriptions are not possible
  * Use comments when the intended audience may not have edit permissions, since component descriptions are limited to editors at the point of use. This would be beneficial for developer handoff.
1. **Component description**
  * Audience: designers who are referencing or using final components in new designs
  * Use descriptions to identify the purpose and intended use of the component
  * Consider using keywords in the description as meta for search. e.g., “Keywords: wrench, tool, admin” used for a wrench icon that is used to represent admin in the product.
  * Consider mentioning where the component is used in the product, or for what purpose
  * Include usage notes that are applicable at the point of use
  * Keep descriptions short, when possible

### Publishing changes

Figma library updates are available to publish anytime a change has been made, regardless of how minor. To support our [transparency value][13], follow these best practices:

* Changes should be reviewed by another designer in a draft before adding to the Globals file
* Before closing the Globals file, publish your changes so other designs are aware of what’s been changed, and by whom
* Use dashes to list items (no formatting options for the publish message field)

### Plugins

We don’t use plugins for critical actions or capabilities, to avoid making any part of the design process reliant on plugin updates or functionality. Rather, we believe that each user should determine which plugins to use for their own workflow.

That being said, we have put together [a table of plugins][14] we currently use in Sketch, along with options in Figma.

### Pilot designers

If you need help at any time, please reach out to one of the designers working on the pilot.

* [Taurie Davis](https://gitlab.com/tauriedavis)
* [Jeremy Elder](https://gitlab.com/jeremyelder)
* [Pedro Moreira da Silva](https://gitlab.com/pedroms)
* [Andy Volpe](https://gitlab.com/andyvolpe)
* [Libor Vanc](https://gitlab.com/lvanc)

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

This Code of Conduct is adapted from the [Contributor Covenant][15],
version 1.1.0, available at [http://contributor-covenant.org/version/1/1/0/][16].

[1]: https://gitlab.com/groups/gitlab-org/-/epics/2334
[2]: /doc/sketch-ui-kit.md
[3]: https://help.figma.com/hc/en-us/articles/360041543473#drafts
[4]: https://gitlab.com/gitlab-org/gitlab/issues
[5]: https://gitlab.com/gitlab-org/gitlab-design/issues/new
[6]: https://www.figma.com/@GitLab
[7]: https://www.figma.com/file/OmvFfWkqEsdGhXAND133ou/Component-template?node-id=0%3A1
[8]: /CONTRIBUTING.md
[9]: https://design.gitlab.com/
[10]: https://help.figma.com/article/54-constraints
[11]: https://www.figma.com/blog/everything-you-need-to-know-about-layout-grids-in-figma/
[12]: https://help.figma.com/article/453-auto-layout
[13]: https://about.gitlab.com/handbook/values/#transparency
[14]: https://gitlab.com/groups/gitlab-org/-/epics/2334#evaluate-sketchfigma-plugin-libraries
[15]: http://contributor-covenant.org
[16]: http://contributor-covenant.org/version/1/1/0/
