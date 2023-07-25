import axios from 'axios'
import { Point } from '../store/routes/routes'

const API_URL = 'https://router.project-osrm.org/route/v1/driving/'

export const fetchPolylines = async (points: Point[]): Promise<string> => {
    try {
        const coordinates = points.map((point) => `${point.lng},${point.lat}`).join(';')
        const response = await axios.get(`${API_URL}${coordinates}`)
        const route = response.data.routes[0]

        return route.geometry
    } catch (error) {
        throw new Error('Failed to fetch route polyline')
    }
}
