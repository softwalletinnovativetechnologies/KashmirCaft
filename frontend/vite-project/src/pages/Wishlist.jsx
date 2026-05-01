import Navbar from "../components/Navbar";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function Wishlist() {
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("wishlist")) || [];
    setWishlist(data);
  }, []);

  // 🧠 UPDATE STORAGE
  const updateWishlist = (updated) => {
    setWishlist(updated);
    localStorage.setItem("wishlist", JSON.stringify(updated));
  };

  // ❌ REMOVE
  const removeItem = (id) => {
    const updated = wishlist.filter((item) => item._id !== id);
    updateWishlist(updated);
  };

  // 🛒 ADD TO CART
  const addToCart = (product) => {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    const existing = cart.find((i) => i._id === product._id);

    if (existing) {
      existing.qty += 1;
    } else {
      cart.push({ ...product, qty: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    alert("Moved to cart 🛒");
  };

  return (
    <div className="min-h-screen bg-[#f5f1eb]">
      <Navbar />

      <div className="max-w-6xl mx-auto px-6 py-10">
        <h1 className="text-4xl font-bold mb-10 text-[#2c2c2c]">
          Your Wishlist ❤️
        </h1>

        {wishlist.length === 0 && (
          <p className="text-gray-500">Your wishlist is empty</p>
        )}

        <div className="grid md:grid-cols-2 gap-8">
          {wishlist.map((item) => (
            <motion.div
              key={item._id}
              whileHover={{ scale: 1.03 }}
              className="bg-white rounded-2xl shadow-xl overflow-hidden"
            >
              {/* IMAGE */}
              <div className="overflow-hidden">
                <img
                  src={item.images?.[0]}
                  className="w-full h-64 object-cover hover:scale-110 transition duration-500"
                />
              </div>

              {/* CONTENT */}
              <div className="p-5">
                <h2 className="text-xl font-semibold text-[#2c2c2c]">
                  {item.name}
                </h2>

                <p className="text-[#c8a97e] text-lg font-bold mt-2">
                  ₹{item.price}
                </p>

                {/* ACTIONS */}
                <div className="flex gap-3 mt-5">
                  <button
                    onClick={() => addToCart(item)}
                    className="flex-1 bg-[#32758b] text-white py-2 rounded-xl"
                  >
                    Add to Cart
                  </button>

                  <button
                    onClick={() => removeItem(item._id)}
                    className="flex-1 bg-red-500 text-white py-2 rounded-xl"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
