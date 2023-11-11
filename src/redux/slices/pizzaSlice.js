import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchPizzas = createAsyncThunk(
  'pizzas/fetchPizzasStatus',
  async ({ order, sortBy, category, search, currentPage }, thunkApi) => {
    const res = await axios.get(
      `https://647bc928c0bae2880ad03fe8.mockapi.io/adverts?product=pizza${category}&sortBy=${sortBy}&order=${order}${search}&page=${currentPage}&limit=4`
    );
    // thunkApi - дает методы текущего стора
    return res.data;
  }
);

const initialState = {
  items: [],
  status: 'loading',
};

export const pizzaSlice = createSlice({
  name: 'pizza',
  initialState,
  reducers: {
    setItems(state, action) {
      state.items = action.payload;
    },
  },
  extraReducers: {
    [fetchPizzas.pending]: state => {
      state.items = [];
      state.status = 'loading';
    },
    [fetchPizzas.rejected]: (state, action) => {
      state.items = [];
      state.status = 'error';
    },
    [fetchPizzas.fulfilled]: (state, action) => {
      state.items = action.payload;
      state.status = 'success';
    },
  },
});

export const selectPizzaData = state => state.pizza;

export const { setItems } = pizzaSlice.actions;

export default pizzaSlice.reducer;
