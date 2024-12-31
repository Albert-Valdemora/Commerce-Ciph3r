<!-- /**
 * Muestra la tarjeta de un producto con información detallada.
 * Incluye el nombre, la categoría y el precio del producto.
 * Si la imagen del producto no está disponible, se muestra una imagen por defecto.
 * Al hacer hover sobre la tarjeta, se aplica una transición de escala y sombra para un efecto visual.
 * También incluye un botón para agregar el producto al carrito, representado por un ícono de carrito de compras.
 */ -->

<script lang="ts" setup>
interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  image: string;
}

defineProps<{ product: Product }>();
</script>

<template>
  <div
    class="w-[300px] bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:scale-105 hover:shadow-lg"
  >
    <img
      :src="
        product.image == udenfined
          ? 'https://api.takeit.ciph3r.co/img/placepic.jpg'
          : `${product.image.url}`
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
