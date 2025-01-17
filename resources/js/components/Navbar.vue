<template>
    <header class="bg-pink-200 text-white p-4">
        <div class="container mx-auto flex justify-between items-center">
            <!-- Logo -->
            <h1 class="text-3xl font-bold text-red-800">
                <router-link to="/">FemInsight</router-link>
            </h1>

            <!-- Navigation -->
            <nav class="space-x-4 hidden font-bold text-md md:block">
                <router-link to="/" class="text-red-600 hover:underline">Home</router-link>
                <router-link to="/about" class="text-red-600 hover:underline">About</router-link>
            </nav>

            <!-- Mobile Navigation -->
            <button class="md:hidden block text-xl" @click="toggleMobileMenu">☰</button>
        </div>

        <!-- Mobile Navigation Menu -->
         <div v-if="mobileMenuOpen" class="bg-gray-700 md:hidden p-4 space-y-2">
            <router-link to="/" class="block hover:underline">Home</router-link>
            <router-link to="/about" class="block hover:underline">About</router-link>
         </div>
    </header>
</template>

<script>
export default {
    data() {
        return {
            mobileMenuOpen: false,
        };
    },
    methods: {
        toggleMobileMenu() {
            this.mobileMenuOpen = !this.mobileMenuOpen;
        },
    },
};
</script>

<style scoped>
header {
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
</style>