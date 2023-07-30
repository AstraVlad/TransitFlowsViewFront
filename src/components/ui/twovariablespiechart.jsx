
import PieSector from "./piesector";

export default function TwoVariablesPieChart({ data, intenalRadius, maxExternalRadius, getWidth, getHeight, getColor, gap, rotate, label, strokeWidth = 1 }) {
    const widthData = data.map((elem) => getWidth(elem))
    const heightData = data.map((elem) => getHeight(elem))

    let colors
    if (Array.isArray(getColor) && getColor.length >= data.length) {
        colors = getColor
    }

    const totalWidth = widthData.reduce((prev, curr) => prev + curr, 0)
    const maxHeight = heightData.reduce((prev, curr) => prev > curr ? prev : curr)

    const circleMinusGaps = 360 - (gap ? gap : 0) * (data.length)

    const angles = widthData.map((elem) => circleMinusGaps * elem / totalWidth)
    const radiuses = heightData.map((elem) => intenalRadius + (maxExternalRadius - intenalRadius) * elem / maxHeight)

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

/*
{data.map((elem, index) => {
                <PieSector
                    key={index}
                    center={{ x: 250, y: 250 }}
                    insideRadius={intenalRadius}
                    outsideRadius={radiuses[index]}
                    startAngle={anglesPairs[index][0]}
                    endAngle={anglesPairs[index][1]}
                    fill='green'
                    stroke='green'
                    strokeWidth={1}
                />
            })}

            <PieSector

                center={{ x: 250, y: 250 }}
                insideRadius={10}
                outsideRadius={50}
                startAngle={0}
                endAngle={80}
                fill='green'
                stroke='green'
                strokeWidth={1}
            />
            */