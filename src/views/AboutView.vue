<template>
  <div class="min-h-screen bg-slate-50 pt-10 overflow-x-hidden">
    
    <!-- Hero Banner Section -->
    <section class="relative bg-gradient-to-b from-[#0284C7] to-[#06B6D4] text-[#FFFFFF] py-20 lg:py-28 px-4 sm:px-6 lg:px-8">
      <!-- Ornamen Gelombang Latar Belakang -->
      <div class="absolute inset-0 opacity-10 pointer-events-none">
        <svg class="w-full h-full" fill="currentColor" viewBox="0 0 100 100" preserveAspectRatio="none">
          <path d="M0,50 Q25,30 50,50 T100,50 L100,100 L0,100 Z"></path>
        </svg>
      </div>

      <div class="max-w-5xl mx-auto text-center relative z-10">
        <span class="animate-fade-in inline-block px-4 py-1.5 rounded-full bg-[#E0F2FE] text-[#0284C7] text-sm font-bold tracking-wide uppercase mb-4 shadow-sm">
          Mengenal Lebih Dekat
        </span>
        <h1 class="animate-slide-up text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight mb-6 leading-tight">
          Pesona Bahari <span class="text-[#F5E6C8]">Pantai Wabokeo</span>
        </h1>
        <p class="animate-slide-up-delay-1 text-lg sm:text-xl text-[#E0F2FE] max-w-3xl mx-auto font-medium leading-relaxed">
          Destinasi wisata pesisir unggulan yang menyajikan perpaduan keindahan alam laut yang asri, pasir pantai yang lembut, serta suasana ketenangan yang tak terlupakan.
        </p>
      </div>
    </section>

    <!-- Deskripsi & Visual Utama Section -->
    <section class="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        
        <!-- Gambar / Visual Card -->
        <div class="animate-scale-in relative group">
          <div class="absolute -inset-2 bg-gradient-to-r from-[#06B6D4] to-[#F5E6C8] rounded-3xl blur opacity-30 group-hover:opacity-50 transition duration-500"></div>
          <div class="relative bg-[#FFFFFF] p-3 rounded-3xl shadow-xl overflow-hidden border border-[#E0F2FE]">
            <img 
              src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80" 
              alt="Pemandangan Pantai Wabokeo" 
              class="w-full h-[380px] sm:h-[450px] object-cover rounded-2xl group-hover:scale-105 transition duration-500"
            />
            <div class="absolute bottom-6 left-6 right-6 bg-[#FFFFFF]/90 backdrop-blur-md p-4 rounded-xl border border-[#E0F2FE] shadow-md">
              <div class="flex items-center justify-between">
                <div>
                  <p class="text-xs font-bold text-[#06B6D4] uppercase tracking-wider">Lokasi Strategis</p>
                  <p class="text-sm font-extrabold text-slate-800">Kawasan Pesisir Wabokeo</p>
                </div>
                <span class="px-3 py-1 bg-[#F5E6C8] text-[#0284C7] text-xs font-black rounded-full">
                  4.8 ★
                </span>
              </div>
            </div>
          </div>
        </div>

        <!-- Teks Deskripsi -->
        <div class="space-y-6">
          <div class="animate-slide-up">
            <h2 class="text-3xl sm:text-4xl font-extrabold text-[#0284C7] leading-tight">
              Surga Pesisir Tersembunyi dengan Lingkungan yang Terjaga
            </h2>
            <div class="w-20 h-1.5 bg-[#06B6D4] rounded-full mt-3"></div>
          </div>

          <p class="animate-slide-up-delay-1 text-slate-600 leading-relaxed text-base sm:text-lg">
            Pantai Wabokeo merupakan destinasi wisata alam yang menawarkan pemandangan lanskap pesisir yang menakjubkan. Terkenal dengan hamparan pasir bersih berpadu air laut jernih berwarna kebiruan, pantai ini menjadi pilihan utama bagi wisatawan yang mencari ketenangan dari hiruk-pikuk perkotaan.
          </p>

          <p class="animate-slide-up-delay-2 text-slate-600 leading-relaxed text-base sm:text-lg">
            Pengelolaan Pantai Wabokeo berfokus pada kelestarian ekosistem pesisir serta kenyamanan pengunjung. Berbagai fasilitas ramah keluarga dan spot bersantai telah dirancang agar menyatu secara harmonis dengan keindahan alami sekitar.
          </p>

          <!-- Statistik Ringkas -->
          <div class="animate-slide-up-delay-3 grid grid-cols-3 gap-4 pt-4 border-t border-[#E0F2FE]">
            <div class="p-3 bg-[#E0F2FE]/50 rounded-xl text-center border border-[#E0F2FE]">
              <span class="block text-2xl font-black text-[#0284C7]">100%</span>
              <span class="text-xs font-bold text-slate-600">Alami</span>
            </div>
            <div class="p-3 bg-[#E0F2FE]/50 rounded-xl text-center border border-[#E0F2FE]">
              <span class="block text-2xl font-black text-[#0284C7]">24/7</span>
              <span class="text-xs font-bold text-slate-600">Keamanan</span>
            </div>
            <div class="p-3 bg-[#E0F2FE]/50 rounded-xl text-center border border-[#E0F2FE]">
              <span class="block text-2xl font-black text-[#0284C7]">5★</span>
              <span class="text-xs font-bold text-slate-600">Fasilitas</span>
            </div>
          </div>
        </div>

      </div>
    </section>

    <!-- Keunggulan Pantai (Card Grid Section) -->
    <section class="py-16 bg-[#E0F2FE]/40 border-y border-[#E0F2FE] px-4 sm:px-6 lg:px-8">
      <div class="max-w-7xl mx-auto">
        
        <div class="text-center max-w-3xl mx-auto mb-12 animate-slide-up">
          <h2 class="text-3xl sm:text-4xl font-extrabold text-[#0284C7]">
            Keunggulan Utama Pantai Wabokeo
          </h2>
          <p class="text-slate-600 mt-3 text-base sm:text-lg">
            Hal yang membuat kunjungan Anda di Pantai Wabokeo menjadi pengalaman luar biasa.
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div 
            v-for="(feature, index) in features" 
            :key="index"
            :class="[
              'bg-[#FFFFFF] p-6 rounded-2xl border border-[#E0F2FE] shadow-sm hover:shadow-md hover:border-[#06B6D4] transition duration-300',
              `animate-card-pop-${index + 1}`
            ]"
          >
            <div class="w-12 h-12 rounded-xl bg-[#E0F2FE] flex items-center justify-center text-[#0284C7] font-bold text-2xl mb-4">
              {{ feature.icon }}
            </div>
            <h3 class="text-xl font-bold text-slate-800 mb-2">{{ feature.title }}</h3>
            <p class="text-slate-600 text-sm leading-relaxed">{{ feature.description }}</p>
          </div>
        </div>

      </div>
    </section>

    <!-- Informasi Ringkas Destinasi -->
    <section class="py-16 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto text-center">
      <div class="bg-gradient-to-r from-[#0284C7] to-[#06B6D4] rounded-3xl p-8 sm:p-12 text-[#FFFFFF] shadow-lg relative overflow-hidden animate-scale-in">
        <div class="relative z-10 space-y-4">
          <span class="px-4 py-1 rounded-full bg-[#F5E6C8] text-[#0284C7] text-xs font-black uppercase tracking-wider">
            Rencanakan Kunjungan
          </span>
          <h2 class="text-2xl sm:text-4xl font-extrabold">Siap Menikmati Keindahan Pantai Wabokeo?</h2>
          <p class="text-[#E0F2FE] max-w-2xl mx-auto text-sm sm:text-base">
            Buka setiap hari mulai pukul 06.00 - 18.00 WITA. Nikmati kemudahan fasilitas reservasi area & tiket masuk secara daring.
          </p>
          <div class="pt-4 flex flex-wrap justify-center gap-4">
            <router-link 
              to="/reservasi" 
              class="px-6 py-3 rounded-full bg-[#F5E6C8] text-[#0284C7] font-bold hover:bg-[#FFFFFF] transition duration-300 shadow-md"
            >
              Pesan Tiket Sekarang
            </router-link>
            <router-link 
              to="/kontak" 
              class="px-6 py-3 rounded-full bg-[#FFFFFF]/10 border border-[#FFFFFF]/40 text-[#FFFFFF] font-bold hover:bg-[#FFFFFF]/20 transition duration-300"
            >
              Hubungi Kami
            </router-link>
          </div>
        </div>
      </div>
    </section>

  </div>
