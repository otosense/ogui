import React from "react";
import TreeViewer from "../TreeViewer";
import { storeDataObject, IStoreViewProps } from "../Utilities/Interfaces";
import SimpleLineChart from "./SimpleLineChart";
import { annotationSample } from "./data";
import TV from "../TreeViewer";

// const fetchData = async (passer: any) => {
// 	try {
// 		const url = "http://20.219.8.178:8080/get_all_sessions";
// 		console.log("before response");
// 		const response = await fetch(url, {
// 			method: "POST",
// 			headers: {
// 				"Content-Type": "application/json",
// 			},
// 			body: JSON.stringify(passer),
// 		});

// 		console.log("after response");
// 		if (!response.ok) {
// 			throw new Error("Network response was not ok");
// 		}

// 		console.log("after response.ok");
// 		const json = await response.json();
// 		console.log("json", json);
// 		return json.data;
// 	} catch (error) {
// 		console.error("Error fetching data:", error);
// 		return []; // Return an empty array or handle the error appropriately
// 	}
// };

const fetchData = () => {
	return annotationSample;
};

const childNodeTestData: any = {
	id: "1213",
	// bt: "testing code",
	annotation: [
		{
			name: "templ",
			bt: 1,
			tt: "notloaded",
			id: "annot7",
		},
		{
			name: "temp2",
			bt: "notloaded",
			tt: "notloaded",
			id: "annot8",
		},
	],
};

const fetchChildData = async (keysArray: string[]) => {
	try {
		// let url = "original Api";
		// const response = await fetch(url, {
		// 	method: "POST",
		// 	headers: {
		// 		"Content-Type": "application/json",
		// 	},
		// 	body: JSON.stringify(keysArray),
		// });

		//mocking fetch functionality
		let passer = { from_: 0, to_: 100 };
		let url = "http://20.219.8.178:8080/get_all_sessions";
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

		// const data = await response.json();
		const data = await childNodeTestData;
		return data;
	} catch (error: any) {
		return error;
	}
};

// const fetchChildData = () => {
// 	return childNodeTestData;
// };

const MyNumberComponent = (props: any) => {
	// return <i><b>{props.v}</b></i>;
	// return <img src="" alt={props.v} />;
	return <SimpleLineChart />;
};

const MyStringComponent = (props: any) => {
	// return <strong>{props.v}</strong>;
	return <img src="" alt={"props.v"} />;
};

const userRenderer = (key: any = "name", value: any) => {
	if (key === "name") {
		return <MyNumberComponent v={value} k={key} />;
	} else if (key === "") {
		return <MyStringComponent v={value} k={key} />;
	} else {
		return null;
	}
};

let storeViewProps: IStoreViewProps = {
	// getRootNodeData: annotationSample,              //Direct array passing for getRootNodeData
	getRootNodeData: fetchData,
	sentinel: "notloaded",
	fetchSize: 100,
	getChildNodeData: fetchChildData,
	renderer: userRenderer,
};

function AppTest() {
	return (
		<>
			<TreeViewer {...storeViewProps} />
		</>
	);
}

export default AppTest;
