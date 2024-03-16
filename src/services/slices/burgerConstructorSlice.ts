import { createSlice } from '@reduxjs/toolkit';
import { TConstructorIngredient } from '../../utils/types';
import { act } from 'react-dom/test-utils';
// import { TOrder } from '../utils/types';

type TConstructorState = {
  constructorItems: {
    bun: TConstructorIngredient | null;
    ingredients: TConstructorIngredient[];
  };
  dataToOrder: string[];
  // orderRequest: boolean;
  // orderModalData: TOrder | null;
};

const initialState: TConstructorState = {
  constructorItems: {
    bun: null,
    ingredients: []
  },
  dataToOrder: []
  // orderRequest: false,
  // orderModalData: null
};

const burgerConstructorSlice = createSlice({
  name: 'burgerConstructor',
  initialState,
  reducers: {
    addConstructorItem: (state, action) => {
      const type = action.payload.type;

      state.dataToOrder.push(action.payload._id);

      if (type === 'bun') {
        state.constructorItems.bun = action.payload;
      } else if (type === 'main' || type === 'sauce') {
        state.constructorItems.ingredients.push(action.payload);
      }
    },
    removeConstructorItem: (state, action) => {
      const id = action.payload;

      state.dataToOrder.filter((el) => el !== id);

      state.constructorItems.ingredients =
        state.constructorItems.ingredients.filter((el) => el._id !== id);
    },
    clearConstructor: (state) => (state = initialState)
  },
  selectors: {
    getConstructorSelector: (state) => state
  }
});

export const constructorReducer = burgerConstructorSlice.reducer;
export const { getConstructorSelector } = burgerConstructorSlice.selectors;
export const { addConstructorItem, removeConstructorItem, clearConstructor } =
  burgerConstructorSlice.actions;
