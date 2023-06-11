import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import AboutView from "../views/AboutView.vue";
import Products from "../views/Products.vue";
import Product from "../views/Product.vue";
import Payment from "../views/Payment.vue";
import SignIn from "../views/UserPages/SignIn.vue";
import SignUp from "../views/UserPages/SignUp.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/about",
    name: "about",
    component: AboutView,
  },
  {
    path: "/Products",
    name: "products",
    component: Products,
  },
  {
    path: "/Products/:id",
    name: "product",
    component: Product,
    props: true,
  },
  {
    path: "/payment",
    name: "payment",
    component: Payment,
    props: true,
  },
  {
    path: "/signin",
    name: "signin",
    component: SignIn,
  },
  {
    path: "/signup",
    name: "signup",
    component: SignUp,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
