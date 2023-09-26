import React, { memo, useCallback, useEffect, useState } from 'react';
import { Handle, useReactFlow, useStoreApi, Position } from 'reactflow';
import { customRemoveText, pythonIdentifierPattern } from '../../../utilities/globalFunction';
import { forEach, groupBy, isEmpty, isFunction, isObject, map, range, zipObject } from 'lodash';
import { IParamsDropDown } from '../../Interfaces';
import { onNameHandlers } from '../../../utilities/Validations/TextValidation';
import { convertFuncNodeToJsonNode, convertFuncNodeToJsonEdge } from '../../../utilities/Mapping/convertFuncNodeToJson';
const SelectConfigure = (props: IParamsDropDown) => {
    const { value, handleId, nodeId, sourcePosition, data, isConnectable, labels, selectedValue, loadParamsList } = props;
    // console.log({ value, handleId, nodeId, sourcePosition, data,  isConnectable, labels, selectedValue });
    const { setNodes, setEdges } = useReactFlow();
    const store = useStoreApi();
    const [customValue, setCustomValue] = useState(value);
    const [valueText, setValueText] = useState(labels);
    const [validationMsg, setValidationMsg] = useState(false);
    const [paramsLists, setParamsLists] = useState<string[]>([]);

    const [valueHolder, setValueHolder] = useState<any>({});


    const [response, setResponse] = useState<any>({ signature: { parameters: [] } });;
    const [errorMessage, setErrorMessage] = useState<string>('');

    useEffect(() => {
        // making API call once the value is set
        if (!isEmpty(value)) {
            // mutation.mutate(value);
            const output = loadParamsList(value);
            if (isObject(output)) {
                const result: any = output;
                if (isFunction(result?.then)) {
                    // Check if the result of the function is a promise
                    result.then((dataArray: any) => {
                        // console.log('dataArray', dataArray);
                        setResponse(dataArray);
                    });
                } else {
                    setResponse(output);
                }
            }
        }

    }, [value]);

    useEffect(() => {
        // calling parameters list for selected functionNode 
        const inputs = response?.signature?.parameters.map((parameter: { name: string; }) => parameter.name);
        setParamsLists(inputs);
    }, [response]);

    useEffect(() => {
        const { nodeInternals } = store.getState();
        // Use lodash to group the array by 'data.label'
        const grouped = groupBy(Array.from(nodeInternals.values()), 'data.label');

        // Iterate over the grouped data and count occurrences
        forEach(grouped, (group, label) => {
            if (group[0].type === 'custom') {
                group.forEach((item: any, index: number) => {
                    // item.output = index === 0 ? label : `${label}_${index}`;
                    const formattedIndex = index < 9 ? `0${index}` : index;
                    item.output = index === 0 ? label : `${label}_${formattedIndex}`;
                });
            }
        });

        // console.log('inetrval', Array.from(nodeInternals.values()));
        setCustomValue(selectedValue);
        setNodes(
            Array.from(nodeInternals.values()).map((node: any, index) => {
                if (node.id === nodeId) { // updating the each node based on user Selects
                    node.data = {
                        ...node.data,
                        label: selectedValue,
                        ddType: selectedValue,
                        selects: {
                            // ...node.data.selects,
                            hasValue: paramsLists?.length,
                            [selectedValue]: selectedValue,
                        }
                    };
                    node.func_nodes = {
                        name: node.id,
                        func_label: selectedValue,
                        func: selectedValue,
                        out: node.output,
                        // bind: zipObject(paramsLists, map(paramsLists, (param, index) => `${node.id + param + customRemoveText}`))
                        bind: zipObject(paramsLists, map(paramsLists, (param) => `${param}`))
                    };
                }
                setValueHolder(node);
                return node;
            })
        );
    }, [selectedValue, paramsLists]);

    useEffect(() => {
        if (valueHolder?.func_nodes) {
            const { name, func_label, func, out, bind } = valueHolder?.func_nodes;
            const conversionData = {
                // id: valueHolder?.data?.func_nodes?.[0]?.id,
                func_nodes: [{
                    name,
                    func_label,
                    func,
                    out,
                    bind
                }]
            };

            // console.log('conversionData', conversionData);
            const funcToJsonNode: any = convertFuncNodeToJsonNode(conversionData);
            const funcToJsonEdge: any = convertFuncNodeToJsonEdge(conversionData);
            // console.log('funcToJsonEdge', funcToJsonEdge);
            // console.log('funcToJsonNode', funcToJsonNode);
            setNodes((nds) => nds.concat(funcToJsonNode));
            setEdges((nds) => nds.concat(funcToJsonEdge));

        }
    }, [valueHolder]);


    // labelNameChange this function is to handle Custom function right now its not in working
    const labelNameChange = useCallback((evt: { target: { value: string; }; }) => {
        const { nodeInternals } = store.getState();
        const inputValue = evt.target.value;
        const nameValidator = onNameHandlers(inputValue); // onNameHandlers for function names validation
        // if (pythonIdentifierPattern.test(inputValue)) {
        if (nameValidator) {
            setValueText(inputValue);
            setValidationMsg(false);
            setNodes(
                Array.from(nodeInternals.values()).map((node) => {
                    if (node.id === nodeId) {
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
    }, []);
    return (
        <div className="custom-node__select">
            <h3 className='selectedFuncNode'>{selectedValue?.split('.').pop() || ''}</h3>
            <hr className='bottomLine' />
            {(customValue === 'new') && // Handling custom function but not in use right now
                <>
                    <input id="text" name="text"
                        onChange={labelNameChange}
                        className="titleBox"
                        value={valueText}
                        placeholder='function Name'
                        pattern={pythonIdentifierPattern.toString()}
                    />
                    {validationMsg && <span className='invalidMsg'>Invalid Entry</span>}
                </>
            }
            {/* <Handle type="target" position={data?.initialEdge === 'right' || sourcePosition === "right" ? Position.Top : Position.Left} id={handleId} className='connector' isConnectable={isConnectable} />
        <Handle type="source" position={data?.initialEdge === 'right' || sourcePosition === "right" ? Position.Bottom : Position.Right} id={handleId} className='connector' isConnectable={isConnectable} /> */}
            {/* {mutation.isLoading && <div className='Spinner'><Spinner /></div>} */}
            {/* Preparation of Handle to connect */}
            {!isEmpty(errorMessage) ? <p>{errorMessage}</p> :
                (
                    paramsLists?.length > 0 &&
                    <section className='handlers'>
                        <div className='multiInput'>
                            {paramsLists?.map((paramsList: string, i: number) => {
                                return (<div className='resultEdger' key={i}>
                                    <Handle type="target" position={data?.initialEdge === 'right' || sourcePosition === "right" ? Position.Top : Position.Left} id={paramsList} className='connector' isConnectable={isConnectable} />
                                    <span className='handlerText'>{paramsList}</span>
                                </div>);
                            })}
                        </div>
                        <div className='resultEdger'>
                            <Handle type="source" position={data?.initialEdge === 'right' || sourcePosition === "right" ? Position.Bottom : Position.Right} id={handleId} className='connector' isConnectable={isConnectable} />
                            {/* <span className='handlerText'>{valueHolder?.func_nodes?.out}</span> */}
                            <span className='handlerText'>Output</span>

                        </div>
                    </section>
                )
            }
        </div>
    );
};
export default memo(SelectConfigure);