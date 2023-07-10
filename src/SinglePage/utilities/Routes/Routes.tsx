import { lazy } from 'react';

const DataTable = lazy(() => import('../../components/DataTable/components/TableConfigs'));
const Charts = lazy(() => import('../../components/DataVisualizer/components/Charts'));
const StoreView = lazy(() => import('../../components/StoreViewer/components/StoreView'));
const DnDFlow = lazy(() => import('../../components/DAG/Components/DragandDrop/Dagger'));

const RouterConfig = [
    {
        path: '/StoreView',
        sidebarName: 'StoreViewer',
        component: <section className='outlets'><StoreView /></section>
    },
    {
        path: '/dataVisualization',
        sidebarName: 'Data Visualization',
        component: <section className='outlets'><Charts /></section>
    },
    {
        path: '/dagger',
        sidebarName: 'Dagger',
        component: <section className='outlets'><DnDFlow /></section>
    },
    {
        path: '/table',
        sidebarName: 'Data Table',
        component: <section className='outlets'><DataTable /></section>
    },
];

export default RouterConfig;