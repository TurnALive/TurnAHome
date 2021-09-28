<template>
  <nav class="bg-transparent hover:bg-gray-100 hover:backdrop-blur transition duration-500">
    <div class="mx-auto border border-gray-200 hover:border-gray-100 transition duration-500">
      <div class="p-2 px-8 flex justify-between">
        <!-- logo -->
        <div class="mr-4 flex">
          <a href="/" class="flex items-center">
            <svg class="h-12 w:12 md:h-16 md:w-16 mr-4 text-turna-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" stroke="currentColor" fill="currentColor">
              <path d="M18.92,16.73L23.43,28h17.1l4.54-11.26h2.98l-14.89,36.2h-2.6l-14.71-36.2H18.92z M31.03,47.02c0.2,0.5,0.37,1,0.48,1.5c0.14,0.42,0.27,0.84,0.41,1.26h0.13c0.31-1.12,0.6-2.02,0.89-2.71l6.65-16.78H24.35L31.03,47.02z" />
              <path d="M3.85,14.15C1.72,14.15,0,15.88,0,18s1.72,3.85,3.85,3.85S7.7,20.13,7.7,18S5.98,14.15,3.85,14.15zM3.85,20.85c-1.57,0-2.84-1.27-2.84-2.84s1.27-2.84,2.84-2.84S6.7,16.43,6.7,18S5.42,20.85,3.85,20.85z" />
              <path d="M60.15,14.15c-2.13,0-3.85,1.72-3.85,3.85s1.72,3.85,3.85,3.85S64,20.13,64,18S62.28,14.15,60.15,14.15zM60.15,20.85c-1.57,0-2.84-1.27-2.84-2.84s1.27-2.84,2.84-2.84c1.57,0,2.84,1.27,2.84,2.84S61.72,20.85,60.15,20.85z" />
            </svg>
            <!-- <div class="md:hidden text-lg text-gray-700 font-sans px-10"></div> -->
          </a>
        </div>
        <!-- parts -->
        <div class="hidden md:flex items-center space-x-1">
          <a href="/#/Social" class="px-5 text-gray-700 hover:text-turna-500 rounded transition duration-400">社群</a>
          <a href="/#/Alive" class="px-5 pr-8 text-gray-700 hover:text-turna-500 rounded transition duration-400">游戏</a>
          <a href="/#/Archive" class="py-3 px-4 text-gray-200 bg-turna-700 hover:bg-turna-600 hover:text-gray-200 rounded transition duration-400">档案局</a>
        </div>
        <!-- mobile menu button -->
        <div class="md:hidden flex items-center pr-5">
          <button @click="toggleMobileMenu" class="mobile-menu-button md:hidden">
            <transition name="mobileMenu" class="animate__animated animate__faster" enter-active-class="animate__fadeIn" leave-active-class="animate__fadeOut" :duration="{ enter: 500, leave: 300 }" mode="out-in">
              <svg v-if="!isActive" class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7"></path>
              </svg>
              <svg v-else class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </transition>
          </button>
        </div>
      </div>
      <!-- mobile menu -->
      <transition name="mobileMenu" class="animate__animated animate__faster" enter-active-class="animate__fadeIn" leave-active-class="animate__fadeOut" :duration="{ enter: 500, leave: 300 }">
        <div v-if="isActive" class="mobile-menu md:hidden absolute bg-gray-200 backdrop-blur container w-full max-w-screen-md">
          <a href="/#/Social" @click="toggleMobileMenu" class="block py-4 text-center text-sm text-gray-700 hover:text-turna-500">社群</a>
          <a href="/#/Alive" @click="toggleMobileMenu" class="block py-4 text-center text-sm text-gray-700 hover:text-turna-500">游戏</a>
          <a href="/#/Archive" @click="toggleMobileMenu" class="block py-4 text-center text-sm text-gray-200 bg-turna-700 hover:bg-turna-600 hover:text-gray-200 rounded-2xl transition duration-300">档案局</a>
        </div>
      </transition>
    </div>
  </nav>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  data() {
    return {
      isActive: false,
    };
  },
  methods: {
    toggleMobileMenu() {
      this.isActive = !this.isActive;
    },
  },
});
</script>
