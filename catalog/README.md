# 📦 Catálogo de Productos - Full Stack

Una aplicación moderna para gestionar y visualizar un catálogo de productos con un backend Django REST y frontend Vue 3 + TypeScript.

## 🎨 Características

- ✅ **Frontend moderno**: Vue 3 con TypeScript y Vite
- ✅ **Interfaz atractiva**: Colores rojizos, azulados y blancos
- ✅ **API RESTful**: Django REST Framework
- ✅ **Gestión de productos**: Crear, leer y gestionar productos
- ✅ **Carga de imágenes**: Soporte para imágenes de productos
- ✅ **Categorías**: Organización de productos por categoría
- ✅ **Diseño responsivo**: Se adapta a cualquier pantalla
- ✅ **CORS configurado**: Comunicación segura entre frontend y backend

## 🛠️ Requisitos Previos

- **Python 3.8+** - Para el backend
- **PostgreSQL 12+** - Base de datos
- **Node.js 16+** - Para el frontend
- **npm** o **yarn** - Gestor de paquetes

## 📋 Pre-instalación

### 1. PostgreSQL

Asegúrate de que PostgreSQL esté corriendo:

```bash
# Linux/Mac
sudo service postgresql start

# O si usas Homebrew en Mac
brew services start postgresql

# Verifica que funciona
psql -U postgres -c "SELECT version();"
```

### 2. Python y pip

```bash
# Verifica que tienes Python 3
python3 --version

# Actualiza pip
pip install --upgrade pip
```

### 3. Node.js

```bash
# Verifica que tienes Node.js
node --version
npm --version
```

## 🚀 Inicio Rápido

### Opción 1: Iniciar todo con el script (Recomendado)

```bash
# Desde la raíz del proyecto
./start.sh full
```

Esto iniciará:
- Backend Django en `http://localhost:8000`
- Frontend Vue en `http://localhost:5173`

### Opción 2: Iniciar manualmente en dos terminales

**Terminal 1 - Backend:**
```bash
cd backend

# Primera vez: instalar dependencias
pip install -r requirements.txt

# Ejecutar migraciones
python manage.py migrate

# Iniciar servidor
python manage.py runserver
```

**Terminal 2 - Frontend:**
```bash
cd frontend

# Primera vez: instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev
```

## 📱 Acceso a la Aplicación

Cuando todo esté corriendo:

| Componente | URL |
|-----------|-----|
| **Frontend** | http://localhost:5173 |
| **API Backend** | http://localhost:8000/api/ |
| **Admin Panel** | http://localhost:8000/admin |

## 🔑 Credenciales Admin

Para acceder al panel de administración de Django:

```
Usuario: admin
Contraseña: admin
```

Si no existe, créalo con:
```bash
cd backend
python manage.py createsuperuser
```

## 📁 Estructura del Proyecto

```
catalog/
├── backend/
│   ├── manage.py
│   ├── requirements.txt
│   ├── core/
│   │   ├── settings.py       # Configuración de CORS
│   │   ├── urls.py
│   │   └── wsgi.py
│   └── products/
│       ├── models.py         # Modelos de datos
│       ├── serializers.py    # Serializadores
│       ├── views.py          # Vistas API
│       ├── urls.py
│       └── migrations/
├── frontend/
│   ├── src/
│   │   ├── App.vue           # Componente principal
│   │   ├── main.ts
│   │   ├── globals.css       # Estilos globales
│   │   ├── style.css
│   │   ├── api/
│   │   │   └── products.ts   # Llamadas a API
│   │   ├── components/
│   │   │   ├── ProductList.vue    # Lista de productos
│   │   │   └── ProductForm.vue    # Formulario de creación
│   │   ├── types/
│   │   │   └── products.ts   # Tipos TypeScript
│   │   ├── services/
│   │   │   └── productService.ts
│   │   └── views/
│   │       ├── CatalogView.vue    # Vista de catálogo
│   │       └── AdminView.vue      # Vista de administración
│   ├── package.json
│   ├── tsconfig.json
│   └── vite.config.ts
├── start.sh                  # Script de inicio
└── README.md
```

