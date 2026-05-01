import { useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";

const ProductForm = ({ refresh }) => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("pashmina");
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState("");

  const handleAdd = async () => {
    if (!name || !price || !file) {
      return alert("Please fill all fields");
    }

    try {
      const token = localStorage.getItem("token");

      const formData = new FormData();
      formData.append("name", name);
      formData.append("price", price);

      // ✅ IMPORTANT (clean category)
      formData.append("category", category.toLowerCase());

      formData.append("image", file);

      await axios.post("http://localhost:5000/api/seller/products", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // reset
      setName("");
      setPrice("");
      setCategory("pashmina");
      setFile(null);
      setPreview("");

      refresh && refresh();
    } catch (err) {
      console.log("❌ ADD ERROR:", err.response?.data || err);
      alert("Product add failed");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      className="mb-10 p-8 rounded-3xl 
      bg-white/80 backdrop-blur-xl shadow-2xl border"
    >
      <h2 className="text-3xl text-center mb-8 font-light">
        Add <span className="text-[#c8a97e]">Luxury Product</span>
      </h2>

      <div className="grid md:grid-cols-4 gap-6">
        <input
          type="text"
          placeholder="Product Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="px-4 py-3 rounded-xl border"
        />

        <input
          type="number"
          placeholder="Price ₹"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="px-4 py-3 rounded-xl border"
        />

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="px-4 py-3 rounded-xl border"
        >
          <option value="pashmina">Pashmina</option>
          <option value="carpets">Carpets</option>
          <option value="dryfruits">Dry Fruits</option>
          <option value="handicrafts">Handicrafts</option>
        </select>

        <label className="flex items-center justify-center border-2 border-dashed rounded-xl cursor-pointer p-4">
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

      {preview && (
        <img src={preview} className="mt-6 w-40 h-40 object-cover rounded-xl" />
      )}

      <button
        onClick={handleAdd}
        className="mt-6 w-full py-3 bg-[#c8a97e] text-white rounded-xl"
      >
        Add Product
      </button>
    </motion.div>
  );
};

export default ProductForm;
