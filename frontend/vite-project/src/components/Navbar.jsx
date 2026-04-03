import { motion } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const links = [
    { name: "Home", path: "/" },
    { name: "Shop", path: "/shop" },
    { name: "Seller", path: "/seller" },
    { name: "Login", path: "/auth" },
  ];

  return (
    <motion.div
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="fixed top-0 left-0 w-full z-50"
    >
      <div
        className="mx-6 mt-4 px-8 py-4 flex justify-between items-center 
        backdrop-blur-xl bg-white/50 border border-white/30 
        rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.1)]"
      >
        {/* 💎 LOGO */}
        <h1
          onClick={() => navigate("/")}
          className="text-2xl font-medium tracking-wide text-[#3a2f2f] cursor-pointer"
          style={{ fontFamily: "Playfair Display, serif" }}
        >
          Kashmir<span className="text-[#c8a97e]">Craft</span>
        </h1>

        {/* ✨ NAV LINKS */}
        <div className="flex gap-8 text-[#3a2f2f] font-light">
          {links.map((item, i) => {
            const isActive = location.pathname === item.path;

            return (
              <motion.span
                key={i}
                whileHover={{ y: -2 }}
                onClick={() => navigate(item.path)}
                className="cursor-pointer relative group"
              >
                {/* text */}
                <span className={isActive ? "text-[#c8a97e]" : ""}>
                  {item.name}
                </span>

                {/* underline */}
                <span
                  className={`absolute left-0 -bottom-1 h-[1px] bg-[#c8a97e] transition-all duration-300 
                  ${isActive ? "w-full" : "w-0 group-hover:w-full"}`}
                ></span>
              </motion.span>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
};

export default Navbar;
