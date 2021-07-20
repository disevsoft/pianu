import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import MainForm from "../views/MainForm.vue";
import StartForm from "../views/StartForm.vue";
import MainConfigForm from "../views/MainConfigForm.vue";
import LoginForm from "../views/LoginForm.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Welcome",
    component: StartForm,
  },
  {
    path: "/config",
    name: "Configurator",
    component: MainConfigForm,
  },
  {
    path: "/App",
    name: "App",
    component: MainForm,
  },
  {
    path: "/login",
    name: "login",
    component: LoginForm,
  },
  
  {
    path: "/:pathMatch(.*)*",
    redirect: "/",
  },

  // {
  //   path: "/about",
  //   name: "About",
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () =>
  //     import(/* webpackChunkName: "about" */ "../views/About.vue"),
  // },

];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  // redirect to login page if not logged in and trying to access a restricted page
  const publicPages = ['/login', '/'];
  const authRequired = !publicPages.includes(to.path);
  const loggedIn = localStorage.getItem('user');

  if (authRequired && !loggedIn) {
    return next('/login');
  }

  next();
})

export default router;
