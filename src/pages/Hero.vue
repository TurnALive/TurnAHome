<template>
  <div class="container flex flex-col-reverse md:flex-row items-center gap-12 mt-14 md:mt-28 md:ml-44">
    <!-- content -->
    <div class="flex flex-1 flex-col items-center md:items-start">
      <h2 class="typing text-gray-700 text-4xl text-center mb-8 md:text-6xl lg:text-8xl md:text-left"></h2>
      <transition name="subTitle" class="animate__animated animate__faster" enter-active-class="animate__fadeIn" :duration="{ enter: 1000, leave: 300 }">
        <p v-if="isComplete" class="text-gray-900 mt-9 md:mt-11 text-2xl md:text-4xl lg:text-6xl text-center md:text-left md:px-2 lg:px-6 mb-6">
          Craft <br />
          the Universe
        </p>
      </transition>

      <div class="flex justify-center flex-wrap gap-6"></div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import TypeIt from "typeit";

export default defineComponent({
  setup() {},
  data() {
    return {
      isComplete: false,
    };
  },
  mounted() {
    new TypeIt(".typing", {
      strings: ["∀Live", "∀Rchive", "∀Social"],
      cursorChar: "_",
      speed: 90,
      lifeLike: true,
      afterComplete: async (instance: TypeIt) => {
        this.isComplete = true;
      },
    }).go();
  },
});
</script>
