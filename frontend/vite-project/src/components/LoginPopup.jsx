import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function LoginPopup({ onClose }) {
  const navigate = useNavigate();

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
      <motion.div
        initial={{ scale: 0.7, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white p-8 rounded-2xl shadow-2xl w-[320px] text-center"
      >
        <h2 className="text-xl font-semibold mb-3">Login Required 🔐</h2>

        <p className="text-gray-600 mb-6">Please login to continue</p>

        <button
          onClick={() => navigate("/auth")}
          className="w-full bg-[#c8a97e] text-white py-2 rounded-xl mb-3"
        >
          Login Now
        </button>

        <button onClick={onClose} className="text-gray-500 text-sm">
          Cancel
        </button>
      </motion.div>
    </div>
  );
}
