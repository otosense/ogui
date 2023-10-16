import React, { useState } from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { Box } from '@mui/material';

const funcLists = [
    { label: 'The Shawshank Redemption', year: 1994 },
    { label: 'The Godfather', year: 1972 },
    { label: 'The Godfather: Part II', year: 1974 },
    { label: 'The Dark Knight', year: 2008 },
    { label: '12 Angry Men', year: 1957 },
];

interface Option {
    label: string;
    year: number;
}

function SearchBox(props: { handleValue: any; }) {
    const { handleValue } = props;
    const [selectedValue, setSelectedValue] = useState<Option | null>(null);

    const selectValueFromDropDown = (
        event: React.SyntheticEvent<Element, Event>,
        newValue: Option | null
    ) => {
        setSelectedValue(newValue);
        handleValue(newValue);
    };

    return (
        <div className='autoComplete-Dropdown'>
            <Autocomplete
                id="form-list"
                options={funcLists}
                getOptionLabel={(option) => option.label}
                value={selectedValue}
                onChange={selectValueFromDropDown}
                renderInput={(params) => <TextField {...params} label="Form Types" />}
                renderOption={(props, option) => (
                    <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
                        {option.label} ({option.year})
                    </Box>
                )}
            />
            {/* <p>Selected Value: {selectedValue ? selectedValue.label : ''}</p> */}
        </div>
    );
}

export default SearchBox;
