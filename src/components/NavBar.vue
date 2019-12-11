<template>
  <div id="navPositioning" v-bind:class="[white ? {white} : {}]">
    <div class="nav" id="nav">
      <div id="home">
        <router-link to="/" exact>Christina Zhang</router-link>
      </div>
      <div class="nav-right">
        <router-link to="/work">Work</router-link>
        <router-link to="/lecture-notes">Lecture Notes</router-link>
      </div>
    </div>
  </div>
</template>

<script>
const navBarHeight = 64;

export default {
  props: {
    showHome: { type: Boolean, default: true },
    white: { type: Boolean, default: false }
  },
  methods: {
    // Add border bottom or not
    onScroll() {
      var borderBottomStyle = "none";
      if (window.top.scrollY > navBarHeight && !this.white) {
        borderBottomStyle = "1px solid #eee";
      }
      document.getElementById(
        "navPositioning"
      ).style.borderBottom = borderBottomStyle;
    }
  },
  mounted() {
    window.addEventListener("scroll", this.onScroll);
    if (!this.showHome) {
      document.getElementById("home").style.visibility = "hidden";
    }
  },
  beforeDestroy() {
    window.removeEventListener("scroll", this.onScroll);
  }
};
</script>

<style scoped lang="scss">
#navPositioning {
  position: sticky;
  top: 0;
  width: 100%;
  background-color: white;
  z-index: 5;
}

.nav {
  display: flex;
  justify-content: space-between;
  padding: 22px 16px;
  margin: 0 auto;

  @media only screen and (min-width: 768px) {
    /* For desktop: */
    max-width: 1225px;
  }
}

a {
  color: #333;
  font-weight: bold;
  text-decoration: none;
  padding: 2px;
  margin: 6px;

  @media only screen and (min-width: 600px) {
    margin: 14px;
  }

  &.router-link-active {
    color: #6c914d;
    border-bottom: 2px solid;
  }
  &:hover {
    color: #bed7a5;
  }

  transition: 0.2s;
}

#navPositioning.white {
  background-color: rgba(0, 0, 0, 0);
  a {
    color: #fff;
    &.router-link-active {
      color: #fff;
    }
    &:hover {
      color: #dbfffd;
    }
  }
}
</style>