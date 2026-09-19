<template>
  <div class="min-h-screen bg-slate-50 text-slate-800 flex flex-col font-sans antialiased overflow-x-hidden">
    
    <!-- TOAST NOTIFICATION -->
    <TransitionGroup 
      tag="div" 
      name="toast"
      class="fixed top-5 right-5 z-50 flex flex-col gap-2 pointer-events-none max-w-sm w-full px-4"
    >
      <div 
        v-for="toast in toasts" 
        :key="toast.id" 
        class="pointer-events-auto flex items-center justify-between p-4 rounded-xl shadow-lg border text-sm font-medium transition-all duration-300 transform"
        :class="{
          'bg-emerald-50 text-emerald-800 border-emerald-200': toast.type === 'success',
          'bg-rose-50 text-rose-800 border-rose-200': toast.type === 'error',
          'bg-sky-50 text-sky-800 border-sky-200': toast.type === 'info'
        }"
      >
        <div class="flex items-center gap-3">
          <!-- Icon Success -->
          <svg v-if="toast.type === 'success'" class="w-5 h-5 text-emerald-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <!-- Icon Error -->
          <svg v-else-if="toast.type === 'error'" class="w-5 h-5 text-rose-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <!-- Icon Info -->
          <svg v-else class="w-5 h-5 text-sky-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>{{ toast.message }}</span>
        </div>
        <button @click="removeToast(toast.id)" class="text-slate-400 hover:text-slate-600 ml-2">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
          </svg>
        </button>
      </div>
    </TransitionGroup>

    <div class="flex flex-1 relative min-h-screen">
      
      <!-- BACKDROP MOBILE FOR SIDEBAR -->
      <div 
        v-if="isMobileSidebarOpen" 
        @click="isMobileSidebarOpen = false"
        class="fixed inset-0 bg-slate-900/40 z-30 lg:hidden backdrop-blur-sm transition-opacity"
      ></div>

      <!-- SIDEBAR -->
      <aside 
        class="fixed lg:static inset-y-0 left-0 z-40 bg-white border-r border-slate-200 transition-all duration-300 ease-in-out flex flex-col justify-between shadow-sm"
        :class="[
          isSidebarCollapsed ? 'w-20' : 'w-64',
          isMobileSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        ]"
      >
        <!-- Top Sidebar Logo -->
        <div>
          <div class="h-16 flex items-center justify-between px-4 border-b border-slate-100">
            <div class="flex items-center gap-3 overflow-hidden">
              <div class="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#0284C7] to-[#06B6D4] flex items-center justify-center text-white font-black text-xl shadow-md shrink-0">
                W
              </div>
              <div v-if="!isSidebarCollapsed" class="whitespace-nowrap transition-opacity duration-200">
                <h2 class="font-bold text-slate-800 text-base leading-tight">Pantai Wabokeo</h2>
                <p class="text-xs text-[#0284C7] font-medium">Admin Panel</p>
              </div>
            </div>

            <!-- Hide/Show Sidebar Desktop Button -->
            <button 
              @click="isSidebarCollapsed = !isSidebarCollapsed" 
              class="hidden lg:flex p-1.5 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors"
              title="Toggle Sidebar"
            >
              <svg class="w-5 h-5 transition-transform duration-300" :class="{ 'rotate-180': isSidebarCollapsed }" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
              </svg>
            </button>
          </div>

          <!-- Navigation Links -->
          <nav class="p-3 space-y-1">
            <button 
              v-for="menu in menuItems" 
              :key="menu.id"
              @click="activeTab = menu.id; isMobileSidebarOpen = false"
              class="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl font-medium text-sm transition-all duration-200 relative group"
              :class="activeTab === menu.id 
                ? 'bg-[#E0F2FE] text-[#0284C7] font-semibold' 
                : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'"
              :title="isSidebarCollapsed ? menu.label : ''"
            >
              <component :is="menu.icon" class="w-5 h-5 shrink-0" :class="activeTab === menu.id ? 'text-[#0284C7]' : 'text-slate-400 group-hover:text-slate-600'" />
              <span v-if="!isSidebarCollapsed" class="whitespace-nowrap truncate">{{ menu.label }}</span>
              <span v-if="activeTab === menu.id && !isSidebarCollapsed" class="ml-auto w-1.5 h-1.5 rounded-full bg-[#0284C7]"></span>
            </button>
          </nav>
        </div>

        <!-- Logout Section -->
        <div class="p-3 border-t border-slate-100">
          <button 
            @click="handleLogout"
            class="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl font-medium text-sm text-rose-600 hover:bg-rose-50 transition-colors group"
            :title="isSidebarCollapsed ? 'Logout' : ''"
          >
            <svg class="w-5 h-5 shrink-0 text-rose-500 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            <span v-if="!isSidebarCollapsed" class="whitespace-nowrap">Logout</span>
          </button>
        </div>
      </aside>

      <!-- MAIN CONTENT AREA -->
      <div class="flex-1 flex flex-col min-w-0">
        
        <!-- TOPBAR HEADER -->
        <header class="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-4 lg:px-8 sticky top-0 z-20 shadow-xs">
          <div class="flex items-center gap-3">
            <button 
              @click="isMobileSidebarOpen = true" 
              class="lg:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-100"
            >
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <h1 class="text-lg font-bold text-slate-800 capitalize hidden sm:block">
              {{ currentMenuLabel }}
            </h1>
          </div>

          <div class="flex items-center gap-4">
            <!-- Quick Link to Website -->
            <a 
              href="#" 
              target="_blank" 
              class="hidden md:flex items-center gap-1.5 text-xs font-semibold text-[#0284C7] bg-[#E0F2FE] hover:bg-[#0284C7] hover:text-white px-3 py-1.5 rounded-lg transition-colors"
            >
              <span>Lihat Website</span>
              <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>

            <!-- Notification Dropdown Toggle -->
            <div class="relative">
              <button 
                @click="showNotifications = !showNotifications" 
                class="p-2 rounded-full text-slate-500 hover:bg-slate-100 hover:text-slate-700 relative transition-colors"
              >
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 01-6 0v-1m6 0H9" />
                </svg>
                <span class="absolute top-1 right-1 w-2.5 h-2.5 bg-rose-500 rounded-full ring-2 ring-white"></span>
              </button>

              <!-- Notifications Popup -->
              <div 
                v-if="showNotifications" 
                @click.away="showNotifications = false"
                class="absolute right-0 mt-2 w-80 bg-white rounded-2xl shadow-xl border border-slate-100 py-2 z-50 animate-in fade-in slide-in-from-top-2"
              >
                <div class="px-4 py-2 border-b border-slate-100 flex items-center justify-between">
                  <span class="font-bold text-sm text-slate-800">Notifikasi</span>
                  <span class="text-xs bg-[#E0F2FE] text-[#0284C7] px-2 py-0.5 rounded-full font-semibold">2 Baru</span>
                </div>
                <div class="divide-y divide-slate-50 max-h-64 overflow-y-auto">
                  <div class="p-3 hover:bg-slate-50 transition-colors cursor-pointer">
                    <p class="text-xs font-semibold text-slate-800">Pesan baru dari Budi</p>
                    <p class="text-xs text-slate-500 mt-0.5 line-clamp-1">Menanyakan harga sewa gazebo untuk rombongan...</p>
                    <span class="text-[10px] text-slate-400 mt-1 block">5 menit lalu</span>
                  </div>
                  <div class="p-3 hover:bg-slate-50 transition-colors cursor-pointer">
                    <p class="text-xs font-semibold text-slate-800">Ulasan Baru</p>
                    <p class="text-xs text-slate-500 mt-0.5 line-clamp-1">Pengunjung memberikan bintang 5 pada wahana banana boat.</p>
                    <span class="text-[10px] text-slate-400 mt-1 block">1 jam lalu</span>
                  </div>
                </div>
              </div>
            </div>

            <!-- Admin Profile -->
            <div class="flex items-center gap-3 pl-3 border-l border-slate-200">
              <img 
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150" 
                alt="Admin Avatar" 
                class="w-9 h-9 rounded-full object-cover ring-2 ring-[#06B6D4]/30"
              />
              <div class="hidden sm:block text-left">
                <p class="text-xs font-bold text-slate-800 leading-snug">Pengelola Pantai</p>
                <p class="text-[10px] font-medium text-slate-400">admin@wabokeo.com</p>
              </div>
            </div>
          </div>
        </header>

        <!-- PAGE CONTENT CONTAINER -->
        <main class="p-4 lg:p-8 flex-1 max-w-7xl w-full mx-auto">
          
          <!-- TAB 1: DASHBOARD MAIN -->
          <div v-if="activeTab === 'dashboard'" class="space-y-6">
            
            <!-- Welcome Banner -->
            <div class="bg-gradient-to-r from-[#0284C7] via-[#0284C7] to-[#06B6D4] rounded-2xl p-6 text-white shadow-md relative overflow-hidden flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div class="relative z-10 space-y-1">
                <h2 class="text-2xl font-extrabold tracking-tight">Selamat Datang di Admin Panel Pantai Wabokeo!</h2>
                <p class="text-sky-100 text-sm max-w-2xl">Kelola informasi publik, galeri foto, fasilitas, dan pesan masuk dengan mudah untuk memberikan pelayanan terbaik bagi para pengunjung.</p>
              </div>
              <button 
                @click="activeTab = 'wisata'" 
                class="relative z-10 bg-white text-[#0284C7] hover:bg-[#F5E6C8] font-semibold text-xs px-4 py-2.5 rounded-xl shadow-sm transition-all whitespace-nowrap"
              >
                + Kelola Wisata
              </button>
              <!-- Decorative Circles -->
              <div class="absolute -right-10 -bottom-10 w-48 h-48 bg-white/10 rounded-full blur-2xl pointer-events-none"></div>
            </div>

            <!-- STATISTIC CARDS -->
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              
              <!-- Total Wisata -->
              <div class="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm hover:shadow-md transition-shadow flex items-center justify-between">
                <div>
                  <p class="text-xs font-semibold text-slate-400 uppercase tracking-wider">Total Wisata</p>
                  <h3 class="text-2xl font-black text-slate-800 mt-1">{{ stats.wisata }}</h3>
                  <span class="text-xs font-medium text-emerald-600 inline-flex items-center gap-0.5 mt-1">
                    ↑ 2 destinasi baru
                  </span>
                </div>
                <div class="w-12 h-12 rounded-2xl bg-[#E0F2FE] text-[#0284C7] flex items-center justify-center shrink-0">
                  <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 21h18M3 10h18M3 6h18M3 14h18" />
                  </svg>
                </div>
              </div>

              <!-- Total Fasilitas -->
              <div class="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm hover:shadow-md transition-shadow flex items-center justify-between">
                <div>
                  <p class="text-xs font-semibold text-slate-400 uppercase tracking-wider">Total Fasilitas</p>
                  <h3 class="text-2xl font-black text-slate-800 mt-1">{{ stats.fasilitas }}</h3>
                  <span class="text-xs font-medium text-emerald-600 inline-flex items-center gap-0.5 mt-1">
                    ✓ Semua Aktif
                  </span>
                </div>
                <div class="w-12 h-12 rounded-2xl bg-cyan-50 text-[#06B6D4] flex items-center justify-center shrink-0">
                  <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
              </div>

              <!-- Foto Galeri -->
              <div class="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm hover:shadow-md transition-shadow flex items-center justify-between">
                <div>
                  <p class="text-xs font-semibold text-slate-400 uppercase tracking-wider">Foto Galeri</p>
                  <h3 class="text-2xl font-black text-slate-800 mt-1">{{ stats.galeri }}</h3>
                  <span class="text-xs font-medium text-emerald-600 inline-flex items-center gap-0.5 mt-1">
                    ↑ 12 minggu ini
                  </span>
                </div>
                <div class="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
                  <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
              </div>

              <!-- Total Pesan -->
              <div class="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm hover:shadow-md transition-shadow flex items-center justify-between">
                <div>
                  <p class="text-xs font-semibold text-slate-400 uppercase tracking-wider">Pesan / Kontak</p>
                  <h3 class="text-2xl font-black text-slate-800 mt-1">{{ stats.pesan }}</h3>
                  <span class="text-xs font-medium text-amber-600 inline-flex items-center gap-0.5 mt-1">
                    ● 3 Belum Dibaca
                  </span>
                </div>
                <div class="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
                  <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
              </div>

            </div>

            <!-- STATISTIK AKTIVITAS & GRAFIK -->
            <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
              
              <!-- Grafik Kunjungan Sederhana -->
              <div class="lg:col-span-2 bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex flex-col justify-between">
                <div class="flex items-center justify-between mb-4">
                  <div>
                    <h3 class="font-bold text-slate-800 text-base">Statistik Pengunjung Website</h3>
                    <p class="text-xs text-slate-400">Perkiraan tren pengunjung dalam 7 hari terakhir</p>
                  </div>
                  <span class="text-xs bg-[#E0F2FE] text-[#0284C7] font-semibold px-2.5 py-1 rounded-lg">
                    Total: 2,420
                  </span>
                </div>

                <!-- Custom Bar Chart Visualization -->
                <div class="h-48 flex items-end justify-between gap-2 pt-8 px-2">
                  <div v-for="(bar, idx) in chartData" :key="idx" class="flex-1 flex flex-col items-center gap-2 group">
                    <div class="text-[10px] text-slate-400 group-hover:text-[#0284C7] font-bold transition-colors">{{ bar.value }}</div>
                    <div class="w-full bg-slate-100 rounded-t-lg relative overflow-hidden flex items-end h-32">
                      <div 
                        class="w-full bg-gradient-to-t from-[#0284C7] to-[#06B6D4] rounded-t-lg transition-all duration-500 group-hover:opacity-90"
                        :style="{ height: `${(bar.value / 500) * 100}%` }"
                      ></div>
                    </div>
                    <span class="text-xs text-slate-500 font-medium">{{ bar.day }}</span>
                  </div>
                </div>
              </div>

              <!-- Ringkasan Info Website -->
              <div class="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex flex-col justify-between">
                <div>
                  <h3 class="font-bold text-slate-800 text-base mb-4">Aktivitas Terakhir</h3>
                  <div class="space-y-4">
                    <div class="flex items-start gap-3">
                      <div class="w-8 h-8 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold">
                        +
                      </div>
                      <div>
                        <p class="text-xs font-semibold text-slate-800">Menambahkan foto pantai sore</p>
                        <p class="text-[11px] text-slate-400">Oleh Admin • 2 jam lalu</p>
                      </div>
                    </div>

                    <div class="flex items-start gap-3">
                      <div class="w-8 h-8 rounded-full bg-sky-100 text-[#0284C7] flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold">
                        ✎
                      </div>
                      <div>
                        <p class="text-xs font-semibold text-slate-800">Memperbarui tarif wahana air</p>
                        <p class="text-[11px] text-slate-400">Oleh Admin • Kemarin</p>
                      </div>
                    </div>

                    <div class="flex items-start gap-3">
                      <div class="w-8 h-8 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold">
                        ✉
                      </div>
                      <div>
                        <p class="text-xs font-semibold text-slate-800">Menerima pesan dari wisatawan</p>
                        <p class="text-[11px] text-slate-400">Form Kontak • 3 hari lalu</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="mt-6 pt-4 border-t border-slate-100 bg-[#F5E6C8]/20 -mx-6 -mb-6 p-4 rounded-b-2xl">
                  <div class="flex items-center justify-between text-xs">
                    <span class="font-medium text-slate-600">Status Server Website</span>
                    <span class="inline-flex items-center gap-1 font-bold text-emerald-600">
                      <span class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span> Normal
                    </span>
                  </div>
                </div>
              </div>

            </div>

            <!-- RECENT MESSAGES PREVIEW TABLE -->
            <div class="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
              <div class="p-5 border-b border-slate-100 flex items-center justify-between">
                <div>
                  <h3 class="font-bold text-slate-800 text-base">Pesan Masuk Terbaru</h3>
                  <p class="text-xs text-slate-400">Pesan langsung dari pengunjung melalui formulir kontak</p>
                </div>
                <button @click="activeTab = 'kontak'" class="text-xs text-[#0284C7] hover:underline font-semibold">
                  Lihat Semua
                </button>
              </div>
              <div class="overflow-x-auto">
                <table class="w-full text-left border-collapse">
                  <thead>
                    <tr class="bg-slate-50 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                      <th class="p-4">Pengirim</th>
                      <th class="p-4">Subjek</th>
                      <th class="p-4">Pesan</th>
                      <th class="p-4">Tanggal</th>
                      <th class="p-4 text-center">Status</th>
                    </tr>
                  </thead>
                  <tbody class="divide-y divide-slate-100 text-xs text-slate-600">
                    <tr v-for="pesan in pesanList.slice(0, 3)" :key="pesan.id" class="hover:bg-slate-50/50">
                      <td class="p-4 font-semibold text-slate-800">
                        {{ pesan.nama }}
                        <span class="block font-normal text-slate-400 text-[10px]">{{ pesan.email }}</span>
                      </td>
                      <td class="p-4 font-medium">{{ pesan.subjek }}</td>
                      <td class="p-4 max-w-xs truncate text-slate-500">{{ pesan.isi }}</td>
                      <td class="p-4 text-slate-400 whitespace-nowrap">{{ pesan.tanggal }}</td>
                      <td class="p-4 text-center">
                        <span 
                          class="px-2 py-1 rounded-full text-[10px] font-bold"
                          :class="pesan.dibaca ? 'bg-slate-100 text-slate-500' : 'bg-amber-100 text-amber-700'"
                        >
                          {{ pesan.dibaca ? 'Dibaca' : 'Baru' }}
                        </span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

          </div>

          <!-- TAB 2: EDIT BERANDA -->
          <div v-else-if="activeTab === 'beranda'" class="space-y-6">
            <div class="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-6">
              <div>
                <h3 class="text-base font-bold text-slate-800">Konten Halaman Beranda</h3>
                <p class="text-xs text-slate-400">Ubah judul utama dan deskripsi pada bagian Hero Section beranda.</p>
              </div>

              <div class="space-y-4">
                <div>
                  <label class="block text-xs font-semibold text-slate-700 mb-1">Judul Utama Hero (Heading)</label>
                  <input 
                    v-model="berandaForm.title" 
                    type="text" 
                    class="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-[#06B6D4] focus:outline-none"
                  />
                </div>
                <div>
                  <label class="block text-xs font-semibold text-slate-700 mb-1">Sub Judul / Tagline</label>
                  <input 
                    v-model="berandaForm.tagline" 
                    type="text" 
                    class="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-[#06B6D4] focus:outline-none"
                  />
                </div>
                <div>
                  <label class="block text-xs font-semibold text-slate-700 mb-1">Deskripsi Singkat Beranda</label>
                  <textarea 
                    v-model="berandaForm.description" 
                    rows="4" 
                    class="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-[#06B6D4] focus:outline-none"
                  ></textarea>
                </div>
                <div>
                  <label class="block text-xs font-semibold text-slate-700 mb-1">Gambar Hero Background</label>
                  <div class="flex items-center gap-4">
                    <img :src="berandaForm.heroImage" class="w-24 h-16 object-cover rounded-lg border" />
                    <input type="file" @change="handleFileUpload($event, 'berandaForm', 'heroImage')" class="text-xs text-slate-500" />
                  </div>
                </div>
              </div>

              <div class="flex justify-end pt-4 border-t border-slate-100">
                <button @click="saveBeranda" class="bg-[#0284C7] hover:bg-[#0284C7]/90 text-white text-xs font-semibold px-5 py-2.5 rounded-xl shadow-sm transition-all">
                  Simpan Perubahan Beranda
                </button>
              </div>
            </div>
          </div>

          <!-- TAB 3: EDIT TENTANG -->
          <div v-else-if="activeTab === 'tentang'" class="space-y-6">
            <div class="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-6">
              <div>
                <h3 class="text-base font-bold text-slate-800">Informasi Halaman Tentang Pantai Wabokeo</h3>
                <p class="text-xs text-slate-400">Atur cerita profil, visi, dan misi destinasi wisata.</p>
              </div>

              <div class="space-y-4">
                <div>
                  <label class="block text-xs font-semibold text-slate-700 mb-1">Sejarah / Profil Singkat</label>
                  <textarea 
                    v-model="tentangForm.sejarah" 
                    rows="4" 
                    class="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-[#06B6D4] focus:outline-none"
                  ></textarea>
                </div>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label class="block text-xs font-semibold text-slate-700 mb-1">Visi Destinasi</label>
                    <textarea 
                      v-model="tentangForm.visi" 
                      rows="3" 
                      class="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-[#06B6D4] focus:outline-none"
                    ></textarea>
                  </div>
                  <div>
                    <label class="block text-xs font-semibold text-slate-700 mb-1">Misi Destinasi</label>
                    <textarea 
                      v-model="tentangForm.misi" 
                      rows="3" 
                      class="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-[#06B6D4] focus:outline-none"
                    ></textarea>
                  </div>
                </div>
              </div>

              <div class="flex justify-end pt-4 border-t border-slate-100">
                <button @click="saveTentang" class="bg-[#0284C7] hover:bg-[#0284C7]/90 text-white text-xs font-semibold px-5 py-2.5 rounded-xl shadow-sm">
                  Simpan Halaman Tentang
                </button>
              </div>
            </div>
          </div>

          <!-- TAB 4: DATA WISATA & FASILITAS (CRUD GENERIC DENGAN FILTER & SEARCH) -->
          <div v-else-if="activeTab === 'wisata' || activeTab === 'fasilitas'" class="space-y-6">
            
            <!-- Table Header Control -->
            <div class="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
              
              <!-- Search & Filter Input -->
              <div class="flex items-center gap-3 w-full sm:w-auto flex-1 max-w-md">
                <div class="relative w-full">
                  <input 
                    v-model="searchQuery" 
                    type="text" 
                    placeholder="Cari data..." 
                    class="w-full pl-9 pr-4 py-2 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-[#06B6D4] focus:outline-none"
                  />
                  <svg class="w-4 h-4 text-slate-400 absolute left-3 top-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
              </div>

              <!-- Add New Button -->
              <button 
                @click="openModalAdd" 
                class="w-full sm:w-auto bg-[#0284C7] hover:bg-[#0284C7]/90 text-white text-xs font-semibold px-4 py-2.5 rounded-xl shadow-sm transition-all flex items-center justify-center gap-2"
              >
                <span>+ Tambah {{ activeTab === 'wisata' ? 'Wisata' : 'Fasilitas' }}</span>
              </button>
            </div>

            <!-- TABLE VIEW -->
            <div class="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
              <div class="overflow-x-auto">
                <table class="w-full text-left border-collapse">
                  <thead>
                    <tr class="bg-slate-50 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                      <th class="p-4">Foto</th>
                      <th class="p-4">Nama</th>
                      <th class="p-4">Kategori / Lokasi</th>
                      <th class="p-4">Harga / Status</th>
                      <th class="p-4 text-right">Aksi</th>
                    </tr>
                  </thead>
                  <tbody class="divide-y divide-slate-100 text-xs text-slate-600">
                    <tr v-for="item in filteredWisataFasilitas" :key="item.id" class="hover:bg-slate-50/50">
                      <td class="p-4">
                        <img :src="item.image" :alt="item.nama" class="w-12 h-12 rounded-xl object-cover border" />
                      </td>
                      <td class="p-4 font-bold text-slate-800">
                        {{ item.nama }}
                        <p class="font-normal text-slate-400 text-[11px] line-clamp-1 max-w-xs mt-0.5">{{ item.deskripsi }}</p>
                      </td>
                      <td class="p-4 font-medium">{{ item.kategori }}</td>
                      <td class="p-4 font-semibold text-[#0284C7]">{{ item.harga }}</td>
                      <td class="p-4 text-right whitespace-nowrap">
                        <div class="flex items-center justify-end gap-2">
                          <button @click="openModalEdit(item)" class="p-1.5 rounded-lg bg-sky-50 text-[#0284C7] hover:bg-sky-100 transition-colors" title="Edit">
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                          </button>
                          <button @click="confirmDelete(item)" class="p-1.5 rounded-lg bg-rose-50 text-rose-600 hover:bg-rose-100 transition-colors" title="Hapus">
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                        </div>
                      </td>
                    </tr>
                    <tr v-if="filteredWisataFasilitas.length === 0">
                      <td colspan="5" class="p-8 text-center text-slate-400">Tidak ada data ditemukan.</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

          </div>

          <!-- TAB 5: GALERI FOTO -->
          <div v-else-if="activeTab === 'galeri'" class="space-y-6">
            <div class="flex items-center justify-between">
              <h3 class="font-bold text-slate-800 text-base">Kelola Foto Galeri</h3>
              <button @click="openModalAddFoto" class="bg-[#0284C7] hover:bg-[#0284C7]/90 text-white text-xs font-semibold px-4 py-2 rounded-xl">
                + Unggah Foto Baru
              </button>
            </div>

            <!-- Grid Layout Foto Galeri -->
            <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              <div v-for="foto in galeriList" :key="foto.id" class="bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-xs group relative">
                <img :src="foto.url" :alt="foto.caption" class="w-full h-36 object-cover" />
                <div class="p-3">
                  <p class="text-xs font-bold text-slate-800 truncate">{{ foto.caption }}</p>
                  <p class="text-[10px] text-slate-400 mt-0.5">{{ foto.kategori }}</p>
                </div>
                <!-- Overlay Button Delete -->
                <div class="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                  <button @click="confirmDeleteFoto(foto)" class="p-2 rounded-full bg-white text-rose-600 hover:bg-rose-50 shadow-md">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>

          <!-- TAB 6: PESAN / KONTAK -->
          <div v-else-if="activeTab === 'kontak'" class="space-y-6">
            <div class="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
              <div class="p-5 border-b border-slate-100">
                <h3 class="font-bold text-slate-800 text-base">Kotak Masuk Pesan</h3>
              </div>
              <div class="divide-y divide-slate-100">
                <div v-for="pesan in pesanList" :key="pesan.id" class="p-5 hover:bg-slate-50 transition-colors flex flex-col sm:flex-row justify-between items-start gap-4">
                  <div class="space-y-1">
                    <div class="flex items-center gap-2">
                      <h4 class="font-bold text-slate-800 text-sm">{{ pesan.nama }}</h4>
                      <span class="text-xs text-slate-400">&lt;{{ pesan.email }}&gt;</span>
                      <span class="text-[10px] bg-slate-100 text-slate-500 px-2 py-0.5 rounded-full font-medium">{{ pesan.telepon }}</span>
                    </div>
                    <p class="text-xs font-semibold text-[#0284C7]">{{ pesan.subjek }}</p>
                    <p class="text-xs text-slate-600 pt-1 leading-relaxed">{{ pesan.isi }}</p>
                    <p class="text-[10px] text-slate-400 pt-2">{{ pesan.tanggal }}</p>
                  </div>
                  <button @click="deletePesan(pesan.id)" class="text-xs text-rose-500 hover:text-rose-700 font-semibold self-end sm:self-start">
                    Hapus Pesan
                  </button>
                </div>
              </div>
            </div>
          </div>

          <!-- TAB 7: PENGATURAN WEBSITE -->
          <div v-else-if="activeTab === 'pengaturan'" class="space-y-6">
            <div class="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-6">
              <div>
                <h3 class="text-base font-bold text-slate-800">Pengaturan Identitas & Tampilan Website</h3>
                <p class="text-xs text-slate-400">Ubah konfigurasi umum, kontak footer, dan tema warna utama.</p>
              </div>

              <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label class="block text-xs font-semibold text-slate-700 mb-1">Nama Website</label>
                  <input v-model="settings.siteName" type="text" class="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-[#06B6D4] focus:outline-none" />
                </div>
                <div>
                  <label class="block text-xs font-semibold text-slate-700 mb-1">Nomor Telepon / WhatsApp</label>
                  <input v-model="settings.phone" type="text" class="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-[#06B6D4] focus:outline-none" />
                </div>
                <div>
                  <label class="block text-xs font-semibold text-slate-700 mb-1">Email Resmi Pantai</label>
                  <input v-model="settings.email" type="email" class="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-[#06B6D4] focus:outline-none" />
                </div>
                <div>
                  <label class="block text-xs font-semibold text-slate-700 mb-1">Warna Utama Website</label>
                  <div class="flex items-center gap-3">
                    <input v-model="settings.primaryColor" type="color" class="w-10 h-10 rounded-lg cursor-pointer border-0" />
                    <span class="text-xs font-mono text-slate-600">{{ settings.primaryColor }}</span>
                  </div>
                </div>
                <div class="md:col-span-2">
                  <label class="block text-xs font-semibold text-slate-700 mb-1">Alamat Lengkap Destinasi</label>
                  <input v-model="settings.address" type="text" class="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-[#06B6D4] focus:outline-none" />
                </div>
                <div>
                  <label class="block text-xs font-semibold text-slate-700 mb-1">Link Instagram</label>
                  <input v-model="settings.instagram" type="text" class="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-[#06B6D4] focus:outline-none" />
                </div>
                <div>
                  <label class="block text-xs font-semibold text-slate-700 mb-1">Link Facebook</label>
                  <input v-model="settings.facebook" type="text" class="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-[#06B6D4] focus:outline-none" />
                </div>
              </div>

              <div class="flex justify-end pt-4 border-t border-slate-100">
                <button @click="saveSettings" class="bg-[#0284C7] hover:bg-[#0284C7]/90 text-white text-xs font-semibold px-5 py-2.5 rounded-xl shadow-sm">
                  Simpan Pengaturan
                </button>
              </div>
            </div>
          </div>

        </main>
      </div>
    </div>

    <!-- MODAL ADD / EDIT DATA WISATA & FASILITAS -->
    <div v-if="showModal" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs">
      <div class="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-100 space-y-4 animate-in fade-in zoom-in-95">
        <div class="flex items-center justify-between border-b border-slate-100 pb-3">
          <h3 class="font-bold text-slate-800 text-base">
            {{ isEditing ? 'Edit Data' : 'Tambah Data Baru' }}
          </h3>
          <button @click="showModal = false" class="text-slate-400 hover:text-slate-600">✕</button>
        </div>

        <div class="space-y-3">
          <div>
            <label class="block text-xs font-semibold text-slate-700 mb-1">Nama</label>
            <input v-model="modalForm.nama" type="text" class="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-[#06B6D4] focus:outline-none" />
          </div>
          <div>
            <label class="block text-xs font-semibold text-slate-700 mb-1">Kategori / Lokasi</label>
            <input v-model="modalForm.kategori" type="text" class="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-[#06B6D4] focus:outline-none" />
          </div>
          <div>
            <label class="block text-xs font-semibold text-slate-700 mb-1">Harga / Keterangan Tarif</label>
            <input v-model="modalForm.harga" type="text" class="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-[#06B6D4] focus:outline-none" />
          </div>
          <div>
            <label class="block text-xs font-semibold text-slate-700 mb-1">Deskripsi Ringkas</label>
            <textarea v-model="modalForm.deskripsi" rows="3" class="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-[#06B6D4] focus:outline-none"></textarea>
          </div>
          <div>
            <label class="block text-xs font-semibold text-slate-700 mb-1">URL Foto Image</label>
            <input v-model="modalForm.image" type="text" class="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-[#06B6D4] focus:outline-none" />
          </div>
        </div>

        <div class="flex justify-end gap-2 pt-3 border-t border-slate-100">
          <button @click="showModal = false" class="px-4 py-2 rounded-xl text-xs font-semibold text-slate-500 hover:bg-slate-100">
            Batal
          </button>
          <button @click="saveModalData" class="px-4 py-2 rounded-xl text-xs font-semibold bg-[#0284C7] text-white hover:bg-[#0284C7]/90 shadow-sm">
            Simpan Data
          </button>
        </div>
      </div>
    </div>

    <!-- MODAL UNGGAH FOTO GALERI -->
    <div v-if="showModalFoto" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs">
      <div class="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-4">
        <h3 class="font-bold text-slate-800 text-base">Unggah Foto Galeri Baru</h3>
        <div class="space-y-3">
          <div>
            <label class="block text-xs font-semibold text-slate-700 mb-1">Caption Foto</label>
            <input v-model="galeriForm.caption" type="text" class="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-[#06B6D4] focus:outline-none" />
          </div>
          <div>
            <label class="block text-xs font-semibold text-slate-700 mb-1">Kategori (Pantai, Sunrise, Acara, dsb)</label>
            <input v-model="galeriForm.kategori" type="text" class="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-[#06B6D4] focus:outline-none" />
          </div>
          <div>
            <label class="block text-xs font-semibold text-slate-700 mb-1">URL Foto</label>
            <input v-model="galeriForm.url" type="text" class="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-[#06B6D4] focus:outline-none" />
          </div>
        </div>
        <div class="flex justify-end gap-2 pt-3">
          <button @click="showModalFoto = false" class="px-4 py-2 rounded-xl text-xs font-semibold text-slate-500 hover:bg-slate-100">Batal</button>
          <button @click="saveFotoData" class="px-4 py-2 rounded-xl text-xs font-semibold bg-[#0284C7] text-white">Unggah</button>
        </div>
      </div>
    </div>

    <!-- MODAL KONFIRMASI HAPUS (DELETE DIALOG) -->
    <div v-if="showDeleteConfirm" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs">
      <div class="bg-white rounded-2xl max-w-sm w-full p-6 shadow-2xl text-center space-y-4">
        <div class="w-12 h-12 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center mx-auto text-xl font-bold">
          !
        </div>
        <div>
          <h3 class="font-bold text-slate-800 text-base">Konfirmasi Hapus</h3>
          <p class="text-xs text-slate-500 mt-1">Apakah Anda yakin ingin menghapus data ini? Tindakan ini tidak dapat dibatalkan.</p>
        </div>
        <div class="flex justify-center gap-3 pt-2">
          <button @click="showDeleteConfirm = false" class="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200">
            Batal
          </button>
          <button @click="executeDelete" class="px-4 py-2 rounded-xl text-xs font-semibold bg-rose-600 text-white hover:bg-rose-700 shadow-sm">
            Ya, Hapus
          </button>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup>
