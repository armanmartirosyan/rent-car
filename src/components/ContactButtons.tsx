import { contact } from '../data/contact'
import type { Car } from '../types'

interface ContactButtonsProps {
  car: Car
}

function buildMessage(car: Car) {
  return `Hi! I'm interested in renting the ${car.name} (${car.year}).`
}

export function ContactButtons({ car }: ContactButtonsProps) {
  const message = encodeURIComponent(buildMessage(car))
  const whatsappDigits = contact.whatsapp.replace(/[^\d]/g, '')

  const links = [
    {
      label: 'Call',
      href: `tel:${contact.phone}`,
      className: 'contact-btn contact-btn--call',
    },
    {
      label: 'WhatsApp',
      href: `https://wa.me/${whatsappDigits}?text=${message}`,
      className: 'contact-btn contact-btn--whatsapp',
    },
    {
      label: 'Telegram',
      href: `https://t.me/${contact.telegram}`,
      className: 'contact-btn contact-btn--telegram',
    },
    {
      label: 'Instagram',
      href: `https://instagram.com/${contact.instagram}`,
      className: 'contact-btn contact-btn--instagram',
    },
  ]

  return (
    <div className="contact-buttons">
      {links.map((link) => (
        <a
          key={link.label}
          href={link.href}
          className={link.className}
          target="_blank"
          rel="noopener noreferrer"
        >
          {link.label}
        </a>
      ))}
    </div>
  )
}