</template>

<script>
export default {
  name: 'AboutView',
  data() {
    return {
      features: [
        {
          icon: '🌊',
          title: 'Air Laut Jernih',
          description: 'Kondisi air perairan pantai yang bersih, aman, dan sangat cocok untuk aktivitas renang maupun rekreasi air.'
        },
        {
          icon: '🏖️',
          title: 'Pasir Halus',
          description: 'Garis pantai luas dilapisi pasir alami yang nyaman untuk bersantai bersama keluarga dan kerabat.'
        },
        {
          icon: '🌅',
          title: 'Pemandangan Sunset',
          description: 'Lokasi strategis menghadap cakrawala utara-barat untuk menikmati momen matahari terbenam memukau.'
        },
        {
          icon: '🌴',
          title: 'Fasilitas Lengkap',
          description: 'Tersedia gazebo bersantai, area kuliner pesisir, toilet bersih, serta area parkir yang luas dan aman.'
        }
      ]
    }
  }
}
</script>

<style scoped>
/* Keyframe Animations */
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes slideUp {
  from { 
    opacity: 0; 
    transform: translateY(24px); 
  }
  to { 
    opacity: 1; 
    transform: translateY(0); 
  }
}

@keyframes scaleIn {
  from { 
    opacity: 0; 
    transform: scale(0.92); 
  }
  to { 
    opacity: 1; 
    transform: scale(1); 
  }
}

/* Custom Animation Utility Classes */
.animate-fade-in {
  animation: fadeIn 0.6s ease-out forwards;
}

.animate-slide-up {
  animation: slideUp 0.6s ease-out forwards;
}

.animate-slide-up-delay-1 {
  animation: slideUp 0.6s ease-out 0.15s forwards;
  opacity: 0;
}

.animate-slide-up-delay-2 {
  animation: slideUp 0.6s ease-out 0.3s forwards;
  opacity: 0;
}

.animate-slide-up-delay-3 {
  animation: slideUp 0.6s ease-out 0.45s forwards;
  opacity: 0;
}

.animate-scale-in {
  animation: scaleIn 0.7s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

/* Staggered Pop Animation for Features Cards */
.animate-card-pop-1 { animation: slideUp 0.5s ease-out 0.1s forwards; opacity: 0; }
.animate-card-pop-2 { animation: slideUp 0.5s ease-out 0.2s forwards; opacity: 0; }
.animate-card-pop-3 { animation: slideUp 0.5s ease-out 0.3s forwards; opacity: 0; }
.animate-card-pop-4 { animation: slideUp 0.5s ease-out 0.4s forwards; opacity: 0; }
</style>