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
  const [selectedVendor, setSelectedVendor] = useState(null);

  const storedUser =
    localStorage.getItem("user") || localStorage.getItem("userInfo");

  const user = storedUser ? JSON.parse(storedUser) : null;

  const token = user?.token || "";

  useEffect(() => {
    if (!token) {
      console.log("No token found");
      return;
    }

    fetchVendors();
    fetchProducts();
    fetchOrders();
    fetchStats();
  }, [token]);

  // ================= FETCH =================

  const fetchVendors = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/admin/vendors", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        console.log("Vendor API Error:", res.status);
        return;
      }

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

      if (!res.ok) {
        console.log("Product API Error:", res.status);
        return;
      }

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

      if (!res.ok) {
        console.log("Order API Error:", res.status);
        return;
      }

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

      if (!res.ok) {
        console.log("Stats API Error:", res.status);
        return;
      }

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

    <p className="text-gray-500 mt-2 text-lg">
      {vendor.email}
    </p>

    <p className="mt-3 text-lg">
      Shop: {vendor.shopName || "N/A"}
    </p>

    <div className="mt-4 space-y-2 text-sm">
      <p><strong>Phone:</strong> {vendor.phone || "N/A"}</p>
      <p><strong>Aadhaar:</strong> {vendor.aadhaarNumber || "N/A"}</p>
      <p><strong>PAN:</strong> {vendor.panNumber || "N/A"}</p>
      <p><strong>GST:</strong> {vendor.gstNumber || "N/A"}</p>

      <p>
        <strong>Bank:</strong>{" "}
        {vendor?.sellerDetails?.bankName || "N/A"}
      </p>

      <p>
        <strong>Account No:</strong>{" "}
        {vendor?.sellerDetails?.accountNumber || "N/A"}
      </p>

      <p>
        <strong>IFSC:</strong>{" "}
        {vendor?.sellerDetails?.ifscCode || "N/A"}
      </p>

      <p>
        <strong>UPI:</strong>{" "}
        {vendor?.sellerDetails?.upiId || "N/A"}
      </p>
    </div>

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
      onClick={() => setSelectedVendor(vendor)}
      className="bg-[#315765] text-white px-6 py-4 rounded-3xl"
    >
      View Details
    </button>
  </div>
