import React, { useState, useRef, useCallback } from "react";
import { VariableSizeList } from "react-window";
import InfiniteLoader from "react-window-infinite-loader";

import RowComponent from "./RowComponent";
import "./css/TreeViewer.css";

const ListComponent = (props: any) => {
	const { items, moreItemsLoading, loadMore, hasNextPage, sentinel } = props;
	const defaultHeight = 50;

	const height = window.innerHeight - 50;
	const width = window.innerWidth - 100;
	const [rowHeights, setRowHeights] = useState(() =>
		new Array(items.length).fill(defaultHeight)
	);

	const getItemSize = (index) => {
		return rowHeights[index] || defaultHeight;
	};

	const Row = ({ index, style }) => {
		return (
			<RowComponent
				node={items[index]}
				index={index}
				style={style}
				sentinel={sentinel}
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
					overscanCount={4}
				>
					{Row}
				</VariableSizeList>
			)}
		</InfiniteLoader>
	);
};

export default ListComponent;
