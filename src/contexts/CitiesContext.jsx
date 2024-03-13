import { createContext, useState, useEffect, useContext } from "react";

const CitiesContext = createContext();
const BASE_API = "http://localhost:8080";

function CitiesProvider({ children }) {
  const [cities, setCities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentCity, setCurrentCity] = useState({});

  useEffect(function () {
    async function fetchData() {
      try {
        setIsLoading(true);
        const request = await fetch(`${BASE_API}/cities`);
        const data = await request.json();
        setCities(data);
      } catch {
        alert("there was an error loading data....");
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, []);

  async function getCity(id) {
    try {
      setIsLoading(true);
      const request = await fetch(`${BASE_API}/cities/${id}`);
      const data = await request.json();
      setCurrentCity(data);
    } catch {
      alert("there was an error loading data....");
    } finally {
      setIsLoading(false);
    }
  }

  async function createNewCity(newCity) {
    try {
      setIsLoading(true);
      const request = await fetch(`${BASE_API}/cities/`, {
        method: "POST",
        body: JSON.stringify(newCity),
        headers: { "Content-type": "application/json; charset=UTF-8" },
      });

      const data = await request.json();
      setCities((cities) => [...cities, data]);

      console.log(data);
      setCurrentCity(data);
    } catch {
      alert("there was an error creating city....");
    } finally {
      setIsLoading(false);
    }
  }

  async function deleteCity(id) {
    try {
      setIsLoading(true);
      await fetch(`${BASE_API}/cities/${id}`, {
        method: "DELETE",
      });

      setCities((cities) => cities.filter((city) => city.id !== id));
    } catch {
      alert("there was an error deleting city....");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <CitiesContext.Provider
      value={{
        cities,
        isLoading,
        getCity,
        currentCity,
        createNewCity,
        deleteCity,
      }}
    >
      {children}
    </CitiesContext.Provider>
  );
}

function useCities() {
  const context = useContext(CitiesContext);
  return context;
}

export { CitiesProvider, useCities };
