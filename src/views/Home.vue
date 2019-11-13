<template>
  <div>
    <div class="navPositioning">
      <div class="nav">
        <div class="nav-right">
          <router-link to="/work">Work</router-link>
          <router-link to="/notes">Lecture Notes</router-link>
        </div>
      </div>
    </div>
    <div id="blurb">
      <h1>Christina Zhang</h1>
      <p>
        Hi there! I’m a fourth year Computer Science + HCI student at the University of Waterloo.
        <br />
        <br />I dabble in a lot of things, mainly related to programming, art, and design.
      </p>
      <div id="contact">
        <a href="http://github.com/christinazhang">
          <i class="icon-github" />
        </a>
        <a href="http://linkedin.com/in/christinaszhang">
          <i class="icon-linkedin" />
        </a>
        <a href="http://devpost.com/christinazhang">
          <i class="icon-devpost" />
        </a>
        <a href="mailto:christina.s.zhang@euwaterloo.ca">
          <i class="icon-mail" />
        </a>
      </div>
    </div>
    <div id="flowers">
      <img src="../assets/flowers.svg" />
    </div>
  </div>
</template>

<script>
export default {
  name: "home"
};
</script>

<style scoped lang="scss">
#flowers {
  width: 100%;
  overflow: hidden;
  text-align: center;
  position: absolute;
  bottom: 0;
  z-index: -1;
}

#blurb {
  margin: 0 auto;
  margin-top: 100px;
  padding: 32px;
  background-color: rgba(255, 255, 255, 0.75);
  border-radius: 3px;

  @media only screen and (min-width: 600px) {
    /* For tablets: */
    padding-left: 20%;
    padding-right: 20%;
  }

  @media only screen and (min-width: 768px) {
    /* For desktop: */
    padding-left: 25%;
    padding-right: 25%;
    max-width: 475px;
  }
}

#contact {
  text-align: center;
  a,
  a:visited {
    margin: 8px;
    color: #333; //#8aae6b;
    text-decoration: none;
    &:hover {
      color: #bed7a5;
    }

    -o-transition: 0.2s;
    -ms-transition: 0.2s;
    -moz-transition: 0.2s;
    -webkit-transition: 0.2s;
    transition: 0.2s;
  }
}
</style>