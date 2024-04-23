import "./Cart.css";
import { Link } from "react-router-dom";
const Cart = ({ item, qtyChangeHandler, removeFromCart }) => {
  return (
    <div className="cartItem">
      <div className="cartImage">
        <img src={item.imageUrl} alt={item.name} />
      </div>
      <Link to={`/product/${item.id}`} className="cartName">
        <p>{item.name}</p>
      </Link>
      <p className="cartPrice">${item.price}</p>
      <select
        value={item.qty}
        onChange={(e) => qtyChangeHandler(item.product, e.target.value)}
        className="cartSelect"
      >
        {[...Array(item.count).keys()].map((x) => (
          <option key={x + 1} value={x + 1}>
            {x + 1}
          </option>
        ))}
      </select>
      <button
        className="cartDelete"
        onClick={() => removeFromCart(item.product)}
      >
        <i className="fas fa-trash"></i>
      </button>
    </div>
  );
};

export default Cart;
