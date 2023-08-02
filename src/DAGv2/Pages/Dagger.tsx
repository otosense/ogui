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
    Node,
} from 'reactflow';
import 'reactflow/dist/style.css';


import Sidebar from '../Components/DragandDrop/Sidebar';
import { convertJsonToFuncNodes } from '../Components/Utilities/Mapping/convertJsonToFuncNodes';
import { convertFuncNodeToJsonEdge, convertFuncNodeToJsonNode } from '../Components/Utilities/Mapping/convertFuncNodeToJson';
import TextEditorNode from '../Components/DragandDrop/NodeTypes/TextEditorNode';
import DropDownNode from '../Components/DragandDrop/NodeTypes/DropDownNode';
import Load from '../Components/DragandDrop/Load';
import Save from '../Components/DragandDrop/Save';
import * as API from '../Components/API/API';
import 'reactflow/dist/style.css';
import React from 'react';
import { ValidationError } from '../Components/Utilities/ErrorValidator';
import { Button } from '@mui/material';
import UploadIcon from '@mui/icons-material/Upload';
import GetAppIcon from '@mui/icons-material/GetApp';
import { dagDirections, errorHandler } from '../Components/Utilities/globalFunction';
import { Alert } from '@mui/material';
import LoadingOverlay from '../../utilities/Loader';
import SnackBar from '../../utilities/SnackBar';
import { sampleInput } from '../Components/API/sampleFunction';
import { autoLayoutStructure, onLayoutHandlers } from '../Components/Utilities/Layouts';
import { connectionValidation } from '../Components/Utilities/Validations/ConnectionValidation';
import { connectionHandlers } from '../Components/Utilities/Validations/connectionHandlers';
import { getFunctionList } from '../Components/API/ApiCalls';







// Generating Random ID for nodes
const getId = (type: string) => `${(type === 'input' || type === 'textUpdater') ? 'variable_' + Math.floor(Math.random() * 1000) : 'function_' + Math.floor(Math.random() * 1000)}`;
// const nodeTypes = {
//     // custom: (props: any) => <TextEditorNode {...props} type='funcNode' />,
//     textUpdater: (props: any) => <TextEditorNode {...props} type='varNode' />,
//     custom: (props: any) => <DropDownNode {...props} type='funcNode' />,
// };
const Dagger = () => {
    const reactFlowWrapper = useRef<any>(null);
    const [nodes, setNodes, onNodesChange] = useNodesState([]);
    const [edges, setEdges, onEdgesChange] = useEdgesState([]);
    const [reactFlowInstance, setReactFlowInstance] = useState<ReactFlowInstance | null>(null);
    const [isModal, setIsModal] = useState({ open: false, type: 'upload', data: {} });
    const [uploadOver, setUploadOver] = useState(false);
    const [funcList, setFuncList] = useState<any>([]);
    const [showSnackbar, setShowSnackbar] = useState(false);
    const [loading, setLoading] = useState(true);
    const [isError, setIsError] = useState(false);
    const [flowNodes, setFlowNodes] = useState<any>([]);

    const [errorMessage, setErrorMessage] = useState('');
    const [errorMapping, setErrorMapping] = useState([]);


    // const onConnect = useCallback((params: Edge | Connection) => setEdges((eds) => addEdge(params, eds)), []);
    const toggleSnackbar = () => {
        setShowSnackbar((prev) => !prev);
        // setSnackbarKey((prev) => prev + 1); // Update the key to force the Snackbar to re-render
    };


    const fetchData = getFunctionList(setLoading, setFuncList, setIsError);
    useEffect(() => {
        fetchData();
    }, []);


    useEffect(() => {
        // onLayout('TB'); // Set vertical layout on component load
        onLayout('LR'); // Set vertical layout on component load
    }, [uploadOver]);


    const nodeTypes = useMemo(() => ({
        textUpdater: (props: any) => <TextEditorNode {...props} type='varNode' errorMapping={errorMapping} />,
        custom: (props: any) => <DropDownNode {...props} type='funcNode' funcLists={funcList} errorMapping={errorMapping || []} flowNodes={flowNodes} />,
    }), [funcList, errorMapping, flowNodes]);


    const onConnect = connectionHandlers(nodes, edges, setErrorMessage, toggleSnackbar, setEdges);

    const onLayout = autoLayoutStructure(nodes, edges, setNodes, setEdges);

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
                    label: funcList?.[0]?.label,
                    ddType: funcList?.[0]?.label,
                    initialEdge: dagDirections,
                    selects: {
                        [nodeTypeId]: funcList?.[0]?.label,
                        hasValue: funcList?.[0]?.input?.length
                    },
                };
            }
            setNodes((nds: any) => nds.concat(newNode));
        },
        [reactFlowInstance, funcList]
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
                                <Button variant="contained" onClick={onSave} className='saveBtn panelBtn' startIcon={<UploadIcon />}>Save</Button>
                                <Button variant="contained" onClick={uploadHandler} className='panelBtn' startIcon={<GetAppIcon />}>Load</Button>
                            </Panel>
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

export default memo(Dagger);










