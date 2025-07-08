<template>
  <div class="min-h-screen bg-gradient-to-b from-amber-900 via-red-900 to-amber-950 text-cream flex flex-col items-center justify-between px-4 py-10 relative overflow-hidden">
    <!-- Vintage Theater Background Pattern -->
    <div class="absolute inset-0 opacity-10">
      <div class="absolute top-0 left-0 w-full h-full bg-repeat" style="background-image: url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%2260%22 height=%2260%22 viewBox=%220 0 60 60%22><path d=%22M30 0L45 15L30 30L15 15Z%22 fill=%22%23D4AF37%22 opacity=%220.3%22/></svg>');"></div>
    </div>

    <!-- Ornate Header -->
    <div class="text-center relative z-10">
      <div class="bg-gradient-to-r from-amber-700 to-amber-800 px-8 py-4 rounded-lg shadow-2xl border-2 border-amber-400 mb-2">
        <h1 class="text-5xl font-bold text-amber-200 font-serif tracking-wide">🎭 DRAMIMI'S</h1>
        <div class="text-2xl text-amber-300 font-serif italic">~ Theatrical Moments ~</div>
      </div>
      <div class="text-amber-400 text-sm uppercase tracking-widest">Est. 1895 • Classic Photo Parlour</div>
    </div>

    <div class="flex flex-col md:flex-row gap-12 w-full max-w-7xl items-start justify-center relative z-10">
      <!-- Vintage Camera Station -->
      <div class="flex flex-col items-center">
        <div class="bg-gradient-to-b from-amber-800 to-amber-900 p-6 rounded-2xl shadow-2xl border-4 border-amber-400">
          <div class="relative w-[500px] h-[400px] rounded-xl overflow-hidden border-4 border-amber-300 shadow-inner bg-black">
            <video ref="video" autoplay playsinline class="w-full h-full object-cover transform -scale-x-100"></video>

            <!-- Ornate Countdown Overlay -->
            <div v-if="countdown > 0" class="absolute inset-0 bg-black bg-opacity-80 flex items-center justify-center">
              <div class="text-center">
                <div class="text-8xl font-bold text-amber-300 mb-4 animate-pulse">{{ countdown }}</div>
                <div class="text-amber-400 text-xl font-serif">Preparing Your Portrait...</div>
              </div>
            </div>

            <!-- Vintage Camera Corners -->
            <div class="absolute top-2 left-2 w-6 h-6 border-l-4 border-t-4 border-amber-400 rounded-tl-lg"></div>
            <div class="absolute top-2 right-2 w-6 h-6 border-r-4 border-t-4 border-amber-400 rounded-tr-lg"></div>
            <div class="absolute bottom-2 left-2 w-6 h-6 border-l-4 border-b-4 border-amber-400 rounded-bl-lg"></div>
            <div class="absolute bottom-2 right-2 w-6 h-6 border-r-4 border-b-4 border-amber-400 rounded-br-lg"></div>
          </div>
        </div>

        <button @click="startPhotoCapture" class="mt-6 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-amber-900 px-8 py-4 font-bold rounded-lg shadow-xl border-2 border-amber-400 transform hover:scale-105 transition-all duration-200">
          <span class="text-xl">📸 Capture the Drama</span>
        </button>
      </div>

      <!-- Vintage Photo Strip Display -->
      <div class="flex flex-col items-center">
        <div class="bg-gradient-to-b from-amber-100 to-cream p-6 rounded-2xl shadow-2xl border-4 border-amber-400 relative">
          <!-- Ornate Frame Decoration -->
          <div class="absolute -top-2 -left-2 w-4 h-4 bg-amber-500 rounded-full"></div>
          <div class="absolute -top-2 -right-2 w-4 h-4 bg-amber-500 rounded-full"></div>
          <div class="absolute -bottom-2 -left-2 w-4 h-4 bg-amber-500 rounded-full"></div>
          <div class="absolute -bottom-2 -right-2 w-4 h-4 bg-amber-500 rounded-full"></div>
          
          <div class="p-4 rounded-lg shadow-inner" :style="{ backgroundColor: stripColor }">
            <div class="flex flex-col gap-3">
              <div v-for="(photo, index) in photos" :key="index" class="relative">
                <img
                  :src="photo"
                  class="w-40 rounded-lg shadow-lg border-2 border-amber-300"
                  :class="selectedFilter"
                />
                <div class="absolute -bottom-1 -right-1 w-6 h-6 bg-amber-500 rounded-full border-2 border-amber-200 flex items-center justify-center text-xs text-amber-900 font-bold">
                  {{ index + 1 }}
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Vintage Controls -->
        <div class="flex gap-4 mt-6 items-center">
          <div class="text-center">
            <label class="block text-amber-300 text-sm font-serif mb-2">Frame Color</label>
            <input type="color" v-model="stripColor" class="w-12 h-12 rounded-lg border-2 border-amber-400 shadow-lg" />
          </div>
          
          <div class="text-center">
            <label class="block text-amber-300 text-sm font-serif mb-2">Film Effect</label>
            <select v-model="selectedFilter" class="p-3 rounded-lg text-amber-900 bg-amber-100 border-2 border-amber-400 shadow-lg font-serif">
              <option value="">Natural</option>
              <option value="filter-grayscale">Noir</option>
              <option value="filter-sepia">Vintage</option>
              <option value="filter-invert">Dramatic</option>
            </select>
          </div>
        </div>

        <button
          v-if="photos.length === 4"
          @click="downloadPhoto"
          class="mt-6 bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white px-8 py-3 rounded-lg shadow-xl border-2 border-emerald-400 transform hover:scale-105 transition-all duration-200 font-serif"
        >
          <span class="text-lg">🎁 Claim Your Memories</span>
        </button>
      </div>
    </div>

    <!-- Vintage Footer -->
    <div class="text-center text-amber-400 text-sm font-serif relative z-10">
      <div class="border-t border-amber-600 pt-4">
        ✨ "Every moment deserves a grand stage" ✨
      </div>
    </div>

    <!-- Canvas -->
    <canvas ref="canvas" class="hidden"></canvas>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const video = ref(null);
