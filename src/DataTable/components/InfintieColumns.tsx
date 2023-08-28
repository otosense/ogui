import React, { filter, isArray, isObject } from "lodash";
import TreeViewer from "../../TreeViewer/TreeViewer";

interface IColumn {
    header: string;
    accessorKey: string;
    enableSorting?: boolean;
    className?: string;
    filterFn?: any;
    Cell?: ({ cell }: any) => JSX.Element;
    enableColumnFilter?: any;
}

interface ColumnType {
    header: string;
    accessorKey: string;
    enableSorting?: boolean;
    Cell?: any;
    className?: string;
};

export function InfintieColumns(data: any[] = [], columnConfigurations: any = [], defaultColumnFilter: string, hideColumnsDefault: string[] = []): ColumnType[] {
    const columnKeys = Object.keys(data).filter(
        (key: string) => !hideColumnsDefault.includes(key)
    );
    return columnKeys.map((columnName) => {
        let column: IColumn = {
            header: columnName,
            accessorKey: columnName,
            filterFn: defaultColumnFilter,
            Cell: ({ cell }: { cell: any; }) => {
                if (isObject(cell.getValue()[0]) || isArray(cell.getValue()[0])) {
                    console.log('cell.getValue()', cell.getValue(), typeof cell.getValue()[0]);
                    // return <pre title={JSON.stringify(cell.getValue())}>{JSON.stringify(cell.getValue())}</pre>;
                    // return <pre title={JSON.stringify(cell.getValue())}>{JSON.stringify(cell.getValue())}</pre>;
                    // async function fetchData(passer: { from_: number; to_: number }): Promise<any> {
                    //     return { status: "success", data: cell.getValue() };


                    let d = {
                        [columnName]: [
                            ...cell.getValue(), { id: [columnName] }
                        ]
                    };
                    console.log('dddddddddddddddddddd', d);
                    let storeViewProps = {
                        getRootNodeData: { status: "success", data: d },
                    };

                    return <TreeViewer {...storeViewProps} />;
                } else {
                    return <span title={cell.getValue()}>{cell.getValue()}</span>;
                    return <span title={cell.getValue()}>{cell.getValue()}</span>;
                }
                console.log('cell.getValue()', cell.getValue(), typeof cell.getValue());
            }
        };
        const matchingHeaderProps = filter(columnConfigurations, { header: columnName })[0];
        if (matchingHeaderProps) {
            column = { ...column, ...matchingHeaderProps };
        }

        return column;
    });
}
