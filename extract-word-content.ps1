# Script para extraer contenido del documento Word
# Requiere: pip install python-docx

Write-Host "Extrayendo contenido del documento Word..." -ForegroundColor Cyan

$pythonScript = @"
from docx import Document
import json

doc = Document('InfOpticalComputing.docx')

# Extraer todos los párrafos
paragraphs = []
for para in doc.paragraphs:
    text = para.text.strip()
    if text:
        paragraphs.append(text)

# Imprimir todos los párrafos
print('=== CONTENIDO DEL DOCUMENTO ===')
for i, para in enumerate(paragraphs, 1):
    print(f'\n[{i}] {para}')

# Guardar en un archivo de texto
with open('word-content.txt', 'w', encoding='utf-8') as f:
    for para in paragraphs:
        f.write(para + '\n\n')

print(f'\n\n=== Total de párrafos: {len(paragraphs)} ===')
print('Contenido guardado en: word-content.txt')
"@

$pythonScript | Out-File -FilePath "extract_temp.py" -Encoding UTF8

try {
    python extract_temp.py
    if ($LASTEXITCODE -eq 0) {
        Write-Host "`nExtracción completada. Revisa el archivo word-content.txt" -ForegroundColor Green
    } else {
        Write-Host "`nError: Python o python-docx no está instalado." -ForegroundColor Red
        Write-Host "Instala con: pip install python-docx" -ForegroundColor Yellow
    }
} catch {
    Write-Host "`nError: Python no encontrado o python-docx no está instalado." -ForegroundColor Red
    Write-Host "Instala Python y luego ejecuta: pip install python-docx" -ForegroundColor Yellow
} finally {
    if (Test-Path "extract_temp.py") {
        Remove-Item "extract_temp.py"
    }
}

Write-Host "`nPresiona Enter para continuar..."
$null = Read-Host




