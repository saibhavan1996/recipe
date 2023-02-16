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

class SearchFood extends Component {
  state = {
    similarProductsData: [],
    quantity: 1,
    searchInput: '',
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
      })
    }
  }

  onDecrementQuantity = () => {
    const {quantity} = this.state
    if (quantity > 1) {
      this.setState(prevState => ({quantity: prevState.quantity - 1}))
    }
  }

  onIncrementQuantity = () => {
    this.setState(prevState => ({quantity: prevState.quantity + 1}))
  }

  getUserSearched = e => {
    this.setState({searchInput: e.target.value})
  }

  render() {
    const {searchInput, similarProductsData} = this.state
    const foodList = similarProductsData.filter(each =>
      each.strCategory.toLowerCase().includes(searchInput.toLowerCase()),
    )

    return (
      <>
        <Header />
        <div className="product">
          <>
            <input
              type="search"
              className="search-bar"
              placeholder="search here"
              onChange={this.getUserSearched}
            />
          </>
          <ul className="product-details-success-view">
            {foodList.map(each => (
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

                    <button
                      type="button"
                      className="quantity-controller-button"
                    >
                      <BsPlusSquare className="quantity-controller-icon" />
                    </button>
                  </div>
                  <button type="button" className="button add-to-cart-btn">
                    ADD TO CART
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </>
    )
  }
}

export default SearchFood
