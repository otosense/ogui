import React, { memo, useCallback, useEffect, useState } from 'react';
import Form from '@rjsf/mui';
import validator from '@rjsf/validator-ajv8';
import { isArray, isEmpty, isFunction, isObject } from 'lodash';
import { Alert, Checkbox, FormControl, FormControlLabel, FormGroup } from '@mui/material';
import { FormProps } from '@rjsf/core';
import { RJSFSchema } from '@rjsf/utils';
import SplitterLayout from 'react-splitter-layout';
import SearchBox from './components/SearchBox';
import Editors from './components/Editor';
import LoadingOverlay from '../utilities/Loader';
import FormOptions from './components/FormOptions';

interface IFunctionCallerProps extends FormProps<any, RJSFSchema, any> {
    getStoreList: [] | (() => []) | (() => Promise<any[]>);
    onLoadSchema: {} | (() => {}) | (() => Promise<{}>);
    func: (...args: any[]) => any | void;
}

interface IFormData { [key: string]: any; }


const FunctionCaller = (props: IFunctionCallerProps) => {
    const { func, getStoreList, onLoadSchema } = props;

    const [collection, setCollection] = useState<any>({});
    const [isError, setIsError] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [funcList, setFuncList] = useState({});
    const [formData, setFormData] = useState({});

    const [isDisabled, setDisabled] = useState(false);
    const [isReadOnly, setReadOnly] = useState(false);
    const [isLiveValidate, setLiveValidate] = useState(false);
    const [isNoHtml5Validate, setIsNoHtml5Validate] = useState(true);
    const [liveOmit, setLiveOmit] = useState(false);
    const [omitExtraData, setOmitExtraData] = useState(false);

    const onSubmit = (props: IFormData) => {
        const { formData } = props;
        setFormData(formData);
        return func(...Object.values(formData));
    };

    // const [orientation, setOrientation] = useState(false);
    // const onChange = (viewPosition: boolean | ((prevState: boolean) => boolean)) => {
    //     setOrientation(viewPosition);
    // };

    const handleUpload = useCallback((data: any) => {
        setCollection(JSON.parse(data));
    }, []);

    const schemaData = (data: string) => {
        setCollection((data));
    };


    useEffect(() => {
        generateInitialData(getStoreList, setFuncList, setIsError, setIsLoading);
        // dataGenerator(schema, setFuncList, setIsError);
    }, [getStoreList]);

    const handleDisabledChange = () => {
        setDisabled(!isDisabled);
    };

    const handleReadOnlyChange = () => {
        setReadOnly(!isReadOnly);
    };

    const handleLiveValidateChange = () => {
        setLiveValidate(!isLiveValidate);
    };

    const handleHtml5ValidateChange = () => {
        setIsNoHtml5Validate(!isNoHtml5Validate);
    };

    const handleOmitExtraDataChange = () => {
        setOmitExtraData(!omitExtraData);
    };


    const handleLiveOmitChange = () => {
        setLiveOmit(!liveOmit);
    };




    if (isLoading) return <LoadingOverlay />;

    return (
        <main>
            {isError ? (<Alert severity='error' className='errorMessage'>
                There is an Error getting DagFuncList data
            </Alert>) :
                <main className='main-json-fiddle'>
                    <h1 className='center'>JSON Form Fiddle</h1>
                    <div className='inputs-fiddle'>

                        <SearchBox data={funcList} onLoadSchema={onLoadSchema} schemaData={schemaData} />

                        <FormOptions
                            isLiveValidate={isLiveValidate}
                            isDisabled={isDisabled}
                            isReadOnly={isReadOnly}
                            isNoHtml5Validate={isNoHtml5Validate}
                            omitExtraData={omitExtraData}
                            liveOmit={liveOmit}
                            handleLiveValidateChange={handleLiveValidateChange}
                            handleDisabledChange={handleDisabledChange}
                            handleReadOnlyChange={handleReadOnlyChange}
                            handleHtml5ValidateChange={handleHtml5ValidateChange}
                            handleOmitExtraDataChange={handleOmitExtraDataChange}
                            handleLiveOmitChange={handleLiveOmitChange}
                        />
                    </div>

                    <section className='jsonFiddle'>
                        <SplitterLayout vertical={false} percentage={true} secondaryInitialSize={50} secondaryMinSize={50}>
                            <div className='fiddle-left-side'>
                                <div className='schema-layout layout-common'>
                                    <Editors data={collection} onDataUploaded={handleUpload} title='Schema' />
                                </div>
                                <div className='UI-schema-layout-result layout-common'>
                                    <Editors data={null} title='UI Schema' />
                                    <Editors data={formData} title='Result' />
                                </div>
                            </div>
                            <div className='fiddle-right-side'>
                                {!isEmpty(collection) && <Form
                                    schema={collection}
                                    // uiSchema={uiSchema} // optional for handling custom things in UI
                                    liveValidate={isLiveValidate}
                                    onSubmit={onSubmit}
                                    validator={validator}
                                    noHtml5Validate={isNoHtml5Validate}
                                    disabled={isDisabled}
                                    readonly={isReadOnly}
                                    formData={formData}
                                    liveOmit={liveOmit}
                                    omitExtraData={omitExtraData}
                                    showErrorList='top'
                                />}
                            </div>
                        </SplitterLayout>
                    </section>
                </main>
            }

        </main>
    );
};


FunctionCaller.defaultProps = {
    func: (...args: any[]) => { },
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



function generateInitialData(DagFuncList: any[] | (() => any[]) | (() => Promise<any[]>), setFuncList: React.Dispatch<any>, setIsError: React.Dispatch<React.SetStateAction<boolean>>, setIsLoading: React.Dispatch<React.SetStateAction<boolean>>) {
    if (isEmpty(DagFuncList)) {
        setFuncList([]); // Return an empty array if DagFuncList is not provided
        setIsError(true);
    }

    if (isObject(DagFuncList)) {
        setIsError(false);
        const result: any = DagFuncList;
        if (isFunction(result?.then)) {
            // Check if the result of the function is a promise
            result.then((dataArray: any) => {
                if (dataArray.length > 0) {
                    setFuncList(dataArray);
                } else {
                    setIsError(true);
                    setFuncList([]);
                }
                setIsLoading(false);
            });
        } else {
            setFuncList(result);
        }
    }

    // return;
    // if (isFunction(DagFuncList)) {
    //     setIsError(false);
    //     // Check if data is a function
    //     const result: any = DagFuncList();
    //     if (isFunction(result?.then)) {
    //         // Check if the result of the function is a promise
    //         result.then((dataArray: any) => {
    //             if (dataArray.length > 0) {
    //                 const list = storeGrouping(dataArray);
    //                 setFuncList(list.funcs); // storing FuncList
    //             } else {
    //                 setIsError(true);
    //             }
    //             setIsLoading(false);
    //         });
    //     } else {
    //         const dataArray = result as any[]; // Assuming the result is an array
    //         const list = storeGrouping(dataArray);
    //         setFuncList(list.funcs); // storing FuncList
    //         setIsLoading(false);
    //     }
    // } else if (isArray(DagFuncList)) {
    //     // Check if data is an array
    //     const list = storeGrouping(DagFuncList);
    //     setFuncList(list.funcs); // storing FuncList
    //     setIsLoading(false);
    // } else {
    //     setFuncList([]);
    //     setIsLoading(false);
    //     setIsError(true);
    // }
}
