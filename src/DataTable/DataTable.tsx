import React, {
    useEffect,
    useMemo,
    useRef,
    useState,
    memo
} from 'react';
import MaterialReactTable, {
    MRT_RowSelectionState,
    type MRT_ColumnDef,
    type MRT_ColumnFiltersState,
    type MRT_SortingState,
    type MRT_Virtualizer,
    MRT_Row,

} from 'material-react-table';
import { Alert, Box, IconButton, Tooltip, Typography, Zoom } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';

import { InfintieColumns } from './components/InfintieColumns';
import ColumnStore from './components/ColumnStore';
import { IDataTableProps } from './components/Interfaces';
import { isEmpty } from 'lodash';
import './css/DataTable.css';

function DataTable(props: IDataTableProps) {

    const [columnFilters, setColumnFilters] = useState<MRT_ColumnFiltersState>([]);
    const [globalFilter, setGlobalFilter] = useState<string>();
    const [sorting, setSorting] = useState<MRT_SortingState>([]);
    const [flatRowData, setFlatRowData] = useState<any>([]);
    const [columns, setColumns] = useState<MRT_ColumnDef<any>[]>([]);
    //optionally, you can manage the row selection state yourself
    const [rowSelection, setRowSelection] = useState<MRT_RowSelectionState>({});
    const [isError, setIsError] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string>();

    const tableContainerRef = useRef<HTMLDivElement>(null); //we can get access to the underlying TableContainer element and react to its scroll events

    const rowVirtualizerInstanceRef = useRef<MRT_Virtualizer<HTMLDivElement, HTMLTableRowElement>>(null); //we can get access to the underlying Virtualizer instance and call its scrollToIndex method

    const columnConfigurations = props.columnConfig;
    const data = props.data;
    const dataKey = props.dataKey;

    const {
        enablePinning,
        enableRowSelection,
        enableMultiRowSelection,
        enableRowOrdering,
        enableColumnOrdering,
        enableRowNumbers,
        enableHiding,
        enableStickyHeader,
        enableExpandAll,
        enableColumnResizing,
        enableGlobalFilterModes,
        enableFilterMatchHighlighting,
        enablePagination,
        enableColumnFilters,
        enableSorting,
        enableGlobalFilter,
        enableDensityToggle,
        enableFullScreenToggle,
        enableRowVirtualization,
        globalFilterFn,
        filterFn,
        hideColumnsDefault
    }: any = props;


    // Preparing Table Data
    useMemo(() => {
        if ((!(data))) {
            setIsError(true);
            setErrorMessage('data is not provided');
            return []; // Return an empty array if data is not provided
        }

        if (typeof data === 'function') {
            // Check if data is a function
            const result: any = data();
            if (typeof result.then === 'function') {
                // Check if the result of the function is a promise
                return result.then((dataArray: any) => {
                    setFlatRowData(dataArray);
                    return dataArray;
                });
            } else {
                const dataArray = result as any[]; // Assuming the result is an array
                setFlatRowData(dataArray);
                return dataArray; // Return the result of the function
            }
        } else if (Array.isArray(data)) {
            // Check if data is an array
            setFlatRowData(data);
            return data; // Return the provided array
        } else {
            setIsError(true);
            setErrorMessage('unknown data type found,');
            return []; // Return an empty array for unknown data types
        }
    }, [data]);




    // Column headers creation
    useMemo(() => {
        const firstRow = flatRowData?.[0];
        const generatedColumns = InfintieColumns(firstRow, columnConfigurations, filterFn, hideColumnsDefault);
        setColumns(generatedColumns);
    }, [data, flatRowData]);


    const totalDBRowCount = flatRowData?.length;
    const totalFetched = flatRowData.length;

    //scroll to top of table when sorting or filters change
    useEffect(() => {
        //scroll to the top of the table when the sorting changes
        try {
            // rowVirtualizerInstanceRef.current?.scrollToIndex?.(0);
            tableContainerRef.current?.scrollTo(0, 0);
        } catch (error) {
            console.error(error);
        }
    }, [sorting, columnFilters, globalFilter]);

    return (
        isError ? (<Alert severity='error' className='errorMessage'>
            {errorMessage}
        </Alert>) :
            (<>
                <section> {(!isEmpty(columns)) &&
                    <MaterialReactTable
                        columns={columns} // Columns For Table 
                        data={flatRowData} // Data For Table 
                        enablePagination={enablePagination} // turn off pagination
                        enableRowNumbers={enableRowNumbers} // turn on row numbers # of rows
                        enableHiding={enableHiding} // Hiding Columns Property

                        enableRowOrdering={enableRowOrdering} // Drag and drop Property for rows
                        enableColumnOrdering={enableColumnOrdering} // Drag and drop Property for columns
                        enableStickyHeader={enableStickyHeader} // Set the sticky header property

                        enableExpandAll={enableExpandAll} //Row Expand All Property
                        renderDetailPanel={props.rowExpandedDetails} //Row Expand Component
                        // renderDetailPanel={({ row }) => (<InfiniteRowExpand row={row} />)} //Row Expand Component

                        muiTableBodyProps={({ table }): any => {
                            ColumnStore(table, dataKey);
                        }}
                        enableSorting={enableSorting}

                        enableColumnResizing={enableColumnResizing} // Column Resizing Property
                        enableGlobalFilter={enableGlobalFilter}
                        enableColumnFilters={enableColumnFilters}
                        enableGlobalFilterModes={enableGlobalFilterModes} // Global Filter Mode Property like Fuzzy Filter etc. 
                        globalFilterFn={globalFilterFn}
                        enableFilterMatchHighlighting={enableFilterMatchHighlighting} // Filter Match Highlighting Property
                        enableColumnFilterModes // Column Filter Mode Property
                        muiTableHeadCellFilterTextFieldProps={{ //Column Box Style 
                            sx: { m: '0.5rem 0', width: '100%' },
                            variant: 'outlined',
                        }}

                        enableRowSelection={enableRowSelection} // Enable row selection property
                        enableMultiRowSelection={enableMultiRowSelection}  // Enable Multi row selection property

                        enablePinning={enablePinning} // Enable Column Pinning property

                        enableDensityToggle={enableDensityToggle} //enable density toggle Property
                        enableFullScreenToggle={enableFullScreenToggle} //enable full screen toggle Property

                        muiTableContainerProps={{
                            ref: tableContainerRef, //get access to the table container element
                            sx: { maxHeight: '450px' }, //give the table a max height
                        }}

                        onColumnFiltersChange={setColumnFilters}
                        onGlobalFilterChange={setGlobalFilter}
                        onSortingChange={setSorting}

                        renderBottomToolbarCustomActions={() => ( // Rows fetched from the server along with total number of Rows in the table
                            <Typography>
                                Fetched {totalFetched} of {totalDBRowCount} total rows.
                            </Typography>
                        )}

                        onRowSelectionChange={setRowSelection} //connect internal row selection state to your own


                        muiTableBodyRowProps={({ row }) => ({ // Row Selection Properties on click of Row
                            // onClick: row.getToggleSelectedHandler(), // Select row if anywhere in the row is clicked
                            sx: { cursor: 'pointer' },
                        })}

                        renderTopToolbarCustomActions={() => (CustomInfoButton())} // Add custom Info button 

                        state={{ // State of the table
                            columnFilters,
                            globalFilter,
                            sorting,
                            density: 'compact',
                            rowSelection
                        }}

                        muiTableBodyRowDragHandleProps={({ table }) => ({ // Row drag handler
                            onDragEnd: () => {
                                const { draggingRow, hoveredRow } = table.getState();
                                if (hoveredRow && draggingRow && flatRowData) {
                                    flatRowData?.splice(
                                        (hoveredRow as MRT_Row).index,
                                        0,
                                        flatRowData?.splice(draggingRow.index, 1)[0],
                                    );
                                    // setData([...data]);
                                    // flatRowData = [...flatRowData];
                                    setFlatRowData([...flatRowData]);
                                }
                            },
                        })}

                        initialState={{ // initial state or DefaultState when initially Loading the Table
                            columnVisibility: JSON.parse(localStorage.getItem(`${dataKey} hiddenColumn`) || '{}'),
                            showColumnFilters: false,
                        }}

                        // manualFiltering // For Server Side Filtering by passing params filters: [{"id":"id","value":"12"}]
                        // manualSorting // For Server Side Sorting by passing params sorting: [{"id":"lastName","desc":false}]


                        enableRowVirtualization={enableRowVirtualization} //optional, but recommended if it is likely going to be more than 100 rows
                        rowVirtualizerInstanceRef={rowVirtualizerInstanceRef} //get access to the virtualizer instance
                    // rowVirtualizerProps={{ overscan: 20 }}
                    />
                }</section>
            </>)
    );

}

