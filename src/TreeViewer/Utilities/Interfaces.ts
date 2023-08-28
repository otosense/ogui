interface storeDataObject {
	id: string;
	[key: string]: any;
}

interface storeViewIProps {
	getChildNodeData?: (keysArray: string[]) => Promise<any>;
	sentinel?: string;
	fetchSize?: number;
	getRootNodeData: (passer: {
		from_: number;
		to_: number;
	}) => Promise<any>;
	renderer?: JSX.Element | any;
}

export type {
	storeViewIProps,
	storeDataObject,

};
