import React, { useState } from "react"

import { Button, Box } from '@mui/material';
import ConpomentContainer from './ComponentContainer'
import StepContainer from './StepContainer'
import StepSelect from "./StepSelect";
import AddButton from "./AddButton";

interface IProps {
  options: string[];
  handleSelectChange: (val: string, i: number) => void;
  handleSave: VoidFunction;
  selectedValues: string[];
  setSelectedValues: (arr: string[]) => void;
  isMixedData?: boolean;
  mixedData?: any;
  filterMixedDataFunc?: (data: any) => string[];
}
const btnContainer = {
  display: 'flex',
  justifyContent: 'flex-end',
  margin: 24,
  width: 'calc(100% - 48px)'
}
const PipelineMaker = (props: IProps) => {
  const { isMixedData, mixedData, filterMixedDataFunc } = props;
  let options: string[];
  if(isMixedData){
    const result: string[] = filterMixedDataFunc(mixedData);
    options = result;
  } else {
    options = props.options;
  }
  const [indexes, setIndexes] = useState<number[]>([1]);
  const handleSelectChange = (selected: string, i: number) => {
    const copy = [...props.selectedValues];
    copy[i - 1] = selected;
    props.setSelectedValues(copy);
  }
  const addStep = () => {
    const copyIndex = [...indexes];
    const copyVals = [...props.selectedValues];
    const plusOne = copyIndex.length + 1;
    copyVals.push('');
    copyIndex.push(plusOne);
    props.setSelectedValues(copyVals);
    setIndexes(copyIndex);
    
  }
  const deleteStep = (index: number) => {
    if(indexes.length > 1) {
      const copyIndex = [...indexes];
      const copyVals = [...props.selectedValues];
      copyVals.splice(index, 1)
      props.setSelectedValues(copyVals);
      copyIndex.pop();
      setIndexes(copyIndex);
    }
  }
  return(
    <ConpomentContainer title="Create pipeline">
      <>
      {!!indexes.length && indexes.map((index, i) => {
        return(
      <StepContainer index={index} key={`step-${index}`} onClick={deleteStep}>
          <StepSelect items={props.options} onChange={handleSelectChange} val={props.selectedValues[i]} index={index}/>
      </StepContainer>
        )
      })}
      
      <AddButton addStep={addStep}/>
      <Box sx={btnContainer}>
        <Button onClick={props.handleSave}>Save</Button>
      </Box>
      </>
    </ConpomentContainer>
  )
}

export default PipelineMaker