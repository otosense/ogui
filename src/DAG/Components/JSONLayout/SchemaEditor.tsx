import React, { useState } from 'react';

function SchemaEditor(props: any) {
    const { onClose } = props;
    const [data, setData] = useState<string>(JSON.stringify(props.data, null, 2));

    const [errorExist, setErrorExist] = useState(false); // Error check
    const handleSubmit = async (event: { preventDefault: () => void; }) => {
        event.preventDefault();
        try {
            const parsedData = JSON.parse(data);
            props.onDataUploaded && props.onDataUploaded(parsedData);
        } catch (error) {
            setErrorExist(true);
            return;
        }
        if (props.type === 'upload') {
            localStorage.setItem('data', data);
        } else {
            navigator.clipboard.writeText(data);
        }
        onClose && onClose();
    };

    const handleChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
        setData(event.target.value);
    };


    return (
        <form onSubmit={handleSubmit}>
            {/* <h3 className='ModalTitle'>Paste Your JSON</h3> */}
            <textarea
                name="data"
                value={data}
                onChange={handleChange}
                className='textAreaSize'
                placeholder="Paste Your JSON"
                required
            />
            {errorExist && <p className='jsonError'>The JSON upload failed. Please check the JSON and try again</p>}
            <button type="submit" className='uploadSubmitButton btnSize'>Load</button>
            <button onClick={onClose} className='uploadCancelButton btnSize'>Close</button>
        </form>
    );
}

export default SchemaEditor;