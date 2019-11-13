import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import RayTracer from "./views/RayTracer.vue";
import Notes from "./views/Notes.vue";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      component: Home
    },
    // {
    //   path: "/about",
    //   name: "about",
    //   // route level code-splitting
    //   // this generates a separate chunk (about.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () =>
    //     import(/* webpackChunkName: "about" */ "./views/About.vue")
    // },
    {
      path: "/work",
      component: () => import(/* webpackChunkName: "work" */ "./views/Work.vue")
    },
    {
      path: "/work/ray-tracer",
      component: RayTracer
    },
    {
      path: "/notes",
      component: Notes
    },
    {
      path: "/notes/:course/:lecture",
      component: Notes
    }
  ]
});
