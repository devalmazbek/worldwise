import CountryItem from "../country-item";

import Spinner from "../spinner";
import Message from "../message";

import styles from "./index.module.css";
import { useCities } from "../../contexts/citiesContext";

export default function CountryList() {
  const { cities, isLoading } = useCities();

  if (isLoading) return <Spinner />;

  if (!cities.length)
    return (
      <Message message="city is empty please add new country from map...." />
    );

  const countries = cities.reduce((arr, city) => {
    if (!arr.map((el) => el.city).includes(city.country)) {
      return [...arr, { country: city.country, emoji: city.emoji }];
    } else return arr;
  }, []);

  return (
    <ul className={styles.countryList}>
      {countries.map((country) => (
        <CountryItem country={country} key={country.id} />
      ))}
    </ul>
  );
}
