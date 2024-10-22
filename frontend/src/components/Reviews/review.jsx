// import { useEffect, useState } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { useParams } from "react-router-dom";
// import { fetchReviews } from "../../store/review";

// import "./review.css";
// const ReviewPage = () => {
//   const dispatch = useDispatch();
//   const { id } = useParams();

//   const reviewState = useSelector((state) => state.review);
//   const reviews = reviewState.reviews && reviewState.reviews.Reviews;
//   const sessionState = useSelector((state) => state.session);
//   const currentUser = sessionState.user;
//   let userId;
//   if (currentUser) {
//     userId = currentUser.id;
//   }
//   const [isFetchingReviews, setIsFetchingReviews] = useState(false); //

//   useEffect(() => {
//     if (!reviews && !isFetchingReviews) {
//       setIsFetchingReviews(true);

//       dispatch(fetchReviews(id)).then(() => {
//         setIsFetchingReviews(false);
//       });
//     }
//   }, [dispatch, reviews, isFetchingReviews]);

//   if (!reviews) {
//     return <div>Loading...</div>;
//   }

//   const sortedReviews = [...reviews].sort(
//     (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
//   );

//   return (
//     <div className="review-container">
//       {reviews.length === 0 && userId ? (
//         <p className="review">Be the first to post a review!</p>
//       ) : (
//         <>
//           {sortedReviews.map((review) => (
//             <div key={review.id}>
//               <p className="name">
//                 {review.User.firstName}

//                 <br />
//               </p>
//               <br />
//               <p className="date">
//                 {new Date(review.createdAt).toLocaleString("en-us", {
//                   month: "long",
//                   year: "numeric",
//                 })}
//               </p>
//               <br />
//               <p className="review">{review.review}</p>
//               <p className="review">stars:{review.stars}</p>

//               <hr className="review-separator" />
//             </div>
//           ))}
//         </>
//       )}
//     </div>
//   );
// };

// export default ReviewPage;

import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchReviews } from "../../store/review";
import "./review.css";

const ReviewPage = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  const reviewState = useSelector((state) => state.review);
  const reviews = reviewState.reviews && reviewState.reviews.Reviews;
  const sessionState = useSelector((state) => state.session);
  const currentUser = sessionState.user;
  let userId = currentUser ? currentUser.id : null;

  const [isFetchingReviews, setIsFetchingReviews] = useState(false);

  useEffect(() => {
    if (!reviews && !isFetchingReviews) {
      setIsFetchingReviews(true);
      dispatch(fetchReviews(id)).then(() => setIsFetchingReviews(false));
    }
  }, [dispatch, reviews, isFetchingReviews, id]);

  if (!reviews) {
    return <div className="loading-message">Loading...</div>;
  }

  const sortedReviews = [...reviews].sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );

  return (
    <div className="review-container">
      {reviews.length === 0 ? (
        <p className="noReviewsMessage">
          {userId
            ? "Be the first to post a review!"
            : "No reviews yet. Be the first to add one!"}
        </p>
      ) : (
        <>
          {sortedReviews.map((review) => (
            <div key={review.id}>
              <p className="name">
                {review.User.firstName}
                <br />
              </p>
              <p className="date">
                {new Date(review.createdAt).toLocaleString("en-us", {
                  month: "long",
                  year: "numeric",
                })}
              </p>
              <p className="review">{review.review}</p>
              <p className="review">Rating: {review.stars} ★</p>
              <hr className="review-separator" />
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default ReviewPage;
