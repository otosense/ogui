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

type FetchResult =
	| { status: "success"; data: [] }
	| { status: "error"; error: string };

interface storeViewIProps {
	getChildNodeData: (keysArray: string[]) => {
		data: any;
	};
	sentinel: string;
	fetchSize: number;
	getRootNodeData: (passer: {
		from_: number;
		to_: number;
	}) => Promise<FetchResult>;
}

interface storeDataObject {
	id: string;
	[key: string]: any;
}

export type { Child, Device, storeViewIProps, storeDataObject };
