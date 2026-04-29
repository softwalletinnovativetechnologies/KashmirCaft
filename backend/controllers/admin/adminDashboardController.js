import User from "../../models/User.js";
import Product from "../../models/Product.js";
import Order from "../../models/Order.js";

export const getAdminStats = async (req, res) => {
  try {
    const totalVendors = await User.countDocuments({ role: "seller" });
    const totalCustomers = await User.countDocuments({ role: "customer" });
    const totalOrders = await Order.countDocuments();
    const totalProducts = await Product.countDocuments();

    const pendingProducts = await Product.countDocuments({ status: "pending" });

    const orders = await Order.find();
    const revenue = orders.reduce((acc, item) => acc + item.total, 0);

    res.json({
      totalVendors,
      totalCustomers,
      totalOrders,
      totalProducts,
      pendingProducts,
      revenue,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
