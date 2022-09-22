import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface IProps {
  data: any;
  xAxisDataKey: string;
  yAxis1DataKey: string;
  yAxis2DataKey: string;
}

const Stream2pyChart = (props: IProps) => {
  const { data, xAxisDataKey, yAxis1DataKey, yAxis2DataKey } = props;
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart
        width={500}
        height={300}
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey={xAxisDataKey} />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey={yAxis1DataKey} stroke="#8884d8" activeDot={{ r: 8 }} />
        <Line type="monotone" dataKey={yAxis2DataKey} stroke="#82ca9d" />
      </LineChart>
    </ResponsiveContainer>
  );
}
export default Stream2pyChart;
