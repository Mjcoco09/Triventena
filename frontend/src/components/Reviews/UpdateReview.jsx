import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { editReview } from "../../store/review";
import { useModal } from "../../context/Modal";
import "./UpdateReview.css"
function UpdateReviewModal({ reviewId, initialStars, initialReview }) {
  const dispatch = useDispatch();
  const { closeModal } = useModal();

  const [stars, setStars] = useState(initialStars);
  const [review, setReview] = useState(initialReview);
  const [error, setError] = useState({});

  const handleStarsChange = (e) => setStars(e.target.value);
  const handleReviewChange = (e) => setReview(e.target.value);

  useEffect(() => {
    const newErr = {};
    if (review.length < 10) {
      newErr.review = "Please provide at least 10 characters";
    }
    setError(newErr);
  }, [review]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      stars,
      review,
    };
    await dispatch(editReview(reviewId, payload));
    closeModal();
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Edit Your Review</h2>
      <div className="overlay">
        <div className="modal" onClick={(e) => e.stopPropagation()}>
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
            <input
              type="number"
              value={stars}
              onChange={handleStarsChange}
              min={1}
              max={5}
            />
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
