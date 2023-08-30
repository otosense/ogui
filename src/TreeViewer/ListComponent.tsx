import React, { useState, useRef, useCallback } from "react";
import { VariableSizeList } from "react-window";
import InfiniteLoader from "react-window-infinite-loader";

import RowComponent from "./RowComponent";
import "./css/TreeViewer.css";

const ListComponent = (props: any) => {
	const {
		items,
		moreItemsLoading,
		loadMore,
		hasNextPage,
		sentinel,
		loadChildSentinelData,
	} = props;
	const defaultHeight = 100;

	const height = window.innerHeight - 50;
	const width = window.innerWidth - 100;
	const [rowHeights, setRowHeights] = useState(() =>
		new Array(items.length).fill(defaultHeight)
	);

	const getItemSize = (index: number) => {
		return defaultHeight;
	};

	const Row = ({ index, style }) => {
		return (
			<RowComponent
				node={items[index]}
				index={index}
				style={style}
				sentinel={sentinel}
				loadChildSentinelData={loadChildSentinelData}
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
