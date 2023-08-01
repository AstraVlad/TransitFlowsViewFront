import React from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";

export default function ZeroFlows({ zeroFlows, stopsAsMap }) {

    return (
        <TableContainer sx={{ maxWidth: '47vw', minWidth: 400, height: 350, m: 1 }}>
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
                            hover
                        >
                            <TableCell>{elem.rname_full}</TableCell>
                            <TableCell sx={{ textAlign: 'center' }}>{elem.direction}</TableCell>
                            <TableCell>{stopsAsMap.get(elem.stop_from).name} - {stopsAsMap.get(elem.stop_to).name}</TableCell>
                            <TableCell sx={{ textAlign: 'center' }}>{elem.legid}</TableCell>
                        </TableRow>)
                    }
                    )}
                </TableBody>
            </Table>
        </TableContainer>
    )
}