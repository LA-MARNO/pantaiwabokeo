<template>
  <!-- Menggunakan h-screen / h-dvh dan overflow-hidden agar pas di layar tanpa scroll -->
  <div class="h-screen h-[100dvh] w-full flex items-center justify-center p-4 bg-gradient-to-br from-[#E0F2FE] via-[#06B6D4]/10 to-[#0284C7]/20 relative overflow-hidden">
    
    <!-- Decorative Ambient Background Spheres -->
    <div class="absolute -top-24 -left-24 w-80 h-80 sm:w-96 sm:h-96 bg-[#06B6D4]/20 rounded-full blur-3xl pointer-events-none"></div>
    <div class="absolute -bottom-24 -right-24 w-80 h-80 sm:w-96 sm:h-96 bg-[#0284C7]/20 rounded-full blur-3xl pointer-events-none"></div>

    <!-- Main Card Container -->
    <div class="w-full max-w-md bg-white rounded-2xl shadow-xl shadow-[#0284C7]/10 border border-[#E0F2FE] p-5 sm:p-7 relative z-10 animate-fade-slide-up max-h-[95vh] overflow-y-auto sm:overflow-visible">
      
      <!-- Brand Logo & Header -->
      <div class="text-center mb-6">
        <router-link to="/" class="inline-flex items-center space-x-3 group mb-3">
          <div class="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white flex items-center justify-center border border-[#0284C7]/20 shadow-sm group-hover:scale-105 transition-transform duration-300 overflow-hidden">
            <img src="/logo.png" alt="Logo Pantai Wabokeo" class="w-full h-full object-cover p-0" width="44" height="44" />
          </div>
          <span class="text-xl sm:text-2xl font-bold tracking-tight text-[#0284C7]">
            Pantai <span class="text-[#06B6D4]">Wabokeo</span>
          </span>
        </router-link>

        <h1 class="text-xl sm:text-2xl font-extrabold text-slate-800 tracking-tight">
          Selamat Datang Kembali
        </h1>
        <p class="text-xs sm:text-sm text-slate-500 mt-1">
          Silakan login untuk melanjutkan ke dashboard Pantai Wabokeo.
        </p>
      </div>

      <!-- Login Form -->
      <form @submit.prevent="handleLogin" class="space-y-4" novalidate>
        
        <!-- Email / Username Input -->
        <div>
          <label for="identity" class="block text-xs sm:text-sm font-semibold text-slate-700 mb-1">
            Email atau Username
          </label>
          <div class="relative">
            <input
              id="identity"
              v-model="form.identity"
              type="text"
              placeholder="Masukkan email atau username"
              :class="[
                'w-full px-3.5 py-2 sm:py-2.5 rounded-xl border text-slate-800 placeholder-slate-400 text-xs sm:text-sm transition-all duration-200 outline-none',
                errors.identity 
                  ? 'border-red-500 focus:ring-2 focus:ring-red-500/20' 
                  : 'border-slate-200 focus:border-[#06B6D4] focus:ring-4 focus:ring-[#06B6D4]/15'
              ]"
              @input="clearError('identity')"
            />
          </div>
          <p v-if="errors.identity" class="text-[11px] sm:text-xs text-red-500 mt-1 flex items-center gap-1">
            <svg class="w-3.5 h-3.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            {{ errors.identity }}
          </p>
        </div>

        <!-- Password Input -->
        <div>
          <label for="password" class="block text-xs sm:text-sm font-semibold text-slate-700 mb-1">
            Kata Sandi
          </label>
          <div class="relative">
            <input
              id="password"
              v-model="form.password"
              :type="showPassword ? 'text' : 'password'"
              placeholder="Masukkan kata sandi"
              :class="[
                'w-full pl-3.5 pr-10 py-2 sm:py-2.5 rounded-xl border text-slate-800 placeholder-slate-400 text-xs sm:text-sm transition-all duration-200 outline-none',
                errors.password 
                  ? 'border-red-500 focus:ring-2 focus:ring-red-500/20' 
                  : 'border-slate-200 focus:border-[#06B6D4] focus:ring-4 focus:ring-[#06B6D4]/15'
              ]"
              @input="clearError('password')"
            />
            <!-- Show / Hide Password Button -->
            <button
              type="button"
              @click="showPassword = !showPassword"
              class="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-[#0284C7] focus:outline-none transition-colors p-1"
              aria-label="Toggle Password Visibility"
            >
              <svg v-if="!showPassword" class="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
              <svg v-else class="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858-5.908a10.02 10.02 0 013.122-.463c4.478 0 8.268 2.943 9.542 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21M3 3l18 18" />
              </svg>
            </button>
          </div>
          <p v-if="errors.password" class="text-[11px] sm:text-xs text-red-500 mt-1 flex items-center gap-1">
            <svg class="w-3.5 h-3.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            {{ errors.password }}
          </p>
        </div>

        <!-- Remember Me & Forgot Password -->
        <div class="flex items-center justify-between text-xs sm:text-sm pt-0.5">
          <label class="flex items-center space-x-2 cursor-pointer select-none">
            <input
              type="checkbox"
              v-model="form.remember"
              class="w-3.5 h-3.5 sm:w-4 sm:h-4 rounded border-slate-300 text-[#0284C7] focus:ring-[#06B6D4] transition"
            />
            <span class="text-slate-600 font-medium">Ingat Saya</span>
          </label>

          <router-link
            to="/forgot-password"
            class="font-semibold text-[#0284C7] hover:text-[#06B6D4] transition-colors"
          >
            Lupa Password?
          </router-link>
        </div>

        <!-- Submit Button -->
        <button
          type="submit"
          :disabled="isLoading"
          class="w-full py-2.5 sm:py-3 px-4 bg-gradient-to-r from-[#0284C7] to-[#06B6D4] hover:from-[#0369a1] hover:to-[#0891b2] text-white font-semibold rounded-xl shadow-md shadow-[#0284C7]/20 hover:shadow-lg hover:shadow-[#0284C7]/30 focus:outline-none focus:ring-4 focus:ring-[#06B6D4]/30 active:scale-[0.99] transition-all duration-200 flex items-center justify-center space-x-2 disabled:opacity-70 disabled:cursor-not-allowed mt-2"
        >
          <span v-if="!isLoading" class="text-sm sm:text-base">Masuk</span>
          <span v-else class="flex items-center space-x-2 text-sm">
            <svg class="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <span>Memproses...</span>
          </span>
        </button>
      </form>

      <!-- Decorative Footer Note -->
      <div class="mt-6 pt-4 border-t border-slate-100 text-center">
        <p class="text-[11px] sm:text-xs text-slate-400">
          &copy; {{ currentYear }} Pantai Wabokeo. Hak Cipta Dilindungi.
        </p>
      </div>

    </div>
  </div>
