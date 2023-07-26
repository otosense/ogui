const pythonIdentifierPattern = /^[a-zA-Z_][a-zA-Z0-9_]*$/;

// const pattern = /^$|^[a-zA-Z_][a-zA-Z0-9_]*$/;  // allowEmpty Spaces in Input

const onNameHandlers = (inputValue: string) => pythonIdentifierPattern.test(inputValue);

export {
    pythonIdentifierPattern,
    onNameHandlers
};