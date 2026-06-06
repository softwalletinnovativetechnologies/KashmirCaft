import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();

  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [user, setUser] = useState(null);

  const profileRef = useRef();

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("user")));
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/auth");
  };

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Shop", path: "/shop" },
    { name: "Seller", path: "/seller" },
    { name: "Contact", path: "/contact" },
  ];

  const itemStyle = {
    padding: "12px 16px",
    textAlign: "left",
    color: "#111",
    background: "#fff",
    border: "none",
    width: "100%",
    cursor: "pointer",
  };

  return (
    <header
      style={{
        background: "#fff",
        padding: "12px 20px",
        boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        {/* LOGO */}
        <Link
          to="/"
          style={{ display: "flex", alignItems: "center", gap: "8px" }}
        >
          <div
            style={{
              width: "35px",
              height: "35px",
              background: "#315765",
              color: "#fff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: "6px",
            }}
          >
            ✦
          </div>
          <h2
  className="text-xl md:text-3xl"
  style={{
    color: "#315765",
    margin: 0,
  }}
>
  KashmirCraft
</h2>
        </Link>

        {/* NAV LINKS */}
        {/* DESKTOP NAV LINKS */}
<div
  className="hidden md:flex"
  style={{ gap: "20px" }}
>
          {navLinks.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              style={{
                color: location.pathname === item.path ? "#7F5430" : "#111",
                textDecoration: "none",
                fontWeight: "500",
              }}
            >
              {item.name}
            </Link>
          ))}
        </div>
{/* MOBILE MENU BUTTON */}
<div className="md:hidden">
  <button
    onClick={() => setMenuOpen(!menuOpen)}
    style={{
      background: "transparent",
      border: "none",
      fontSize: "24px",
      cursor: "pointer",
      color: "#315765",
    }}
  >
    {menuOpen ? <FaTimes /> : <FaBars />}
  </button>
</div>
        {/* RIGHT */}
        <div style={{ position: "relative" }}>
          {!user ? (
            <button
              onClick={() => navigate("/auth")}
              style={{
                padding: "8px 14px",
                border: "1px solid #315765",
                background: "#fff",
                color: "#315765",
              }}
            >
              Login
            </button>
          ) : (
            <div ref={profileRef}>
              {/* PROFILE */}
              <div
                onClick={() => setProfileOpen(!profileOpen)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  background: "#eee",
                  padding: "6px 12px",
                  borderRadius: "20px",
                  cursor: "pointer",
                }}
              >
                <div
                  style={{
                    width: "30px",
                    height: "30px",
                    borderRadius: "50%",
                    background: "#c8a97e",
                    color: "#fff",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {user.name?.charAt(0)}
                </div>
               <span
  className="hidden md:block"
  style={{ color: "#000" }}
>
  {user.name}
</span>
              </div>

              {/* DROPDOWN */}
              <AnimatePresence>
                {profileOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    style={{
                      position: "absolute",
                      right: 0,
                      top: "45px",
                      width: "220px",
                      background: "#fff",
                      border: "1px solid #ddd",
                      borderRadius: "8px",
                      boxShadow: "0 5px 20px rgba(0,0,0,0.15)",
                      zIndex: 999,
                    }}
                  >
                    <div
                      style={{
                        padding: "10px 14px",
                        borderBottom: "1px solid #eee",
                      }}
                    >
                      <p style={{ fontSize: "12px", color: "#666", margin: 0 }}>
                        Signed in as
                      </p>
                      <p style={{ fontWeight: "600", margin: 0 }}>
                        {user.name}
                      </p>
                    </div>

                    {/* BUYER MENU */}
                    {user.role === "buyer" && (
                      <>
                        <button
                          onClick={() => navigate("/profile")}
                          style={itemStyle}
                        >
                          Profile
                        </button>

                        <button
                          onClick={() => navigate("/cart")}
                          style={itemStyle}
                        >
                          Cart
                        </button>

                        <button
                          onClick={() => navigate("/wishlist")}
                          style={itemStyle}
                        >
                          Wishlist
                        </button>
                      </>
                    )}

                    {/* SELLER MENU */}
                    {user.role === "seller" && (
                      <>
                        <button
                          onClick={() => navigate("/seller-dashboard")}
                          style={itemStyle}
                        >
                          Seller Dashboard
                        </button>

                        <button
                          onClick={() => navigate("/profile")}
                          style={itemStyle}
                        >
                          Profile
                        </button>
                      </>
                    )}

                    {/* ADMIN MENU */}
                    {user.role === "admin" && (
                      <>
                        <button
                          onClick={() => navigate("/admin")}
                          style={itemStyle}
                        >
                          Admin Dashboard
                        </button>
                      </>
                    )}

                    <button
                      onClick={handleLogout}
                      style={{ ...itemStyle, color: "red" }}
                    >
                      Logout
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}
        </div>
        {/* MOBILE MENU */}
<AnimatePresence>
  {menuOpen && (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      exit={{ opacity: 0, height: 0 }}
      className="md:hidden"
      style={{
        background: "#fff",
        borderTop: "1px solid #eee",
        overflow: "hidden",
      }}
    >
      {navLinks.map((item) => (
        <Link
          key={item.name}
          to={item.path}
          onClick={() => setMenuOpen(false)}
          style={{
            display: "block",
            padding: "14px",
            color: "#111",
            textDecoration: "none",
            borderBottom: "1px solid #eee",
          }}
        >
          {item.name}
        </Link>
      ))}

      {!user ? (
        <button
          onClick={() => navigate("/auth")}
          style={{
            width: "100%",
            padding: "14px",
            border: "none",
            background: "#315765",
            color: "#fff",
          }}
        >
          Login
        </button>
      ) : (
        <>
          {user.role === "buyer" && (
            <>
              <button
                onClick={() => navigate("/profile")}
                style={itemStyle}
              >
                Profile
              </button>

              <button
                onClick={() => navigate("/cart")}
                style={itemStyle}
              >
                Cart
              </button>

              <button
                onClick={() => navigate("/wishlist")}
                style={itemStyle}
              >
                Wishlist
              </button>
            </>
          )}

          {user.role === "seller" && (
            <>
              <button
                onClick={() =>
                  navigate("/seller-dashboard")
                }
                style={itemStyle}
              >
                Seller Dashboard
              </button>

              <button
                onClick={() => navigate("/profile")}
                style={itemStyle}
              >
                Profile
              </button>
            </>
          )}

          {user.role === "admin" && (
            <button
              onClick={() => navigate("/admin")}
              style={itemStyle}
            >
              Admin Dashboard
            </button>
          )}

          <button
            onClick={handleLogout}
            style={{
              ...itemStyle,
              color: "red",
            }}
          >
            Logout
          </button>
        </>
      )}
    </motion.div>
  )}
</AnimatePresence>
      </div>
    </header>
  );
}
