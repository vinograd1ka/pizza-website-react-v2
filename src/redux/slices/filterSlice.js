import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    categoryId: 0,
    sortType: {
        name: 'popularity',
        sortProperty: 'rating'
    }
}

    export const filterSlice = createSlice({
    name: 'filters',
    initialState,
    reducers: {
        setCategoryId (state, action) {
            state.categoryId = action.payload;
        },
        setSortType (state, action) {
            state.sortType = action.payload;
        },
        setFilters (state, action) {
            state.sort = action.payload.sort;
            state.currentPage = Number(action.payload.currentPage)
            state.categoryId = Number(action.payload.categoryId)
        }
    },
})

export const { setCategoryId, setSortType, setFilters } = filterSlice.actions;

export default filterSlice.reducer;