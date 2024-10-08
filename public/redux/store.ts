import { configureStore } from '@reduxjs/toolkit';
import { todoApi } from './services/todoService';
import { GraphqlApi } from './services/graphqlService';

export const store = configureStore({
  reducer: {
    [todoApi.reducerPath]: todoApi.reducer,
    [GraphqlApi.reducerPath]: GraphqlApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(todoApi.middleware),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
