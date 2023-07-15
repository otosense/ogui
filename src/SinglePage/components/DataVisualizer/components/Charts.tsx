import React, { useEffect, useState } from 'react';
import * as API from './API/API';
import DataTypeTwo from './DataTypeTwo';
import DataTypeFour from './DataTypeFour';
import DataTypeThree from './DataTypeThree';
import DataTypeOne from './DataTypeOne';
import { IViewProps, IZoomRange } from './API/interfaces';
import { Button, TextField } from '@mui/material';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

const fetchSize = 1000;
const from = 0 * fetchSize;

// Handling Global Store Zoom Properties to pass for other components
export const ZoomContext = React.createContext<IZoomRange | null>(null);
export default function Charts() {
    const [zoomLevel, setZoomLevel] = useState<IZoomRange>();
    const [sessionId, setSessionId] = useState<string>();
    const [initialSize, setInitialSize] = useState<number>(0);
    const [storeChartData, setStoreChartData] = useState<any[]>([]);


    const [passer, setPasser] = useState({ "from_": Number(0), "to_": Number(fetchSize) });
    const [storeData, setStoreData] = useState({ data: [] });
    const [sample, setSample] = useState({});

    // const { data, status, error, isLoading, mutate } = useMutation(API.getSessionDetails);


    const { data, status, error, isLoading, refetch } = useQuery({
        queryKey: ['StoreConfig', sample],
        queryFn: async () => {
            return API.getSessionDetails(sample);
        },
        keepPreviousData: false,
        refetchOnWindowFocus: false,
        cacheTime: 5 * 60 * 1000, // 5 minutes
        staleTime: 1 * 60 * 1000, // 1 minute
        enabled: false, // Set enabled to false initially
        // onSuccess: (data) => {
        //     setStoreData((prevData: any) => ({
        //         ...prevData,
        //         data: [...prevData.data, ...data.data],
        //     }));
        // },
    });


    // if (isLoading) {
    //     return <div className="loader">Loading...</div>;
    // }

    if (error) {
        return <div className="error">{`Error: ${error}`}</div>;
    }

    // useEffect(() => {
    //     setStoreChartData(data);
    //     if (data) {
    //         return setStoreChartData((prev: any[]) => [...prev, data]);
    //     }
    // }, [data]);


    const handleZoomChange = (min: number, max: number) => {
        // Setting zoom level in Global Store
        setZoomLevel({ min, max });
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


    const chartChannel = () => {

        return data?.map((sessionDetail: any, index: number) => {
            console.log('sessionDetail', sessionDetail);
            if (sessionDetail.data_type === "annot") {
                return <DataTypeFour key={index} onZoomChange={handleZoomChange} userConfig={userConfigurationsTypeFour} data={sessionDetail.data} />;

            }
            else if (sessionDetail.data_type === "wf") {
                return <DataTypeOne key={index} onZoomChange={handleZoomChange} userConfig={userConfigurationsTypeOne} data={sessionDetail.data} />;
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
    const handleSubmit = (e: any) => {
        // Prevent the browser from reloading the page
        e.preventDefault();
        setInitialSize(initialSize + fetchSize);
        const sessionIdPayload = {
            session_id: sessionId,
            "ann_from": initialSize,
            "ann_to": initialSize + fetchSize,
            "wf_from": initialSize,
            "wf_to": initialSize + fetchSize,

        };
        setSample(sessionIdPayload);
        // refetch(); //
        // mutate(sessionIdPayload);
    };

    useEffect(() => {
        if (Object.keys(sample).length > 0) {
            refetch();
        }
    }, [sample]);


    const loadMoreData = () => {
        console.log('from:', initialSize);
        console.log('initialSize:', initialSize, initialSize + fetchSize);
        const sessionIdPayload = {
            session_id: sessionId,
            "ann_from": initialSize,
            "ann_to": initialSize + fetchSize,
            "wf_from": initialSize,
            "wf_to": initialSize + fetchSize,

        };
        setSample(sessionIdPayload);
        // refetch(); //
        // mutate(sessionIdPayload);
    };

    // console.log('storeChartData', storeChartData);
    console.log('sample,', sample);
    return (
        // React way of handling Context
        <ZoomContext.Provider value={zoomLevel}>
            {/* <form onSubmit={handleSubmit} className='FormSection'>
                <label>
                    <TextField fullWidth id="myInput" label="SessionId" variant="outlined" name="sessionId" defaultValue={sessionId} className='sessionIdBox' onChange={(e: { target: { value: string; }; }) => setSessionId(e.target.value)} required />
                </label>
                <Button variant="contained" type="submit">Submit</Button>
            </form>
            <button onClick={loadMoreData} className='loadMoreButton'>Load More</button> */}

            <section className="topLayout">
                <form onSubmit={handleSubmit} className='FormSection'>
                    <label>
                        <TextField fullWidth id="myInput" label="SessionId" variant="outlined" name="sessionId" defaultValue={sessionId} className='sessionIdBox' onChange={(e: { target: { value: string; }; }) => setSessionId(e.target.value)} required />
                    </label>
                    <Button variant="contained" type="submit">Submit</Button>
                </form>
                <Button variant="contained" onClick={loadMoreData} >Load More</Button>
            </section>
            <section className='chartArea'>
                {sessionId !== undefined && chartChannel()}
            </section>
        </ZoomContext.Provider>
    );
}
