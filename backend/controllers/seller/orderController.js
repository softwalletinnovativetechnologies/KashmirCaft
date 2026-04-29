import Order from "../../models/Order.js";
import Product from "../../models/Product.js";

// 🛒 CREATE ORDER
export const createOrder = async (req, res) => {
  const { productId, quantity } = req.body;

  const product = await Product.findById(productId);

  const order = await Order.create({
    product: productId,
    seller: product.seller,
    buyer: req.user.id,
    quantity,
    total: product.price * quantity,
  });

  res.json(order);
};

// 📦 GET SELLER ORDERS
export const getSellerOrders = async (req, res) => {
  const orders = await Order.find({ seller: req.user.id }).populate("product");

  res.json(orders);
};

// 🔄 UPDATE STATUS
export const updateOrderStatus = async (req, res) => {
  const { status } = req.body;

  const order = await Order.findByIdAndUpdate(
    req.params.id,
    { status },
    { new: true },
  );

  res.json(order);
};
