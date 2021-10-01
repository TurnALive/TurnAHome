<template>
  <div class="container flex flex-col-reverse md:flex-row items-center gap:6 md:gap-12 mx-auto mt-14 md:mt-28">
    <!-- content -->
    <div class="flex flex-1 flex-col item-center md:items-start">
      <h2 class="text-gray-700 text-center md:text-left text-4xl xl:text-8xl">
        Greetings from
        <div class="typing relative h-10 xl:h-24 overflow-hidden xl:mt-2.5">
          <span data-show>∀Live</span>
          <span>∀Rchive</span>
          <span>∀Community</span>
        </div>
      </h2>
      <h3 class="text-gray-600 mt-9 md:mt-11 text-2xl xl:text-6xl text-center md:text-left md:pl-2 animate__animated animate__fadeIn">
        Craft <br />
        Your Universe
      </h3>
    </div>
    <!-- 3D model -->
    <div class="flex justify-center flex-1">
      <canvas id="three" class="hidden md:block md:w-full md:h-full"></canvas>
      <img src="src/assets/img/turna-hero-right-transparent-mobile.webp" class="md:hidden w-2/3 h-2/3" />
    </div>
  </div>
  <!-- continue arrow -->
  <transition name="continue" class="animate__animated animate__faster" enter-active-class="animate__fadeInUp" :duration="1000">
    <svg class="w-6 h-6 mt-8 text-gray-500 container mx-auto animate__animated animate__fadeInUp" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
    </svg>
  </transition>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import * as THREE from "three";
import CameraControls from "camera-controls";

import Create3D from "../ts/3dhandler";

export default defineComponent({
  setup() {},
  data() {
    return {
      isTypingComplete: false,
      isSubtitleComplete: false,
    };
  },
  mounted() {
    this.initThree();
    setInterval(function () {
      const show = document.querySelector("span[data-show]");
      const next = show?.nextElementSibling || document.querySelector(".typing span:first-child");
      const up = document.querySelector("span[data-up]");

      if (up) {
        up.removeAttribute("data-up");
      }
      show?.removeAttribute("data-show");
      show?.setAttribute("data-up", "");

      next?.setAttribute("data-show", "");
    }, 2500);
  },
  methods: {
    initThree() {
      CameraControls.install({ THREE: THREE });

      const canvas = document.querySelector("#three");
      if (!canvas) throw "Element not Found!";
      const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
      renderer.setClearColor(0xffffff, 0);
      const camera = new THREE.PerspectiveCamera(45, 900 / 500, 1, 1000);
      const scene = new THREE.Scene();
      const control = new CameraControls(camera, renderer.domElement);
      const clock = new THREE.Clock();

      const TurnA = new Create3D(scene, renderer, camera, control);

      TurnA.load("src/assets/scene.json");
      TurnA.setControl();
      TurnA.createComposer();
      TurnA.setSize(900, 700);

      window.addEventListener("resize", TurnA.onWindowResize);
      canvas.addEventListener("mouseout", () => control.rotateTo(0.206, 1.385, true));
      canvas.addEventListener("mousemove", (e) => {
        const rect = canvas.getBoundingClientRect();
        let percentageX = (e.clientX - rect.left) / canvas.clientWidth;
        let percentageY = (e.clientY - rect.top) / canvas.clientHeight;
        const azimuthAngle = control.maxAzimuthAngle - percentageX * (control.maxAzimuthAngle - control.minAzimuthAngle);
        const polarAngle = control.maxPolarAngle - percentageY * (control.maxPolarAngle - control.minPolarAngle);
        control.rotateTo(azimuthAngle, polarAngle, true);
      });

      function animate() {
        control.update(clock.getDelta());
        requestAnimationFrame(animate);
        TurnA.composer.render();
      }
      animate();
    },
  },
  beforeDestroy() {
    clearInterval();
  },
});
</script>

<style scoped>
.typing span {
  @apply block absolute bg-no-repeat top-10 md:top-10 xl:top-24 bg-clip-border xl:pb-2.5 text-center md:text-left;
  background-size: 100% 100%;
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

.typing span:nth-child(1) {
  background-image: linear-gradient(45deg, #fa7671 50%, #f45f7f);
}
.typing span:nth-child(2) {
  background-image: linear-gradient(45deg, #8a7cfb 50%, #633e9c);
}
.typing span:nth-child(3) {
  background-image: linear-gradient(45deg, #18e198 50%, #0ec15d);
}
.typing span[data-up] {
  transform: translateY(-200%);
  transition: 0.5s transform ease-in-out;
}
.typing span[data-show] {
  transform: translateY(-100%);
  transition: 0.5s transform ease-in-out;
}
</style>
