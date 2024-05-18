import { useNavigate } from "react-router-dom";
import "./Product.css";
const Product = ({ imageUrl, name, price, productId }) => {
  const navigate = useNavigate();

  const handleProductClick = () => {
    navigate(`/product/${productId}`);
  };

  return (
    <div className="product" onClick={handleProductClick}>
      <img src={imageUrl} alt={name} />
      <div className="productInfo">
        <p className="infoName">{name}</p>
        {/* <p className="infoDesc">{description}</p> */}
        <p className="infoPrice">${price}</p>
        <br />
      </div>
    </div>
  );
};

export default Product;
