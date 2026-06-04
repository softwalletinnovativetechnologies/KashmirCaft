import Product from "../../models/Product.js";
import Order from "../../models/Order.js";

export const getDashboardStats = async (req, res) => {
  try {
    const sellerId = req.user.id;

    const products = await Product.find({
      seller: sellerId,
    });

    const orders = await Order.find({
      seller: sellerId,
    });

    const totalProducts = products.length;

    const totalOrders = orders.length;

    const totalEarnings = orders.reduce(
      (sum, item) => sum + (item.sellerShare || 0),
      0
    );

    const chartData = [];

    orders.forEach((order) => {
      const date = new Date(order.createdAt)
        .toLocaleDateString();

      const existing = chartData.find(
        (item) => item.name === date
      );

      if (existing) {
        existing.earnings +=
          order.sellerShare || 0;
      } else {
        chartData.push({
          name: date,
          earnings:
            order.sellerShare || 0,
        });
      }
    });

    res.json({
      totalProducts,
      totalOrders,
      totalEarnings,
      chartData,
    });
  } catch (err) {
    console.log(err);

    res.status(500).json({
      message: err.message,
    });
  }
};