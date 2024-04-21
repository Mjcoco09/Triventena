import Product from "./Product";
import "./ProductHome.css";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getProducts } from "../../store/product";
const ProductHome = () => {
  const dispatch = useDispatch();
  const importProduct = useSelector((state) => state.getProducts);
  if(importProduct){
      console.log(importProduct)
  }
  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  return (
    <div className="homeScreen">
      <h2 className="homeTitle">All Products</h2>
      <div className="homeProducts">
        <Product />
        <Product />
        <Product />
        <Product />
        <Product />
      </div>
    </div>
  );
};
export default ProductHome;
