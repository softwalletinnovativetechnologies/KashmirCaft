import { useEffect, useState } from "react";
import { getProducts, deleteProduct } from "../../services/productApi";
import { motion } from "framer-motion";
import EditProductModal from "./EditProductModal";
const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [selected, setSelected] = useState(null);
  const [open, setOpen] = useState(false);
  const fetchData = async () => {
    const res = await getProducts();
    setProducts(res.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async (id) => {
    await deleteProduct(id);
    fetchData();
  };

  return (
    <div className="grid md:grid-cols-3 gap-6">
      {products.map((p) => (
        <motion.div
          key={p._id}
          whileHover={{ y: -10 }}
          className="bg-white/60 backdrop-blur-xl border border-white/30 
          rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition"
        >
          {/* IMAGE */}
          <div className="overflow-hidden">
            <img
              src={p.image}
              className="w-full h-52 object-cover hover:scale-110 transition duration-500"
            />
          </div>

          {/* CONTENT */}
          <div className="p-4 text-center">
            <h3 className="text-lg font-medium">{p.name}</h3>
            <p className="text-[#c8a97e] text-lg mt-1">₹{p.price}</p>

            {/* ACTIONS */}
            <div className="flex justify-center gap-3 mt-4">
              <button
                onClick={() => {
                  setSelected(p);
                  setOpen(true);
                }}
                className="px-3 py-1 bg-blue-500 text-white rounded-lg"
              >
                Edit
              </button>
              <EditProductModal
                isOpen={open}
                onClose={() => setOpen(false)}
                product={selected}
                refresh={fetchData}
              />

              <button
                onClick={() => handleDelete(p._id)}
                className="px-3 py-1 bg-red-500 text-white rounded-lg"
              >
                Delete
              </button>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default ProductList;
