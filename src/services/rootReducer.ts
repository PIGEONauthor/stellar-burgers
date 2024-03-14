import { combineReducers } from '@reduxjs/toolkit';

import { ingredientsReducer } from './ingredientsSlice';
import { constructorReducer } from './burgerConstructorSlice';
import { userReducer } from './userSlice';

export const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  burgerConstructor: constructorReducer,
  userData: userReducer
});
