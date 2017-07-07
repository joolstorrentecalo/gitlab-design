# Use desktop cursor
document.body.style.cursor = "auto"

# Import file "hierarchy-searchbar-nav"
sketch = Framer.Importer.load("imported/hierarchy-searchbar-nav@1x")

sketch.text_field_focus.opacity = 0
sketch.dropdown.opacity = 0

InputModule = require "input"

input = new InputModule.Input
  setup: true # Change to true when positioning the input so you can see it
  virtualKeyboard: false # Enable or disable virtual keyboard for when viewing on computer
  placeholder: "" # Text visible before the user type
  placeholderColor: "#fff" # Color of the placeholder text
  text: "" # Initial text in the input
  type: "text" # Use any of the available HTML input types. Take into account that on the computer the same keyboard image will appear regarding the type used.
  backgroundColor: "transparent" # e.g. "#ffffff" or "blue"
  fontSize: 15 # Size in px
  lineHeight: 30 # Line height in px
  padding: 10 # Padding in px
  color: "red"

  y: 7 # y position
  x: 345 #80  # x position
  width: 385
  height: 14
  goButton: false # Set true here in order to use "Go" instead of "Return" as button (only works on real devices)

input.style = 
  color: "#aaaaaa"
  


input.on "keyup", ->
    sketch.Placeholder_text.opacity = if @value.length > 4 then 1 else 0
    sketch.scope_project.opacity = if @value.length > 4 then 1 else 0
    input.x = if @value.length > 4 then 345 else 160

input.onFocus ->
	sketch.text_field_focus.opacity = 1
	sketch.dropdown.animate
		opacity: 0
		options:
			curve: Spring(damping: 0.5)
	
input.onBlur ->
# 	sketch.text_field_focus.opacity = 0
# 	sketch.Placeholder_text.opacity = 1
	sketch.Placeholder_text.animate
		opacity: 1
		options:
			curve: Spring(damping: 0.5)
	input.x = 345
# 	sketch.scope_project.opacity = 1
	sketch.scope_project.animate
		opacity: 1
		options:
			curve: Spring(damping: 0.5)
	sketch.text_field_focus.animate
		opacity: 0
		options:
			curve: Spring(damping: 0.5)

sketch.scope_project.onClick ->
	sketch.dropdown.animate
		opacity: 1
		options:
			curve: Spring(damping: 0.5)

sketch.navigation_7.onClick ->
	sketch.dropdown.animate
		opacity: 0
		options:
			curve: Spring(damping: 0.5)
