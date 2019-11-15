<template>
  <div id="app">
    <router-view id="router" />
  </div>
</template>

<style lang="scss">
@import url("https://fonts.googleapis.com/css?family=Source+Sans+Pro:400,400i,600,600i,700,700i&display=swap");
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
    color: #333; //#8aae6b;
    font-weight: bold;
    &.router-link-active {
      color: #6c914d;
      border-bottom: 2px solid;
    }
    &:hover {
      color: #bed7a5;
    }
    padding: 2px;
    margin: 14px;
    text-decoration: none;

    -o-transition: 0.2s;
    -ms-transition: 0.2s;
    -moz-transition: 0.2s;
    -webkit-transition: 0.2s;
    transition: 0.2s;
  }
}
</style>
