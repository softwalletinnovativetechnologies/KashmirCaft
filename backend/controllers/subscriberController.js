import Subscriber from "../models/Subscriber.js";

// ADD SUBSCRIBER
export const subscribe = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        message: "Email is required",
      });
    }

    const exists = await Subscriber.findOne({
      email,
    });

    if (exists) {
      return res.status(400).json({
        message: "Already subscribed",
      });
    }

    const subscriber =
      await Subscriber.create({
        email,
      });

    res.status(201).json({
      success: true,
      subscriber,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: error.message,
    });
  }
};

// ADMIN GET ALL
export const getSubscribers = async (
  req,
  res
) => {
  try {
    const subscribers =
      await Subscriber.find().sort({
        createdAt: -1,
      });

    res.json(subscribers);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};