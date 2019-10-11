<template>
  <div>
    <img id="mainImage" :src="imagesData[selectedIndex].src" />
    <div id="thumbnailsContainer" v-if="imagesData.length > 1">
      <thumbnail
        v-for="(imageData, index) in imagesData"
        v-bind:key="index"
        v-bind:src="imageData.src"
        v-bind:desc="imageData.desc"
        v-bind:alt="imageData.alt"
        @click.native="selectedIndex = index"
      />
    </div>
  </div>
</template>

<script>
import Thumbnail from "./ImageThumbnail";

export default {
  props: {
    imagesData: Array,
    initialIndex: { type: Number, default: 0 }
  },
  components: {
    thumbnail: Thumbnail
  },
  data() {
    return { selectedIndex: this.initialIndex };
  }
};
</script>

<style scoped lang="scss">
#mainImage {
  width: 100%;
  border-radius: 3px;
}

#thumbnailsContainer {
  margin-top: 8px;
  display: flex;
  flex-direction: row;
}
</style>