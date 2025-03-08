<template>
  <div class="camera-container flex justify-between items-center mx-auto max-w-5xl p-4">
    <!-- Kamera (Kiri) -->
    <div class="camera-preview mt-8 mb-5 flex flex-col items-center">
      <div class="relative w-[500px] h-[400px] border-2 border-black">
        <video ref="video" autoplay playsinline class="w-full h-full object-cover transform -scale-x-100"></video>
        <!-- Overlay Idol -->
        <img v-if="selectedIdols.length > 0" :src="`../overlays/${selectedIdols[currentOverlayIndex]}`" class="absolute top-0 left-0 w-full h-full object-cover opacity-70 pointer-events-none" />
        <!-- Countdown -->
        <div v-if="countdown > 0" class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-5xl font-bold text-red-500 bg-black bg-opacity-50 px-4 py-2 rounded-lg">{{ countdown }}</div>
      </div>

      <!-- Pilih Grup Idol -->
      <select v-model="selectedGroup" class="mt-4 p-2 border rounded">
        <option value="" disabled>Pilih Grup Idol</option>
        <option v-for="group in idolGroups" :key="group.name" :value="group.name">
          {{ group.name }}
        </option>
      </select>

      <!-- Pilih Foto Idol -->
      <div class="flex flex-wrap gap-2 mt-4" v-if="selectedGroup">
        <div
          v-for="idol in availableIdols"
          :key="idol"
          class="w-20 h-20 border-2 flex items-center justify-center cursor-pointer rounded-md"
          :class="{ 'border-blue-500': selectedIdols.includes(idol), 'border-gray-300': !selectedIdols.includes(idol) }"
          @click="toggleIdolSelection(idol)"
        >
          <img :src="`/overlays/${idol}`" :alt="idol" class="w-full h-full object-cover rounded-md" />
        </div>
      </div>

      <!-- Tombol Ambil Foto -->
      <button @click="startPhotoCapture" :disabled="selectedIdols.length !== 4" class="mt-4 px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-400">📸 Mulai Foto</button>
    </div>

    <!-- Hasil Foto dalam Format Strip (Kanan) -->
    <div class="photo-results flex flex-col items-center">
      <canvas ref="canvas" class="hidden"></canvas>
      <div class="relative mt-4 p-2 border-4 rounded-lg" :style="{ backgroundColor: stripColor }">
        <div class="flex flex-col gap-2">
          <img v-for="(photo, index) in photos" :key="index" :src="photo" class="w-36 rounded-md" />
        </div>
      </div>
      <div class="flex gap-2 mt-4">
        <input type="color" v-model="stripColor" class="w-10 h-10 cursor-pointer" />
        <select v-model="selectedFilter" class="p-2 border rounded">
          <option value="">Tanpa Filter</option>
          <option value="grayscale">Grayscale</option>
          <option value="sepia">Sepia</option>
          <option value="invert">Invert</option>
        </select>
      </div>
      <button v-if="photos.length === 4" @click="downloadPhoto" class="mt-4 px-4 py-2 bg-green-500 text-white rounded">⬇️ Unduh Strip</button>
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
      stripColor: "#ffffff",
      selectedFilter: "",
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
        this.photos = [];
        this.currentOverlayIndex = 0;
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
      if (index >= 4) return;
      const video = this.$refs.video;
      const canvas = this.$refs.canvas;
      const ctx = canvas.getContext("2d");
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      ctx.translate(canvas.width, 0);
      ctx.scale(-1, 1);
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      const overlayImg = new Image();
      overlayImg.src = `/overlays/${this.selectedIdols[index]}`;
      overlayImg.onload = () => {
        ctx.drawImage(overlayImg, 0, 0, canvas.width, canvas.height);
        this.photos.push(canvas.toDataURL("image/png"));
        this.currentOverlayIndex = index + 1;
        if (index + 1 < 4) {
          this.countdown = 5;
          this.startCountdown(index + 1);
        }
      };
    }
  }
};
</script>