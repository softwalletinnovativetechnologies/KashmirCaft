import User from "../../models/User.js";
import Product from "../../models/Product.js";
import Order from "../../models/Order.js";
console.log("🔥 ADMIN DASHBOARD CONTROLLER LOADED");
export const getAdminStats = async (req, res) => {
  console.log("🔥 getAdminStats CALLED");
  try {
    const totalVendors = await User.countDocuments({ role: "seller" });
    const totalCustomers = await User.countDocuments({ role: "customer" });
    const totalOrders = await Order.countDocuments();
    const totalProducts = await Product.countDocuments();

    const pendingProducts = await Product.countDocuments({ status: "pending" });

   const orders = await Order.find();

// ADMIN REVENUE
const adminEarnings = orders.reduce(
  (acc, item) => acc + Number(item.adminShare || 0),
  0,
);

// SELLER REVENUE
const sellerEarnings = orders.reduce(
  (acc, item) => acc + Number(item.sellerShare || 0),
  0,
);

console.log("ADMIN EARNINGS =", adminEarnings);
console.log("SELLER EARNINGS =", sellerEarnings);

    res.json({
  totalVendors,
  totalCustomers,
  totalOrders,
  totalProducts,
  pendingProducts,
  pendingVendors,

  totalRevenue: adminEarnings,
  adminEarnings,
  sellerEarnings,
});
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
