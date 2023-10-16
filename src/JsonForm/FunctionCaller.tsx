import React, { memo, useCallback, useEffect, useMemo, useState } from 'react';
import Form from '@rjsf/mui';
import validator from '@rjsf/validator-ajv8';
import { isEmpty, isObject } from 'lodash';
import { Alert } from '@mui/material';
import { FormProps } from '@rjsf/core';
import { RJSFSchema } from '@rjsf/utils';
import SchemaManager from './components/SchemaManager';
import SplitterLayout from 'react-splitter-layout';
import SearchBox from './components/SearchBox';

interface IFunctionCallerProps extends FormProps<any, RJSFSchema, any> {
    func: (...args: any[]) => any | void;
    schema: {} | (() => {}) | (() => Promise<{}>);
}

interface IFormData { [key: string]: any; }


const FunctionCaller = (props: IFunctionCallerProps) => {
    const { schema, liveValidate, func } = props;
    const [orientation, setOrientation] = useState(false);
    const [collection, setCollection] = useState<any>(schema);
    const [isError, setIsError] = useState<boolean>(false);
    const [funcList, setFuncList] = useState({});
    const [formData, setFormData] = useState({});
    const [selectedValue, setSelectedValue] = useState<string | undefined>('');

    const onSubmit = ({ formData }: IFormData) => {
        setFormData(formData);
        return func(...Object.values(formData));
    };

    const onChange = (viewPosition: boolean | ((prevState: boolean) => boolean)) => {
        setOrientation(viewPosition);
    };

    const handleUpload = useCallback((data: any) => {
        console.log('data =>', data);
        console.log('boolean', schema === data, schema, data);
        setCollection(JSON.parse(data));
    }, []);


    useEffect(() => {
        dataGenerator(schema, setFuncList, setIsError);
    }, [schema]);

    const selectValueFromDropDown = (value: React.SetStateAction<string | undefined>) => {
        console.log('From Main', value);
        setSelectedValue(value);
    };

    return (
        <main>
            {isError ? (<Alert severity='error' className='errorMessage'>
                There is an Error getting DagFuncList data
            </Alert>) :
                <>
                    <h1>JSON Form Fiddle</h1>
                    <SearchBox handleValue={selectValueFromDropDown} />
                    <section className='jsonFiddle'>
                        <SplitterLayout vertical={false} percentage={true} secondaryInitialSize={50} secondaryMinSize={50}>
                            <div className='fiddle-left-side'>
                                <div className='schema-layout'>
                                    <SchemaManager layout={onChange} data={schema} onDataUploaded={handleUpload} title='Schema' />
                                </div>
                                <div className='UI-schema-layout-result'>
                                    <SchemaManager layout={onChange} data={formData} onDataUploaded={handleUpload} title='UI Schema' />
                                    <SchemaManager layout={onChange} data={formData} onDataUploaded={handleUpload} title='Result' />
                                </div>
                            </div>
                            {console.log('collection', collection, typeof collection)}
                            <div className='fiddle-right-side'>
                                <Form
                                    // schema={collection}
                                    schema={collection || schema}
                                    // uiSchema={uiSchema} // optional for handling custom things in UI
                                    liveValidate={liveValidate}
                                    onSubmit={onSubmit}
                                    validator={validator}
                                    noHtml5Validate
                                />
                            </div>
                        </SplitterLayout>
                    </section>
                </>
            }
        </main>
    );
};


FunctionCaller.defaultProps = {
    liveValidate: false,
    schema: {},
    func: (...args: any[]) => { },
    validator: true
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

