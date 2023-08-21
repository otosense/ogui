import React from "react";
import "./App.css";
import StoreView from "./Pages/StoreView";
import {
	childDataFetchResult,
	FetchResult,
	storeDataObject,
	storeViewIProps,
} from "./Utilities/Interfaces";
import { annotationSample } from "./assets/data";

async function fetchData(passer: {
	from_: number;
	to_: number;
}): Promise<FetchResult> {
	const url = "http://20.219.8.178:8080/get_all_sessions";
	try {
		const response = await fetch(url, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(passer),
		});

		if (!response.ok) {
			throw new Error(`HTTP error! Status: ${response.status}`);
		}

		const data = await response.json();
		console.log("data", data.data);
		return { status: "success", data: data.data };
		// return { status: "success", data: annotationSample };
	} catch (error: any) {
		return { status: "error", error: error.toString() };
	}
}

const childNodeTestData: storeDataObject = {
	id: "1213",
	annotation: [
		{
			name: "templ",
			bt: 1,
			tt: 2,
			id: "annot7",
		},
		{
			name: "temp2",
			bt: 12,
			tt: 21,
			id: "annot8",
		},
	],
};

const fetchChildData: (keysArray: string[]) => Promise<childDataFetchResult> = (
	keysArray
) => {
	try {
		return { status: "success", data: childNodeTestData };
	} catch (error: any) {
		return { status: "error", error: error.message || "Unknown error" };
	}
};

let storeViewProps: storeViewIProps = {
	getRootNodeData: fetchData,
	sentinel: "notloaded",
	fetchSize: 100,
	getChildNodeData: fetchChildData,
};

function App() {
	return (
		<>
			<StoreView {...storeViewProps} />
		</>
	);
}

export default App;
