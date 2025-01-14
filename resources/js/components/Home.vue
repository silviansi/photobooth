<template>
    <div>
      <h1 class="text-2xl font-bold">Halo dari Vue dan Laravel!</h1>
      <p>{{ message }}</p>
      <button @click="changeMessage" class="bg-blue-500 text-white px-4 py-2 rounded">Klik Aku</button>
    </div>
</template>
  
<script>
export default {
    data() {
      return {
        message: "Ini adalah pesan default.",
      };
    },
    methods: {
      changeMessage() {
        this.message = "Pesan berubah! Laravel dan Vue terhubung.";
      },
    },
};
</script>
  
<style>
  button:hover {
    background-color: #2563eb;
  }
</style>  