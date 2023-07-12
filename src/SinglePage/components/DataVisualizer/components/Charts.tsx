import React, { useEffect, useState } from 'react';
import * as API from './API/API';
import DataTypeTwo from './DataTypeTwo';
import DataTypeFour from './DataTypeFour';
import DataTypeThree from './DataTypeThree';
import DataTypeOne from './DataTypeOne';
import { IViewProps, IZoomRange } from './API/interfaces';
import { Button, TextField } from '@mui/material';

// Handling Global Store Zoom Properties to pass for other components
export const ZoomContext = React.createContext<IZoomRange | null>(null);
export default function Charts() {
    const [viewConfigs, setViewConfigs] = useState([]);
    const [zoomLevel, setZoomLevel] = useState<IZoomRange>();
    const [sessionId, setSessionId] = useState<string>();
    const [sessionDetails, SetSessionDetails] = useState<any>([]);

    const handleZoomChange = (min: number, max: number) => {
        // Setting zoom level in Global Store
        setZoomLevel({ min, max });
    };
    useEffect(() => {
        // when page Loaded calling ViewConfig API
        fetchData();
    }, []);

    const fetchData = async () => {
        // ViewConfig API Called
        const response = await API.viewConfig();
        // Saved in Local Component state
        setViewConfigs(response.data);
    };


    // Configurations for Dev Users
    const userConfigurationsTypeOne = {
        minimap: true,
        // combineZoom: false
    };
    const userConfigurationsTypeTwo = {
        minimap: true,
        // combineZoom: false
    };
    const userConfigurationsTypeThree = {
        minimap: true,
        // combineZoom: false
    };
    const userConfigurationsTypeFour = {
        minimap: true,
        // combineZoom: false
    };

    /* 
    Note: Which Smart Components supports which DataType are mentioned below

    DataTypeOne => will have data Structure like ( wf, plc )below 
    
    ```
        "data": [0,0,0]
    ```
    DataTypeTwo =>  will have data Structure like (volume) below 

    ```
        "data": [
            {
                "value": 0.4685317155388221,
                "ts": 0.6031073392919892
            },
        ] 
    ```

    DataTypeThree =>  will have data Structure like (mixed) below 

    ```
        "data": [
                {
                    "values": {
                        "mean": 0.00014688624667242239,
                        "std": 0.476557482488626
                    },
                    "ts": 0.35223049787552263
                }
            ]
    ```

    DataTypeThree =>  will have data Structure like (Annotations) below :

    ```
          "data": [
                { "tag": "normal", "bt": 1.3555504237496248, "tt": 3.0553881157382206 }
            ];
    ```
   */

    // Mapping of Chart to Smart Components based on data_type, for data_type, please refer above comments

    const chartChannel = () => {

        return sessionDetails.map((sessionDetail: any, index: number) => {
            console.log('sessionDetail', sessionDetail);
            if (sessionDetail.data_type === "annot") {
                return <DataTypeFour key={index} onZoomChange={handleZoomChange} userConfig={userConfigurationsTypeFour} configs={undefined} data={sessionDetail.data} />;

            }
            else if (sessionDetail.data_type === "wf") {
                return <DataTypeOne key={index} configs={undefined} onZoomChange={handleZoomChange} userConfig={userConfigurationsTypeOne} data={sessionDetail.data} />;
            }

        });
        // return viewConfigs.map((viewConfig: IViewProps, index: number) => {
        //     const { data_type } = viewConfig;
        //     if (data_type === "volume") {
        //         return <DataTypeTwo key={index} configs={viewConfig} onZoomChange={handleZoomChange} userConfig={userConfigurationsTypeTwo} />;
        //     } else if (data_type === "annot") {
        //         return <DataTypeFour key={index} configs={viewConfig} onZoomChange={handleZoomChange} userConfig={userConfigurationsTypeFour} />;
        //     } else if (data_type === "wf") {
        //         return <DataTypeOne key={index} configs={viewConfig} onZoomChange={handleZoomChange} userConfig={userConfigurationsTypeOne} />;
        //     } else if (data_type === "mixed") {
        //         return <DataTypeThree key={index} configs={viewConfig} onZoomChange={handleZoomChange} userConfig={userConfigurationsTypeThree} />;
        //     }
        // });
    };
    const handleSubmit = (e: { preventDefault: () => void; target: HTMLFormElement | undefined; }) => {
        // Prevent the browser from reloading the page
        e.preventDefault();
        getSessionDetails(sessionId);

    };

    const getSessionDetails = async (sessionId: string | undefined) => {

        const sessionIdPayload = { "session_id": sessionId };
        const response = await API.getSessionDetails(sessionIdPayload);
        console.log('response', response);
        SetSessionDetails(response);
    };

    return (
        // React way of handling Context
        <ZoomContext.Provider value={zoomLevel}>
            <form onSubmit={handleSubmit} className='FormSection'>
                <label>
                    <TextField fullWidth id="myInput" label="SessionId" variant="outlined" name="sessionId" defaultValue={sessionId} className='sessionIdBox' onChange={(e: { target: { value: string; }; }) => setSessionId(e.target.value)} />
                </label>
                <Button variant="contained" type="submit">Submit</Button>
            </form>
            {sessionId !== undefined && chartChannel()}
        </ZoomContext.Provider>
    );
}
