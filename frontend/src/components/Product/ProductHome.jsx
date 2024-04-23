import Product from "./Product";
import "./ProductHome.css";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getProducts } from "../../store/product";
const ProductHome = () => {
  const dispatch = useDispatch();
  const importProduct = useSelector((state) => state.getProducts);
  const { products, loading, error } = importProduct;
  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  return (
    <div className="homeScreen">
      <h2 className="homeTitle">All Products</h2>
      <div className="homeProducts">
        {loading ? (<h2>Loading</h2>)
        : error ? (
          <h2>{error}</h2>
        ) : (
          products.map((product) => <Product
          key={product.id}
          productId={product.id}
           name={product.name}
           price={product.price}
           description={product.description}
           imageUrl={product.imageUrl}
           />)
        )
        }
      </div>
    </div>
  );
};
export default ProductHome;
