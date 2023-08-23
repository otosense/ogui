import React from 'react';
import InfiniteScroll from './assets/backup_codes/InfiniteScroll';
import { Box, Typography } from '@mui/material';
import { loadTableData } from './assets/sample';
import DataTable from './pages/DataTable';
import LocalDataTable from './pages/DataTable';
import { IDataTableProps } from './assets/Interfaces';

function AppTest() {

  const sampleFunction = async () => {
    return loadTableData.data;

    try {
      const response = await fetch("http://20.219.8.178:8080/get_all_sessions?", {
        method: "POST",
        body: JSON.stringify({
          from_: 0,
          to_: 100
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8"
        }
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const json = await response.json();
      console.log('json', json);
      return json.data;
    } catch (error) {
      console.error("Error fetching data:", error);
      return []; // Return an empty array or handle the error appropriately
    }
  };



  // return loadTableData.data;

  const configuration: IDataTableProps = {
    data: sampleFunction,
    dataKey: 'data', // dataKey is Mandatory to identify the table like an name for the table
    // columnConfig: [
    //   {
    //     header: 'picture',
    //     enableColumnFilter: false,
    //     enableSorting: false,
    //     filterFn: 'contains',
    //     Cell: ({ cell }: { cell: any; }) => <img src={cell.getValue()} width={30} />
    //   },
    //   {
    //     header: 'eyeColor',
    //     enableColumnFilter: false,
    //     enableSorting: false,
    //     Cell: ({ cell }: { cell: any; }) => (
    //       <p
    //         style={{
    //           backgroundColor: cell.getValue(),
    //         }}
    //         className='colorBox'
    //       >
    //         &nbsp;
    //       </p>)
    //   }


    // ],
    rowExpandedDetails: ({ row }: any) => {
      const { channel } = row.original;
      return <p>{channel}</p>;
    },
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
    hideColumnsDefault: ["annotations", "channels"] // hide the columns default
  };


  /*******************************/
  // Note: if you're Getting issue like "Objects are not valid as a React child (found: object with keys {name, bt, tt, source})", means you're rendering objects inside the table, so add it hideColumnsDefault, or even if you want to see the details use rowExpandedDetails to add additional details.
  /*******************************/
  return (
    <>
      <DataTable {...configuration} />
    </>
  );
}

export default AppTest;

