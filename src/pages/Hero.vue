<template>
  <div class="container flex flex-col-reverse md:flex-row items-center gap:6 md:gap-12 mt-14 md:mt-28 md:ml-44">
    <!-- continue arrow -->
    <transition name="continue" class="animate__animated animate__faster" enter-active-class="animate__fadeInUp" :duration="1000">
      <svg v-if="isSubtitleComplete" class="w-6 h-6 mt-8 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
      </svg>
    </transition>
    <!-- content -->
    <div class="flex flex-1 flex-col items-center md:items-start">
      <h2 class="typing text-gray-700 text-4xl text-center mb-8 md:text-6xl lg:text-8xl md:text-left"></h2>
      <transition name="subTitle" class="animate__animated animate__faster" enter-active-class="animate__fadeIn" :duration="1000" v-on:after-enter="isSubtitleComplete = !isSubtitleComplete">
        <p v-if="isTypingComplete" class="text-gray-900 mt-9 md:mt-11 text-2xl md:text-4xl lg:text-6xl text-center md:text-left md:px-2 lg:px-6 mb-6">
          Craft <br />
          the Universe
        </p>
      </transition>
      <div class="flex justify-center flex-wrap gap-6"></div>
    </div>
    <!-- 3D model -->
    <div class="flex justify-center flex-1 mb-10 md:mb-16 lg:mb-0">
      <canvas id="three" class="hidden md:block md:w-full md:h-full"></canvas>
      <img src="src/assets/img/turna-hero-right-transparent-mobile.webp" class="md:hidden w-2/3 h-2/3" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import TypeIt from "typeit";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

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
    new TypeIt(".typing", {
      strings: ["∀Live", "∀Rchive", "∀Social"],
      cursorChar: "_",
      speed: 90,
      lifeLike: true,
      afterComplete: async (instance: TypeIt) => {
        this.isTypingComplete = true;
      },
    }).go();
    this.initThree();
  },
  methods: {
    afterEnter() {},
    initThree() {
      const canvas = document.querySelector("#three");
      if (!canvas) throw "Element not Found!";
      const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
      const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 1000);
      const scene = new THREE.Scene();
      scene.background = new THREE.Color(0xe5e7eb);
      const control = new OrbitControls(camera, renderer.domElement);

      camera.position.x = 0;
      camera.position.y = 4.5;
      camera.position.z = 5;
      camera.zoom = 1.5;

      const TurnA = new Create3D(scene, renderer, camera, control);

      TurnA.load("src/assets/scene.json");
      TurnA.setControl();

      window.addEventListener("resize", TurnA.onWindowResize);
      TurnA.createComposer();

      function checkSize() {
        let breakPoints: number[] = [640, 768, 1024, 1920];
        breakPoints.forEach((width) => {
          if (window.matchMedia(`(max-width: ${width}px)`).matches) {
            switch (width) {
              case 640:
                return [640, 480];
              case 768:
                return [768, 640];
              case 1024:
                return [1024, 1024];
              case 1920:
                return [1024, 1024];
            }
          }
        });
      }

      function animate() {
        control.update();
        TurnA.onWindowResize();
        requestAnimationFrame(animate);
        TurnA.composer.render();
      }
      animate();
    },
  },
});
</script>
