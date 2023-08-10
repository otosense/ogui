import { useQuery } from "@tanstack/react-query";
import * as API from "../components/API/API";

const getSessionDetailsURL = "http://20.219.8.178:8080/get_session_data";

// const getAnnotData = () => {
//   //function which calls api and returns data in expected format
//   ///expected format: return yAxisCategories, seriesdata
//   //yAxisCategories: [] of unique strings on y axis, seriesdata: [{x:, x2:, y:},{x:,x2:,y:},etc,....] list of objects

//   console.log("in get data");
//   const { data, isLoading, isError } = useQuery({
//     queryKey: "sessiondata",
//     queryFn: () => fetch(getSessionDetailsURL).then((res) => res.json()),
//   });

//   if (isLoading) {
//     return <p>Loading...</p>;
//   } else if (isError) {
//     return <p>Error fetching todos</p>;
//   } else {
//     console.log("data", data);
//     return "";
//     // return (
//     //   <ul>
//     //     {data.todos.map((todo) => (
//     //       <li key={todo.id}>{todo.title}</li>
//     //     ))}
//     //   </ul>
//     // );
//   }
// };

// const getAnnotData = async () => {
//   const response = await fetch(getSessionDetailsURL);

//   if (response.status === 200) {
//     const data = await response.json();
//     console.log("data", data);
//     return data;
//   } else {
//     throw new Error("Error fetching todos");
//   }
// };

// const getAnnotData = () => {
//   const sample = {
//     session_id: "17838b32-29ed-11ee-b73e-0242ac130004",
//     ann_from: 0,
//     ann_to: 1000,
//     wf_from: 0,
//     wf_to: 1000,
//   };

//   const { error, refetch, isFetching } = useQuery({
//     queryKey: ["StoreConfig", sample],
//     queryFn: async () => {
//       let data = API.getSessionDetails(sample);
//       console.log("data", data);
//       return data;
//     },
//     keepPreviousData: false,
//     refetchOnWindowFocus: false,
//     cacheTime: 5 * 60 * 1000, // 5 minutes
//     staleTime: 1 * 60 * 1000, // 1 minute
//     enabled: false, // Set enabled to false initially
//   });
// };
import Data from "../../../Backend/json/Annot.json";
import wfJsonObject from "../../../Backend/json/jsonformatter.json";
import wfJsonObject2 from "../../../Backend/json/jsonformatter2.json";
import { epochConverted } from "../components/globalConfigs";

const getAnnotData = () => {
  //console.log("data", Data);
  //console.log("ty", typeof Data.data);
  console.log("data", Data.data[0].data);

  let uniqueArray: string[] = [];
  let Yaxis: any = [];

  let seriesData = [];

  let dataSamples = Data.data[0].data;
  console.log("data", dataSamples);

  dataSamples.map((singleChannelData) => {
    Yaxis.push(singleChannelData.tag);
    uniqueArray = [...new Set(Yaxis)];

    const chartData = {
      x: singleChannelData.bt,
      x2: singleChannelData.tt,
      y: uniqueArray?.indexOf(singleChannelData.tag),
      title: singleChannelData.tag,
    };
    seriesData.push(chartData);
  });
  // console.log("ua", uniqueArray);
  // console.log("se", seriesData);
  let formattedData = { yAxisCategories: uniqueArray, seriesData: seriesData };
  return formattedData;
};

const getWfData = () => {
  //function which calls api and returns the data in expected format
  //expected format : return xAxisCategories, seriesData
  //xAxisCategories: [] of x values, seriesData: [1,2,3,4] of y values

  console.log("wf", wfJsonObject.data);

  let channelData = wfJsonObject.data[0];
  const { data } = channelData;
  if (channelData) {
    const timeDifferBetweenSamples = Math.floor(
      1 / (channelData?.sr / (1000 * 1000))
    );
    let sampleTime = channelData?.ts;
    const sampleTimeArray = [];

    data.forEach((sampleValue: number, index: number) => {
      if (index !== 0) {
        sampleTime += timeDifferBetweenSamples;
      }
      sampleTimeArray.push(sampleTime);
    });
    // let chartData = {
    //   xAxisCategories: ["Jan", "Feb", "Mar", "Apr", "May"],
    //   seriesData: [1, 3, 2, 4, 5],
    // };

    let chartData = {
      xAxisCategories: sampleTimeArray,
      seriesData: data,
    };
    console.log("chart", chartData);
    return chartData;
  }
};

const getWf2Data = () => {
  //function which calls api and returns the data in expected format
  //expected format : return xAxisCategories, seriesData
  //xAxisCategories: [] of x values, seriesData: [1,2,3,4] of y values

  console.log("wf", wfJsonObject2.data);

  let channelData = wfJsonObject2.data[0];
  const { data } = channelData;
  if (channelData) {
    const timeDifferBetweenSamples = Math.floor(
      1 / (channelData?.sr / (1000 * 1000))
    );
    let sampleTime = channelData?.ts;
    const sampleTimeArray = [];

    data.forEach((sampleValue: number, index: number) => {
      if (index !== 0) {
        sampleTime += timeDifferBetweenSamples;
      }
      sampleTimeArray.push(sampleTime);
    });
    // let chartData = {
    //   xAxisCategories: ["Jan", "Feb", "Mar", "Apr", "May"],
    //   seriesData: [9, 11, 10, 12, 13],
    // };
    let chartData = {
      xAxisCategories: sampleTimeArray,
      seriesData: data,
    };
    console.log("chart2", chartData);
    return chartData;
  }
};

const getSingleAxisData1 = () => {
  let chartData = {
    xAxisCategories: ["Jan", "Feb", "Mar", "Apr", "May"],
    seriesData: [9, 11, 23, 12, 13],
  };

  return chartData;
};

const getSingleAxisData2 = () => {
  let chartData = {
    xAxisCategories: ["Jan", "Feb", "Mar", "Apr", "May"],
    seriesData: [12, 10, 5, 7, 6],
  };

  return chartData;
};

export {
  getAnnotData,
  getWfData,
  getWf2Data,
  getSingleAxisData1,
  getSingleAxisData2,
};
