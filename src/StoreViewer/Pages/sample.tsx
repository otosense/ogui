import React, { forwardRef, useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { FixedSizeList as List } from "react-window";
import { apiMethod } from "../API/ApiCalls";
import { fetchingSessionID } from "../Utilities/Mapping/fetchingSessionID";

// import "./styles.css";

const PADDING_SIZE = 10;
const ITEM_SIZE = 35;





const Example = () => {
    const fetchSize = 100;
    const [passer, setPasser] = useState({ from_: 0, to_: fetchSize });
    const [sessionIDList, setSessionIDList] = useState<string[]>([]);
    const [totalSessionDetails, setTotalSessionDetails] = useState<number>(0);

    const { data, status, error, isLoading, isFetching } = apiMethod(passer);

    useEffect(() => {
        if (data) {
            const { item, total } = fetchingSessionID(data);
            setTotalSessionDetails(total);
            console.log('sessionLists', item);
            setSessionIDList(item);
        }
    }, [data]);


    const loadMore = () => {
        setPasser((prevPasser) => ({
            from_: prevPasser.to_,
            to_: prevPasser.to_ + fetchSize,
        }));
    };


    const Row = ({ index, style }) => (
        <div
            className={index % 2 === 0 ? "RowEven" : "RowOdd"}
            style={{
                ...style,
                top: `${parseFloat(style.top) + PADDING_SIZE}px`
            }}
        >
            item {index} {sessionIDList[index]}
        </div>
    );

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (<List
        className="List"
        height={500}
        // innerElementType={innerElementType}
        itemCount={sessionIDList?.length}
        itemSize={1000}
        width={300}
    >
        {Row}
    </List>);
};

const innerElementType = forwardRef(({ style, ...rest }, ref) => {
    { console.log('style', style); }
    return <div
        ref={ref}
        style={{
            ...style,
            height: `${parseFloat(style.height) + PADDING_SIZE}px`
            // height: `${parseFloat(style.height) + PADDING_SIZE * 2}px`
        }}
        {...rest}

    />;
});

export default Example;