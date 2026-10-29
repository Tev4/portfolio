<script setup lang="ts">
import { ref, onMounted, useTemplateRef, nextTick } from "vue";
import { BCarousel, BCarouselSlide } from "bootstrap-vue-next";
import { useDark } from "@vueuse/core";
import { useLanguage } from "@/composables/useLanguage";

const props = defineProps<{
  project: string;
  title?: string;
  directlink?: string;
  github?: string;
  itchio?: string;
}>();

const isDark = useDark();
const { language } = useLanguage();
const isMobile = ref(false);

const imageModules = import.meta.glob("/src/assets/project_images/*/*.webp", {
  eager: false, // Lazy load
  import: "default",
});

const myCarousel = useTemplateRef("project_carousel");

const images = ref<string[]>([]);
const loadedImagesCache = ref<{ [key: string]: string[] }>({}); // Cache to store loaded images

const loadProjectImages = async (project: string) => {
  // If already cached, just use it
  if (loadedImagesCache.value[project]) {
    images.value = loadedImagesCache.value[project];
    return;
  }

  const prefix = `/src/assets/project_images/${project}/`;

  // Filter and sort image paths
  const filteredEntries = Object.entries(imageModules).filter(([path]) =>
    path.startsWith(prefix),
  );
  filteredEntries.sort(([pathA], [pathB]) => {
    const getNumber = (path: string) => {
      const match = path.match(/(\d+)\.webp$/);
      return match ? parseInt(match[1], 10) : 0;
    };
    return getNumber(pathA) - getNumber(pathB);
  });

  if (filteredEntries.length === 0) return;

  // --- Load & Preload the first image immediately ---
  const [firstPath, firstImporter] = filteredEntries[0];
  const firstModule = await firstImporter();
  const firstImageUrl = firstModule as string;

  // Add rel="preload" for the first image
  const preloadLink = document.createElement("link");
  preloadLink.rel = "preload";
  preloadLink.as = "image";
  preloadLink.href = firstImageUrl;
  document.head.appendChild(preloadLink);

  images.value = [firstImageUrl];
  if (isMobile.value) {
    loadedImagesCache.value[project] = [firstImageUrl];
  }

  if (!isMobile.value) {
    // --- Prefetch the remaining images in background ---
    (async () => {
      const remaining = await Promise.all(
        filteredEntries.slice(1).map(async ([, importer]) => {
          const mod = await importer();
          const url = mod as string;

          // Add rel="prefetch" for lazy loading
          const link = document.createElement("link");
          link.rel = "prefetch";
          link.as = "image";
          link.href = url;
          document.head.appendChild(link);

          return url;
        }),
      );

      const all = [firstImageUrl, ...remaining];
      loadedImagesCache.value[project] = all;
      images.value = all; // Update carousel once everything is prefetched
    })();
  }
};

onMounted(async () => {
  isMobile.value = /Mobi|Android/i.test(navigator.userAgent);
  await loadProjectImages(props.project);
  if (!isMobile.value) {
    await nextTick();
    myCarousel.value?.pause();
  }
});

const pause = () => {
  if (!isMobile.value) {
    myCarousel.value?.pause();
  }
};

const resume = () => {
  if (!isMobile.value) {
    myCarousel.value?.resume();
  }
};
</script>

