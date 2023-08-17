import React, { memo } from 'react';
// import Form from '@rjsf/core';
import Form from '@rjsf/mui';
import validator from '@rjsf/validator-ajv8';
import { RJSFSchema, UiSchema } from '@rjsf/utils';

const FunctionCaller = (props: { schema: RJSFSchema; liveValidate: boolean; uiSchema: UiSchema; func: (...args: any[]) => any; }) => {
    const { schema, liveValidate, uiSchema, func } = props;

    return (
        <div>
            <h1>React JSON Schema Form Example</h1>
            <Form
                schema={schema}
                uiSchema={uiSchema}
                liveValidate={liveValidate}
                onSubmit={func}
                validator={validator}
                noHtml5Validate
            />
        </div>
    );
};

export default memo(FunctionCaller);
