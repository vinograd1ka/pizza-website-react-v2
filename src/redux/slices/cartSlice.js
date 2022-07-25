import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    items: [],
    totalPrice: 0,
    totalCount: 0,
}

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addItem (state, action) {
            const findItem = state.items.find(obj => obj.title === action.payload.title && obj.selectedSize === action.payload.selectedSize)

            if (findItem) findItem.count++;

            else {
                state.items.push({
                    ...action.payload,
                    count: action.payload.count || 1
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

            state.totalCount = state.items.reduce((acc, item) => acc + item.count, 0)
            state.totalPrice = state.items.reduce((acc, obj) => (obj.price * obj.count) + acc ,0)
        },

        minusItem (state, action) {
            const findItem = state.items.find(obj => obj.id === action.payload.id)
            if (findItem) findItem.count--;

            state.totalCount = state.items.reduce((acc, item) => acc + item.count, 0)
            state.totalPrice = state.items.reduce((acc, obj) => (obj.price * obj.count) + acc ,0)
        },

        changeItemSize (state, action) {
            const findSameItem = state.items.find(obj => obj.title === action.payload.title && obj.selectedSize === action.payload.selectedSize)

            if (findSameItem) {
                findSameItem.count += action.payload.count;

                state.items = state.items.filter(obj => action.payload.id !== obj.id)
                state.totalPrice = state.items.reduce((acc, obj) => action.payload.price * obj.count + acc ,0)
            }

            else {
                const findItem = state.items.find(obj => obj.id === action.payload.id)
                findItem.id = action.payload.id + [0, 1, 2][action.payload.selectedSize] ?? null;

                findItem.price = action.payload.price;
                findItem.selectedSize = action.payload.selectedSize;
                state.totalPrice = state.items.reduce((acc, obj) => obj.price * obj.count + acc ,0)
            }

        },

        changeItemType (state, action) {
            const findItem = state.items.find(obj => obj.id === action.payload.id)
            state.items.push({
                ...action.payload,
            })
            findItem.selectedType = action.payload.selectedSize;
        }
    },
})

export const { addItem, removeItem, clearItems, plusItem, minusItem, changeItemSize, changeItemType } = cartSlice.actions;

export default cartSlice.reducer;

// const findSameItem = state.items.find(obj => obj.title === action.payload.title && obj.size === action.payload.size && obj.type === action.payload.type)
//
// if (findSameItem) {
//     const newCount = findItem ? findItem.count : 0;
//     state.items = state.items.filter(obj => action.payload.title !== obj.title)
//
//     findItem && state.items.push({...action.payload, count: newCount + 1})
// }