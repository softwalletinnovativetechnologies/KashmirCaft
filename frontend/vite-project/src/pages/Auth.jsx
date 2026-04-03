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

  const handleSubmit = async () => {
    console.log("Clicked ✅");

    if (!email || !password || (!isLogin && !name)) {
      return alert("Please fill all fields");
    }

    try {
      // 🧵 SELLER → PAYMENT FLOW
      if (role === "seller") {
        return (window.location.href = "/seller-payment");
      }

      const payload = { name, email, password, role };

      let res;

      if (isLogin) {
        res = await loginUser({ email, password });

        // 🔐 SAVE TOKEN
        if (res.data.token) {
          localStorage.setItem("token", res.data.token);
        }

        alert("Login Successful ✅");

        // 👉 future: redirect dashboard
        // window.location.href = "/dashboard";
      } else {
        res = await registerUser(payload);

        alert("Registered Successfully ✅");

        // 🔥 AUTO SWITCH TO LOGIN
        setIsLogin(true);

        // 🧹 CLEAR FIELDS
        setName("");
        setEmail("");
        setPassword("");
      }
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Server Error");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f8f4f2] relative overflow-hidden">
      {/* 🌸 BACKGROUND */}
      <img
        src={heroBg}
        className="absolute w-full h-full object-cover opacity-30"
      />

      <div className="absolute w-full h-full bg-[#f8f4f2]/90 backdrop-blur-sm"></div>

      {/* 💎 CARD */}
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 w-[350px] md:w-[400px] p-8 
        backdrop-blur-xl bg-white/70 border border-white/40 
        rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.1)]"
      >
        {/* ✨ TITLE */}
        <h2
          className="text-3xl text-center mb-6 text-[#2d2424] font-medium"
          style={{ fontFamily: "Playfair Display, serif" }}
        >
          {isLogin ? "Welcome Back" : "Create Account"}
        </h2>

        {/* 🌸 FORM */}
        <form
          onSubmit={(e) => e.preventDefault()}
          className="flex flex-col gap-4"
        >
          {/* ROLE */}
          <div className="flex gap-4 justify-center mb-2">
            {["buyer", "seller"].map((r) => (
              <button
                key={r}
                type="button"
                onClick={() => setRole(r)}
                className={`px-4 py-2 rounded-md border text-sm font-medium transition
                ${
                  role === r
                    ? "bg-[#c8a97e] text-white border-[#c8a97e]"
                    : "bg-white text-[#3a2f2f] border-gray-300 hover:bg-[#f3e8e4]"
                }`}
              >
                {r.toUpperCase()}
              </button>
            ))}
          </div>

          {/* INPUTS */}
          {!isLogin && (
            <input
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="px-4 py-3 rounded-md border border-gray-300 bg-white text-[#2d2424] outline-none focus:ring-2 focus:ring-[#c8a97e]"
            />
          )}

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="px-4 py-3 rounded-md border border-gray-300 bg-white text-[#2d2424] outline-none focus:ring-2 focus:ring-[#c8a97e]"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="px-4 py-3 rounded-md border border-gray-300 bg-white text-[#2d2424] outline-none focus:ring-2 focus:ring-[#c8a97e]"
          />

          {/* 🔥 BUTTON */}
          <motion.button
            type="button"
            onClick={handleSubmit}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="mt-4 px-6 py-3 bg-[#c8a97e] text-white rounded-md shadow hover:bg-[#b89666] transition"
          >
            {role === "seller"
              ? "Proceed to Payment"
              : isLogin
                ? "Login"
                : "Register"}
          </motion.button>
        </form>

        {/* 🔁 TOGGLE */}
        <p className="text-center mt-6 text-sm text-gray-700">
          {isLogin ? "Don't have an account?" : "Already have an account?"}
          <span
            onClick={() => setIsLogin(!isLogin)}
            className="ml-2 text-[#c8a97e] font-medium cursor-pointer"
          >
            {isLogin ? "Register" : "Login"}
          </span>
        </p>
      </motion.div>
    </div>
  );
};

export default Auth;