export default memo(DataTable);

DataTable.defaultProps = {
    columnConfig: [],
    dataKey: 'data', // dataKey is Mandatory to identify the table like an name for the table
    enablePinning: true, // allow pinning the columns to left
    enableRowSelection: true, // enable Row Single Selection
    enableMultiRowSelection: true, // enable Row Multi Selection
    enableRowOrdering: true, // enable Drag and Drop of Rows
    enableColumnOrdering: true, // enable Drag and Drop of Columns
    enableRowNumbers: true, // turn on row numbers # of rows
    enableHiding: true, // Hiding Columns Property
    enableStickyHeader: true, // Sticky Header Property
    enableExpandAll: true, // Expand All Property
    enableColumnResizing: true, // Column Resizing Property
    enableFilterMatchHighlighting: true,
    enablePagination: false, // Pagination Property,
    enableColumnFilters: true, // Column Filters Property
    enableSorting: true, // Sorting Property
    enableGlobalFilter: true, // Global Filter Property,
    enableGlobalFilterModes: true, // Global Filter Mode Property
    globalFilterFn: 'contains', // Global Filter
    filterFn: 'startsWith', // Individual Column Filter
    enableDensityToggle: false, // Enable density toggle padding property
    enableFullScreenToggle: true, // Enable full screen toggle property
    enableRowVirtualization: true, // Enable row virtualization,
};

function CustomInfoButton() {
    return <Box>
        <Tooltip TransitionComponent={Zoom} title="To perform multiple sorting, please press and hold down the Shift key.">
            <IconButton>
                <InfoIcon />
            </IconButton>
        </Tooltip>
    </Box>;
}