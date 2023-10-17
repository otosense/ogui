import React, { memo, useEffect, useState } from 'react';
import Editor, { DiffEditor, useMonaco, loader } from '@monaco-editor/react';
import { Alert, AppBar, Box, Divider, IconButton, MenuItem, Toolbar, Tooltip, Typography } from '@mui/material';
import { isEmpty } from 'lodash';
import LoadingOverlay from '../../utilities/Loader';
import SaveIcon from '@mui/icons-material/Save';

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
        console.log({ jsonString });
        const val = {
            rjsf: {
                schema: jsonString
            }
        };
        console.log({ val });
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
                height='40vh'
                language='json'
                options={{ minimap: { enabled: false } }}
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


