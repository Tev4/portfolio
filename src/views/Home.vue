<script setup lang="ts">
import { ref } from "vue";
import NavBar from "../components/NavBar.vue";
import ProjectCard from "../components/ProjectCard.vue";
import { projects } from "../projects";

const projectList = ref(projects);
</script>

<template>
  <header>
    <NavBar></NavBar>
  </header>

  <main>
    <BContainer class="mt-4 card-grid-container">
      <BRow>
        <ProjectCard
          v-for="project in projectList"
          :project="project.id"
          :title="project.homeTitle ? project.title : undefined"
          :directlink="project.directLink"
          :github="project.githubLink"
          :itchio="project.itchioLink"
        />
      </BRow>
    </BContainer>
  </main>
</template>

<style scoped></style>