import { ref, computed, reactive, h } from 'vue'

// --- ICON COMPONENTS (INLINE FUNCTIONAL COMPONENTS) ---
const IconDashboard = () => h('svg', { fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24' }, [
  h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z' })
])
const IconHome = () => h('svg', { fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24' }, [
  h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' })
])
const IconInfo = () => h('svg', { fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24' }, [
  h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z' })
])
const IconWisata = () => h('svg', { fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24' }, [
  h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z' }),
  h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M15 11a3 3 0 11-6 0 3 3 0 016 0z' })
])
const IconGallery = () => h('svg', { fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24' }, [
  h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z' })
])
const IconContact = () => h('svg', { fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24' }, [
  h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z' })
])
const IconSettings = () => h('svg', { fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24' }, [
  h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z' }),
  h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M15 12a3 3 0 11-6 0 3 3 0 016 0z' })
])

// --- STATE MANAGEMENT ---
const activeTab = ref('dashboard')
const isSidebarCollapsed = ref(false)
const isMobileSidebarOpen = ref(false)
const showNotifications = ref(false)
const searchQuery = ref('')

// Toast Notification State
const toasts = ref([])
const addToast = (message, type = 'success') => {
  const id = Date.now()
  toasts.value.push({ id, message, type })
  setTimeout(() => removeToast(id), 3500)
}
const removeToast = (id) => {
  toasts.value = toasts.value.filter(t => t.id !== id)
}

