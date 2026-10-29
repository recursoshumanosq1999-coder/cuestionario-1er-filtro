/*******************************************************************
 * MDreieck · SOLICITUD / PRIMER FILTRO — lo llena el candidato
 * Configura aquí UNA sola vez.
 *******************************************************************/

/* ===================== CONFIGURACION ===================== */
const SURL = 'https://script.google.com/macros/s/AKfycbz7_f4gVzTE8QRCjKYH1T1w0V2RVGZjpl2Bk9ZUgXervJmrBnKoqWFzYNT1QvKzrk-n/exec';   // <- pega aquí la URL /exec del Apps Script

/* Liga al aviso de privacidad (si la tienen). Si se deja vacía, el texto sale sin liga. */
const AVISO_URL = '';

/* Vacantes que aparecen en la lista. "sueldo" es opcional: si lo pones,
   al candidato se le pregunta "El sueldo ofertado es de X, ¿lo aceptas?". */
const VACANTES = [
  { nombre:'Auxiliar técnico',        sueldo:'' },
  { nombre:'Técnico instalador',      sueldo:'' },
  { nombre:'Auxiliar administrativo', sueldo:'' },
  { nombre:'Ingeniero de proyectos',  sueldo:'' },
  { nombre:'Almacenista',             sueldo:'' },
  { nombre:'Chofer',                  sueldo:'' }
];

const EMPRESA = 'MDreieck S.A. de C.V.';
const OFICINA = 'Col. del Valle, CDMX';
const PIE_1 = 'Av. Magdalena 202, Col. del Valle, Alcaldía Benito Juárez C.P. 03100 CDMX     Teléfonos: 5511078307/5562676811';
const PIE_2 = 'RFC. MDR0704049N5   www.mdreieck.com.mx';

const LOGO = 'data:image/png;base64,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';
const LOGO_RATIO = 2.05;
/* ========================================================= */

const CONFIGURADO = SURL && SURL !== 'URL_DEL_APPS_SCRIPT';
const OTRA = 'Otra vacante';
const CV_MAX_MB = 10, CV_MAX_FOTOS = 6;

/* ================== EL FORMULARIO ==================
   Cada pregunta se define una sola vez aquí; de esta lista salen la pantalla,
   el PDF y las columnas de Sheets.
   l   : la pregunta como la ve el candidato (puede ser función)
   pl  : el texto en el PDF (como el formato original). Si falta, se usa l
   ej  : ayuda / ejemplo que se muestra debajo de la pregunta
   ph  : ejemplo en gris dentro de la casilla
   t   : text | number | money | tel | email | select | seg | area | lista | nota
   req : obligatorio · cond: solo aparece si se cumple · col: columna en Sheets
   ps  : ancho de la celda en el cuadro del PDF (1 a 4)                           */
const SI_NO = ['Sí','No'];
function puestoFinal(d){ return d.puesto === OTRA ? (d.puestoOtro || '') : (d.puesto || ''); }
const esAux = d => /auxiliar\s*t[eé]cnico/i.test(puestoFinal(d));
function sueldoVacante(d){ const v = VACANTES.find(x => x.nombre === d.puesto); return v && v.sueldo ? v.sueldo : ''; }

