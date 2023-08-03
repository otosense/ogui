import { useMutation, useQuery } from "@tanstack/react-query";
import { getFuncNodes } from "./API";
import { ApiPayloadAttrName, ApiPayloadWithK } from "../Utilities/interfaces";

function apiMethod(payload: ApiPayloadAttrName): { data: any; status: string; error: any; isLoading: boolean; isFetching: boolean; } {
    return useQuery({
        queryKey: ['funcNodes', payload],
        queryFn: async () => {
            return getFuncNodes(payload);
        },
        keepPreviousData: false,
        refetchOnWindowFocus: false,
        cacheTime: 50 * 60 * 1000,
        staleTime: 10 * 60 * 1000,
    });
}

function loadMethod(payload: ApiPayloadAttrName, key = ''): { data: any; status: string; error: any; isLoading: boolean; isFetching: boolean; } {
    return useQuery({
        queryKey: ['funcNodes', payload, key],
        queryFn: async () => {
            return getFuncNodes(payload);
        },
        keepPreviousData: false,
        refetchOnWindowFocus: false,
    });
}

function getParams(payload: ApiPayloadWithK, setResponse: React.Dispatch<React.SetStateAction<{}>>, setErrorMessage: React.Dispatch<React.SetStateAction<string>>) {
    return useMutation((data: string) => getFuncNodes(payload), {
        onSuccess: (data) => {
            setResponse(data);
            console.log('data', data);
            // Invalidate and refetch
            // queryClient.invalidateQueries({ queryKey: ["todos"] });
        },
        onError: (err: string) => {
            console.log('err', err);
            setErrorMessage(err);
        }
    });
}



// function getFunctionList(setLoading: React.Dispatch<React.SetStateAction<boolean>>, setFuncList: React.Dispatch<any>, setIsError: React.Dispatch<React.SetStateAction<boolean>>) {
//     return async () => {
//         const payload = {
//             "_attr_name": "__iter__",
//         };
//         try {

//             const resolve = await getFuncNodes(payload);
//             functionListFromResponse(resolve);
//             setLoading(false);
//             resolve.unshift({
//                 label: 'select function Node',
//                 value: '',
//                 inputs: []
//             });
//             setFuncList(resolve);

//             // // Adding Custom Function
//             // const customFunction = {
//             //     "value": "new",
//             //     "label": "New Function"
//             // };
//             // setFuncList((prevData: any) => [...prevData, customFunction]);
//         } catch (error: any) {
//             // Handle error
//             setIsError(true);
//             setLoading(false);
//             console.log('Error in API.getFuncNodes', error.toString());
//         }
//     };
// }

// function functionListFromResponse(resolve: any) {
//     console.log('resolve', resolve);
// }


export {
    // getFunctionList,
    apiMethod,
    loadMethod,
    getParams
};



{/* <Panel position="top-left"> */ }
{/* <button onClick={() => onLayout('TB')} className='saveBtn'>vertical layout</button> */ }
{/* <button onClick={() => onLayout('LR')}>horizontal layout</button> */ }
{/* <Button variant="contained" onClick={() => onLayout('LR')} className='panelBtnLayout' startIcon={<AlignHorizontalLeftIcon />}>Horizontal layout</Button> */ }

// </Panel>