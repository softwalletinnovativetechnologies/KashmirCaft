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
    const totalRevenue = orders.reduce(
      (acc, item) => acc + item.totalAmount,
      0,
    );

    // 🔥 ADMIN EARNING (20%)
    const adminEarnings = totalRevenue * 0.2;

    // 🔥 SELLER EARNING (80%)
    const sellerEarnings = totalRevenue * 0.8;

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

      totalRevenue,
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
