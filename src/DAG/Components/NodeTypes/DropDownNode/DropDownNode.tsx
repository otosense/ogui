import React, { memo, useEffect, useState } from 'react';
import { IDropDownNode, IFlowNode } from '../../Interfaces';
import SearchBox from '../../SearchBox';
import SelectConfigure from './DropDownConfigure';
import { Checkbox, FormControlLabel } from '@mui/material';

// funcNode Component main function starts at "DropDownNode" function below


function usePersistentState(key: string, defaultValue: any) {
  // Initialize state with the saved value or the defaultValue
  const [state, setState] = useState(() => {
    const storedValue = localStorage.getItem(key);
    return storedValue ? JSON.parse(storedValue) : defaultValue;
  });

  // Use useEffect to save the state to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(state));
  }, [key, state]);

  return [state, setState];
}

function DropDownNode(props: IDropDownNode) {
  // which will receive all the properties from the Dagger Component 
  const { id, data, type, sourcePosition, funcLists, isConnectable, errorMapping, flowNodes, loadParamsList } = props;
  // console.log({ id, data, type, sourcePosition, funcLists, isConnectable, errorMapping, flowNodes });

  const [selectedValue, setSelectedValue] = useState<string | undefined>(data?.label); // Selected value from the DropDown
  // const [functionList, setFunctionList] = useState(funcLists); // List of available funcNodes
  const [autogenVarNodes, setAutogenVarNodes] = usePersistentState('autogenVarNodes', true);

  const toggleAutogenVarNodes = () => setAutogenVarNodes(!autogenVarNodes);

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



  // useEffect(() => {
  //   // Mapping the Data for UI elements, creating structures like 
  //   // [  { value: 'add', label: 'add' },  { value: 'apply_fitted_model', label: 'apply_fitted_model' }]
  //   const result: any = listMapping(functionList);
  //   setFunctionList(result);
  // }, [functionList]);


  const selectValueFromDropDown = (value: React.SetStateAction<string | undefined>) => {
    setSelectedValue(value);
  };
  return (
    <>
      {/* When component load initially it will show the dropdown list Once selectedValue has proper value it will make an API call to get the list of params and which is plotted in "Handle" HTML Element */}
      {(selectedValue === "select function Node" || selectedValue === '' || selectedValue === undefined) ?
        <div className='addNode nowheel'>
          <h3 className='titleAddNode'>Add Nodes</h3>
          <FormControlLabel
            className='autogenVarNodes'
            control={
              <Checkbox
                className='autogenVarNodes-checkbox'
                color="primary"
                onClick={toggleAutogenVarNodes}
                checked={autogenVarNodes}
                style={{ color: 'white', marginLeft: '5px' }}
              />
            }
            // style={{ margin: '0 1px 0 0' }}
            label="Add Variable Nodes"
          />
          {/* <select name="funcLists" id="funcLists" className="funcLists" value={selectedValue} onChange={(event: { target: { value: string; }; }) => setSelectedValue(event?.target?.value)}>
            {functionList?.map((funcList, index: number) => {
              // const functionName = funcList.label?.split('.').pop() || '';
              return <option key={index} value={funcList.value}>{funcList.label}</option>;
            })}
          </select> */}

          <SearchBox data={funcLists} handleValue={selectValueFromDropDown} />
        </div>
        :

        <section className={`text-updater-node ${type} ${errorMapper(errorMapping, id)}`}>
          {/* <h4 className={`nodeTitle ${type}`} title={data.label}>{data.label}</h4> */}
          <div className={`flexProps ${type}`}>
            <SelectConfigure
              nodeId={id}
              value={data.ddType === 'new' ? data.ddType : data.label}
              handleId={data.label}
              sourcePosition={sourcePosition}
              data={data}
              isConnectable={isConnectable}
              labels={data.label}
              selectedValue={selectedValue}
              loadParamsList={loadParamsList}
              autogenVarNodes={autogenVarNodes}
            />
          </div>

        </section>
      }
    </>
  );
}

export default memo(DropDownNode);