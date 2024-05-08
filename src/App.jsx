import { lazy, Suspense } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import { CitiesProvider } from "./contexts/citiesContext";
import { AuthProvider } from "./contexts/AuthContext";

import CityList from "./components/city-list";
import CountryList from "./components/country-list";
import City from "./components/city";
import Form from "./components/form";
import SpinnerFullPage from "./components/spinner-full-page/inbdex";

const Home = lazy(() => import("./pages/home"));
const Product = lazy(() => import("./pages/product"));
const Pricing = lazy(() => import("./pages/pricing"));
const PageNotFound = lazy(() => import("./pages/404"));
const Login = lazy(() => import("./pages/login"));
const AppLayout = lazy(() => import("./pages/app-layout"));

function App() {
  return (
    <div>
      <CitiesProvider>
        <AuthProvider>
          <BrowserRouter>
            <Suspense fallback={<SpinnerFullPage />}>
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
            </Suspense>
          </BrowserRouter>
        </AuthProvider>
      </CitiesProvider>
    </div>
  );
}

export default App;
