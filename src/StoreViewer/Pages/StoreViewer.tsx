import React, { memo, useEffect, useRef, useState } from 'react';
import { apiMethod } from '../API/ApiCalls';
import { VariableSizeList } from 'react-window';
import { fetchingSessionID } from '../Utilities/Mapping/fetchingSessionID';

const StoreViewer = () => {
    const fetchSize = 100;
    const observer = useRef<IntersectionObserver | null>(null);
    const [passer, setPasser] = useState({ from_: 0, to_: fetchSize });
    const [searchResults, setSearchResults] = useState<string[]>([]);
    const [sessionIDList, setSessionIDList] = useState<string[]>([]);
    const [dataLoading, setDataLoading] = useState(true);

    const { data, status, error, isLoading, isFetching } = apiMethod(passer);

    useEffect(() => {
        if (data) {
            const sessionLists: any = fetchingSessionID(data);
            console.log('sessionLists', sessionLists);
            setSessionIDList(sessionLists);
            setSearchResults(data);
            setDataLoading(false);
        }
    }, [data]);

    useEffect(() => {
        const options = {
            root: null,
            rootMargin: '20px',
            threshold: 1.0,
        };

        const handleIntersect: IntersectionObserverCallback = (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    loadMore();
                }
            });
        };

        observer.current = new IntersectionObserver(handleIntersect, options);
        if (observer.current && !isLoading && !isFetching && searchResults.length >= fetchSize) {
            observer.current.observe(document.getElementById('bottomObserver')!);
        }

        return () => {
            if (observer.current) {
                observer.current.disconnect();
            }
        };
    }, [isLoading, isFetching, searchResults]);

    const loadMore = () => {
        setPasser((prevPasser) => ({
            from_: prevPasser.to_,
            to_: prevPasser.to_ + fetchSize,
        }));
    };

    const getItemSize = (index: number) => {
        console.log(' getItemSize sessionIDList', sessionIDList);
        // Return the size of each item in the list here.
        // Replace the following line with the correct logic for accessing the item size from sessionIDList.
        return Number(sessionIDList?.[index]);
    };

    const Row = ({ index, style }: any) => {
        console.log(' Row sessionIDList', sessionIDList);
        // Render each item in the list here.
        // Replace the following line with your desired rendering logic.
        return <div>id = {sessionIDList[index]}</div>;
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }
    return (
        <div style={{ height: 1600 }}>
            <h1>StoreViewer</h1>
            {!dataLoading && sessionIDList.length > 0 && (
                <VariableSizeList
                    height={1500}
                    itemCount={sessionIDList.length}
                    itemSize={getItemSize}
                    width={1300} // Set the desired width for the list
                >
                    {Row}
                </VariableSizeList>
            )}
            <div id="bottomObserver" style={{ height: 1 }}></div>
        </div>
    );
};

export default memo(StoreViewer);
