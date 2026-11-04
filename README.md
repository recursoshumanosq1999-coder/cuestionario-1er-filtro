# Solicitud de empleo · Primer filtro (MDreieck)

Formulario que **llena el candidato**: https://recursoshumanosq1999-coder.github.io/cuestionario-1er-filtro/

## Qué pasa al enviar

```
📁 ENTREVISTA CANDIDATOS 1ER FILTRO
   📁 Líder de brigada                          ← una carpeta por perfil (se crea sola)
      📁 2026-11 Noviembre                      ← una por mes
         📁 ENT-021 - Jorge Ramírez - Líder de brigada - 04-11-2026
            📄 ENT-021 - Jorge Ramirez - Primer filtro.pdf     ← formato + CV + constancias, en UN solo documento
            📄 ENT-021 - Análisis de compatibilidad.pdf         ← lo hace la IA unos minutos después
```

Si el candidato escribe una vacante que no está en la lista, va a la carpeta **Otras vacantes**.

En Sheets:
- **Respuestas**: una fila por candidato. Al inicio: Folio, Recibido, Estatus RH, **% Compatibilidad**, **Le falta (IA)**, Resumen IA, Análisis IA, Carpeta y Documento. Luego todas las respuestas.
- **Perfiles**: el perfil de cada puesto (escolaridad, conocimientos, habilidades, experiencia y otros requisitos). **La IA compara contra lo que escriban aquí.**

## Archivos

| Archivo | Va en |
|---|---|
| `index.html`, `app.js`, `estilos.css`, `icon-192.png`, `entrevista.html`, `sw.js`, `README.md` | GitHub |
| `Codigo.gs` | Apps Script (no se sube a GitHub) |

## Actualizar (ya tienen todo instalado)

### 1. Apps Script
1. Abre el proyecto **ENTREVISTA CANDIDATOS 1ER FILTRO**, borra todo el código y pega el nuevo `Codigo.gs`. Guarda.
2. Ejecuta **testScript**. Si pide permisos, acéptalos. Se crea la pestaña **Perfiles** en tu hoja.
3. **Clave de la IA**: ⚙️ *Configuración del proyecto* → al final, *Propiedades de secuencia de comandos* → **Agregar propiedad**:
   - Propiedad: `CLAUDE_API_KEY`
   - Valor: tu clave de la API de Claude (se crea en console.anthropic.com → API Keys; la cuenta necesita saldo)
4. Elige la función **instalarAnalisis** → **Ejecutar**. Desde ahí la IA revisa las solicitudes nuevas cada 5 minutos.
5. **Implementar → Gestionar implementaciones → ✏️ → Versión: Nueva versión → Implementar**. La liga `/exec` no cambia.

### 2. GitHub
Sube todos los archivos menos `Codigo.gs` (Add file → Upload files → arrastra los archivos sueltos → Commit).

### 3. Perfiles
En la pestaña **Perfiles**, llena el renglón de cada puesto. Mientras un puesto no tenga perfil, su columna "Análisis IA" dirá *"Sin perfil…"*.
Cuando lo llenes, cambia ese texto a **Pendiente** y en máximo 5 minutos se analiza. Lo mismo sirve para volver a evaluar a alguien.

## La IA
- Lee el documento completo (respuestas + CV + constancias) y lo compara con el perfil del puesto.
- Da un **porcentaje de compatibilidad**, lo que **sí cumple** y **cuántos y cuáles** conocimientos, habilidades y experiencia **le faltan** para el 100%.
- **No** toma en cuenta edad, estado civil, hijos, salud, vivienda ni gastos: se le ocultan y se le indica no usarlos, para evitar discriminación.
- Es apoyo: la decisión final es de Recursos Humanos.
- El % se colorea en Sheets: verde 80 o más, amarillo 60–79, rojo menos de 60.

## Qué ajustar en `app.js`
- **`VACANTES`**: la lista de vacantes. `extra:true` = le aparecen Disponibilidad y Licencia/manejo (hoy: Auxiliar técnico y Líder de brigada). `sueldo` opcional.
- **`AVISO_URL`**: liga a su aviso de privacidad.
- **Preguntas**: en `CARDS`. Texto (`l`), texto en el PDF (`pl`), ejemplo (`ej`/`ph`), obligatoria (`req`).

Si agregan una vacante en `app.js`, agréguenla también en la pestaña Perfiles (o se agrega sola con el primer candidato).

## Errores comunes

| Síntoma | Solución |
|---|---|
| No se ven los cambios del formulario | Espera 2 min y recarga la página |
| Cambié `Codigo.gs` y no se nota | Falta **Nueva versión** en Gestionar implementaciones |
| "Análisis IA" se queda en *Pendiente* | Falta ejecutar **instalarAnalisis** o la propiedad **CLAUDE_API_KEY** |
| "Análisis IA" dice *Error: API 401* | La clave está mal copiada |
| "Análisis IA" dice *Error: API 400 … credit* | La cuenta de la API no tiene saldo |
