# Import file "27724-large-build-logs" (sizes and positions are scaled 1:4)
sketch = Framer.Importer.load("imported/27724-large-build-logs@4x")


opacitylevel1 = 1
opacitylevel2 = .25
timevar = .3

animationA0 = new Animation sketch.top,
	opacity: opacitylevel2
	options:
		time: timevar
# 		curve: Bezier.linear
animationB0 = animationA0.reverse()

animationA1 = new Animation sketch.middle,
	opacity: opacitylevel2
	options:
		time: timevar
# 		curve: Bezier.linear
animationB1 = animationA1.reverse()

animationA2 = new Animation sketch.bottom,
	opacity: opacitylevel2
	options:
		time: timevar
# 		curve: Bezier.linear
animationB2 = animationA2.reverse()


animationA0.start()
animationA0.on Events.AnimationEnd, animationB0.start
animationA0.on Events.AnimationEnd, animationA1.start
# animationB0.on Events.AnimationEnd, animationA1.start

animationA1.on Events.AnimationEnd, animationB1.start
animationA1.on Events.AnimationEnd, animationA2.start
# animationB1.on Events.AnimationEnd, animationA2.start

animationA2.on Events.AnimationEnd, animationB2.start
animationA2.on Events.AnimationEnd, animationA0.start
# animationB2.on Events.AnimationEnd, animationA0.start