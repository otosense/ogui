const pythonIdentifierPattern = /^[a-zA-Z_][a-zA-Z0-9_]*$/;

// const pattern = /^$|^[a-zA-Z_][a-zA-Z0-9_]*$/;  // allowEmpty Spaces in Input
const dagDirections = 'left';
function errorHandler(setErrorMessage: React.Dispatch<React.SetStateAction<string>>, toggleSnackbar: () => void, errorString: string) {
    setErrorMessage(errorString);
    toggleSnackbar();
    return false;
}

export {
    pythonIdentifierPattern,
    dagDirections,
    errorHandler,
};