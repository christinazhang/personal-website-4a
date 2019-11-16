<template>
  <div id="notes">
    <div class="navPositioning">
      <div class="nav">
        <router-link to="/" exact>Christina Zhang</router-link>
        <div class="nav-right">
          <router-link to="/work">Work</router-link>
          <router-link to="/notes">Lecture Notes</router-link>
        </div>
      </div>
    </div>
    <div id="content">
      <div id="courseList">
        <course
          v-for="(course, index) in courses"
          v-bind:key="index"
          v-bind:title="course.title"
          class="list-complete-item"
          v-bind:lectures="course.lectures"
        />
      </div>
      <hr class="divider" />
      <div id="lectureNote">
        <markdown v-if="currentFilePath" id="markdown" v-bind:filePath="currentFilePath"></markdown>
      </div>
    </div>
  </div>
</template>

<script>
import Course from "../components/Course";
import MarkdownLoader from "../components/MarkdownLoader";

export default {
  components: {
    markdown: MarkdownLoader,
    course: Course
  },
  data() {
    return {
      courses: [
        { title: "CS246", lectures: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12] },
        {
          title: "CS341",
          lectures: [
            1,
            2,
            3,
            4,
            5,
            6,
            7,
            8,
            9,
            10,
            11,
            12,
            13,
            14,
            15,
            16,
            17,
            18,
            19,
            20,
            21,
            22,
            23,
            24
          ]
        }
      ],
      currentFilePath: ""
    };
  },
  methods: {
    setCurrentFilePath: function(val) {
      if (val.params.course && val.params.lecture) {
        this.currentFilePath =
          "notes/" + val.params.course + "/lecture-" + val.params.lecture;
      } else {
        this.currentFilePath = "";
      }
    }
  },
  created: function() {
    this.setCurrentFilePath(this.$route);
  },
  watch: {
    $route(val) {
      this.setCurrentFilePath(val);
    }
  }
};
</script>

<style scoped lang="scss">
#content {
  margin: 0 auto;
  padding: 32px;
  display: flex;
  flex-wrap: wrap;

  @media only screen and (min-width: 768px) {
    /* For desktop: */
    flex-wrap: nowrap;
    max-width: 1225px;
  }
}

#courseList {
  flex: 0 0 auto;
  min-width: 120px;
  margin: 24px;
  .course {
    &:not(:first-child) {
      margin-top: 8px;
    }
  }
}

.divider {
  border: 1px solid #888;
  margin: 0 24px;
  width: 100%;
  @media only screen and (min-width: 768px) {
    margin: 24px 0px;
    width: auto;
  }
}

#lectureNote {
  flex: 1 1;
  max-width: 100%;
  margin: 24px;

  @media only screen and (min-width: 768px) {
    margin: 24px 0px 24px 48px;
    width: auto;
  }
}
</style>