import { ADD_TO_CART, REMOVE_FROM_CART } from '../actions'
import { initialState } from '../store'

// the reducer's job is ALWAYS to return a valid state for the application
// the SHAPE of the state you're supposed to return from every case is the SAME
// as the initialValue you're providing to it

// a PURE FUNCTION never mutates its arguments

const mainReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      return {
        ...state,
        cart: {
          ...state.cart,
          // SUPER WRONG --> state.cart.content.push(action.payload) // action.payload
          // THIS WORKS: content: state.cart.content.concat(action.payload),
          content: [...state.cart.content, action.payload], // <- just my preference
        },
      }
    case REMOVE_FROM_CART:
      return {
        ...state,
        cart: {
          ...state.cart,
          content: state.cart.content.filter((el, i) => i !== action.payload), // <- it works!
          //   content: [...state.cart.content.slice(0, action.payload), ...state.cart.content.slice(action.payload + 1)],
          // this also works, slightly more complex... :)
        },
      }
    default:
      return state
  }
}

export default mainReducer
