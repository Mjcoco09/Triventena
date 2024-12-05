import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { editReview } from "../../store/review";
import { useModal } from "../../context/Modal";
import "./UpdateReview.css";

function UpdateReviewModal({ reviewId, initialStars, initialReview }) {
  const dispatch = useDispatch();
  const { closeModal } = useModal();

  const [stars, setStars] = useState(initialStars);
  const [review, setReview] = useState(initialReview);
  const [error, setError] = useState({});

  const handleReviewChange = (e) => setReview(e.target.value);

  useEffect(() => {
    const newErr = {};
    if (review.length < 10) {
      newErr.review = "Please provide at least 10 characters";
    }
    setError(newErr);
  }, [review]);

  const handleStarsClick = (index) => {
    setStars(index + 1); // Set stars to index + 1 to reflect 1-based star rating
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      stars,
      review,
    };
    await dispatch(editReview(reviewId, payload));
    closeModal();
  };

  // Close modal when clicking outside the modal
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Edit Your Review</h2>
      <div className="overlay" onClick={handleOverlayClick}>
        <div className="modalIn" onClick={(e) => e.stopPropagation()}>
          <label>
            Review:
            <textarea
              placeholder="Leave your review here"
              value={review}
              onChange={handleReviewChange}
            />
            {error.review && <p className="error">{error.review}</p>}
          </label>
          <label>
            Stars:
            <div className="stars">
              {[...Array(5)].map((_, index) => (
                <i
                  key={index}
                  className={`star ${index < stars ? "fas" : "far"} fa-star`}
                  onClick={() => handleStarsClick(index)}
                />
              ))}
            </div>
          </label>
          <button
            type="submit"
            className="submitButtonReview"
            disabled={!!error.review}
          >
            Update Review
          </button>
        </div>
      </div>
    </form>
  );
}

export default UpdateReviewModal;
