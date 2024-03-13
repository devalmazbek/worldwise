// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { useGeolocationUrl } from "../../hooks/useGeolocationUrl";

import Spinner from "../spinner";
import Button from "../button";
import BackButton from "../back-button";

import styles from "./index.module.css";
import Message from "../message";
import { useCities } from "../../contexts/CitiesContext";

const url = "https://api.bigdatacloud.net/data/reverse-geocode-client";

export function convertToEmoji(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}

function Form() {
  const [cityName, setCityName] = useState("");
  const [country, setCountry] = useState("");
  const [date, setDate] = useState(new Date());
  const [notes, setNotes] = useState("");
  const [isLoadingCityGeolocation, setIsLoadingCityGeolocation] =
    useState(false);
  const [emoji, setEmoji] = useState(null);

  const [errorGeolocation, setErrorGeolocation] = useState("");
  const { createNewCity, isLoading } = useCities();

  const [mapLat, mapLng] = useGeolocationUrl();
  const navigate = useNavigate();

  useEffect(
    function () {
      async function getCityGeolocation() {
        try {
          setIsLoadingCityGeolocation(true);

          const request = await fetch(
            `${url}?latitude=${mapLat}&longitude=${mapLng}`
          );

          const data = await request.json();

          if (!data.countryCode) {
            throw new Error(
              "That does not seem to be a city. Click somewhere else 😉"
            );
          }

          setCityName(data?.city || data?.locality || "");
          setCountry(data?.countryName);
          setEmoji(convertToEmoji(data?.countryCode));

          if (!mapLat || !mapLng) {
            throw new Error(
              "there are no latitude and longitude! Please try again or refresh the page"
            );
          }
        } catch (err) {
          setErrorGeolocation(err.message);
        } finally {
          setIsLoadingCityGeolocation(false);
        }
      }
      getCityGeolocation();
    },
    [mapLat, mapLng, setIsLoadingCityGeolocation]
  );

  async function handleAddNewCity(e) {
    e.preventDefault();

    const newCity = {
      cityName,
      country,
      emoji,
      date,
      notes,
      position: { lat: mapLat, lng: mapLng },
    };

    await createNewCity(newCity);
    navigate("/app/cities");
  }

  if (isLoadingCityGeolocation) return <Spinner />;
  if (errorGeolocation) return <Message message={errorGeolocation} />;

  return (
    <form
      className={`${styles.form} ${isLoading ? "loading" : ""}`}
      onSubmit={handleAddNewCity}
    >
      <div className={styles.row}>
        <label htmlFor="cityName">City name</label>
        <input
          id="cityName"
          onChange={(e) => setCityName(e.target.value)}
          value={cityName}
        />
        <span className={styles.flag}>{emoji}</span>
      </div>

      <div className={styles.row}>
        <label htmlFor="date">When did you go to {cityName}?</label>
        {/* <input
          id="date"
          onChange={(e) => setDate(e.target.value)}
          value={date}
        /> */}
        <DatePicker
          selected={date}
          onChange={(date) => setDate(date)}
          dateFormat="dd/MM/yyyy"
          showIcon
          isClearable
          placeholderText="please choose date"
          closeOnScroll={true}
          popperPlacement="right-start"
        />
      </div>

      <div className={styles.row}>
        <label htmlFor="notes">Notes about your trip to {cityName}</label>
        <textarea
          id="notes"
          onChange={(e) => setNotes(e.target.value)}
          value={notes}
        />
      </div>

      <div className={styles.buttons}>
        <Button type="primary">Add</Button>
        <BackButton />
      </div>
    </form>
  );
}

export default Form;
