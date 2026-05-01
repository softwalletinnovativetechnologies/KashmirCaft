import Product from "../../models/Product.js";

// ➕ ADD PRODUCT
export const addProduct = async (req, res) => {
  try {
    const { name, price, description, category, stock } = req.body;

    // ✅ SAFE CATEGORY
    const safeCategory = category
      ? category.trim().toLowerCase()
      : "uncategorized";

    const product = await Product.create({
      name,
      price,
      description,
      category: safeCategory,
      stock: stock || 0,

      // ✅ SAFE IMAGE
      images:
        req.file && req.file.filename
          ? [`http://localhost:5000/uploads/${req.file.filename}`]
          : [],

      seller: req.user.id,
    });

    res.status(201).json(product);
  } catch (err) {
    console.log("🔥 ADD PRODUCT ERROR:", err);
    res.status(500).json({ message: err.message });
  }
};

// 📦 GET PRODUCTS (SELLER)
export const getMyProducts = async (req, res) => {
  try {
    const products = await Product.find({
      seller: req.user.id,
    }).sort({ createdAt: -1 });

    res.json(products);
  } catch (err) {
    console.log("GET PRODUCTS ERROR:", err);
    res.status(500).json({ message: err.message });
  }
};

// ✏️ UPDATE PRODUCT
export const updateProduct = async (req, res) => {
  try {
    const updateData = {
      name: req.body.name,
      price: req.body.price,
      description: req.body.description,
      stock: req.body.stock || 0,

      category: req.body.category
        ? req.body.category.trim().toLowerCase()
        : "uncategorized",
    };

    if (req.file && req.file.filename) {
      updateData.images = [
        `http://localhost:5000/uploads/${req.file.filename}`,
      ];
    }

    const product = await Product.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
    });

    res.json(product);
  } catch (err) {
    console.log("UPDATE ERROR:", err);
    res.status(500).json({ message: err.message });
  }
};

// ❌ DELETE PRODUCT
export const deleteProduct = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: "Product Deleted Successfully" });
  } catch (err) {
    console.log("DELETE ERROR:", err);
    res.status(500).json({ message: err.message });
  }
};
