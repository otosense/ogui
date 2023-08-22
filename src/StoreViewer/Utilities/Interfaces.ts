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

interface storeDataObject {
	id: string;
	[key: string]: any;
}

type childDataFetchResult =
	| { status: "success"; data: storeDataObject }
	| { status: "error"; error: string };

type FetchResult =
	| { status: "success"; data: storeDataObject[] }
	| { status: "error"; error: string };

interface storeViewIProps {
	getChildNodeData: (keysArray: string[]) => Promise<childDataFetchResult>;
	sentinel?: string;
	fetchSize?: number;
	getRootNodeData: (passer: {
		from_: number;
		to_: number;
	}) => Promise<FetchResult>;
}

export type {
	Child,
	Device,
	storeViewIProps,
	storeDataObject,
	childDataFetchResult,
	FetchResult,
};
