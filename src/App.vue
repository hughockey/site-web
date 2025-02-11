<script setup lang="ts">
import Header from "./components/Header.vue";
import Content from "./components/Content.vue";
import Footer from "./components/Footer.vue";
import { nextTick, onMounted, ref } from "vue";
import Projects from "./components/Projects.vue";

const currentRoute = ref(window.location.pathname);
const content = ref<InstanceType<typeof Content> | null>(null);
const scrollToSection = async () => {
  if (window.location.pathname !== '/') window.history.pushState({}, "", '/');
  currentRoute.value = '/';
  await nextTick()
  const section = content.value?.$refs["contact-section"] as | HTMLElement
  section.scrollIntoView({ behavior: "smooth" });
};

const handleNavigation = (path: string) => {
  if (currentRoute.value !== path) {
    window.history.pushState({}, '', path);
    currentRoute.value = path; // This will cause reactivity and re-render the component
  }
};

onMounted(() => {
  window.addEventListener('popstate', () => {
    currentRoute.value = window.location.pathname;
  });
});
</script>

<template>
  <Header :current-route="currentRoute"  @scroll-to-section="scrollToSection" @navigate="handleNavigation"></Header>
  <div v-if="currentRoute === '/'">
    <Content ref="content"></Content>
  </div>
  <div v-if="currentRoute === '/projects'">
    <Projects></Projects>
  </div>
  <Footer></Footer>

  <!-- <Projects></Projects> -->
</template>

<style scoped></style>
