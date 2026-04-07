import { useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";

const ProductForm = ({ refresh }) => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState("");

  const handleAdd = async () => {
    if (!name || !price || !file) {
      return alert("Please fill all fields");
    }

    const token = localStorage.getItem("token");

    const formData = new FormData();
    formData.append("name", name);
    formData.append("price", price);
    formData.append("image", file);

    await axios.post("http://localhost:5000/api/products", formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });

    setName("");
    setPrice("");
    setFile(null);
    setPreview("");

    refresh && refresh();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      className="mb-10 p-8 rounded-3xl 
      backdrop-blur-2xl bg-white/70 border border-white/30 shadow-xl"
    >
      <h2 className="text-3xl mb-6 text-center font-light">
        Add <span className="text-[#c8a97e]">Luxury Product</span>
      </h2>

      <div className="grid md:grid-cols-3 gap-6">
        <input
          type="text"
          placeholder="Product Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="px-4 py-3 rounded-xl border bg-white/80 focus:ring-2 focus:ring-[#c8a97e]"
        />

        <input
          type="number"
          placeholder="Price ₹"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="px-4 py-3 rounded-xl border bg-white/80 focus:ring-2 focus:ring-[#c8a97e]"
        />

        {/* 📸 FILE UPLOAD */}
        <label className="flex items-center justify-center border-2 border-dashed rounded-xl cursor-pointer p-4 hover:bg-[#f3e8e4] transition">
          Upload Image
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

      {/* 🖼️ PREVIEW */}
      {preview && (
        <motion.img
          src={preview}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-6 w-40 h-40 object-cover rounded-xl shadow"
        />
      )}

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleAdd}
        className="mt-6 px-6 py-3 bg-[#c8a97e] text-white rounded-xl shadow"
      >
        Add Product
      </motion.button>
    </motion.div>
  );
};

export default ProductForm;
