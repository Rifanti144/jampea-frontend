function DestinationCard({ destination }) {
  return (
    <div style={{ marginBottom: "20px" }}>
      <h3>{destination.nama}</h3>
      <p>{destination.deskripsi}</p>
    </div>
  );
}

export default DestinationCard;