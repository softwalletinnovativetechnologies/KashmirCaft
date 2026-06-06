import User from "../../models/User.js";
import Product from "../../models/Product.js";
import Order from "../../models/Order.js";

export const getAdminStats = async (req, res) => {
  try {
    // USERS
    const totalVendors = await User.countDocuments({
      role: "seller",
    });

    const totalCustomers = await User.countDocuments({
      role: "buyer",
    });

    // PRODUCTS
    const totalProducts = await Product.countDocuments();

    const pendingProducts = await Product.countDocuments({
      status: "pending",
    });

    // ORDERS
    const totalOrders = await Order.countDocuments();

    // 🔥 GET ALL ORDERS
    const orders = await Order.find();

    // 🔥 TOTAL REVENUE
   // 🔥 ADMIN EARNINGS
const adminEarnings = orders.reduce(
  (acc, item) => acc + Number(item.adminShare || 0),
  0
);

// 🔥 SELLER EARNINGS
const sellerEarnings = orders.reduce(
  (acc, item) => acc + Number(item.sellerShare || 0),
  0
);

// 🔥 TOTAL SALES
const totalRevenue = orders.reduce(
  (acc, item) => acc + Number(item.amount || 0),
  0
);

console.log("ADMIN EARNINGS =", adminEarnings);
console.log("SELLER EARNINGS =", sellerEarnings);
console.log("TOTAL SALES =", totalRevenue);

    // 🔥 PENDING SELLERS
    const pendingVendors = await User.countDocuments({
      role: "seller",
      status: "pending",
    });

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
    res.status(500).json({
      error: err.message,
    });
  }
};
export default getAdminStats;
