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

function getAllKeys(obj, path: string[] = []): string[][] {
	let keys = [];

	for (let key in obj) {
		const currentPath = path.concat(key);

		if (Array.isArray(obj) && typeof obj[key] !== "object") {
			continue; // Skip primitive array elements
		}

		keys.push(currentPath);

		if (typeof obj[key] === "object" && obj[key] !== null) {
			keys = keys.concat(getAllKeys(obj[key], currentPath));
		}
	}

	return keys;
}

function findSublistWithValue(keysList: [], targetValue: string): string[] {
	return keysList.find(
		(sublist) => sublist[sublist.length - 1] === targetValue
	);
}

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
	const { getData, sentinel } = props;

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

	const onClickOfNotLoaded = (clickedKeyParentStructure: string[]) => {
		// console.log("key", clickedKeyParentStructure);
		getData(clickedKeyParentStructure, passer);
	};

	const renderSessionDetails = (session: any, sessionId = "", keysList: []) => {
		const sessionKeys = Object.keys(session);
		return (
			<>
				{sessionKeys.map((key) => {
					const value = session[key];

					if (
						Array.isArray(value) ||
						value instanceof Object ||
						value === sentinel
					) {
						if (value === sentinel) {
							return (
								<StyledTreeItem
									key={`${sessionId}-${key}`}
									nodeId={`${sessionId}-${key}`}
									label={`${key}: ${value}`}
									onClick={() => {
										let clickedKeyParentStructure: string[] =
											findSublistWithValue(keysList, key);
										clickedKeyParentStructure.push;
										clickedKeyParentStructure = [
											sessionId,
											...clickedKeyParentStructure,
										];

										onClickOfNotLoaded(clickedKeyParentStructure);
									}}
								/>
							);
						}
						if (Array.isArray(value)) {
							return (
								<StyledTreeItem
									key={`${sessionId}-${key}`}
									nodeId={`${sessionId}-${key}`}
									label={String(key)}
								>
									{value.map((arrayItem, index) => {
										if (arrayItem instanceof Object) {
											return renderSessionDetails(
												arrayItem,
												sessionId,
												keysList
											);
										} else {
											return (
												<StyledTreeItem
													key={`${sessionId}--${index}`}
													nodeId={`${sessionId}--${index}`}
													label={String(arrayItem)}
												/>
											);
										}
									})}
								</StyledTreeItem>
							);
						}
						if (value instanceof Object) {
							return (
								<StyledTreeItem
									key={`${sessionId}-${key}`}
									nodeId={`${sessionId}-${key}`}
									label={String(key)}
								>
									{renderSessionDetails(value, sessionId, keysList)}
								</StyledTreeItem>
							);
						}
					} else {
						return (
							<StyledTreeItem
								key={`${sessionId}-${key}`}
								nodeId={`${sessionId}-${key}`}
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
		setCopied: React.Dispatch<React.SetStateAction<boolean>>
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
				{renderSessionDetails(nodes, nodes?.id, getAllKeys(nodes))}
			</StyledTreeItem>
		</section>
	);

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
			setSearchResults(testData);
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
