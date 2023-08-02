import { useQuery } from "@tanstack/react-query";
import { getFuncNodes } from "./API";

function getFunctionList(setLoading: React.Dispatch<React.SetStateAction<boolean>>, setFuncList: React.Dispatch<any>, setIsError: React.Dispatch<React.SetStateAction<boolean>>) {
    return async () => {
        const payload = {
            "_attr_name": "__iter__",
        };
        try {

            const resolve = await getFuncNodes(payload);
            functionListFromResponse(resolve);
            setLoading(false);
            resolve.unshift({
                label: 'select function Node',
                value: '',
                inputs: []
            });
            setFuncList(resolve);

            // // Adding Custom Function
            // const customFunction = {
            //     "value": "new",
            //     "label": "New Function"
            // };
            // setFuncList((prevData: any) => [...prevData, customFunction]);
        } catch (error: any) {
            // Handle error
            setIsError(true);
            setLoading(false);
            console.log('Error in API.getFuncNodes', error.toString());
        }
    };
}

function apiMethod(payload: { _attr_name: string; }): { data: any; status: any; error: any; isLoading: any; isFetching: any; } {
    return useQuery({
        queryKey: ['funcNodes', payload],
        queryFn: async () => {
            return getFuncNodes(payload);
        },
        keepPreviousData: true,
        refetchOnWindowFocus: false,
        cacheTime: 5 * 60 * 1000,
        staleTime: 1 * 60 * 1000,
    });
}

export {
    getFunctionList,
    apiMethod
};

function functionListFromResponse(resolve: any) {
    console.log('resolve', resolve);
}


{/* <Panel position="top-left"> */ }
{/* <button onClick={() => onLayout('TB')} className='saveBtn'>vertical layout</button> */ }
{/* <button onClick={() => onLayout('LR')}>horizontal layout</button> */ }
{/* <Button variant="contained" onClick={() => onLayout('LR')} className='panelBtnLayout' startIcon={<AlignHorizontalLeftIcon />}>Horizontal layout</Button> */ }

// </Panel>