import "./CartDetails.css";
import Cart from "./Cart";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { addCartThunk, removeCart } from "../../store/cart";
const CartDetails = () => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  const qtyChangeHandler = (id, qty) => {
    dispatch(addCartThunk(id, qty));
  };
  const removeFromCart = (id) => {
    dispatch(removeCart(id));
  };
  const subtotal = () => {
    return cartItems.reduce((price, item) => item.price * item.qty + price, 0);
  };
  return (
    <div className="cartDetails">
      <div className="cartL">
        <h2>Cart</h2>
        {cartItems.length === 0 ? (
          <div>
            Empty
          </div>
        ) : (
          cartItems.map((ele) => (
            <Cart
              key={ele.id}
              item={ele}
              qtyChangeHandler={qtyChangeHandler}
              removeFromCart={removeFromCart}
            />
          ))
        )}
      </div>
      <div className="cartR">
        <div className="cartInfo">
          <p>Total Price</p>
          <p>${subtotal()}</p>
        </div>
        <div>
          <button>Checkout</button>
        </div>
      </div>
    </div>
  );
};

export default CartDetails;
