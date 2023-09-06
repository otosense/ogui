import React, { Component } from 'react';
import { map } from "lodash";
import ReactFilterBox, { SimpleResultProcessing, Expression } from "react-filter-box";

interface GlobalFiltersProps {
    tableData: any;
    flatRowData: any;
    onNewData: (newData: any) => void;
}

interface GlobalFiltersState {
    data: any;
    query: string;
}

class GlobalFilters extends Component<GlobalFiltersProps, GlobalFiltersState> {
    options: any;

    constructor(props: GlobalFiltersProps) {
        super(props);

        const columnList = props.tableData;
        this.options = map(columnList, (item) => ({
            columnField: String(item.id).toString(), // Convert id to a string if needed
            type: 'selection'
        }));
        this.state = {
            data: props.flatRowData,
            query: " "
        };
    }

    onParseOk(expressions: Expression[]) {
        const newData = new SimpleResultProcessing(this.options).process(this.props.flatRowData, expressions);
        this.setState({ data: newData });
        this.props.onNewData(newData);
    }

    render() {
        return (
            <div className="main-container">
                <ReactFilterBox
                    query={this.state.query}
                    data={this.props.flatRowData}
                    options={this.options}
                    onParseOk={this.onParseOk.bind(this)}
                />
            </div>
        );
    }
}

export default GlobalFilters;
