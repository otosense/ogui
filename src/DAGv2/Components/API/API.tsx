import axios from 'axios';

const ApiUrl = {
    getFuncNodes: "http://52.188.113.129:8080/get_list_of_functions",
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
    let url = ApiUrl.getFuncNodes;
    return PostMethod(url, {});
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





