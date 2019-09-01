<template>
  <vue-markdown :source="text"></vue-markdown>
</template>

<script>
import VueMarkdown from "vue-markdown";
// import Intro from "../assets/work/ray-tracer/writeup/Intro.md";

export default {
  props: {
    filePath: String
  },
  data() {
    return {
      text: ""
    };
  },
  mounted() {
    import("../" + this.filePath + ".md").then(
      file => (this.text = file.default)
    );
  },
  components: {
    "vue-markdown": VueMarkdown
  }
};
</script>