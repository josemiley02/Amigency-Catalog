<template>
  <div class="product-list">
    <div v-if="loading" class="loading-container">
      <div class="loading"></div>
      <p>Cargando productos...</p>
    </div>

    <div v-else-if="error" class="error">
      ❌ Error: {{ error }}
      <button class="btn btn-secondary" @click="loadProducts" style="margin-top: var(--spacing-md); width: auto;">
        Reintentar
      </button>
    </div>

    <div v-else-if="filteredProducts.length === 0" class="empty-state">
      <div class="empty-icon">💎</div>
      <h3>{{ searchQuery ? 'Sin resultados' : 'Sin productos' }}</h3>
      <p v-if="searchQuery">
        No encontramos aretes que coincidan con "<strong>{{ searchQuery }}</strong>"<br>
        Intenta con otro término de búsqueda.
      </p>
      <p v-else>
        Aún no hay aretes disponibles. ¡Sé el primero en agregar uno!
      </p>
    </div>

    <div v-else>
      <div class="results-header">
        <h2>{{ searchQuery ? `Resultados para "${searchQuery}"` : 'Nuestros Aretes' }}</h2>
        <p class="results-count">{{ filteredProducts.length }} producto{{ filteredProducts.length !== 1 ? 's' : '' }} encontrado{{ filteredProducts.length !== 1 ? 's' : '' }}</p>
      </div>

      <div class="grid grid-3">
        <div v-for="product in filteredProducts" :key="product.id" class="product-card card">
          <div class="product-image" v-if="product.image">
            <img :src="getImageUrl(product.image)" :alt="product.name" />
            <div class="image-overlay">
              <span class="view-label">Ver detalles</span>
            </div>
          </div>
          <div v-else class="product-image-placeholder">
            💎
          </div>
          
          <div class="product-info">
            <h3>{{ product.name }}</h3>
            
            <p class="product-description" v-if="product.description">
              {{ truncateText(product.description, 80) }}
            </p>

            <div class="product-meta">
              <span class="badge badge-secondary">{{ product.category_name || 'Sin categoría' }}</span>
            </div>

            <div class="product-footer">
              <div class="product-price">
                <span class="price">${{ formatPrice(product.price) }}</span>
              </div>
              <div class="product-date">
                <small>{{ formatDate(product.created_at) }}</small>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed, inject } from 'vue'
import { getProducts } from '../api/products'
import type { Product } from '../types/products'


const products = ref<Product[]>([])
const loading = ref(true)
const error = ref<string | null>(null)
const searchQuery = inject<any>('searchQuery', ref(''))

const filteredProducts = computed(() => {
  if (!searchQuery.value) {
    return products.value
  }
  
  const query = searchQuery.value.toLowerCase()
  return products.value.filter(product =>
    product.name.toLowerCase().includes(query) ||
    (product.description?.toLowerCase().includes(query) ?? false) ||
    (product.category_name?.toLowerCase().includes(query) ?? false)
  )
})

const loadProducts = async () => {
  try {
    loading.value = true
    error.value = null
    const data = await getProducts()
    products.value = data
  } catch (err: any) {
    error.value = err.message || 'No se pudieron cargar los productos'
    console.error('Error cargando productos:', err)
  } finally {
    loading.value = false
  }
}

const getImageUrl = (imagePath: string | File | undefined) => {
  if (!imagePath) return ''
  if (typeof imagePath !== 'string') return ''
  if (imagePath.startsWith('http')) return imagePath
  return `http://127.0.0.1:8000${imagePath}`
}

const truncateText = (text: string, length: number) => {
  return text.length > length ? text.substring(0, length) + '...' : text
}

const formatPrice = (price: number | string) => {
  return parseFloat(price.toString()).toFixed(2)
}

const formatDate = (date: string | undefined) => {
  if (!date) return 'Fecha desconocida'
  return new Date(date).toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}

onMounted(() => {
  loadProducts()
})
</script>