const CARDS = [
  { paso:1, id:'vac', fs:'I', ic:'💼', tit:'¿A qué vacante te postulas?', campos:[
    { id:'puesto', l:'Vacante', pl:'Puesto al que aplica', t:'select', req:1, w:'full', ps:2, col:'Puesto',
      op:VACANTES.map(v => v.nombre).concat([OTRA]),
      ej:'Elige la vacante que viste en el anuncio. Si no aparece, elige "Otra vacante".', val:puestoFinal },
    { id:'puestoOtro', l:'¿Cuál vacante?', t:'text', req:1, w:'full', nopdf:1, nocol:1,
      ph:'Ej. Supervisor de obra', cond:d => d.puesto === OTRA },
    { k:'notaAux', t:'nota', cond:esAux,
      l:'Como te postulas a <b>Auxiliar técnico</b>, en el paso 2 verás unas preguntas extra sobre licencia y manejo. Si te postulas a otra vacante, esas preguntas no aparecen.' }
  ]},
  { paso:1, id:'gen', fs:'I', ic:'👤', tit:'Tus datos generales', campos:[
    { id:'nombre', l:'Nombre completo', t:'text', req:1, w:'full', ps:2, col:'Nombre',
      ph:'Ej. María Fernanda López Ríos', ej:'Nombre(s) y los dos apellidos, como aparecen en tu INE.' },
    { id:'edad', l:'Edad', t:'number', req:1, min:15, max:80, ph:'Ej. 27' },
    { id:'civil', l:'Estado civil', t:'select', req:1,
      op:['Soltero(a)','Casado(a)','Unión libre','Divorciado(a)','Separado(a)','Viudo(a)'] },
    { id:'hijos', l:'¿Cuántos hijos tienes?', pl:'No. de hijos', t:'number', min:0, max:20, ph:'Ej. 1',
      ej:'Si no tienes, escribe 0.' },
    { id:'dependientes', l:'¿Cuántas personas dependen económicamente de ti?', pl:'No. de dependientes económicos', t:'number',
      min:0, max:20, ph:'Ej. 2', col:'Dependientes económicos',
      ej:'Personas que viven de tu ingreso: hijos, padres, pareja… Si nadie, escribe 0.' },
    { id:'escolaridad', l:'Último grado de estudios', pl:'Escolaridad', t:'select', req:1, col:'Escolaridad',
      op:['Primaria','Secundaria','Preparatoria / Bachillerato','Carrera técnica','Licenciatura trunca','Licenciatura','Posgrado'] },
    { id:'certificado', l:'¿Tienes el certificado de ese grado de estudios?', pl:'Certificado de estudios', t:'seg', op:SI_NO, req:1,
      col:'Certificado de estudios', ej:'El documento oficial que lo comprueba (certificado o título).' },
    { id:'celular', l:'Celular', pl:'# Celular', t:'tel', req:1, col:'Celular', ph:'Ej. 5512345678',
      ej:'10 dígitos, sin espacios. Te contactaremos a este número o por WhatsApp.' },
    { id:'correo', l:'Correo electrónico', t:'email', ps:2, ph:'Ej. nombre@correo.com', ej:'Si no tienes, déjalo vacío.' },
    { id:'ine', l:'¿Tienes INE vigente?', pl:'INE vigente', t:'seg', op:SI_NO, req:1, col:'INE vigente',
      ej:'Credencial para votar que no esté vencida (revisa el año de vigencia).' },
    { id:'csf', l:'¿Tienes tu Constancia de Situación Fiscal (CSF) actualizada?', pl:'CSF vigente', t:'seg', op:SI_NO, req:1,
      col:'CSF vigente', ej:'Es el documento del SAT con tu RFC; se descarga gratis en sat.gob.mx.' }
  ]},
  { paso:2, id:'dom', fs:'I', ic:'🏠', tit:'Domicilio y salud', campos:[
    { id:'vivienda', l:'La casa donde vives es…', pl:'Tipo de vivienda', t:'select', req:1, col:'Tipo de vivienda',
      op:['Propia','Rentada','De un familiar','Prestada','Otra'] },
    { id:'gastos', l:'¿Cuánto gastas al mes, aproximadamente?', pl:'Gastos mensuales', t:'money', req:1, col:'Gastos mensuales',
      ph:'Ej. 9500', ej:'Suma de renta, comida, transporte, servicios, etc.' },
    { id:'metro', l:'¿Qué estación de Metro o Metrobús te queda más cerca de casa?', pl:'Metro o MB cercano', t:'text', ps:2,
      col:'Metro o Metrobús cercano', ph:'Ej. Metro Iztapalapa (L8)', ej:'Si no usas transporte público, escribe tu colonia y alcaldía o municipio.' },
    { id:'trayecto', l:'¿Cuánto tiempo harías de tu casa a nuestras oficinas?', pl:'Tiempo de trayecto', t:'text', req:1,
      col:'Tiempo de trayecto', ph:'Ej. 50 minutos', ej:'Nuestras oficinas están en ' + OFICINA + '. Un cálculo aproximado está bien.' },
    { id:'salud', l:'¿Cómo describirías tu estado de salud?', pl:'Estado de salud', t:'seg', op:['Bueno','Regular','Malo'], col:'Estado de salud' },
    { id:'padecimientos', l:'¿Tienes alguna enfermedad o condición que debamos saber?', pl:'Padecimientos', t:'text', ps:2,
      col:'Padecimientos', ph:'Ej. Ninguno / alergia a la penicilina', ej:'Solo para cuidar tu seguridad en el trabajo. Si no, escribe "Ninguno".' }
  ]},
  { paso:2, id:'disp', fs:'I', ic:'🕒', tit:'Disponibilidad', band:'Disponibilidad', campos:[
    { id:'dispTiempo', l:'¿Qué horario puedes cubrir?', pl:'Disponibilidad de tiempo', t:'select', req:1, col:'Disponibilidad de tiempo',
      op:['Tiempo completo','Medio tiempo (mañana)','Medio tiempo (tarde)','Solo fines de semana','Horario flexible'] },
    { id:'horasExtra', l:'¿Puedes quedarte horas extra cuando se necesite?', pl:'Disponibilidad para horas extraordinarias', t:'seg', op:SI_NO, req:1, col:'Horas extra' },
    { id:'viajar', l:'¿Puedes viajar a otros estados por trabajo?', pl:'Disponibilidad para viajar', t:'seg', op:SI_NO, req:1, col:'Viajar',
      ej:'Por ejemplo, salir unos días a instalar equipo en otra ciudad.' },
    { id:'turnos', l:'¿Puedes rolar turnos?', pl:'Disponibilidad para rolar turnos', t:'seg', op:SI_NO, req:1, col:'Rolar turnos',
      ej:'Es decir, que tu horario cambie: por ejemplo, una semana de mañana y otra de tarde.' }
  ]},
  { paso:2, id:'aux', fs:'I', ic:'🔧', tit:'Solo para Auxiliar técnico', band:'Solo para auxiliar técnico', cond:esAux,
    hint:'Estas preguntas aparecen porque te postulas como Auxiliar técnico.', campos:[
    { id:'licencia', l:'¿Tienes licencia de conducir vigente?', pl:'Licencia de conducir vigente', t:'seg', op:SI_NO, req:1 },
    { id:'tipoLicencia', l:'¿De qué tipo es tu licencia?', pl:'Tipo de licencia', t:'select', cond:d => d.licencia === 'Sí', req:1,
      op:['Tipo A (automovilista)','Tipo B (taxi)','Tipo C (transporte de pasajeros)','Tipo D (carga)','Tipo E (especial)','Federal','No sé'],
      ej:'Viene impreso en tu licencia. La más común es la Tipo A, de automovilista particular.' },
    { id:'sabeManejar', l:'¿Sabes manejar?', pl:'Sabe manejar', t:'seg', op:SI_NO, req:1 },
    { id:'transmision', l:'¿Qué tipo de auto sabes manejar?', pl:'Automático / estándar', t:'seg', op:['Automático','Estándar','Ambos'],
      cond:d => d.sabeManejar === 'Sí', req:1, ej:'Estándar es el de palanca con clutch.' }
  ]},
  { paso:2, id:'fue', fs:'I', ic:'📣', tit:'¿Cómo te enteraste de la vacante?', band:'Fuente de reclutamiento', campos:[
    { id:'fuente', l:'Elige una opción', pl:'Fuente de reclutamiento', t:'seg', w:'full', multi:1, req:1, ps:2, col:'Fuente de reclutamiento',
      op:['Indeed','Facebook (anuncio)','Facebook (bolsa de trabajo)','Referido','Otro'] },
    { id:'fuenteDetalle', l:d => d.fuente === 'Referido' ? '¿Quién te recomendó?' : '¿Por qué medio?', pl:'Referido / otro (especificar)', t:'text', w:'full', ps:2,
      req:1, col:'Fuente - detalle', cond:d => d.fuente === 'Referido' || d.fuente === 'Otro',
      ph:'Ej. Juan Pérez, del área de proyectos / OCC Mundial' }
  ]},
  { paso:3, id:'val', fs:'II', ic:'🏢', tit:'Tu empleo actual o último empleo', campos:[
    { id:'laborando', l:'¿Actualmente estás trabajando?', pl:'¿Actualmente se encuentra laborando?', t:'seg', op:SI_NO, req:1, w:'full',
      col:'Laborando actualmente' },
    { id:'motivoCambio', l:d => d.laborando === 'No' ? '¿Por qué dejaste tu último empleo?' : '¿Por qué quieres cambiar de trabajo?',
      pl:'Motivo de cambio laboral (si aplica)', t:'area', w:'full', col:'Motivo de cambio',
      ph:'Ej. Busco crecimiento / me queda muy lejos / terminó el proyecto', ej:'Si es tu primer empleo, escribe "Primer empleo".' },
    { id:'ultimoPuesto', l:'¿Cuál fue tu último puesto?', pl:'Último puesto desempeñado', t:'text', w:'full', col:'Último puesto',
      ph:'Ej. Técnico de soporte en campo' },
    { id:'ultimoSueldo', l:'¿Cuánto ganabas al mes en ese puesto?', pl:'Último sueldo percibido', t:'money', col:'Último sueldo',
      ph:'Ej. 12500', ej:'Sueldo mensual, sin centavos.' },
    { id:'empresa', l:'¿En qué empresa?', pl:'Empresa anterior o actual', t:'text', col:'Empresa anterior o actual',
      ph:'Ej. Servicios Integrales del Valle' }
  ]},
  { paso:3, id:'comp', fs:'III', ic:'🧰', tit:'Tu experiencia para este puesto', campos:[
    { id:'conocePuesto', l:'¿Sabes qué actividades se hacen en el puesto al que te postulas?',
      pl:'¿Conoce el puesto al que está aplicando y sus funciones principales?', t:'seg', op:SI_NO, req:1, w:'full', col:'Conoce el puesto' },
    { id:'conoceComent', l:'Cuéntanos qué sabes de esas actividades', pl:'Comentarios', t:'area', w:'full', sub:1,
      col:'Conoce el puesto - comentarios', ph:'Ej. Instalación de cámaras, tendido de cableado y mantenimiento a equipos' },
    { id:'expTiempo', l:'¿Cuánto tiempo de experiencia tienes en puestos parecidos?', pl:'Tiempo de experiencia en puestos similares',
      t:'text', req:1, w:'full', col:'Tiempo de experiencia', ph:'Ej. 2 años y medio', ej:'Si no tienes experiencia, escribe "Sin experiencia".' },
    { id:'expResumen', l:'Menciona hasta 3 actividades o logros de tu experiencia relacionados con el puesto',
      pl:'Experiencia relacionada con el puesto (resumen breve)', t:'lista', n:3, w:'full', col:'Experiencia relacionada',
      phs:['Ej. Instalé cámaras de seguridad en 20 sucursales','Ej. Daba mantenimiento a equipos de red','Ej. Hacía levantamientos en sitio con el cliente'] }
  ]},
  { paso:4, id:'eco', fs:'IV', ic:'💰', tit:'Expectativas económicas', campos:[
    { id:'pretension', l:'¿Cuánto te gustaría ganar al mes?', pl:'Pretensiones económicas', t:'money', req:1, w:'full', inGrid:1,
      col:'Pretensiones económicas', ph:'Ej. 14000', ej:'Sueldo mensual que esperas recibir.' },
    { id:'aceptaSueldo', w:'full', req:1, t:'seg', op:['Sí','No','Tengo comentarios'], col:'Acepta sueldo ofertado',
      l:d => { const s = sueldoVacante(d); return s ? 'El sueldo ofertado para esta vacante es de ' + s + '. ¿Lo aceptas?'
                                                  : '¿Aceptas el sueldo ofertado en el anuncio de la vacante?'; },
      pl:'Acepto el sueldo ofertado' },
    { id:'sueldoObs', l:'Cuéntanos tus comentarios sobre el sueldo', pl:'Observaciones', t:'area', w:'full', sub:1, req:1,
      col:'Sueldo - observaciones', cond:d => d.aceptaSueldo === 'No' || d.aceptaSueldo === 'Tengo comentarios',
      ph:'Ej. Lo acepto si incluye vales de despensa' }
  ]}
];

