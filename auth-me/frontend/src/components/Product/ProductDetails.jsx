import './ProductDetails.css'
const ProductDetails = () => {

  return (
  <div className="productDetail" >
        <div className="left">
            <div className="imageL">
                <img src="https://i.postimg.cc/0jhxJtbQ/Levi-Blue.png" alt="product"/>
            </div>
            <dev className = "infoL">
                <p className="nameL">Sticker</p>
                <p className="priceL">Price:$7 </p>
                <p className="descL">a sticker that sticks </p>
            </dev>
        </div>

        <div className="right">
            <div className="infoR">
                <p>
                Price: <span>$7</span>
                </p>
                <p>
                status: <span>IN STOCK </span>
                </p>
                <p>
                 Quantity
                 <select >
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                     </select>
                </p>
                <p>
                    <button type="button"> Add to cart</button>
                </p>

            </div>
        </div>
  </div>
)}

export default ProductDetails