</div>
              </div>
            ))}
          </div>
        )}
{/* VENDOR DETAILS MODAL */}
{selectedVendor && (
  <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-5">
    <div className="bg-white w-full max-w-5xl rounded-[32px] p-8 max-h-[90vh] overflow-y-auto relative">

      <button
        onClick={() => setSelectedVendor(null)}
        className="absolute top-5 right-5 bg-red-500 text-white px-4 py-2 rounded-xl"
      >
        Close
      </button>

      <h2 className="text-3xl font-bold text-[#315765] mb-6">
        Seller Verification Details
      </h2>

      <div className="grid md:grid-cols-2 gap-6">

        <div>
          <p><strong>Name:</strong> {selectedVendor.name}</p>
          <p><strong>Email:</strong> {selectedVendor.email}</p>
          <p><strong>Phone:</strong> {selectedVendor.phone || "N/A"}</p>
          <p><strong>Shop:</strong> {selectedVendor.shopName || "N/A"}</p>
          <p><strong>Aadhaar:</strong> {selectedVendor.aadhaarNumber || "N/A"}</p>
          <p><strong>PAN:</strong> {selectedVendor.panNumber || "N/A"}</p>
          <p><strong>GST:</strong> {selectedVendor.gstNumber || "N/A"}</p>
        </div>

        <div>
          <p>
            <strong>Bank:</strong>{" "}
            {selectedVendor?.sellerDetails?.bankName || "N/A"}
          </p>

          <p>
            <strong>Account Number:</strong>{" "}
            {selectedVendor?.sellerDetails?.accountNumber || "N/A"}
          </p>

          <p>
            <strong>IFSC:</strong>{" "}
            {selectedVendor?.sellerDetails?.ifscCode || "N/A"}
          </p>

          <p>
            <strong>UPI:</strong>{" "}
            {selectedVendor?.sellerDetails?.upiId || "N/A"}
          </p>

          <p>
            <strong>Status:</strong>{" "}
            {selectedVendor.status}
          </p>
        </div>
      </div>

      <h3 className="text-xl font-bold mt-8 mb-4">
        Uploaded Documents
      </h3>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">

        {selectedVendor.profileImage && (
          <a
            href={`http://localhost:5000/uploads/${selectedVendor.profileImage}`}
            target="_blank"
            rel="noreferrer"
          >
            <img
              src={`http://localhost:5000/uploads/${selectedVendor.profileImage}`}
              alt=""
              className="w-full h-40 object-cover rounded-xl border"
            />
          </a>
        )}

        {selectedVendor.aadhaarFront && (
          <a
            href={`http://localhost:5000/uploads/${selectedVendor.aadhaarFront}`}
            target="_blank"
            rel="noreferrer"
          >
            <img
              src={`http://localhost:5000/uploads/${selectedVendor.aadhaarFront}`}
              alt=""
              className="w-full h-40 object-cover rounded-xl border"
            />
          </a>
        )}

        {selectedVendor.aadhaarBack && (
          <a
            href={`http://localhost:5000/uploads/${selectedVendor.aadhaarBack}`}
            target="_blank"
            rel="noreferrer"
          >
            <img
              src={`http://localhost:5000/uploads/${selectedVendor.aadhaarBack}`}
              alt=""
              className="w-full h-40 object-cover rounded-xl border"
            />
          </a>
        )}

        {selectedVendor.panCardImage && (
          <a
            href={`http://localhost:5000/uploads/${selectedVendor.panCardImage}`}
            target="_blank"
            rel="noreferrer"
          >
            <img
              src={`http://localhost:5000/uploads/${selectedVendor.panCardImage}`}
              alt=""
              className="w-full h-40 object-cover rounded-xl border"
            />
          </a>
        )}

      </div>

      <div className="flex gap-4 mt-8 flex-wrap">

        <button
          onClick={() => approveVendor(selectedVendor._id)}
          className="bg-green-600 text-white px-6 py-3 rounded-xl"
        >
          Approve
        </button>

        <button
          onClick={() => rejectVendor(selectedVendor._id)}
          className="bg-red-600 text-white px-6 py-3 rounded-xl"
        >
          Reject
        </button>

        <button
          onClick={() => blockVendor(selectedVendor._id)}
          className="bg-gray-700 text-white px-6 py-3 rounded-xl"
        >
          Block
        </button>

      </div>
    </div>
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
          <div className="space-y-5">
            {orders.length === 0 ? (
              <div className="bg-white rounded-[28px] p-8 shadow-lg text-center">
                <h2 className="text-2xl font-bold text-[#315765]">
                  No Orders Found
                </h2>

                <p className="text-gray-500 mt-2">
                  Orders will appear here automatically
                </p>
              </div>
            ) : (
              orders.map((order) => (
                <div
                  key={order._id}
                  className="bg-white rounded-[28px] p-6 shadow-lg"
                >
                  <div className="flex justify-between flex-wrap gap-5">
                    <div>
                      <h3 className="text-2xl font-bold text-[#315765]">
                        Order #{order._id.slice(-6)}
                      </h3>

                      <p className="text-gray-500 mt-2">
                        Buyer: {order?.buyer?.name || "Unknown"}
                      </p>

                      <p className="text-gray-500">
                        Seller: {order?.seller?.name || "Unknown"}
                      </p>

                      <p className="text-gray-500">
                        Product: {order?.product?.name || "Unknown"}
                      </p>

                      <p className="mt-2 text-blue-600">
                        Status: {order.status}
                      </p>
                    </div>

                    <div>
                      <p className="text-3xl font-bold text-[#C8A97E]">
                        ₹{order.amount || 0}
                      </p>

                      <p className="text-green-600 mt-2">
                        Admin: ₹{order.adminShare || 0}
                      </p>

                      <p className="text-blue-600">
                        Seller: ₹{order.sellerShare || 0}
                      </p>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
}
