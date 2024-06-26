import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { postReview } from "../../store/review";
import { useModal } from "../../context/Modal";
import "./postReview.css";

function PostReviewModal({ id }) {
  let createdReview;
  const dispatch = useDispatch();
  const { closeModal } = useModal();

  const [stars, setStar] = useState(1);
  const [review, setReviewText] = useState("");
  const [error, setError] = useState({});
  const updateStar = (e) => setStar(e.target.value);
  const updateText = (e) => setReviewText(e.target.value);

  useEffect(() => {
    const newErr = {};
    if (review.length < 10) {
      newErr.review = "Please provide at least 10 letters ";
    }
    setError(newErr);
  }, [review]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      stars,
      review,
    };
    closeModal;

    createdReview = await dispatch(postReview(payload, id));
    if (createdReview) {
      closeModal();
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>What do you think of the product?</h2>
      <div className="overlay">
        <div className="modalIn" onClick={(e) => e.stopPropagation()}>
          <h1>Post Your Review</h1>
          <label>
            Review:
            <input
              placeholder="Leave your Review here"
              value={review}
              onChange={updateText}
            />
          </label>
          <label>
            Stars:
            <input
              type="number"
              value={stars}
              onChange={updateStar}
              min={1}
              max={5}
            />
          </label>
          <br />
          <br />
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
