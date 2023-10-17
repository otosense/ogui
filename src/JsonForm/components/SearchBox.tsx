import React, { useEffect, useState } from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { Box } from '@mui/material';
import { storeMapping } from '../utilities/Mapping/storeMapping';

interface Option {
    label: string;
    value: string;
}

function SearchBox(props: { handleValue: any; data: any; }) {
    const { handleValue, data } = props;
    const [selectedValue, setSelectedValue] = useState<Option | null>(null);
    const [funcLists, setFuncLists] = useState<Option[]>([]);

    useEffect(() => {
        const conversion = storeMapping(data);
        setFuncLists(conversion);
    }, [data]);

    const selectValueFromDropDown = (
        event: React.SyntheticEvent<Element, Event>,
        newValue: Option | null
    ) => {
        setSelectedValue(newValue);
        handleValue(newValue);
        getItems(newValue?.value);
    };

    const getItems = async (data: any) => {
        console.log({ data });
        const payload = {
            "_attr_name": "__getitem__",
            "key": data
        };

        try {
            const response = await fetch("http://20.219.8.178:8080/form_spec_store", {
                method: "POST",
                body: JSON.stringify({
                    ...payload
                }),
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                }
            });

            if (!response.ok) {
                throw new Error("Network response was not ok");
            }

            const json = await response.json();
            // console.log('json', json);
            return json;
        } catch (error) {
            console.error("Error fetching data:", error);
            return []; // Return an empty array or handle the error appropriately
        }
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
                        {option.label}
                    </Box>
                )}
            />
            <p>Selected Value: {selectedValue ? selectedValue.value : ''}</p>
        </div>
    );
}

export default SearchBox;
