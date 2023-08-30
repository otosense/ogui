import React, { useState, useCallback, useEffect, useRef } from "react";
import ListComponent from "./ListComponent";
import { annotationSample } from "./Testing/data";
import TreeView from "@mui/lab/TreeView";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import SearchIcon from "@mui/icons-material/Search";

import { storeViewIProps } from "./Utilities/Interfaces";
import { filter } from "lodash";

interface Item {
	id: string;
	[key: string]: any;
}

const TV = (props: any) => {
	const { getRootNodeData, sentinel, fetchSize, getChildNodeData } = props;
	const [items, setItems] = useState<Item[]>([]);
	const [moreItemsLoading, setMoreItemsLoading] = useState(false);
	const [hasNextPage, setHasNextPage] = useState(true);
	const [passer, setPasser] = useState({ from_: 0, to_: fetchSize });
	const [searchQuery, setSearchQuery] = useState("");
	const [filteredItems, setFilteredItems] = useState<Item[]>([]);

	const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const query = event.target.value;
		setSearchQuery(query);
		if (query) {
			const lowerCaseQuery = query.toLowerCase();
			const matchedItems = items.filter((item) =>
				item.id.toLowerCase().includes(lowerCaseQuery)
			);
			setFilteredItems(matchedItems);
		} else {
			setFilteredItems(items);
		}
	};

	const passerRef = useRef(passer); // Create a ref

	useEffect(() => {
		passerRef.current = passer; // Update the ref whenever passer changes
	}, [passer]);

	const loadChildSentinelData = async (clickedKeyParentStructure: string[]) => {
		try {
			// console.log("clickedKeyParentStructure", clickedKeyParentStructure);
			const childNodeLoadedData = await getChildNodeData(
				clickedKeyParentStructure
			);
			// console.log("childNodeLoadedData.data", childNodeLoadedData.data);
			let childData: storeDataObject =
				childNodeLoadedData.data as storeDataObject;
			setLoadedData({ data: childData });
		} catch (error) {
			console.error("Error fetching child node data:", error);
		}
	};

	const loadMore = useCallback(() => {
		console.log("load more called");
		setMoreItemsLoading(true);
		try {
			const result = getRootNodeData(passerRef.current);

			if (typeof result.then === "function") {
				// Check if the result of the function is a promise
				console.log("promise type");
				return result.then((dataArray: any) => {
					const mergedItems = [...items, ...dataArray];
					setItems(mergedItems);
					if (searchQuery) {
						const lowerCaseQuery = searchQuery.toLowerCase();
						const matchedItems = mergedItems.filter((item) =>
							item.id.toLowerCase().includes(lowerCaseQuery)
						);
						setFilteredItems(matchedItems);
					} else {
						setFilteredItems(mergedItems);
					}
					setMoreItemsLoading(false);
					setPasser((prevPasser) => ({
						from_: prevPasser.to_,
						to_: prevPasser.to_ + fetchSize,
					}));
				});
			} else {
				console.log("generel data");
				const dataArray = result as any[]; // Assuming the result is an array
				const mergedItems = [...items, ...dataArray];
				setItems(mergedItems);
				if (searchQuery) {
					const lowerCaseQuery = searchQuery.toLowerCase();
					const matchedItems = mergedItems.filter((item) =>
						item.id.toLowerCase().includes(lowerCaseQuery)
					);
					setFilteredItems(matchedItems);
				} else {
					setFilteredItems(mergedItems);
				}
				setMoreItemsLoading(false);
				setPasser((prevPasser) => ({
					from_: prevPasser.to_,
					to_: prevPasser.to_ + fetchSize,
				}));
				// return dataArray; // Return the result of the function
			}
		} catch (error: any) {
			console.log("error");
			setMoreItemsLoading(false);
		}
	}, [passer, searchQuery, items]);

	useEffect(() => {
		// This function fetches the data and updates the state
		// const fetchData = async () => {
		// 	try {
		// 		const newItems = await getRootNodeData(passer);
		// 		setItems(newItems.data);
		// 		setFilteredItems(newItems.data);
		// 		setPasser((prevPasser) => ({
		// 			from_: prevPasser.to_,
		// 			to_: prevPasser.to_ + fetchSize,
		// 		}));
		// 	} catch (error: any) {
		// 		console.error("Error fetching initial data:", error);
		// 	}
		// };

		const result: any = getRootNodeData(passer);
		if (typeof result.then === "function") {
			// Check if the result of the function is a promise
			console.log("promise type");
			return result.then((dataArray: any) => {
				setItems(dataArray);
				setFilteredItems(dataArray);
				setPasser((prevPasser) => ({
					from_: prevPasser.to_,
					to_: prevPasser.to_ + fetchSize,
				}));
			});
		} else {
			console.log("generel data");
			const dataArray = result as any[]; // Assuming the result is an array
			setItems(dataArray);
			setFilteredItems(dataArray);
			setPasser((prevPasser) => ({
				from_: prevPasser.to_,
				to_: prevPasser.to_ + fetchSize,
			}));
			// return dataArray; // Return the result of the function
		}
	}, []);

	return (
		<Box>
			{/* Search Input */}
			<Box mb={2} display="flex" alignItems="center">
				<TextField
					fullWidth
					variant="outlined"
					size="small"
					placeholder="Search..."
					value={searchQuery}
					onChange={handleSearchChange}
					InputProps={{
						startAdornment: <SearchIcon color="inherit" />,
					}}
				/>
			</Box>

			<TreeView
				aria-label="Store View"
				defaultCollapseIcon={<ExpandMoreIcon style={{ color: "#0880ae" }} />}
				defaultExpandIcon={<ChevronRightIcon style={{ color: "#0880ae" }} />}
			>
				{filteredItems.length ? (
					<ListComponent
						items={filteredItems}
						moreItemsLoading={moreItemsLoading}
						loadMore={loadMore}
						hasNextPage={hasNextPage}
						sentinel={sentinel}
						loadChildSentinelData={loadChildSentinelData}
					/>
				) : (
					<Box mt={2}>
						<Typography
							variant="subtitle1"
							color="textSecondary"
							align="center"
						>
							Not found
						</Typography>
					</Box>
				)}
			</TreeView>
		</Box>
	);
};

export default TV;
