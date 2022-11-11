import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';

export default (reducers) => {
  const persistedReducer = persistReducer(
    {
      key: 'wirelink',
      storage,
      // whitelist: [],
      whitelist: ['auth', 'user'],
    },
    reducers,
  );
  return persistedReducer;
};
