# 🎨 Guía de Personalización - Aretes Celestiales

## 🖼️ Cómo Agregar Imagen de Fondo

Para agregar una bonita imagen de fondo personalizada a la tienda:

### Paso 1: Preparar tu imagen
1. Elige una imagen hermosa relacionada con aretes, joyería o temas celestiales
2. Recomendado: 1920x1080px o mayor
3. Formatos: JPG, PNG o WebP

### Paso 2: Guardar la imagen en la carpeta del proyecto
```bash
# Copia tu imagen a la carpeta frontend/public
cp tu_imagen.jpg frontend/public/background.jpg
```

### Paso 3: Actualizar el CSS
Abre `frontend/src/globals.css` y busca esta sección (cerca del final):

```css
/* ===== BACKGROUND IMAGE PLACEHOLDER ===== */
.background-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url('YOUR_BACKGROUND_IMAGE_URL_HERE');
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
  opacity: 0.03;
  z-index: -1;
  pointer-events: none;
}
```

**Reemplaza:**
```
background-image: url('YOUR_BACKGROUND_IMAGE_URL_HERE');
```

**Con:**
```
background-image: url('/background.jpg');
```

O si prefieres una URL externa (como Unsplash):
```
background-image: url('https://images.unsplash.com/photo-jewelry-id');
```

### Paso 4: Ajustar la opacidad
La opacidad está en `opacity: 0.03;` (muy tenue para no afectar legibilidad)

Puedes aumentarla o disminuirla:
- `0.01` - Casi invisible
- `0.05` - Tenue
- `0.1` - Visible pero suave
- `0.2` - Más notoria

## 🎨 Esquema de Colores Actual

### Colores Pastel Principales
- **Rosa Pastel**: `#f5a3c7` - Para botones y acentos principales
- **Azul Pastel**: `#b4d4ff` - Para elementos secundarios
- **Durazno Pastel**: `#ffd4a3` - Acentos cálidos
- **Lavanda Pastel**: `#e8d4f8` - Tonos relajantes
- **Menta Pastel**: `#d4f8e8` - Toques frescos

### Fondos
- **Blanco Crema**: `#faf8f6` - Color base
- **Crema Clara**: `#fef5f1` - Fondos suaves
- **Gris Claro**: `#f5f2f0` - Elementos neutrales

## 🎯 Personalización Adicional

### Cambiar Nombre de la Tienda
Edita `frontend/src/App.vue`:
```vue
<h1>Tu Nuevo Nombre</h1>
<p class="subtitle">Tu nuevo subtítulo</p>
```

### Cambiar Emoji del Logo
En `frontend/src/App.vue`, busca:
```vue
<div class="logo-icon">✨</div>
```
Cambia `✨` por otro emoji de tu elección: 💎, ✨, 👑, 🌸, etc.

### Ajustar Colores
Todos los colores están definidos en `frontend/src/globals.css` en la sección `:root`

Ejemplo: Para cambiar el color rosa principal:
```css
--primary-rose: #f5a3c7;  /* Cambia este valor */
```

## 📸 Ideas para Imágenes de Fondo

- Flores suaves (rosas, lirios, peonías)
- Patrones de puntos o líneas elegantes
- Textura de tela o lino
- Destellos y efectos bokeh
- Tonos pastel degradados
- Decoraciones celestiales (luna, estrellas)

**Sitios recomendados:**
- Unsplash.com
- Pexels.com
- Pixabay.com

## 🚀 Guardar Cambios

Después de hacer cualquier cambio, reinicia el servidor:
```bash
./start.sh full
```

El navegador debería refrescar automáticamente.

---

¡Disfruta personalizando tu tienda de aretes! ✨💎
