import { map } from "lodash";

export const storeMapping = (data: any) => {
    const transformedData = map(data, item => {
        const value = item;
        const label = item.split('.').slice(-2)[0] + '.' + item.split('.').slice(-1)[0]; // Extract the last part after the last dot
        return { label, value };
    });
    return transformedData;
};