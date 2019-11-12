<template>
  <div id="app">
    <router-view id="router" />
  </div>
</template>

<style lang="scss">
@import url("https://fonts.googleapis.com/css?family=Source+Sans+Pro:400,400i,700,700i&display=swap");
body {
  margin: 0;
}

#app {
  font-family: "Source Sans Pro", "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #333;
}

.navPositioning {
  position: absolute;
  top: 0;
  width: 100%;
}

.nav {
  position: relative;
  padding: 16px;
  margin: 0 auto;

  @media only screen and (min-width: 768px) {
    /* For desktop: */
    max-width: 1225px;
  }

  .nav-left {
    position: absolute;
    top: 0;
    left: 0;

    width: 50%;
  }
  .nav-right {
    float: right;
  }
  a {
    color: #333;
    font-weight: bold;
    &.router-link-exact-active {
      color: #42b983;
    }
    padding: 8px;
    margin: 10px;
    text-decoration: none;
  }
}
</style>
