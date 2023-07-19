import React, { useEffect, useState } from 'react';
import * as API from './API/API';
import DataTypeTwo from './DataTypeTwo';
import DataTypeFour from './DataTypeFour';
import DataTypeThree from './DataTypeThree';
import DataTypeOne from './DataTypeOne';
import { IViewProps, IZoomRange } from './API/interfaces';
import { Alert, Button, TextField } from '@mui/material';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import LoadingOverlay from '../../../utilities/Loader';
import { viewConfig } from '../Configs/configs';

const fetchSize = 1000;

// Handling Global Store Zoom Properties to pass for other components
export const ZoomContext = React.createContext<IZoomRange | null>(null);
export default function Charts() {
    const [zoomLevel, setZoomLevel] = useState<IZoomRange>();
    const [sessionId, setSessionId] = useState<string>();
    const [initialSize, setInitialSize] = useState<number>(0);
    const [storeChartData, setStoreChartData] = useState<any[]>([]);


    const [sample, setSample] = useState({});
    // const [isLoading, setIsLoading] = useState(false);

    // const { data, status, error, isLoading, mutate } = useMutation(API.getSessionDetails);


    const { error, refetch, isFetching } = useQuery({
        queryKey: ['StoreConfig', sample],
        queryFn: async () => {
            return API.getSessionDetails(sample);
        },
        keepPreviousData: false,
        refetchOnWindowFocus: false,
        cacheTime: 5 * 60 * 1000, // 5 minutes
        staleTime: 1 * 60 * 1000, // 1 minute
        enabled: false, // Set enabled to false initially
    });


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

        storeChartData?.map((sessionDetail: any, index: number) => {
            viewConfig.map(view => {
                view.src_channels.map((x) => {
                    if (x.channel === sessionDetail.data_type) {
                        x.data = sessionDetail;
                    }
                });
            });
        });


        return viewConfig.map((view, index) => {
            console.log('view.data_type', view);
            if (view.data_type === "annot") {
                return <DataTypeFour key={index} onZoomChange={handleZoomChange} userConfig={userConfigurationsTypeFour} configs={view} />;
            }
            else if (view.data_type === "wf") {
                return <DataTypeOne key={index} onZoomChange={handleZoomChange} userConfig={userConfigurationsTypeOne} configs={view} />;
            } else {
                return "Error in data_type";
            }

        });

        // return storeChartData?.map((sessionDetail: any, index: number) => {
        //     return viewConfig.map(view => {
        //         console.log('view', view);

        //         console.log('storeChartData', storeChartData);
        //         if (sessionDetail.data_type === "annot") {
        //             return <DataTypeFour key={index} onZoomChange={handleZoomChange} userConfig={userConfigurationsTypeFour} data={sessionDetail.data[0]} />;

        //         }
        //         else if (sessionDetail.data_type === "wf") {
        //             return <DataTypeOne key={index} onZoomChange={handleZoomChange} userConfig={userConfigurationsTypeOne} data={sessionDetail.data} />;
        //         } else {
        //             return "Error in data_type";
        //         }
        //     });
        // });
    };
    const handleSubmit = (e: any) => {
        // Prevent the browser from reloading the page
        e.preventDefault();
        setInitialSize(initialSize + fetchSize);
        payloadSetting(sessionId, initialSize, setSample);
    };

    useEffect(() => {
        if (Object.keys(sample).length > 0) {
            refetch()?.then((data) => {
                if (data) {
                    data.data?.forEach((eachChannel: { channel: string; data: { data: any; }[]; }) => {
                        const existingChannelIndex = storeChartData.findIndex(
                            (item) => item.data_type === eachChannel.channel
                        );

                        if (existingChannelIndex !== -1) {
                            // If the channel already exists, push the new data to the existing channel's 'data' array
                            storeChartData[existingChannelIndex].data[0].push(...eachChannel.data);
                        } else {
                            // If the channel doesn't exist, create a new channel with the 'data' array
                            storeChartData.push({
                                ...eachChannel,
                                data_type: eachChannel.channel,
                                data: [eachChannel.data],
                            });
                        }
                        setStoreChartData(storeChartData);
                    });
                }
            }).catch((error) => {
                console.error('Error occurred while fetching data:', error);
                // setHasError(true);
                // setErrorMessage('Error occurred while fetching data. Please try again.');
            });
        }
    }, [sample]);


    const loadMoreData = () => {
        payloadSetting(sessionId, initialSize, setSample);
    };

    return (
        // React way of handling Context
        <ZoomContext.Provider value={zoomLevel}>
            {isFetching && <LoadingOverlay />}
            <section className="topLayout">
                <form onSubmit={handleSubmit} className='FormSection'>
                    <TextField fullWidth id="myInput" label="SessionId" variant="outlined" name="sessionId" defaultValue={sessionId} className='getSessionIdBox' size="small" onChange={(e: { target: { value: string; }; }) => setSessionId(e.target.value)} required />
                    <Button variant="contained" type="submit">Submit</Button>
                </form>
                {storeChartData.length > 0 && <Button variant="contained" onClick={loadMoreData} >Load More</Button>}
            </section>
            {error ? (<Alert severity="error" className='errorMessage'>{error.toString()}</Alert>) : ''}
            {sessionId !== undefined && <section className='chartArea'>
                {chartChannel()}
            </section>}
        </ZoomContext.Provider>
    );
}
function payloadSetting(sessionId: string | undefined, initialSize: number, setSample: React.Dispatch<React.SetStateAction<{}>>) {
    const sessionIdPayload = {
        session_id: sessionId,
        "ann_from": initialSize,
        "ann_to": initialSize + fetchSize,
        "wf_from": initialSize,
        "wf_to": initialSize + fetchSize,
    };
    setSample(sessionIdPayload);
}

