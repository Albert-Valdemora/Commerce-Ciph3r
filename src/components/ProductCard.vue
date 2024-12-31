<script lang="ts" setup>
interface Image {
  url: string;
}

interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  image: Image | string; // Se puede manejar como string o como un objeto Image
}

defineProps<{ product: Product }>();
</script>

<template>
  <div
    class="w-[300px] bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:scale-105 hover:shadow-lg"
  >
    <img
      :src="
        product.image && typeof product.image === 'object'
          ? product.image.url
          : 'https://api.takeit.ciph3r.co/img/placepic.jpg'
      "
      :alt="product.name"
      class="w-full h-48 object-cover"
    />
    <div class="p-4">
      <h3 class="text-lg font-semibold mb-2 text-black">{{ product.name }}</h3>
      <p class="text-gray-600 mb-2">{{ product.category }}</p>
      <p class="text-blue-600 font-bold relative">
        ${{ product.price }}
        <button class="absolute right-0">
          <img class="w-6 h-auto" src="../assets/Cart.svg" alt="" />
        </button>
      </p>
    </div>
  </div>
</template>
