import { Link } from "react-router-dom";
import './Product.css'
const Product = () => {
  return (
    <div className="product">
      <img src="https://i.postimg.cc/0jhxJtbQ/Levi-Blue.png" alt="name" />
      <div className="productInfo">
        <p className="infoName">product</p>
        <p className="infoDesc">my name is bennit and i aint innit</p>
        <p className="infoPrice">$30</p>
        <Link to={`/product/${12}`} className="infoButton">
          View
        </Link>
      </div>
    </div>
  );
};

export default Product;
