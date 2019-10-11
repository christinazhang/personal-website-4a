<template>
  <div class="home">
    <div class="navPositioning">
      <div class="nav">
        <router-link to="/">Christina Zhang</router-link>
        <div class="nav-right">
          <router-link to="/work">Work</router-link>
          <router-link to="/resume">Resume</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from "@/components/HelloWorld.vue";

export default {
  name: "home"
};
</script>
