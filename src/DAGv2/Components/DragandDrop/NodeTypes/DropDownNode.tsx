import React, { memo, useCallback, useEffect, useState } from 'react';
import { Handle, useReactFlow, useStoreApi, Position } from 'reactflow';
import { pythonIdentifierPattern } from '../../Utilities/globalFunction';
import { listMapping } from '../../Utilities/Mapping/listMapping';
import { apiMethod, getParams } from '../../API/ApiCalls';
import { isEmpty } from 'lodash';
import Spinner from '../../Utilities/Spinner';
import { ApiPayloadWithK, IDropDownNode, IFlowNode, IParamsDropDown } from '../../Utilities/Interfaces';
import { onNameHandlers } from '../../Utilities/Validations/TextValidation';

// funcNode Component main function starts at "DropDownNode" function below
function Select(props: IParamsDropDown) {
  const { value, handleId, nodeId, sourcePosition, data, selector, isConnectable, labels, selectedValue } = props;
  // console.log({ value, handleId, nodeId, sourcePosition, data, selector, isConnectable, labels, selectedValue });
  const { setNodes } = useReactFlow();
  const store = useStoreApi();
  const [customValue, setCustomValue] = useState(value);
  const [valueText, setValueText] = useState(labels);
  const [validationMsg, setValidationMsg] = useState(false);
  const [paramsLists, setParamsLists] = useState<string[]>([]);

  const [response, setResponse] = useState<any>({ signature: { parameters: [] } });;
  const [errorMessage, setErrorMessage] = useState<string>('');

  // Making API call when user Select the funcNode form the List 
  const payload: ApiPayloadWithK = {
    "_attr_name": '__getitem__',
    "k": ['funcs', value]
  };
  // API Handling Methods
  const mutation = getParams(payload, setResponse, setErrorMessage);

  useEffect(() => {
    // making API call once the value is set
    if (!isEmpty(value)) {
      mutation.mutate(value);
    }
  }, [value]);

  // useEffect(() => {
  //     fetchData();
  // }, []);
  // const fetchData = getFunctionList(setLoading, setFuncList, setIsError);

  useEffect(() => {
    // calling parameters list for selected functionNode 
    const inputs = response?.signature?.parameters.map((parameter: { name: string; }) => parameter.name);
    setParamsLists(inputs);
  }, [response]);

  useEffect(() => {
    const { nodeInternals } = store.getState();
    setCustomValue(selectedValue);
    setNodes(
      Array.from(nodeInternals.values()).map((node) => {
        if (node.id === nodeId) { // updating the each node based on user Selects
          node.data = {
            ...node.data,
            label: selectedValue,
            ddType: selectedValue,
            selects: {
              // ...node.data.selects,
              hasValue: paramsLists?.length,
              [selectedValue]: selectedValue,
            },
          };
        }
        return node;
      })
    );
  }, [selectedValue, paramsLists]);

  // labelNameChange this function is to handle Custom function right now its not in working
  const labelNameChange = useCallback((evt: { target: { value: string; }; }) => {
    const { nodeInternals } = store.getState();
    const inputValue = evt.target.value;
    const nameValidator = onNameHandlers(inputValue); // onNameHandlers for function names validation
    // if (pythonIdentifierPattern.test(inputValue)) {
    if (nameValidator) {
      setValueText(inputValue);
      setValidationMsg(false);
      setNodes(
        Array.from(nodeInternals.values()).map((node) => {
          if (node.id === nodeId) {
            node.data = {
              ...node.data,
              label: inputValue
            };
          }
          return node;
        })
      );
    } else {
      console.log("Invalid identifier");
      setValidationMsg(true);
    }
  }, []);
  return (
    <div className="custom-node__select">
      <h3 className='selectedFuncNode'>{selectedValue?.split('.').pop() || ''}</h3>
      <hr className='bottomLine' />
      {(customValue === 'new') && // Handling custom function but not in use right now
        <>
          <input id="text" name="text"
            onChange={labelNameChange}
            className="titleBox"
            value={valueText}
            placeholder='function Name'
            pattern={pythonIdentifierPattern.toString()}
          />
          {validationMsg && <span className='invalidMsg'>Invalid Entry</span>}
        </>
      }
      {/* <Handle type="target" position={data?.initialEdge === 'right' || sourcePosition === "right" ? Position.Top : Position.Left} id={handleId} className='connector' isConnectable={isConnectable} />
      <Handle type="source" position={data?.initialEdge === 'right' || sourcePosition === "right" ? Position.Bottom : Position.Right} id={handleId} className='connector' isConnectable={isConnectable} /> */}
      {/* {mutation.isLoading && <div className='Spinner'><Spinner /></div>} */}
      {/* Preparation of Handle to connect */}
      {!isEmpty(errorMessage) ? <p>{errorMessage}</p> :
        (
          paramsLists.length > 0 &&
          <section className='handlers'>
            <div className='multiInput'>
              {paramsLists?.map((paramsList: string, i: number) => {
                return (<div className='resultEdger' key={i}>
                  <Handle type="target" position={data?.initialEdge === 'right' || sourcePosition === "right" ? Position.Top : Position.Left} id={paramsList} className='connector' isConnectable={isConnectable} />
                  <span className='handlerText'>{paramsList}</span>
                </div>);
              })}
            </div>
            <div className='resultEdger'>
              <Handle type="source" position={data?.initialEdge === 'right' || sourcePosition === "right" ? Position.Bottom : Position.Right} id={handleId} className='connector' isConnectable={isConnectable} />
              <span className='handlerText'>Output</span>
            </div>
          </section>)
      }
    </div>
  );
}

