import { JSXElementConstructor, ReactElement, ReactFragment, ReactPortal } from 'react';
import { CheckboxProps } from '@mui/material';

interface IData {
    email: string;
    id: number;
    name: string;
    phone: string;
    username: string;
    website: string;
};

interface IColumn {
    Header: string;
    accessor: any;
}

interface IUser {
    email: string;
    id: number;
    name: string;
    phone: string;
    username: string;
    website: string;
}


interface IQueryResponse {
    isLoading: boolean;
    error?: { message: string; };
    data: IUser[];
}


interface Cell {
    value: string;
}

interface SelectedColumn {
    [key: string]: boolean;
}

interface ICheckboxProps {
    getToggleHideAllColumnsProps: () => CheckboxProps;
    allColumns: any[];
}

type SortingDisableType = string[];

interface RowProps {
    additionalInfo: any; original: { additionalInfo: { [key: string]: string; }[]; };
}

interface Info {
    [key: string]: string | number;
}

type ColumnType = {
    header: string;
    accessorKey: string;
    enableSorting?: boolean;
    Cell?: any;
    className?: string;
};

interface UserApiResponse {
    total: number;
    users?: any[];
    limit: number;
    products?: any[];
}


interface IColumnConfigProps {
    header: string,
    enableColumnFilter?: boolean,
    enableSorting?: boolean,
    filterFn?: string,
    Cell: ({ cell }: any) => JSX.Element,
}

interface IDataTableProps {
    data: () => any,
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
    IData,
    IColumn,
    IUser,
    IQueryResponse,
    Cell,
    SelectedColumn,
    ICheckboxProps,
    SortingDisableType,
    ColumnType,
    RowProps,
    Info,
    UserApiResponse,
    IDataTableProps
};


// Define the type of the columns
// type Column = {
//     Header: string;
//     accessor: string;
//     // Add more properties as needed
// };

// Create a generic table props type to allow for any columns
// type TableProps<T extends object> = {
//     columns: ColumnInstance<T>[];
//     data: T[];
// };