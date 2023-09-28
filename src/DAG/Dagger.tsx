import React, { useState, useRef, useCallback, useEffect, memo, useMemo } from 'react';
import ReactFlow, {
    ReactFlowProvider,
    useNodesState,
    useEdgesState,
    Controls,
    Panel,
    Background,
    ReactFlowInstance,
    BackgroundVariant,
    ControlButton,
} from 'reactflow';
import { Button, Alert, Modal } from '@mui/material';
import UploadIcon from '@mui/icons-material/Upload';
import GetAppIcon from '@mui/icons-material/GetApp';
import DataObjectIcon from '@mui/icons-material/DataObject';
import DeleteIcon from '@mui/icons-material/Delete';


import Sidebar from './Components/Sidebar';
import LoadingOverlay from '../utilities/Loader';
import TextEditorNode from './Components/NodeTypes/TextEditorNode';
import DropDownNode from './Components/NodeTypes/DropDownNode/DropDownNode';
import Save from './Components/Save';
import Load from './Components/Load';


import { convertJsonToFuncNodes } from './utilities/Mapping/convertJsonToFuncNodes';
import { convertFuncNodeToJsonEdge, convertFuncNodeToJsonNode } from './utilities/Mapping/convertFuncNodeToJson';
import { ValidationError } from './utilities/ErrorValidator';

