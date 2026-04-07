import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Auth from "./pages/Auth";
import SellerPayment from "./pages/SellerPayment";
import Shop from "./pages/Shop";
import SellerDashboard from "./pages/SellerDashboard";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/seller-payment" element={<SellerPayment />} />
        <Route path="/seller-dashboard" element={<SellerDashboard />} />

        <Route path="/shop" element={<Shop />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
