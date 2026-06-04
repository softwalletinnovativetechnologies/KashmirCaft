import Order from "../../models/Order.js";

export const getEarnings = async (req, res) => {
  try {
    const orders = await Order.find({
      seller: req.user.id,
    }).populate("product");

    const total = orders.reduce(
      (acc, o) => acc + (o.sellerShare || 0),
      0
    );

    const map = {};

    orders.forEach((o) => {
      const name = o.product?.name || "Deleted Product";

      if (!map[name]) {
        map[name] = {
          name,
          orders: 0,
          earnings: 0,
        };
      }

      map[name].orders += 1;

      map[name].earnings += o.sellerShare || 0;
    });

    res.json({
      total,
      breakdown: Object.values(map),
    });
  } catch (err) {
    console.log(err);

    res.status(500).json({
      message: err.message,
    });
  }
};