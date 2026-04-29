import User from "../../models/User.js";

// after payment success
export const activateSeller = async (req, res) => {
  try {
    const { userId } = req.body;

    const user = await User.findByIdAndUpdate(
      userId,
      { isPaid: true, role: "seller" },
      { new: true },
    );

    res.json({ message: "Seller activated", user });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
