<template>
  <div class="product-form-container">
    <div class="form-header">
      <h2>✨ Crear Nuevo Arete</h2>
      <p class="form-subtitle">Agrega un hermoso arete a tu colección</p>
    </div>

    <div v-if="successMessage" class="success">
      ✅ {{ successMessage }}
    </div>

    <div v-if="errorMessage" class="error">
      ❌ {{ errorMessage }}
    </div>

    <form @submit.prevent="submitForm" class="form">
      <div class="form-group">
        <label for="name">Nombre del Arete *</label>
        <input
          id="name"
          v-model="form.name"
          type="text"
          placeholder="Ej: Aretes de Amapola Rosados"
          required
          @input="clearMessages"
        />
      </div>

      <div class="form-group">
        <label for="description">Descripción</label>
        <textarea
          id="description"
          v-model="form.description"
          placeholder="Describe el arete... Material, estilo, ocasión, etc."
          rows="4"
          @input="clearMessages"
        ></textarea>
      </div>

      <div class="form-row">
        <div class="form-group">
          <label for="price">Precio (USD) *</label>
          <div class="price-input-group">
            <span class="currency">$</span>
            <input
              id="price"
              v-model.number="form.price"
              type="number"
              step="0.01"
              min="0"
              placeholder="0.00"
              required
              @input="clearMessages"
            />
          </div>
        </div>

        <div class="form-group">
          <label for="category">Categoría *</label>
          <select
            id="category"
            v-model.number="form.category"
            required
            @change="clearMessages"
          >
            <option value="" disabled>Seleccionar categoría...</option>
            <option value="1">Aretes</option>
          </select>
        </div>
      </div>

      <div class="form-group">
        <label for="image">Imagen del Arete</label>
        <div class="file-input-wrapper">
          <div class="file-content">
            <span class="upload-icon">📸</span>
            <div class="file-text">
              <span v-if="form.image" class="file-name">
                ✓ {{ form.image.name }}
              </span>
              <span v-else class="file-placeholder">
                Arrastra una imagen aquí o haz clic
              </span>
            </div>
          </div>
          <input
            id="image"
            type="file"
            accept="image/*"
            @change="handleImageChange"
            @input="clearMessages"
          />
        </div>
        <p class="image-hint">Formato: JPG, PNG, WebP (Máximo 5MB recomendado)</p>
      </div>

      <button 
        type="submit" 
        class="btn btn-primary submit-btn"
        :disabled="isSubmitting"
      >
        <span v-if="isSubmitting">⏳ Guardando...</span>
        <span v-else>✨ Agregar Arete</span>
      </button>
    </form>

    <!-- Preview de producto -->
    <div v-if="form.name || form.price" class="preview-section">
      <h3>👀 Vista Previa</h3>
      <div class="preview-card card">
        <div class="preview-image">
          <img v-if="imagePreview" :src="imagePreview" :alt="form.name" />
          <div v-else class="preview-placeholder">💎</div>
        </div>
        <div class="preview-content">
          <h4>{{ form.name || 'Nombre del arete' }}</h4>
          <p class="preview-description">{{ form.description || 'Sin descripción' }}</p>
          <div class="preview-footer">
            <span class="preview-price">${{ formatPrice(form.price) }}</span>
            <span class="preview-category">Aretes</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { createProduct } from '../api/products'
import type { Product } from '../types/products'

const form = ref({
  name: '',
  description: '',
  price: 0,
  category: 1,
  image: null as File | null
})

const imagePreview = ref<string>('')
const isSubmitting = ref(false)
const successMessage = ref('')
const errorMessage = ref('')

const handleImageChange = (event: Event) => {
  const target = event.target as HTMLInputElement
  const file = target.files?.[0]
  
  if (file) {
    form.value.image = file
    const reader = new FileReader()
    reader.onload = (e) => {
      imagePreview.value = e.target?.result as string
    }
    reader.readAsDataURL(file)
  }
}

const formatPrice = (price: number) => {
  return price.toFixed(2)
}

const clearMessages = () => {
  successMessage.value = ''
  errorMessage.value = ''
}

const submitForm = async () => {
  try {
    if (!form.value.name || !form.value.price) {
      errorMessage.value = 'Por favor completa los campos requeridos'
      return
    }

    isSubmitting.value = true
    errorMessage.value = ''
    successMessage.value = ''

    await createProduct({
      name: form.value.name,
      description: form.value.description,
      price: form.value.price,
      category: form.value.category,
      image: form.value.image || undefined
    } as Product)

    successMessage.value = '¡Arete agregado correctamente! ✨'
    
    // Limpiar formulario
    form.value = {
      name: '',
      description: '',
      price: 0,
      category: 1,
      image: null
    }
    imagePreview.value = ''

    // Limpiar mensaje después de 3 segundos
    setTimeout(() => {
      successMessage.value = ''
    }, 3000)

  } catch (error: any) {
    errorMessage.value = error.response?.data?.detail || error.message || 'Error al guardar el arete'
    console.error('Error:', error)
  } finally {
    isSubmitting.value = false
  }
}
</script>

