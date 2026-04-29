import Navbar from "../components/Navbar";
import { motion } from "framer-motion";
import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";

const PRODUCTS = [
  {
    id: 1,
    name: "Pashmina Shawl",
    price: 4999,
    category: "Pashmina",
    img: "https://images.unsplash.com/photo-1593032465171-8f6d8c3c6b7d",
  },
  {
    id: 2,
    name: "Kashmiri Carpet",
    price: 12999,
    category: "Carpets",
    img: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c",
  },
  {
    id: 3,
    name: "Walnuts Premium",
    price: 1299,
    category: "Dry Fruits",
    img: "https://images.unsplash.com/photo-1604908176997-431b7d2f9a76",
  },
  {
    id: 4,
    name: "Handicraft Decor",
    price: 2499,
    category: "Handicrafts",
    img: "https://images.unsplash.com/photo-1585386959984-a4155224a1ad",
  },
];

const CATEGORIES = ["All", "Pashmina", "Carpets", "Dry Fruits", "Handicrafts"];

export default function Shop() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const navigate = useNavigate();

  const filtered = useMemo(() => {
    return PRODUCTS.filter((p) => {
      const matchCategory = category === "All" || p.category === category;
      const matchSearch = p.name.toLowerCase().includes(search.toLowerCase());
      return matchCategory && matchSearch;
    });
  }, [search, category]);

  return (
    <div className="relative min-h-screen">
      {/* 🌸 BACKGROUND */}
      <div
        className="fixed inset-0 bg-cover bg-center z-[-2]"
        style={{ backgroundImage: "url('/bgw.png')" }}
      />
      <div className="fixed inset-0 bg-white/20 backdrop-blur-md z-[-1]" />

      <Navbar />

      {/* 🌿 MAIN */}
      <div className="mx-4 md:mx-8 mt-6 p-8 rounded-[32px] bg-gradient-to-br from-[#EEF2EC]/90 to-[#F3F1EA]/90 shadow-[0_20px_60px_rgba(0,0,0,0.15)]">
        {/* 🔥 HEADER */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 mb-12">
          <div>
            <h1 className="text-4xl font-bold text-[#32758b]">
              Shop Kashmiri Products
            </h1>
            <p className="text-gray-600 mt-2">
              Explore authentic handcrafted luxury
            </p>
          </div>

          {/* 🔍 SEARCH */}
          <div className="flex items-center bg-white/90 shadow-lg rounded-full px-5 py-3 w-full lg:w-[400px]">
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search products..."
              className="flex-1 outline-none bg-transparent"
            />
            <button className="bg-[#32758b] text-white px-5 py-2 rounded-full hover:scale-105 transition">
              Search
            </button>
          </div>
        </div>

        {/* 🧱 LAYOUT */}
        <div className="grid lg:grid-cols-4 gap-10">
          {/* 🧾 SIDEBAR */}
          <div className="bg-white/80 backdrop-blur-md rounded-2xl p-6 shadow-md h-fit">
            <h2 className="font-semibold text-lg text-[#32758b] mb-4">
              Categories
            </h2>

            <div className="space-y-2">
              {CATEGORIES.map((c) => (
                <button
                  key={c}
                  onClick={() => setCategory(c)}
                  className={`block text-left w-full px-4 py-2 rounded-xl transition-all duration-300 font-medium
                  ${
                    category === c
                      ? "bg-[#32758b] text-white shadow-md"
                      : "text-[#32758b] hover:bg-[#EEF2EC] hover:pl-5"
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          {/* 🛍️ PRODUCTS */}
          <div className="lg:col-span-3 grid sm:grid-cols-2 xl:grid-cols-3 gap-8">
            {filtered.map((item) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ y: -12, scale: 1.04 }}
                transition={{ duration: 0.4 }}
                onClick={() => navigate(`/product/${item.id}`)}
                className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all cursor-pointer group"
              >
                {/* IMAGE */}
                <div className="overflow-hidden relative">
                  <img
                    src={item.img}
                    className="h-56 w-full object-cover group-hover:scale-110 transition duration-500"
                  />

                  {/* PREMIUM OVERLAY */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition" />
                </div>

                {/* CONTENT */}
                <div className="p-5">
                  <h3 className="font-semibold text-[#32758b] text-lg">
                    {item.name}
                  </h3>

                  <p className="text-[#D4AF37] font-bold mt-1 text-lg">
                    ₹{item.price}
                  </p>

                  {/* BUTTON */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      alert("Added to cart");
                    }}
                    className="mt-4 w-full bg-[#32758b] text-white py-2 rounded-lg hover:bg-black transition"
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
