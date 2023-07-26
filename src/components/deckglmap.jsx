import React from 'react';
import DeckGL from '@deck.gl/react';
import { TileLayer } from '@deck.gl/geo-layers';
import { ScatterplotLayer } from '@deck.gl/layers';
import { BitmapLayer } from '@deck.gl/layers';
import { Map } from 'react-map-gl';
//import 'mapbox-gl/dist/mapbox-gl.css';
import maplibregl from 'maplibre-gl';
import './deckglmap.css'
import { useEffect } from 'react';

// Viewport settings
const INITIAL_VIEW_STATE = {
    longitude: 92.852393,
    latitude: 56.012511,
    zoom: 10,
    pitch: 40,
    bearing: 0
};


// DeckGL react component
export default function DeckGLMap({ objects, highlightObjects }) {
    const radius = 10
    useEffect(() => {
        console.log(objects)
    }, [])

    const layers = [
        new TileLayer({
            // https://wiki.openstreetmap.org/wiki/Slippy_map_tilenames#Tile_servers
            data: 'https://c.tile.openstreetmap.org/{z}/{x}/{y}.png',

            minZoom: 2,
            maxZoom: 19,
            tileSize: 256,

            renderSubLayers: props => {
                const {
                    bbox: { west, south, east, north }
                } = props.tile;

                return new BitmapLayer(props, {
                    data: null,
                    image: props.data,
                    bounds: [west, south, east, north]
                });
            }
        }),
        new ScatterplotLayer({
            id: 'scatter-plot',
            data: objects.stops,
            radiusScale: radius,
            radiusMinPixels: 1,
            radiusMaxPixels: 20,
            getPosition: d => [d.long, d.lat, 0],
            getRadius: 2,
            minZoom: 2,
            pickable: true,
            opacity: 0.8,
            stroked: true,
            filled: true,
            getLineColor: d => [0, 72, 249],
            getFillColor: d => [0, 204, 249],

            /*updateTriggers: {
                getFillColor: [maleColor, femaleColor]
            }*/
        })
    ];

    const MAPBOX_ACCESS_TOKEN = 'pk.eyJ1IjoidWNmLW1hcGJveCIsImEiOiJjbDBiYzlveHgwdnF0M2NtZzUzZWZuNWZ4In0.l9J8ptz3MKwaU9I4PtCcig'
    //const MAP_STYLE = 'https://basemaps.cartocdn.com/gl/positron-gl-style/style.json';
    //const MAP_STYLE = 'https://api.maptiler.com/maps/streets-v2/style.json?key=dCONZDYyeGeUjElb5LHi'
    //const MAP_STYLE = 'https://api.maptiler.com/tiles/v3/tiles.json?key=kznYvrAC6DrOZXPCW05C';
    const MAP_STYLE = 'https://api.maptiler.com/maps/openstreetmap/style.json?key=dCONZDYyeGeUjElb5LHi'


    return (
        <div className="my-container" style={{ height: '60vh', width: '50vw', position: 'relative' }}>
            <DeckGL
                initialViewState={INITIAL_VIEW_STATE}
                controller={true}
                layers={[layers]}
            //</div>layers={layers}
            >

            </DeckGL>
        </div>
    )
}