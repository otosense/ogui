import React, { lazy } from 'react';
import PreviewIcon from '@mui/icons-material/Preview';
import GridViewIcon from '@mui/icons-material/GridView';
import PolylineIcon from '@mui/icons-material/Polyline';
import InsertChartIcon from '@mui/icons-material/InsertChart';
import { Box, Typography } from '@mui/material';

// const DataTable = lazy(() => import('../../components/DataTable/components/TableConfigs'));
const Charts = lazy(() => import('../../components/DataVisualizer/components/Charts'));
// const StoreView = lazy(() => import('../../components/StoreViewer/components/StoreView'));
// const DnDFlow = lazy(() => import('../../components/DAG/Components/DragandDrop/Dagger'));
const DnDFlow = lazy(() => import('@otosense/ogui/src/DAGv1/Components/DragandDrop/Dagger'));
const StoreView = lazy(() => import('@otosense/ogui/src/StoreViewer/Pages/StoreView'));
const InfiniteScroll = lazy(() => import('@otosense/ogui/src/DataTable/pages/InfiniteScroll'));


const configuration2 = {
    apiHandler: {
        endPoint: 'http://20.219.8.178:8080/get_all_sessions', // API endpoint
        fetchSize: 100,  // Fetch Data count
        dataKey: 'get_all_sessions' // Mandatory Unique identifier key for the api response to get data, Based on the Key we get value Also to store column in local storage.
    },
    globalConfig: {
        // enablePinning: false,
        // enableRowSelection: false,
        // enableMultiRowSelection: false,
        // enableRowOrdering: false,
        // enableColumnOrdering: false,
        // enableRowNumbers: false, // turn on row numbers # of rows
        // enableHiding: false, // Hiding Columns Property
        // enableStickyHeader: false, // Sticky Header Property
        // enableExpandAll: false, // Expand All Property
        // enableColumnResizing: false, // Column Resizing Property
        // enableFilterMatchHighlighting: false,
        // enablePagination: false, // Pagination Property,
        // // enableColumnFilters: false, // Column Filters Property
        // enableSorting: false, // Sorting Property
        // enableGlobalFilter: false, // Global Filter Property,
        // enableGlobalFilterModes: false, // Global Filter Mode Property
        // globalFilterFn: 'contains', // Global Filter
        // filterFn: 'startsWith', // Individual Column Filter
        // enableDensityToggle: false, // Enable density toggle padding property
        // enableFullScreenToggle: false, // Enable full screen toggle property
        // enableRowVirtualization: true, // Enable row virtualization,
        hideColumnsDefault: ["annotations", "channels"] // Hide columns default
    },

    rowExpandedDetails: ({ row }: any) => {
        const { channels, annotations } = row.original;
        return (
            <>
                {annotations?.map((annotation: { [s: string]: unknown; }, i: number) => {
                    const entries = Object.entries(annotation);
                    return (
                        <Box className="row-expand" key={i}>
                            {entries.map(([key, values]: any) => (
                                <Typography key={key}>
                                    <b>{key}:</b> {values}
                                </Typography>
                            ))}
                        </Box>
                    );
                })}
                <Box className="row-expand">
                    <Typography>
                        <b>Channels: {channels?.map((channel: string) => channel)} </b>
                    </Typography>
                </Box>
            </>
        );
    },
    // columnConfig: [

    // ]

};

const RouterConfig = [
    {
        path: '/StoreView',
        sidebarName: 'StoreViewer',
        icon: <PreviewIcon />,
        component: <section className='outlets storeView'><StoreView /></section>
    },
    {
        path: '/dataVisualization',
        sidebarName: 'Data Visualization',
        icon: <InsertChartIcon />,
        component: <section className='outlets'><Charts /></section>
    },
    {
        path: '/dagger',
        sidebarName: 'Dagger',
        icon: <PolylineIcon />,
        component: <section className='outlets'><DnDFlow /></section>
    },
    {
        path: '/table',
        sidebarName: 'Data Table',
        icon: <GridViewIcon />,
        component: <section className='outlets DataTable'> <InfiniteScroll config={configuration2} /></section>
    },
];

export default RouterConfig;