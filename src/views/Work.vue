<template>
  <div id="work">
    <navBar />
    <div id="content">
      <div class="row">
        <imageRouterLink
          to="https://visier.com"
          class="col-lg-4 col-xs-12"
          title="Personal Website (4A)"
          backgroundSrc="http://via.placeholder.com/150"
        />
        <imageRouterLink
          to="/work/ray-tracer"
          class="col-lg-8 col-xs-12"
          title="Animal Crossing: Ray Tracer"
          desc="CS488 Final Project"
          :backgroundSrc="require('@/assets/work/images/ray-tracer0.png')"
        />
        <imageRouterLink
          to="https://visier.com"
          class="col-lg-4 col-xs-12"
          title="Visier People"
          desc="iOS Developer"
          backgroundSrc="http://via.placeholder.com/150"
        />
        <imageRouterLink
          to="https://devpost.com/software/qard"
          class="col-lg-4 col-xs-12"
          title="QaRd"
          desc="nwHacks 2019"
          backgroundSrc="http://via.placeholder.com/150"
        />
        <imageRouterLink
          to="https://devpost.com/software/sayfezone"
          class="col-lg-4 col-xs-12"
          title="SayfeZone"
          desc="HackWestern V"
          :backgroundSrc="require('@/assets/work/images/ray-tracer0.png')"
        />
        <imageRouterLink
          to="https://devpost.com/software/hack-the-north-2018-9oexmy"
          class="col-lg-6 col-xs-12"
          title="Hack the North Simulator"
          desc="Hack the North 2018"
          backgroundSrc="http://via.placeholder.com/150"
        />
        <imageRouterLink
          to="https://devpost.com/software/what-s-it"
          class="col-lg-6 col-xs-12"
          title="BridgED"
          desc="HackWestern IV"
          backgroundSrc="http://via.placeholder.com/150"
        />
        <imageRouterLink
          to="https://devpost.com/software/relevant-tag-suggestions"
          class="col-lg-4 col-xs-12"
          title="GiphyGuesser"
          desc="PennApps XVI"
          backgroundSrc="http://via.placeholder.com/150"
        />
        <imageRouterLink
          class="col-lg-4 col-xs-12"
          title="Personal Website (3A)"
          to="https://devpost.com/software/hack-the-north-2018-9oexmy"
          backgroundSrc="http://via.placeholder.com/150"
        />
        <imageRouterLink
          to="https://devpost.com/software/hack-the-north-2018-9oexmy"
          class="col-lg-4 col-xs-12"
          title="Keyboard Simulator"
          backgroundSrc="http://via.placeholder.com/150"
        />
        <imageRouterLink
          to="http://christinazhang.github.io"
          class="col-lg-4 col-xs-12"
          title="Personal Website (2A)"
          backgroundSrc="http://via.placeholder.com/150"
        />
      </div>
    </div>
  </div>
</template>
<script>
import NavBar from "../components/NavBar";
import ImageRouterLink from "../components/ImageRouterLink";

export default {
  components: {
    navBar: NavBar,
    imageRouterLink: ImageRouterLink
  }
};
</script>
<style scoped lang="scss">
@import url("https://fonts.googleapis.com/css?family=Merriweather:400,700&display=swap");
@import url("https://unpkg.com/flexboxgrid2@7.2.1/flexboxgrid2.css");

#content {
  margin: 0 auto;
  padding: 32px;

  @media only screen and (min-width: 600px) {
    /* For tablets: */
    padding-left: 10%;
    padding-right: 10%;
  }

  @media only screen and (min-width: 768px) {
    /* For desktop: */
    max-width: 1000px;
  }
}
</style>