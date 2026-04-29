import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Profile() {
  const [user, setUser] = useState(null);
  const [editing, setEditing] = useState(false);

  const [profile, setProfile] = useState({
    name: "",
    email: "",
  });

  const [addresses, setAddresses] = useState([]);
  const [orders, setOrders] = useState([]);

  const [showForm, setShowForm] = useState(false);
  const [editIndex, setEditIndex] = useState(null);

  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    isDefault: false,
  });

  useEffect(() => {
    const u = JSON.parse(localStorage.getItem("user"));
    setUser(u);

    if (u) {
      setProfile({
        name: u.name,
        email: u.email,
      });
    }

    setAddresses(JSON.parse(localStorage.getItem("addresses")) || []);

    // 🔥 dummy orders (later backend)
    setOrders([
      {
        id: "ORD123",
        date: "12 Apr 2026",
        status: "Delivered",
        total: "₹2,499",
        items: ["Pashmina Shawl", "Dry Fruits Box"],
      },
      {
        id: "ORD456",
        date: "20 Apr 2026",
        status: "Processing",
        total: "₹899",
        items: ["Kashmiri Kahwa"],
      },
    ]);
  }, []);

  const saveProfile = () => {
    const updated = { ...user, name: profile.name };
    localStorage.setItem("user", JSON.stringify(updated));
    setUser(updated);
    setEditing(false);
  };

  const saveAddress = () => {
    let updated = [...addresses];

    if (form.isDefault) {
      updated = updated.map((a) => ({ ...a, isDefault: false }));
    }

    if (editIndex !== null) {
      updated[editIndex] = form;
    } else {
      updated.push(form);
    }

    setAddresses(updated);
    localStorage.setItem("addresses", JSON.stringify(updated));

    setShowForm(false);
    setEditIndex(null);
    resetForm();
  };

  const resetForm = () => {
    setForm({
      fullName: "",
      phone: "",
      address: "",
      city: "",
      state: "",
      pincode: "",
      isDefault: false,
    });
  };

  return (
    <div className="min-h-screen bg-[#f6f3ef] p-6 text-gray-900">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* PROFILE */}
        <div className="bg-white rounded-2xl shadow p-6 flex items-center gap-6">
          <div className="w-16 h-16 bg-[#c8a97e] text-white rounded-full flex items-center justify-center text-xl">
            {user?.name?.charAt(0)}
          </div>

          <div className="flex-1">
            <input
              disabled={!editing}
              value={profile.name}
              onChange={(e) => setProfile({ ...profile, name: e.target.value })}
              className="w-full border p-2 rounded-md text-gray-900 bg-white"
            />

            <input
              disabled
              value={profile.email}
              className="w-full mt-2 border p-2 rounded-md bg-gray-100 text-gray-900"
            />
          </div>

          {editing ? (
            <button
              onClick={saveProfile}
              className="bg-[#7F5430] text-white px-4 py-2 rounded"
            >
              Save
            </button>
          ) : (
            <button
              onClick={() => setEditing(true)}
              className="border px-4 py-2 rounded"
            >
              Edit
            </button>
          )}
        </div>

        {/* ORDERS */}
        <div className="bg-white rounded-2xl shadow p-6">
          <h2 className="text-lg font-semibold mb-4">My Orders</h2>

          <div className="space-y-4">
            {orders.map((o) => (
              <div
                key={o.id}
                className="border rounded-xl p-4 flex justify-between"
              >
                <div>
                  <p className="font-medium">{o.id}</p>
                  <p className="text-sm text-gray-600">{o.date}</p>
                  <p className="text-sm">{o.items.join(", ")}</p>
                </div>

                <div className="text-right">
                  <p className="font-semibold">{o.total}</p>
                  <span
                    className={`text-sm px-2 py-1 rounded ${
                      o.status === "Delivered"
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {o.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ADDRESSES */}
        <div className="bg-white rounded-2xl shadow p-6">
          <h2 className="text-lg font-semibold mb-4">My Addresses</h2>

          <div className="grid gap-4">
            {addresses.map((a, i) => (
              <div key={i} className="border p-4 rounded-xl">
                <p>{a.fullName}</p>
                <p className="text-sm text-gray-600">
                  {a.address}, {a.city}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
