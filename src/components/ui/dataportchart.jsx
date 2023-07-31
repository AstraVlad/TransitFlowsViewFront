
import PieSector from "./piesector";

const calculateRadiuses = (angles, areas, deltaR, maxExternalRadius) => {
    const totalArea = Math.PI * (1 - Math.pow(deltaR, 2))
    const sumAreas = areas.reduce((prev, curr) => prev + curr, 0)

    const normalizedAreas = areas.map((elem) => totalArea * elem / sumAreas)
    const normalizedRadiuses = normalizedAreas.map((elem, index) => Math.sqrt((elem * 360 / (Math.PI * angles[index]) + Math.pow(deltaR, 2))))
    const maxRadius = normalizedRadiuses.reduce((prev, curr) => prev > curr ? prev : curr)
    const realRadiuses = normalizedRadiuses.map((radius) => radius * maxExternalRadius / maxRadius)
    return realRadiuses
}

export default function DataPortChart({ data, intenalRadius, maxExternalRadius, getWidth, getArea, getColor, gap, rotate, label, strokeWidth = 1 }) {
    const widthData = data.map((elem) => getWidth(elem))
    const areas = data.map((elem) => getArea(elem))
    const deltaR = intenalRadius / maxExternalRadius

    let colors
    if (Array.isArray(getColor) && getColor.length >= data.length) {
        colors = getColor
    } else if (typeof getColor === 'function') {
        colors = data.map((elem) => getColor(elem))
    } else {
        throw new Error('No valid colors data provided')
    }

    const circleMinusGaps = 360 - (gap ? gap : 0) * (data.length)
    const totalWidth = widthData.reduce((prev, curr) => prev + curr, 0)
    const angles = widthData.map((elem) => circleMinusGaps * elem / totalWidth)

    // const maxHeight = heightData.reduce((prev, curr) => prev > curr ? prev : curr)


    const radiuses = calculateRadiuses(angles, areas, deltaR, maxExternalRadius)

    let angle_sum = rotate ? rotate : 0
    const anglesPairs = []

    for (const angle of angles) {
        anglesPairs.push([angle_sum, angle_sum + angle])
        angle_sum = angle_sum + angle + (gap ? gap : 0)
    }

    return (
        <svg width="500" height="500"
            xmlns="http://www.w3.org/2000/svg">

            {data.map((elem, index) =>
                <PieSector
                    key={index}
                    center={{ x: 250, y: 250 }}
                    insideRadius={intenalRadius}
                    outsideRadius={radiuses[index]}
                    startAngle={anglesPairs[index][0]}
                    endAngle={anglesPairs[index][1]}
                    fill={colors ? colors[index] : 'blue'}
                    stroke='white'
                    strokeWidth={strokeWidth}
                    label={label(data[index])}
                />
            )}


        </svg>
    )

}