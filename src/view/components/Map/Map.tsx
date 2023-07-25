import styles from './Map.module.css'
import 'leaflet/dist/leaflet.css'
import L, { LatLngTuple } from 'leaflet'
// @ts-ignore
import polylineEncoded from 'polyline-encoded'
import { useTypedDispatch, useTypedSelector } from '../../../store/hooks'
import { useEffect, useRef, useState } from 'react'
import MarkerPinIconUrl from '../../assets/marker-pin-icon.png'
import { getCurrentRouteIndex } from '../../../utils/getCurrentRoute'
import { fetchPolylineDataStart } from '../../../store/routes/routesSlice'

const MarkerPinIcon = L.icon({
    iconUrl: MarkerPinIconUrl,
    iconSize: [58, 87],
    iconAnchor: [22, 94],
    popupAnchor: [-3, -76],
})

const Map = (): JSX.Element => {
    const { currentRouteId, routes } = useTypedSelector((state) => state.routes)
    const dispatch = useTypedDispatch()
    const initialMapCenter: LatLngTuple = [59.93567701, 30.38064206]
    const mapContainerRef = useRef<HTMLDivElement>(null)
    const mapRef = useRef<L.Map | null>(null)
    const markersLayerRef = useRef<L.LayerGroup | null>(null)
    const polylineRef = useRef<L.Polyline | null>(null)
    const [currentRouteIndex, setCurrentRouteIndex] = useState<number>(0)

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
        currentRouteId && setCurrentRouteIndex(getCurrentRouteIndex(currentRouteId))

        if (currentRouteId) {
            // let currentRouteIndex = getCurrentRouteIndex(currentRouteId)

            dispatch(
                fetchPolylineDataStart({
                    id: currentRouteId,
                    points: routes[currentRouteIndex].points,
                })
            )
            console.log(routes[currentRouteIndex])
        }
    }, [currentRouteId])

    useEffect(() => {
        const renderMarkersAndPolylines = async () => {
            if (currentRouteId && mapRef.current && markersLayerRef.current) {
                let decodedPolyline = ''

                if (routes[currentRouteIndex].polylineEncodedData) {
                    decodedPolyline = await polylineEncoded.decode(currentRouteIndex)
                    console.log(decodedPolyline)
                }

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
                    routes[currentRouteIndex].points.map((point) => [point.lat, point.lng])
                )

                mapRef.current.fitBounds(bounds)

                markersLayerRef.current.clearLayers()

                routes[currentRouteIndex].points.forEach((point) => {
                    let markerPin = L.marker([point.lat, point.lng], { icon: MarkerPinIcon })
                    markersLayerRef.current?.addLayer(markerPin)
                })

                markersLayerRef.current.addTo(mapRef.current)
            }
        }
        renderMarkersAndPolylines()
    }, [routes[currentRouteIndex].polylineEncodedData])

    return <div className={styles.Map} ref={mapContainerRef}></div>
}

export default Map
