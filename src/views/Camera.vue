<template>
  <div class="camera-container">
    <!-- Kamera (Kiri) -->
    <div class="camera-preview mt-8">
      <div class="video-wrapper">
        <video ref="video" autoplay playsinline></video>
        <!-- Overlay Idol -->
        <img v-if="selectedIdols.length > 0" :src="`../overlays/${selectedIdols[currentOverlayIndex]}`" class="overlay" />
        <!-- Countdown -->
        <div v-if="countdown > 0" class="countdown">{{ countdown }}</div>
      </div>

      <!-- Pilih Grup Idol -->
      <select v-model="selectedGroup">
        <option value="" disabled>Pilih Grup Idol</option>
        <option v-for="group in idolGroups" :key="group.name" :value="group.name">
          {{ group.name }}
        </option>
      </select>

      <!-- Pilih Foto Idol -->
      <div class="idol-selection" v-if="selectedGroup">
        <div
          v-for="idol in availableIdols"
          :key="idol"
          class="idol-box"
          :class="{ selected: selectedIdols.includes(idol) }"
          @click="toggleIdolSelection(idol)"
        >
          <img :src="`/overlays/${idol}`" :alt="idol" />
        </div>
      </div>

      <!-- Tombol Ambil Foto -->
      <button @click="startPhotoCapture" :disabled="selectedIdols.length !== 4">📸 Mulai Foto</button>
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
export default {
  data() {
    return {
      selectedGroup: "",
      selectedIdols: [],
      countdown: 0,
      idolGroups: [
        { name: "IVE", idols: ["wonyoung1.png", "wonyoung2.png", "wonyoung3.png", "yujin.png", "leeseo.png"] },
        { name: "Enhypen", idols: ["enhypen1.png", "enhypen2.png", "enhypen3.png"] },
        { name: "Aespa", idols: ["giselle1.png", "winter1.png", "winter2.png", "karina1.png", "karina2.png", "ningning1.png"] },
      ],
      photos: [],
      currentOverlayIndex: 0,
    };
  },
  computed: {
    availableIdols() {
      const group = this.idolGroups.find(g => g.name === this.selectedGroup);
      return group ? group.idols : [];
    }
  },
  mounted() {
    this.startCamera();
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
    toggleIdolSelection(idol) {
      if (this.selectedIdols.includes(idol)) {
        this.selectedIdols = this.selectedIdols.filter(i => i !== idol);
      } else if (this.selectedIdols.length < 4) {
        this.selectedIdols.push(idol);
      }
    },
    startPhotoCapture() {
      if (this.selectedIdols.length === 4) {
        this.photos = []; // Kosongkan hasil foto sebelumnya
        this.currentOverlayIndex = 0; // Reset indeks overlay
        this.countdown = 5;
        this.startCountdown(0);
      }
    },
    startCountdown(index) {
      if (this.countdown > 0) {
        const interval = setInterval(() => {
          this.countdown--;
          if (this.countdown === 0) {
            clearInterval(interval);
            this.capturePhoto(index);
          }
        }, 1000);
      }
    },
    capturePhoto(index) {
      if (index >= 4) return; // Stop jika sudah 4 foto

      const video = this.$refs.video;
      const canvas = this.$refs.canvas;
      const ctx = canvas.getContext("2d");

      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;

      // Flip gambar agar sesuai dengan kamera depan
      ctx.translate(canvas.width, 0);
      ctx.scale(-1, 1);
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      ctx.setTransform(1, 0, 0, 1, 0, 0);

      // Ambil overlay berdasarkan indeks
      const overlayImg = new Image();
      overlayImg.src = `/overlays/${this.selectedIdols[index]}`;
      
      overlayImg.onload = () => {
        ctx.drawImage(overlayImg, 0, 0, canvas.width, canvas.height);
        this.photos.push(canvas.toDataURL("image/png")); // Simpan hasil foto

        // Pindah ke overlay berikutnya
        this.currentOverlayIndex = index + 1;

        // Ambil foto berikutnya setelah 5 detik (jika masih ada overlay)
        if (index + 1 < 4) {
          this.countdown = 5;
          this.startCountdown(index + 1);
        }
      };
    }
  }
};
</script>

<style scoped>
.camera-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 900px;
  margin: auto;
}

.video-wrapper {
  position: relative;
  width: 500px;
  height: 400px;
  border: 2px solid black;
}

video {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transform: scaleX(-1);
}

.overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0.7;
  pointer-events: none;
}

.idol-selection {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  margin-top: 10px;
}

.idol-box {
  width: 80px;
  height: 80px;
  border: 2px solid gray;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}

.idol-box img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.idol-box.selected {
  border: 2px solid blue;
}

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

.countdown {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 50px;
  font-weight: bold;
  color: red;
  background: rgba(0, 0, 0, 0.5);
  padding: 10px;
  border-radius: 10px;
}
</style>