<template>
  <div class="bg-gray-200 w-screen h-screen">
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
