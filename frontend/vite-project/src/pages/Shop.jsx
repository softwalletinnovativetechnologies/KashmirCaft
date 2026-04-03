import { motion } from "framer-motion";
import Navbar from "../components/Navbar";

const products = [
  {
    name: "Pashmina Shawl",
    price: "₹4,999",
    img: "https://images.unsplash.com/photo-1618354691373-d851c5c3a990",
  },
  {
    name: "Kashmiri Carpet",
    price: "₹12,999",
    img: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c",
  },
  {
    name: "Walnut Wood Handicraft",
    price: "₹3,499",
    img: "https://images.unsplash.com/photo-1585386959984-a4155224a1ad",
  },
  {
    name: "Dry Fruits Box",
    price: "₹1,299",
    img: "https://images.unsplash.com/photo-1604908176997-431b7d2f9a76",
  },
  {
    name: "Kashmir Saffron",
    price: "₹899",
    img: "https://images.unsplash.com/photo-1615485290382-441e4d049cb5",
  },
  {
    name: "Traditional Kangri",
    price: "₹2,199",
    img: "https://images.unsplash.com/photo-1598300056393-4aac492f4344",
  },
];

const Shop = () => {
  return (
    <div className="bg-[#f8f4f2] min-h-screen text-[#3a2f2f] overflow-x-hidden">
      <Navbar />

      {/* 🌸 HERO */}
      <section className="pt-32 pb-16 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl font-light"
          style={{ fontFamily: "Playfair Display, serif" }}
        >
          Explore{" "}
          <span className="text-[#c8a97e] font-medium">Kashmir Collection</span>
        </motion.h1>

        <p className="mt-4 text-gray-600">
          Authentic handcrafted luxury from Kashmir
        </p>
      </section>

      {/* 🛍️ PRODUCTS GRID */}
      <section className="px-10 pb-20">
        <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-8">
          {products.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -8 }}
              className="bg-white/70 backdrop-blur-lg border border-white/30 
              rounded-xl overflow-hidden shadow-md hover:shadow-xl transition"
            >
              {/* IMAGE */}
              <div className="overflow-hidden">
                <img
                  src={item.img}
                  className="w-full h-56 object-cover hover:scale-110 transition duration-500"
                />
              </div>

              {/* CONTENT */}
              <div className="p-4 text-center">
                <h3 className="text-lg font-medium">{item.name}</h3>
                <p className="text-[#c8a97e] mt-1 font-medium">{item.price}</p>

                {/* BUTTON */}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  className="mt-4 px-4 py-2 bg-[#c8a97e] text-white rounded shadow hover:bg-[#b89666]"
                >
                  Add to Cart
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 🌸 CTA SECTION */}
      <section className="text-center py-16 bg-[#f3e8e4]">
        <h2
          className="text-3xl font-light"
          style={{ fontFamily: "Playfair Display, serif" }}
        >
          Discover the{" "}
          <span className="text-[#c8a97e] font-medium">Essence of Kashmir</span>
        </h2>

        <p className="mt-3 text-gray-600">
          Timeless elegance crafted with tradition & love
        </p>
      </section>
    </div>
  );
};

export default Shop;
