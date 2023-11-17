export const store =
[['funcs', 'olab.objects.dpp.aggregators.dflt_aggregator'],
  ['funcs', 'olab.objects.dpp.aggregators.max_counts'],
  ['funcs', 'olab.objects.dpp.base.execute'],
  ['dags', 'test'],
  ['dags', 'sample_1']
]

export const specifications = {
  rjsf: {
    schema: {
      title: 'accuracy',
      type: 'object',
      properties: {
        prediction_table: {
          type: 'string'
        }
      },
      required: [
        'prediction_table'
      ]
    },
    uiSchema: {
      'ui:submitButtonOptions': {
        submitText: 'Run'
      },
      prediction_table: {
        'ui: autofocus': true
      }
    },
    liveValidate: false,
    disabled: false,
    readonly: false,
    omitExtraData: false,
    liveOmit: false,
    noValidate: false,
    noHtml5Validate: false,
    focusOnFirstError: false,
    showErrorList: 'top'
  }
}
