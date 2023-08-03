import axios from 'axios';
import { funcList } from './sampleFunction';
import { ApiPayloadAttrName, ApiPayloadWithK, ApiPayloadWithV } from '../Utilities/Interfaces';

const ApiUrl = {
    getStore: "http://20.219.8.178:8080/dag_func_node_source_store",
    dagSaveLoad: "http://20.219.8.178:8080/dag_store",
};


async function PostMethod(url: string, data: ApiPayloadAttrName) {
    try {
        const response = await axios.post(url, data);
        return response.data;
    } catch (error: any) {
        // Handle the error here
        const errorMessage = error?.response?.data?.error || error?.message + ' ' + error?.config?.url;
        throw errorMessage;
    }
}

// getting all the "dag_store" / "funcstore" / "funcfactoriesstore" 
export function getFuncNodes(data: ApiPayloadAttrName) {
    let url = ApiUrl.getStore;
    return PostMethod(url, data);
    // return funcList;
}

// Load and Save in Same API
export const loadDag = async (data: ApiPayloadWithK) => {
    console.log('data', data);
    let url = ApiUrl.dagSaveLoad;
    return PostMethod(url, data);
};
// Save the Dag in Same API
export const saveDag = async (data: ApiPayloadWithV) => {
    let url = ApiUrl.dagSaveLoad;
    return PostMethod(url, data);
};





