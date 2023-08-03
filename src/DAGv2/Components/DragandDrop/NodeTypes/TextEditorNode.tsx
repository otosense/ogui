import React, { useCallback, memo, useState, useEffect } from 'react';
import { Handle, useReactFlow, Position, useStoreApi } from 'reactflow';
import { ITextEditorNode } from '../../Utilities/Interfaces';
import { onNameHandlers } from '../../Utilities/Validations/TextValidation';

// varNode component 
function TextEditorNode(props: ITextEditorNode) {
    const { id, isConnectable, type, sourcePosition, data, errorMapping } = props;
    // console.log({ id, isConnectable, type, sourcePosition, data, errorMapping });
    const [valueText, setValueText] = useState(props.data.label); // while loading already saved dag data it will set the varNode name
    const [nodeType, setNodeType] = useState({ title: 'func_node', label: 'func_label', placeHolder: 'function name' }); // Basic varNode structure
    const [validationMsg, setValidationMsg] = useState(false); // Python Identifier validation
    const { setNodes } = useReactFlow(); // in-build function to update nodes
    const store = useStoreApi(); // in-build function for nodes which will be stored in store api

    // When user enter the varNode label which is handled here
    const labelNameChange = useCallback((evt: { target: { value: string; }; }) => {
        const { nodeInternals } = store.getState();
        const inputValue = evt.target.value;
        const nameValidator = onNameHandlers(inputValue); // onNameHandlers for variable names validation
        // if (pythonIdentifierPattern.test(inputValue)) {
        if (nameValidator) {
            setValidationMsg(false);
            setValueText(inputValue);
            setNodes( // updating the each node based on user enters inputs
                Array.from(nodeInternals.values()).map((node) => {
                    if (node.id === id) {
                        node.data = {
                            ...node.data,
                            label: inputValue
                        };
                    }
                    return node;
                })
            );
        } else {
            console.log("Invalid identifier");
            setValidationMsg(true);
        }

    }, [props]);

    useEffect(() => {
        // Creating an Empty Node
        if (type !== 'funcNode') {
            setNodeType({ title: 'varNode', label: 'var_label', placeHolder: 'variable name' });
        }
    }, [props.type]);

    // errorMapper => help us to find the empty nodes
    function errorMapper(errorMapping: any[], id: string) {
        const errorNode = errorMapping.find((x: { id: string; }) => x.id === id);
        return errorNode ? 'bugNode' : '';
    }

    return (
        <div className={`text-updater-node ${type} ${errorMapper(errorMapping, id)}`}>
            {/* <h4 className={`nodeTitle ${type}`} title={valueText}>{valueText.length === 0 ? 'Node Title' : valueText}</h4> */}
            {/* <h4 className={`nodeTitle ${type}`}>{nodeType.title}</h4> */}
            <Handle type="target" position={data?.initialEdge === 'right' || sourcePosition === "right" ? Position.Top : Position.Left} isConnectable={isConnectable} className='connector' />
            <div className={`flexProps ${type}`}>
                <div className="inputStyler">
                    {/* <label htmlFor="text">{nodeType.label}:</label> */}
                    <input id="text" name="text" onChange={labelNameChange} className="titleBox" placeholder={nodeType.placeHolder} value={valueText} />
                </div>
                {validationMsg && <span className='invalidMsg'>Invalid Entry</span>}
            </div>
            <Handle type="source" position={data?.initialEdge === 'right' || sourcePosition === "right" ? Position.Bottom : Position.Right} id={id} isConnectable={isConnectable} className='connector' />

        </div>
    );
}

export default memo(TextEditorNode);



// sourcePosition = right => vertical
// sourcePosition = bottom => horizontal 