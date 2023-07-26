
import Summary from './analytics/summary';
import { Box, Paper } from '@mui/material'
import RoutesOverlap from './analytics/routesoverlap';
import StopsClusters from './analytics/stopsclusters';
import MaximumsPerRoutes from './analytics/maximums';
import { getSingleProject } from "../utils/getdata";
import { DataContext } from '../contexts/DataContext';
import { useContext } from 'react';
import Grid from '@mui/material/Grid';
import RoutesMap from './routesmap';
import TFErrorsAndWarnings from './analytics/tferrorsandwarnings';
import { useState } from 'react';
import { useEffect } from 'react';


export default function TFDasboard() {
    const selectedFile = useContext(DataContext)
    const [selectedRoute, setSelectedRoute] = useState('')

    const { data, isError, isLoading } = getSingleProject(selectedFile)
    //const isLoading = false

    const switchSelectedRoute = (selection) => {
        if (JSON.stringify(selection) == JSON.stringify(selectedRoute)) {
            setSelectedRoute('')
        } else {
            setSelectedRoute(selection)
        }
    }

    useEffect(() => {
        //console.log('Selected Route:', selectedRoute)
    }, [selectedRoute])

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
        return (
            <div>
                <Paper elevation={2}>
                    <h1>Общая информация</h1>
                    <Summary data={data.summary} />
                </Paper>
                <Grid container spacing={1}>
                    <Grid item sm={12} md={6} >
                        <Paper elevation={2}>
                            <TFErrorsAndWarnings data={data.errors} signalSelected={switchSelectedRoute} />
                        </Paper>

                    </Grid>
                    <Grid item sm={12} md={6}>
                        <Paper elevation={2}>
                            <RoutesMap stops={data.stops}
                                routes={data.registry}
                                highlightObjects={selectedRoute} />
                        </Paper>
                    </Grid>
                </Grid>
                <Paper elevation={2}>
                    <MaximumsPerRoutes data={data.maximums} />
                </Paper>

                <RoutesOverlap ></RoutesOverlap>
                <StopsClusters />
                <br />
            </div>
        )
    }
}