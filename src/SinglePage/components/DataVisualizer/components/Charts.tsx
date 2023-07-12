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
    const [sessionId, setSessionId] = useState<number>();

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
        return viewConfigs.map((viewConfig: IViewProps, index: number) => {
            const { data_type } = viewConfig;
            if (data_type === "volume") {
                return <DataTypeTwo key={index} configs={viewConfig} onZoomChange={handleZoomChange} userConfig={userConfigurationsTypeTwo} />;
            } else if (data_type === "annot") {
                return <DataTypeFour key={index} configs={viewConfig} onZoomChange={handleZoomChange} userConfig={userConfigurationsTypeFour} />;
            } else if (data_type === "wf") {
                return <DataTypeOne key={index} configs={viewConfig} onZoomChange={handleZoomChange} userConfig={userConfigurationsTypeOne} />;
            } else if (data_type === "mixed") {
                return <DataTypeThree key={index} configs={viewConfig} onZoomChange={handleZoomChange} userConfig={userConfigurationsTypeThree} />;
            }
        });
    };
    const handleSubmit = (e) => {
        // Prevent the browser from reloading the page
        e.preventDefault();
        console.log('e.target', e.target);
        // Create a new FormData object from the form element
        const formData = new FormData(e.target);

        // Retrieve the value of the input field by its name
        const inputValue: number = formData.get('sessionId');

        setSessionId(inputValue);



    };

    return (
        // React way of handling Context
        <ZoomContext.Provider value={zoomLevel}>
            <form method="post" onSubmit={handleSubmit} className='FormSection'>
                <label>
                    <TextField fullWidth id="myInput" label="SessionId" variant="outlined" name="sessionId" value={sessionId} className='sessionIdBox' />
                </label>
                <Button variant="contained" type="submit">Submit</Button>
            </form>
            {sessionId !== undefined && chartChannel()}
        </ZoomContext.Provider>
    );
}
