import { useMemo, useState } from "react";
import { Box } from "@mui/material";
import { MaterialReactTable } from 'material-react-table'
import sortRoutes from "../../utils/sortroutes";

export default function AllRoutes({ data, stopsAsMap, raiseSelectedRoute }) {
    const [selectedRow, setSelectedRow] = useState(0)
    const sortedData = sortRoutes(data, (e) => e.rname)

    const columns = useMemo(
        () => [
            {
                accessorKey: 'vtype', //access nested data with dot notation
                header: 'Вид',
                size: 50,
            },
            {
                accessorKey: 'rname', //access nested data with dot notation
                header: 'Номер',
                size: 80,
                enableGrouping: false, //do not let this column be grouped
            },
            {
                accessorFn: (row) => (row.stop_from === 0 ? '?' : stopsAsMap.get(row.stop_from).name) + '->' + (row.stop_to === 0 ? '?' : stopsAsMap.get(row.stop_to).name),
                header: 'Маршрут',
                size: 120,
                enableGrouping: false,
            },

            {
                accessorFn: (row) => row.length.toLocaleString(undefined, { maximumFractionDigits: 1 }),
                header: 'Длина',
                size: 100,
                enableGrouping: false, //do not let this column be grouped
            },
            {
                accessorFn: (row) => row.speed.toLocaleString(undefined, { maximumFractionDigits: 1 }),
                header: 'Скорость',
                size: 100,
                enableGrouping: false, //do not let this column be grouped
            },
        ],
        [],
    );

    return (
        <Box sx={{ width: '98%', paddingLeft: 1 }}>
            <h3>Реестр маршрутов</h3>
            <MaterialReactTable
                enableGrouping
                columns={columns}
                data={sortedData}
                enablePagination={false}

                initialState={{
                    density: 'compact',
                    expanded: true, //expand all groups by default
                    grouping: ['vtype'], //an array of columns to group by by default (can be multiple)
                    sorting: [{ id: 'vtype', desc: true }], //sort by state by default
                }}
                muiTableContainerProps={{
                    sx: { maxHeight: '600px', maxWidth: '100%' }, //give the tab
                }}
                muiTableBodyRowProps={({ row }) => ({
                    onClick: (event) => {
                        setSelectedRow(row.id == selectedRow ? 0 : row.id)
                        raiseSelectedRoute(sortedData[row.id]);
                    },
                    style: { backgroundColor: row.id === selectedRow ? '#FFFFCC' : 'white' },
                    sx: {
                        cursor: 'pointer', //you might want to change the cursor too when adding an onClick
                    },
                })}
            />
        </Box>
    )
}