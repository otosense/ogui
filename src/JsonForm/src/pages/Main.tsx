import React from 'react';
// import Form from '@rjsf/core';
import Form from '@rjsf/mui';
import validator from '@rjsf/validator-ajv8';



const schema: any = {
    type: 'object',
    properties: {
        firstName: {
            type: 'string',
            title: 'First Name'
        },
        lastName: {
            type: 'string',
            title: 'Last Name'
        },
        age: {
            type: 'number',
            title: 'Age'
        }
    }
};

const uiSchema = {
    firstName: {
        'ui:placeholder': 'Enter your first name'
    },
    lastName: {
        'ui:placeholder': 'Enter your last name'
    }
};

const ExampleForm = () => {
    const handleSubmit = ({ formData }: any) => {
        console.log('Form data submitted:', formData);
    };

    return (
        <div>
            <h1>React JSON Schema Form Example</h1>
            <Form
                schema={schema}
                uiSchema={uiSchema}
                onSubmit={handleSubmit}
                validator={validator}
                liveValidate
            />
        </div>
    );
};

export default ExampleForm;
