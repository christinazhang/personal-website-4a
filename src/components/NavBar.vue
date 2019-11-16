<template>
  <div class="navPositioning" v-bind:class="[white ? {white} : {}]">
    <div class="nav" id="nav">
      <div id="home">
        <router-link to="/" exact>Christina Zhang</router-link>
      </div>
      <div class="nav-right">
        <router-link to="/work">Work</router-link>
        <router-link to="/notes">Lecture Notes</router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    showHome: { type: Boolean, default: true },
    white: { type: Boolean, default: false }
  },
  mounted: function() {
    if (!this.showHome) {
      document.getElementById("home").style.visibility = "hidden";
    }
  }
};
</script>

<style scoped lang="scss">
.navPositioning {
  position: absolute;
  top: 0;
  width: 100%;
}

.nav {
  display: flex;
  justify-content: space-between;
  padding: 16px;
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

  -o-transition: 0.2s;
  -ms-transition: 0.2s;
  -moz-transition: 0.2s;
  -webkit-transition: 0.2s;
  transition: 0.2s;
}

.navPositioning.white a {
  color: #fff;
  &.router-link-active {
    color: #fff;
  }
  &:hover {
    color: #dbfffd;
  }
}
</style>