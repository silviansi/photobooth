<template>
    <div class="edit-container">
      <h2>🖌️ Edit Foto</h2>
      
      <div class="photo-strip">
        <img v-for="(photo, index) in photoList" :key="index" :src="photo" 
             class="photo-preview" :style="{ filter: selectedFilter, borderColor: selectedBorder }" />
      </div>
  
      <div class="controls">
        <label>Filter:</label>
        <select v-model="selectedFilter">
          <option value="none">None</option>
          <option value="grayscale(100%)">Grayscale</option>
          <option value="sepia(100%)">Sepia</option>
          <option value="contrast(150%)">High Contrast</option>
          <option value="brightness(120%)">Brighter</option>
        </select>
  
        <label>Border:</label>
        <select v-model="selectedBorder">
          <option value="black">Black</option>
          <option value="white">White</option>
          <option value="red">Red</option>
          <option value="blue">Blue</option>
        </select>
      </div>
  
      <div class="buttons">
        <button @click="downloadPhotoStrip">⬇️ Unduh Strip Foto</button>
        <button @click="goBack">🔄 Ambil Ulang</button>
      </div>
    </div>
</template>
  
<script>
  import { useRouter, useRoute } from 'vue-router';
  
  export default {
    data() {
      return {
        photoList: [],
        selectedFilter: "none",
        selectedBorder: "black",
      };
    },
    setup() {
      const router = useRouter();
      const route = useRoute();
      return { router, route };
    },
    mounted() {
      if (this.route.query.photos) {
        this.photoList = JSON.parse(this.route.query.photos);
      }
    },
    methods: {
      goBack() {
        this.router.push("/");
      },
      downloadPhotoStrip() {
        const stripCanvas = document.createElement("canvas");
        const ctx = stripCanvas.getContext("2d");
  
        const photoWidth = 300;
        const photoHeight = 400;
        stripCanvas.width = photoWidth;
        stripCanvas.height = photoHeight * 4;
  
        this.photoList.forEach((photo, index) => {
          const img = new Image();
          img.src = photo;
          img.onload = () => {
            ctx.drawImage(img, 0, index * photoHeight, photoWidth, photoHeight);
  
            if (index === this.photoList.length - 1) {
              const link = document.createElement("a");
              link.download = "photo_strip.png";
              link.href = stripCanvas.toDataURL("image/png");
              link.click();
            }
          };
        });
      }
    }
  };
</script> 