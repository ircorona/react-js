import type { Property } from "../types/property";

export function filterProperties(
  properties: Property[],
  searchText: string,
): Property[] {
  const normalizedSearchText = searchText.toLowerCase();

  if (!normalizedSearchText) {
    return properties;
  }

  return properties.filter((property) => {
    return (
      property.title.toLowerCase().includes(normalizedSearchText) ||
      property.location.toLowerCase().includes(normalizedSearchText) ||
      (property.type?.toLowerCase().includes(normalizedSearchText) ?? false)
    );
  });

}