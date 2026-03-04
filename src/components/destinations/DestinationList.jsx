import DestinationCard from "./DestinationCard";

function DestinationList({ destinations }) {
  return (
    <div>
      {destinations.map((item) => (
        <DestinationCard key={item.id} destination={item} />
      ))}
    </div>
  );
}

export default DestinationList;