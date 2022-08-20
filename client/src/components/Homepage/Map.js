import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

const Map = ({ languages }) => {
  return (
    <MapContainer center={[-26.5, 133]} zoom={5} scrollWheelZoom={false}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {languages.map((lang) => (
        <Marker
          key={lang._id}
          position={[
            lang.approximate_latitude_of_language_variety,
            lang.approximate_longitude_of_language_variety,
          ]}
        >
          <Popup>
            {lang.language_name} <br /> {lang.language_code}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default Map;
