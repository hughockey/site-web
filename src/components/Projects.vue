<script setup lang="ts">
import { ref } from "vue";
import Tag from "./Tag.vue";
import projets from "../data/projets.json";
import Modal from "./Modal.vue";

const items = ref(projets);

const imageMap: Record<string, string> = {
  "Portail Alfred": "../assets/images/dashboard.png",
  "Inventaire": "../assets/images/inventaire.png",
  "Menu": "../assets/images/menu.png",
  "Octo": "../assets/images/octo.png",
  "Portail Equipe Carrière": "../assets/images/ec-dashboard.png",
  "Site web Joe Rullier": "../assets/images/jr.png",
  "GamerZ": "../assets/images/gamerz.jpg",
  "Mon site web": "../assets/images/mon-site.png",
};

items.value.forEach(item => {
  const key = item.nom as keyof typeof imageMap;
  if (imageMap[key]) {
    item.captureEcran = new URL(imageMap[key], import.meta.url).href;
  } else {
    item.captureEcran = '';
  }
});

const projectModal = ref<InstanceType<typeof Modal>>();
const title = ref<string>('');
const image = ref<string>('');
const description = ref<string>('');
const lien = ref<string>('');

const showModal = (project: string) => {
  const item = items.value.find(item => item.nom === project);
  if (item) {
    title.value = item.nom || '';
    image.value = item.captureEcran || '';
    description.value = item.description || '';
    lien.value = item.lien || '';
  }
  projectModal.value?.openDialog();
};
</script>

<template>
  <div class="projects-page">
    <div
      class="page-header"
      v-motion
      :initial="{ opacity: 0, y: 30 }"
      :enter="{ opacity: 1, y: 0, transition: { duration: 600 } }"
    >
      <span class="section-tag">// projets</span>
      <h1>Mes réalisations</h1>
      <p>Un aperçu de ce que j'ai construit.</p>
    </div>

    <div class="project-grid">
      <div
        v-for="(item, index) in items"
        :key="item.nom"
        class="project-card"
        role="button"
        tabindex="0"
        :aria-label="`Voir le projet ${item.nom}`"
        @click="showModal(item.nom)"
        @keydown.enter="showModal(item.nom)"
        @keydown.space.prevent="showModal(item.nom)"
        v-motion
        :initial="{ opacity: 0, scale: 0.95 }"
        :visibleOnce="{ opacity: 1, scale: 1, transition: { delay: index * 80, duration: 500 } }"
      >
        <div class="card-image">
          <img :src="item.captureEcran" :alt="item.nom" />
          <div class="card-overlay">
            <div class="overlay-inner">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">
                <circle cx="11" cy="11" r="8" stroke="currentColor" stroke-width="2"/>
                <path d="m21 21-4.35-4.35" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
              </svg>
              <span>Voir le projet</span>
            </div>
          </div>
        </div>
        <div class="card-meta">
          <h3>{{ item.nom }}</h3>
          <div class="tag-list">
            <Tag v-for="tag in item.stack" :key="tag" :label="tag" />
          </div>
        </div>
      </div>
    </div>
  </div>

  <Modal page="projects" ref="projectModal">
    <template #title>
      <h2>{{ title }}</h2>
    </template>
    <template #content>
      <div class="modal-inner">
        <img :src="image" :alt="title" class="modal-img" />
        <p>{{ description }}</p>
        <a v-if="lien" :href="lien" target="_blank" rel="noopener noreferrer nofollow" class="modal-link">
          Voir le site web →
        </a>
      </div>
    </template>
  </Modal>
</template>

<style lang="css" scoped>
.projects-page {
  max-width: 1200px;
  margin: 0 auto;
  padding: 4rem 2rem 6rem;
  position: relative;
  z-index: 1;
}

.page-header {
  text-align: center;
  margin-bottom: 4rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
}

.section-tag {
  font-family: var(--font-text);
  font-size: 0.8rem;
  color: var(--primary);
  letter-spacing: 0.1em;
}

.page-header p {
  color: var(--text-dim);
  max-width: 400px;
  text-align: center;
}

.project-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
  gap: 1.25rem;
}

.project-card {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 10px;
  overflow: hidden;
  cursor: pointer;
  transition: border-color 0.3s, box-shadow 0.3s, transform 0.3s;
}

.project-card:hover {
  border-color: var(--primary);
  box-shadow: 0 0 30px var(--primary-glow);
  transform: translateY(-4px);
}

.project-card:focus-visible {
  outline: 2px solid var(--primary);
  outline-offset: 3px;
  border-color: var(--primary);
}

.card-image {
  position: relative;
  height: 200px;
  overflow: hidden;
}

.card-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: top left;
  transition: transform 0.4s ease;
  display: block;
}

.project-card:hover .card-image img {
  transform: scale(1.04);
}

.card-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, rgba(9, 9, 11, 0.85), rgba(14, 116, 144, 0.4));
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.project-card:hover .card-overlay {
  opacity: 1;
}

.overlay-inner {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  color: var(--primary);
}

.overlay-inner span {
  font-family: var(--font-text);
  font-size: 0.85rem;
  color: var(--text);
}

.card-meta {
  padding: 1.25rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.card-meta h3 {
  font-size: 0.95rem;
  color: var(--text);
}

.tag-list {
  display: flex;
  flex-wrap: wrap;
  gap: 0.35rem;
}

/* Modal content */
.modal-inner {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  text-align: left;
}

.modal-img {
  width: 100%;
  border-radius: 8px;
  border: 1px solid var(--border);
  object-fit: cover;
  max-height: 320px;
}

.modal-link {
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
  font-family: var(--font-text);
  font-size: 0.9rem;
  color: var(--primary);
  border: 1px solid var(--primary);
  padding: 0.5rem 1rem;
  border-radius: 6px;
  transition: background 0.2s, box-shadow 0.2s;
  align-self: flex-start;
}

.modal-link:hover {
  background: var(--primary-glow);
  box-shadow: 0 0 16px var(--primary-glow-strong);
  color: var(--primary);
}

.modal-link:focus-visible {
  outline: 2px solid var(--primary);
  outline-offset: 3px;
}

@media (max-width: 640px) {
  .project-grid {
    grid-template-columns: 1fr;
  }
}
</style>
