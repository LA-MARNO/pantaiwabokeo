<script setup>
import { ref } from 'vue'

// 1. Initial/Default Data Dummy (Untuk Fitur Reset)
const initialData = {
  pageTitle: 'Tentang Pantai Wabokeo',
  description: 'Destinasi wisata pesisir unggulan dengan pemandangan alam memukau, pasir putih yang bersih, serta kebudayaan lokal yang ramah dan hangat.',
  imagePreview: 'https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&w=1000&q=80',
  historyText: 'Pantai Wabokeo mulanya merupakan kawasan pesisir nelayan tradisional yang terjaga keasliannya. Seiring berjalannya waktu, potensi keindahan alam yang memikat membuat masyarakat setempat bergotong-royong mengembangkannya menjadi destinasi wisata berbasis konservasi dan pemberdayaan ekonomi lokal.',
  features: [
    { id: 1, title: 'Air Laut Jernih & Pasir Putih', desc: 'Sangat cocok untuk berenang, snorkeling, dan bersantai bersama keluarga.' },
    { id: 2, title: 'Fasilitas Lengkap', desc: 'Tersedia area parkir luas, gazebo nyaman, tempat bilas, dan warung kuliner lokal.' },
    { id: 3, title: 'Spot Sunset Terbaik', desc: 'Pemandangan matahari terbenam dengan sudut pemandangan tanpa batas ke Samudra.' }
  ]
}

// 2. State Reaktif Form (Deep Copy)
const formData = ref(JSON.parse(JSON.stringify(initialData)))

// 3. State Tambah Keunggulan Baru
const newFeatureTitle = ref('')
const newFeatureDesc = ref('')

// Status Alert
const alertMessage = ref('')
const alertType = ref('success') // 'success' | 'reset'

// 4. Handle Preview Upload Gambar Utama
const handleImageUpload = (event) => {
  const file = event.target.files[0]
  if (file) {
    const reader = new FileReader()
    reader.onload = (e) => {
      formData.value.imagePreview = e.target.result
    }
    reader.readAsDataURL(file)
  }
}

// 5. Handle Tambah Keunggulan
const addFeature = () => {
  if (newFeatureTitle.value.trim() && newFeatureDesc.value.trim()) {
    formData.value.features.push({
      id: Date.now(),
      title: newFeatureTitle.value,
      desc: newFeatureDesc.value
    })
    newFeatureTitle.value = ''
    newFeatureDesc.value = ''
  }
}

// 6. Handle Hapus Keunggulan
const deleteFeature = (id) => {
  formData.value.features = formData.value.features.filter(f => f.id !== id)
}

// 7. Handle Simpan Perubahan
const handleSave = () => {
  alertType.value = 'success'
  alertMessage.value = 'Perubahan halaman Tentang berhasil disimpan!'
  setTimeout(() => {
    alertMessage.value = ''
  }, 3500)
}

// 8. Handle Reset Form
const handleReset = () => {
  if (confirm('Apakah Anda yakin ingin mengembalikan semua data ke kondisi semula?')) {
    formData.value = JSON.parse(JSON.stringify(initialData))
    newFeatureTitle.value = ''
    newFeatureDesc.value = ''
    
    alertType.value = 'reset'
    alertMessage.value = 'Formulir berhasil di-reset ke data semula.'
    setTimeout(() => {
      alertMessage.value = ''
    }, 3500)
  }
}
</script>

