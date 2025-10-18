import { configureStore } from '@reduxjs/toolkit'
import rootReducer from './redux/rootReducer' // The combined reducer for your application

const store = configureStore({
    // The 'reducer' field is where we pass the combined reducer for all features
    reducer: rootReducer,

    // middleware and devTools are configured automatically by default with RTK
    // For example, configureStore automatically sets up Redux Thunk and the Redux DevTools Extension.
})

// Infer the `RootState` and `AppDispatch` types from the store itself
// These are useful for strong typing in TypeScript, but good practice even in JavaScript
// export type RootState = ReturnType<typeof store.getState>
// export type AppDispatch = typeof store.dispatch

export default store