</template>

<script setup>
import { reactive, ref, computed } from 'vue'

const showPassword = ref(false)
const isLoading = ref(false)

const form = reactive({
  identity: '',
  password: '',
  remember: false
})

const errors = reactive({
  identity: '',
  password: ''
})

const currentYear = computed(() => new Date().getFullYear())

const clearError = (field) => {
  errors[field] = ''
}

const validateForm = () => {
  let isValid = true

  if (!form.identity.trim()) {
    errors.identity = 'Email atau username wajib diisi.'
    isValid = false
  } else if (form.identity.includes('@')) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailPattern.test(form.identity.trim())) {
      errors.identity = 'Format email tidak valid.'
      isValid = false
    }
  }

  if (!form.password) {
    errors.password = 'Kata sandi wajib diisi.'
    isValid = false
  } else if (form.password.length < 6) {
    errors.password = 'Kata sandi minimal 6 karakter.'
    isValid = false
  }

  return isValid
}

const handleLogin = async () => {
  if (!validateForm()) return

  isLoading.value = true

  try {
    await new Promise((resolve) => setTimeout(resolve, 1500))
    console.log('Form data:', form)
  } catch (error) {
    console.error('Login gagal:', error)
  } finally {
    isLoading.value = false
  }
}
</script>

<style scoped>
@keyframes fadeSlideUp {
  0% {
    opacity: 0;
    transform: translateY(15px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-slide-up {
  animation: fadeSlideUp 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}
</style>