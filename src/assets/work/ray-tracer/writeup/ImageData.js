export const Primitives = [
  {
    src: require("@/assets/work/ray-tracer/images/primitives.gif"),
    alt: "An animation of a cone and a cylinder, rotating back and forth",
    desc: []
  }
];

export const AntiAliasing = [
  {
    src: require("@/assets/work/ray-tracer/images/anti-alias-none.png"),
    alt: "Isabelle from Animal Crossing cheering, with jagged edges",
    desc: ["No anti-aliasing"]
  },

  {
    src: require("@/assets/work/ray-tracer/images/anti-alias.png"),
    alt: "Isabelle from Animal Crossing cheering, with smooth edges",
    desc: ["Anti-aliased edges"]
  },

  {
    src: require("@/assets/work/ray-tracer/images/anti-alias-highlight-edges.png"),
    alt:
      "Isabelle from Animal Crossing cheering, with edges highlighted in red",
    desc: ["Edges highlighted"]
  },

  {
    src: require("@/assets/work/ray-tracer/images/adaptive-anti-alias.png"),
    alt: "Isabelle from Animal Crossing cheering, with smooth edges",
    desc: ["Adaptively anti-aliased"]
  }
];

export const Refraction = [
  {
    src: require("@/assets/work/ray-tracer/images/refraction-water.png"),
    alt:
      "Render of a cylinder with a straw in it, showing the effect of refraction",
    desc: ["Cylinder", "η = 1.5"]
  },
  {
    src: require("@/assets/work/ray-tracer/images/refraction-water-sphere.png"),
    alt:
      "Render of a sphere with a straw through it, showing the effect of refraction",
    desc: ["Sphere", "η = 1.5"]
  },
  {
    src: require("@/assets/work/ray-tracer/images/refraction-glass-sphere.png"),
    alt:
      "Render of a sphere with a straw through it, showing the effect of refraction",
    desc: ["Sphere", "η = 1.33"]
  }
];

export const DepthOfField = [
  {
    src: require("@/assets/work/ray-tracer/images/depth-of-field1.png"),
    alt: "Three bags of bells, with the one closest to the viewer in focus",
    desc: ["Apeture size: 0.3", "Focal length: 3", "16 rays shot"]
  },

  {
    src: require("@/assets/work/ray-tracer/images/depth-of-field2.png"),
    alt: "Three bags of bells, with the center one in focus",
    desc: ["Apeture size: 0.3", "Focal length: 5", "25 rays shot"]
  }
];

export const SoftShadows = [
  {
    src: require("@/assets/work/ray-tracer/images/soft-shadows-none.png"),
    alt: "A hovering present, with only an umbra",
    desc: ["Point light"]
  },

  {
    src: require("@/assets/work/ray-tracer/images/soft-shadows-1.png"),
    alt: "A hovering present with preumbra and umbra",
    desc: ["Area light", "16 rays shot"]
  },

  {
    src: require("@/assets/work/ray-tracer/images/soft-shadows-2.png"),
    alt: "A hovering present with preumbra and umbra",
    desc: ["Area light", "64 rays shot"]
  }
];

export const Phong = [
  {
    src: require("@/assets/work/ray-tracer/images/phong-none.png"),
    alt: "Isabelle and a cow, with every polygon visible due to flat shading",
    desc: ["No phong shading"]
  },

  {
    src: require("@/assets/work/ray-tracer/images/phong.png"),
    alt: "Isabelle and a cow, with smooth shading due to Phong shading",
    desc: ["Phong shading"]
  }
];

export const CelShading = [
  {
    src: require("@/assets/work/ray-tracer/images/recreate-smash.png"),
    alt: "Isabelle looking surprised in front of the desk at town hall",
    desc: ["No cel shading"]
  },

  {
    src: require("@/assets/work/ray-tracer/images/recreate-smash-cel.png"),
    alt:
      "Isabelle looking surprised in front of the desk at town hall, with toon shading",
    desc: ["Cel shading"]
  }
];

export const TextureMapping = [
  {
    src: require("@/assets/work/ray-tracer/images/texture-map2.png"),
    alt: "Three ice cream cones",
    desc: ["Primitives"]
  },
  {
    src: require("@/assets/work/ray-tracer/images/texture-map-mesh.png"),
    alt: "UV maps for the face and torso",
    desc: ["UV unwrapping for meshes"]
  }
];

export const BumpMapping = [
  {
    src: require("@/assets/work/ray-tracer/images/bump-map.gif"),
    alt:
      "An animation of a tin can of corrugated metal, the light source moving back and forth",
    desc: []
  }
];

export const FinalScene = [
  {
    src: require("@/assets/work/ray-tracer/images/sketch.png"),
    alt: "Black-and-white sketch of Isabelle asleep in town hall",
    desc: ["Original sketch"]
  },
  {
    src: require("@/assets/work/ray-tracer/images/blender.png"),
    alt: "Screenshot of blender interface",
    desc: ["Modelled in Blender"]
  },
  {
    src: require("@/assets/work/ray-tracer/images/final-scene.png"),
    alt: "Isabelle asleep at her desk in town hall",
    desc: ["Final scene"]
  }
];