<style scoped>
.product-list {
  display: flex;
  flex-wrap: wrap;
  gap: 15;
  justify-content: center;
  padding: 20px;
  animation: fadeIn 0.5s ease-out;
}

.image-wraper{
  width: 200px;
  height:150px;
  overflow: hidden;
  border: 1px solid #ddd;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.loading-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: var(--spacing-2xl);
  gap: var(--spacing-lg);
  min-height: 300px;
}

.loading-container p {
  color: var(--secondary-blue-dark);
  font-size: var(--font-size-lg);
  font-weight: 500;
}

.empty-state {
  text-align: center;
  padding: var(--spacing-2xl) var(--spacing-lg);
  background: linear-gradient(135deg, rgba(245, 163, 199, 0.05), rgba(180, 212, 255, 0.05));
  border-radius: var(--radius-lg);
  border: 2px dashed rgba(245, 163, 199, 0.3);
  min-height: 300px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.empty-icon {
  font-size: 4rem;
  margin-bottom: var(--spacing-lg);
  animation: float 3s ease-in-out infinite;
}

.empty-state h3 {
  color: var(--gray-dark);
  margin-bottom: var(--spacing-md);
}

.empty-state p {
  color: var(--gray-dark);
  opacity: 0.8;
  max-width: 400px;
}

.results-header {
  margin-bottom: var(--spacing-xl);
}

.results-header h2 {
  margin-bottom: var(--spacing-sm);
}

.results-count {
  color: var(--gray-medium);
  font-size: var(--font-size-sm);
  margin: 0;
}

.product-card {
  overflow: hidden;
  display: flex;
  flex-direction: column;
  height: 100%;
  transition: all 0.3s ease;
  background: var(--white);
}

.product-card:hover {
  transform: translateY(-6px);
  box-shadow: var(--shadow-lg);
}

.product-image {
  position: relative;
  width: 100%;
  height: 220px;
  overflow: hidden;
  background: linear-gradient(135deg, var(--pink-light), var(--blue-light));
  border-radius: var(--radius-lg) var(--radius-lg) 0 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.product-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.product-card:hover .product-image img {
  transform: scale(1.08);
}

.image-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(245, 163, 199, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.product-card:hover .image-overlay {
  opacity: 1;
}

.view-label {
  color: white;
  font-weight: 600;
  font-size: var(--font-size-base);
}

.product-image-placeholder {
  width: 100%;
  height: 220px;
  background: linear-gradient(135deg, var(--accent-lavender), var(--accent-mint));
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 3rem;
  animation: float 3s ease-in-out infinite;
}

.product-info {
  flex: 1;
  padding: var(--spacing-lg);
  display: flex;
  flex-direction: column;
}

.product-info h3 {
  margin: 0 0 var(--spacing-sm) 0;
  color: var(--gray-dark);
  font-size: var(--font-size-lg);
  line-height: 1.3;
  font-weight: 700;
}

.product-description {
  color: var(--gray-dark);
  font-size: var(--font-size-sm);
  margin: 0 0 var(--spacing-md) 0;
  flex: 1;
  opacity: 0.85;
}

.product-meta {
  margin-bottom: var(--spacing-md);
}

.product-footer {
  border-top: 1px solid var(--gray-medium);
  padding-top: var(--spacing-md);
  margin-top: auto;
}

.product-price {
  margin-bottom: var(--spacing-md);
}

.price {
  font-size: var(--font-size-xl);
  font-weight: 800;
  background: linear-gradient(135deg, var(--primary-rose-dark), var(--secondary-blue-dark));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.product-date {
  display: flex;
  justify-content: flex-end;
}

.product-date small {
  color: var(--gray-medium);
  font-size: var(--font-size-xs);
}

@media (max-width: 768px) {
  .grid-3 {
    grid-template-columns: 1fr;
  }

  .product-image {
    height: 180px;
  }

  .product-card {
    margin-bottom: var(--spacing-lg);
  }
}
</style>
