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

const RowComponent = (props: any) => {
	const { node, i, style } = props;

	// console.log("node", node);
	let sentinel = "notloaded";

	// console.log("in row comp", node, i);

	// const [passer, setPasser] = useState({
	// 	from_: Number(0),
	// 	to_: Number(fetchSize),
	// });

	// let i = 1;
	// const [loadedData, setLoadedData] = useState<{ data: any }>();
	// const [storeData, setStoreData] = useState<{ data: any[] }>({
	// 	data: [],
	// });
	// const [copied, setCopied] = useState(false);

	const [isLoading, setLoading] = useState(true);
	const [error, setError] = useState("");

	// const loadMore = () => {
	// 	setPasser((prevPasser) => ({
	// 		from_: Number(prevPasser.to_),
	// 		to_: Number(prevPasser.to_ + fetchSize),
	// 	}));
	// };

	const onClickOfNotLoaded = async (clickedKeyParentStructure: string[]) => {
		try {
			// console.log("clickedKeyParentStructure", clickedKeyParentStructure);
			// const childNodeLoadedData = await getChildNodeData(
			// 	clickedKeyParentStructure
			// );
			// if (childNodeLoadedData.status === "success") {
			// 	// console.log("childNodeLoadedData.data", childNodeLoadedData.data);
			// 	let childData: storeDataObject =
			// 		childNodeLoadedData.data as storeDataObject;
			// 	// setLoadedData({ data: childData });
			// }
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
		i: number
		// setCopied: React.Dispatch<React.SetStateAction<boolean>>
	) => (
		// console.log("returning", i);
		<section key={i} style={{ position: "relative" }} className="renderNodes">
			{/* {isRoot && (
				<button
					className="copy"
					onClick={async () => {
						await handleCopy(`${nodes.id}`, setCopied);
					}}
					title="Click to Copy"
				>
					<InfoOutlinedIcon style={{ color: "#0880ae" }} />
				</button>
			)} */}
			<StyledTreeItem key={nodes.id} nodeId={nodes.id} label={`${nodes.id}`}>
				{/* {renderNodeItemDetails(nodes, nodes?.id, [nodes.id])} */}
			</StyledTreeItem>
		</section>
	);

	const handleSearchQueryChange = (
		event: React.ChangeEvent<HTMLInputElement>
	) => {
		// setSearchQuery(event.target.value);
	};

	// return (
	// 	// <h1>test</h1>
	// 	{ renderTree(node, i) }
	// );
	if (node != undefined) {
		// return renderTree(node, i);
		return <div style={style}>{node.id}</div>;
	} else {
		return "";
	}
};

export default RowComponent;
