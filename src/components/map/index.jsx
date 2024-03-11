import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";

import styles from "./index.module.css";
import { useCities } from "../../contexts/citiesContext";

function Map() {
  const [mapPosition, setMapPosition] = useState([40, 0]);
  const [searchParams, setSearchParams] = useSearchParams();

  const { cities } = useCities();

  const navigate = useNavigate();

  let mapLng = searchParams.get("lng");
  let mapLat = searchParams.get("lat");

  useEffect(
    function () {
      if (mapLng && mapLat) setMapPosition([mapLat, mapLng]);
      console.log(mapLat, mapLng);
    },
    [mapLat, mapLng]
  );

  return (
    <div className={styles.mapContainer}>
      <MapContainer
        center={mapPosition}
        zoom={6}
        scrollWheelZoom={true}
        className={styles.map}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
        />
        {cities.map((city) => {
          return (
            <Marker
              position={[city.position.lat, city.position.lng]}
              key={city.id}
            >
              <Popup>
                <span>{city.emoji}</span>
                <span>{city.cityName}</span>
              </Popup>
            </Marker>
          );
        })}
        <ChangeCenter position={mapPosition} />
      </MapContainer>
    </div>
  );
}

function ChangeCenter({ position }) {
  console.log(position);
  const map = useMap();
  console.log(map);
  map.setView(position, 10);
}

export default Map;
