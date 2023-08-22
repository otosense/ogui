const annotationSample = [
	{
		id: "1234", // level 2
		bt: 123,
		tt: 456,
		name: "Sub device1",
		annotation: [
			// level 2
			{
				name: "annot1", // level 3
				bt: 1,
				tt: 2,
				id: "annot1",
			},
			{
				name: "annot2", // level 3
				bt: 12,
				tt: 21,
				id: "annot2",
			},
		],
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
				tt: 2,
				id: { as: "test key" },
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
