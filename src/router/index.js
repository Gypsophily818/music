import Vue from "vue";
import VueRouter from "vue-router";
import Recommend from "../views/Recommend.vue";
import Search from "../views/Search.vue";
import SongLists from "../views/SongLists.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Recommend",
    component: Recommend,
    meta: { isShowNav: true },
  },
  {
    path: "/HotTop",
    name: "HotTop",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "HotTop" */ "../views/HotTop.vue"),
    meta: { isShowNav: true },
  },

  {
    path: "/Search",
    name: "Search",
    component: Search,
    meta: { isShowNav: true },
  },
  {
    path: "/SongLists",
    name: "SongLists",
    component: SongLists,
  },
];

const router = new VueRouter({
  routes,
});

export default router;
