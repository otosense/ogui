import React, { memo, useEffect, useState } from 'react';
import { listMapping } from '../Utilities/Mapping/listMapping';
import { loadDag } from '../API/API';
import { loadMethod } from '../API/ApiCalls';
import { ApiPayloadWithK, ApiPayloadWithKWithName, ILoadProps } from '../Utilities/Interfaces';
import { storeGrouping } from '../Utilities/Mapping/storeGrouping';

function Load(props: ILoadProps) {
    // Loading the User created already a Dag or by Entering in the input text area
    const { onClose } = props; // handle close event of the modal
    const [data, setData] = useState<string>(JSON.stringify(props.data, null, 2)); // get the dag Json which is Entered by the user
    const [showErrorMessage, setShowErrorMessage] = useState(false); // Handle error message and validation for valid JSON are allowed
    const [openEditor, setOpenEditor] = useState(false); // Text area where the user can enter their own JSON
    const [errorExist, setErrorExist] = useState(false); // Error check
    const [selectDag, setSelectDag] = useState<string>(''); // Selecting the Dag from the DagStore
    const [dagListResponse, setDagListResponse] = useState<any>(); // storing the response and showing in UI

    // which make an API call to get the List of dag available in DagStore
    const handleChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
        setData(event.target.value);
    };

    const payload = {
        "_attr_name": "__iter__",
    };

    // Load the List of Available Dags API Methods
    const response = loadMethod(payload, 'load');


    useEffect(() => {
        const list = storeGrouping(response.data); // Grouping the API
        const result = listMapping(list.dag_store); // Extracting only the dag_Store
        setDagListResponse(result); // saving the Result
    }, [response.data]);


    // useEffect(() => {


    //     const result = listMapping(loadList);
    //     setDagListResponse(result);
    // }, [loadList]);

    const handleDagSubmit = async (event: { preventDefault: () => void; }) => {
        // Creating the Payload which backend needs 
        event.preventDefault();
        const payload: ApiPayloadWithK = {
            "_attr_name": "__getitem__",
            "k": selectDag
        };

        loadDag(payload).then(resp => {
            props.onDataUploaded && props.onDataUploaded(resp);
            setShowErrorMessage(false);
            onClose && onClose();
        }).catch(err => {
            console.log('error', err.message);
            setShowErrorMessage(true);
        });
    };

    //  this will show the Dag in UI which the user enter in his textarea box
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

    const loadDagHandler = async (e: { target: { value: string; }; }) => {
        setSelectDag(e.target.value); // selecting the Dag from the dag_Store
    };
    return (
        <div className='ModalBox'>
            <h3 className='ModalTitle'>DAG Load</h3>
            {!openEditor &&
                <form onSubmit={handleDagSubmit}>
                    <div className='dagList'>
                        <label htmlFor="dagList">Choose your Dag:</label>
                        <select name="dagList" id="dagList" defaultValue="" onChange={loadDagHandler}>
                            {/* <option disabled value="">Select a Dag</option> */}
                            {
                                dagListResponse?.map((option: { value: string, label: string; }, index: number) => (
                                    <option key={index} value={option?.value}>
                                        {option?.label}
                                    </option>
                                ))
                            }
                        </select>
                    </div>
                    {showErrorMessage && <p className='jsonError'>The JSON upload failed. Please check the JSON and try again</p>}
                    <button type="submit" className='uploadSubmitButton btnSize'>Load</button>
                    <button onClick={onClose} className='uploadCancelButton btnSize'>Close</button>
                </form>
            }
            {openEditor && <form onSubmit={handleSubmit}>
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
            </form>}

            {!openEditor ?
                <p className='sampleText'><span onClick={() => setOpenEditor(true)} className='clickHere'><b>Click here</b> </span>to Enter DAG JSON</p>
                :
                <p className='sampleText'><span onClick={() => setOpenEditor(false)} className='clickHere'><b>Click here</b> </span> to Select a Dag</p>
            }

        </div>
    );
}

export default memo(Load);
