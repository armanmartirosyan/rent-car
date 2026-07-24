import { useMemo, useState } from 'react'
import carsData from './data/cars.json'
import type { Car } from './types'
import { CarCard } from './components/CarCard'
import { SearchBar } from './components/SearchBar'
import './App.css'

const cars = carsData as Car[]

function App() {
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('')

  const categories = useMemo(
    () => Array.from(new Set(cars.map((car) => car.category))),
    [],
  )

  const filteredCars = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase()
    return cars.filter((car) => {
      const matchesQuery = car.name.toLowerCase().includes(normalizedQuery)
      const matchesCategory = category === '' || car.category === category
      return matchesQuery && matchesCategory
    })
  }, [query, category])

  return (
    <div className="page">
      <header className="page__header">
        <h1>Rent a Car</h1>
        <p>Browse available cars and contact us directly to book.</p>
      </header>

      <SearchBar
        query={query}
        onQueryChange={setQuery}
        category={category}
        categories={categories}
        onCategoryChange={setCategory}
      />

      <main className="car-grid">
        {filteredCars.length === 0 ? (
          <p className="car-grid__empty">No cars match your search.</p>
        ) : (
          filteredCars.map((car) => <CarCard key={car.id} car={car} />)
        )}
      </main>
    </div>
  )
}

export default App
