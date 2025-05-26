<template>
  <div
    class="relative min-h-screen bg-cover bg-center text-white flex items-center justify-center"
    style="background-image: url('/images/bg-utama.png');"
  >
    <!-- Overlay gelap untuk kontras teks -->
    <div class="absolute inset-0 bg-black bg-opacity-60 z-10"></div>

    <!-- Konten Tengah -->
    <div class="z-20 text-center px-6">
      <h1 class="text-3xl md:text-5xl font-bold mb-4">Selamat Datang di</h1>
      <h2 class="text-4xl md:text-6xl font-extrabold tracking-wide text-yellow-400 mb-6">PHOTOBOOTH</h2>
      <p class="text-lg md:text-xl italic mb-8 text-amber-200">Abadikan Momen Layaknya Sebuah Pertunjukan</p>
      <router-link to="/camera">
        <button
        class="bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-3 px-6 rounded-full shadow-md transition"
        >
          MULAI
        </button>
      </router-link>
    </div>
  </div>
</template>