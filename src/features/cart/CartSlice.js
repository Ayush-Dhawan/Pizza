import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    cart: [

    ]
}

const CartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addItem(state, action){
            state.cart.push(action.payload)
        },
        deleteItem(state, action){
            state.cart = state.cart.filter(item => item.pizzaId !== action.payload)
        },
        increaseQuantity(state, action){
            const item = state.cart.find(item => item.pizzaId === action.payload)
            item.quantity++;
            item.totalPrice = item.quantity * item.unitPrice;
        },
        decreaseQuantity(state, action){
            const item = state.cart.find(item => item.pizzaId === action.payload)
            item.quantity--;
            item.totalPrice = Number(item.quantity * item.unitPrice);
            if(item.quantity == 0) CartSlice.caseReducers.deleteItem(state, action)
        },
        clearCart(state){
            state.cart = []
        }
    }
})

export const 
{addItem, deleteItem, 
    increaseQuantity, decreaseQuantity, clearCart} 
= CartSlice.actions

export const getTotalItems = (state) =>
  state.cart.cart.reduce((sum, item) => sum + item.quantity, 0);


  export const getTotalCartPrice = (state) =>
  state.cart.cart.reduce((sum, item) => sum + item.totalPrice, 0);

  export const getQuantityById = (id) => (state) =>
    state.cart.cart.find((item) => item.pizzaId === id)?.quantity ?? 0
  

export default CartSlice.reducer


