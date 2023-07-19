import React, { lazy } from 'react';
import PreviewIcon from '@mui/icons-material/Preview';
import GridViewIcon from '@mui/icons-material/GridView';
import PolylineIcon from '@mui/icons-material/Polyline';
import InsertChartIcon from '@mui/icons-material/InsertChart';

const DataTable = lazy(() => import('../../components/DataTable/components/TableConfigs'));
const Charts = lazy(() => import('../../components/DataVisualizer/components/Charts'));
const StoreView = lazy(() => import('../../components/StoreViewer/components/StoreView'));
const DnDFlow = lazy(() => import('../../components/DAG/Components/DragandDrop/Dagger'));

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
        component: <section className='outlets DataTable'><DataTable /></section>
    },
];

export default RouterConfig;