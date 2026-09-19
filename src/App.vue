<script setup>
import { useRoute } from 'vue-router'
import Navbar from './components/Navbar.vue'
import Footer from './components/Footer.vue'

const route = useRoute()
</script>

<template>
 <div id="app">
    <!-- Cek apakah nama route sudah ada/terbaca sebelum memeriksa meta -->
    <Navbar v-if="route.name && !route.meta.hideNavbarFooter" />
    
    <RouterView />

    <Footer v-if="route.name && !route.meta.hideNavbarFooter" />
  </div>
</template>

