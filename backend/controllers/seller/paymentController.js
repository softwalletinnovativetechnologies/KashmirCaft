import razorpay from "../../config/razorpay.js";
import crypto from "crypto";
import Product from "../../models/Product.js";
import Order from "../../models/Order.js";

// 🔥 CREATE ORDER
export const createOrder = async (req, res) => {
  try {
    const { cart } = req.body;

    if (!cart || cart.length === 0) {
      return res.status(400).json({ message: "Cart empty" });
    }

    const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

    const order = await razorpay.orders.create({
      amount: total * 100,
      currency: "INR",
      receipt: "order_" + Date.now(),
    });

    res.json({ order, total });
  } catch (err) {
    console.log("CREATE ORDER ERROR:", err);
    res.status(500).json({ message: err.message });
  }
};

// 🔥 VERIFY PAYMENT + 20/80 SPLIT
export const verifyPayment = async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, cart } =
      req.body;

    const body = razorpay_order_id + "|" + razorpay_payment_id;

    const expected = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(body)
      .digest("hex");

    if (expected !== razorpay_signature) {
      return res.status(400).json({ message: "Payment verification failed" });
    }

    // 🔥 SPLIT LOGIC
    for (let item of cart) {
      const product = await Product.findById(item._id);

      if (!product) continue;

      const total = item.price * item.qty;

      const adminShare = total * 0.2;
      const sellerShare = total * 0.8;

      await Order.create({
        product: product._id,
        seller: product.seller,
        buyer: req.user?.id || null,

        amount: total,
        adminShare,
        sellerShare,

        paymentId: razorpay_payment_id,
        status: "paid",
      });
    }

    res.json({ success: true });
  } catch (err) {
    console.log("VERIFY ERROR:", err);
    res.status(500).json({ message: err.message });
  }
};
