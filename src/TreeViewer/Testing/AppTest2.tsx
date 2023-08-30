import TV from "../TV";
import { storeDataObject, storeViewIProps } from "../Utilities/Interfaces";

let storeViewProps: storeViewIProps = {
	getRootNodeData: fetchData,
	sentinel: "notloaded",
	fetchSize: 100,
	getChildNodeData: fetchChildData,
	// renderer: userRenderer,
};

function AppTest() {
	console.log("in app test");
	return (
		<>
			{/* <TreeViewer {...storeViewProps} /> */}
			<TV />
		</>
	);
}
