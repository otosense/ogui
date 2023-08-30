import React, { useState, useCallback, useEffect } from "react";
import ListComponent from "./ListComponent";
// import initialItems from "./mock.json";
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

const TV = (props: any) => {
	const { getRootNodeData, sentinel, fetchSize, getChildNodeData } = props;
	const [items, setItems] = useState([]);
	const [moreItemsLoading, setMoreItemsLoading] = useState(false);
	const [hasNextPage, setHasNextPage] = useState(true);
	const [passer, setPasser] = useState({ from_: 0, to_: fetchSize });
	const [searchQuery, setSearchQuery] = useState("");
	const [filteredItems, setFilteredItems] = useState([]);

	const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const query = event.target.value;
		setSearchQuery(query);
		console.log("quer", query);

		if (query) {
			const lowerCaseQuery = query.toLowerCase();
			const matchedItems = items.filter((item) => {
				// Assuming item is an object with an 'id' field for simplicity.
				// Adjust this condition based on your data structure.
				return item.id.toLowerCase().includes(lowerCaseQuery);
			});
			setFilteredItems(matchedItems);
		} else {
			setFilteredItems(items);
		}
	};

	const loadMore = useCallback(async () => {
		setMoreItemsLoading(true);

		try {
			const newItems = await getRootNodeData(passer);
			setItems((prevItems: any) => [...prevItems, ...newItems.data]);
			setMoreItemsLoading(false);
			setPasser((prevPasser) => ({
				from_: prevPasser.to_,
				to_: prevPasser.to_ + fetchSize,
			}));

			console.log("items", items);
			setFilteredItems(items);
			console.log("fl", filteredItems);
		} catch (error: any) {
			console.log("error");
			setMoreItemsLoading(false);
		}
	}, [passer]);

	useEffect(() => {
		// This function fetches the data and updates the state
		const fetchData = async () => {
			try {
				const newItems = await getRootNodeData(passer);
				setItems(newItems.data);
				setFilteredItems(newItems.data);
			} catch (error: any) {
				console.error("Error fetching initial data:", error);
			}
		};

		// Call the fetchData function
		fetchData();
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