const PASOS = [
  { nom:'Tus datos' },
  { nom:'Domicilio' },
  { nom:'Experiencia' },
  { nom:'Sueldo y CV' }
];

const PDF_SECS = {
  I:'Datos generales del candidato', II:'Validación inicial (confirmación de datos)',
  III:'Compatibilidad con el puesto', IV:'Expectativas económicas',
  VI:'Resultado del primer filtro'
};

/* Índices de apoyo */
const CAMPO = {};
CARDS.forEach(card => card.campos.forEach((c, i) => {
  c.k = c.id || c.k || (card.id + '_' + i); c.card = card.id; c.paso = card.paso; CAMPO[c.k] = c;
}));
function todos(){ const r = []; CARDS.forEach(card => card.campos.forEach(c => r.push(c))); return r; }
function cardVisible(card, d){ return !card.cond || !!card.cond(d || {}); }
function visible(c, d){ d = d || {}; const card = CARDS.find(x => x.id === c.card);
  return (!card || cardVisible(card, d)) && (!c.cond || !!c.cond(d)); }
function etiqueta(c, d){ return typeof c.l === 'function' ? c.l(d || {}) : c.l; }
function etiquetaPDF(c, d){ return c.pl || etiqueta(c, d); }

/* ================== BORRADOR (en el dispositivo del candidato) ================== */
const LS_KEY = 'mdk_primer_filtro';
function cargarBorrador(){ try{ return JSON.parse(localStorage.getItem(LS_KEY) || 'null'); }catch(e){ return null; } }
function guardarBorrador(b){ try{ localStorage.setItem(LS_KEY, JSON.stringify(b)); }catch(e){} }
function borrarBorrador(){ try{ localStorage.removeItem(LS_KEY); }catch(e){} }
function nuevoBorrador(){
  return { id:'cand_' + Date.now() + '_' + Math.random().toString(36).slice(2,8),
           folio:'', d:{}, paso:0, acepto:false, creado:new Date().toISOString() };
}
function tieneDatos(b){ return !!(b && b.d && Object.keys(b.d).some(k => !vacio(b.d[k]))); }

