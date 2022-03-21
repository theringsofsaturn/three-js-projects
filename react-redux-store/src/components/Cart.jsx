import Button from "react-bootstrap/Button";
import { FaTrash } from "react-icons/fa";
import { Col, Row } from "react-bootstrap";
import { connect } from 'react-redux'
import { removeFromCartAction } from "../actions";
import Scene from "./Scene"

// const mapStateToProps = state => state
const mapStateToProps = state => ({
  cart: state.cart.content
})

const mapDispatchToProps = dispatch => ({
  removeFromCart: (indexToRemove) => {
    dispatch(removeFromCartAction(indexToRemove))
  }
})

const Cart = ({ cart, removeFromCart }) => (
  <Row>
    <Col sm={12}>
      <ul style={{ listStyle: "none" }}>
        {cart.map((book, i) => (
          <li key={i} className="my-4">
            <Button variant="danger" onClick={() => removeFromCart(i)}>
              <FaTrash />
            </Button>
            <Scene />
            {book.title}
          </li>
        ))}
      </ul>
    </Col>
    <Row>
      <Col sm={12} className="font-weight-bold">
        TOTAL:{" "}
        {cart.reduce(
          (acc, currentValue) => acc + parseFloat(currentValue.price),
          0
        )}
      </Col>
    </Row>
  </Row>
);

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