// function caller(payload: { _attr_name: string; k: any[]; }) {
//   return apiMethod(payload);
// }

function DropDownNode(props: IDropDownNode) {
  // which will receive all the properties from the Dagger Component 
  const { id, data, type, sourcePosition, funcLists, isConnectable, errorMapping, flowNodes } = props;
  // console.log({ id, data, type, sourcePosition, funcLists, isConnectable, errorMapping, flowNodes });

  const [selectedValue, setSelectedValue] = useState<string>(); // Selected value from the DropDown
  const [functionList, setFunctionList] = useState(funcLists); // List of available funcNodes

  // errorMapper => help us to find the empty nodes or node where parameter are still empty without connection
  function errorMapper(errorMapping: any[], id: string) {
    const errorNode = errorMapping.find((x: IFlowNode) => x.id === id);
    return errorNode ? 'BugFuncNode' : '';
  }

  useEffect(() => {
    const selectedNode: any = flowNodes.find((x: { id: string; }) => x.id === id);
    // re-mount the selected node after saving the node 
    // also Dag while DAG is Loaded this is set the Func Node functions
    setSelectedValue(selectedNode?.data?.label || data?.label);
  }, [flowNodes]);



  useEffect(() => {
    // Mapping the Data for UI elements, creating structures like 
    // [  { value: 'add', label: 'add' },  { value: 'apply_fitted_model', label: 'apply_fitted_model' }]
    const result: any = listMapping(functionList);
    setFunctionList(result);
  }, [functionList]);

  return (
    <>
      {/* When component load initially it will show the dropdown list Once selectedValue has proper value it will make an API call to get the list of params and which is plotted in "Handle" HTML Element */}
      {(selectedValue === "select function Node" || selectedValue === '' || selectedValue === undefined) ?
        <div className='addNode'>
          <h3 className='titleAddNode'>Add Nodes</h3>
          <select name="funcLists" id="funcLists" className="funcLists" value={selectedValue} onChange={(event: { target: { value: string; }; }) => setSelectedValue(event?.target?.value)}>
            {functionList?.map((funcList, index: number) => {
              // const functionName = funcList.label?.split('.').pop() || '';
              return <option key={index} value={funcList.value}>{funcList.label}</option>;
            })}
          </select>
        </div>
        :

        <section className={`text-updater-node ${type} ${errorMapper(errorMapping, id)}`}>
          {/* <h4 className={`nodeTitle ${type}`} title={data.label}>{data.label}</h4> */}
          <div className={`flexProps ${type}`}>
            <Select
              nodeId={id}
              value={data.ddType === 'new' ? data.ddType : data.label}
              handleId={data.label}
              sourcePosition={sourcePosition}
              data={data}
              selector={functionList}
              isConnectable={isConnectable}
              labels={data.label}
              selectedValue={selectedValue} />
          </div>

        </section>
      }
    </>
  );
}

export default memo(DropDownNode);