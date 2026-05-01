import Navbar from "../components/Navbar";
import { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import OrderTracking from "../components/OrderTracking";

export default function Orders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await axios.get("http://localhost:5000/api/user/orders", {
          headers: { Authorization: `Bearer ${token}` },
        });

        setOrders(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetch();
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case "placed":
        return "bg-yellow-100 text-yellow-700";
      case "shipped":
        return "bg-blue-100 text-blue-700";
      case "out_for_delivery":
        return "bg-purple-100 text-purple-700";
      case "delivered":
        return "bg-green-100 text-green-700";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  return (
    <div className="min-h-screen bg-[#f6f2ee] text-[#222]">
      <Navbar />

      <div className="max-w-6xl mx-auto px-6 py-10">
        {/* HEADER */}
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl font-semibold mb-10 tracking-wide"
        >
          My Orders
        </motion.h1>

        {/* EMPTY STATE */}
        {orders.length === 0 && (
          <div className="text-center text-gray-500 mt-20">
            <p className="text-lg">No orders yet 🛒</p>
          </div>
        )}

        {/* ORDERS */}
        <div className="space-y-8">
          {orders.map((order, i) => (
            <motion.div
              key={order._id}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              whileHover={{ scale: 1.01 }}
              className="bg-white rounded-3xl shadow-xl p-6 md:p-8"
            >
              {/* TOP */}
              <div className="flex flex-col md:flex-row gap-6 md:items-center justify-between">
                <div className="flex gap-5 items-center">
                  <img
                    src={
                      order.product?.images?.[0] ||
                      "https://via.placeholder.com/150"
                    }
                    className="w-24 h-24 rounded-xl object-cover shadow"
                  />

                  <div>
                    <h2 className="text-lg md:text-xl font-semibold">
                      {order.product?.name}
                    </h2>

                    <p className="text-[#c8a97e] font-semibold mt-1">
                      ₹{order.amount}
                    </p>

                    <p className="text-sm text-gray-400 mt-1">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>

                {/* STATUS BADGE */}
                <div
                  className={`px-4 py-2 rounded-full text-sm font-medium w-fit ${getStatusColor(
                    order.status,
                  )}`}
                >
                  {order.status.replaceAll("_", " ").toUpperCase()}
                </div>
              </div>

              {/* TRACKING BAR */}
              <div className="mt-6">
                <OrderTracking status={order.status} />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
