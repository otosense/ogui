import React from 'react';
// import Form from '@rjsf/core';
import Form from '@rjsf/mui';
import validator from '@rjsf/validator-ajv8';
import { RJSFSchema, UiSchema } from '@rjsf/utils';
import Select from 'react-select';

// Note: 

// input text => where user can input we can validate input (rules are per user given)
// dependency check
// dropdown with multiple choices =>  need tick mark => we need to do customize
// single and multiple select checkbox



// add searchable dropdown
// add ReadOnly (not Editable)
// customize example: input box with searchable icon, 
// instead of highlighting the dropdown provide tick mark

const schema: RJSFSchema = {
    type: 'object',
    "title": "My title",
    "description": "My description",
    properties: {
        firstName: {
            type: 'string',
            title: 'First Name',
            minLength: 10
        },
        lastName: {
            type: 'string',
            title: 'Last Name',
            maxLength: 4
        },
        age: {
            type: 'number',
            title: 'Age',
        },
        password: {
            type: 'string',
            title: 'Password',
            minLength: 8, // Minimum length requirement
            pattern: '^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d!$%@#£€*?&]+$',
            description:
                'At least 8 characters, including at least one letter and one number.'
        },
        additionalItems: {
            type: "boolean"
        },
        check: {
            type: "string",
            enum: ["one", "two", "three"]
        },
        multiChoiceWithCheckBox: {
            type: "array",
            title: "A multiple-choice list With Checkboxes",
            items: {
                type: "string",
                enum: ["foo", "bar", "fuzz", "qux"],
            },
            uniqueItems: true
        },
        multiChoiceWithArray: {
            type: "array",
            title: "A multiple-choice list With Array",
            items: {
                type: "string",
                enum: ["foo", "bar", "fuzz", "qux"],
            },
            uniqueItems: true
        },
        done: {
            type: "string",
            enum: ["foo", "bar", "fuzz", "qux"],
        },
        fileUpload: {
            type: "string",
            format: "data-url",
        }
    },
    "required": ["firstName", "age", "additionalItems"],
    "dependencies": {
        "firstName": ["lastName"]
    }
};

const CustomMultiChoiceWidget = (props: { id: any; options: any; value: any; onChange: any; }) => {
    const { id, options, value, onChange } = props;

    const handleChange = (selectedOptions: any) => {
        const selectedValues = selectedOptions?.map((option: { value: any; }) => option.value);
        onChange(selectedValues);
    };
    console.log(' options.enum', options);
    const mappedOptions = options.enumOptions?.map((enumValue: any) => ({
        value: enumValue.value,
        label: enumValue.label
    }));

    return (
        <Select
            id={id}
            isMulti
            options={mappedOptions}
            value={mappedOptions?.filter((option: { value: any; }) => value.includes(option.value))}
            onChange={handleChange}
            placeholder="Select option(s)..."
        />
    );
};

const uiSchema: UiSchema = {

    "ui:order": ["firstName", "lastName", "age", "password", "multiChoiceWithArray", "someNumber", "check", "multiChoiceWithCheckBox", "additionalItems", "done", "fileUpload"],
    multiChoiceWithCheckBox: {
        "ui:widget": "checkboxes",
        "ui:options": {
            inline: true,
            addable: false
        }
        // "ui:options": {

        // },
    },
    fileUpload: {
        "ui:widget": "file",
        "ui:options": { accept: ".pdf" }
    },
    done: {
        "ui:widget": "radio" // could also be "select"
    },
    password: {
        'ui:widget': 'password'
    },
    firstName: {
        'ui:placeholder': 'Enter your first name',
        "ui:autofocus": true,
        required: true
    },
    lastName: {
        'ui:placeholder': 'Enter your last name',
        'ui:readonly': true,
    },
    age: {
        "ui:help": "The Age that can be used to contact you"
    },
    multiChoiceWithArray: {
        'ui:widget': CustomMultiChoiceWidget // Use the custom widget
    },
};




const CustomSearchable = () => {
    const initialFormData = {
        lastName: 'Smit' // Set your default value here
    };
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
                formData={initialFormData} // Pass initial form data
                liveValidate={false}
                noHtml5Validate
            />
        </div>
    );


};

export default CustomSearchable;

