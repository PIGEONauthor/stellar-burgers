import { createSlice } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';
import { TConstructorIngredient } from '../../utils/types';

type TConstructorState = {
  constructorItems: {
    bun: TConstructorIngredient | null;
    ingredients: TConstructorIngredient[];
  };
};

const initialState: TConstructorState = {
  constructorItems: {
    bun: null,
    ingredients: []
  }
};

const burgerConstructorSlice = createSlice({
  name: 'burgerConstructor',
  initialState,
  reducers: {
    addConstructorItem: (state, action) => {
      const type = action.payload.type;

      if (type === 'bun') {
        state.constructorItems.bun = { ...action.payload, id: uuidv4() };
      } else if (type === 'main' || type === 'sauce') {
        state.constructorItems.ingredients.push({
          ...action.payload,
          id: uuidv4()
        });
      }
    },
    removeConstructorItem: (state, action) => {
      state.constructorItems.ingredients =
        state.constructorItems.ingredients.filter(
          (el) => el.id !== action.payload
        );
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
