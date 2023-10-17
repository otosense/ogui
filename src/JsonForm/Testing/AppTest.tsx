import React from 'react';
import { RJSFSchema } from '@rjsf/utils';
import FunctionCaller from '../FunctionCaller';

function AppTest() {
    const sum = (a: number, b: number) => {
        const output = a + b;
        // console.log('object', output, typeof output);
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

    const getFullFormSpecStore = async () => {

        const payload = {
            "_attr_name": '__iter__',
        };
        // Saving the Dag to Backend using API
        try {
            const response = await fetch("http://20.219.8.178:8080/form_spec_store", {
                method: "POST",
                body: JSON.stringify({
                    ...payload
                }),
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                }
            });

            if (!response.ok) {
                throw new Error("Network response was not ok");
            }

            const json = await response.json();
            // console.log('json', json);
            return json;
        } catch (error) {
            console.error("Error fetching data:", error);
            return []; // Return an empty array or handle the error appropriately
        }
    };

    const getSchemaForForm = async (data: any) => {
        const payload = {
            "_attr_name": "__getitem__",
            "key": data
        };

        try {
            const response = await fetch("http://20.219.8.178:8080/form_spec_store", {
                method: "POST",
                body: JSON.stringify({
                    ...payload
                }),
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                }
            });

            if (!response.ok) {
                throw new Error("Network response was not ok");
            }

            const json = await response.json();
            // console.log('json', json);
            return json;
        } catch (error) {
            console.error("Error fetching data:", error);
            return []; // Return an empty array or handle the error appropriately
        }
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

    // const getSchema = () => {
    //     return schema;
    // };


    const configuration = {
        getStoreList: getFullFormSpecStore(),
        onLoadSchema: getSchemaForForm,
        func: sum,
    };
    return (
        <FunctionCaller {...configuration} />
    );
}
export default AppTest;
