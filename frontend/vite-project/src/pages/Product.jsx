import Navbar from "../components/Navbar";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import LoginPopup from "../components/LoginPopup";
import { getRecommendedProducts } from "../utils/recommendations";
import { analyzeSentiment } from "../utils/sentiment";

export default function Product() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [allProducts, setAllProducts] = useState([]);
  const [selectedImage, setSelectedImage] = useState("");
  const [zoomStyle, setZoomStyle] = useState({});
  const [qty, setQty] = useState(1);
  const [showPopup, setShowPopup] = useState(false);
  const [wishlist, setWishlist] = useState(
    JSON.parse(localStorage.getItem("wishlist")) || []
  );

  // Review states
  const [reviews, setReviews] = useState([]);
  const [reviewName, setReviewName] = useState("");
  const [reviewComment, setReviewComment] = useState("");
  const [reviewRating, setReviewRating] = useState(5);

  const isLoggedIn = () => localStorage.getItem("token");

  useEffect(() => {
    const fetchProduct = async () => {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/products/${id}`
      );
      setProduct(res.data);
      setSelectedImage(res.data.images?.[0] || "");
      setReviews(res.data.reviews || []);
    };
    fetchProduct();

    const fetchAllProducts = async () => {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/products`);
      setAllProducts(res.data);
    };
    fetchAllProducts();
  }, [id]);

  if (!product) return <div className="p-10">Loading...</div>;

  const totalPrice = product.price * qty;

  // 🛒 ADD TO CART
  const addToCart = () => {
    if (!isLoggedIn()) { setShowPopup(true); return; }
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const existing = cart.find((item) => item._id === product._id);
    if (existing) { existing.qty += qty; } else { cart.push({ ...product, qty }); }
    localStorage.setItem("cart", JSON.stringify(cart));
    alert("Added to cart ✅");
  };

  // ❤️ WISHLIST
  const toggleWishlist = () => {
    if (!isLoggedIn()) { setShowPopup(true); return; }
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

  // 🔍 IMAGE ZOOM
  const handleMouseMove = (e) => {
    const { left, top, width, height } = e.target.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setZoomStyle({ transformOrigin: `${x}% ${y}%`, transform: "scale(2)" });
  };
  const resetZoom = () => setZoomStyle({ transform: "scale(1)" });

  // ✍️ SUBMIT REVIEW
  const submitReview = async () => {
    if (!reviewName || !reviewComment) return alert("Please fill all fields");
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/products/${id}/review`,
        { user: reviewName, comment: reviewComment, rating: reviewRating }
      );
      setReviews(res.data.reviews);
      setReviewName("");
      setReviewComment("");
      setReviewRating(5);
    } catch {
      alert("Failed to submit review");
    }
  };

  const sentiment = analyzeSentiment(reviews);

  return (
    <div className="relative min-h-screen">
      {showPopup && <LoginPopup onClose={() => setShowPopup(false)} />}

      <div
        className="fixed inset-0 bg-cover bg-center z-[-2]"
        style={{ backgroundImage: "url('/bgw.png')" }}
      />
      <div className="fixed inset-0 bg-white/40 backdrop-blur-md z-[-1]" />

      <Navbar />

      {/* PRODUCT CARD */}
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
            <h1 className="text-4xl font-bold text-[#83c5be]">{product.name}</h1>
            <p className="text-3xl text-[#83c5be] mt-4 font-bold">
              ₹{totalPrice}
              <span className="text-gray-500 text-lg ml-2">
                ({product.price} × {qty})
              </span>
            </p>
            <p className="mt-4 text-gray-600">
              {product.description || "Premium handcrafted Kashmiri product."}
            </p>

            {/* QTY */}
            <div className="flex items-center gap-4 mt-6 text-black">
              <span>Quantity:</span>
              <div className="flex border rounded-xl overflow-hidden">
                <button onClick={() => setQty(qty > 1 ? qty - 1 : 1)} className="px-4">-</button>
                <span className="px-6">{qty}</span>
                <button onClick={() => setQty(qty + 1)} className="px-4">+</button>
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

      {/* REVIEWS & SENTIMENT */}
      <div className="mx-6 md:mx-12 mt-10">

        {/* 🤖 AI Sentiment Summary */}
        {sentiment && (
          <div className={`${sentiment.sentimentBg} border rounded-2xl p-6 mb-6 flex flex-col md:flex-row gap-6 items-center`}>
            <div className="text-6xl">{sentiment.sentimentEmoji}</div>
            <div className="flex-1">
              <h3 className="text-lg font-bold text-[#1f2937] mb-1">
                🤖 AI Sentiment Analysis
              </h3>
              <p className={`text-2xl font-bold ${sentiment.sentimentColor}`}>
                {sentiment.overallSentiment} Reviews
              </p>
              <p className="text-gray-500 text-sm mt-1">
                Based on {sentiment.totalReviews} review(s) — Average rating: ⭐ {sentiment.avgRating}/5
              </p>
            </div>
            <div className="flex gap-4 text-center">
              <div className="bg-green-100 px-4 py-2 rounded-xl">
                <p className="text-green-700 font-bold text-xl">{sentiment.positive}</p>
                <p className="text-xs text-gray-500">Positive</p>
              </div>
              <div className="bg-amber-100 px-4 py-2 rounded-xl">
                <p className="text-amber-700 font-bold text-xl">{sentiment.neutral}</p>
                <p className="text-xs text-gray-500">Neutral</p>
              </div>
              <div className="bg-red-100 px-4 py-2 rounded-xl">
                <p className="text-red-700 font-bold text-xl">{sentiment.negative}</p>
                <p className="text-xs text-gray-500">Negative</p>
              </div>
            </div>
          </div>
        )}

        {/* ✍️ Review Form */}
        <div className="bg-white rounded-2xl shadow p-6 mb-6">
          <h3 className="text-lg font-bold text-[#1f2937] mb-4">✍️ Write a Review</h3>
          <div className="grid md:grid-cols-3 gap-4 mb-4">
            <input
              value={reviewName}
              onChange={(e) => setReviewName(e.target.value)}
              placeholder="Your name"
              className="border rounded-xl px-4 py-2 text-sm"
            />
            <select
              value={reviewRating}
              onChange={(e) => setReviewRating(Number(e.target.value))}
              className="border rounded-xl px-4 py-2 text-sm"
            >
              {[5, 4, 3, 2, 1].map((r) => (
                <option key={r} value={r}>{"⭐".repeat(r)} ({r})</option>
              ))}
            </select>
            <button
              onClick={submitReview}
              className="bg-[#32758b] text-white rounded-xl px-6 py-2 text-sm"
            >
              Submit Review
            </button>
          </div>
          <textarea
            value={reviewComment}
            onChange={(e) => setReviewComment(e.target.value)}
            placeholder="Share your experience with this product..."
            className="w-full border rounded-xl px-4 py-2 text-sm h-24 resize-none"
          />
        </div>

        {/* 💬 Reviews List */}
        {reviews.length > 0 && (
          <div className="bg-white rounded-2xl shadow p-6 mb-6">
            <h3 className="text-lg font-bold text-[#1f2937] mb-4">
              Customer Reviews ({reviews.length})
            </h3>
            <div className="flex flex-col gap-4">
              {reviews.map((r, i) => (
                <div key={i} className="border-b pb-4 last:border-0">
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-semibold text-sm">{r.user}</span>
                    <span className="text-yellow-500">{"⭐".repeat(r.rating)}</span>
                  </div>
                  <p className="text-gray-600 text-sm">{r.comment}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 🛍️ Recommendations */}
        {allProducts.length > 0 && (
          <div className="mb-16">
            <h2 className="text-2xl font-bold text-[#284b63] mb-6">You May Also Like</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {getRecommendedProducts(product, allProducts, 4).map((item) => (
                <div
                  key={item._id}
                  onClick={() => navigate(`/product/${item._id}`)}
                  className="bg-white rounded-2xl shadow-lg overflow-hidden cursor-pointer hover:-translate-y-1 transition"
                >
                  <img
                    src={item.images?.[0]}
                    className="h-36 md:h-44 w-full object-cover"
                  />
                  <div className="p-3">
                    <h3 className="text-sm md:text-base font-medium truncate">{item.name}</h3>
                    <p className="text-[#284b63] font-semibold mt-1">₹{item.price}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}