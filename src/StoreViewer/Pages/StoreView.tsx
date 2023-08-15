/* eslint-disable no-tabs */
import React, { useEffect, useState, useRef } from "react";
import TreeView from "@mui/lab/TreeView";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import TextField from "@mui/material/TextField/TextField";
import Button from "@mui/material/Button/Button";
import { Alert } from "@mui/material";

import SnackBar from "../../utilities/SnackBar";
import LoadingOverlay from "../../utilities/Loader";
import { apiMethod } from "../API/ApiCalls";
import { StyledTreeItem } from "../components/StoreViewStyle";

interface storeViewIProps {
	getData: (
		val: string[],
		passer: { from_: number; to_: number }
	) => { data: any; status: any; error: any; isLoading: any; isFetching: any };
	sentinel: string;
}

const testData = {
	id: "123e234r23",
	sr: 44100,
	annotation: {
		a: 1,
		b: 2,
	},
	channel: ["c1", "c2"],
};

const onNodeClick = () => {
	console.log("testing");
};
const handleCopy = async (
	label: string,
	setCopied: React.Dispatch<React.SetStateAction<boolean>>
) => {
	setCopied(false);
	try {
		await navigator?.clipboard?.writeText(label);
		setCopied(true);
	} catch (error) {
		console.log("Copy Failed");
	}
};

const renderSessionDetails = (session: any, getData: any) => {
	const sessionKeys = Object.keys(session);

	return (
		<>
			{sessionKeys.map((key) => {
				const value = session[key];

				if (
					Array.isArray(value) ||
					value instanceof Object ||
					value === "notloaded"
				) {
					if (value === "notloaded") {
						return (
							<StyledTreeItem
								key={`${session.id}-${key}`}
								nodeId={`${session.id}-${key}`}
								label={`${key}: ${value}`}
								onClick={() => {
									onNodeClick();
								}}
							/>
						);
					}

					if (Array.isArray(value)) {
						<StyledTreeItem
							key={`${session.id}-${key}`}
							nodeId={`${session.id}-${key}`}
							label={String(key)}
						>
							{value.map((arrayItem, index) => {
								if (arrayItem instanceof Object) {
									return renderSessionDetails(arrayItem, getData);
								} else {
									return (
										<StyledTreeItem
											key={`${session.id}-channel-${index}`}
											nodeId={`${session.id}-channel-${index}`}
											label={String(arrayItem)}
										/>
									);
								}
							})}
							;
						</StyledTreeItem>;
					}

					if (value instanceof Object) {
						<StyledTreeItem
							key={`${session.id}-${key}`}
							nodeId={`${session.id}-${key}`}
							label={String(key)}
						>
							return renderSessionDetails(value, getData);
						</StyledTreeItem>;
					}

					return null; // Return null if no conditions match.
				} else {
					return (
						<StyledTreeItem
							key={`${session.id}-${key}`}
							nodeId={`${session.id}-${key}`}
							label={`${key}: ${value}`}
						/>
					);
				}
			})}
		</>
	);
};

const renderTree = (
	nodes: any,
	isRoot: boolean,
	i: number,
	searchQuery: string,
	setCopied: React.Dispatch<React.SetStateAction<boolean>>,
	getData: any
) => (
	<section key={i} style={{ position: "relative" }} className="renderNodes">
		{isRoot && (
			<button
				className="copy"
				onClick={async () => {
					await handleCopy(`${nodes.id}`, setCopied);
				}}
				title="Click to Copy"
			>
				<InfoOutlinedIcon style={{ color: "#0880ae" }} />
			</button>
		)}
		<StyledTreeItem key={nodes.id} nodeId={nodes.id} label={`${nodes.id}`}>
			{renderSessionDetails(nodes, getData)}
		</StyledTreeItem>
	</section>
);

const useDebounce = (value: string, delay: number) => {
	const [debouncedValue, setDebouncedValue] = useState(value);

	useEffect(() => {
		const timer = setTimeout(() => {
			setDebouncedValue(value);
		}, delay);

		return () => {
			clearTimeout(timer);
		};
	}, [value, delay]);

	return debouncedValue;
};

