# Design Library Demo

## What are the goals of a design system? 

- It should be the SSOT for all design patterns used in the product.
- It should improve the productivity of the designers in their day-to-day design operations.

## Goals of this presentation..

- To share new Sketch workflows with managing large symbol libraries by nesting
- Simplify day-to-day tasks like using the library on a design project with a simple taxonomy, modifier symbols and locked layers.
- Simplify the process of adding a new component to the library with pages
- Make clear component abstractions and simple taxonomies - 1 component 1 purpose
- CI Pipeline features for automatic icon exports
- Sketch Cloud for staying in sync
- Git workflow ideas
	- Gotchas! No conflict resolution.
	- Advantages of a release branch
- Address the question of why we need to move the library to its own repository
- Alternative workflows using Abstract or Figma

## Nested Libraries

[DEMO]

1. `gitlab-base.sketch` – This might contain colors, icons, type related styles, etc.
2. `gitlab-components.sketch` – These might contain the various components listed on design.gitlab.com.
3. `gitlab-views.sketch` – This can be a collection of organisms and larger composition of components that are meant to be detached and used.

- Separation of concerns
- Easier to maintain
- Cascaded updates

## Component Abstraction

- Design for extensibility
- 1 component 1 purpose
- Think like a frontend engineer
- Locked Layers

Example:

- Avatar
- Form Fields
- Mini Pipeline

## Simpler Taxonomy

- Ease of use
- Mirror components in the frontend
- Sketch Runner Demo

## Managing Library Additions

- Component addition demo

## Why move to a separate repo

- Separation of concerns
- Keep `gitlab-design` free of commits to the design library
- CI Pipeline for icons using `node-sketch`
- We can explore the possibility of working in branches - `master` can be the branch we actively work on and `production` or `stable` can be a release branch. (Git merges sketch files automatically; except when there is merge conflicts)

## Things I didn’t have time to cover..

- Creating resizable symbols using spacers
- Managing typography using text symbols
