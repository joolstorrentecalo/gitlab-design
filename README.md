# GitLab Design Kit

Contains all resources and information UX Designers need.

![gitlab-cover-image](https://gitlab.com/gitlab-org/gitlab-design/raw/master/gitlab-cover-image.jpg)

## Get started

1. Copy the `pre-push` file into your `.git/hooks/` folder

*The pre-push hook will auto generate preview images out of your sketch pages*

2. Read on :)

## Repository Organization

- archive
    - oldfiles
- production
    - _assets
        - images
            - img1.jpg
        - svg
            - icn1.svg
    - projects/
        - project.sketch
- progress
    - designername/
        - projects/
            - project.sketch

*[Issue for Repository Organization Discussion](https://gitlab.com/gitlab-org/gitlab-design/issues/12)*

## Commit Workflow

As design files are mostly binary files, merge conflicts can easily get stuck in conflicts. We will do the file merging manually instead of git.

### Personal Folders

1. In the `progress` directory, create your own folder
2. In your own folder, create a subfolder for each issue/project you are working on
3. Commit & Push changes

### Production Folders

1. [Lock file](http://docs.gitlab.com/ee/user/project/file_lock.html)
2. Pull changes
3. Add our changes to the file
4. Commit & Push changes
5. [Unlock](http://docs.gitlab.com/ee/user/project/file_lock.html) file

## Naming Convention
*TODO: We should write a pre-commit hook that checks for this naming convention, both in and outside sketch.*

### Everywhere

- Readability above truncation, so: `background` instead of `bg`
- `lowercase` __everywhere__
- separate words with hyphens, _no-spaces-everywhere__

### Files & Folders

- for each issue create subfolders for issues

### Layers & Groups (inside Sketch)

- Try to adhere to [BEM naming convention](http://getbem.com/naming/) like so: block--element-modifier


*[Issue for Layer/Group Naming Convention Discussion](https://gitlab.com/gitlab-org/gitlab-design/issues/13)*

## Delivery

All designs mockups and details are delivered in the issue that describes the feature/problem/etc. So there is one place to look for everything related to it.

## Designer & Developer Communication

> Designers and developers often have different priorities, even though everyone is working toward one common goal: a fantastic, delightful, functional product. At Google, we're always working on ways to bridge this gap through unified spec formats and tools, so that intricate details are never lost in translation and things get done the way they're intended the first time - [Designer & Developer Communication Google IO 2016](https://www.youtube.com/watch?v=ZFyK1J5NrVk)

When additional detail is needed, developers will ask for this. Take inspiration out of the link above if needed.

## Links

- [UX Designer Onboarding Page](https://about.gitlab.com/handbook/uxdesigner-onboarding/) - [Issue for Discussion](https://gitlab.com/gitlab-com/www-gitlab-com/issues/755)
- [Issue for Design Discussion on Guidelines for UX/UI](https://gitlab.com/gitlab-org/gitlab-ce/issues/18579)
- [UI Development Kit](https://gitlab.com/help/ui)
- [UI Guide for building GitLab](https://gitlab.com/gitlab-org/gitlab-ce/blob/master/doc/development/ui_guide.md)
- [Issue for Repository Organization Discussion](https://gitlab.com/gitlab-org/gitlab-design/issues/12)
- [Issue for Layer/Group Naming Convention Discussion](https://gitlab.com/gitlab-org/gitlab-design/issues/13)
- [GitLab Dribbble](https://dribbble.com/gitlab)

## Design goals

- Get the user started with all already existing materials
- Try to kickstart design work while avoiding time lost on creating the duplicate content
- Let designers contribute in a stable and consistent manner

## License

The GitLab Design Kit is distributed under the MIT license,
see the LICENSE file.
