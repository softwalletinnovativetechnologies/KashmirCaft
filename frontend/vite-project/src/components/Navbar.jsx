import { motion } from "framer-motion";

export default function Navbar() {
  return (
    <motion.div
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="sticky top-0 z-50 px-4 md:px-6 mt-4"
    >
      <div className="flex items-center justify-between px-6 py-3 rounded-full backdrop-blur-xl bg-white/30 border border-white/40 shadow-lg">
        {/* LOGO */}
        <h1 className="text-xl md:text-2xl font-bold text-[#1F3D2B]">
          Kashmir<span className="text-[#D4AF37]">Craft</span>
        </h1>

        {/* NAV LINKS */}
        <div className="hidden md:flex items-center gap-8 text-[#1F3D2B] font-medium">
          <motion.a
            whileHover={{ scale: 1.1 }}
            className="relative cursor-pointer group"
          >
            Home
            <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-[#D4AF37] group-hover:w-full transition-all"></span>
          </motion.a>

          <motion.a
            whileHover={{ scale: 1.1 }}
            className="relative cursor-pointer group"
          >
            Shop
            <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-[#D4AF37] group-hover:w-full transition-all"></span>
          </motion.a>

          <motion.a
            whileHover={{ scale: 1.1 }}
            className="relative cursor-pointer group"
          >
            Sellers
            <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-[#D4AF37] group-hover:w-full transition-all"></span>
          </motion.a>

          <motion.a
            whileHover={{ scale: 1.1 }}
            className="relative cursor-pointer group"
          >
            Contact
            <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-[#D4AF37] group-hover:w-full transition-all"></span>
          </motion.a>
        </div>

        {/* RIGHT SIDE */}
        <div className="flex items-center gap-4">
          {/* LOGIN BUTTON */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            className="hidden md:block px-5 py-2 rounded-full border border-[#1F3D2B] text-[#1F3D2B] hover:bg-[#1F3D2B] hover:text-white transition"
          >
            Login
          </motion.button>

          {/* MOBILE MENU ICON */}
          <div className="md:hidden text-2xl cursor-pointer">☰</div>
        </div>
      </div>
    </motion.div>
  );
}
