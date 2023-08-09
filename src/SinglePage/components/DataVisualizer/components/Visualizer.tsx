import { useEffect, useState } from "react";
import { Button, TextField } from "@mui/material";
import MainChart from "./MainChart";
import "../../../App.css";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import { chartsConfig } from "../Configs/configs";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import * as API from "./API/API";
import { useQuery } from "@tanstack/react-query";
import LoadingOverlay from "../../../utilities/Loader";
import "./index.css";

const fetchSize = 1000;

const Visualizer = () => {
  const [chartType, setChartType] = useState("");
  const [sample, setSample] = useState({});
  const [sessionId, setSessionId] = useState<string>();
  const [storeChartData, setStoreChartData] = useState<any[]>([]);
  const [initialSize, setInitialSize] = useState<number>(0);

  const { error, refetch, isFetching } = useQuery({
    queryKey: ["StoreConfig", sample],
    queryFn: async () => {
      return API.getSessionDetails(sample);
    },
    keepPreviousData: false,
    refetchOnWindowFocus: false,
    cacheTime: 5 * 60 * 1000, // 5 minutes
    staleTime: 1 * 60 * 1000, // 1 minute
    enabled: false, // Set enabled to false initially
  });

  const handleSubmit = (e: any) => {
    // Prevent the browser from reloading the page
    e.preventDefault();
    setInitialSize(initialSize + fetchSize);
    payloadSetting(sessionId, initialSize, setSample);
  };

  const handleChange = (event: SelectChangeEvent) => {
    setChartType(event.target.value as string);
  };

  const loadMoreData = () => {
    payloadSetting(sessionId, initialSize, setSample);
  };

  useEffect(() => {
    if (Object.keys(sample).length > 0) {
      refetch()
        ?.then((data) => {
          if (data) {
            data.data?.forEach(
              (eachChannel: { channel: string; data: { data: any }[] }) => {
                const existingChannelIndex = storeChartData.findIndex(
                  (item) => item.data_type === eachChannel.channel
                );

                if (existingChannelIndex !== -1) {
                  // If the channel already exists, push the new data to the existing channel's 'data' array
                  storeChartData[existingChannelIndex].data[0].push(
                    ...eachChannel.data
                  );
                } else {
                  // If the channel doesn't exist, create a new channel with the 'data' array
                  storeChartData.push({
                    ...eachChannel,
                    data_type: eachChannel.channel,
                    data: [eachChannel.data],
                  });
                }
                console.log("chart data", storeChartData);
                setStoreChartData(storeChartData);
              }
            );
          }
        })
        .catch((error) => {
          console.error("Error occurred while fetching data:", error);
          // setHasError(true);
          // setErrorMessage('Error occurred while fetching data. Please try again.');
        });
    }
  }, [sample]);

  return (
    <>
      {isFetching && <LoadingOverlay />}
      <section className="topLayout">
        <form onSubmit={handleSubmit} className="test-css">
          <TextField
            sx={{
              width: "20px",
            }}
            id="myInput"
            label="SessionId"
            // variant="outlined"
            name="sessionId"
            defaultValue="123"
            className="getSessionIdBox"
            size="small"
            onChange={(e: { target: { value: string } }) =>
              setSessionId(e.target.value)
            }
            required
          />
          {/* <InputLabel id="demo-simple-select-label">Chart Type</InputLabel> */}
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={chartType}
            onChange={handleChange}
            required
            label="Chart Type"
            //className="test-css"
            // defaultValue="None"
            //color="green"
            //variant="outlined"
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value={"singlexaxis"}>SingleXaxis</MenuItem>
            <MenuItem value={"individualxaxis"}>IndividualXaxis</MenuItem>
          </Select>

          <Button variant="contained" type="submit">
            Submit
          </Button>
        </form>
        {storeChartData.length > 0 && (
          <Button variant="contained" onClick={loadMoreData}>
            Load More
          </Button>
        )}
      </section>
      {!isFetching && (
        <section className="chartArea">
          <MainChart
            chartType={chartType}
            chartsConfig={chartsConfig}
            gridSpec="2*2"
          />
        </section>
      )}
    </>
  );
};

export default Visualizer;

function payloadSetting(
  sessionId: string | undefined,
  initialSize: number,
  setSample: React.Dispatch<React.SetStateAction<{}>>
) {
  const sessionIdPayload = {
    session_id: sessionId,
    ann_from: initialSize,
    ann_to: initialSize + fetchSize,
    wf_from: initialSize,
    wf_to: initialSize + fetchSize,
  };
  setSample(sessionIdPayload);
}
