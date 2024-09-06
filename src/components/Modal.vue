<script setup lang="ts">
import { ref } from 'vue';

const dialog = ref<HTMLDialogElement>()

const openDialog = () => {
  dialog.value?.showModal()
}

const closeDialog = () => {
  dialog.value?.close()
}

defineExpose({
  openDialog
})
</script>
<template>
  <dialog ref="dialog">
    <div class="close-icon">
      <svg @click="closeDialog" width="24" xmlns="http://www.w3.org/2000/svg" height="24" fill="none"><g data-testid="x"><g class="fills"><rect rx="0" ry="0" width="24" height="24" class="frame-background"/></g><g class="frame-children"><g data-testid="svg-path"><path d="M18 6 6 18" style="fill: none;" class="fills"/><g stroke-linecap="round" stroke-linejoin="round" class="strokes"><path d="M18 6 6 18" style="fill: none; stroke-width: 2; stroke: rgb(177, 178, 181); stroke-opacity: 1;" class="stroke-shape"/></g></g><g data-testid="svg-path"><path d="m6 6 12 12" style="fill: none;" class="fills"/><g stroke-linecap="round" stroke-linejoin="round" class="strokes"><path d="m6 6 12 12" style="fill: none; stroke-width: 2; stroke: rgb(177, 178, 181); stroke-opacity: 1;" class="stroke-shape"/></g></g></g></g></svg>
    </div>
    <slot name="title"></slot>
    <slot name="content">
      <p>Aucune information disponible</p>
    </slot>
  </dialog>
</template>
<style scoped lang="css">
dialog {
  background-color: var(--background);
  height: 300px;
  width: 50%;
  border-radius: 5px;
}

dialog::backdrop {
  background-color: var(--background);
  opacity: 0.5;
}

.close-icon {
  text-align: end;
}
</style>
