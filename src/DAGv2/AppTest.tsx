import React from 'react';
import Dagger from '../DAGv2/Pages/Dagger';
import { loadDagFuncList } from './assets/data';

function AppTest() {


    const sample = async () => {
        return await loadDagFuncList;
    };

    // const sample = () => {
    //     return loadDagFuncList;
    // };
    const configuration = {
        // DagFuncList: loadDagFuncList,
        DagFuncList: sample,
        // onSave: {},
        // onLoad: {}
    };
    return (
        <>
            <Dagger {...configuration} />
        </>
    );
}

export default AppTest;