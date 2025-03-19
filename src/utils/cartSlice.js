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
            const existingItemIndex = state.items.findIndex(
                item => item.id === action.payload.id
            );

            if (existingItemIndex >= 0) {
                // Item exists, increment quantity
                state.items[existingItemIndex].quantity += 1;
            } else {
                // Add new item with quantity 1
                state.items.push({ ...action.payload, quantity: 1 });
                state.cartIds.push(action.payload.id);
            }
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
            // console.log(Array.from(state.wishlist));
        }
    }
});

export const { addItems, removeItem, clearCart, addToWishlist} = cartSlice.actions;

export default cartSlice.reducer;