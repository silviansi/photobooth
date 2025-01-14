<template>
    <div id="app">
      <header class="bg-gray-800 text-white p-4">
        <h1 class="text-xl font-bold">My Portfolio</h1>
      </header>
      <main class="p-4">
        <HomeView /> 
      </main>
      <footer class="bg-gray-800 text-white p-4 text-center">
        &copy; 2024 My Portfolio
      </footer>
    </div>
</template>
  
<script>
import HomeView from "./components/Home.vue";

export default {
    name: "App",
    components: {
      HomeView,
    },
};
</script>
  
<style>
body {
    margin: 0;
    font-family: Arial, sans-serif;
}
</style>  