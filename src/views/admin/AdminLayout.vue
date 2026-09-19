<script setup>
import { ref } from 'vue'
import { useRouter, useRoute, RouterLink, RouterView } from 'vue-router'

const router = useRouter()
const route = useRoute()

// State untuk toggle sidebar
const isSidebarOpen = ref(true)      // Desktop toggle
const isMobileMenuOpen = ref(false)  // Mobile drawer toggle
const isProfileDropdownOpen = ref(false) // Dropdown profil

// Daftar Menu Navigasi Admin
const menuItems = [
  { name: 'Dashboard', path: '/admin', icon: 'dashboard' },
  { name: 'Beranda', path: '/admin/beranda', icon: 'home' },
  { name: 'Tentang', path: '/admin/tentang', icon: 'info' },
  { name: 'Wisata & Fasilitas', path: '/admin/wisata', icon: 'location' },
  { name: 'Galeri', path: '/admin/galeri', icon: 'photo' },
  { name: 'Kontak', path: '/admin/kontak', icon: 'phone' },
  { name: 'Media', path: '/admin/media', icon: 'folder' },
  { name: 'Pengaturan Website', path: '/admin/pengaturan', icon: 'cog' },
]

// Cek menu aktif berdasarkan path saat ini
const isActive = (path) => {
  if (path === '/admin') {
    return route.path === '/admin' || route.path === '/admin/'
  }
  return route.path.startsWith(path)
}

// Toggle Sidebar Desktop
const toggleSidebar = () => {
  isSidebarOpen.value = !isSidebarOpen.value
}

// Toggle Sidebar Mobile
const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}

// Fungsi Logout
const handleLogout = () => {
  // Logika clearing auth token / session jika ada
  router.push('/login')
}
</script>

