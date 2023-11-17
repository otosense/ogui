import React from 'react'
import TreeViewer from '../TreeViewer'
import { type storeDataObject, type IStoreViewProps } from '../Utilities/Interfaces'
import SimpleLineChart from './SimpleLineChart'
import { annotationSample } from './data'

const fetchData = (): any => {
  return annotationSample
}

const childNodeTestData: any = {
  id: '1213',
  // bt: "testing code",
  annotation: [
    {
      name: 'templ',
      bt: 1,
      tt: 'notloaded',
      id: 'annot7'
    },
    {
      name: 'temp2',
      bt: 'notloaded',
      tt: 'notloaded',
      id: 'annot8'
    }
  ]
}

const fetchChildData = (): storeDataObject => {
  return childNodeTestData
}

const MyNumberComponent = (props: any): JSX.Element => {
  // return <i><b>{props.v}</b></i>;
  // return <img src="" alt={props.v} />;
  return <SimpleLineChart />
}

const MyStringComponent = (props: any): JSX.Element => {
  // return <strong>{props.v}</strong>;
  return <img src="" alt={props.v} />
}

const userRenderer = (key: any = 'name', value: any): JSX.Element | any => {
  if (key === 'name') {
    return <MyNumberComponent v={value} k={key} />
  } else if (key === '') {
    return <MyStringComponent v={value} k={key} />
  } else {
    return null
  }
}

const storeViewProps: IStoreViewProps = {
  // getRootNodeData: annotationSample,              //Direct array passing for getRootNodeData
  getRootNodeData: fetchData,
  sentinel: 'notloaded',
  fetchSize: 100,
  getChildNodeData: fetchChildData,
  renderer: userRenderer
}

function AppTest (): JSX.Element {
  return (
<>
<TreeViewer {...storeViewProps} />
</>
  )
}

export default AppTest
