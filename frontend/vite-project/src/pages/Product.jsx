import Navbar from "../components/Navbar";
import { motion } from "framer-motion";
import { useState } from "react";

const product = {
  name: "Pashmina Shawl",
  price: 4999,
  description:
    "Experience the elegance of authentic Kashmiri Pashmina. Handcrafted with precision and tradition.",
  images: [
    "https://images.unsplash.com/photo-1593032465171-8f6d8c3c6b7d",
    "https://images.unsplash.com/photo-1585386959984-a4155224a1ad",
    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c",
  ],
};

export default function Product() {
  const [selectedImage, setSelectedImage] = useState(product.images[0]);
  const [qty, setQty] = useState(1);

  return (
    <div className="relative min-h-screen">
      {/* 🌸 BG */}
      <div
        className="fixed inset-0 bg-cover bg-center z-[-2]"
        style={{ backgroundImage: "url('/bgw.png')" }}
      />
      <div className="fixed inset-0 bg-white/30 backdrop-blur-md z-[-1]" />

      <Navbar />

      {/* 🌿 MAIN */}
      <div className="mx-4 md:mx-8 mt-6 p-6 md:p-10 rounded-[32px] bg-gradient-to-br from-[#EEF2EC] to-[#F3F1EA] shadow-xl">
        <div className="grid md:grid-cols-2 gap-10">
          {/* 🖼️ IMAGE GALLERY */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <div className="rounded-3xl overflow-hidden shadow-lg">
              <img
                src={selectedImage}
                className="w-full h-[400px] object-cover hover:scale-105 transition duration-500"
              />
            </div>

            {/* THUMBNAILS */}
            <div className="flex gap-4 mt-4">
              {product.images.map((img, i) => (
                <img
                  key={i}
                  src={img}
                  onClick={() => setSelectedImage(img)}
                  className={`w-20 h-20 object-cover rounded-xl cursor-pointer border-2 ${
                    selectedImage === img
                      ? "border-[#32758b]"
                      : "border-transparent"
                  }`}
                />
              ))}
            </div>
          </motion.div>

          {/* 🧾 PRODUCT INFO */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <h1 className="text-3xl md:text-4xl font-bold text-[#1F3D2B]">
              {product.name}
            </h1>

            {/* ⭐ RATING */}
            <div className="flex items-center gap-1 mt-2 text-[#D4AF37]">
              ⭐⭐⭐⭐⭐
              <span className="text-gray-500 text-sm ml-2">(120 reviews)</span>
            </div>

            {/* 💰 PRICE */}
            <p className="text-3xl font-bold text-[#D4AF37] mt-4">
              ₹{product.price}
            </p>

            {/* 📄 DESCRIPTION */}
            <p className="text-gray-600 mt-4 leading-relaxed">
              {product.description}
            </p>

            {/* 🔢 QUANTITY */}
            <div className="flex items-center gap-4 mt-6 text-black">
              <span className="font-medium">Quantity:</span>

              <div className="flex items-center border rounded-xl overflow-hidden text-black">
                <button
                  onClick={() => setQty(qty > 1 ? qty - 1 : 1)}
                  className="px-3 py-1"
                >
                  -
                </button>

                <span className="px-4">{qty}</span>

                <button onClick={() => setQty(qty + 1)} className="px-3 py-1">
                  +
                </button>
              </div>
            </div>

            {/* 🛒 BUTTONS */}
            <div className="flex gap-4 mt-8">
              <button className="flex-1 bg-[#32758b] text-white py-3 rounded-xl hover:bg-black transition">
                Add to Cart
              </button>

              <button className="flex-1 bg-[#D4AF37] text-black py-3 rounded-xl hover:scale-105 transition">
                Buy Now
              </button>
            </div>
          </motion.div>
        </div>

        {/* 🧾 DETAILS SECTION */}
        <div className="mt-16">
          <h2 className="text-2xl font-semibold text-[#32758b] mb-4">
            Product Details
          </h2>

          <p className="text-gray-600 leading-relaxed max-w-3xl">
            This premium Kashmiri Pashmina is crafted using traditional
            techniques passed down through generations. Soft, warm, and
            luxurious, it is perfect for all seasons.
          </p>
        </div>
      </div>
    </div>
  );
}
