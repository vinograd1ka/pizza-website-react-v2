import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    items: [],
    totalPrice: 0,
    totalCount: 0
}

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addItem (state, action) {
            const findItem = state.items.find(obj => obj.id === action.payload.id)

            if (findItem) findItem.count++;

            else {
                state.items.push({
                    ...action.payload,
                    count: 1
                })
            }

            state.totalCount = state.items.reduce((acc, item) => acc + item.count, 0)
            state.totalPrice = state.items.reduce((acc, obj) => (obj.price * obj.count) + acc ,0)
        },

        removeItem (state, action) {
            state.items = state.items.filter(obj => obj.id !== action.payload.id)
            state.totalCount = state.items.reduce((acc, item) => acc + item.count, 0)
            state.totalPrice = state.items.reduce((acc, obj) => (obj.price * obj.count) + acc ,0)
        },

        clearItems (state) {
            state.items = []
            state.totalPrice = 0;
            state.totalCount = 0;
        },

        plusItem (state, action) {
            const findItem = state.items.find(obj => obj.id === action.payload.id)
            if (findItem) findItem.count++

            state.totalCount = state.items.reduce((acc, item) => acc + item.count, 0);
            state.totalPrice = state.items.reduce((acc, obj) => (obj.price * obj.count) + acc ,0)
        },

        minusItem (state, action) {
            const findItem = state.items.find(obj => obj.id === action.payload.id)
            if (findItem) {
                findItem.count--
            }

            state.totalCount = state.items.reduce((acc, item) => acc + item.count, 0);
            state.totalPrice = state.items.reduce((acc, obj) => (obj.price * obj.count) + acc ,0)
        }
    },
})

export const { addItem, removeItem, clearItems, plusItem, minusItem } = cartSlice.actions;

export default cartSlice.reducer;