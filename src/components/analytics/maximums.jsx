import { Box } from "@mui/material";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, LabelList, Brush } from 'recharts';
import { useState } from "react";

const tModesColors = new Map()
tModesColors.set('Тм', '#FF0000')
tModesColors.set('Ав', '#50F78F')
tModesColors.set('Тб', '#00A0FF')

const renderCustomizedLabel = (props) => {
    const { x, y, width, height, value } = props;
    //const radius = 10;

    return <text
        x={x + width / 2}
        y={y} dy={-4}
        fill='#000000'
        fontSize={14}
        fontWeight={800}
        textAnchor="middle">
        {value.toLocaleString(undefined, { maximumFractionDigits: 1 })}
    </text>

};

export default function MaximumsPerRoutes({ data }) {
    const maxRoutesWithLabels = 30
    const defaultRoutesForMaxGraph = 30

    const [routesToShow, setRoutesToShow] = useState(defaultRoutesForMaxGraph);
    /*
        const routesAmountChange = (event, newValue) => {
            setRoutesToShow(newValue);
        };
    */
    const handleClick = (e, index) => {
        console.log(e.stop_from, e.stop_to)
    }
    //console.log(data)
    return (
        <Box sx={{ width: '100%', height: "100%", ml: 2, paddingTop: 1 }}>
            <h3>Максимальные пассажиропотоки по маршрутам</h3>
            {/*<Slider
                aria-label="Количество маршрутов"
                value={routesToShow}
                valueLabelDisplay="auto"
                step={1}
                marks
                min={10}
                max={data.length}
                onChange={routesAmountChange}
    />*/}
            <ResponsiveContainer height={500}>
                <BarChart data={data}>
                    <XAxis dataKey="rname_full" />
                    <YAxis />
                    <Tooltip />
                    <Brush dataKey="rname_full" height={30} stroke="blue" endIndex={defaultRoutesForMaxGraph} />
                    <Bar dataKey="flow" onClick={(e, index) => handleClick(e, index)}>
                        {routesToShow > maxRoutesWithLabels ? null : <LabelList dataKey='flow' content={renderCustomizedLabel} />}
                        {
                            data.map((entry, index) =>
                                <Cell key={`bar-${index}`} fill={tModesColors.get(entry.vtype)} fillOpacity={0.9} />
                            )
                        }
                    </Bar>
                </BarChart>
            </ResponsiveContainer>
        </Box>
    )
}