import Spinner from "../spinner";
import Message from "../message";
import CityListItem from "../city-list-item";

import styles from "./index.module.css";
import { useCities } from "../../contexts/citiesContext";

export default function CityList() {
  const { cities, isLoading } = useCities();

  if (isLoading) return <Spinner />;

  if (!cities.length)
    return <Message message="city is empty please add new city from map...." />;

  return (
    <ul className={styles.cityList}>
      {cities.map((city) => (
        <CityListItem city={city} key={city.id} />
      ))}
    </ul>
  );
}
