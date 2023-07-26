import React from 'react'
import { LayerGroup, Polyline } from 'react-leaflet'

export default function RouteLayerGroup({ vtype, routes, highlightObjects }) {
    return (
        <LayerGroup>
            {routes.map((route) => {
                if (route.vtype == vtype) {
                    if (highlightObjects && route.rnum == highlightObjects.rname) {
                        const points = highlightObjects.direction == 'AB' ? route.stopsAB : route.stopsBA
                        return (<Polyline
                            key={route.rnum}
                            pathOptions={{ color: route.color.regular }}
                            positions={points} />)
                    } else if (!highlightObjects) {
                        const points = Array.isArray(route.stopsBA) ? route.stopsAB.concat(route.stopsBA) : route.stopsAB
                        return (<Polyline
                            key={route.rnum}
                            pathOptions={{ color: route.color.regular, weight: 2, opacity: 0.5 }}
                            positions={points} />)
                    }

                }
            }
            )
            }
        </LayerGroup>
    )
}