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
import { Box, ToggleButton, ToggleButtonGroup } from '@mui/material';
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
    //console.log('GetCenter got called')
    const summCoord = data.reduce((prev, curr) => ({ lat: prev.lat + curr.lat, long: prev.long + curr.long })
        , { lat: 0, long: 0 })
    return {
        latitude: summCoord.lat / data.length,
        longitude: summCoord.long / data.length,
    }
}


const customTooltip = (object) => {
    let text
    if (object != null) {
        text = `${object.name}
        `
        if (object.flow) {
            text = text + 'пассажиропоток: ' + object.flow.toLocaleString(undefined, { maximumFractionDigits: 1 }) + ' чел.'
        }
        if (object.direction) {
            text = text + `
            Направление: ${object.direction}`
        }
        if (object.id) {
            text = text + `
            Id: ${object.id}`
        }
    } else {
        return null
    }
    return {
        text,
        style: {
            'position': 'absolute',
            'color': '#FFFFFF',
            'background-color': '#858585BB',
            'padding': '10px',
        }
    }
}

//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// DeckGL react component
export default function DeckGLMap({ data, stopsAsMap, selectedRoute, selectedStops, vtypes }) {
    const [visibleLayers, setVisibleLayers] = useState(() => ['stops', 'Тм', "Тб", "Ав"])
    const mapCenter = useMemo(() => getCenter(data.stops), [data])
    const [isHighlighted, setIsHighlighted] = useState(false)

    const radius = 10
    const viewState = {
        longitude: mapCenter.longitude,
        latitude: mapCenter.latitude,
        zoom: 10,
        pitch: 50,
        bearing: 20
    }
    useEffect(() => {
        setVisibleLayers(() => visibleLayers.filter((elem) => (elem === 'stops' || vtypes.includes(elem))))
    }, [])

    //const MAPBOX_ACCESS_TOKEN = 'pk.eyJ1IjoidWNmLW1hcGJveCIsImEiOiJjbDBiYzlveHgwdnF0M2NtZzUzZWZuNWZ4In0.l9J8ptz3MKwaU9I4PtCcig'
    //const MAP_STYLE = 'https://basemaps.cartocdn.com/gl/positron-gl-style/style.json';
    //const MAP_STYLE = 'https://api.maptiler.com/maps/streets-v2/style.json?key=dCONZDYyeGeUjElb5LHi'
    //const MAP_STYLE = 'https://api.maptiler.com/tiles/v3/tiles.json?key=kznYvrAC6DrOZXPCW05C';
    //const MAP_STYLE = 'https://api.maptiler.com/maps/openstreetmap/style.json?key=dCONZDYyeGeUjElb5LHi'

    const highlighters = ['missStops', 'zeroFlows', 'maxFlows']
    const handleLayerSwitcherClick = (_, layer) => {
        setIsHighlighted(layer.filter(e => highlighters.includes(e)).length > 0)
        setVisibleLayers(layer)
    }
    const tiltLimit = 30

    const getPointColor = (d) => {
        //console.log('getColor!', d.id, selectedStops)
        if (selectedStops.includes(d.id)) {
            //console.log('Selected!', d.id)
            return mapColors.stops.higlighted
        } else {
            return (isHighlighted || selectedStops[0] > 0 ? mapColors.stops.muted : mapColors.stops.normal)
        }
    }
    /*
        useEffect(() => {
            console.log(selectedStops)
            console.log(selectedStops[0] > 0)
        }, [selectedStops])
    */
    return (
        <Box display='flex' flexDirection='column' alignContent='center' justifyContent='center' sx={{ boxSizing: 'border-box', p: 1 }}>
            <ToggleButtonGroup value={visibleLayers} size='small' color='info' onChange={handleLayerSwitcherClick}>
                <ToggleButton value='stops'>Остановки</ToggleButton>
                <ToggleButton
                    value='Тм'
                    disabled={!vtypes.includes('Тм')}
                >
                    Трамвай (поток в день)
                </ToggleButton>
                <ToggleButton
                    value='Тб'
                    disabled={!vtypes.includes('Тб')}
                >
                    Троллейбус (поток в день)
                </ToggleButton>
                <ToggleButton
                    value='Ав'
                    disabled={!vtypes.includes('Ав')}
                >
                    Автобус (поток в день)
                </ToggleButton>

                <ToggleButton
                    value='zeroFlows'
                    disabled={!data.errors.zero_flows}
                >
                    Перегоны с нулевым потоком
                </ToggleButton>
                <ToggleButton value='maxFlows'>Пиковые перегоны (поток в час)</ToggleButton>
            </ToggleButtonGroup>

            <div className="my-container"
                style={{ height: '800px', width: '100%', position: 'relative' }}>

                <DeckGL
                    initialViewState={viewState ? viewState : INITIAL_VIEW_STATE}
                    controller={true}

                    pickingRadius={5}
                    getTooltip={({ object }) => customTooltip(object)}
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
                        data={data.stops}
                        radiusScale={radius}
                        radiusMinPixels={3}
                        radiusMaxPixels={20}
                        getPosition={d => [d.long, d.lat, 0]}
                        getRadius={d => selectedStops.includes(d.id) ? 20 : 2}
                        minZoom={2}
                        pickable={true}
                        opacity={0.8}
                        stroked={true}
                        filled={true}
                        getLineColor={d => getPointColor(d)}
                        getFillColor={d => getPointColor(d)}
                        visible={visibleLayers.includes('stops')}
                        updateTriggers={{
                            getFillColor: [isHighlighted, selectedStops],
                            getRadius: [selectedStops]
                        }}
                    />

                    <ArcLayer
                        id='tram_routes'
                        data={data.routes_details.filter((elem) => elem.vtype == 'Тм')}
                        pickable={true}
                        widthUnits='meters'
                        widthScale={0.0035}
                        widthMinPixels={1}
                        getWidth={d => d.flow}
                        getSourcePosition={d => [d.coords_from[1], d.coords_from[0]]}
                        getTargetPosition={d => [d.coords_to[1], d.coords_to[0]]}
                        getSourceColor={d => isHighlighted ? mapColors.routes[d.vtype].muted : mapColors.routes[d.vtype].normal}
                        getTargetColor={d => isHighlighted ? mapColors.routes[d.vtype].muted : mapColors.routes[d.vtype].normal}
                        visible={visibleLayers.includes('Тм')}
                        getTilt={() => tiltLimit * (Math.random() - 0.5)}
                    />
                    <ArcLayer
                        id='trolley_routes'
                        data={data.routes_details.filter((elem) => elem.vtype == 'Тб')}
                        pickable={true}
                        widthUnits='meters'
                        widthScale={0.0035}
                        widthMinPixels={1}
                        getWidth={d => d.flow}
                        getSourcePosition={e => [e.coords_from[1], e.coords_from[0]]}
                        getTargetPosition={e => [e.coords_to[1], e.coords_to[0]]}
                        getSourceColor={d => isHighlighted ? mapColors.routes[d.vtype].muted : mapColors.routes[d.vtype].normal}
                        getTargetColor={d => isHighlighted ? mapColors.routes[d.vtype].muted : mapColors.routes[d.vtype].normal}
                        visible={visibleLayers.includes('Тб')}
                        getTilt={() => tiltLimit * (Math.random() - 0.5)}
                    />
                    <ArcLayer
                        id='bus_routes'
                        data={data.routes_details.filter((elem) => elem.vtype == 'Ав')}
                        pickable={true}
                        widthUnits='meters'
                        widthScale={0.0035}
                        widthMinPixels={1}
                        getWidth={d => d.flow}
                        getSourcePosition={e => [e.coords_from[1], e.coords_from[0]]}
                        getTargetPosition={e => [e.coords_to[1], e.coords_to[0]]}
                        getSourceColor={d => isHighlighted ? mapColors.routes[d.vtype].muted : mapColors.routes[d.vtype].normal}
                        getTargetColor={d => isHighlighted ? mapColors.routes[d.vtype].muted : mapColors.routes[d.vtype].normal}
                        visible={visibleLayers.includes('Ав')}
                        getTilt={() => tiltLimit * (Math.random() - 0.5)}
                    />
                    <ArcLayer
                        id='zero_flows'
                        data={data.errors.zero_flows}
                        pickable={true}
                        getWidth={5}
                        getSourcePosition={d => [stopsAsMap.get(d.stop_from).long, stopsAsMap.get(d.stop_from).lat]}
                        getTargetPosition={d => [stopsAsMap.get(d.stop_to).long, stopsAsMap.get(d.stop_to).lat]}
                        getSourceColor={d => mapColors.routes[d.vtype].higlighted}
                        getTargetColor={d => mapColors.routes[d.vtype].higlighted}
                        visible={visibleLayers.includes('zeroFlows')}
                        getTilt={() => tiltLimit * (Math.random() - 0.5)}
                    />
                    <ArcLayer
                        id='maxFlows'
                        data={data.maximums}
                        pickable={true}
                        widthUnits='meters'
                        widthScale={10 * 0.0035}
                        widthMinPixels={1}
                        getWidth={d => d.flow}
                        getSourcePosition={d => [stopsAsMap.get(d.stop_from).long, stopsAsMap.get(d.stop_from).lat]}
                        getTargetPosition={d => [stopsAsMap.get(d.stop_to).long, stopsAsMap.get(d.stop_to).lat]}
                        getSourceColor={d => mapColors.routes[d.vtype].higlighted}
                        getTargetColor={d => mapColors.routes[d.vtype].higlighted}
                        visible={visibleLayers.includes('maxFlows')}
                        getTilt={() => tiltLimit * (Math.random() - 0.5)}
                    />
                    <ArcLayer
                        id='selectedRoute'
                        data={data.routes_details.filter((elem) => elem.rname_full == selectedRoute.rname_full)}
                        pickable={true}
                        widthUnits='meters'
                        widthScale={2 * 0.0035}
                        widthMinPixels={1}
                        getWidth={d => d.flow}
                        getSourcePosition={d => [stopsAsMap.get(d.stop_from).long, stopsAsMap.get(d.stop_from).lat]}
                        getTargetPosition={d => [stopsAsMap.get(d.stop_to).long, stopsAsMap.get(d.stop_to).lat]}
                        getSourceColor={[255, 255, 0]}
                        getTargetColor={[200, 255, 100]}
                        visible={selectedRoute}
                        getTilt={() => tiltLimit * (Math.random() - 0.5)}

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