#

My original objective was just to implement texture mapping for all primitives (cone, sphere, cube, and cylinder) - three of which you can see in the first image. I really wanted to be able to texture map meshes for my final scene, but to stay safe I only specified primitives. I had a contingency plan in case I ran out of time or couldn't figure it out - for Assignment 3 we had no texture mapping, but I still made a face by creating super thin meshes that fit over the surface via Blender's Boolean modifier.

Luckily, having implemented Phong shading and texture mapping for primitives beforehand made texture mapping meshes easily doable. You can mark seams and unwrap UVs directly in Blender (the harsh line across Isabelle's face is due to a UV seam), and the texture coordinates can be found in the OBJ file export:

```Wavefront
vt u v
```

And the texture reference number for each face is as previously mentioned. Like in Phong shading, Barycentric interpolation is used to determine what point on the texture map will be used for the diffuse colour of the surface.

## Bump Mapping
