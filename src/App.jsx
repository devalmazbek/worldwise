import { useEffect, useState } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import Home from "./pages/home";
import Product from "./pages/product";
import Pricing from "./pages/pricing";
import PageNotFound from "./pages/404";
import Login from "./pages/login";
import AppLayout from "./pages/app-layout";
import CityList from "./components/city-list";
import CountryList from "./components/country-list";
import City from "./components/city";
import Form from "./components/form";
import { CitiesProvider } from "./contexts/citiesContext";

const BASE_API = "http://localhost:8080";

function App() {
  return (
    <div>
      <CitiesProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/product" element={<Product />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/login" element={<Login />} />
            <Route path="/app" element={<AppLayout />}>
              <Route index element={<Navigate replace to="cities" />} />
              <Route path="cities" element={<CityList />} />
              <Route path="cities/:id" element={<City />} />
              <Route path="countries" element={<CountryList />} />
              <Route path="form" element={<Form />} />
            </Route>
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </BrowserRouter>
      </CitiesProvider>
    </div>
  );
}

export default App;
