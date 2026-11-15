// Form submissions go to Formspree (https://formspree.io). The form IDs are
// public identifiers, not secrets. Leave an ID empty to disable that form:
// it then shows an error instead of pretending the submission worked.
const FORMSPREE_FORMS = {
  earlyAccess: '',
  contact: '',
};

export async function submitForm(form, fields) {
  const id = FORMSPREE_FORMS[form];
  if (!id) throw new Error(`Form "${form}" is not configured`);
  // Honeypot: bots fill this hidden field; report success and send nothing.
  if (fields._gotcha) return;
  const res = await fetch(`https://formspree.io/f/${id}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify(fields),
  });
  if (!res.ok) throw new Error(`Form submission failed (${res.status})`);
}
