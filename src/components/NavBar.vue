<script setup lang="ts">
import { useDark } from "@vueuse/core";
import { useLanguage } from "@/composables/useLanguage";

const isDark = useDark();

const { language, changeLanguage } = useLanguage();
</script>

<template>
  <BNavbar variant="dark" fixed="top" :toggleable="true">
    <BNav class="d-none d-md-flex">
      <BNavText>
        <a
          class="navbar-svg-link"
          href="https://linkedin.com/in/teva-petorin-a6006a204"
          target="_blank"
          rel="noopener noreferrer"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="50"
            height="50"
            fill="#0077B7"
            class="bi bi-linkedin"
            viewBox="0 0 16 16"
          >
            <path
              d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854zm4.943 12.248V6.169H2.542v7.225zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248S2.4 3.226 2.4 3.934c0 .694.521 1.248 1.327 1.248zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016l.016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225z"
            />
          </svg>
        </a>
      </BNavText>
      <BNavText>
        <a
          class="navbar-svg-link"
          href="https://github.com/Tev4"
          target="_blank"
          rel="noopener noreferrer"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="50"
            height="50"
            fill="#ffffff"
            class="bi bi-github"
            viewBox="0 0 16 16"
          >
            <path
              d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8"
            />
          </svg>
        </a>
      </BNavText>
    </BNav>

    <BNavbarBrand class="navbar-dark navbarbrand-button-style">
      <RouterLink
        :to="{ name: 'Home', params: { lang: language } }"
        class="no-link-style"
      >
        <h2 class="fw-bold">Teva PETORIN</h2>
      </RouterLink>
    </BNavbarBrand>

    <BNavbarToggle target="nav-offcanvas" />
  </BNavbar>

  <BOffcanvas id="nav-offcanvas" title="Menu" placement="end" is-nav>
    <hr class="solid" />
    <BNav>
      <BRow class="offcanvas-brow">
        <BCol cols="auto" md="auto"
          ><p class="offcanvas-option-title">
            {{ language == "fr" ? "Langage" : "Language" }}:
          </p>
        </BCol>
        <BCol>
          <BButton
            @click="changeLanguage('fr')"
            aria-label="Français"
            variant="link"
            class="flag-emoji"
            :class="language == 'fr' ? 'flag-emoji-selected' : ''"
          >
            &#x1f1eb;&#x1f1f7;
          </BButton>
          <BButton
            @click="changeLanguage('en')"
            aria-label="English"
            variant="link"
            class="flag-emoji"
            :class="language == 'en' ? 'flag-emoji-selected' : ''"
          >
            &#x1f1fa;&#x1f1f8;
          </BButton>
        </BCol>
      </BRow>
      <BRow class="offcanvas-brow">
        <BCol cols="auto" md="auto">
          <p class="offcanvas-option-title">
            {{ language == "fr" ? "Mode sombre" : "Dark mode" }}:
          </p>
        </BCol>
        <BCol>
          <div class="dark-mode-switch">
            <i class="bi bi-sun-fill dark-mode-icon"></i>
            <BFormCheckbox switch size="lg" v-model="isDark" />
            <i class="bi bi-moon-fill dark-mode-icon"></i>
          </div>
        </BCol>
      </BRow>
      <BRow class="offcanvas-brow d-flex d-md-none">
        <BCol md="auto">
          <p class="offcanvas-option-title">
            {{ language == "fr" ? "Mes liens" : "My links" }}:
          </p>
        </BCol>
        <BCol>
          <a
            class="navbar-svg-link"
            href="https://linkedin.com/in/teva-petorin-a6006a204"
            target="_blank"
            rel="noopener noreferrer"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="50"
              height="50"
              fill="#0077B7"
              class="bi bi-linkedin"
              viewBox="0 0 16 16"
            >
              <path
                d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854zm4.943 12.248V6.169H2.542v7.225zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248S2.4 3.226 2.4 3.934c0 .694.521 1.248 1.327 1.248zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016l.016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225z"
              />
            </svg>
          </a>
          <a
            class="navbar-svg-link"
            href="https://github.com/Tev4"
            target="_blank"
            rel="noopener noreferrer"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="50"
              height="50"
              :fill="isDark ? '#ffffff' : '#000000'"
              class="bi bi-github"
              viewBox="0 0 16 16"
            >
              <path
                d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8"
              />
            </svg>
          </a>
        </BCol>
      </BRow>
    </BNav>
  </BOffcanvas>