const canvas = ref(null);
const countdown = ref(0);
const photos = ref([]);
const stripColor = ref("#f7f3e9");
const selectedFilter = ref("");

// Start kamera saat mounted
onMounted(() => {
  navigator.mediaDevices.getUserMedia({ video: true }).then((stream) => {
    video.value.srcObject = stream;
  }).catch((err) => {
    console.error("Gagal akses kamera:", err);
  });
});

function startPhotoCapture() {
  photos.value = [];
  countdown.value = 5;
  startCountdown(0);
}

function startCountdown(index) {
  if (countdown.value > 0) {
    const interval = setInterval(() => {
      countdown.value--;
      if (countdown.value === 0) {
        clearInterval(interval);
        capturePhoto(index);
      }
    }, 1000);
  }
}

function capturePhoto(index) {
  if (index >= 4) return;

  const ctx = canvas.value.getContext('2d');
  canvas.value.width = video.value.videoWidth;
  canvas.value.height = video.value.videoHeight;

  ctx.translate(canvas.value.width, 0);
  ctx.scale(-1, 1);
  ctx.drawImage(video.value, 0, 0, canvas.value.width, canvas.value.height);
  ctx.setTransform(1, 0, 0, 1, 0, 0);

  photos.value.push(canvas.value.toDataURL("image/png"));

  if (index + 1 < 4) {
    countdown.value = 5;
    startCountdown(index + 1);
  }
}

function downloadPhoto() {
  const canvasStrip = document.createElement("canvas");
  const ctx = canvasStrip.getContext("2d");

  const tempImg = new Image();
  tempImg.src = photos.value[0];
  tempImg.onload = () => {
    const originalWidth = tempImg.width;
    const originalHeight = tempImg.height;

    const scale = 0.4;
    const photoWidth = originalWidth * scale;
    const photoHeight = originalHeight * scale;

    const padding = 20;
    const borderRadius = 20;

    const topPadding = padding;
    const bottomPadding = padding;
    const spacing = padding;
    const textAreaHeight = 60;

    canvasStrip.width = photoWidth + padding * 2;
    canvasStrip.height = topPadding + (photoHeight * 4) + spacing * 3 + bottomPadding + textAreaHeight;

    ctx.fillStyle = stripColor.value;
    ctx.fillRect(0, 0, canvasStrip.width, canvasStrip.height);

    let loaded = 0;

    photos.value.forEach((photo, index) => {
      const img = new Image();
      img.src = photo;
      img.onload = () => {
        const x = padding;
        const y = topPadding + index * (photoHeight + spacing);

        ctx.save();
        ctx.beginPath();
        ctx.roundRect(x, y, photoWidth, photoHeight, borderRadius);
        ctx.fillStyle = "#fff";
        ctx.fill();
        ctx.clip();
        ctx.drawImage(img, x, y, photoWidth, photoHeight);
        ctx.restore();

        loaded++;
        if (loaded === 4) {
          // Tambahkan teks Snap Sandiwara
          ctx.fillStyle = "#92400e";
          ctx.font = "bold 20px 'Bebas Neue', Arial";
          ctx.textAlign = "center";
          ctx.fillText("Dramimi's Theater", canvasStrip.width / 2, canvasStrip.height - 40);

          const tanggal = new Date().toLocaleDateString("id-ID", {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          });
          ctx.font = "16px Arial";
          ctx.fillText(tanggal, canvasStrip.width / 2, canvasStrip.height - 15);

          const link = document.createElement("a");
          link.href = canvasStrip.toDataURL("image/png");
          link.download = "vintage-theater-strip.png";
          link.click();
        }
      };
    });
  };
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap');

.text-cream {
  color: #f7f3e9;
}

.filter-grayscale {
  filter: grayscale(100%);
}
.filter-sepia {
  filter: sepia(100%);
}
.filter-invert {
  filter: invert(100%);
}
</style>