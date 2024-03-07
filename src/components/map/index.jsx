import { useSearchParams, useNavigate } from "react-router-dom";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";

import styles from "./index.module.css";
import { useCities } from "../../contexts/citiesContext";
import { useEffect, useState } from "react";

export default function Map() {
  const [mapPosition, setMapPosition] = useState([40, 0]);
  const [searchParams, setSearchParams] = useSearchParams();

  const { cities } = useCities();

  const navigate = useNavigate();

  const mapLng = searchParams.get("lng");
  const mapLat = searchParams.get("lat");

  useEffect(
    function () {
      if (mapLng && mapLat) setMapPosition([mapLat, mapLng]);
    },
    [mapLat, mapLng]
  );

  return (
    <div className={styles.mapContainer} onClick={() => navigate("form")}>
      <MapContainer
        center={mapPosition}
        zoom={10}
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
        {/* <ChangeCenter position={[mapLat || 40, mapLng || 0]} /> */}
      </MapContainer>
      {/* <h1>Map</h1>
      <p>Lat: {lat}</p>
      <p>Lng: {lng}</p> 
      <button onClick={()  => setSearchParams({ lat: 23, lng: 25 })}>
        Change position
      </button> */}
    </div>
  );
}

function ChangeCenter({ postion }) {
  const map = useMap();
  map.setView(postion);
  return null;
}
