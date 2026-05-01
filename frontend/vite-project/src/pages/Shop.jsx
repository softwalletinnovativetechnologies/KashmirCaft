import Navbar from "../components/Navbar";
import { motion } from "framer-motion";
import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import LoginPopup from "../components/LoginPopup";

const CATEGORIES = ["All", "Pashmina", "Carpets", "Dry Fruits", "Handicrafts"];
const normalize = (str) => (str || "").toLowerCase().replace(/\s+/g, "");

export default function Shop() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [price, setPrice] = useState(100000);
  const [products, setProducts] = useState([]);
  const [showPopup, setShowPopup] = useState(false);

  const navigate = useNavigate();

  const isLoggedIn = () => localStorage.getItem("token");

  useEffect(() => {
    const fetch = async () => {
      const res = await axios.get("http://localhost:5000/api/products");
      setProducts(res.data);
    };
    fetch();
  }, []);

  const filtered = useMemo(() => {
    return products.filter((p) => {
      const matchCategory =
        category === "All" || normalize(p.category) === normalize(category);
      const matchSearch = (p.name || "")
        .toLowerCase()
        .includes(search.toLowerCase());
      const matchPrice = p.price <= price;
      return matchCategory && matchSearch && matchPrice;
    });
  }, [search, category, price, products]);

  const addToCart = (p) => {
    if (!isLoggedIn()) {
      setShowPopup(true);
      return;
    }

    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.push({ ...p, qty: 1 });
    localStorage.setItem("cart", JSON.stringify(cart));
    alert("Added to cart ✅");
  };

  return (
    <div className="min-h-screen bg-[#f6f2ee] text-[#222]">
      {showPopup && <LoginPopup onClose={() => setShowPopup(false)} />}

      <div className="sticky top-0 z-50">
        <Navbar />
      </div>

      <div className="px-10 py-10">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex justify-between items-center mb-10"
        >
          <h1 className="text-4xl font-semibold tracking-wide">
            Kashmir Luxury Store
          </h1>

          <input
            placeholder="Search luxury items..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="px-6 py-3 rounded-full border border-[#c8a97e] w-80 bg-white shadow"
          />
        </motion.div>

        <div className="grid lg:grid-cols-4 gap-10">
          {/* SIDEBAR */}
          <div className="bg-white rounded-2xl shadow-xl p-6">
            <h3 className="text-lg font-semibold mb-4">Categories</h3>

            {CATEGORIES.map((c) => (
              <button
                key={c}
                onClick={() => setCategory(c)}
                className={`block w-full text-left px-4 py-2 mb-2 rounded-lg ${
                  category === c
                    ? "bg-[#c8a97e] text-white"
                    : "hover:bg-gray-100"
                }`}
              >
                {c}
              </button>
            ))}
          </div>

          {/* PRODUCTS */}
          <div className="lg:col-span-3 grid md:grid-cols-3 gap-8">
            {filtered.map((item, i) => (
              <motion.div
                key={item._id}
                whileHover={{ y: -10, scale: 1.04 }}
                className="bg-white rounded-2xl shadow-xl overflow-hidden"
              >
                <img
                  src={item.images?.[0]}
                  className="h-56 w-full object-cover cursor-pointer"
                  onClick={() => navigate(`/product/${item._id}`)}
                />

                <div className="p-5">
                  <h3 className="text-lg font-medium">{item.name}</h3>
                  <p className="text-[#c8a97e] text-xl font-semibold mt-2">
                    ₹{item.price}
                  </p>

                  <button
                    onClick={() => addToCart(item)}
                    className="mt-4 w-full bg-[#c8a97e] text-white py-2 rounded-xl"
                  >
                    Add to Cart
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
