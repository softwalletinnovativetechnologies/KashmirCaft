// AI Sentiment Analysis — runs entirely in the browser, no API needed

const POSITIVE_WORDS = [
  "good", "great", "excellent", "amazing", "love", "perfect", "beautiful",
  "best", "awesome", "fantastic", "superb", "wonderful", "happy", "satisfied",
  "quality", "genuine", "authentic", "soft", "smooth", "recommend", "worth",
  "outstanding", "brilliant", "delightful", "lovely", "nice", "fine",
];

const NEGATIVE_WORDS = [
  "bad", "worst", "terrible", "awful", "poor", "hate", "disappointed",
  "cheap", "fake", "broken", "damaged", "slow", "wrong", "never", "waste",
  "horrible", "useless", "defective", "pathetic", "disgusting", "avoid",
  "refund", "return", "delayed", "missing",
];

// Analyzes a single review comment and returns sentiment score
function analyzeComment(comment) {
  const words = comment.toLowerCase().split(/\s+/);
  let score = 0;
  for (const word of words) {
    if (POSITIVE_WORDS.includes(word)) score++;
    if (NEGATIVE_WORDS.includes(word)) score--;
  }
  return score;
}

// Analyzes all reviews and returns a summary object
export function analyzeSentiment(reviews) {
  if (!reviews || reviews.length === 0) return null;

  const totalRating = reviews.reduce((sum, r) => sum + r.rating, 0);
  const avgRating = totalRating / reviews.length;

  let totalSentiment = 0;
  for (const review of reviews) {
    totalSentiment += analyzeComment(review.comment);
  }

  const positive = reviews.filter((r) => r.rating >= 4).length;
  const neutral = reviews.filter((r) => r.rating === 3).length;
  const negative = reviews.filter((r) => r.rating <= 2).length;

  let overallSentiment = "Mixed";
  let sentimentEmoji = "😐";
  let sentimentColor = "text-amber-600";
  let sentimentBg = "bg-amber-50 border-amber-200";

  if (avgRating >= 4 && totalSentiment >= 0) {
    overallSentiment = "Positive";
    sentimentEmoji = "😊";
    sentimentColor = "text-green-600";
    sentimentBg = "bg-green-50 border-green-200";
  } else if (avgRating <= 2.5 || totalSentiment < -2) {
    overallSentiment = "Negative";
    sentimentEmoji = "😞";
    sentimentColor = "text-red-600";
    sentimentBg = "bg-red-50 border-red-200";
  }

  return {
    avgRating: avgRating.toFixed(1),
    totalReviews: reviews.length,
    overallSentiment,
    sentimentEmoji,
    sentimentColor,
    sentimentBg,
    positive,
    neutral,
    negative,
  };
}