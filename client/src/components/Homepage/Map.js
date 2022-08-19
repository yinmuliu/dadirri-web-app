import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

const Map = () => {
  const [languages, setLanguages] = useState(null);
  const getLanguages = async () => {
    const url =
      "https://data.gov.au/data/api/3/action/datastore_search_sql?sql=SELECT%20*%20from%20%22e9a9ea06-d821-4b53-a05f-877409a1a19c%22";
    const res = await fetch(url);
    const data = await res.json();
    console.log(data.result.records);
    setLanguages(data.result.records);
    console.log(languages);
  };

  useEffect(() => {
    getLanguages();
  }, []);

  return (
    <MapContainer center={[-26.5, 133]} zoom={5} scrollWheelZoom={false}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {languages &&
        languages.map((lang) => (
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
