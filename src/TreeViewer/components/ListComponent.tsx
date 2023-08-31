import React, { useState, useRef, useCallback } from "react";
import { VariableSizeList } from "react-window";
import InfiniteLoader from "react-window-infinite-loader";

import RowComponent from "./RowComponent";
import { IRowProps, IListComponentProps } from "../Utilities/Interfaces";
import "../css/TreeViewer.css";

const ListComponent = (props: IListComponentProps) => {
	const {
		items,
		moreItemsLoading,
		loadMore,
		hasNextPage,
		sentinel,
		loadChildSentinelData,
		renderer,
	} = props;
	const defaultHeight = 50;

	const height = window.innerHeight - 100;
	const width = window.innerWidth - 100;

	const getItemSize = (index: number) => {
		return defaultHeight;
	};

	const Row: React.FC<IRowProps> = ({ index, style }) => {
		return (
			<RowComponent
				node={items[index]}
				index={index}
				style={style}
				sentinel={sentinel}
				loadChildSentinelData={loadChildSentinelData}
				renderer={renderer}
			/>
		);
	};

	const itemCount = hasNextPage ? items.length + 1 : items.length;

	return (
		<InfiniteLoader
			isItemLoaded={(index) => index < items.length}
			itemCount={itemCount}
			loadMoreItems={loadMore}
		>
			{({ onItemsRendered, ref }) => (
				<VariableSizeList
					height={height}
					width={width}
					itemCount={itemCount}
					itemSize={getItemSize}
					className="list-container"
					onItemsRendered={onItemsRendered}
					ref={ref}
					overscanCount={3}
				>
					{Row}
				</VariableSizeList>
			)}
		</InfiniteLoader>
	);
};

export default ListComponent;
