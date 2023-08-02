import { getFuncNodes } from "./API";

function getFunctionList(setLoading: React.Dispatch<React.SetStateAction<boolean>>, setFuncList: React.Dispatch<any>, setIsError: React.Dispatch<React.SetStateAction<boolean>>) {
    return async () => {
        try {
            const resolve = await getFuncNodes();
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


export {
    getFunctionList
};