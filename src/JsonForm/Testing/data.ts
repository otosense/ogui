export const store = [
    "olab.objects.dpp.accuracy",
    "olab.objects.dpp.chunker",
    "olab.objects.dpp.confusion_matrix",
    "olab.objects.dpp.dflt_aggregator",
    "olab.objects.dpp.dflt_classifier",
    "olab.objects.dpp.dflt_featurizer",
    "olab.objects.dpp.json_reader",
    "olab.objects.dpp.kfold_matrix",
    "olab.objects.dpp.lin_spectral_projector",
    "olab.objects.dpp.no_chunker",
    "olab.objects.dpp.train_test",
    "olab.objects.file.read_json",
    "olab.objects.file.read_simple_excel",
    "olab.objects.file.read_wav",
    "olab.objects.store.azure_container",
    "olab.objects.store.default_azure_container",
    "olab.objects.store.get_items",
    "olab.objects.str.join_strings",
    "olab.objects.str.split_string",
    "olab.objects.table.aggregate_column_wise",
    "olab.objects.table.aggregate_row_wise",
    "olab.objects.table.apply_element_wise",
    "olab.objects.table.drop_duplicate_rows",
    "olab.objects.table.extract_columns_by_index",
    "olab.objects.table.extract_columns_by_name",
    "olab.objects.table.extract_rows_by_index",
    "olab.objects.table.extract_rows_by_name",
    "olab.objects.table.format_for_training",
    "olab.objects.table.get_column_values",
    "olab.objects.table.set_column_values",
    "olab.objects.util.get_config"
];

export const specifications = {
    "rjsf": {
        "schema": {
            "title": "accuracy",
            "type": "object",
            "properties": {
                "prediction_table": {
                    "type": "string"
                }
            },
            "required": [
                "prediction_table"
            ]
        },
        "uiSchema": {
            "ui:submitButtonOptions": {
                "submitText": "Run"
            },
            "prediction_table": {
                "ui: autofocus": true
            }
        },
        "liveValidate": false,
        "disabled": false,
        "readonly": false,
        "omitExtraData": false,
        "liveOmit": false,
        "noValidate": false,
        "noHtml5Validate": false,
        "focusOnFirstError": false,
        "showErrorList": "top"
    }
};