<template>
  <div class="course">
    <span class="title" v-on:click="expanded = !expanded">
      {{title}}
      <i v-if="expanded" class="icon-angle-up" />
      <i v-if="!expanded" class="icon-angle-down" />
    </span>
    <transition name="fade">
      <ul v-if="expanded">
        <li v-for="lecture in lectures" v-bind:key="lecture">Lecture {{lecture}}</li>
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
  padding-left: 18px;
}
li {
  padding-top: 8px;
  list-style-type: none;
}
.fade-enter-active,
.fade-leave-active {
  transition: all 0.3s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>
