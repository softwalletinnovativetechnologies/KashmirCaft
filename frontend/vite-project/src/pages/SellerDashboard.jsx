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

import {
Package,
ShoppingBag,
IndianRupee,
Home,
LogOut,
} from "lucide-react";

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
}
);

    setStats(res.data);
  } catch (err) {
    console.log(
      "Dashboard error:",
      err.response?.data || err.message
    );
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

return ( <div className="min-h-screen bg-gradient-to-br from-[#f8f4ea] via-[#faf7f2] to-[#efe7d4] text-[#1f2937]"> <Navbar />
  <div className="flex pt-24">
    {/* SIDEBAR */}
    <div className="w-72 h-screen fixed left-0 top-0 bg-[#1f2937] text-white pt-24 px-6 shadow-2xl">

      <div className="mb-10">
        <h2 className="text-3xl font-bold text-[#d4af37]">
          KashmirCraft
        </h2>

        <p className="text-gray-400 mt-2">
          Seller Panel
        </p>
      </div>

      <button
        onClick={() => navigate("/")}
        className="w-full flex items-center gap-3 mb-8 px-4 py-3 rounded-xl bg-[#d4af37] text-black font-semibold"
      >
        <Home size={20} />
        Back To Home
      </button>

      {menu.map((t) => (
        <div
          key={t}
          onClick={() => setTab(t)}
          className={`mb-4 px-5 py-4 rounded-2xl cursor-pointer transition-all duration-300 ${
            tab === t
              ? "bg-[#d4af37] text-black font-semibold"
              : "hover:bg-white/10"
          }`}
        >
          {t.toUpperCase()}
        </div>
      ))}

      <button
        onClick={logoutHandler}
        className="absolute bottom-10 left-6 right-6 flex items-center justify-center gap-2 py-4 rounded-2xl bg-red-500 text-white font-semibold"
      >
        <LogOut size={18} />
        Logout
      </button>
    </div>

    {/* MAIN */}
    <div className="ml-72 w-full px-10">

      <div className="flex justify-between items-center mb-10">

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl font-bold text-[#1f2937]"
        >
          Seller
          <span className="text-[#d4af37] ml-3">
            Dashboard
          </span>
        </motion.h1>

        <div className="bg-white px-6 py-4 rounded-3xl shadow-lg">
          <p className="text-sm text-gray-500">
            Welcome Back
          </p>

          <h3 className="font-bold text-lg">
            Seller
          </h3>
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
                className="bg-white rounded-3xl p-8 shadow-xl border border-[#f4e7c5]"
              >
                <div className="flex justify-between items-center">

                  <div>
                    <p className="text-gray-500">
                      {card.title}
                    </p>

                    <h2 className="text-4xl font-bold text-[#1f2937] mt-3">
                      {card.value}
                    </h2>
                  </div>

                  <div className="bg-[#d4af37]/20 p-4 rounded-2xl text-[#d4af37]">
                    {card.icon}
                  </div>

                </div>
              </motion.div>
            ))}
          </div>

          <div className="bg-white rounded-3xl p-8 shadow-xl border border-[#f4e7c5]">

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
                  stroke="#d4af37"
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
