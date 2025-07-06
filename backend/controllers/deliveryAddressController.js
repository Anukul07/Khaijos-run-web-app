const DeliveryAddress = require("../models/DeliveryAddress");
const User = require("../models/User");

exports.createOrUpdateDeliveryAddress = async (req, res) => {
  try {
    const { userId, addressLine1, addressLine2, city, province } = req.body;

    if (!userId || !addressLine1 || !city || !province) {
      return res.status(400).json({ message: "Missing required fields." });
    }

    // Make sure user exists
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    // Prepare the data
    const addressData = {
      userId,
      addressLine1,
      addressLine2: addressLine2 || "",
      city,
      province,
    };

    // Create or update the delivery address
    const deliveryAddress = await DeliveryAddress.findOneAndUpdate(
      { userId },
      addressData,
      { new: true, upsert: true }
    );

    res.status(200).json({
      message: "Delivery address saved successfully",
      deliveryAddress,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getDeliveryAddressByUser = async (req, res) => {
  try {
    const { userId } = req.body;

    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }

    const deliveryAddress = await DeliveryAddress.findOne({ userId });

    if (!deliveryAddress) {
      return res
        .status(404)
        .json({ message: "No delivery address found for this user" });
    }

    res.status(200).json(deliveryAddress);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
