import { RJSFSchema } from "@rjsf/utils";

const schema: RJSFSchema = {
    type: 'object',
    "title": "My title",
    "description": "My description",
    properties: {
        firstName: {
            type: 'string',
            title: 'First Name',
            minLength: 10,
            default: "abcdefghijkl" // which set value to the input field
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
    // "required": ["firstName", "age", "additionalItems"],
    "dependencies": {
        "firstName": ["lastName"]
    }
};