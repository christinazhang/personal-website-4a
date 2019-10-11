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
  mounted() {
    import("../assets/" + this.filePath + ".md").then(
      file => (this.text = file.default)
    );
  },
  components: {
    "vue-markdown": VueMarkdown
  }
};
</script>
