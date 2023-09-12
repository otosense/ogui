import React, { useState, useRef, useCallback, useEffect, memo, useMemo } from 'react';
import ReactFlow, {
    ReactFlowProvider,
    addEdge,
    useNodesState,
    useEdgesState,
    Controls,
    Panel,
    Background,
    Connection,
    Edge,
    ReactFlowInstance,
    MarkerType,
    BackgroundVariant,
    Node,
} from 'reactflow';
import { Button, Alert } from '@mui/material';
import UploadIcon from '@mui/icons-material/Upload';
import GetAppIcon from '@mui/icons-material/GetApp';
import AlignHorizontalLeftIcon from '@mui/icons-material/AlignHorizontalLeft';
import dagre from 'dagre';


import Sidebar from './Components/Sidebar';
import LoadingOverlay from '../utilities/Loader';
import SnackBar from '../utilities/SnackBar';
import TextEditorNode from './Components/NodeTypes/TextEditorNode';
import DropDownNode from './Components/NodeTypes/DropDownNode';
import Save from './Components/Save';
import Load from './Components/Load';


import { convertJsonToFuncNodes } from './utilities/Mapping/convertJsonToFuncNodes';
import { convertFuncNodeToJsonEdge, convertFuncNodeToJsonNode } from './utilities/Mapping/convertFuncNodeToJson';
import { ValidationError } from './utilities/ErrorValidator';

import { dagDirections, errorHandler } from './utilities/globalFunction';
import { connectionValidation } from './utilities/Validations/ConnectionValidation';
import { connectionHandlers } from './utilities/Validations/connectionHandlers';
import { storeGrouping } from './utilities/Mapping/storeGrouping';
import { IDaggerProps } from './Components/Interfaces';
import { isArray, isEmpty, isFunction } from 'lodash';

// Each Node Width and Height Mentioned here
const nodeWidth = 200;
const nodeHeight = 75;

// Layout / Structure are handled by this plugin
const dagreGraph = new dagre.graphlib.Graph();
dagreGraph.setDefaultEdgeLabel(() => ({}));
const getLayoutedElements = onLayoutHandlers();

// Generating Random ID for nodes
const getId = (type: string) => `${(type === 'input' || type === 'textUpdater') ? 'variable_' + Math.floor(Math.random() * 1000) : 'function_' + Math.floor(Math.random() * 1000)}`;

