import { flatten, flattenDeep, groupBy, map, mapValues } from 'lodash';

const pythonIdentifierPattern = /^[a-zA-Z_][a-zA-Z0-9_]*$/;

// const pattern = /^$|^[a-zA-Z_][a-zA-Z0-9_]*$/;  // allowEmpty Spaces in Input

const onNameHandlers = (inputValue: string) => pythonIdentifierPattern.test(inputValue);
const dagDirections = 'left';

function errorHandler(setErrorMessage: React.Dispatch<React.SetStateAction<string>>, toggleSnackbar: () => void, errorString: string) {
    setErrorMessage(errorString);
    toggleSnackbar();
    return false;
}


const functionList = (data: any) => {
    const groupedData = groupBy(data, (item) => item[0]);
    const result = mapValues(groupedData, (value) => map(value, (item) => item[1]));
    // console.log('result', result);
    return result;
};



export {
    pythonIdentifierPattern,
    onNameHandlers,
    dagDirections,
    errorHandler,
    functionList,
};