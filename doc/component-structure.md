# Pattern library structure

We utilize the [atomic design methodology](http://bradfrost.com/blog/post/atomic-web-design/) in order to break components down into different levels. Within our [GitLab Elements](https://gitlab.com/gitlab-org/gitlab-design/blob/master/production/resources/gitlab-elements.sketch) pattern library, we break down our designs using atoms, molecules, and organisms.

## Atoms

Atoms are the smallest building blocks that cannot be broken down further. Atoms comprise of what would be HTML tags, including forms, labels, inputs, icons, and buttons. Generally, atoms should live as global components that can be reused elsewhere.

## Molecules

Molecules are comprised of atoms that are grouped together. They create components that can be functional and are the basis of the design system.

## Organisms

By putting molecules together, we can create organisms. These help shape the final design of the interface and can contain multiple copies of the same molecule, or many different molecules. By building organisms from molecules, we encourage building reusable components.

### Atomic design example

The issuable sidebar breaks down components using the atomic methodology. The collapsed sidebar uses labels and icons as atoms. When put together, we create two types of molecules that make up the organism: icon tabs and icon + label tabs.

![Atomic design example](images/atomic-design.png)
