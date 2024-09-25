<script setup lang="ts">
import { ref } from "vue";
import Tag from "./Tag.vue";
import projets from "../data/projets.json";

const items = ref(projets);

items.value.forEach(item => {
  switch (item.nom) {
    case "Portail Alfred":
      item.captureEcran = new URL('../assets/images/dashboard.png', import.meta.url).href;
      break;
    case "Inventaire":
      item.captureEcran = new URL('../assets/images/inventaire.png', import.meta.url).href;
      break;
    case "Menu":
      item.captureEcran = new URL('../assets/images/menu.png', import.meta.url).href;
      break;
    case "Octo":
      item.captureEcran = new URL('../assets/images/octo.png', import.meta.url).href;
      break;
    case "Panier valérienois":
      item.captureEcran = new URL('../assets/images/panier.png', import.meta.url).href;
      break;
    case "Mon site web":
      item.captureEcran = new URL('../assets/images/mon-site.png', import.meta.url).href;
      break;
    default:
      item.captureEcran = ''; // or a default image path
  }
});

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
