import React from 'react';
import { FormControl, FormGroup, FormControlLabel, Checkbox } from "@mui/material";

const ExtraRules = (isLiveValidate: boolean, handleLiveValidateChange: () => void, isDisabled: boolean, handleDisabledChange: () => void, isReadOnly: boolean, handleReadOnlyChange: () => void, isNoHtml5Validate: boolean, handleHtml5ValidateChange: () => void) => {
    return <FormControl component="fieldset">
        <FormGroup aria-label="position" row className='formHandler'>
            <FormControlLabel
                control={<Checkbox
                    checked={isLiveValidate}
                    onChange={handleLiveValidateChange} />}
                label="Live Validation" />
            <FormControlLabel
                control={<Checkbox
                    checked={isDisabled}
                    onChange={handleDisabledChange} />}
                label="Disable Whole Form" />
            <FormControlLabel
                control={<Checkbox
                    checked={isReadOnly}
                    onChange={handleReadOnlyChange} />}
                label="Read-Only Whole Form" />

            <FormControlLabel
                control={<Checkbox
                    checked={isNoHtml5Validate}
                    onChange={handleHtml5ValidateChange} />}
                label="Disable HTML 5 validation" />
        </FormGroup>
    </FormControl>;
};

export default ExtraRules;