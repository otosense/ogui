import React, { useState, useRef, useCallback } from "react";
import { VariableSizeList } from "react-window";
import InfiniteLoader from "react-window-infinite-loader";

import RowComponent from "./RowComponent";
import "./css/TreeViewer.css";

const ListComponent = ({ items, moreItemsLoading, loadMore, hasNextPage }) => {
	const defaultHeight = 40; // initial height of rows, adjust accordingly

	const height = window.innerHeight - 50;
	const width = window.innerWidth - 100;
	const [rowHeights, setRowHeights] = useState(() =>
		new Array(items.length).fill(defaultHeight)
	);
	const listRef = useRef(null);

	const getItemSize = (index) => {
		return rowHeights[index] || defaultHeight;
	};

	const handleTreeToggle = useCallback((index, newSize) => {
		console.log("newsize", newSize);
		console.log("in handleTreeToggle toogle of LC");
		setRowHeights((prev) => {
			const newHeights = [...prev];
			newHeights[index] = newSize;
			return newHeights;
		});

		console.log("rowHeights", rowHeights);

		listRef.current.resetAfterIndex(index, true);
	}, []);

	const Row = ({ index, style }) => {
		const treeRef = useRef(null);

		// const handleToggle = () => {
		// 	console.log("in handel toogle of LC");
		// 	// if (treeRef.current) {
		// 	// 	const newSize = treeRef.current?.getBoundingClientRect().height;
		// 	// 	console.log("n", newSize);
		// 	// 	handleTreeToggle(index, newSize);
		// 	// }
		// 	setTimeout(() => {
		// 		if (treeRef.current) {
		// 			const newSize = treeRef.current.getBoundingClientRect().height;
		// 			console.log("n", newSize);
		// 			handleTreeToggle(index, newSize);
		// 		}
		// 	}, 5);
		// };

		const handleToggle = () => {
			setTimeout(() => {
				if (treeRef.current) {
					const newSize = treeRef.current.getBoundingClientRect().height;
					console.log("new size in ht", newSize);
					handleTreeToggle(index, newSize);
				}
			}, 0);
		};

		return (
			<RowComponent
				node={items[index]}
				i={index}
				style={style}
				ref={treeRef}
				onToggle={handleToggle}
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
					ref={(list) => {
						ref(list);
						listRef.current = list;
					}}
					overscanCount={4}
				>
					{Row}
				</VariableSizeList>
			)}
		</InfiniteLoader>
	);
};

export default ListComponent;
