import React, { memo, useCallback, useEffect, useState } from 'react';
import { Handle, useReactFlow, useStoreApi, Position } from 'reactflow';
import { onNameHandlers, pythonIdentifierPattern } from '../../Utilities/globalFunction';

function Select({ value, handleId, nodeId, sourcePosition, data, selector, isConnectable, labels, selectedValue }: any) {
  const { setNodes } = useReactFlow();
  const store = useStoreApi();
  const [customValue, setCustomValue] = useState(value);
  const [valueText, setValueText] = useState(labels);
  const [validationMsg, setValidationMsg] = useState(false);
  const [inputCreator, setInputCreator] = useState();

  useEffect(() => {
    const selectedFuncType = selector?.find((x: { value: string; }) => x.value === selectedValue);
    console.log('selectedFuncType', selectedFuncType);
    setInputCreator(selectedFuncType?.inputs);
  }, [customValue]);

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
      <h3 className='selectedFuncNode'>{selectedValue}</h3>
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


      <section className='handlers'>
        <div className='multiInput'>
          {inputCreator?.map((x: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined, i: React.Key | null | undefined) => {
            return (<div className='resultEdger' key={i}>
              <Handle type="target" position={data?.initialEdge === 'right' || sourcePosition === "right" ? Position.Top : Position.Left} id={x.toString()} className='connector' isConnectable={isConnectable} />
              <span className='handlerText'>{x}</span>
            </div>);
          })}
        </div>
        <div className='resultEdger'>
          <Handle type="source" position={data?.initialEdge === 'right' || sourcePosition === "right" ? Position.Bottom : Position.Right} id={handleId} className='connector' isConnectable={isConnectable} />
          <span className='handlerText'>Output</span>
        </div>
      </section>
    </div>
  );
}



function DropDownNode(props: { id: any; data: any; type: any; sourcePosition: any; funcLists: any; isConnectable: boolean; errorMapping: any; flowNodes: any; }) {

  const { id, data, type, sourcePosition, funcLists, isConnectable, errorMapping, flowNodes } = props;
  console.log({ id, data, type, sourcePosition, funcLists, isConnectable, errorMapping });

  const [selectedValue, setSelectedValue] = useState();


  function errorMapper(errorMapping: any, id: string) {
    const errorNode = errorMapping.find((x: { id: string; }) => x.id === id);
    return errorNode ? 'BugFuncNode' : '';
  }

  useEffect(() => {
    const selectedNode = flowNodes.find((x: { id: string; }) => x.id === id);
    setSelectedValue(selectedNode?.data?.label);
  }, [flowNodes]);



  return (
    <>
      {(selectedValue === "select function Node" || selectedValue === '' || selectedValue === undefined) ?
        <div className='addNode'>
          <h3 className='titleAddNode'>Add Nodes</h3>
          <select name="funcLists" id="funcLists" className="funcLists" value={selectedValue} onChange={(event) => setSelectedValue(event?.target?.value)}>
            {funcLists.map((funcList: { value: string; label: string; }) => {
              return <option key={funcList.value} value={funcList.value}>{funcList.label}</option>;
            })}
          </select>
        </div>
        :

        <section className={`text-updater-node ${type} ${errorMapper(errorMapping, id)}`}>
          {/* <h4 className={`nodeTitle ${type}`} title={data.label}>{data.label}</h4> */}
          <div className={`flexProps ${type}`}>
            <Select nodeId={id} value={data.ddType === 'new' ? data.ddType : data.label} handleId={data.label} sourcePosition={sourcePosition} data={data} selector={funcLists} isConnectable={isConnectable} labels={data.label} selectedValue={selectedValue} />
          </div>

        </section>
      }
    </>
  );
}

export default memo(DropDownNode);