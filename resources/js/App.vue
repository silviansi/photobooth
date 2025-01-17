<template>
  <div id="app">
    <Navbar />
    <main class="p-4">
      <router-view></router-view>
    </main>
    <footer class="bg-gray-800 text-white p-4 text-center">
      &copy; 2024 My Portfolio
    </footer>
  </div>
</template>

<script>
import Navbar from './components/Navbar.vue';

export default {
  name: "App",
  components: {
    Navbar,
  },
};
</script>

<style>
nav a {
  text-decoration: none;
  color: white;
}

nav a:hover {
  text-decoration: underline;
}
</style>