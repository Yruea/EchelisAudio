// Form submissions go to Formspree (https://formspree.io). The form ID is a
// public identifier, not a secret. Both site forms share one Formspree form;
// each entry carries a `form` field and subject so they can be told apart.
const FORMSPREE_FORM_ID = 'xoedjgob';

const FORMS = {
  earlyAccess: { label: 'early-access', subject: 'New early-access signup' },
  contact: { label: 'contact', subject: 'New contact message' },
};

export async function submitForm(form, fields) {
  const config = FORMS[form];
  if (!config) throw new Error(`Unknown form "${form}"`);
  // Honeypot: bots fill this hidden field; report success and send nothing.
  if (fields._gotcha) return;
  const res = await fetch(`https://formspree.io/f/${FORMSPREE_FORM_ID}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify({ ...fields, form: config.label, _subject: config.subject }),
  });
  if (!res.ok) throw new Error(`Form submission failed (${res.status})`);
}
