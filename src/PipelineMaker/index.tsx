import React, { useEffect, useState } from 'react'
import StepSelect from './StepSelect'

interface IProps {
  items: any[]
  steps: any[]
  renderItem: (item: any) => string | JSX.Element
  stringRepr: (item: any) => string
  style?: Record<string, string>
  onAddStep: (step: any, stepNumber: number) => void
  onModifyStep: (step: any, stepNumber: number) => void
  onDeleteStep: (step: any, stepNumber: number) => void
  onShowItems: (stepNumber: number) => void
  onHideItems: (stepNumber: number) => void
  onPipelineChange: (steps: any[]) => void
}

const PipelineMaker = (props: IProps): JSX.Element => {
  // const { items, renderItem } = props;
  const [steps, setSteps] = useState([...props.steps, ''])
  const [display, setDisplay] = useState(true)

  useEffect(() => {
    setDisplay(true)
    props.onPipelineChange(steps.slice(0, -1))
  }, [steps])

  const handleChangeStep = (stepNumber: number, value: any): void => {
    steps[stepNumber - 1] = value
    if (stepNumber === steps.length) {
      setSteps(oldSteps => [...oldSteps, ''])
      props.onAddStep(value, stepNumber)
    } else {
      props.onModifyStep(value, stepNumber)
    }
  }

  const handleDeleteStep = (stepNumber: number): void => {
    // setSteps(oldSteps => oldSteps.slice(1,3));
    const newSteps = [...steps]
    const deletedStep = newSteps.splice(stepNumber - 1, 1)[0]
    setDisplay(false)
    setSteps(newSteps)
    props.onModifyStep(deletedStep, stepNumber)
    props.onPipelineChange(steps)
  }

  return (
    <div style={props.style}>
      {display && steps.map((step, i) => {
        const stepNumber = i + 1
        const key = `step-select-${stepNumber}`
        return (
          <StepSelect
            key={key}
            stepNumber={stepNumber}
            value={step}
            items={props.items}
            renderItem={props.renderItem}
            stringRepr={props.stringRepr}
            onChange={handleChangeStep}
            onDelete={handleDeleteStep}
            onOpen={props.onShowItems}
            onClose={props.onHideItems}
          />
        )
      })}
    </div>
  )
}

const toString = (x: any): string => {
  return x.toString()
}

PipelineMaker.defaultProps = {
  items: [],
  steps: [],
  renderItem: toString,
  stringRepr: toString,
  style: {},
  onAddStep: (step: any, stepNumber: number) => {},
  onModifyStep: (step: any, stepNumber: number) => {},
  onDeleteStep: (step: any, stepNumber: number) => {},
  onShowItems: (stepNumber: number) => {},
  onHideItems: (stepNumber: number) => {},
  onPipelineChange: (steps: any[]) => {}
}

export default PipelineMaker

// import React, { useState } from "react"

// import { Button, Box } from '@mui/material';
// import { ThemeProvider } from '@mui/material/styles';

// import otosenseTheme2022 from '../shared/theme2022'
// import ConpomentContainer from './ComponentContainer'
// import StepContainer from './StepContainer'
// import StepSelect from "./StepSelect";
// import AddButton from "./AddButton";
// import AddOptionInput from './AddOptionInput'

// interface IProps {
//   options?: any[];
//   renderOption?: (option: any) => string | JSX.Element;
//   handleSelectChange: (val: string, i: number) => void;
//   handleSave: VoidFunction;
//   selectedValues: string[];
//   setSelectedValues: (arr: string[]) => void;
// }
// const saveBtnContainer = {
//   display: 'flex',
//   justifyContent: 'flex-end',
//   margin: '24px',
//   width: 'calc(100% - 48px)'
// }
// const PipelineMaker = (props: IProps) => {
//   const [indexes, setIndexes] = useState<number[]>([1]);

//   // useEffect(() => {
//   //   //onload
//   //   const renderOption = props.renderOption || ((option: any) => option.toString())
//   //   const options = props.options.map(renderOption);
//   //   setInnerOptions(options);
//   // }, [])

//   const handleSelectChange = (selected: any, i: number) => {
//     const copy = [...props.selectedValues];
//     copy[i - 1] = selected;
//     console.log({copy})
//     props.setSelectedValues(copy);
//   }
//   const addStep = () => {
//     const copyIndex = [...indexes];
//     const copyVals = [...props.selectedValues];
//     const plusOne = copyIndex.length + 1;
//     copyVals.push('');
//     copyIndex.push(plusOne);
//     props.setSelectedValues(copyVals);
//     setIndexes(copyIndex);
//   }
//   const deleteStep = (index: number) => {
//     if(indexes.length > 1) {
//       const copyIndex = [...indexes];
//       const copyVals = [...props.selectedValues];
//       copyVals.splice(index, 1)
//       props.setSelectedValues(copyVals);
//       copyIndex.pop();
//       setIndexes(copyIndex);
//     }
//   }
//   const addOption = (str: string) => {
//     // setInnerOptions(oldArray => [...oldArray, str]);
//   }

//   return(
//     <ThemeProvider theme={otosenseTheme2022}>
//       <ConpomentContainer title="Create pipeline">
//         <>
//         {!!indexes.length && indexes.map((index, i) => {
//           return(
//         <StepContainer index={index} key={`step-${index}`} onClick={deleteStep}>
//             <StepSelect items={props.options} renderItem={props.renderOption} onChange={handleSelectChange} val={props.selectedValues[i]} index={index}/>
//         </StepContainer>
//           )
//         })}

//         <AddButton addStep={addStep}/>
//         <Box sx={saveBtnContainer}>
//           <Button onClick={props.handleSave}>Save</Button>
//         </Box>
//         <AddOptionInput addOption={addOption}/>
//         </>
//       </ConpomentContainer>
//     </ThemeProvider>
//   )
// }

// export default PipelineMaker
