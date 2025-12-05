#!/usr/bin/env python
import os
import django

# Configurar Django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'core.settings')
django.setup()

from products.models import ProductCategory

# Crear solo la categoría "Aretes"
category, created = ProductCategory.objects.get_or_create(
    name='Aretes',
    defaults={'name': 'Aretes'}
)

if created:
    print("✅ Categoría 'Aretes' creada exitosamente")
else:
    print("ℹ️  Categoría 'Aretes' ya existe")

# Eliminar otras categorías si existen
other_categories = ProductCategory.objects.exclude(name='Aretes')
if other_categories.exists():
    count = other_categories.count()
    other_categories.delete()
    print(f"🗑️  Se eliminaron {count} categoría(s) adicional(es)")

print("\n✅ Base de datos configurada correctamente")
print("Categorías existentes:")
for cat in ProductCategory.objects.all():
    print(f"  - {cat.name} (ID: {cat.id})")
