import { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Home from "./pages/home";
import Product from "./pages/product";
import Pricing from "./pages/pricing";
import PageNotFound from "./pages/404";
import Login from "./pages/login";
import AppLayout from "./pages/app-layout";
import CityList from "./components/city-list";
import CountryList from "./components/country-list";
import City from "./components/city";

const BASE_API = "http://localhost:8080";

function App() {
  const [cities, setSities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

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
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product" element={<Product />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/app" element={<AppLayout />}>
            <Route
              index
              element={<CityList cities={cities} isLoading={isLoading} />}
            />
            <Route
              path="cities"
              element={<CityList cities={cities} isLoading={isLoading} />}
            />
            <Route path="cities/:id" element={<City />} />
            <Route
              path="countries"
              element={<CountryList cities={cities} isLoading={isLoading} />}
            />
            <Route path="form" element={<>form</>} />
          </Route>
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
