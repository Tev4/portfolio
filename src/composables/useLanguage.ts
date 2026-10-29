import { computed } from "vue";
import { useRoute, useRouter } from "vue-router";

export type Language = "fr" | "en";

export const isLanguage = (value: unknown): value is Language =>
  value === "fr" || value === "en";

/**
 * Returns the language to use when the URL does not specify one.
 * French (any regional variant) is kept, every other language falls back to English.
 */
export const detectBrowserLanguage = (): Language => {
  if (typeof navigator === "undefined") return "en";

  const preferences = navigator.languages?.length
    ? navigator.languages
    : [navigator.language];

  for (const preference of preferences) {
    const tag = preference?.toLowerCase() ?? "";
    if (tag.startsWith("fr")) return "fr";
    if (tag.startsWith("en")) return "en";
  }

  return "en";
};

/**
 * The current language comes from the URL (`/fr/...` or `/en/...`).
 * `changeLanguage` navigates to the same page with the other language prefix,
 * so the URL always reflects what is displayed and stays shareable.
 */
export const useLanguage = () => {
  const route = useRoute();
  const router = useRouter();

  const language = computed<Language>(() => {
    const routeLanguage = Array.isArray(route.params.lang)
      ? route.params.lang[0]
      : route.params.lang;

    return isLanguage(routeLanguage) ? routeLanguage : detectBrowserLanguage();
  });

  const changeLanguage = (lang: Language) => {
    if (lang === language.value) return;

    router.push({
      name: typeof route.name === "string" ? route.name : "Home",
      params: { ...route.params, lang },
      query: route.query,
      hash: route.hash,
    });
  };

  return { language, changeLanguage };
};
