import { useSearchParams } from "react-router-dom";

import styles from "./index.module.css";

export default function Map() {
  const [searchParams, setSearchParams] = useSearchParams();

  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");

  return (
    <div className={styles.mapContainer}>
      <h1>Map</h1>
      <p>Lat: {lat}</p>
      <p>Lng: {lng}</p>
    </div>
  );
}
