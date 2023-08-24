import { map } from "lodash";

const fetchingSessionID = (data: any) => {
    const item = map(data.data, 'id');
    const total = data?.total;
    return { item, total };
};
export {
    fetchingSessionID
};