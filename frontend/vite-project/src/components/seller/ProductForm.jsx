import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import axios from "axios";

// AI Auto-Categorization Logic
// Suggests category based on keywords in the product name
function suggestCategory(productName) {
  const name = productName.toLowerCase();

  const rules = [
    {
      category: "pashmina",
      keywords: ["shawl", "pashmina", "stole", "wrap", "kani", "sozni", "woolen", "kashmiri shawl", "pheran"],
    },
    {
      category: "carpets",
      keywords: ["carpet", "rug", "galeecha", "silk carpet", "wool carpet", "hand knotted", "floor"],
    },
    {
      category: "dryfruits",
      keywords: ["walnut", "almond", "badam", "akhrot", "dry fruit", "saffron", "kesar", "apricot", "anjeer", "pista", "cashew", "raisin", "kishmish"],
    },
    {
      category: "handicrafts",
      keywords: ["wood", "carving", "box", "papier", "mache", "copper", "crewel", "embroidery", "namda", "chain stitch", "frame", "tray", "pottery"],
    },
  ];

  let bestMatch = null;
  let highestScore = 0;

  for (const rule of rules) {
    let score = 0;
    for (const keyword of rule.keywords) {
      if (name.includes(keyword)) score++;
    }
    if (score > highestScore) {
      highestScore = score;
      bestMatch = rule.category;
    }
  }

  return highestScore > 0 ? bestMatch : null;
}

const CATEGORY_LABELS = {
  pashmina: "🧣 Pashmina",
  carpets: "🪄 Carpets",
  dryfruits: "🌰 Dry Fruits",
  handicrafts: "🪵 Handicrafts",
};

const ProductForm = ({ refresh }) => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("pashmina");
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState("");
  const [aiSuggestion, setAiSuggestion] = useState(null);

  // Run AI suggestion whenever product name changes
  useEffect(() => {
    if (name.trim().length < 3) {
      setAiSuggestion(null);
      return;
    }
    const suggested = suggestCategory(name);
    if (suggested && suggested !== category) {
      setAiSuggestion(suggested);
    } else {
      setAiSuggestion(null);
    }
  }, [name]);

  const handleAdd = async () => {
    if (!name || !price || !file) {
      return alert("Please fill all fields");
    }

    try {
      const token = localStorage.getItem("token");

      const formData = new FormData();
      formData.append("name", name);
      formData.append("price", price);
      formData.append("category", category.toLowerCase());
      formData.append("image", file);

      await axios.post(
        `${import.meta.env.VITE_API_URL}/seller/products`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      setName("");
      setPrice("");
      setCategory("pashmina");
      setFile(null);
      setPreview("");
      setAiSuggestion(null);

      refresh && refresh();
    } catch (err) {
      console.log("❌ ADD ERROR:", err.response?.data || err);
      alert("Product add failed");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      className="mb-10 p-8 rounded-3xl bg-white/80 backdrop-blur-xl shadow-2xl border"
    >
      <h2 className="text-3xl text-center mb-8 font-light">
        Add <span className="text-[#1b665c]">Luxury Product</span>
      </h2>

      <div className="grid md:grid-cols-4 gap-6">
        <input
          type="text"
          placeholder="Product Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="px-4 py-3 rounded-xl border"
        />

        <input
          type="number"
          placeholder="Price ₹"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="px-4 py-3 rounded-xl border"
        />

        <div className="flex flex-col gap-1">
          <select
            value={category}
            onChange={(e) => {
              setCategory(e.target.value);
              setAiSuggestion(null);
            }}
            className="px-4 py-3 rounded-xl border"
          >
            <option value="pashmina">Pashmina</option>
            <option value="carpets">Carpets</option>
            <option value="dryfruits">Dry Fruits</option>
            <option value="handicrafts">Handicrafts</option>
          </select>

          {/* AI Suggestion Banner */}
          {aiSuggestion && (
            <div className="flex items-center gap-2 bg-amber-50 border border-amber-300 rounded-lg px-3 py-2 text-sm">
              <span>🤖 AI suggests:</span>
              <span className="font-semibold text-amber-700">
                {CATEGORY_LABELS[aiSuggestion]}
              </span>
              <button
                onClick={() => {
                  setCategory(aiSuggestion);
                  setAiSuggestion(null);
                }}
                className="ml-auto text-white bg-amber-500 hover:bg-amber-600 px-2 py-0.5 rounded text-xs"
              >
                Apply
              </button>
            </div>
          )}
        </div>

        <label className="flex items-center justify-center border-2 border-dashed rounded-xl cursor-pointer p-4">
          Upload Image
          <input
            type="file"
            hidden
            onChange={(e) => {
              const selected = e.target.files[0];
              setFile(selected);
              setPreview(URL.createObjectURL(selected));
            }}
          />
        </label>
      </div>

      {preview && (
        <img src={preview} className="mt-6 w-40 h-40 object-cover rounded-xl" />
      )}

      <button
        onClick={handleAdd}
        className="mt-6 w-full py-3 bg-[#1d666d] text-white rounded-xl"
      >
        Add Product
      </button>
    </motion.div>
  );
};

export default ProductForm;