<style scoped>
.product-form-container {
  animation: fadeIn 0.5s ease-out;
}

.form-header {
  text-align: center;
  margin-bottom: var(--spacing-2xl);
}

.form-header h2 {
  margin-bottom: var(--spacing-sm);
}

.form-subtitle {
  color: var(--gray-medium);
  font-size: var(--font-size-base);
  margin: 0;
}

.form {
  background: linear-gradient(135deg, rgba(254, 245, 241, 0.8), rgba(232, 212, 248, 0.8));
  padding: var(--spacing-xl);
  border-radius: var(--radius-xl);
  box-shadow: var(--shadow-md);
  margin-bottom: var(--spacing-2xl);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(245, 163, 199, 0.2);
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--spacing-lg);
}

.price-input-group {
  position: relative;
  display: flex;
  align-items: center;
}

.price-input-group .currency {
  position: absolute;
  left: var(--spacing-md);
  color: var(--primary-rose-dark);
  font-weight: 700;
  font-size: var(--font-size-lg);
}

.price-input-group input {
  padding-left: 2rem;
}

.file-input-wrapper {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px dashed var(--primary-rose);
  border-radius: var(--radius-lg);
  padding: var(--spacing-lg);
  cursor: pointer;
  transition: all 0.3s ease;
  background: linear-gradient(135deg, rgba(245, 163, 199, 0.05), rgba(180, 212, 255, 0.05));
  min-height: 120px;
}

.file-input-wrapper:hover {
  background: linear-gradient(135deg, rgba(245, 163, 199, 0.1), rgba(180, 212, 255, 0.1));
  border-color: var(--primary-rose-dark);
  transform: translateY(-2px);
}

.file-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--spacing-sm);
  pointer-events: none;
  text-align: center;
}

.upload-icon {
  font-size: 2rem;
}

.file-text {
  display: flex;
  flex-direction: column;
}

.file-name {
  color: var(--primary-rose-dark);
  font-weight: 600;
  font-size: var(--font-size-base);
}

.file-placeholder {
  color: var(--gray-dark);
  font-size: var(--font-size-sm);
  font-weight: 500;
}

.file-input-wrapper input[type="file"] {
  position: absolute;
  opacity: 0;
  width: 100%;
  height: 100%;
  cursor: pointer;
  border: none;
  padding: 0;
}

.image-hint {
  font-size: var(--font-size-xs);
  color: var(--gray-medium);
  margin-top: var(--spacing-sm);
  margin-bottom: 0;
}

.submit-btn {
  width: 100%;
  padding: var(--spacing-md);
  font-size: var(--font-size-lg);
  margin-top: var(--spacing-xl);
  transition: all 0.3s ease;
}

.submit-btn:hover:not(:disabled) {
  transform: translateY(-2px);
}

.preview-section {
  margin-top: var(--spacing-2xl);
  padding-top: var(--spacing-2xl);
  border-top: 2px solid rgba(245, 163, 199, 0.2);
}

.preview-section h3 {
  margin-bottom: var(--spacing-lg);
  text-align: center;
  color: var(--gray-dark);
}

.preview-card {
  max-width: 350px;
  margin: 0 auto;
  background: linear-gradient(135deg, var(--white) 0%, rgba(254, 245, 241, 0.5) 100%);
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.preview-image {
  width: 100%;
  height: 200px;
  background: linear-gradient(135deg, var(--accent-lavender), var(--accent-mint));
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: var(--radius-lg) var(--radius-lg) 0 0;
  overflow: hidden;
}

.preview-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.preview-placeholder {
  font-size: 3rem;
  animation: float 3s ease-in-out infinite;
}

.preview-content {
  padding: var(--spacing-lg);
}

.preview-card h4 {
  color: var(--gray-dark);
  margin: 0 0 var(--spacing-sm) 0;
  font-size: var(--font-size-lg);
}

.preview-description {
  color: var(--gray-dark);
  font-size: var(--font-size-sm);
  margin: 0 0 var(--spacing-md) 0;
  opacity: 0.8;
}

.preview-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: var(--spacing-md);
  border-top: 1px solid var(--gray-medium);
}

.preview-price {
  font-size: var(--font-size-xl);
  font-weight: 800;
  background: linear-gradient(135deg, var(--primary-rose-dark), var(--secondary-blue-dark));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.preview-category {
  background: linear-gradient(135deg, var(--primary-rose), var(--primary-rose-dark));
  color: white;
  padding: var(--spacing-xs) var(--spacing-md);
  border-radius: var(--radius-md);
  font-size: var(--font-size-xs);
  font-weight: 700;
}

@media (max-width: 768px) {
  .form {
    padding: var(--spacing-lg);
  }

  .form-row {
    grid-template-columns: 1fr;
  }

  .preview-section {
    max-width: 100%;
  }

  .preview-card {
    max-width: 100%;
  }
}
</style>
