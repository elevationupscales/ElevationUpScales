export function cleanString(value, max = 500) {
  return String(value ?? "").trim().slice(0, max);
}

export function cleanList(value, maxItems = 40, maxItemLength = 220) {
  if (!Array.isArray(value)) return [];

  return value
    .slice(0, maxItems)
    .map((item) => cleanString(item, maxItemLength))
    .filter(Boolean);
}

export function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(value || ""));
}

export function configuredEmail(value) {
  const raw = cleanString(value, 240).trim();

  if (!raw) return "";
  if (isValidEmail(raw)) return raw.toLowerCase();

  const match = raw.match(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i);

  return match && isValidEmail(match[0])
    ? match[0].toLowerCase()
    : "";
}

export function isValidPhone(value) {
  const text = String(value || "").trim();
  const digits = text.replace(/\D/g, "");

  return (
    /^[0-9+().\-\s]{7,30}$/.test(text) &&
    digits.length >= 7 &&
    digits.length <= 15
  );
}

export function hasBasicContact(contact) {
  return Boolean(
    contact?.name &&
    contact?.consent &&
    (
      isValidPhone(contact?.phone) ||
      isValidEmail(contact?.email)
    ),
  );
}

export function hasEarlySolarContact(contact) {
  return Boolean(
    contact?.consent &&
    (
      isValidPhone(contact?.phone) ||
      isValidEmail(contact?.email)
    ),
  );
}
