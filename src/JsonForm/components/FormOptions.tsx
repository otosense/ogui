import React from 'react';
import { Checkbox, FormControl, FormControlLabel, FormGroup } from '@mui/material';

type IFormOptions = {
    isLiveValidate: boolean;
    isDisabled: boolean;
    isReadOnly: boolean;
    isNoHtml5Validate: boolean;
    omitExtraData: boolean;
    liveOmit: boolean;
    handleLiveValidateChange: any;
    handleDisabledChange: any;
    handleReadOnlyChange: any;
    handleHtml5ValidateChange: any;
    handleOmitExtraDataChange: any;
    handleLiveOmitChange: any;
};

function FormOptions(props: IFormOptions) {
    const {
        isLiveValidate,
        isDisabled,
        isReadOnly,
        isNoHtml5Validate,
        omitExtraData,
        liveOmit,
        handleLiveValidateChange,
        handleDisabledChange,
        handleReadOnlyChange,
        handleHtml5ValidateChange,
        handleOmitExtraDataChange,
        handleLiveOmitChange,
    } = props;

    return (
        <FormControl component="fieldset">
            <FormGroup aria-label="position" row className='formHandler'>
                <FormControlLabel
                    control={
                        <Checkbox
                            checked={isLiveValidate}
                            onChange={handleLiveValidateChange}
                        />
                    }
                    label="Live Validation"
                />
                <FormControlLabel
                    control={
                        <Checkbox
                            checked={isDisabled}
                            onChange={handleDisabledChange}
                        />
                    }
                    label="Disable Whole Form"
                />
                <FormControlLabel
                    control={
                        <Checkbox
                            checked={isReadOnly}
                            onChange={handleReadOnlyChange}
                        />
                    }
                    label="Read-Only Whole Form"
                />
                <FormControlLabel
                    control={
                        <Checkbox
                            checked={isNoHtml5Validate}
                            onChange={handleHtml5ValidateChange}
                        />
                    }
                    label="Disable HTML 5 validation"
                />
                <FormControlLabel
                    control={
                        <Checkbox
                            checked={omitExtraData}
                            onChange={handleOmitExtraDataChange}
                        />
                    }
                    label="Omit Extra Data Change"
                />
                <FormControlLabel
                    control={
                        <Checkbox
                            checked={liveOmit}
                            onChange={handleLiveOmitChange}
                        />
                    }
                    label="Live Omit"
                />
            </FormGroup>
        </FormControl>
    );
}

export default FormOptions;
