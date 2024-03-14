import { combineReducers } from '@reduxjs/toolkit';

import { ingredientsReducer } from './ingredientsSlice';
import { constructorReducer } from './burgerConstructorSlice';
import { userReducer } from './userSlice';
import { orderReducer } from './newOrderSlice';

export const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  burgerConstructor: constructorReducer,
  userData: userReducer,
  newOrder: orderReducer
});
