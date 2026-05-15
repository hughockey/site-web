<script setup lang="ts">
import { ref } from 'vue';

const props = defineProps<{ page: string }>();

const dialog = ref<HTMLDialogElement>();

const openDialog = () => {
  dialog.value?.showModal();
  document.body.style.overflow = 'hidden';
};

const closeDialog = () => {
  dialog.value?.close();
  document.body.style.overflow = 'auto';
};

defineExpose({ openDialog });
</script>

<template>
  <dialog :class="['modal-dialog', props.page === 'home' ? 'home-size' : 'project-size']" ref="dialog">
    <div class="modal-header">
      <slot name="title"></slot>
      <button class="close-btn" type="button" @click="closeDialog" aria-label="Fermer">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M18 6 6 18M6 6l12 12" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
        </svg>
      </button>
    </div>
    <div class="modal-body">
      <slot name="content">
        <p>Aucune information disponible</p>
      </slot>
    </div>
  </dialog>
</template>

<style scoped lang="css">
.modal-dialog {
  background: var(--surface);
  border: 1px solid var(--border-bright);
  border-radius: 12px;
  padding: 0;
  box-shadow: 0 0 60px rgba(0, 0, 0, 0.6), 0 0 0 1px var(--border);
  color: var(--text);
  max-height: 90vh;
  overflow-y: auto;
}

.home-size {
  max-width: 680px;
  width: 90%;
}

.project-size {
  max-width: 900px;
  width: 90%;
}

.modal-dialog::backdrop {
  background: rgba(0, 0, 0, 0.75);
  backdrop-filter: blur(4px);
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem 2rem 1rem;
  border-bottom: 1px solid var(--border);
}

.modal-body {
  padding: 2rem;
}

.close-btn {
  all: unset;
  cursor: pointer;
  color: var(--text-muted);
  display: flex;
  align-items: center;
  padding: 0.25rem;
  border-radius: 4px;
  transition: color 0.2s, background 0.2s;
}

.close-btn:hover {
  color: var(--text);
  background: var(--surface-2);
  box-shadow: none;
}

@media (max-width: 1024px) {
  .project-size {
    width: 95%;
  }
}
</style>
