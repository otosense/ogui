import React, { memo, useEffect, useState } from 'react';
import { listMapping } from '../Utilities/Mapping/listMapping';
import { dagSaveLoad } from '../API/API';
import { loadMethod } from '../API/ApiCalls';
import { functionList } from '../Utilities/globalFunction';
import { ApiPayloadWithKWithName, ILoadProps } from '../Utilities/Interfaces';

function Load(props: ILoadProps) {
    const { onClose } = props;
    const [data, setData] = useState<string>(JSON.stringify(props.data, null, 2));
    const [showErrorMessage, setShowErrorMessage] = useState(false);
    const [openEditor, setOpenEditor] = useState(false);
    const [errorExist, setErrorExist] = useState(false);
    const [selectDag, setSelectDag] = useState<string>('');
    const [dagListResponse, setDagListResponse] = useState<any>();

    const handleChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
        setData(event.target.value);
    };

    const payload = {
        "_attr_name": "__iter__",
    };
    const response = loadMethod(payload, 'load');


    useEffect(() => {
        const list = functionList(response.data);
        const result = listMapping(list.dag_store);
        setDagListResponse(result);
    }, [response.data]);


    // useEffect(() => {


    //     const result = listMapping(loadList);
    //     setDagListResponse(result);
    // }, [loadList]);

    const handleDagSubmit = async (event: { preventDefault: () => void; }) => {
        event.preventDefault();
        const payload: ApiPayloadWithKWithName = {
            "_attr_name": "__getitem__",
            "k": selectDag
        };

        dagSaveLoad(payload).then(resp => {
            props.onDataUploaded && props.onDataUploaded(resp);
            setShowErrorMessage(false);
            onClose && onClose();
        }).catch(err => {
            console.log('error', err.message);
            setShowErrorMessage(true);
        });
    };


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

    const loadDag = async (e: { target: { value: string; }; }) => {
        setSelectDag(e.target.value);
    };
    return (
        <div className='ModalBox'>
            <h3 className='ModalTitle'>DAG Load</h3>
            {!openEditor &&
                <form onSubmit={handleDagSubmit}>
                    <div className='dagList'>
                        <label htmlFor="dagList">Choose your Dag:</label>
                        <select name="dagList" id="dagList" defaultValue="" onChange={loadDag}>
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
