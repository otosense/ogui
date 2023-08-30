import React, { useState, useCallback } from "react";
import ListComponent from "./ListComponent";
// import initialItems from "./mock.json";
import { annotationSample } from "./Testing/data";
import TreeView from "@mui/lab/TreeView";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

const TV = (props: any) => {
	const [items, setItems] = useState(annotationSample);
	const [moreItemsLoading, setMoreItemsLoading] = useState(false);
	const [hasNextPage, setHasNextPage] = useState(true);

	const passer = {
		from_: 0,
		to_: 100,
	};
	// user function detsructure and made loadmore
	// const loadMore = useCallback(() => {
	// 	setMoreItemsLoading(true);

	// 	fetch("https://dog.ceo/api/breeds/image/random/10")
	// 		.then((res) => res.json())
	// 		.then(({ message: newItems }) => {
	// 			setItems((prevItems) => [...prevItems, ...newItems]);
	// 			setMoreItemsLoading(false);
	// 		});
	// }, []);

	const loadMore = useCallback(async () => {
		setMoreItemsLoading(true);
		try {
			const url = "http://20.219.8.178:8080/get_all_sessions";
			console.log("passer", passer);
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

			const newItems = await response.json();
			// console.log("data", data.data);
			// return { status: "success", data: data.data };
			setItems((prevItems: any) => [...prevItems, ...newItems.data]);
			console.log("item after set", items);
			setMoreItemsLoading(false);
		} catch (error: any) {
			// return { status: "error", error: error.toString() };
			console.log("error");
		}
		// let newItems = annotationSample;
		// setItems((prevItems: any) => [...prevItems, ...newItems]);
		// setMoreItemsLoading(false);
	}, []);

	return (
		// <>
		// 	<TreeView
		// 		aria-label="Store View"
		// 		defaultCollapseIcon={<ExpandMoreIcon style={{ color: "#0880ae" }} />}
		// 		defaultExpandIcon={<ChevronRightIcon style={{ color: "#0880ae" }} />}
		// 	>
		// 		<ListComponent
		// 			items={items}
		// 			moreItemsLoading={moreItemsLoading}
		// 			loadMore={loadMore}
		// 			hasNextPage={hasNextPage}
		// 		/>
		// 	</TreeView>
		// </>
		<ListComponent
			items={items}
			moreItemsLoading={moreItemsLoading}
			loadMore={loadMore}
			hasNextPage={hasNextPage}
		/>
	);
};

export default TV;
