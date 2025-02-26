<template>
  <div class="camera-container">
    <!-- Kamera (Kiri) -->
    <div class="camera-preview">
      <div class="video-wrapper">
        <video ref="video" autoplay playsinline></video>
        <!-- Overlay Idol -->
        <img v-if="selectedOverlay" :src="`/overlays/${selectedOverlay}`" class="overlay" />
      </div>

      <!-- Pilih Gambar Idol -->
      <select v-model="selectedOverlay">
        <option v-for="(overlay, index) in overlays" :key="index" :value="overlay">
          {{ overlay }}
        </option>
      </select>

      <button @click="takePhoto">📸 Ambil Foto</button>
    </div>

    <!-- Hasil Foto (Kanan) -->
    <div class="photo-results">
      <canvas ref="canvas" style="display: none;"></canvas>
      <div class="photo-list">
        <img v-for="(photo, index) in photos" :key="index" :src="photo" class="photo-preview" />
      </div>
      <button v-if="photos.length === 4" @click="downloadPhoto">⬇️ Unduh Semua</button>
    </div>
  </div>
</template>

<script>
import { useRouter } from 'vue-router';

export default {
  data() {
    return {
      selectedOverlay: "idol1.png",
      overlays: ["idol1.png", "idol2.png", "idol3.png"],
      photos: [],
    };
  },
  setup() {
    const router = useRouter();
    return { router };
  },
  mounted() {
    this.startCamera();
  },
  watch: {
    photos(newPhotos) {
      if (newPhotos.length === 4) {
        setTimeout(() => {
          this.router.push({ path: "/edit", query: { photos: JSON.stringify(this.photos) } });
        }, 500); // Delay agar foto terakhir sempat ditampilkan
      }
    }
  },
  methods: {
    async startCamera() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        this.$refs.video.srcObject = stream;
      } catch (error) {
        console.error("Gagal mengakses kamera:", error);
      }
    },
    takePhoto() {
      if (this.photos.length >= 4) return;

      const video = this.$refs.video;
      const canvas = this.$refs.canvas;
      const ctx = canvas.getContext("2d");

      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;

      ctx.translate(canvas.width, 0);
      ctx.scale(-1, 1);
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      ctx.setTransform(1, 0, 0, 1, 0, 0);

      const img = new Image();
      img.src = `/overlays/${this.selectedOverlay}`;
      img.onload = () => {
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        this.photos.push(canvas.toDataURL("image/png"));
      };
    }
  },
};
</script>

<style scoped>
.camera-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 800px;
  margin: auto;
}

/* Video Wrapper */
.video-wrapper {
  position: relative;
  width: 300px;
  height: 400px;
  border: 2px solid black;
}

/* Video */
video {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transform: scaleX(-1); 
}

/* Overlay Idol */
.overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0.7; /* Supaya semi-transparan */
  pointer-events: none; /* Biar tidak mengganggu interaksi dengan video */
}

/* Bagian hasil foto */
.photo-results {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.photo-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.photo-preview {
  width: 150px;
  border: 2px solid black;
}
</style>