<script setup>
import { ref, reactive } from 'vue'

// Data Dummy Kontak Awal
const defaultKontak = {
  alamat: 'Jl. Poros Pantai Wabokeo, Desa Wabokeo, Kec. Mawasangka Timur, Kab. Buton Tengah, Sulawesi Tenggara',
  telepon: '+62 821-9876-5432',
  whatsapp: '6282198765432',
  email: 'info@pantaiwabokeo.com',
  jamPelayanan: 'Setiap Hari: 06.00 - 18.00 WITA',
  googleMaps: 'https://maps.google.com/?q=Pantai+Wabokeo',
  instagram: 'https://instagram.com/pantaiwabokeo',
  facebook: 'https://facebook.com/pantaiwabokeoofficial',
  tiktok: 'https://tiktok.com/@pantaiwabokeo'
}

// State Form Kontak (Reaktif)
const formKontak = reactive({ ...defaultKontak })

// State Alert / Notifikasi
const alertMessage = ref('')

const showAlert = (msg) => {
  alertMessage.value = msg
  setTimeout(() => { alertMessage.value = '' }, 3500)
}

// Handler Simpan Data
const handleSave = () => {
  showAlert('Informasi kontak berhasil disimpan!')
}

// Handler Reset Data
const handleReset = () => {
  Object.assign(formKontak, defaultKontak)
  showAlert('Data dikembalikan ke pengaturan awal.')
}
</script>

