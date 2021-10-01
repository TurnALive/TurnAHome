<template>
  <Hero />
  <More />
  <Social />
  <Alive />
  <Archive />
</template>

<script lang="ts">
import { defineComponent } from "vue";

import Hero from "./Hero.vue";
import Social from "./Social.vue";
import Alive from "./Alive.vue";
import Archive from "./Archive.vue";
import More from "./More.vue";

export default defineComponent({
  setup() {},
  components: {
    Hero,
    More,
    Social,
    Alive,
    Archive,
  },
});
</script>
