# Solicitud de empleo · Primer filtro (MDreieck)

Formulario que **llena el candidato** desde su celular o computadora. Al enviarlo:

```
📁 ENTREVISTAS (tu carpeta de Drive)
   📁 ENT-001 - María Fernanda López Ríos
      📄 ENT-001 - Primer filtro - Maria Fernanda Lopez Rios.pdf   ← el formato con sus respuestas
      📄 ENT-001 - CV - Maria Fernanda Lopez Rios.pdf              ← su CV (archivo o fotos unidas)
```

y una fila en la hoja de Sheets (pestaña **Respuestas**) con una columna por pregunta, más las ligas a la carpeta, el PDF y el CV.

## Archivos

| Archivo | Qué hace |
|---|---|
| `index.html` | El formulario: bienvenida, 4 pasos y pantalla de gracias |
| `app.js` | **Configuración**, preguntas, PDF y envío |
| `estilos.css` | Estilos |
| `icon-192.png` | Ícono |
| `entrevista.html`, `sw.js` | Solo limpian la versión anterior en los teléfonos que ya la abrieron |
| `Codigo.gs` | Backend de Apps Script (**no va al repo**) |

## Puesta en marcha

### 1. Apps Script
1. Abre tu proyecto **ENTREVISTA CANDIDATOS 1ER FILTRO**, borra el `function myFunction()` y pega **todo** `Codigo.gs` (ya trae los IDs de tu carpeta y tu hoja).
2. Guarda (💾). Arriba elige la función **testScript** → **Ejecutar** → **Revisar permisos** → elige tu cuenta → *Configuración avanzada* → *Ir a… (no seguro)* → **Permitir**. Es normal: el script es tuyo.
3. **Implementar → Nueva implementación** → engrane ⚙️ → **Aplicación web**
   - Ejecutar como: **Yo**
   - Quién tiene acceso: **Cualquier usuario**
4. Copia la **URL de la aplicación web** (termina en `/exec`).

> Si después cambias `Codigo.gs`: **Implementar → Gestionar implementaciones → ✏️ → Versión: Nueva versión → Implementar**. Solo guardar no aplica el cambio.

### 2. GitHub
1. En `app.js`, pega la URL en la línea 7:
   ```js
   const SURL = 'https://script.google.com/macros/s/XXXX/exec';
   ```
2. En el repo `cuestionario-1er-filtro`: **Add file → Upload files**, arrastra todos los archivos **menos `Codigo.gs`** y **Commit**. Se reemplazan los anteriores.
3. En 1–2 minutos queda en https://recursoshumanosq1999-coder.github.io/cuestionario-1er-filtro/
4. Llénalo una vez tú para probar y revisa que aparezca la carpeta en Drive.

Ese enlace es el que compartes en Indeed, Facebook o WhatsApp.

## Qué ajustar en `app.js`

- **`VACANTES`**: las vacantes que aparecen en la lista. Si pones `sueldo`, el candidato ve "El sueldo ofertado es de $X, ¿lo aceptas?".
  ```js
  { nombre:'Auxiliar técnico', sueldo:'$12,000 mensuales' },
  ```
- **`AVISO_URL`**: liga a su aviso de privacidad, si la tienen.
- **Preguntas**: todo está en `CARDS`. Cada pregunta tiene el texto que ve el candidato (`l`), el texto del formato en el PDF (`pl`), su ejemplo (`ej` / `ph`) y si es obligatoria (`req`). Si agregas una, su columna aparece sola en Sheets.

### ¿Cómo funciona lo de "Solo para auxiliar técnico"?
El primer dato que se pide es la vacante. Si elige **Auxiliar técnico** (o escribe una vacante que lo contenga), aparece una nota avisando que en el paso 2 habrá preguntas extra, y en el paso 2 aparece la sección de licencia y manejo. Para cualquier otra vacante esa sección no se muestra ni sale en el PDF.

## En Sheets

Columnas fijas al inicio: **Folio · Recibido · Estatus RH · Carpeta · CV · PDF**, luego todas las respuestas, y al final **Observaciones RH**.
- **Estatus RH** trae una lista: Pendiente / Avanza a entrevista presencial / Descartado(a) / No contesta.
- La sección V del PDF (resultado del primer filtro) sale **en blanco**, marcada "Para uso exclusivo de Recursos Humanos".
- Todo queda en columnas limpias (números como números), listo para que una IA lo lea y califique.

**Aviso por correo (opcional):** en `Codigo.gs` pon tu correo en `AVISAR_A` y recibes un mensaje por cada solicitud nueva.

## Protección
- Campo trampa invisible contra robots.
- Los IDs de Drive y Sheets solo están en `Codigo.gs`, no en el repo público.
- Si el candidato toca "Enviar" dos veces o se reintenta, **no se duplica**: se actualiza la misma fila y carpeta.

## Errores comunes

| Síntoma | Solución |
|---|---|
| "El formulario aún no está conectado" | Falta pegar la URL `/exec` en `app.js` |
| "No se pudo enviar … iniciar sesión" | Reimplementa con acceso **Cualquier usuario** |
| Cambié `Codigo.gs` y no se nota | Falta **Nueva versión** en Gestionar implementaciones |
| No aparece la carpeta | Revisa que la cuenta que implementó tenga acceso de edición a la carpeta |
| Sigue viéndose la versión vieja | Recarga la página una vez; `sw.js` limpia la versión guardada |
