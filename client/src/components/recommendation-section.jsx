import { BookOpen, RefreshCw } from "lucide-react";
import PropTypes from "prop-types";
import Alert from "./alert";

const RecommendationSection = ({ onRecommend, recommendation }) => (
  <div className="mt-8 p-4 bg-gray-100 rounded-lg">
    <h2 className="text-xl font-semibold mb-4">Get a Recommendation</h2>
    <button
      onClick={onRecommend}
      className="p-2 text-white bg-green-600 rounded hover:bg-green-700"
    >
      <RefreshCw className="inline mr-2" size={18} />
      Recommend a Book
    </button>
    {recommendation && (
      <Alert className="mt-4">
        <BookOpen className="h-4 w-4" />
        <h1>Recommended Book</h1>
        <p>
          {recommendation.title} by {recommendation.author} (
          {recommendation.genre})
        </p>
      </Alert>
    )}
  </div>
);

RecommendationSection.propTypes = {
  onRecommend: PropTypes.func.isRequired,
  recommendation: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    genre: PropTypes.string.isRequired,
  }),
};

export default RecommendationSection;
