<script setup>
import { ref } from 'vue'

// Tab Aktif untuk Pengaturan Section Home
const activeTab = ref('hero')

const tabs = [
  { id: 'hero', name: 'Hero Section' },
  { id: 'tentang', name: 'Tentang' },
  { id: 'wisata', name: 'Wisata Unggulan' },
  { id: 'fasilitas', name: 'Fasilitas' },
  { id: 'galeri', name: 'Galeri Home' },
  { id: 'cta', name: 'Call to Action' }
]

// 1. Data Dummy - Hero Section
const heroData = ref({
  title: 'Selamat Datang di Surga Tersembunyi Pantai Wabokeo',
  description: 'Nikmati keindahan pasir putih, air laut yang jernih, dan pemandangan matahari terbenam yang memukau bersama keluarga.',
  btnText: 'Jelajahi Wisata',
  btnLink: '/wisata',
  bgImage: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80'
})

// 2. Data Dummy - Tentang Section
const tentangData = ref({
  title: 'Keindahan Alami Pantai Wabokeo',
  description: 'Pantai Wabokeo menawarkan pesona pesisir yang masih alami dan asri. Terletak di kawasan strategis, destinasi ini cocok untuk tempat berlibur, kamping, hingga menikmati kuliner khas lokal.',
  image: 'https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&w=800&q=80',
  btnText: 'Pelajari Lebih Lanjut',
  btnLink: '/tentang'
})

// 3. Data Dummy - Wisata Unggulan
const wisataList = ref([
  { id: 1, name: 'Spot Snorkeling Wabokeo', category: 'Wisata Bahari', isFeatured: true },
  { id: 2, name: 'Camping Ground Sunrise', category: 'Akomodasi', isFeatured: true },
  { id: 3, name: 'Jembatan Mangrove', category: 'Spot Foto', isFeatured: false },
  { id: 4, name: 'Gazebo Utama Pantai', category: 'Fasilitas Umum', isFeatured: true }
])
const newWisataName = ref('')
const newWisataCategory = ref('')

const addWisata = () => {
  if (newWisataName.value.trim() && newWisataCategory.value.trim()) {
    wisataList.value.push({
      id: Date.now(),
      name: newWisataName.value,
      category: newWisataCategory.value,
      isFeatured: true
    })
    newWisataName.value = ''
    newWisataCategory.value = ''
  }
}

const deleteWisata = (id) => {
  wisataList.value = wisataList.value.filter(item => item.id !== id)
}

// 4. Data Dummy - Fasilitas
const fasilitasList = ref([
  { id: 1, name: 'Area Parkir Luas', icon: 'Parkir', showOnHome: true },
  { id: 2, name: 'Gazebo & Rest Area', icon: 'Gazebo', showOnHome: true },
  { id: 3, name: 'Toilet & Kamar Bilas', icon: 'Toilet', showOnHome: true },
  { id: 4, name: 'Warung Kuliner Lokal', icon: 'Kuliner', showOnHome: false }
])
const newFasilitasName = ref('')

const addFasilitas = () => {
  if (newFasilitasName.value.trim()) {
    fasilitasList.value.push({
      id: Date.now(),
      name: newFasilitasName.value,
      icon: 'Fasilitas',
      showOnHome: true
    })
    newFasilitasName.value = ''
  }
}

const deleteFasilitas = (id) => {
  fasilitasList.value = fasilitasList.value.filter(item => item.id !== id)
}

