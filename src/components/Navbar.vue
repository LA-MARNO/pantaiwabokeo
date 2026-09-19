<template>
  <header 
    :class="[
      'fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out shadow-md',
      'bg-[#0284C7]',
      isScrolled ? 'py-3 bg-opacity-95 backdrop-blur-md shadow-lg' : 'py-4 bg-opacity-100',
      isHidden ? '-translate-y-full' : 'translate-y-0'
    ]"
  >
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between">
        
        <!-- Logo & Brand -->
        <router-link to="/" class="flex items-center space-x-3 group">
          <div class="w-10 h-10 rounded-full bg-[#FFFFFF]/10 flex items-center justify-center border border-[#FFFFFF]/30 group-hover:bg-[#06B6D4] transition-colors duration-300">
            <svg class="w-6 h-6 text-[#FFFFFF]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          </div>
          <span class="text-xl sm:text-2xl font-bold tracking-tight text-[#FFFFFF] drop-shadow-sm">
            Pantai <span class="text-[#F5E6C8]">Wabokeo</span>
          </span>
        </router-link>

        <!-- Desktop Navigation Menu -->
        <nav class="hidden md:flex items-center space-x-1 lg:space-x-2">
          <router-link 
            v-for="item in navItems" 
            :key="item.name" 
            :to="item.href"
            class="px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 text-[#FFFFFF] hover:bg-[#E0F2FE] hover:text-[#0284C7]"
            active-class="bg-[#06B6D4] text-[#FFFFFF] shadow-sm !hover:bg-[#06B6D4] !hover:text-[#FFFFFF]"
            exact
          >
            {{ item.name }}
          </router-link>
        </nav>

        <!-- CTA Button (Desktop) -->
        <div class="hidden md:flex items-center space-x-4">
          <router-link 
            to="/admin" 
            class="px-4 py-2 rounded-full text-sm font-semibold bg-[#F5E6C8] text-[#0284C7] hover:bg-[#06B6D4] hover:text-[#FFFFFF] transition-all duration-300 shadow-sm hover:shadow-md transform hover:-translate-y-0.5"
          >
            Jelajahi Sekarang
          </router-link>
        </div>

        <!-- Mobile Menu Button -->
        <div class="md:hidden flex items-center">
          <button 
            @click="isMobileMenuOpen = !isMobileMenuOpen"
            type="button"
            class="p-2 rounded-lg text-[#FFFFFF] hover:bg-[#06B6D4] focus:outline-none transition-colors duration-200"
            aria-label="Toggle menu"
          >
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path 
                v-if="!isMobileMenuOpen" 
                stroke-linecap="round" 
                stroke-linejoin="round" 
                stroke-width="2" 
                d="M4 6h16M4 12h16M4 18h16" 
              />
              <path 
                v-else 
                stroke-linecap="round" 
                stroke-linejoin="round" 
                stroke-width="2" 
                d="M6 18L18 6M6 6l12 12" 
              />
            </svg>
          </button>
        </div>

      </div>
    </div>

    <!-- Mobile Navigation Drawer -->
    <transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="opacity-0 -translate-y-2"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 -translate-y-2"
    >
      <div 
        v-if="isMobileMenuOpen" 
        class="md:hidden bg-[#0284C7] border-t border-[#FFFFFF]/10 px-4 pt-3 pb-6 shadow-xl space-y-2"
      >
        <router-link 
          v-for="item in navItems" 
          :key="item.name" 
          :to="item.href"
          @click="isMobileMenuOpen = false"
          class="block px-4 py-2.5 rounded-lg text-base font-medium transition-colors duration-200 text-[#FFFFFF] hover:bg-[#E0F2FE] hover:text-[#0284C7]"
          active-class="bg-[#06B6D4] text-[#FFFFFF]"
          exact
        >
          {{ item.name }}
        </router-link>
        
        <div class="pt-2">
          <router-link 
            to="/wisata" 
            @click="isMobileMenuOpen = false"
            class="block w-full text-center px-4 py-2.5 rounded-full text-base font-semibold bg-[#F5E6C8] text-[#0284C7] hover:bg-[#06B6D4] hover:text-[#FFFFFF] transition-colors duration-300 shadow-sm"
          >
            Jelajahi Sekarang
          </router-link>
        </div>
      </div>
    </transition>
  </header>
</template>

<script>
export default {
  name: 'NavbarWabokeo',
  data() {
    return {
      isScrolled: false,
      isHidden: false,
      isMobileMenuOpen: false,
      lastScrollPosition: 0,
      navItems: [
        { name: 'Beranda', href: '/' },
        { name: 'Tentang', href: '/tentang' },
        { name: 'Wisata & Fasilitas', href: '/wisata' },
        { name: 'Galeri', href: '/galeri' },
        { name: 'Kontak', href: '/kontak' }
      ]
    }
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll)
  },
  beforeUnmount() {
    window.removeEventListener('scroll', this.handleScroll)
  },
  methods: {
    handleScroll() {
      const currentScrollPosition = window.pageYOffset || document.documentElement.scrollTop
      
      if (currentScrollPosition < 0) return

      this.isScrolled = currentScrollPosition > 50

      if (Math.abs(currentScrollPosition - this.lastScrollPosition) < 15) return

      if (currentScrollPosition > this.lastScrollPosition && currentScrollPosition > 100) {
        this.isHidden = true
        this.isMobileMenuOpen = false
      } else {
        this.isHidden = false
      }

      this.lastScrollPosition = currentScrollPosition
    }
  }
}
</script>