import React from 'react';
import { RJSFSchema } from '@rjsf/utils';
import FunctionCaller from '../FunctionCaller';

function AppTest() {
    const sum = (a: number, b: number) => {
        const output = a + b;
        console.log('object', output, typeof output);
        return output;
    };

    const schema = {
        type: 'object',
        "title": "Sum",
        "description": "Sum",
        properties: {
            a: {
                type: 'number',
                title: 'a',
            },
            b: {
                type: 'number',
                title: 'b',
            },
        },
        required: ['a', 'b']
    };



    // const schema = {
    //     "title": "A registration form",
    //     "description": "A simple form example.",
    //     "type": "object",
    //     "required": [
    //         "firstName",
    //         "lastName"
    //     ],
    //     "properties": {
    //         "firstName": {
    //             "type": "string",
    //             "title": "First name",
    //             "default": "Chuck"
    //         }
    //     }
    // };

    // const getSchema = async () => {
    //     return await schema;
    // };

    const getSchema = () => {
        return schema;
    };


    const configuration = {
        schema: getSchema(),
        // schema: schema,
        liveValidate: false,
        func: sum,
        validator: true,
    };
    return (
        <FunctionCaller {...configuration} />
    );
}
export default AppTest;
