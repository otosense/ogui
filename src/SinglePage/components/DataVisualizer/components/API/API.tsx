import axios from 'axios';

const ApiUrl = {
    // getAnnotations: "http://localhost:3000/annotation",
    // getVolumes: "http://localhost:3000/volume",
    viewConfig: "http://localhost:3000/viewConfig",
    // baseURl: "http://localhost:3000",
    // waveForm: "http://localhost:3000/wf",
    // mixed: "http://localhost:3000/mixed",

    // getAnnotations: "http://52.188.113.129:3000/annotation",
    getVolumes: "http://52.188.113.129:3000/volume",
    // viewConfig: "http://52.188.113.129:3000/viewConfig",
    // baseURl: "http://52.188.113.129:3000",
    waveForm: "http://52.188.113.129:3000/wf",
    mixed: "http://52.188.113.129:3000/mixed",

    baseURl: "http://52.188.113.129:8080",
    getAnnotations: "http://52.188.113.129:8080/get_session_annotation",
    getWaveForm: "http://52.188.113.129:8080/get_session_wf_data",

    getSessionDetails: "http://52.188.113.129:8080/get_session_data"
};


const GetMethod = async (url: any) => {
    const response = await axios.get(url);
    return response.data;
};


async function PostMethod(url: string, data: any) {
    try {
        const response = await axios.post(url, data);
        return response.data;
    } catch (error: any) {
        // Handle the error here
        console.error('Error in API request:', error.response.data.error);
        throw error.response.data.error;
    }
}

export function viewConfig() {
    const url = ApiUrl.viewConfig;
    return GetMethod(url);
}


export function getData(channel: string, min: number = 0, max: number = 0) {
    // const url = `${ApiUrl.baseURl + '/' + channel}?from=${min}&to=${max}`;
    const url = `${ApiUrl.baseURl + '/' + channel}`;

    // const url = `${ApiUrl.baseURl + '/' + ApiUrl.getAnnotations}`;
    return GetMethod(url);
}

export function getSessionDetails(data: string) {
    // const url = `${ApiUrl.baseURl + '/' + channel}?from=${min}&to=${max}`;
    const url = `${ApiUrl.getSessionDetails}`;

    // const url = `${ApiUrl.baseURl + '/' + ApiUrl.getAnnotations}`;
    return PostMethod(url, data);
}






