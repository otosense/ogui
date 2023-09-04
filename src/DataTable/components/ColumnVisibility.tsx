import React, { useEffect } from 'react';

type Column = {
    id: string;
    getIsVisible: () => boolean;
};

type IVisibleColumns = {
    [key: string]: boolean;
};

function ColumnVisibility(table: any, dataKey: string = '') {
    useEffect(() => {
        let fl = table.getAllFlatColumns();
        const newIsVisibleColumns = getHiddenColumn(fl);
        localStorage.setItem(`${dataKey} hiddenColumn`, JSON.stringify(newIsVisibleColumns));
    }, [table]);

    function getHiddenColumn(columns: Column[]): IVisibleColumns {
        const columnKeys: IVisibleColumns = {};
        columns.forEach((column) => {
            const isVisible = column.getIsVisible();
            columnKeys[column.id] = isVisible;
        });
        return columnKeys;
    }
}

export default ColumnVisibility;
