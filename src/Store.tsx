import React, { createContext, useReducer } from 'react';
import { reducer } from './reducers/index';
import { IState } from './interfaces';

const initialState: IState = {
  episodes: [],
  favourites: [],
};

export const Store = createContext<IState | any>(initialState);

export function StoreProvider({
  children,
}: JSX.ElementChildrenAttribute): JSX.Element {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <Store.Provider value={{ state, dispatch }}>{children}</Store.Provider>
  );
}
