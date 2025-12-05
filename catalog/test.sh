#!/bin/bash

# Script de prueba para verificar que todo funciona correctamente

echo "🧪 PRUEBAS DE LA APLICACIÓN CATÁLOGO"
echo "===================================="
echo ""

# Color codes
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Contador de pruebas
TESTS_TOTAL=0
TESTS_PASSED=0

# Función para ejecutar pruebas
run_test() {
    local test_name=$1
    local command=$2
    
    TESTS_TOTAL=$((TESTS_TOTAL + 1))
    
    echo -n "Test $TESTS_TOTAL: $test_name... "
    
    if eval "$command" > /dev/null 2>&1; then
        echo -e "${GREEN}✓ PASSOU${NC}"
        TESTS_PASSED=$((TESTS_PASSED + 1))
    else
        echo -e "${RED}✗ FALHOU${NC}"
    fi
}

# Verificar Python
echo -e "${YELLOW}1. Verificando instalación de Python${NC}"
run_test "Python 3 instalado" "python3 --version"

# Verificar Node.js
echo -e "${YELLOW}2. Verificando instalación de Node.js${NC}"
run_test "Node.js instalado" "node --version"
run_test "npm instalado" "npm --version"

# Verificar PostgreSQL
echo -e "${YELLOW}3. Verificando PostgreSQL${NC}"
if nc -z localhost 5432 > /dev/null 2>&1; then
    echo "PostgreSQL está corriendo: ✓"
else
    echo "PostgreSQL NO está corriendo: ✗ (Inicia con: sudo service postgresql start)"
fi

# Verificar estructura de carpetas
echo -e "${YELLOW}4. Verificando estructura de proyecto${NC}"
run_test "Carpeta backend existe" "[ -d 'backend' ]"
run_test "Carpeta frontend existe" "[ -d 'frontend' ]"
run_test "Archivo manage.py existe" "[ -f 'backend/manage.py' ]"
run_test "Archivo vite.config.ts existe" "[ -f 'frontend/vite.config.ts' ]"

# Verificar dependencias de Python
echo -e "${YELLOW}5. Verificando dependencias de Python${NC}"
run_test "Django instalado" "python3 -c 'import django'"
run_test "DRF instalado" "python3 -c 'import rest_framework'"
run_test "django-cors-headers instalado" "python3 -c 'import corsheaders'"

# Verificar dependencias de Node
echo -e "${YELLOW}6. Verificando dependencias de Node${NC}"
if [ -f "frontend/package-lock.json" ] || [ -d "frontend/node_modules" ]; then
    echo "Dependencias de Node instaladas: ✓"
else
    echo "Dependencias de Node NO instaladas: ✗ (Ejecuta: cd frontend && npm install)"
fi

# Verificar configuración
echo -e "${YELLOW}7. Verificando configuración${NC}"
run_test "requirements.txt existe" "[ -f 'backend/requirements.txt' ]"
run_test "settings.py tiene CORS" "grep -q 'corsheaders' backend/core/settings.py"

# Resultado final
echo ""
echo "===================================="
echo -e "Resultados: ${GREEN}$TESTS_PASSED/$TESTS_TOTAL${NC} pruebas pasadas"

if [ $TESTS_PASSED -eq $TESTS_TOTAL ]; then
    echo -e "${GREEN}✓ Todo está listo para iniciar la aplicación${NC}"
    echo ""
    echo "Inicia con: ./start.sh full"
else
    echo -e "${YELLOW}⚠ Hay algunos problemas que resolver antes de iniciar${NC}"
fi
