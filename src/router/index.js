import Vue from "vue";
import Router from "vue-router";
import Category from "@/components/category/Category.vue";
import Home from "@/components/home/Home.vue";
import Login from "@/components/login/Login.vue";
import OrderList from "@/components/order/OrderList.vue";
import Product from "@/components/product/Product.vue";
import ProductList from "@/components/product/ProductList.vue";
import Unit from "@/components/unit/Unit.vue";
Vue.use(Router);

export default new Router({
  routes: [
    { path: "/login", component: Login },
    {
      path: "/",
      component: Home,
      children: [
        { path: "", component: OrderList },
        { path: "/category", component: Category },
        { path: "/orderlist", component: OrderList },
        { path: "/productlist", component: ProductList },
        { path: "/productlist/:id", component: Product },
        { path: "/unit", component: Unit },
        { path: "/product", component: Product },
        { path: "/home", component: Home }
      ]
    },
    {
      path: "",
      redirect: "/"
    }
  ],
  mode: "history"
});
