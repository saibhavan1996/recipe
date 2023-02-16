import {BsPlusSquare, BsDashSquare} from 'react-icons/bs'
import {AiFillCloseCircle} from 'react-icons/ai'

import CartContext from '../../context/CartContext'

import './index.css'

const CartItem = props => (
  <CartContext.Consumer>
    {value => {
      const {deleteCartItem} = value
      const {cartItemDetails} = props
      const {idCategory, strCategory, strCategoryThumb} = cartItemDetails
      const onDeleteCartItem = () => {
        deleteCartItem(idCategory)
      }
      return (
        <li className="cart-item">
          <img
            className="cart-product-image"
            src={strCategoryThumb}
            alt={strCategory}
          />
          <div className="cart-item-details-container">
            <div className="cart-product-title-brand-container">
              <p className="cart-product-title">{strCategory}</p>
            </div>
            <div className="cart-quantity-container">
              <button type="button" className="quantity-controller-button">
                <BsDashSquare color="#52606D" size={12} />
              </button>
              <button type="button" className="quantity-controller-button">
                <BsPlusSquare color="#52606D" size={12} />
              </button>
            </div>
            <div className="total-price-delete-container">
              <p className="cart-total-price">Rs 200/-</p>
              <button
                className="remove-button"
                type="button"
                onClick={onDeleteCartItem}
              >
                Remove
              </button>
            </div>
          </div>
          <button
            className="delete-button"
            type="button"
            onClick={onDeleteCartItem}
          >
            <AiFillCloseCircle color="#616E7C" size={20} />
          </button>
        </li>
      )
    }}
  </CartContext.Consumer>
)

export default CartItem
