import * as API from '../API/API';
import { useQuery } from '@tanstack/react-query';

function apiMethod(passer: { from_: number; to_: number; }): { data: any; status: any; error: any; isLoading: any; isFetching: any; } {
    return useQuery({
        queryKey: ['StoreConfig', passer],
        queryFn: async () => {
            return API.StoreConfig(passer);
        },
        keepPreviousData: false,
        refetchOnWindowFocus: false,
        cacheTime: 5 * 60 * 1000,
        staleTime: 1 * 60 * 1000,
    });
}

export {
    apiMethod
};
