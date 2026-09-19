<script setup>
import { ref, computed } from 'vue'

// 1. KATEGORI GALERI
const categories = ['Semua', 'Pemandangan', 'Aktivitas', 'Fasilitas', 'Sunset']

// 2. DATA DUMMY FOTO GALERI
const photoList = ref([
  {
    id: 1,
    judul: 'Senja Sempurna di Tanjung Wabokeo',
    deskripsi: 'Pemandangan matahari terbenam dengan warna langit jingga keemasan.',
    kategori: 'Sunset',
    gambar: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 2,
    judul: 'Aktivitas Snorkeling Konservasi',
    deskripsi: 'Wisatawan menikmati keindahan karang laut bersama pemandu lokal.',
    kategori: 'Aktivitas',
    gambar: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 3,
    judul: 'Area Gazebo Pesisir',
    deskripsi: 'Fasilitas tempat bersantai keluarga di sepanjang bibir pantai.',
    kategori: 'Fasilitas',
    gambar: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 4,
    judul: 'Lanskap Pasir Putih Wabokeo',
    deskripsi: 'Hamparan pasir putih yang bersih dipadu air laut yang jernih.',
    kategori: 'Pemandangan',
    gambar: 'https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&w=800&q=80'
  }
])

// 3. STATE PENCARIAN & FILTER
const searchQuery = ref('')
const selectedCategory = ref('Semua')

const filteredPhotos = computed(() => {
  return photoList.value.filter(item => {
    const matchSearch = item.judul.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
                        item.deskripsi.toLowerCase().includes(searchQuery.value.toLowerCase())
    const matchCategory = selectedCategory.value === 'Semua' || item.kategori === selectedCategory.value
    return matchSearch && matchCategory
  })
})

// 4. STATE MODAL UPLOAD / EDIT
const showModal = ref(false)
const isEditMode = ref(false)

const formPhoto = ref({
  id: null,
  judul: '',
  deskripsi: '',
  kategori: 'Pemandangan',
  gambar: ''
})

// 5. STATE CONFIRMATION & NOTIFIKASI
const showDeleteModal = ref(false)
const photoToDelete = ref(null)

const alertMessage = ref('')
const alertType = ref('success')

const showAlert = (msg, type = 'success') => {
  alertType.value = type
  alertMessage.value = msg
  setTimeout(() => { alertMessage.value = '' }, 3500)
}

// 6. HANDLER MODAL FORM
const openModal = (data = null) => {
  if (data) {
    isEditMode.value = true
    formPhoto.value = { ...data }
  } else {
    isEditMode.value = false
    formPhoto.value = {
      id: Date.now(),
      judul: '',
      deskripsi: '',
      kategori: 'Pemandangan',
      gambar: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80'
    }
  }
  showModal.value = true
}

const closeModal = () => {
  showModal.value = false
}

// 7. PREVIEW GAMBAR VIA FILE UPLOAD
const handleImageUpload = (event) => {
  const file = event.target.files[0]
  if (file) {
    const reader = new FileReader()
    reader.onload = (e) => {
      formPhoto.value.gambar = e.target.result
    }
    reader.readAsDataURL(file)
  }
}

// 8. SIMPAN DATA FOTO
const savePhoto = () => {
  if (!formPhoto.value.judul || !formPhoto.value.gambar) return

  if (isEditMode.value) {
    const index = photoList.value.findIndex(p => p.id === formPhoto.value.id)
    if (index !== -1) photoList.value[index] = { ...formPhoto.value }
    showAlert('Informasi foto berhasil diperbarui!')
  } else {
    photoList.value.unshift({ ...formPhoto.value })
    showAlert('Foto baru berhasil diunggah ke galeri!')
  }
  closeModal()
}

// 9. KONFIRMASI & HAPUS FOTO
const confirmDelete = (photo) => {
  photoToDelete.value = photo
  showDeleteModal.value = true
}

const deletePhoto = () => {
  if (photoToDelete.value) {
    photoList.value = photoList.value.filter(p => p.id !== photoToDelete.value.id)
    showAlert('Foto berhasil dihapus dari galeri.', 'danger')
    photoToDelete.value = null
    showDeleteModal.value = false
  }
}
</script>

