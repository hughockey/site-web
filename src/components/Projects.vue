<script setup lang="ts">
import { ref } from "vue";
import Tag from "./Tag.vue";
import projets from "../data/projets.json";
import Modal from "./Modal.vue";

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
    case "Portail Equipe Carrière":
      item.captureEcran = new URL('../assets/images/ec-dashboard.png', import.meta.url).href;
      break;
    case "Site web Joe Rullier":
      item.captureEcran = new URL('../assets/images/jr.png', import.meta.url).href;
      break;
    case "GamerZ":
      item.captureEcran = new URL('../assets/images/gamerz.jpg', import.meta.url).href;
      break;
    case "Mon site web":
      item.captureEcran = new URL('../assets/images/mon-site.png', import.meta.url).href;
      break;
    default:
      item.captureEcran = ''; // or a default image path
  }
});

const projectModal = ref<InstanceType<typeof Modal>>();
const title = ref<string>('');
const image = ref<string>('');

const showModal = (project: string) => {
  const item = items.value.find(item => item.nom === project);
  if (item) {
    title.value = item.nom || '';
    image.value = item.captureEcran || '';
  }
  projectModal.value?.openDialog();
}

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
          <img :src="item.captureEcran" alt="capture d'écran de l'application / site web" @click="showModal(item.nom)"/>
          <div>
            <p>{{ item.description }}</p>
            <a v-if="item.lien !== ''" :href="item.lien" target="_blank" rel="nofollow">Cliquez ici pour voir le site web</a>
          </div>
        </div>
      </div>
    </section>
  </section>
  <Modal ref="projectModal">
    <template #content>
      <img class="modal-img" :src="image" alt="capture d'écran de l'application / site web" />
    </template>
  </Modal>
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
  padding: 10px 0;
}

img {
  width: 450px;
}

.modal-img {
  width: 100%;
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
}
</style>
