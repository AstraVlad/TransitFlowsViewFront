
import Summary from './analytics/summary';
import { Box, Paper, Typography } from '@mui/material'
//import RoutesOverlap from './analytics/routesoverlap';
//import StopsClusters from './analytics/stopsclusters';
import MaximumsPerRoutes from './analytics/maximums';
import { getSingleProject } from "../utils/getdata";
import { DataContext } from '../contexts/DataContext';
import { useContext, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import TFErrorsAndWarnings from './analytics/tferrorsandwarnings';
import { useState } from 'react';
import { useRef } from 'react';
import DeckGLMap from './deckglmap';


//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
export default function TFDasboard() {
    const { selectedFile, setSelectedFile } = useContext(DataContext)
    const [selectedRoute, setSelectedRoute] = useState('')
    const stopsAsMap = useRef(0)

    const { data, isError, isLoading } = getSingleProject(selectedFile)

    const switchSelectedRoute = (selection) => {
        if (JSON.stringify(selection) == JSON.stringify(selectedRoute)) {
            setSelectedRoute('')
        } else {
            setSelectedRoute(selection)
        }
    }

    if (isLoading) {
        return (
            <Box borderColor='red'>
                <p>Загружаю данные</p>
            </Box>
        )
    } else if (isError) {
        console.log(isError)
        return (
            <Box sx={{
                backgroundColor: 'red',
                color: 'white',
                textAlign: 'center'
            }}>
                <p>Сервер не вернул данные</p>
            </Box>
        )
    } else if (!data) {
        return (
            <Box sx={{
                backgroundColor: 'blue',
                color: 'white',
                textAlign: 'center',
            }}>
                <p>Сервер вернул пустой ответ</p>
            </Box>
        )
    }
    else {
        stopsAsMap.current = new Map(data.stops.map((stop) => [stop.id, stop]))
        return (
            <div>
                <Paper elevation={2}>
                    <h1>Общая информация</h1>
                    <Summary data={data.summary} />
                </Paper>
                <Grid container spacing={2}>
                    <Grid item sm={12} md={4} >
                        <Paper elevation={2}>
                            <TFErrorsAndWarnings data={data.errors} signalSelected={switchSelectedRoute} />
                        </Paper>
                    </Grid>
                    <Grid item sm={12} md={7}>
                        <Paper elevation={2} >
                            <h1 style={{ marginLeft: 5 }}>Интерактивная карта</h1>
                            <DeckGLMap objects={data}
                                stopsAsMap={stopsAsMap.current}
                            />
                        </Paper>
                    </Grid>
                </Grid>
                <Paper elevation={2}>
                    <MaximumsPerRoutes data={data.maximums} />
                </Paper>
                <br />
            </div>
        )
    }
}

/*
<RoutesMap stops={data.stops}
    routes={data.registry}
    highlightObjects={selectedRoute} />
*/