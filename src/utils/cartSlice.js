import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        items: [],
        cartIds: [],
        wishlist: [],
        wishlistIds: []
    },
    reducers: {
        addItems: (state, action) => {
            state.items.push(action.payload);
            state.cartIds.push(action.payload);
            // console.log(Array.from(state.items))
            console.log(action.payload);
        },
        removeItem: (state, action) => {
            let index = state.items.findIndex(obj => obj["id"] === action.payload);
            state.items.splice(index, 1);
            state.cartIds.splice(index, 1);
        },
        clearCart: (state) => {
            state.items.length = 0;
        },
        addToWishlist: (state, action) => {
            state.wishlist.push(action.payload);
            state.wishlistIds.push(action.payload.id);
            console.log(Array.from(state.wishlist));
        }
    }
});

export const { addItems, removeItem, clearCart, addToWishlist} = cartSlice.actions;

export default cartSlice.reducer;