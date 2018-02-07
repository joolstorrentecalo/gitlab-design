![Symbols illustration](images/symbols-illustration.png)

# Slack symbol overrides

GitLab Elements takes advantage of nexted symbols and overrides to make updating components as easy as possible. We’ve built out symbols using visual cues that help identify when and where a component can be overriden. Common override scenarios include changing a component’s state or color.

## State, color, and text overrides

There are multiple different types of overrides that can be applied to symbols. Symbols that do not utilize Relabel Button can utilize overrides to quickly switch between states, colors, text, and more.
 
For an example of a symbol that uses multiple types of overrides, see our Label + Input symbol:

![Symbol overrides](images/symbol-overrides.png)

## Building [components](https://gitlab.com/gitlab-org/gitlab-design/tree/master/doc/component-structure.md) using overrides

**Atoms** are turned into *symbols* so that they can utilize overrides. **Molecules** are often made up of multiple *atom symbols*. **Organisms**, however, are not turned into symbols and are instead kept as *groups* containing symbols (atoms or molecules) and other layers. This allows designers to easily manipulate organisms for their designs, as well as find and use overrides for each symbol easily.
    
In order to make applying overrides easy, follow these guidelines:
    
↪

When an override is nested under another override, preface the label with  ↪. This will make it easy to visually see that the override will apply to the override above it. A common example of this is text within an input or the color of an icon.

💡

When an override changes the state of the component, preface the label with 💡. This will make it easy to visually see that the override will apply a state change. A common example of this is when applying a hover or active state to a component.

🎨

When an override changes the color of the component, preface the label with 🎨. This will make it easy to visually see that the override will apply a color change. A common example of this is changing the color of a background or icon.

