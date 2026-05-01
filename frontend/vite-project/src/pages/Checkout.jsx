import Navbar from "../components/Navbar";
import { useEffect, useState } from "react";

export default function Checkout() {
  const [cart, setCart] = useState([]);
  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);

  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
  });

  useEffect(() => {
    setCart(JSON.parse(localStorage.getItem("cart")) || []);
    setAddresses(JSON.parse(localStorage.getItem("addresses")) || []);
  }, []);

  // 🔥 CART UPDATE SYNC
  const updateCart = (updated) => {
    setCart(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
  };

  const increaseQty = (id) => {
    const updated = cart.map((item) =>
      item._id === id ? { ...item, qty: item.qty + 1 } : item,
    );
    updateCart(updated);
  };

  const decreaseQty = (id) => {
    const updated = cart
      .map((item) => (item._id === id ? { ...item, qty: item.qty - 1 } : item))
      .filter((item) => item.qty > 0);
    updateCart(updated);
  };

  const removeItem = (id) => {
    const updated = cart.filter((item) => item._id !== id);
    updateCart(updated);
  };

  const total = cart.reduce((a, c) => a + c.price * c.qty, 0);

  // ✅ SAVE ADDRESS (UNCHANGED)
  const saveAddress = () => {
    if (!form.fullName || !form.phone || !form.address)
      return alert("Fill all fields");

    const updated = [...addresses, form];
    setAddresses(updated);
    localStorage.setItem("addresses", JSON.stringify(updated));

    setForm({
      fullName: "",
      phone: "",
      address: "",
      city: "",
      state: "",
      pincode: "",
    });
  };

  // Razorpay
  const loadScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handlePayment = async () => {
    if (!selectedAddress) return alert("Select address");

    const token = localStorage.getItem("token");
    if (!token) return alert("Login required");

    const res = await loadScript();
    if (!res) return alert("Razorpay failed");

    const orderRes = await fetch(
      "http://localhost:5000/api/seller/payments/create-order",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ cart }),
      },
    );

    const data = await orderRes.json();

    const options = {
      key: "rzp_test_SF9gQqBJH2B5mx",
      amount: data.order.amount,
      currency: "INR",
      name: "KashmirCraft",
      order_id: data.order.id,

      handler: async function (response) {
        await fetch("http://localhost:5000/api/seller/payments/verify", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            ...response,
            cart,
            address: selectedAddress,
          }),
        });

        alert("Payment Successful 🎉");
        localStorage.removeItem("cart");
        window.location.href = "/";
      },

      theme: { color: "#c8a97e" },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  return (
    <div className="min-h-screen bg-[#f5f2ec] text-[#2c2c2c]">
      <Navbar />

      <div className="max-w-6xl mx-auto p-6 grid md:grid-cols-2 gap-10">
        {/* LEFT */}
        <div>
          <h2 className="text-2xl font-bold mb-6">Select Address</h2>

          {addresses.map((addr, i) => (
            <div
              key={i}
              onClick={() => setSelectedAddress(addr)}
              className={`p-4 mb-3 rounded-xl cursor-pointer border ${
                selectedAddress === addr
                  ? "border-[#c8a97e] bg-[#fff8ef]"
                  : "bg-white"
              }`}
            >
              <p className="font-semibold">{addr.fullName}</p>
              <p className="text-sm text-gray-600">{addr.phone}</p>
              <p className="text-sm">
                {addr.address}, {addr.city}, {addr.state} - {addr.pincode}
              </p>
            </div>
          ))}

          {/* ✅ ADD NEW ADDRESS (BACK AGAIN) */}
          <h3 className="text-lg font-semibold mt-6 mb-2">Add New Address</h3>

          <div className="grid gap-3">
            <input
              placeholder="Full Name"
              value={form.fullName}
              onChange={(e) => setForm({ ...form, fullName: e.target.value })}
              className="p-3 border rounded-xl"
            />

            <input
              placeholder="Phone"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              className="p-3 border rounded-xl"
            />

            <input
              placeholder="Address"
              value={form.address}
              onChange={(e) => setForm({ ...form, address: e.target.value })}
              className="p-3 border rounded-xl"
            />

            <div className="grid grid-cols-2 gap-2">
              <input
                placeholder="City"
                value={form.city}
                onChange={(e) => setForm({ ...form, city: e.target.value })}
                className="p-3 border rounded-xl"
              />

              <input
                placeholder="State"
                value={form.state}
                onChange={(e) => setForm({ ...form, state: e.target.value })}
                className="p-3 border rounded-xl"
              />
            </div>

            <input
              placeholder="Pincode"
              value={form.pincode}
              onChange={(e) => setForm({ ...form, pincode: e.target.value })}
              className="p-3 border rounded-xl"
            />

            <button
              onClick={saveAddress}
              className="bg-[#c8a97e] text-white py-2 rounded-xl"
            >
              Save Address
            </button>
          </div>

          {/* CART */}
          <h2 className="text-xl font-bold mt-10 mb-4">Order Items</h2>

          {cart.map((item) => (
            <div
              key={item._id}
              className="flex gap-4 mb-4 bg-white p-4 rounded-xl shadow"
            >
              <img
                src={item.images?.[0]}
                className="w-20 h-20 object-cover rounded"
              />

              <div className="flex-1">
                <p className="font-semibold">{item.name}</p>
                <p className="text-gray-600">₹{item.price}</p>

                <div className="flex items-center gap-3 mt-2">
                  <button
                    onClick={() => decreaseQty(item._id)}
                    className="px-3 py-1 bg-gray-200 rounded"
                  >
                    −
                  </button>

                  <span>{item.qty}</span>

                  <button
                    onClick={() => increaseQty(item._id)}
                    className="px-3 py-1 bg-gray-200 rounded"
                  >
                    +
                  </button>
                </div>
              </div>

              <button
                onClick={() => removeItem(item._id)}
                className="text-red-500"
              >
                Remove
              </button>
            </div>
          ))}
        </div>

        {/* RIGHT */}
        <div className="bg-white p-6 rounded-2xl shadow-xl h-fit">
          <h2 className="text-xl font-bold mb-6">Order Summary</h2>

          <div className="flex justify-between mb-4">
            <span>Total</span>
            <span className="text-[#c8a97e] font-bold">₹{total}</span>
          </div>

          <button
            onClick={handlePayment}
            className="w-full py-3 rounded-xl bg-[#32758b] text-white"
          >
            Pay with Razorpay
          </button>
        </div>
      </div>
    </div>
  );
}
