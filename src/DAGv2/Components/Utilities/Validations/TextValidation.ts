import { pythonIdentifierPattern } from "../globalFunction";

const onNameHandlers = (inputValue: string) => pythonIdentifierPattern.test(inputValue);

export {
    onNameHandlers
};