import React from 'react';
//import DeckGL from '@deck.gl/react';
import { ArcLayer } from 'deck.gl';

const darkenColor = (color, delta = 10) => {
    color.map((element) =>
        element <= delta ? element : element - delta
    )
}

export default function DynamicArcLayer({ data, stopsAsMap, color }) {
    return (
        <ArcLayer
            id='arc-layer'
            data={data}
            pickable={true}
            getWidth={5}
            getSourcePosition={d => [stopsAsMap.get(d.stop_from).long, stopsAsMap.get(d.stop_from).lat]}
            getTargetPosition={d => [stopsAsMap.get(d.stop_to).long, stopsAsMap.get(d.stop_to).lat]}
            getSourceColor={color}
            getTargetColor={darkenColor(color)}
        />
    )
}