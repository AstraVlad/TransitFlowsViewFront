//import React from "react";
const RADIAN = Math.PI / 180;

export default function PieSector({ center, insideRadius, outsideRadius, startAngle, endAngle, fill, stroke, strokeWidth, label }) {

    //console.log(startAngle, endAngle)

    const internalStartPointX = center.x + insideRadius * Math.cos(startAngle * RADIAN);
    const internalStartPointY = center.y + insideRadius * Math.sin(startAngle * RADIAN);

    const internalEndPointX = center.x + insideRadius * Math.cos(endAngle * RADIAN);
    const internalEndPointY = center.y + insideRadius * Math.sin(endAngle * RADIAN);

    const externalStartPointX = center.x + outsideRadius * Math.cos(startAngle * RADIAN);
    const externalStartPointY = center.y + outsideRadius * Math.sin(startAngle * RADIAN);

    const externalEndPointX = center.x + outsideRadius * Math.cos(endAngle * RADIAN);
    const externalEndPointY = center.y + outsideRadius * Math.sin(endAngle * RADIAN);

    const largeArcFlag = (endAngle - startAngle) > 180 ? 1 : 0
    //const largeArcFlagExternal

    const sweepFlagInternal = startAngle > endAngle ? 0 : 1
    const sweepFlagExternal = sweepFlagInternal ? 0 : 1

    const d = `M ${internalStartPointX} ${internalStartPointY} ` +
        `A ${insideRadius} ${insideRadius} 0 ${largeArcFlag} ${sweepFlagInternal} ${internalEndPointX} ${internalEndPointY} ` +
        `L ${externalEndPointX} ${externalEndPointY} ` +
        `A ${outsideRadius} ${outsideRadius} 0 ${largeArcFlag} ${sweepFlagExternal} ${externalStartPointX} ${externalStartPointY} ` +
        `Z`

    //console.log(label, d)

    return (
        <path
            d={d}
            fill={fill} stroke={stroke} stroke-width={strokeWidth}
        />
    )
}