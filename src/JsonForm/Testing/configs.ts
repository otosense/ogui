const EndPointURL = 'http://20.219.8.178:8888'
// const EndPointURL = 'http://0.0.0.0:3030'
const FormSpecStore = `${EndPointURL}/form_spec_store`
const DagComponents = `${EndPointURL}/call_dag_component`

const funcName = 'funcs'
const dagName = 'dags'
const getAll = '__iter__'
const get = '__getitem__'
const set = '__setitem__'
const del = '__delitem__'
const errorKey = 'error'
const successKey = 'success'
const noStoreData = 'Error: There is No Store Data'
const successMessage = 'Success: Saved Successfully'
const resetMessage = 'Success: Reset Successfully Done'

export {
  EndPointURL,
  FormSpecStore,
  DagComponents,
  funcName,
  dagName,
  getAll,
  get,
  set,
  del,
  errorKey,
  successKey,
  noStoreData,
  successMessage,
  resetMessage
}
