//import { Box } from "@mui/material";
import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { useState } from "react";
import { PieChart, Pie, Cell, Label, ResponsiveContainer } from "recharts";
import mapColors from "../../utils/colors";
import tramIcon from '../../assets/icons/tram.jpg'
import trollIcon from '../../assets/icons/troll.jpg'
import busIcon from '../../assets/icons/bus.jpg'
//import TwoVariablesPieChart from "../ui/twovariablespiechart";
//import DataPortChart from "../ui/dataportchart";

const vtypeIcons = {
    'Ав': busIcon,
    'Тб': trollIcon,
    'Тм': tramIcon
}
const RADIAN = Math.PI / 180;
const NUMBER_LOCALE_SETTINGS = [undefined, { maximumFractionDigits: 1 }]

export default function Summary({ data }) {
    const [selectedRow, setSelectedRow] = useState(-1)

    const renderPieLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
        const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
        const x = cx + radius * Math.cos(-midAngle * RADIAN);
        const y = cy + radius * Math.sin(-midAngle * RADIAN);

        return (
            <text x={x} y={y}
                fill="white"
                textAnchor={x > cx ? 'start' : 'end'}
                dominantBaseline="central"
                fontSize='1.2em'
                fontWeight={700}
            >{`${(percent * 100).toFixed(0)}%`}
            </text>
        );
    };
    //console.log(data)
    return (
        <Box display='flex' flexDirection='row' justifyContent='center'>
            <Box sx={{ width: '47%', minWidth: 400, maxHeight: 500 }}>
                <h1>Общая информация</h1>
                <TableContainer >
                    <Table size="small" >
                        <TableHead >
                            <TableRow>
                                <TableCell sx={{ fontWeight: 'bold', textAlign: 'center' }}>№ п/п</TableCell>
                                <TableCell sx={{ fontWeight: 'bold', textAlign: 'center' }}>Вид транспорта</TableCell>
                                <TableCell sx={{ fontWeight: 'bold', textAlign: 'center' }}>Количество маршрутов</TableCell>
                                <TableCell sx={{ fontWeight: 'bold', textAlign: 'center' }}>Протяжённость маршрутов, км</TableCell>
                                <TableCell sx={{ fontWeight: 'bold', textAlign: 'center' }}>Дневной пассажиропоток, чел</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {data.map((elem, index) => {
                                return (<TableRow key={index}
                                    onClick={(e) => console.log(index)}
                                    hover
                                    selected={selectedRow == index}
                                    sx={{ cursor: 'pointer', }}
                                    style={{ backgroundColor: mapColors.routes[elem.vtype].text }}
                                >
                                    <TableCell sx={{ textAlign: 'center', fontWeight: 700 }}>
                                        {(index + 1).toLocaleString()}
                                    </TableCell>
                                    <TableCell sx={{ textAlign: 'center', fontWeight: 700 }}>
                                        <img src={vtypeIcons[elem.vtype]} width={35} />
                                    </TableCell>
                                    <TableCell sx={{ textAlign: 'center', fontWeight: 700 }}>{elem.rname_full}</TableCell>
                                    <TableCell sx={{ textAlign: 'center', fontWeight: 700 }}>
                                        {(elem.length / 1000).toLocaleString(undefined, { maximumFractionDigits: 2 })}
                                    </TableCell>
                                    <TableCell sx={{ textAlign: 'center', fontWeight: 700 }}>
                                        {elem.in.toLocaleString(undefined, { maximumFractionDigits: 2 })}
                                    </TableCell>
                                </TableRow>)
                            }
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
            <Box width='50%' sx={{ textAlign: 'center' }}>
                <h2>Доля пассажиропотока по видам транспорта</h2>
                <ResponsiveContainer width='100%' height={200} >
                    <PieChart
                        width={300}
                        height={200}
                    >
                        <Pie data={data}
                            dataKey='in'
                            cx="50%"
                            cy="50%"
                            outerRadius={100}
                            labelLine={false}
                            label={renderPieLabel}
                        >
                            {data.map((elem, index) => {
                                return (
                                    <Cell key={`${index}`} fill={mapColors.routes[elem.vtype].graph} />
                                )
                            })}
                        </Pie>
                    </PieChart>
                </ResponsiveContainer>
                <br />
            </Box>
        </Box >
    )
}

/*
<ResponsiveContainer width='100%' height={200} >
                    

                <DataPortChart
                    data={data}
                    intenalRadius={20}
                    maxExternalRadius={250}
                    getWidth={(d) => d.rname_full}
                    getArea={(d) => d.in}
                    gap={0}
                    getColor={['green', 'red', 'blue', '#FBC02D']}
                    rotate={0}
                    strokeWidth={2}
                    label={((d) => d.vtype)}
                />
*/