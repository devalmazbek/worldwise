import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/home";
import Product from "./pages/product";
import Pricing from "./pages/pricing";
import PageNotFound from "./pages/404";
import Login from "./pages/login";
import AppLayout from "./pages/app-layout";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product" element={<Product />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/app" element={<AppLayout />}>
            <Route index element={<>list of cities</>} />
            <Route path="cities" element={<>cities</>} />
            <Route path="countries" element={<>countries</>} />
            <Route path="form" element={<>form</>} />
          </Route>
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
