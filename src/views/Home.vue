<template>
  <div 
    class="relative min-h-screen bg-cover bg-center bg-no-repeat flex items-center justify-center text-amber-50"
    :style="{ backgroundImage: 'url(/images/bg-utama.png)' }"
  >
    <!-- Dark overlay for contrast -->
    <div class="absolute inset-0 bg-black bg-opacity-50 z-10"></div>
  
    <!-- Main content -->
    <div class="relative z-30 text-center px-6 max-w-4xl animate-fade-in-up">
      <!-- Welcome text -->
      <h1 class="text-2xl md:text-3xl lg:text-4xl font-medium text-amber-100 mb-4 tracking-wide drop-shadow-lg">
        Selamat Datang di
      </h1>
      
      <!-- Brand name -->
      <h2 class="text-6xl md:text-7xl lg:text-8xl font-black text-yellow-400 mb-6 tracking-wider drop-shadow-2xl transform hover:scale-105 transition-transform duration-300">
        DRAMIMI
      </h2>
      
      <!-- Tagline -->
      <p class="text-lg md:text-xl lg:text-2xl italic text-amber-200 mb-12 font-light tracking-wide drop-shadow-md">
        Abadikan momen layaknya sebuah pertunjukan
      </p>
      
      <!-- CTA Button -->
      <router-link 
        to="/camera" 
        class="inline-block bg-gradient-to-r from-yellow-500 to-yellow-400 hover:from-yellow-600 hover:to-yellow-500 text-amber-900 font-bold py-4 px-8 rounded-full shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 text-lg tracking-wide uppercase"
      >
        Mulai Pertunjukan
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TheaterLanding'
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@300;400;500;700;900&display=swap');

* {
  font-family: 'Playfair Display', serif;
}

/* Custom animation for fade in up */
@keyframes fade-in-up {
  from {
    opacity: 0;
    transform: translateY(2rem);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in-up {
  animation: fade-in-up 1.5s ease-out;
}

/* Custom radial gradient for spotlight */
.bg-gradient-radial {
  background: radial-gradient(circle, var(--tw-gradient-stops));
}

/* Light beam effect */
.light-beam {
  filter: blur(8px);
  clip-path: polygon(20% 0%, 80% 0%, 100% 100%, 0% 100%);
}
</style>