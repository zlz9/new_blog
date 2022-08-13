<template>
  <transition
    appear
    name="animate__animated animate__bounce"
    enter-active-class="animate__backInLeft"
    leave-active-class="animate__backOutRight"
  >
    <div class="title" v-if="active">欢迎来到知识的海洋！</div>
  </transition>

  <Particles
    id="tsparticles"
    :particlesInit="particlesInit"
    :particlesLoaded="particlesLoaded"
    :options="options"
  />
</template>
<script setup lang="ts">
import { reactive, ref } from "vue";
import { loadFull } from "tsparticles";
import type { Container, Engine } from "tsparticles-engine";

const particlesInit = async (engine: Engine) => {
  await loadFull(engine);
};
const particlesLoaded = async (container: Container) => {
  console.log("Particles container loaded", container);
};
const options = reactive({
  background: {
    color: {
      value: "#000", // 粒子颜色
    },
  },
  fpsLimit: 60,
  interactivity: {
    events: {
      onClick: {
        enable: true,
        mode: "push", // 可用的click模式有: "push", "remove", "repulse", "bubble"。
      },
      onHover: {
        enable: true,
        mode: "grab", // 可用的hover模式有: "grab", "repulse", "bubble"。
      },
      resize: true,
    },
    modes: {
      bubble: {
        distance: 400,
        duration: 2,
        opacity: 0.8,
        size: 40,
      },
      push: {
        quantity: 4,
      },
      repulse: {
        distance: 200,
        duration: 0.4,
      },
    },
  },
  particles: {
    color: {
      value: "#ffffff",
    },
    links: {
      color: "#ffffff", // '#dedede'。线条颜色。
      distance: 150, // 线条长度
      enable: true, // 是否有线条
      opacity: 0.5, // 线条透明度。
      width: 1, // 线条宽度。
    },
    collisions: {
      enable: false,
    },
    move: {
      direction: "none",
      enable: true,
      outMode: "bounce",
      random: false,
      speed: 3, // 粒子运动速度。
      straight: false,
    },
    number: {
      density: {
        enable: true,
        area: 800,
      },
      value: 80, // 粒子数量。
    },
    opacity: {
      value: 0.5, // 粒子透明度。
    },
    shape: {
      type: "edge", // 可用的粒子外观类型有："circle","edge","triangle", "polygon","star"
    },
    size: {
      random: true,
      value: 5,
    },
  },
  detectRetina: true,
});
const active = ref("true");
</script>
<style scoped lang="scss">
$color: rgb(121, 192, 22);
#tsparticles {
  position: fixed;
  z-index: -10;
}
.title {
  width: 100%;
  height: 1000px;
  display: flex;
  color: $color;
  font-size: 60px;
  justify-content: center;
  align-items: center;
}
</style>
