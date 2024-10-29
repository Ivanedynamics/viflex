export function capitalizeText(text?: string | undefined) {
  if (!text) return;
  return text
    .toLowerCase() // Convierte todo el texto a minúsculas primero
    .replace(/\b\w/g, (char) => char.toUpperCase()); // Capitaliza la primera letra de cada palabra
}
