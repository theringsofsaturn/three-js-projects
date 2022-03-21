import { Component } from "react";
import { Col, Row } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { connect } from 'react-redux'
import { addToCartAction } from "../actions";
import Scene from "./Scene"

const mapStateToProps = (state) => ({
  // this is a dummy mapStateToProps, we're writing it just to be able to declare mapDispatchToProps
  // I'm not returning any key here because my component doesn't need to read anything from the state
})
// both these two are ALWAYS functions returning a single object
const mapDispatchToProps = (dispatch) => ({
  addToCart: function (bookToAdd) {
    dispatch(addToCartAction(bookToAdd))
  }
})

class BookDetail extends Component {
  state = {
    book: null,
  };

  componentDidUpdate(prevProps) {
    if (prevProps.bookSelected !== this.props.bookSelected) {
      this.setState({
        book: this.props.bookSelected,
      });
    }
  }

  render() {
    return (
      <div className="mt-3">
        {this.state.book ? (
          <>
            <Row>
              <Col sm={12}>
                <h1>{this.state.book.title}</h1>
              </Col>
            </Row>
            <Row className="mt-3">
              <Col sm={4}>
                <div className="mt-3">
                  <Scene/>
                </div>
              </Col>
              <Col sm={8}>
                <p>
                  <span className="font-weight-bold">Description:</span>
                  {this.state.book.description}
                </p>
                <p>
                  <span className="font-weight-bold">Price:</span>
                  {this.state.book.price}
                </p>
                <Button color="primary" onClick={() => this.props.addToCart(this.state.book)}>
                  ADD TO CART
                </Button>
              </Col>
            </Row>
          </>
        ) : (
          <Row>
            <Col sm={12}>
              <h3>Please select an object!</h3>
            </Col>
          </Row>
        )}
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BookDetail);

// in here I don't need to read anything from the state
// my goal is to add an element to the cart, so I need to INTERACT with the state
// so I'll need mapDispatchToProps
// because it's the 2nd argument though, I cannot ignore the mapStateToProps,
// I still have to write it for inserting mapDispatchToProps as the second one

// const stefano = {
//   age: 34,
//   greets: function() {
//     alert('hello')
//   }
// }

// stefano.greets()