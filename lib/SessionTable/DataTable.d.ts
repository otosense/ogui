import React from 'react';
import { type Theme } from '@mui/material';
import { type FilterOption } from './SearchFilterSideMenu';
import { type CompareFunction, type SortField } from './types';
export interface Column {
    key: (string | ((data: any) => any));
    label: string;
    sx: any;
    orderBy?: SortField | CompareFunction;
}
interface TableProps {
    style?: Record<string, string>;
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
    orderBy: SortField | CompareFunction;
    order: 'asc' | 'desc';
    onOrderChange: (orderBy: SortField | CompareFunction) => void;
    renderExpandedData: (data: any) => JSX.Element;
    isMultiSelect?: boolean;
    onSelectItems: (items: any[]) => void;
    totalCount?: number;
    isDarkMode?: boolean;
}
export declare const DataTable: (props: TableProps) => JSX.Element;
export {};
