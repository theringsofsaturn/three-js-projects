export const REMOVE_FROM_CART = 'REMOVE_FROM_CART'
export const ADD_TO_CART = 'ADD_TO_CART'

// in this file we're going to export our actions
// what

// this is called an ACTION CREATOR
// a function that returns an action (a JS object)

export const addToCartAction = (bookToAdd) => ({
  type: ADD_TO_CART,
  payload: bookToAdd, // this is going to be the book we intend to add to the cart
  // the payload is any other piece of info required by the reducer to understand
  // what we want to do with this action
})

export const removeFromCartAction = (indexToRemove) => ({
  type: REMOVE_FROM_CART,
  payload: indexToRemove,
})
// the function returns an object, so you can dispatch it INSTEAD of dispatching the object
