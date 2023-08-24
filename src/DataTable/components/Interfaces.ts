
interface IColumnConfigProps {
    header: string,
    enableColumnFilter?: boolean,
    enableSorting?: boolean,
    filterFn?: string,
    Cell: ({ cell }: any) => JSX.Element,
}

interface IDataTableProps {
    data: any[] | (() => any[]) | (() => Promise<any[]>),
    dataKey: string,
    columnConfig?: IColumnConfigProps[],
    rowExpandedDetails?: ({ row }: any) => JSX.Element | any,
    enablePinning?: boolean, // allow pinning the columns to left
    enableRowSelection?: boolean, // enable Row Single Selection
    enableMultiRowSelection?: boolean, // enable Row Multi Selection
    enableRowOrdering?: boolean, // enable Drag and Drop of Rows
    enableColumnOrdering?: boolean, // enable Drag and Drop of column
    enableRowNumbers?: boolean, // turn on row numbers # of rows
    enableHiding?: boolean, // Hiding Columns Property
    enableStickyHeader?: boolean, // Sticky Header Property
    enableExpandAll?: boolean, // Expand All Property
    enableColumnResizing?: boolean, // Column Resizing Property
    enableFilterMatchHighlighting?: boolean,
    enablePagination?: boolean, // Pagination Property,
    enableColumnFilters?: boolean, // Column Filters Property
    enableSorting?: boolean, // Sorting Property
    enableGlobalFilter?: boolean, // Global Filter Property,
    enableGlobalFilterModes?: boolean, // Global Filter Mode Property
    globalFilterFn?: string, // Global Filter
    filterFn?: string, // Individual Column Filter
    enableDensityToggle?: boolean, // Enable density toggle padding property
    enableFullScreenToggle?: boolean, // Enable full screen toggle property
    enableRowVirtualization?: boolean, // Enable row virtualization,
    hideColumnsDefault?: string[]; // Hide columns default
}

export type {
    IDataTableProps
};


