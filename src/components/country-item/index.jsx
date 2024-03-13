import styles from "./index.module.css";

function CountryItem({ country }) {
  return (
    <li className={styles.countryItem} key={country.id}>
      <span>{country.emoji}</span>
      <span>{country.country}</span>
    </li>
  );
}

export default CountryItem;
