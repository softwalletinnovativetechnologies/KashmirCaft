import { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import EditProductModal from "./EditProductModal";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [selected, setSelected] = useState(null);
  const [open, setOpen] = useState(false);

  const token = localStorage.getItem("token");

  const fetchData = async () => {
    const res = await axios.get("http://localhost:5000/api/seller/products", {
      headers: { Authorization: `Bearer ${token}` },
    });
    setProducts(res.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:5000/api/seller/products/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    fetchData();
  };

  return (
    <div className="grid md:grid-cols-3 gap-6">
      {products.map((p) => (
        <motion.div
          key={p._id}
          whileHover={{ y: -10 }}
          className="bg-white/70 backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden"
        >
          <img
            src={p.images?.[0] || "https://via.placeholder.com/300"}
            className="w-full h-52 object-cover"
          />

          <div className="p-4 text-center">
            <h3 className="text-lg">{p.name}</h3>
            <p className="text-[#c8a97e] font-bold">₹{p.price}</p>

            <div className="flex justify-center gap-3 mt-4">
              <button
                onClick={() => {
                  setSelected(p);
                  setOpen(true);
                }}
                className="px-3 py-1 bg-blue-500 text-white rounded"
              >
                Edit
              </button>

              <button
                onClick={() => handleDelete(p._id)}
                className="px-3 py-1 bg-red-500 text-white rounded"
              >
                Delete
              </button>
            </div>
          </div>
        </motion.div>
      ))}

      <EditProductModal
        isOpen={open}
        onClose={() => setOpen(false)}
        product={selected}
        refresh={fetchData}
      />
    </div>
  );
};

export default ProductList;
