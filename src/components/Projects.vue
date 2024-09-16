<script setup lang="ts">
import { ref } from "vue";
import Tag from "./Tag.vue";
import projets from "../data/projets.json";

const items = ref(projets);
</script>
<template>
  <section>
    <h1>Projets</h1>
    <section v-for="item in items">
      <div class="project-informations-container">
        <h3>{{ item.nom }}</h3>
        <template v-for="tag in item.stack">
          <Tag :class="'tag-spacing'" :label="tag" />
        </template>
        <div>
          <img :src="item.captureEcran" alt="" />
          <p>{{ item.description }}</p>
        </div>
      </div>
    </section>
  </section>
</template>

<style lang="css" scoped>
section {
  min-height: calc(100vh - 80px);
  max-width: 1200px;
  margin: 0 auto;
  text-align: center;
  display: grid;
  place-items: center;
}

h3 {
  padding: 20px 0;
}

img {
  width: 450px;
}

.project-informations-container > div {
  margin-top: 30px;
}

.tag-spacing {
  margin-right: 10px;
}

@media (min-width: 1200px) {
  .project-informations-container {
    text-align: left;
  }

  .project-informations-container > div {
    display: flex;
  }

  .project-informations-container > div > img {
    margin-right: 20px;
  }
  h3 {
    padding: 0;
  }
}
</style>
