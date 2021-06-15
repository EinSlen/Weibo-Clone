export function emailValidator(email) {
  const re = /\S+@\S+\.\S+/
  if (!email) return "L'Email ne peut pas être vide."
  if (!re.test(email)) return "Ooops! Nous avons besoin d'une adresse e-mail valide."
  return ''
}
