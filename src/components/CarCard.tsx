import type { Car } from '../types'
import { ContactButtons } from './ContactButtons'

interface CarCardProps {
  car: Car
}

export function CarCard({ car }: CarCardProps) {
  return (
    <article className="car-card">
      <img className="car-card__image" src={car.image} alt={car.name} loading="lazy" />
      <div className="car-card__body">
        <div className="car-card__header">
          <h2>{car.name}</h2>
          <span className="car-card__year">{car.year}</span>
        </div>
        <div className="car-card__meta">
          <span className="car-card__tag">{car.category}</span>
          <span className="car-card__tag">{car.transmission}</span>
        </div>
        <p className="car-card__description">{car.description}</p>
        <p className="car-card__price">
          {car.pricePerDay} {car.currency} <span>/ day</span>
        </p>
        <ContactButtons car={car} />
      </div>
    </article>
  )
}