// Menu Items Structure
const menuItems = [
  { id: 'dashboard', label: 'Dashboard', icon: IconDashboard },
  { id: 'beranda', label: 'Beranda', icon: IconHome },
  { id: 'tentang', label: 'Tentang Pantai', icon: IconInfo },
  { id: 'wisata', label: 'Data Wisata', icon: IconWisata },
  { id: 'fasilitas', label: 'Data Fasilitas', icon: IconWisata },
  { id: 'galeri', label: 'Galeri Foto', icon: IconGallery },
  { id: 'kontak', label: 'Pesan / Kontak', icon: IconContact },
  { id: 'pengaturan', label: 'Pengaturan Website', icon: IconSettings },
]

const currentMenuLabel = computed(() => {
  const found = menuItems.find(m => m.id === activeTab.value)
  return found ? found.label : 'Dashboard'
})

// --- DATA STATISTIK ---
const stats = reactive({
  wisata: 8,
  fasilitas: 12,
  galeri: 34,
  pesan: 15
})

const chartData = ref([
  { day: 'Sen', value: 210 },
  { day: 'Sel', value: 280 },
  { day: 'Rab', value: 190 },
  { day: 'Kam', value: 340 },
  { day: 'Jum', value: 410 },
  { day: 'Sab', value: 490 },
  { day: 'Min', value: 520 }
])