<template>
  <transition name="fade" appear>
    <BCol cols="12" md="6" lg="4" class="mb-4">
      <RouterLink
        :to="{ name: 'ProjectDetail', params: { lang: language, id: project } }"
      >
        <BCard
          :class="{ 'no-hover': isMobile }"
          @mouseenter="!isMobile && resume()"
          @mouseleave="!isMobile && pause()"
        >
          <BCarousel
            :interval="2000"
            :ride="isMobile ? 'carousel' : false"
            ref="project_carousel"
            no-hover-pause
            class="home_carousel"
            :background="isDark ? '#353c42' : 'transparent'"
          >
            <BCarouselSlide
              v-for="(image, index) in images"
              :key="index"
              :img-src="image"
              :img-alt="
                language == 'fr'
                  ? `Image ${index + 1} pour le projet: ${project}`
                  : `Image ${index + 1} for project: ${project}`
              "
            />
          </BCarousel>
          <div
            v-if="title"
            class="position-absolute bottom-0 w-100 bg-light text-center custom-card-title"
          >
            <h4 class="m-0">{{ title }}</h4>
          </div>
          <div v-if="!isMobile" class="card-links">
            <a
              v-if="directlink"
              :href="directlink"
              target="_blank"
              rel="noopener noreferrer"
              class="card-link-btn"
              aria-label="Try it out !"
              @click.stop
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="25"
                width="25"
                fill="#FFFFFF"
                class="bi bi-box-arrow-up-right"
                viewBox="0 0 16 16"
              >
                <path
                  fill-rule="evenodd"
                  d="M8.636 3.5a.5.5 0 0 0-.5-.5H1.5A1.5 1.5 0 0 0 0 4.5v10A1.5 1.5 0 0 0 1.5 16h10a1.5 1.5 0 0 0 1.5-1.5V7.864a.5.5 0 0 0-1 0V14.5a.5.5 0 0 1-.5.5h-10a.5.5 0 0 1-.5-.5v-10a.5.5 0 0 1 .5-.5h6.636a.5.5 0 0 0 .5-.5"
                />
                <path
                  fill-rule="evenodd"
                  d="M16 .5a.5.5 0 0 0-.5-.5h-5a.5.5 0 0 0 0 1h3.793L6.146 9.146a.5.5 0 1 0 .708.708L15 1.707V5.5a.5.5 0 0 0 1 0z"
                />
              </svg>
            </a>
            <a
              v-if="github"
              :href="github"
              target="_blank"
              rel="noopener noreferrer"
              class="card-link-btn"
              aria-label="View on GitHub"
              @click.stop
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="30"
                height="30"
                fill="#FFFFFF"
                class="bi bi-github"
                viewBox="0 0 16 16"
              >
                <path
                  d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8"
                />
              </svg>
            </a>
            <a
              v-if="itchio"
              :href="itchio"
              target="_blank"
              rel="noopener noreferrer"
              class="card-link-btn"
              aria-label="View on Itch.io"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="30"
                width="30"
                fill="#FFFFFF"
                viewBox="0 0 245.371 220.736"
              >
                <path
                  d="M31.99 1.365C21.287 7.72.2 31.945 0 38.298v10.516C0 62.144 12.46 73.86 23.773 73.86c13.584 0 24.902-11.258 24.903-24.62 0 13.362 10.93 24.62 24.515 24.62 13.586 0 24.165-11.258 24.165-24.62 0 13.362 11.622 24.62 25.207 24.62h.246c13.586 0 25.208-11.258 25.208-24.62 0 13.362 10.58 24.62 24.164 24.62 13.585 0 24.515-11.258 24.515-24.62 0 13.362 11.32 24.62 24.903 24.62 11.313 0 23.773-11.714 23.773-25.046V38.298c-.2-6.354-21.287-30.58-31.988-36.933C180.118.197 157.056-.005 122.685 0c-34.37.003-81.228.54-90.697 1.365zm65.194 66.217a28.025 28.025 0 0 1-4.78 6.155c-5.128 5.014-12.157 8.122-19.906 8.122a28.482 28.482 0 0 1-19.948-8.126c-1.858-1.82-3.27-3.766-4.563-6.032l-.006.004c-1.292 2.27-3.092 4.215-4.954 6.037a28.5 28.5 0 0 1-19.948 8.12c-.934 0-1.906-.258-2.692-.528-1.092 11.372-1.553 22.24-1.716 30.164l-.002.045c-.02 4.024-.04 7.333-.06 11.93.21 23.86-2.363 77.334 10.52 90.473 19.964 4.655 56.7 6.775 93.555 6.788h.006c36.854-.013 73.59-2.133 93.554-6.788 12.883-13.14 10.31-66.614 10.52-90.474-.022-4.596-.04-7.905-.06-11.93l-.003-.045c-.162-7.926-.623-18.793-1.715-30.165-.786.27-1.757.528-2.692.528a28.5 28.5 0 0 1-19.948-8.12c-1.862-1.822-3.662-3.766-4.955-6.037l-.006-.004c-1.294 2.266-2.705 4.213-4.563 6.032a28.48 28.48 0 0 1-19.947 8.125c-7.748 0-14.778-3.11-19.906-8.123a28.025 28.025 0 0 1-4.78-6.155 27.99 27.99 0 0 1-4.736 6.155 28.49 28.49 0 0 1-19.95 8.124c-.27 0-.54-.012-.81-.02h-.007c-.27.008-.54.02-.813.02a28.49 28.49 0 0 1-19.95-8.123 27.992 27.992 0 0 1-4.736-6.155zm-20.486 26.49l-.002.01h.015c8.113.017 15.32 0 24.25 9.746 7.028-.737 14.372-1.105 21.722-1.094h.006c7.35-.01 14.694.357 21.723 1.094 8.93-9.747 16.137-9.73 24.25-9.746h.014l-.002-.01c3.833 0 19.166 0 29.85 30.007L210 165.244c8.504 30.624-2.723 31.373-16.727 31.4-20.768-.773-32.267-15.855-32.267-30.935-11.496 1.884-24.907 2.826-38.318 2.827h-.006c-13.412 0-26.823-.943-38.318-2.827 0 15.08-11.5 30.162-32.267 30.935-14.004-.027-25.23-.775-16.726-31.4L46.85 124.08C57.534 94.073 72.867 94.073 76.7 94.073zm45.985 23.582v.006c-.02.02-21.863 20.08-25.79 27.215l14.304-.573v12.474c0 .584 5.74.346 11.486.08h.006c5.744.266 11.485.504 11.485-.08v-12.474l14.304.573c-3.928-7.135-25.79-27.215-25.79-27.215v-.006l-.003.002z"
                />
              </svg>
            </a>
          </div>
        </BCard>
      </RouterLink>
    </BCol>
  </transition>
