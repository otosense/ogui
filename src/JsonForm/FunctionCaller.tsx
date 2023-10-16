import React, { memo, useCallback, useEffect, useMemo, useState } from 'react';
import Form from '@rjsf/mui';
import validator from '@rjsf/validator-ajv8';
// ./Components/JSONLayout/Schema
import JsonEditor from './../DAG/Components/JSONLayout/Schema';
import { isEmpty, isObject } from 'lodash';
import { Alert } from '@mui/material';
import { FormProps } from '@rjsf/core';
import { RJSFSchema } from '@rjsf/utils';

interface IFunctionCallerProps extends FormProps<any, RJSFSchema, any> {
    func: (...args: any[]) => any | void;
}

interface IFormData { [key: string]: any; }


const FunctionCaller = (props: IFunctionCallerProps) => {
    const { schema, liveValidate, func } = props;
    const [orientation, setOrientation] = useState(false);
    const [collection, setCollection] = useState(schema);
    const [isError, setIsError] = useState<boolean>(false);
    const [funcList, setFuncList] = useState({});
    const [formData, setFormData] = useState({});

    const onSubmit = ({ formData }: IFormData) => {
        setFormData(formData);
        return func(...Object.values(formData));
    };

    const onChange = (viewPosition: boolean | ((prevState: boolean) => boolean)) => {
        setOrientation(viewPosition);
    };

    const handleUpload = useCallback((data: any) => {
        console.log('data', data);
        setCollection(data);
    }, []);


    useEffect(() => {
        dataGenerator(schema, setFuncList, setIsError);
    }, [schema]);

    return (
        <div>
            {isError ? (<Alert severity='error' className='errorMessage'>
                There is an Error getting DagFuncList data
            </Alert>) :
                <>
                    <h1>React JSON Schema Form Example</h1>
                    <section className='jsonFiddle'>
                        <div>
                            <JsonEditor layout={onChange} data={funcList} onDataUploaded={handleUpload} />
                        </div>
                        <div>
                            <JsonEditor layout={onChange} data={formData} onDataUploaded={handleUpload} />
                            <JsonEditor layout={onChange} data={formData} onDataUploaded={handleUpload} />
                        </div>
                        <Form
                            schema={funcList}
                            // uiSchema={uiSchema} // optional for handling custom things in UI
                            liveValidate={liveValidate}
                            onSubmit={onSubmit}
                            validator={validator}
                            noHtml5Validate
                        />



                    </section>
                </>
            }
        </div>
    );
};


FunctionCaller.defaultProps = {
    liveValidate: false,
    schema: {},
    func: (...args: any[]) => { },
};

export default (FunctionCaller);
function dataGenerator(schema: Object, setFuncList: React.Dispatch<React.SetStateAction<{}>>, setIsError: React.Dispatch<React.SetStateAction<boolean>>) {
    if (isEmpty(schema)) {
        setFuncList({}); // Return an empty {} if schema is not provided
        setIsError(true);
    }
    if (isObject(schema)) {
        const result: any = schema;
        setIsError(false);
        if (isObject(result.then)) {
            // Check if the result of the function is a promise
            result.then((dataArray: any) => {
                if (dataArray) {
                    setFuncList(dataArray);
                } else {
                    setIsError(true);
                }
            });
        } else {
            if (Object.keys(result).length === 0) {
                setIsError(true);
            }
            setFuncList(result);
        }
    }
}