<template>
  <div class="space-y-6 pb-12">
    
    <!-- HEADER & ACTION BUTTONS -->
    <div class="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
      <div>
        <h2 class="text-2xl font-bold text-slate-800 tracking-tight">Kelola Galeri Foto</h2>
        <p class="text-slate-500 text-sm mt-0.5">
          Atur foto dokumentasi kecantikan, aktivitas, dan fasilitas Pantai Wabokeo.
        </p>
      </div>

      <button 
        @click="openModal()"
        type="button"
        class="px-4 py-2.5 rounded-xl bg-[#0284C7] hover:bg-[#0284C7]/90 text-white font-semibold text-xs lg:text-sm shadow-sm transition-all active:scale-95 flex items-center gap-2 self-start md:self-auto"
      >
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
        </svg>
        Tambah Foto Baru
      </button>
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
        :class="alertType === 'success' ? 'bg-emerald-50 border-emerald-200 text-emerald-800' : 'bg-rose-50 border-rose-200 text-rose-800'"
        class="p-4 rounded-xl border text-sm flex items-center gap-3 shadow-sm"
      >
        <svg v-if="alertType === 'success'" class="w-5 h-5 text-emerald-600 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <svg v-else class="w-5 h-5 text-rose-600 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
        </svg>
        <span class="font-medium">{{ alertMessage }}</span>
      </div>
    </Transition>

    <!-- CONTROL BAR: CATEGORY FILTER & SEARCH -->
    <div class="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex flex-col lg:flex-row items-center justify-between gap-4">
      
      <!-- FILTER KATEGORI (TABS) -->
      <div class="flex items-center gap-1.5 overflow-x-auto w-full lg:w-auto pb-2 lg:pb-0 scrollbar-none">
        <button 
          v-for="cat in categories" 
          :key="cat"
          @click="selectedCategory = cat"
          :class="selectedCategory === cat ? 'bg-[#0284C7] text-white shadow-xs' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'"
          class="px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all"
        >
          {{ cat }}
        </button>
      </div>

      <!-- SEARCH INPUT -->
      <div class="relative w-full lg:w-72">
        <svg class="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <input 
          v-model="searchQuery" 
          type="text" 
          placeholder="Cari judul atau deskripsi foto..."
          class="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-200 text-xs lg:text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#0284C7]/20 focus:border-[#0284C7] transition-all"
        />
      </div>

    </div>

    <!-- GALLERY GRID -->
    <div v-if="filteredPhotos.length > 0" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      <div 
        v-for="photo in filteredPhotos" 
        :key="photo.id"
        class="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden flex flex-col hover:shadow-md transition-all group"
      >
        <!-- Photo Container & Overlay Hover -->
        <div class="relative aspect-4/3 bg-slate-100 overflow-hidden">
          <img 
            :src="photo.gambar" 
            :alt="photo.judul" 
            class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" 
          />
          
          <!-- Badge Kategori -->
          <div class="absolute top-3 left-3 z-10">
            <span class="px-2.5 py-1 rounded-lg bg-slate-900/60 text-white text-[10px] font-bold uppercase tracking-wider backdrop-blur-xs">
              {{ photo.kategori }}
            </span>
          </div>

          <!-- Action Hover Overlay -->
          <div class="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
            <button 
              @click="openModal(photo)"
              type="button"
              class="p-2.5 rounded-xl bg-white text-[#0284C7] hover:bg-sky-50 shadow-md transition-all transform hover:scale-110"
              title="Edit Foto"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 012.828 0L20 6.586a2 2 0 010 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
            </button>
            <button 
              @click="confirmDelete(photo)"
              type="button"
              class="p-2.5 rounded-xl bg-white text-rose-600 hover:bg-rose-50 shadow-md transition-all transform hover:scale-110"
              title="Hapus Foto"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
          </div>
        </div>

        <!-- Card Body -->
        <div class="p-4 flex-1 flex flex-col justify-between space-y-2">
          <div>
            <h3 class="font-bold text-slate-800 text-sm line-clamp-1 group-hover:text-[#0284C7] transition-colors">
              {{ photo.judul }}
            </h3>
            <p class="text-xs text-slate-500 leading-relaxed mt-1 line-clamp-2">
              {{ photo.deskripsi }}
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- STATE KOSONG -->
    <div v-else class="bg-white p-12 rounded-2xl border border-slate-100 text-center text-slate-400">
      <svg class="w-12 h-12 mx-auto text-slate-300 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
      <p class="text-sm font-medium">Tidak ada foto ditemukan dalam galeri.</p>
    </div>

    <!-- MODAL FORM (TAMBAH / EDIT FOTO) - TEROPTIMASI MAKSIMAL TINGGI -->
    <div v-if="showModal" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs">
      <div class="bg-white rounded-2xl border border-slate-100 shadow-xl w-full max-w-2xl max-h-[85vh] flex flex-col overflow-hidden animate-in fade-in zoom-in duration-200">
        
        <!-- Modal Header (Fixed) -->
        <div class="p-4 sm:p-5 border-b border-slate-100 flex items-center justify-between shrink-0">
          <h3 class="font-bold text-slate-800 text-base">
            {{ isEditMode ? 'Edit Informasi Foto' : 'Unggah Foto Baru' }}
          </h3>
          <button @click="closeModal" class="text-slate-400 hover:text-slate-600 p-1 rounded-lg hover:bg-slate-100 transition-all">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <!-- Modal Body Form (Scrollable jika layar HP pendek) -->
        <form @submit.prevent="savePhoto" class="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            <!-- Kolom Kiri: Preview & Input File -->
            <div class="space-y-3">
              <label class="block text-xs font-bold text-slate-700 uppercase">Preview Gambar</label>
              
              <!-- Preview Ringkas (Max Height 180px) -->
              <div class="relative h-44 rounded-xl overflow-hidden border border-slate-200 bg-slate-50 flex items-center justify-center">
                <img v-if="formPhoto.gambar" :src="formPhoto.gambar" alt="Preview Gambar" class="w-full h-full object-cover" />
                <div v-else class="text-center text-slate-400 p-4">
                  <svg class="w-8 h-8 mx-auto mb-1 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span class="text-xs">Belum ada gambar</span>
                </div>
              </div>

              <!-- Pilihan File/URL -->
              <div class="space-y-2">
                <label class="flex items-center justify-center px-3 py-2 border border-dashed border-sky-300 rounded-xl bg-[#E0F2FE]/30 hover:bg-[#E0F2FE]/60 cursor-pointer text-xs font-semibold text-[#0284C7] transition-all">
                  <span>Pilih File Foto</span>
                  <input type="file" accept="image/*" @change="handleImageUpload" class="hidden" />
                </label>
                <input 
                  v-model="formPhoto.gambar" 
                  type="text" 
                  placeholder="Atau tempel URL gambar..." 
                  class="w-full px-3 py-1.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-[#0284C7]"
                />
              </div>
            </div>

            <!-- Kolom Kanan: Detail Informasi Foto -->
            <div class="space-y-3">
              <div>
                <label class="block text-xs font-bold text-slate-700 uppercase mb-1">Judul Foto</label>
                <input 
                  v-model="formPhoto.judul" 
                  type="text" 
                  required 
                  placeholder="Contoh: Sunset di Pantai Wabokeo"
                  class="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs lg:text-sm focus:outline-none focus:border-[#0284C7]" 
                />
              </div>

              <div>
                <label class="block text-xs font-bold text-slate-700 uppercase mb-1">Kategori</label>
                <select 
                  v-model="formPhoto.kategori" 
                  class="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs lg:text-sm focus:outline-none focus:border-[#0284C7]"
                >
                  <option v-for="cat in categories.filter(c => c !== 'Semua')" :key="cat" :value="cat">
                    {{ cat }}
                  </option>
                </select>
              </div>

              <div>
                <label class="block text-xs font-bold text-slate-700 uppercase mb-1">Deskripsi Ringkas</label>
                <textarea 
                  v-model="formPhoto.deskripsi" 
                  rows="3" 
                  placeholder="Keterangan singkat foto..."
                  class="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs lg:text-sm focus:outline-none focus:border-[#0284C7] resize-none"
                ></textarea>
              </div>
            </div>

          </div>

          <!-- Modal Footer (Fixed di bagian bawah modal) -->
          <div class="pt-3 border-t border-slate-100 flex items-center justify-end gap-2 shrink-0">
            <button @click="closeModal" type="button" class="px-4 py-2 rounded-xl border border-slate-200 text-slate-600 font-semibold text-xs hover:bg-slate-50 transition-all">
              Batal
            </button>
            <button type="submit" class="px-4 py-2 rounded-xl bg-[#0284C7] hover:bg-[#0284C7]/90 text-white font-semibold text-xs shadow-sm transition-all">
              Simpan Foto
            </button>
          </div>
        </form>

      </div>
    </div>

    <!-- MODAL KONFIRMASI HAPUS -->
    <div v-if="showDeleteModal" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs">
      <div class="bg-white rounded-2xl border border-slate-100 shadow-xl w-full max-w-sm p-6 text-center space-y-4 animate-in fade-in zoom-in duration-200">
        <div class="w-12 h-12 bg-rose-100 text-rose-600 rounded-full flex items-center justify-center mx-auto">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>
        
        <div>
          <h3 class="font-bold text-slate-800 text-base">Hapus Foto Ini?</h3>
          <p class="text-xs text-slate-500 mt-1">
            Foto "<span class="font-semibold text-slate-700">{{ photoToDelete?.judul }}</span>" akan dihapus secara permanen dari galeri.
          </p>
        </div>

        <div class="flex items-center justify-center gap-3 pt-2">
          <button 
            @click="showDeleteModal = false" 
            type="button" 
            class="px-4 py-2 rounded-xl border border-slate-200 text-slate-600 font-semibold text-xs flex-1"
          >
            Batal
          </button>
          <button 
            @click="deletePhoto" 
            type="button" 
            class="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-semibold text-xs flex-1 shadow-sm transition-all"
          >
            Hapus
          </button>
        </div>
      </div>
    </div>

  </div>
</template>