import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import RayTracer from "./views/RayTracer.vue";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "home",
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
      name: "work",
      component: () => import(/* webpackChunkName: "work" */ "./views/Work.vue")
    },
    {
      path: "/work/ray-tracer",
      name: "ray-tracer",
      component: RayTracer
    }
  ]
});
