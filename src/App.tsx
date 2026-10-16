import { Route, Routes } from "react-router";
import Layout from "./components/Layout";
import CatalogPage from "./pages/CatalogPage";
import ProductPage from "./pages/ProductPage";
import CartPage from "./pages/CartPage";
import LoginPage from "./pages/LoginPage";
import NewProductPage from "./pages/NewProductPage";
import NotFoundPage from "./pages/NotFoundPage";

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<CatalogPage />} />
        <Route path="produits/:id" element={<ProductPage />} />
        <Route path="panier" element={<CartPage />} />
        <Route path="connexion" element={<LoginPage />} />
        <Route path="proposer" element={<NewProductPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}
