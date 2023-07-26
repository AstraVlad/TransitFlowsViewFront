//import { Box } from "@mui/material";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { useState } from "react";


export default function Summary({ data }) {
    const [selectedRow, setSelectedRow] = useState(-1)
    return (
        <TableContainer sx={{ width: '47%', minWidth: 400, maxHeight: 500, m: 1 }}>
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
                            sx={{ cursor: 'pointer' }}
                        >
                            <TableCell sx={{ textAlign: 'center' }}>{(index + 1).toLocaleString()}</TableCell>
                            <TableCell sx={{ textAlign: 'center' }}>{elem.vtype}</TableCell>
                            <TableCell sx={{ textAlign: 'center' }}>{elem.rname_full}</TableCell>
                            <TableCell sx={{ textAlign: 'center' }}>
                                {(elem.length / 1000).toLocaleString(undefined, { maximumFractionDigits: 2 })}
                            </TableCell>
                            <TableCell sx={{ textAlign: 'center' }}>
                                {elem.in.toLocaleString(undefined, { maximumFractionDigits: 2 })}
                            </TableCell>
                        </TableRow>)
                    }
                    )}
                </TableBody>
            </Table>
        </TableContainer>
    )
}