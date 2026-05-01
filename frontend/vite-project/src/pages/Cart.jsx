import Navbar from "../components/Navbar";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function Cart() {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("cart")) || [];

    // ✅ FIX: MERGE DUPLICATES
    const merged = Object.values(
      stored.reduce((acc, item) => {
        if (acc[item._id]) {
          acc[item._id].qty += item.qty;
        } else {
          acc[item._id] = { ...item };
        }
        return acc;
      }, {}),
    );

    setCart(merged);
    localStorage.setItem("cart", JSON.stringify(merged));
  }, []);

  // ✅ SAFE UPDATE
  const updateCart = (updated) => {
    const clean = updated.filter((item) => item.qty > 0);

    setCart([...clean]);
    localStorage.setItem("cart", JSON.stringify(clean));
  };

  // ❌ REMOVE (FINAL FIX)
  const removeItem = (id) => {
    const updated = cart.filter((item) => item._id !== id);
    updateCart(updated);
  };

  // ➕➖ QTY FIX
  const changeQty = (id, type) => {
    const updated = cart.map((item) => {
      if (item._id === id) {
        let newQty = item.qty;

        if (type === "inc") newQty += 1;
        if (type === "dec") newQty -= 1;

        return { ...item, qty: newQty };
      }
      return item;
    });

    updateCart(updated);
  };

  const total = cart.reduce((a, c) => a + c.price * c.qty, 0);

  return (
    <div className="min-h-screen bg-[#f5f1eb]">
      <Navbar />

      <div className="max-w-6xl mx-auto px-6 py-10">
        <h1 className="text-4xl font-bold mb-10 text-[#2c2c2c]">
          Your Cart 🛒
        </h1>

        {cart.length === 0 && (
          <p className="text-gray-500">Your cart is empty</p>
        )}

        <div className="space-y-6">
          {cart.map((item) => (
            <motion.div
              key={item._id}
              layout
              whileHover={{ scale: 1.02 }}
              className="flex items-center justify-between bg-white p-6 rounded-2xl shadow-lg"
            >
              <div className="flex items-center gap-6">
                <img
                  src={item.images?.[0]}
                  className="w-28 h-28 object-cover rounded-xl border"
                />

                <div>
                  <h2 className="text-xl font-semibold">{item.name}</h2>

                  <p className="text-[#c8a97e] font-bold">₹{item.price}</p>

                  <div className="flex items-center gap-3 mt-3">
                    <button
                      onClick={() => changeQty(item._id, "dec")}
                      className="px-3 py-1 bg-gray-200 rounded"
                    >
                      -
                    </button>

                    <span>{item.qty}</span>

                    <button
                      onClick={() => changeQty(item._id, "inc")}
                      className="px-3 py-1 bg-gray-200 rounded"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>

              <div className="text-right">
                <p className="text-xl font-bold">₹{item.price * item.qty}</p>

                <button
                  onClick={() => removeItem(item._id)}
                  className="mt-3 text-red-500 hover:underline"
                >
                  Remove
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {cart.length > 0 && (
          <div className="mt-10 bg-white p-6 rounded-2xl shadow-xl flex justify-between items-center">
            <h2 className="text-2xl font-semibold">Total</h2>

            <div className="text-right">
              <p className="text-3xl font-bold text-[#c8a97e]">₹{total}</p>

              <button className="mt-4 px-6 py-3 bg-[#32758b] text-white rounded-xl">
                Proceed to Checkout
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
