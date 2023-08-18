interface Child {
	id: string;
	name?: string;
	children?: Child[];
	bt?: number[];
	tt?: number[];
}

interface Device {
	id: string;
	name?: string;
	children?: Child[];
	bt?: number[];
	tt?: number[];
}

interface storeViewIProps {
	getRootNodeData: (passer: { from_: number; to_: number }) => {
		data: any;
		status: any;
		error: any;
		isLoading: any;
		isFetching: any;
	};
	getChildNodeData: (keysArray: string[]) => {
		data: any;
	};
	sentinel: string;
	fetchSize: number;
}

export type { Child, Device, storeViewIProps };
