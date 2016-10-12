# Project Info
# This info is presented in a widget when you share.
# http://framerjs.com/docs/#info.info

Framer.Info =
	title: ""
	author: "Dimitrie Hoekstra"
	twitter: ""
	description: ""


# Import file "runningicons"
sketch = Framer.Importer.load("imported/runningicons@1x")

childrenLayers = sketch.Group.children

for i in childrenLayers
    rotateAnim = new Animation
        layer: i
        properties:
            rotationZ: 360
        curve: "linear"
        time: 4
        repeat: 5
    rotateAnim.start() # kick if off once
#     rotateAnim.on "end", ->
#         i.rotationZ = 0
#         rotateAnim.start()