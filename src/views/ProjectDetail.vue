<script setup lang="ts">
import NavBar from "@/components/NavBar.vue";
import { useRoute } from "vue-router";
import { projects } from "../projects";
import { ref, onMounted, useTemplateRef } from "vue";
import { BCarousel, BCarouselSlide } from "bootstrap-vue-next";
import { useLanguage } from "@/composables/useLanguage";
import { useDark } from "@vueuse/core";

const route = useRoute();
const project = projects.find((p) => p.id === route.params.id);

const { language } = useLanguage();

const isDark = useDark();

const imageModules = import.meta.glob("/src/assets/project_images/*/*.webp", {
  eager: false, // Lazy load
  import: "default",
});

const images = ref<string[]>([]);
const loadedImagesCache = ref<{ [key: string]: string[] }>({}); // Cache to store loaded images
const myCarousel = useTemplateRef("project_carousel");

const loadProjectImages = async (project: string) => {
  // If images are already loaded for this project, use the cached version
  if (loadedImagesCache.value[project]) {
    images.value = loadedImagesCache.value[project];
    return; // Skip reloading images if they're already in cache
  }

  const prefix = `/src/assets/project_images/${project}/`;

  // Filter image paths matching the current project
  const filteredEntries = Object.entries(imageModules).filter(([path]) =>
    path.startsWith(prefix),
  );

  // Sort by filename number (assumes filename ends with something like '1.png')
  filteredEntries.sort(([pathA], [pathB]) => {
    const getNumber = (path: string) => {
      // Extract the number from the filename, e.g. '.../3.png' -> 3
      const match = path.match(/(\d+)\.webp$/);
      return match ? parseInt(match[1], 10) : 0;
    };
    return getNumber(pathA) - getNumber(pathB);
  });

  // Dynamically import each filtered image and collect their URLs
  const loadedImages = await Promise.all(
    filteredEntries.map(async ([, importer]) => {
      const module = await importer();
      return module as string;
    }),
  );

  images.value = loadedImages;
  loadedImagesCache.value[project] = loadedImages; // Cache the images for future use
};

// Bind to the image itself so the clickable area is always the image's real
// size, whatever its aspect ratio or max-height constraint happens to be.
const openImageOnClick = (event: MouseEvent) => {
  const img = (event.target as HTMLElement | null)?.closest("img");
  if (img?.src) window.open(img.src, "_blank", "noopener,noreferrer");
};

onMounted(() => {
  if (project) {
    loadProjectImages(project.id);
  }
  const carouselEl = myCarousel.value?.$el;
  if (carouselEl) {
    carouselEl.addEventListener("click", openImageOnClick);
    carouselEl.addEventListener("dragstart", (event) => event.preventDefault());
  }
});
</script>