/* ================== UTILIDADES ================== */
function online(){ return navigator.onLine !== false; }
function esc(s){ return String(s == null ? '' : s)
  .replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;'); }
function hoyISO(){ const d = new Date(); d.setMinutes(d.getMinutes() - d.getTimezoneOffset()); return d.toISOString().slice(0,10); }
const MESES = ['enero','febrero','marzo','abril','mayo','junio','julio','agosto','septiembre','octubre','noviembre','diciembre'];
function fechaFormato(f){
  const m = String(f || '').match(/^(\d{4})-(\d{2})-(\d{2})$/);
  return m ? m[3] + ' / ' + MESES[Number(m[2]) - 1] + ' / ' + m[1] : '';
}
function num(v){ const n = parseFloat(String(v == null ? '' : v).replace(/[^0-9.\-]/g,'')); return isNaN(n) ? null : n; }
function fmtMoney(v){ const n = num(v); return n == null ? '' : '$' + n.toLocaleString('es-MX', { maximumFractionDigits:2 }); }
function fmtSize(b){ return b > 1048576 ? (b / 1048576).toFixed(1) + ' MB' : Math.max(1, Math.round(b / 1024)) + ' KB'; }
function vacio(v){ return v == null || (Array.isArray(v) ? !v.some(x => x && String(x).trim()) : String(v).trim() === ''); }

function valorTexto(c, d){
  if(c.val) return c.val(d);
  const v = d[c.id];
  if(c.t === 'money') return fmtMoney(v);
  if(c.t === 'tel') return String(v || '').replace(/\D/g,'');
  if(c.t === 'lista') return (Array.isArray(v) ? v : []).filter(x => x && String(x).trim()).join('\n');
  return v == null ? '' : String(v).trim();
}
function valorPlano(c, d){
  if(c.val) return c.val(d);
  const v = d[c.id];
  if(c.t === 'money' || c.t === 'number'){ const n = num(v); return n == null ? '' : n; }
  if(c.t === 'tel') return String(v || '').replace(/\D/g,'');
  if(c.t === 'lista') return (Array.isArray(v) ? v : []).filter(x => x && String(x).trim()).map(x => '• ' + String(x).trim()).join('\n');
  return v == null ? '' : String(v).trim();
}
function columnasSheet(b){
  const cols = [['Folio', b.folio || ''], ['Fecha de llenado', b.fecha || hoyISO()]];
  todos().forEach(c => {
    if(!c.id || c.nocol) return;
    cols.push([c.col || etiquetaPDF(c, b.d), visible(c, b.d) ? valorPlano(c, b.d) : '']);
  });
  return cols;
}

/* ================== VALIDACION ================== */
function errorCampo(c, d){
  if(!c.id || !visible(c, d)) return '';
  const v = d[c.id];
  if(vacio(v)) return c.req ? 'Este dato es obligatorio.' : '';
  if(c.t === 'tel' && String(v).replace(/\D/g,'').length !== 10) return 'Escribe 10 dígitos, sin espacios. Ej. 5512345678';
  if(c.t === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(String(v).trim())) return 'Revisa el correo. Ej. nombre@correo.com';
  if(c.t === 'number'){
    if(!/^\s*\d+\s*$/.test(String(v))) return 'Escribe solo números enteros.';
    const n = num(v);
    if((c.min != null && n < c.min) || (c.max != null && n > c.max)) return 'Revisa este número.';
  }
  if(c.t === 'money' && num(v) == null) return 'Escribe solo la cantidad, sin letras. Ej. 12000';
  return '';
}
function erroresPaso(p, d){
  const r = [];
  CARDS.filter(card => card.paso === p).forEach(card => card.campos.forEach(c => {
    const m = errorCampo(c, d); if(m) r.push({ c, m });
  }));
  return r;
}

/* ================== PANTALLA: campos ================== */
function htmlCampo(c, d){
  const full = (c.w === 'full' || c.t === 'nota') ? ' full' : '';
  const attrs = ' data-k="' + c.k + '"' + (visible(c, d) ? '' : ' hidden');
  if(c.t === 'nota') return '<div class="nota' + full + '"' + attrs + '>' + c.l + '</div>';

  const v = d[c.id];
  const req = c.req ? ' <b class="req">*</b>' : '';
  const ayuda = c.ej ? '<p class="ayuda">' + esc(c.ej) + '</p>' : '';
  const ph = c.ph ? ' placeholder="' + esc(c.ph) + '"' : '';
  const err = '<p class="ferr"></p>';
  const abre = '<div class="field' + full + '"' + attrs + '>';
  const labFor = '<label class="q" for="f_' + c.id + '">' + esc(etiqueta(c, d)) + req + '</label>';
  const labSin = '<label class="q">' + esc(etiqueta(c, d)) + req + '</label>';
  switch(c.t){
    case 'select':
      return abre + labFor + ayuda + '<select id="f_' + c.id + '" data-f="' + c.id + '"><option value="">Selecciona una opción…</option>' +
        c.op.map(o => '<option' + (v === o ? ' selected' : '') + '>' + esc(o) + '</option>').join('') + '</select>' + err + '</div>';
    case 'seg':
      return abre + labSin + ayuda + '<div class="seg' + (c.multi ? ' multi' : '') + '" role="radiogroup">' +
        c.op.map(o => '<button type="button" role="radio" aria-checked="' + (v === o) + '" data-f="' + c.id + '" data-v="' + esc(o) + '" class="' + (v === o ? 'sel' : '') + '">' + esc(o) + '</button>').join('') +
        '</div>' + err + '</div>';
    case 'area':
      return abre + labFor + ayuda + '<textarea id="f_' + c.id + '" data-f="' + c.id + '" maxlength="1500"' + ph + '>' + esc(v || '') + '</textarea>' + err + '</div>';
    case 'lista': {
      const arr = Array.isArray(v) ? v : [];
      let li = '';
      for(let i = 0; i < (c.n || 3); i++)
        li += '<div class="li"><span class="dot">' + (i + 1) + '</span><input data-f="' + c.id + '" data-i="' + i + '" maxlength="300" value="' +
          esc(arr[i] || '') + '" placeholder="' + esc((c.phs || [])[i] || '') + '"></div>';
      return abre + labSin + ayuda + '<div class="lista">' + li + '</div>' + err + '</div>';
    }
    case 'money':
      return abre + labFor + ayuda + '<div class="money"><span>$</span><input id="f_' + c.id + '" data-f="' + c.id + '" inputmode="decimal" maxlength="12" value="' + esc(v || '') + '"' + ph + '></div>' + err + '</div>';
    default: {
      const type = { email:'email', tel:'tel' }[c.t] || 'text';
      const extra = c.t === 'number' ? ' inputmode="numeric" maxlength="3"' : (c.t === 'tel' ? ' inputmode="tel" maxlength="14" autocomplete="tel"' : ' maxlength="150"');
      const ac = c.id === 'nombre' ? ' autocomplete="name"' : (c.t === 'email' ? ' autocomplete="email"' : (c.t === 'tel' ? '' : ' autocomplete="off"'));
      return abre + labFor + ayuda + '<input id="f_' + c.id + '" type="' + type + '" data-f="' + c.id + '" value="' + esc(v || '') + '"' + ph + extra + ac + '>' + err + '</div>';
    }
  }
}
function htmlCard(card, d){
  return '<section class="card" data-card="' + card.id + '"' + (cardVisible(card, d) ? '' : ' hidden') + '>' +
    '<h2><span class="num ic">' + card.ic + '</span>' + esc(card.tit) + '</h2>' +
    (card.hint ? '<p class="hint">' + esc(card.hint) + '</p>' : '') +
    '<div class="grid">' + card.campos.map(c => htmlCampo(c, d)).join('') + '</div></section>';
}

/* ================== CONEXION ================== */
async function pedirFolio(){
  const ctrl = new AbortController(); const t = setTimeout(() => ctrl.abort(), 20000);
  const r = await fetch(SURL + '?accion=folio', { signal:ctrl.signal }); clearTimeout(t);
  const d = await r.json();
  if(!d || typeof d.consec !== 'number') throw new Error(d && d.msg ? d.msg : 'No se pudo obtener el folio');
  return 'ENT-' + String(d.consec).padStart(3, '0');
}
async function postServidor(o){
  const body = JSON.stringify(o);
  try{
    const ctrl = new AbortController(); const t = setTimeout(() => ctrl.abort(), 120000);
    const r = await fetch(SURL, { method:'POST', redirect:'follow',
      headers:{ 'Content-Type':'text/plain;charset=utf-8' }, body, signal:ctrl.signal });
    clearTimeout(t);
    const txt = await r.text();
    let d = null; try{ d = JSON.parse(txt); }catch(e){}
    if(d && d.status === 'ok') return d;
    if(d && d.status === 'error') throw new Error(d.msg);
    throw new Error('Respuesta inesperada del servidor');
  }catch(err){
    /* Si el navegador no deja leer la respuesta (CORS) se reenvía "a ciegas".
       El servidor reconoce la solicitud por su ID, así que no se duplica. */
    if(err && err.name === 'TypeError' && online()){
      await fetch(SURL, { method:'POST', mode:'no-cors', headers:{ 'Content-Type':'text/plain;charset=utf-8' }, body });
      return { status:'ok', ciego:true };
    }
    throw err;
  }
}

/* ================== CV: archivo o fotos ================== */
function blobToBase64(b){ return new Promise((res, rej) => { const r = new FileReader();
  r.onload = () => { const s = r.result, i = s.indexOf('base64,'); res(i >= 0 ? s.slice(i + 7) : s); };
  r.onerror = () => rej(r.error); r.readAsDataURL(b); }); }
function cargarImg(src){ return new Promise(res => { const im = new Image();
  im.onload = () => res(im); im.onerror = () => res(null); im.src = src; }); }
async function fotoReducida(file, maxPx, cal){
  const url = URL.createObjectURL(file);
  const im = await cargarImg(url); URL.revokeObjectURL(url);
  if(!im) return null;
  let w = im.naturalWidth, h = im.naturalHeight;
  if(w > maxPx || h > maxPx){ const r = Math.min(maxPx / w, maxPx / h); w = Math.round(w * r); h = Math.round(h * r); }
  const c = document.createElement('canvas'); c.width = w; c.height = h;
  const x = c.getContext('2d'); x.fillStyle = '#fff'; x.fillRect(0, 0, w, h); x.drawImage(im, 0, 0, w, h);
  return { url:c.toDataURL('image/jpeg', cal), w, h };
}
function slugNombre(n){
  return String(n || 'Candidato').normalize('NFD').replace(/[̀-ͯ]/g,'')
    .replace(/[^A-Za-z0-9 ]+/g,'').trim().replace(/\s+/g,' ').slice(0,60) || 'Candidato';
}
/* Devuelve {name, mimeType, data(base64)} listo para subir, o null */
async function archivoCV(cv, b){
  const base = b.folio + ' - CV - ' + slugNombre(b.d.nombre);
  if(cv.doc){
    const ext = (cv.doc.name.match(/\.[A-Za-z0-9]+$/) || ['.pdf'])[0].toLowerCase();
    return { name:base + ext, mimeType:cv.doc.type || 'application/octet-stream', data:await blobToBase64(cv.doc) };
  }
  if(cv.fotos.length){
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF({ unit:'mm', format:'letter' });
    cv.fotos.forEach((f, i) => {
      if(i) doc.addPage();
      const m = 8, bw = PW - 2 * m, bh = PH - 2 * m, r = Math.min(bw / f.w, bh / f.h);
      doc.addImage(f.url, 'JPEG', m + (bw - f.w * r) / 2, m + (bh - f.h * r) / 2, f.w * r, f.h * r, '', 'FAST');
    });
    const s = doc.output('datauristring');
    return { name:base + '.pdf', mimeType:'application/pdf', data:s.slice(s.indexOf('base64,') + 7) };
  }
  return null;
}
function resumenCV(cv){
  cv = cv || { fotos:[] };
  if(cv.doc) return 'Sí, archivo ' + (cv.doc.name.split('.').pop() || '').toUpperCase();
  if(cv.fotos.length) return 'Sí, ' + cv.fotos.length + ' foto' + (cv.fotos.length === 1 ? '' : 's');
  return 'No';
}

/* ================== PDF (hoja carta, igual al formato en Word) ================== */
const PW = 215.9, PH = 279.4, MX = 15, ANCHO = PW - 2 * MX, PIE_Y = PH - 20, LIMITE = PIE_Y - 4, TOPE_PAG = 38;
const AZUL = [26,16,128], GRIS = [106,102,136], TINTA = [27,24,48], LINEA = [196,193,214], SUAVE = [239,234,251];

/* La fuente estándar del PDF solo pinta Latin-1: se normaliza lo demás */
function pdfTxt(s){
  return String(s == null ? '' : s).normalize('NFC')
    .replace(/[‘’]/g, "'").replace(/[“”]/g, '"')
    .replace(/[–—]/g, '-').replace(/…/g, '...').replace(/•/g, '-')
    .replace(/[^\x09\x0A\x0D\x20-\x7E\xA0-\xFF]/g, '');
}
function fuente(doc, estilo, tam, color){ doc.setFont('helvetica', estilo); doc.setFontSize(tam); if(color) doc.setTextColor(...color); }
/* Parte el texto en renglones que caben en "ancho" (también palabras larguísimas sin espacios) */
function renglones(doc, txt, ancho){
  const out = [];
  String(txt).split('\n').forEach(par => {
    if(!par.trim()){ if(out.length) out.push(''); return; }
    const partes = par.split(' ').map(w => {
      if(doc.getTextWidth(w) <= ancho) return w;
      let r = '', cur = '';
      for(const ch of w){ if(doc.getTextWidth(cur + ch) > ancho){ r += cur + ' '; cur = ch; } else cur += ch; }
      return r + cur;
    });
    doc.splitTextToSize(partes.join(' '), ancho).forEach(l => out.push(l));
  });
  while(out.length && out[out.length - 1] === '') out.pop();
  return out;
}

function pdfMembrete(doc, b, primera){
  const lw = 38, lh = lw / LOGO_RATIO;
  let ok = false;
  if(LOGO && LOGO.indexOf('data:') === 0){ try{ doc.addImage(LOGO, 'PNG', MX, 9, lw, lh); ok = true; }catch(x){} }
  if(!ok){ fuente(doc, 'bold', 16, AZUL); doc.text('MDreieck', MX, 20); }
  fuente(doc, 'bold', 11, AZUL); doc.text(pdfTxt(b.folio || 'SIN FOLIO'), PW - MX, 16, { align:'right' });
  fuente(doc, 'normal', 7.5, GRIS); doc.text('Entrevista - primer filtro', PW - MX, 20.5, { align:'right' });
  if(!primera){ doc.setFillColor(...AZUL); doc.rect(MX, 30, ANCHO, 0.6, 'F'); }
  return primera ? 34 : TOPE_PAG;
}
function pdfPies(doc, b){
  const n = doc.getNumberOfPages();
  for(let i = 1; i <= n; i++){
    doc.setPage(i);
    doc.setFillColor(...AZUL); doc.rect(MX - 5, PIE_Y, ANCHO + 10, 0.7, 'F');
    fuente(doc, 'normal', 7, [150,150,160]);
    doc.text(pdfTxt(PIE_1), PW / 2, PIE_Y + 4.5, { align:'center' });
    doc.text(pdfTxt(PIE_2), PW / 2, PIE_Y + 8, { align:'center' });
    fuente(doc, 'normal', 7, GRIS);
    doc.text(pdfTxt((b.folio || '') + '  ·  ' + i + '/' + n), PW - MX, PIE_Y + 13, { align:'right' });
  }
}
function pdfNueva(doc, b){ doc.addPage(); return pdfMembrete(doc, b, false); }
function pdfEspacio(doc, b, y, alto){ return (y + alto > LIMITE) ? pdfNueva(doc, b) : y; }

function pdfTituloSec(doc, b, y, txt){
  y = pdfEspacio(doc, b, y, 24);
  doc.setFillColor(...SUAVE); doc.roundedRect(MX - 2, y - 4.6, ANCHO + 4, 7.6, 1.6, 1.6, 'F');
  fuente(doc, 'bold', 9.5, AZUL); doc.text(pdfTxt(txt.toUpperCase()), MX + 1, y + 0.6);
  return y + 9;
}
function pdfBandaOscura(doc, b, y, txt){
  y = pdfEspacio(doc, b, y, 18);
  doc.setFillColor(...TINTA); doc.rect(MX, y, ANCHO, 5.2, 'F');
  fuente(doc, 'bold', 7.2, [255,255,255]); doc.text(pdfTxt(txt.toUpperCase()), PW / 2, y + 3.6, { align:'center' });
  return y + 5.2;
}

/* Cuadro de celdas (sección I). Cada fila toma la altura de su celda más larga,
   así el texto nunca se encima, sean 2 palabras o 2 párrafos. Si una fila no cabe
   ni en una hoja completa, continúa en la siguiente. */
function pdfGrid(doc, b, y, items, cols){
  const cw = ANCHO / cols, PADX = 1.6, LH_L = 2.7, LH_V = 3.9;
  const filas = []; let fila = [], usado = 0;
  const cerrar = () => {
    if(!fila.length) return;
    if(usado < cols) fila[fila.length - 1].span += cols - usado;
    filas.push({ celdas:fila }); fila = []; usado = 0;
  };
  items.forEach(it => {
    if(it.band){ cerrar(); filas.push({ band:it.l }); return; }
    const sp = Math.min(it.span || 1, cols);
    if(usado + sp > cols) cerrar();
    fila.push({ l:it.l, v:it.v, span:sp }); usado += sp;
  });
  cerrar();

  const dibujar = (prep, y0, alto, desde, hasta) => {
    let x = MX;
    prep.forEach((p, i) => {
      const w = p.span * cw;
      doc.setDrawColor(...LINEA); doc.setLineWidth(0.25); doc.rect(x, y0, w, alto);
      fuente(doc, 'bold', 6.6, GRIS); doc.text(p.ll, x + PADX, y0 + 3.3);
      fuente(doc, 'normal', 9, p.vacio ? [185,185,195] : TINTA);
      const vl = p.vl.slice(desde[i], hasta[i]);
      vl.forEach((l, j) => doc.text(l, x + PADX, y0 + 3.3 + p.ll.length * LH_L + 2.5 + j * LH_V));
      x += w;
    });
  };

  filas.forEach(f => {
    if(f.band){ y = pdfBandaOscura(doc, b, y, f.band); return; }
    const prep = f.celdas.map(c => {
      const w = c.span * cw - 2 * PADX;
      fuente(doc, 'bold', 6.6); const ll = renglones(doc, pdfTxt(c.l.toUpperCase()), w);
      fuente(doc, 'normal', 9); const vl = renglones(doc, pdfTxt(c.v || '-'), w);
      return { ll, vl, span:c.span, vacio:!c.v };
    });
    const cab = Math.max(...prep.map(p => 2.8 + p.ll.length * LH_L + 1.4));
    let desde = prep.map(() => 0);
    const total = prep.map(p => p.vl.length);
    const altoCompleto = Math.max(11, cab + Math.max(...total) * LH_V + 1.6);
    if(y + altoCompleto > LIMITE && altoCompleto <= LIMITE - TOPE_PAG) y = pdfNueva(doc, b);
    /* se dibuja por tramos: normalmente es uno solo */
    while(true){
      const caben = Math.max(1, Math.floor((LIMITE - y - cab - 1.6) / LH_V));
      const hasta = total.map((n, i) => Math.min(n, desde[i] + caben));
      const lineas = Math.max(...hasta.map((h, i) => h - desde[i]));
      const alto = Math.max(11, cab + lineas * LH_V + 1.6);
      dibujar(prep, y, alto, desde, hasta);
      y += alto; desde = hasta;
      if(desde.every((d0, i) => d0 >= total[i])) break;
      y = pdfNueva(doc, b);
    }
  });
  return y + 6;
}

/* Casillas tipo ☐ Sí ☐ No */
function pdfCasillas(doc, b, y, x0, ops, sel){
  let x = x0;
  y = pdfEspacio(doc, b, y - 3, 6) + 3;
  ops.forEach(o => {
    const t = pdfTxt(o); fuente(doc, o === sel ? 'bold' : 'normal', 9.5);
    const w = 5 + doc.getTextWidth(t) + 7;
    if(x + w > PW - MX){ x = x0; y += 5.5; y = pdfEspacio(doc, b, y - 3, 6) + 3; fuente(doc, o === sel ? 'bold' : 'normal', 9.5); }
    doc.setDrawColor(...TINTA); doc.setLineWidth(0.3); doc.rect(x, y - 3, 3.3, 3.3);
    if(o === sel){ doc.setFillColor(...AZUL); doc.rect(x + 0.6, y - 2.4, 2.1, 2.1, 'F'); }
    doc.setTextColor(...(o === sel ? AZUL : TINTA));
    doc.text(t, x + 4.8, y);
    x += w;
  });
  return y + 6;
}
/* Respuesta escrita sobre renglones: tantos renglones como necesite el texto */
function pdfRenglones(doc, b, y, x0, texto, minLineas){
  fuente(doc, 'normal', 9.5);
  const lines = texto ? renglones(doc, pdfTxt(texto), PW - MX - x0 - 2) : [];
  const n = Math.max(lines.length, minLineas || 1);
  for(let i = 0; i < n; i++){
    y = pdfEspacio(doc, b, y, 7);
    fuente(doc, 'normal', 9.5, TINTA);
    if(lines[i]) doc.text(lines[i], x0 + 1, y + 4);
    doc.setDrawColor(...LINEA); doc.setLineWidth(0.25); doc.line(x0, y + 5.4, PW - MX, y + 5.4);
    y += 6.6;
  }
  return y + 2;
}
function pdfPregunta(doc, b, y, n, label, c, d){
  const xT = MX + 7;
  fuente(doc, 'normal', 10);
  const ql = renglones(doc, pdfTxt(label), PW - MX - xT);
  y = pdfEspacio(doc, b, y, ql.length * 4.4 + 12);
  fuente(doc, 'normal', 10, TINTA);
  if(n) doc.text(n + '.', MX + 1.5, y);
  ql.forEach((l, j) => doc.text(l, xT, y + j * 4.4));
  y += ql.length * 4.4 + 1.2;
  const v = d[c.id];
  if(c.t === 'seg') return pdfCasillas(doc, b, y + 1, xT, c.op, v) + 1.5;
  if(c.t === 'lista'){
    const arr = (Array.isArray(v) ? v : []).filter(x => x && String(x).trim());
    const items = arr.length ? arr : ['', '', ''];
    items.forEach(it => {
      fuente(doc, 'normal', 9.5);
      const ls = it ? renglones(doc, pdfTxt(it), PW - MX - xT - 6) : [''];
      ls.forEach((l, j) => {
        y = pdfEspacio(doc, b, y, 6);
        fuente(doc, 'normal', 9.5, TINTA);
        if(j === 0){ doc.setFillColor(...TINTA); doc.circle(xT + 1.2, y + 2.6, 0.7, 'F'); }
        doc.text(l, xT + 4.5, y + 3.6);
        if(!it){ doc.setDrawColor(...LINEA); doc.line(xT + 4.5, y + 4.4, PW - MX, y + 4.4); }
        y += 4.4;
      });
      y += 1.6;
    });
    return y + 2;
  }
  return pdfRenglones(doc, b, y, xT, valorTexto(c, d), c.t === 'area' ? 2 : 1) + 2.5;
}

function generarPDF(b, cv){
  if(!window.jspdf || !window.jspdf.jsPDF) throw new Error('No cargó el generador de PDF. Revisa tu conexión y recarga la página.');
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF({ unit:'mm', format:'letter', orientation:'portrait' });
  const d = b.d || {};
  cv = cv || { doc:null, fotos:[] };
  let y = pdfMembrete(doc, b, true);

  fuente(doc, 'bold', 14, TINTA);
  doc.text('FORMATO DE ENTREVISTA - PRIMER FILTRO', PW / 2, y, { align:'center' });
  y += 8;
  const par = (et, val, x, yy, derecha) => {
    fuente(doc, 'normal', 9.5); const t = pdfTxt(val); const wv = doc.getTextWidth(t);
    fuente(doc, 'bold', 9.5); const we = doc.getTextWidth(et);
    const x0 = derecha ? x - wv - we : x;
    doc.text(et, x0, yy); fuente(doc, 'normal', 9.5); doc.text(t, x0 + we, yy);
  };
  doc.setTextColor(...TINTA);
  par('Modalidad: ', 'Formulario en línea (llenado por el candidato)', MX, y);
  par('Fecha de llenado: ', fechaFormato(b.fecha || hoyISO()), PW - MX, y, true);
  y += 5;
  par('CV adjunto: ', resumenCV(cv) + ((cv.doc || cv.fotos.length) ? ' - en la carpeta del candidato' : ''), MX, y);
  y += 8;

  /* I. Datos generales: cuadro */
  y = pdfTituloSec(doc, b, y, 'I. ' + PDF_SECS.I);
  const items = [];
  CARDS.filter(card => card.fs === 'I').forEach(card => {
    if(!cardVisible(card, d)) return;
    if(card.band) items.push({ band:true, l:card.band });
    card.campos.forEach(c => {
      if(!c.id || c.nopdf || !visible(c, d)) return;
      items.push({ l:etiquetaPDF(c, d), v:valorTexto(c, d), span:c.ps || 1 });
    });
  });
  /* Pretensiones económicas va en el cuadro, como en el formato */
  let ib = items.findIndex(i => i.band); if(ib < 0) ib = items.length;
  todos().filter(c => c.inGrid && visible(c, d)).forEach(c => items.splice(ib++, 0, { l:etiquetaPDF(c, d), v:valorTexto(c, d), span:c.ps || 1 }));
  y = pdfGrid(doc, b, y, items, 4);

  /* II, III, IV: preguntas */
  ['II','III','IV'].forEach(fs => {
    y = pdfTituloSec(doc, b, y, fs + '. ' + PDF_SECS[fs]);
    let n = 0;
    CARDS.filter(card => card.fs === fs).forEach(card => card.campos.forEach(c => {
      if(!c.id || c.inGrid || !visible(c, d)) return;
      const numerar = (fs === 'II' || fs === 'III') && !c.sub;
      if(numerar) n++;
      let lab = etiquetaPDF(c, d);
      if(c.id === 'aceptaSueldo' && sueldoVacante(d)) lab += ' (' + sueldoVacante(d) + ')';
      y = pdfPregunta(doc, b, y, numerar ? n : '', lab, c, d);
    }));
    y += 3;
  });

  /* V: resultado, para Recursos Humanos (en blanco) */
  y = pdfEspacio(doc, b, y, 50);
  y = pdfBandaOscura(doc, b, y, 'Para uso exclusivo de Recursos Humanos') + 9;
  y = pdfTituloSec(doc, b, y, 'V. ' + PDF_SECS.VI);
  y = pdfCasillas(doc, b, y + 2, MX + 2, ['Avanza a entrevista presencial', 'Descartado(a)'], null) + 2;
  y = pdfEspacio(doc, b, y, 22);
  fuente(doc, 'normal', 10, TINTA); doc.text('Motivo (si es descartado):', MX + 2, y + 2); y += 3;
  y = pdfRenglones(doc, b, y, MX + 2, '', 2) + 4;

  pdfPies(doc, b);
  return doc;
}
function nombrePDF(b){ return b.folio + ' - Primer filtro - ' + slugNombre(b.d.nombre) + '.pdf'; }

/* ================== ENVIO ================== */
async function enviarSolicitud(b, cv, prog){
  if(!b.folio){
    prog('Asignando tu folio…', 'Un momento, por favor.');
    b.folio = await pedirFolio();
    guardarBorrador(b);
  }
  if(!b.fecha){ b.fecha = hoyISO(); guardarBorrador(b); }
  prog('Generando tu formato…', 'Armando el documento con tus respuestas.');
  const doc = generarPDF(b, cv);
  const s = doc.output('datauristring');
  const pdf = { name:nombrePDF(b), data:s.slice(s.indexOf('base64,') + 7) };

  prog('Enviando tus respuestas…', 'No cierres esta página.');
  await postServidor({
    accion:'entrevista', id:b.id, folio:b.folio, hp:b.hp || '',
    nombre:b.d.nombre || '', puesto:puestoFinal(b.d), cv:resumenCV(cv),
    columnas:columnasSheet(b), pdf
  });

  const arch = await archivoCV(cv, b);
  if(arch){
    prog('Subiendo tu CV…', 'Puede tardar un poco si el archivo es grande.');
    await postServidor({ accion:'archivo', id:b.id, folio:b.folio, archivo:arch });
  }
  return doc;
}
