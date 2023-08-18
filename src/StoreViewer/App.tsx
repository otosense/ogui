import React from "react";
import "./App.css";
import StoreView from "./Pages/sv";
import Example from "./Pages/sample";
import { apiMethod } from "./API/ApiCalls";
import * as API from "./API/API";
import axios from "axios";

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

const getData2: (passer: { from_: number; to_: number }) => {
	data: any;
	status: any;
	error: any;
	isLoading: any;
	isFetching: any;
} = (passer) => {
	return apiMethod(passer);
};

export async function getData(passer: any) {
	const url = "http://20.219.8.178:8080/get_all_sessions";
	try {
		const response = await axios.post(url, passer);
		// console.log("res.data", response.data);

		return response.data;
	} catch (error: any) {
		const errorMessage =
			error?.response?.data?.error || error?.message + " " + error?.config?.url;
		throw errorMessage;
	}
}

async function postData(passer: any) {
	const url = "http://20.219.8.178:8080/get_all_sessions";
	try {
		const response = await fetch(url, {
			method: "POST", // Request method
			headers: {
				"Content-Type": "application/json", // Set content type to JSON
			},
			body: JSON.stringify(passer), // Convert the payload to a string
		});

		// Check if the request was successful
		if (!response.ok) {
			throw new Error(`HTTP error! Status: ${response.status}`);
		}

		const data = await response.json();
		return { data, error: null };
	} catch (error) {
		return { data: null, error: error.message };
	}
}

const childNodeTestData = {
	id: "6b79f3a2-29ed-11ee-83ce-0242ac130004",
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

function App() {
	return (
		<>
			<StoreView
				getRootNodeData={getData2}
				sentinel={"02:42:ac:13:00:04"}
				fetchSize={50}
				getChildNodeData={getChildNodeData}
			/>
		</>
	);
}

export default App;
