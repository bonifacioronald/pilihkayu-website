import settings from "@/content/settings.json";

export { settings };

/** WhatsApp link with an Indonesian pre-filled message. The number lives in content/settings.json. */
export function whatsappUrl(message: string = settings.whatsapp.defaultMessage) {
  return `https://wa.me/${settings.whatsapp.number}?text=${encodeURIComponent(message)}`;
}
