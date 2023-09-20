import { Alert, AlertTitle, Box, IconButton, Tooltip, Typography, Button } from '@mui/material';
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
    const [jsonString, setJsonString] = useState<string>(JSON.stringify(props.data, null, 2));
    const [error, setError] = useState<any>(null);
    const [schemaLayout, setSchemaLayout] = useState(false);

    useEffect(() => {
        setJsonString(JSON.stringify(props.data, null, 2));
    }, [props.data]);

    const validateJSON = (jsonString: string) => {
        try {
            JSON.parse(jsonString);
            setError(null); // JSON is valid
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

    const handleJsonChange = (event: { target: { value: any; }; }) => {
        const newValue = event.target.value;
        setJsonString(newValue);
        validateJSON(newValue);

    };

    const handleSubmitJson = () => {
        props.onDataUploaded && props.onDataUploaded(jsonString);
    };

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
            <div className="json-editor">
                {/* <Divider /> */}
                {/* <div className="line-numbers">{renderLineNumbers()}</div> */}

                <Box className='box-content-json'>
                    {/* <span</span> */}
                    <Typography variant="h5" component="h2">
                        Schema Editor
                    </Typography>
                    <div>
                        <Tooltip title={schemaLayout ? "Horizontal layout" : "Vertical layout"}>
                            <IconButton onClick={orientationChange}>{schemaLayout ? <AlignVerticalBottomIcon /> : <AlignHorizontalLeftIcon />}</IconButton>
                        </Tooltip>
                        <Tooltip title="Format JSON: add proper indentation and new lines">
                            <IconButton onClick={handleFormatJson}>{<FormatAlignCenterIcon />}</IconButton>
                        </Tooltip>
                        <Tooltip title="Automatically repair JSON">
                            <IconButton onClick={handleAutoRepairJson}>{<BuildCircleIcon />}</IconButton>
                        </Tooltip>

                    </div>

                </Box>
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
                        cols={25}
                        className='json-area'
                        value={jsonString}
                        onChange={handleJsonChange}
                        placeholder="Enter JSON here..."
                    />

                </div>

            </div>
            <Tooltip title="Submit JSON">
                <Button onClick={handleSubmitJson}>{<UploadIcon />} Submit</Button>
            </Tooltip>
        </>
    );
}

export default memo(JsonEditor);
