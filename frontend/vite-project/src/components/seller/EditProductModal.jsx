import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import axios from "axios";
import { createPortal } from "react-dom";

const EditProductModal = ({ isOpen, onClose, product, refresh }) => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState("");

  useEffect(() => {
    if (product) {
      setName(product.name);
      setPrice(product.price);
      setPreview(product.image);
    }
  }, [product]);

  // 🔥 BODY LOCK (premium feel)
  useEffect(() => {
    if (isOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "auto";
  }, [isOpen]);

  const handleUpdate = async () => {
    const token = localStorage.getItem("token");

    const formData = new FormData();
    formData.append("name", name);
    formData.append("price", price);
    if (file) formData.append("image", file);

    await axios.put(
      `http://localhost:5000/api/products/${product._id}`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      },
    );

    refresh();
    onClose();
  };

  if (!isOpen) return null;

  return createPortal(
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 backdrop-blur-md"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        {/* 💎 MODAL */}
        <motion.div
          initial={{ scale: 0.9, y: 60 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.9, y: 60 }}
          className="w-[95%] sm:w-[500px] max-h-[90vh] overflow-y-auto 
          p-8 rounded-3xl 
          bg-white shadow-2xl"
        >
          {/* ✨ TITLE */}
          <h2 className="text-3xl text-center mb-6 font-light">
            Edit <span className="text-[#c8a97e] font-medium">Product</span>
          </h2>

          {/* 🌸 INPUTS */}
          <div className="flex flex-col gap-4">
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Product Name"
              className="px-4 py-3 rounded-xl border bg-gray-100"
            />

            <input
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              type="number"
              placeholder="Price"
              className="px-4 py-3 rounded-xl border bg-gray-100"
            />

            {/* 📸 FILE */}
            <label className="border-2 border-dashed p-5 rounded-xl text-center cursor-pointer hover:bg-gray-100">
              📸 Change Image
              <input
                type="file"
                hidden
                onChange={(e) => {
                  const selected = e.target.files[0];
                  setFile(selected);
                  setPreview(URL.createObjectURL(selected));
                }}
              />
            </label>
          </div>

          {/* 🖼️ IMAGE */}
          {preview && (
            <img
              src={preview}
              className="mt-5 w-full h-48 object-cover rounded-xl"
            />
          )}

          {/* 🔥 BUTTONS */}
          <div className="flex gap-4 mt-8">
            <button
              onClick={onClose}
              className="w-1/2 py-3 rounded-xl bg-gray-300 hover:bg-gray-400"
            >
              Cancel
            </button>

            <button
              onClick={handleUpdate}
              className="w-1/2 py-3 rounded-xl bg-[#c8a97e] text-white hover:bg-[#b89666]"
            >
              Update
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>,
    document.body, // 💥 IMPORTANT (portal fix)
  );
};

export default EditProductModal;
