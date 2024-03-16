import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TIngredient } from '../../utils/types';
import { getIngredientsApi } from '@api';

export const getIngredients = createAsyncThunk(
  'ingredients/getAll',
  async () => {
    const response = await getIngredientsApi();
    return response;
  }
);

type TIngredientsState = {
  ingredients: TIngredient[];
  buns: TIngredient[];
  mains: TIngredient[];
  sauces: TIngredient[];
  loading: boolean;
  error: string | null;
};

const initialState: TIngredientsState = {
  ingredients: [],
  buns: [],
  mains: [],
  sauces: [],
  loading: true,
  error: null
};

const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {},
  selectors: {
    getIngredientsSelector: (state) => state
  },
  extraReducers: (builder) => {
    builder
      .addCase(getIngredients.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getIngredients.rejected, (state, action) => {
        state.loading = false;
        if (action.error.message) {
          state.error = action.error.message;
        } else {
          state.error = null;
        }
      })
      .addCase(getIngredients.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload) {
          state.ingredients = action.payload;
          state.buns = action.payload.filter((ing) => ing.type === 'bun');
          state.mains = action.payload.filter((ing) => ing.type === 'main');
          state.sauces = action.payload.filter((ing) => ing.type === 'sauce');
        }
      });
  }
});

export const ingredientsReducer = ingredientsSlice.reducer;
export const { getIngredientsSelector } = ingredientsSlice.selectors;
