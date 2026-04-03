import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import heroBg from "../assets/hero-bg.png";
import { Typewriter } from "react-simple-typewriter";

const products = [
  {
    name: "Pashmina Shawl",
    price: "₹4,999",
    img: "https://images.unsplash.com/photo-1593032465171-8f6d8c3c6b7d",
  },
  {
    name: "Kashmiri Carpet",
    price: "₹12,999",
    img: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c",
  },
  {
    name: "Handicraft Decor",
    price: "₹2,499",
    img: "https://images.unsplash.com/photo-1585386959984-a4155224a1ad",
  },
  {
    name: "Dry Fruits Box",
    price: "₹1,299",
    img: "https://images.unsplash.com/photo-1604908176997-431b7d2f9a76",
  },
];

const Home = () => {
  return (
    <div className="bg-[#f8f4f2] text-[#3a2f2f] overflow-x-hidden">
      <Navbar />

      {/* 🌸 HERO */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden pt-24">
        {/* PARALLAX BG */}
        <motion.img
          src={heroBg}
          className="absolute w-full h-full object-cover opacity-90"
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 2 }}
        />

        {/* overlay */}
        <div className="absolute w-full h-full bg-[#f8f4f2]/80 backdrop-blur-sm"></div>

        {/* ✨ CONTENT */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="relative text-center px-6"
        >
          {/* 🔥 TYPEWRITER SLOGAN */}
          <h2
            className="text-2xl text-[#7a6a6a] mb-3"
            style={{ fontFamily: "Great Vibes, cursive" }}
          >
            <Typewriter
              words={[
                "Crafted in Kashmir",
                "Elegance from the Valley",
                "Tradition Meets Luxury",
              ]}
              loop={true}
              cursor
              cursorStyle="|"
              typeSpeed={70}
              deleteSpeed={40}
              delaySpeed={2000}
            />
          </h2>

          {/* 💎 MAIN TITLE */}
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-6xl md:text-7xl text-[#c8a97e] tracking-wide"
            style={{ fontFamily: "Playfair Display, serif" }}
          >
            KashmirCraft
          </motion.h1>

          {/* SUBTEXT */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="mt-6 text-gray-600 max-w-xl mx-auto"
          >
            Discover handcrafted luxury from Kashmir — minimal, elegant &
            timeless.
          </motion.p>

          {/* BUTTON */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="mt-8 px-8 py-3 bg-[#c8a97e] text-white rounded shadow"
          >
            Shop Now
          </motion.button>
        </motion.div>
      </section>

      {/* 🛍️ PRODUCTS */}
      <section className="py-24 px-10">
        <motion.h2
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl text-center font-light mb-12"
        >
          Modern{" "}
          <span className="text-[#c8a97e] font-medium">Kashmir Collection</span>
        </motion.h2>

        {/* STAGGER GRID */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            hidden: {},
            visible: {
              transition: { staggerChildren: 0.2 },
            },
          }}
          className="grid md:grid-cols-4 gap-6"
        >
          {products.map((item, i) => (
            <motion.div
              key={i}
              variants={{
                hidden: { opacity: 0, y: 50 },
                visible: { opacity: 1, y: 0 },
              }}
              whileHover={{ y: -10 }}
              className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition"
            >
              <img src={item.img} className="w-full h-52 object-cover" />

              <div className="p-4 text-center">
                <h3>{item.name}</h3>
                <p className="text-[#c8a97e] mt-1 font-medium">{item.price}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* 🌸 PARALLAX SECTION */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <motion.img
          src="https://images.unsplash.com/photo-1582719478250-c89cae4dc85b"
          className="absolute w-full h-full object-cover opacity-50"
          initial={{ scale: 1.2 }}
          whileInView={{ scale: 1 }}
          transition={{ duration: 1.5 }}
        />

        <div className="absolute w-full h-full bg-white/70 backdrop-blur-sm"></div>

        <motion.h2
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          className="relative text-4xl font-light text-center"
        >
          Luxury is in the
          <span className="block text-[#c8a97e] font-medium">Details</span>
        </motion.h2>
      </section>

      {/* 💌 NEWSLETTER */}
      <section className="py-20 text-center bg-[#f3e8e4]">
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-4xl font-light"
        >
          Join Our{" "}
          <span className="text-[#c8a97e] font-medium">Luxury Circle</span>
        </motion.h2>

        <motion.input
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          type="email"
          placeholder="Enter your email"
          className="mt-6 px-5 py-3 rounded border w-72 bg-white outline-none"
        />
      </section>

      {/* 🖤 FOOTER */}
      <footer className="py-6 text-center text-gray-500">
        © KashmirCraft Luxury Marketplace
      </footer>
    </div>
  );
};

export default Home;
