/* Selector de idioma (home, about, contact, aviso legal y privacidad): EN (por defecto) ↔ ES.
   - Los textos con data-i18n="clave" y los alt con data-i18n-alt="clave"
     se sustituyen por su traducción; el original en inglés se guarda para volver.
   - El título principal (h1 "Wedding photographer") no lleva data-i18n: no se traduce.
   - La elección se recuerda en localStorage (si el navegador lo permite). */
(function () {
  const ES = {
    'home.title': 'Noemí Rey — Fotógrafa de bodas en Ibiza',
    'home.description': 'Noemí Rey, fotógrafa de bodas con base en Ibiza. Documental, cálida, un poco editorial. Cobertura honesta y cinematográfica de tu día.',

    'nav.about': 'sobre mí',
    'nav.contact': 'contacto',
    'footer.legal': 'aviso legal',
    'footer.privacy': 'privacidad',

    'legal.title': 'Noemí Rey — Aviso legal',
    'legal.h1': 'Aviso legal',
    'legal.owner': 'Titular del sitio web',
    'legal.name': 'Nombre:',
    'legal.address': 'Dirección:',
    'legal.addressValue': "Puig d'en Valls, Santa Eulalia des Riu, Ibiza, Islas Baleares, España",
    'legal.email': 'Correo electrónico:',
    'legal.activity': 'Actividad:',
    'legal.activityValue': 'Fotografía de bodas',
    'legal.useH': 'Objeto y condiciones de uso',
    'legal.useP': 'Este sitio web presenta el trabajo fotográfico de Noemí Rey y permite a las personas que lo visitan consultar por sus servicios. Su uso implica la aceptación de estas condiciones. La titular puede modificar el contenido del sitio o estas condiciones en cualquier momento.',
    'legal.ipH': 'Propiedad intelectual',
    'legal.ipP': 'Las fotografías, los textos y el diseño de este sitio web están protegidos por la legislación de propiedad intelectual y son © Noemí Rey. No pueden reproducirse, distribuirse, modificarse ni usarse con fines comerciales sin autorización previa y por escrito.',
    'legal.liabH': 'Responsabilidad',
    'legal.liabP': 'El contenido se ofrece solo con fines informativos. La titular no garantiza que el sitio esté siempre disponible ni libre de errores, y no se responsabiliza de los daños derivados de su uso ni de los enlaces a sitios web externos.',
    'legal.lawH': 'Legislación aplicable',
    'legal.lawP': 'Estas condiciones se rigen por la legislación española. Cualquier controversia se resolverá ante los juzgados y tribunales competentes conforme a la ley aplicable.',
    'legal.updated': 'Última actualización: 4 de noviembre de 2026',

    'privacy.title': 'Noemí Rey — Política de privacidad',
    'privacy.h1': 'Política de privacidad',
    'privacy.controllerH': 'Responsable del tratamiento de tus datos',
    'privacy.dataH': 'Qué datos recojo y para qué',
    'privacy.dataP': 'Cuando usas el formulario de contacto recibo los datos que escribes: nombre, correo electrónico, fecha y lugar de la boda, la cobertura que te interesa, los servicios adicionales, tu mensaje y cómo me encontraste. Los uso únicamente para responder a tu consulta y, si decides contratarme, para preparar el servicio.',
    'privacy.basisH': 'Base legal',
    'privacy.basisP': 'Tu consentimiento, que das al marcar la casilla del formulario, y, en su caso, la aplicación de medidas precontractuales a petición tuya.',
    'privacy.recipientsH': 'Quién recibe tus datos',
    'privacy.recipientsP': 'El formulario se envía a través de Web3Forms, un proveedor de formularios, para que el mensaje llegue a mi correo. No vendo tus datos. Además de ese proveedor y de mi proveedor de correo, nadie más los recibe, salvo que la ley lo exija.',
    'privacy.keepH': 'Cuánto tiempo los conservo',
    'privacy.keepP': 'Mientras sean necesarios para atender tu consulta y, después, solo durante los plazos que exija la ley.',
    'privacy.rightsH': 'Tus derechos',
    'privacy.rightsP': 'Puedes solicitar el acceso, la rectificación, la supresión, la limitación, la oposición y la portabilidad de tus datos, y retirar tu consentimiento en cualquier momento, escribiendo a',
    'privacy.complaintP': 'Si crees que no se han respetado tus derechos, puedes reclamar ante la Agencia Española de Protección de Datos:',
    'privacy.cookiesH': 'Cookies y almacenamiento local',
    'privacy.cookiesP': 'Esta web no utiliza cookies de seguimiento ni de publicidad. Solo guarda en tu navegador el idioma que eliges, para recordarlo. Esa información se queda en tu dispositivo.',

    'strip.prev': 'Foto anterior',
    'strip.next': 'Foto siguiente',

    'contact.name': 'Nombre',
    'contact.email': 'Correo electrónico',
    'contact.date': 'Fecha de la boda',
    'contact.venue': 'Lugar o zona',
    'contact.unknown': 'Aún no lo sé',
    'contact.coverage': 'Cobertura',
    'contact.cov8.t': '8 horas',
    'contact.cov8.d': 'Preparativos, ceremonia, cóctel y cena.',
    'contact.cov10.t': '10 horas',
    'contact.cov10.d': 'Añade el primer baile y el inicio de la fiesta.',
    'contact.cov14.t': '14 horas',
    'contact.cov14.d': 'El día completo, desde los preparativos de la mañana hasta bien entrada la fiesta.',
    'contact.covq.t': 'Aún no lo sé',
    'contact.covq.d': 'Cuéntame cómo es vuestro día y te sugeriré lo que mejor encaje.',
    'contact.extras': '¿Quieres que cubra algo más?',
    'contact.extra1': 'Fiesta de bienvenida o el día antes',
    'contact.extra2': 'Brunch o fiesta en la piscina del día después',
    'contact.message': 'Mensaje',
    'contact.found': '¿Cómo me encontraste?',
    'contact.consent': 'He leído y acepto la',
    'contact.consentLink': 'política de privacidad',
    'contact.send': 'Enviar',
    'contact.sending': 'Enviando…',
    'contact.sent': 'Gracias, tu mensaje se ha enviado. Te responderé pronto.',
    'contact.error': 'No se ha podido enviar tu mensaje. Inténtalo de nuevo o escribe a',

    'about.p1': 'Soy Noemi Rey. Desde muy joven me han atraído la fotografía, las historias y el cine, y estudié fotografía en la EASD de Valencia.',
    'about.p2': 'Lo que más me gusta de la fotografía no es la imagen suelta, sino lo que ocurre cuando las imágenes se colocan unas junto a otras: sola, una fotografía dice una cosa; juntas, empiezan a contar una historia. Una boda está hecha de ese tipo de momentos, pequeñas cosas que solo significan algo en secuencia. Intento fotografiar el día de modo que la galería se lea como una sola historia, desde los primeros momentos de la mañana hasta la fiesta.',

    'intro.tagline': 'Cálida, documental, un poco editorial.',
    'intro.p1': 'Fotografío las bodas tal y como suceden. Me quedo cerca, en silencio, y espero a los momentos que nadie ha planeado. Cuando la luz es la adecuada o un encuadre merece prepararse, me tomo un minuto para ello, pero no voy a convertir tu día en una sesión de fotos.',
    'intro.p2': 'El resultado es honesto y un poco cinematográfico: luz suave, sombras abiertas, color cálido con aspecto de película. También trabajo en rodajes de cine, lo que me enseñó a observar a la gente cuando se olvida de que la cámara está ahí.',

    'based.heading': 'Con base en Ibiza',
    'based.p': 'Nací aquí, así que sé cómo se mueve la luz por la isla y cómo planificar en torno a ella: la hora dorada en la costa, un jardín con sombra al mediodía, una villa de noche.',

    'ready.title': 'Preparativos',
    'ready.p': 'La parte tranquila del día. Alguien se maquilla, otra persona se arregla una horquilla y todavía nadie actúa. Me quedo en un borde de la habitación y dejo que ocurra.',
    'ceremony.title': 'Ceremonia',
    'ceremony.p': 'El paseo de vuelta por el pasillo, bajo los pétalos que lanzan quienes han venido a veros. Es este minuto el que más me interesa, cuando ya se han dicho los votos y vosotros dos todavía estáis asimilando lo que acaba de pasar.',
    'party.title': 'Cena y fiesta',
    'party.p': 'Cuando anochece uso el flash directo a propósito. Da ese aspecto ligeramente vintage, de foto de fiesta de otra época, con la luz cayendo sobre quien esté haciendo algo que merezca la pena mirar. Aquí, un regalo de boda al abrirse.',

    'cta.pre': '¿Os casáis en Ibiza?',
    'cta.title': 'Cuéntame la fecha, el lugar y un poco sobre vosotros dos.',
    'cta.link': 'Consultar disponibilidad',

    'alt.hero': 'Los novios cogidos de la mano durante el intercambio de anillos en la ceremonia al aire libre',
    'alt.trio1': 'Retrato en blanco y negro de la novia con vestido de encaje y el pelo rizado',
    'alt.trio2': 'Los novios salen de la ceremonia bajo una lluvia de pétalos blancos',
    'alt.trio3': 'Detalle del encaje del vestido de novia con luz cálida y dorada',
    'alt.ready': 'La novia se pone los pendientes rodeada de sus damas, reflejadas en un gran espejo',
    'alt.ceremony': 'Los novios salen de la ceremonia bajo una lluvia de pétalos blancos; ella lleva un ramo de flores rojas y naranjas',
    'alt.party': 'La novia baila de noche con los brazos en alto, con luces de fondo',
    'alt.strip1': 'La novia se maquilla reflejada en el espejo del vestidor',
    'alt.strip2': 'Invitada con vestido negro de pie junto a una ventana abierta con vistas al jardín',
    'alt.strip3': 'Invitada con el pelo morado descansando en una cama del dormitorio de la villa',
    'alt.strip4': 'Invitada con el pelo morado pintándose los labios frente a un espejo',
    'alt.strip5': 'Pareja sentada junta a la mesa de la cena, de noche, con un centro de flores'
  };

  const STORAGE_KEY = 'noemirey-lang';
  const btn = document.getElementById('lang-toggle');
  if (!btn) return;

  const textEls = document.querySelectorAll('[data-i18n]');
  const altEls = document.querySelectorAll('[data-i18n-alt]');
  const ariaEls = document.querySelectorAll('[data-i18n-aria]');
  const metaDesc = document.querySelector('meta[name="description"]');
  /* Título y descripción solo se traducen en las páginas que tienen claves
     '<página>.title' / '<página>.description' (ahora solo la home). */
  const page = document.body.dataset.page;
  const esTitle = page && ES[page + '.title'];
  const esDesc = page && ES[page + '.description'];
  const original = {
    title: document.title,
    description: metaDesc ? metaDesc.getAttribute('content') : ''
  };

  textEls.forEach(el => { el.dataset.en = el.textContent; });
  altEls.forEach(el => { el.dataset.enAlt = el.getAttribute('alt'); });
  ariaEls.forEach(el => { el.dataset.enAria = el.getAttribute('aria-label'); });

  function apply(lang) {
    const es = lang === 'es';
    textEls.forEach(el => { el.textContent = es ? ES[el.dataset.i18n] : el.dataset.en; });
    altEls.forEach(el => { el.setAttribute('alt', es ? ES[el.dataset.i18nAlt] : el.dataset.enAlt); });
    ariaEls.forEach(el => { el.setAttribute('aria-label', es ? ES[el.dataset.i18nAria] : el.dataset.enAria); });
    document.documentElement.lang = es ? 'es' : 'en';
    if (esTitle) document.title = es ? esTitle : original.title;
    if (metaDesc && esDesc) metaDesc.setAttribute('content', es ? esDesc : original.description);
    btn.textContent = es ? 'EN' : 'ES';
    btn.setAttribute('aria-label', es ? 'Switch to English' : 'Cambiar a español');
    btn.setAttribute('lang', es ? 'en' : 'es');
  }

  function read() { try { return localStorage.getItem(STORAGE_KEY); } catch (e) { return null; } }
  function write(v) { try { localStorage.setItem(STORAGE_KEY, v); } catch (e) { /* sin almacenamiento */ } }

  /* Idioma inicial: 1) la elección guardada al pulsar el botón; 2) si no hay,
     el idioma principal del navegador: español para es (es-ES, es-MX…) y para las
     lenguas de España (catalán, gallego, euskera, aranés, asturiano, aragonés);
     inglés para cualquier otro. Esta regla debe coincidir con la del script en
     línea de la cabecera de cada página. */
  const SPANISH_LANGS = /^(es|ca|gl|eu|oc|ast|an)(-|$)/;
  function detect() {
    const saved = read();
    if (saved === 'es' || saved === 'en') return saved;
    const langs = navigator.languages && navigator.languages.length ? navigator.languages : [navigator.language];
    return SPANISH_LANGS.test(String(langs[0] || '').toLowerCase()) ? 'es' : 'en';
  }

  let current = detect();
  apply(current);
  document.documentElement.classList.remove('i18n-pending');

  btn.addEventListener('click', () => {
    current = current === 'es' ? 'en' : 'es';
    apply(current);
    write(current);
  });
})();
