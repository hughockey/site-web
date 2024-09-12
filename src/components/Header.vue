<script setup lang="ts">
  const emit = defineEmits<{ (e: 'scroll-to-section', sectionRef: string): void }>();
</script>
<template>
  <div class="header-container">
    <!-- <div class="left-header-content" style="color:white">
      Logo
    </div> -->
    <div class="right-header-content">
      <div class="socials-contact">
        <!-- <a target="_blank">
          <svg width="24" xmlns="http://www.w3.org/2000/svg" height="24.615" fill="none"><g data-testid="facebook"><g class="fills"><rect rx="0" ry="0" width="24" height="24" class="frame-background"/></g><g data-testid="svg-path" class="frame-children"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3Z" style="fill: none;" class="fills"/><g stroke-linecap="round" stroke-linejoin="round" class="strokes"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3Z" style="fill: none; stroke-width: 2; stroke: rgb(213, 213, 213); stroke-opacity: 1;" class="stroke-shape"/></g></g></g></svg>
        </a> -->
        <a href="https://www.linkedin.com/in/hugo-lemieux/" target="_blank">
          <svg width="24" xmlns="http://www.w3.org/2000/svg" height="24.615" fill="none"><g data-testid="linkedin"><g class="fills"><rect rx="0" ry="0" width="24" height="24" class="frame-background"/></g><g class="frame-children"><g data-testid="svg-path"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 1 0-4 0v7h-4v-7a6 6 0 0 1 6-6Z" style="fill: none;" class="fills"/><g stroke-linecap="round" stroke-linejoin="round" class="strokes"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 1 0-4 0v7h-4v-7a6 6 0 0 1 6-6Z" style="fill: none; stroke-width: 2; stroke: rgb(213, 213, 213); stroke-opacity: 1;" class="stroke-shape"/></g></g><g data-testid="svg-rect"><rect width="4" height="12" x="2" style="fill: none;" ry="0" rx="0" y="9" class="fills"/><g stroke-linejoin="round" stroke-linecap="round" class="strokes"><rect rx="0" ry="0" x="2" y="9" width="4" height="12" style="fill: none; stroke-width: 2; stroke: rgb(213, 213, 213); stroke-opacity: 1;" class="stroke-shape"/></g></g><g data-testid="svg-circle"><circle cy="4" style="fill: none;" cx="4" r="2" class="fills"/><g stroke-linecap="round" stroke-linejoin="round" class="strokes"><circle cx="4" cy="4" style="fill: none; stroke-width: 2; stroke: rgb(213, 213, 213); stroke-opacity: 1;" r="2" class="stroke-shape"/></g></g></g></g></svg>
        </a>
        <a href="https://github.com/hughockey" target="_blank">
          <svg width="24" xmlns="http://www.w3.org/2000/svg" height="24.615" fill="none"><g data-testid="github"><g class="fills"><rect rx="0" ry="0" width="24" height="24" class="frame-background"/></g><g class="frame-children"><g data-testid="svg-path"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.402 5.402 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" style="fill: none;" class="fills"/><g stroke-linecap="round" stroke-linejoin="round" class="strokes"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.402 5.402 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" style="fill: none; stroke-width: 2; stroke: rgb(213, 213, 213); stroke-opacity: 1;" class="stroke-shape"/></g></g><g data-testid="svg-path"><path d="M9 18c-4.51 2-5-2-7-2" style="fill: none;" class="fills"/><g stroke-linecap="round" stroke-linejoin="round" class="strokes"><path d="M9 18c-4.51 2-5-2-7-2" style="fill: none; stroke-width: 2; stroke: rgb(213, 213, 213); stroke-opacity: 1;" class="stroke-shape"/></g></g></g></g></svg>
        </a>
        <button type="button" class="contact-button" @click="$emit('scroll-to-section', 'contact-section')">Contactez-moi</button>
      </div>
    </div>
  </div>
</template>

<style lang="css" scoped>
.header-container {
  width: 100vw;
  height: 80px;
  background-color: var(--background);
  display: flex;
  /* justify-content: space-between; */
  justify-content: end;
  align-items: center;
}

.left-header-content {
  padding-left: 25px;
}

.socials-contact {
  min-width: 310px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding-right: 25px;
}
</style>