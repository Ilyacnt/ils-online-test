export interface Route {
    id: string
    name: string
    points: Point[]
}

export interface Point {
    lat: number
    lng: number
}
