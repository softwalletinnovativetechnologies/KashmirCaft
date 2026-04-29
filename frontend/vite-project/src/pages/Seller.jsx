import Navbar from "../components/Navbar";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function Seller() {
  const navigate = useNavigate();

  const benefits = [
    {
      icon: "🚀",
      title: "Free Registration",
      desc: "Join instantly and start your seller journey with zero joining fee.",
    },
    {
      icon: "📦",
      title: "Easy Product Upload",
      desc: "Upload products, stock, pricing and images anytime.",
    },
    {
      icon: "💰",
      title: "More Orders",
      desc: "Reach premium buyers across Kashmir and India.",
    },
    {
      icon: "📈",
      title: "Grow Faster",
      desc: "Boost visibility and scale your business professionally.",
    },
  ];

  const steps = [
    "Create Seller Account",
    "Complete Shop Profile",
    "Upload Products",
    "Receive Orders",
  ];

  const stats = [
    { number: "500+", label: "Active Sellers" },
    { number: "10K+", label: "Monthly Orders" },
    { number: "50K+", label: "Customers" },
    { number: "24/7", label: "Support" },
  ];

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-[#dce9e8] via-[#e8f0ef] to-[#d8e2dd]">

      {/* Background */}
      <div
        className="fixed inset-0 bg-cover bg-center z-[-3]"
        style={{ backgroundImage: "url('/bgw.png')" }}
      />
      <div className="fixed inset-0 bg-[#315765]/20 z-[-2]" />

      <Navbar />

      <div className="mx-3 md:mx-6 mt-4 rounded-[34px] overflow-hidden bg-[#eef4f3]/80 backdrop-blur-xl border border-[#ffffff60] shadow-[0_20px_70px_rgba(0,0,0,0.12)]">

        {/* HERO */}
        <section className="relative min-h-[95vh] flex items-center px-6 md:px-12 py-20">

          <div className="grid md:grid-cols-2 gap-14 items-center w-full">

            {/* LEFT */}
            <motion.div
              initial={{ opacity: 0, x: -80 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1 }}
            >
              <p className="uppercase tracking-[6px] text-[#7F5430] text-xs md:text-sm font-semibold mb-4">
                Become a Seller
              </p>

              <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif text-[#315765] leading-tight">
                Sell Your Kashmiri Products
                <span className="block bg-gradient-to-r from-[#315765] via-[#74A8A4] to-[#7F5430] bg-clip-text text-transparent">
                  For Free
                </span>
              </h1>

              <motion.div
                animate={{ width: ["0px", "180px"] }}
                transition={{ duration: 1 }}
                className="h-[3px] bg-gradient-to-r from-[#7F5430] via-[#74A8A4] to-transparent rounded-full mt-6 mb-6"
              />

              <p className="text-[#475569] text-lg leading-relaxed max-w-xl">
                Join KashmirCraft marketplace and grow your shop online with free
                registration, premium branding and nationwide buyers.
              </p>

              <div className="flex flex-wrap gap-4 mt-8">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => navigate("/auth")}
                  className="px-8 py-4 rounded-xl bg-gradient-to-r from-[#315765] via-[#74A8A4] to-[#7F5430] text-white font-semibold shadow-2xl"
                >
                  Register Free
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  onClick={() => navigate("/auth")}
                  className="px-8 py-4 rounded-xl border border-[#315765] text-[#315765] hover:bg-[#315765] hover:text-white transition"
                >
                  Seller Login
                </motion.button>
              </div>
            </motion.div>

            {/* RIGHT */}
            <motion.div
              initial={{ opacity: 0, y: 70 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
            >
              <div className="rounded-[34px] bg-[#eaf1f0] shadow-xl p-8 border border-[#ffffff70]">

                <div className="grid grid-cols-2 gap-4">

                  {stats.map((item, i) => (
                    <motion.div
                      key={i}
                      whileHover={{ y: -10, scale: 1.04 }}
                      className="rounded-2xl bg-[#dce9e8] p-5 text-center shadow"
                    >
                      <h3 className="text-3xl font-bold text-[#315765]">
                        {item.number}
                      </h3>

                      <p className="text-sm text-gray-600 mt-2">
                        {item.label}
                      </p>
                    </motion.div>
                  ))}

                </div>

                <motion.div
                  animate={{ y: [0, -5, 0] }}
                  transition={{ repeat: Infinity, duration: 3 }}
                  className="mt-6 rounded-2xl bg-gradient-to-r from-[#315765] via-[#74A8A4] to-[#7F5430] p-5 text-white"
                >
                  <p className="text-sm opacity-80">Trusted Marketplace</p>
                  <h4 className="text-2xl font-semibold mt-2">
                    Grow Faster With KashmirCraft
                  </h4>
                </motion.div>

              </div>
            </motion.div>

          </div>
        </section>

        {/* BENEFITS */}
        <section className="px-6 md:px-12 pb-20">

          <div className="text-center mb-12">
            <p className="uppercase tracking-[4px] text-[#7F5430] text-sm">
              Why Join Us
            </p>

            <h2 className="text-4xl font-serif text-[#315765] mt-3">
              Premium Seller Benefits
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">

            {benefits.map((item, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -10 }}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                className="rounded-3xl bg-[#eaf1f0] shadow-lg p-6"
              >
                <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-[#d8e2dd] to-[#a6d9e0] flex items-center justify-center text-2xl shadow">
                  {item.icon}
                </div>

                <h3 className="text-xl font-semibold text-[#315765] mt-5">
                  {item.title}
                </h3>

                <p className="text-gray-600 mt-3 text-sm leading-relaxed">
                  {item.desc}
                </p>
              </motion.div>
            ))}

          </div>
        </section>

        {/* STEPS */}
        <section className="px-6 md:px-12 pb-20">

          <div className="text-center mb-12">
            <h2 className="text-4xl font-serif text-[#315765]">
              Start Selling In 4 Easy Steps
            </h2>
          </div>

          <div className="grid md:grid-cols-4 gap-6">

            {steps.map((step, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.05 }}
                className="rounded-3xl bg-[#eaf1f0] shadow-lg p-6 text-center"
              >
                <div className="h-14 w-14 mx-auto rounded-full bg-gradient-to-r from-[#315765] to-[#74A8A4] text-white flex items-center justify-center font-bold text-xl">
                  {i + 1}
                </div>

                <h3 className="mt-5 text-lg font-semibold text-[#315765]">
                  {step}
                </h3>
              </motion.div>
            ))}

          </div>
        </section>

        {/* CTA */}
        <section className="mx-6 mb-20 rounded-[34px] overflow-hidden bg-gradient-to-r from-[#315765] via-[#74A8A4] to-[#7F5430] text-white text-center px-6 py-20">

          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-serif"
          >
            Ready To Start Selling?
          </motion.h2>

          <p className="mt-4 text-lg text-white/90">
            Join free today and grow your business with KashmirCraft.
          </p>

          <motion.button
            whileHover={{ scale: 1.05 }}
            onClick={() => navigate("/auth")}
            className="mt-8 px-8 py-4 rounded-full bg-white text-[#315765] font-semibold shadow-xl"
          >
            Register Now
          </motion.button>

        </section>

        {/* Footer */}
        <footer className="py-7 text-center text-[#315765] bg-[#dce9e8]">
          © 2026 KashmirCraft Marketplace. All rights reserved.
        </footer>

      </div>
    </div>
  );
}