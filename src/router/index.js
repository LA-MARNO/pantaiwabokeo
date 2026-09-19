import { createRouter, createWebHistory } from 'vue-router'

// Import Halaman Utama
import HomeView from '../views/Home.vue'
import AdminLayout from '../views/admin/AdminLayout.vue'

// Deklarasi DummyComponent agar tidak error saat dipanggil di route admin
const DummyComponent = {
  template: '<div class="p-6 bg-white rounded-2xl shadow-sm border border-slate-100"><h3 class="font-bold text-slate-700">Halaman Sedang Dalam Pengembangan</h3></div>'
}

const router = createRouter({
  history: createWebHistory(),
  routes: [
    // --- ROUTE PUBLIK ---
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/tentang',
      name: 'about',
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/wisata',
      name: 'wisata',
      component: () => import('../views/WisataView.vue')
    },
    {
      path: '/galeri',
      name: 'galeri',
      component: () => import('../views/GaleriView.vue')
    },
    {
      path: '/kontak',
      name: 'kontak',
      component: () => import('../views/KontakView.vue')
    },
    {
      path: '/login',
      name: 'login',
      // Menggunakan Lazy Loading (import dinamis) agar tidak membuat halaman lain ikut blank jika path salah
      // PASTIKAN lokasi folder & nama file di bawah ini sesuai dengan file asli di komputer Anda
      component: () => import('../views/auntetication/Loging.vue'),
      meta: {
        hideNavbarFooter: true
      }
    },
    // --- ROUTE ADMIN ---
    {
      path: '/admin',
      component: AdminLayout,
      meta: { hideNavbarFooter: true },
      children: [
        { 
          path: '', 
          name: 'Dashboard', 
          component: () => import('../views/admin/DashboardView.vue')
        },
        { 
          path: 'beranda', 
          name: 'admin-beranda', 
          component: () => import('../views/admin/BerandaView.vue')
        },
        { 
          path: 'tentang', 
          name: 'admin-tentang', 
          component: () => import('../views/admin/TentangPantai.vue')
        },
        { 
          path: 'wisata', 
          name: 'admin-wisata', 
          component: () => import('../views/admin/WisataAdmin.vue')
        },
        { 
          path: 'galeri', 
          name: 'admin-galeri', 
          component: () => import('../views/admin/GaleriAdmin.vue')
        },
        { 
          path: 'kontak', 
          name: 'admin-kontak', 
          component: () => import('../views/admin/KontakAdmin.vue')
        },
        { 
          path: 'media', 
          name: 'admin-media', 
          component: DummyComponent 
        },
        { 
          path: 'pengaturan', 
          name: 'admin-pengaturan', 
          component: DummyComponent 
        }
      ]
    }
  ],
  scrollBehavior() {
    return { top: 0, behavior: 'smooth' }
  }
})

export default router