import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/about",
    name: "about",
    component: () => import('../views/AboutView.vue')
  },
  {
    path: "/Products",
    name: "products",
    component: () => import('../views/Products.vue')
  },
  {
    path: "/Products/:id",
    name: "product",
    component: () => import('../views/Product.vue'),
    props: true,
  },
  {
    path: "/payment",
    name: "payment",
    component: () => import('../views/Payment.vue'),
    props: true,
  },
  {
    path: "/signin",
    name: "signin",
    component: () => import('../views/UserPages/SignIn.vue'),
  },
  {
    path: "/signup",
    name: "signup",
    component: () => import('../views/UserPages/SignUp.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
