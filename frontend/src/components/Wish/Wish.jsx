import "./Wish.css";
import { removeWish } from "../../store/wish";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addCartThunk } from "../../store/cart";
const Wishlist = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const productDetails = useSelector((state) => state.getProductDetails);
  const { product } = productDetails;
  const wishlist = useSelector((state) => state.wish || { wishItems: [] });
  const { wishItems } = wishlist;
  console.log(wishlist, "this is wishlist");
  console.log(wishItems, "this is wishItem");

const removeFromWish= (id) => {
  dispatch(removeWish(id))
}

  const moveToCartHandler = async () => {
    await dispatch(addCartThunk(product.id,1));
    navigate("/cart");
  };

  return (
    <div className="wishlistDetails">
      <h2>Wishlist</h2>
      {wishItems.length === 0 ? (
        <div>Wishlist is empty</div>
      ) : (
        wishItems.map((item) => (
          <div key={item.product} className="wishlistItem">
            <img src={item.imageUrl} alt={item.name} />
            <p>{item.name}</p>
            <p>${item.price}</p>
            <button onClick={() =>removeFromWish(item.product)}>
              Remove
            </button>
            <button onClick={() => moveToCartHandler(item.product)}>
              Move to Cart
            </button>
          </div>
        ))
      )}
    </div>
  );
};

export default Wishlist;
