import React, { useState, memo, useEffect } from 'react';
import CopyIcon from './../../assets/images/files.png';
import { pythonIdentifierPattern } from '../Utilities/globalFunction';
import { ApiPayloadWithV, ILoadProps } from '../Utilities/Interfaces';

function Save(props: ILoadProps) {
    // Saving the User created Dag will takes place here
    const data = JSON.stringify(props.data, null, 2); // get the dag Json from Dagger component
    const { onClose, onSave } = props; // handle close event of the modal
    const [copied, setCopied] = useState(false);  // handle Copy of Selected Dag
    const [dagName, setDagName] = useState(''); // Dag Title given by the user
    const [errorExist, setErrorExist] = useState(false); // Error Exists in saving Dag will handled here

    const handleCopy = () => {
        navigator.clipboard.writeText(data); // in-build Js method to copy text from box
        setCopied(true);
    };

    const dagNameHandler = (event: { target: { value: string; }; }) => {
        const inputValue = event.target.value; //  Dag Title given by the user
        if (pythonIdentifierPattern.test(inputValue)) {
            setDagName(inputValue);
        }
    };

    const submitHandler = async (event: { preventDefault: () => void; }) => {
        // Creating the Payload which backend needs 
        event.preventDefault();
        const combinedObj = {
            dagName,
            ...props.data,
        };

        onClose && onClose();

        const savePayload = {
            dagName: dagName,
            combinedObj: combinedObj
        };

        if (onSave) {
            onSave(savePayload); // Only call onSave if it's defined
        }
    };

    return (
        <div className='ModalBox'>
            <form onSubmit={submitHandler} className='jsonData'>
                <h3 className='ModalTitle'>Save DAG</h3>
                <div className='dagNameSection'>
                    <label htmlFor="text">Name:</label>
                    <input id="text" name="text" className="dagNameBox" placeholder='Name of DAG' required onChange={dagNameHandler} value={dagName} />
                </div>
                {<img onClick={handleCopy} src={CopyIcon} alt='copyBtn' className='copyBtn' title={copied ? 'Copied!' : 'Copy'} />}
                <textarea
                    name="data"
                    id="textarea"
                    value={data}
                    className='textAreaSize'
                    placeholder="Copy Your JSON"
                    required
                    readOnly
                />
                {errorExist && <p className='jsonError'>The JSON upload failed. Please check the variable Names and try again</p>}
                <button type="submit" className='uploadSubmitButton btnSize'>Save</button>
                <button onClick={onClose} className='uploadCancelButton btnSize'>Close</button>
            </form>
        </div>
    );
}

export default memo(Save);
