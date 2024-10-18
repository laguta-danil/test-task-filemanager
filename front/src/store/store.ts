// import { configureStore } from '@reduxjs/toolkit'
// import authReducer from './authSlice'

// const store = configureStore({
//   reducer: {
//     auth: authReducer
//   }
// })
// export default store

import { configureStore } from '@reduxjs/toolkit'
import { authApi } from './auth'
import { api } from './apiSettings'


export const store = configureStore({
    reducer: {
        [authApi.reducerPath]: authApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware()
            .concat(api.middleware),
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
