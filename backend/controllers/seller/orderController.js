import Order from "../../models/Order.js";
import Product from "../../models/Product.js";

// 🛒 CREATE ORDER
export const createOrder = async (req, res) => {
  try {
    const { productId, quantity } = req.body;

    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    const amount = product.price * quantity;

    const adminShare = Math.round(amount * 0.2);
    const sellerShare = Math.round(amount * 0.8);

    const order = await Order.create({
      product: product._id,
      seller: product.seller,
      buyer: req.user.id,
      quantity,
      amount,
      adminShare,
      sellerShare,
    });

    res.status(201).json(order);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Order creation failed",
    });
  }
};

// 📦 GET SELLER ORDERS
export const getSellerOrders = async (req, res) => {
  const orders = await Order.find({ seller: req.user.id }).populate("product");

  res.json(orders);
};

// 🔄 UPDATE STATUS
export const updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({
        message: "Order not found",
      });
    }

    if (order.seller.toString() !== req.user.id) {
      return res.status(403).json({
        message: "Unauthorized",
      });
    }

    order.status = status;

    await order.save();

    res.json(order);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Status update failed",
    });
  }
};
