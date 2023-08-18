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

### DPP
If you want to run the DPP. please go to the Index.html file. and uncomment this or add this line if its not explicitly specified
```
<script type="module" src="/src/DPP/main.tsx"></script>
```

```bash
  yarn dev
```

# To use this DPP in  other projects import like below

```bash 
const Dagger = lazy(() => import('@otosense/ogui/src/DAGv2/App'));
```

### DataVisualizer
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
const Charts = lazy(() => import('@otosense/ogui/src/DataVisualizer/App'));
```



### StoreViewer
If you want to run the StoreViewer. please go to the Index.html file. and uncomment this or add this line if its not explicitly specified
```
<script type="module" src="/src/StoreViewer/main.tsx"></script>
```

```bash
  yarn dev
```

# To use this StoreViewer in  other projects import like below

```bash
const StoreView = lazy(() => import('@otosense/ogui/src/StoreViewer/App'));
```