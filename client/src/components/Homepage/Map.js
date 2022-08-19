import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

const Map = () => {
  return (
    <MapContainer center={[-26.5, 133]} zoom={5} scrollWheelZoom={false}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={[-32.390945191928, 118.75508272649]}>
        <Popup>
          Nyaki Nyaki / Njaki Njaki <br /> Now it is displaying!
        </Popup>
      </Marker>
    </MapContainer>
  );
};

export default Map;
