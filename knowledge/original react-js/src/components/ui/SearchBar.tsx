import type { ChangeEvent, SubmitEvent } from "react";

interface SearchBarProps {
  value: string;
  searchValue: string;
  onChange: (value: string) => void;
  onSearch: (value: string) => void;
  onClear: () => void;
}

export function SearchBar({
  value,
  searchValue,
  onChange,
  onSearch,
  onClear,
}: SearchBarProps) {

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    onChange(event.target.value);
  }

  function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    onSearch(value.trim());
  }

  return (
    <>
      <form className="search-section" onSubmit={handleSubmit}>
        <label>
          Ciudad
          <span className="city-input-wrapper">
            <input 
            type="text" 
            placeholder="Santiago, Chile" 
            value={value}
            onChange={handleChange}
            />
            {(value || searchValue) && (
              <button 
                type="button"
                className="clear-city-button"
                onClick={onClear}
              >
                X
              </button>
            )}
          </span>
        </label>
        <label>
          Tipo
          <input type="text" placeholder="Apartamento" />
        </label>
        <label>
          Huéspedes
          <input type="number" placeholder="2" />
        </label>
        <button type="submit">Buscar</button>
      </form>
      <p className="current-search">
        Resultados de búsqueda: <strong>{searchValue || "ninguna ciudad"}</strong>.
      </p>
    </>
  );
}
