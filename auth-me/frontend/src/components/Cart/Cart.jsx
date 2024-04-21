import './Cart.css'
import { Link } from 'react-router-dom'
const Cart = () => {

    return(
        <div className="cartItem">
        <div className='cartImage'>
            <img src="https://i.postimg.cc/0jhxJtbQ/Levi-Blue.png" alt="name"/>
        </div>
        <Link to={`/product/${123}`} className='cartName'>
        <p>product 1</p>
        </Link>
        <p className='cartPrice'>$7</p>
        <select className='cartSelect'>
        <option value="1">1</option>
        </select>
        <button className="cartDelete">
            <i className='fas fa-trash'></i>
        </button>
        </div>
    )
}


export default Cart
