import React from 'react';
//import DeckGL from '@deck.gl/react';
import { LineLayer } from '@deck.gl/layers';
import { Box } from '@mui/material';
//import { Map } from 'react-map-gl';
//import maplibregl from 'maplibre-gl';

const config = {
    "version": "v1",
    "config": {
        "visState":
        {
            "filters": [], "layers":
                [{
                    "id": "ovsilpm", "type": "point", "config":
                    {
                        "dataId": "bs6z14xb",
                        "label": "from",
                        "color": [18, 92, 119],
                        "highlightColor": [252, 242, 26, 255],
                        "columns": { "lat": "from_lat", "lng": "from_long", "altitude": null },
                        "isVisible": true,
                        "visConfig": {
                            "radius": 10, "fixedRadius": false, "opacity": 0.8, "outline": false, "thickness": 2, "strokeColor": null,
                            "colorRange": {
                                "name": "Global Warming", "type": "sequential", "category": "Uber", "colors":
                                    ["#5A1846", "#900C3F", "#C70039", "#E3611C", "#F1920E", "#FFC300"]
                            }, "strokeColorRange": {
                                "name": "Global Warming", "type": "sequential", "category": "Uber", "colors":
                                    ["#5A1846", "#900C3F", "#C70039", "#E3611C", "#F1920E", "#FFC300"]
                            }, "radiusRange": [0, 50], "filled": true
                        }, "hidden": false, "textLabel":
                            [{ "field": null, "color": [255, 255, 255], "size": 18, "offset": [0, 0], "anchor": "start", "alignment": "center" }]
                    }, "visualChannels": {
                        "colorField": { "name": "Последующая длина", "type": "real" },
                        "colorScale": "quantile",
                        "strokeColorField": null,
                        "strokeColorScale": "quantile",
                        "sizeField": null,
                        "sizeScale": "linear"
                    }
                },
                {
                    "id": "xw9rrb", "type": "point",
                    "config": {
                        "dataId": "bs6z14xb", "label": "to", "color": [77, 193, 156],
                        "highlightColor": [252, 242, 26, 255],
                        "columns": { "lat": "to_lat", "lng": "to_long", "altitude": null },
                        "isVisible": false,
                        "visConfig": {
                            "radius": 10, "fixedRadius": false, "opacity": 0.8,
                            "outline": false, "thickness": 2, "strokeColor": null,
                            "colorRange": {
                                "name": "Global Warming", "type": "sequential", "category": "Uber",
                                "colors": ["#5A1846", "#900C3F", "#C70039", "#E3611C", "#F1920E", "#FFC300"]
                            }, "strokeColorRange": {
                                "name": "Global Warming", "type": "sequential", "category": "Uber",
                                "colors": ["#5A1846", "#900C3F", "#C70039", "#E3611C", "#F1920E", "#FFC300"]
                            }, "radiusRange": [0, 50], "filled": true
                        }, "hidden": false, "textLabel": [{
                            "field": null, "color": [255, 255, 255],
                            "size": 18, "offset": [0, 0], "anchor": "start", "alignment": "center"
                        }]
                    }, "visualChannels": {
                        "colorField": { "name": "Последующая длина", "type": "real" },
                        "colorScale": "quantile", "strokeColorField": null,
                        "strokeColorScale": "quantile", "sizeField": null, "sizeScale": "linear"
                    }
                }, {
                    "id": "wpp3kx", "type": "arc",
                    "config": {
                        "dataId": "bs6z14xb", "label": "from -> to arc",
                        "color": [146, 38, 198], "highlightColor": [252, 242, 26, 255],
                        "columns": { "lat0": "from_lat", "lng0": "from_long", "lat1": "to_lat", "lng1": "to_long" },
                        "isVisible": true, "visConfig": {
                            "opacity": 0.8, "thickness": 2,
                            "colorRange": {
                                "name": "Custom Palette", "type": "custom", "category": "Custom",
                                "colors": ["#00ff1f", "#00baff", "#ff0006", "#FF991F", "#F15C17", "#223F9A"]
                            },
                            "sizeRange": [0, 10], "targetColor": null
                        }, "hidden": false, "textLabel": [{ "field": null, "color": [255, 255, 255], "size": 18, "offset": [0, 0], "anchor": "start", "alignment": "center" }]
                    }, "visualChannels": { "colorField": { "name": "Профиль времени движения\\Код СисТр", "type": "string" }, "colorScale": "ordinal", "sizeField": { "name": "Нагрузка (ПА)", "type": "real" }, "sizeScale": "linear" }
                }, {
                    "id": "nknmxm", "type": "line",
                    "config": {
                        "dataId": "bs6z14xb", "label": "from -> to line",
                        "color": [119, 110, 87], "highlightColor": [252, 242, 26, 255],
                        "columns": { "lat0": "from_lat", "lng0": "from_long", "alt0": null, "lat1": "to_lat", "lng1": "to_long", "alt1": null },
                        "isVisible": false,
                        "visConfig": {
                            "opacity": 0.8, "thickness": 2,
                            "colorRange": {
                                "name": "Global Warming", "type": "sequential", "category": "Uber",
                                "colors": ["#5A1846", "#900C3F", "#C70039", "#E3611C", "#F1920E", "#FFC300"]
                            },
                            "sizeRange": [0, 10], "targetColor": null, "elevationScale": 1
                        }, "hidden": false,
                        "textLabel": [{ "field": null, "color": [255, 255, 255], "size": 18, "offset": [0, 0], "anchor": "start", "alignment": "center" }]
                    }, "visualChannels": { "colorField": null, "colorScale": "quantile", "sizeField": null, "sizeScale": "linear" }
                }], "interactionConfig": {
                    "tooltip": {
                        "fieldsToShow": {
                            "bs6z14xb": [
                                { "name": "Профиль времени движения\\Вариант маршрута\\ID", "format": null },
                                { "name": "Индекс", "format": null }, { "name": "Имя маршрута", "format": null },
                                { "name": "Профиль времени движения\\Код СисТр", "format": null },
                                { "name": "Имя варианта маршрута", "format": null }]
                        }, "compareMode": false, "compareType": "absolute", "enabled": true
                    }, "brush": { "size": 0.5, "enabled": false }, "geocoder": { "enabled": false }, "coordinate": { "enabled": false }
                }, "layerBlending": "normal", "splitMaps": [], "animationConfig": { "currentTime": null, "speed": 1 }
        }, "mapState": {
            "bearing": 24, "dragRotate": true, "latitude": 56.02403280456903,
            "longitude": 92.86910058439575, "pitch": 50, "zoom": 11.836412418418666, "isSplit": false
        }, "mapStyle": {
            "styleType": "hkj51am", "topLayerGroups": {},
            "visibleLayerGroups": { "label": true, "road": true, "building": true, "water": true, "land": true },
            "threeDBuildingColor": [208.57758098124364, 208.57758098124364, 193.67918233972625],
            "mapStyles": {
                "hkj51am": {
                    "accessToken": "", "custom": true,
                    "icon": "https://api.mapbox.com/styles/v1/https://raw.githubusercontent.com/heshan0131/kepler.gl-data/master/style/basic.json/static/-122.3391,37.7922,9,0,0/400x300?access_token=pk.eyJ1IjoidWNmLW1hcGJveCIsImEiOiJja2tyMjNhcWIwc29sMnVzMThoZ3djNXhzIn0._hfBNwCD7pCU7RAMOq6vUQ&logo=false&attribution=false",
                    "id": "hkj51am", "label": "OSM", "url": "https://raw.githubusercontent.com/heshan0131/kepler.gl-data/master/style/basic.json"
                }
            }
        }
    }
};

