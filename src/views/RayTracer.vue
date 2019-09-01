<template>
  <div id="container">
    <div id="header">
      <img id="headerImg" src="../assets/work/ray-tracer/images/header.png" />
      <img id="primitivesImg" src="../assets/work/ray-tracer/images/primitives.png" />
      <div id="headerText">
        <h1>Animal Crossing: Ray Tracer</h1>
        <h3>CS488: Introduction to Computer Graphics Final Project</h3>
      </div>
    </div>
    <div id="navup">
      <div id="nav">
        <router-link to="/">Christina Zhang</router-link>
        <div id="nav-right">
          <router-link to="/work">Work</router-link>
          <router-link to="/resume">Resume</router-link>
        </div>
      </div>
    </div>
    <div id="content">
      <markdown filePath="assets/work/ray-tracer/writeup/1-Intro"></markdown>
      <markdown filePath="assets/work/ray-tracer/writeup/2-ExtraPrimitives"></markdown>
      <markdown filePath="assets/work/ray-tracer/writeup/3-Refraction"></markdown>
      <markdown filePath="assets/work/ray-tracer/writeup/4-AntiAliasing"></markdown>
      <markdown filePath="assets/work/ray-tracer/writeup/5-DepthOfField"></markdown>
      <markdown filePath="assets/work/ray-tracer/writeup/6-SoftShadows"></markdown>
      <markdown filePath="assets/work/ray-tracer/writeup/7-PhongShading"></markdown>
      <markdown filePath="assets/work/ray-tracer/writeup/8-CelShading"></markdown>
      <markdown filePath="assets/work/ray-tracer/writeup/9-TextureMapping"></markdown>
      <markdown filePath="assets/work/ray-tracer/writeup/10-BumpMapping"></markdown>
      <markdown filePath="assets/work/ray-tracer/writeup/11-FinalScene"></markdown>
      <markdown filePath="assets/work/ray-tracer/writeup/12-Acknowledgements"></markdown>
    </div>
  </div>
</template>

<script>
import MarkdownLoader from "../components/MarkdownLoader";
export default {
  components: {
    markdown: MarkdownLoader
  }
};
</script>

<style scoped lang="scss">
@import url("https://fonts.googleapis.com/css?family=Arvo:700&display=swap");
h1,
h2,
h3 {
  font-weight: bold;
}

h1 {
  font-family: "Arvo", serif;
}

#container {
  padding-bottom: 10%;
}

#header {
  width: 100%;
  height: 627px;
  position: relative;
  text-align: center;
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

#navup {
  position: absolute;
  top: 0;
  width: 100%;
}

#nav {
  position: relative;
  padding: 16px;
  margin: 0 auto;

  @media only screen and (min-width: 768px) {
    /* For desktop: */
    max-width: 1225px;
  }

  #nav-left {
    position: absolute;
    top: 0;
    left: 0;

    width: 50%;
  }
  #nav-right {
    float: right;
  }
  a {
    font-weight: bold;
    color: #fff;
    &.router-link-exact-active {
      color: #42b983;
    }
    padding: 8px;
    text-decoration: none;
  }
}

#content {
  margin: 0 auto;
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