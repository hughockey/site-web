<script setup lang="ts">
type MapType = {
  [id: string]: string;
};

const tagColor: MapType = {
  Vuejs: "#42b883",
  Vuex: "#38A169",
  Pinia: "#F9CC00",
  Angular: "#DD0031",
  RxJs: "#B7178C",
  Typescript: "#3178C6",
  Javascript: "#F7DF1E",
  Html: "#e34c26",
  Css: "#2965f1",
  Scss: "#CC6699",
  OpenLayers: "#1F6B75",
  Nuxt: "#00C58E",
  TanstackQuery: "#FF4154",
  Tailwind: "#06B6D4",
};

type TagProps = {
  label: string;
  class?: string;
};

defineProps<TagProps>()

</script>
<template>
  <span :style="{
        padding: '2px 4px',
        background: `${tagColor[label]}`,
        borderRadius: '5px',
        color: 'black'
      }" :class="class">{{ label }}</span>
</template>
<style lang="css" scoped>
span {
  font-family: var(--font-text);
}
</style>