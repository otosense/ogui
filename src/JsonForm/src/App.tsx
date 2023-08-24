import React from 'react';
import FunctionCaller from './pages/FunctionCaller';
import { RJSFSchema } from '@rjsf/utils';

function App() {
  const sum = (a: number, b: number) => {
    console.log('object submitted', a, b);
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
export default App;
