// Product Recommendation Utility
// Suggests related products based on category match and price similarity

export function getRecommendedProducts(currentProduct, allProducts, limit = 4) {
  if (!currentProduct || !allProducts?.length) return [];

  const currentCategory = (currentProduct.category || "").toLowerCase();
  const currentPrice = currentProduct.price || 0;

  const scored = allProducts
    .filter((p) => p._id !== currentProduct._id)
    .map((p) => {
      let score = 0;

      if ((p.category || "").toLowerCase() === currentCategory) {
        score += 50;
      }

      const priceDiff = Math.abs((p.price || 0) - currentPrice);
      const priceRange = currentPrice * 0.3;
      if (priceDiff <= priceRange) {
        score += 20 - Math.min(20, (priceDiff / (priceRange || 1)) * 20);
      }

      if (p.seller?._id === currentProduct.seller?._id) {
        score += 10;
      }

      return { product: p, score };
    })
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((item) => item.product);

  if (scored.length < limit) {
    const usedIds = new Set([currentProduct._id, ...scored.map((p) => p._id)]);
    const fallback = allProducts.filter((p) => !usedIds.has(p._id));
    scored.push(...fallback.slice(0, limit - scored.length));
  }

  return scored;
}

export function getTrendingProducts(allProducts, limit = 8) {
  if (!allProducts?.length) return [];

  return [...allProducts]
    .sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0))
    .slice(0, limit);
}