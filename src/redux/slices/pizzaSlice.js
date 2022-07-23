import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from "axios";

export const fetchPizzas = createAsyncThunk(
    'pizza/fetchPizzaStatus', async (params) => {
        const { currentPage, categoryId, sortType } = params;
        const { data } = await axios.get(`https://628cfdca3df57e983eda02d0.mockapi.io/items?page=${currentPage}&limit=3&${categoryId > 0 ? `category=${categoryId}` : ''}&sortBy=${sortType.sortProperty}&order=${sortType.order}`)
        return data;
    }
)

const initialState = {
    items: [],
    selectedItemSize: [],
    status: 'loading' //loading | success | error
}

export const pizzaSlice = createSlice({
    name: 'pizza',
    initialState,
    reducers: {
        setItems (state, action) {
            state.items = action.payload.map(apiItem => state.selectedItemSize.find(item => item.id === apiItem.id) ?? apiItem)
        },

        changeSizeItem (state, action) {
            const findItem = state.items.find(obj => obj.id === action.payload.id)
            findItem.selectedSize = action.payload.selectedSize;
        }
    },
    extraReducers: {
            [fetchPizzas.pending]: (state) => {
                console.log('Идёт отправкав')
                state.items = []
                state.status = 'loading';
            },
            [fetchPizzas.fulfilled]: (state, action) => {
                console.log(state, 'Отправка произошла успешно')
                state.items = action.payload;
                state.status = 'success';
            },
            [fetchPizzas.rejected]: (state) => {
                console.log('Произошла ошибка')
                state.items = []
                state.status = 'error';
            }
        }

})

export const { setItems, changeSizeItem } = pizzaSlice.actions;

export default pizzaSlice.reducer;