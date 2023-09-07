import React, { Component } from 'react';
import { map, startsWith } from "lodash";
import ReactFilterBox, { SimpleResultProcessing, Expression } from "react-filter-box";

interface GlobalFiltersProps {
    tableData: any;
    flatRowData: any;
    onNewData: (newData: any) => void;
}

interface GlobalFiltersState {
    data: any;
    query: string;
    isOk: boolean;
}

class CustomResultProcessing extends SimpleResultProcessing {

    // override this method to add your handler for startsWith operator
    filter(row: { [x: string]: string; }, fieldOrLabel: string, operator: any, value: string) {
        var field = this.tryToGetFieldCategory(fieldOrLabel);
        switch (operator) {
            case "==": return row[field] == value;
            case "!=": return row[field] != value;
            case "contains": return row[field].toLowerCase().indexOf(value.toLowerCase()) >= 0;
            case "!contains": return row[field].toLowerCase().indexOf(value.toLowerCase()) < 0;
            case "startsWith": return startsWith(row[field].toLowerCase(), value.toLowerCase());
        }

        return false;
    }
}

class GlobalFilters extends Component<GlobalFiltersProps, GlobalFiltersState> {
    options: any;

    constructor(props: GlobalFiltersProps) {
        super(props);
        let { tableData, flatRowData, onNewData } = props;
        const columnList = tableData;
        this.options = columnList
            .filter((item: { id: string; }) => item.id !== 'mrt-row-drag' && item.id !== 'mrt-row-expand' && item.id !== 'mrt-row-select' && item.id !== 'mrt-row-numbers')
            .map((item: { id: any; }) => ({
                columnField: String(item.id).toString(),
                type: 'selection',
            }));
        this.state = {
            data: flatRowData,
            query: "",
            isOk: false
        };

    }


    //customer your rendering item in auto complete
    customRenderCompletionItem(self: any, data: { value: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined; type: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined; }, registerAndGetPickFunc: () => any) {
        // if(!_.isString(data.value)){
        //     var pick = registerAndGetPickFunc();
        //     return  <div className="day-picker-selection"  >
        //         <DayPicker onDayClick={ (day: { toLocaleDateString: () => any; }) => pick(day.toLocaleDateString())  }/> </div>
        // }

        var className = ` hint-value cm-${data.type}`;

        return <div className={className}  >
            <span style={{ fontWeight: "bold" }}>{data.value}</span>
            {/* <span style={{ color: "gray", fontSize: 10 }}> [{data.type}] </span> */}
        </div>;
    }

    onParseOk(expressions: Expression[]) {

        let { flatRowData, onNewData } = this.props;
        console.log('expressions', expressions);
        // const newData = new SimpleResultProcessing(this.options).process(flatRowData, expressions);
        var newData = new CustomResultProcessing(this.options).process(flatRowData, expressions);
        console.log('newData', newData);
        this.setState({ data: newData });
        onNewData(newData);
    }

    render() {
        return (
            <>
                <div className="main-container">
                    <ReactFilterBox
                        query={this.state.query}
                        data={this.props.flatRowData}
                        options={this.options}
                        onParseOk={this.onParseOk.bind(this)}
                        customRenderCompletionItem={this.customRenderCompletionItem.bind(this)}
                    />
                </div>
            </>
        );
    }
}

export default GlobalFilters;
