import { createRouter, createWebHistory } from "vue-router";

import Home from "../views/Home.vue";
import ProjectDetail from "../views/ProjectDetail.vue";
import { detectBrowserLanguage, isLanguage } from "../composables/useLanguage";

const routes = [
  {
    path: "/:lang(fr|en)?",
    name: "Home",
    component: Home,
  },
  {
    path: "/:lang(fr|en)?/projects/:id",
    name: "ProjectDetail",
    component: ProjectDetail,
  },
  {
    path: "/:pathMatch(.*)*",
    redirect: "/",
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

// URLs without a language prefix (/ or /projects/:id) are redirected to the
// language detected in the browser: French browsers get /fr/, everyone else /en/.
router.beforeEach((to) => {
  const lang = Array.isArray(to.params.lang) ? to.params.lang[0] : to.params.lang;

  if (isLanguage(lang) || !to.name) return true;

  return {
    name: to.name,
    params: { ...to.params, lang: detectBrowserLanguage() },
    query: to.query,
    hash: to.hash,
    replace: true,
  };
});

export default router;
