import React, { useState, useCallback, useEffect, useRef } from "react";
import ListComponent from "./components/ListComponent";
import TreeView from "@mui/lab/TreeView";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import SearchIcon from "@mui/icons-material/Search";
import { deepMerge } from "./Utilities/UtilFunctions";
import {
	IStoreViewProps,
	IPasser,
	storeDataObject,
} from "./Utilities/Interfaces";

const TreeViewer = (props: IStoreViewProps) => {
	const { getRootNodeData, sentinel, fetchSize, getChildNodeData, renderer } =
		props;

	const [items, setItems] = useState<storeDataObject[]>([]);
	const [moreItemsLoading, setMoreItemsLoading] = useState(false);
	const [hasNextPage, setHasNextPage] = useState(true);
	const [passer, setPasser] = useState<IPasser>({ from_: 0, to_: fetchSize! });
	const [searchQuery, setSearchQuery] = useState("");
	const [filteredItems, setFilteredItems] = useState<storeDataObject[]>([]);

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

	const updatePasser = () => {
		setPasser((prevPasser) => ({
			from_: prevPasser.to_,
			to_: prevPasser.to_ + fetchSize!,
		}));
	};

	const loadChildSentinelData = (clickedKeyParentStructure: string[]) => {
		try {
			if (getChildNodeData) {
				if (typeof getChildNodeData === "function") {
					const childNodeLoadedData = getChildNodeData(
						clickedKeyParentStructure
					);
					if (typeof childNodeLoadedData.then === "function") {
						return childNodeLoadedData.then((dataObject: any) => {
							let updatedItems = filteredItems.map((eachItem) =>
								eachItem?.id === dataObject?.id
									? deepMerge(eachItem, dataObject)
									: eachItem
							);
							setFilteredItems(updatedItems);
						});
					} else {
						let dataObject: storeDataObject =
							childNodeLoadedData as storeDataObject;
						let updatedItems = filteredItems.map((eachItem) =>
							eachItem?.id === dataObject?.id
								? deepMerge(eachItem, dataObject)
								: eachItem
						);
						setFilteredItems(updatedItems);
					}
				}
			}
		} catch (error) {
			console.error("Error fetching child node data:", error);
		}
	};

	const loadMore = useCallback(() => {
		setMoreItemsLoading(true);

		try {
			if (typeof getRootNodeData === "function") {
				// Check if data is a function
				const result: any = getRootNodeData(passerRef.current);
				if (typeof result.then === "function") {
					// Check if the result of the function is a promise
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
						updatePasser();
					});
				} else {
					const dataArray = result as any[]; // Assuming the result is an array
					setItems(dataArray);
					if (searchQuery) {
						const lowerCaseQuery = searchQuery.toLowerCase();
						const matchedItems = dataArray.filter((item) =>
							item.id.toLowerCase().includes(lowerCaseQuery)
						);
						setFilteredItems(matchedItems);
					} else {
						setFilteredItems(dataArray);
					}
					setMoreItemsLoading(false);
					setHasNextPage(false);
				}
			} else if (Array.isArray(getRootNodeData)) {
				setItems(getRootNodeData);
				if (searchQuery) {
					const lowerCaseQuery = searchQuery.toLowerCase();
					const matchedItems = getRootNodeData.filter((item) =>
						item.id.toLowerCase().includes(lowerCaseQuery)
					);
					setFilteredItems(matchedItems);
				} else {
					setFilteredItems(getRootNodeData);
				}
				setMoreItemsLoading(false);
				setHasNextPage(false);
			}
		} catch (error: any) {
			setMoreItemsLoading(false);
			setHasNextPage(false);
		}
	}, [passer, searchQuery, items]);

	useEffect(() => {
		loadMore();
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
						renderer={renderer}
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

TreeViewer.defaultProps = {
	fetchSize: 100,
};

export default TreeViewer;
