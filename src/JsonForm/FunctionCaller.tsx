import React, { memo } from 'react';
import Form from '@rjsf/mui';
import validator from '@rjsf/validator-ajv8';

interface IFunctionCallerProps {
    schema: Object; // please refer to Schema File in the Testing Folder. that how the schema structure is expected 
    liveValidate: boolean;
    func: (...args: any[]) => any | void;
}

interface IFormData { [key: string]: any; }


const FunctionCaller = (props: IFunctionCallerProps) => {
    const { schema, liveValidate, func } = props;

    const onSubmit = ({ formData }: IFormData) => {
        return func(...Object.values(formData));
    };

    return (
        <div>
            <h1>React JSON Schema Form Example</h1>
            <Form
                schema={schema}
                // uiSchema={uiSchema} // optional for handling custom things in UI
                liveValidate={liveValidate}
                onSubmit={onSubmit}
                validator={validator}
                noHtml5Validate
            />
        </div>
    );
};


FunctionCaller.defaultProps = {
    liveValidate: false,
    schema: {},
    func: (...args: any[]) => { },
};

export default (FunctionCaller);
