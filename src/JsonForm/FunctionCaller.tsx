import React, { memo, useCallback, useEffect, useMemo, useState } from 'react';
import Form from '@rjsf/mui';
import validator from '@rjsf/validator-ajv8';
import { isEmpty, isObject } from 'lodash';
import { Alert, Checkbox, FormControl, FormControlLabel, FormGroup } from '@mui/material';
import { FormProps } from '@rjsf/core';
import { RJSFSchema } from '@rjsf/utils';
import SplitterLayout from 'react-splitter-layout';
import SearchBox from './components/SearchBox';
import Editors from './components/Editor';

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

    const [isDisabled, setDisabled] = useState(false);
    const [isReadOnly, setReadOnly] = useState(false);
    const [isLiveValidate, setLiveValidate] = useState(false);

    const onSubmit = (props: IFormData) => {
        const { formData } = props;
        setFormData(formData);
        return func(...Object.values(formData));
    };

    const onChange = (viewPosition: boolean | ((prevState: boolean) => boolean)) => {
        setOrientation(viewPosition);
    };

    const handleUpload = useCallback((data: any) => {
        setCollection(JSON.parse(data));
    }, []);


    useEffect(() => {
        dataGenerator(schema, setFuncList, setIsError);
    }, [schema]);

    const selectValueFromDropDown = (value: React.SetStateAction<string | undefined>) => {
        setSelectedValue(value);
    };

    const handleDisabledChange = () => {
        setDisabled(!isDisabled);
    };

    const handleReadOnlyChange = () => {
        setReadOnly(!isReadOnly);
    };

    const handleLiveValidateChange = () => {
        setLiveValidate(!isLiveValidate);
    };

    return (
        <main>
            {isError ? (<Alert severity='error' className='errorMessage'>
                There is an Error getting DagFuncList data
            </Alert>) :
                <>
                    <h1>JSON Form Fiddle</h1>
                    <SearchBox handleValue={selectValueFromDropDown} />

                    <FormControl component="fieldset">
                        <FormGroup aria-label="position" row>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={isDisabled}
                                        onChange={handleDisabledChange}
                                    />
                                }
                                label="Disabled"
                            />
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={isReadOnly}
                                        onChange={handleReadOnlyChange}
                                    />
                                }
                                label="Read-Only"
                            />
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={isLiveValidate}
                                        onChange={handleLiveValidateChange}
                                    />
                                }
                                label="Live Validate"
                            />
                        </FormGroup>
                    </FormControl>
                    <section className='jsonFiddle'>
                        <SplitterLayout vertical={false} percentage={true} secondaryInitialSize={50} secondaryMinSize={50}>
                            <div className='fiddle-left-side'>
                                <div className='schema-layout'>
                                    <Editors data={schema} onDataUploaded={handleUpload} title='Schema' />
                                </div>
                                <div className='UI-schema-layout-result'>
                                    <Editors data={formData} title='UI Schema' />
                                    <Editors data={formData} title='Result' />
                                </div>
                            </div>
                            <div className='fiddle-right-side'>
                                <Form
                                    schema={collection}
                                    // uiSchema={uiSchema} // optional for handling custom things in UI
                                    liveValidate={isLiveValidate || liveValidate}
                                    onSubmit={onSubmit}
                                    validator={validator}
                                    noHtml5Validate
                                    disabled={isDisabled}
                                    readonly={isReadOnly}
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

export default memo(FunctionCaller);
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

{/* <SchemaManager layout={onChange} data={schema} onDataUploaded={handleUpload} title='Schema' /> */ }
{/* <SchemaManager layout={onChange} data={formData} onDataUploaded={handleUpload} title='UI Schema' /> */ }

{/* <SchemaManager layout={onChange} data={formData} onDataUploaded={handleUpload} title='Result' /> */ }