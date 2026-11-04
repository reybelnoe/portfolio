/* Selector de idioma (home y about): EN (por defecto) ↔ ES.
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
    'footer.impressum': 'aviso legal',

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

  function apply(lang) {
    const es = lang === 'es';
    textEls.forEach(el => { el.textContent = es ? ES[el.dataset.i18n] : el.dataset.en; });
    altEls.forEach(el => { el.setAttribute('alt', es ? ES[el.dataset.i18nAlt] : el.dataset.enAlt); });
    document.documentElement.lang = es ? 'es' : 'en';
    if (esTitle) document.title = es ? esTitle : original.title;
    if (metaDesc && esDesc) metaDesc.setAttribute('content', es ? esDesc : original.description);
    btn.textContent = es ? 'EN' : 'ES';
    btn.setAttribute('aria-label', es ? 'Switch to English' : 'Cambiar a español');
    btn.setAttribute('lang', es ? 'en' : 'es');
  }

  function read() { try { return localStorage.getItem(STORAGE_KEY); } catch (e) { return null; } }
  function write(v) { try { localStorage.setItem(STORAGE_KEY, v); } catch (e) { /* sin almacenamiento */ } }

  let current = read() === 'es' ? 'es' : 'en';
  apply(current);

  btn.addEventListener('click', () => {
    current = current === 'es' ? 'en' : 'es';
    apply(current);
    write(current);
  });
})();
