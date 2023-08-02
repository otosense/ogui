import axios from 'axios';
import { funcList } from './sampleFunction';

const ApiUrl = {
    getFuncNodes: "http://52.188.113.129:8080/dag_func_node_source_store",
    loadDagList: "http://52.188.210.107:8080/get_list_of_dag",
    saveDag: "http://52.188.210.107:8080/save_dag_data",
    loadDag: "http://52.188.113.129:8080/get_dag",
};


const GetMethod = async (url: any) => {
    const response = await axios.get(url);
    return response.data;
};

async function PostMethod(url: string, data: any) {
    const response = await axios.post(url, data);
    return response.data;
}

export function getFuncNodes() {
    // let url = ApiUrl.getFuncNodes;
    // return PostMethod(url, {
    //     // "_attr_name": "__iter__",
    //     "_attr_name": '__getitem__',
    //     "k": ['funcstore', 'apply_fitted_model']
    // });

    // attr = '__getitem__';
    // let url = ApiUrl.getFuncNodes;
    // return PostMethod(url, {
    //     "_attr_name": "__iter__",
    // });


    return funcList;
}




export function getDagList() {
    let url = ApiUrl.loadDagList;
    return PostMethod(url, {});
}


export const loadDag = async (data: any) => {
    let url = ApiUrl.loadDag;
    return PostMethod(url, { "name": data });
};

export const saveDag = async (data: any) => {
    let url = ApiUrl.saveDag;
    return PostMethod(url, data);
};





