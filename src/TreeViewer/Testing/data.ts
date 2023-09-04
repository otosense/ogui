const annotationSample = [
	{
		id: "1234", // level 2
		bt: 123,
		tt: 456,
		name: "Sub device1",
		annotation: [],
	},
	{
		id: "5678", // level 2
		bt: 123,
		tt: 456,
		name: "Sub device1",
		annotation: [
			// level 2
			{
				name: "temp1", // level 3
				bt: 1,
				tt: 2,
				id: "annot3",
			},
			{
				name: "temp2", // level 3
				bt: 12,
				tt: 21,
				id: "annot4",
			},
		],
	},
	{
		id: "91011", // level 2
		bt: 123,
		tt: "345",
		name: "Sub device2",
		annotation: [
			// level 2
			{
				name: { a: "testing" }, // level 3
				bt: 1,
				tt: { as: "test key" },
				id: "34",
			},
			{
				name: "name", // level 3
				bt: 12,
				tt: 21,
				id: "annot6",
			},
		],
	},
	{
		id: "1213", // level 2
		bt: "2432",
		tt: 456,
		name: "1213name",
		annotation: "notloaded",
		sample: {
			name: "notloaded",
			bt: "1",
			time: [
				{ name: "notloaded", test: "sample test" },
				{ name: "sample-name", test: "notloaded" },
			],
		},
	},
	{
		id: "1415", // level 2
		bt: "2432",
		tt: 456,
		name: "1213name",
		annotation: "notloaded",
		sample: {
			name: "sample name",
			bt: "1",
			time: [
				{ name: "sample name", test: "sample test" },
				{ name: "sample-name", test: "sample-test" },
			],
		},
	},
	{
		id: "161718", // level 2
		bt: "2432",
		tt: 456,
		name: "1213name",
		annotation: "notloaded",
		sample: {
			name: "sample name",
			bt: "1",
			time: [
				{ name: "sample name", test: "sample test" },
				{ name: "sample-name", test: "sample-test" },
			],
		},
	},
	{
		id: "181920", // level 2
		bt: "2432",
		tt: 456,
		name: "1213name",
		annotation: "notloaded",
		sample: {
			name: "sample name",
			bt: "1",
			time: [
				{ name: "sample name", test: "sample test" },
				{ name: "sample-name", test: "sample-test" },
			],
		},
	},
	{
		id: "2122", // level 2
		bt: "2432",
		tt: 456,
		name: "1213name",
		annotation: "notloaded",
		sample: {
			name: "sample name",
			bt: "1",
			time: [
				{ name: "sample name", test: "sample test" },
				{ name: "sample-name", test: "sample-test" },
			],
		},
	},
	{
		id: "212223", // level 2
		bt: "2432",
		tt: 456,
		name: "1213name",
		annotation: "notloaded",
		sample: {
			name: "sample name",
			bt: "1",
			time: [
				{ name: "sample name", test: "sample test" },
				{ name: "sample-name", test: "sample-test" },
			],
		},
	},
	{
		id: "212224", // level 2
		bt: "2432",
		tt: 456,
		name: "1213name",
		annotation: "notloaded",
		sample: {
			name: "sample name",
			bt: "1",
			time: [
				{ name: "sample name", test: "sample test" },
				{ name: "sample-name", test: "sample-test" },
			],
		},
	},
	{
		id: "212225", // level 2
		bt: "2432",
		tt: 456,
		name: "1213name",
		annotation: "notloaded",
		sample: {
			name: "sample name",
			bt: "1",
			time: [
				{ name: "sample name", test: "sample test" },
				{ name: "sample-name", test: "sample-test" },
			],
		},
	},
	{
		id: "212226", // level 2
		bt: "2432",
		tt: 456,
		name: "1213name",
		annotation: "notloaded",
		sample: {
			name: "sample name",
			bt: "1",
			time: [
				{ name: "sample name", test: "sample test" },
				{ name: "sample-name", test: "sample-test" },
			],
		},
	},
	{
		id: "212227", // level 2
		bt: "2432",
		tt: 456,
		name: "1213name",
		annotation: "notloaded",
		sample: {
			name: "sample name",
			bt: "1",
			time: [
				{ name: "sample name", test: "sample test" },
				{ name: "sample-name", test: "sample-test" },
			],
		},
	},
];

export { annotationSample };
