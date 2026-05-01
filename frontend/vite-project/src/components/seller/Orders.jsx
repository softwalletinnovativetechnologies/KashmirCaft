import { useEffect, useState } from "react";
import axios from "axios";

import { motion } from "framer-motion";

const Orders = () => {
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get("http://localhost:5000/api/seller/orders", {
        headers: { Authorization: `Bearer ${token}` },
      });

      setOrders(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  // 🔥 UPDATE STATUS
  const updateStatus = async (id, status) => {
    try {
      const token = localStorage.getItem("token");

      await axios.put(
        `http://localhost:5000/api/seller/orders/${id}/status`,
        { status },
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );

      fetchOrders();
    } catch (err) {
      console.log(err);
      alert("Update failed ❌");
    }
  };

  // 🎨 STATUS COLOR
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
    <div className="space-y-6 p-6">
      <h2 className="text-2xl font-semibold mb-4">Seller Orders 📦</h2>

      {orders.length === 0 && <p className="text-gray-500">No orders yet</p>}

      {orders.map((o, i) => (
        <motion.div
          key={o._id}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.05 }}
          whileHover={{ scale: 1.02 }}
          className="p-6 rounded-2xl bg-white shadow-xl flex flex-col md:flex-row md:items-center md:justify-between gap-6"
        >
          {/* LEFT */}
          <div className="flex items-center gap-4">
            <img
              src={o.product?.images?.[0]}
              className="w-20 h-20 object-cover rounded-xl"
            />

            <div>
              <h3 className="font-semibold text-lg">{o.product?.name}</h3>

              <p className="text-gray-600">₹{o.amount}</p>

              <p className="text-sm text-gray-400">
                {new Date(o.createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>

          {/* RIGHT */}
          <div className="flex flex-col gap-3">
            {/* STATUS BADGE */}
            <span
              className={`px-3 py-1 rounded-full text-sm font-medium w-fit ${getStatusColor(
                o.status,
              )}`}
            >
              {o.status.replaceAll("_", " ").toUpperCase()}
            </span>

            {/* DROPDOWN */}
            <select
              value={o.status}
              onChange={(e) => updateStatus(o._id, e.target.value)}
              className="px-4 py-2 rounded-lg border bg-white focus:ring-2 focus:ring-[#c8a97e]"
            >
              <option value="placed">Placed</option>
              <option value="shipped">Shipped</option>
              <option value="out_for_delivery">Out for Delivery</option>
              <option value="delivered">Delivered</option>
            </select>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default Orders;
