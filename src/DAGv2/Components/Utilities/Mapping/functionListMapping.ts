import { map } from 'lodash';

const functionListMapping = (funcList: string[] | any[]) => {
    // Check if funcList is an array of objects or an array of strings
    if (funcList.length && typeof funcList[0] === 'object' && 'value' in funcList[0] && 'label' in funcList[0]) {
        // If funcList is an array of objects, return it as is
        return funcList;
    } else {
        // If funcList is an array of strings, map it to an array of objects
        let result = map(funcList, (value) => ({ value, label: value }));
        console.log('result', result);
        result.unshift({
            label: 'select function Node',
            value: '',
            // inputs: []
        });
        return result;
    }
};

export { functionListMapping };