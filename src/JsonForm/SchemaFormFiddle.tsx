import React, { memo, useCallback, useEffect, useState } from 'react';
import Form from '@rjsf/mui';
import validator from '@rjsf/validator-ajv8';
import { isArray, isEmpty, isFunction, isObject } from 'lodash';
import { Alert } from '@mui/material';
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
    const [orientation, setOrientation] = useState(false);

    const onSubmit = (props: IFormData) => {
        const { formData } = props;
        setFormData(formData);
        // setCollection((prevCollection: any) => ({
        //     ...prevCollection,
        //     formData, // Append form data
        // }));
    };

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
    }, [getStoreList]);

    const handleValue = (value: any) => {
        setSelectedFormType(value);
    };


    // change the left side Schema Editor view position
    useEffect(() => {
        // Function to handle window resize
        const handleResize = () => {
            setOrientation(window.innerWidth < 768);
        };

        // Add event listener for window resize
        window.addEventListener('resize', handleResize);

        // Initial check for screen size when the component mounts
        handleResize();

        // Clean up the event listener when the component unmounts
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

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
