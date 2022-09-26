import React, { useEffect, useState } from "react"

import { Button, Box } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';

import otosenseTheme2022 from '../shared/theme2022'
import ConpomentContainer from './ComponentContainer'
import StepContainer from './StepContainer'
import StepSelect from "./StepSelect";
import AddButton from "./AddButton";
import AddOptionInput from './AddOptionInput'

interface IProps {
  options?: any[];
  handleSelectChange: (val: string, i: number) => void;
  handleSave: VoidFunction;
  selectedValues: string[];
  setSelectedValues: (arr: string[]) => void;
}
const saveBtnContainer = {
  display: 'flex',
  justifyContent: 'flex-end',
  margin: '24px',
  width: 'calc(100% - 48px)'
}
const PipelineMaker = (props: IProps) => {
  const [innerOptions, setInnerOptions] = useState<string[]>([])
  const [indexes, setIndexes] = useState<number[]>([1]);

  useEffect(() => {
    //onload
    const isMixedData = props.options.find((option) => typeof option !== 'string');
    if(!!isMixedData){
      const res = props.options.map((item: any) => item.toString());
      setInnerOptions(res);
    } else {
      setInnerOptions(props.options);
    }
  }, [])

  const handleSelectChange = (selected: string, i: number) => {
    const copy = [...props.selectedValues];
    copy[i - 1] = selected;
    console.log({copy})
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
  const addOption = (str: string) => {
    setInnerOptions(oldArray => [...oldArray, str]);
  }

  return(
    <ThemeProvider theme={otosenseTheme2022}>
      <ConpomentContainer title="Create pipeline">
        <>
        {!!indexes.length && indexes.map((index, i) => {
          return(
        <StepContainer index={index} key={`step-${index}`} onClick={deleteStep}>
            <StepSelect items={innerOptions} onChange={handleSelectChange} val={props.selectedValues[i]} index={index}/>
        </StepContainer>
          )
        })}
        
        <AddButton addStep={addStep}/>
        <Box sx={saveBtnContainer}>
          <Button onClick={props.handleSave}>Save</Button>
        </Box>
        <AddOptionInput addOption={addOption}/>
        </>
      </ConpomentContainer>
    </ThemeProvider>
  )
}

export default PipelineMaker
