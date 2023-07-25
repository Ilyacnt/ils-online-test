import { Route } from '../store/routes/routes'
import { store } from '../store/store'

export const getCurrentRouteIndex = (currentRouteId: string): number => {
    const { routes } = store.getState().routes
    return routes.findIndex((route: Route) => route.id === currentRouteId)
}
