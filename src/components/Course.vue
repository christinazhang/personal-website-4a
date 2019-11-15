<template>
  <div class="course">
    <span class="title" v-on:click="expanded = !expanded">
      {{title}}
      <i v-show="expanded" class="icon-angle-up" />
      <i v-show="!expanded" class="icon-angle-down" />
    </span>
    <transition name="slide">
      <ul v-show="expanded">
        <li v-for="lecture in lectures" v-bind:key="lecture">
          <router-link v-bind:to="'/notes/' + title + '/' + lecture">Lecture {{lecture}}</router-link>
        </li>
      </ul>
    </transition>
  </div>
</template>

<script>
export default {
  props: {
    title: String,
    lectures: Array
  },
  data() {
    return { expanded: false };
  }
};
</script>

<style scoped lang="scss">
.title {
  font-weight: bold;
  font-size: 18px;
  cursor: pointer;
}
ul {
  font-weight: 600;
  font-size: 16px;
  margin-top: 0;
  padding-left: 30px;
}
li {
  padding-top: 8px;
  list-style-type: none;
  a {
    text-decoration: none;
    color: #333;
    &.router-link-exact-active {
      color: #6c914d;
      border-bottom: 2px solid;
    }
    &:hover {
      color: #bed7a5;
    }

    transition: 0.2s;
  }
}
.slide-enter-active,
.slide-leave-active {
  max-height: 100vh;
  transition: all 0.5s;
}
.slide-enter,
.slide-leave-to {
  max-height: 0;
  opacity: 0;
}
</style>
