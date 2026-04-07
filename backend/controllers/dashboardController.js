import Order from "../models/Order.js";
import Product from "../models/Product.js";

export const getStats = async (req, res) => {
  const products = await Product.countDocuments({ seller: req.user.id });

  const orders = await Order.find({ seller: req.user.id });

  const totalOrders = orders.length;

  const earnings = orders.reduce((acc, o) => acc + o.total, 0);

  // 📊 monthly graph
  const monthly = {};

  orders.forEach((o) => {
    const month = new Date(o.createdAt).toLocaleString("default", {
      month: "short",
    });

    if (!monthly[month]) monthly[month] = 0;

    monthly[month] += o.total;
  });

  const chartData = Object.keys(monthly).map((m) => ({
    name: m,
    earnings: monthly[m],
  }));

  res.json({
    products,
    orders: totalOrders,
    earnings,
    chartData,
  });
};
