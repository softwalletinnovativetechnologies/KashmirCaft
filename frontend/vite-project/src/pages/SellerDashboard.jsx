import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
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

import { Package, ShoppingBag, IndianRupee, Home, LogOut } from "lucide-react";

const SellerDashboard = () => {
  const navigate = useNavigate();

  const [tab, setTab] = useState("dashboard");

  const [stats, setStats] = useState({
    totalProducts: 0,
    totalOrders: 0,
    totalEarnings: 0,
    chartData: [],
  });

  const token = localStorage.getItem("token");

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

  const logoutHandler = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/");
  };

  const menu = ["dashboard", "products", "orders", "earnings"];

  return (
    <div className="min-h-screen bg-[#f4f7fc] text-[#0f172a]">
      {" "}
      <Navbar />
      <div className="flex pt-18">
        {/* SIDEBAR */}
        <div className="w-64 h-screen fixed left-0 top-0 bg-[#0f172a] text-white pt-19 px-6 shadow-2xl flex flex-col">
          <div className="mb-10">
            <h2 className="text-3xl font-bold text-[#3dadad]">KashmirCraft</h2>

            <p className="text-gray-400 mt-0.5">Seller Panel</p>
          </div>

          <button
            onClick={() => navigate("/")}
            className="w-full flex items-center gap-3 mb-8 px-4 py-3 rounded-xl bg-[#35898f] text-white font-semibold hover:bg-[#162547] transition"
          >
            <Home size={20} />
            Back To Home
          </button>

          {menu.map((t) => (
            <div
              key={t}
              onClick={() => setTab(t)}
              className={`mb-4 px-5 py-2 rounded-2xl cursor-pointer transition-all duration-300 ${
                tab === t
                  ? "bg-[#11414b] text-white font-semibold shadow-lg"
                  : "hover:bg-white/10"
              }`}
            >
              {t.toUpperCase()}
            </div>
          ))}

          <button
            onClick={logoutHandler}
            className="mt-auto mb-10 flex items-center justify-center gap-2 py-4 rounded-2xl bg-red-500 hover:bg-red-600 transition text-white font-semibold"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>

        {/* MAIN */}
        <div className="ml-64 w-full px-10 py-8">
          <div className="flex justify-between items-center mb-10">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-5xl font-bold"
            >
              Seller
              <span className="text-[#1b6672] ml-3">Dashboard</span>
            </motion.h1>

            <div className="bg-white px-6 py-4 rounded-3xl shadow-md border border-slate-200">
              {" "}
              <p className="text-sm text-gray-500">Welcome Back</p>
              <h3 className="font-bold text-lg">Seller</h3>
            </div>
          </div>

          {tab === "dashboard" && (
            <>
              <div className="grid md:grid-cols-3 gap-8 mb-10">
                {[
                  {
                    title: "Products",
                    value: stats.totalProducts,
                    icon: <Package size={32} />,
                  },
                  {
                    title: "Orders",
                    value: stats.totalOrders,
                    icon: <ShoppingBag size={32} />,
                  },
                  {
                    title: "Revenue",
                    value: `₹${stats.totalEarnings}`,
                    icon: <IndianRupee size={32} />,
                  },
                ].map((card, i) => (
                  <motion.div
                    key={i}
                    whileHover={{ scale: 1.05 }}
                    className="bg-white rounded-3xl p-8 shadow-md hover:shadow-xl transition border border-slate-200"
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-gray-500">{card.title}</p>

                        <h2 className="text-4xl font-bold text-[#1f2937] mt-3">
                          {card.value}
                        </h2>
                      </div>

                      <div className="bg-blue-100 p-4 rounded-2xl text-[#115f62]">
                        {card.icon}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="bg-white rounded-3xl p-8 shadow-md border border-slate-200">
                <h2 className="text-2xl font-bold mb-6 text-[#1f2937]">
                  Earnings Analytics
                </h2>

                <ResponsiveContainer width="100%" height={350}>
                  <LineChart data={stats.chartData || []}>
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />

                    <Line
                      type="monotone"
                      dataKey="earnings"
                      stroke="#3b82f6"
                      strokeWidth={4}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </>
          )}

          {tab === "products" && (
            <>
              <ProductForm />
              <ProductList />
            </>
          )}

          {tab === "orders" && <Orders />}

          {tab === "earnings" && <Earnings />}
        </div>
      </div>
    </div>
  );
};

export default SellerDashboard;
