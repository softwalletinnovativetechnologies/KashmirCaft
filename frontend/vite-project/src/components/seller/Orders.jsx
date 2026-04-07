import { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";

const Orders = () => {
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    const token = localStorage.getItem("token");

    const res = await axios.get("http://localhost:5000/api/orders", {
      headers: { Authorization: `Bearer ${token}` },
    });

    setOrders(res.data);
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const updateStatus = async (id, status) => {
    const token = localStorage.getItem("token");

    await axios.put(
      `http://localhost:5000/api/orders/${id}`,
      { status },
      { headers: { Authorization: `Bearer ${token}` } },
    );

    fetchOrders();
  };

  return (
    <div className="space-y-4">
      {orders.map((o) => (
        <motion.div
          key={o._id}
          whileHover={{ scale: 1.02 }}
          className="p-5 rounded-xl bg-white/60 backdrop-blur-xl border shadow flex justify-between items-center"
        >
          <div>
            <h3 className="font-medium">{o.product.name}</h3>
            <p className="text-gray-500">₹{o.total}</p>
          </div>

          <select
            value={o.status}
            onChange={(e) => updateStatus(o._id, e.target.value)}
            className="px-3 py-2 rounded-lg border bg-white"
          >
            <option>Pending</option>
            <option>Shipped</option>
            <option>Delivered</option>
          </select>
        </motion.div>
      ))}
    </div>
  );
};

export default Orders;
