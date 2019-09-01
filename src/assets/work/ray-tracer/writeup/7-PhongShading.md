#

In an OBJ file, vertex normals are specified by a line that has the form:

```Wavefront
vn i j k
```

where {`i, j, k`} are the coordinates of the vertex normal. For a face, the vertex data looks like:

```Wavefront
f v1/vt1/vn1 v2/vt2/vn2 v3/vt3/vn3
```

where `v#/vt#/vn#` are the reference numbers for the vertex, vertex texture, and vertex normals, respectively.

If the OBJ file has no vertex normals (such as the cow that was provided for us in Assignment 4), then vertex normals are generated.

If Phong shading is turned on, then the normal is determined via Barycentric interpolation of the 3 vertex normals defined for that face, instead of the two edge vectors of the face.

## Cel Shading
