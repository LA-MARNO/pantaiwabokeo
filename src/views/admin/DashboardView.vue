<script setup>
import { ref } from 'vue'
import { RouterLink } from 'vue-router'

// 1. Data Dummy Statistik Utama
const stats = ref([
  {
    id: 1,
    label: 'Total Wisata',
    value: '12',
    icon: 'location',
    bgIcon: 'bg-[#E0F2FE]',
    textIcon: 'text-[#0284C7]',
    borderAccent: 'border-[#0284C7]'
  },
  {
    id: 2,
    label: 'Total Fasilitas',
    value: '28',
    icon: 'cube',
    bgIcon: 'bg-cyan-100/70',
    textIcon: 'text-[#06B6D4]',
    borderAccent: 'border-[#06B6D4]'
  },
  {
    id: 3,
    label: 'Total Foto Galeri',
    value: '154',
    icon: 'photo',
    bgIcon: 'bg-[#F5E6C8]/60',
    textIcon: 'text-amber-700',
    borderAccent: 'border-[#F5E6C8]'
  },
  {
    id: 4,
    label: 'Pesan Masuk',
    value: '8',
    icon: 'mail',
    bgIcon: 'bg-sky-100',
    textIcon: 'text-sky-600',
    borderAccent: 'border-sky-400'
  }
])

// 2. Data Dummy Aksi Cepat
const quickActions = ref([
  { name: 'Tambah Wisata', path: '/admin/wisata', icon: 'plus', bg: 'bg-[#0284C7]', hover: 'hover:bg-[#0284C7]/90', text: 'text-white' },
  { name: 'Tambah Fasilitas', path: '/admin/wisata', icon: 'cube', bg: 'bg-[#06B6D4]', hover: 'hover:bg-[#06B6D4]/90', text: 'text-white' },
  { name: 'Upload Foto', path: '/admin/galeri', icon: 'upload', bg: 'bg-[#F5E6C8]', hover: 'hover:bg-[#F5E6C8]/80', text: 'text-slate-800' },
  { name: 'Lihat Pesan', path: '/admin/kontak', icon: 'mail', bg: 'bg-white', hover: 'hover:bg-slate-50', text: 'text-slate-700', border: 'border border-slate-200' }
])

// 3. Data Dummy Aktivitas Terbaru
const activities = ref([
  {
    id: 1,
    title: 'Foto Baru Ditambahkan',
    description: '3 Foto keindahan matahari terbenam ditambahkan ke Galeri.',
    time: '10 Menit yang lalu',
    icon: 'photo',
    color: 'bg-[#06B6D4]'
  },
  {
    id: 2,
    title: 'Data Wisata Diperbarui',
    description: 'Memperbarui jam operasional pada Spot Snorkeling Wabokeo.',
    time: '1 Jam yang lalu',
    icon: 'edit',
    color: 'bg-[#0284C7]'
  },
  {
    id: 3,
    title: 'Informasi Fasilitas Diperbarui',
    description: 'Menambahkan fasilitas "Area Parkir VIP" di halaman Wisata.',
    time: '3 Jam yang lalu',
    icon: 'cube',
    color: 'bg-amber-500'
  },
  {
    id: 4,
    title: 'Pesan Baru Diterima',
    description: 'Pesan dari Rahmat Hidayat terkait reservasi gazebo rombongan.',
    time: 'Kemarin, 16:45',
    icon: 'mail',
    color: 'bg-emerald-500'
  }
])

// 4. Data Dummy Wisata Terbaru
const recentWisata = ref([
  {
    id: 1,
    nama: 'Spot Snorkeling Wabokeo',
    kategori: 'Wisata Bahari',
    status: 'Aktif',
    updatedAt: '17 Sep 2026'
  },
  {
    id: 2,
    nama: 'Gazebo Utama Pantai',
    kategori: 'Fasilitas Umum',
    status: 'Aktif',
    updatedAt: '15 Sep 2026'
  },
  {
    id: 3,
    nama: 'Jembatan Kayu Manggrove',
    kategori: 'Spot Foto',
    status: 'Maintenance',
    updatedAt: '12 Sep 2026'
  },
  {
    id: 4,
    nama: 'Camping Ground Sunrise',
    kategori: 'Area Akomodasi',
    status: 'Aktif',
    updatedAt: '10 Sep 2026'
  }
])
</script>

