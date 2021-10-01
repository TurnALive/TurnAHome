<template>
  <div class="w-screen h-screen" style="background: linear-gradient(to right, #c2e59c, #64b3f4)">
    <NavBar />
    <Home />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import NavBar from "./components/NavBar.vue";
import Home from "./pages/Home.vue";

export default defineComponent({
  setup() {},
  components: {
    NavBar,
    Home,
  },
});
</script>
