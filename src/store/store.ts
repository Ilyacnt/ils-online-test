import createSagaMiddleware from '@redux-saga/core'
import { configureStore } from '@reduxjs/toolkit'
import { polylinesSaga } from './routes/routesSaga'
import { routesReducer } from './routes/routesSlice'

const sagaMiddlware = createSagaMiddleware()

export const store = configureStore({
    reducer: {
        routes: routesReducer,
    },
    middleware: [sagaMiddlware],
})

sagaMiddlware.run(polylinesSaga)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
