import React, { memo, useEffect, useState } from 'react';
import Editor from '@monaco-editor/react';
import { Alert, AppBar, Box, Divider, IconButton, MenuItem, Toolbar, Tooltip, Typography } from '@mui/material';
import LoadingOverlay from '../../utilities/Loader';
import SaveIcon from '@mui/icons-material/Save';
import * as monaco from "monaco-editor";

type TSchemaManager = {
    onDataUploaded?: any;
    data: any;
    title: string;
    saveSchema?: any;
    formType?: {
        label: string,
        value: string;
    };
};
const MONACO_OPTIONS: monaco.editor.IEditorConstructionOptions = {
    autoIndent: "full",
    automaticLayout: true,
    contextmenu: true,
    fontFamily: "monospace",
    fontSize: 13,
    lineHeight: 24,
    hideCursorInOverviewRuler: true,
    matchBrackets: "always",
    minimap: {
        enabled: false,
    },
    readOnly: false,
    scrollbar: {
        horizontalSliderSize: 4,
        verticalSliderSize: 4,
    },
    selectOnLineNumbers: true,
    roundedSelection: false,
    cursorStyle: 'line',
};
function Editors(props: TSchemaManager) {
    const { title, data, onDataUploaded, saveSchema, formType } = props;
    const [errors, setErrors] = useState<any[]>([]);
    const [jsonString, setJsonString] = useState<any>({});
    const [value, setValue] = useState((JSON.stringify(data, null, 2)));

    useEffect(() => {
        setJsonString(data);
        setValue((JSON.stringify(data, null, 2)));
    }, [data]);
    function handleEditorValidation(markers: any[]) {
        const errors = markers.length > 0 ? markers : [];
        setErrors(errors);
    }

    function handleEditorChange(value: any, event: any) {
        setJsonString(value);
        onDataUploaded && onDataUploaded(value);
    }


    const saveSchemas = () => {
        const val = {
            rjsf: jsonString
        };
        const finalPayload = {
            value: val,
            key: formType?.value,
        };
        saveSchema(finalPayload);
    };


    function ErrorHandlers(errors: any[]) {
        return errors?.length > 0 && errors?.map((error: { message: string; startLineNumber: string; }, index: number) => {
            return (
                <Alert severity="error" key={index}>
                    {error?.message + ' at ' + error?.startLineNumber}
                </Alert>
            );
        });
    }
    return (
        <main>
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static">
                    <Toolbar style={{ justifyContent: 'center' }}>
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                            {title}
                        </Typography>
                        <IconButton aria-label="SaveIcon" color="inherit" onClick={saveSchemas}>
                            <SaveIcon />
                        </IconButton>
                    </Toolbar>
                </AppBar>
            </Box>
            {ErrorHandlers(errors)}
            {<Editor
                height='92vh'
                language='json'
                options={MONACO_OPTIONS}
                value={value}
                onValidate={handleEditorValidation}
                onChange={handleEditorChange}
                loading={<LoadingOverlay />}
            />
            }
        </main>

    );
}

export default (Editors);


