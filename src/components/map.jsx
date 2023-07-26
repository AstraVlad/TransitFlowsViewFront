import React from 'react';
//import DeckGL from '@deck.gl/react';
import { LineLayer } from '@deck.gl/layers';
import { Box } from '@mui/material';
//import { Map } from 'react-map-gl';
//import maplibregl from 'maplibre-gl';


// DeckGL react component
export default function DeckGLMap({ initialViewState, data, mapStyle }) {
    const layers = [
        new LineLayer({ id: 'line-layer', data })
    ]

    return (
        <Box sx={{
            width: 700,
            height: 700,
            backgroundColor: 'lightblue'
        }}>

        </Box>
    )
}
