#

I added a new class to house area lights such that I could still use a point light in my renders if I wanted to. For a point light shadow ray, the ray direction is always the light's position subtracted by the intersection point. For an area light, the light position is obtained by calculating a random point on the area light.

During this project, it was so hot in Waterloo that I sometimes stared at my own shadow and wondered if the sun was bright enough to be considered a point light. Good thing the graphics lab was always freezing cold!

## Phong Shading
