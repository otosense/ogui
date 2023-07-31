import { useState, useRef, useCallback, useEffect, memo, useMemo } from 'react';
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
} from 'reactflow';
import 'reactflow/dist/style.css';
import dagre from 'dagre';

import Sidebar from './Sidebar';
import { convertJsonToFuncNodes } from './convertJsonToFuncNodes';
import { convertFuncNodeToJsonEdge, convertFuncNodeToJsonNode } from './convertFuncNodeToJson';
import TextEditorNode from './NodeTypes/TextEditorNode';
import DropDownNode from './NodeTypes/DropDownNode';
import Load from './Load';
import Save from './Save';
import * as API from './../API/API';
import 'reactflow/dist/style.css';
import React from 'react';
import { ValidationError } from './ErrorValidator';
import { Button } from '@mui/material';
import UploadIcon from '@mui/icons-material/Upload';
import GetAppIcon from '@mui/icons-material/GetApp';
import { dagDirections } from '../Utilities/globalFunction';
import { Alert } from '@mui/material';
import LoadingOverlay from '../../../utilities/Loader';
import SnackBar from '../../../utilities/SnackBar';


const dagreGraph = new dagre.graphlib.Graph();
dagreGraph.setDefaultEdgeLabel(() => ({}));

const nodeWidth = 200;
const nodeHeight = 75;

// Handle the different types of Layouts like Horizontal and Vertical
const getLayoutedElements = onLayoutHandlers();

