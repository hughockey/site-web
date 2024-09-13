<script setup lang="ts">
import Header from './components/Header.vue';
import Content from './components/Content.vue';
import Footer from './components/Footer.vue';
import { ref } from 'vue';

const content = ref<InstanceType<typeof Content> | null>(null)
const scrollToSection = () => {
  const section = content.value?.$refs['contact-section'] as HTMLElement | undefined
  if (section) {
    section.scrollIntoView({behavior: 'smooth'})
  }
}
</script>

<template>
  <Header @scroll-to-section="scrollToSection"></Header>
  <Content ref="content"></Content>
  <Footer></Footer>
</template>

<style scoped>

</style>
