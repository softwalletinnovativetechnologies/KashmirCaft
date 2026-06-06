import Navbar from "../components/Navbar";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-fade";
import { Autoplay, EffectFade } from "swiper/modules";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaWhatsapp,
} from "react-icons/fa";

export default function Home() {
  const slides = ["/1im.png", "/2im.png", "/3im.png"];
 const navigate = useNavigate();
 const [email, setEmail] = useState("");
  const features = [
    { icon: "✨", title: "Authentic Products", sub: "100% Original Handmade" },
    { icon: "🤝", title: "Support Artisans", sub: "Empowering Kashmir Crafts" },
    { icon: "🔒", title: "Secure Payments", sub: "Trusted Checkout" },
    { icon: "🚚", title: "Fast Delivery", sub: "Across India" },
  ];

  const products = [
    { img: "/1im.png", name: "Pashmina Shawl", price: "₹4,999" },
    { img: "/2im.png", name: "Dry Fruits Box", price: "₹1,999" },
    { img: "/3im.png", name: "Kashmiri Carpet", price: "₹12,999" },
  ];
const handleSubscribe = async () => {
  try {
    const res = await fetch(
      "http://localhost:5000/api/subscribers",
      {
        method: "POST",
        headers: {
          "Content-Type":
            "application/json",
        },
        body: JSON.stringify({
          email,
        }),
      }
    );

    const data = await res.json();

    if (!res.ok) {
      return alert(data.message);
    }

    alert(
      "Subscribed Successfully 🎉"
    );

    setEmail("");
  } catch (error) {
    console.log(error);
  }
};

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#edf2ee]">
      {/* Background */}
      <div
        className="fixed inset-0 bg-cover bg-center z-[-3]"
        style={{ backgroundImage: "url('/bgw.png')" }}
      />
      <div className="fixed inset-0 bg-white/30 z-[-2]" />

      <Navbar />

      <div className="mx-3 md:mx-6 mt-4 rounded-[34px] overflow-hidden bg-white/20 backdrop-blur-xl border border-white/40 shadow-[0_20px_70px_rgba(0,0,0,0.12)]">
        {/* ================================================= HERO ================================================= */}
        <section className="relative h-[100vh] overflow-hidden">
          <Swiper
            modules={[Autoplay, EffectFade]}
            effect="fade"
            loop
            speed={1600}
            autoplay={{
              delay: 4000,
              disableOnInteraction: false,
            }}
            className="h-full"
          >
            {slides.map((img, i) => (
              <SwiperSlide key={i}>
                <img
                  src={img}
                  className="h-full w-full object-cover scale-105"
                />
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/40 to-black/10 z-10" />

          {/* Hero Content */}
          <div className="absolute inset-0 z-20 flex items-center px-6 md:px-14 lg:px-24">
            <motion.div
              initial={{ opacity: 0, x: -80 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1 }}
              className="max-w-2xl -mt-10 md:-mt-16"
            >
              <motion.p
                initial={{ opacity: 0, y: -15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="uppercase tracking-[7px] text-[#f6d28b] text-xs md:text-sm font-semibold mb-4"
              >
                Luxury Kashmir Marketplace
              </motion.p>

              <motion.h1
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="leading-[1.02]"
              >
                <motion.span
                  animate={{ y: [0, -6, 0] }}
                  transition={{ repeat: Infinity, duration: 4 }}
                  className="block text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif italic text-white drop-shadow-2xl"
                >
                  Authentic
                </motion.span>

                <motion.span
                  animate={{ opacity: [0.8, 1, 0.8] }}
                  transition={{ repeat: Infinity, duration: 3 }}
                  className="block text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif bg-gradient-to-r from-white via-[#ffe3a2] to-white bg-clip-text text-transparent"
                >
                  Kashmir Shawls
                </motion.span>
              </motion.h1>

              <motion.div
                initial={{ width: 0 }}
                animate={{ width: "170px" }}
                transition={{ delay: 0.8 }}
                className="h-[3px] bg-gradient-to-r from-[#f6d28b] to-transparent rounded-full mt-5 mb-5"
              />

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                className="text-sm md:text-lg text-gray-100 leading-relaxed max-w-xl"
              >
                Woven with tradition, crafted with timeless elegance from the
                valleys of Kashmir.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2 }}
                className="flex flex-wrap gap-4 mt-8"
              >
                <button
  onClick={() => navigate("/shop")}
  className="px-8 py-4 rounded-xl bg-gradient-to-r from-[#8b3a16] to-[#c1bdb3] text-white font-semibold hover:scale-105 transition duration-300 shadow-xl"
>
  Explore Collection
</button>

                <button
  onClick={() => navigate("/shop")}
  className="px-8 py-4 rounded-xl border border-white/70 text-white hover:bg-white hover:text-black transition duration-300"
>
  Shop Now
</button>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* ================= STRIP HERO + ABOUT KE BEECH ================= */}
        <div className="relative z-30 px-4 md:px-8 -mt-10 md:-mt-12">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mx-auto max-w-7xl rounded-[26px] bg-white/95 backdrop-blur-xl border border-white/70 shadow-[0_20px_45px_rgba(0,0,0,0.12)] px-4 md:px-6 py-4"
          >
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-0">
              {features.map((item, i) => (
                <motion.div
                  key={i}
                  whileHover={{ y: -6, scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 260 }}
                  className="flex items-center gap-3 px-2 md:px-4 py-2 md:border-r last:border-r-0 border-gray-200 rounded-xl hover:bg-[#fafafa]"
                >
                  <div className="h-11 w-11 rounded-xl bg-gradient-to-br from-[#fff7df] to-[#f5ead1] flex items-center justify-center text-sm shadow">
                    {item.icon}
                  </div>

                  <div>
                    <h4 className="text-xs md:text-sm font-semibold text-[#173a2a] leading-tight">
                      {item.title}
                    </h4>

                    <p className="text-[10px] md:text-xs text-gray-500 leading-tight">
                      {item.sub}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* ================================================= ABOUT ================================================= */}
        <section className="mt-16 px-6 md:px-12 py-20">
          <div className="grid md:grid-cols-2 gap-14 items-center">
            <motion.div
              initial={{ opacity: 0, x: -70 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <img
                src="/2im.png"
                className="rounded-3xl h-[430px] w-full object-cover shadow-xl"
              />

              <img
                src="/3im.png"
                className="absolute -bottom-8 left-8 w-48 rounded-3xl border-4 border-white shadow-xl"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 70 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <p className="uppercase tracking-[4px] text-[#7a3114] text-sm mb-3">
                Heritage Craft
              </p>

              <h2 className="text-4xl md:text-5xl font-serif text-[#173a2a] leading-tight">
                Crafted by Kashmiri Artisans
              </h2>

              <p className="mt-5 text-gray-700 text-lg leading-relaxed">
                Discover authentic products made with passion, heritage and
                generations of craftsmanship.
              </p>

              <button 
              onClick={() => navigate("/shop")}
              className="mt-8 px-7 py-3 rounded-full bg-[#c1bdb3] text-white hover:bg-black transition">
                Explore Collection
              </button>
            </motion.div>
          </div>
        </section>

        {/* ================================================= PRODUCTS ================================================= */}
        <section className="px-6 md:px-12 pb-20">
          <div className="flex justify-between items-center mb-10">
            <h2 className="text-3xl md:text-4xl font-serif text-[#173a2a]">
              Featured Products
            </h2>

            <button 
            onClick={() => navigate("/shop")}
            className="text-[#7a3114] font-medium hover:underline">
              View All
            </button>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((item, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -10 }}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="rounded-3xl overflow-hidden bg-white/80 backdrop-blur-xl shadow-lg group"
              >
                <div className="overflow-hidden">
                  <img
                    src={item.img}
                    className="h-64 w-full object-cover group-hover:scale-110 transition duration-500"
                  />
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-semibold text-[#173a2a]">
                    {item.name}
                  </h3>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ================================================= BANNER ================================================= */}
        <section className="mx-6 mb-20 rounded-[34px] overflow-hidden relative h-[55vh]">
          <img
            src="/1im.png"
            className="absolute inset-0 h-full w-full object-cover"
          />

          <div className="absolute inset-0 bg-black/45" />

          <div className="relative z-10 h-full flex flex-col justify-center items-center text-center px-4 text-white">
            <h2 className="text-4xl md:text-5xl font-serif max-w-3xl leading-tight">
              Experience Kashmir Like Never Before
            </h2>

            <p className="mt-4 text-lg text-gray-200">
              Luxury, heritage and beauty in every order.
            </p>

            <button 
            onClick={() => navigate("/shop")}
            className="mt-7 px-8 py-3 bg-[#c1bdb3] text-black rounded-full hover:scale-105 transition">
              Explore Now
            </button>
          </div>
        </section>

        {/* ================================================= NEWSLETTER ================================================= */}
        <section className="py-24 px-6 bg-gradient-to-r from-[#173a2a] to-[#315765] text-white text-center">
  <p className="uppercase tracking-[4px] text-sm text-[#c1bdb3]">
    Stay Updated
  </p>

  <h2 className="text-4xl md:text-5xl font-serif mt-4">
    Join The KashmirCraft Family
  </h2>

  <p className="max-w-2xl mx-auto mt-5 text-white/80">
    Get exclusive offers, artisan stories and premium Kashmir collections
    directly in your inbox.
  </p>

  <div className="mt-10 flex flex-col md:flex-row gap-4 justify-center">
    <input
  type="email"
  value={email}
  onChange={(e) =>
    setEmail(e.target.value)
  }
  placeholder="Enter your email"
  className="px-6 py-4 rounded-full w-full md:w-[420px] outline-none border border-gray-200"
/>

   <button
  onClick={handleSubscribe}
  className="px-8 py-4 rounded-full bg-[#173a2a] text-white hover:bg-black transition"
>
  Subscribe
</button>
  </div>
</section>

        {/* FOOTER */}
        <footer className="bg-gradient-to-r from-[#173a2a] to-[#315765] text-white mt-0">

  <div className="max-w-7xl mx-auto px-8 py-8">

    {/* TOP ROW */}
    <div className="flex flex-col lg:flex-row justify-between items-center gap-6">

      {/* LOGO */}
      <div>
        <h2 className="text-4xl font-serif text-[#c1bdb3]">
          KashmirCraft
        </h2>
      </div>

      {/* CONTACT */}
      <div className="text-center lg:text-left">
        <h3 className="font-semibold text-xl mb-2">
          Contact
        </h3>

        <p className="text-white/90">
          info@softwalletinnovativetechnologies.cloud
        </p>

        <p className="text-white/90">
          +91 9596393658
        </p>

        <p className="text-white/90">
          Kupwara, Jammu & Kashmir, India
        </p>
      </div>

      {/* SOCIAL */}
      {/* SOCIAL */}
<div className="text-center">
  <h3 className="font-semibold text-xl mb-3">
    Follow Us
  </h3>

  <div className="flex gap-5 justify-center text-2xl">

    {/* Facebook */}
    <a
      href="https://www.facebook.com/"
      target="_blank"
      className="hover:text-[#D4AF37] transition"
    >
      <FaFacebookF />
    </a>

    {/* Instagram */}
    <a
      href="https://www.instagram.com/"
      target="_blank"
      className="hover:text-[#D4AF37] transition"
    >
      <FaInstagram />
    </a>

    {/* LinkedIn */}
    <a
      href="https://www.linkedin.com/company/softwallet-innovative-technologies-private-limited/"
      target="_blank"
      className="hover:text-[#D4AF37] transition"
    >
      <FaLinkedinIn />
    </a>

    {/* WhatsApp */}
    <a
      href="https://wa.me/919596393658"
      target="_blank"
      className="hover:text-[#25D366] transition"
    >
      <FaWhatsapp />
    </a>

  </div>
</div>

    </div>

    {/* COPYRIGHT */}
    <div className="border-t border-white/20 mt-6 pt-4 text-center text-white/80 text-sm">
      © 2026 Softwallet Innovative Technologies | KashmirCraft Marketplace | All Rights Reserved.
    </div>

  </div>

</footer>
      </div>
    </div>
  );
}