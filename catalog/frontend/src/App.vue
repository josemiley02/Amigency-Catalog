<script setup lang="ts">
import { ref, provide } from 'vue'
import CatalogView from './views/CatalogView.vue'
import AdminView from './views/AdminView.vue'

const activeTab = ref<'catalog' | 'admin'>('catalog')
const searchQuery = ref('')

// Proporcionar el query de búsqueda a los componentes hijos
provide('searchQuery', searchQuery)
</script>

<template>
  <div class="app-container">
    <!-- Background placeholder -->
    <div class="background-container"></div>

    <!-- Header -->
    <header class="app-header">
      <div class="container">
        <div class="header-content">
          <div class="logo-section">
            <div class="logo-icon">✨</div>
            <div>
              <h1>Amigency ❤️💙</h1>
              <p class="subtitle">Joyería elegante y delicada</p>
            </div>
          </div>
          
          <nav class="nav-tabs">
            <button 
              class="tab-button" 
              :class="{ active: activeTab === 'catalog' }"
              @click="activeTab = 'catalog'"
            >
              <span class="tab-icon">🛍️</span>
              <span class="tab-label">Catálogo</span>
            </button>
            <button 
              class="tab-button" 
              :class="{ active: activeTab === 'admin' }"
              @click="activeTab = 'admin'"
            >
              <span class="tab-icon">✨</span>
              <span class="tab-label">Agregar</span>
            </button>
          </nav>
        </div>

        <!-- Search bar (solo en catálogo) -->
        <div v-if="activeTab === 'catalog'" class="search-section">
          <div class="search-wrapper">
            <span class="search-icon">🔍</span>
            <input
              v-model="searchQuery"
              type="text"
              class="search-input"
              placeholder="Busca aretes... (Ej: Amapola, Flor, Dorado)"
              @input="$emit('search')"
            />
            <button 
              v-if="searchQuery" 
              class="clear-search"
              @click="searchQuery = ''"
            >
              ✕
            </button>
          </div>
          <p v-if="searchQuery" class="search-hint">Buscando: <strong>{{ searchQuery }}</strong></p>
        </div>
      </div>
    </header>

    <!-- Main Content -->
    <main class="app-main">
      <div class="container">
        <transition name="fade" mode="out-in">
          <CatalogView v-if="activeTab === 'catalog'" key="catalog" />
          <AdminView v-else-if="activeTab === 'admin'" key="admin" />
        </transition>
      </div>
    </main>

    <!-- Footer -->
    <footer class="app-footer">
      <div class="container">
        <div class="footer-content">
          <div class="footer-section">
            <h4>Sobre Nosotros</h4>
            <p>Colección de aretes únicos y elegantes para cada ocasión.</p>
          </div>
          <div class="footer-section">
            <h4>Contacto</h4>
            <p>📧 info@aretescelestiales.com<br>📱 +1 (555) 123-4567</p>
          </div>
          <div class="footer-section">
            <h4>Redes Sociales</h4>
            <p>Instagram • Facebook • Pinterest</p>
          </div>
        </div>
        <div class="footer-bottom">
          <p>&copy; 2025 Aretes Celestiales. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  </div>
</template>

<style scoped>
.app-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background: linear-gradient(135deg, var(--cream) 0%, #f5eff9 50%, var(--blue-light) 100%);
  background-attachment: fixed;
}

.app-header {
  background: linear-gradient(135deg, rgba(245, 163, 199, 0.95), rgba(180, 212, 255, 0.95));
  backdrop-filter: blur(10px);
  padding: var(--spacing-xl) 0;
  box-shadow: var(--shadow-lg);
  position: sticky;
  top: 0;
  z-index: 100;
  border-bottom: 1px solid rgba(255, 255, 255, 0.5);
}

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: var(--spacing-2xl);
  flex-wrap: wrap;
}

.logo-section {
  display: flex;
  align-items: center;
  gap: var(--spacing-lg);
}

.logo-icon {
  font-size: 2.5rem;
  animation: float 3s ease-in-out infinite;
}

.logo-section h1 {
  color: var(--gray-dark);
  margin: 0 0 var(--spacing-xs) 0;
  font-size: var(--font-size-2xl);
  background: none;
  -webkit-text-fill-color: unset;
  background-clip: unset;
}

