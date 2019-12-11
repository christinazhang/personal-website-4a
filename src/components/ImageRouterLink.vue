<template>
  <div id="container">
    <div id="inset">
      <router-link v-if="!isExternalLink" :to="to">
        <div class="centeringContainer">
          <div id="text">
            <span id="title">{{title}}</span>
            <span v-if="desc" id="desc">{{desc}}</span>
          </div>
        </div>
        <div class="background zoom" :style="style" />
      </router-link>
      <a v-else :href="to" target="_blank">
        <div class="centeringContainer">
          <div id="text">
            <span id="title">{{title}}</span>
            <span v-if="desc" id="desc">{{desc}}</span>
          </div>
        </div>
        <div class="background zoom" :style="style" />
      </a>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: String,
    desc: String,
    backgroundSrc: String,
    to: { type: String, default: "" }
  },
  computed: {
    isExternalLink() {
      return this.to.includes("http");
    },
    style() {
      return "background-image:url(" + this.backgroundSrc + ");";
    }
  }
};
</script>

<style scoped lang="scss">
@import url("https://fonts.googleapis.com/css?family=Merriweather:400,700&display=swap");
#container {
  height: 350px;
  margin-bottom: 16px;
}

.centeringContainer {
  display: flex;
  justify-content: center;
  align-items: center;

  width: 100%;
  height: 100%;
}

#inset {
  width: 100%;
  height: 100%;
  position: relative;
  margin: 2px;
  border-radius: 3px;
  overflow: hidden;
  background-color: #333;

  a {
    text-decoration: none;
  }
}

#text {
  // Prevent zooming out on text hover
  pointer-events: none;

  // Text
  color: #fff;
  text-align: center;
  text-shadow: 0px 0px 5px rgba(0, 0, 0, 0.9);

  z-index: 1;
  padding-top: 8px;
  padding-bottom: 8px;

  #title {
    padding: 0px 8px;
    display: block;
    font-family: "Merriweather", serif;
    font-size: 1.5em;
    font-weight: 700;
  }
  #desc {
    padding: 0px 8px;
    font-weight: 700;
    font-size: 1.1em;
  }
}

.background {
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
  object-fit: cover;
}

.zoom {
  transition: 0.35s;
  &:hover {
    transform: scale(1.1);
  }
}
</style>