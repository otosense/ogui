import {
  IChannelMappingResponse,
  IProps,
  ISample,
  ISrcChannel,
  IZoomRange,
} from "../API/interfaces";
import { epochConverted } from "../globalConfigs";

// function typeOneDataMapping(
//   srcData: IChannelMappingResponse[],
//   setIsLoading: any,
//   setMappedData: any,
//   setXCategory: any
// ): any {
//   setIsLoading(true);
//   console.log("called dataMapping");
//   console.log("data before", srcData);

//   return srcData?.map((channel: IChannelMappingResponse) => {
//     const { data } = channel;
//     if (data) {
//       const timeDifferBetweenSamples = data?.sr / (1000 * 1000);
//       let sampleTime = data?.ts;
//       const sampledData: ISample[] = [];
//       const sample_x = [];

//       data.data[0].forEach((sampleValue: number, index: number) => {
//         if (index !== 0) {
//           sampleTime += timeDifferBetweenSamples;
//         }
//         const sample: ISample = {
//           x: epochConverted(sampleTime),
//           y: sampleValue,
//         };
//         // const sample = [];
//         // sample.push(sampleValue);
//         // sample.push(epochConverted(sampleTime));
//         sampledData.push(sample);
//         sample_x.push(epochConverted(sampleTime));
//       });

//       console.log("sampledData", sampledData);
//       setMappedData(sampledData);
//       setXCategory(sample_x);
//       return sampledData;
//     }
//     return [];
//   });
// }

function typeFourDataMapping(
  data: any[],
  setXAxisCategory: (value: string[]) => void,
  setPlotting: (value: any) => void,
  setLegendName: (channel: string) => void
): void {
  let uniqueArray: string[] = [];

  // looping the initial data from the local state
  data.map((channelData) => {
    channelData?.data?.data
      .flat()
      ?.map((singleChannelData: ISingleChannelData) => {
        Yaxis.push(singleChannelData.tag);
        uniqueArray = [...new Set(Yaxis)];
        setXAxisCategory(uniqueArray);
        const chartData = {
          x: singleChannelData.bt,
          x2: singleChannelData.tt,
          y: uniqueArray?.indexOf(singleChannelData.tag),
          title: singleChannelData.tag,
        };
        // setting the legend
        setLegendName(channelData.channel);
        // data prepared to display in the chart
        setPlotting((prevData: any) => [...prevData, chartData]);
      });
  });
}

function typeOneDataMapping(
  srcData: IChannelMappingResponse[],
  setIsLoading: any
): ISample[][] {
  setIsLoading(true);
  console.log("called dataMapping");
  console.log("data before", srcData);

  return srcData?.map((channel: IChannelMappingResponse) => {
    const { data } = channel;
    if (data) {
      const timeDifferBetweenSamples = data?.sr / (1000 * 1000);
      let sampleTime = data?.ts;
      const sampledData: ISample[] = [];

      data.data[0].forEach((sampleValue: number, index: number) => {
        if (index !== 0) {
          sampleTime += timeDifferBetweenSamples;
        }
        const sample: ISample = {
          value: sampleValue,
          time: epochConverted(sampleTime),
        };
        sampledData.push(sample);
      });

      console.log("sampledData", sampledData);
      return sampledData;
    }
    return [];
  });
}

export { typeOneDataMapping, typeFourDataMapping };
