import React from 'react';
import Dagger from '../DAGv2/Pages/Dagger';
import { loadDagFuncList } from './assets/data';
import { loadDag, saveDag } from './Components/API/API';

function AppTest() {

    const saveLoadedDag = {
        "id": "test_dag_sprint_review",
        "dagName": "test_dag_sprint_review",
        "func_nodes": [
            {
                "name": "function_329",
                "func_label": "mk_chunker_step",
                "out": "test",
                "func": "mk_chunker_step",
                "bind": {
                    "chk_size": "a"
                }
            }
        ]
    };

    const sample = async () => {
        return await loadDagFuncList;


        try {
            const response = await fetch("http://20.219.8.178:8080/dag_func_node_source_store", {
                method: "POST",
                body: JSON.stringify({
                    "_attr_name": "__iter__",
                }),
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                }
            });

            if (!response.ok) {
                throw new Error("Network response was not ok");
            }

            const json = await response.json();
            // console.log('json', json);
            return json;
        } catch (error) {
            console.error("Error fetching data:", error);
            return []; // Return an empty array or handle the error appropriately
        }

    };

    // const sample = () => {
    //     return loadDagFuncList;
    // };

    const saver = (data: any) => {

        const APIpayload = {
            "_attr_name": '__setitem__',
            k: data.dagName,
            v: data.combinedObj
        };
        // Saving the Dag to Backend using API
        saveDag(APIpayload).then(x => {
            // Response Handler
        }).catch(err => console.log('error', err.message));
    };

    const onloadSavedDag = async (data: any) => {
        const payload = {
            "_attr_name": "__getitem__",
            "k": data
        };

        try {
            const response = await fetch("http://20.219.8.178:8080/dag_store", {
                method: "POST",
                body: JSON.stringify({
                    ...payload
                }),
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                }
            });

            if (!response.ok) {
                throw new Error("Network response was not ok");
            }

            const json = await response.json();
            // console.log('json', json);
            return json;
        } catch (error) {
            console.error("Error fetching data:", error);
            return []; // Return an empty array or handle the error appropriately
        }
    };
    const loadParamsList = async (data: any) => {
        // console.log('data', data);
        const payload = {
            "_attr_name": '__getitem__',
            "k": ['funcs', data]
        };

        try {
            const response = await fetch("http://20.219.8.178:8080/dag_func_node_source_store", {
                method: "POST",
                body: JSON.stringify({
                    ...payload
                }),
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                }
            });

            if (!response.ok) {
                throw new Error("Network response was not ok");
            }

            const json = await response.json();
            // console.log('json', json);
            return json;
        } catch (error) {
            console.error("Error fetching data:", error);
            return []; // Return an empty array or handle the error appropriately
        }
    };

    const configuration = {
        DagFuncList: sample,
        LoadDagList: sample,
        onSave: saver,
        onloadSavedDag: onloadSavedDag,
        loadParamsList: loadParamsList
    };
    return (
        <>
            <Dagger {...configuration} />
        </>
    );
}

export default AppTest;