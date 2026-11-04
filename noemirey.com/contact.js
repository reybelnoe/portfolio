/* Formulario de contacto → Web3Forms (https://web3forms.com).
   Sin JavaScript el formulario se envía igualmente por POST normal (action). */
(function () {
  const form = document.getElementById('contact-form');
  if (!form) return;

  const ENDPOINT = form.getAttribute('action');
  const sendBtn = form.querySelector('.cform__send');
  const status = {
    sending: document.getElementById('status-sending'),
    sent: document.getElementById('status-sent'),
    error: document.getElementById('status-error')
  };

  function show(which) {
    Object.keys(status).forEach(k => { status[k].hidden = k !== which; });
  }

  /* "I don't know yet" desactiva y vacía el campo asociado */
  function link(unknownId, fieldId) {
    const box = document.getElementById(unknownId);
    const field = document.getElementById(fieldId);
    box.addEventListener('change', () => {
      field.disabled = box.checked;
      if (box.checked) field.value = '';
    });
  }
  link('f-date-unknown', 'f-date');
  link('f-venue-unknown', 'f-venue');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (!form.reportValidity()) return;

    /* Anti-spam: si la casilla trampa está marcada, fingimos éxito sin enviar */
    if (form.elements.botcheck.checked) { show('sent'); return; }

    const fd = new FormData(form);
    const dateUnknown = form.elements.date_unknown.checked;
    const venueUnknown = form.elements.venue_unknown.checked;
    const payload = {
      access_key: fd.get('access_key'),
      subject: fd.get('subject'),
      from_name: fd.get('from_name'),
      name: fd.get('name'),
      email: fd.get('email'),
      wedding_date: dateUnknown ? "I don't know yet" : (fd.get('wedding_date') || ''),
      venue: venueUnknown ? "I don't know yet" : (fd.get('venue') || ''),
      coverage: fd.get('coverage') || '',
      extras: fd.getAll('extras').join(', '),
      message: fd.get('message') || '',
      how_found: fd.get('how_found') || '',
      privacy_policy_accepted: 'yes'
    };

    sendBtn.disabled = true;
    show('sending');
    try {
      const res = await fetch(ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify(payload)
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok && data.success) {
        form.reset();
        form.querySelectorAll('input[disabled]').forEach(i => { i.disabled = false; });
        show('sent');
      } else {
        show('error');
      }
    } catch (err) {
      show('error');
    } finally {
      sendBtn.disabled = false;
    }
  });
})();