## 🎯 Uso de la Aplicación

### 1. Ver Catálogo (Pestaña "🛍️ Catálogo")

- Visualiza todos los productos disponibles
- Cada producto muestra:
  - Imagen
  - Nombre
  - Descripción
  - Precio
  - Categoría
  - Fecha de creación

### 2. Agregar Productos (Pestaña "⚙️ Administración")

Completa el formulario con:
- **Nombre** (requerido)
- **Descripción** (opcional)
- **Precio** (requerido)
- **Categoría** (requerido)
- **Imagen** (opcional - arrastra o haz clic)

El formulario muestra:
- Validación en tiempo real
- Vista previa del producto antes de guardar
- Mensajes de éxito o error

## 🎨 Esquema de Colores

La aplicación usa una paleta de colores cuidadosamente seleccionada:

| Color | Uso | Hex |
|-------|-----|-----|
| Rojo | Primario, botones, acentos | `#e63946` |
| Azul Oscuro | Encabezados, fondos | `#1d3557` |
| Azul Secundario | Botones secundarios | `#457b9d` |
| Azul Claro | Acentos, bordes | `#a8dadc` |
| Blanco | Fondo principal | `#f1faee` |

## 🔧 Configuración Avanzada

### Variables de Entorno (Backend)

Crea un archivo `.env` en `backend/` si necesitas configuración personalizada:

```bash
DEBUG=True
SECRET_KEY=tu-clave-secreta
DATABASE_NAME=catalogdb
DATABASE_USER=postgres
DATABASE_PASSWORD=tu-contraseña
```

### Configuración CORS

Editando `backend/core/settings.py`:

```python
CORS_ALLOWED_ORIGINS = [
    "http://localhost:5173",
    "http://127.0.0.1:3000",
    # Agrega más orígenes permitidos aquí
]
```

## 🐛 Solución de Problemas

### Error: "Cannot connect to PostgreSQL"
```bash
# Verifica que PostgreSQL está corriendo
sudo service postgresql status

# Si no está corriendo, inicia PostgreSQL
sudo service postgresql start
```

### Error: "ModuleNotFoundError: No module named 'rest_framework'"
```bash
cd backend
pip install -r requirements.txt
```

### Error: "npm ERR! Cannot find module"
```bash
cd frontend
rm -rf node_modules package-lock.json
npm install
```

### Frontend no se conecta al backend
- Verifica que el backend está corriendo en `http://localhost:8000`
- Comprueba que CORS está configurado en `settings.py`
- Abre la consola (F12) y revisa los errores de red

### Puerto 5173 o 8000 ya está en uso
```bash
# Cambia el puerto en el script o usa:
python manage.py runserver 8001
npm run dev -- --port 5174
```

## 📦 Instalación de Dependencias

### Backend (Python)

```bash
cd backend
pip install -r requirements.txt
```

Si no existe `requirements.txt`, instala manualmente:
```bash
pip install django
pip install djangorestframework
pip install django-cors-headers
pip install psycopg2-binary
pip install pillow
```

### Frontend (Node.js)

```bash
cd frontend
npm install
```

## 🚢 Despliegue

Para desplegar a producción:

1. Configura `DEBUG=False` en `settings.py`
2. Ajusta `ALLOWED_HOSTS` y `CORS_ALLOWED_ORIGINS`
3. Usa un servidor web como Gunicorn + Nginx
4. Compila el frontend con `npm run build`

## 📝 Licencia

Este proyecto es de código abierto y está disponible bajo la licencia MIT.

## 💡 Próximas Mejoras

- [ ] Autenticación de usuarios
- [ ] Carrito de compras
- [ ] Sistema de comentarios
- [ ] Búsqueda y filtros avanzados
- [ ] Dashboard de estadísticas
- [ ] Notificaciones en tiempo real

---

**¡Disfruta usando el Catálogo de Productos!** 🎉
