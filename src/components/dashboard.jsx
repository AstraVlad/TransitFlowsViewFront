
import Summary from './analytics/summary';
import { Box, Paper, Tab, Tabs } from '@mui/material'
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

import AllRoutes from './analytics/allroutes';
import DataPortChart from './ui/dataportchart';


//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
export default function TFDasboard() {
    const { selectedFile, setSelectedFile } = useContext(DataContext)
    const [selectedRoute, setSelectedRoute] = useState('')
    const [selectedStop, setSelectedStop] = useState('')
    const [tabsValue, setTabsValue] = useState(0);
    const stopsAsMap = useRef(0)

    const { data, isError, isLoading } = getSingleProject(selectedFile)

    const handleTabsChange = (event, newValue) => {
        setTabsValue(newValue);
        //console.log(newValue)
    };

    const switchSelectedRoute = (selection) => {
        if (JSON.stringify(selection) == JSON.stringify(selectedRoute)) {
            setSelectedRoute('')
        } else {
            setSelectedRoute(selection)
        }
        setSelectedStop('')
    }

    const switchSelectedStop = (selection) => {
        if (selectedStop === selection) {
            setSelectedStop('')
        } else {
            setSelectedStop(selection)
        }
    }

    const getSelectedFromMissingStops = (selection) => {
        if (selectedRoute != '' && selectedStop != '' && selection.route.rname_full !== selectedRoute.rname_full && selection.stop === selectedStop) {
            switchSelectedRoute(selection.route)
        } else if (selectedRoute != '' && selectedStop != '' && selection.route.rname_full === selectedRoute.rname_full && selection.stop !== selectedStop) {
            switchSelectedStop(selection.stop)
        } else {
            switchSelectedRoute(selection.route)
            switchSelectedStop(selection.stop)
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
                <Paper elevation={2} sx={{ maxHeight: 400, paddingLeft: 2, boxSizing: 'border-box' }}>
                    <Summary data={data.summary} />
                </Paper>
                <Grid container spacing={2} sx={{ boxSizing: 'border-box', marginTop: 1 }}>
                    <Grid item sm={12} md={5} >
                        <Paper
                            elevation={2}
                            sx={{
                                boxSizing: 'border-box',
                                paddingLeft: 1,
                                paddingRight: 1,
                                paddingBottom: 1,
                            }}>

                            <Tabs value={tabsValue} color='primary' onChange={handleTabsChange} centered>
                                <Tab label='Просмотр реестра маршрутов' />
                                <Tab label='Просмотр найденных ошибок' />
                            </Tabs>
                            {tabsValue ? <TFErrorsAndWarnings data={data} signalSelected={getSelectedFromMissingStops} stopsAsMap={stopsAsMap.current} /> : <AllRoutes
                                data={data.registry}
                                stopsAsMap={stopsAsMap.current}
                                selectedRoute={selectedRoute}
                                raiseSelectedRoute={switchSelectedRoute}
                            />}

                        </Paper>
                    </Grid>
                    <Grid item sm={12} md={7}>
                        <Paper elevation={2} sx={{ boxSizing: 'border-box', paddingLeft: 1, paddingTop: 1 }}>
                            <h1 style={{ marginLeftLeft: 5 }}>Интерактивная карта</h1>
                            <DeckGLMap
                                data={data}
                                stopsAsMap={stopsAsMap.current}
                                selectedRoute={selectedRoute}
                                selectedStops={[selectedStop]}
                                vtypes={data.summary.map(elem => elem.vtype)}
                            />
                        </Paper>
                    </Grid>
                </Grid>
                <br />
                <Paper elevation={2}>
                    <MaximumsPerRoutes data={data.maximums} />
                </Paper>

            </div>
        )
    }
}

/*
<RoutesMap stops={data.stops}
    routes={data.registry}
    highlightObjects={selectedRoute} />

 <br />
                <DataPortChart
                    data={[
                        {
                            vtype: 'Тм',
                            costs: 1710,
                            passengers: 47019
                        },
                        {
                            vtype: 'Тб',
                            costs: 2073,
                            passengers: 62580
                        },
                        {
                            vtype: 'Ав',
                            costs: 6111,
                            passengers: 91935
                        },
                    ]}
                    intenalRadius={20}
                    maxExternalRadius={250}
                    getWidth={(d) => d.costs}
                    getArea={(d) => d.passengers}
                    gap={0}
                    getColor={['#FF0033 ', '#00CCFF', '#99FF00', '#FBC02D']}
                    rotate={270}
                    strokeWidth={2}
                    label={((d) => d.vtype)}
                />
*/