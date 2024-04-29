import { Link } from "react-router-dom";
import "./Product.css";
const Product = ({ imageUrl, name, price, description, productId }) => {
  return (
    <div className="product">
      <Link to={`/product/${productId}`}>
        <img src={imageUrl} alt={name} />
        <div className="productInfo">
          <p className="infoName">{name}</p>
          <p className="infoDesc">{description}</p>
          <p className="infoPrice">${price}</p>
          <br />
        </div>
      </Link>
    </div>
  );
};

export default Product;
