//import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import React from "react";
//import { useState } from "react";
import MissingStops from "./missingstops";
import ZeroFlows from "./zeroflows";
//import { Button } from "@mui/material";
import Divider from "@mui/material/Divider";
//import { useState } from "react";

export default function TFErrorsAndWarnings({ data, stopsAsMap, signalSelected }) {
    return (
        <div style={{ marginLeft: 5, minWidth: 450, maxWidth: '90%' }}>
            <h1>Ошибки и предупреждения</h1>
            <h2 style={{ color: data.errors.missing_stops.length > 0 ? 'red' : 'green' }}>
                Нет данных об остановках отправления: {data.errors.missing_stops.length} строк
            </h2>
            <MissingStops
                missingStops={data.errors.missing_stops}
                signalSelected={signalSelected}
                registry={data.registry}
            />

            <Divider variant="middle" />
            <h2 style={{ color: data.errors.duplicate_routes.length > 0 ? 'red' : 'green' }}>
                Дублирование номеров маршрутов {data.errors.duplicate_routes.length > 0 ? data.errors.duplicate_routes.length : 'отсутствует'}
            </h2>
            <Divider variant="middle" />
            <h2 style={{ color: data.errors.zero_flows.length > 0 ? 'red' : 'green' }}>
                Перегонов с нулевыми пассажиропотоками за день: {data.errors.zero_flows.length}
            </h2>
            <ZeroFlows zeroFlows={data.errors.zero_flows} stopsAsMap={stopsAsMap} />
            <br />
        </div>
    )
}