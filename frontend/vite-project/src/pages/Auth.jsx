import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { registerUser, loginUser } from "../services/api";
import heroBg from "../assets/hero-bg.png";

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [role, setRole] = useState("buyer");

  // COMMON
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // SELLER
  const [phone, setPhone] = useState("");
  const [shopName, setShopName] = useState("");
  const [aadhaarNumber, setAadhaarNumber] = useState("");
  const [panNumber, setPanNumber] = useState("");
  const [gstNumber, setGstNumber] = useState("");

  // FILES
  const [aadhaarFront, setAadhaarFront] = useState(null);
  const [aadhaarBack, setAadhaarBack] = useState(null);
  const [panCardImage, setPanCardImage] = useState(null);
  const [profileImage, setProfileImage] = useState(null);

  const [loading, setLoading] = useState(false);

  // 🔥 VALIDATIONS
  const validateSeller = () => {
    if (!phone) return "Phone number required";
    if (!shopName) return "Shop name required";

    if (!/^\d{12}$/.test(aadhaarNumber)) {
      return "Invalid Aadhaar Number";
    }

    if (!/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(panNumber)) {
      return "Invalid PAN Number";
    }

    if (!aadhaarFront || !aadhaarBack || !panCardImage) {
      return "Please upload all required documents";
    }

    return null;
  };

  const resetFields = () => {
    setName("");
    setEmail("");
    setPassword("");

    setPhone("");
    setShopName("");
    setAadhaarNumber("");
    setPanNumber("");
    setGstNumber("");

    setAadhaarFront(null);
    setAadhaarBack(null);
    setPanCardImage(null);
    setProfileImage(null);
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);

      // 🔥 BASIC VALIDATION
      if (!email || !password || (!isLogin && !name)) {
        return alert("Please fill all fields");
      }

      // 🔥 LOGIN
      if (isLogin) {
        const res = await loginUser({
          email,
          password,
        });

        const { token, user } = res.data;

        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));

        alert("Login Successful ✅");

        // 🔥 REDIRECT
        if (user.role === "admin") {
          window.location.href = "/admin";
        } else if (user.role === "seller") {
          window.location.href = "/seller-dashboard";
        } else {
          window.location.href = "/";
        }

        return;
      }

      // 🔥 SELLER VALIDATION
      if (role === "seller") {
        const error = validateSeller();

        if (error) {
          return alert(error);
        }
      }

      // 🔥 FORM DATA
      const formData = new FormData();

      formData.append("name", name);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("role", role);

      // SELLER DATA
      if (role === "seller") {
        formData.append("phone", phone);
        formData.append("shopName", shopName);
        formData.append("aadhaarNumber", aadhaarNumber);
        formData.append("panNumber", panNumber);
        formData.append("gstNumber", gstNumber);

        if (aadhaarFront) formData.append("aadhaarFront", aadhaarFront);

        if (aadhaarBack) formData.append("aadhaarBack", aadhaarBack);

        if (panCardImage) formData.append("panCardImage", panCardImage);

        if (profileImage) formData.append("profileImage", profileImage);
      }

      // 🔥 REGISTER
      await registerUser(formData);

      if (role === "seller") {
        alert(
          "Seller Registration Submitted ✅\nWaiting for Admin Verification.",
        );
      } else {
        alert("Registered Successfully ✅");
      }

      resetFields();
      setIsLogin(true);
    } catch (err) {
      alert(err.response?.data?.message || "Server Error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-[#f5f1eb] px-4 py-10">
      {/* 🌸 BG */}
      <img
        src={heroBg}
        className="absolute w-full h-full object-cover opacity-30"
      />

      <div className="absolute inset-0 bg-[#f5f1eb]/90 backdrop-blur-md" />

      {/* 🌟 CARD */}
      <motion.div
        initial={{ opacity: 0, y: 80 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="relative z-10 w-full max-w-[520px] 
        bg-white/80 backdrop-blur-2xl 
        border border-white/50 shadow-2xl 
        rounded-[36px] p-8"
      >
        {/* TITLE */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-[#2d2424]">
            {isLogin ? "Welcome Back" : "Create Account"}
          </h1>

          <p className="text-gray-500 mt-2">
            {isLogin
              ? "Login to continue shopping"
              : "Join KashmirCraft marketplace"}
          </p>
        </div>

        {/* ROLE */}
        {!isLogin && (
          <div className="flex justify-center gap-3 mb-6">
            {["buyer", "seller"].map((r) => (
              <motion.button
                key={r}
                whileTap={{ scale: 0.95 }}
                whileHover={{ scale: 1.05 }}
                onClick={() => setRole(r)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  role === r
                    ? "bg-gradient-to-r from-[#7F5430] to-[#c8a97e] text-white shadow-lg"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {r.toUpperCase()}
              </motion.button>
            ))}
          </div>
        )}

        {/* FORM */}
        <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
          {/* NAME */}
          {!isLogin && (
            <input
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-3 rounded-2xl bg-white text-black border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#c8a97e]"
            />
          )}

          {/* EMAIL */}
          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 rounded-2xl bg-white text-black border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#c8a97e]"
          />

          {/* PASSWORD */}
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 rounded-2xl bg-white text-black border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#c8a97e]"
          />

          {/* 🔥 SELLER EXTRA */}
          <AnimatePresence>
            {!isLogin && role === "seller" && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="space-y-4 overflow-hidden"
              >
                <div className="pt-2">
                  <h3 className="font-semibold text-[#7F5430] mb-2">
                    Seller Verification
                  </h3>
                </div>

                <input
                  type="text"
                  placeholder="Phone Number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-4 py-3 rounded-2xl bg-white text-black border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#c8a97e]"
                />

                <input
                  type="text"
                  placeholder="Shop Name"
                  value={shopName}
                  onChange={(e) => setShopName(e.target.value)}
                  className="w-full px-4 py-3 rounded-2xl bg-white text-black border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#c8a97e]"
                />

                <input
                  type="text"
                  placeholder="Aadhaar Number"
                  value={aadhaarNumber}
                  onChange={(e) => setAadhaarNumber(e.target.value)}
                  className="w-full px-4 py-3 rounded-2xl bg-white text-black border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#c8a97e]"
                />

                <input
                  type="text"
                  placeholder="PAN Number"
                  value={panNumber}
                  onChange={(e) => setPanNumber(e.target.value.toUpperCase())}
                  className="w-full px-4 py-3 rounded-2xl bg-white text-black border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#c8a97e]"
                />

                <input
                  type="text"
                  placeholder="GST Number (Optional)"
                  value={gstNumber}
                  onChange={(e) => setGstNumber(e.target.value)}
                  className="w-full px-4 py-3 rounded-2xl bg-white text-black border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#c8a97e]"
                />

                {/* FILE UPLOADS */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-[#faf7f2] border border-dashed border-[#c8a97e] rounded-2xl p-4">
                    <label className="text-sm font-medium text-[#7F5430]">
                      Aadhaar Front
                    </label>

                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => setAadhaarFront(e.target.files[0])}
                      className="mt-2 w-full text-sm text-black"
                    />
                  </div>

                  <div className="bg-[#faf7f2] border border-dashed border-[#c8a97e] rounded-2xl p-4">
                    <label className="text-sm font-medium text-[#7F5430]">
                      Aadhaar Back
                    </label>

                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => setAadhaarBack(e.target.files[0])}
                      className="mt-2 w-full text-sm text-black"
                    />
                  </div>

                  <div className="bg-[#faf7f2] border border-dashed border-[#c8a97e] rounded-2xl p-4">
                    <label className="text-sm font-medium text-[#7F5430]">
                      PAN Card
                    </label>

                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => setPanCardImage(e.target.files[0])}
                      className="mt-2 w-full text-sm text-black"
                    />
                  </div>

                  <div className="bg-[#faf7f2] border border-dashed border-[#c8a97e] rounded-2xl p-4">
                    <label className="text-sm font-medium text-[#7F5430]">
                      Profile Image
                    </label>

                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => setProfileImage(e.target.files[0])}
                      className="mt-2 w-full text-sm text-black"
                    />
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* BUTTON */}
          <motion.button
            whileHover={{ scale: loading ? 1 : 1.03 }}
            whileTap={{ scale: loading ? 1 : 0.97 }}
            type="button"
            disabled={loading}
            onClick={handleSubmit}
            className="w-full py-3 rounded-2xl text-white font-semibold 
            bg-gradient-to-r from-[#7F5430] to-[#c8a97e] 
            shadow-lg hover:shadow-xl transition-all disabled:opacity-60"
          >
            {loading
              ? "Processing..."
              : isLogin
                ? "Login"
                : role === "seller"
                  ? "Submit Seller Verification"
                  : "Register"}
          </motion.button>
        </form>

        {/* SWITCH */}
        <p className="text-center mt-6 text-sm text-gray-600">
          {isLogin ? "Don't have an account?" : "Already have an account?"}

          <span
            onClick={() => {
              setIsLogin(!isLogin);
              resetFields();
            }}
            className="ml-2 text-[#c8a97e] cursor-pointer font-semibold hover:underline"
          >
            {isLogin ? "Register" : "Login"}
          </span>
        </p>
      </motion.div>
    </div>
  );
};

export default Auth;
