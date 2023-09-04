import React from 'react';
import { RJSFSchema } from '@rjsf/utils';
import FunctionCaller from '../FunctionCaller';

function AppTest() {
    const sum = (a: number, b: number) => {
        const output = a + b;
        console.log('object', output, typeof output);
        return output;
    };

    const schema: RJSFSchema = {
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
        "required": ["a", "b"],
    };

    return (
        <FunctionCaller schema={schema} liveValidate={false} func={sum} />
    );
}
export default AppTest;
