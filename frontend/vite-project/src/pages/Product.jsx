import Navbar from "../components/Navbar";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import LoginPopup from "../components/LoginPopup";

export default function Product() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState("");
  const [zoomStyle, setZoomStyle] = useState({});
  const [qty, setQty] = useState(1);

  const [showPopup, setShowPopup] = useState(false);

  const [wishlist, setWishlist] = useState(
    JSON.parse(localStorage.getItem("wishlist")) || [],
  );

  const isLoggedIn = () => localStorage.getItem("token");

  useEffect(() => {
    const fetchProduct = async () => {
      const res = await axios.get(`http://localhost:5000/api/products/${id}`);
      setProduct(res.data);
      setSelectedImage(res.data.images?.[0] || "");
    };
    fetchProduct();
  }, [id]);

  if (!product) return <div className="p-10">Loading...</div>;

  const totalPrice = product.price * qty;

  // 🛒 ADD TO CART
  const addToCart = () => {
    if (!isLoggedIn()) {
      setShowPopup(true);
      return;
    }

    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const existing = cart.find((item) => item._id === product._id);

    if (existing) {
      existing.qty += qty;
    } else {
      cart.push({ ...product, qty });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    alert("Added to cart ✅");
  };

  // ❤️ WISHLIST
  const toggleWishlist = () => {
    if (!isLoggedIn()) {
      setShowPopup(true);
      return;
    }

    let updated;

    if (wishlist.find((i) => i._id === product._id)) {
      updated = wishlist.filter((i) => i._id !== product._id);
    } else {
      updated = [...wishlist, product];
    }

    setWishlist(updated);
    localStorage.setItem("wishlist", JSON.stringify(updated));
  };

  const isWishlisted = wishlist.find((i) => i._id === product._id);

  // 🔍 ZOOM
  const handleMouseMove = (e) => {
    const { left, top, width, height } = e.target.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;

    setZoomStyle({
      transformOrigin: `${x}% ${y}%`,
      transform: "scale(2)",
    });
  };

  const resetZoom = () => {
    setZoomStyle({ transform: "scale(1)" });
  };

  return (
    <div className="relative min-h-screen">
      {showPopup && <LoginPopup onClose={() => setShowPopup(false)} />}

      <div
        className="fixed inset-0 bg-cover bg-center z-[-2]"
        style={{ backgroundImage: "url('/bgw.png')" }}
      />
      <div className="fixed inset-0 bg-white/40 backdrop-blur-md z-[-1]" />

      <Navbar />

      <div className="mx-6 md:mx-12 mt-10 p-10 rounded-[40px] bg-gradient-to-br from-[#EEF2EC] to-[#F3F1EA] shadow-2xl">
        <div className="grid md:grid-cols-2 gap-12">
          {/* IMAGE */}
          <div>
            <div
              className="overflow-hidden rounded-3xl"
              onMouseMove={handleMouseMove}
              onMouseLeave={resetZoom}
            >
              <img
                src={selectedImage}
                style={zoomStyle}
                className="w-full h-[450px] object-cover transition duration-200"
              />
            </div>

            <div className="flex gap-3 mt-4">
              {product.images?.map((img, i) => (
                <img
                  key={i}
                  src={img}
                  onClick={() => setSelectedImage(img)}
                  className="w-20 h-20 rounded-lg cursor-pointer border"
                />
              ))}
            </div>
          </div>

          {/* DETAILS */}
          <div>
            <h1 className="text-4xl font-bold">{product.name}</h1>

            <p className="text-3xl text-[#D4AF37] mt-4 font-bold">
              ₹{totalPrice}
              <span className="text-gray-500 text-lg ml-2">
                ({product.price} × {qty})
              </span>
            </p>

            <p className="mt-4 text-gray-600">
              {product.description || "Premium handcrafted Kashmiri product."}
            </p>

            {/* QTY */}
            <div className="flex items-center gap-4 mt-6">
              <span>Quantity:</span>

              <div className="flex border rounded-xl overflow-hidden">
                <button
                  onClick={() => setQty(qty > 1 ? qty - 1 : 1)}
                  className="px-4"
                >
                  -
                </button>
                <span className="px-6">{qty}</span>
                <button onClick={() => setQty(qty + 1)} className="px-4">
                  +
                </button>
              </div>
            </div>

            {/* BUTTONS */}
            <div className="flex gap-4 mt-8">
              <button
                onClick={addToCart}
                className="flex-1 bg-[#32758b] text-white py-3 rounded-xl"
              >
                Add to Cart
              </button>

              <button
                onClick={() => {
                  if (!isLoggedIn()) return setShowPopup(true);
                  addToCart();
                  navigate("/checkout");
                }}
                className="flex-1 bg-[#D4AF37] text-black py-3 rounded-xl"
              >
                Buy Now
              </button>
            </div>

            {/* WISHLIST */}
            <button
              onClick={toggleWishlist}
              className={`mt-6 px-6 py-3 rounded-xl ${
                isWishlisted
                  ? "bg-red-500 text-white"
                  : "border border-[#32758b] text-[#32758b]"
              }`}
            >
              {isWishlisted ? "❤️ Added" : "🤍 Add to Wishlist"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
