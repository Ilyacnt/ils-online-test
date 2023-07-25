import { configureStore } from '@reduxjs/toolkit'
import { routesReducer } from './routes/routesSlice'

export const store = configureStore({
    reducer: {
        routes: routesReducer,
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
