<template>
    <div class="filters-container">
      <button @click="$emit('set-filter', 'grayscale(100%)')">Grayscale</button>
      <button @click="$emit('set-filter', 'sepia(100%)')">Sepia</button>
      <button @click="$emit('set-filter', 'blur(5px)')">Blur</button>
      <button @click="$emit('set-filter', 'none')">Hapus Filter</button>
    </div>
</template>
  
<script>
export default {
    emits: ["set-filter"]
};
</script>
  
<style scoped>
.filters-container {
    display: flex;
    gap: 10px;
    margin-top: 10px;
}
button {
    padding: 5px 10px;
    cursor: pointer;
}
</style>  