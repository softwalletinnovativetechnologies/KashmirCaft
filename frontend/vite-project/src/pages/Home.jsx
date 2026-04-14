import Navbar from "../components/Navbar";
import { motion } from "framer-motion";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-fade";
import { Autoplay, EffectFade } from "swiper/modules";

export default function Home() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* 🌸 BACKGROUND */}
      <div
        className="fixed inset-0 bg-cover bg-center z-[-3]"
        style={{ backgroundImage: "url('/bgw.png')" }}
      />

      {/* ✨ ANIMATED OVERLAY */}
      <div className="fixed inset-0 z-[-2] bg-gradient-to-r from-green-200/30 via-white/20 to-purple-200/30 animate-pulse" />

      <Navbar />

      {/* 🌿 GLASS WRAPPER */}
      <div className="mx-4 md:mx-6 mt-4 rounded-[40px] backdrop-blur-xl bg-white/20 border border-white/30 shadow-[0_8px_40px_rgba(0,0,0,0.2)] overflow-hidden">
        {/* 🌄 HERO */}
        <section className="relative h-[95vh]">
          <Swiper
            modules={[Autoplay, EffectFade]}
            effect="fade"
            autoplay={{ delay: 3000, disableOnInteraction: false }}
            loop
            speed={1200}
            className="h-full"
          >
            {/* VIDEO */}
            <SwiperSlide>
              <video
                src="https://cdn.coverr.co/videos/coverr-mountains-and-lake-1575/1080p.mp4"
                autoPlay
                muted
                loop
                className="w-full h-full object-cover"
              />
            </SwiperSlide>

            {/* IMAGES */}
            {[
              "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf",
              "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b",
              "https://images.unsplash.com/photo-1600585154340-be6161a56a0c",
            ].map((img, i) => (
              <SwiperSlide key={i}>
                <img
                  src={img}
                  className="w-full h-full object-cover scale-110 transition duration-[6000ms]"
                />
              </SwiperSlide>
            ))}
          </Swiper>

          {/* DARK OVERLAY */}
          <div className="absolute inset-0 bg-black/40" />

          {/* HERO TEXT */}
          <div className="absolute inset-0 flex flex-col justify-center px-6 md:px-16 text-white">
            <motion.h1
              initial={{ opacity: 0, y: 80 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              className="text-4xl md:text-6xl font-bold max-w-2xl"
            >
              Discover Authentic Kashmiri Products
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="mt-4 text-gray-200 max-w-md"
            >
              Luxury handcrafted elegance from Kashmir.
            </motion.p>

            <motion.button
              whileHover={{ scale: 1.1 }}
              className="mt-6 px-6 py-3 bg-[#D4AF37] text-black rounded-xl shadow-lg"
            >
              Shop Now
            </motion.button>
          </div>

          {/* 🔍 SEARCH BAR */}
          <div className="absolute bottom-[-40px] w-full flex justify-center px-4 z-20">
            <div className="backdrop-blur-xl bg-white/30 border border-white/40 shadow-2xl rounded-full px-4 md:px-6 py-3 flex items-center gap-3 w-full md:w-[55%]">
              <input
                type="text"
                placeholder="Search Kashmiri products..."
                className="flex-1 bg-transparent outline-none text-white placeholder-white"
              />

              <button className="bg-[#1F3D2B] text-white px-6 py-2 rounded-full hover:scale-105 transition">
                Search
              </button>
            </div>
          </div>
        </section>

        {/* 🏡 FEATURE SECTION */}
        <section className="mt-24 px-6 md:px-12 py-16">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <motion.div
              initial={{ opacity: 0, x: -80 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="relative"
            >
              <img
                src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c"
                className="rounded-2xl shadow-xl"
              />

              <img
                src="https://images.unsplash.com/photo-1582719478250-c89cae4dc85b"
                className="absolute bottom-[-30px] left-6 w-40 md:w-60 rounded-2xl shadow-xl border-4 border-white"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 80 }}
              whileInView={{ opacity: 1, x: 0 }}
            >
              <h2 className="text-3xl md:text-4xl font-semibold text-[#1F3D2B]">
                Authentic Kashmiri Craftsmanship
              </h2>

              <p className="mt-4 text-gray-700">
                Every product reflects tradition and luxury.
              </p>

              <button className="mt-6 px-6 py-3 border border-[#1F3D2B] rounded-xl hover:bg-[#1F3D2B] hover:text-white transition">
                Explore Collection
              </button>
            </motion.div>
          </div>
        </section>

        {/* 🛍️ PRODUCTS */}
        <section className="px-6 md:px-12 pb-20">
          <h2 className="text-3xl font-semibold mb-10 text-[#1F3D2B]">
            Featured Products
          </h2>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.05 }}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                className="bg-white/60 backdrop-blur-md rounded-2xl overflow-hidden shadow-md"
              >
                <img
                  src="https://images.unsplash.com/photo-1593032465171-8f6d8c3c6b7d"
                  className="h-52 w-full object-cover"
                />

                <div className="p-5">
                  <h3 className="font-semibold">Pashmina Shawl</h3>
                  <p className="text-[#D4AF37] font-medium">₹4,999</p>

                  <button className="mt-3 w-full bg-[#1F3D2B] text-white py-2 rounded-xl">
                    Add to Cart
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* 🌄 BANNER */}
        <section className="mx-6 mb-20 rounded-3xl overflow-hidden relative h-[50vh]">
          <img
            src="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee"
            className="absolute w-full h-full object-cover"
          />

          <div className="absolute inset-0 bg-black/50" />

          <div className="relative flex flex-col justify-center items-center h-full text-white text-center">
            <h2 className="text-4xl font-semibold">
              Experience Kashmir Like Never Before
            </h2>

            <button className="mt-4 px-6 py-2 bg-[#D4AF37] text-black rounded-xl">
              Explore Now
            </button>
          </div>
        </section>

        {/* 💌 NEWSLETTER */}
        <section className="py-20 text-center bg-white/40 backdrop-blur-md">
          <h2 className="text-3xl font-semibold text-[#1F3D2B]">
            Join Our Community
          </h2>

          <input
            type="email"
            placeholder="Enter your email"
            className="mt-6 px-5 py-3 rounded-full border w-72 outline-none"
          />
        </section>

        {/* FOOTER */}
        <footer className="py-6 text-center text-gray-600">
          © KashmirCraft Marketplace
        </footer>
      </div>
    </div>
  );
}
