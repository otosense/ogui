# ogui

## to use yarn link in the intalled 
1. install @otosense/ogui (yarn add @otosense/ogui)
2. ./client run 'yarn link @otosense/ogui'

## components' props

### Pipeline maker
```
interface IProps {
  options: string[];
  handleSelectChange: (val: string, i: number) => void;
  handleSave: VoidFunction;
  selectedValues: string[];
  setSelectedValues: (arr: string[]) => void;
  isMixedData?: boolean;
  mixedData?: any;
  filterMixedDataFunc?: (data: any) => string[];
}
```
### Stream2pyChart
```
interface IProps {
  arr: {X: number}[];
  setArr: VoidFunction;
  speed: number;
}
```
speed is in millisecond (1000 is 1 sec)


### DataTable

```
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

```
If you want to run the DataTable. please go to the Index.html file. and uncomment this or add this line if its not explicitly specified
```
<script type="module" src="/src/DataTable/main.tsx"></script>
```

Goto the DataTable Folder in Terminal and Start the server
```bash
  yarn dev
```

# To use this DataTable in  other projects import like below

```bash
const DataTable = lazy(() => import('@otosense/ogui/src/DataTable/App'));
```

### DAG

```
interface IDaggerProps {
    DagFuncList: any[] | (() => any[]) | (() => Promise<any[]>),
    LoadDagList: any[] | (() => any[]) | (() => Promise<any[]>);
    onSave: (...args: any) => any | void;
    onloadSavedDag: (...args: any) => any | void;
    loadParamsList: (...args: any) => any | void;
}

```

If you want to run the DPP. please go to the Index.html file. and uncomment this or add this line if its not explicitly specified
```
<script type="module" src="/src/DAG/Testing/main.tsx"></script>
```

```bash
  yarn dev
```

# To use this DAG in  other projects import like below

```bash 
const Dagger = lazy(() => import('@otosense/ogui/src/DAG/Testing/App'));
```

### DataVisualizer


```
interface IDataVisualizerProps {
	gridSpec: string;
	chartsConfig: any[];
}
```

**_NOTE:_**  For interface settings. Please refer the interfaces file from  _src\DataVisualizer\components\interfaces.ts_ directory

If you want to run the DataVisualizer. please go to the Index.html file. and uncomment this or add this line if its not explicitly specified

If you want to run the DataVisualizer Backend. Please see the Backend Folder there do 

```bash
  yarn 
  node ./index.js
```

```
<script type="module" src="/src/DataVisualizer/main.tsx"></script>
```

```bash
  yarn dev
```

Note We need to run Backend also, so please find the 'Backend' folder and open the folder in Terminal and run the command

```bash
  node index.js
```

# To use this Charts in  other projects import like below

```bash
const Charts = lazy(() => import('@otosense/ogui/src/DataVisualizer/Testing/App'));
```



### StoreViewer

```
type IStoreViewProps = SentinelProps | WithoutSentinelProps;

interface storeViewBaseProps {
	fetchSize?: number; // default fetch size 100
	getRootNodeData:
		| any[]
		| (() => any[])
		| ((passer: { from_: number; to_: number }) => Promise<storeDataObject[]>); // Prop to pass data for component
	renderer?: JSX.Element | any;
}

//Below two Interfaces extending on storeViewBaseProps, to ensure if sentinel passed then should pass getChildNodeData.
interface SentinelProps extends storeViewBaseProps {
	sentinel: string;
	getChildNodeData:
		| ((keysArray: string[]) => storeDataObject)
		| ((keysArray: string[]) => Promise<storeDataObject>);
}
interface WithoutSentinelProps extends storeViewBaseProps {
	sentinel?: never;
	getChildNodeData?: never;
}


```
If you want to run the StoreViewer. please go to the Index.html file. and uncomment this or add this line if its not explicitly specified
```bash
<script type="module" src="/src/StoreViewer/main.tsx"></script>
```

```bash
  yarn dev
```

# To use this StoreViewer in  other projects import like below

```bash
const StoreView = lazy(() => import('@otosense/ogui/src/StoreViewer/Testing/App'));
```

### Table JSON maker
```
interface IFunctionCallerProps {
    schema: Object; // please refer to Schema File inside assets Folder. that how the schema structure is expected 
    liveValidate: boolean;
    func: (...args: any[]) => any | void;
}
```

If you want to run the Table JSON maker. please go to the Index.html file. and uncomment this or add this line if its not explicitly specified
```
<script type="module" src="/src/JsonForm/Testing/App"></script>
