import Navbar from "../components/Navbar";
import { motion } from "framer-motion";
import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import LoginPopup from "../components/LoginPopup";
import { smartSearchFilter } from "../utils/smartSearch";

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
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/products`);
        // Handle different possible API response shapes safely
        const data = res.data;
        if (Array.isArray(data)) {
          setProducts(data);
        } else if (Array.isArray(data.products)) {
          setProducts(data.products);
        } else if (Array.isArray(data.data)) {
          setProducts(data.data);
        } else {
          console.error("Unexpected products API response:", data);
          setProducts([]);
        }
      } catch (err) {
        console.error("Failed to fetch products:", err);
        setProducts([]);
      }
    };
    fetch();
  }, []);

  const filtered = useMemo(() => {
    const safeProducts = Array.isArray(products) ? products : [];

    // First filter by category and price (fast, simple checks)
    const categoryAndPriceFiltered = safeProducts.filter((p) => {
      const matchCategory =
        category === "All" || normalize(p.category) === normalize(category);
      const matchPrice = p.price <= price;
      return matchCategory && matchPrice;
    });

    // Then apply smart search ranking on top (handles typos, synonyms, relevance)
    return smartSearchFilter(categoryAndPriceFiltered, search);
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

      <div className="px-4 md:px-8 lg:px-10 py-6 md:py-10">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col md:flex-row justify-between items-center gap-4 mb-10"
        >
          <h1 className="text-2xl md:text-4xl font-semibold tracking-wide text-center md:text-left">
            Kashmir Luxury Store
          </h1>

          <input
            placeholder="Search luxury items..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="px-6 py-3 rounded-full border border-[#284b63] w-full md:w-80 bg-white shadow"
          />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 lg:gap-10">
          {/* SIDEBAR */}
          <div className="bg-white rounded-2xl shadow-xl p-4 md:p-6">
            <h3 className="text-lg font-semibold mb-4">Categories</h3>

            {CATEGORIES.map((c) => (
              <button
                key={c}
                onClick={() => setCategory(c)}
                className={`block w-full text-left px-4 py-2 mb-2 rounded-lg ${
                  category === c
                    ? "bg-[#284b63] text-white"
                    : "hover:bg-gray-100"
                }`}
              >
                {c}
              </button>
            ))}
          </div>

          {/* PRODUCTS */}
          <div className="lg:col-span-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {filtered.map((item, i) => (
              <motion.div
                key={item._id}
                whileHover={{ y: -10, scale: 1.04 }}
                className="bg-white rounded-2xl shadow-xl overflow-hidden"
              >
                <img
                  src={item.images?.[0]}
                  className="h-48 md:h-56 w-full object-cover cursor-pointer"
                  onClick={() => navigate(`/product/${item._id}`)}
                />

                <div className="p-4 md:p-5">
                  <h3 className="text-lg font-medium">{item.name}</h3>
                  <p className="text-[#284b63] text-lg md:text-xl font-semibold mt-2">
                    ₹{item.price}
                  </p>

                  <button
                    onClick={() => addToCart(item)}
                    className="mt-4 w-full bg-[#284b63] text-white py-2 rounded-xl"
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