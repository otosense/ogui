export const store =
[['funcs', 'olab.objects.dpp.aggregators.dflt_aggregator'],
  ['funcs', 'olab.objects.dpp.aggregators.max_counts'],
  ['funcs', 'olab.objects.dpp.base.execute'],
  ['funcs', 'olab.objects.dpp.base.get_dpp'],
  ['funcs', 'olab.objects.dpp.base.get_prediction_table'],
  ['funcs', 'olab.objects.dpp.base.load_from_store'],
  ['funcs', 'olab.objects.dpp.base.save_in_store'],
  ['funcs', 'olab.objects.dpp.base.train_test'],
  ['funcs', 'olab.objects.dpp.chunkers.chunker'],
  ['funcs', 'olab.objects.dpp.chunkers.no_chunker'],
  ['funcs', 'olab.objects.dpp.classifiers.isolation_forest'],
  ['funcs', 'olab.objects.dpp.classifiers.logistic_regression'],
  ['funcs', 'olab.objects.dpp.classifiers.one_class_svm'],
  ['funcs', 'olab.objects.dpp.classifiers.outlier_model'],
  ['funcs', 'olab.objects.dpp.classifiers.random_forest'],
  ['funcs', 'olab.objects.dpp.crossval_matrices.hold_out'],
  ['funcs', 'olab.objects.dpp.crossval_matrices.k_fold'],
  ['funcs', 'olab.objects.dpp.crossval_matrices.k_fold_nominal'],
  ['funcs', 'olab.objects.dpp.featurizers.dflt_featurizer'],
  ['funcs', 'olab.objects.dpp.featurizers.fft_amplitude'],
  ['funcs', 'olab.objects.dpp.featurizers.fft_energy'],
  ['funcs', 'olab.objects.dpp.metrics.accuracy'],
  ['funcs', 'olab.objects.dpp.readers.json_reader'],
  ['funcs', 'olab.objects.file.read_csv'],
  ['funcs', 'olab.objects.file.read_json'],
  ['funcs', 'olab.objects.file.read_simple_excel'],
  ['funcs', 'olab.objects.file.read_wav'],
  ['funcs', 'olab.objects.projects.sms.data_library'],
  ['funcs', 'olab.objects.projects.sms.dpp_library'],
  ['funcs', 'olab.objects.projects.sms.golden_samples'],
  ['funcs', 'olab.objects.store.azure_container'],
  ['funcs', 'olab.objects.store.get_item'],
  ['funcs', 'olab.objects.store.get_keys'],
  ['funcs', 'olab.objects.store.otosense_data_library'],
  ['funcs', 'olab.objects.store.otosense_dpp_library'],
  ['funcs', 'olab.objects.store.set_item'],
  ['funcs', 'olab.objects.str.join_strings'],
  ['funcs', 'olab.objects.str.split_string'],
  ['funcs', 'olab.objects.table.aggregate_column_wise'],
  ['funcs', 'olab.objects.table.aggregate_row_wise'],
  ['funcs', 'olab.objects.table.apply_element_wise'],
  ['funcs', 'olab.objects.table.concatenate'],
  ['funcs', 'olab.objects.table.create_table'],
  ['funcs', 'olab.objects.table.display'],
  ['funcs', 'olab.objects.table.drop_duplicate_rows'],
  ['funcs', 'olab.objects.table.extract_columns_by_index'],
  ['funcs', 'olab.objects.table.extract_columns_by_name'],
  ['funcs', 'olab.objects.table.extract_rows_by_index'],
  ['funcs', 'olab.objects.table.extract_rows_by_name'],
  ['funcs', 'olab.objects.table.format_for_training'],
  ['funcs', 'olab.objects.table.get_column_values'],
  ['funcs', 'olab.objects.table.load_from_store'],
  ['funcs', 'olab.objects.table.save_in_store'],
  ['funcs', 'olab.objects.table.set_column_values'],
  ['funcs', 'olab.objects.util.get_config'],
  ['dags', 'test'],
  ['dags', 'sample_1'],
  ['dags', 'split_strings'],
  ['dags', 'testing_1'],
  ['dags', 'testing_2']]

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