<template>
  <header>
    <NavBar></NavBar>
  </header>

  <main>
    <transition name="fade" appear>
      <BContainer v-if="project" fluid class="position-relative">
        <BButton
          variant="link"
          :to="{ name: 'Home', params: { lang: language } }"
          class="back-button custom-link"
          :aria-label="language == 'fr' ? 'Retour' : 'Back'"
          @dragstart.prevent
        >
          <i class="bi bi-arrow-left"></i>
        </BButton>
        <div class="d-flex flex-column align-items-center text-center">
          <BRow class="text-center mb-0 project-title-row">
            <BCol md="auto">
              <h2 class="mb-0">{{ project.title }}:</h2>
            </BCol>
            <BCol md="auto">
              <h4 class="mb-0 project_subtitle" v-if="project.subtitle_fr">
                {{
                  language == "fr" ? project.subtitle_fr : project.subtitle_en
                }}
              </h4>
            </BCol>
          </BRow>
          <div class="d-flex align-items-center mb-2"></div>
          <div class="d-flex flex-wrap justify-content-center gap-2 mb-3">
            <BBadge
              class="tech-badge"
              v-for="tech in project.techStack"
              :key="tech"
              pill
            >
              {{ tech }}
            </BBadge>
          </div>
        </div>

        <BCarousel
          ref="project_carousel"
          class="detail_carousel"
          indicators
          controls
          no-animation
          no-touch
          background="transparent"
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
        <p class="project_description">
          {{
            language == "fr" ? project.description_fr : project.description_en
          }}
        </p>

        <div class="project_description">
          <BButton
            variant="link"
            class="custom-link"
            v-if="project.githubLink"
            :href="project.githubLink"
            target="_blank"
            rel="noopener noreferrer"
            >{{ language == "fr" ? "Dépôt GitHub" : "Github Repository" }}
          </BButton>
          <a
            v-if="project.itchioLink"
            :href="project.itchioLink"
            target="_blank"
            rel="noopener noreferrer"
            class="card-link-btn"
            :aria-label="
              language == 'fr' ? 'Voir sur Itch.io' : 'See on Itch.io'
            "
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="30"
              width="30"
              :fill="isDark ? '#FFFFFF' : '#000000'"
              viewBox="0 0 245.371 220.736"
            >
              <path
                d="M31.99 1.365C21.287 7.72.2 31.945 0 38.298v10.516C0 62.144 12.46 73.86 23.773 73.86c13.584 0 24.902-11.258 24.903-24.62 0 13.362 10.93 24.62 24.515 24.62 13.586 0 24.165-11.258 24.165-24.62 0 13.362 11.622 24.62 25.207 24.62h.246c13.586 0 25.208-11.258 25.208-24.62 0 13.362 10.58 24.62 24.164 24.62 13.585 0 24.515-11.258 24.515-24.62 0 13.362 11.32 24.62 24.903 24.62 11.313 0 23.773-11.714 23.773-25.046V38.298c-.2-6.354-21.287-30.58-31.988-36.933C180.118.197 157.056-.005 122.685 0c-34.37.003-81.228.54-90.697 1.365zm65.194 66.217a28.025 28.025 0 0 1-4.78 6.155c-5.128 5.014-12.157 8.122-19.906 8.122a28.482 28.482 0 0 1-19.948-8.126c-1.858-1.82-3.27-3.766-4.563-6.032l-.006.004c-1.292 2.27-3.092 4.215-4.954 6.037a28.5 28.5 0 0 1-19.948 8.12c-.934 0-1.906-.258-2.692-.528-1.092 11.372-1.553 22.24-1.716 30.164l-.002.045c-.02 4.024-.04 7.333-.06 11.93.21 23.86-2.363 77.334 10.52 90.473 19.964 4.655 56.7 6.775 93.555 6.788h.006c36.854-.013 73.59-2.133 93.554-6.788 12.883-13.14 10.31-66.614 10.52-90.474-.022-4.596-.04-7.905-.06-11.93l-.003-.045c-.162-7.926-.623-18.793-1.715-30.165-.786.27-1.757.528-2.692.528a28.5 28.5 0 0 1-19.948-8.12c-1.862-1.822-3.662-3.766-4.955-6.037l-.006-.004c-1.294 2.266-2.705 4.213-4.563 6.032a28.48 28.48 0 0 1-19.947 8.125c-7.748 0-14.778-3.11-19.906-8.123a28.025 28.025 0 0 1-4.78-6.155 27.99 27.99 0 0 1-4.736 6.155 28.49 28.49 0 0 1-19.95 8.124c-.27 0-.54-.012-.81-.02h-.007c-.27.008-.54.02-.813.02a28.49 28.49 0 0 1-19.95-8.123 27.992 27.992 0 0 1-4.736-6.155zm-20.486 26.49l-.002.01h.015c8.113.017 15.32 0 24.25 9.746 7.028-.737 14.372-1.105 21.722-1.094h.006c7.35-.01 14.694.357 21.723 1.094 8.93-9.747 16.137-9.73 24.25-9.746h.014l-.002-.01c3.833 0 19.166 0 29.85 30.007L210 165.244c8.504 30.624-2.723 31.373-16.727 31.4-20.768-.773-32.267-15.855-32.267-30.935-11.496 1.884-24.907 2.826-38.318 2.827h-.006c-13.412 0-26.823-.943-38.318-2.827 0 15.08-11.5 30.162-32.267 30.935-14.004-.027-25.23-.775-16.726-31.4L46.85 124.08C57.534 94.073 72.867 94.073 76.7 94.073zm45.985 23.582v.006c-.02.02-21.863 20.08-25.79 27.215l14.304-.573v12.474c0 .584 5.74.346 11.486.08h.006c5.744.266 11.485.504 11.485-.08v-12.474l14.304.573c-3.928-7.135-25.79-27.215-25.79-27.215v-.006l-.003.002z"
              />
            </svg>
          </a>
          <BButton
            variant="link"
            class="custom-link"
            v-if="project.directLink"
            :href="project.directLink"
            target="_blank"
            rel="noopener noreferrer"
            >{{ language == "fr" ? "Lien direct" : "Direct link" }}
          </BButton>
        </div>
      </BContainer>

      <div v-else>
        <p>Project not found.</p>
      </div>
    </transition>
  </main>
</template>

<style scoped>
.back-button {
  position: absolute;
  top: 0.2rem;
  left: 1.5rem;
  padding: 0;
  text-decoration: none;
  -webkit-user-drag: none;
  user-select: none;
}

.back-button .bi-arrow-left {
  font-size: 1.75rem;
  line-height: 1;
}

.project-title-row {
  display: flex;
  align-items: baseline;
  margin-bottom: 0.5rem !important;
}

.project-title-row h2,
.project-title-row h4 {
  font-weight: 400;
}

.project_subtitle {
  opacity: 70%;
}

.project_description {
  text-align: center;
  max-width: 50rem;
  margin: 3rem auto 0 auto;
}

.carousel {
  height: min(60vh, 60vw);
  max-width: 80rem;
  margin-inline: auto;
}

.tech-badge {
  background-color: rgb(179, 33, 52) !important;
  box-shadow: 0px 0px 4px rgba(179, 33, 52, 0.5);
}

.tech-badge:hover {
  transform: scale(1.1);
  -webkit-transform: scale(1.1);
  -moz-transform: scale(1.1);
  -o-transform: scale(1.1);
  -ms-transform: scale(1.1);
}
</style>
