import axios from 'axios';
import { funcList } from './sampleFunction';

const ApiUrl = {
    getStore: "http://20.219.8.178:8080/dag_func_node_source_store",
    dagSaveLoad: "http://20.219.8.178:8080/dag_store",
};


async function PostMethod(url: string, data: any) {
    try {
        const response = await axios.post(url, data);
        return response.data;
    } catch (error: any) {
        // Handle the error here
        const errorMessage = error?.response?.data?.error || error?.message + ' ' + error?.config?.url;
        throw errorMessage;
    }
}

export function getFuncNodes(data: { _attr_name: string; }) {
    let url = ApiUrl.getStore;
    return PostMethod(url, data);
    // return funcList;
}

export const loadDag = async (data: any) => {
    let url = ApiUrl.dagSaveLoad;
    return PostMethod(url, data);
};

export const saveDag = async (data: any) => {
    let url = ApiUrl.dagSaveLoad;
    return PostMethod(url, data);
};