<template>
  <div class="space-y-6 pb-12">

    <!-- HEADER PAGE -->
    <div class="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
      <div>
        <h2 class="text-2xl font-bold text-slate-800 tracking-tight">Kelola Informasi Kontak</h2>
        <p class="text-slate-500 text-sm mt-0.5">
          Atur informasi alamat, jam operasional, pesan instan, dan tautan media sosial Pantai Wabokeo.
        </p>
      </div>

      <div class="flex items-center gap-3">
        <button 
          @click="handleReset"
          type="button"
          class="px-4 py-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-600 font-semibold text-xs lg:text-sm transition-all active:scale-95"
        >
          Reset
        </button>
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
        class="p-4 rounded-xl border border-emerald-200 bg-emerald-50 text-emerald-800 text-sm flex items-center gap-3 shadow-sm"
      >
        <svg class="w-5 h-5 text-emerald-600 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <span class="font-medium">{{ alertMessage }}</span>
      </div>
    </Transition>

    <!-- CONTENT GRID (FORM & PREVIEW) -->
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
      
      <!-- FORM EDITOR (8 Kolom di Desktop) -->
      <div class="lg:col-span-7 xl:col-span-8 space-y-6">
        
        <!-- SECTION 1: INFORMASI UTAMA -->
        <div class="bg-white p-5 sm:p-6 rounded-2xl border border-slate-100 shadow-sm space-y-4">
          <h3 class="font-bold text-slate-800 text-base border-b border-slate-100 pb-3 flex items-center gap-2">
            <span class="w-2.5 h-2.5 rounded-full bg-[#0284C7]"></span>
            Informasi Utama & Operasional
          </h3>

          <div>
            <label class="block text-xs font-bold text-slate-700 uppercase mb-1">Alamat Lengkap</label>
            <textarea 
              v-model="formKontak.alamat" 
              rows="3" 
              class="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs lg:text-sm focus:outline-none focus:border-[#0284C7] resize-none"
              placeholder="Masukan alamat lokasi pantai..."
            ></textarea>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label class="block text-xs font-bold text-slate-700 uppercase mb-1">Nomor Telepon</label>
              <input 
                v-model="formKontak.telepon" 
                type="text" 
                class="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs lg:text-sm focus:outline-none focus:border-[#0284C7]" 
              />
            </div>
            <div>
              <label class="block text-xs font-bold text-slate-700 uppercase mb-1">Email Resmi</label>
              <input 
                v-model="formKontak.email" 
                type="email" 
                class="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs lg:text-sm focus:outline-none focus:border-[#0284C7]" 
              />
            </div>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label class="block text-xs font-bold text-slate-700 uppercase mb-1">Jam Pelayanan / Operasional</label>
              <input 
                v-model="formKontak.jamPelayanan" 
                type="text" 
                class="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs lg:text-sm focus:outline-none focus:border-[#0284C7]" 
              />
            </div>
            <div>
              <label class="block text-xs font-bold text-slate-700 uppercase mb-1">Nomor WhatsApp (Tanpa tanda +)</label>
              <input 
                v-model="formKontak.whatsapp" 
                type="text" 
                placeholder="628123456789"
                class="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs lg:text-sm focus:outline-none focus:border-[#0284C7]" 
              />
            </div>
          </div>

          <div>
            <label class="block text-xs font-bold text-slate-700 uppercase mb-1">Link Google Maps</label>
            <input 
              v-model="formKontak.googleMaps" 
              type="text" 
              class="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs lg:text-sm focus:outline-none focus:border-[#0284C7]" 
            />
          </div>
        </div>

        <!-- SECTION 2: TAUTAN MEDIA SOSIAL -->
        <div class="bg-white p-5 sm:p-6 rounded-2xl border border-slate-100 shadow-sm space-y-4">
          <h3 class="font-bold text-slate-800 text-base border-b border-slate-100 pb-3 flex items-center gap-2">
            <span class="w-2.5 h-2.5 rounded-full bg-[#06B6D4]"></span>
            Tautan Media Sosial
          </h3>

          <div class="space-y-3">
            <div>
              <label class="block text-xs font-bold text-slate-700 uppercase mb-1">Link Instagram</label>
              <input 
                v-model="formKontak.instagram" 
                type="text" 
                class="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs lg:text-sm focus:outline-none focus:border-[#0284C7]" 
              />
            </div>

            <div>
              <label class="block text-xs font-bold text-slate-700 uppercase mb-1">Link Facebook</label>
              <input 
                v-model="formKontak.facebook" 
                type="text" 
                class="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs lg:text-sm focus:outline-none focus:border-[#0284C7]" 
              />
            </div>

            <div>
              <label class="block text-xs font-bold text-slate-700 uppercase mb-1">Link TikTok</label>
              <input 
                v-model="formKontak.tiktok" 
                type="text" 
                class="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs lg:text-sm focus:outline-none focus:border-[#0284C7]" 
              />
            </div>
          </div>
        </div>

      </div>

      <!-- LIVE PREVIEW CARD (4 Kolom di Desktop) -->
      <div class="lg:col-span-5 xl:col-span-4 sticky top-6">
        <div class="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
          
          <!-- Card Header Preview -->
          <div class="bg-gradient-to-r from-[#0284C7] to-[#06B6D4] p-5 text-white">
            <span class="px-2.5 py-1 rounded-lg bg-white/20 text-[10px] font-bold uppercase tracking-wider backdrop-blur-xs">
              Live Preview
            </span>
            <h4 class="font-bold text-lg mt-2">Hubungi Pantai Wabokeo</h4>
            <p class="text-xs text-sky-100 mt-0.5">Tampilan informasi kontak untuk pengunjung website.</p>
          </div>

          <!-- Card Body Preview -->
          <div class="p-5 space-y-4 text-xs text-slate-600">
            
            <!-- Alamat -->
            <div class="flex items-start gap-3">
              <div class="w-8 h-8 rounded-xl bg-[#E0F2FE] text-[#0284C7] flex items-center justify-center shrink-0">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <div class="flex-1">
                <span class="block font-bold text-slate-800 uppercase text-[10px]">Lokasi</span>
                <p class="leading-relaxed mt-0.5">{{ formKontak.alamat || '-' }}</p>
                <a 
                  v-if="formKontak.googleMaps" 
                  :href="formKontak.googleMaps" 
                  target="_blank" 
                  class="inline-flex items-center gap-1 text-[#0284C7] font-semibold mt-1 hover:underline"
                >
                  Buka di Google Maps
                  <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              </div>
            </div>

            <!-- Jam Pelayanan -->
            <div class="flex items-start gap-3">
              <div class="w-8 h-8 rounded-xl bg-[#F5E6C8]/60 text-amber-800 flex items-center justify-center shrink-0">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <span class="block font-bold text-slate-800 uppercase text-[10px]">Jam Operasional</span>
                <p class="mt-0.5 font-medium text-slate-700">{{ formKontak.jamPelayanan || '-' }}</p>
              </div>
            </div>

            <!-- Telepon & Email -->
            <div class="flex items-start gap-3">
              <div class="w-8 h-8 rounded-xl bg-[#E0F2FE] text-[#0284C7] flex items-center justify-center shrink-0">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <div>
                <span class="block font-bold text-slate-800 uppercase text-[10px]">Kontak Langsung</span>
                <p class="mt-0.5 font-medium text-slate-700">{{ formKontak.telepon || '-' }}</p>
                <p class="text-slate-500">{{ formKontak.email || '-' }}</p>
              </div>
            </div>

            <!-- Tombol Chat WhatsApp -->
            <a 
              v-if="formKontak.whatsapp" 
              :href="`https://wa.me/${formKontak.whatsapp}`" 
              target="_blank"
              class="w-full py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs flex items-center justify-center gap-2 shadow-xs transition-all"
            >
              <svg class="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981z"/>
              </svg>
              Hubungi via WhatsApp
            </a>

            <!-- Media Sosial Bar -->
            <div class="pt-3 border-t border-slate-100 text-center space-y-2">
              <span class="block font-bold text-slate-700 uppercase text-[10px]">Media Sosial</span>
              <div class="flex items-center justify-center gap-2">
                <a 
                  v-if="formKontak.instagram" 
                  :href="formKontak.instagram" 
                  target="_blank" 
                  class="p-2 rounded-xl bg-slate-100 hover:bg-[#0284C7] hover:text-white text-slate-600 transition-all"
                  title="Instagram"
                >
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" stroke-width="2"/>
                    <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" stroke-width="2"/>
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" stroke-width="2"/>
                  </svg>
                </a>

                <a 
                  v-if="formKontak.facebook" 
                  :href="formKontak.facebook" 
                  target="_blank" 
                  class="p-2 rounded-xl bg-slate-100 hover:bg-[#0284C7] hover:text-white text-slate-600 transition-all"
                  title="Facebook"
                >
                  <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M9 8H6v4h3v12h5V12h3.642L18 8h-4V6.333C14 5.374 14.5 5 15.5 5H18V0h-3.808C10.592 0 9 1.583 9 4.615V8z"/>
                  </svg>
                </a>

                <a 
                  v-if="formKontak.tiktok" 
                  :href="formKontak.tiktok" 
                  target="_blank" 
                  class="p-2 rounded-xl bg-slate-100 hover:bg-[#0284C7] hover:text-white text-slate-600 transition-all"
                  title="TikTok"
                >
                  <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.525.001h3.01c.12 1.053.639 2.14 1.425 2.91 1.002 1.002 2.308 1.503 3.614 1.528v3.084c-1.282-.012-2.533-.357-3.614-1.003v7.433c0 4.14-3.356 7.5-7.5 7.5s-7.5-3.36-7.5-7.5 3.356-7.5 7.5-7.5c.34 0 .674.023 1 .069v3.136a4.382 4.382 0 0 0-1-.115 4.385 4.385 0 1 0 4.385 4.385V.001z"/>
                  </svg>
                </a>
              </div>
            </div>

          </div>

        </div>
      </div>

    </div>

  </div>
</template>