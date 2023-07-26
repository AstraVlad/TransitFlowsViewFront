import React, { useEffect, useState } from 'react'
import { useRef } from 'react'
import { MapContainer, TileLayer, Popup, CircleMarker, LayersControl, LayerGroup } from 'react-leaflet'
import RouteLayerGroup from './ui/routeslayergroup'

const vtypeColorMap = new Map([
    ['Ав', {
        regular: 'green',
        highlited: 'darkgreen',
        muted: 'grey'
    }
    ],
    ['Тм', { regular: '#FF0000' }],
    ['Тб', { regular: '#00A0FF' }]
])

const getCenter = (data) => {
    const summCoord = data.reduce((prev, curr) => ({ lat: prev.lat + curr.lat, long: prev.long + curr.long })
        , { lat: 0, long: 0 })
    return [summCoord.lat / data.length, summCoord.long / data.length]
}

const purpleOptions = { color: 'purple' }
const redOptions = { color: 'red' }
const blueOptions = { color: 'blue' }

export default function RoutesMap({ stops, routes, highlightObjects, objectsTypes }) {
    const [routesCoordinates, setRoutesCoordinates] = useState([])
    const stopsAsMap = useRef(0)

    const processRouteOneDirection = (routeOneDirection) => {
        if (Array.isArray(routeOneDirection)) {
            return routeOneDirection.reduce((array, stopId) => {
                if (stopId === null) {
                    array.push([])
                    return array
                }
                array[array.length - 1].push([stopsAsMap.current.get(stopId).lat, stopsAsMap.current.get(stopId).long])
                return array
            }, [[]])
        } else {
            return 0
        }
    }

    //Заполняем данные об остановках (в виде словаря) и координатах узлов маршрутов
    useEffect(() => {
        stopsAsMap.current = new Map(stops.map((stop) => [stop.id, stop]))
        const coords = routes.map((elem) => {
            return {
                'rnum': elem.rname_full,
                'vtype': elem.vtype,
                'stopsAB': processRouteOneDirection(elem.stops_ab),
                'stopsBA': processRouteOneDirection(elem.stops_ba),
                'color': vtypeColorMap.get(elem.vtype)
            }
        })
        setRoutesCoordinates(coords)
    }, [routes, stops])

    useEffect(() => {
        //console.log('RoutesCoordinates: ', routesCoordinates)
    }, [routesCoordinates])

    return (
        <MapContainer center={getCenter(stops)} zoom={12} scrollWheelZoom={false}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <LayersControl position='topright'>
                <LayersControl.Overlay checked name='Остановки'>
                    <LayerGroup>
                        {stops.map(elem => {
                            if ((highlightObjects && elem.id == highlightObjects.nextStop)) {
                                //console.log('Highlight:', highlightObjects)
                                return <CircleMarker
                                    key={elem.id}
                                    center={[elem.lat, elem.long]}
                                    pathOptions={purpleOptions}
                                    radius={5} >
                                    <Popup>{`${elem.name}, номер: ${elem.id}`}</Popup>
                                </CircleMarker>
                            } else if (!highlightObjects) {
                                return <CircleMarker
                                    key={elem.id}
                                    center={[elem.lat, elem.long]}
                                    radius={5} >
                                    <Popup>{`${elem.name}, номер: ${elem.id}`}</Popup>
                                </CircleMarker>
                            }
                        }
                        )}
                    </LayerGroup>
                </LayersControl.Overlay>
                <LayersControl.Overlay checked name='Маршруты трамвая'>
                    <RouteLayerGroup vtype={'Тм'} routes={routesCoordinates} highlightObjects={highlightObjects} />
                </LayersControl.Overlay>
                <LayersControl.Overlay name='Маршруты автобуса'>
                    <RouteLayerGroup vtype={'Ав'} routes={routesCoordinates} highlightObjects={highlightObjects} />
                </LayersControl.Overlay>
                <LayersControl.Overlay name='Маршруты троллейбуса'>
                    <RouteLayerGroup vtype={'Тб'} routes={routesCoordinates} highlightObjects={highlightObjects} />
                </LayersControl.Overlay>
                <LayersControl.Overlay name='Пассажиропотоки трамвая'>
                    <LayerGroup>

                    </LayerGroup>
                </LayersControl.Overlay>
                <LayersControl.Overlay name='Пассажиропотоки автобуса'>
                    <LayerGroup>

                    </LayerGroup>
                </LayersControl.Overlay>
                <LayersControl.Overlay name='Пассажиропотоки троллейбуса'>
                    <LayerGroup>

                    </LayerGroup>
                </LayersControl.Overlay>
            </LayersControl>
        </MapContainer>
    )
}