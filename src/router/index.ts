import { createRouter, createWebHistory } from "vue-router";

// Import your views (pages)
import Home from "../views/Home.vue";
import ProjectDetail from "../views/ProjectDetail.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/projects/:id",
    name: "ProjectDetail",
    component: ProjectDetail,
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
