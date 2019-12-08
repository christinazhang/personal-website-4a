<template>
  <vue-markdown :source="text" v-on:rendered="didRender"></vue-markdown>
</template>

<script>
import VueMarkdown from "vue-markdown";
import "../../public/js/prism";

export default {
  props: {
    filePath: String
  },
  data() {
    return {
      text: ""
    };
  },
  components: {
    "vue-markdown": VueMarkdown
  },
  methods: {
    importFilePath() {
      import("../assets/" + this.filePath + ".md").then(
        file => (this.text = file.default)
      );
    },
    didRender() {
      this.$nextTick(() => {
        Prism.highlightAll();
      });
    }
  },
  mounted() {
    this.importFilePath();
  },
  watch: {
    filePath() {
      this.importFilePath();
    }
  }
};
</script>

<style scoped lang="scss">
@import "../../public/css/prism.css";
</style>