<template>
  <div id="work">
    <navBar />
    <div id="content">
      <h1>Work</h1>
      <router-link to="/work/ray-tracer">Ray Tracer</router-link>
    </div>
  </div>
</template>
<script>
import NavBar from "../components/NavBar";
export default {
  components: {
    navBar: NavBar
  }
};
</script>
<style scoped lang="scss">
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
}
</style>