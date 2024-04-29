import "./ProductDetails.css";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getProductDetails } from "../../store/product";
import { addCartThunk } from "../../store/cart";
import { useNavigate } from "react-router-dom";
import { fetchReviews } from "../../store/review";
import ReviewPage from "../Reviews/review";
import PostReviewModal from "../Reviews/PostReview";
import OpenModalButton from "../OpenModalButton/OpenModalButton";
import DeleteReview from "../Reviews/DeleteReview";
import UpdateReviewModal from "../Reviews/UpdateReview";
const ProductDetails = () => {
  const navigate = useNavigate();
  const [qty, setQty] = useState(1);
  const dispatch = useDispatch();
  const productDetails = useSelector((state) => state.getProductDetails);
  const reviewState = useSelector((state) => state.review);
  const sessionState = useSelector((state) => state.session);
  const reviewArr = reviewState.reviews && reviewState.reviews.Reviews;
  let initialStars;
  let initialReview;
  let arrLength;
  const currentUser = sessionState.user;
  let userId;
  if (currentUser) {
    userId = currentUser.id;
  }
  let userHasPostedReview;
  const { loading, error, product } = productDetails;
  const { id } = useParams();
  if (reviewArr) {
    arrLength = reviewArr.length;
  }

  if (reviewArr) {
    const userReviewIds = reviewArr.map((review) => review.userId);
    userHasPostedReview = userReviewIds.includes(userId);
  }

  const currentUserReview =
    reviewArr && reviewArr.find((review) => review.userId === userId);
  if (currentUserReview) {
    initialStars = currentUserReview.stars;
    initialReview = currentUserReview.review;
  }
  const reviewId = currentUserReview ? currentUserReview.id : null;
  useEffect(() => {
    dispatch(getProductDetails(id));
    dispatch(fetchReviews(id));
  }, [dispatch, id, arrLength]);

  const handleSubmit = async () => {
    await dispatch(addCartThunk(product.id, qty));
    navigate("/cart");
  };

  if (loading || error) {
    return (
      <div className="productDetailsContainer">
        {loading ? <h2>Loading...</h2> : <h2>NOT FOUND 404</h2>}
      </div>
    );
  }

  if (!product) {
    return <h2>NOT FOUND 404</h2>
  }
  return (
    <div  className="productDetailsContainer" >
      <div className="productDetail">
        {loading ? (
          <h2>Loading...</h2>
        ) : error ? (
          <h2>{error}</h2>
        ) : (
          <>
            <div className="left">
              <div className="imageContainer">
                <img src={product.imageUrl} alt={product.name} />
              </div>


            <div className="right">
            <div className="detailsBox">
              <div className="infoContainer">
              <dev className="infoContainer">
                <p className="name">{product.name}</p>
                <p className="price">Price:${product.price}</p>
                <p className="desc">{product.description}</p>
              </dev>
            </div>
                <p>
                  Price: <span>${product.price}</span>
                </p>
                <p>
                  status: <span>IN STOCK </span>
                </p>
                <p>
                  Quantity
                  <select value={qty} onChange={(e) => setQty(e.target.value)}>
                    {[...Array(product.count).keys()].map((ele) => (
                      <option key={ele + 1} value={ele + 1}>
                        {ele + 1}
                      </option>
                    ))}
                  </select>
                </p>
                <p>
                  <button type="button" onClick={handleSubmit}>
                    {" "}
                    Add to cart
                  </button>
                </p>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
      <div className="reviewSection">
        <h2>Reviews</h2>
        <div className="reviewDetailsBox">
        <ReviewPage />
        {currentUser && !userHasPostedReview && (
          <OpenModalButton
            className="postReview"
            buttonText="Post Your Reviews"
            modalComponent={<PostReviewModal navigate={navigate} id={id} />}
          />
        )}
        {currentUser && userHasPostedReview && (
          <OpenModalButton
            className="deleteReview"
            buttonText="Delete Review"
            modalComponent={<DeleteReview navigate={navigate} />}
          />
        )}

        {currentUser && userHasPostedReview && currentUserReview && (
          <OpenModalButton
            className="updateReview"
            buttonText="Update Review"
            modalComponent={
              <UpdateReviewModal
                navigate={navigate}
                reviewId={reviewId}
                initialStars={initialStars}
                initialReview={initialReview}
              />
            }
          />
        )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
