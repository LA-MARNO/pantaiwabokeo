<script setup>
import { ref, computed } from 'vue'

// 1. STATE UNTUK TAB ACTIVE ('wisata' | 'fasilitas')
const activeTab = ref('wisata')

// 2. DATA DUMMY WISATA
const wisataList = ref([
  {
    id: 1,
    nama: 'Spot Sunset Tanjung Wabokeo',
    deskripsi: 'Area tebing pesisir pantai dengan pemandangan lanskap senja terbaik tanpa halangan.',
    lokasi: 'Sisi Barat Pantai Wabokeo',
    gambar: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
    status: 'Aktif'
  },
  {
    id: 2,
    nama: 'Area Snorkeling Karang Biru',
    deskripsi: 'Taman bawah laut dengan keanekaragaman terumbu karang dan ikan hias yang masih terjaga.',
    lokasi: 'Zona Konservasi Laut',
    gambar: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=800&q=80',
    status: 'Aktif'
  },
  {
    id: 3,
    nama: 'Hutan Mangrove Wabokeo',
    deskripsi: 'Jalur trekking jembatan kayu melintasi ekosistem hutan bakau yang asri dan sejuk.',
    lokasi: 'Sisi Utara Pantai',
    gambar: 'https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&w=800&q=80',
    status: 'Nonaktif'
  }
])

// 3. DATA DUMMY FASILITAS
const fasilitasList = ref([
  {
    id: 1,
    nama: 'Gazebo & Saung Pesisir',
    deskripsi: 'Tersedia 15 unit gazebo kayu untuk bersantai dan berkumpul keluarga di pinggir pantai.',
    gambar: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80',
    status: 'Aktif'
  },
  {
    id: 2,
    nama: 'Area Parkir Terpadu',
    deskripsi: 'Kawasan parkir luas berpagar aman untuk kendaraan roda dua, roda empat, hingga bus pariwisata.',
    gambar: 'https://images.unsplash.com/photo-1506521781263-d8422e82f27a?auto=format&fit=crop&w=800&q=80',
    status: 'Aktif'
  },
  {
    id: 3,
    nama: 'Kamar Bilas & Toimern',
    deskripsi: 'Fasilitas air bersih lengkap dengan 10 bilik mandi dan toilet yang selalu dibersihkan rutin.',
    gambar: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=800&q=80',
    status: 'Aktif'
  }
])

// 4. FILTER PENCARIAN
const searchQuery = ref('')

const filteredWisata = computed(() => {
  return wisataList.value.filter(item => 
    item.nama.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
    item.lokasi.toLowerCase().includes(searchQuery.value.toLowerCase())
  )
})

const filteredFasilitas = computed(() => {
  return fasilitasList.value.filter(item => 
    item.nama.toLowerCase().includes(searchQuery.value.toLowerCase())
  )
})

// 5. STATE MODAL & FORM (WISATA & FASILITAS)
const showModal = ref(false)
const isEditMode = ref(false)
const modalType = ref('wisata') // 'wisata' | 'fasilitas'

const formWisata = ref({
  id: null,
  nama: '',
  deskripsi: '',
  lokasi: '',
  gambar: '',
  status: 'Aktif'
})

const formFasilitas = ref({
  id: null,
  nama: '',
  deskripsi: '',
  gambar: '',
  status: 'Aktif'
})

// NOTIFIKASI ALERT
const alertMessage = ref('')

const showAlert = (msg) => {
  alertMessage.value = msg
  setTimeout(() => { alertMessage.value = '' }, 3000)
}

