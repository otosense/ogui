import React, { useCallback, memo, useState, useEffect } from 'react';
import { Handle, useReactFlow, Position, useStoreApi } from 'reactflow';
import { onNameHandlers, pythonIdentifierPattern } from '../../Utilities/globalFunction';

function TextEditorNode(props: any) {
    const { id, isConnectable, type, sourcePosition, data, errorMapping } = props;
    const [valueText, setValueText] = useState(props.data.label);
    const [nodeType, setNodeType] = useState({ title: 'func_node', label: 'func_label', placeHolder: 'function name' });
    const [validationMsg, setValidationMsg] = useState(false);
    const { setNodes } = useReactFlow();
    const store: any = useStoreApi();

    const labelNameChange = useCallback((evt: { target: { value: any; }; }) => {
        const { nodeInternals } = store.getState();
        const inputValue = evt.target.value;
        const nameValidator = onNameHandlers(inputValue); // onNameHandlers for variable names validation
        // if (pythonIdentifierPattern.test(inputValue)) {
        if (nameValidator) {
            setValidationMsg(false);
            setValueText(inputValue);
            setNodes(
                Array.from(nodeInternals.values()).map((node: any) => {
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
        if (type !== 'funcNode') {
            setNodeType({ title: 'var_node', label: 'var_label', placeHolder: 'variable name' });
        }
    }, [props.type]);

    function errorMapper(errorMapping: any, id: string) {
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
            <Handle type="source" position={data?.initialEdge === 'right' || sourcePosition === "right" ? Position.Bottom : Position.Right} isConnectable={isConnectable} className='connector' />
        </div>
    );
}

export default memo(TextEditorNode);



// sourcePosition = right => vertical
// sourcePosition = bottom => horizontal 