import { Alert, AlertTitle, Box, IconButton, Tooltip, Typography, Button, AppBar, Toolbar, Badge, MenuItem } from '@mui/material';
import React, { memo, useEffect, useState } from 'react';
import FormatAlignCenterIcon from '@mui/icons-material/FormatAlignCenter';
import BuildCircleIcon from '@mui/icons-material/BuildCircle';
import Divider from '@mui/material/Divider';
import AlignVerticalBottomIcon from '@mui/icons-material/AlignVerticalBottom';
import AlignHorizontalLeftIcon from '@mui/icons-material/AlignHorizontalLeft';
import UploadIcon from '@mui/icons-material/Upload';



function JsonEditor(props: {
    onDataUploaded: any; layout: (arg0: boolean) => void; data: any;
}) {
    const [jsonString, setJsonString] = useState<any>();
    const [error, setError] = useState<any>(null);
    const [schemaLayout, setSchemaLayout] = useState(false);

    useEffect(() => {
        setJsonString(JSON.stringify(props.data, null, 2));
    }, [props.data]);

    // const validateJSON = (jsonString: string) => {
    //     try {
    //         JSON.parse(jsonString);
    //         setError(null); // JSON is valid
    //     } catch (error) {
    //         if (error instanceof SyntaxError) {
    //             // Parse error occurred, set the error message and line number
    //             const positionMatch = /at position (\d+)/.exec(error.message);
    //             const position = positionMatch ? parseInt(positionMatch[1]) : null;
    //             if (position !== null) {
    //                 const lines = jsonString.split('\n');
    //                 let line = 1;
    //                 let charCount = 0;
    //                 for (let i = 0; i < lines.length; i++) {
    //                     charCount += lines[i].length + 1; // +1 for the newline character
    //                     if (position < charCount) {
    //                         setError({ message: error.message, lineNumber: line });
    //                         break;
    //                     }
    //                     line++;
    //                 }
    //             } else {
    //                 setError({ message: error.message, lineNumber: null });
    //             }
    //         } else {
    //             // This is not a parse error
    //             setError({ message: 'Unknown error', lineNumber: null });
    //         }
    //     }
    // };


    const validateJSON = (jsonString: string) => {
        try {
            const parsedJson = JSON?.parse(jsonString);
            // Check for empty string or empty values in the parsed JSON
            const hasEmptyValues = checkForEmptyValues(parsedJson);
            if (hasEmptyValues) {
                setError({ message: 'JSON contains empty strings or empty values', lineNumber: null });
            } else {
                setError(null); // JSON is valid
            }
        } catch (error) {
            if (error instanceof SyntaxError) {
                // Parse error occurred, set the error message and line number
                const positionMatch = /at position (\d+)/.exec(error.message);
                const position = positionMatch ? parseInt(positionMatch[1]) : null;
                if (position !== null) {
                    const lines = jsonString.split('\n');
                    let line = 1;
                    let charCount = 0;
                    for (let i = 0; i < lines.length; i++) {
                        charCount += lines[i].length + 1; // +1 for the newline character
                        if (position < charCount) {
                            setError({ message: error.message, lineNumber: line });
                            break;
                        }
                        line++;
                    }
                } else {
                    setError({ message: error.message, lineNumber: null });
                }
            } else {
                // This is not a parse error
                setError({ message: 'Unknown error', lineNumber: null });
            }
        }
    };

    const checkForEmptyValues = (jsonObj: any): boolean => {
        for (const key in jsonObj) {
            if (jsonObj.hasOwnProperty(key)) {
                const value = jsonObj[key];
                if (value === "" || value === null || value === undefined) {
                    return true; // Found an empty string or empty value
                }
                if (typeof value === "object" && checkForEmptyValues(value)) {
                    return true; // Recursively check nested objects
                }
            }
        }
        return false; // No empty strings or empty values found
    };

    const handleJsonChange = (event: { target: { value: any; }; }) => {
        const newValue = event.target.value;
        setJsonString(newValue);
        validateJSON(newValue);

    };

    const handleSubmitJson = () => {

        // try onChange or Blur
        const parsedJson = JSON.parse(jsonString);
        const hasEmptyValues = checkForEmptyValues(parsedJson);
        if (hasEmptyValues) {
            setError({ message: 'JSON contains empty strings or empty values', lineNumber: null });
        } else {
            setError(null); // JSON is valid
            props.onDataUploaded && props.onDataUploaded(jsonString);
        }
    };

    // useEffect(() => {
    //     console.log('jsonString', jsonString);
    //     if (jsonString) {
    //         const parsedJson = JSON?.parse(jsonString);
    //         const hasEmptyValues = checkForEmptyValues(parsedJson);
    //         console.log('hasEmptyValues', hasEmptyValues);
    //         if (hasEmptyValues) {
    //             setError({ message: 'JSON contains empty strings or empty values', lineNumber: null });
    //         } else {
    //             setError(null); // JSON is valid
    //             props.onDataUploaded && props.onDataUploaded(jsonString);
    //         }
    //     }

    // }, [error]);


    // const renderLineNumbers = () => {
    //     const lines = jsonString.split('\n');
    //     return lines.map((line, index) => (
    //         <div key={index} className="line-number">
    //             {index + 1}
    //         </div>
    //     ));
    // };

    const handleFormatJson = () => {
        try {
            const parsedJson = JSON.parse(jsonString);
            const formattedJson = JSON.stringify(parsedJson, null, 2);
            setJsonString(formattedJson);
            setError(null);
        } catch (error) {
            setError({ message: 'Invalid JSON for formatting', lineNumber: null });
        }
    };

    const handleAutoRepairJson = () => {
        try {
            // Attempt to parse the JSON string to identify errors
            JSON.parse(jsonString);
            setError(null); // JSON is already valid, no repair needed
        } catch (error) {
            if (error instanceof SyntaxError) {
                // Attempt to repair common syntax errors
                const repairedJsonString = jsonString
                    .replace(/(['"])?([a-zA-Z0-9_]+)(['"])?:/g, '"$2":') // Add double quotes to keys
                    .replace(/'/g, '"') // Replace single quotes with double quotes
                    .replace(/,\s*([\]}])/g, '$1'); // Remove trailing commas

                setJsonString(repairedJsonString);
                setError(null);
            } else {
                // This is not a parse error
                setError({ message: 'Unknown error', lineNumber: null });
            }
        }
    };

    const orientationChange = () => {
        setSchemaLayout(!schemaLayout);
        props.layout(!schemaLayout);
    };

    return (
        <>

            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static">
                    <Toolbar style={{ justifyContent: 'center' }}>
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                            Schema Editor
                        </Typography>
                    </Toolbar>
                    <Divider color="#fff" />
                    <MenuItem style={{ justifyContent: 'center' }}>
                        <Tooltip title={schemaLayout ? "Horizontal layout" : "Vertical layout"}>
                            <IconButton onClick={orientationChange} color="inherit">{schemaLayout ? <AlignVerticalBottomIcon /> : <AlignHorizontalLeftIcon />}
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="Format JSON: add proper indentation and new lines">
                            <IconButton onClick={handleFormatJson} color="inherit">{<FormatAlignCenterIcon />}</IconButton>
                        </Tooltip>
                        <Tooltip title="Automatically repair JSON">
                            <IconButton onClick={handleAutoRepairJson} color="inherit">{<BuildCircleIcon />}</IconButton>
                        </Tooltip>
                        {/* <IconButton size="large" aria-label="show 4 new mails" color="inherit">

                            <AlignHorizontalLeftIcon />

                        </IconButton> */}
                    </MenuItem>
                </AppBar>
            </Box>
            <div className="json-editor">
                {/* <Divider /> */}
                {/* <div className="line-numbers">{renderLineNumbers()}</div> */}

                {/* <Box className='box-content-json'>
                    <Typography variant="h5" component="h2">
                        Schema Editor
                    </Typography>
                    <div>
                        <Tooltip title={schemaLayout ? "Horizontal layout" : "Vertical layout"}>
                            <IconButton onClick={orientationChange}>{schemaLayout ? <AlignVerticalBottomIcon /> : <AlignHorizontalLeftIcon />}
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="Format JSON: add proper indentation and new lines">
                            <IconButton onClick={handleFormatJson}>{<FormatAlignCenterIcon />}</IconButton>
                        </Tooltip>
                        <Tooltip title="Automatically repair JSON">
                            <IconButton onClick={handleAutoRepairJson}>{<BuildCircleIcon />}</IconButton>
                        </Tooltip>

                    </div>

                </Box> */}
                <Divider />
                {error && (
                    <Alert severity="error">
                        <AlertTitle>{error.message}</AlertTitle>
                        {error.lineNumber !== null && (
                            <p>Error at line {error.lineNumber}</p>
                        )}
                    </Alert>
                )}
                <Divider />
                <div className="textarea-wrapper">
                    <textarea
                        rows={25}
                        className='json-area'
                        value={jsonString}
                        onChange={handleJsonChange}
                        placeholder="Enter JSON here..."
                    />
                </div>

            </div>
            {/* <Tooltip title="Submit JSON"> */}
            <Button onClick={handleSubmitJson} disabled={error !== null}>{<UploadIcon />} Submit</Button>
            {/* </Tooltip> */}
        </>
    );
}

export default memo(JsonEditor);
