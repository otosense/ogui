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
Start the server

```bash
  yarn dev
```