<template>
  <div class="space-y-6 pb-6">
    
    <!-- 1. HEADER DASHBOARD -->
    <div class="bg-gradient-to-r from-white via-white to-[#E0F2FE]/50 p-6 rounded-2xl border border-sky-100 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
      <div>
        <h2 class="text-2xl font-bold text-slate-800 tracking-tight">Dashboard</h2>
        <p class="text-slate-500 text-sm mt-1">
          Selamat Datang, <span class="font-semibold text-[#0284C7]">Admin Pantai Wabokeo</span>! Kelola aktivitas dan konten website secara riil di sini.
        </p>
      </div>
      <div class="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#E0F2FE] text-[#0284C7] text-xs font-semibold self-start md:self-auto">
        <span class="w-2 h-2 rounded-full bg-[#06B6D4] animate-pulse"></span>
        Sistem Berjalan Normal
      </div>
    </div>

    <!-- 2. STATISTIK UTAMA -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <div 
        v-for="stat in stats" 
        :key="stat.id"
        class="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all duration-300 relative overflow-hidden group hover:-translate-y-0.5"
      >
        <!-- Aksen Garis Atas -->
        <div class="absolute top-0 left-0 right-0 h-1" :class="stat.borderAccent"></div>
        
        <div class="flex items-center justify-between">
          <div>
            <p class="text-xs font-medium text-slate-400 uppercase tracking-wider">{{ stat.label }}</p>
            <h3 class="text-2xl lg:text-3xl font-extrabold text-slate-800 mt-1">{{ stat.value }}</h3>
          </div>
          <div :class="[stat.bgIcon, stat.textIcon]" class="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-110">
            <!-- Location Icon -->
            <svg v-if="stat.icon === 'location'" class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <!-- Cube/Fasilitas Icon -->
            <svg v-else-if="stat.icon === 'cube'" class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
            </svg>
            <!-- Photo Icon -->
            <svg v-else-if="stat.icon === 'photo'" class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <!-- Mail Icon -->
            <svg v-else-if="stat.icon === 'mail'" class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
        </div>
      </div>
    </div>

    <!-- 5. QUICK ACTIONS -->
    <div class="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm">
      <h3 class="text-sm font-bold text-slate-800 uppercase tracking-wider mb-3">Aksi Cepat</h3>
      <div class="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <RouterLink 
          v-for="action in quickActions" 
          :key="action.name"
          :to="action.path"
          :class="[action.bg, action.hover, action.text, action.border || '']"
          class="flex items-center justify-center gap-2 p-3 rounded-xl font-semibold text-xs lg:text-sm shadow-sm transition-all duration-200 active:scale-95"
        >
          <!-- Plus Icon -->
          <svg v-if="action.icon === 'plus'" class="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
          </svg>
          <!-- Cube Icon -->
          <svg v-else-if="action.icon === 'cube'" class="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
          </svg>
          <!-- Upload Icon -->
          <svg v-else-if="action.icon === 'upload'" class="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
          </svg>
          <!-- Mail Icon -->
          <svg v-else-if="action.icon === 'mail'" class="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
          <span>{{ action.name }}</span>
        </RouterLink>
      </div>
    </div>

    <!-- GRID DUA KOLOM: DATA TERBARU & AKTIVITAS -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      
      <!-- 4. TABEL DATA WISATA TERBARU (Memakan 2 Kolom di Desktop) -->
      <div class="lg:col-span-2 bg-white rounded-2xl border border-slate-100 shadow-sm flex flex-col justify-between overflow-hidden">
        <div>
          <!-- Header Tabel -->
          <div class="p-5 border-b border-slate-100 flex items-center justify-between">
            <div>
              <h3 class="text-base font-bold text-slate-800">Data Wisata Terbaru</h3>
              <p class="text-xs text-slate-400 mt-0.5">Daftar tempat wisata dan fasilitas yang terdaftar</p>
            </div>
            <RouterLink 
              to="/admin/wisata" 
              class="text-xs font-bold text-[#0284C7] hover:text-[#06B6D4] transition-colors inline-flex items-center gap-1"
            >
              Lihat Semua
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
              </svg>
            </RouterLink>
          </div>

          <!-- Responsive Table Container -->
          <div class="overflow-x-auto">
            <table class="w-full text-left border-collapse">
              <thead>
                <tr class="bg-slate-50/70 border-b border-slate-100 text-slate-400 text-[11px] font-bold uppercase tracking-wider">
                  <th class="py-3 px-5">Nama Wisata</th>
                  <th class="py-3 px-5">Kategori</th>
                  <th class="py-3 px-5">Status</th>
                  <th class="py-3 px-5">Tanggal</th>
                  <th class="py-3 px-5 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-slate-100 text-sm">
                <tr 
                  v-for="item in recentWisata" 
                  :key="item.id"
                  class="hover:bg-[#E0F2FE]/20 transition-colors"
                >
                  <td class="py-3.5 px-5 font-semibold text-slate-700 whitespace-nowrap">
                    {{ item.nama }}
                  </td>
                  <td class="py-3.5 px-5 text-slate-500 text-xs whitespace-nowrap">
                    {{ item.kategori }}
                  </td>
                  <td class="py-3.5 px-5 whitespace-nowrap">
                    <span 
                      :class="[
                        item.status === 'Aktif' 
                          ? 'bg-emerald-50 text-emerald-600 ring-emerald-500/30' 
                          : 'bg-amber-50 text-amber-600 ring-amber-500/30'
                      ]"
                      class="px-2.5 py-1 rounded-full text-[11px] font-medium ring-1 inline-block"
                    >
                      {{ item.status }}
                    </span>
                  </td>
                  <td class="py-3.5 px-5 text-slate-400 text-xs whitespace-nowrap">
                    {{ item.updatedAt }}
                  </td>
                  <td class="py-3.5 px-5 text-right whitespace-nowrap">
                    <RouterLink 
                      to="/admin/wisata" 
                      class="p-1.5 rounded-lg text-slate-400 hover:text-[#0284C7] hover:bg-[#E0F2FE]/60 transition-colors inline-block"
                      title="Edit Data"
                    >
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                      </svg>
                    </RouterLink>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <!-- 3. SECTION AKTIVITAS TERBARU (Timeline) -->
      <div class="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex flex-col justify-between">
        <div>
          <div class="flex items-center justify-between mb-4">
            <h3 class="text-base font-bold text-slate-800">Aktivitas Terbaru</h3>
            <span class="text-xs text-slate-400">Hari ini</span>
          </div>

          <!-- Timeline Container -->
          <div class="relative pl-4 border-l-2 border-slate-100 space-y-6 my-2">
            <div 
              v-for="act in activities" 
              :key="act.id"
              class="relative group"
            >
              <!-- Indicator Circle -->
              <div 
                :class="act.color" 
                class="absolute -left-[21px] top-0.5 w-3 h-3 rounded-full ring-4 ring-white shadow-sm"
              ></div>
              
              <!-- Content -->
              <div class="flex flex-col">
                <span class="text-xs font-bold text-slate-700 leading-snug group-hover:text-[#0284C7] transition-colors">
                  {{ act.title }}
                </span>
                <p class="text-xs text-slate-500 mt-1 leading-relaxed">
                  {{ act.description }}
                </p>
                <span class="text-[10px] font-medium text-slate-400 mt-1.5">
                  {{ act.time }}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div class="pt-4 border-t border-slate-100 mt-4 text-center">
          <button class="text-xs font-semibold text-[#0284C7] hover:underline">
            Muat Aktivitas Lainnya
          </button>
        </div>
      </div>

    </div>

  </div>
</template>