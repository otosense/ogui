import React from "react";
import { StyledTreeItem } from "./StoreViewStyle";
import "../css/TreeViewer.css";
import { IRowComponentProps } from "../Utilities/Interfaces";

const RowComponent = (props: IRowComponentProps) => {
	const { node, index, sentinel, style, loadChildSentinelData, renderer } =
		props;

	const onClickOfNotLoaded = async (clickedKeyParentStructure: string[]) => {
		if (loadChildSentinelData) {
			loadChildSentinelData(clickedKeyParentStructure);
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
						}
						else {
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

	const renderTree = (nodes: any, i: number) => (
		<section key={i} style={{ position: "relative" }} className="renderNodes">
			<StyledTreeItem key={nodes.id} nodeId={nodes.id} label={`${nodes.id}`}>
				{renderNodeItemDetails(nodes, nodes?.id, [nodes.id])}
			</StyledTreeItem>
		</section>
	);

	return <div style={style}>{node && renderTree(node, index)}</div>;
};

export default RowComponent;