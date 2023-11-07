import React, { memo, useEffect, useState } from 'react'
import { type IDropDownNode, type IFlowNode } from '../../Interfaces'
import SelectConfigure from './DropDownConfigure'
import { Checkbox, FormControlLabel } from '@mui/material'
import { usePersistentState } from '../../../utilities/persistentState'
import DropdownAutoComplete from '../../DropdownAutoComplete'
import { isObject } from 'lodash'

// funcNode Component main function starts at "DropDownNode" function below

function DropDownNode (props: IDropDownNode): JSX.Element {
  // which will receive all the properties from the Dagger Component
  const { id, data, type, sourcePosition, funcLists, isConnectable, errorMapping, flowNodes, loadParamsList } = props
  // console.log({ id, data, type, sourcePosition, funcLists, isConnectable, errorMapping, flowNodes });

  const [selectedValue, setSelectedValue] = useState<string | undefined>(data?.label) // Selected value from the DropDown
  // const [functionList, setFunctionList] = useState(funcLists); // List of available funcNodes
  const [autogenVarNodes, setAutogenVarNodes] = usePersistentState('autogenVarNodes', true)

  // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
  const toggleAutogenVarNodes = (): void => setAutogenVarNodes(!autogenVarNodes)

  // errorMapper => help us to find the empty nodes or node where parameter are still empty without connection
  function errorMapper (errorMapping: any[], id: string): string {
    const errorNode = errorMapping.find((x: IFlowNode) => x.id === id)
    return isObject(errorNode) ? 'BugFuncNode' : ''
  }

  useEffect(() => {
    const selectedNode: any = flowNodes.find((x: { id: string }): boolean => x.id === id)
    // re-mount the selected node after saving the node
    // also Dag while DAG is Loaded this is set the Func Node functions
    setSelectedValue(selectedNode?.data?.label || data?.label)
  }, [flowNodes])

  // useEffect(() => {
  //   // Mapping the Data for UI elements, creating structures like
  //   // [  { value: 'add', label: 'add' },  { value: 'apply_fitted_model', label: 'apply_fitted_model' }]
  //   const result: any = listMapping(functionList);
  //   setFunctionList(result);
  // }, [functionList]);

  const selectValueFromDropDown = (value: React.SetStateAction<string | undefined>): void => {
    setSelectedValue(value)
  }
  return (
    <>
      {/* When component load initially it will show the dropdown list Once selectedValue has proper value it will make an API call to get the list of params and which is plotted in "Handle" HTML Element */}
      {(selectedValue === 'select function Node' || selectedValue === '' || selectedValue === undefined)
        ? <div className='addNode nowheel'>
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

          <DropdownAutoComplete data={funcLists} handleValue={selectValueFromDropDown} />
        </div>
        : <section className={`text-updater-node ${type} ${errorMapper(errorMapping, id)}`}>
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
  )
}

export default memo(DropDownNode)
