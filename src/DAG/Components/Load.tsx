import React, { memo, useEffect, useState } from 'react';
import { listMapping } from '../utilities/Mapping/listMapping';
import { ILoadProps } from './Interfaces';
import { storeGrouping } from '../utilities/Mapping/storeGrouping';
import { isArray, isEmpty, isFunction, isObject } from 'lodash';

function Load(props: ILoadProps) {
    // Loading the User created already a Dag or by Entering in the input text area
    const { onClose, userData, loadSavedDag } = props; // handle close event of the modal
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

    useEffect(() => {
        const dag_store_name = 'dag_store';
        // const list = storeGrouping(response.data); // Grouping the API
        // const result = listMapping(list[dag_store_name]); // Extracting only the dag_Store
        // setDagListResponse(result); // saving the Result

        if (isEmpty(userData)) {
            setDagListResponse([]); // Return an empty array if userData is not provided
        }

        if (isFunction(userData)) {
            // Check if data is a function
            const result: any = userData();
            // console.log('checking userData', isFunction(result?.then));
            if (isFunction(result?.then)) {
                // Check if the result of the function is a promise
                result.then((dataArray: any) => {
                    const list = storeGrouping(dataArray);
                    const output = listMapping(list[dag_store_name]); // Extracting only the dag_Store
                    setDagListResponse(output); // storing FuncList
                });
            } else {
                const dataArray = result as any[]; // Assuming the result is an array
                const list = storeGrouping(dataArray);
                const output = listMapping(list[dag_store_name]); // Extracting only the dag_Store
                setDagListResponse(output); // saving the Result
            }
        } else if (isArray(userData)) {
            // Check if data is an array
            const list = storeGrouping(userData);
            const output = listMapping(list[dag_store_name]); // Extracting only the dag_Store
            setDagListResponse(output); // saving the Result
        } else {
            setDagListResponse([]);
        }


    }, [userData]);


    // useEffect(() => {


    //     const result = listMapping(loadList);
    //     setDagListResponse(result);
    // }, [loadList]);

    const handleDagSubmit = async (event: { preventDefault: () => void; }) => {
        // Creating the Payload which backend needs 
        event.preventDefault();

        if (loadSavedDag) {
            const val = loadSavedDag(selectDag); // Only call onSave if it's defined
            // console.log('val', val, typeof val);
            // props.onDataUploaded && props.onDataUploaded(val);

            if (isObject(val)) {
                const result: any = val;
                if (isFunction(result?.then)) {
                    // Check if the result of the function is a promise
                    result.then((dataArray: any) => {
                        props.onDataUploaded && props.onDataUploaded(dataArray);
                    });
                } else {
                    props.onDataUploaded && props.onDataUploaded(result);
                }
            }
        }
        onClose && onClose();
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
                    <button type="submit" className='uploadSubmitButton btnSize' disabled={!selectDag}>Load</button>
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
