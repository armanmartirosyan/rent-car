import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import type { Car } from '../types'
import { ContactButtons } from './ContactButtons'

interface CarCardProps {
  car: Car
}

interface GalleryNavProps {
  images: string[]
  activeImage: number
  onPrev: () => void
  onNext: () => void
  onSelect: (index: number) => void
}

function GalleryNav({ images, activeImage, onPrev, onNext, onSelect }: GalleryNavProps) {
  if (images.length <= 1) return null

  return (
    <>
      <button
        type="button"
        className="car-card__nav car-card__nav--prev"
        onClick={onPrev}
        aria-label="Previous photo"
      >
        ‹
      </button>
      <button
        type="button"
        className="car-card__nav car-card__nav--next"
        onClick={onNext}
        aria-label="Next photo"
      >
        ›
      </button>
      <div className="car-card__dots">
        {images.map((image, index) => (
          <button
            type="button"
            key={image + index}
            className={`car-card__dot${index === activeImage ? ' car-card__dot--active' : ''}`}
            onClick={() => onSelect(index)}
            aria-label={`Show photo ${index + 1}`}
          />
        ))}
      </div>
    </>
  )
}

export function CarCard({ car }: CarCardProps) {
  const [activeImage, setActiveImage] = useState(0)
  const [isZoomed, setIsZoomed] = useState(false)
  const images = car.images.length > 0 ? car.images : ['/cars/placeholder.svg']

  const showPrev = () => setActiveImage((i) => (i - 1 + images.length) % images.length)
  const showNext = () => setActiveImage((i) => (i + 1) % images.length)

  useEffect(() => {
    if (!isZoomed) return

    document.body.style.overflow = 'hidden'
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsZoomed(false)
      if (e.key === 'ArrowLeft') setActiveImage((i) => (i - 1 + images.length) % images.length)
      if (e.key === 'ArrowRight') setActiveImage((i) => (i + 1) % images.length)
    }
    window.addEventListener('keydown', onKeyDown)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [isZoomed, images.length])

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    e.currentTarget.onerror = null
    e.currentTarget.src = '/cars/placeholder.svg'
  }

  return (
    <article className="car-card">
      <div className="car-card__gallery">
        <img
          className="car-card__image"
          src={images[activeImage]}
          alt={`${car.name} photo ${activeImage + 1} of ${images.length}`}
          loading="lazy"
          onError={handleImageError}
          onClick={() => setIsZoomed(true)}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') setIsZoomed(true)
          }}
        />
        <GalleryNav
          images={images}
          activeImage={activeImage}
          onPrev={showPrev}
          onNext={showNext}
          onSelect={setActiveImage}
        />
      </div>
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

      {isZoomed &&
        createPortal(
          <div className="lightbox" onClick={() => setIsZoomed(false)}>
            <div className="lightbox__content" onClick={(e) => e.stopPropagation()}>
              <button
                type="button"
                className="lightbox__close"
                onClick={() => setIsZoomed(false)}
                aria-label="Close"
              >
                ×
              </button>
              <div className="lightbox__gallery car-card__gallery">
                <img
                  className="lightbox__image"
                  src={images[activeImage]}
                  alt={`${car.name} photo ${activeImage + 1} of ${images.length}`}
                  onError={handleImageError}
                />
                <GalleryNav
                  images={images}
                  activeImage={activeImage}
                  onPrev={showPrev}
                  onNext={showNext}
                  onSelect={setActiveImage}
                />
              </div>
              <div className="lightbox__panel">
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
            </div>
          </div>,
          document.body,
        )}
    </article>
  )
}
