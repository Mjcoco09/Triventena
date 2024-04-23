import { Link } from "react-router-dom";
import './Product.css'
const Product = ({imageUrl,name,price,description,productId}) => {
  return (
    <div className="product">
      <img src={imageUrl} alt={name} />
      <div className="productInfo">
        <p className="infoName">{name}</p>
        <p className="infoDesc">{description}</p>
        <p className="infoPrice">${price}</p>
        <Link to={`/product/${productId}`} className="infoButton">
          View
        </Link>
      </div>
    </div>
  );
};

export default Product;
