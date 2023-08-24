import React, { useEffect, useState, useRef } from "react";
import TreeView from "@mui/lab/TreeView";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import TextField from "@mui/material/TextField/TextField";
import { Alert } from "@mui/material";

import SnackBar from "../utilities/SnackBar";
import LoadingOverlay from "../utilities/Loader";
import { StyledTreeItem } from "./components/StoreViewStyle";
import { storeViewIProps, storeDataObject } from "./Utilities/Interfaces";
import { deepMerge, handleCopy } from "./Utilities/UtilFunctions";
import "./css/TreeViewer.css";

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

const TreeViewer = (props: storeViewIProps) => {
	const {
		getRootNodeData,
		sentinel,
		getChildNodeData,
		fetchSize = 100,
		renderer,
	} = props;

	const observer = useRef<IntersectionObserver | null>(null);

	const [searchQuery, setSearchQuery] = useState<string>("");
	const [searchResults, setSearchResults] = useState([]);
	const [passer, setPasser] = useState({
		from_: Number(0),
		to_: Number(fetchSize),
	});

	const [loadedData, setLoadedData] = useState<{ data: any }>();
	const [storeData, setStoreData] = useState<{ data: any[] }>({
		data: [],
	});
	const [copied, setCopied] = useState(false);

	const debouncedSearchQuery = useDebounce(searchQuery, 500);
	const [isLoading, setLoading] = useState(true);
	const [error, setError] = useState("");

	const loadMore = () => {
		setPasser((prevPasser) => ({
			from_: Number(prevPasser.to_),
			to_: Number(prevPasser.to_ + fetchSize),
		}));
	};

	const onClickOfNotLoaded = async (clickedKeyParentStructure: string[]) => {
		try {
			// console.log("clickedKeyParentStructure", clickedKeyParentStructure);
			const childNodeLoadedData = await getChildNodeData(
				clickedKeyParentStructure
			);
			if (childNodeLoadedData.status === "success") {
				// console.log("childNodeLoadedData.data", childNodeLoadedData.data);
				let childData: storeDataObject =
					childNodeLoadedData.data as storeDataObject;
				setLoadedData({ data: childData });
			}
		} catch (error) {
			console.error("Error fetching child node data:", error);
		}
	};

	const renderNodeItemDetails = (
		nodeItem: any,
		nodeItemId = "",
		parentKeys: string[]
	) => {
		const nodeItemKeys = Object.keys(nodeItem);
		return (
			<>
				{nodeItemKeys.map((key) => {
					const value = nodeItem[key];

					if (
						Array.isArray(value) ||
						value instanceof Object ||
						value === sentinel
					) {
						if (value === sentinel) {
							return (
								<StyledTreeItem
									key={`${nodeItemId}-${key}`}
									nodeId={`${nodeItemId}-${key}`}
									label={`${key}: ${value}`}
									onClick={() => {
										let clickedKeyParentStructure: string[] = [
											...parentKeys,
											key,
										];
										onClickOfNotLoaded(clickedKeyParentStructure);
									}}
								/>
							);
						}
						if (renderer()) {
							return (
								<StyledTreeItem
									key={`${nodeItemId}-${key}`}
									nodeId={`${nodeItemId}-${key}`}
									label={String(key)}
								>
									{renderer()}
								</StyledTreeItem>
							);
						} else {
							if (Array.isArray(value)) {
								return (
									<StyledTreeItem
										key={`${nodeItemId}-array-${key}`}
										nodeId={`${nodeItemId}-array-${key}`}
										label={String(key)}
									>
										{value.length > 0 ? (
											value.map((arrayItem, index) => {
												if (arrayItem instanceof Object) {
													return (
														<StyledTreeItem
															key={`${nodeItemId}--${index}`}
															nodeId={`${nodeItemId}--${index}`}
															label={String(index)}
														>
															{renderNodeItemDetails(arrayItem, nodeItemId, [
																...parentKeys,
																key,
																index.toString(),
															])}
														</StyledTreeItem>
													);
												} else {
													return (
														<StyledTreeItem
															key={`${nodeItemId}--${index}--${String(
																arrayItem
															)}`}
															nodeId={`${nodeItemId}--${index}--${String(
																arrayItem
															)}`}
															label={String(arrayItem)}
														/>
													);
												}
											})
										) : (
											<StyledTreeItem
												key={`${nodeItemId}-${key}-${parentKeys.join("-")}`}
												nodeId={`${nodeItemId}-${key}-${parentKeys.join("-")}`}
												label={"[]"}
											/>
										)}
									</StyledTreeItem>
								);
							}
							if (value instanceof Object) {
								return (
									<StyledTreeItem
										key={`${nodeItemId}-${key}`}
										nodeId={`${nodeItemId}-${key}`}
										label={String(key)}
									>
										{renderNodeItemDetails(value, nodeItemId, [
											...parentKeys,
											key,
										])}
									</StyledTreeItem>
								);
							}
						}
					} else {
						return (
							<StyledTreeItem
								key={`${nodeItemId}-${key}-${parentKeys.join("-")}`}
								nodeId={`${nodeItemId}-${key}-${parentKeys.join("-")}`}
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
		// console.log("returning", i);
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
				{renderNodeItemDetails(nodes, nodes?.id, [nodes.id])}
			</StyledTreeItem>
		</section>
	);

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

	useEffect(() => {
		// Use an async function inside the useEffect hook
		async function fetchDataAndSet() {
			const fetchedData = await getRootNodeData(passer);
			setLoading(false);
			if (fetchedData.status === "success") {
				setStoreData((prevData: any) => {
					const newData = fetchedData.data.filter(
						(newItem: { id: any }) =>
							!prevData.data.some((item: { id: any }) => item.id === newItem.id)
					);

					return {
						...prevData,
						data: [...prevData.data, ...newData],
					};
				});
			} else if (fetchedData.status === "error") {
				setError(fetchedData.error);
			}
		}

		fetchDataAndSet();
	}, [getRootNodeData, passer]);

	useEffect(() => {
		if (storeData) {
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
		if (observer.current && !isLoading && searchResults.length >= fetchSize) {
			observer.current.observe(document.getElementById("bottomObserver")!);
		}

		return () => {
			if (observer.current != null) {
				observer.current.disconnect();
			}
		};
	}, [isLoading, searchResults]);

	useEffect(() => {
		let updatedStoreData = storeData.data.map((eachItem) =>
			eachItem?.id === loadedData?.data.id
				? deepMerge(eachItem, loadedData?.data)
				: eachItem
		);
		setStoreData({ data: updatedStoreData });
	}, [loadedData]);

	return (
		<main className="mainArea">
			{isLoading && <LoadingOverlay />}
			<section className="topLayout">
				<TextField
					fullWidth
					id="myInput"
					label="Search Id"
					variant="outlined"
					name="storeItemId"
					defaultValue={searchQuery}
					onChange={handleSearchQueryChange}
					required
					size="small"
				/>
			</section>
			{error !== undefined && error && (
				<Alert severity="error" className="errorMessage">
					{error?.toString()}
				</Alert>
			)}
			{copied && (
				<SnackBar message={"ID Copied Successfully"} severity={"info"} />
			)}
			<section className="storeViewerLayout">
				<TreeView
					aria-label="Store View"
					defaultCollapseIcon={<ExpandMoreIcon style={{ color: "#0880ae" }} />}
					defaultExpandIcon={<ChevronRightIcon style={{ color: "#0880ae" }} />}
				>
					{searchResults.length > 0 ? (
						searchResults.map((node, i) =>
							renderTree(node, true, i, searchQuery, setCopied)
						)
					) : !isLoading && !error ? (
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
TreeViewer.defaultProps = {
	fetchSize: 100,
	sentinel: "notloaded",
};

export default React.memo(TreeViewer);
