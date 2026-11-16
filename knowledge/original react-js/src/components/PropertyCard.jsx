export function PropertyCard({ title, location, price, image}) {
  return (
    <article className="property-card">
      <img
        src={image}
        alt={title} 
      />
      <div className="property-card-content">
        <h2>{title}</h2>
        <p>{location}</p>
        <strong>${price}</strong>
      </div>
    </article>
  );
}
