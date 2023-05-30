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


### Charts
If you want to run the Charts. please go to the Index.html file. and uncomment this or add this line if its not explicitly specified
```
<script type="module" src="/src/Charts/main.tsx"></script>
```

Goto the Charts Folder in Terminal and Start the server

```bash
  yarn dev
```