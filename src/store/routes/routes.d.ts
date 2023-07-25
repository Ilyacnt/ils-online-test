export interface Route {
    id: string
    name: string
    points: Point[]
    polylineEncodedData: string | null
}

export interface Point {
    lat: number
    lng: number
}
