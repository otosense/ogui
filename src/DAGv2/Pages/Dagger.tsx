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


import Sidebar from '../Components/DragandDrop/Sidebar';
import LoadingOverlay from '../../utilities/Loader';
import SnackBar from '../../utilities/SnackBar';
import TextEditorNode from '../Components/DragandDrop/NodeTypes/TextEditorNode';
import DropDownNode from '../Components/DragandDrop/NodeTypes/DropDownNode';
import Save from '../Components/DragandDrop/Save';
import Load from '../Components/DragandDrop/Load';


import { convertJsonToFuncNodes } from '../Components/Utilities/Mapping/convertJsonToFuncNodes';
import { convertFuncNodeToJsonEdge, convertFuncNodeToJsonNode } from '../Components/Utilities/Mapping/convertFuncNodeToJson';
import { ValidationError } from '../Components/Utilities/ErrorValidator';

import { dagDirections, errorHandler, functionList } from '../Components/Utilities/globalFunction';
import { connectionValidation } from '../Components/Utilities/Validations/ConnectionValidation';
import { connectionHandlers } from '../Components/Utilities/Validations/connectionHandlers';
import { apiMethod } from '../Components/API/ApiCalls';

const nodeWidth = 200;
const nodeHeight = 75;

const dagreGraph = new dagre.graphlib.Graph();
dagreGraph.setDefaultEdgeLabel(() => ({}));

// Generating Random ID for nodes
const getLayoutedElements = onLayoutHandlers();
const getId = (type: string) => `${(type === 'input' || type === 'textUpdater') ? 'variable_' + Math.floor(Math.random() * 1000) : 'function_' + Math.floor(Math.random() * 1000)}`;

const Dagger = () => {
    const reactFlowWrapper = useRef<any>(null);
    const [nodes, setNodes, onNodesChange] = useNodesState([]);
    const [edges, setEdges, onEdgesChange] = useEdgesState([]);
    const [reactFlowInstance, setReactFlowInstance] = useState<ReactFlowInstance | null>(null);
    const [isModal, setIsModal] = useState({ open: false, type: 'upload', data: {} });
    const [uploadOver, setUploadOver] = useState(false);
    const [funcList, setFuncList] = useState<any>([]);
    const [showSnackbar, setShowSnackbar] = useState(false);
    const [flowNodes, setFlowNodes] = useState<any>([]);

    const [errorMessage, setErrorMessage] = useState('');
    const [errorMapping, setErrorMapping] = useState([]);
    const [dagStore, setDagStore] = useState<string[]>([]);


    const toggleSnackbar = () => {
        setShowSnackbar((prev) => !prev);
    };

    const payload = {
        "_attr_name": "__iter__",
    };
    const { data, status, error, isLoading, isFetching } = apiMethod(payload);

    // useEffect(() => {
    //     fetchData();
    // }, []);
    // const fetchData = getFunctionList(setLoading, setFuncList, setIsError);



    // console.log({ data, status, error, isLoading, isFetching });

    useEffect(() => {
        if (data) {
            const list = functionList(data);
            setFuncList(list.funcstore);
            setDagStore(list.dag_store);
        }
    }, [data]);


    useEffect(() => {
        // onLayout('TB'); // Set vertical layout on component load Top to Bottom Layout
        // onLayout('LR'); // Set vertical layout on component load Left to Right Layout

        setTimeout(() => {
            onLayout('LR');
        }, 500);
    }, [uploadOver]);

    // const nodeTypes = useMemo(
    //     () => ({
    //         textUpdater: (props: any) => <TextEditorNode {...props} type='varNode' errorMapping={errorMapping} />,
    //         custom: (props: any) => <DropDownNode {...props} type='funcNode' funcLists={funcList} errorMapping={errorMapping || []} flowNodes={flowNodes} />,
    //     }),
    //     [funcList, errorMapping, flowNodes]
    // );

    const nodeTypes = useMemo(() => ({
        textUpdater: (props: any) => <TextEditorNode {...props} type='varNode' errorMapping={errorMapping} />,
        custom: (props: any) => <DropDownNode {...props} type='funcNode' funcLists={funcList} errorMapping={errorMapping || []} flowNodes={flowNodes} />,
    }), [funcList, errorMapping, flowNodes]);


    // const nodeTypes = useMemo(() => ({
    //     textUpdater: (props: any) => <TextEditorNode {...props} type='varNode' errorMapping={errorMapping} />,
    //     custom: (props: any) => <DropDownNode {...props} type='funcNode' funcLists={funcList} errorMapping={errorMapping || []} flowNodes={flowNodes} />,
    // }), [funcList, errorMapping, flowNodes]);

    // const nodeTypes = {
    //     textUpdater: (props: any) => <TextEditorNode {...props} type='varNode' errorMapping={errorMapping} />,
    //     custom: (props: any) => (
    //         <DropDownNode
    //             {...props}
    //             type='funcNode'
    //             funcLists={funcList}
    //             errorMapping={errorMapping || []}
    //             flowNodes={flowNodes}
    //         />
    //     ),
    // };

    // ... (rest of the component code)










    const onConnect = connectionHandlers(nodes, edges, setErrorMessage, toggleSnackbar, setEdges);

    // const onLayout = autoLayoutStructure(nodes, edges, setNodes, setEdges);

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

    const isValidConnection = connectionValidation(nodes, setErrorMessage, toggleSnackbar);
    const dataWithUpdates = nodes.map((node: any) => node);

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
            const getFuncNode = ValidationError(flow);
            let MappedJson = {
                func_nodes: convertJsonToFuncNodes(flow)
            };

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
                    label: '',
                    ddType: '',
                    initialEdge: dagDirections,
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
        error ? (<Alert severity='error' className='errorMessage'>
            There is an Error in API
        </Alert>) : (
            <div className={`dndflow ${isModal?.open && 'overlayEffect'}`}>
                {isLoading && <LoadingOverlay />}

                <ReactFlowProvider>
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
                                <Button variant="contained" onClick={onSave} className='saveBtn panelBtn' startIcon={<UploadIcon />}>Save</Button>
                                <Button variant="contained" onClick={uploadHandler} className='panelBtn' startIcon={<GetAppIcon />}>Load</Button>
                            </Panel>
                        </ReactFlow>
                    </div>

                </ReactFlowProvider>
                {isModal?.open && (
                    <div className='overlayPosition'>
                        {isModal?.type === 'upload' ? (
                            <Load onClose={closeModal} type={isModal?.type} data={isModal?.data} onDataUploaded={handleUpload} loadList={dagStore} />
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











