<template>
  <div id="notes">
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
      <h1>Lecture Notes</h1>
      <div>{{$route.params.course}}</div>
      <transition-group name="list-complete-demo" tag="div">
        <course
          v-for="course in courses"
          v-bind:key="course"
          v-bind:title="course.title"
          class="list-complete-item"
          v-bind:lectures="course.lectures"
        />
      </transition-group>
    </div>
  </div>
</template>

<script>
import Course from "../components/Course";
export default {
  components: {
    course: Course
  },
  data() {
    return {
      courses: [
        { title: "CS246", lectures: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] },
        { title: "CS341", lectures: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] }
      ]
    };
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
  .list-complete-item {
    transition: all 1s;
  }
  .list-complete-enter, .list-complete-leave-to
/* .list-complete-leave-active below version 2.1.8 */ {
    opacity: 0;
    transform: translateY(30px);
  }
  .list-complete-leave-active {
    position: absolute;
  }
}
</style>