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
    saveSchema: any;
}

interface IFormData { [key: string]: any; }


const FunctionCaller = (props: IFunctionCallerProps) => {
    const { func, getStoreList, onLoadSchema, saveSchema } = props;
    console.log('object', props);
    const [collection, setCollection] = useState<any>({});
    const [isError, setIsError] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [funcList, setFuncList] = useState({});
    const [formData, setFormData] = useState({});
    const [selectedFormType, setSelectedFormType] = useState<any>({});

    const onSubmit = (props: IFormData) => {
        const { formData } = props;
        setFormData(formData);
        // setCollection((prevCollection: any) => ({
        //     ...prevCollection,
        //     formData, // Append form data
        // }));
        return func(...Object.values(formData));
    };

    // const [orientation, setOrientation] = useState(false);
    // const onChange = (viewPosition: boolean | ((prevState: boolean) => boolean)) => {
    //     setOrientation(viewPosition);
    // };

    const handleUpload = useCallback((data: any) => {
        setCollection(JSON.parse(data));
    }, []);

    const schemaData = (data: { rjsf: any; }) => {
        setCollection((data?.rjsf));
    };


    useEffect(() => {
        generateInitialData(getStoreList, setFuncList, setIsError, setIsLoading);
        // dataGenerator(schema, setFuncList, setIsError);
    }, [getStoreList]);

    const handleValue = (value: any) => {
        setSelectedFormType(value);
    };

    if (isLoading) return <LoadingOverlay />;

    return (
        <main>
            {isError ? (<Alert severity='error' className='errorMessage'>
                There is an Error getting FuncList data
            </Alert>) :
                <main className='main-json-fiddle'>
                    <h1 className='center'>JSON Form Fiddle</h1>
                    <div className='inputs-fiddle'>
                        <SearchBox handleValue={handleValue} data={funcList} onLoadSchema={onLoadSchema} schemaData={schemaData} />
                    </div>

                    <section className='jsonFiddle'>
                        <SplitterLayout vertical={false} percentage={true} secondaryInitialSize={50} secondaryMinSize={50}>
                            <div className='fiddle-left-side'>
                                <div className='schema-layout layout-common'>
                                    <Editors data={collection} onDataUploaded={handleUpload} title='Specifications' saveSchema={saveSchema} formType={selectedFormType} />
                                </div>
                            </div>
                            <div className='fiddle-right-side'>
                                {!isEmpty(collection) &&
                                    <Form
                                        validator={validator}
                                        {...collection}
                                        onSubmit={onSubmit}
                                    />
                                }
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
    setIsLoading(true);
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
        setIsLoading(false);
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
