<template>
  <div class="w-full h-screen md:h-full 2xl:h-screen shadow-md" style="background: linear-gradient(to right, #c2e59c, #64b3f4)">
    <NavBar />
    <Hero />
  </div>
  <More />
  <Community />
  <Alive />
  <Archive />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import NavBar from "./components/NavBar.vue";
import Hero from "./pages/Hero.vue";
import Community from "./pages/Community.vue";
import Alive from "./pages/Alive.vue";
import Archive from "./pages/Archive.vue";
import More from "./pages/More.vue";

export default defineComponent({
  setup() {},
  components: {
    NavBar,
    Hero,
    More,
    Community,
    Alive,
    Archive,
  },
});
</script>
