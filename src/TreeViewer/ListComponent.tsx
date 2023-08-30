import React from "react";
import { FixedSizeList } from "react-window";
import InfiniteLoader from "react-window-infinite-loader";

import RowComponent from "./RowComponent";
import "./css/TreeViewer.css";

const ListComponent = ({ items, moreItemsLoading, loadMore, hasNextPage }) => {
	const height = window.innerHeight; // approximates 100vh
	const width = window.innerWidth;

	const Row = ({ index, style }) => {
		// console.log("index", items[index]);
		// console.log("i am in row");
		return <RowComponent node={items[index]} i={index} style={style} />;
	};

	console.log("items", items);

	const itemCount = hasNextPage ? items.length + 1 : items.length;

	console.log("itemCount", itemCount);

	return (
		<InfiniteLoader
			isItemLoaded={(index) => index < items.length}
			itemCount={itemCount}
			loadMoreItems={loadMore}
		>
			{({ onItemsRendered, ref }) => (
				<FixedSizeList
					height={500}
					width={500}
					itemCount={itemCount}
					itemSize={50}
					className="list-container"
					onItemsRendered={onItemsRendered}
					ref={ref}
					overscanCount={4}
				>
					{Row}
				</FixedSizeList>
			)}
		</InfiniteLoader>
	);
};

export default ListComponent;