</template>

<style scoped>
.card {
  --bs-card-spacer-y: 0;
  overflow: hidden;
  border-color: var(--bs-dark);
}

html.dark .card {
  border-color: rgb(150, 150, 150);
}

.card:hover .card-links {
  opacity: 1;
  pointer-events: auto;
}

.custom-card-title {
  right: 0rem;
  padding: 0.2rem;
  background-color: rgba(
    0,
    0,
    0,
    0.4
  ) !important; /* Slightly transparent background */
  backdrop-filter: blur(10px); /* Apply blur to the background */
  color: white;
}

.custom-card-title h4 {
  font-weight: 400;
}

.card-links {
  position: absolute;
  top: 0.3rem;
  right: 0.3rem;
  display: flex;
  gap: 0.4rem;
  z-index: 1;
  border-radius: 10%;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.2s ease;
  -webkit-transition: opacity 0.2s ease;
  -moz-transition: opacity 0.2s ease;
  -o-transition: opacity 0.2s ease;
  -ms-transition: opacity 0.2s ease;
}

.card-link-btn {
  opacity: 80%;
  transition: fill-opacity 0.2s ease;
  -webkit-transition: fill-opacity 0.2s ease;
  -moz-transition: fill-opacity 0.2s ease;
  -o-transition: fill-opacity 0.2s ease;
  -ms-transition: fill-opacity 0.2s ease;
}

.card-link-btn:hover {
  opacity: 100%;
  fill-opacity: 100%;
}

svg {
  filter: drop-shadow(0px 0px 2px #000000);
}
</style>