// 6. HANDLER MODAL & UPLOAD GAMBAR
const openModal = (type, data = null) => {
  modalType.value = type
  showModal.value = true

  if (data) {
    isEditMode.value = true
    if (type === 'wisata') formWisata.value = { ...data }
    else formFasilitas.value = { ...data }
  } else {
    isEditMode.value = false
    if (type === 'wisata') {
      formWisata.value = { id: Date.now(), nama: '', deskripsi: '', lokasi: '', gambar: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80', status: 'Aktif' }
    } else {
      formFasilitas.value = { id: Date.now(), nama: '', deskripsi: '', gambar: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80', status: 'Aktif' }
    }
  }
}

const closeModal = () => {
  showModal.value = false
}

const handleFileUpload = (event, type) => {
  const file = event.target.files[0]
  if (file) {
    const reader = new FileReader()
    reader.onload = (e) => {
      if (type === 'wisata') formWisata.value.gambar = e.target.result
      else formFasilitas.value.gambar = e.target.result
    }
    reader.readAsDataURL(file)
  }
}

// 7. SIMPAN DATA (TAMBAH / EDIT)
const saveWisata = () => {
  if (!formWisata.value.nama || !formWisata.value.lokasi) return

  if (isEditMode.value) {
    const index = wisataList.value.findIndex(w => w.id === formWisata.value.id)
    if (index !== -1) wisataList.value[index] = { ...formWisata.value }
    showAlert('Data Wisata berhasil diperbarui!')
  } else {
    wisataList.value.push({ ...formWisata.value })
    showAlert('Wisata baru berhasil ditambahkan!')
  }
  closeModal()
}

const saveFasilitas = () => {
  if (!formFasilitas.value.nama) return

  if (isEditMode.value) {
    const index = fasilitasList.value.findIndex(f => f.id === formFasilitas.value.id)
    if (index !== -1) fasilitasList.value[index] = { ...formFasilitas.value }
    showAlert('Data Fasilitas berhasil diperbarui!')
  } else {
    fasilitasList.value.push({ ...formFasilitas.value })
    showAlert('Fasilitas baru berhasil ditambahkan!')
  }
  closeModal()
}

// 8. HAPUS DATA
const deleteWisata = (id) => {
  if (confirm('Apakah Anda yakin ingin menghapus destinasi wisata ini?')) {
    wisataList.value = wisataList.value.filter(w => w.id !== id)
    showAlert('Data Wisata berhasil dihapus.')
  }
}

const deleteFasilitas = (id) => {
  if (confirm('Apakah Anda yakin ingin menghapus fasilitas ini?')) {
    fasilitasList.value = fasilitasList.value.filter(f => f.id !== id)
    showAlert('Data Fasilitas berhasil dihapus.')
  }
}
</script>

<template>
  <div class="space-y-6 pb-12">
    
    <!-- HEADER & ACTION BUTTONS -->
    <div class="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
      <div>
        <h2 class="text-2xl font-bold text-slate-800 tracking-tight">Kelola Wisata & Fasilitas</h2>
        <p class="text-slate-500 text-sm mt-0.5">
          Atur destinasi wisata menarik dan fasilitas penunjang yang ada di Pantai Wabokeo.
        </p>
      </div>

      <div class="flex items-center gap-3">
        <!-- Tombol Tambah Wisata (Hanya muncul jika tab wisata aktif) -->
        <button 
          v-if="activeTab === 'wisata'"
          @click="openModal('wisata')"
          type="button"
          class="px-4 py-2.5 rounded-xl bg-[#0284C7] hover:bg-[#0284C7]/90 text-white font-semibold text-xs lg:text-sm shadow-sm transition-all active:scale-95 flex items-center gap-2"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
          </svg>
          Tambah Wisata
        </button>

        <!-- Tombol Tambah Fasilitas (Hanya muncul jika tab fasilitas aktif) -->
        <button 
          v-if="activeTab === 'fasilitas'"
          @click="openModal('fasilitas')"
          type="button"
          class="px-4 py-2.5 rounded-xl bg-[#06B6D4] hover:bg-[#06B6D4]/90 text-white font-semibold text-xs lg:text-sm shadow-sm transition-all active:scale-95 flex items-center gap-2"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
          </svg>
          Tambah Fasilitas
        </button>
      </div>
    </div>

    <!-- NOTIFIKASI ALERT -->
    <Transition 
      enter-active-class="transition duration-300 ease-out" 
      enter-from-class="transform -translate-y-2 opacity-0" 
      enter-to-class="transform translate-y-0 opacity-100" 
      leave-active-class="transition duration-200 ease-in" 
      leave-from-class="transform translate-y-0 opacity-100" 
      leave-to-class="transform -translate-y-2 opacity-0"
    >
      <div 
        v-if="alertMessage" 
        class="p-4 rounded-xl border bg-emerald-50 border-emerald-200 text-emerald-800 text-sm flex items-center gap-3 shadow-sm"
      >
        <svg class="w-5 h-5 text-emerald-600 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <span class="font-medium">{{ alertMessage }}</span>
      </div>
    </Transition>

    <!-- CONTROL BAR: NAV TABS & SEARCH -->
    <div class="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
      
      <!-- NAV TABS -->
      <div class="flex items-center bg-slate-100 p-1 rounded-xl w-full sm:w-auto">
        <button 
          @click="activeTab = 'wisata'"
          :class="activeTab === 'wisata' ? 'bg-white text-[#0284C7] shadow-xs' : 'text-slate-500 hover:text-slate-800'"
          class="flex-1 sm:flex-initial px-5 py-2 rounded-lg font-bold text-xs lg:text-sm transition-all text-center"
        >
          Destinasi Wisata ({{ wisataList.length }})
        </button>
        <button 
          @click="activeTab = 'fasilitas'"
          :class="activeTab === 'fasilitas' ? 'bg-white text-[#06B6D4] shadow-xs' : 'text-slate-500 hover:text-slate-800'"
          class="flex-1 sm:flex-initial px-5 py-2 rounded-lg font-bold text-xs lg:text-sm transition-all text-center"
        >
          Fasilitas ({{ fasilitasList.length }})
        </button>
      </div>

      <!-- SEARCH INPUT -->
      <div class="relative w-full sm:w-72">
        <svg class="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <input 
          v-model="searchQuery" 
          type="text" 
          :placeholder="activeTab === 'wisata' ? 'Cari wisata & lokasi...' : 'Cari fasilitas...'"
          class="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-200 text-xs lg:text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#0284C7]/20 focus:border-[#0284C7] transition-all"
        />
      </div>

    </div>

    <!-- CONTENT TAB 1: DAFTAR WISATA -->
    <div v-if="activeTab === 'wisata'">
      <div v-if="filteredWisata.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div 
          v-for="item in filteredWisata" 
          :key="item.id"
          class="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden flex flex-col hover:shadow-md transition-all group"
        >
          <!-- Thumbnail Gambar & Badge Status -->
          <div class="relative aspect-16/10 bg-slate-100 overflow-hidden">
            <img :src="item.gambar" :alt="item.nama" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
            <div class="absolute top-3 right-3">
              <span 
                :class="item.status === 'Aktif' ? 'bg-emerald-500 text-white' : 'bg-slate-500 text-white'"
                class="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider shadow-xs"
              >
                {{ item.status }}
              </span>
            </div>
            <div class="absolute bottom-3 left-3 bg-slate-900/70 text-white text-[11px] font-medium px-2.5 py-1 rounded-lg backdrop-blur-xs flex items-center gap-1.5">
              <svg class="w-3.5 h-3.5 text-[#F5E6C8]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              {{ item.lokasi }}
            </div>
          </div>

          <!-- Body Card Wisata -->
          <div class="p-5 flex-1 flex flex-col justify-between space-y-4">
            <div>
              <h3 class="font-bold text-slate-800 text-base line-clamp-1 group-hover:text-[#0284C7] transition-colors">
                {{ item.nama }}
              </h3>
              <p class="text-xs text-slate-500 leading-relaxed mt-2 line-clamp-3">
                {{ item.deskripsi }}
              </p>
            </div>

            <!-- Footer Action Buttons -->
            <div class="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
              <button 
                @click="openModal('wisata', item)" 
                type="button"
                class="px-3 py-1.5 rounded-lg bg-sky-50 text-[#0284C7] hover:bg-sky-100 text-xs font-semibold transition-all flex items-center gap-1"
              >
                <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 012.828 0L20 6.586a2 2 0 010 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
                Edit
              </button>
              <button 
                @click="deleteWisata(item.id)" 
                type="button"
                class="px-3 py-1.5 rounded-lg bg-rose-50 text-rose-600 hover:bg-rose-100 text-xs font-semibold transition-all flex items-center gap-1"
              >
                <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
                Hapus
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- State Kosong Wisata -->
      <div v-else class="bg-white p-12 rounded-2xl border border-slate-100 text-center text-slate-400">
        <p class="text-sm font-medium">Tidak ada data destinasi wisata ditemukan.</p>
      </div>
    </div>

    <!-- CONTENT TAB 2: DAFTAR FASILITAS -->
    <div v-if="activeTab === 'fasilitas'">
      <div v-if="filteredFasilitas.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div 
          v-for="item in filteredFasilitas" 
          :key="item.id"
          class="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden flex flex-col hover:shadow-md transition-all group"
        >
          <!-- Thumbnail & Status -->
          <div class="relative aspect-16/10 bg-slate-100 overflow-hidden">
            <img :src="item.gambar" :alt="item.nama" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
            <div class="absolute top-3 right-3">
              <span 
                :class="item.status === 'Aktif' ? 'bg-emerald-500 text-white' : 'bg-slate-500 text-white'"
                class="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider shadow-xs"
              >
                {{ item.status }}
              </span>
            </div>
          </div>

          <!-- Body Card Fasilitas -->
          <div class="p-5 flex-1 flex flex-col justify-between space-y-4">
            <div>
              <h3 class="font-bold text-slate-800 text-base line-clamp-1 group-hover:text-[#06B6D4] transition-colors">
                {{ item.nama }}
              </h3>
              <p class="text-xs text-slate-500 leading-relaxed mt-2 line-clamp-3">
                {{ item.deskripsi }}
              </p>
            </div>

            <!-- Footer Action Buttons -->
            <div class="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
              <button 
                @click="openModal('fasilitas', item)" 
                type="button"
                class="px-3 py-1.5 rounded-lg bg-cyan-50 text-[#06B6D4] hover:bg-cyan-100 text-xs font-semibold transition-all flex items-center gap-1"
              >
                <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 012.828 0L20 6.586a2 2 0 010 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
                Edit
              </button>
              <button 
                @click="deleteFasilitas(item.id)" 
                type="button"
                class="px-3 py-1.5 rounded-lg bg-rose-50 text-rose-600 hover:bg-rose-100 text-xs font-semibold transition-all flex items-center gap-1"
              >
                <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
                Hapus
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- State Kosong Fasilitas -->
      <div v-else class="bg-white p-12 rounded-2xl border border-slate-100 text-center text-slate-400">
        <p class="text-sm font-medium">Tidak ada data fasilitas ditemukan.</p>
      </div>
    </div>

    <!-- MODAL POPUP (TAMBAH / EDIT DATA) -->
    <div v-if="showModal" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs">
      <div class="bg-white rounded-2xl border border-slate-100 shadow-xl w-full max-w-lg overflow-hidden animate-in fade-in zoom-in duration-200">
        
        <!-- Header Modal -->
        <div class="p-5 border-b border-slate-100 flex items-center justify-between">
          <h3 class="font-bold text-slate-800 text-base">
            {{ isEditMode ? 'Edit' : 'Tambah' }} {{ modalType === 'wisata' ? 'Destinasi Wisata' : 'Fasilitas' }}
          </h3>
          <button @click="closeModal" class="text-slate-400 hover:text-slate-600 p-1 rounded-lg hover:bg-slate-100">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <!-- Body Form Modal Wisata -->
        <form v-if="modalType === 'wisata'" @submit.prevent="saveWisata" class="p-5 space-y-4">
          <div>
            <label class="block text-xs font-bold text-slate-700 uppercase mb-1">Nama Wisata</label>
            <input v-model="formWisata.nama" type="text" required class="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs lg:text-sm focus:outline-none focus:border-[#0284C7]" placeholder="Contoh: Spot Sunset Tanjung Wabokeo" />
          </div>

          <div>
            <label class="block text-xs font-bold text-slate-700 uppercase mb-1">Lokasi</label>
            <input v-model="formWisata.lokasi" type="text" required class="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs lg:text-sm focus:outline-none focus:border-[#0284C7]" placeholder="Contoh: Zona Barat Pantai" />
          </div>

          <div>
            <label class="block text-xs font-bold text-slate-700 uppercase mb-1">Deskripsi</label>
            <textarea v-model="formWisata.deskripsi" rows="3" class="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs lg:text-sm focus:outline-none focus:border-[#0284C7]" placeholder="Jelaskan daya tarik objek wisata ini..."></textarea>
          </div>

          <div>
            <label class="block text-xs font-bold text-slate-700 uppercase mb-1">Status Ketersediaan</label>
            <select v-model="formWisata.status" class="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs lg:text-sm focus:outline-none focus:border-[#0284C7]">
              <option value="Aktif">Aktif (Tampil di Website)</option>
              <option value="Nonaktif">Nonaktif (Disembunyikan)</option>
            </select>
          </div>

          <!-- Preview & Upload Gambar -->
          <div>
            <label class="block text-xs font-bold text-slate-700 uppercase mb-1">Gambar Wisata</label>
            <div class="flex items-center gap-4">
              <img :src="formWisata.gambar" class="w-16 h-16 rounded-xl object-cover border border-slate-200 shrink-0" />
              <input type="file" accept="image/*" @change="(e) => handleFileUpload(e, 'wisata')" class="text-xs text-slate-500 file:mr-3 file:py-2 file:px-3 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-sky-50 file:text-[#0284C7] hover:file:bg-sky-100" />
            </div>
          </div>

          <!-- Footer Modal -->
          <div class="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
            <button @click="closeModal" type="button" class="px-4 py-2 rounded-xl border border-slate-200 text-slate-600 font-semibold text-xs">Batal</button>
            <button type="submit" class="px-4 py-2 rounded-xl bg-[#0284C7] text-white font-semibold text-xs shadow-sm">Simpan Wisata</button>
          </div>
        </form>

        <!-- Body Form Modal Fasilitas -->
        <form v-else @submit.prevent="saveFasilitas" class="p-5 space-y-4">
          <div>
            <label class="block text-xs font-bold text-slate-700 uppercase mb-1">Nama Fasilitas</label>
            <input v-model="formFasilitas.nama" type="text" required class="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs lg:text-sm focus:outline-none focus:border-[#06B6D4]" placeholder="Contoh: Gazebo & Saung Pesisir" />
          </div>

          <div>
            <label class="block text-xs font-bold text-slate-700 uppercase mb-1">Deskripsi</label>
            <textarea v-model="formFasilitas.deskripsi" rows="3" class="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs lg:text-sm focus:outline-none focus:border-[#06B6D4]" placeholder="Jelaskan fasilitas ini..."></textarea>
          </div>

          <div>
            <label class="block text-xs font-bold text-slate-700 uppercase mb-1">Status Fasilitas</label>
            <select v-model="formFasilitas.status" class="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs lg:text-sm focus:outline-none focus:border-[#06B6D4]">
              <option value="Aktif">Aktif (Tampil di Website)</option>
              <option value="Nonaktif">Nonaktif (Disembunyikan)</option>
            </select>
          </div>

          <!-- Preview & Upload Gambar/Ikon -->
          <div>
            <label class="block text-xs font-bold text-slate-700 uppercase mb-1">Gambar / Ikon Fasilitas</label>
            <div class="flex items-center gap-4">
              <img :src="formFasilitas.gambar" class="w-16 h-16 rounded-xl object-cover border border-slate-200 shrink-0" />
              <input type="file" accept="image/*" @change="(e) => handleFileUpload(e, 'fasilitas')" class="text-xs text-slate-500 file:mr-3 file:py-2 file:px-3 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-cyan-50 file:text-[#06B6D4] hover:file:bg-cyan-100" />
            </div>
          </div>

          <!-- Footer Modal -->
          <div class="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
            <button @click="closeModal" type="button" class="px-4 py-2 rounded-xl border border-slate-200 text-slate-600 font-semibold text-xs">Batal</button>
            <button type="submit" class="px-4 py-2 rounded-xl bg-[#06B6D4] text-white font-semibold text-xs shadow-sm">Simpan Fasilitas</button>
          </div>
        </form>

      </div>
    </div>

  </div>
</template>