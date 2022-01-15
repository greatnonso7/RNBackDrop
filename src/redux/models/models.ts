import { Models } from '@rematch/core';
import { Cat } from './Cat';

export interface RootModel extends Models<RootModel> {
  Cat: typeof Cat;
}

export const models: RootModel = { Cat };