// Generating Random ID for nodes
const getId = (type: string) => `${(type === 'input' || type === 'textUpdater') ? 'variable_' + Math.floor(Math.random() * 1000) : 'function_' + Math.floor(Math.random() * 1000)}`;
// const nodeTypes = {
//     // custom: (props: any) => <TextEditorNode {...props} type='funcNode' />,
//     textUpdater: (props: any) => <TextEditorNode {...props} type='varNode' />,
//     custom: (props: any) => <DropDownNode {...props} type='funcNode' />,
// };
const DnDFlow = () => {
    const reactFlowWrapper = useRef(null);
    const [nodes, setNodes, onNodesChange] = useNodesState([]);
    const [edges, setEdges, onEdgesChange] = useEdgesState([]);
    const [reactFlowInstance, setReactFlowInstance] = useState<ReactFlowInstance | null>(null);
    const [isModal, setIsModal] = useState({ open: false, type: 'upload', data: {} });
    const [uploadOver, setUploadOver] = useState(false);
    const [funcList, setFuncList] = useState<any>([]);
    const [showSnackbar, setShowSnackbar] = useState(false);
    const [loading, setLoading] = useState(true);
    const [isError, setIsError] = useState(false);
    const [flowNodes, setFlowNodes] = useState([]);

    const [errorMessage, setErrorMessage] = useState('');
    const [errorMapping, setErrorMapping] = useState([]);


    // const onConnect = useCallback((params: Edge | Connection) => setEdges((eds) => addEdge(params, eds)), []);
    const toggleSnackbar = () => {
        setShowSnackbar((prev) => !prev);
        // setSnackbarKey((prev) => prev + 1); // Update the key to force the Snackbar to re-render
    };
    useEffect(() => {
        fetchData();
    }, []);


    useEffect(() => {
        onLayout('TB'); // Set vertical layout on component load
    }, [uploadOver]);

    const fetchData = async () => {
        try {
            const resolve = await API.getFuncNodes();
            setLoading(false);
            resolve.unshift({
                label: 'select function Node',
                value: '',
                inputs: []
            });
            setFuncList(resolve);

            // // Adding Custom Function
            // const customFunction = {
            //     "value": "new",
            //     "label": "New Function"
            // };
            // setFuncList((prevData: any) => [...prevData, customFunction]);
        } catch (error: any) {
            // Handle error
            setIsError(true);
            setLoading(false);
            console.log('Error in API.getFuncNodes', error.toString());
        }
    };

    const nodeTypes = useMemo(() => ({
        textUpdater: (props: any) => <TextEditorNode {...props} type='varNode' errorMapping={errorMapping} />,
        custom: (props: any) => <DropDownNode {...props} type='funcNode' funcLists={funcList} errorMapping={errorMapping || []} flowNodes={flowNodes} />,
    }), [funcList, errorMapping, flowNodes]);


    const onConnect = useCallback((params: Edge | Connection) => {
        const { source, target } = params;

        const sourceNode = nodes.find((node: { id: any; }) => node.id === source);
        console.log('sourceNode', sourceNode);
        // Check if the source node already has an outgoing edge
        const existingOutgoingEdge = edges.find((edge: { source: any; }) => {
            if (sourceNode?.type !== 'textUpdater') {
                return edge.source === source;
            }
        });
        if (existingOutgoingEdge) {
            // An outgoing edge already exists, so prevent creating a new connection
            return errorHandler(setErrorMessage, toggleSnackbar, 'Already having an outgoing connection');
        }

        // Check if the target node already has an incoming edge
        const existingIncomingEdge = edges.find((edge: { target: any; }) => {
            if (sourceNode?.type !== 'textUpdater') {
                return edge.target === target;
            }
        });
        if (existingIncomingEdge) {
            // An incoming edge already exists, so prevent creating a new connection
            return errorHandler(setErrorMessage, toggleSnackbar, 'Already having an incoming connection');
        }

        const newEdge = {
            ...params,
            type: 'smoothstep',
            animated: true,
        };
        // No outgoing or incoming edge exists, create the new connection
        setEdges((prevEdges: any) => addEdge(newEdge, prevEdges));
    }, [nodes, edges]);

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



    // const nodeTypes = useMemo(() => ({
    //     custom: (props: any) => <TextEditorNode {...props} type='funcNode' />,
    //     textUpdater: (props: any) => <TextEditorNode {...props} type='varNode'  />,
    // }), []);

    // const handleUpload = (data: any) => {
    //     const funcToJsonNode: any = convertFuncNodeToJsonNode(data);
    //     const funcToJsonEdge: any = convertFuncNodeToJsonEdge(data);
    //     setNodes(funcToJsonNode);
    //     setEdges(funcToJsonEdge);
    //     setUploadOver(true);
    // };

    const handleUpload = useCallback((data: any) => {
        const funcToJsonNode: any = convertFuncNodeToJsonNode(data);
        const funcToJsonEdge: any = convertFuncNodeToJsonEdge(data);
        setNodes(funcToJsonNode);
        setEdges(funcToJsonEdge);
        setUploadOver(!uploadOver);
    }, [setNodes, setEdges, setUploadOver]);

    const onSave = useCallback((e: { preventDefault: () => void; }) => {
        e.preventDefault();
        const flowKey = 'DAG-flow';
        if (reactFlowInstance) {
            const flow = reactFlowInstance.toObject();
            setFlowNodes(flow.nodes);
            // Handling Error if any of the nodes label are empty
            console.log('flow', flow);
            const getFuncNode = ValidationError(flow);
            let MappedJson = {
                func_nodes: convertJsonToFuncNodes(flow)
            };
            // console.log('getFuncNode', getFuncNode);

            if (getFuncNode.length > 0) {
                errorHandler(setErrorMessage, toggleSnackbar, 'There are Some Empty Nodes');
            }
            setErrorMapping(getFuncNode);
            setIsModal({
                open: getFuncNode.length === 0,
                type: 'download',
                data: MappedJson
            });
            localStorage.setItem(flowKey, JSON.stringify(flow));
            localStorage.setItem('MappedJson', JSON.stringify(MappedJson));

        }
    }, [reactFlowInstance]);

    const onDragOver = useCallback((event: { preventDefault: () => void; dataTransfer: { dropEffect: string; }; }) => {
        event.preventDefault();
        event.dataTransfer.dropEffect = 'move';
    }, []);

    const edgesWithUpdatedTypes = edges.map((edge: any) => {
        if (edge.sourceHandle) {
            // const edgeType = nodes.find((node) => node.type === 'custom')?.data.selects[edge.sourceHandle];
            // edge.type = edgeType;
            edge.markerEnd = {
                type: MarkerType.ArrowClosed,
            };
        } edge.id = `${edge.source} + ${edge.target}`;
        return edge;
    });

    const onDrop = useCallback(
        (event: { preventDefault: () => void; dataTransfer: { getData: (arg0: string) => any; }; clientX: number; clientY: number; }) => {
            event.preventDefault();
            const reactFlowBounds = reactFlowWrapper?.current?.getBoundingClientRect();
            const type = event.dataTransfer.getData('application/reactflow');
            if (typeof type === 'undefined' || !type) {
                return;
            }
            const position = reactFlowInstance?.project({
                x: event.clientX - reactFlowBounds.left,
                y: event.clientY - reactFlowBounds.top,
            });
            const nodeTypeId = getId(type);
            let newNode: any = {
                id: nodeTypeId,
                type,

                position,
                data: { label: '', initialEdge: dagDirections, },
            };
            if (type === 'custom') {
                newNode.data = {
                    label: funcList?.[0]?.label,
                    ddType: funcList?.[0]?.label,
                    initialEdge: dagDirections,
                    selects: {
                        [nodeTypeId]: funcList?.[0]?.label,
                        hasValue: funcList?.[0]?.input?.length
                    },
                };
            }
            setNodes((nds: string | any[]) => nds.concat(newNode));
        },
        [reactFlowInstance, funcList]
    );


    const dataWithUpdates = nodes.map((node: any) => node);

    const isValidConnection = (connection: any) => {
        const { source, target } = connection;
        const sourceNode = nodes.find((node: { id: any; }) => node.id === source);
        const targetNode = nodes.find((node: { id: any; }) => node.id === target);

        if (!sourceNode || !targetNode) {
            return errorHandler(setErrorMessage, toggleSnackbar, 'Invalid connection');
        }
        const sourceType = sourceNode.type;
        const targetType = targetNode.type;

        if (sourceType === targetType) {
            return errorHandler(setErrorMessage, toggleSnackbar, 'Same Connections not allowed');
        }
        return sourceType !== targetType;
    };



    const uploadHandler = () => {
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
        isError ? (<Alert severity='error' className='errorMessage'>
            There is an Error in API
        </Alert>) : (
            <div className={`dndflow ${isModal?.open && 'overlayEffect'}`}>
                {loading && <LoadingOverlay />}

                <ReactFlowProvider>
                    <Sidebar />
                    <div className="reactflow-wrapper" ref={reactFlowWrapper}>
                        <ReactFlow
                            // nodes={nodes}
                            nodes={dataWithUpdates}
                            snapToGrid={true}
                            snapGrid={[2, 2]}
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
                                {/* <button>save</button>
                            <button onClick={uploadHandler} className='panelBtn'>load</button> */}

                                <Button variant="contained" onClick={onSave} className='saveBtn panelBtn' startIcon={<UploadIcon />}>Save</Button>
                                <Button variant="contained" onClick={uploadHandler} className='panelBtn' startIcon={<GetAppIcon />}>Load</Button>
                            </Panel>

                            {/* <Panel position="top-left">
                            <button onClick={() => onLayout('TB')} className='saveBtn'>vertical layout</button>
                            <button onClick={() => onLayout('LR')}>horizontal layout</button>
                        </Panel> */}
                        </ReactFlow>
                    </div>

                </ReactFlowProvider>
                {isModal?.open && (
                    <div className='overlayPosition'>
                        {isModal?.type === 'upload' ? (
                            <Load onClose={closeModal} type={isModal?.type} data={isModal?.data} onDataUploaded={handleUpload} />
                        ) : (
                            <Save onClose={closeModal} type={isModal?.type} data={isModal?.data} onDataUploaded={handleUpload} />
                        )}
                    </div>
                )}

                {showSnackbar && <SnackBar message={errorMessage} severity='error' />}
            </div>
        )
    );


};

export default memo(DnDFlow);

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

function errorHandler(setErrorMessage: React.Dispatch<React.SetStateAction<string>>, toggleSnackbar: () => void, errorString: string) {
    setErrorMessage(errorString);
    toggleSnackbar();
    return false;
}

