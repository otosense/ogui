import React, { memo, useCallback, useEffect, useState } from 'react';
import { Handle, useReactFlow, useStoreApi, Position } from 'reactflow';
import { onNameHandlers, pythonIdentifierPattern } from '../../Utilities/globalFunction';
import { functionListMapping } from '../../Utilities/Mapping/functionListMapping';
import { apiMethod } from '../../API/ApiCalls';
import { isEmpty } from 'lodash';
import Spinner from '../../Utilities/Spinner';

function Select({ value, handleId, nodeId, sourcePosition, data, selector, isConnectable, labels, selectedValue }: any) {

  console.log({ value, handleId, nodeId, sourcePosition, data, selector, isConnectable, labels, selectedValue });
  const { setNodes } = useReactFlow();
  const store = useStoreApi();
  const [customValue, setCustomValue] = useState(value);
  const [valueText, setValueText] = useState(labels);
  const [validationMsg, setValidationMsg] = useState(false);
  const [inputCreator, setInputCreator] = useState<string[]>();



  const payload = {
    "_attr_name": '__getitem__',
    "k": ['funcstore', value]
  };

  // useEffect(() => {
  //     fetchData();
  // }, []);
  // const fetchData = getFunctionList(setLoading, setFuncList, setIsError);

  const response = apiMethod(payload);

  if (!isEmpty(response?.error)) {
    console.log('response.error', response?.error);
    // return <p>There is no Input defined API error</p>;
  }

  useEffect(() => {
    // const selectedFuncType = selector?.find((x: { value: string; }) => x.value === selectedValue);
    // console.log('selectedFuncType', selectedFuncType);
    // calling parameters list for selected functionNode 
    console.log('response?.data', response?.data?.signature?.parameters);
    const inputs = response?.data?.signature?.parameters.map((parameter: { name: string; }) => parameter.name);
    console.log('inputs', inputs);
    setInputCreator(inputs);
  }, [customValue, response?.data]);





  useEffect(() => {
    const { nodeInternals } = store.getState();
    setCustomValue(selectedValue);
    setNodes(
      Array.from(nodeInternals.values()).map((node) => {
        if (node.id === nodeId) {
          node.data = {
            ...node.data,
            label: selectedValue,
            ddType: selectedValue,
            selects: {
              // ...node.data.selects,
              hasValue: inputCreator?.length,
              [selectedValue]: selectedValue,
            },
          };
        }
        return node;
      })
    );
  }, [selectedValue, inputCreator]);


  const labelNameChange = useCallback((evt: { target: { value: any; }; }) => {
    const { nodeInternals } = store.getState();
    const inputValue = evt.target.value;
    const nameValidator = onNameHandlers(inputValue); // onNameHandlers for function names validation
    // if (pythonIdentifierPattern.test(inputValue)) {
    if (nameValidator) {
      setValueText(inputValue);
      setValidationMsg(false);
      setNodes(
        Array.from(nodeInternals.values()).map((node: any) => {
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
      {/* <select className="nodrag titleBox" onChange={onChange} value={value}>
        {
          selector?.map((option: { value: string, label: string; }) => (
            <option key={option?.value} value={option?.value}>
              {option?.label}
            </option>
          ))
        }
      </select> */}
      <h3 className='selectedFuncNode'>{selectedValue?.split('.').pop() || ''}</h3>
      <hr className='asas' />
      {(customValue === 'new') &&
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
      {console.log('rererere', response.isFetching, response.isLoading)}
      {response.isLoading && <div className='Spinner'><Spinner /></div>}
      {!isEmpty(response.error) ? <p>{response.error}</p> :

        <section className='handlers'>
          <div className='multiInput'>
            {inputCreator?.map((x: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined, i: React.Key | null | undefined) => {
              return (<div className='resultEdger' key={i}>
                <Handle type="target" position={data?.initialEdge === 'right' || sourcePosition === "right" ? Position.Top : Position.Left} id={x?.toString()} className='connector' isConnectable={isConnectable} />
                <span className='handlerText'>{x}</span>
              </div>);
            })}
          </div>
          <div className='resultEdger'>
            <Handle type="source" position={data?.initialEdge === 'right' || sourcePosition === "right" ? Position.Bottom : Position.Right} id={handleId} className='connector' isConnectable={isConnectable} />
            <span className='handlerText'>Output</span>
          </div>
        </section>
      }
    </div>
  );
}



function DropDownNode(props: { id: any; data: any; type: any; sourcePosition: any; funcLists: any; isConnectable: boolean; errorMapping: any; flowNodes: any; }) {

  const { id, data, type, sourcePosition, funcLists, isConnectable, errorMapping, flowNodes } = props;
  console.log({ id, data, type, sourcePosition, funcLists, isConnectable, errorMapping, flowNodes });

  const [selectedValue, setSelectedValue] = useState<string | undefined>();
  const [functionList, setFunctionList] = useState(funcLists);


  function errorMapper(errorMapping: any, id: string) {
    const errorNode = errorMapping.find((x: { id: string; }) => x.id === id);
    return errorNode ? 'BugFuncNode' : '';
  }

  useEffect(() => {
    const selectedNode = flowNodes.find((x: { id: string; }) => x.id === id);
    // re-mount the selected node after saving the node 
    // also Dag while DAG is Loaded this is set the Func Node functions
    setSelectedValue(selectedNode ? selectedNode?.data?.label : data?.label);
  }, [flowNodes]);


  useEffect(() => {
    // Mapping the Data for UI elements, creating structures like 
    // [  { value: 'add', label: 'add' },  { value: 'apply_fitted_model', label: 'apply_fitted_model' }]
    const result = functionListMapping(functionList);
    setFunctionList(result);
  }, [functionList]);





  return (
    <>
      {(selectedValue === "select function Node" || selectedValue === '' || selectedValue === undefined) ?
        <div className='addNode'>
          <h3 className='titleAddNode'>Add Nodes</h3>
          <select name="funcLists" id="funcLists" className="funcLists" value={selectedValue} onChange={(event: { target: { value: string; }; }) => setSelectedValue(event?.target?.value)}>
            {functionList.map((funcList: { value: string; label: string; }, index: number) => {
              // const functionName = funcList.label?.split('.').pop() || '';
              return <option key={index} value={funcList.value}>{funcList.label}</option>;
            })}

            {/* {funcLists.map((funcList: string, index: number) => {
              return <option key={index} value={funcList}>{funcList}</option>;
            })} */}
          </select>
        </div>
        :

        <section className={`text-updater-node ${type} ${errorMapper(errorMapping, id)}`}>
          {/* <h4 className={`nodeTitle ${type}`} title={data.label}>{data.label}</h4> */}
          <div className={`flexProps ${type}`}>
            <Select nodeId={id} value={data.ddType === 'new' ? data.ddType : data.label} handleId={data.label} sourcePosition={sourcePosition} data={data} selector={functionList} isConnectable={isConnectable} labels={data.label} selectedValue={selectedValue} />
          </div>

        </section>
      }
    </>
  );
}

export default memo(DropDownNode);