// 5. Data Dummy - Galeri Home
const galeriHome = ref([
  { id: 1, url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=400&q=80', caption: 'Sunset Wabokeo', isSelected: true },
  { id: 2, url: 'https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&w=400&q=80', caption: 'Pesisir Pantai', isSelected: true },
  { id: 3, url: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=400&q=80', caption: 'Spot Foto Kayu', isSelected: true },
  { id: 4, url: 'https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?auto=format&fit=crop&w=400&q=80', caption: 'Gazebo Pesisir', isSelected: false }
])

// 6. Data Dummy - CTA Section
const ctaData = ref({
  title: 'Siap Merencanakan Liburan Impian Anda?',
  description: 'Hubungi tim pengelola Pantai Wabokeo sekarang untuk informasi sewa tempat, reservasi gazebo, dan paket kamping.',
  btnText: 'Hubungi Kami',
  btnLink: '/kontak',
  bgType: 'Gradient Biru'
})

// Fungsi Notifikasi Simpan
const saveSuccess = ref(false)
const handleSave = () => {
  saveSuccess.value = true
  setTimeout(() => {
    saveSuccess.value = false
  }, 3000)
}
</script>

<template>
  <div class="space-y-6 pb-10">
    
    <!-- HEADER & BARIS AKSI -->
    <div class="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
      <div>
        <h2 class="text-2xl font-bold text-slate-800 tracking-tight">Kelola Beranda</h2>
        <p class="text-slate-500 text-sm mt-0.5">
          Atur konten dan tampilan yang dimuat pada halaman utama (Home) website Pantai Wabokeo.
        </p>
      </div>

      <div class="flex items-center gap-3">
        <!-- Tombol Preview -->
        <a 
          href="/" 
          target="_blank" 
          class="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-700 bg-white hover:bg-slate-50 font-semibold text-xs lg:text-sm shadow-sm transition-all flex items-center gap-2"
        >
          <svg class="w-4 h-4 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
          Preview Beranda
        </a>

        <!-- Tombol Simpan -->
        <button 
          @click="handleSave"
          class="px-5 py-2.5 rounded-xl bg-[#0284C7] hover:bg-[#0284C7]/90 text-white font-semibold text-xs lg:text-sm shadow-sm transition-all flex items-center gap-2 active:scale-95"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
          </svg>
          Simpan Perubahan
        </button>
      </div>
    </div>

    <!-- NOTIFIKASI SUKSES SIMPAN -->
    <Transition enter-active-class="transition duration-300 ease-out" enter-from-class="transform -translate-y-2 opacity-0" enter-to-class="transform translate-y-0 opacity-100" leave-active-class="transition duration-200 ease-in" leave-from-class="transform translate-y-0 opacity-100" leave-to-class="transform -translate-y-2 opacity-0">
      <div v-if="saveSuccess" class="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-sm flex items-center gap-3">
        <svg class="w-5 h-5 text-emerald-600 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <span>Perubahan konten Beranda berhasil disimpan!</span>
      </div>
    </Transition>

    <!-- NAVIGATION TABS -->
    <div class="flex items-center gap-1 overflow-x-auto pb-2 border-b border-slate-200 scrollbar-none">
      <button 
        v-for="tab in tabs" 
        :key="tab.id"
        @click="activeTab = tab.id"
        :class="[
          activeTab === tab.id 
            ? 'bg-[#0284C7] text-white font-bold shadow-sm' 
            : 'bg-white text-slate-600 hover:bg-[#E0F2FE]/50 hover:text-[#0284C7] font-medium'
        ]"
        class="px-4 py-2.5 rounded-xl text-xs lg:text-sm whitespace-nowrap transition-all duration-200 shrink-0"
      >
        {{ tab.name }}
      </button>
    </div>

    <!-- KONTEN BERDASARKAN TAB -->

    <!-- TAB 1: HERO SECTION -->
    <div v-if="activeTab === 'hero'" class="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-6">
      <h3 class="text-base font-bold text-slate-800 border-b border-slate-100 pb-3">Pengaturan Hero Banner</h3>
      
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div class="space-y-4">
          <div>
            <label class="block text-xs font-bold text-slate-700 uppercase mb-1">Judul Utama</label>
            <input v-model="heroData.title" type="text" class="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-[#0284C7]/20 focus:border-[#0284C7]" />
          </div>

          <div>
            <label class="block text-xs font-bold text-slate-700 uppercase mb-1">Deskripsi Singkat</label>
            <textarea v-model="heroData.description" rows="3" class="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-[#0284C7]/20 focus:border-[#0284C7]"></textarea>
          </div>

          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="block text-xs font-bold text-slate-700 uppercase mb-1">Teks Tombol CTA</label>
              <input v-model="heroData.btnText" type="text" class="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-[#0284C7]/20 focus:border-[#0284C7]" />
            </div>
            <div>
              <label class="block text-xs font-bold text-slate-700 uppercase mb-1">Link Tombol</label>
              <input v-model="heroData.btnLink" type="text" class="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-[#0284C7]/20 focus:border-[#0284C7]" />
            </div>
          </div>
        </div>

        <div>
          <label class="block text-xs font-bold text-slate-700 uppercase mb-1">Gambar Background Hero</label>
          <div class="space-y-3">
            <div class="relative aspect-video rounded-xl overflow-hidden border border-slate-200 bg-slate-50">
              <img :src="heroData.bgImage" alt="Hero Preview" class="w-full h-full object-cover" />
            </div>
            <input v-model="heroData.bgImage" type="text" placeholder="URL Gambar..." class="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#0284C7]/20 focus:border-[#0284C7]" />
          </div>
        </div>
      </div>
    </div>

    <!-- TAB 2: TENTANG SECTION -->
    <div v-if="activeTab === 'tentang'" class="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-6">
      <h3 class="text-base font-bold text-slate-800 border-b border-slate-100 pb-3">Pengaturan Section Tentang</h3>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div class="space-y-4">
          <div>
            <label class="block text-xs font-bold text-slate-700 uppercase mb-1">Judul Section</label>
            <input v-model="tentangData.title" type="text" class="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-[#0284C7]/20 focus:border-[#0284C7]" />
          </div>

          <div>
            <label class="block text-xs font-bold text-slate-700 uppercase mb-1">Deskripsi Singkat</label>
            <textarea v-model="tentangData.description" rows="4" class="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-[#0284C7]/20 focus:border-[#0284C7]"></textarea>
          </div>

          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="block text-xs font-bold text-slate-700 uppercase mb-1">Teks Tombol</label>
              <input v-model="tentangData.btnText" type="text" class="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-[#0284C7]/20 focus:border-[#0284C7]" />
            </div>
            <div>
              <label class="block text-xs font-bold text-slate-700 uppercase mb-1">Link Tombol</label>
              <input v-model="tentangData.btnLink" type="text" class="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-[#0284C7]/20 focus:border-[#0284C7]" />
            </div>
          </div>
        </div>

        <div>
          <label class="block text-xs font-bold text-slate-700 uppercase mb-1">Gambar Ilustrasi Tentang</label>
          <div class="space-y-3">
            <div class="relative aspect-video rounded-xl overflow-hidden border border-slate-200 bg-slate-50">
              <img :src="tentangData.image" alt="Tentang Preview" class="w-full h-full object-cover" />
            </div>
            <input v-model="tentangData.image" type="text" placeholder="URL Gambar..." class="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#0284C7]/20 focus:border-[#0284C7]" />
          </div>
        </div>
      </div>
    </div>

    <!-- TAB 3: WISATA UNGGULAN -->
    <div v-if="activeTab === 'wisata'" class="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-6">
      <h3 class="text-base font-bold text-slate-800 border-b border-slate-100 pb-3">Pengaturan Wisata Unggulan</h3>

      <!-- Form Tambah -->
      <div class="bg-[#E0F2FE]/30 p-4 rounded-xl border border-sky-100 flex flex-col md:flex-row gap-3 items-end">
        <div class="flex-1 w-full">
          <label class="block text-xs font-bold text-slate-700 uppercase mb-1">Nama Wisata</label>
          <input v-model="newWisataName" type="text" placeholder="Contoh: Gazebo Pantai" class="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-sm bg-white focus:outline-none focus:border-[#0284C7]" />
        </div>
        <div class="flex-1 w-full">
          <label class="block text-xs font-bold text-slate-700 uppercase mb-1">Kategori</label>
          <input v-model="newWisataCategory" type="text" placeholder="Contoh: Spot Foto" class="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-sm bg-white focus:outline-none focus:border-[#0284C7]" />
        </div>
        <button @click="addWisata" class="w-full md:w-auto px-4 py-2 rounded-xl bg-[#0284C7] text-white font-semibold text-xs h-[38px] hover:bg-[#0284C7]/90 transition-colors shrink-0">
          + Tambah Wisata
        </button>
      </div>

      <!-- List Wisata -->
      <div class="overflow-x-auto">
        <table class="w-full text-left border-collapse">
          <thead>
            <tr class="bg-slate-50 text-slate-400 text-[11px] font-bold uppercase border-b border-slate-100">
              <th class="py-3 px-4">Nama Wisata</th>
              <th class="py-3 px-4">Kategori</th>
              <th class="py-3 px-4">Tampilkan di Home</th>
              <th class="py-3 px-4 text-right">Aksi</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-100 text-sm">
            <tr v-for="item in wisataList" :key="item.id">
              <td class="py-3 px-4 font-semibold text-slate-800">{{ item.name }}</td>
              <td class="py-3 px-4 text-slate-500 text-xs">{{ item.category }}</td>
              <td class="py-3 px-4">
                <input type="checkbox" v-model="item.isFeatured" class="w-4 h-4 text-[#0284C7] rounded focus:ring-0 cursor-pointer" />
              </td>
              <td class="py-3 px-4 text-right">
                <button @click="deleteWisata(item.id)" class="text-rose-500 hover:text-rose-700 font-semibold text-xs">
                  Hapus
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- TAB 4: FASILITAS -->
    <div v-if="activeTab === 'fasilitas'" class="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-6">
      <h3 class="text-base font-bold text-slate-800 border-b border-slate-100 pb-3">Pengaturan Fasilitas Utama</h3>

      <div class="bg-[#E0F2FE]/30 p-4 rounded-xl border border-sky-100 flex gap-3 items-end">
        <div class="flex-1">
          <label class="block text-xs font-bold text-slate-700 uppercase mb-1">Nama Fasilitas Baru</label>
          <input v-model="newFasilitasName" type="text" placeholder="Contoh: Musholla" class="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-sm bg-white focus:outline-none focus:border-[#0284C7]" />
        </div>
        <button @click="addFasilitas" class="px-4 py-2 rounded-xl bg-[#06B6D4] text-white font-semibold text-xs h-[38px] hover:bg-[#06B6D4]/90 transition-colors shrink-0">
          + Tambah Fasilitas
        </button>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div v-for="item in fasilitasList" :key="item.id" class="p-4 rounded-xl border border-slate-100 bg-slate-50/50 flex items-center justify-between">
          <div>
            <h4 class="font-bold text-slate-800 text-sm">{{ item.name }}</h4>
            <span class="text-[11px] text-slate-400">Ikon: {{ item.icon }}</span>
          </div>
          <div class="flex items-center gap-3">
            <label class="inline-flex items-center gap-1.5 text-xs text-slate-600 cursor-pointer">
              <input type="checkbox" v-model="item.showOnHome" class="w-4 h-4 text-[#06B6D4] rounded focus:ring-0" />
              Tampil
            </label>
            <button @click="deleteFasilitas(item.id)" class="text-rose-500 hover:text-rose-700 text-xs font-semibold">
              Hapus
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- TAB 5: GALERI HOME -->
    <div v-if="activeTab === 'galeri'" class="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-6">
      <div class="flex items-center justify-between border-b border-slate-100 pb-3">
        <h3 class="text-base font-bold text-slate-800">Pilih Foto Galeri untuk Home</h3>
        <span class="text-xs text-slate-500">Pilih foto yang ingin disorot di Beranda</span>
      </div>

      <div class="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div v-for="img in galeriHome" :key="img.id" class="relative group rounded-xl overflow-hidden border border-slate-200 bg-slate-50">
          <img :src="img.url" :alt="img.caption" class="w-full aspect-square object-cover" />
          <div class="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-opacity p-3 flex flex-col justify-between">
            <input type="checkbox" v-model="img.isSelected" class="w-5 h-5 text-[#0284C7] rounded self-end cursor-pointer" />
            <span class="text-xs text-white font-medium truncate">{{ img.caption }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- TAB 6: CALL TO ACTION -->
    <div v-if="activeTab === 'cta'" class="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-6">
      <h3 class="text-base font-bold text-slate-800 border-b border-slate-100 pb-3">Pengaturan Banner Call to Action</h3>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div class="space-y-4">
          <div>
            <label class="block text-xs font-bold text-slate-700 uppercase mb-1">Judul CTA</label>
            <input v-model="ctaData.title" type="text" class="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-[#0284C7]/20 focus:border-[#0284C7]" />
          </div>

          <div>
            <label class="block text-xs font-bold text-slate-700 uppercase mb-1">Deskripsi Singkat</label>
            <textarea v-model="ctaData.description" rows="3" class="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-[#0284C7]/20 focus:border-[#0284C7]"></textarea>
          </div>

          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="block text-xs font-bold text-slate-700 uppercase mb-1">Teks Tombol</label>
              <input v-model="ctaData.btnText" type="text" class="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-[#0284C7]/20 focus:border-[#0284C7]" />
            </div>
            <div>
              <label class="block text-xs font-bold text-slate-700 uppercase mb-1">Link Tombol</label>
              <input v-model="ctaData.btnLink" type="text" class="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-[#0284C7]/20 focus:border-[#0284C7]" />
            </div>
          </div>
        </div>

        <div>
          <label class="block text-xs font-bold text-slate-700 uppercase mb-1">Tampilan Preview CTA</label>
          <div class="p-6 rounded-2xl bg-gradient-to-r from-[#0284C7] to-[#06B6D4] text-white space-y-3 shadow-md">
            <h4 class="text-lg font-bold">{{ ctaData.title || 'Judul CTA' }}</h4>
            <p class="text-xs text-sky-100 leading-relaxed">{{ ctaData.description || 'Deskripsi CTA...' }}</p>
            <button class="px-4 py-2 rounded-xl bg-[#F5E6C8] text-slate-800 font-bold text-xs shadow-sm">
              {{ ctaData.btnText || 'Tombol' }}
            </button>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<style scoped>
/* Menyembunyikan scrollbar pada navigasi tab */
.scrollbar-none::-webkit-scrollbar {
  display: none;
}
.scrollbar-none {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>