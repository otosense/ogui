import React from 'react';
import { type Theme } from '@mui/material';
import { type FilterOption } from './SearchFilterSideMenu';
export interface Column {
    key: (string | ((data: any) => any));
    label: string;
    sx: any;
    orderBy?: string;
}
interface TableProps {
    theme?: Theme;
    data: any[];
    columns: Column[];
    clearFilters: VoidFunction;
    submitFilters: VoidFunction;
    filterOptions: FilterOption[];
    rowsPerPage: number;
    onRowsPerPageChange: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    page: number;
    onPageChange: (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => void;
    orderBy: string;
    order: 'asc' | 'desc';
    onOrderChange: (orderBy: string) => void;
    renderExpandedData: (data: any) => JSX.Element;
    isMultiSelect?: boolean;
    onSelectItems: (items: any[]) => void;
    totalCount?: number;
}
export declare const DataTable: (props: TableProps) => JSX.Element;
export {};
