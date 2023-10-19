import React, { useState } from 'react'
import Form from '@rjsf/mui'
import { type FormProps } from '@rjsf/core'
import { type RJSFSchema } from '@rjsf/utils'
import validator from '@rjsf/validator-ajv8'

interface IFunctionCallerProps extends FormProps<any, RJSFSchema, any> {
  func: (...args: any[]) => any
  egress?: (...args: any[]) => any
}

type IFormData = Record<string, any>

const FunctionCaller = (props: IFunctionCallerProps): JSX.Element => {
  const { func, ...formProps } = props
  const [show, setShow] = useState()

  const onSubmit = ({ formData }: IFormData): void => {
    const output = func(...Object.values(formData))
    setShow((props.egress != null) ? props.egress(output) : output)
  }

  return (
        <div>
            <h1>React JSON Schema Form Example</h1>
            <Form
                {...formProps}
                onSubmit={onSubmit}
                noHtml5Validate
            />
            {/* this will show the output of the egress where the HTML is defined by the output function */}
            {show}
        </div>
  )
}

FunctionCaller.defaultProps = {
  validator
}

export default (FunctionCaller)

/* AppTest.tsx for the egress module

import React from 'react'
import { type RJSFSchema } from '@rjsf/utils'
import FunctionCaller from '../FunctionCaller'

function AppTest (): JSX.Element {
  const sum = (a: number, b: number): number => {
    const output = a + b
    console.log('object', output, typeof output)
    return <h1>{output}</h1>
  }

  const schema: RJSFSchema = {
    type: 'object',
    title: 'Sum',
    description: 'Sum',
    properties: {
      a: {
        type: 'number',
        title: 'a'
      },
      b: {
        type: 'number',
        title: 'b'
      }
    },
    required: ['a', 'b']
  }

  const egress = (output: any): any => {
    return output
  }

  return (
        <FunctionCaller schema={schema} liveValidate={false} func={sum} egress={egress} />
  )
}
export default AppTest

*/
