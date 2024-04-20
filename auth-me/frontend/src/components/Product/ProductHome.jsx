import Product from "./Product"
import './ProductHome.css'
const ProductHome = () => {
    return (
        <div className="homeScreen">
            <h2 className="homeTitle">All Products</h2>
            <div className="homeProducts">
                <Product/>
                <Product/>
                <Product/>
                <Product/>
                <Product/>
                
            </div>
        </div>
    )
}
export default ProductHome
