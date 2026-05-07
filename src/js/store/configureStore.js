import prodStore from './configureStore.prod';
import devStore from './configureStore.dev';

export const configureStore = import.meta.env.PROD ? prodStore : devStore;
