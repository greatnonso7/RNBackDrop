import { createModel } from '@rematch/core';
import type { RootModel } from './models';
import { reducerActions as reducers } from './reducers';
import CatApi from '../../services/apis/CatApi';

const IsState = {
  cats: [],
};
export const Cat = createModel<RootModel>()({
  name: 'Cat',
  state: IsState,
  reducers: reducers,
  effects: dispatch => ({
    async getAllCat(payload: number, _state) {
      dispatch.Car.setError(false);

      try {
        const api = await CatApi.getCats(payload);
        if (api) {
          console.log(api);
        }
      } catch (error) {
        dispatch.Cat.handleError(error);
      }
    },
  }),
});
