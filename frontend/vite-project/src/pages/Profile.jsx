import { useEffect, useState } from "react";
import API from "../services/api";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
export default function Profile() {
  const [user, setUser] = useState(null);
  const [orders, setOrders] = useState([]);
  const [addresses, setAddresses] = useState([]);

  const [editing, setEditing] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState(null);
  const navigate = useNavigate();
  const [profileData, setProfileData] = useState({
    name: "",
    email: "",
  });

  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
  });

  useEffect(() => {
    loadUser();
    fetchAll();
  }, []);

  const loadUser = () => {
    const localUser = JSON.parse(localStorage.getItem("user"));

    if (localUser) {
      setUser(localUser);
      setProfileData({
        name: localUser.name || "",
        email: localUser.email || "",
      });
    }
  };

  const fetchAll = async () => {
    try {
      const res = await API.get("/user/profile");
      const userData = res.data.user || res.data;

      setUser(userData);
      setProfileData({
        name: userData.name || "",
        email: userData.email || "",
      });

      // 🔥 orders safe
      try {
        const orderRes = await API.get("/user/orders");
        setOrders(orderRes.data || []);
      } catch {
        setOrders([]);
      }

      // 🔥 ADDRESS FIX (IMPORTANT)
      try {
        const addrRes = await API.get("/user/addresses");

        console.log("ADDRESS RESPONSE:", addrRes.data);

        let addressData = [];

        if (Array.isArray(addrRes.data)) {
          addressData = addrRes.data;
        } else if (Array.isArray(addrRes.data.addresses)) {
          addressData = addrRes.data.addresses;
        }

        setAddresses(addressData);
      } catch (err) {
        console.log("ADDRESS ERROR:", err);
        setAddresses([]);
      }
    } catch (err) {
      console.log("API ERROR:", err.response?.data || err.message);
    }
  };

  const updateProfile = async () => {
    try {
      await API.put("/user/profile", profileData);
      localStorage.setItem("user", JSON.stringify(profileData));
      setEditing(false);
      fetchAll();
    } catch (err) {
      console.log(err);
    }
  };

  const handleSubmit = async () => {
    try {
      if (editId) {
        await API.put(`/user/addresses/${editId}`, form);
      } else {
        await API.post("/user/addresses", form);
      }

      resetForm();
      setShowForm(false);
      setEditId(null);
      fetchAll();
    } catch (err) {
      console.log(err);
    }
  };

  const deleteAddress = async (id) => {
    await API.delete(`/user/addresses/${id}`);
    fetchAll();
  };

  const editAddress = (addr) => {
    setForm(addr);
    setEditId(addr._id);
    setShowForm(true);
  };

  const resetForm = () => {
    setForm({
      fullName: "",
      phone: "",
      address: "",
      city: "",
      state: "",
      pincode: "",
    });
  };

  return (
    <div className="min-h-screen bg-[#f6f3ef] p-6 text-gray-900">
      <div className="max-w-6xl mx-auto space-y-6">
        <button
          onClick={() => navigate("/")}
          className="px-4 py-2 bg-white shadow rounded-lg border hover:bg-gray-50 transition text-[#7F5430]"
        >
          ← Back to Home
        </button>
        {/* PROFILE */}
        <div className="bg-white p-6 rounded-2xl shadow flex items-center gap-5">
          <div className="w-16 h-16 bg-[#c8a97e] text-white rounded-full flex items-center justify-center text-xl">
            {profileData.name?.charAt(0) || "U"}
          </div>

          <div className="flex-1 space-y-2">
            <input
              disabled={!editing}
              value={profileData.name}
              onChange={(e) =>
                setProfileData({ ...profileData, name: e.target.value })
              }
              className="w-full border p-2 rounded text-gray-900 bg-white"
            />

            <input
              disabled
              value={profileData.email}
              className="w-full border p-2 rounded bg-gray-100 text-gray-900"
            />
          </div>

          {editing ? (
            <button
              onClick={updateProfile}
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

        {/* ADDRESSES */}
        <div className="bg-white p-6 rounded-2xl shadow">
          <div className="flex justify-between">
            <h2 className="text-xl font-semibold">My Addresses</h2>

            <button
              onClick={() => {
                resetForm();
                setEditId(null);
                setShowForm(true);
              }}
              className="bg-[#315765] text-white px-4 py-2 rounded"
            >
              + Add
            </button>
          </div>

          {addresses.length === 0 ? (
            <p className="text-gray-500 mt-4">No address added</p>
          ) : (
            <div className="mt-4 space-y-3">
              {addresses.map((a) => (
                <div
                  key={a._id}
                  className="border p-4 rounded flex justify-between"
                >
                  <div>
                    <p className="font-medium">{a.fullName}</p>
                    <p className="text-sm">
                      {a.address}, {a.city}
                    </p>
                  </div>

                  <div className="flex gap-2">
                    <button onClick={() => editAddress(a)}>Edit</button>
                    <button onClick={() => deleteAddress(a._id)}>Delete</button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* MODAL */}
        <AnimatePresence>
          {showForm && (
            <motion.div className="fixed inset-0 bg-black/40 flex justify-center items-center">
              <div className="bg-white p-6 rounded w-[300px] space-y-3">
                {Object.keys(form).map((f) => (
                  <input
                    key={f}
                    value={form[f]}
                    placeholder={f}
                    className="w-full border p-2 rounded"
                    onChange={(e) => setForm({ ...form, [f]: e.target.value })}
                  />
                ))}

                <button
                  onClick={handleSubmit}
                  className="bg-[#7F5430] text-white w-full py-2 rounded"
                >
                  Save
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
