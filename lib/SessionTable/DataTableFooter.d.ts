import * as React from 'react';
interface DataTableFooterProps {
    rowsPerPage: number;
    onRowsPerPageChange: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    page: number;
    onPageChange: (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => void;
    count?: number;
    selectedItemsCount: number;
}
export declare const DataTableFooter: (props: DataTableFooterProps) => JSX.Element;
export {};
