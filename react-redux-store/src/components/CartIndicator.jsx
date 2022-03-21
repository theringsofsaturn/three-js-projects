import Button from "react-bootstrap/Button";
import { FaShoppingCart } from "react-icons/fa";
import { useNavigate } from 'react-router-dom'
import { connect } from 'react-redux'

// const mapStateToProps = (state) => state
// in this way we're giving to our component EVERY key of the redux store as a prop
// we just have cart so far, and the length of the products array can be found in
// cart.products.length

const mapStateToProps = (state) => ({
  cartLength: state.cart.content.length
})

const CartIndicator = ({ cartLength }) => {
  const navigate = useNavigate()

  return (
    <div className="ml-auto mt-2">
      <Button color="primary" onClick={() => navigate("/cart")}>
        <FaShoppingCart />
        <span className="ml-2">{cartLength}</span>
      </Button>
    </div>
  )
}

export default connect(mapStateToProps)(CartIndicator)
// this is called a HOC (higher order component)

// connect can take up to 2 arguments:
// 1) mapStateToProps (for reading from the state)
// 2) mapDispatchToProps (for interacting with the state) <- not needed here