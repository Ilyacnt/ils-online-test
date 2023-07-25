import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import uniqid from 'uniqid'
import { Route } from './routes'

export interface RoutesState {
    currentRoute: string | null
    routes: Route[]
}

const initialState: RoutesState = {
    currentRoute: null,
    routes: [
        {
            id: uniqid(),
            name: 'Маршрут №1',
            points: [
                {
                    lat: 59.84660399,
                    lng: 30.29496392,
                },
                {
                    lat: 59.82934196,
                    lng: 30.42423701,
                },
                {
                    lat: 59.83567701,
                    lng: 30.38064206,
                },
            ],
        },
        {
            id: uniqid(),
            name: 'Маршрут №2',
            points: [
                {
                    lat: 59.82934196,
                    lng: 30.42423701,
                },
                {
                    lat: 59.82761295,
                    lng: 30.41705607,
                },
                {
                    lat: 59.84660399,
                    lng: 30.29496392,
                },
            ],
        },
        {
            id: uniqid(),
            name: 'Маршрут №3',
            points: [
                {
                    lat: 59.83567701,
                    lng: 30.38064206,
                },
                {
                    lat: 59.84660399,
                    lng: 30.29496392,
                },
                {
                    lat: 59.82761295,
                    lng: 30.41705607,
                },
            ],
        },
    ],
}

export const routesSlice = createSlice({
    name: 'routes',
    initialState,
    reducers: {
        removeRoute: (state, action: PayloadAction<string>) => {
            state.routes = state.routes.filter((route) => route.id !== action.payload)
        },
        setCurrentRoute: (state, action: PayloadAction<string>) => {
            state.currentRoute = action.payload
        },
    },
})

export const { removeRoute, setCurrentRoute } = routesSlice.actions
export const routesReducer = routesSlice.reducer
