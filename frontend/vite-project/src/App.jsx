import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Auth from "./pages/Auth";
import SellerPayment from "./pages/SellerPayment";
import Shop from "./pages/Shop";
import SellerDashboard from "./pages/SellerDashboard";
import Product from "./pages/Product";
import Seller from "./pages/Seller";
import Contact from "./pages/Contact";
import AdminPanel from "./pages/AdminPanel";
import Profile from "./pages/Profile";
import Cart from "./pages/Cart";
import Wishlist from "./pages/Wishlist";
import Checkout from "./pages/Checkout";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/seller-payment" element={<SellerPayment />} />
        <Route path="/seller-dashboard" element={<SellerDashboard />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/seller" element={<Seller />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/product/:id" element={<Product />} />
        <Route path="/admin" element={<AdminPanel />} />
        <Route path="/checkout" element={<Checkout />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
