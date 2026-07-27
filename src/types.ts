export interface Car {
  id: string
  name: string
  year: number
  category: string
  transmission: 'automatic' | 'manual'
  pricePerDay: number
  currency: string
  images: string[]
  description: string
}

export interface ContactInfo {
  phone: string
  whatsapp: string
  telegram: string
  instagram: string
}
