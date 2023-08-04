import { pythonIdentifierPattern } from "../globalFunction";


// Python identifiers handlers for user inputting text
const onNameHandlers = (inputValue: string) => pythonIdentifierPattern.test(inputValue);

export {
    onNameHandlers
};