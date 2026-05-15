import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  LayoutDashboard,
  Users,
  ShoppingBag,
  Package,
  LogOut,
  CheckCircle,
  XCircle,
  IndianRupee,
  Trash2,
  BarChart3,
  ShieldBan,
} from "lucide-react";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
} from "recharts";

export default function AdminPanel() {
  const [active, setActive] = useState("Dashboard");

  const [vendors, setVendors] = useState([]);
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [stats, setStats] = useState({});

  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchVendors();
    fetchProducts();
    fetchOrders();
    fetchStats();
  }, []);

  // ================= FETCH =================

  const fetchVendors = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/admin/vendors", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      setVendors(Array.isArray(data) ? data : []);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchProducts = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/admin/products", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      setProducts(Array.isArray(data) ? data : []);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchOrders = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/admin/orders", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      setOrders(Array.isArray(data) ? data : []);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchStats = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/admin/dashboard", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      setStats(data || {});
    } catch (err) {
      console.log(err);
    }
  };

  // ================= ACTIONS =================

  const approveVendor = async (id) => {
    try {
      await fetch(`http://localhost:5000/api/admin/vendors/approve/${id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      fetchVendors();
    } catch (err) {
      console.log(err);
    }
  };

  const rejectVendor = async (id) => {
    try {
      await fetch(`http://localhost:5000/api/admin/vendors/reject/${id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      fetchVendors();
    } catch (err) {
      console.log(err);
    }
  };

  const blockVendor = async (id) => {
    try {
      await fetch(`http://localhost:5000/api/admin/vendors/block/${id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      fetchVendors();
    } catch (err) {
      console.log(err);
    }
  };

  const deleteProduct = async (id) => {
    try {
      const confirmDelete = window.confirm("Delete this product?");

      if (!confirmDelete) return;

      await fetch(`http://localhost:5000/api/admin/products/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      fetchProducts();
    } catch (err) {
      console.log(err);
    }
  };

  const logout = () => {
    localStorage.clear();
    window.location.href = "/auth";
  };

  // ================= COUNTS =================

  const pendingCount = vendors.filter((v) => v.status === "pending").length;

  const approvedCount = vendors.filter((v) => v.status === "approved").length;

  const rejectedCount = vendors.filter((v) => v.status === "rejected").length;

  // ================= CHART DATA =================

  const chartData = [
    {
      name: "Orders",
      value: stats.totalOrders || orders.length || 0,
    },
    {
      name: "Products",
      value: stats.totalProducts || products.length || 0,
    },
    {
      name: "Vendors",
      value: stats.totalVendors || vendors.length || 0,
    },
  ];

  return (
    <div className="min-h-screen bg-[#f4f1ea] flex text-[#1f2937]">
      {/* SIDEBAR */}
      <div className="w-[280px] bg-[#315765] text-white p-6 flex flex-col justify-between shadow-2xl sticky top-0 h-screen">
        <div>
          <h1 className="text-4xl font-bold mb-12 tracking-tight">
            KashmirCraft
          </h1>

          <div className="space-y-4">
            {[
              {
                name: "Dashboard",
                icon: <LayoutDashboard size={20} />,
              },
              {
                name: "Vendors",
                icon: <Users size={20} />,
              },
              {
                name: "Products",
                icon: <ShoppingBag size={20} />,
              },
              {
                name: "Orders",
                icon: <Package size={20} />,
              },
            ].map((item) => (
              <button
                key={item.name}
                onClick={() => setActive(item.name)}
                className={`w-full flex items-center gap-4 px-5 py-4 rounded-3xl text-lg transition-all duration-300 ${
                  active === item.name
                    ? "bg-white text-[#315765] shadow-lg"
                    : "hover:bg-white/10"
                }`}
              >
                {item.icon}
                {item.name}
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={logout}
          className="flex items-center justify-center gap-3 px-5 py-5 rounded-2xl bg-red-500 hover:bg-red-600 transition-all text-xl"
        >
          <LogOut size={24} />
          Logout
        </button>
      </div>

      {/* MAIN */}
      <div className="flex-1 p-10 overflow-y-auto">
        {/* TOP */}
        <div className="flex justify-between items-center mb-10 flex-wrap gap-5">
          <div>
            <h2 className="text-5xl font-bold text-[#315765] tracking-tight">
              {active}
            </h2>

            <p className="text-gray-500 mt-2 text-xl">
              Manage your marketplace professionally.
            </p>
          </div>

          <div className="bg-white px-6 py-4 rounded-[30px] shadow-lg flex items-center gap-4">
            <img
              src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
              className="w-16 h-16 rounded-full"
              alt="admin"
            />

            <div>
              <p className="font-bold text-xl">Admin</p>
              <p className="text-gray-500 text-lg">Super Administrator</p>
            </div>
          </div>
        </div>

        {/* DASHBOARD */}
        {active === "Dashboard" && (
          <>
            {/* STATS */}
            <div className="grid md:grid-cols-4 gap-6">
              <motion.div
                whileHover={{ y: -5 }}
                className="bg-white rounded-[32px] p-7 shadow-lg"
              >
                <p className="text-gray-500 text-lg">Pending Vendors</p>

                <h3 className="text-4xl font-bold text-yellow-500 mt-3">
                  {pendingCount}
                </h3>
              </motion.div>

              <motion.div
                whileHover={{ y: -5 }}
                className="bg-white rounded-[32px] p-7 shadow-lg"
              >
                <p className="text-gray-500 text-lg">Approved Vendors</p>

                <h3 className="text-4xl font-bold text-green-600 mt-3">
                  {approvedCount}
                </h3>
              </motion.div>

              <motion.div
                whileHover={{ y: -5 }}
                className="bg-white rounded-[32px] p-7 shadow-lg"
              >
                <p className="text-gray-500 text-lg">Rejected Vendors</p>

                <h3 className="text-4xl font-bold text-red-500 mt-3">
                  {rejectedCount}
                </h3>
              </motion.div>

              <motion.div
                whileHover={{ y: -5 }}
                className="bg-white rounded-[32px] p-7 shadow-lg"
              >
                <p className="text-gray-500 text-lg">Total Revenue</p>

                <h3 className="text-4xl  font-bold text-[#315765] mt-3 flex items-center gap-2">
                  <IndianRupee size={38} />
                  {stats.totalRevenue || 0}
                </h3>
              </motion.div>
            </div>

            {/* GRAPH */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="bg-white rounded-[36px] p-10 shadow-xl mt-10"
            >
              <div className="flex justify-between items-center mb-8 flex-wrap gap-5">
                <div>
                  <h3 className="text-2xl font-bold text-[#315765]">
                    Marketplace Analytics
                  </h3>

                  <p className="text-gray-500 mt-2 text-lg">
                    Live backend marketplace overview
                  </p>
                </div>

                <BarChart3 className="text-[#315765]" size={42} />
              </div>

              <ResponsiveContainer width="100%" height={450}>
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />

                  <XAxis dataKey="name" />

                  <YAxis />

                  <Tooltip />

                  <Legend />

                  <Bar
                    dataKey="value"
                    fill="#315765"
                    radius={[14, 14, 0, 0]}
                    animationDuration={2500}
                  />
                </BarChart>
              </ResponsiveContainer>
            </motion.div>
          </>
        )}

        {/* VENDORS */}
        {active === "Vendors" && (
          <div className="grid gap-6">
            {vendors.map((vendor) => (
              <div
                key={vendor._id}
                className="bg-white p-7 rounded-[32px] shadow-lg"
              >
                <div className="flex justify-between flex-wrap gap-6 items-center">
                  <div>
                    <h3 className="text-2xl font-bold text-[#315765]">
                      {vendor.name}
                    </h3>

                    <p className="text-gray-500 mt-2 text-lg">{vendor.email}</p>

                    <p className="mt-3 text-lg">
                      Shop: {vendor.shopName || "N/A"}
                    </p>

                    <p className="mt-2 text-sm uppercase font-semibold">
                      Status:
                      <span
                        className={
                          vendor.status === "approved"
                            ? "text-green-600"
                            : vendor.status === "rejected"
                              ? "text-red-600"
                              : vendor.status === "blocked"
                                ? "text-gray-700"
                                : "text-yellow-500"
                        }
                      >
                        {" "}
                        {vendor.status}
                      </span>
                    </p>
                  </div>

                  <div className="flex gap-3 flex-wrap">
                    <button
                      onClick={() => approveVendor(vendor._id)}
                      className="bg-green-600 hover:bg-green-700 transition text-white px-6 py-4 rounded-3xl flex items-center gap-2"
                    >
                      <CheckCircle size={20} />
                      Approve
                    </button>

                    <button
                      onClick={() => rejectVendor(vendor._id)}
                      className="bg-red-600 hover:bg-red-700 transition text-white px-6 py-4 rounded-3xl flex items-center gap-2"
                    >
                      <XCircle size={20} />
                      Reject
                    </button>

                    <button
                      onClick={() => blockVendor(vendor._id)}
                      className="bg-gray-700 hover:bg-gray-800 transition text-white px-6 py-4 rounded-3xl flex items-center gap-2"
                    >
                      <ShieldBan size={20} />
                      Block
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* PRODUCTS */}
        {active === "Products" && (
          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-7">
            {products.map((product) => (
              <motion.div
                whileHover={{ y: -6 }}
                key={product._id}
                className="bg-white rounded-[32px] overflow-hidden shadow-xl"
              >
                <img
                  src={product.images?.[0] || "https://via.placeholder.com/300"}
                  alt={product.name}
                  className="w-full h-72 object-cover"
                />

                <div className="p-6">
                  <h3 className="text-2xl font-bold text-[#315765]">
                    {product.name}
                  </h3>

                  <p className="text-2xl  text-[#C8A97E] font-bold mt-3">
                    ₹{product.price}
                  </p>

                  <p className="text-gray-500 mt-3 line-clamp-2">
                    {product.description}
                  </p>

                  <button
                    onClick={() => deleteProduct(product._id)}
                    className="mt-6 w-full bg-red-600 hover:bg-red-700 transition text-white py-4 rounded-xl flex items-center justify-center gap-2"
                  >
                    <Trash2 size={20} />
                    Delete Product
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* ORDERS */}
        {active === "Orders" && (
          <div className="space-y-6">
            {orders.map((order) => (
              <motion.div
                whileHover={{ y: -4 }}
                key={order._id}
                className="bg-white rounded-[32px] p-7 shadow-lg"
              >
                <div className="flex justify-between flex-wrap gap-6">
                  <div>
                    <h3 className="text-2xl font-bold text-[#315765]">
                      Order #{order._id?.slice(-6)}
                    </h3>

                    <p className="text-gray-500 mt-2 text-lg">
                      Buyer: {order?.user?.name || "User"}
                    </p>

                    <p className="text-gray-500 mt-1">
                      Payment: {order.paymentMethod || "Online"}
                    </p>
                  </div>

                  <div>
                    <p className="text-2xl  text-[#C8A97E] font-bold mt-3">
                      ₹{order.totalAmount}
                    </p>

                    <p className="text-green-600 mt-3 text-lg">
                      Admin Earning: ₹{(order.totalAmount * 0.2).toFixed(0)}
                    </p>

                    <p className="text-blue-600 text-lg">
                      Seller Earning: ₹{(order.totalAmount * 0.8).toFixed(0)}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
