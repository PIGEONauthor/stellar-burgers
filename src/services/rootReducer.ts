import { combineReducers } from '@reduxjs/toolkit';

import { ingredientsReducer } from './ingredientsSlice';
import { constructorReducer } from './burgerConstructorSlice';

export const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  burgerConstructor: constructorReducer
});