const StoreView = (props: storeViewIProps) => {
	const fetchSize = 100;
	const observer = useRef<IntersectionObserver | null>(null);

	const [searchQuery, setSearchQuery] = useState("");
	const [searchResults, setSearchResults] = useState([]);
	const [passer, setPasser] = useState({
		from_: Number(0),
		to_: Number(fetchSize),
	});
	const [storeData, setStoreData] = useState({ data: [] });
	const [copied, setCopied] = useState(false);

	const debouncedSearchQuery = useDebounce(searchQuery, 500);

	const { getData } = props;

	const { data, status, error, isLoading, isFetching } = getData(
		["key1", "key2"],
		passer
	);
	//  const { data, status, error, isLoading, isFetching } = apiMethod(passer);

	const loadMore = () => {
		setPasser((prevPasser) => ({
			from_: Number(prevPasser.to_),
			to_: Number(prevPasser.to_ + fetchSize),
		}));
	};

	useEffect(() => {
		if (!isLoading && status === "success" && data) {
			setStoreData((prevData: any) => {
				const newData = data.data.filter(
					(newItem: { id: any }) =>
						!prevData.data.some((item: { id: any }) => item.id === newItem.id)
				);

				return {
					...prevData,
					data: [...prevData.data, ...newData],
				};
			});
		}
	}, [data, isLoading, status]);

	useEffect(() => {
		if (storeData.data) {
			const filteredData = filterData(storeData.data, debouncedSearchQuery);
			setSearchResults(filteredData);
		}
	}, [storeData, debouncedSearchQuery]);

	useEffect(() => {
		const options = {
			root: null,
			rootMargin: "20px",
			threshold: 1.0,
		};

		const handleIntersect: IntersectionObserverCallback = (entries) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					loadMore();
				}
			});
		};

		observer.current = new IntersectionObserver(handleIntersect, options);
		if (
			observer.current &&
			!isLoading &&
			!isFetching &&
			searchResults.length >= fetchSize
		) {
			observer.current.observe(document.getElementById("bottomObserver")!);
		}

		return () => {
			if (observer.current != null) {
				observer.current.disconnect();
			}
		};
	}, [isLoading, isFetching, searchResults]);

	const handleSearchQueryChange = (
		event: React.ChangeEvent<HTMLInputElement>
	) => {
		setSearchQuery(event.target.value);
	};

	const filterData = (nodes: any[], query: string) => {
		const filteredNodes: any = nodes.filter((node) => {
			if (node.id.toLowerCase().includes(query.toLowerCase())) {
				return true;
			}
			if (node.children && node.children.length > 0) {
				const filteredChildren = filterData(node.children, query);
				return filteredChildren.length > 0;
			}
			return false;
		});
		return filteredNodes;
	};

	return (
		<main className="mainArea">
			{isLoading && <LoadingOverlay />}
			<section className="topLayout">
				<TextField
					fullWidth
					id="myInput"
					label="Search Session Id"
					variant="outlined"
					name="sessionId"
					defaultValue={searchQuery}
					className="sessionIdBox"
					onChange={handleSearchQueryChange}
					required
					size="small"
				/>
				{/* <Button variant='contained' onClick={loadMore}>
                    Load More
                </Button> */}
			</section>
			{error !== undefined && error && (
				<Alert severity="error" className="errorMessage">
					{error?.toString()}
				</Alert>
			)}
			{copied && (
				<SnackBar
					message={"Session ID Copied Successfully"}
					severity={"info"}
				/>
			)}
			<section className="storeViewerLayout">
				<TreeView
					aria-label="Store View"
					defaultCollapseIcon={<ExpandMoreIcon style={{ color: "#0880ae" }} />}
					defaultExpandIcon={<ChevronRightIcon style={{ color: "#0880ae" }} />}
				>
					{searchResults.length > 0 ? (
						searchResults.map((node, i) =>
							renderTree(node, true, i, searchQuery, setCopied, getData)
						)
					) : !isFetching && !isLoading ? (
						<StyledTreeItem
							nodeId="no-results"
							label="No matching nodes found"
						/>
					) : null}
				</TreeView>
				<div id="bottomObserver" style={{ height: "10px" }}></div>
			</section>
		</main>
	);
};

export default React.memo(StoreView);