const jconf = {
    "version": "v1", "config":
    {
        "visState": {
            "filters": [],
            "layers": [{
                "id": "ovsilpm", "type": "point",
                "config": {
                    "dataId": "bs6z14xb", "label": "from", "color": [18, 92, 119],
                    "highlightColor": [252, 242, 26, 255],
                    "columns": { "lat": "from_lat", "lng": "from_long", "altitude": null }, "isVisible": true, "visConfig": { "radius": 10, "fixedRadius": false, "opacity": 0.8, "outline": false, "thickness": 2, "strokeColor": null, "colorRange": { "name": "Ice And Fire", "type": "diverging", "category": "Uber", "colors": ["#0198BD", "#49E3CE", "#E8FEB5", "#FEEDB1", "#FEAD54", "#D50255"] }, "strokeColorRange": { "name": "Global Warming", "type": "sequential", "category": "Uber", "colors": ["#5A1846", "#900C3F", "#C70039", "#E3611C", "#F1920E", "#FFC300"] }, "radiusRange": [0, 50], "filled": true }, "hidden": false, "textLabel": []
                }, "visualChannels": { "colorField": { "name": "Входящие (ПА)", "type": "real" }, "colorScale": "quantile", "strokeColorField": null, "strokeColorScale": "quantile", "sizeField": { "name": "Входящие (ПА)", "type": "real" }, "sizeScale": "sqrt" }
            }, { "id": "xw9rrb", "type": "point", "config": { "dataId": "bs6z14xb", "label": "to", "color": [77, 193, 156], "highlightColor": [252, 242, 26, 255], "columns": { "lat": "to_lat", "lng": "to_long", "altitude": null }, "isVisible": false, "visConfig": { "radius": 10, "fixedRadius": false, "opacity": 0.8, "outline": false, "thickness": 2, "strokeColor": null, "colorRange": { "name": "Global Warming", "type": "sequential", "category": "Uber", "colors": ["#5A1846", "#900C3F", "#C70039", "#E3611C", "#F1920E", "#FFC300"] }, "strokeColorRange": { "name": "Global Warming", "type": "sequential", "category": "Uber", "colors": ["#5A1846", "#900C3F", "#C70039", "#E3611C", "#F1920E", "#FFC300"] }, "radiusRange": [0, 50], "filled": true }, "hidden": false, "textLabel": [{ "field": null, "color": [255, 255, 255], "size": 18, "offset": [0, 0], "anchor": "start", "alignment": "center" }] }, "visualChannels": { "colorField": { "name": "Последующая длина", "type": "real" }, "colorScale": "quantile", "strokeColorField": null, "strokeColorScale": "quantile", "sizeField": null, "sizeScale": "linear" } }, { "id": "wpp3kx", "type": "arc", "config": { "dataId": "bs6z14xb", "label": "from -> to arc", "color": [146, 38, 198], "highlightColor": [252, 242, 26, 255], "columns": { "lat0": "from_lat", "lng0": "from_long", "lat1": "to_lat", "lng1": "to_long" }, "isVisible": true, "visConfig": { "opacity": 0.8, "thickness": 2, "colorRange": { "name": "Custom Palette", "type": "custom", "category": "Custom", "colors": ["#00ff1f", "#000000", "#ff0006", "#00dbff", "#F15C17", "#223F9A"] }, "sizeRange": [0, 10], "targetColor": null }, "hidden": false, "textLabel": [{ "field": null, "color": [255, 255, 255], "size": 18, "offset": [0, 0], "anchor": "start", "alignment": "center" }] }, "visualChannels": { "colorField": { "name": "Профиль времени движения\\Код СисТр", "type": "string" }, "colorScale": "ordinal", "sizeField": { "name": "Нагрузка (ПА)", "type": "real" }, "sizeScale": "linear" } }, { "id": "nknmxm", "type": "line", "config": { "dataId": "bs6z14xb", "label": "from -> to line", "color": [119, 110, 87], "highlightColor": [252, 242, 26, 255], "columns": { "lat0": "from_lat", "lng0": "from_long", "alt0": null, "lat1": "to_lat", "lng1": "to_long", "alt1": null }, "isVisible": false, "visConfig": { "opacity": 0.8, "thickness": 2, "colorRange": { "name": "Global Warming", "type": "sequential", "category": "Uber", "colors": ["#5A1846", "#900C3F", "#C70039", "#E3611C", "#F1920E", "#FFC300"] }, "sizeRange": [0, 10], "targetColor": null, "elevationScale": 1 }, "hidden": false, "textLabel": [{ "field": null, "color": [255, 255, 255], "size": 18, "offset": [0, 0], "anchor": "start", "alignment": "center" }] }, "visualChannels": { "colorField": null, "colorScale": "quantile", "sizeField": null, "sizeScale": "linear" } }], "interactionConfig": { "tooltip": { "fieldsToShow": { "bs6z14xb": [{ "name": "Профиль времени движения\\Вариант маршрута\\ID", "format": null }, { "name": "Индекс", "format": null }, { "name": "Имя маршрута", "format": null }, { "name": "Профиль времени движения\\Код СисТр", "format": null }, { "name": "Имя варианта маршрута", "format": null }] }, "compareMode": false, "compareType": "absolute", "enabled": true }, "brush": { "size": 0.5, "enabled": false }, "geocoder": { "enabled": false }, "coordinate": { "enabled": false } }, "layerBlending": "normal", "splitMaps": [], "animationConfig": { "currentTime": null, "speed": 1 }
        }, "mapState": {
            "bearing": 24, "dragRotate": true, "latitude": 56.02430710275592,
            "longitude": 92.85452401330164, "pitch": 50, "zoom": 11.836412418418666, "isSplit": false
        }, "mapStyle": {
            "styleType": "hkj51am", "topLayerGroups": {},
            "visibleLayerGroups": { "label": true, "road": true, "building": true, "water": true, "land": true },
            "threeDBuildingColor": [208.57758098124364, 208.57758098124364, 193.67918233972625],
            "mapStyles": {
                "hkj51am": {
                    "accessToken": "", "custom": true,
                    "icon": "https://api.mapbox.com/styles/v1/https://raw.githubusercontent.com/heshan0131/kepler.gl-data/master/style/basic.json/static/-122.3391,37.7922,9,0,0/400x300?access_token=pk.eyJ1IjoidWNmLW1hcGJveCIsImEiOiJja2tyMjNhcWIwc29sMnVzMThoZ3djNXhzIn0._hfBNwCD7pCU7RAMOq6vUQ&logo=false&attribution=false",
                    "id": "hkj51am", "label": "OSM",
                    "url": "https://raw.githubusercontent.com/heshan0131/kepler.gl-data/master/style/basic.json"
                }
            }
        }
    }
}

