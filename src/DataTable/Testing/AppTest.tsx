import React, { memo } from 'react'
import { loadTableData } from './SampleData'
import DataTable from '../DataTable'
import { type IDataTableProps } from '../components/Interfaces'

function AppTest (): JSX.Element {
  const sampleFunction = async (): Promise<any> => {
    return loadTableData.data
  }

  const configuration: IDataTableProps = {
    data: sampleFunction,
    // data: loadTableData.data,
    dataKey: 'data', // dataKey is Mandatory to identify the table like an name for the table
    columnConfig: [
      {
        header: 'picture',
        enableColumnFilter: false,
        enableSorting: false,
        filterFn: 'contains',
        Cell: ({ cell }: { cell: any }) => <img src={cell.getValue()} width={30} />
      },
      {
        header: 'eyeColor',
        enableColumnFilter: false,
        enableSorting: false,
        Cell: ({ cell }: { cell: any }) => (
          <p
            style={{
              backgroundColor: cell.getValue()
            }}
            className='colorBox'
          >
            &nbsp;
          </p>)
      }

    ],
    rowExpandedDetails: ({ row }: any) => {
      const { channel, annotations } = row.original
      return <>
        <p>{channel}</p>
        <pre>{JSON.stringify(annotations)}</pre>
      </>
    }
    // enablePinning: false, // allow pinning the columns to left
    // enableRowSelection: true, // enable Row Single Selection
    // enableMultiRowSelection: true, // enable Row Multi Selection
    // enableRowOrdering: true, // enable Drag and Drop of Rows
    // enableColumnOrdering: true, // enable Drag and Drop of column
    // enableRowNumbers: false, // turn on row numbers # of rows
    // enableHiding: false, // Hiding Columns Property
    // enableStickyHeader: false, // Sticky Header Property
    // enableExpandAll: false, // Expand All Property
    // enableColumnResizing: false, // Column Resizing Property
    // enableFilterMatchHighlighting: false,
    // enablePagination: false, // Pagination Property,
    // enableColumnFilters: false, // Column Filters Property
    // enableSorting: false, // Sorting Property
    // enableGlobalFilter: false, // Global Filter Property,
    // enableGlobalFilterModes: false, // Global Filter Mode Property
    // globalFilterFn: 'contains', // Global Filter
    // filterFn: 'startsWith', // Individual Column Filter
    // enableDensityToggle: false, // Enable density toggle padding property
    // enableFullScreenToggle: false, // Enable full screen toggle property
    // enableRowVirtualization: true, // Enable row virtualization,
    // hideColumnsDefault: ["picture", "about"] // hide the columns default
    // hideColumnsDefault: ["annotations", "channels"] // hide the columns default
  }
  return (
    <>
      <DataTable {...configuration} />
    </>
  )
}

export default memo(AppTest)
