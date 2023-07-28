import axios from 'axios';

const ApiUrl = {
    // StoreConfig: "http://localhost:3000/storeViewer",
    // StoreConfig: "http://52.188.113.129:3000/storeViewer",
    // StoreConfig: "http://52.188.113.129:8080/list_all_sessions",
    StoreConfig: "http://52.188.113.129:8080/get_all_sessionss"

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
        const errorMessage = error?.response?.data?.error || error?.message + ' ' + error?.config?.url;
        throw errorMessage;
    }
}

export function StoreConfig(data: { from_: number; to_: number; } | undefined) {
    const url = ApiUrl.StoreConfig;
    // return GetMethod(url);
    return PostMethod(url, data);
}
