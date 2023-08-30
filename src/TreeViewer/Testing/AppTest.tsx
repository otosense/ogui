import React from "react";
import TreeViewer from "../TreeViewer";
import { storeDataObject, storeViewIProps } from "../Utilities/Interfaces";
import SimpleLineChart from "./SimpleLineChart";
import { annotationSample } from "./data";
import TV from "../TV";

async function fetchData(passer: { from_: number; to_: number }): Promise<any> {
	// return { status: "success", data: annotationSample };
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
	} catch (error: any) {
		return { status: "error", error: error.toString() };
	}
}

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

async function fetchChildData(keysArray: string[]): Promise<any> {
	try {
		// let url = "";
		// const response = await fetch(url, {
		// 	method: "POST",
		// 	headers: {
		// 		"Content-Type": "application/json",
		// 	},
		// 	body: JSON.stringify(keysArray),
		// });

		// if (!response.ok) {
		// 	throw new Error(`HTTP error! Status: ${response.status}`);
		// }

		// const data = await response.json();
		// console.log("data", data.data);
		// return { status: "success", data: data.data };
		return { status: "success", data: childNodeTestData };
	} catch (error: any) {
		return { status: "error", error: error.toString() };
	}
}

const MyNumberComponent = (props: any) => {
	// return <i><b>{props.v}</b></i>;
	// return <img src="" alt={props.v} />;
	return <SimpleLineChart />;
};

const MyStringComponent = (props: any) => {
	// return <strong>{props.v}</strong>;
	return <img src="" alt={"props.v"} />;
};

const userRenderer = (key: any, value: any) => {
	if (key === "annotation") {
		return <MyNumberComponent v={value} k={key} />;
	} else if (key === "") {
		return <MyStringComponent v={value} k={key} />;
	} else {
		return null;
	}
};

let storeViewProps: storeViewIProps = {
	getRootNodeData: fetchData,
	sentinel: "notloaded",
	fetchSize: 100,
	getChildNodeData: fetchChildData,
	renderer: userRenderer,
};

function AppTest() {
	console.log("in app test");
	return (
		<>
			{/* <TreeViewer {...storeViewProps} /> */}
			<TV {...storeViewProps} />
		</>
	);
}

export default AppTest;
