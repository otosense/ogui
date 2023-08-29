import React, { filter, forEach, isArray, isObject } from "lodash";
import TreeViewer from "../../TreeViewer/TreeViewer";

interface IColumn {
    header: string;
    accessorKey: string;
    enableSorting?: boolean;
    className?: string;
    filterFn?: any;
    Cell?: ({ cell }: any) => JSX.Element;
    enableColumnFilter?: any;
    size?: number;
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
            size: 300,
            filterFn: defaultColumnFilter,
            Cell: ({ cell }: { cell: any; }) => {
                if (isObject(cell.getValue()?.[0]) || isArray(cell.getValue()?.[0])) {
                    // return <pre title={JSON.stringify(cell.getValue())}>{JSON.stringify(cell.getValue())}</pre>;
                    if (isArray(cell.getValue())) {
                        forEach(cell.getValue(), (x, i) => {
                            x.id = x.name;
                            // Or if you want to access the same array using cell.getValue()
                            cell.getValue()[i].id = x.name;
                        });
                    }
                    let storeViewProps = {
                        getRootNodeData: { status: "success", data: cell.getValue() },
                    };

                    return <TreeViewer {...storeViewProps} />;
                } else {
                    return <span title={cell.getValue()}>{cell.getValue()}</span>;
                }
            }
        };
        const matchingHeaderProps = filter(columnConfigurations, { header: columnName })[0];
        if (matchingHeaderProps) {
            column = { ...column, ...matchingHeaderProps };
        }
        return column;
    });
}
