import React from "react";
import "./App.css";
import StoreView from "./Pages/StoreView";

type FetchResult =
	| { status: "success"; data: [] }
	| { status: "error"; error: string };

async function fetchData(passer: any): Promise<FetchResult> {
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
		// console.log("data", data.data);
		return { status: "success", data: data.data };
	} catch (error: any) {
		return { status: "error", error: error.toString() };
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
				getRootNodeData={fetchData}
				sentinel={"02:42:ac:13:00:04"}
				fetchSize={50}
				getChildNodeData={getChildNodeData}
			/>
		</>
	);
}

export default App;
