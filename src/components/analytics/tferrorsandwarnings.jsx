//import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import React from "react";
//import { useState } from "react";
import MissingStops from "./missingstops";
import ZeroFlows from "./zeroflows";
import { Button } from "@mui/material";
import Divider from "@mui/material/Divider";
import { useState } from "react";

export default function TFErrorsAndWarnings({ data, signalSelected, switchZeroFlows }) {
    const [zeroFlowsShown, setZeroFlowsShown] = useState(false)

    return (
        <div style={{ marginLeft: 5 }}>
            <h1>Ошибки и предупреждения</h1>
            <h2 style={{ color: data.missing_stops.length > 0 ? 'red' : 'green' }}>
                Нет данных об остановках отправления: {data.missing_stops.length} строк
            </h2>
            <MissingStops missingStops={data.missing_stops} signalSelected={signalSelected} />

            <Divider variant="middle" />
            <h2 style={{ color: data.duplicate_routes.length > 0 ? 'red' : 'green' }}>
                Дублирование номеров маршрутов {data.duplicate_routes.length > 0 ? data.duplicate_routes.length : 'отсутствует'}
            </h2>
            <Divider variant="middle" />
            <h2 style={{ color: data.zero_flows.length > 0 ? 'red' : 'green' }}>
                Перегонов с нулевыми пассажиропотоками за день: {data.zero_flows.length}
                <Button color={zeroFlowsShown ? "secondary" : 'primary'}
                    variant={zeroFlowsShown ? 'outlined' : "text"}
                    onClick={() => {
                        setZeroFlowsShown(!zeroFlowsShown)
                        switchZeroFlows()
                    }}
                    sx={{ ml: 2 }}>
                    {zeroFlowsShown ? 'Убрать с карты' : 'Показать на карте'}
                </Button>
            </h2>
            <ZeroFlows zeroFlows={data.zero_flows} />
            <br />
        </div>
    )
}