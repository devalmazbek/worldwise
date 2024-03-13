import { useSearchParams } from "react-router-dom";

export function useGeolocationUrl() {
  const [searchParams, setSearchParams] = useSearchParams();
  let mapLng = searchParams.get("lng");
  let mapLat = searchParams.get("lat");

  return [mapLat, mapLng];
}
