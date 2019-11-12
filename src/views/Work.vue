<template>
  <div id="work">
    <div class="navPositioning">
      <div class="nav">
        <router-link to="/">Christina Zhang</router-link>
        <div class="nav-right">
          <router-link to="/work">Work</router-link>
          <router-link to="/notes">Lecture Notes</router-link>
        </div>
      </div>
    </div>
    <div id="content">
      <h1>Work</h1>
      <router-link to="/work/ray-tracer">Ray Tracer</router-link>
    </div>
  </div>
</template>

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