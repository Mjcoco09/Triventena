import './CartDetails.css'
import Cart from './Cart'
const CartDetails = () => {

    return(
        <div className= "cartDetails">
            <div className="cartL">
            <h2>Cart</h2>
            <Cart/>
            <Cart/>
            <Cart/>
            <Cart/>
            </div>
            <div className="cartR">
                <div className ="cartInfo">
                <p>Totlal (0) Items</p>
                <p>$7</p>
                </div>
                <div>
                    <button>Checkout</button>
                </div>
            </div>
        </div>

    )
}


export default CartDetails
