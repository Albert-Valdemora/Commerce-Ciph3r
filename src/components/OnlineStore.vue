<!-- /**
 * Componente principal que maneja la visualización de productos y categorías en una tienda.
 * Realiza las siguientes funciones:
 * 1. Obtiene las categorías y productos desde la API al montar el componente utilizando las funciones fetchCategories y fetchProductos.
 * 2. Permite filtrar los productos por categoría seleccionada.
 * 3. Muestra los productos filtrados o todos los productos si no se ha seleccionado una categoría.
 * 4. Muestra botones para seleccionar o deseleccionar categorías, aplicando estilos dinámicos.
 * 5. Muestra un mensaje de carga si las categorías o productos aún no están disponibles.
 * 6. Si no hay productos en la categoría seleccionada, muestra un mensaje indicando que no hay productos en esa categoría.
 *
 * Dependencias:
 * - useUserStore: para acceder al token del usuario y autorizar las peticiones a la API.
 * - ProductCard: componente que representa cada producto individualmente.
 */ -->

<script lang="ts" setup>
import { ref, computed, onMounted } from 'vue';
import ProductCard from './ProductCard.vue';
import { useUserStore } from '../stores/userStore';

interface Category {
  id: number;
  name: string;
  slug: string;
  image: string;
}

interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  image: string;
}

const categories = ref<Category[]>([]);
const productos = ref<Product[]>([]);
const selectedCategory = ref<string | null>(null);
const userStore = useUserStore();
const token = computed(() => userStore.user?.token);

//URL de las categorias
const URLCATEGORIA = 'https://api.takeit.ciph3r.co/api/v1/categories';

//URL de los productos
const URLPRODUCTO = 'https://api.takeit.ciph3r.co/api/v1/shop';

// Llamada a la api para las Categorias
const fetchCategories = async () => {
  try {
    const response = await fetch(URLCATEGORIA, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token.value}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) throw new Error('Error al cargar las categorías');

    const { data }: { data: Category[] } = await response.json();
    categories.value = data;
  } catch (error) {
    console.error('Error fetching categories:', error);
  }
};

// Llamada a la api para los productos
const fetchProductos = async () => {
  try {
    const response = await fetch(URLPRODUCTO, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token.value}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) throw new Error('Error al cargar los productos');

    const { data } = await response.json();
    productos.value = data;
  } catch (error) {
    console.error('Error fetching products:', error);
  }
};

// Filtrar los productos según la categoría seleccionada
const filteredProducts = computed(() => {
  return selectedCategory.value
    ? productos.value.filter((product) => product.category === selectedCategory.value)
    : productos.value;
});

// Cargar las categorías y productos al montar el componente
onMounted(() => {
  fetchCategories();
  fetchProductos();
});

const selectCategory = (category: string | null) => {
  selectedCategory.value = category;
};
</script>

<template>
  <div class="w-full mx-auto px-4 py-8">
    <h1 class="text-3xl font-extrabold mb-8 text-center text-white">
      Commerce <span class="font-extrabold text-orange-600">CIPH3R</span>
    </h1>

    <div class="mb-8">
      <h2 class="text-xl font-semibold mb-4">Categories</h2>
      <div class="flex flex-wrap gap-2 text-black font-semibold">
        <button
          class="px-4 py-2 rounded"
          :class="selectedCategory === null ? 'bg-blue-500 text-white' : 'bg-gray-200'"
          @click="selectCategory(null)"
        >
          All
        </button>
        <button
          v-for="category in categories"
          :key="category.id"
          class="px-4 py-2 rounded"
          :class="selectedCategory === category.name ? 'bg-blue-500 text-white' : 'bg-gray-200'"
          @click="selectCategory(category.name)"
        >
          {{ category.name }}
        </button>
      </div>
    </div>

    <div v-if="categories.length === 0" class="text-center">
      <p class="text-gray-500">Loading categories...</p>
    </div>

    <div v-if="productos.length === 0" class="text-center">
      <p class="text-gray-500">Loading products...</p>
    </div>

    <div v-if="filteredProducts.length === 0 && selectedCategory !== null" class="text-center">
      <p class="text-gray-500">No hay productos en esta categoría.</p>
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-14">
      <ProductCard v-for="product in filteredProducts" :key="product.id" :product="product" />
    </div>
  </div>
</template>
