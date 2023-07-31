import React, { useEffect, useState, useRef } from 'react';
import TreeView from '@mui/lab/TreeView';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { useQuery } from '@tanstack/react-query';
import TextField from '@mui/material/TextField/TextField';
import Button from '@mui/material/Button/Button';

import * as API from '../API/API';
import { StyledTreeItem } from './StoreViewStyle';
import { Alert } from '@mui/material';
import SnackBar from '../../utilities/SnackBar';
import LoadingOverlay from '../../utilities/Loader';

interface Child {
    id: string;
    name?: string;
    children?: Child[];
    bt?: number[];
    tt?: number[];
}

interface Device {
    id: string;
    name?: string;
    children?: Child[];
    bt?: number[];
    tt?: number[];
}

const handleCopy = async (
    label: string,
    setCopied: React.Dispatch<React.SetStateAction<boolean>>
) => {
    setCopied(false);
    try {
        await navigator?.clipboard?.writeText(label);
        setCopied(true);
    } catch (error) {
        console.log('Copy Failed');
    }
};

const renderTree = (
    nodes: any,
    isRoot: boolean,
    i: number,
    searchQuery: string,
    setCopied: React.Dispatch<React.SetStateAction<boolean>>
) => (
    <section key={i} style={{ position: 'relative' }} className='renderNodes'>
        {isRoot && (
            <button
                className='copy'
                onClick={() => handleCopy(`${nodes.id}`, setCopied)}
                title='Click to Copy'
            >
                <InfoOutlinedIcon style={{ color: '#0880ae' }} />
            </button>
        )}
        <StyledTreeItem key={nodes.id} nodeId={nodes.id} label={`${nodes.id}`}>
            {Object.entries(nodes).map(([key, value], index) => {
                if (
                    key !== 'id' &&
                    key !== 'name' &&
                    key !== 'children' &&
                    key !== 'channels' &&
                    key !== 'annotations'
                ) {
                    return (
                        <StyledTreeItem
                            key={`${nodes.id}-${key}`}
                            nodeId={`${nodes.id}-${key}`}
                            label={`${key}: ${value}`}
                        />
                    );
                }
                return null;
            })}
            {Array.isArray(nodes.children)
                ? nodes.children.map((node: any, i: any) =>
                    renderTree(node, true, i, searchQuery, setCopied)
                )
                : null}
            {Array.isArray(nodes.channels) ? (
                <StyledTreeItem nodeId={`${nodes.id}-channels`} label='Channels'>
                    {nodes.channels.map(
                        (
                            channel:
                                | string
                                | number
                                | boolean
                                | React.ReactElement<any, string | React.JSXElementConstructor<any>>
                                | React.ReactFragment
                                | React.ReactPortal
                                | null
                                | undefined,
                            index: any
                        ) => (
                            <StyledTreeItem
                                key={`${nodes.id}-channel-${index}`}
                                nodeId={`${nodes.id}-channel-${index}`}
                                label={channel}
                            />
                        )
                    )}
                </StyledTreeItem>
            ) : null}
            {Array.isArray(nodes.annotations) ? (
                <StyledTreeItem nodeId={`${nodes.id}-annotations`} label='Annotations'>
                    {nodes.annotations.length > 0 ? (
                        nodes.annotations.map((annotation: any, index: number) =>
                            Object.entries(annotation).map(([key, value], index) => (
                                <StyledTreeItem
                                    key={`${nodes.id}-${key}`}
                                    nodeId={`${nodes.id}-${key}`}
                                    label={`${key}: ${value}`}
                                />
                            ))
                        )
                    ) : (
                        <StyledTreeItem nodeId={`${nodes.id}-no-annotations`} label='[]'></StyledTreeItem>
                    )}
                </StyledTreeItem>
            ) : null}
        </StyledTreeItem>
    </section>
);

const useDebounce = (value: string, delay: number) => {
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        return () => {
            clearTimeout(timer);
        };
    }, [value, delay]);

    return debouncedValue;
};

