import { createContext, useState, useEffect, useContext } from "react";

const CitiesContext = createContext();
const BASE_API = "http://localhost:8080";

function CitiesProvider({ children }) {
  const [cities, setSities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentCity, setCurrentCity] = useState({});

  useEffect(function () {
    async function fetchData() {
      try {
        setIsLoading(true);
        const request = await fetch(`${BASE_API}/cities`);
        const data = await request.json();
        setSities(data);
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

  return (
    <CitiesContext.Provider
      value={{
        cities,
        isLoading,
        getCity,
        currentCity,
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
