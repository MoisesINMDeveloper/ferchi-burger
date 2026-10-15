const whatsappNumber = '584124676968'

export function getWhatsAppUrl(message) {
  const messageQuery = message ? `?text=${encodeURIComponent(message)}` : ''
  return `https://wa.me/${whatsappNumber}${messageQuery}`
}
