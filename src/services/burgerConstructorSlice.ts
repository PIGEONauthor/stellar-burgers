import { createSlice } from '@reduxjs/toolkit';
import { TConstructorIngredient } from '../utils/types';
import { TOrder } from '../utils/types';

type TConstructorState = {
  constructorItems: {
    bun: TConstructorIngredient | null;
    ingredients: TConstructorIngredient[];
  };
  orderRequest: boolean;
  orderModalData: TOrder | null;
};

const initialState: TConstructorState = {
  constructorItems: {
    bun: null,
    ingredients: []
  },
  orderRequest: false,
  orderModalData: null
};

const burgerConstructorSlice = createSlice({
  name: 'BurgerConstructor',
  initialState,
  reducers: {
    addConstructorItem: (state, action) => {
      const type = action.payload.type;
      if (type === 'bun') {
        state.constructorItems.bun = action.payload;
      } else if (type === 'main' || type === 'sauce') {
        state.constructorItems.ingredients.push(action.payload);
      }
    },
    removeConstructorItem: (state, action) => {
      const id = action.payload;

      state.constructorItems.ingredients =
        state.constructorItems.ingredients.filter((el) => el._id !== id);
    }
  },
  selectors: {
    getConstructorSelector: (state) => state
  }
});

export const constructorReducer = burgerConstructorSlice.reducer;
export const { getConstructorSelector } = burgerConstructorSlice.selectors;
export const { addConstructorItem, removeConstructorItem } =
  burgerConstructorSlice.actions;
