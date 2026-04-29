import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function AdminPanel() {
  const [active, setActive] = useState("Dashboard");

  const [stats, setStats] = useState({});
  const [vendors, setVendors] = useState([]);
  const [orders, setOrders] = useState([]);

  const token = localStorage.getItem("token");

  const menu = [
    "Dashboard",
    "Vendors",
    "Approvals",
    "Products",
    "Orders",
    "Customers",
    "Revenue",
    "Payouts",
    "Reports",
    "Banners",
    "Featured Shops",
    "Settings",
  ];

  // ================= FETCH DATA =================
  useEffect(() => {
    const fetchData = async () => {
      try {
        // DASHBOARD
        const dashRes = await fetch(
          "http://localhost:5000/api/admin/dashboard",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        if (dashRes.ok) {
          const data = await dashRes.json();
          setStats(data);
        }

        // VENDORS
        const vendorRes = await fetch(
          "http://localhost:5000/api/admin/vendors",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        if (vendorRes.ok) {
          const data = await vendorRes.json();
          setVendors(Array.isArray(data) ? data : []);
        }

        // ORDERS (safe fallback)
        const orderRes = await fetch("http://localhost:5000/api/admin/orders", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (orderRes.ok) {
          const data = await orderRes.json();
          setOrders(Array.isArray(data) ? data : []);
        } else {
          setOrders([]); // avoid crash
        }
      } catch (err) {
        console.log("Admin fetch error:", err);
      }
    };

    fetchData();
  }, [token]);

  // ================= DYNAMIC CARDS =================
  const cards = [
    { title: "Total Vendors", value: stats.totalVendors || 0 },
    { title: "Pending Approvals", value: stats.pendingProducts || 0 },
    { title: "Total Orders", value: stats.totalOrders || 0 },
    { title: "Monthly Revenue", value: `₹${stats.revenue || 0}` },
    { title: "Customers", value: stats.totalCustomers || 0 },
    { title: "Products Live", value: stats.totalProducts || 0 },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#dce9e8] via-[#e8f0ef] to-[#d8e2dd] flex">
      {/* SIDEBAR */}
      <aside className="w-[290px] min-h-screen bg-white/40 backdrop-blur-2xl border-r border-white/50 p-6 hidden lg:block">
        <div className="mb-10">
          <h1 className="text-3xl font-serif text-[#315765]">KashmirCraft</h1>
          <p className="text-xs tracking-[4px] uppercase text-[#7F5430] mt-2">
            Admin Panel
          </p>
        </div>

        <div className="space-y-2">
          {menu.map((item, i) => (
            <motion.button
              key={i}
              whileHover={{ x: 6 }}
              onClick={() => setActive(item)}
              className={`w-full text-left px-5 py-3 rounded-2xl font-medium transition ${
                active === item
                  ? "bg-gradient-to-r from-[#315765] via-[#74A8A4] to-[#7F5430] text-white shadow-xl"
                  : "text-[#315765] hover:bg-white/70"
              }`}
            >
              {item}
            </motion.button>
          ))}
        </div>
      </aside>

      {/* MAIN */}
      <main className="flex-1 p-4 md:p-8">
        {/* TOPBAR */}
        <div className="rounded-[28px] bg-white/40 backdrop-blur-xl border border-white/50 px-6 py-5 flex flex-col md:flex-row gap-4 md:items-center md:justify-between shadow-lg">
          <div>
            <h2 className="text-3xl font-serif text-[#315765]">{active}</h2>
            <p className="text-gray-600 mt-1">
              Manage your marketplace professionally
            </p>
          </div>

          <div className="flex gap-3">
            <input
              placeholder="Search..."
              className="px-5 py-3 rounded-full bg-white outline-none border border-gray-200"
            />

            <button className="px-6 py-3 rounded-full bg-gradient-to-r from-[#315765] via-[#74A8A4] to-[#7F5430] text-white font-semibold shadow-xl">
              Admin
            </button>
          </div>
        </div>

        {/* ================= DASHBOARD ================= */}
        {active === "Dashboard" && (
          <div>
            {/* CARDS */}
            <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-6 mt-8">
              {cards.map((item, i) => (
                <motion.div
                  key={i}
                  whileHover={{ y: -8 }}
                  className="rounded-[28px] bg-white/60 backdrop-blur-xl border border-white/50 p-6 shadow-lg"
                >
                  <p className="text-gray-500">{item.title}</p>
                  <h3 className="text-4xl font-bold text-[#315765] mt-3">
                    {item.value}
                  </h3>
                </motion.div>
              ))}
            </div>

            {/* ANALYTICS */}
            <div className="grid lg:grid-cols-2 gap-6 mt-8">
              {/* GRAPH */}
              <div className="rounded-[28px] bg-white/60 p-6 shadow-lg">
                <h3 className="text-2xl font-serif text-[#315765]">
                  Monthly Revenue
                </h3>

                <div className="mt-8 h-64 flex items-end gap-3">
                  {[90, 140, 100, 180, 150, 220, 190].map((h, i) => (
                    <motion.div
                      key={i}
                      initial={{ height: 0 }}
                      animate={{ height: h }}
                      transition={{ delay: i * 0.1 }}
                      className="flex-1 rounded-t-xl bg-gradient-to-t from-[#315765] via-[#74A8A4] to-[#d8e2dd]"
                    />
                  ))}
                </div>
              </div>

              {/* VENDORS */}
              <div className="rounded-[28px] bg-white/60 p-6 shadow-lg">
                <h3 className="text-2xl font-serif text-[#315765]">
                  Recent Vendor Requests
                </h3>

                <div className="mt-6 space-y-4">
                  {(Array.isArray(vendors) ? vendors : [])
                    .slice(0, 3)
                    .map((vendor, i) => (
                      <div
                        key={i}
                        className="rounded-2xl bg-white p-4 flex justify-between items-center"
                      >
                        <div>
                          <p className="font-semibold text-[#315765]">
                            {vendor.name}
                          </p>
                          <p className="text-sm text-gray-500">
                            Seller Request
                          </p>
                        </div>

                        <span
                          className={`px-4 py-2 rounded-full text-sm ${
                            vendor.status === "approved"
                              ? "bg-green-100 text-green-700"
                              : "bg-yellow-100 text-yellow-700"
                          }`}
                        >
                          {vendor.status}
                        </span>
                      </div>
                    ))}
                </div>
              </div>
            </div>

            {/* ORDERS */}
            <div className="rounded-[28px] bg-white/60 p-6 shadow-lg mt-8 overflow-x-auto">
              <h3 className="text-2xl font-serif text-[#315765] mb-6">
                Recent Orders
              </h3>

              <table className="w-full min-w-[600px]">
                <thead>
                  <tr className="text-left text-[#315765]">
                    <th className="pb-4">Order ID</th>
                    <th className="pb-4">Customer</th>
                    <th className="pb-4">Amount</th>
                    <th className="pb-4">Status</th>
                    <th className="pb-4">Action</th>
                  </tr>
                </thead>

                <tbody>
                  {(Array.isArray(orders) ? orders : [])
                    .slice(0, 5)
                    .map((order, i) => (
                      <tr key={i} className="border-t border-gray-200">
                        <td className="py-4">{order._id?.slice(-6)}</td>
                        <td>{order.customerId?.name || "User"}</td>
                        <td>₹{order.total}</td>
                        <td>
                          <span className="px-4 py-2 rounded-full bg-[#dce9e8] text-[#315765] text-sm">
                            {order.status}
                          </span>
                        </td>
                        <td>
                          <button className="px-4 py-2 rounded-full bg-gradient-to-r from-[#315765] to-[#74A8A4] text-white text-sm">
                            View
                          </button>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* OTHER PAGES */}
        {active !== "Dashboard" && (
          <div className="mt-8 rounded-[28px] bg-white/60 p-12 shadow-lg text-center">
            <h3 className="text-4xl font-serif text-[#315765]">{active}</h3>
            <p className="mt-4 text-gray-600 text-lg">
              Full management module for {active} will be available here.
            </p>
          </div>
        )}
      </main>
    </div>
  );
}
