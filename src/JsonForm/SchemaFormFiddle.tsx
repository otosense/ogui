import React, { memo, useCallback, useEffect, useState } from 'react';
import Form from '@rjsf/mui';
import validator from '@rjsf/validator-ajv8';
import { isEmpty, isFunction, isObject } from 'lodash';
import { Alert } from '@mui/material';
import { FormProps } from '@rjsf/core';
import { RJSFSchema } from '@rjsf/utils';
import SplitterLayout from 'react-splitter-layout';
import SearchBox from './components/SearchBox';
import Editors from './components/Editor';
import LoadingOverlay from '../utilities/Loader';
import { useOrientation } from '../utilities/withOrientationEffect';

interface IFunctionCallerProps extends FormProps<any, RJSFSchema, any> {
    getStoreList: [] | (() => []) | (() => Promise<any[]>);
    onLoadSchema: {} | (() => {}) | (() => Promise<{}>);
    saveSchema: any;
}

interface IFormData { [key: string]: any; }


const SchemaFormFiddle = (props: IFunctionCallerProps) => {
    const { getStoreList, onLoadSchema, saveSchema } = props;
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
    };
    // handle orientation change
    const orientation = useOrientation((orientation: boolean) => orientation);

    const handleUpload = useCallback((data: any) => {
        setCollection(JSON.parse(data));
    }, []);

    const schemaData = (data: { rjsf: any; }) => {
        setCollection((data?.rjsf));
    };


    useEffect(() => {
        generateInitialData(getStoreList, setFuncList, setIsError, setIsLoading);
    }, [getStoreList]);

    const handleValue = (value: any) => {
        setSelectedFormType(value);
    };

    if (isLoading) return <LoadingOverlay />;

    return (
        <main>
            {isError ? (<Alert severity='error' className='errorMessage'>
                There is an Error getting Store List data
            </Alert>) :
                <main className='main-json-fiddle'>
                    <h1 className='center'>JSON Form Fiddle</h1>
                    <div className='inputs-fiddle'>
                        <SearchBox handleValue={handleValue} data={funcList} onLoadSchema={onLoadSchema} schemaData={schemaData} />
                    </div>

                    <section className='jsonFiddle'>
                        <SplitterLayout vertical={orientation} percentage={true} secondaryInitialSize={50} secondaryMinSize={50}>
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
                                        formData={formData} // remove this to clear the value once the submit button is clicked
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


SchemaFormFiddle.defaultProps = {
    getStoreList: [],
    onLoadSchema: {},
    saveSchema: {}
};

export default memo(SchemaFormFiddle);
function generateInitialData(DagFuncList: any[] | (() => any[]) | (() => Promise<any[]>), setFuncList: React.Dispatch<any>, setIsError: React.Dispatch<React.SetStateAction<boolean>>, setIsLoading: React.Dispatch<React.SetStateAction<boolean>>) {
    // setIsLoading(true);
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
}
