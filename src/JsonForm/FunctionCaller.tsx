import React, { memo, useCallback, useState } from 'react';
import Form from '@rjsf/mui';
import validator from '@rjsf/validator-ajv8';
// ./Components/JSONLayout/Schema
import JsonEditor from './../DAG/Components/JSONLayout/Schema';
interface IFunctionCallerProps {
    schema: Object; // please refer to Schema File in the Testing Folder. that how the schema structure is expected 
    liveValidate: boolean;
    func: (...args: any[]) => any | void;
}

interface IFormData { [key: string]: any; }


const FunctionCaller = (props: IFunctionCallerProps) => {
    const { schema, liveValidate, func } = props;
    const [orientation, setOrientation] = useState(false);
    const [collection, setCollection] = useState(schema);

    const onSubmit = ({ formData }: IFormData) => {
        return func(...Object.values(formData));
    };

    const onChange = (viewPosition: boolean | ((prevState: boolean) => boolean)) => {
        setOrientation(viewPosition);
    };

    const handleUpload = useCallback((data: any) => {
        console.log('data', data);
        setCollection(data);
    }, []);
    return (
        <div>
            <h1>React JSON Schema Form Example</h1>
            <section className='checking'>


                <Form
                    schema={collection}
                    // uiSchema={uiSchema} // optional for handling custom things in UI
                    liveValidate={liveValidate}
                    onSubmit={onSubmit}
                    validator={validator}
                    noHtml5Validate
                />

                <JsonEditor layout={onChange} data={schema} onDataUploaded={handleUpload} />
            </section>
        </div>
    );
};


FunctionCaller.defaultProps = {
    liveValidate: false,
    schema: {},
    func: (...args: any[]) => { },
};

export default (FunctionCaller);
