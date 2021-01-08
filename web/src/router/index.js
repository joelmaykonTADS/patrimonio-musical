import Vue from "vue";
import VueRouter from "vue-router";
import Login from "../views/Login.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Login",
    component: Login,
  },
  {
    path: "/instrumentos",
    name: "Instrumento",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/instrumento"),
  },
  {
    path: "/cadastrar-instrumento",
    name: "InstrumentoRegister",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(
        /* webpackChunkName: "about" */ "../views/instrumento/new/instrumento"
      ),
    props: true,
  },
  {
    path: "/editar-instrumento",
    name: "InstrumentoEdit",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(
        /* webpackChunkName: "about" */ "../views/instrumento/edit/instrumento"
      ),
    props: true,
  },
  {
    path: "/igrejas",
    name: "Igreja",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/igreja"),
  },
  {
    path: "/cadastrar-igreja",
    name: "IgrejaRegister",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(
        /* webpackChunkName: "about" */ "../views/igreja/new/igreja"
      ),
    props: true,
  },
  {
    path: "/editar-igreja",
    name: "IgrejaEdit",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(
        /* webpackChunkName: "about" */ "../views/igreja/edit/igreja"
      ),
    props: true,
  },
  {
    path: "/irmaos",
    name: "Irmao",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/irmao"),
  },
  {
    path: "/cadastrar-irmao",
    name: "IrmaoRegister",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(
        /* webpackChunkName: "about" */ "../views/irmao/new/irmao"
      ),
    props: true,
  },
  {
    path: "/editar-irmao",
    name: "IrmaoEdit",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(
        /* webpackChunkName: "about" */ "../views/irmao/edit/irmao"
      ),
    props: true,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
