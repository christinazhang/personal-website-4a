<template>
  <vue-markdown :source="text"></vue-markdown>
</template>

<script>
import VueMarkdown from "vue-markdown";

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
    importFilePath: function() {
      import("../assets/" + this.filePath + ".md").then(
        file => (this.text = file.default)
      );
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
