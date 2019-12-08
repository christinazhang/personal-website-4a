<template>
  <div id="container">
    <navBar v-bind:white="navBarInHeader" />
    <div id="header">
      <img id="headerImg" src="../assets/work/ray-tracer/images/header.png" />
      <img id="primitivesImg" src="../assets/work/ray-tracer/images/primitives.png" />
      <div id="headerText">
        <h1>Animal Crossing: Ray Tracer</h1>
        <h3>CS488: Introduction to Computer Graphics Final Project</h3>
      </div>
    </div>
    <div id="content">
      <markdown filePath="work/ray-tracer/writeup/1-Intro"></markdown>
      <imageGallery :imagesData="imagesData.Primitives" />
      <markdown filePath="work/ray-tracer/writeup/2-ExtraPrimitives"></markdown>
      <imageGallery :imagesData="imagesData.Refraction" />
      <markdown filePath="work/ray-tracer/writeup/3-Refraction"></markdown>
      <imageGallery :imagesData="imagesData.AntiAliasing" />
      <markdown filePath="work/ray-tracer/writeup/4-AntiAliasing"></markdown>
      <imageGallery :imagesData="imagesData.DepthOfField" />
      <markdown filePath="work/ray-tracer/writeup/5-DepthOfField"></markdown>
      <imageGallery :imagesData="imagesData.SoftShadows" :initialIndex="2" />
      <markdown filePath="work/ray-tracer/writeup/6-SoftShadows"></markdown>
      <imageGallery :imagesData="imagesData.Phong" :initialIndex="1" />
      <markdown filePath="work/ray-tracer/writeup/7-PhongShading"></markdown>
      <imageGallery :imagesData="imagesData.CelShading" :initialIndex="1" />
      <markdown filePath="work/ray-tracer/writeup/8-CelShading"></markdown>
      <imageGallery :imagesData="imagesData.TextureMapping" />
      <markdown filePath="work/ray-tracer/writeup/9-TextureMapping"></markdown>
      <imageGallery :imagesData="imagesData.BumpMapping" />
      <markdown filePath="work/ray-tracer/writeup/10-BumpMapping"></markdown>
      <imageGallery :imagesData="imagesData.FinalScene" />
      <markdown filePath="work/ray-tracer/writeup/11-FinalScene"></markdown>
      <markdown filePath="work/ray-tracer/writeup/12-Acknowledgements"></markdown>
    </div>
  </div>
</template>

<script>
import NavBar from "../components/NavBar";
import MarkdownLoader from "../components/MarkdownLoader";
import ImageGallery from "../components/ImageGallery";
import * as ImagesData from "../assets/work/ray-tracer/writeup/ImageData";

const maxScrollY = 410;

export default {
  components: {
    navBar: NavBar,
    markdown: MarkdownLoader,
    imageGallery: ImageGallery
  },
  data() {
    return {
      imagesData: ImagesData,
      navBarInHeader: true
    };
  },
  methods: {
    // Change styling of navbar based on scrollY position
    onScroll() {
      this.navBarInHeader = window.top.scrollY < maxScrollY;
    }
  },
  mounted() {
    window.addEventListener("scroll", this.onScroll);
  },
  beforeDestroy() {
    window.removeEventListener("scroll", this.onScroll);
  }
};
</script>

<style scoped lang="scss">
@import url("https://fonts.googleapis.com/css?family=Merriweather:400,700&display=swap");
h1,
h2,
h3 {
  font-weight: bold;
}

h1 {
  font-family: "Merriweather", serif;
}

#container {
  padding-bottom: 10%;
}

#header {
  width: 100%;
  height: 627px;
  position: absolute;
  top: 0;
  text-align: center;
  overflow: hidden;
}

#headerText {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: #fff;
}

#headerImg {
  object-fit: cover;

  @media only screen and (min-width: 1400px) {
    width: 100%;
    max-height: 100%;
    object-fit: fill;
  }
}

#primitivesImg {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

#content {
  margin: 0 auto;
  margin-top: 627px;
  padding: 32px;

  @media only screen and (min-width: 600px) {
    /* For tablets: */
    padding-left: 20%;
    padding-right: 20%;
  }

  @media only screen and (min-width: 768px) {
    /* For desktop: */
    padding-left: 25%;
    padding-right: 25%;
    max-width: 800px;
  }

  &::v-deep h2 {
    font-family: "Merriweather", serif;
  }

  &::v-deep a {
    color: #4fb1b3;
    text-decoration: none;
    transition: 0.2s;

    &:hover {
      color: #7fdcde;
    }
  }

  &::v-deep .katex {
    font-size: 1em;
  }
}
</style>
