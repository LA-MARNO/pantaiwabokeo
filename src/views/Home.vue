<template>
  <div class="w-full overflow-x-hidden bg-slate-50 text-slate-900 py-10">
    
    <!-- Hero Section (Full Width & Full Screen) -->
    <section class="relative w-full min-h-screen flex items-center justify-center bg-slate-950 text-white overflow-hidden">
      <!-- Background Image dengan Overlay Kontras Tinggi -->
      <div class="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=2000&q=80" 
          alt="Pantai Wabokeo" 
          class="w-full h-full object-cover object-center scale-105 animate-pulse-slow"
        />
        <!-- Dual Layer Gradient Overlay untuk Menjamin Keterbacaan Teks -->
        <div class="absolute inset-0 bg-slate-950/60"></div>
        <div class="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-slate-950/40"></div>
      </div>

      <!-- Hero Content -->
      <div class="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-20 text-center" data-aos="fade-up" data-aos-duration="1000">
        <span class="inline-block px-5 py-2 rounded-full bg-sky-500/30 backdrop-blur-md border border-sky-300/40 text-sky-100 text-xs sm:text-sm font-bold tracking-widest uppercase mb-6 shadow-md">
          Surga Pesisir Tersembunyi
        </span>
        
        <h1 class="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight leading-tight mb-6 drop-shadow-2xl">
          Keindahan Alami <br />
          <span class="bg-gradient-to-r from-sky-300 via-cyan-200 to-teal-200 bg-clip-text text-transparent">
            Pantai Wabokeo
          </span>
        </h1>
        
        <p class="text-base sm:text-xl md:text-2xl text-slate-100 max-w-3xl mx-auto mb-10 font-medium leading-relaxed drop-shadow-md">
          Nikmati hamparan pasir putih bersih, deburan ombak yang menenangkan, dan pemandangan matahari terbenam yang memukau.
        </p>
        
        <div class="flex flex-col sm:flex-row items-center justify-center gap-5 max-w-md mx-auto sm:max-w-none">
          <router-link 
            to="/reservasi" 
            class="w-full sm:w-auto inline-flex items-center justify-center px-9 py-4 rounded-full bg-sky-500 hover:bg-sky-600 !text-white font-extrabold text-base sm:text-lg shadow-lg shadow-sky-500/40 hover:shadow-sky-500/60 hover:-translate-y-1 active:translate-y-0 transition-all duration-300 no-underline"
          >
            Jelajahi Sekarang
          </router-link>
          <router-link 
            to="/jelajah" 
            class="w-full sm:w-auto inline-flex items-center justify-center px-9 py-4 rounded-full bg-slate-900/80 hover:bg-slate-900 border border-slate-400/50 !text-white font-bold text-base sm:text-lg hover:-translate-y-1 active:translate-y-0 transition-all duration-300 no-underline backdrop-blur-sm"
          >
            Tonton Video
          </router-link>
        </div>
      </div>
    </section>

    <!-- Highlights Section (Full Width Canvas) -->
    <section class="w-full py-24 bg-white border-b border-slate-100">
      <div class="w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div class="text-center mb-16" data-aos="fade-up">
          <span class="text-sky-600 font-bold tracking-widest text-xs uppercase bg-sky-50 px-3.5 py-1.5 rounded-md border border-sky-100">
            Keunggulan Utama
          </span>
          <h2 class="text-3xl sm:text-5xl font-black text-slate-900 mt-4 tracking-tight">
            Mengapa Memilih Wabokeo?
          </h2>
          <p class="text-slate-600 mt-4 text-base sm:text-lg max-w-2xl mx-auto font-normal">
            Pengalaman wisata bahari tak terlupakan dengan penataan kawasan pantai yang bersih dan asri.
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10">
          <div 
            v-for="(item, idx) in highlights" 
            :key="idx" 
            class="bg-slate-50 p-8 sm:p-10 rounded-3xl border border-slate-200/80 shadow-sm hover:shadow-xl hover:border-sky-300 transition-all duration-300 hover:-translate-y-2 group"
            data-aos="fade-up" 
            :data-aos-delay="idx * 150"
          >
            <div class="w-16 h-16 rounded-2xl bg-sky-500 text-white flex items-center justify-center text-3xl mb-6 shadow-md shadow-sky-500/20 group-hover:scale-110 transition-transform">
              {{ item.icon }}
            </div>
            <h3 class="text-2xl font-bold text-slate-900 mb-3">{{ item.title }}</h3>
            <p class="text-slate-600 text-base leading-relaxed font-normal">{{ item.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Gallery Section (Full Width Layout) -->
    <section class="w-full py-24 bg-slate-950 text-white">
      <div class="w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        
        <div class="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6" data-aos="fade-right">
          <div>
            <span class="text-sky-400 font-bold tracking-widest text-xs uppercase bg-sky-950 px-3.5 py-1.5 rounded-md border border-sky-800">
              Galeri Foto
            </span>
            <h2 class="text-3xl sm:text-5xl font-black text-white mt-4 tracking-tight">
              Pesona Visual Pantai
            </h2>
          </div>
          <router-link 
            to="/galeri" 
            class="inline-flex items-center gap-2 text-sky-400 hover:text-sky-300 font-bold text-base no-underline group"
          >
            Lihat Semua Galeri 
            <span class="group-hover:translate-x-1 transition-transform">&rarr;</span>
          </router-link>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div 
            v-for="(img, idx) in galleryImages" 
            :key="idx"
            class="relative h-80 rounded-3xl overflow-hidden group border border-slate-800 shadow-lg"
            data-aos="zoom-in"
            :data-aos-delay="idx * 100"
          >
            <img 
              :src="img.url" 
              :alt="img.caption" 
              class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
            />
            <div class="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent opacity-80 group-hover:opacity-95 transition-opacity duration-300 flex items-end p-6">
              <span class="text-white font-bold text-lg drop-shadow-md">{{ img.caption }}</span>
            </div>
          </div>
        </div>

      </div>
    </section>

    <!-- CTA Section (Full Width Canvas dengan Card Kontras) -->
    <section class="w-full py-24 bg-slate-100">
      <div class="w-full max-w-6xl mx-auto px-6 sm:px-8 lg:px-12">
        <div 
          class="relative overflow-hidden rounded-3xl bg-gradient-to-br from-sky-600 via-sky-500 to-cyan-600 p-10 sm:p-16 text-center text-white shadow-2xl shadow-sky-500/30 border border-sky-400/30"
          data-aos="flip-up"
        >
          <h2 class="text-3xl sm:text-5xl font-black mb-6 leading-tight drop-shadow-md">
            Siap Memulai Liburan Impian Anda?
          </h2>
          <p class="text-white text-base sm:text-xl max-w-2xl mx-auto mb-10 font-medium leading-relaxed drop-shadow-sm">
            Dapatkan akses tiket masuk tanpa antre dan nikmati berbagai fasilitas eksklusif di Pantai Wabokeo.
          </p>
          <router-link 
            to="/reservasi" 
            class="inline-flex items-center justify-center px-10 py-4 rounded-full bg-slate-950 hover:bg-slate-900 !text-white font-black text-lg shadow-xl hover:scale-105 active:scale-100 transition-all no-underline"
          >
            Pesan Tiket Sekarang
          </router-link>
        </div>
      </div>
    </section>

  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import AOS from 'aos'
import 'aos/dist/aos.css'

onMounted(() => {
  AOS.init({
    duration: 800,
    once: true,
    easing: 'ease-out-cubic'
  })
})

const highlights = [
  {
    icon: '🏝️',
    title: 'Pasir Putih Alami',
    description: 'Hamparan pasir yang lembut dan bersih sepanjang garis pantai, ideal untuk bersantai dan beraktivitas bersama keluarga.'
  },
  {
    icon: '🌅',
    title: 'Sunset Spektakuler',
    description: 'Nikmati pemandangan matahari terbenam dengan siluet horizon laut yang memukau dan romantis setiap sore.'
  },
  {
    icon: '🏄‍♂️',
    title: 'Wahana Air & Wisata',
    description: 'Fasilitas lengkap mulai dari snorkeling, banana boat, hingga penyewaan gazebo pantai untuk kenyamanan pengunjung.'
  }
]

const galleryImages = [
  {
    url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
    caption: 'Tepi Pantai Pagi Hari'
  },
  {
    url: 'https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&w=800&q=80',
    caption: 'Pemandangan Garis Pantai'
  },
  {
    url: 'https://images.unsplash.com/photo-1473116763249-2faaef81ccda?auto=format&fit=crop&w=800&q=80',
    caption: 'Spot Sunset Wabokeo'
  },
  {
    url: 'https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?auto=format&fit=crop&w=800&q=80',
    caption: 'Air Laut Jernih'
  }
]
</script>

<style scoped>
@keyframes pulseSlow {
  0%, 100% { transform: scale(1.05); }
  50% { transform: scale(1.1); }
}

.animate-pulse-slow {
  animation: pulseSlow 14s infinite ease-in-out;
}
</style>