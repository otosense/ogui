export const loadDagFuncList = [
  [
    'funcs',
    'data.execute'
  ],
  [
    'dags',
    'step_7__train_and_save_sms_recognition_dpp'
  ]
]

export const onloadSavedDagData = {
  name: 'step_1__show_sms_table_from_azure',
  func_nodes: [
    {
      name: 'xls_bytes_',
      func_label: 'xls_bytes',
      out: 'xls_bytes',
      func: 'olab.objects.store.get_item',
      bind: {
        key: 'path_to_xls_file',
        store: 'golden_samples'
      }
    },
    {
      name: 'xls_table_',
      func_label: 'xls_table',
      out: 'xls_table',
      func: 'olab.objects.file.read_simple_excel',
      bind: {
        file_bytes: 'xls_bytes'
      }
    },
    {
      name: 'table_display_',
      func_label: 'table_display',
      out: 'table_display',
      func: 'olab.objects.table.display',
      bind: {
        table: 'xls_table'
      }
    },
    {
      name: 'golden_samples_',
      func_label: 'golden_samples',
      out: 'golden_samples',
      func: 'olab.objects.projects.sms.golden_samples',
      bind: {}
    }
  ]
}

export const executeData = {
  name: 'execute',
  signature: {
    parameters: [
      {
        name: 'dpp'
      },
      {
        name: 'file_bytes'
      }
    ]
  }
}
