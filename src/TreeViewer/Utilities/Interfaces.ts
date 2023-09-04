interface storeDataObject {
	id: string;
	[key: string]: any;
}

interface storeViewBaseProps {
	fetchSize?: number; // default fetch size 100
	getRootNodeData:
	| any[]
	| (() => any[])
	| ((passer: { from_: number; to_: number; }) => Promise<storeDataObject[]>); // Prop to pass data for component
	renderer?: JSX.Element | any;
}

//Below two Interfaces extending on storeViewBaseProps, to ensure if sentinel passed then should pass getChildNodeData.
interface SentinelProps extends storeViewBaseProps {
	sentinel: string;
	getChildNodeData:
	| ((keysArray: string[]) => storeDataObject)
	| ((keysArray: string[]) => Promise<storeDataObject>);
}
interface WithoutSentinelProps extends storeViewBaseProps {
	sentinel?: never;
	getChildNodeData?: never;
}

type IStoreViewProps = SentinelProps | WithoutSentinelProps;

interface IPasser {
	from_: number;
	to_: number;
}

interface IRowProps {
	index: number;
	style: React.CSSProperties;
}

interface IListComponentProps {
	items: storeDataObject[];
	moreItemsLoading: boolean;
	loadMore: any;
	hasNextPage: boolean;
	sentinel?: string;
	loadChildSentinelData?: any;
	renderer?: any;
}

interface IRowComponentProps {
	node: any;
	index: number;
	sentinel?: string;
	style: React.CSSProperties;
	loadChildSentinelData?: any;
	renderer?: any;
}

export type {
	IStoreViewProps,
	storeDataObject,
	IPasser,
	IRowProps,
	IListComponentProps,
	IRowComponentProps,
};