<template>
  <div class="min-h-screen bg-[#E0F2FE]/30 font-sans text-slate-700 flex overflow-x-hidden">
    
    <!-- OVERLAY MOBILE -->
    <div 
      v-if="isMobileMenuOpen" 
      @click="toggleMobileMenu" 
      class="fixed inset-0 bg-slate-900/40 z-40 lg:hidden backdrop-blur-sm transition-opacity"
    ></div>

    <!-- 1. SIDEBAR -->
    <aside 
      class="fixed top-0 bottom-0 left-0 z-50 bg-white border-r border-slate-100 shadow-lg shadow-sky-100/50 flex flex-col transition-all duration-300 ease-in-out"
      :class="[
        // Tampilan Desktop
        isSidebarOpen ? 'lg:w-64' : 'lg:w-20',
        // Tampilan Mobile (Slide In/Out)
        isMobileMenuOpen ? 'translate-x-0 w-64' : '-translate-x-full lg:translate-x-0'
      ]"
    >
      <!-- Logo & Header Sidebar -->
      <div class="h-16 flex items-center justify-between px-4 border-b border-sky-100/60 bg-white">
        <div class="flex items-center gap-3 overflow-hidden">
          <!-- Logo Icon Pantai Wabokeo -->
          <div class="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#0284C7] to-[#06B6D4] flex items-center justify-center text-white font-bold shrink-0 shadow-md shadow-sky-200">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
            </svg>
          </div>
          <!-- Nama Website (Disembunyikan saat sidebar desktop dikecilkan) -->
          <div v-show="isSidebarOpen || isMobileMenuOpen" class="flex flex-col">
            <span class="font-bold text-slate-800 text-base leading-tight">Pantai Wabokeo</span>
            <span class="text-xs text-[#0284C7] font-medium">Admin Panel</span>
          </div>
        </div>

        <!-- Tombol Tutup Sidebar Khusus Mobile -->
        <button @click="toggleMobileMenu" class="lg:hidden p-1.5 rounded-lg text-slate-400 hover:bg-slate-100">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <!-- Menu Navigasi -->
      <nav class="flex-1 overflow-y-auto px-3 py-4 space-y-1.5 scrollbar-thin">
        <RouterLink
          v-for="item in menuItems"
          :key="item.path"
          :to="item.path"
          @click="isMobileMenuOpen = false"
          class="flex items-center gap-3 px-3 py-2.5 rounded-xl font-medium text-sm transition-all duration-200 group relative"
          :class="[
            isActive(item.path) 
              ? 'bg-[#06B6D4] text-white shadow-md shadow-cyan-500/20' 
              : 'text-slate-600 hover:bg-[#E0F2FE]/60 hover:text-[#0284C7]'
          ]"
        >
          <!-- Ikon Menu (SVG Dynamic) -->
          <div class="shrink-0">
            <!-- Dashboard -->
            <svg v-if="item.icon === 'dashboard'" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
            </svg>
            <!-- Beranda -->
            <svg v-else-if="item.icon === 'home'" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            <!-- Tentang -->
            <svg v-else-if="item.icon === 'info'" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <!-- Wisata -->
            <svg v-else-if="item.icon === 'location'" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <!-- Galeri -->
            <svg v-else-if="item.icon === 'photo'" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <!-- Kontak -->
            <svg v-else-if="item.icon === 'phone'" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            <!-- Media -->
            <svg v-else-if="item.icon === 'folder'" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
            </svg>
            <!-- Pengaturan -->
            <svg v-else-if="item.icon === 'cog'" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </div>

          <!-- Text Menu -->
          <span 
            v-show="isSidebarOpen || isMobileMenuOpen" 
            class="truncate font-medium transition-opacity duration-200"
          >
            {{ item.name }}
          </span>

          <!-- Tooltip khusus saat sidebar dikecilkan di Desktop -->
          <div 
            v-if="!isSidebarOpen" 
            class="hidden lg:block absolute left-full rounded-md px-2 py-1 ml-3 bg-slate-800 text-white text-xs font-normal whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50 shadow-md"
          >
            {{ item.name }}
          </div>
        </RouterLink>
      </nav>

      <!-- Logout Button (Bagian Bawah Sidebar) -->
      <div class="p-3 border-t border-sky-100/60 bg-white">
        <button
          @click="handleLogout"
          class="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl font-medium text-sm text-rose-500 hover:bg-rose-50 transition-colors duration-200 group relative"
        >
          <svg class="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
          <span v-show="isSidebarOpen || isMobileMenuOpen" class="truncate">Keluar</span>

          <!-- Tooltip Logout -->
          <div 
            v-if="!isSidebarOpen" 
            class="hidden lg:block absolute left-full rounded-md px-2 py-1 ml-3 bg-rose-600 text-white text-xs font-normal whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50 shadow-md"
          >
            Keluar
          </div>
        </button>
      </div>
    </aside>

    <!-- CONTAINER UTAMA (Topbar + Main Content) -->
    <div 
      class="flex-1 flex flex-col min-w-0 transition-all duration-300 ease-in-out"
      :class="[isSidebarOpen ? 'lg:ml-64' : 'lg:ml-20']"
    >
      <!-- 2. TOPBAR -->
      <header class="h-16 bg-white/80 backdrop-blur-md border-b border-sky-100/60 sticky top-0 z-30 px-4 lg:px-6 flex items-center justify-between shadow-sm">
        <div class="flex items-center gap-3">
          <!-- Toggle Button (Desktop & Mobile) -->
          <button 
            @click="toggleSidebar" 
            class="hidden lg:flex p-2 rounded-xl text-slate-500 hover:bg-[#E0F2FE]/50 hover:text-[#0284C7] transition-colors"
            title="Toggle Sidebar"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h7" />
            </svg>
          </button>
          
          <button 
            @click="toggleMobileMenu" 
            class="lg:hidden p-2 rounded-xl text-slate-500 hover:bg-[#E0F2FE]/50 hover:text-[#0284C7] transition-colors"
          >
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>

          <!-- Judul Halaman Dinamis -->
          <h1 class="text-base lg:text-lg font-bold text-slate-800 capitalize truncate">
            {{ route.name ? route.name.replace('admin-', '').replace('-', ' ') : 'Admin Area' }}
          </h1>
        </div>

        <!-- Right Menu Topbar (Notifikasi & Profil) -->
        <div class="flex items-center gap-2 lg:gap-4">
          <!-- Tombol Notifikasi -->
          <button class="relative p-2 rounded-xl text-slate-500 hover:bg-[#E0F2FE]/50 hover:text-[#0284C7] transition-colors">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
            <!-- Badge Notifikasi -->
            <span class="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#06B6D4] ring-2 ring-white"></span>
          </button>

          <!-- Divider -->
          <div class="h-6 w-px bg-slate-200"></div>

          <!-- Dropdown Profil Admin -->
          <div class="relative">
            <button 
              @click="isProfileDropdownOpen = !isProfileDropdownOpen"
              class="flex items-center gap-2.5 p-1.5 rounded-xl hover:bg-[#E0F2FE]/40 transition-colors focus:outline-none"
            >
              <!-- Avatar -->
              <div class="w-8 h-8 lg:w-9 lg:h-9 rounded-xl bg-[#F5E6C8] border-2 border-[#0284C7]/20 flex items-center justify-center text-[#0284C7] font-bold text-sm">
                A
              </div>
              <!-- Info User (Desktop) -->
              <div class="hidden sm:flex flex-col text-left">
                <span class="text-xs lg:text-sm font-semibold text-slate-700 leading-none">Pengelola Wabokeo</span>
                <span class="text-[10px] text-slate-400 mt-0.5">Super Admin</span>
              </div>
              <svg class="w-4 h-4 text-slate-400 hidden sm:block" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            <!-- Popup Menu Dropdown -->
            <div 
              v-if="isProfileDropdownOpen" 
              @click="isProfileDropdownOpen = false"
              class="absolute right-0 mt-2 w-48 bg-white rounded-2xl shadow-xl border border-sky-100 py-1.5 z-50"
            >
              <div class="px-4 py-2 border-b border-slate-100 sm:hidden">
                <p class="text-sm font-semibold text-slate-700">Pengelola Wabokeo</p>
                <p class="text-xs text-slate-400">Super Admin</p>
              </div>
              <RouterLink to="/admin/pengaturan" class="flex items-center gap-2 px-4 py-2 text-xs font-medium text-slate-600 hover:bg-[#E0F2FE]/50 hover:text-[#0284C7]">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                Profil Saya
              </RouterLink>
              <button @click="handleLogout" class="w-full flex items-center gap-2 px-4 py-2 text-xs font-medium text-rose-500 hover:bg-rose-50 text-left">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
                Keluar
              </button>
            </div>
          </div>
        </div>
      </header>

      <!-- 3. MAIN CONTENT AREA -->
      <main class="flex-1 p-4 lg:p-6 overflow-x-hidden">
        <div class="max-w-7xl mx-auto">
          <!-- RouterView render semua child halaman admin di sini -->
          <RouterView />
        </div>
      </main>
      
      <!-- Footer Admin Ringkas -->
      <footer class="py-3 px-6 text-center text-xs text-slate-400 border-t border-sky-100/40 bg-white/40">
        &copy; {{ new Date().getFullYear() }} Pantai Wabokeo. All rights reserved.
      </footer>
    </div>

  </div>
</template>

<style scoped>
/* Transisi Smooth */
aside {
  will-change: transform, width;
}

/* Custom Scrollbar Ringkas untuk Sidebar */
.scrollbar-thin::-webkit-scrollbar {
  width: 4px;
}
.scrollbar-thin::-webkit-scrollbar-track {
  background: transparent;
}
.scrollbar-thin::-webkit-scrollbar-thumb {
  background: #e2e8f0;
  border-radius: 2px;
}
</style>