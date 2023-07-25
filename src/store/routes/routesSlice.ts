import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import uniqid from 'uniqid'
import { Point, Route } from './routes'

export interface RoutesState {
    currentRouteId: string | null
    routes: Route[]
    isLoading: boolean
    isError: boolean
}

const initialState: RoutesState = {
    currentRouteId: null,
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
            polylineEncodedData: null,
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
            polylineEncodedData: null,
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
            polylineEncodedData: null,
        },
    ],
    isLoading: false,
    isError: false,
}

export const routesSlice = createSlice({
    name: 'routes',
    initialState,
    reducers: {
        removeRoute: (state, action: PayloadAction<string>) => {
            state.routes = state.routes.filter((route) => route.id !== action.payload)
        },
        setCurrentRoute: (state, action: PayloadAction<string>) => {
            state.currentRouteId = action.payload
        },
        fetchPolylineDataStart: (state, action: PayloadAction<{ id: string; points: Point[] }>) => {
            state.isLoading = true
            state.isError = false
        },
        fetchPolylineDataSuccess: (
            state,
            action: PayloadAction<{ id: string; polyline: string }>
        ) => {
            state.routes = state.routes.map((route) =>
                route.id === action.payload.id
                    ? { ...route, polylineEncodedData: action.payload.polyline }
                    : route
            )
            state.isLoading = false
        },
        fetchPolylineDataError: (state) => {
            state.isLoading = false
            state.isError = true
        },
    },
})

export const {
    removeRoute,
    setCurrentRoute,
    fetchPolylineDataStart,
    fetchPolylineDataSuccess,
    fetchPolylineDataError,
} = routesSlice.actions
export const routesReducer = routesSlice.reducer