const gitKeplerCustomConfig = {
    "id": "basic",
    "name": "Basic",
    "zoom": 1,
    "pitch": 0,
    "center": [
        0,
        0
    ],
    "glyphs": "https://api.maptiler.com/fonts/{fontstack}/{range}.pbf?key=kznYvrAC6DrOZXPCW05C",
    "layers": [
        {
            "id": "background",
            "type": "background",
            "paint": {
                "background-color": "rgba(224, 224, 208, 1)"
            }
        },
        {
            "id": "landuse_residential",
            "type": "fill",
            "paint": {
                "fill-color": "rgba(210, 210, 195, 1)",
                "fill-opacity": 0.7
            },
            "filter": [
                "all",
                [
                    "in",
                    "class",
                    "residential",
                    "suburb",
                    "neighbourhood"
                ]
            ],
            "layout": {
                "visibility": "visible"
            },
            "source": "openmaptiles",
            "source-layer": "landuse"
        },
        {
            "id": "landcover_grass",
            "type": "fill",
            "paint": {
                "fill-color": "rgba(192, 213, 169, 1)",
                "fill-opacity": 0.4
            },
            "filter": [
                "==",
                "class",
                "grass"
            ],
            "source": "openmaptiles",
            "source-layer": "landcover"
        },
        {
            "id": "landcover_wood",
            "type": "fill",
            "paint": {
                "fill-color": "hsl(82, 46%, 72%)",
                "fill-opacity": 0.8
            },
            "filter": [
                "==",
                "class",
                "wood"
            ],
            "source": "openmaptiles",
            "source-layer": "landcover"
        },
        {
            "id": "landcover_sand",
            "type": "fill",
            "paint": {
                "fill-color": "rgba(232, 214, 38, 1)",
                "fill-opacity": 0.3,
                "fill-antialias": false
            },
            "filter": [
                "all",
                [
                    "in",
                    "class",
                    "sand"
                ]
            ],
            "source": "openmaptiles",
            "metadata": {},
            "source-layer": "landcover"
        },
        {
            "id": "landcover_glacier",
            "type": "fill",
            "paint": {
                "fill-color": "rgba(236, 235, 230, 1)",
                "fill-opacity": 1
            },
            "filter": [
                "all",
                [
                    "in",
                    "subclass",
                    "glacier",
                    "ice_shelf"
                ]
            ],
            "layout": {
                "visibility": "visible"
            },
            "source": "openmaptiles",
            "source-layer": "landcover"
        },
        {
            "id": "water",
            "type": "fill",
            "paint": {
                "fill-color": "hsl(205, 56%, 73%)"
            },
            "filter": [
                "all",
                [
                    "!=",
                    "intermittent",
                    1
                ],
                [
                    "!=",
                    "brunnel",
                    "tunnel"
                ]
            ],
            "layout": {
                "visibility": "visible"
            },
            "source": "openmaptiles",
            "source-layer": "water"
        },
        {
            "id": "water_intermittent",
            "type": "fill",
            "paint": {
                "fill-color": "hsl(205, 56%, 73%)",
                "fill-opacity": 0.7
            },
            "filter": [
                "all",
                [
                    "==",
                    "intermittent",
                    1
                ]
            ],
            "layout": {
                "visibility": "visible"
            },
            "source": "openmaptiles",
            "source-layer": "water"
        },
        {
            "id": "waterway_tunnel",
            "type": "line",
            "paint": {
                "line-color": "hsl(205, 56%, 73%)",
                "line-width": 1,
                "line-opacity": 0.7,
                "line-dasharray": [
                    3,
                    3
                ]
            },
            "filter": [
                "all",
                [
                    "==",
                    "brunnel",
                    "tunnel"
                ]
            ],
            "layout": {
                "visibility": "visible"
            },
            "source": "openmaptiles",
            "source-layer": "waterway"
        },
        {
            "id": "waterway",
            "type": "line",
            "paint": {
                "line-color": "hsl(205, 56%, 73%)",
                "line-width": {
                    "stops": [
                        [
                            8,
                            1
                        ],
                        [
                            15,
                            3
                        ]
                    ]
                },
                "line-opacity": 1
            },
            "filter": [
                "all",
                [
                    "!in",
                    "brunnel",
                    "tunnel",
                    "bridge"
                ],
                [
                    "!=",
                    "intermittent",
                    1
                ]
            ],
            "layout": {
                "visibility": "visible"
            },
            "source": "openmaptiles",
            "source-layer": "waterway"
        },
        {
            "id": "waterway_intermittent",
            "type": "line",
            "paint": {
                "line-color": "hsl(205, 56%, 73%)",
                "line-width": {
                    "stops": [
                        [
                            8,
                            1
                        ],
                        [
                            15,
                            3
                        ]
                    ]
                },
                "line-opacity": 1,
                "line-dasharray": [
                    2,
                    1
                ]
            },
            "filter": [
                "all",
                [
                    "!in",
                    "brunnel",
                    "tunnel",
                    "bridge"
                ],
                [
                    "==",
                    "intermittent",
                    1
                ]
            ],
            "layout": {
                "visibility": "visible"
            },
            "source": "openmaptiles",
            "source-layer": "waterway"
        },
        {
            "id": "building",
            "type": "fill",
            "paint": {
                "fill-color": "rgb(222, 211, 190)",
                "fill-opacity": 0.6,
                "fill-antialias": true,
                "fill-outline-color": "rgba(195, 171, 143, 1)"
            },
            "source": "openmaptiles",
            "source-layer": "building"
        },
        {
            "id": "road_area_pier",
            "type": "fill",
            "paint": {
                "fill-color": "hsl(47, 26%, 88%)",
                "fill-opacity": 1,
                "fill-antialias": true
            },
            "filter": [
                "all",
                [
                    "==",
                    "$type",
                    "Polygon"
                ],
                [
                    "==",
                    "class",
                    "pier"
                ]
            ],
            "layout": {
                "visibility": "visible"
            },
            "source": "openmaptiles",
            "metadata": {},
            "source-layer": "transportation"
        },
        {
            "id": "road_area_bridge",
            "type": "fill",
            "paint": {
                "fill-color": "hsl(47, 26%, 88%)",
                "fill-opacity": 0.7
            },
            "filter": [
                "all",
                [
                    "==",
                    "$type",
                    "Polygon"
                ],
                [
                    "in",
                    "brunnel",
                    "bridge"
                ]
            ],
            "layout": {},
            "source": "openmaptiles",
            "source-layer": "transportation"
        },
        {
            "id": "road_pier",
            "type": "line",
            "paint": {
                "line-color": "hsl(47, 26%, 88%)",
                "line-width": 1
            },
            "filter": [
                "all",
                [
                    "in",
                    "class",
                    "pier"
                ]
            ],
            "layout": {
                "line-cap": "round",
                "line-join": "round"
            },
            "source": "openmaptiles",
            "metadata": {},
            "source-layer": "transportation"
        },
        {
            "id": "road_path",
            "type": "line",
            "paint": {
                "line-color": "hsl(0, 0%, 97%)",
                "line-width": {
                    "base": 1.55,
                    "stops": [
                        [
                            14,
                            0.5
                        ],
                        [
                            20,
                            4
                        ]
                    ]
                },
                "line-dasharray": [
                    1,
                    1
                ]
            },
            "filter": [
                "all",
                [
                    "in",
                    "class",
                    "path",
                    "track"
                ]
            ],
            "layout": {
                "line-cap": "square",
                "line-join": "bevel"
            },
            "source": "openmaptiles",
            "minzoom": 14,
            "source-layer": "transportation"
        },
        {
            "id": "road_minor",
            "type": "line",
            "paint": {
                "line-color": "hsl(0, 0%, 97%)",
                "line-width": {
                    "base": 1.55,
                    "stops": [
                        [
                            4,
                            0.25
                        ],
                        [
                            20,
                            24
                        ]
                    ]
                }
            },
            "filter": [
                "all",
                [
                    "in",
                    "class",
                    "minor",
                    "service"
                ]
            ],
            "layout": {
                "line-cap": "round",
                "line-join": "round",
                "visibility": "visible"
            },
            "source": "openmaptiles",
            "minzoom": 13,
            "source-layer": "transportation"
        },
        {
            "id": "road_tunnel",
            "type": "line",
            "paint": {
                "line-color": "#fff",
                "line-width": {
                    "base": 1.4,
                    "stops": [
                        [
                            7,
                            0.5
                        ],
                        [
                            20,
                            24
                        ]
                    ]
                },
                "line-opacity": 0.75,
                "line-dasharray": [
                    0.28,
                    0.14
                ]
            },
            "filter": [
                "all",
                [
                    "==",
                    "brunnel",
                    "tunnel"
                ],
                [
                    "in",
                    "class",
                    "primary",
                    "secondary",
                    "tertiary",
                    "trunk",
                    "minor_road"
                ]
            ],
            "layout": {
                "line-cap": "butt",
                "line-join": "miter",
                "visibility": "visible"
            },
            "source": "openmaptiles",
            "source-layer": "transportation"
        },
        {
            "id": "road_major",
            "type": "line",
            "paint": {
                "line-color": "#fff",
                "line-width": {
                    "base": 1.4,
                    "stops": [
                        [
                            7,
                            0.5
                        ],
                        [
                            20,
                            28
                        ]
                    ]
                }
            },
            "filter": [
                "all",
                [
                    "in",
                    "class",
                    "trunk",
                    "primary",
                    "secondary",
                    "tertiary"
                ],
                [
                    "!=",
                    "brunnel",
                    "tunnel"
                ],
                [
                    "!=",
                    "brunnel",
                    "bridge"
                ]
            ],
            "layout": {
                "line-cap": "round",
                "line-join": "round",
                "visibility": "visible"
            },
            "source": "openmaptiles",
            "minzoom": 7,
            "source-layer": "transportation"
        },
        {
            "id": "road_motorway",
            "type": "line",
            "paint": {
                "line-color": "hsl(0, 0%, 100%)",
                "line-width": {
                    "base": 1.4,
                    "stops": [
                        [
                            8,
                            1
                        ],
                        [
                            16,
                            10
                        ]
                    ]
                },
                "line-offset": 0
            },
            "filter": [
                "all",
                [
                    "==",
                    "class",
                    "motorway"
                ]
            ],
            "layout": {
                "line-cap": "round",
                "line-join": "round",
                "visibility": "visible"
            },
            "source": "openmaptiles",
            "minzoom": 4,
            "source-layer": "transportation"
        },
        {
            "id": "railway_transit_tunnel",
            "type": "line",
            "paint": {
                "line-color": "hsl(34, 12%, 66%)",
                "line-opacity": 0.5,
                "line-dasharray": [
                    3,
                    3
                ]
            },
            "filter": [
                "all",
                [
                    "==",
                    "brunnel",
                    "tunnel"
                ],
                [
                    "==",
                    "class",
                    "transit"
                ]
            ],
            "layout": {
                "line-cap": "butt",
                "line-join": "miter",
                "visibility": "visible"
            },
            "source": "openmaptiles",
            "minzoom": 0,
            "source-layer": "transportation"
        },
        {
            "id": "railway",
            "type": "line",
            "paint": {
                "line-color": "hsl(34, 12%, 66%)",
                "line-opacity": 0.5
            },
            "filter": [
                "==",
                "class",
                "rail"
            ],
            "layout": {
                "visibility": "visible"
            },
            "source": "openmaptiles",
            "minzoom": 11,
            "source-layer": "transportation"
        },
        {
            "id": "railway_transit",
            "type": "line",
            "paint": {
                "line-color": "hsl(34, 12%, 66%)",
                "line-opacity": 0.5
            },
            "filter": [
                "all",
                [
                    "==",
                    "class",
                    "transit"
                ],
                [
                    "!=",
                    "brunnel",
                    "tunnel"
                ]
            ],
            "layout": {
                "visibility": "visible"
            },
            "source": "openmaptiles",
            "source-layer": "transportation"
        },
        {
            "id": "aeroway_taxiway",
            "type": "line",
            "paint": {
                "line-color": "rgba(255, 255, 255, 1)",
                "line-width": 1,
                "line-opacity": 1
            },
            "filter": [
                "all",
                [
                    "in",
                    "class",
                    "taxiway"
                ]
            ],
            "layout": {
                "line-cap": "round",
                "line-join": "round",
                "visibility": "visible"
            },
            "source": "openmaptiles",
            "minzoom": 12,
            "metadata": {
                "mapbox:group": "1444849345966.4436"
            },
            "source-layer": "aeroway"
        },
        {
            "id": "aeroway_runway",
            "type": "line",
            "paint": {
                "line-color": "rgba(255, 255, 255, 1)",
                "line-width": 5,
                "line-opacity": 1
            },
            "filter": [
                "all",
                [
                    "in",
                    "class",
                    "runway"
                ]
            ],
            "layout": {
                "line-cap": "round",
                "line-join": "round",
                "visibility": "visible"
            },
            "source": "openmaptiles",
            "minzoom": 4,
            "metadata": {
                "mapbox:group": "1444849345966.4436"
            },
            "source-layer": "aeroway"
        },
        {
            "id": "bridge_waterway",
            "type": "line",
            "paint": {
                "line-color": "hsl(205, 56%, 73%)",
                "line-width": 1
            },
            "filter": [
                "all",
                [
                    "==",
                    "brunnel",
                    "bridge"
                ]
            ],
            "layout": {
                "line-cap": "round",
                "line-join": "round",
                "visibility": "none"
            },
            "source": "openmaptiles",
            "source-layer": "waterway"
        },
        {
            "id": "bridge",
            "type": "line",
            "paint": {
                "line-color": "#fff",
                "line-width": {
                    "base": 1.4,
                    "stops": [
                        [
                            7,
                            0.5
                        ],
                        [
                            20,
                            28
                        ]
                    ]
                }
            },
            "filter": [
                "all",
                [
                    "==",
                    "brunnel",
                    "bridge"
                ],
                [
                    "in",
                    "class",
                    "primary",
                    "secondary",
                    "tertiary",
                    "trunk"
                ]
            ],
            "layout": {
                "line-cap": "round",
                "line-join": "round",
                "visibility": "visible"
            },
            "source": "openmaptiles",
            "source-layer": "transportation"
        },
        {
            "id": "admin_sub",
            "type": "line",
            "paint": {
                "line-color": "hsla(0, 0%, 60%, 0.5)",
                "line-width": 1.25,
                "line-dasharray": [
                    2,
                    1
                ]
            },
            "filter": [
                "in",
                "admin_level",
                4,
                6,
                8
            ],
            "layout": {
                "visibility": "visible"
            },
            "source": "openmaptiles",
            "minzoom": 3,
            "source-layer": "boundary"
        },
        {
            "id": "admin_country",
            "type": "line",
            "paint": {
                "line-color": "rgba(162, 162, 162, 1)",
                "line-width": 1
            },
            "filter": [
                "all",
                [
                    "<=",
                    "admin_level",
                    2
                ],
                [
                    "==",
                    "$type",
                    "LineString"
                ],
                [
                    "!has",
                    "claimed_by"
                ]
            ],
            "layout": {
                "line-cap": "round",
                "line-join": "round",
                "visibility": "visible"
            },
            "source": "openmaptiles",
            "minzoom": 0,
            "source-layer": "boundary"
        },
        {
            "id": "label_airport",
            "type": "symbol",
            "paint": {
                "text-color": "#666",
                "text-halo-blur": 1,
                "text-halo-color": "rgba(255,255,255,0.75)",
                "text-halo-width": 1
            },
            "filter": [
                "all",
                [
                    "has",
                    "iata"
                ]
            ],
            "layout": {
                "icon-size": 1,
                "text-font": [
                    "Noto Sans Regular"
                ],
                "text-size": 11,
                "text-field": "{name:latin}\n{name:nonlatin}",
                "visibility": "visible",
                "text-anchor": "top",
                "text-offset": [
                    0,
                    0.5
                ],
                "text-max-width": 8
            },
            "source": "openmaptiles",
            "minzoom": 10,
            "source-layer": "aerodrome_label"
        },
        {
            "id": "label_road",
            "type": "symbol",
            "paint": {
                "text-color": "#000",
                "text-halo-color": "hsl(0, 0%, 100%)",
                "text-halo-width": 2
            },
            "filter": [
                "==",
                "$type",
                "LineString"
            ],
            "layout": {
                "text-font": [
                    "Noto Sans Regular"
                ],
                "text-size": {
                    "base": 1.4,
                    "stops": [
                        [
                            10,
                            8
                        ],
                        [
                            20,
                            14
                        ]
                    ]
                },
                "text-field": "{name:latin} {name:nonlatin}",
                "visibility": "visible",
                "text-transform": "uppercase",
                "symbol-placement": "line",
                "text-letter-spacing": 0.1,
                "text-rotation-alignment": "map"
            },
            "source": "openmaptiles",
            "minzoom": 13,
            "source-layer": "transportation_name"
        },
        {
            "id": "label_place_other",
            "type": "symbol",
            "paint": {
                "text-color": "hsl(0, 0%, 25%)",
                "text-halo-blur": 0,
                "text-halo-color": "hsl(0, 0%, 100%)",
                "text-halo-width": 2
            },
            "filter": [
                "all",
                [
                    "==",
                    "$type",
                    "Point"
                ],
                [
                    "!in",
                    "class",
                    "city",
                    "state",
                    "country",
                    "continent"
                ]
            ],
            "layout": {
                "text-font": [
                    "Noto Sans Regular"
                ],
                "text-size": {
                    "stops": [
                        [
                            6,
                            10
                        ],
                        [
                            12,
                            14
                        ]
                    ]
                },
                "text-field": "{name:latin}\n{name:nonlatin}",
                "visibility": "visible",
                "text-anchor": "center",
                "text-max-width": 6
            },
            "source": "openmaptiles",
            "minzoom": 8,
            "source-layer": "place"
        },
        {
            "id": "label_place_city",
            "type": "symbol",
            "paint": {
                "text-color": "hsl(0, 0%, 0%)",
                "text-halo-blur": 0,
                "text-halo-color": "hsla(0, 0%, 100%, 0.75)",
                "text-halo-width": 2
            },
            "filter": [
                "all",
                [
                    "==",
                    "$type",
                    "Point"
                ],
                [
                    "==",
                    "class",
                    "city"
                ]
            ],
            "layout": {
                "text-font": [
                    "Noto Sans Regular"
                ],
                "text-size": {
                    "stops": [
                        [
                            3,
                            11
                        ],
                        [
                            8,
                            16
                        ]
                    ]
                },
                "text-field": "{name:latin}\n{name:nonlatin}",
                "text-max-width": 10
            },
            "source": "openmaptiles",
            "maxzoom": 16,
            "source-layer": "place"
        },
        {
            "id": "label_country_other",
            "type": "symbol",
            "paint": {
                "text-color": "hsl(0, 0%, 13%)",
                "text-halo-blur": 0,
                "text-halo-color": "rgba(255,255,255,0.75)",
                "text-halo-width": 2
            },
            "filter": [
                "all",
                [
                    "==",
                    "$type",
                    "Point"
                ],
                [
                    "==",
                    "class",
                    "country"
                ],
                [
                    "!has",
                    "iso_a2"
                ]
            ],
            "layout": {
                "text-font": [
                    "Noto Sans Regular"
                ],
                "text-size": {
                    "stops": [
                        [
                            3,
                            12
                        ],
                        [
                            8,
                            22
                        ]
                    ]
                },
                "text-field": "{name:latin}",
                "visibility": "visible",
                "text-max-width": 10
            },
            "source": "openmaptiles",
            "maxzoom": 12,
            "source-layer": "place"
        },
        {
            "id": "label_country",
            "type": "symbol",
            "paint": {
                "text-color": "hsl(0, 0%, 13%)",
                "text-halo-blur": 0,
                "text-halo-color": "rgba(255,255,255,0.75)",
                "text-halo-width": 2
            },
            "filter": [
                "all",
                [
                    "==",
                    "$type",
                    "Point"
                ],
                [
                    "==",
                    "class",
                    "country"
                ],
                [
                    "has",
                    "iso_a2"
                ]
            ],
            "layout": {
                "text-font": [
                    "Noto Sans Bold"
                ],
                "text-size": {
                    "stops": [
                        [
                            3,
                            12
                        ],
                        [
                            8,
                            22
                        ]
                    ]
                },
                "text-field": "{name:latin}",
                "visibility": "visible",
                "text-max-width": 10
            },
            "source": "openmaptiles",
            "maxzoom": 12,
            "source-layer": "place"
        }
    ],
    "bearing": 0,
    "sources": {
        "openmaptiles": {
            "url": "https://api.maptiler.com/tiles/v3/tiles.json?key=kznYvrAC6DrOZXPCW05C",
            "type": "vector"
        },
        "maptiler_attribution": {
            "type": "vector",
            "attribution": "<a href=\"https://www.maptiler.com/copyright/\" target=\"_blank\">&copy; MapTiler</a> <a href=\"https://www.openstreetmap.org/copyright\" target=\"_blank\">&copy; OpenStreetMap contributors</a>"
        }
    },
    "version": 8,
    "metadata": {
        "maptiler:copyright": "This style was generated on MapTiler Cloud. Usage outside of MapTiler Cloud requires valid OpenMapTiles Production Package: https://openmaptiles.com/production-package/ -- please contact us.",
        "openmaptiles:version": "3.x"
    }
}

// DeckGL react component
export default function DeckMap({ initialViewState, data, mapStyle }) {
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
