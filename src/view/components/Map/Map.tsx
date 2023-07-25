// @ts-nocheck
import styles from './Map.module.css'
import 'leaflet/dist/leaflet.css'
import L, { LatLngTuple } from 'leaflet'
// @ts-ignore
import polylineEncoded from 'polyline-encoded'
import { useTypedSelector } from '../../../store/hooks'
import { useCallback, useEffect, useRef } from 'react'
import { Route } from '../../../store/routes/routes'
import MarkerPinIconUrl from '../../assets/marker-pin-icon.png'
import { fetchPolylines } from '../../../http-service/fetchPolylines'

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
    const polylineRef = useRef<L.Polyline | null>(null)

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
        return () => {
            mapRef.current && mapRef.current.remove()
        }
    }, [])

    useEffect(() => {
        let currentRoute = getCurrentRoute()
        if (currentRoute && mapRef.current && markersLayerRef.current) {
            let decodedPolyline = ''
            // REPLACE WITH SAGA

            new Promise((resolve) => {
                const data = fetchPolylines(currentRoute.points)
                resolve(data)
            }).then((data) => {
                decodedPolyline = polylineEncoded.decode(data)
                if (polylineRef.current && mapRef.current && mapRef.current) {
                    mapRef.current.removeLayer(polylineRef.current)
                }
                // @ts-ignore
                polylineRef.current = new L.polyline(decodedPolyline as LatLngTuple[], {
                    color: '#3B8AFF',
                    weight: 4,
                })

                polylineRef.current && polylineRef.current.addTo(mapRef.current)

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
            })
        }
    }, [currentRouteId, getCurrentRoute])

    return <div className={styles.Map} ref={mapContainerRef}></div>
}

export default Map
