# Guía para Actualizar el Contenido desde el Documento Word

Este documento explica cómo actualizar las escenas con la información del documento `InfOpticalComputing.docx`.

## Estructura de Escenas

El proyecto tiene las siguientes escenas que deben actualizarse con el contenido del documento Word:

1. **HeroScene** - Portada/Presentación
2. **InfoScene** - Información sobre conceptos clave (3 objetos/conceptos)
3. **CurrentStateScene** - Estado Actual (3 aplicaciones actuales)
4. **Scene3** - Cita de Feynman
5. **Scene5** - Retos y Desafíos (4 desafíos)
6. **FutureScene** - El Futuro (3 visiones futuras) ✨ NUEVA
7. **FunFactsScene** - Datos Curiosos (6 datos) ✨ NUEVA

## Cómo Extraer el Contenido del Word

### Opción 1: Usando Python (Recomendado)

1. Instala la biblioteca python-docx:
```bash
pip install python-docx
```

2. Ejecuta este script:
```python
from docx import Document

doc = Document('InfOpticalComputing.docx')

# Extraer todo el texto
for para in doc.paragraphs:
    if para.text.strip():
        print(para.text)
```

### Opción 2: Copiar desde Word

1. Abre el documento Word
2. Selecciona cada sección correspondiente a una escena
3. Copia el texto
4. Pégalo en el archivo correspondiente según la estructura de abajo

## Ubicación de los Datos en el Código

### InfoScene
Archivo: `src/scenes/InfoScene.tsx`
- Buscar el array `objectsData` (línea ~18)
- Actualizar: `title`, `description`, `details[]`, `extra`

### CurrentStateScene
Archivo: `src/scenes/CurrentStateScene.tsx`
- Buscar el array `items` (línea ~19)
- Actualizar: `title`, `phrase`, `content`

### Scene5 (Retos y Desafíos)
Archivo: `src/scenes/Scene5.tsx`
- Buscar el array `challenges` (línea ~21)
- Actualizar: `title`, `description`, `phrases[]`

### FutureScene
Archivo: `src/scenes/FutureScene.tsx`
- Buscar el array `futureItems` (línea ~19)
- Actualizar: `title`, `description`, `details[]`

### FunFactsScene
Archivo: `src/scenes/FunFactsScene.tsx`
- Buscar el array `funFacts` (línea ~15)
- Actualizar: `title`, `fact`

## Notas

- Mantén la estructura de objetos/arrays existente
- Los colores (`color`) y las imágenes (`image`) pueden mantenerse iguales
- Asegúrate de mantener la misma cantidad de items por escena (o ajustar el código si cambias la cantidad)

## Próximos Pasos

Una vez que tengas el contenido del documento Word extraído:

1. Identifica qué sección corresponde a cada escena
2. Actualiza cada archivo de escena con el contenido correspondiente
3. Verifica que el formato y estructura se mantengan consistentes

















