import Order from "../../models/Order.js";

export const getEarnings = async (req, res) => {
  const orders = await Order.find({ seller: req.user.id }).populate("product");

  // total earnings
  const total = orders.reduce((acc, o) => acc + o.total, 0);

  // product-wise earnings
  const map = {};

  orders.forEach((o) => {
    const name = o.product.name;

    if (!map[name]) {
      map[name] = {
        name,
        orders: 0,
        earnings: 0,
      };
    }

    map[name].orders += 1;
    map[name].earnings += o.total;
  });

  res.json({
    total,
    breakdown: Object.values(map),
  });
};
