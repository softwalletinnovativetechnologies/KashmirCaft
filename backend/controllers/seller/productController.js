import Product from "../../models/Product.js";

// ➕ ADD PRODUCT
export const addProduct = async (req, res) => {
  try {
    const { name, price } = req.body;

    const product = await Product.create({
      name,
      price,
      image: req.file
        ? `http://localhost:5000/uploads/${req.file.filename}`
        : "",
      seller: req.user.id,
    });

    res.json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// 📦 GET PRODUCTS (SELLER)
export const getMyProducts = async (req, res) => {
  try {
    const products = await Product.find({ seller: req.user.id });
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ✏️ UPDATE
export const updateProduct = async (req, res) => {
  try {
    const updateData = {
      name: req.body.name,
      price: req.body.price,
    };

    if (req.file) {
      updateData.image = `http://localhost:5000/uploads/${req.file.filename}`;
    }

    const product = await Product.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
    });

    res.json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ❌ DELETE
export const deleteProduct = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