<template>
  <div class="space-y-6 pb-12">
    
    <!-- HEADER HALAMAN & ACTION BUTTONS -->
    <div class="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
      <div>
        <h2 class="text-2xl font-bold text-slate-800 tracking-tight">Kelola Halaman Tentang</h2>
        <p class="text-slate-500 text-sm mt-0.5">
          Perbarui informasi sejarah, deskripsi umum, dan daftar keunggulan Pantai Wabokeo.
        </p>
      </div>

      <div class="flex items-center gap-3 self-end md:self-auto">
        <!-- Tombol Reset -->
        <button 
          @click="handleReset"
          type="button"
          class="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-600 bg-white hover:bg-slate-50 font-semibold text-xs lg:text-sm shadow-sm transition-all active:scale-95 flex items-center gap-2"
        >
          <svg class="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          Reset
        </button>

        <!-- Tombol Simpan -->
        <button 
          @click="handleSave"
          type="button"
          class="px-5 py-2.5 rounded-xl bg-[#0284C7] hover:bg-[#0284C7]/90 text-white font-semibold text-xs lg:text-sm shadow-sm transition-all active:scale-95 flex items-center gap-2"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
          </svg>
          Simpan Perubahan
        </button>
      </div>
    </div>

    <!-- NOTIFIKASI SUKSES / RESET -->
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
        :class="alertType === 'success' ? 'bg-emerald-50 border-emerald-200 text-emerald-800' : 'bg-amber-50 border-amber-200 text-amber-800'"
        class="p-4 rounded-xl border text-sm flex items-center gap-3 shadow-sm"
      >
        <svg v-if="alertType === 'success'" class="w-5 h-5 text-emerald-600 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <svg v-else class="w-5 h-5 text-amber-600 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
        <span class="font-medium">{{ alertMessage }}</span>
      </div>
    </Transition>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      
      <!-- KOLOM KIRI (2 Kolom): Informasi Umum & Sejarah -->
      <div class="lg:col-span-2 space-y-6">
        
        <!-- SECTION 1: HEADER & DESKRIPSI UTAMA -->
        <div class="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-4">
          <h3 class="text-base font-bold text-slate-800 border-b border-slate-100 pb-3 flex items-center gap-2">
            <span class="w-2.5 h-2.5 rounded-full bg-[#0284C7]"></span>
            Informasi Halaman Utama
          </h3>

          <div>
            <label class="block text-xs font-bold text-slate-700 uppercase mb-1.5">Judul Halaman</label>
            <input 
              v-model="formData.pageTitle" 
              type="text" 
              placeholder="Contoh: Tentang Pantai Wabokeo"
              class="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-[#0284C7]/20 focus:border-[#0284C7] transition-all"
            />
          </div>

          <div>
            <label class="block text-xs font-bold text-slate-700 uppercase mb-1.5">Deskripsi Singkat</label>
            <textarea 
              v-model="formData.description" 
              rows="3" 
              placeholder="Tuliskan deskripsi ringkas..."
              class="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-[#0284C7]/20 focus:border-[#0284C7] transition-all"
            ></textarea>
          </div>
        </div>

        <!-- SECTION 2: SEJARAH & DESKRIPSI LENGKAP -->
        <div class="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-4">
          <h3 class="text-base font-bold text-slate-800 border-b border-slate-100 pb-3 flex items-center gap-2">
            <span class="w-2.5 h-2.5 rounded-full bg-[#06B6D4]"></span>
            Sejarah & Deskripsi Kawasan
          </h3>

          <div>
            <label class="block text-xs font-bold text-slate-700 uppercase mb-1.5">Teks Sejarah / Cerita Singkat</label>
            <textarea 
              v-model="formData.historyText" 
              rows="6" 
              placeholder="Jelaskan sejarah perkembangan atau daya tarik utama Pantai Wabokeo..."
              class="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-slate-800 text-sm leading-relaxed focus:outline-none focus:ring-2 focus:ring-[#0284C7]/20 focus:border-[#0284C7] transition-all"
            ></textarea>
            <p class="text-[11px] text-slate-400 mt-1">Gunakan paragraf yang jelas dan mudah dipahami oleh calon wisatawan.</p>
          </div>
        </div>

        <!-- SECTION 3: KEUNGGULAN PANTAI WABOKEO -->
        <div class="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-5">
          <h3 class="text-base font-bold text-slate-800 border-b border-slate-100 pb-3 flex items-center gap-2">
            <span class="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
            Keunggulan Pantai Wabokeo
          </h3>

          <!-- Form Tambah Keunggulan -->
          <div class="p-4 rounded-xl bg-[#E0F2FE]/40 border border-sky-100 space-y-3">
            <h4 class="text-xs font-bold text-[#0284C7] uppercase">Tambah Keunggulan Baru</h4>
            <div class="space-y-2">
              <input 
                v-model="newFeatureTitle" 
                type="text" 
                placeholder="Judul Keunggulan (ex: Spot Sunset Terbaik)"
                class="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs bg-white focus:outline-none focus:border-[#0284C7]"
              />
              <textarea 
                v-model="newFeatureDesc" 
                rows="2" 
                placeholder="Penjelasan singkat mengenai keunggulan ini..."
                class="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs bg-white focus:outline-none focus:border-[#0284C7]"
              ></textarea>
            </div>
            <button 
              @click="addFeature" 
              type="button"
              class="px-4 py-2 rounded-xl bg-[#0284C7] text-white font-semibold text-xs hover:bg-[#0284C7]/90 transition-all shadow-sm active:scale-95"
            >
              + Tambah ke Daftar
            </button>
          </div>

          <!-- List Item Keunggulan -->
          <div class="space-y-3 pt-2">
            <div 
              v-for="(item, index) in formData.features" 
              :key="item.id"
              class="p-4 rounded-xl border border-slate-100 bg-slate-50/60 flex items-start justify-between gap-3 group hover:border-sky-200 hover:bg-white transition-all shadow-2xs"
            >
              <div class="space-y-1 flex-1">
                <div class="flex items-center gap-2">
                  <span class="w-5 h-5 rounded-full bg-[#F5E6C8] text-amber-800 font-bold text-[10px] flex items-center justify-center shrink-0">
                    {{ index + 1 }}
                  </span>
                  <input 
                    v-model="item.title" 
                    type="text" 
                    class="font-bold text-slate-800 text-sm bg-transparent border-b border-transparent hover:border-slate-300 focus:border-[#0284C7] focus:bg-white focus:outline-none px-1 rounded transition-all w-full"
                  />
                </div>
                <textarea 
                  v-model="item.desc" 
                  rows="2"
                  class="text-xs text-slate-600 bg-transparent border border-transparent hover:border-slate-200 focus:border-[#0284C7] focus:bg-white focus:outline-none p-1 rounded transition-all w-full leading-relaxed"
                ></textarea>
              </div>

              <button 
                @click="deleteFeature(item.id)" 
                type="button"
                class="text-slate-400 hover:text-rose-500 p-1.5 rounded-lg hover:bg-rose-50 transition-all shrink-0"
                title="Hapus Keunggulan"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>

      </div>

      <!-- KOLOM KANAN (1 Kolom): Upload Gambar Utama & Preview -->
      <div class="space-y-6">
        
        <div class="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-4 sticky top-6">
          <h3 class="text-base font-bold text-slate-800 border-b border-slate-100 pb-3 flex items-center gap-2">
            <span class="w-2.5 h-2.5 rounded-full bg-[#F5E6C8]"></span>
            Gambar Utama
          </h3>

          <!-- Box Preview Gambar -->
          <div class="space-y-3">
            <label class="block text-xs font-bold text-slate-700 uppercase">Preview Tampilan</label>
            <div class="relative aspect-4/3 rounded-xl overflow-hidden border border-slate-200 bg-slate-50 group shadow-inner">
              <img 
                :src="formData.imagePreview" 
                alt="Preview Gambar Utama" 
                class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div class="absolute inset-0 bg-slate-900/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <span class="text-xs font-semibold text-white bg-slate-900/60 px-3 py-1.5 rounded-lg backdrop-blur-xs">
                  Gambar Utama Halaman
                </span>
              </div>
            </div>
          </div>

          <!-- Input File Upload -->
          <div class="space-y-2 pt-2">
            <label class="block text-xs font-bold text-slate-700 uppercase">Upload Gambar Baru</label>
            <label class="flex flex-col items-center justify-center w-full h-28 border-2 border-dashed border-sky-200 hover:border-[#0284C7] rounded-xl cursor-pointer bg-[#E0F2FE]/20 hover:bg-[#E0F2FE]/50 transition-all text-center p-4">
              <svg class="w-6 h-6 text-[#0284C7] mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
              </svg>
              <span class="text-xs font-semibold text-slate-700">Klik untuk upload foto</span>
              <span class="text-[10px] text-slate-400 mt-0.5">PNG, JPG, atau WEBP (Max. 2MB)</span>
              <input type="file" accept="image/*" class="hidden" @change="handleImageUpload" />
            </label>
          </div>

          <!-- URL Gambar Opsional -->
          <div class="pt-2">
            <label class="block text-xs font-bold text-slate-700 uppercase mb-1">Atau Gunakan Link URL</label>
            <input 
              v-model="formData.imagePreview" 
              type="text" 
              placeholder="https://..."
              class="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs text-slate-800 focus:outline-none focus:border-[#0284C7]"
            />
          </div>
        </div>

      </div>

    </div>

  </div>
</template>