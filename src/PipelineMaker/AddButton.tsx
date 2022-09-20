import React from "react";

import { Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

interface IProps {
  addStep: VoidFunction;
}
const addButtonStyle = {
  width: 'calc(100% - 48px)',
  padding: 1
}

const AddButton = (props: IProps) => {
  return(
    <Button color="secondary" sx={addButtonStyle} startIcon={<AddIcon />} onClick={props.addStep}>Add</Button>
  )
}

export default AddButton;