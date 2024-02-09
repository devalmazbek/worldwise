import { useSearchParams, useNavigate } from "react-router-dom";

import styles from "./index.module.css";

export default function Map() {
  const [searchParams, setSearchParams] = useSearchParams();

  const navigate = useNavigate();

  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");

  return (
    <div className={styles.mapContainer} onClick={() => navigate("form")}>
      <h1>Map</h1>
      <p>Lat: {lat}</p>
      <p>Lng: {lng}</p>
      <button onClick={() => setSearchParams({ lat: 23, lng: 25 })}>
        Change position
      </button>
    </div>
  );
}
