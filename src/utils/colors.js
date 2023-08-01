const mapColors = {
    stops: {
        normal: [188, 0, 249],
        higlighted: [255, 0, 0],
        muted: [213, 172, 200]
    },
    routes: {
        'Ав': {
            normal: [23, 198, 53],
            higlighted: [0, 181, 15],
            muted: [177, 215, 184, 150],
            graph: '#50F78F',
            text: 'lightgreen'
        },
        'Тб': {
            normal: [0, 77, 255],
            higlighted: [0, 253, 255],
            muted: [149, 207, 239, 150],
            graph: '#00A0FF',
            text: 'lightblue'
        },
        'Тм': {
            normal: [213, 25, 28],
            higlighted: [255, 0, 0],
            muted: [249, 183, 183, 150],
            graph: '#FF0000',
            text: '#F5A0A0'
        },

    }
}

export const darkenColor = (color, delta = 100) =>
    color.map((element) =>
        element >= delta ? element - delta : 0
    )

export default mapColors
