interface SearchBarProps {
  query: string
  onQueryChange: (value: string) => void
  category: string
  categories: string[]
  onCategoryChange: (value: string) => void
}

export function SearchBar({
  query,
  onQueryChange,
  category,
  categories,
  onCategoryChange,
}: SearchBarProps) {
  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Search cars by name..."
        value={query}
        onChange={(e) => onQueryChange(e.target.value)}
        className="search-bar__input"
      />
      <select
        value={category}
        onChange={(e) => onCategoryChange(e.target.value)}
        className="search-bar__select"
      >
        <option value="">All categories</option>
        {categories.map((c) => (
          <option key={c} value={c}>
            {c}
          </option>
        ))}
      </select>
    </div>
  )
}
