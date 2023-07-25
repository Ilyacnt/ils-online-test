import styles from './Map.module.css'
import 'leaflet/dist/leaflet.css'
import L, { LatLngTuple } from 'leaflet'
import { useTypedSelector } from '../../../store/hooks'
import { useCallback, useEffect, useRef } from 'react'
import { Route } from '../../../store/routes/routes'
import MarkerPinIconUrl from '../../assets/marker-pin-icon.png'

const MarkerPinIcon = L.icon({
    iconUrl: MarkerPinIconUrl,
    iconSize: [58, 87],
    iconAnchor: [22, 94],
    popupAnchor: [-3, -76],
})

const Map = (): JSX.Element => {
    const { currentRouteId, routes } = useTypedSelector((state) => state.routes)
    const initialMapCenter: LatLngTuple = [59.93567701, 30.38064206]
    const mapContainerRef = useRef<HTMLDivElement>(null)
    const mapRef = useRef<L.Map | null>(null)
    const markersLayerRef = useRef<L.LayerGroup | null>(null)

    const getCurrentRoute = useCallback((): Route => {
        return routes.filter((route) => route.id === currentRouteId)[0]
    }, [currentRouteId, routes])

    useEffect(() => {
        mapRef.current = L.map(mapContainerRef.current as HTMLDivElement).setView(
            initialMapCenter,
            12
        )
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(mapRef.current)

        markersLayerRef.current = L.layerGroup()

        // Отображаем маршрут и его полилинию на карте, если она есть
        // if (selectedRoutePolyline) {
        //     const decodedPolyline = L.Polyline.fromEncoded(selectedRoutePolyline)
        //     decodedPolyline.addTo(map)
        //     map.fitBounds(decodedPolyline.getBounds())
        // }

        return () => {
            mapRef.current && mapRef.current.remove()
        }
    }, [])

    useEffect(() => {
        let currentRoute = getCurrentRoute()
        if (currentRoute && mapRef.current && markersLayerRef.current) {
            const bounds = L.latLngBounds(
                currentRoute.points.map((point) => [point.lat, point.lng])
            )

            mapRef.current.fitBounds(bounds)

            markersLayerRef.current.clearLayers()

            currentRoute.points.forEach((point) => {
                let markerPin = L.marker([point.lat, point.lng], { icon: MarkerPinIcon })
                markersLayerRef.current?.addLayer(markerPin)
            })

            markersLayerRef.current.addTo(mapRef.current)
        }
    }, [currentRouteId, getCurrentRoute])

    return <div className={styles.Map} ref={mapContainerRef}></div>
}

export default Map
