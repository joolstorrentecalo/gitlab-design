# Pattern library

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->


- [Plugins](#plugins)
- [Structure](#structure)
  - [Atoms](#atoms)
  - [Molecules](#molecules)
  - [Organisms](#organisms)
    - [Atomic design example](#atomic-design-example)
- [Symbols](#symbols)
  - [Overrides](#overrides)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Plugins

Before getting started with the pattern library, install [Brand.ai](https://brand.ai/sketch)
and the [other recommended plugins](/CONTRIBUTING.md#plugins). Brand.ai is a hosted library that syncs
symbols and styles across files. Within the plugin you will find colors, text
styles, shared styles, icons, components, and artboards to help quickly create
mockups. If an element changes, simply push the change to the library and watch
it sync across files. [Browse our pattern library on Brand.ai](https://brand.ai/git-lab/primary-brand)

![Brand.ai’s plugin window in Sketch](images/brandai.png)


## Structure

We use the [atomic design methodology](http://bradfrost.com/blog/post/atomic-web-design/)
to break components down into different levels. Within our [pattern library][pattern-library-file]
we separate them using atoms, molecules, and organisms.

When building components, apply [constraints](https://www.sketchapp.com/docs/layer-basics/constraints/)
to all the layers in symbols and groups.

### Atoms

Atoms are the smallest [_symbols_](#symbols), the building blocks that cannot
be broken down further. They consist of what would be HTML tags, including forms,
labels, inputs, icons, and buttons. Generally, atoms should live as global
components to be reused elsewhere.

### Molecules

Molecules are [_symbols_](#symbols) containing atoms. Besides atoms, they can
also have regular layers. They form functional components and are the basis of
the design system.

### Organisms

Organisms are _groups_ containing atoms and molecules. Besides these symbols,
they can also have regular layers. These help shape the final design of the
interface. By building organisms from atoms and molecules, we encourage
assembling reusable components. This allows designers to manipulate organisms
for their designs, as well as find and use [symbol overrides](#overrides).

#### Atomic design example

The issuable sidebar breaks down components using the atomic methodology. The
collapsed sidebar uses labels and icons as atoms. When put together, we create
the organism from two types of molecules: _icon tabs_ and _icon + label tabs_.

![Atomic design example with atoms, molecules, and organism](images/atomic-design.png)


## Symbols

Our [pattern library][pattern-library-file] takes advantage of [symbols](https://www.sketchapp.com/docs/symbols/),
[nested symbols](https://www.sketchapp.com/docs/symbols/nested-symbols/), and
[overrides](https://www.sketchapp.com/docs/symbols/editing-symbols/#overrides)
to make updating components as easy as possible. Symbols can use overrides to
switch between states, colors, text, and more. For an example of a symbol that
uses various types of overrides, look at our _Label + Input_ symbol:

![Label + Input symbol with its overrides panel in Sketch](images/symbol-overrides.png)

### Overrides

We’ve built out symbols using visual cues that show when and where a component
can be overridden. To make overrides visually distinctive, follow these guidelines:

↪

When an override is nested under another override, preface the layer name with
↪. This will make it easy to see that the override will apply to the override
above it. A common example of this is text within an input or the color of an icon.

💡

When an override changes the state of the component, preface the layer name with
💡. This will make it easy to see that the override will apply a state change.
A common example of this is when applying a hover or active state to a component.

🎨

When an override changes the color of the component, preface the layer name with
🎨. This will make it easy to see that the override will apply a color change.
A common example of this is changing the color of a background or icon.

[pattern-library-file]: /gitlab-pattern-library.sketch