import { dagDirections, getId } from './utilities/globalFunction';
import { connectionValidation } from './utilities/Validations/ConnectionValidation';
import { connectionHandlers } from './utilities/Validations/connectionHandlers';
import { storeGrouping } from './utilities/Mapping/storeGrouping';
import { IDaggerProps } from './Components/Interfaces';
import { get, isArray, isEmpty, isFunction, some, uniqBy } from 'lodash';
import JsonEditor from './Components/JSONLayout/Schema';
import SplitterLayout from 'react-splitter-layout';
import { autoLayoutStructure } from './utilities/Layouts';
import Toast, { showToast } from './utilities/ReactToastMessage';
import CustomModal from './Components/Modal';
import DeleteAll from './Components/NodeTypes/DeleteAll';


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
    const [flowNodes, setFlowNodes] = useState<any>([]); // Re-append the nodes to UI

    const [isError, setIsError] = useState<boolean>(false);
    const [errorMapping, setErrorMapping] = useState([]); // Error Mapping storage to tell which node is in Error

    const [isLoading, setIsLoading] = useState<boolean>(false);

    const [showSchema, setShowSchema] = useState<any>();
    const [orientation, setOrientation] = useState(false);
    const [openModal, setOpenModal] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        generateInitialData(DagFuncList, setFuncList, setIsError, setIsLoading);
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
    const onConnect = connectionHandlers(edges, setEdges);

    // Reason for Auto Alignment of Nodes and Edges
    const onLayout = autoLayoutStructure(nodes, edges, setNodes, setEdges);



    // isValidConnection => Stop connection from Same node like var to var not allowed and func to func Not allowed
    const isValidConnection = useMemo(() => connectionValidation(nodes), [nodes]);
    // passing the updated nodes in the UI Dag
    // const dataWithUpdates = nodes;

    // convert FuncNode to JSON structure how the UI / Dag wants
    const handleUpload = useCallback((data: any) => {
        const funcToJsonNode: any = convertFuncNodeToJsonNode(data);
        const funcToJsonEdge: any = convertFuncNodeToJsonEdge(data);
        setNodes(funcToJsonNode);
        setEdges(funcToJsonEdge);
        setUploadOver(!uploadOver);
    }, [setNodes, setEdges]);


    // JSON creation on Right Side Panel (Schema Editor) and Save the Created JSON in Backend
    const reflectJsonAndSaveHandler = useCallback(
        (e: { preventDefault: () => void; }, action: 'reflect' | 'save') => {
            handleReflectAndSave(e, reactFlowInstance, setFlowNodes, setErrorMapping, action, setIsModal, setShowSchema);
        },
        [reactFlowInstance]
    );
    const reflectJson = useCallback((e: { preventDefault: () => void; }) => reflectJsonAndSaveHandler(e, 'reflect'), [reflectJsonAndSaveHandler]);
    const saveHandler = useCallback((e: { preventDefault: () => void; }) => reflectJsonAndSaveHandler(e, 'save'), [reflectJsonAndSaveHandler]);

    // Handled Drag-in node from Left side panel to Dag Area
    const onDragOver = useCallback((event: { preventDefault: () => void; dataTransfer: { dropEffect: string; }; }) => {
        event.preventDefault();
        event.dataTransfer.dropEffect = 'move';
    }, []);
    // passing the updated Edges in the UI Dag
    const edgesWithUpdatedTypes = edges.map((edge: any) => {
        const sourceNode = nodes.find((node: { id: string; }) => node.id === edge.source);
        const targetNode = nodes.find((node: { id: string; }) => node.id === edge.target);
        // edge.id = `${edge.source} + ${edge.target}`;
        edge.id = `${edge.source} + ${edge.targetHandle} + ${(targetNode?.id)}`;
        return edge;
    });

    // remove duplicate edges
    const uniqueEdges = uniqBy(edgesWithUpdatedTypes, 'id');

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


    const toggleModal = (open = false, type = 'upload', data = {}) => {
        // setUploadOver(open);
        setIsModal({
            open,
            type,
            data,
        });
    };

    const onChange = (viewPosition: boolean | ((prevState: boolean) => boolean)) => {
        setOrientation(viewPosition);
    };

    const generateModalContent = () => {
        const commonProps = {
            onClose: () => toggleModal(false),
            type: isModal?.type,
            data: isModal?.data,
            onDataUploaded: handleUpload,
        };

        if (isModal?.type === 'upload') {
            return <Load {...commonProps} userData={LoadDagList} loadSavedDag={onloadSavedDag} />;
        } else {
            return <Save {...commonProps} onSave={onSave} />;
        }
    };

    const handleOpenModal = () => {
        setOpenModal(true);
    };

    const handleCloseModal = () => {
        setOpenModal(false);
    };


    useEffect(() => {
        if (reactFlowInstance && nodes.length) {
            reactFlowInstance.fitView();
        }
    }, [reactFlowInstance, nodes]);

    return (
        // Any error in API Component will not load show the actual error message
        isError ? (<Alert severity='error' className='errorMessage'>
            There is an Error getting DagFuncList data
        </Alert>) : (
            <div className={`dndflow ${isModal?.open && 'overlayEffect'}`}>
                {isLoading && <LoadingOverlay />}
                {/* Actual Dag Structure Everything starts here */}
                <SplitterLayout vertical={orientation} percentage={true} secondaryInitialSize={25} secondaryMinSize={20}>
                    <ReactFlowProvider>
                        {/* Side Bar which contains list of node to Drag  */}
                        <Sidebar />
                        <div className="reactflow-wrapper" ref={reactFlowWrapper}>
                            <ReactFlow
                                nodes={nodes}
                                // nodes={dataWithUpdates}
                                snapToGrid={true}
                                snapGrid={[25, 25]}
                                // edges={edges}
                                edges={uniqueEdges}
                                onNodesChange={onNodesChange}
                                onEdgesChange={onEdgesChange}
                                isValidConnection={isValidConnection}
                                onConnect={onConnect}
                                onInit={setReactFlowInstance}
                                onDrop={onDrop}
                                onDragOver={onDragOver}
                                fitView
                                fitViewOptions={{ maxZoom: 1 }}
                                nodeTypes={nodeTypes}
                                deleteKeyCode={['Backspace', 'Delete']}

                            >
                                <Controls>
                                    <ControlButton title="Delete All Nodes and Edges" onClick={handleOpenModal} >
                                        <DeleteIcon style={{ color: '#000' }} />
                                    </ControlButton>
                                    <ControlButton title="Convert to JSON" onClick={reflectJson} >
                                        <DataObjectIcon style={{ color: '#000' }} />
                                    </ControlButton>
                                </Controls>
                                <Background
                                    variant={BackgroundVariant.Lines}
                                    color="#2a2b2d"
                                    style={{ backgroundColor: "#1E1F22" }}
                                />


                                {/* disabled={(nodes.length === 0 || errorMapping.length > 0)} */}
                                <Panel position="top-right">
                                    <Button variant="contained" onClick={saveHandler} className='saveBtn panelBtn' startIcon={<UploadIcon />} >Save</Button>
                                    {/* <Button variant="contained" onClick={reflectJson} className='saveBtn panelBtn' startIcon={<DataObjectIcon />}>JSon</Button> */}
                                    <Button variant="contained" onClick={() => toggleModal(true)} className='saveBtn panelBtn' startIcon={<GetAppIcon />}>Load</Button>
                                </Panel>
                                <Panel position="top-left">
                                    <button onClick={() => onLayout('LR')}>HL</button>
                                </Panel>
                            </ReactFlow>
                        </div>
                        <Toast />
                    </ReactFlowProvider>
                    <JsonEditor layout={onChange} data={showSchema} onDataUploaded={handleUpload} />
                </SplitterLayout>
                <>
                    <Modal
                        open={isModal?.open}
                        onClose={(_event: React.MouseEvent<HTMLButtonElement>, reason: string) => {
                            toggleModal(false);
                        }}
                    >
                        <div className='overlayPosition'>{generateModalContent()}</div>

                    </Modal>
                </>
                <CustomModal
                    open={openModal}
                    handleClose={handleCloseModal}
                    title="Clear Dag"
                    content={<DeleteAll setNodes={setNodes} setEdges={setEdges} setShowSchema={setShowSchema} handleClose={handleCloseModal} />}
                />

            </div>
        )
    );


};

