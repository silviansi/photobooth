<template>
    <div class="h-screen flex flex-col justify-center items-center bg-gradient-to-br from-blue-300 to-pink-300 text-white">
      <!-- Header -->
      <div class="text-center">
        <h1 class="text-4xl md:text-5xl font-extrabold mb-3 drop-shadow-lg">Welcome to FantasyFrame! 🎉</h1>
        <p class="text-lg md:text-xl text-white/90">Capture your best moments with your bias & stylish frames!</p>
      </div>
  
      <!-- Ilustrasi -->
      <div class="mt-8">
        <img :src="`${publicPath}images/photo.webp`" alt="PhotoBooth Illustration" class="w-64 md:w-80 drop-shadow-lg rounded-lg">
      </div>
  
      <!-- Tombol Mulai -->
      <router-link to="/camera"
        class="mt-6 px-8 py-4 bg-yellow-400 text-purple-800 font-bold text-xl rounded-full shadow-lg hover:bg-yellow-500 transition-transform transform hover:scale-105">
        Start PhotoBooth 🚀
      </router-link>
    </div>
</template>
  
<script>
  export default {
    computed: {
      publicPath() {
        return import.meta.env.BASE_URL || "/";
      }
    }
  };
</script>  