// Main component Starts here
const Dagger = (props: IDaggerProps) => {
    const { onSave, LoadDagList, DagFuncList, onloadSavedDag, loadParamsList } = props;
    const reactFlowWrapper = useRef<any>(null); // Creating Reference for the DAG
    const [nodes, setNodes, onNodesChange] = useNodesState([]); // In-build function to handle Nodes
    const [edges, setEdges, onEdgesChange] = useEdgesState([]); // In-build function to handle Edges
    const [reactFlowInstance, setReactFlowInstance] = useState<ReactFlowInstance | null>(null); // Initial Load of Each Nodes takes place here
    const [isModal, setIsModal] = useState({ open: false, type: 'upload', data: {} }); // Modal for Save and Load
    const [uploadOver, setUploadOver] = useState(false); // check Save completion status
    const [funcList, setFuncList] = useState<any>([]); // Store Function List / FuncNode List
    const [showSnackbar, setShowSnackbar] = useState(false); // Handle Snack Bar for error handlings
    const [flowNodes, setFlowNodes] = useState<any>([]); // Re-append the nodes to UI

    const [isError, setIsError] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState(''); // Error Message Handler
    const [errorMapping, setErrorMapping] = useState([]); // Error Mapping storage to tell which node is in Error

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const toggleSnackbar = () => {
        // Snackbar Toggle to shown in UI
        setShowSnackbar((prev) => !prev);
    };

    useEffect(() => {
        // Once data received from API Extract only the function List /  FuncNode List
        // if (data) {
        //     // storeGrouping which extract and maps the Data into "dag_store" / "funcstore" / "funcfactoriesstore" 
        //     const list = storeGrouping(data);
        //     setFuncList(list.funcs); // storing FuncList
        // }
        setIsLoading(true);

        if (isEmpty(DagFuncList)) {
            setFuncList([]); // Return an empty array if DagFuncList is not provided
            setIsError(true);
        }

        if (isFunction(DagFuncList)) {
            setIsError(false);
            // Check if data is a function
            const result: any = DagFuncList();
            if (isFunction(result?.then)) {
                // Check if the result of the function is a promise
                result.then((dataArray: any) => {
                    const list = storeGrouping(dataArray);
                    setFuncList(list.funcs); // storing FuncList
                    setIsLoading(false);
                });
            } else {
                const dataArray = result as any[]; // Assuming the result is an array
                const list = storeGrouping(dataArray);
                setFuncList(list.funcs); // storing FuncList
                setIsLoading(false);
            }
        } else if (isArray(DagFuncList)) {
            // Check if data is an array
            const list = storeGrouping(DagFuncList);
            setFuncList(list.funcs); // storing FuncList
            setIsLoading(false);
        } else {
            setFuncList([]);
            setIsLoading(false);
            setIsError(true);
        }



        // if (!isEmpty(DagFuncList)) {
        //     // storeGrouping which extract and maps the Data into "dag_store" / "funcstore" / "funcfactoriesstore" 
        //     const list = storeGrouping(DagFuncList);
        //     setFuncList(list.funcs); // storing FuncList
        //     setIsLoading(false);
        // }
    }, [DagFuncList]);


    useEffect(() => {
        // onLayout('TB'); // Set vertical layout on component load Top to Bottom Layout
        // onLayout('LR'); // Set vertical layout on component load Left to Right Layout

        setTimeout(() => {// given Timeout because API will take sometime to load Dag Once timeout done it will call the onLayout function to arrange in proper 
            onLayout('LR'); // Set vertical layout on component load Left to Right Layout;
        }, 500);
    }, [uploadOver]);

    const nodeTypes = useMemo(() => ({
        // textUpdater is "TextEditorNode" component which holds varNode functionality
        textUpdater: (props: any) => <TextEditorNode {...props} type='varNode' errorMapping={errorMapping} />,
        // custom is "DropDownNode" component which holds funcNode functionality
        custom: (props: any) => <DropDownNode {...props} type='funcNode' funcLists={funcList} errorMapping={errorMapping || []} flowNodes={flowNodes} loadParamsList={loadParamsList} />,
    }), [funcList, errorMapping, flowNodes]);

    // Connection Handlers => Rules for the connections
    const onConnect = connectionHandlers(edges, setErrorMessage, toggleSnackbar, setEdges);

    // const onLayout = autoLayoutStructure(nodes, edges, setNodes, setEdges);

    // Reason for Auto Alignment of Nodes and Edges
    const onLayout = useCallback(
        (direction: string | undefined) => {
            const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(
                nodes,
                edges,
                direction
            );
            setNodes([...layoutedNodes]);
            setEdges([...layoutedEdges]);
        },
        [nodes, edges]
    );

    // isValidConnection => Stop connection from Same node like var to var not allowed and func to func Not allowed
    const isValidConnection = connectionValidation(nodes, setErrorMessage, toggleSnackbar);
    // passing the updated nodes in the UI Dag
    const dataWithUpdates = nodes.map((node: any) => node);

    // convert FuncNode to JSON structure how the UI / Dag wants
    const handleUpload = useCallback((data: any) => {
        const funcToJsonNode: any = convertFuncNodeToJsonNode(data);
        const funcToJsonEdge: any = convertFuncNodeToJsonEdge(data);
        setNodes(funcToJsonNode);
        setEdges(funcToJsonEdge);
        setUploadOver(!uploadOver);
    }, [setNodes, setEdges, setUploadOver]);

    // Saving the Dag and Prevent saving is any validationError are there  refer function "ValidationError"
    const saveHandler = useCallback((e: { preventDefault: () => void; }) => {
        e.preventDefault();
        const flowKey = 'DAG-flow';
        if (reactFlowInstance) {
            const flow: any = reactFlowInstance.toObject();
            setFlowNodes(flow.nodes);
            // Handling Error if any of the nodes label are empty
            const getFuncNode = ValidationError(flow);
            let MappedJson = { // Mapping JSON
                func_nodes: convertJsonToFuncNodes(flow)
            };

            if (getFuncNode.length > 0) { // if Error is there show Snackbar
                errorHandler(setErrorMessage, toggleSnackbar, 'There are Some Empty Nodes');
            }
            setErrorMapping(getFuncNode); // Listed all the node which are having empty labels
            setIsModal({
                open: getFuncNode.length === 0, // if node error modal box will open
                type: 'download',
                data: MappedJson
            });
            localStorage.setItem(flowKey, JSON.stringify(flow)); // backup saving the  Actual nodes in localStorage 
            localStorage.setItem('MappedJson', JSON.stringify(MappedJson)); // backup saving the converted for our JSON requirement nodes in localStorage

        }
    }, [reactFlowInstance]);

    // Handled Drag-in node from Left side panel to Dag Area
    const onDragOver = useCallback((event: { preventDefault: () => void; dataTransfer: { dropEffect: string; }; }) => {
        event.preventDefault();
        event.dataTransfer.dropEffect = 'move';
    }, []);

    // passing the updated Edges in the UI Dag
    const edgesWithUpdatedTypes = edges.map((edge: any) => {
        if (edge.sourceHandle) {
            // const edgeType = nodes.find((node) => node.type === 'custom')?.data.selects[edge.sourceHandle];
            // edge.type = edgeType;
            // edge.markerEnd = {
            //     type: MarkerType.ArrowClosed,
            // };
        } edge.id = `${edge.source} + ${edge.target}`;
        return edge;
    });

    // Handled Drag-out node from Left side panel to Dag Area once user drags-out place the nodes in Dag Area
    const onDrop = useCallback(
        (event: { preventDefault: () => void; dataTransfer: { getData: (arg0: string) => any; }; clientX: number; clientY: number; }) => {
            event.preventDefault();
            const reactFlowBounds = reactFlowWrapper?.current?.getBoundingClientRect();
            const type = event.dataTransfer.getData('application/reactflow');
            if (typeof type === 'undefined' || !type) {
                return;
            }
            const position = reactFlowInstance?.project({ // Hanlde positon of Nodes
                x: event.clientX - reactFlowBounds.left,
                y: event.clientY - reactFlowBounds.top,
            });
            const nodeTypeId = getId(type); // generating unique id for each nodes
            let newNode: any = { // Normal var node creation structure
                id: nodeTypeId,
                type,
                position,
                data: { label: '', initialEdge: dagDirections, }, // dagDirections will tell the Dag what layout to use LR or TB
            };
            if (type === 'custom') { /// Normal func node creation structure
                newNode.data = {
                    label: '',
                    ddType: '',
                    initialEdge: dagDirections, // dagDirections will tell the Dag what layout to use LR or TB
                    selects: {
                        [nodeTypeId]: '',
                        hasValue: 0
                    },
                };
            }
            setNodes((nds: any) => nds.concat(newNode));
        },
        [reactFlowInstance] // funcList
    );

    const uploadHandler = () => { // open Load Modal-box
        setUploadOver(false);
        setIsModal({
            ...isModal,
            open: true,
            type: 'upload',
        });
    };

    const closeModal = () => {
        setIsModal({
            open: false,
            type: 'upload',
            data: {}
        });
    };


    return (
        // Any error in API Component will not load show the actual error message
        isError ? (<Alert severity='error' className='errorMessage'>
            There is an Error getting DagFuncList data
        </Alert>) : (
            <div className={`dndflow ${isModal?.open && 'overlayEffect'}`}>
                {isLoading && <LoadingOverlay />}
                {/* Actual Dag Structure Everything starts here */}
                <ReactFlowProvider>
                    {/* Side Bar which contains list of node to Drag  */}
                    <Sidebar />
                    <div className="reactflow-wrapper" ref={reactFlowWrapper}>
                        <ReactFlow
                            // nodes={nodes}
                            nodes={dataWithUpdates}
                            snapToGrid={true}
                            snapGrid={[3, 3]}
                            // edges={edges}
                            edges={edgesWithUpdatedTypes}
                            onNodesChange={onNodesChange}
                            onEdgesChange={onEdgesChange}
                            isValidConnection={isValidConnection}
                            onConnect={onConnect}
                            onInit={setReactFlowInstance}
                            onDrop={onDrop}
                            onDragOver={onDragOver}
                            fitView
                            nodeTypes={nodeTypes}
                        >
                            <Background
                                variant={BackgroundVariant.Lines}
                                color="#2a2b2d"
                                style={{ backgroundColor: "#1E1F22" }}
                            />
                            <Controls />
                            <Panel position="top-right">
                                <Button variant="contained" onClick={saveHandler} className='saveBtn panelBtn' startIcon={<UploadIcon />}>Save</Button>
                                <Button variant="contained" onClick={uploadHandler} className='panelBtn' startIcon={<GetAppIcon />}>Load</Button>
                            </Panel>
                        </ReactFlow>
                    </div>

                </ReactFlowProvider>
                {isModal?.open && (
                    <div className='overlayPosition'>
                        {isModal?.type === 'upload' ? (
                            <Load onClose={closeModal} type={isModal?.type} data={isModal?.data} onDataUploaded={handleUpload} userData={LoadDagList} loadSavedDag={onloadSavedDag} />
                        ) : (
                            <Save onClose={closeModal} type={isModal?.type} data={isModal?.data} onDataUploaded={handleUpload} onSave={onSave} />
                        )}
                    </div>
                )}

                {showSnackbar && <SnackBar message={errorMessage} severity='error' />}
            </div>
        )
    );


};

export default memo(Dagger);


function onLayoutHandlers() {
    return (nodes: any[], edges: any[], direction = 'TB') => {
        const isHorizontal = direction === 'TB';
        dagreGraph.setGraph({ rankdir: direction });

        nodes.forEach((node: { id: any; }) => {
            dagreGraph.setNode(node.id, { width: nodeWidth, height: nodeHeight });
        });

        edges.forEach((edge: { source: any; target: any; }) => {
            dagreGraph.setEdge(edge.source, edge.target);
        });

        dagre.layout(dagreGraph);

        nodes.forEach((node: { id: any; targetPosition: string; sourcePosition: string; position: { x: number; y: number; }; }) => {
            const nodeWithPosition = dagreGraph.node(node.id);
            node.targetPosition = isHorizontal ? 'left' : 'top';
            node.sourcePosition = isHorizontal ? 'right' : 'bottom';

            // We are shifting the dagre node position (anchor=center center) to the top left
            // so it matches the React Flow node anchor point (top left).
            node.position = {
                x: nodeWithPosition.x - nodeWidth / 2,
                y: nodeWithPosition.y - nodeHeight / 2,
            };

            return node;
        });

        return { nodes, edges };
    };
}











