/** Nomor WhatsApp admin Sasak Bike (format lokal Indonesia) */
export const WHATSAPP_NUMBER = "083112282090";

/** Format internasional untuk wa.me / api.whatsapp.com (tanpa +) */
export function getWhatsAppInternationalNumber(): string {
  const digitsOnly = WHATSAPP_NUMBER.replace(/\D/g, "");

  if (digitsOnly.startsWith("62")) return digitsOnly;
  if (digitsOnly.startsWith("08")) return `62${digitsOnly.slice(1)}`;
  if (digitsOnly.startsWith("8")) return `62${digitsOnly}`;

  return digitsOnly;
}

export function buildWhatsAppUrl(message: string): string {
  const phone = getWhatsAppInternationalNumber();
  return `https://api.whatsapp.com/send?phone=${phone}&text=${encodeURIComponent(message)}`;
}

export function formatWhatsAppDisplay(): string {
  const intl = getWhatsAppInternationalNumber();
  if (intl.startsWith("62") && intl.length >= 11) {
    const local = `0${intl.slice(2)}`;
    return `+62 ${local.slice(1, 4)}-${local.slice(4, 8)}-${local.slice(8)}`;
  }
  return WHATSAPP_NUMBER;
}