// --- FORM BERANDA & TENTANG ---
const berandaForm = reactive({
  title: 'Keindahan Alami Pantai Wabokeo',
  tagline: 'Surganya Pesona Pesisir Laut & Pasir Putih',
  description: 'Nikmati keindahan pemandangan laut biru jernih, sunset yang memukau, serta berbagai fasilitas liburan seru bersama keluarga.',
  heroImage: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=600'
})

const tentangForm = reactive({
  sejarah: 'Pantai Wabokeo merupakan kawasan wisata pesisir unggulan yang terkenal dengan keasrian lautnya dan hamparan pasir putih bersih.',
  visi: 'Menjadi destinasi wisata pesisir berkelanjutan berstandar internasional yang tetap menjaga kelestarian ekosistem laut.',
  misi: 'Memberikan pelayanan terbaik, menyediakan sarana rekreasi aman, serta memberdayakan ekonomi masyarakat sekitar.'
})

const saveBeranda = () => addToast('Beranda berhasil diperbarui!')
const saveTentang = () => addToast('Informasi Halaman Tentang berhasil diperbarui!')

// --- DATA WISATA & FASILITAS ---
const wisataList = ref([
  { id: 1, nama: 'Spot Sunset Wabokeo', kategori: 'Spot Foto', harga: 'Gratis', deskripsi: 'Pemandangan matahari terbenam terbaik di tebing bagian barat.', image: 'https://images.unsplash.com/photo-1518495973542-4542c06a5843?auto=format&fit=crop&q=80&w=300' },
  { id: 2, nama: 'Wahana Banana Boat', kategori: 'Wahana Air', harga: 'Rp 35.000 / orang', deskripsi: 'Sensasi memacu adrenalin mengelilingi pesisir pantai.', image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&q=80&w=300' }
])

const fasilitasList = ref([
  { id: 101, nama: 'Gazebo Pesisir', kategori: 'Tempat Istirahat', harga: 'Rp 50.000 / 3 Jam', deskripsi: 'Gazebo kayu nyaman tepat di pinggir pantai.', image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&q=80&w=300' },
  { id: 102, nama: 'Area Parkir Luas', kategori: 'Aksesibilitas', harga: 'Rp 5.000', deskripsi: 'Kapasitas hingga 100 mobil dan 300 sepeda motor.', image: 'https://images.unsplash.com/photo-1506521781263-d8422e82f27a?auto=format&fit=crop&q=80&w=300' }
])

const filteredWisataFasilitas = computed(() => {
  const source = activeTab.value === 'wisata' ? wisataList.value : fasilitasList.value
  if (!searchQuery.value) return source
  return source.filter(i => 
    i.nama.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
    i.kategori.toLowerCase().includes(searchQuery.value.toLowerCase())
  )
})

// Modal Form State (Wisata / Fasilitas)
const showModal = ref(false)
const isEditing = ref(false)
const modalForm = reactive({ id: null, nama: '', kategori: '', harga: '', deskripsi: '', image: '' })

const openModalAdd = () => {
  isEditing.value = false
  Object.assign(modalForm, { id: null, nama: '', kategori: '', harga: '', deskripsi: '', image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=300' })
  showModal.value = true
}

const openModalEdit = (item) => {
  isEditing.value = true
  Object.assign(modalForm, item)
  showModal.value = true
}

const saveModalData = () => {
  const targetArray = activeTab.value === 'wisata' ? wisataList : fasilitasList
  if (isEditing.value) {
    const idx = targetArray.value.findIndex(i => i.id === modalForm.id)
    if (idx !== -1) targetArray.value[idx] = { ...modalForm }
    addToast('Data berhasil diperbarui!')
  } else {
    targetArray.value.push({ ...modalForm, id: Date.now() })
    addToast('Data baru berhasil ditambahkan!')
  }
  showModal.value = false
}

// Confirm Delete State
const showDeleteConfirm = ref(false)
const itemToDelete = ref(null)

const confirmDelete = (item) => {
  itemToDelete.value = item
  showDeleteConfirm.value = true
}

const executeDelete = () => {
  if (!itemToDelete.value) return
  if (activeTab.value === 'wisata') {
    wisataList.value = wisataList.value.filter(i => i.id !== itemToDelete.value.id)
  } else if (activeTab.value === 'fasilitas') {
    fasilitasList.value = fasilitasList.value.filter(i => i.id !== itemToDelete.value.id)
  } else if (activeTab.value === 'galeri') {
    galeriList.value = galeriList.value.filter(i => i.id !== itemToDelete.value.id)
  }
  showDeleteConfirm.value = false
  addToast('Data berhasil dihapus', 'error')
}

// --- GALERI FOTO STATE ---
const galeriList = ref([
  { id: 1, caption: 'Pemandangan Tebing Barat', kategori: 'Landscape', url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=400' },
  { id: 2, caption: 'Sunset Wabokeo', kategori: 'Sunset', url: 'https://images.unsplash.com/photo-1518495973542-4542c06a5843?auto=format&fit=crop&q=80&w=400' },
  { id: 3, caption: 'Pasir Putih Pagi Hari', kategori: 'Pantai', url: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&q=80&w=400' }
])

const showModalFoto = ref(false)
const galeriForm = reactive({ caption: '', kategori: '', url: '' })

const openModalAddFoto = () => {
  Object.assign(galeriForm, { caption: '', kategori: '', url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=400' })
  showModalFoto.value = true
}

const saveFotoData = () => {
  galeriList.value.push({ ...galeriForm, id: Date.now() })
  showModalFoto.value = false
  addToast('Foto baru berhasil diunggah!')
}

const confirmDeleteFoto = (foto) => {
  confirmDelete(foto)
}

// --- PESAN MASUK STATE ---
const pesanList = ref([
  { id: 1, nama: 'Budi Santoso', email: 'budi@gmail.com', telepon: '08123456789', subjek: 'Sewa Gazebo Rombongan', isi: 'Apakah ada diskon khusus untuk reservasi 5 gazebo sekaligus pada hari Sabtu besok?', tanggal: '17 Sep 2026', dibaca: false },
  { id: 2, nama: 'Siti Rahma', email: 'siti@gmail.com', telepon: '08567890123', subjek: 'Jam Operasional Tiket', isi: 'Halo admin, apakah loket masuk pantai buka 24 jam?', tanggal: '15 Sep 2026', dibaca: true }
])

const deletePesan = (id) => {
  pesanList.value = pesanList.value.filter(p => p.id !== id)
  addToast('Pesan berhasil dihapus', 'info')
}

// --- PENGATURAN WEBSITE STATE ---
const settings = reactive({
  siteName: 'Pantai Wabokeo',
  phone: '+62 821-9988-7766',
  email: 'info@pantaiwabokeo.com',
  address: 'Jl. Pesisir Indah No. 12, Wabokeo, Indonesia',
  primaryColor: '#0284C7',
  instagram: 'https://instagram.com/pantaiwabokeo',
  facebook: 'https://facebook.com/pantaiwabokeo'
})

const saveSettings = () => addToast('Pengaturan website disimpan!')

// File Upload Utility Simulation
const handleFileUpload = (event, formObj, key) => {
  const file = event.target.files[0]
  if (file) {
    addToast('File foto terpilih: ' + file.name, 'info')
  }
}

// Logout Action
const handleLogout = () => {
  if (confirm('Apakah Anda yakin ingin keluar dari panel admin?')) {
    addToast('Logout berhasil', 'info')
  }
}
</script>

<style scoped>
/* Keyframe Animation & Transitions */
.toast-enter-active,
.toast-leave-active {
  transition: all 0.3s ease;
}
.toast-enter-from {
  opacity: 0;
  transform: translateY(-20px) scale(0.95);
}
.toast-leave-to {
  opacity: 0;
  transform: translateX(100px);
}
</style>