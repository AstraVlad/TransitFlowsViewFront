import React, { useState } from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";

export default function ZeroFlows({ zeroFlows }) {
    const [selectedRow, setSelectedRow] = useState(-1)

    const processTableClick = (_, route, index) => {
        if (index == selectedRow) {
            setSelectedRow(-1)
        } else {
            setSelectedRow(index)
        }
        /*signalSelected({
            rname: route.rname_full,
            direction: route.direction,
            nextStop: route.stop_to,
        })*/
    }
    return (
        <TableContainer sx={{ maxWidth: '47vw', minWidth: 400, maxHeight: 500, m: 1 }}>
            <Table size="small" >
                <TableHead >
                    <TableRow>
                        <TableCell sx={{ fontWeight: 'bold' }}>Маршрут</TableCell>
                        <TableCell sx={{ fontWeight: 'bold' }}>Направление</TableCell>
                        <TableCell sx={{ fontWeight: 'bold' }}>Перегон</TableCell>
                        <TableCell sx={{ fontWeight: 'bold' }}>ID фрагмента маршрута</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {zeroFlows.map((elem, index) => {
                        return (<TableRow key={index}
                            onClick={(e) => processTableClick(e, elem, index)}
                            hover
                            selected={selectedRow == index}
                            sx={{ cursor: 'pointer' }}
                        >
                            <TableCell>{elem.rname_full}</TableCell>
                            <TableCell sx={{ textAlign: 'center' }}>{elem.direction}</TableCell>
                            <TableCell>{elem.stop_from} - {elem.stop_to}</TableCell>
                            <TableCell sx={{ textAlign: 'center' }}>{elem.legid}</TableCell>
                        </TableRow>)
                    }
                    )}
                </TableBody>
            </Table>
        </TableContainer>
    )
}