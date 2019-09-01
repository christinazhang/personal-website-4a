#

The first primitive anybody implements in a ray tracer is the sphere. Once you have ray-sphere intersection, ray-cone and ray-cylinder follow suit. The approach is very similar - solve the quadratic formula, and determine whether or not an intersection occurred based on the roots. The only points of diversion are the implicit formulas used and end caps. I got the formulas and approach from [Dr. Neil Dodgson's Advanced Graphics and HCI lectures](https://www.cl.cam.ac.uk/teaching/1999/AGraphHCI/SMAG/node2.html), but changed it so that my primitives are aligned to the $y$ axis instead of the $z$ axis.

The animation is made simply from rendering multiple times with slightly varied angles via a for loop in Lua, and then assembled and turned into a GIF in Photoshop.

## Refraction
