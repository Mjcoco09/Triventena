import { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { postReview } from "../../store/review";
import { useModal } from "../../context/Modal";
import "./postReview.css";

function PostReviewModal({ id }) {
  const dispatch = useDispatch();
  const { closeModal } = useModal();

  const [stars, setStars] = useState(1);
  const [review, setReviewText] = useState("");
  const [error, setError] = useState({});

  const modalRef = useRef();  // Reference to the modal container

  // const handleStarsChange = (e) => setStars(Number(e.target.value));
  const handleReviewChange = (e) => setReviewText(e.target.value);

  // Close modal if clicked outside of the modal container
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        closeModal();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [closeModal]);

  useEffect(() => {
    const newErr = {};
    if (review.length < 10) {
      newErr.review = "Please provide at least 10 characters.";
    }
    setError(newErr);
  }, [review]);

  // Submit the form
  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      stars,
      review,
    };

    const createdReview = await dispatch(postReview(payload, id));

    if (createdReview) {
      closeModal(); // Close the modal after the review is successfully posted
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>What do you think of the product?</h2>
      <div className="overlay">
        <div
          className="modalIn"
          ref={modalRef}
          onClick={(e) => e.stopPropagation()}
        >
          <h1>Post Your Review</h1>

          {/* Review input */}
          <label>
            Review:
            <input
              placeholder="Leave your review here"
              value={review}
              onChange={handleReviewChange}
            />
          </label>

          {/* Stars rating input */}
          <label>
            Stars:
            <div className="star-rating">
              {[1, 2, 3, 4, 5].map((starValue) => (
                <span
                  key={starValue}
                  className={`star ${starValue <= stars ? "filled" : ""}`}
                  onClick={() => setStars(starValue)}
                >
                  &#9733;
                </span>
              ))}
            </div>
          </label>
          {error.review && <p className="error">{error.review}</p>}

          {/* Submit button */}
          <button
            type="submit"
            className="submitButtonReview"
            disabled={error.review}
          >
            Submit Your Review
          </button>
        </div>
      </div>
    </form>
  );
}

export default PostReviewModal;
