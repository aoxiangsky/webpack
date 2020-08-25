import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const router = new VueRouter({
    mode: "history",
    base: "",
    routes:[
      {
        path: "/",
        name: "Home",
        component: () =>
          import(/* webpackChunkName: "Home" */ "@/views/layout/index.vue"),
        children:[
          {
            path: "/article-list",
            name: "ArticleList",
            component: () =>
              import(/* webpackChunkName: "ArticleList" */ "@/views/article-list/index.vue")
          },
          {
            path: "/test",
            name: "Test",
            component: () =>
              import(/* webpackChunkName: "Test" */ "@/views/test/index.vue")
          },
        ]
      },
    ]
  });

export default router;
