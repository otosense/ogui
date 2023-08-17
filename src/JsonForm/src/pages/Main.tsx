import React, { memo } from 'react';
// import Form from '@rjsf/core';
import Form from '@rjsf/mui';
import validator from '@rjsf/validator-ajv8';
import { RJSFSchema, UiSchema } from '@rjsf/utils';

const ExampleForm = (props: { schema: RJSFSchema; liveValidate: boolean; uiSchema: UiSchema; handleSubmit: ({ formData }: any) => void; }) => {
    const { schema, liveValidate, uiSchema, handleSubmit } = props;

    return (
        <div>
            <h1>React JSON Schema Form Example</h1>
            <Form
                schema={schema}
                uiSchema={uiSchema}
                liveValidate={liveValidate}
                onSubmit={handleSubmit}
                validator={validator}
                noHtml5Validate
            />
        </div>
    );
};

export default memo(ExampleForm);
