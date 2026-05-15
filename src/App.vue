<script setup lang="ts">
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const scrollToContact = () => {
  router.push({ path: '/', hash: '#contact' })
}
</script>

<template>
  <Header @scroll-to-section="scrollToContact" />
  <RouterView />
  <Footer />
</template>

<style scoped></style>
