#!/bin/bash

# Script de inicio para la aplicación Catálogo

echo "🚀 Iniciando aplicación Catálogo..."
echo "=================================="

# Verificar que estamos en el directorio correcto
if [ ! -d "backend" ] || [ ! -d "frontend" ]; then
    echo "❌ Error: Ejecuta este script desde la raíz del proyecto"
    exit 1
fi

# Función para iniciar el backend
start_backend() {
    echo ""
    echo "🔧 Iniciando Backend Django..."
    cd backend
    
    # Verificar si PostgreSQL está corriendo
    if ! nc -z localhost 5432 > /dev/null 2>&1; then
        echo "⚠️  Advertencia: PostgreSQL no parece estar corriendo en localhost:5432"
        echo "   Intenta ejecutar: sudo service postgresql start"
    fi
    
    # Instalar dependencias
    if [ -f "requirements.txt" ]; then
        pip install -r requirements.txt > /dev/null 2>&1
    fi
    
    # Ejecutar migraciones
    echo "📊 Ejecutando migraciones..."
    python manage.py migrate
    
    # Crear categorías por defecto si es necesario
    python manage.py shell << END
from products.models import ProductCategory
categories = ['Aretes']
for cat in categories:
    ProductCategory.objects.get_or_create(name=cat)
print("✅ Categorías creadas/verificadas")
END
    
    echo "✅ Backend iniciado en http://localhost:8000"
    python manage.py runserver
}

# Función para iniciar el frontend
start_frontend() {
    echo ""
    echo "⚙️  Iniciando Frontend Vue..."
    cd frontend
    
    # Instalar dependencias si es necesario
    if [ ! -d "node_modules" ]; then
        echo "📦 Instalando dependencias npm..."
        npm install
    fi
    
    echo "✅ Frontend iniciado en http://localhost:5173"
    npm run dev
}

# Menú de opciones
if [ "$1" == "backend" ]; then
    start_backend
elif [ "$1" == "frontend" ]; then
    start_frontend
elif [ "$1" == "full" ]; then
    # Iniciar ambos en background
    start_backend &
    BACKEND_PID=$!
    sleep 3
    start_frontend &
    FRONTEND_PID=$!
    
    echo ""
    echo "=================================="
    echo "✅ Aplicación completa iniciada:"
    echo "   Frontend: http://localhost:5173"
    echo "   Backend: http://localhost:8000"
    echo "   Admin: http://localhost:8000/admin"
    echo ""
    echo "Presiona Ctrl+C para detener todo"
    
    wait
else
    echo "Uso: ./start.sh [backend|frontend|full]"
    echo ""
    echo "Opciones:"
    echo "  backend  - Inicia solo el servidor Django"
    echo "  frontend - Inicia solo el servidor de desarrollo de Vue"
    echo "  full     - Inicia ambos servidores"
    echo ""
    echo "Ejemplo: ./start.sh full"
fi
