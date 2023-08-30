import React, {
	useEffect,
	useState,
	useRef,
	forwardRef,
	useCallback,
} from "react";
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

const RowComponent = (props) => {
	const { node, index, onToggle, sentinel, style } = props;

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

	const renderTree = (nodes, i) => (
		<section key={i} style={{ position: "relative" }} className="renderNodes">
			<StyledTreeItem key={nodes.id} nodeId={nodes.id} label={`${nodes.id}`}>
				{renderNodeItemDetails(nodes, nodes?.id, [nodes.id])}
			</StyledTreeItem>
		</section>
	);

	return <div style={style}>{node && renderTree(node, index)}</div>;
};

export default RowComponent;
