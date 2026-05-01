import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import ProductForm from "../components/seller/ProductForm";
import ProductList from "../components/seller/ProductList";
import Orders from "../components/seller/Orders";
import Earnings from "../components/seller/Earnings";
import axios from "axios";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const SellerDashboard = () => {
  const [tab, setTab] = useState("dashboard");

  const [stats, setStats] = useState({
    totalProducts: 0,
    totalOrders: 0,
    totalEarnings: 0,
    chartData: [],
  });

  const token = localStorage.getItem("token");

  // 🔥 FETCH STATS (FIXED API)
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5000/api/seller/dashboard",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        setStats(res.data);
      } catch (err) {
        console.log("Dashboard error:", err.response?.data || err.message);
      }
    };

    if (token) fetchStats();
  }, [token]);

  const menu = ["dashboard", "products", "orders", "earnings"];

  return (
    <div className="bg-[#f8f4f2] min-h-screen text-[#3a2f2f]">
      <Navbar />

      <div className="flex pt-28">
        {/* 💎 SIDEBAR */}
        <div className="w-64 h-screen fixed left-0 top-0 pt-28 px-6 backdrop-blur-xl bg-white/40 border-r border-white/30">
          <h2 className="text-2xl mb-8 font-medium">Seller Panel</h2>

          {menu.map((t) => (
            <div
              key={t}
              onClick={() => setTab(t)}
              className={`mb-4 px-4 py-2 rounded cursor-pointer transition ${
                tab === t ? "bg-[#c8a97e] text-white" : "hover:bg-white/60"
              }`}
            >
              {t.toUpperCase()}
            </div>
          ))}
        </div>

        {/* 📊 MAIN */}
        <div className="ml-64 w-full px-10">
          {/* ✨ HEADER */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl font-light mb-8"
            style={{ fontFamily: "Playfair Display, serif" }}
          >
            Seller <span className="text-[#c8a97e]">Dashboard</span>
          </motion.h1>

          {/* 📊 DASHBOARD */}
          {tab === "dashboard" && (
            <>
              {/* 💰 CARDS */}
              <div className="grid md:grid-cols-3 gap-6 mb-10">
                {[
                  {
                    title: "Products",
                    value: stats.totalProducts,
                  },
                  {
                    title: "Orders",
                    value: stats.totalOrders,
                  },
                  {
                    title: "Earnings",
                    value: `₹${stats.totalEarnings}`,
                  },
                ].map((card, i) => (
                  <motion.div
                    key={i}
                    whileHover={{ scale: 1.05 }}
                    className="p-6 rounded-2xl bg-white/60 backdrop-blur-lg border shadow-lg"
                  >
                    <p className="text-gray-500">{card.title}</p>
                    <h2 className="text-3xl text-[#c8a97e] mt-2 font-semibold">
                      {card.value}
                    </h2>
                  </motion.div>
                ))}
              </div>

              {/* 📈 GRAPH */}
              <div className="bg-white/70 backdrop-blur-lg p-6 rounded-2xl shadow-lg">
                <h2 className="mb-4 text-xl font-medium">Earnings Overview</h2>

                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={stats.chartData || []}>
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Line
                      type="monotone"
                      dataKey="earnings"
                      stroke="#c8a97e"
                      strokeWidth={3}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </>
          )}

          {/* 🛍️ PRODUCTS */}
          {tab === "products" && (
            <>
              <ProductForm />
              <ProductList />
            </>
          )}

          {/* 📦 ORDERS */}
          {tab === "orders" && <Orders />}

          {/* 💰 EARNINGS */}
          {tab === "earnings" && <Earnings />}
        </div>
      </div>
    </div>
  );
};

export default SellerDashboard;
