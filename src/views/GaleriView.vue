<template>
  <div class="min-h-screen bg-[#E0F2FE]/30 pt-24 pb-16">
    <!-- Hero Section -->
    <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
      <div class="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#0284C7] to-[#06B6D4] text-[#FFFFFF] p-8 sm:p-12 lg:p-16 shadow-xl animate-fade-in-down">
        <!-- Accent Glow -->
        <div class="absolute -right-10 -bottom-10 w-64 h-64 bg-[#F5E6C8]/20 rounded-full blur-3xl pointer-events-none"></div>
        <div class="absolute -left-10 -top-10 w-64 h-64 bg-[#FFFFFF]/10 rounded-full blur-2xl pointer-events-none"></div>

        <div class="relative z-10 max-w-3xl">
          <span class="inline-block px-4 py-1.5 rounded-full bg-[#F5E6C8] text-[#0284C7] text-xs sm:text-sm font-semibold tracking-wide uppercase mb-4 shadow-sm">
            Lensa Pesisir
          </span>
          <h1 class="text-3xl sm:text-5xl font-extrabold tracking-tight text-[#FFFFFF] drop-shadow-sm mb-4">
            Galeri Pantai Wabokeo
          </h1>
          <p class="text-base sm:text-xl text-[#FFFFFF]/90 leading-relaxed font-normal">
            Abadikan setiap momen keindahan pesisir pasir putih, hangatnya paparan mentari, dan keseruan rekreasi dalam dokumentasi visual kami.
          </p>
        </div>
      </div>
    </section>

    <!-- Filter Category Section -->
    <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10 animate-fade-in">
      <div class="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
        <button
          v-for="cat in categories"
          :key="cat"
          @click="activeCategory = cat"
          :class="[
            'px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all duration-300 shadow-sm border',
            activeCategory === cat
              ? 'bg-[#0284C7] text-[#FFFFFF] border-[#0284C7] shadow-md transform -translate-y-0.5'
              : 'bg-[#FFFFFF] text-[#0284C7] border-[#E0F2FE] hover:bg-[#E0F2FE]/80 hover:border-[#06B6D4]'
          ]"
        >
          {{ cat }}
        </button>
      </div>
    </section>

    <!-- Gallery Grid -->
    <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
      <transition-group 
        tag="div" 
        name="gallery-list"
        class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        <div
          v-for="(photo, index) in filteredPhotos"
          :key="photo.id"
          @click="openLightbox(index)"
          class="group relative overflow-hidden rounded-2xl bg-[#FFFFFF] shadow-md hover:shadow-2xl border border-[#E0F2FE] cursor-pointer transition-all duration-300 transform hover:-translate-y-1 animate-slide-up"
          :class="[
            photo.span === 'tall' ? 'sm:row-span-2' : '',
            photo.span === 'wide' ? 'sm:col-span-2' : ''
          ]"
          :style="{ animationDelay: `${(index % 6) * 100}ms` }"
        >
          <!-- Image Frame -->
          <div class="w-full h-64 sm:h-full min-h-[250px] relative overflow-hidden bg-[#E0F2FE]">
            <img
              :src="photo.image"
              :alt="photo.title"
              class="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
            />
            
            <!-- Hover Overlay -->
            <div class="absolute inset-0 bg-gradient-to-t from-[#0284C7]/80 via-[#0284C7]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
              <span class="inline-block self-start px-3 py-1 rounded-full bg-[#F5E6C8] text-[#0284C7] text-xs font-bold mb-2 shadow-sm">
                {{ photo.category }}
              </span>
              <h3 class="text-lg font-bold text-[#FFFFFF] drop-shadow-sm">
                {{ photo.title }}
              </h3>
              <p class="text-xs text-[#FFFFFF]/90 mt-1 line-clamp-2">
                {{ photo.description }}
              </p>
            </div>
          </div>
        </div>
      </transition-group>
    </section>

    <!-- Modal Lightbox -->
    <div
      v-if="lightboxIndex !== null"
      class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-fade-in"
      @click.self="closeLightbox"
      @keydown.esc="closeLightbox"
      tabindex="0"
    >
      <!-- Main Lightbox Container -->
      <div class="relative max-w-4xl w-full bg-[#FFFFFF] rounded-3xl overflow-hidden shadow-2xl border border-[#E0F2FE] flex flex-col my-auto animate-scale-up">
        
        <!-- Close Button -->
        <button
          @click="closeLightbox"
          class="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-[#FFFFFF]/80 hover:bg-[#FFFFFF] text-[#0284C7] flex items-center justify-center transition-colors duration-200 shadow-md focus:outline-none"
          aria-label="Tutup Galeri"
        >
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <!-- Image Wrapper with Navigation -->
        <div class="relative w-full h-[60vh] bg-black/90 flex items-center justify-center overflow-hidden group">
          <img
            :src="currentPhoto.image"
            :alt="currentPhoto.title"
            class="max-w-full max-h-full object-contain transition-all duration-300"
          />

          <!-- Prev Button -->
          <button
            @click="prevPhoto"
            class="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-[#FFFFFF]/80 hover:bg-[#FFFFFF] text-[#0284C7] flex items-center justify-center transition-all duration-200 shadow-lg focus:outline-none"
            aria-label="Foto Sebelumnya"
          >
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <!-- Next Button -->
          <button
            @click="nextPhoto"
            class="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-[#FFFFFF]/80 hover:bg-[#FFFFFF] text-[#0284C7] flex items-center justify-center transition-all duration-200 shadow-lg focus:outline-none"
            aria-label="Foto Selanjutnya"
          >
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        <!-- Details Footer -->
        <div class="p-6 bg-[#FFFFFF] flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-t border-[#E0F2FE]">
          <div>
            <span class="text-xs font-bold text-[#06B6D4] uppercase tracking-wider">
              {{ currentPhoto.category }}
            </span>
            <h3 class="text-xl font-bold text-[#0284C7] mt-0.5">
              {{ currentPhoto.title }}
            </h3>
            <p class="text-xs sm:text-sm text-gray-600 mt-1">
              {{ currentPhoto.description }}
            </p>
          </div>
          <div class="text-xs text-gray-400 font-semibold self-end sm:self-center">
            {{ lightboxIndex + 1 }} / {{ filteredPhotos.length }}
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'GaleriView',
  data() {
    return {
      activeCategory: 'Semua',
      lightboxIndex: null,
      categories: ['Semua', 'Pemandangan', 'Aktivitas', 'Fasilitas', 'Sunset','Makanan'],
      photos: [
        {
          id: 1,
          title: 'Garis Pesisir Pasir Putih',
          category: 'Makanan',
          span: 'wide',
          image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
          description: 'Pemandangan terbentangnya pasir putih alami berpadu dengan jernihnya perairan laut Pantai Wabokeo.'
        },
        {
          id: 2,
          title: 'Momen Jingga Sunset',
          category: 'Sunset',
          span: 'tall',
          image: 'https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&w=800&q=80',
          description: 'Keindahan sunset dramatis dengan gradasi warna jingga dan keemasan di atas garis cakrawala.'
        },
        {
          id: 3,
          title: 'Petualangan Kano Santai',
          category: 'Aktivitas',
          span: 'normal',
          image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=800&q=80',
          description: 'Aktivitas mendayung kano di perairan pesisir yang tenang dan ramah untuk pemula.'
        },
        {
          id: 4,
          title: 'Gazebo Istirahat tepi Pantai',
          category: 'Fasilitas',
          span: 'normal',
          image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80',
          description: 'Area gazebo bersih dan teduh yang disiapkan bagi pengunjung untuk bersantai bersama keluarga.'
        },
        {
          id: 5,
          title: 'Siluet Deretan Kelapa',
          category: 'Pemandangan',
          span: 'tall',
          image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=800&q=80',
          description: 'Hiasan pepohonan kelapa yang memberikan kesejukan alami di pesisir pantai.'
        },
        {
          id: 6,
          title: 'Spot Dermaga Sunset',
          category: 'Sunset',
          span: 'wide',
          image: 'https://images.unsplash.com/photo-1495954222046-2c427ecb546d?auto=format&fit=crop&w=1200&q=80',
          description: 'Dermaga kayu estetis yang menjadi lokasi favorit pengabadi momen matahari terbenam.'
        },
        {
          id: 7,
          title: 'Keceriaan Bermain Air',
          category: 'Aktivitas',
          span: 'normal',
          image: 'https://images.unsplash.com/photo-1506953823976-52e1fdc0149a?auto=format&fit=crop&w=800&q=80',
          description: 'Sensasi kesegaran berenang dan bermain di tepi pantai dengan gelombang ombak yang aman.'
        },
        {
          id: 8,
          title: 'Area Parkir & Pusat Informasi',
          category: 'Fasilitas',
          span: 'normal',
          image: 'https://images.unsplash.com/photo-1590523741831-ab7e8b8f9c7f?auto=format&fit=crop&w=800&q=80',
          description: 'Fasilitas penunjang area parkir yang tertata rapi serta kemudahan layanan pengelola.'
        }
      ]
    }
  },
  computed: {
    filteredPhotos() {
      if (this.activeCategory === 'Semua') {
        return this.photos
      }
      return this.photos.filter(p => p.category === this.activeCategory)
    },
    currentPhoto() {
      if (this.lightboxIndex === null || !this.filteredPhotos[this.lightboxIndex]) {
        return {}
      }
      return this.filteredPhotos[this.lightboxIndex]
    }
  },
  methods: {
    openLightbox(index) {
      this.lightboxIndex = index
      document.body.style.overflow = 'hidden' // Mengunci scroll halaman saat modal terbuka
    },
    closeLightbox() {
      this.lightboxIndex = null
      document.body.style.overflow = '' // Mengembalikan scroll halaman
    },
    nextPhoto() {
      if (this.lightboxIndex !== null) {
        this.lightboxIndex = (this.lightboxIndex + 1) % this.filteredPhotos.length
      }
    },
    prevPhoto() {
      if (this.lightboxIndex !== null) {
        this.lightboxIndex = (this.lightboxIndex - 1 + this.filteredPhotos.length) % this.filteredPhotos.length
      }
    }
  }
}
</script>

<style scoped>
/* Keyframes Entrance Animation */
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes fadeInDown {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes scaleUp {
  from {
    opacity: 0;
    transform: scale(0.92);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

.animate-fade-in {
  animation: fadeIn 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

.animate-fade-in-down {
  animation: fadeInDown 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

.animate-slide-up {
  opacity: 0;
  animation: slideUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

.animate-scale-up {
  animation: scaleUp 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

/* Vue Filter Transition Animation */
.gallery-list-enter-active,
.gallery-list-leave-active {
  transition: all 0.4s ease;
}

.gallery-list-enter-from,
.gallery-list-leave-to {
  opacity: 0;
  transform: scale(0.9);
}

.gallery-list-move {
  transition: transform 0.4s ease;
}
</style>