const StoreView = () => {
    const fetchSize = 100;
    const observer = useRef<IntersectionObserver | null>(null);

    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [passer, setPasser] = useState({ from_: Number(0), to_: Number(fetchSize) });
    const [storeData, setStoreData] = useState({ data: [] });
    const [copied, setCopied] = useState(false);

    const debouncedSearchQuery = useDebounce(searchQuery, 500);

    const { data, status, error, isLoading, isFetching } = useQuery({
        queryKey: ['StoreConfig', passer],
        queryFn: async () => {
            return API.StoreConfig(passer);
        },
        keepPreviousData: false,
        refetchOnWindowFocus: false,
        cacheTime: 5 * 60 * 1000, // 5 minutes
        staleTime: 1 * 60 * 1000, // 1 minute
    });

    const loadMore = () => {
        setPasser((prevPasser) => ({
            from_: Number(prevPasser.to_),
            to_: Number(prevPasser.to_ + fetchSize),
        }));
    };

    useEffect(() => {
        if (!isLoading && status === 'success' && data) {
            setStoreData((prevData: any) => {
                const newData = data.data.filter(
                    (newItem: { id: any; }) =>
                        !prevData.data.some((item: { id: any; }) => item.id === newItem.id)
                );

                return {
                    ...prevData,
                    data: [...prevData.data, ...newData],
                };
            });
        }
    }, [data, isLoading, status]);

    useEffect(() => {
        if (storeData.data) {
            const filteredData = filterData(storeData.data, debouncedSearchQuery);
            setSearchResults(filteredData);
        }
    }, [storeData, debouncedSearchQuery]);

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
        console.log('searchResults', searchResults.length);
        if (observer.current && !isLoading && !isFetching && searchResults.length >= fetchSize) {
            observer.current.observe(document.getElementById('bottomObserver')!);
        }

        return () => {
            if (observer.current) {
                observer.current.disconnect();
            }
        };
    }, [isLoading, isFetching, searchResults]);

    const handleSearchQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(event.target.value);
    };

    const filterData = (nodes: any[], query: string) => {
        const filteredNodes: any = nodes.filter((node) => {
            if (node.id.toLowerCase().includes(query.toLowerCase())) {
                return true;
            }
            if (node.children && node.children.length > 0) {
                const filteredChildren = filterData(node.children, query);
                return filteredChildren.length > 0;
            }
            return false;
        });
        return filteredNodes;
    };

    return (
        <main className='mainArea'>
            {isLoading && <LoadingOverlay />}
            <section className='topLayout'>
                <TextField
                    fullWidth
                    id='myInput'
                    label='Search Session Id'
                    variant='outlined'
                    name='sessionId'
                    defaultValue={searchQuery}
                    className='sessionIdBox'
                    onChange={handleSearchQueryChange}
                    required
                    size='small'
                />
                {/* <Button variant='contained' onClick={loadMore}>
                    Load More
                </Button> */}
            </section>
            {(error !== undefined && error) && (
                <Alert severity='error' className='errorMessage'>
                    {error?.toString()}
                </Alert>
            )}
            {copied && <SnackBar message={'Session ID Copied Successfully'} severity={'info'} />}
            <section className='storeViewerLayout'>
                <TreeView
                    aria-label='Store View'
                    defaultCollapseIcon={<ExpandMoreIcon style={{ color: '#0880ae' }} />}
                    defaultExpandIcon={<ChevronRightIcon style={{ color: '#0880ae' }} />}
                >
                    {searchResults.length > 0 ? (
                        searchResults.map((node, i) =>
                            renderTree(node, true, i, searchQuery, setCopied)
                        )
                    ) : !isFetching && !isLoading ? (
                        <StyledTreeItem
                            nodeId='no-results'
                            label='No matching nodes found'
                        />
                    ) : null}
                </TreeView>
                <div id='bottomObserver' style={{ height: '10px' }}></div>
            </section>
        </main>
    );
};

export default React.memo(StoreView);
