import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  useMapEvents,
} from "react-leaflet";

import { useGeolocation } from "../../hooks/useGeolocation";

import { useCities } from "../../contexts/citiesContext";
import Button from "../button";

import styles from "./index.module.css";

function Map() {
  const [mapPosition, setMapPosition] = useState([40, 0]);
  const [searchParams, setSearchParams] = useSearchParams();

  const { cities } = useCities();

  const {
    isLoading: isLoadingGeolocation,
    position: geolocationPosition,
    error: geolocationError,
    getPosition,
  } = useGeolocation();

  let mapLng = searchParams.get("lng");
  let mapLat = searchParams.get("lat");

  useEffect(
    function () {
      if (mapLng && mapLat) setMapPosition([mapLat, mapLng]);
      console.log(mapLat, mapLng);
    },
    [mapLat, mapLng]
  );

  useEffect(
    function () {
      if (geolocationPosition) {
        setMapPosition([geolocationPosition.lat, geolocationPosition.lng]);
      }
    },
    [geolocationPosition]
  );

  return (
    <div className={styles.mapContainer}>
      {!geolocationPosition && (
        <Button type="position" onClick={getPosition}>
          {isLoadingGeolocation ? "loading...." : "use your geolocation"}
        </Button>
      )}
      <MapContainer
        center={mapPosition}
        zoom={1}
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
        <DetectClick />
      </MapContainer>
    </div>
  );
}

function ChangeCenter({ position }) {
  const map = useMap();
  map.setView(position, 10);
  return;
}

function DetectClick() {
  const navigate = useNavigate();
  useMapEvents({
    click: (e) => navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`),
  });
}

export default Map;
