<template>
  <!-- 粒子特效 -->
  <div @click="goHome"><ParticlesView></ParticlesView></div>
</template>

<script setup lang="ts">
import ParticlesView from "./ParticlesView.vue";
import router from "@/router";
const goHome = () => {
  router.push("/home");
};
</script>

<style scoped lang="scss"></style>
