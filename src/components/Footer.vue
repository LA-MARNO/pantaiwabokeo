<template>
  <footer class="bg-gradient-to-br from-[#0284C7] to-[#0284C7]/90 text-[#FFFFFF] relative overflow-hidden border-t border-[#FFFFFF]/10">
    <!-- Decorative Wave Accent Top -->
    <div class="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#06B6D4] via-[#F5E6C8] to-[#06B6D4]"></div>

    <!-- Background Ambient Glow -->
    <div class="absolute -right-20 -bottom-20 w-80 h-80 bg-[#06B6D4]/20 rounded-full blur-3xl pointer-events-none"></div>
    <div class="absolute -left-20 -top-20 w-80 h-80 bg-[#F5E6C8]/10 rounded-full blur-3xl pointer-events-none"></div>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12 relative z-10">
      <!-- Main Grid Sections -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-12 border-b border-[#FFFFFF]/15">
        
        <!-- Section 1: Brand & Description (4 cols) -->
        <div class="lg:col-span-4 space-y-4">
          <router-link to="/" class="inline-flex items-center space-x-3 group">
            <div class="w-10 h-10 rounded-full bg-[#FFFFFF]/10 flex items-center justify-center border border-[#FFFFFF]/30 group-hover:bg-[#06B6D4] transition-colors duration-300">
              <svg class="w-6 h-6 text-[#FFFFFF]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </div>
            <span class="text-2xl font-extrabold tracking-tight text-[#FFFFFF] drop-shadow-sm">
              Pantai <span class="text-[#F5E6C8]">Wabokeo</span>
            </span>
          </router-link>

          <p class="text-sm text-[#FFFFFF]/80 leading-relaxed max-w-sm font-normal">
            Destinasi wisata pesisir pasir putih dengan keindahan panorama alam alami. Tempat terbaik untuk rekreasi, bersantai, dan mengabadikan momen berharga.
          </p>

          <!-- Social Media Icons -->
          <div class="pt-2 flex items-center space-x-3">
            <a 
              v-for="social in socialLinks" 
              :key="social.name"
              :href="social.url"
              target="_blank"
              rel="noopener noreferrer"
              :aria-label="social.name"
              class="w-10 h-10 rounded-xl bg-[#FFFFFF]/10 hover:bg-[#06B6D4] text-[#FFFFFF] flex items-center justify-center transition-all duration-300 border border-[#FFFFFF]/20 hover:border-transparent transform hover:-translate-y-1 shadow-sm"
            >
              <svg class="w-5 h-5 fill-current" viewBox="0 0 24 24" v-html="social.svgIcon"></svg>
            </a>
          </div>
        </div>

        <!-- Section 2: Quick Navigation (3 cols) -->
        <div class="lg:col-span-3 space-y-4">
          <h3 class="text-base font-bold text-[#F5E6C8] uppercase tracking-wider">
            Navigasi Halaman
          </h3>
          <ul class="space-y-2.5">
            <li v-for="nav in navItems" :key="nav.name">
              <router-link 
                :to="nav.href"
                class="text-sm text-[#FFFFFF]/85 hover:text-[#F5E6C8] transition-colors duration-200 inline-flex items-center space-x-2 group"
              >
                <span class="w-1.5 h-1.5 rounded-full bg-[#06B6D4] group-hover:bg-[#F5E6C8] group-hover:w-2.5 transition-all duration-200"></span>
                <span>{{ nav.name }}</span>
              </router-link>
            </li>
          </ul>
        </div>

        <!-- Section 3: Contact Info (5 cols) -->
        <div class="lg:col-span-5 space-y-4">
          <h3 class="text-base font-bold text-[#F5E6C8] uppercase tracking-wider">
            Informasi Kontak
          </h3>
          <ul class="space-y-3">
            <li class="flex items-start space-x-3 text-sm text-[#FFFFFF]/85">
              <div class="w-8 h-8 rounded-lg bg-[#FFFFFF]/10 flex items-center justify-center shrink-0 mt-0.5 border border-[#FFFFFF]/20 text-[#06B6D4]">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <span class="leading-relaxed">Kawasan Pesisir Pantai Wabokeo, Kabupaten Buton, Sulawesi Tenggara</span>
            </li>

            <li class="flex items-center space-x-3 text-sm text-[#FFFFFF]/85">
              <div class="w-8 h-8 rounded-lg bg-[#FFFFFF]/10 flex items-center justify-center shrink-0 border border-[#FFFFFF]/20 text-[#06B6D4]">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <span>+62 812-3456-7890</span>
            </li>

            <li class="flex items-center space-x-3 text-sm text-[#FFFFFF]/85">
              <div class="w-8 h-8 rounded-lg bg-[#FFFFFF]/10 flex items-center justify-center shrink-0 border border-[#FFFFFF]/20 text-[#06B6D4]">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <span>info@pantaiwabokeo.id</span>
            </li>
          </ul>
        </div>

      </div>

      <!-- Bottom Bar: Copyright & Scroll Top -->
      <div class="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-[#FFFFFF]/75 gap-4">
        <p class="text-center sm:text-left">
          &copy; {{ currentYear }} Pantai Wabokeo. Semua Hak Cipta Dilindungi.
        </p>

        <!-- Back to Top Button -->
        <button 
          @click="scrollToTop" 
          class="inline-flex items-center space-x-1.5 hover:text-[#F5E6C8] transition-colors focus:outline-none group"
          aria-label="Kembali ke atas"
        >
          <span>Kembali ke atas</span>
          <div class="w-6 h-6 rounded-full bg-[#FFFFFF]/10 group-hover:bg-[#06B6D4] flex items-center justify-center transition-colors">
            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 15l7-7 7 7" />
            </svg>
          </div>
        </button>
      </div>

    </div>
  </footer>
</template>

<script>
export default {
  name: 'FooterWabokeo',
  data() {
    return {
      currentYear: new Date().getFullYear(),
      navItems: [
        { name: 'Beranda', href: '/' },
        { name: 'Tentang', href: '/tentang' },
        { name: 'Wisata & Fasilitas', href: '/wisata' },
        { name: 'Galeri', href: '/galeri' },
        { name: 'Kontak', href: '/kontak' }
      ],
      socialLinks: [
        {
          name: 'Instagram',
          url: 'https://instagram.com',
          svgIcon: '<path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>'
        },
        {
          name: 'Facebook',
          url: 'https://facebook.com',
          svgIcon: '<path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z"/>'
        },
        {
          name: 'TikTok',
          url: 'https://tiktok.com',
          svgIcon: '<path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.82.56-1.31 1.56-1.27 2.55.01.87.42 1.72 1.12 2.23.83.62 1.94.77 2.92.42 1.02-.34 1.83-1.23 1.99-2.29.08-1.85.03-3.71.04-5.56 0-3.72-.01-7.44.02-11.16z"/>'
        },
        {
          name: 'WhatsApp',
          url: 'https://wa.me/6281234567890',
          svgIcon: '<path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>'
        }
      ]
    }
  },
  methods: {
    scrollToTop() {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      })
    }
  }
}
</script>