.subtitle {
  color: var(--gray-dark);
  opacity: 0.8;
  font-size: var(--font-size-sm);
  margin: 0;
  font-weight: 500;
}

.nav-tabs {
  display: flex;
  gap: var(--spacing-md);
}

.tab-button {
  background: rgba(255, 255, 255, 0.7);
  color: var(--gray-dark);
  border: 2px solid transparent;
  padding: var(--spacing-sm) var(--spacing-lg);
  border-radius: var(--radius-lg);
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: 600;
  font-size: var(--font-size-base);
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
}

.tab-icon {
  font-size: 1.2rem;
}

.tab-button:hover {
  background: rgba(255, 255, 255, 0.9);
  transform: translateY(-2px);
  box-shadow: var(--shadow-md);
}

.tab-button.active {
  background: linear-gradient(135deg, var(--primary-rose), var(--primary-rose-dark));
  color: white;
  box-shadow: var(--shadow-lg);
  border-color: white;
}

.search-section {
  margin-top: var(--spacing-lg);
}

.search-wrapper {
  position: relative;
  display: flex;
  align-items: center;
}

.search-icon {
  position: absolute;
  left: var(--spacing-md);
  font-size: 1.2rem;
  pointer-events: none;
}

.search-input {
  width: 100%;
  padding: var(--spacing-md) var(--spacing-md) var(--spacing-md) 2.5rem;
  border: 2px solid rgba(255, 255, 255, 0.6);
  border-radius: var(--radius-lg);
  font-size: var(--font-size-base);
  background: rgba(255, 255, 255, 0.85);
  color: var(--gray-dark);
  transition: all 0.3s ease;
}

.search-input::placeholder {
  color: rgba(74, 68, 65, 0.5);
}

.search-input:focus {
  outline: none;
  background: white;
  border-color: var(--primary-rose);
  box-shadow: 0 0 0 3px rgba(245, 163, 199, 0.2);
}

.clear-search {
  position: absolute;
  right: var(--spacing-md);
  background: none;
  border: none;
  font-size: 1.2rem;
  cursor: pointer;
  color: var(--gray-medium);
  padding: 0;
  transition: color 0.3s ease;
}

.clear-search:hover {
  color: var(--gray-dark);
}

.search-hint {
  font-size: var(--font-size-sm);
  color: var(--gray-dark);
  margin-top: var(--spacing-sm);
  opacity: 0.8;
}

.app-main {
  flex: 1;
  padding: var(--spacing-2xl) 0;
}

.app-footer {
  background: linear-gradient(135deg, rgba(245, 163, 199, 0.1), rgba(180, 212, 255, 0.1));
  border-top: 1px solid rgba(245, 163, 199, 0.2);
  padding: var(--spacing-2xl) 0;
  margin-top: var(--spacing-2xl);
}

.footer-content {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: var(--spacing-2xl);
  margin-bottom: var(--spacing-2xl);
}

.footer-section h4 {
  color: var(--gray-dark);
  margin-bottom: var(--spacing-md);
  font-size: var(--font-size-lg);
}

.footer-section p {
  color: var(--gray-dark);
  opacity: 0.8;
  font-size: var(--font-size-sm);
  margin: 0;
}

.footer-bottom {
  text-align: center;
  padding-top: var(--spacing-lg);
  border-top: 1px solid rgba(245, 163, 199, 0.2);
  color: var(--gray-dark);
  opacity: 0.7;
  font-size: var(--font-size-sm);
}

/* Transiciones */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

@media (max-width: 768px) {
  .app-header {
    padding: var(--spacing-lg) 0;
  }

  .header-content {
    flex-direction: column;
    gap: var(--spacing-lg);
  }

  .logo-section {
    width: 100%;
    justify-content: center;
    text-align: center;
  }

  .logo-section h1 {
    font-size: var(--font-size-xl);
  }

  .nav-tabs {
    width: 100%;
    justify-content: center;
    gap: var(--spacing-sm);
  }

  .tab-button {
    flex: 1;
    justify-content: center;
    min-width: 100px;
  }

  .search-section {
    margin-top: var(--spacing-md);
  }
}
</style>
