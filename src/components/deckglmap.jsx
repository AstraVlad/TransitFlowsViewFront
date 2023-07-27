import React from 'react';
import DeckGL from '@deck.gl/react';
import { TileLayer } from '@deck.gl/geo-layers';
import { ScatterplotLayer } from '@deck.gl/layers';
import { BitmapLayer } from '@deck.gl/layers';
//import { Map } from 'react-map-gl';
//import 'mapbox-gl/dist/mapbox-gl.css';
//import maplibregl from 'maplibre-gl';
//import './deckglmap.css'
import { useEffect } from 'react';
import mapColors from '../utils/colors';
import { Box, Button, ButtonGroup, ToggleButton, ToggleButtonGroup } from '@mui/material';
import { useState } from 'react';
//import { useRef } from 'react';
import { useMemo } from 'react';
import { ArcLayer } from 'deck.gl';

// Viewport settings
const INITIAL_VIEW_STATE = {
    longitude: 48.0408,
    latitude: 46.3497,
    zoom: 10,
    pitch: 0,
    bearing: 0
};

const getCenter = (data) => {
    console.log('GetCenter got called')
    const summCoord = data.reduce((prev, curr) => ({ lat: prev.lat + curr.lat, long: prev.long + curr.long })
        , { lat: 0, long: 0 })
    return {
        latitude: summCoord.lat / data.length,
        longitude: summCoord.long / data.length,
    }
}

//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// DeckGL react component
export default function DeckGLMap({ objects, stopsAsMap, highlightObjects }) {
    const [visibleLayers, setVisibleLayers] = useState(() => ['stops'])
    const mapCenter = useMemo(() => getCenter(objects.stops), [objects])
    const [routesCoordinates, setRoutesCoordinates] = useState([])
    const [isHighlighted, setIsHighlighted] = useState(false)

    const testIsHighlighted = () => {
        let result = false
        for (const key in highlightObjects) {
            result = result || highlightObjects[key].length > 0
        }
        console.log(result)
        return result
    }

    useEffect(() => {
        setIsHighlighted(testIsHighlighted())
    }, [highlightObjects])

    const processRouteOneDirection = (routeOneDirection) => {
        if (Array.isArray(routeOneDirection)) {
            return routeOneDirection.reduce((array, stopId) => {
                if (stopId === null) {
                    array.push([])
                    return array
                }
                array[array.length - 1].push([stopsAsMap.get(stopId).lat, stopsAsMap.get(stopId).long])
                return array
            }, [[]])
        } else {
            return 0
        }
    }

    useEffect(() => {
        //console.log(objects, stopsAsMap)
        const coords = objects.registry.map((elem) => {
            return {
                'rnum': elem.rname_full,
                'vtype': elem.vtype,
                'stopsAB': processRouteOneDirection(elem.stops_ab),
                'stopsBA': processRouteOneDirection(elem.stops_ba),
            }
        })
        setRoutesCoordinates(coords)
        console.log(coords)
    }, [objects])

    const radius = 10
    const viewState = {
        longitude: mapCenter.longitude,
        latitude: mapCenter.latitude,
        zoom: 10,
        pitch: 30,
        bearing: 0
    }

    //const MAPBOX_ACCESS_TOKEN = 'pk.eyJ1IjoidWNmLW1hcGJveCIsImEiOiJjbDBiYzlveHgwdnF0M2NtZzUzZWZuNWZ4In0.l9J8ptz3MKwaU9I4PtCcig'
    //const MAP_STYLE = 'https://basemaps.cartocdn.com/gl/positron-gl-style/style.json';
    //const MAP_STYLE = 'https://api.maptiler.com/maps/streets-v2/style.json?key=dCONZDYyeGeUjElb5LHi'
    //const MAP_STYLE = 'https://api.maptiler.com/tiles/v3/tiles.json?key=kznYvrAC6DrOZXPCW05C';
    //const MAP_STYLE = 'https://api.maptiler.com/maps/openstreetmap/style.json?key=dCONZDYyeGeUjElb5LHi'

    const handleLayerSwitcherClick = (_, layer) => {
        setVisibleLayers(layer)
    }

    return (
        <Box display='flex' flexDirection='column' alignContent='center' justifyContent='center' sx={{ p: 1 }}>
            <ToggleButtonGroup value={visibleLayers} size='small' color='secondary' onChange={handleLayerSwitcherClick}>
                <ToggleButton value='stops'>Остановки</ToggleButton>
                <ToggleButton value='Тм'>Трамвай</ToggleButton>
                <ToggleButton value='Тб'>Троллейбус</ToggleButton>
                <ToggleButton value='Ав'>Автобус</ToggleButton>
            </ToggleButtonGroup>

            <div className="my-container"
                style={{ height: '800px', width: '100%', position: 'relative' }}>

                <DeckGL
                    initialViewState={viewState ? viewState : INITIAL_VIEW_STATE}
                    controller={true}
                >
                    <TileLayer
                        data='https://c.tile.openstreetmap.org/{z}/{x}/{y}.png'
                        minZoom={2}
                        maxZoom={19}
                        tileSize={256}
                        renderSubLayers={props => {
                            const {
                                bbox: { west, south, east, north }
                            } = props.tile;

                            return new BitmapLayer(props, {
                                data: null,
                                image: props.data,
                                bounds: [west, south, east, north]
                            });
                        }}
                    />
                    <ScatterplotLayer
                        id='stops'
                        data={objects.stops}
                        radiusScale={radius}
                        radiusMinPixels={3}
                        radiusMaxPixels={20}
                        getPosition={d => [d.long, d.lat, 0]}
                        getRadius={2}
                        minZoom={2}
                        pickable={true}
                        opacity={0.8}
                        stroked={true}
                        filled={true}
                        getLineColor={d => isHighlighted ? mapColors.stops.muted : mapColors.stops.higlighted}
                        getFillColor={d => isHighlighted ? mapColors.stops.muted : mapColors.stops.normal}
                        visible={visibleLayers.includes('stops')}
                        updateTriggers={{ getFillColor: [isHighlighted] }}
                    />
                    <ArcLayer
                        id='arc-layer'
                        data={highlightObjects.routeFragments}
                        pickable={true}
                        getWidth={5}
                        getSourcePosition={d => [stopsAsMap.get(d.stop_from).long, stopsAsMap.get(d.stop_from).lat]}
                        getTargetPosition={d => [stopsAsMap.get(d.stop_to).long, stopsAsMap.get(d.stop_to).lat]}
                        getSourceColor={[255, 0, 0]}
                        getTargetColor={[255, 0, 0]}
                    />
                </DeckGL>
            </div>
        </Box>
    )
}

/*
<ArcLayer
                        id='arc-layer'
                    data={routesCoordinates[1].stopsAB}
                        pickable={true}
                        getWidth={12}
                        getSourcePosition={d => d.from.coordinates}
    getTargetPosition: d => d.to.coordinates,
    getSourceColor: d => [Math.sqrt(d.inbound), 140, 0],
    getTargetColor: d => [Math.sqrt(d.outbound), 140, 0],
                    />
*/