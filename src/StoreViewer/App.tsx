import React from "react";
import "./App.css";
import StoreView from "./Pages/StoreView";
import Example from "./Pages/sample";
import { apiMethod } from "./API/ApiCalls";
import * as API from "./API/API";

const testData = [
	{
		id: "123e234r23",
		sr: "notloaded",
		annotation: [
			{
				a: [{ as: 12, df: "notloaded" }],
				b: "notloaded",
			},
			{
				s: [1, 2, 3],
				c: { sd: 12, rt: 45 },
			},
		],
		channel: ["c1", "c2"],
	},
	{
		id: "09876543",
		sr: "notloaded",
		bt: { u: 67, o: 899 },
		annotationTesting: [
			{
				a: { op: 12, gh: "notloaded" },
				b: "notloaded",
			},
			{
				s: [1, 2, 3],
				c: { sd: 12, rt: 45 },
			},
		],
		channel: ["c1", "c2"],
	},
];

// const getData: (passer: { from_: number; to_: number }) => {
// 	data: any;
// 	status: any;
// 	error: any;
// 	isLoading: any;
// 	isFetching: any;
// } = (passer) => {
// 	// return apiMethod(passer);
// 	// return {
// 	// 	data: { data: testData },
// 	// 	status: "success",
// 	// 	error: false,
// 	// 	isLoading: false,
// 	// 	isFetching: false,
// 	// };
// 	return API.StoreConfig(passer);
// };

const getData: (passer: { from_: number; to_: number }) => {
	data: any;
} = (passer) => {
	// return apiMethod(passer);
	// return {
	// 	data: { data: testData },
	// 	status: "success",
	// 	error: false,
	// 	isLoading: false,
	// 	isFetching: false,
	// };
	return API.PostMethod("http://20.219.8.178:8080/get_all_sessions", passer);
};

const childNodeTestData = {
	id: "123e234r23",
	sr: "loadeddata",
	annotation: [
		{
			a: [{ as: 12, df: "notloaded" }],
			b: "loadedData",
		},
		{
			s: [1, 2, 3],
			c: { sd: 12, rt: 45 },
		},
	],
	channel: ["c1", "c2"],
};

const getChildNodeData: (keysArray: string[]) => { data: any } = (
	keysArray
) => {
	return { data: childNodeTestData };
};

async function fetchData() {
	try {
		const response = await fetch("https://api.example.com/data");
		if (!response.ok) {
			throw new Error("Network response was not ok");
		}
		const data = await response.json();
		console.log(data);
	} catch (error) {
		console.log("There was a problem:", error.message);
	}
}

function App() {
	return (
		<>
			<StoreView
				getRootNodeData={getData}
				sentinel={"notloaded"}
				fetchSize={2}
				getChildNodeData={getChildNodeData}
			/>
		</>
	);
}

export default App;
