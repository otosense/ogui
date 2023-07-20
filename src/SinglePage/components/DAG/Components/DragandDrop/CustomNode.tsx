import React, { memo, useCallback, useEffect, useState } from 'react';
import { Handle, useReactFlow, useStoreApi, Position } from 'reactflow';
import { pythonIdentifierPattern } from '../Utilities/globalFunction';
import * as API from './../API/API';

function Select({ value, handleId, nodeId, sourcePosition, data, selector, isConnectable }: any) {
  const { setNodes } = useReactFlow();
  const store = useStoreApi();
  const [customValue, setCustomValue] = useState();
  const [valueText, setValueText] = useState('');
  const [validationMsg, setValidationMsg] = useState(false);
  const [allowConnection, setAllowConnection] = useState(isConnectable);

  const onChange = (evt: { target: { value: any; }; }) => {
    const { nodeInternals } = store.getState();
    setCustomValue(evt.target.value);
    setNodes(
      Array.from(nodeInternals.values()).map((node) => {
        if (node.id === nodeId) {
          node.data = {
            ...node.data,
            label: evt.target.value,
            ddType: evt.target.value,
            selects: {
              ...node.data.selects,
              [handleId]: evt.target.value,
            },
          };
        }
        return node;
      })
    );
  };

  const labelNameChange = useCallback((evt: { target: { value: any; }; }) => {
    const { nodeInternals } = store.getState();
    const inputValue = evt.target.value;
    if (pythonIdentifierPattern.test(inputValue)) {
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

  useEffect(() => {
    setAllowConnection(customValue === "new" ? valueText?.length > 0 : true);
  }, [customValue, valueText]);


  return (
    <div className="custom-node__select">
      <select className="nodrag titleBox" onChange={onChange} value={value}>
        {
          selector?.map((option: { value: string, label: string; }) => (
            <option key={option?.value} value={option?.value}>
              {option?.label}
            </option>
          ))
        }
      </select>
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
      <Handle type="target" position={data?.initialEdge === 'right' || sourcePosition === "right" ? Position.Top : Position.Left} id={handleId} className='connector' isConnectable={allowConnection} />
      <Handle type="source" position={data?.initialEdge === 'right' || sourcePosition === "right" ? Position.Bottom : Position.Right} id={handleId} className='connector' isConnectable={allowConnection} />
    </div>
  );
}



function CustomNode(props: { id: any; data: any; type: any; sourcePosition: any; funcList: any; isConnectable: boolean; }) {
  const { id, data, type, sourcePosition, funcList, isConnectable } = props;
  return (
    <section className={`text-updater-node ${type}`}>
      <h4 className={`nodeTitle ${type}`}>func_node</h4>
      <div className={`flexProps ${type}`}>
        <Select nodeId={id} value={data.ddType === 'new' ? data.ddType : data.label} handleId={data.label} sourcePosition={sourcePosition} data={data} selector={funcList} isConnectable={isConnectable} />
      </div>

    </section>
  );
}

export default memo(CustomNode);