</template>

<style scoped>
.navbar {
  background-color: #343a41 !important;
}

.navbar-button {
  margin-left: 0.25rem !important;
  margin-right: 0.25rem !important;
}

.navbar-svg-link {
  margin-left: 0.25rem !important;
  margin-right: 0.25rem !important;
}

.navbarbrand-button-style {
  border-style: solid;
  border-width: 1px;
  border-radius: 20px;
  border-color: rgba(0, 0, 0, 0%);
  transition: border-color 0.2s ease-out;
  -webkit-transition: border-color 0.2s ease-out;
  -moz-transition: border-color 0.2s ease-out;
  -o-transition: border-color 0.2s ease-out;
  -ms-transition: border-color 0.2s ease-out;
}

.navbarbrand-button-style:hover {
  border-color: var(--vt-c-white);
  transition: border-color 0.2s ease-in;
  -webkit-transition: border-color 0.2s ease-in;
  -moz-transition: border-color 0.2s ease-in;
  -o-transition: border-color 0.2s ease-in;
  -ms-transition: border-color 0.2s ease-in;
}

.navbarbrand-button-style h2 {
  padding-left: 1rem;
  padding-right: 1rem;
}

.fw-bold {
  font-weight: 600 !important;
}

.no-link-style {
  color: inherit; /* Use parent text color */
  text-decoration: none; /* Remove underline */
}

.no-link-style:hover {
  text-decoration: none; /* Keep it clean on hover too */
}

.bi-linkedin {
  background-color: white;
  border-radius: 5px;
  padding: 1px;
}

.flag-emoji {
  font-size: 30px;
  color: rgb(160, 160, 160);
  text-decoration: none;
  text-shadow: 0px 1px 4px rgba(0, 0, 0, 0.5);
  padding: 0;
  margin-left: 0.25rem !important;
  margin-right: 0.25rem !important;
}

.flag-emoji:hover {
  text-decoration: underline;
  color: black;
}

.flag-emoji:focus,
.flag-emoji:active {
  text-decoration: underline;
  color: black;
}

.flag-emoji-selected {
  text-decoration: underline;
}

html.dark .flag-emoji:hover {
  color: white;
}

html.dark .flag-emoji:focus,
html.dark .flag-emoji:active {
  color: white;
}

html.dark .flag-emoji-selected {
  color: rgb(95, 95, 95);
}

.dark-mode-switch {
  display: flex;
  text-align: center;
  align-items: center;
}

.form-switch {
  padding-left: 3rem;
  padding-right: 0rem;
  padding-top: 0;
  padding-bottom: 0;
  min-height: 0;
}

.dark-mode-icon {
  font-size: 20px;
  margin-top: -0.1rem;
  margin-left: 0.3rem;
  margin-right: 0.3rem;
}

.container-fluid {
  justify-content: center !important;
}

.navbar-brand {
  margin: auto;
  transform: translateX(-1.5rem);
  -webkit-transform: translateX(-1.5rem);
  -moz-transform: translateX(-1.5rem);
  -o-transform: translateX(-1.5rem);
  -ms-transform: translateX(-1.5rem);
}

@media (max-width: 768px) {
  .navbar-brand {
    transform: translateX(1.8rem);
    -webkit-transform: translateX(-1.8rem);
    -moz-transform: translateX(-1.8rem);
    -o-transform: translateX(-1.8rem);
    -ms-transform: translateX(-1.8rem);
  }
}

@media (max-width: 325px) {
  .navbar-brand {
    transform: translateX(0);
    -webkit-transform: translateX(0);
    -moz-transform: translateX(0);
    -o-transform: translateX(0);
    -ms-transform: translateX(0);
  }
}

.navbar-brand h2 {
  margin-top: 0.25rem;
  margin-bottom: 0.25rem;
}

.navbar-toggler {
  filter: invert(1);
}

.hr.solid {
  border-top: 3px solid #bbb;
}

.offcanvas-body .nav {
  flex-direction: column;
}

.offcanvas-option-title {
  margin: 0;
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
}

.offcanvas-brow {
  align-items: center;
}
</style>
