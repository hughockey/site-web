<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'

defineEmits<{ (e: 'scroll-to-section'): void }>()

const route = useRoute()
const router = useRouter()

const navUrl = computed(() => route.path === '/' ? '/projects' : '/')
const navLabel = computed(() => route.path === '/' ? 'Projets' : 'Accueil')

const goTo = () => router.push(navUrl.value)
</script>

<template>
  <header class="header">
    <div class="header-inner">
      <nav aria-label="Navigation principale">
        <div class="left">
          <RouterLink to="/" class="brand" aria-label="Hugo Lemieux — Accueil">HL<span class="brand-dot" aria-hidden="true">.</span></RouterLink>
          <a class="nav-link" :href="navUrl" @click.prevent="goTo">{{ navLabel }}</a>
        </div>
      </nav>
      <div class="right">
        <a href="https://www.linkedin.com/in/hugo-lemieux/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn (ouvre dans un nouvel onglet)">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">
            <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 1 0-4 0v7h-4v-7a6 6 0 0 1 6-6Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <rect x="2" y="9" width="4" height="12" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <circle cx="4" cy="4" r="2" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </a>
        <a href="https://github.com/hughockey" target="_blank" rel="noopener noreferrer" aria-label="GitHub (ouvre dans un nouvel onglet)">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">
            <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.402 5.402 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M9 18c-4.51 2-5-2-7-2" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </a>
        <button type="button" @click="$emit('scroll-to-section')">
          Contactez-moi
        </button>
      </div>
    </div>
  </header>
</template>

<style lang="css" scoped>
.header {
  position: sticky;
  top: 0;
  z-index: 50;
  height: 68px;
  background: rgba(9, 9, 11, 0.85);
  backdrop-filter: blur(12px);
  border-bottom: 1px solid var(--border);
}

.header-inner {
  max-width: 1200px;
  margin: 0 auto;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 2rem;
}

.left {
  display: flex;
  align-items: center;
  gap: 2rem;
}

.brand {
  font-family: var(--font-title);
  font-weight: 800;
  font-size: 1.2rem;
  color: var(--text);
  letter-spacing: 0.05em;
  text-decoration: none;
}

.brand-dot {
  color: var(--primary);
  font-family: var(--font-title);
}

.nav-link {
  font-family: var(--font-title);
  font-weight: 500;
  font-size: 0.9rem;
  color: var(--text-dim);
  letter-spacing: 0.04em;
  transition: color 0.2s;
  text-transform: uppercase;
}

.nav-link:hover {
  color: var(--primary);
}

.right {
  display: flex;
  align-items: center;
  gap: 1.25rem;
}

.right a {
  color: var(--text-muted);
  display: flex;
  align-items: center;
  transition: color 0.2s, filter 0.2s;
}

.right a:hover {
  color: var(--primary);
  filter: drop-shadow(0 0 8px var(--primary));
}

.right a svg {
  color: inherit;
}

.right a svg:hover {
  filter: none;
}

.brand:focus-visible,
.nav-link:focus-visible,
.right a:focus-visible,
button:focus-visible {
  outline: 2px solid var(--primary);
  outline-offset: 3px;
  border-radius: 2px;
}

button {
  font-size: 0.75rem;
  height: 36px;
  padding: 0 1rem;
}
</style>
