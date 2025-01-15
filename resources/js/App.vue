<template>
  <div id="app">
    <header class="bg-gray-800 text-white p-4">
      <h1 class="text-xl font-bold">My Portfolio</h1>
      <nav>
        <router-link to="/" style="color: black; margin-right: 10px;">Home</router-link>
        <router-link to="/about" style="color: black">About</router-link>
      </nav>
    </header>
    <main class="p-4">
      <router-view></router-view>
    </main>
    <footer class="bg-gray-800 text-white p-4 text-center">
      &copy; 2024 My Portfolio
    </footer>
  </div>
</template>

<script>
export default {
  name: "App",
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