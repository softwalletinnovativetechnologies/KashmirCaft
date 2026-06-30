import razorpay from "../../config/razorpay.js";
import crypto from "crypto";
import Product from "../../models/Product.js";
import Order from "../../models/Order.js";
import User from "../../models/User.js";
import sendMail from "../../utils/sendMail.js";

// ─── EMAIL TEMPLATES ──────────────────────────────────────────────────────────

const buyerOrderEmail = (buyerName, items, total, paymentId) => `
<div style="font-family:sans-serif;max-width:600px;margin:auto;padding:24px;border:1px solid #eee;border-radius:12px">
  <div style="background:#32758b;padding:20px;border-radius:10px;text-align:center">
    <h1 style="color:white;margin:0">KashmirCraft</h1>
    <p style="color:#cce8f0;margin:4px 0 0">Order Confirmation</p>
  </div>

  <p style="margin-top:20px">Assalamu Alaikum <b>${buyerName}</b>! 🎉</p>
  <p>Your order has been placed successfully. Thank you for shopping with us!</p>

  <div style="background:#f9f9f9;border-radius:10px;padding:16px;margin:20px 0">
    <h3 style="margin:0 0 12px;color:#32758b">Order Summary</h3>
    ${items.map((item) => `
      <div style="display:flex;justify-content:space-between;padding:8px 0;border-bottom:1px solid #eee">
        <span>${item.name} × ${item.qty}</span>
        <span><b>₹${item.price * item.qty}</b></span>
      </div>
    `).join("")}
    <div style="display:flex;justify-content:space-between;padding:12px 0;font-size:18px">
      <span><b>Total</b></span>
      <span style="color:#32758b"><b>₹${total}</b></span>
    </div>
  </div>

  <p style="color:#666;font-size:13px">Payment ID: ${paymentId}</p>
  <p>Your order will be delivered within <b>5–7 business days</b>. We'll keep you updated!</p>

  <div style="background:#32758b;padding:14px;border-radius:10px;text-align:center;margin-top:20px">
    <p style="color:white;margin:0">🪷 Thank you for supporting Kashmiri artisans!</p>
  </div>
</div>`;

const sellerNewOrderEmail = (sellerName, productName, qty, amount, buyerName) => `
<div style="font-family:sans-serif;max-width:600px;margin:auto;padding:24px;border:1px solid #eee;border-radius:12px">
  <div style="background:#1b6672;padding:20px;border-radius:10px;text-align:center">
    <h1 style="color:white;margin:0">KashmirCraft</h1>
    <p style="color:#a8dce8;margin:4px 0 0">New Order Alert 🛍️</p>
  </div>

  <p style="margin-top:20px">Assalamu Alaikum <b>${sellerName}</b>!</p>
  <p>Great news — you have received a new order!</p>

  <div style="background:#f0f9fb;border-radius:10px;padding:16px;margin:20px 0;border-left:4px solid #1b6672">
    <p><b>Product:</b> ${productName}</p>
    <p><b>Quantity:</b> ${qty}</p>
    <p><b>Your Earnings:</b> ₹${(amount * 0.8).toFixed(0)} <span style="color:#888;font-size:12px">(80% of ₹${amount})</span></p>
    <p><b>Buyer:</b> ${buyerName}</p>
  </div>

  <p>Please prepare the product for dispatch as soon as possible.</p>

  <div style="background:#1b6672;padding:14px;border-radius:10px;text-align:center;margin-top:20px">
    <p style="color:white;margin:0">Keep up the great work! 🙌</p>
  </div>
</div>`;

const lowStockAlertEmail = (sellerName, productName, orderCount) => `
<div style="font-family:sans-serif;max-width:600px;margin:auto;padding:24px;border:1px solid #eee;border-radius:12px">
  <div style="background:#b45309;padding:20px;border-radius:10px;text-align:center">
    <h1 style="color:white;margin:0">KashmirCraft</h1>
    <p style="color:#fde68a;margin:4px 0 0">⚠️ High Demand Alert</p>
  </div>

  <p style="margin-top:20px">Assalamu Alaikum <b>${sellerName}</b>!</p>
  <p>Your product <b>"${productName}"</b> has received <b>${orderCount} orders</b> and is in high demand!</p>

  <div style="background:#fffbeb;border-radius:10px;padding:16px;margin:20px 0;border-left:4px solid #b45309">
    <p>⚡ <b>AI Recommendation:</b> Consider restocking this product soon to avoid missing future sales opportunities.</p>
    <p>📦 Products with consistent stock get 2x more visibility on KashmirCraft.</p>
  </div>

  <div style="background:#b45309;padding:14px;border-radius:10px;text-align:center;margin-top:20px">
    <p style="color:white;margin:0">Keep your store stocked and keep earning! 💰</p>
  </div>
</div>`;

// ─── CREATE ORDER ─────────────────────────────────────────────────────────────

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

// ─── VERIFY PAYMENT + SAVE ORDER + SEND NOTIFICATIONS ────────────────────────

export const verifyPayment = async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      cart,
    } = req.body;

    // Verify payment signature
    const body = razorpay_order_id + "|" + razorpay_payment_id;
    const expected = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(body)
      .digest("hex");

    if (expected !== razorpay_signature) {
      return res.status(400).json({ message: "Payment verification failed" });
    }

    // Get buyer details for email
    const buyer = await User.findById(req.user?.id);
    const buyerName = buyer?.name || "Customer";
    const buyerEmail = buyer?.email;

    const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

    // Save each product as an order + send seller notifications
    for (const item of cart) {
      const product = await Product.findById(item._id);
      if (!product) continue;

      const itemTotal = product.price * item.qty;
      const adminShare = itemTotal * 0.2;
      const sellerShare = itemTotal * 0.8;

      await Order.create({
        product: product._id,
        seller: product.seller,
        buyer: req.user?.id,
        amount: itemTotal,
        adminShare,
        sellerShare,
        paymentId: razorpay_payment_id,
        status: "placed",
      });

      // Get seller details and send new order alert
      const seller = await User.findById(product.seller);
      if (seller?.email) {
        await sendMail(
          seller.email,
          `🛍️ New Order: ${product.name}`,
          sellerNewOrderEmail(
            seller.name || "Seller",
            product.name,
            item.qty,
            itemTotal,
            buyerName
          )
        );
      }

      // Check order count for this product — send low stock alert if high demand
      const orderCount = await Order.countDocuments({ product: product._id });
      if (orderCount === 5 || orderCount === 10 || orderCount % 20 === 0) {
        if (seller?.email) {
          await sendMail(
            seller.email,
            `⚠️ High Demand Alert: ${product.name}`,
            lowStockAlertEmail(
              seller.name || "Seller",
              product.name,
              orderCount
            )
          );
        }
      }
    }

    // Send order confirmation to buyer
    if (buyerEmail) {
      await sendMail(
        buyerEmail,
        "✅ Order Confirmed — KashmirCraft",
        buyerOrderEmail(buyerName, cart, total, razorpay_payment_id)
      );
    }

    res.json({ success: true, message: "Order saved successfully" });
  } catch (err) {
    console.log("VERIFY ERROR:", err);
    res.status(500).json({ message: err.message });
  }
};