import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice"
import userReducer from "./userSlice"
import facultyReducer from "./facultySlice"
import {thunk} from "redux-thunk";
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const persistConfig = {
    key: 'root',
    version: 1,
    storage,
}

const rootReducer = combineReducers({
    auth: authReducer,
    user: userReducer,
    faculty: facultyReducer,
})
const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }).concat(thunk),
})

export let persistor = persistStore(store)