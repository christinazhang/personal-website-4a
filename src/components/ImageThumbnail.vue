<template>
  <div class="thumbnail" @mouseenter="hover=true" @mouseleave="hover=false">
    <img :src="src" :alt="alt" />
    <div v-if="hover" class="imageDescription">
      <p v-for="(line, index) in desc" v-bind:key="index">{{line}}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    src: String,
    desc: Array,
    alt: { type: String, default: "" }
  },
  data() {
    return { hover: false };
  }
};
</script>

<style scoped lang="scss">
.thumbnail {
  position: relative;
  flex: 1 0 0;
  background-color: #333;
  min-height: 150px;
  overflow: hidden;
  border-radius: 3px;

  margin-left: 14px;
  &:first-child {
    margin-left: 0px;
  }

  &:hover {
    cursor: pointer;
    img {
      opacity: 0.2;
    }
  }

  .imageDescription {
    color: #fff;
    font-weight: 700;
    text-shadow: 0px 0px 2px black;

    position: absolute;
    text-align: center;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    p {
      margin: 0;
    }
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: none;
    object-position: center;

    transition: 0.2s;
  }
}
</style>