# Contribution guidelines

- [Contribute to GitLab](#contribute-to-gitlab)
- [For wider community contributors :strawberry:](#for-wider-community-contributors-)
- [For GitLabbers :fox:](#for-gitlabbers-)
- [Organization](#organization)
  - [Naming](#naming)
  - [Files and folders](#files-and-folders)
- [Sketch :large_orange_diamond:](#sketch-)
- [Commits](#commits)
- [Superpowers :stars:](#superpowers-)
- [Git](#git)
- [Code of conduct](#code-of-conduct)


## Contribute to GitLab

Thank you for your interest in contributing to GitLab. This guide details how
to contribute to GitLab in a way that is efficient for everyone.

Before contributing, get started by following the steps in the [README](/README.md#getting-started)


## For wider community contributors :strawberry:

Everyone can contribute to GitLab. For the wider community members we have a
[special `community-contribution` folder][community-folder] inside of the
[`progress`][progress-folder] directory. This is where you can create and commit your own designs.
This gives you a consistent backup location, which can also be used by other
people to iterate upon your designs.


### Software

The design team uses [Sketch](https://sketchapp.com/), but you can create your designs with any software that's available to you. Just make sure to include editable exports (SVG, PDF, EPS) along with your source files.

If you do not have Sketch, here are some software suggestions:


#### Viewing Sketch files

- GitLab: You can view Sketch files [right from GitLab](https://gitlab.com/gitlab-org/gitlab-design/blob/master/production/resources/gitlab-elements.sketch) (current functionality only displays the last edited page from each file)
- [Sketch-react](https://zjuasmn.github.io/sketch-react/): Web app that supports multiple pages. Admits uploading files and referencing by URL
- [Sketch Web Viewer](https://animaapp.github.io/sketch-web-viewer/): Web app that supports uploaded files


#### Editing Sketch files

- [Figma](https://www.figma.com/): Powerful tool for UX and UI design. It has a web interface as well as desktop apps (internet connection required). It is free for individuals
- [Photopea](https://www.photopea.com/): Free web editor for Sketch, Photoshop and Gimp files. Only editable export format is PSD, which may not be fully compatible for Sketch import


### Occasional contributions

If you want to make occasional contributions, the best option for you will be to upload your files using GitLab.com. Please, follow these steps:

1. [Fork][fork-link] this project to your personal namespace
1. Navigate to the Repository section of your fork and create a branch by clicking on the <kbd>+</kbd> button above the file explorer
1. In the `community-contribution` folder, create your personal folder named after your GitLab.com username (e.g. `@janedoe`)
1. In your personal folder, create folders and add files according to our [organization guidelines](#organization)
1. Commit your changes, following our [commit guidelines](#commits)
1. Create a Merge Request for your branch by clicking on the blue button located in the top-right corner of the page
1. In that new merge request, mention any of the [designers who manage this project](/README.md#contacts)


### Frequent contributions

If you frequently contribute to the GitLab Design project you may want to clone the repository to your computer. Please, follow these steps:

1. [Fork][fork-link] this project and `git clone` its repository locally
1. Create a new branch based off from the master with `git checkout -b your-branch-name`
1. In the [`community-contribution`][community-folder] folder, create your personal folder named after your GitLab.com username (e.g. `@janedoe`)
1. In your personal folder, create folders and files according to our [organization guidelines](#organization)
1. Review the files you are about to commit (with `git status -sb`)
   - Remember, you’re only allowed to add or change files in your folder
   - If you’re having a hard time with this whole Git thing, read our [small help section](#git)
1. Commit your changes, following our [commit guidelines](#commits)
1. Push your changes and [create a merge request](https://gitlab.com/gitlab-org/gitlab-design/merge_requests/new) to merge your branch to `master`
1. In that new merge request, mention any of the [designers who manage this project](/README.md#contacts)


## For GitLabbers :fox:

If you’re working on your personal files:

1. In the [`progress`][progress-folder] folder, create your personal folder named after your first name in lowercase (e.g. `pedro`)
1. In your personal folder, create folders and files according to our [organization guidelines](#organization)
1. If you’re working with Sketch specs created with the [Sketch Measure Plugin][sketch-measure], [Framer prototypes][framer], or static HTML pages, please refer to the [Superpowers](#superpowers-) section
1. Review the files you are about to commit (with `git status -sb`)
   - If you’re having a hard time with this whole Git thing, read our [small help section](#git)
1. Commit and push your changes, following our [commit guidelines](#commits)

If you’re working on files inside of the [`production`][production-folder] folder:

1. [Lock file(s)](http://docs.gitlab.com/ee/user/project/file_lock.html)
1. Pull latest changes from the repository
1. Add your changes
1. Commit and push your changes, following our [commit guidelines](#commits)
1. [Unlock file(s)](http://docs.gitlab.com/ee/user/project/file_lock.html)

## Organization

### Naming

These naming guidelines should be applied to folder and file names, as well as
layers and styles inside of Sketch files.

- Adhere to [BEM naming convention](http://getbem.com/naming/): `block-name__element-name--modifier-name`
- Readability above truncation: `background` instead of `bg`
- `lowercase` everywhere
- Separate words with dashes, `no-spaces`

### Files and folders

```
- archive/
- hosted/
  - [first-name]/
    - [folders]/
- production/
- progress/
    - community-contribution/
        - [@gitlab.com-username]/ (e.g. @janedoe)
          - [team-label]/ (e.g. platform)
            - [subject-labels]/ (e.g. settings)
              - projecthandle#issueID-title.sketch (e.g. ce#1337-awesome-design.sketch)
              - [projecthandle#issue-ID-title]/
                - projecthandle#issueID-title--state-one.sketch
                - projecthandle#issueID-title--state-two.sketch
                  - assets/
                    - asset.svg
    - [gitlabber-first-name]/ (e.g. pedro)
        - [team-label]/ (e.g. platform)
          - [subject-labels]/ (e.g. settings)
            - projecthandle#issueID-title.sketch (e.g. ce#1337-awesome-design.sketch)
            - [projecthandle#issue-ID-title]/
              - projecthandle#issueID-title--state-one.sketch
              - projecthandle#issueID-title--state-two.sketch
                - assets/
                  - asset.svg
```

1. [`archive/`](https://gitlab.com/gitlab-org/gitlab-design/tree/master/archive): Contains all old design files and resources, including those made with [Antetype](http://www.antetype.com/). Old Antetype design files can still be valuable if so see: [Converting Antetype files for use with Sketch](https://gitlab.com/gitlab-org/gitlab-ce/issues/19864)
1. [`hosted/`][hosted-folder]: Contains deliverables that are hosted online and are publicly accessible. Be very careful changing the structure of this folder as it might break external links. For more information, refer to the [Superpowers](#superpowers-) section.
1. [`progress/`][progress-folder]: Contains personal work-in-progress files. It’s assumed that [everything has a related issue][everything-starts-with-an-issue].
   - Personal folders are organized around our [workflow labels](https://gitlab.com/gitlab-org/gitlab-ce/blob/master/CONTRIBUTING.md#workflow-labels)
      - The 1st-level folders are named after the [Team label](https://gitlab.com/gitlab-org/gitlab-ce/blob/master/CONTRIBUTING.md#team-labels-ci-discussion-edge-platform-etc) assigned to the issue/merge request (the green one; except [UX](https://gitlab.com/gitlab-org/gitlab-ce/issues?label_name=UX))
      - The 2nd-level folders are named after [subject labels](https://gitlab.com/gitlab-org/gitlab-ce/blob/master/CONTRIBUTING.md#subject-labels-wiki-container-registry-ldap-api-etc) assigned to the issue/merge request (the blue ones). If there are multiple Subject labels assigned, the folder is named after all labels, in alphabetical order, separated by a dash (e.g. `settings-wiki`).
   - Sketch files are prefixed with the project handle (`ce` for Community Edition and `ee` for Enterprise Edition) and issue ID, separated by `#`. The rest of the name should be a “compact” version of the issue title. For example, the Sketch file for the issue [#28481 Display time tracking totals on milestone page](https://gitlab.com/gitlab-org/gitlab-ce/issues/28481) on the GitLab Community Edition (CE) issue tracker could be named `ce#28481-time-tracking-totals.sketch`.
      - If the work is related to multiple issues, just duplicate the prefix and separate with a dash (e.g. `ce#1234-ee#5678-awesome-design.sketch`). In the Sketch file, each page can be named after an issue (see the [Sketch](#sketch-) section).
      - If you have assets or other files related to the main Sketch file, consider creating an “umbrella” folder to keep everything together. The folder should be named after the issue, following the same pattern as described before (e.g. `ce#1234-awesome-design`).
      - If you think the Sketch file is becoming too complex, consider breaking it down into separate files, suffixing the file names with a double dash modifier (e.g. `ce#1234-awesome-design--anonymous.sketch` and `ce#1234-awesome-design--logged-in.sketch`). Then, create an “umbrella” folder, as described in the previous point. Alternatively, you can organize the Sketch file internally to deal with this complexity (see the [Sketch](#sketch-) section).
   - For more information, refer to the [wider community contributors](#for-wider-community-contributors-) section or [GitLabbers](#for-gitlabbers-) section

## Sketch :large_orange_diamond:

- Use the [Symbol Resizing](https://blog.sketchapp.com/sketch-39-brings-symbol-resizing-and-cloud-beta-a74d3aa0611a#.rcu9qt4er) feature when creating symbols
- Add hidden *full red* (`#FF0000`) blocks for important paddings and margins.
- If you think the file is becoming too complex, consider organizing it with different pages and/or artboards. Use the organization method that best suits you. Pages can be different issues and artboards can be different states, for example. Remember to follow the [naming guidelines](#naming).

## Commits

- Be a good contributor and write a [good commit message](https://chris.beams.io/posts/git-commit/)
- If the changes you’re committing are related to an issue or merge request ([which they should be][everything-starts-with-an-issue]):
   - In the commit message body, reference the project handle (`ce` for Community Edition and `ee` for Enterprise Edition) and issue/merge request ID (e.g. `gitlab-ce#1337` or `ux-research!1337`)
   - If related to multiple issues or merge requests, put each reference on their own line
   - These references create a commit note in the issue/merge request, making it easy for other people to contribute and fork the design (especially important if someone is out-of-office)

## Superpowers :stars:

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
[community-folder]: https://gitlab.com/gitlab-org/gitlab-design/tree/master/progress/community-contribution
[hosted-folder]: https://gitlab.com/gitlab-org/gitlab-design/tree/master/hosted
[production-folder]: https://gitlab.com/gitlab-org/gitlab-design/tree/master/production
[progress-folder]: https://gitlab.com/gitlab-org/gitlab-design/tree/master/progress
[sketch-measure]: https://github.com/utom/sketch-measure
[design-pages]: https://gitlab-org.gitlab.io/gitlab-design
[framer]: https://framer.com
[everything-starts-with-an-issue]: https://about.gitlab.com/handbook/communication/#everything-starts-with-an-issue