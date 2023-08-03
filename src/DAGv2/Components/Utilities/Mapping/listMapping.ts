import { map } from 'lodash';

// Middleware mapping happens here, from Backend convert it to UI needs in out case "{ value, label: value }"
const listMapping = (funcList: string | any[]) => {
    // Check if funcList is an array of objects or an array of strings
    if (funcList?.length && typeof funcList[0] === 'object' && 'value' in funcList[0] && 'label' in funcList[0]) {
        // If funcList is an array of objects, return it as is
        return funcList;
    } else {
        // If funcList is an array of strings, map it to an array of objects
        let result = map(funcList, (value) => ({ value, label: value }));
        result.unshift({
            label: 'select Node',
            value: '',
            // inputs: []
        });
        return result;
    }
};

export { listMapping };