export default memo(Dagger);

function handleReflectAndSave(e: { preventDefault: () => void; }, reactFlowInstance: ReactFlowInstance | null, setFlowNodes: React.Dispatch<any>, setErrorMapping: React.Dispatch<React.SetStateAction<never[]>>, action: string, setIsModal: React.Dispatch<React.SetStateAction<{ open: boolean; type: string; data: {}; }>>, setShowSchema: React.Dispatch<any>) {
    e.preventDefault();
    if (reactFlowInstance) {
        const flow: any = reactFlowInstance.toObject();
        console.log('flow.nodes', flow.nodes);
        if (flow.nodes.length === 0) { // if Error is there show Toast Message
            return showToast('Error: The DAG is empty', 'error');
        } else {
            setFlowNodes(flow.nodes);
        }
        const hasValidNodes = flow.nodes.some((flowNode: { type: string; }) => {
            if (flowNode.type === 'custom') {
                const bind = get(flowNode, 'func_nodes.bind');
                if (bind === undefined || !isEmpty(bind)) {
                    return true;
                } else {
                    showToast('Error: The DAG is empty', 'error');
                    return false;
                }
            }
            return false;
        });

        // If any of the nodes bind is {} then show error and terminate the save modal logic / show JSON
        if (!hasValidNodes) {
            return;
        }

        // Handling Error if any of the nodes label are empty
        const getFuncNode = ValidationError(flow);
        let MappedJson = {
            func_nodes: convertJsonToFuncNodes(flow)
        };
        if (getFuncNode.length > 0) { // if Error is there show Toast Message
            setErrorMapping(getFuncNode); // Listed all the node which are having empty labels
            return showToast('Error: ' + 'There are Some Empty Nodes', 'error');
        } else {
            setErrorMapping([]);
        }

        if (action === 'save') {
            const flowKey = 'DAG-flow';
            setIsModal({
                open: getFuncNode.length === 0,
                type: 'download',
                data: MappedJson
            });

            localStorage.setItem(flowKey, JSON.stringify(flow)); // backup saving the Actual nodes in localStorage 
            localStorage.setItem('MappedJson', JSON.stringify(MappedJson)); // backup saving the converted for our JSON requirement nodes in localStorage
        } else if (action === 'reflect') {
            setShowSchema(MappedJson);
        }
    }
}

function generateInitialData(DagFuncList: any[] | (() => any[]) | (() => Promise<any[]>), setFuncList: React.Dispatch<any>, setIsError: React.Dispatch<React.SetStateAction<boolean>>, setIsLoading: React.Dispatch<React.SetStateAction<boolean>>) {
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
                if (dataArray.length > 0) {
                    const list = storeGrouping(dataArray);
                    setFuncList(list.funcs); // storing FuncList
                } else {
                    setIsError(true);
                }
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
}