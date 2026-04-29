import { useState } from "react";
import { motion } from "framer-motion";
import { registerUser, loginUser } from "../services/api";
import heroBg from "../assets/hero-bg.png";

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [role, setRole] = useState("buyer");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!email || !password || (!isLogin && !name)) {
      return alert("Please fill all fields");
    }

    try {
      setLoading(true);

      let res;

      if (isLogin) {
        res = await loginUser({ email, password });

        const { token, user } = res.data;

        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));

        // 🔥 ROLE BASED REDIRECT
        if (user.role === "admin") window.location.href = "/admin";
        else if (user.role === "seller")
          window.location.href = "/seller-dashboard";
        else window.location.href = "/";
      } else {
        await registerUser({ name, email, password, role });

        alert("Registered Successfully ✅");

        setIsLogin(true);
        setName("");
        setEmail("");
        setPassword("");
      }
    } catch (err) {
      alert(err.response?.data?.message || "Server Error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-[#f5f1eb]">
      {/* Background */}
      <img
        src={heroBg}
        className="absolute w-full h-full object-cover opacity-30"
      />
      <div className="absolute w-full h-full bg-[#f5f1eb]/90 backdrop-blur-md"></div>

      {/* Card */}
      <motion.div
        initial={{ opacity: 0, y: 80 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 w-[360px] md:w-[420px] p-8 
        bg-white/80 backdrop-blur-2xl border border-white/40 
        rounded-3xl shadow-2xl"
      >
        {/* Title */}
        <h2 className="text-3xl text-center mb-6 font-semibold text-[#2d2424]">
          {isLogin ? "Welcome Back" : "Create Account"}
        </h2>

        {/* ROLE SELECT (FIXED ✅) */}
        <div className="flex justify-center gap-3 mb-6">
          {["buyer", "seller"].map((r) => (
            <motion.button
              key={r}
              whileTap={{ scale: 0.95 }}
              whileHover={{ scale: 1.05 }}
              onClick={() => setRole(r)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                role === r
                  ? "bg-gradient-to-r from-[#7F5430] to-[#c8a97e] text-white shadow-md"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {r.toUpperCase()}
            </motion.button>
          ))}
        </div>

        {/* FORM */}
        <form
          onSubmit={(e) => e.preventDefault()}
          className="flex flex-col gap-4"
        >
          {!isLogin && (
            <input
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="px-4 py-3 rounded-xl bg-white text-black border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#c8a97e]"
            />
          )}

          <input
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="px-4 py-3 rounded-xl bg-white text-black border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#c8a97e]"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="px-4 py-3 rounded-xl bg-white text-black border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#c8a97e]"
          />

          {/* BUTTON */}
          <motion.button
            whileHover={{ scale: loading ? 1 : 1.05 }}
            whileTap={{ scale: loading ? 1 : 0.95 }}
            type="button"
            disabled={loading}
            onClick={handleSubmit}
            className="mt-4 py-3 rounded-xl text-white font-medium 
            bg-gradient-to-r from-[#7F5430] to-[#c8a97e] shadow-lg disabled:opacity-50"
          >
            {loading ? "Processing..." : isLogin ? "Login" : "Register"}
          </motion.button>
        </form>

        {/* SWITCH */}
        <p className="text-center mt-6 text-sm text-gray-600">
          {isLogin ? "Don't have an account?" : "Already have an account?"}
          <span
            onClick={() => setIsLogin(!isLogin)}
            className="ml-2 text-[#c8a97e] cursor-pointer font-medium hover:underline"
          >
            {isLogin ? "Register" : "Login"}
          </span>
        </p>
      </motion.div>
    </div>
  );
};

export default Auth;
