import React from "react";
import "./App.css";
import StoreView from "./Pages/StoreView";
import StoreViewer from "./Pages/StoreViewer";
import Example from "./Pages/sample";
import { apiMethod } from "./API/ApiCalls";

const getData: (
	val: string[],
	passer: { from_: number; to_: number }
) => { data: any; status: any; error: any; isLoading: any; isFetching: any } = (
	val,
	passer
) => {
	return apiMethod(passer);
};

function App() {
	return (
		<>
			{/* {<Infinite />} */}
			{/* <Example /> */}
			<StoreView getData={getData} sentinel={"notloaded"} />
			{/* <StoreViewer /> */}
		</>
	);
}

export default App;
