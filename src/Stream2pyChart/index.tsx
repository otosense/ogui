import React, { useEffect, useRef } from 'react'
import {
  AreaChart,
  CartesianGrid,
  YAxis,
  XAxis,
  Tooltip,
  Legend,
  Area
} from 'recharts'

interface IProps {
  arr: Array<{ X: number }>
  setArr: VoidFunction
  speed: number
}

const Stream2pyChart = (props: IProps): JSX.Element => {
  const { arr, setArr, speed } = props
  const timeoutRef = useRef(null)
  const validate = (): void => {
    setArr()
  }

  useEffect(() => {
    const interval = setInterval(() => {
      console.log('This will run every second!')
      timeoutRef.current = null
      validate()
    }, speed)
    if (timeoutRef.current !== null) {
      clearInterval(interval)
    }
  }, [])
  return (
    <div>
        <AreaChart width={730} height={250} data={arr} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis/>
        <YAxis />
        <Tooltip />
        <Legend />
        <Area type="monotone" dataKey="X" stroke="#8884d8" fill="#8884d8" />

      </AreaChart>

    </div>
  )
}

export default Stream2pyChart
