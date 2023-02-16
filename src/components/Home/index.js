import {Component} from 'react'
import Loader from 'react-loader-spinner'
import {BsPlusSquare, BsDashSquare} from 'react-icons/bs'

import Header from '../Header'
import CartContext from '../../context/CartContext'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Home extends Component {
  state = {
    similarProductsData: [],
    apiStatus: apiStatusConstants.initial,
    quantity: 1,
  }

  componentDidMount() {
    this.getProductData()
  }

  getFormattedData = data => ({
    idCategory: data.category,
    strCategory: data.strCategory,
    strCategoryDescription: data.strCategoryDescription,
    strCategoryThumb: data.strCategoryThumb,
  })

  getProductData = async () => {
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })
    const apiUrl = `https://www.themealdb.com/api/json/v1/1/categories.php`
    const options = {
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)

    if (response.ok) {
      const fetchedData = await response.json()
      const updatedSimilarProductsData = fetchedData.categories.map(
        eachSimilarProduct => this.getFormattedData(eachSimilarProduct),
      )
      this.setState({
        similarProductsData: updatedSimilarProductsData,
        apiStatus: apiStatusConstants.success,
      })
    }
    if (response.status === 404) {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  renderLoadingView = () => (
    <div className="products-details-loader-container">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  renderFailureView = () => (
    <div className="product-details-error-view-container">
      <img
        alt="error view"
        src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-error-view-img.png"
        className="error-view-image"
      />
      <h1 className="product-not-found-heading">Product Not Found</h1>
      <button type="button" className="button">
        Continue Shopping
      </button>
    </div>
  )

  onDecrementQuantity = () => {
    const {quantity} = this.state
    if (quantity > 1) {
      this.setState(prevState => ({quantity: prevState.quantity - 1}))
    }
  }

  onIncrementQuantity = () => {
    this.setState(prevState => ({quantity: prevState.quantity + 1}))
  }

  renderProductDetailsView = () => (
    <CartContext.Consumer>
      {value => {
        const {similarProductsData, quantity} = this.state
        const {
          idCategory,
          strCategory,
          strCategoryDescription,
          strCategoryThumb,
        } = similarProductsData
        const {addCartItem} = value
        const onClickAddToCart = () => {
          addCartItem({...similarProductsData, quantity})
        }

        return (
          <>
            {similarProductsData.map(each => (
              <ul className="product-details-success-view">
                <li className="product-details-container">
                  <img
                    src={each.strCategoryThumb}
                    alt="product"
                    className="product-image"
                  />
                  <div className="product">
                    <h1 className="product-name">{each.strCategory}</h1>
                    <p className="price-details">Rs 200/-</p>
                    <div className="rating-and-reviews-count">
                      <div className="rating-container">
                        <img
                          src="https://assets.ccbp.in/frontend/react-js/star-img.png"
                          alt="star"
                          className="star"
                        />
                      </div>
                    </div>
                    <p className="product-description">
                      {each.strCategoryDescription}
                    </p>
                    <div className="quantity-container">
                      <button
                        type="button"
                        className="quantity-controller-button"
                        onClick={this.onDecrementQuantity}
                      >
                        <BsDashSquare className="quantity-controller-icon" />
                      </button>
                      <p className="quantity">{quantity}</p>
                      <button
                        type="button"
                        className="quantity-controller-button"
                        onClick={this.onIncrementQuantity}
                      >
                        <BsPlusSquare className="quantity-controller-icon" />
                      </button>
                    </div>
                    <button
                      type="button"
                      className="button add-to-cart-btn"
                      onClick={onClickAddToCart}
                    >
                      ADD TO CART
                    </button>
                  </div>
                </li>
              </ul>
            ))}
          </>
        )
      }}
    </CartContext.Consumer>
  )

  renderProductDetails = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderProductDetailsView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header />
        <div className="product-item-details-container">
          {this.renderProductDetails()}
        </div>
      </>
    )
  }
}

export default Home
