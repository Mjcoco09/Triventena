import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { removeReview } from "../../store/review";
import { useModal } from "../../context/Modal";
import "./DeleteReview.css";

const DeleteReview = () => {
  const { closeModal } = useModal();
  const dispatch = useDispatch();

  const sessionState = useSelector((state) => state.session);
  const reviewState = useSelector((state) => state.review);

  const currentUser = sessionState ? sessionState.user : null;
  const userId = currentUser ? currentUser.id : null;

  const reviews = reviewState.reviews.Reviews;

  const handleDelete = () => {
    const reviewToDelete = reviews.find((review) => review.userId === userId);
    if (reviewToDelete) {
      dispatch(removeReview(reviewToDelete.id));
      closeModal();
    } else {
      console.error("Review not found for the current user");
    }
  };
  useEffect(() => {
    console.log("Review deleted. Refreshing component...");
  }, [reviewState]);

  return (
    <div className="deleteReviewForm">
      <h2 className="h2Delete">Confirm Delete</h2>
      <div className="deleteReviewDiv">
        <h3>Are you sure you want to delete this review?</h3>
        <button className="red" onClick={handleDelete}>
          Yes
        </button>
        <button className="grey" onClick={closeModal}>
          No
        </button>
      </div>
    </div>
  );
};

export default DeleteReview;
